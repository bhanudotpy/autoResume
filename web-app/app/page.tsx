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

  return (
    <main className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Left Panel: Chat */}
      <div className="w-1/2 flex flex-col border-r border-gray-300 bg-white shadow-xl z-10">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h1 className="text-xl font-bold text-gray-800">Resume Optimizer</h1>
          <p className="text-sm text-gray-500">AI-powered assistant</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
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
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24 text-sm text-black"
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
      <div className="w-1/2 flex flex-col bg-gray-200">
        {/* Toolbar */}
        <div className="p-2 bg-white border-b border-gray-300 flex justify-end gap-2 shadow-sm">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Formatted Preview
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            JSON View
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center">
          {viewMode === 'preview' ? (
            <ResumeRenderer data={resumeData} />
          ) : (
            <div className="w-full max-w-[8.5in] bg-white p-6 shadow-lg rounded text-sm font-mono overflow-auto">
              <pre>{JSON.stringify(resumeData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
