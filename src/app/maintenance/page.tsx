'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { Wrench, Plus, AlertTriangle, Calendar, CheckCircle } from 'lucide-react';

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState<'scheduled' | 'history'>('scheduled');

  // Mock data
  const scheduledMaintenance = [
    {
      id: '1',
      vehicle: 'KCA 123A',
      type: 'Routine Service',
      dueDate: '2025-11-05',
      description: '5,000 km service - Oil change, filter replacement',
      estimatedCost: 8000,
      priority: 'high',
    },
    {
      id: '2',
      vehicle: 'KCE 345E',
      type: 'Insurance Renewal',
      dueDate: '2025-11-10',
      description: 'Comprehensive insurance renewal',
      estimatedCost: 45000,
      priority: 'medium',
    },
    {
      id: '3',
      vehicle: 'KCF 678F',
      type: 'Inspection',
      dueDate: '2025-11-17',
      description: 'Annual NTSA inspection',
      estimatedCost: 3500,
      priority: 'low',
    },
  ];

  const maintenanceHistory = [
    {
      id: '1',
      vehicle: 'KCB 456B',
      type: 'Repair',
      date: '2025-11-01',
      description: 'Brake pad replacement',
      cost: 12000,
      mechanic: 'Peter Mwangi',
      status: 'completed',
    },
    {
      id: '2',
      vehicle: 'KCC 789C',
      type: 'Routine Service',
      date: '2025-10-28',
      description: 'Oil change and tire rotation',
      cost: 6500,
      mechanic: 'James Kamau',
      status: 'completed',
    },
    {
      id: '3',
      vehicle: 'KCA 123A',
      type: 'Emergency',
      date: '2025-10-25',
      description: 'Engine overheating - radiator repair',
      cost: 18000,
      mechanic: 'Peter Mwangi',
      status: 'completed',
    },
  ];

  const stats = {
    scheduledServices: 3,
    thisMonthCost: 36500,
    vehiclesInMaintenance: 0,
    averageCost: 12167,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Maintenance</h1>
          <p className="text-gray-500 mt-1">Manage vehicle maintenance and service records</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Maintenance
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled Services</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.scheduledServices}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month Cost</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(stats.thisMonthCost)}
                </p>
              </div>
              <Wrench className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600">In Maintenance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.vehiclesInMaintenance}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600">Average Cost</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(stats.averageCost)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'scheduled'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Scheduled Maintenance
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Maintenance History
          </button>
        </div>
      </div>

      {/* Scheduled Maintenance */}
      {activeTab === 'scheduled' && (
        <div className="grid grid-cols-1 gap-4">
          {scheduledMaintenance.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      item.priority === 'high'
                        ? 'bg-red-100'
                        : item.priority === 'medium'
                        ? 'bg-orange-100'
                        : 'bg-yellow-100'
                    }`}>
                      <AlertTriangle className={`h-6 w-6 ${
                        item.priority === 'high'
                          ? 'text-red-600'
                          : item.priority === 'medium'
                          ? 'text-orange-600'
                          : 'text-yellow-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.vehicle}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : item.priority === 'medium'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.priority} priority
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{item.type}</p>
                      <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            Due: {new Date(item.dueDate).toLocaleDateString('en-KE')}
                          </div>
                          <div className="text-gray-900 font-semibold">
                            Est. Cost: {formatCurrency(item.estimatedCost)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary">Reschedule</Button>
                          <Button size="sm">Complete</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Maintenance History */}
      {activeTab === 'history' && (
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Vehicle</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mechanic</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cost</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceHistory.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{record.vehicle}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {record.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{record.description}</td>
                      <td className="py-4 px-4 text-gray-700">
                        {new Date(record.date).toLocaleDateString('en-KE')}
                      </td>
                      <td className="py-4 px-4 text-gray-700">{record.mechanic}</td>
                      <td className="py-4 px-4 font-semibold text-gray-900">
                        {formatCurrency(record.cost)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium w-fit">
                          <CheckCircle className="h-3 w-3" />
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
