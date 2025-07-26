import React from 'react';
import { Brain, Sun, Moon } from 'lucide-react';

const Header: React.FC<{ isDark: boolean; toggleDark: () => void }> = ({ isDark, toggleDark }) => (
  <header className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl font-bold">Requirement Elicitation Tool</h1>
        </div>
        <button
          onClick={toggleDark}
          className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  </header>
);
export default Header;