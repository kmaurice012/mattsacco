import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Vehicle from '@/models/Vehicle';
import Trip from '@/models/Trip';
import Remittance from '@/models/Remittance';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const saccoId = searchParams.get('saccoId');

    if (!saccoId) {
      return NextResponse.json({ error: 'Missing saccoId' }, { status: 400 });
    }

    // Get vehicles count
    const vehicles = await Vehicle.find({ saccoId });
    const activeVehicles = vehicles.filter(v => v.status === 'active').length;

    // Get trips and revenue
    const trips = await Trip.find({ vehicleId: { $in: vehicles.map(v => v._id) } });
    const totalRevenue = trips.reduce((sum, trip) => sum + (trip.fareCollected || 0), 0);

    // Get drivers count
    const drivers = new Set(trips.map(t => t.driverId?.toString()));

    const stats = {
      totalVehicles: vehicles.length,
      activeVehicles,
      totalRevenue,
      totalDrivers: drivers.size,
      avgRevenuePerVehicle: vehicles.length > 0 ? totalRevenue / vehicles.length : 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
