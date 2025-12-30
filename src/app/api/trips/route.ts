import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Trip from '@/models/Trip';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const driverId = searchParams.get('driverId');
    const vehicleId = searchParams.get('vehicleId');
    const limitStr = searchParams.get('limit') || '10';
    const limit = Math.min(parseInt(limitStr, 10), 100);

    let query: any = {};

    if (driverId) {
      query.driverId = driverId;
    }

    if (vehicleId) {
      query.vehicleId = vehicleId;
    }

    const trips = await Trip.find(query)
      .sort({ tripDate: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ trips });
  } catch (error) {
    console.error('Error fetching trips:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trips' },
      { status: 500 }
    );
  }
}
