'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import {
  Building2,
  Car,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [saccos, setSaccos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'superadmin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, saccosRes] = await Promise.all([
          fetch('/api/superadmin/stats'),
          fetch('/api/saccos'),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (saccosRes.ok) {
          const saccosData = await saccosRes.json();
          setSaccos(saccosData.saccos || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated' && session?.user?.role === 'superadmin') {
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

  if (session?.user?.role !== 'superadmin') {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Platform overview and management</p>
        </div>
        <Link href="/superadmin/saccos/new">
          <Button>
            <Building2 className="h-4 w-4 mr-2" />
            Create New SACCO
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total SACCOs"
          value={stats?.totalSaccos || 0}
          icon={<Building2 className="h-6 w-6 text-blue-600" />}
          subtitle={`${stats?.activeSaccos || 0} active`}
        />
        <StatCard
          title="Total Vehicles"
          value={stats?.totalVehicles || 0}
          icon={<Car className="h-6 w-6 text-green-600" />}
          subtitle="Across all SACCOs"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={<Users className="h-6 w-6 text-purple-600" />}
          subtitle={`${stats?.activeUsers || 0} active`}
        />
        <StatCard
          title="Daily Collections"
          value={formatCurrency(stats?.todayCollections || 0)}
          icon={<DollarSign className="h-6 w-6 text-orange-600" />}
          trend={{ value: stats?.collectionGrowth || 0, isPositive: (stats?.collectionGrowth || 0) > 0 }}
        />
      </div>

      {/* SACCOs List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registered SACCOs</CardTitle>
            <Link href="/superadmin/saccos">
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {saccos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No SACCOs registered yet</p>
                <Link href="/superadmin/saccos/new">
                  <Button className="mt-4">Create Your First SACCO</Button>
                </Link>
              </div>
            ) : (
              saccos.slice(0, 5).map((sacco: any) => (
                <div
                  key={sacco._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{sacco.name}</p>
                      <p className="text-sm text-gray-500">{sacco.location}</p>
                      <p className="text-xs text-gray-400">Reg: {sacco.registrationNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sacco.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : sacco.status === 'suspended'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {sacco.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {sacco.status === 'suspended' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {sacco.status.charAt(0).toUpperCase() + sacco.status.slice(1)}
                      </span>
                    </div>
                    <Link href={`/superadmin/saccos/${sacco._id}`}>
                      <Button size="sm" variant="secondary">
                        Manage
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Today's Trips</span>
                <span className="font-semibold text-gray-900">{stats?.todayTrips || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Pending Remittances</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(stats?.pendingRemittances || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Platform Commission</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(stats?.platformCommission || 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/superadmin/saccos/new">
                <Button className="w-full h-20 flex flex-col items-center justify-center">
                  <Building2 className="h-6 w-6 mb-1" />
                  New SACCO
                </Button>
              </Link>
              <Link href="/superadmin/users">
                <Button className="w-full h-20 flex flex-col items-center justify-center">
                  <Users className="h-6 w-6 mb-1" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/superadmin/audit-logs">
                <Button className="w-full h-20 flex flex-col items-center justify-center">
                  <AlertCircle className="h-6 w-6 mb-1" />
                  Audit Logs
                </Button>
              </Link>
              <Link href="/superadmin/reports">
                <Button className="w-full h-20 flex flex-col items-center justify-center">
                  <TrendingUp className="h-6 w-6 mb-1" />
                  Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
