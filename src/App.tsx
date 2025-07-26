import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Tabs from './components/Tabs';
import InputPage from './pages/InputPage';
import PropositionsPage from './pages/PropositionsPage';
import GraphPage from './pages/GraphPage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import { ResultProvider } from './context/ResultContext';

const App = () => {
  const [activeTab, setActiveTab] = useState<'input' | 'propositions' | 'graph' | 'dashboard' | 'chat'>('input');
  const [isDark, setIsDark] = useState(true);

  return (
    <ResultProvider>
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Toaster position="top-right" />
        <Header isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'input' && <InputPage isDark={isDark} setActiveTab={setActiveTab} />}
          {activeTab === 'propositions' && <PropositionsPage isDark={isDark} />}
          {activeTab === 'graph' && <GraphPage isDark={isDark} />}
          {activeTab === 'dashboard' && <DashboardPage isDark={isDark} setActiveTab={setActiveTab} />}
          {activeTab === 'chat' && <ChatPage isDark={isDark} setActiveTab={setActiveTab} />}
        </main>
      </div>
    </ResultProvider>
  );
};

export default App;