"use client";

import React from "react";
import { 
  Trophy, 
  BrainCircuit, 
  Map, 
  FileCheck, 
  Github, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowUpRight,
  Flame,
  Zap,
  Target
} from "lucide-react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const skillRadarData = [
  { subject: 'Python / Backend', A: 90, fullMark: 100 },
  { subject: 'LLM & Prompting', A: 85, fullMark: 100 },
  { subject: 'RAG & Vector DB', A: 78, fullMark: 100 },
  { subject: 'System Design', A: 70, fullMark: 100 },
  { subject: 'React / Next.js', A: 88, fullMark: 100 },
  { subject: 'DevOps / Docker', A: 65, fullMark: 100 },
];

const progressData = [
  { week: 'Week 1', score: 55 },
  { week: 'Week 2', score: 62 },
  { week: 'Week 3', score: 71 },
  { week: 'Week 4', score: 79 },
  { week: 'Week 5', score: 84 },
];

export const DashboardView: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/60 via-slate-900 to-indigo-950 p-6 md:p-8 border border-purple-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium">
              <Sparkles size={14} className="text-purple-400" />
              <span>Phase 3 Real-time AI Career Assistant Active</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, Nikhil! 🚀
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Your overall readiness for <span className="text-purple-300 font-semibold">Senior AI Engineer</span> is at <span className="text-emerald-400 font-bold">84%</span>. Complete today's vector search optimization task to hit 86%.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => onNavigate("interview")}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
            >
              <MessageSquare size={16} />
              <span>Start AI Mock Interview</span>
            </button>
            <button 
              onClick={() => onNavigate("roadmap")}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 flex items-center gap-2 transition-all"
            >
              <Map size={16} />
              <span>View Active Roadmap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Overall Career Match</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Trophy size={18} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">84%</div>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +5% from last week
            </p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Resume ATS Score</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <FileCheck size={18} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">92 / 100</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Updated 2 days ago • Tech Skills verified
            </p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">GitHub Portfolio Score</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Github size={18} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">88 / 100</div>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <Flame size={12} /> 14 day commit streak
            </p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Interview Readiness</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Zap size={18} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">78% (Intermediate)</div>
            <p className="text-[11px] text-slate-400 mt-1">
              3 mock sessions completed
            </p>
          </div>
        </div>
      </div>

      {/* Grid Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Skill Matrix */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Target size={16} className="text-purple-400" />
                Target Skill Benchmark (AI Engineer)
              </h3>
              <p className="text-xs text-slate-400">Current skill ratings vs industry threshold</p>
            </div>
            <button 
              onClick={() => onNavigate("skillgap")}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
            >
              Analyze Gaps <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#4b5563" />
                <Radar name="Nikhil" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Career Growth Velocity */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <TrendingUp size={16} className="text-cyan-400" />
                Readiness Progression Trend
              </h3>
              <p className="text-xs text-slate-400">Weekly progress over the last month</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              +29% Total Growth
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" domain={[40, 100]} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Today's Tasks & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock size={16} className="text-amber-400" />
              Today's Personalized Learning Plan
            </h3>
            <button 
              onClick={() => onNavigate("planner")}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium"
            >
              Manage Full Schedule
            </button>
          </div>

          <div className="space-y-3">
            {[
              { id: 1, title: "Optimize RAG Vector Chunking Strategy in ChromaDB", time: "45 mins", category: "AI Engineering", completed: true },
              { id: 2, title: "Review 5 Behavioral Interview STAR Framework Answers", time: "30 mins", category: "Interview Prep", completed: false },
              { id: 3, title: "Update GitHub Repository README for StartupForge AI", time: "25 mins", category: "Portfolio", completed: false },
            ].map(task => (
              <div 
                key={task.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  task.completed 
                    ? "bg-slate-900/40 border-slate-800/60 opacity-60" 
                    : "bg-slate-900/80 border-slate-800 hover:border-purple-500/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className={task.completed ? "text-emerald-400" : "text-slate-600"} />
                  <div>
                    <p className={`text-xs font-medium ${task.completed ? "line-through text-slate-400" : "text-slate-200"}`}>
                      {task.title}
                    </p>
                    <span className="text-[10px] text-purple-400 font-medium">{task.category}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-1 rounded-md">{task.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Mentor Quick Insight */}
        <div className="glass-card p-6 rounded-2xl space-y-4 bg-gradient-to-b from-purple-950/20 to-slate-900">
          <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
            <Sparkles size={18} className="text-purple-400" />
            <span>AI Mentor Advisory</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "Nikhil, your technical score in FastAPI and Python is strong. To reach top 5% candidate standing for Senior AI roles, focus on system design for multi-tenant vector databases and latency budget optimization."
          </p>
          <div className="pt-2">
            <button 
              onClick={() => onNavigate("chatbot")}
              className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-medium transition-all"
            >
              Ask AI Mentor a Question →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
