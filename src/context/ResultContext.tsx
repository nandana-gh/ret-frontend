import React, { createContext, useContext, useState } from 'react';

interface ResultContextType {
  propositions: any[];
  relations: any[];
  stats: any;
  setResult: (data: { propositions: any[]; relations: any[]; stats: any }) => void;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export const ResultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [propositions, setPropositions] = useState<any[]>([]);
  const [relations, setRelations] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});

  const setResult = ({ propositions, relations, stats }: any) => {
    setPropositions(propositions);
    setRelations(relations);
    setStats(stats);
  };

  return (
    <ResultContext.Provider value={{ propositions, relations, stats, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) throw new Error('useResult must be used within a ResultProvider');
  return context;
};