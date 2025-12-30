'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Car, Plus } from 'lucide-react';

export default function VehiclesPage() {
  const vehicles = [
    {
      id: '1',
      registrationNumber: 'KCA 123A',
      make: 'Toyota',
      model: 'Hiace',
      year: 2020,
      route: 'CBD - Kangemi',
      status: 'active',
      ownerName: 'John Owner',
    },
    {
      id: '2',
      registrationNumber: 'KCB 456B',
      make: 'Nissan',
      model: 'Caravan',
      year: 2019,
      route: 'CBD - Thika Road',
      status: 'active',
      ownerName: 'Jane Owner',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicles</h1>
          <p className="text-gray-500 mt-1">Manage your fleet of vehicles</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Car className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{vehicle.registrationNumber}</h3>
                    <p className="text-sm text-gray-500">{vehicle.make} {vehicle.model}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {vehicle.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Year:</span>
                  <span className="text-gray-900 font-medium">{vehicle.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="text-gray-900 font-medium">{vehicle.route}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Owner:</span>
                  <span className="text-gray-900 font-medium">{vehicle.ownerName}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button size="sm" variant="secondary" className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
