import React from 'react';

interface SampleRequirementsProps {
  samples: string[];
  isDark: boolean;
  onSelect: (text: string) => void;
}

const SampleRequirements: React.FC<SampleRequirementsProps> = ({ samples, isDark, onSelect }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Sample Requirements (Click to Use)</h3>
      <div className="grid gap-3">
        {samples.map((req, index) => (
          <button
            key={index}
            onClick={() => onSelect(req)}
            className={`text-left p-3 rounded-lg border ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
          >
            <span className="text-sm text-blue-500 font-mono">Sample {index + 1}:</span>
            <p className="mt-1">{req}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SampleRequirements;
