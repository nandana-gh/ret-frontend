import React from 'react';
import { FileText, AlertTriangle, Network, CheckCircle } from 'lucide-react';

const iconMap = {
  'Total Propositions': FileText,
  'Issues Detected': AlertTriangle,
  'Relations Found': Network,
  'Avg Quality': CheckCircle
};

const StatsCards: React.FC<{ stats: any; isDark: boolean }> = ({ stats, isDark }) => {
  const cards = [
    { label: 'Total Propositions', value: stats.totalProps, color: 'blue' },
    { label: 'Issues Detected', value: stats.totalIssues, color: 'red' },
    { label: 'Relations Found', value: stats.totalRelations, color: 'green' },
    { label: 'Avg Quality', value: `${(stats.averageQuality * 100).toFixed(0)}%`, color: 'purple' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map(({ label, value, color }) => {
        const Icon = iconMap[label as keyof typeof iconMap];
        return (
          <div key={label} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
              <Icon className={`h-8 w-8 text-${color}-500`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
