import React from 'react';
import { Trash2, Calendar, Tag } from 'lucide-react';

const categoryColors = {
  Food: 'bg-orange-100 text-orange-800 border-orange-200',
  Transport: 'bg-blue-100 text-blue-800 border-blue-200',
  Entertainment: 'bg-purple-100 text-purple-800 border-purple-200',
  Shopping: 'bg-pink-100 text-pink-800 border-pink-200',
  Bills: 'bg-red-100 text-red-800 border-red-200',
  Health: 'bg-green-100 text-green-800 border-green-200',
  Other: 'bg-gray-100 text-gray-800 border-gray-200'
};

export const ExpenseList = ({ expenses, onDeleteExpense, selectedCategory }) => {
  const filteredExpenses = selectedCategory === 'All' 
    ? expenses 
    : expenses.filter(expense => expense.category === selectedCategory);

  if (filteredExpenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
        <div className="text-gray-400 text-6xl mb-4">💸</div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">No expenses yet</h3>
        <p className="text-gray-500">Start tracking your expenses by adding one above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">
          {selectedCategory === 'All' ? 'All Expenses' : `${selectedCategory} Expenses`}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {filteredExpenses.map((expense) => (
          <div
            key={expense.id}
            className="p-6 hover:bg-gray-50 transition-colors duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-medium text-gray-900 truncate">
                    {expense.description}
                  </h4>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[expense.category]}`}>
                    <Tag className="w-3 h-3 mr-1" />
                    {expense.category}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(expense.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onDeleteExpense(expense._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Delete expense"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
