"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles, User, RefreshCw, BookOpen, Search } from "lucide-react";

export const ChatbotView: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string; sources?: string[] }>>([
    {
      sender: "bot",
      text: "Greetings Nikhil! I am your RAG-powered AI Career Mentor. I have full context of your profile, active roadmaps, and latest industry benchmark data. How can I assist your career progression today?",
      sources: ["Vector Database - ChromaDB", "Curated AI Career Taxonomy 2026"]
    }
  ]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!query.trim() || loading) return;

    const userQuery = query;
    setQuery("");
    setMessages(prev => [...prev, { sender: "user", text: userQuery }]);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "Based on vector search across top tech compensation benchmarks and your verified skills (Python, FastAPI, RAG, React), your expected salary range for a Senior AI Architect in the US is $165,000 - $210,000 / year. Focusing on LangGraph multi-agent deployment will move you to the 90th percentile.",
          sources: ["2026 AI Compensation Index", "Tech Salary Dataset v4"]
        }
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-purple-500/20 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Career Chatbot (RAG Memory Engine)</h2>
              <p className="text-xs text-slate-400">LangChain + ChromaDB Vector Store • Conversational Context Active</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs">
            <Search size={12} /> RAG Retriever Online
          </div>
        </div>

        {/* Message Log */}
        <div className="h-96 overflow-y-auto space-y-4 pr-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`
                h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${m.sender === "bot" ? "bg-purple-600 text-white" : "bg-cyan-600 text-white"}
              `}>
                {m.sender === "bot" ? <Bot size={14} /> : <User size={14} />}
              </div>

              <div className={`
                max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2
                ${m.sender === "bot" 
                  ? "bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none" 
                  : "bg-purple-600 text-white rounded-tr-none"}
              `}>
                <p>{m.text}</p>
                {m.sources && (
                  <div className="pt-2 border-t border-slate-700/60 flex flex-wrap gap-1.5">
                    {m.sources.map((src, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[9px] flex items-center gap-1">
                        <BookOpen size={9} /> {src}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <RefreshCw size={14} className="animate-spin text-purple-400" />
              <span>Querying ChromaDB vector index & synthesizing RAG response...</span>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="flex gap-2">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about salary, roadmaps, interview tips, or GitHub reviews..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !query.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 flex items-center gap-2"
          >
            <span>Ask RAG</span>
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
