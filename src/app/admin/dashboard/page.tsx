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
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const saccoId = session?.user?.saccoId;
        if (!saccoId) return;

        const [statsRes, vehiclesRes] = await Promise.all([
          fetch(`/api/stats?saccoId=${saccoId}`),
          fetch(`/api/vehicles?saccoId=${saccoId}`),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (vehiclesRes.ok) {
          const vehiclesData = await vehiclesRes.json();
          setVehicles(vehiclesData.vehicles?.slice(0, 5) || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated' && session?.user?.role === 'admin') {
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

  if (session?.user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SACCO Dashboard</h1>
          <p className="text-gray-500 mt-1">{session?.user?.saccoName}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Vehicles"
          value={stats?.totalVehicles || 0}
          icon={<Car className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats?.totalRevenue || 0)}
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
        />
        <StatCard
          title="Total Drivers"
          value={stats?.totalDrivers || 0}
          icon={<Users className="h-6 w-6 text-purple-600" />}
        />
        <StatCard
          title="Avg Revenue/Vehicle"
          value={formatCurrency(stats?.avgRevenuePerVehicle || 0)}
          icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/vehicles">
          <Button className="w-full" variant="secondary">
            <Car className="h-4 w-4 mr-2" />
            Manage Vehicles
          </Button>
        </Link>
        <Link href="/staff">
          <Button className="w-full" variant="secondary">
            <Users className="h-4 w-4 mr-2" />
            Manage Staff
          </Button>
        </Link>
        <Link href="/fare-collection">
          <Button className="w-full" variant="secondary">
            <DollarSign className="h-4 w-4 mr-2" />
            Fare Collection
          </Button>
        </Link>
        <Link href="/remittance">
          <Button className="w-full" variant="secondary">
            <TrendingUp className="h-4 w-4 mr-2" />
            Remittances
          </Button>
        </Link>
      </div>

      {/* Recent Vehicles */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicles.length > 0 ? (
            <div className="space-y-4">
              {vehicles.map((vehicle: any) => (
                <div key={vehicle._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{vehicle.registrationNumber}</p>
                    <p className="text-sm text-gray-500">{vehicle.route}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    vehicle.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No vehicles yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
