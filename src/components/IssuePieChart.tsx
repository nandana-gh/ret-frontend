import React from 'react';
import { Pie } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js';
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
const IssuePieChart: React.FC<{ issueTypes: Record<string, number>; isDark: boolean }> = ({ issueTypes, isDark }) => {
  if (Object.keys(issueTypes).length === 0) {
    return <div className="text-center py-8 text-gray-500">No issues detected</div>;
  }

  const data = {
    labels: Object.keys(issueTypes),
    datasets: [
      {
        data: Object.values(issueTypes),
        backgroundColor: ['#ef4444', '#f59e0b', '#8b5cf6', '#10b981'],
        borderWidth: 2,
        borderColor: isDark ? '#374151' : '#ffffff'
      }
    ]
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <h3 className="text-lg font-semibold mb-4">Issue Types Distribution</h3>
      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              labels: {
                color: isDark ? '#ffffff' : '#000000'
              }
            }
          }
        }}
      />
    </div>
  );
};

export default IssuePieChart;