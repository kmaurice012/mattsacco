'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatTime } from '@/lib/utils';
import { Wallet, Car, Plus, Filter } from 'lucide-react';

export default function FareCollectionPage() {
  const [showForm, setShowForm] = useState(false);

  // Mock data
  const collections = [
    {
      id: '1',
      vehicle: 'KCA 123A',
      conductor: 'John Doe',
      route: 'CBD - Kangemi',
      totalCollected: 12500,
      mpesa: 10000,
      cash: 2500,
      trips: 8,
      startTime: '06:00',
      endTime: '14:30',
      status: 'completed'
    },
    {
      id: '2',
      vehicle: 'KCB 456B',
      conductor: 'Jane Smith',
      route: 'CBD - Thika Road',
      totalCollected: 15200,
      mpesa: 14000,
      cash: 1200,
      trips: 10,
      startTime: '06:30',
      endTime: '15:00',
      status: 'completed'
    },
    {
      id: '3',
      vehicle: 'KCC 789C',
      conductor: 'Mike Johnson',
      route: 'CBD - Westlands',
      totalCollected: 8900,
      mpesa: 7500,
      cash: 1400,
      trips: 6,
      startTime: '07:00',
      status: 'ongoing'
    },
  ];

  const todayStats = {
    totalCollections: 36600,
    totalTrips: 24,
    averagePerTrip: 1525,
    mpesaPercentage: 86,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fare Collection</h1>
          <p className="text-gray-500 mt-1">Track and manage daily fare collections</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Record Collection
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Collections</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(todayStats.totalCollections)}
                </p>
              </div>
              <Wallet className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600">Total Trips</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {todayStats.totalTrips}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600">Average Per Trip</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(todayStats.averagePerTrip)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600">M-PESA Payments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {todayStats.mpesaPercentage}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collection Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Record New Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Vehicle</option>
                  <option>KCA 123A</option>
                  <option>KCB 456B</option>
                  <option>KCC 789C</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conductor
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Conductor</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Mike Johnson</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  M-PESA Amount
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cash Amount
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Trips
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route
                </label>
                <input
                  type="text"
                  placeholder="e.g., CBD - Kangemi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex gap-3">
                <Button type="submit" className="flex-1">Save Collection</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Collections List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Today's Collections</CardTitle>
            <Button variant="secondary" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Vehicle</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Conductor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Route</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trips</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">M-PESA</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cash</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((collection) => (
                  <tr key={collection.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-medium text-gray-900">{collection.vehicle}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{collection.conductor}</td>
                    <td className="py-4 px-4 text-gray-700">{collection.route}</td>
                    <td className="py-4 px-4 text-gray-700">{collection.trips}</td>
                    <td className="py-4 px-4 text-gray-700">{formatCurrency(collection.mpesa)}</td>
                    <td className="py-4 px-4 text-gray-700">{formatCurrency(collection.cash)}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {formatCurrency(collection.totalCollected)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        collection.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {collection.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
