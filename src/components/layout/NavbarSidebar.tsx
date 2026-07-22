"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Map, 
  FileText, 
  Github, 
  Linkedin, 
  Target, 
  MessageSquareCode, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Bot, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  LogOut,
  User,
  Menu,
  X
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, category: "Core" },
  { id: "assessment", label: "AI Career Assessment", icon: BrainCircuit, category: "Career Guidance" },
  { id: "roadmap", label: "Dynamic Roadmap", icon: Map, category: "Career Guidance" },
  { id: "resume", label: "Resume Audit & ATS", icon: FileText, category: "Profile Optimization" },
  { id: "github", label: "GitHub Portfolio Audit", icon: Github, category: "Profile Optimization" },
  { id: "linkedin", label: "LinkedIn Optimizer", icon: Linkedin, category: "Profile Optimization" },
  { id: "skillgap", label: "Skill-Gap Matrix", icon: Target, category: "Skills & Preparation" },
  { id: "interview", label: "AI Interview Coach", icon: MessageSquareCode, category: "Skills & Preparation" },
  { id: "projects", label: "Project Engine", icon: Briefcase, category: "Skills & Preparation" },
  { id: "salary", label: "Salary Insights", icon: DollarSign, category: "Career Intelligence" },
  { id: "planner", label: "Daily Planner", icon: Calendar, category: "Career Intelligence" },
  { id: "chatbot", label: "AI Mentor Chatbot", icon: Bot, category: "Career Intelligence" },
  { id: "admin", label: "Admin & AI Logs", icon: ShieldCheck, category: "Management" }
];

export const NavbarSidebar: React.FC<{ children: (activeTab: string, setActiveTab: (t: string) => void) => React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
              <Sparkles size={20} />
            </div>
            <div>
              <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
                AI Career Mentor
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Phase 3 Enterprise
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">RAG Context: Active</span>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="h-9 w-9 rounded-full bg-slate-800 border border-purple-500/30 flex items-center justify-center text-purple-300 font-semibold text-sm">
              NK
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-200">Nikhil Kumar</p>
              <p className="text-[10px] text-purple-400">Aspiring AI Architect</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900/90 border-r border-slate-800/80 backdrop-blur-xl transition-transform duration-300 transform
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col justify-between pt-16 md:pt-4 pb-4 px-3
        `}>
          <div className="space-y-6 overflow-y-auto pr-1">
            {Array.from(new Set(navItems.map(item => item.category))).map(category => (
              <div key={category} className="space-y-1">
                <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {category}
                </h3>
                {navItems.filter(item => item.category === category).map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200
                        ${isActive 
                          ? "bg-gradient-to-r from-purple-600/30 to-violet-600/10 text-white border border-purple-500/40 shadow-sm" 
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className={isActive ? "text-purple-400" : "text-slate-500"} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight size={14} className="text-purple-400" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 px-2 space-y-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/30 to-slate-900 border border-purple-500/20 text-center">
              <p className="text-[11px] font-semibold text-purple-300">Target Role: AI Engineer</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Readiness Match: 84%</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full w-[84%]"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content View Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
          {children(activeTab, setActiveTab)}
        </main>
      </div>
    </div>
  );
};
