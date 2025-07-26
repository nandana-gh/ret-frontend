import React from 'react';
// import RelationSummary from '../components/RelationSummary';
import NetworkGraph from '../components/NetworkGraph';
import { useResult } from '../context/ResultContext';

const GraphPage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const { relations } = useResult();

  return (
    <div className={`space-y-6 min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-4 rounded-xl overflow-x-hidden`}>
      <h2 className="text-2xl font-bold">Relations Graph</h2>
      {relations.length > 0 ? (
        <>
          

          <div className="p-4 rounded-xl border flex-col border-dashed border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 w-full overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Logical Relations Network</h3>
            <div className="mb-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Contradictory</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Dependent</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span> Biconditional</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-100"></span> Disjoint</span>
            </div>
            <NetworkGraph relations={relations} isDark={isDark} />
          </div>
        </>
      ) : (
        <p className="text-gray-500">No relations found. Try analyzing a new input.</p>
      )}
    </div>
  );
};

export default GraphPage;