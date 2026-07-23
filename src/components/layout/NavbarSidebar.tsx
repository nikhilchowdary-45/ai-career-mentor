"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Map, 
  FileText, 
  Code, 
  Share2, 
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
  Menu,
  X,
  Eye,
  Trash2
} from "lucide-react";
import { Background3DCanvas } from "@/components/canvas/Background3DCanvas";
import { UserSession } from "@/lib/types";

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, category: "Core" },
  { id: "assessment", label: "AI Career Assessment", icon: BrainCircuit, category: "Career Guidance" },
  { id: "roadmap", label: "Dynamic Roadmap", icon: Map, category: "Career Guidance" },
  { id: "resume", label: "Resume Audit & ATS", icon: FileText, category: "Profile Optimization" },
  { id: "github", label: "GitHub Portfolio Audit", icon: Code, category: "Profile Optimization" },
  { id: "linkedin", label: "LinkedIn Optimizer", icon: Share2, category: "Profile Optimization" },
  { id: "skillgap", label: "Skill-Gap Matrix", icon: Target, category: "Skills & Preparation" },
  { id: "interview", label: "AI Interview Coach", icon: MessageSquareCode, category: "Skills & Preparation" },
  { id: "projects", label: "Project Engine", icon: Briefcase, category: "Skills & Preparation" },
  { id: "salary", label: "Salary Insights", icon: DollarSign, category: "Career Intelligence" },
  { id: "planner", label: "Daily Planner", icon: Calendar, category: "Career Intelligence" },
  { id: "chatbot", label: "AI Mentor Chatbot", icon: Bot, category: "Career Intelligence" },
  { id: "admin", label: "Admin & AI Logs", icon: ShieldCheck, category: "Management" }
];

interface NavbarSidebarProps {
  userData?: UserSession | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  children: (activeTab: string, setActiveTab: (t: string) => void) => React.ReactNode;
}

export const NavbarSidebar: React.FC<NavbarSidebarProps> = ({ userData, onOpenAuth, onLogout, children }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const initials = userData?.fullName
    ? userData.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : "ST";

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* 3D WebGL Canvas Layer */}
      <Background3DCanvas />

      {/* Top Header Navigation */}
      <header className="relative z-40 h-16 border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-xl sticky top-0 px-4 md:px-6 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
          {/* Enhanced 3D Glass Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab("dashboard")}>
            <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                <Sparkles size={20} className="text-violet-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-violet-300 bg-clip-text text-transparent">
                  AI Career Mentor
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <p className="text-[10px] text-purple-400 font-semibold tracking-wider uppercase">
                3D Immersive Enterprise Platform
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* GitHub ID Badge */}
          {userData?.githubId && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-medium text-slate-300 backdrop-blur-md shadow-sm">
              <Code size={13} className="text-cyan-400" />
              <span>@{userData.githubId}</span>
            </div>
          )}

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">Session Active</span>
          </div>

          {/* User Profile Avatar Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-3 pl-3 border-l border-slate-800 hover:opacity-90 transition-all cursor-pointer text-left group"
            >
              <div className="relative h-10 w-10 rounded-full border-2 border-purple-400/40 flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all duration-300">
                {userData?.profilePhotoUrl ? (
                  <img src={userData.profilePhotoUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-xs">{initials}</span>
                )}
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-semibold text-slate-200 group-hover:text-violet-300 transition-colors">{userData?.fullName || "Student Learner"}</p>
                <p className="text-[10px] text-purple-400">{userData?.userRole || "Student"} • {userData?.targetRole ? userData.targetRole.split('&')[0] : "AI Path"}</p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 glass-panel">
                <div className="p-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-white">{userData?.fullName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{userData?.email}</p>
                </div>
                <button
                  onClick={() => { onOpenAuth(); setProfileDropdownOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer"
                >
                  <Eye size={14} className="text-purple-400" />
                  <span>View / Edit Profile Settings</span>
                </button>
                <button
                  onClick={() => { onLogout(); setProfileDropdownOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Format local credentials DB? This clears all registered users and active sessions.")) {
                      try {
                        localStorage.removeItem("ai_career_mentor_db_users");
                        localStorage.removeItem("ai_career_mentor_active_user");
                        window.location.reload();
                      } catch (err) {
                        console.warn("Failed to clear local database", err);
                      }
                    }
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-semibold text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer uppercase tracking-wider border-t border-slate-800/60 mt-1 pt-2"
                >
                  <Trash2 size={13} />
                  <span>Format Credentials DB</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900/70 border-r border-slate-800/80 backdrop-blur-xl transition-transform duration-300 transform
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col justify-between pt-16 md:pt-4 pb-4 px-3 shadow-xl
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
                        w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer
                        ${isActive 
                          ? "bg-gradient-to-r from-purple-600/40 via-violet-600/20 to-transparent text-white border border-purple-500/40 shadow-lg shadow-purple-500/10 scale-[1.02]" 
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 hover:scale-[1.01]"
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-slate-900/90 border border-purple-500/30 text-center space-y-1 shadow-lg">
              <p className="text-[11px] font-semibold text-purple-300">
                Target: {userData?.targetRole ? userData.targetRole.slice(0, 20) + "..." : "AI Engineer"}
              </p>
              <p className="text-[10px] text-slate-400">GitHub ID: @{userData?.githubId || "student-dev"}</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full w-[84%]"></div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content View Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-transparent">
          {children(activeTab, setActiveTab)}
        </main>
      </div>
    </div>
  );
};
