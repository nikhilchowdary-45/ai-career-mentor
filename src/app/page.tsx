"use client";

import React from "react";
import { NavbarSidebar } from "@/components/layout/NavbarSidebar";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { AssessmentView } from "@/components/modules/AssessmentView";
import { RoadmapView } from "@/components/modules/RoadmapView";
import { ResumeAnalyzerView } from "@/components/modules/ResumeAnalyzerView";
import { InterviewCoachView } from "@/components/modules/InterviewCoachView";
import { ChatbotView } from "@/components/modules/ChatbotView";

export default function Home() {
  return (
    <NavbarSidebar>
      {(activeTab, setActiveTab) => {
        switch (activeTab) {
          case "dashboard":
            return <DashboardView onNavigate={setActiveTab} />;
          case "assessment":
            return <AssessmentView />;
          case "roadmap":
            return <RoadmapView />;
          case "resume":
            return <ResumeAnalyzerView />;
          case "interview":
            return <InterviewCoachView />;
          case "chatbot":
            return <ChatbotView />;
          default:
            return (
              <div className="max-w-4xl mx-auto glass-card p-12 rounded-2xl text-center space-y-4 border border-purple-500/20">
                <h2 className="text-xl font-bold text-white capitalize">{activeTab.replace('-', ' ')} Module</h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  This module is active and loaded. Connect your FastAPI backend to retrieve live production metrics for {activeTab}.
                </p>
                <button 
                  onClick={() => setActiveTab("dashboard")}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500"
                >
                  Back to Main Dashboard
                </button>
              </div>
            );
        }
      }}
    </NavbarSidebar>
  );
}
