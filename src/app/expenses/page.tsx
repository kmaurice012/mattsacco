'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { Receipt, Plus } from 'lucide-react';

export default function ExpensesPage() {
  const expenses = [
    {
      id: '1',
      vehicle: 'KCA 123A',
      category: 'fuel',
      amount: 5000,
      description: 'Diesel refill',
      date: '2025-11-03',
    },
    {
      id: '2',
      vehicle: 'KCB 456B',
      category: 'maintenance',
      amount: 12000,
      description: 'Brake pad replacement',
      date: '2025-11-01',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-500 mt-1">Track all operational expenses</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Record Expense
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Receipt className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-sm text-gray-500">
                      {expense.vehicle} • {new Date(expense.date).toLocaleDateString('en-KE')}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(expense.amount)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
