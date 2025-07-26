import React, { useEffect, useRef } from 'react';

interface NetworkGraphProps {
  relations: any[];
  isDark: boolean;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ relations, isDark }) => {
  const networkRef = useRef<HTMLDivElement>(null);

  const colorMap: Record<string, string> = {
    contradictory: 'bg-red-500',
    dependent: 'bg-blue-500',
    biconditional: 'bg-purple-500'
  };

  useEffect(() => {
    if (!relations.length || !networkRef.current) return;
    const container = networkRef.current;
    container.innerHTML = `
      <div class="p-4 text-left space-y-3">
        ${relations
          .map(
            (rel) => `
          <div class="p-3 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full ${colorMap[rel.relation_type] || 'bg-gray-400'}"></span>
                <span class="text-sm font-medium">${rel.relation_type}</span>
              </div>
              <span class="text-sm text-gray-500">${(rel.confidence * 100).toFixed(0)}% confidence</span>
            </div>
            <p class="text-sm">${rel.explanation}</p>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }, [relations, isDark]);

  return (
    <div
      ref={networkRef}
      className={`w-full min-h-[20rem] max-h-[32rem] overflow-y-auto border rounded-lg ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-200 bg-white'}`}
    ></div>
  );
};

export default NetworkGraph;