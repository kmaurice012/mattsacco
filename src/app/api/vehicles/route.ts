import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import dbConnect from '@/lib/mongodb';
import Vehicle from '@/models/Vehicle';
import Trip from '@/models/Trip';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const ownerId = searchParams.get('ownerId');
    const saccoId = searchParams.get('saccoId');

    let query: any = {};

    if (ownerId) {
      query.ownerId = ownerId;
    }

    if (saccoId) {
      query.saccoId = saccoId;
    }

    const vehicles = await Vehicle.find(query).lean();

    // Enrich vehicles with trip data
    const vehiclesWithStats = await Promise.all(
      vehicles.map(async (vehicle) => {
        const trips = await Trip.find({ vehicleId: vehicle._id }).lean();
        const totalRevenue = trips.reduce((sum, trip) => sum + (trip.fareCollected || 0), 0);
        const totalTrips = trips.length;

        return {
          ...vehicle,
          totalRevenue,
          totalTrips,
        };
      })
    );

    return NextResponse.json({ vehicles: vehiclesWithStats });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}
