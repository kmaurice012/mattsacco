'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import {
  Car,
  MapPin,
  DollarSign,
  Clock,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export default function DriverDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [recentTrips, setRecentTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && !['driver', 'conductor'].includes(session?.user?.role)) {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driverId = session?.user?.id;
        if (!driverId) return;

        const tripsRes = await fetch(`/api/trips?driverId=${driverId}&limit=10`);

        if (tripsRes.ok) {
          const tripsData = await tripsRes.json();
          const trips = tripsData.trips || [];
          setRecentTrips(trips);

          // Calculate stats
          const totalTrips = trips.length;
          const totalFareCollected = trips.reduce((sum: number, t: any) => sum + (t.fareCollected || 0), 0);
          const totalPassengers = trips.reduce((sum: number, t: any) => sum + (t.passengers || 0), 0);
          const avgFarePerTrip = totalTrips > 0 ? totalFareCollected / totalTrips : 0;

          setStats({
            totalTrips,
            totalFareCollected,
            totalPassengers,
            avgFarePerTrip,
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated' && ['driver', 'conductor'].includes(session?.user?.role)) {
      fetchData();
    }
  }, [status, session]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session?.user?.role || !['driver', 'conductor'].includes(session.user.role)) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Performance</h1>
          <p className="text-gray-500 mt-1">Welcome back, {session?.user?.name}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Trips"
          value={stats?.totalTrips || 0}
          icon={<Car className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Total Passengers"
          value={stats?.totalPassengers || 0}
          icon={<MapPin className="h-6 w-6 text-green-600" />}
        />
        <StatCard
          title="Fare Collected"
          value={formatCurrency(stats?.totalFareCollected || 0)}
          icon={<DollarSign className="h-6 w-6 text-purple-600" />}
        />
        <StatCard
          title="Avg Fare/Trip"
          value={formatCurrency(stats?.avgFarePerTrip || 0)}
          icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/fare-collection">
          <Button className="w-full" variant="secondary">
            <DollarSign className="h-4 w-4 mr-2" />
            Record Fare Collection
          </Button>
        </Link>
        <Link href="/remittance">
          <Button className="w-full" variant="secondary">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Remittances
          </Button>
        </Link>
      </div>

      {/* Recent Trips */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trips</CardTitle>
        </CardHeader>
        <CardContent>
          {recentTrips.length > 0 ? (
            <div className="space-y-4">
              {recentTrips.slice(0, 5).map((trip: any) => (
                <div key={trip._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{trip.route}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(trip.tripDate).toLocaleDateString()} - {trip.passengers} passengers
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{formatCurrency(trip.fareCollected)}</p>
                    <p className="text-sm text-gray-500">{trip.paymentMethod}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No trips recorded yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
