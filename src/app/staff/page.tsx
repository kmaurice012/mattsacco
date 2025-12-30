'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, Plus, Search, UserCheck, UserX } from 'lucide-react';

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'drivers' | 'conductors'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const staff = [
    {
      id: '1',
      name: 'John Doe',
      role: 'conductor',
      phone: '+254 712 345 678',
      nationalId: '12345678',
      assignedVehicle: 'KCA 123A',
      status: 'active',
      hireDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'James Kamau',
      role: 'driver',
      phone: '+254 723 456 789',
      nationalId: '23456789',
      assignedVehicle: 'KCA 123A',
      status: 'active',
      hireDate: '2024-01-15',
    },
    {
      id: '3',
      name: 'Jane Smith',
      role: 'conductor',
      phone: '+254 734 567 890',
      nationalId: '34567890',
      assignedVehicle: 'KCB 456B',
      status: 'active',
      hireDate: '2024-02-20',
    },
    {
      id: '4',
      name: 'Peter Mwangi',
      role: 'driver',
      phone: '+254 745 678 901',
      nationalId: '45678901',
      assignedVehicle: 'KCB 456B',
      status: 'active',
      hireDate: '2024-02-20',
    },
    {
      id: '5',
      name: 'Mike Johnson',
      role: 'conductor',
      phone: '+254 756 789 012',
      nationalId: '56789012',
      assignedVehicle: 'KCC 789C',
      status: 'active',
      hireDate: '2024-03-10',
    },
    {
      id: '6',
      name: 'Sarah Williams',
      role: 'driver',
      phone: '+254 767 890 123',
      nationalId: '67890123',
      assignedVehicle: 'KCC 789C',
      status: 'inactive',
      hireDate: '2024-03-10',
    },
  ];

  const filteredStaff = staff.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.phone.includes(searchQuery) ||
                         member.assignedVehicle?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && member.role === activeTab.slice(0, -1); // Remove 's' from tab name
  });

  const stats = {
    totalStaff: staff.length,
    activeStaff: staff.filter(s => s.status === 'active').length,
    drivers: staff.filter(s => s.role === 'driver').length,
    conductors: staff.filter(s => s.role === 'conductor').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-500 mt-1">Manage drivers, conductors, and other staff</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalStaff}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Staff</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.activeStaff}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600">Drivers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.drivers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600">Conductors</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.conductors}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, or vehicle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'all' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('all')}
              >
                All Staff
              </Button>
              <Button
                variant={activeTab === 'drivers' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('drivers')}
              >
                Drivers
              </Button>
              <Button
                variant={activeTab === 'conductors' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('conductors')}
              >
                Conductors
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <Card key={member.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  member.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {member.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="text-gray-900 font-medium">{member.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">National ID:</span>
                  <span className="text-gray-900 font-medium">{member.nationalId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="text-gray-900 font-medium">{member.assignedVehicle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hire Date:</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(member.hireDate).toLocaleDateString('en-KE')}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                <Button size="sm" variant="secondary" className="flex-1">
                  Edit
                </Button>
                <Button size="sm" variant="secondary" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No staff members found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
