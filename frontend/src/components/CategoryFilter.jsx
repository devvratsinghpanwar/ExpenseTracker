import React from 'react';
import { Filter } from 'lucide-react';

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  expenseCounts
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Filter className="w-5 h-5 text-blue-600" />
        Filter by Category
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
            {expenseCounts[category] > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                selectedCategory === category
                  ? 'bg-blue-500 text-blue-100'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {expenseCounts[category]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
