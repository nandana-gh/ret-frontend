export const generateCSVReport = (propositions: any[], relations: any[]) => {
    const propHeaders = ['Label', 'Text', 'Type', 'Best Negation', 'Coexist', 'Issues'];
    const relHeaders = ['Type', 'Confidence', 'Explanation'];
  
    const propRows = propositions.map((p) => [
      p.label,
      p.text,
      p.type,
      p.best_negation,
      p.can_coexist_with_negation ? 'Yes' : 'No',
      p.detected_issues.join(', ')
    ]);
  
    const relRows = relations.map((r) => [
      r.relation_type,
      (r.confidence * 100).toFixed(1) + '%',
      r.explanation
    ]);
  
    const propSection = [propHeaders, ...propRows].map((row) => row.map(val => `"${val}"`).join(',')).join('\n');
    const relSection = [relHeaders, ...relRows].map((row) => row.map(val => `"${val}"`).join(',')).join('\n');
  
    return `Propositions:\n${propSection}\n\nRelations:\n${relSection}`;
  };
  