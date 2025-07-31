import React, { useState, useEffect } from 'react';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { CategoryFilter } from './CategoryFilter';
import { ExpenseSummary } from './ExpenseSummary';
import { Wallet, LogOut, User } from 'lucide-react';
import { expensesAPI } from '../services/api';

const categories = ['All', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];

export const ExpenseManager = ({ user, onSignOut }) => {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await expensesAPI.getExpenses();
      setExpenses(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch expenses');
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const newExpense = await expensesAPI.addExpense(expenseData);
      setExpenses(prev => [newExpense, ...prev]);
      setError('');
    } catch (err) {
      setError('Failed to add expense');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await expensesAPI.deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  const getExpenseCounts = () => {
    const counts = { All: expenses.length };
    categories.slice(1).forEach(category => {
      counts[category] = expenses.filter(expense => expense.category === category).length;
    });
    return counts;
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading expenses...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
                <p className="text-sm text-gray-600">Track your daily expenses</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button
                onClick={onSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <ExpenseSummary expenses={expenses} />
        <ExpenseForm onAddExpense={addExpense} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          expenseCounts={getExpenseCounts()}
        />
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={deleteExpense}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};
