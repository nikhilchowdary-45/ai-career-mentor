"use client";

import React, { useState, useEffect } from "react";
import { NavbarSidebar } from "@/components/layout/NavbarSidebar";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { AssessmentView } from "@/components/modules/AssessmentView";
import { RoadmapView } from "@/components/modules/RoadmapView";
import { ResumeAnalyzerView } from "@/components/modules/ResumeAnalyzerView";
import { InterviewCoachView } from "@/components/modules/InterviewCoachView";
import { ChatbotView } from "@/components/modules/ChatbotView";
import { AuthOnboardingModal } from "@/components/auth/AuthOnboardingModal";
import { UserSession } from "@/lib/types";
import { getAuthToken, clearAuthToken, apiFetch } from "@/lib/api";

export default function Home() {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"login" | "signup" | "forgot" | "edit_profile">("login");

  // Load active user session from backend API on initial load
  useEffect(() => {
    let shouldShowAuth = true;

    const fetchSession = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const userSession = await apiFetch<UserSession>("/auth/me");
          setUser(userSession);
          shouldShowAuth = false;
        } catch (e) {
          console.warn("Session token validation failed, clearing token", e);
          clearAuthToken();
          try {
            localStorage.removeItem("ai_career_mentor_active_user");
          } catch {}
        }
      }

      // Defer state updates asynchronously to avoid synchronous setState cascading renders in React 19
      setShowAuthModal(shouldShowAuth);
      setIsHydrated(true);
    };

    const timer = setTimeout(() => {
      fetchSession();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = (userData: UserSession) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("ai_career_mentor_active_user");
    } catch (e) {
      console.warn("Failed to remove user session from LocalStorage", e);
    }
    clearAuthToken();
    setUser(null);
    setModalMode("login");
    setShowAuthModal(true);
  };

  const handleOpenEditProfile = () => {
    setModalMode("edit_profile");
    setShowAuthModal(true);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-muted-foreground font-semibold">Loading AI Career Mentor...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showAuthModal && (
        <AuthOnboardingModal 
          key={user?.email || "anonymous"}
          initialMode={modalMode}
          userData={user}
          onLoginSuccess={handleLoginSuccess}
          onCloseModal={() => setShowAuthModal(false)}
        />
      )}

      <NavbarSidebar userData={user} onOpenAuth={handleOpenEditProfile} onLogout={handleLogout}>
        {(activeTab, setActiveTab) => {
          switch (activeTab) {
            case "dashboard":
              return <DashboardView userData={user} onNavigate={setActiveTab} />;
            case "assessment":
              return <AssessmentView userData={user} />;
            case "roadmap":
              return <RoadmapView userPreferences={user} />;
            case "resume":
              return <ResumeAnalyzerView />;
            case "interview":
              return <InterviewCoachView userData={user} />;
            case "chatbot":
              return <ChatbotView userData={user} />;
            default:
              return (
                <div className="max-w-4xl mx-auto glass-card p-12 rounded-2xl text-center space-y-4 border border-violet-500/20">
                  <h2 className="text-xl font-bold text-white capitalize">{activeTab.replace('-', ' ')} Module</h2>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    This module is active and loaded. Connect your FastAPI backend to retrieve live production metrics for {activeTab}.
                  </p>
                  <button 
                    onClick={() => setActiveTab("dashboard")}
                    className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 cursor-pointer"
                  >
                    Back to Main Dashboard
                  </button>
                </div>
              );
          }
        }}
      </NavbarSidebar>
    </>
  );
}
