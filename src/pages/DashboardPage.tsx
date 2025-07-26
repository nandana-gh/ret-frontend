import React from 'react';
import StatsCards from '../components/StatsCards';
import IssuePieChart from '../components/IssuePieChart';
import { useResult } from '../context/ResultContext';
import toast from 'react-hot-toast';

const DashboardPage: React.FC<{ isDark: boolean; setActiveTab: (tab: string) => void }> = ({ isDark, setActiveTab }) => {
  const { propositions, relations, stats } = useResult();

  const issueTypes = propositions.reduce((acc: Record<string, number>, prop: any) => {
    for (const issue of prop.detected_issues || []) {
      acc[issue] = (acc[issue] || 0) + 1;
    }
    return acc;
  }, {});

  const handleReportDownload = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propositions,
          relations,
          stats
        })
      });

      if (!res.ok) {
        throw new Error('Report generation failed');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'requirement_report.xlsx';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error('Could not generate report');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      {propositions.length > 0 ? (
        <>
          <StatsCards
            stats={{
              totalProps: propositions.length,
              totalIssues: Object.values(issueTypes).reduce((a, b) => a + b, 0),
              totalRelations: relations.length,
              averageQuality: stats?.average_quality || 0
            }}
            isDark={isDark}
          />
          <IssuePieChart issueTypes={issueTypes} isDark={isDark} />
          <div className="pt-4">
            <button
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              onClick={handleReportDownload}
            >
              Generate Report
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No data available. Please analyze some requirements.</p>
      )}
    </div>
  );
};

export default DashboardPage;
