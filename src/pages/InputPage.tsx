import React, { useState } from 'react';
import RequirementInput from '../components/RequirementInput';
import SampleRequirements from '../components/SampleRequirements';
import { analyzeRequirement } from '../utils/api';
import { useResult } from '../context/ResultContext';
import toast from 'react-hot-toast';

const sampleTexts = [
  'The system shall notify users via email and SMS if a login attempt fails three times.',
  'The heater shall turn on when the room becomes cold and shall turn off once it reaches a comfortable temperature.',
  'The robot shall move quickly to the target location and avoid any obstacles it might encounter.'
];
function splitCompoundSentences(text: string): string[] {
    const compoundKeywords = /\b(?:and|or|but|nor|either|neither|yet)\b/i;
    return text
      .split('\n')
      .flatMap(line => line.split(compoundKeywords))
      .map(s => s.trim())
      .filter(Boolean);
  }
const InputPage: React.FC<{ isDark: boolean; setActiveTab: (tab: string) => void }> = ({ isDark, setActiveTab }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { setResult } = useResult();

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const data = await analyzeRequirement(text);

      const validScores = data.propositions
        .map((p: any) => p.quality_score)
        .filter((score: number) => typeof score === 'number');

      const averageQuality = validScores.length > 0
        ? validScores.reduce((a: number, b: number) => a + b, 0) / validScores.length
        : 0;

      setResult({
        propositions: data.propositions,
        relations: data.relations,
        stats: { average_quality: averageQuality }
      });

      setActiveTab('dashboard');
    } catch (err) {
      toast.error('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      const fullText = await file.text();
      const data = await analyzeRequirement(fullText);

      const validScores = data.propositions
        .map((p: any) => p.quality_score)
        .filter((score: number) => typeof score === 'number');

      const averageQuality = validScores.length > 0
        ? validScores.reduce((a: number, b: number) => a + b, 0) / validScores.length
        : 0;

      setResult({
        propositions: data.propositions,
        relations: data.relations,
        stats: { average_quality: averageQuality }
      });

      setText(fullText);
      setActiveTab('dashboard');
    } catch (err) {
      toast.error('File analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Analyze Requirements</h2>
      <SampleRequirements samples={sampleTexts} isDark={isDark} onSelect={setText} />
      <RequirementInput
        requirementText={text}
        isDark={isDark}
        loading={loading}
        onChange={setText}
        onAnalyze={handleAnalyze}
        onUpload={handleFileUpload}
      />
    </div>
  );
};

export default InputPage;