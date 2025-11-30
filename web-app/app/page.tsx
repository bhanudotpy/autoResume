'use client';

import React, { useState, useRef, useEffect } from 'react';
import ResumeRenderer from '../components/ResumeRenderer';
import { ResumeData } from '../types/resume';

type Step = 'JD_INPUT' | 'RESUME_INPUT' | 'REFINING';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [step, setStep] = useState<Step>('JD_INPUT');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI Resume Optimizer. To get started, please paste the Job Description (JD) you are applying for.' }
  ]);
  const [input, setInput] = useState('');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [rulebook, setRulebook] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'json'>('preview');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (step === 'JD_INPUT') {
        // Generate Rulebook
        const response = await fetch('/api/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'generate_rulebook', payload: { jd_text: userMessage } }),
        });
        const data = await response.json();
        setRulebook(data.result);
        setStep('RESUME_INPUT');
        setMessages(prev => [...prev, { role: 'assistant', content: 'Great! I have analyzed the JD and created a rulebook. Now, please paste your current Resume in JSON format.' }]);
      } else if (step === 'RESUME_INPUT') {
        // Optimize Resume
        let resumeJson;
        try {
          const cleanInput = userMessage.replace(/```json/g, '').replace(/```/g, '').trim();
          resumeJson = JSON.parse(cleanInput);
        } catch (e) {
          console.error("JSON Parse Error:", e);
          setMessages(prev => [...prev, { role: 'assistant', content: 'That doesn\'t look like valid JSON. Please try again. Make sure to paste just the JSON object.' }]);
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'optimize_resume',
            payload: { rulebook_text: rulebook, resume_json: resumeJson }
          }),
        });
        const data = await response.json();
        console.log('Optimize Resume Response:', data);
        if (data.result) {
          setResumeData(data.result);
          setStep('REFINING');
          setMessages(prev => [...prev, { role: 'assistant', content: 'I have created an initial optimized draft based on the JD. You can see the preview on the right. How would you like to refine it? (e.g., "Make the summary more concise", "Add a skill")' }]);
        } else {
          console.error('No result in response:', data);
          setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong generating the resume. Please try again.' }]);
        }
      } else if (step === 'REFINING') {
        // Chat Refine
        const response = await fetch('/api/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'chat_refine',
            payload: {
              current_resume_json: resumeData,
              user_instruction: userMessage,
              rulebook_text: rulebook
            }
          }),
        });
        const data = await response.json();
        console.log('Chat Refine Response:', data);
        if (data.result) {
          setResumeData(data.result);
          setMessages(prev => [...prev, { role: 'assistant', content: 'I have updated the resume based on your feedback.' }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Failed to update resume.' }]);
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadDocx = async () => {
    if (!resumeData) return;
    
    try {
      const response = await fetch('/api/download-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeJson: resumeData }),
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Extract filename from header if possible, or generate one
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `Bhanu_${new Date().toISOString().slice(0,10)}.docx`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) filename = match[1];
      }
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  return (
    <main className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Left Panel: Chat */}
      <div className="flex-1 flex flex-col border-r border-gray-700 bg-gray-900 shadow-xl z-10">
        <div className="p-4 border-b border-gray-700 bg-gray-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white">Resume Optimizer</h1>
            <p className="text-sm text-gray-400">AI-powered assistant</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadDocx}
              disabled={!resumeData}
              className="px-3 py-1 rounded text-xs font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Download Word
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${viewMode === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${viewMode === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              JSON
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-700 bg-gray-900">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={step === 'JD_INPUT' ? "Paste Job Description..." : step === 'RESUME_INPUT' ? "Paste Resume JSON..." : "Type your instruction..."}
              className="flex-1 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24 text-sm text-white bg-gray-800 placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Resume Preview */}
      <div className="w-[8.5in] flex-none flex flex-col bg-gray-200">
        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {viewMode === 'preview' ? (
            <ResumeRenderer
              data={resumeData}
              onDataChange={(newData) => setResumeData(newData)}
            />
          ) : (
            <div className="w-full h-full bg-white p-6 text-sm font-mono overflow-auto text-black">
              <pre>{JSON.stringify(resumeData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
