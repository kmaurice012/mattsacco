import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Sacco from '@/models/Sacco';
import Vehicle from '@/models/Vehicle';
import User from '@/models/User';
import Trip from '@/models/Trip';
import Remittance from '@/models/Remittance';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Get counts
    const [
      totalSaccos,
      activeSaccos,
      totalVehicles,
      totalUsers,
      activeUsers,
      todayTrips,
      yesterdayTrips,
    ] = await Promise.all([
      Sacco.countDocuments(),
      Sacco.countDocuments({ status: 'active' }),
      Vehicle.countDocuments(),
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Trip.countDocuments({ tripDate: { $gte: today } }),
      Trip.countDocuments({ tripDate: { $gte: yesterday, $lt: today } }),
    ]);

    // Get today's collections
    const todayTripsData = await Trip.aggregate([
      { $match: { tripDate: { $gte: today } } },
      { $group: { _id: null, total: { $sum: '$fareCollected' } } },
    ]);
    const todayCollections = todayTripsData[0]?.total || 0;

    // Get yesterday's collections for growth calculation
    const yesterdayTripsData = await Trip.aggregate([
      { $match: { tripDate: { $gte: yesterday, $lt: today } } },
      { $group: { _id: null, total: { $sum: '$fareCollected' } } },
    ]);
    const yesterdayCollections = yesterdayTripsData[0]?.total || 0;

    // Calculate growth percentage
    const collectionGrowth =
      yesterdayCollections > 0
        ? ((todayCollections - yesterdayCollections) / yesterdayCollections) * 100
        : 0;

    // Get pending remittances
    const pendingRemittancesData = await Remittance.aggregate([
      { $match: { status: 'pending' } },
      { $group: { _id: null, total: { $sum: '$netAmount' } } },
    ]);
    const pendingRemittances = pendingRemittancesData[0]?.total || 0;

    // Calculate platform commission (5% of today's collections as default)
    const platformCommission = todayCollections * 0.05;

    return NextResponse.json({
      totalSaccos,
      activeSaccos,
      totalVehicles,
      totalUsers,
      activeUsers,
      todayTrips,
      todayCollections,
      collectionGrowth: Number(collectionGrowth.toFixed(2)),
      pendingRemittances,
      platformCommission,
    });
  } catch (error: any) {
    console.error('Error fetching super admin stats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
