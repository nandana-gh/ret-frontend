import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface PropositionTableProps {
  propositions: any[];
  isDark: boolean;
}

const PropositionTable: React.FC<PropositionTableProps> = ({ propositions, isDark }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <th className="px-4 py-3 text-left text-sm font-medium">Label</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Proposition</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Quality</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Issues</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Negation</th>
          </tr>
        </thead>
        <tbody>
          {propositions.map((prop) => (
            <tr key={prop.id} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <td className="px-4 py-3">
                <span className="font-mono text-sm font-bold text-blue-500">{prop.label}</span>
              </td>
              <td className="px-4 py-3 max-w-md">
                <p className="text-sm">{prop.text}</p>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  prop.type === 'software behavior'
                    ? 'bg-blue-100 text-blue-800'
                    : prop.type === 'condition'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {prop.type}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex space-x-1">
                  {prop.quality_scores &&
                    Object.entries(prop.quality_scores).map(([key, score]) => (
                      <div
                        key={key}
                        className={`w-3 h-3 rounded-full ${
                          score >= 0.8 ? 'bg-green-500' : score >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        title={`${key}: ${(score * 100).toFixed(0)}%`}
                      />
                    ))}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex space-x-1">
                  {prop.detected_issues.map((issue: string) => (
                    <span
                      key={issue}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >
                      {issue === 'ambiguity' && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {issue === 'vagueness' && <XCircle className="h-3 w-3 mr-1" />}
                      {issue === 'inconsistency' && <XCircle className="h-3 w-3 mr-1" />}
                      {issue}
                    </span>
                  ))}
                  {prop.detected_issues.length === 0 && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
              </td>
              <td className="px-4 py-3 max-w-xs">
                <p className="text-sm text-gray-500 " title={prop.best_negation}>
                  {prop.best_negation}
                </p>
                <span
                  className={`text-xs ${
                    prop.can_coexist_with_negation ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {prop.can_coexist_with_negation ? 'Can coexist' : 'Cannot coexist'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropositionTable;