import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

const RecentAnalyses: React.FC<{
  results: any[];
  isDark: boolean;
  onView: (analysis: any) => void;
  onDelete: (id: string) => void;
}> = ({ results, isDark, onView, onDelete }) => {
  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <h3 className="text-lg font-semibold mb-4">Recent Analyses</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {results.slice(0, 10).map((result) => (
          <div key={result.id} className={`p-3 rounded-lg border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{result.propositions[0]?.text?.substring(0, 50)}...</p>
                <p className="text-xs text-gray-500">
                  {result.propositions.length} propositions, {result.relations.length} relations
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onView(result)}
                  className="p-1 text-blue-500 hover:bg-blue-100 rounded"
                  title="View Analysis"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(result.id)}
                  className="p-1 text-red-500 hover:bg-red-100 rounded"
                  title="Delete Analysis"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAnalyses;
