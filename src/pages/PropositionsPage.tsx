import React from 'react';
import PropositionTable from '../components/PropositionTable';
import { useResult } from '../context/ResultContext';

const PropositionsPage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const { propositions } = useResult();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Propositions</h2>
      {propositions.length > 0 ? (
        <PropositionTable propositions={propositions} isDark={isDark} />
      ) : (
        <p className="text-gray-500">No propositions available. Please analyze a requirement.</p>
      )}
    </div>
  );
};

export default PropositionsPage;