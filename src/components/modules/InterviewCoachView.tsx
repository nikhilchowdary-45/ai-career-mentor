"use client";

import React, { useState } from "react";
import { MessageSquareCode, Send, Sparkles, User, RefreshCw, Trophy, Zap } from "lucide-react";
import { UserSession } from "@/lib/types";

export const InterviewCoachView: React.FC<{ userData?: UserSession | null }> = ({ userData }) => {
  const studentName = userData?.fullName || "Candidate";
  const targetRole = userData?.targetRole || "AI Engineer & RAG Specialist";
  const userStage = userData?.userRole || "Student";

  const [messages, setMessages] = useState<Array<{ sender: "ai" | "user"; text: string; score?: number }>>([
    {
      sender: "ai",
      text: `Hello ${studentName}! I am your AI Technical Interviewer tailored specifically for your target role: ${targetRole} (${userStage} level).\n\nFirst Customized Question: For a ${userStage} entering ${targetRole}, how do you evaluate chunking overlap strategies in ChromaDB when handling continuous technical documentation?`
    }
  ]);
  const [input, setInput] = useState("");
  const [evaluating, setEvaluating] = useState(false);

  const handleSend = () => {
    if (!input.trim() || evaluating) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setEvaluating(true);

    setTimeout(() => {
      setEvaluating(false);
      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: `Great explanation, ${studentName}! You accurately addressed token boundaries and vector search recall optimization. Score: 9/10.\n\nFollow-up Question tailored for ${targetRole}: How would you implement a fallback strategy in FastAPI when vector index queries exceed a 300ms latency threshold?`,
          score: 9
        }
      ]);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-purple-500/20 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <MessageSquareCode size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Personalized AI Technical Interview Coach</h2>
              <p className="text-xs text-slate-400">Candidate: {studentName} • Target: {targetRole} ({userStage})</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Zap size={14} /> Session Score: 9.0 / 10
          </div>
        </div>

        {/* Chat Window */}
        <div className="h-96 overflow-y-auto space-y-4 pr-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`
                h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${m.sender === "ai" ? "bg-purple-600 text-white" : "bg-cyan-600 text-white"}
              `}>
                {m.sender === "ai" ? <Sparkles size={14} /> : <User size={14} />}
              </div>

              <div className={`
                max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2
                ${m.sender === "ai" 
                  ? "bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none" 
                  : "bg-purple-600 text-white rounded-tr-none"}
              `}>
                <p className="whitespace-pre-line">{m.text}</p>
                {m.score && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 font-medium text-[10px]">
                    <Trophy size={10} /> AI Score: {m.score}/10
                  </div>
                )}
              </div>
            </div>
          ))}

          {evaluating && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <RefreshCw size={14} className="animate-spin text-purple-400" />
              <span>AI Technical Lead is evaluating answer against {targetRole} rubric...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your technical response..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button 
            onClick={handleSend}
            disabled={evaluating || !input.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            <span>Submit</span>
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
