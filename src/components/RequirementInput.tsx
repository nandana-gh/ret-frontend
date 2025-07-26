import React from 'react';
import { Play, RefreshCw, Upload } from 'lucide-react';

interface RequirementInputProps {
  requirementText: string;
  isDark: boolean;
  loading: boolean;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  onUpload: (file: File) => void;
}

const RequirementInput: React.FC<RequirementInputProps> = ({ requirementText, isDark, loading, onChange, onAnalyze, onUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium">Enter Requirement Text</label>
        <textarea
          value={requirementText}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your requirement statement here..."
          className={`w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        />
        <button
          onClick={onAnalyze}
          disabled={loading || !requirementText.trim()}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          <span>{loading ? 'Analyzing...' : 'Analyze Requirement'}</span>
        </button>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-3">Bulk Analysis</h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
            <Upload className="h-4 w-4" />
            <span>Upload Text File</span>
            <input type="file" accept=".txt" onChange={handleFileChange} className="hidden" disabled={loading} />
          </label>
          <span className="text-sm text-gray-500">Upload a .txt file with one requirement per line</span>
        </div>
      </div>
    </div>
  );
};

export default RequirementInput;