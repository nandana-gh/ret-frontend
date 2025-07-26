import React from 'react';

interface RelationSummaryProps {
  relations: any[];
  isDark: boolean;
}

const RelationSummary: React.FC<RelationSummaryProps> = ({ relations, isDark }) => {
  const getColorClasses = (type: string) => {
    return type === 'contradictory'
      ? 'bg-red-100 text-red-800'
      : type === 'dependent'
      ? 'bg-blue-100 text-blue-800'
      : type === 'biconditional'
      ? 'bg-purple-100 text-purple-800'
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Logical Relations</h3>
      <div className="grid gap-4">
        {relations.map((rel) => (
          <div
            key={rel.id}
            className={`p-4 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(rel.relation_type)}`}>
                {rel.relation_type}
              </span>
              <span className="text-sm text-gray-500">
                Confidence: {(rel.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-sm">{rel.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelationSummary;