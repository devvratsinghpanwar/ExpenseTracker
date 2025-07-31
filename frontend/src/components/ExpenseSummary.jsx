import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

export const ExpenseSummary = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const todayExpenses = expenses
    .filter(expense => expense.date === new Date().toISOString().split('T')[0])
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyExpenses = expenses
    .filter(expense => expense.date.startsWith(currentMonth))
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Expenses</p>
            <p className="text-3xl font-bold mt-2">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-blue-500 p-3 rounded-xl">
            <DollarSign className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">This Month</p>
            <p className="text-3xl font-bold mt-2">${monthlyExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-green-500 p-3 rounded-xl">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Today</p>
            <p className="text-3xl font-bold mt-2">${todayExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-purple-500 p-3 rounded-xl">
            <Calendar className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};
