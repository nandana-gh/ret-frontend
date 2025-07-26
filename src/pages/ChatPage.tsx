import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useResult } from '../context/ResultContext';

const ChatPage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const { propositions } = useResult();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const text = propositions.map((p) => p.text).join('\n');

  const askAI = async () => {
    if (!text || !question) {
      return toast.error('Upload or analyze a requirement first, and enter your question.');
    }

    try {
      setLoading(true);
      const res = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, query: question })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Unknown error');
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err: any) {
      toast.error('Chat failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 min-h-screen">
      <h2 className="text-2xl font-bold">AI Requirement Assistant</h2>

      <div>
        <label className="block mb-1 font-medium">Your Question</label>
        <input
          className="w-full border rounded-lg p-2 bg-transparent"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. What are the vague statements?"
        />
      </div>

      <button
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        onClick={askAI}
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Ask AI'}
      </button>

      {response && (
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
          <h4 className="font-semibold mb-2">AI Response:</h4>
          <pre className="whitespace-pre-wrap text-sm">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
