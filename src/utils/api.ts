export const analyzeRequirement = async (text: string) => {
    const res = await fetch('http://127.0.0.1:8000/api/analyze-requirement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('Failed to analyze requirement');
    return res.json();
  };
  
  export const analyzeBulk = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('http://127.0.0.1:8000/api/analyze-bulk', {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to analyze bulk requirements');
    return res.json();
  };