'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RemittancePage() {
  // Mock data
  const remittances = [
    {
      id: '1',
      vehicle: 'KCA 123A',
      conductor: 'John Doe',
      date: '2025-11-03',
      totalCollected: 12500,
      saccoShare: 3750,
      ownerShare: 6250,
      fuel: 1500,
      otherExpenses: 1000,
      status: 'verified',
    },
    {
      id: '2',
      vehicle: 'KCB 456B',
      conductor: 'Jane Smith',
      date: '2025-11-03',
      totalCollected: 15200,
      saccoShare: 4560,
      ownerShare: 7600,
      fuel: 2040,
      otherExpenses: 1000,
      status: 'completed',
    },
    {
      id: '3',
      vehicle: 'KCC 789C',
      conductor: 'Mike Johnson',
      date: '2025-11-03',
      totalCollected: 8900,
      saccoShare: 2670,
      ownerShare: 4450,
      fuel: 1200,
      otherExpenses: 580,
      status: 'pending',
    },
  ];

  const summary = {
    totalCollected: 36600,
    totalSaccoShare: 10980,
    totalOwnerShare: 18300,
    totalExpenses: 7320,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Remittance</h1>
          <p className="text-gray-500 mt-1">Track payments to sacco and vehicle owners</p>
        </div>
        <Button>
          <TrendingUp className="h-4 w-4 mr-2" />
          Process Remittances
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Collected</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(summary.totalCollected)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sacco Share (30%)</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {formatCurrency(summary.totalSaccoShare)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600">Owner Share (50%)</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {formatCurrency(summary.totalOwnerShare)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {formatCurrency(summary.totalExpenses)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Remittances Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Remittances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Vehicle</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Conductor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total Collected</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sacco Share</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Owner Share</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Expenses</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {remittances.map((remittance) => (
                  <tr key={remittance.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{remittance.vehicle}</td>
                    <td className="py-4 px-4 text-gray-700">{remittance.conductor}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {formatCurrency(remittance.totalCollected)}
                    </td>
                    <td className="py-4 px-4 text-green-600 font-medium">
                      {formatCurrency(remittance.saccoShare)}
                    </td>
                    <td className="py-4 px-4 text-purple-600 font-medium">
                      {formatCurrency(remittance.ownerShare)}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {formatCurrency(remittance.fuel + remittance.otherExpenses)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium w-fit ${
                        remittance.status === 'verified'
                          ? 'bg-green-100 text-green-700'
                          : remittance.status === 'completed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {remittance.status === 'verified' && <CheckCircle2 className="h-3 w-3" />}
                        {remittance.status === 'pending' && <AlertCircle className="h-3 w-3" />}
                        {remittance.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="secondary">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Sacco Share</p>
                  <p className="font-medium text-gray-900">30% of collections</p>
                </div>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(summary.totalSaccoShare)}
                </p>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Owner Share</p>
                  <p className="font-medium text-gray-900">50% of collections</p>
                </div>
                <p className="text-xl font-bold text-purple-600">
                  {formatCurrency(summary.totalOwnerShare)}
                </p>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Expenses</p>
                  <p className="font-medium text-gray-900">Fuel & Others</p>
                </div>
                <p className="text-xl font-bold text-orange-600">
                  {formatCurrency(summary.totalExpenses)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Verify Collections</p>
                  <p className="text-gray-600 mt-1">Ensure all fare collections are accurately recorded and verified</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Calculate Shares</p>
                  <p className="text-gray-600 mt-1">System automatically calculates sacco and owner shares</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Process Payments</p>
                  <p className="text-gray-600 mt-1">Transfer funds via M-PESA to respective accounts</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
