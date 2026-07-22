"use client";

import React, { useState } from "react";
import { Map, CheckCircle2, Circle, BookOpen, Code, Clock, Sparkles, ChevronDown, ChevronUp, Layers } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  skills: string[];
  projects: string[];
  courses: string[];
  completed: boolean;
}

export const RoadmapView: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>("m1");

  const milestones: Milestone[] = [
    {
      id: "m1",
      title: "Foundations of Python & Dynamic FastAPI Backend",
      level: "Beginner",
      duration: "3 Weeks",
      skills: ["Python 3.11+", "FastAPI Async Architecture", "SQLAlchemy 2.0 ORM", "PostgreSQL & Migrations"],
      projects: ["High-Performance RESTful Microservice API with JWT Auth"],
      courses: ["FastAPI Masterclass - Building Production APIs"],
      completed: true
    },
    {
      id: "m2",
      title: "Vector Databases & Semantic RAG Pipeline",
      level: "Intermediate",
      duration: "4 Weeks",
      skills: ["ChromaDB / Qdrant Integration", "OpenAI Embeddings API", "Chunking & Document Splitting", "LangChain Retrieval Chains"],
      projects: ["Enterprise Knowledge Base PDF RAG Search Engine"],
      courses: ["LangChain & Vector Databases for Developers"],
      completed: true
    },
    {
      id: "m3",
      title: "Multi-Agent System Orchestration & Autonomous Tools",
      level: "Advanced",
      duration: "5 Weeks",
      skills: ["LangGraph State Machine", "Tool Calling & Schema Validation", "Conversational Memory Management", "LLM Evaluation (Ragas / Trulens)"],
      projects: ["Multi-Agent AI Career Coach & Automated Code Reviewer Platform"],
      courses: ["Advanced Autonomous AI Agents Engineering"],
      completed: false
    }
  ];

  const filteredMilestones = activeLevel === "All" 
    ? milestones 
    : milestones.filter(m => m.level === activeLevel);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-purple-500/20 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <Map size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Dynamic AI Roadmap Generator</h2>
              <p className="text-xs text-slate-400">Target Role: Senior AI Architect • 12 Weeks Estimated</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeLevel === level 
                    ? "bg-purple-600 text-white shadow-sm" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Milestone Vertical DAG Nodes */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-indigo-500 before:to-slate-800">
          {filteredMilestones.map((m, index) => {
            const isExpanded = expandedId === m.id;
            return (
              <div key={m.id} className="relative space-y-3">
                {/* Node Icon Indicator */}
                <div className={`
                  absolute -left-6 top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center bg-slate-950 transition-all
                  ${m.completed ? "border-emerald-400 text-emerald-400" : "border-purple-500 text-purple-400"}
                `}>
                  {m.completed ? <CheckCircle2 size={12} /> : <Circle size={10} />}
                </div>

                <div className="glass-card p-5 rounded-xl border border-slate-800 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : m.id)}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          m.level === "Beginner" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                          m.level === "Intermediate" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                          "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        }`}>
                          {m.level}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={12} /> {m.duration}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white">{m.title}</h3>
                    </div>

                    <button className="p-1 text-slate-400 hover:text-white">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-4 text-xs">
                      <div>
                        <h4 className="font-semibold text-purple-300 flex items-center gap-1.5 mb-2">
                          <Layers size={14} /> Core Competencies & Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {m.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-slate-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                          <h5 className="font-semibold text-cyan-300 flex items-center gap-1">
                            <Code size={13} /> Milestone Hands-on Project
                          </h5>
                          {m.projects.map((proj, pIdx) => (
                            <p key={pIdx} className="text-slate-300">{proj}</p>
                          ))}
                        </div>

                        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                          <h5 className="font-semibold text-indigo-300 flex items-center gap-1">
                            <BookOpen size={13} /> Curated Learning Resource
                          </h5>
                          {m.courses.map((course, cIdx) => (
                            <p key={cIdx} className="text-slate-300">{course}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
