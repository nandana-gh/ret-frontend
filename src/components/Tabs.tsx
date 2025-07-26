import React from 'react';
import { FileText, Eye, Network, BarChart3, MessageCircle } from 'lucide-react';

const Tabs: React.FC<{
  activeTab: string;
  setActiveTab: (id: 'input' | 'propositions' | 'graph' | 'dashboard' | 'chat') => void;
  isDark: boolean;
}> = ({ activeTab, setActiveTab, isDark }) => {
  const tabs = [
    { id: 'input', label: 'Input', icon: FileText },
    { id: 'propositions', label: 'Propositions', icon: Eye },
    { id: 'graph', label: 'Relations Graph', icon: Network },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'chat', label: 'Chat', icon: MessageCircle }
  ];

  return (
    <nav className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : `border-transparent ${isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Tabs;