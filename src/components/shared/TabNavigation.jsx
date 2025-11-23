import React from 'react';

const TabNavigation = ({ tabs, activeTab, onTabChange, className = '' }) => {
  return (
    <div className={`flex space-x-1 bg-gray-100 p-1 rounded-lg ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === tab.id
              ? 'bg-white text-coral shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
          {tab.count && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
