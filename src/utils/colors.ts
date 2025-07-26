// utils/colors.ts

export const propositionTypeColors: Record<string, string> = {
    'software behavior': 'bg-blue-100 text-blue-800',
    'condition': 'bg-yellow-100 text-yellow-800',
    'domain assumption': 'bg-green-100 text-green-800'
  };
  
  export const relationTypeColors: Record<string, string> = {
    'contradictory': 'bg-red-100 text-red-800',
    'dependent': 'bg-blue-100 text-blue-800',
    'biconditional': 'bg-purple-100 text-purple-800'
  };
  
  export const qualityScoreColor = (score: number): string => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  