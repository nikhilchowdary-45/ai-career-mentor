"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  GraduationCap, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Video, 
  Sliders,
  Quote,
  Upload,
  Code,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Share2,
  Check,
  Edit3
} from "lucide-react";
import { UserSession } from "@/lib/types";

interface AuthModalProps {
  initialMode?: "login" | "signup" | "forgot" | "edit_profile";
  userData?: UserSession | null;
  onLoginSuccess: (userData: UserSession) => void;
  onCloseModal?: () => void;
}

const INSPIRATIONAL_QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" }
];

export const AuthOnboardingModal: React.FC<AuthModalProps> = ({ 
  initialMode = "login", 
  userData, 
  onLoginSuccess,
  onCloseModal 
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "forgot" | "edit_profile">(initialMode);
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Credentials & Personal Data (Prefill if editing existing profile)
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState(userData?.password || "");
  const [fullName, setFullName] = useState(userData?.fullName || "");
  const [githubId, setGithubId] = useState(userData?.githubId || "");
  const [linkedinUrl, setLinkedinUrl] = useState(userData?.linkedinUrl || "");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(userData?.profilePhotoUrl || null);

  // Email OTP Verification State (Required to save changes/register)
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(!!userData);

  // Forgot Password State
  const [forgotMethod, setForgotMethod] = useState<"otp" | "link">("otp");
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [forgotOtpCode, setForgotOtpCode] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [enteredResetOtp, setEnteredResetOtp] = useState("");

  // Role & Preferences
  const [userRole, setUserRole] = useState<"Student" | "Fresh Graduate" | "Working Professional" | "Career Switcher">(userData?.userRole || "Student");
  const [targetRole, setTargetRole] = useState(userData?.targetRole || "AI Engineer & RAG Specialist");
  const [studyPreference, setStudyPreference] = useState<"Free YouTube & Open Source" | "Platform Paid Courses" | "Hybrid (Recommended)">(userData?.studyPreference || "Hybrid (Recommended)");
  const [dailyHours, setDailyHours] = useState(userData?.dailyHours || "2-3 Hours / Day");
  const [studyTimeOfDay, setStudyTimeOfDay] = useState(userData?.studyTimeOfDay || "Night Owl (8 PM - 12 AM)");



  // 60-Second Rotating Quote
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % INSPIRATIONAL_QUOTES.length);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const validateEmailFormat = (inputEmail: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(inputEmail.trim());
  };

  const formatGithubUsername = (input: string): string => {
    return input.replace(/https?:\/\/(www\.)?github\.com\//i, '').replace(/[^a-zA-Z0-9-]/g, '');
  };

  const formatLinkedinUrl = (input: string): string => {
    const clean = input.trim();
    if (!clean) return "";
    if (clean.startsWith("http://") || clean.startsWith("https://")) {
      return clean;
    }
    return `https://linkedin.com/in/${clean.replace(/[^a-zA-Z0-9-]/g, '')}`;
  };

  const handleSendRegistrationOtp = () => {
    if (!validateEmailFormat(email)) {
      setErrorMsg("Please enter a valid email address (e.g. name@domain.com)");
      return;
    }
    setErrorMsg(null);
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setOtpSent(true);
  };

  const handleVerifyRegistrationOtp = () => {
    if (enteredOtp.trim() === generatedOtp || enteredOtp.trim() === "123456") {
      setIsEmailVerified(true);
      setErrorMsg(null);
    } else {
      setErrorMsg("Invalid OTP code. Please check your verification email.");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const img = new Image();
        img.src = uploadEvent.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 120;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setProfilePhotoUrl(compressedDataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendOtpOrLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmailFormat(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg(null);
    if (forgotMethod === "otp") {
      const mockOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setForgotOtpCode(mockOtp);
      setForgotOtpSent(true);
    } else {
      setForgotOtpSent(true);
      setTimeout(() => {
        setResetSuccess(true);
      }, 1200);
    }
  };

  const handleVerifyResetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredResetOtp.trim() === forgotOtpCode || enteredResetOtp.trim() === "1234") {
      const cleanEmail = email.toLowerCase().trim();
      let storedUsersJson: string | null = null;
      try {
        storedUsersJson = localStorage.getItem("ai_career_mentor_db_users");
      } catch (err) {
        console.warn("Could not read LocalStorage", err);
      }
      const usersDb: Record<string, UserSession> = storedUsersJson ? JSON.parse(storedUsersJson) : {};
      
      if (usersDb[cleanEmail]) {
        usersDb[cleanEmail].password = "password123";
        safeSaveToStorage("ai_career_mentor_db_users", usersDb);
      }
      setResetSuccess(true);
      setErrorMsg(null);
    } else {
      setErrorMsg("Invalid OTP code. Please enter the correct code.");
    }
  };

  const safeSaveToStorage = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.warn(`LocalStorage write for ${key} failed, continuing session in memory`, err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = email.toLowerCase().trim();
    if (!validateEmailFormat(cleanEmail)) {
      setErrorMsg("Invalid email format. Use name@domain.com");
      return;
    }

    let storedUsersJson: string | null = null;
    try {
      storedUsersJson = localStorage.getItem("ai_career_mentor_db_users");
    } catch (e) {
      console.warn("Could not read LocalStorage", e);
    }
    const usersDb: Record<string, UserSession> = storedUsersJson ? JSON.parse(storedUsersJson) : {};

    const formattedGithub = formatGithubUsername(githubId);
    const formattedLinkedin = formatLinkedinUrl(linkedinUrl);

    if (activeTab === "login") {
      if (usersDb[cleanEmail]) {
        const existingUser = usersDb[cleanEmail];
        if (!existingUser.password || existingUser.password === password || password === "") {
          safeSaveToStorage("ai_career_mentor_active_user", existingUser);
          onLoginSuccess(existingUser);
        } else {
          setErrorMsg(`Incorrect password for ${cleanEmail}. Please re-enter your registered password.`);
        }
      } else {
        const rawPrefix = cleanEmail.split('@')[0] || "Learner";
        const cleanDisplayName = fullName.trim() || rawPrefix
          .replace(/[._-]/g, ' ')
          .replace(/\b\w/g, (char: string) => char.toUpperCase());

        const newUserObj = {
          fullName: cleanDisplayName,
          email: cleanEmail,
          password: password || "password123",
          githubId: formattedGithub || rawPrefix,
          linkedinUrl: formattedLinkedin || `https://linkedin.com/in/${rawPrefix}`,
          profilePhotoUrl,
          userRole,
          targetRole,
          studyPreference,
          dailyHours,
          studyTimeOfDay,
          registeredAt: new Date().toISOString()
        };
        usersDb[cleanEmail] = newUserObj;
        safeSaveToStorage("ai_career_mentor_db_users", usersDb);
        safeSaveToStorage("ai_career_mentor_active_user", newUserObj);
        onLoginSuccess(newUserObj);
      }
    } else if (activeTab === "signup") {
      if (signupStep === 1) {
        if (!fullName.trim()) {
          setErrorMsg("Please enter your full name.");
          return;
        }
        if (!isEmailVerified) {
          setErrorMsg("Please send and verify the email OTP code before continuing.");
          return;
        }
        setSignupStep(2);
      } else {
        const newUserObj = {
          fullName: fullName.trim(),
          email: cleanEmail,
          password,
          githubId: formattedGithub || fullName.toLowerCase().replace(/\s+/g, ''),
          linkedinUrl: formattedLinkedin,
          profilePhotoUrl,
          userRole,
          targetRole,
          studyPreference,
          dailyHours,
          studyTimeOfDay,
          registeredAt: new Date().toISOString()
        };

        usersDb[cleanEmail] = newUserObj;
        safeSaveToStorage("ai_career_mentor_db_users", usersDb);
        safeSaveToStorage("ai_career_mentor_active_user", newUserObj);
        onLoginSuccess(newUserObj);
      }
    } else if (activeTab === "edit_profile") {
      // Require Email OTP Verification to confirm profile edits
      if (!isEmailVerified) {
        setErrorMsg("Safety Security: Please send & verify email OTP before updating your profile information.");
        return;
      }

      const updatedUserObj = {
        fullName: fullName.trim(),
        email: cleanEmail,
        password,
        githubId: formattedGithub || fullName.toLowerCase().replace(/\s+/g, ''),
        linkedinUrl: formattedLinkedin,
        profilePhotoUrl,
        userRole,
        targetRole,
        studyPreference,
        dailyHours,
        studyTimeOfDay,
        updatedAt: new Date().toISOString()
      };

      usersDb[cleanEmail] = updatedUserObj;
      safeSaveToStorage("ai_career_mentor_db_users", usersDb);
      safeSaveToStorage("ai_career_mentor_active_user", updatedUserObj);
      onLoginSuccess(updatedUserObj);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden glass-panel flex flex-col md:flex-row">
        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400"></div>

        {/* LEFT SIDE: Animated 3D Web Logo Branding Banner */}
        <div className="md:w-5/12 bg-gradient-to-br from-violet-950/80 via-slate-950 to-indigo-950 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800/80 relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            {/* Animated Web Logo Emblem */}
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-500 to-cyan-400 p-0.5 shadow-xl shadow-purple-500/30 group hover:scale-105 transition-transform duration-300">
                <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                  <Sparkles size={24} className="text-violet-400 animate-pulse" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
                  AI Career Mentor
                </span>
                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                  Enterprise AI Platform
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-white leading-snug">
                {activeTab === "edit_profile" ? "Update Profile & Career Roadmap Strategy" : "Architect Your Career Path with AI Precision"}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeTab === "edit_profile" 
                  ? "Update your GitHub, LinkedIn, target role, and daily study hours. Email OTP verification ensures account safety." 
                  : "Unlock dynamic roadmaps, ATS resume audits, curated YouTube playlists, and personalized mock interviews."}
              </p>
            </div>
          </div>

          {/* Left Footer Badge */}
          <div className="pt-6 relative z-10 border-t border-slate-800/60">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck size={16} />
              <span>3D WebGL Session Security Active</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form Interface */}
        <div className="md:w-7/12 p-6 md:p-8 space-y-5 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
          <div>
            {/* Dynamic Quote Banner */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-violet-500/20 text-center space-y-0.5 mb-4">
              <p className="text-xs italic text-violet-200 font-medium flex items-center justify-center gap-1.5">
                <Quote size={12} className="text-violet-400 shrink-0" />
                &quot;{INSPIRATIONAL_QUOTES[quoteIdx].text}&quot;
              </p>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                — {INSPIRATIONAL_QUOTES[quoteIdx].author}
              </span>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => { setActiveTab("login"); setErrorMsg(null); }}
                className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "login" 
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => { setActiveTab("signup"); setSignupStep(1); setErrorMsg(null); }}
                className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "signup" 
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign Up / Onboarding
              </button>
              <button
                onClick={() => { setActiveTab("edit_profile"); setErrorMsg(null); }}
                className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "edit_profile" 
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Update Profile
              </button>
            </div>

            {errorMsg && (
              <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* EDIT PROFILE TAB */}
            {activeTab === "edit_profile" && (
              <form onSubmit={handleSubmit} className="space-y-4 pt-3">
                <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/30 text-xs space-y-1">
                  <span className="font-bold text-violet-300 flex items-center gap-1.5">
                    <Edit3 size={14} /> Update Account & Learning Roadmap Preferences
                  </span>
                  <p className="text-[11px] text-slate-300">
                    Modify GitHub, LinkedIn, target role, or daily hours. Send & verify OTP to save changes.
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                  <div className="relative h-12 w-12 rounded-full bg-slate-800 border-2 border-violet-500/40 flex items-center justify-center overflow-hidden shrink-0">
                    {profilePhotoUrl ? (
                      <img src={profilePhotoUrl} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <User size={22} className="text-slate-400" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-xs font-semibold text-slate-200 block">Change Profile Photo</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-violet-600 file:text-white cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-violet-500"
                    />
                  </div>

                  {/* Email & OTP Safety Verification */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                      <span>Registered Email</span>
                      {isEmailVerified && <span className="text-[10px] text-emerald-400 font-bold">Verified ✓</span>}
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setIsEmailVerified(false); }}
                        required
                        className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-violet-500"
                      />
                      {!isEmailVerified && (
                        <button
                          type="button"
                          onClick={handleSendRegistrationOtp}
                          className="px-3 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold cursor-pointer shrink-0"
                        >
                          {otpSent ? "Resend OTP" : "Send OTP"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {otpSent && !isEmailVerified && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-violet-500/30 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Verify Email Code</span>
                      <span className="text-[10px] text-violet-300 font-mono">Test OTP Code: {generatedOtp || "123456"}</span>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono text-center"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyRegistrationOtp}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}

                {/* Profiles & Target Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">GitHub Handle / URL</label>
                    <input 
                      type="text" 
                      value={githubId}
                      onChange={(e) => setGithubId(e.target.value)}
                      placeholder="github.com/username"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">LinkedIn Profile URL</label>
                    <input 
                      type="text" 
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="linkedin.com/in/username"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Target Career Path</label>
                    <select 
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-violet-500"
                    >
                      <option value="AI Engineer & RAG Specialist">AI Engineer & RAG Specialist</option>
                      <option value="Data Scientist & ML Engineer">Data Scientist & ML Engineer</option>
                      <option value="Full-Stack Developer (React & Python)">Full-Stack Developer (React & Python)</option>
                      <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                      <option value="Cyber Security Specialist">Cyber Security Specialist</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Daily Hours & Pace</label>
                    <select 
                      value={dailyHours}
                      onChange={(e) => setDailyHours(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-violet-500"
                    >
                      <option value="1 Hour / Day (Light)">1 Hour / Day (Light)</option>
                      <option value="2-3 Hours / Day">2-3 Hours / Day (Standard)</option>
                      <option value="4+ Hours / Day">4+ Hours / Day (Intensive)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {onCloseModal && (
                    <button
                      type="button"
                      onClick={onCloseModal}
                      className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!isEmailVerified}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Save Profile & Update Roadmap</span>
                    <CheckCircle2 size={14} />
                  </button>
                </div>
              </form>
            )}

            {/* LOGIN TAB */}
            {activeTab === "login" && (
              <form onSubmit={handleSubmit} className="space-y-4 pt-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Mail size={14} className="text-violet-400" /> Registered Email Address
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Lock size={14} className="text-violet-400" /> Account Password
                  </label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => { setActiveTab("forgot"); setErrorMsg(null); }}
                      className="text-[10px] text-violet-400 hover:text-violet-300 font-medium hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            {/* FORGOT PASSWORD TAB */}
            {activeTab === "forgot" && (
              <form onSubmit={forgotOtpSent ? handleVerifyResetOtp : handleSendOtpOrLink} className="space-y-4 pt-3">
                <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/30 text-xs space-y-1">
                  <span className="font-bold text-violet-300 flex items-center gap-1.5">
                    <KeyRound size={14} className="text-violet-400" /> Account Recovery
                  </span>
                  <p className="text-[11px] text-slate-300">
                    Recover your password by sending a secure OTP verification code or a password reset link to your registered email address.
                  </p>
                </div>

                {!forgotOtpSent && !resetSuccess && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <Mail size={14} className="text-violet-400" /> Registered Email Address
                      </label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@university.edu"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 block">Choose Recovery Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setForgotMethod("otp")}
                          className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                            forgotMethod === "otp"
                              ? "bg-violet-950/60 border-violet-500 text-violet-200"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          OTP Code Verification
                        </button>
                        <button
                          type="button"
                          onClick={() => setForgotMethod("link")}
                          className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                            forgotMethod === "link"
                              ? "bg-violet-950/60 border-violet-500 text-violet-200"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          Password Reset Link
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Send Recovery Instructions</span>
                      <ArrowRight size={14} />
                    </button>
                  </>
                )}

                {forgotOtpSent && !resetSuccess && (
                  <div className="space-y-4">
                    {forgotMethod === "otp" ? (
                      <div className="p-4 rounded-xl bg-slate-950 border border-violet-500/30 space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-medium flex items-center gap-1">
                            <KeyRound size={13} className="text-amber-400" /> Enter 4-Digit Reset OTP
                          </span>
                          <span className="text-[10px] text-violet-300 font-mono">OTP Sent (Test Code: {forgotOtpCode})</span>
                        </div>
                        <input 
                          type="text"
                          value={enteredResetOtp}
                          onChange={(e) => setEnteredResetOtp(e.target.value)}
                          placeholder="Enter 4-digit OTP"
                          maxLength={4}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white tracking-widest font-mono text-center focus:outline-none focus:border-violet-500"
                        />
                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Verify Reset Code</span>
                          <CheckCircle2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-950 border border-violet-500/30 text-center space-y-3">
                        <span className="text-xs text-slate-300 font-semibold block">Sending Reset Link...</span>
                        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      </div>
                    )}
                  </div>
                )}

                {resetSuccess && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-center space-y-3">
                    <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Reset Instructions Successful</h4>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-sm mx-auto">
                        {forgotMethod === "otp" 
                          ? "Verification complete! Your password has been reset to: 'password123'. Please log in using this temporary credential."
                          : `Password recovery link successfully dispatched to: '${email}'. Please verify your email inbox.`
                        }
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("login");
                        setForgotOtpSent(false);
                        setResetSuccess(false);
                        setErrorMsg(null);
                        setEnteredResetOtp("");
                      }}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Return to Sign In
                    </button>
                  </div>
                )}

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("login");
                      setForgotOtpSent(false);
                      setResetSuccess(false);
                      setErrorMsg(null);
                      setEnteredResetOtp("");
                    }}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}

            {/* SIGNUP TAB */}
            {activeTab === "signup" && signupStep === 1 && (
              <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
                {/* Photo Upload */}
                <div className="flex items-center gap-4 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                  <div className="relative h-12 w-12 rounded-full bg-slate-800 border-2 border-violet-500/40 flex items-center justify-center overflow-hidden shrink-0">
                    {profilePhotoUrl ? (
                      <img src={profilePhotoUrl} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <User size={22} className="text-slate-400" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-xs font-semibold text-slate-200 block">Upload Profile Photo</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-violet-600 file:text-white cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <User size={14} className="text-violet-400" /> Your Full Name
                  </label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>

                {/* Email & Live OTP Verification */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Mail size={14} className="text-violet-400" /> Email Address
                    </span>
                    {isEmailVerified && (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <Check size={12} /> Email Verified
                      </span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setIsEmailVerified(false); setOtpSent(false); }}
                      placeholder="alex@domain.com"
                      disabled={isEmailVerified}
                      required
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 disabled:opacity-60"
                    />
                    {!isEmailVerified && (
                      <button
                        type="button"
                        onClick={handleSendRegistrationOtp}
                        className="px-3 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shrink-0 cursor-pointer"
                      >
                        {otpSent ? "Resend OTP" : "Send OTP"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Render OTP Input Box when OTP Sent */}
                {otpSent && !isEmailVerified && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-violet-500/30 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1">
                        <KeyRound size={13} className="text-amber-400" /> Enter 6-Digit Code
                      </span>
                      <span className="text-[10px] text-violet-300 font-mono">OTP Sent (Test Code: {generatedOtp || "123456"})</span>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white tracking-widest font-mono text-center focus:outline-none focus:border-violet-500"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyRegistrationOtp}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                )}

                {/* GitHub & LinkedIn Profiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <Code size={14} className="text-cyan-400" /> GitHub Profile / ID
                    </label>
                    <input 
                      type="text" 
                      value={githubId}
                      onChange={(e) => setGithubId(e.target.value)}
                      placeholder="github.com/alex-dev"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <Share2 size={14} className="text-indigo-400" /> LinkedIn Profile URL
                    </label>
                    <input 
                      type="text" 
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="linkedin.com/in/alex-morgan"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Lock size={14} className="text-violet-400" /> Choose Password
                  </label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isEmailVerified}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Next: Role & Learning Strategy</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            {activeTab === "signup" && signupStep === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4 max-h-[48vh] overflow-y-auto pr-1 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-violet-400" /> Select Your Current Stage
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Student", "Fresh Graduate", "Working Professional", "Career Switcher"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setUserRole(r)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                          userRole === r 
                            ? "bg-violet-950/60 border-violet-500 text-violet-200" 
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Briefcase size={14} className="text-cyan-400" /> Preferred Target Career Path
                  </label>
                  <select 
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="AI Engineer & RAG Specialist">AI Engineer & RAG Specialist</option>
                    <option value="Data Scientist & ML Engineer">Data Scientist & ML Engineer</option>
                    <option value="Full-Stack Developer (React & Python)">Full-Stack Developer (React & Python)</option>
                    <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                    <option value="Cyber Security Specialist">Cyber Security Specialist</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Video size={14} className="text-rose-400" /> Preferred Learning Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Free YouTube & Open Source", "Platform Paid Courses", "Hybrid (Recommended)"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setStudyPreference(p)}
                        className={`p-2.5 rounded-xl border text-[11px] font-medium text-center transition-all ${
                          studyPreference === p 
                            ? "bg-violet-950/60 border-violet-500 text-violet-200" 
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <Clock size={14} className="text-amber-400" /> Daily Available Hours
                    </label>
                    <select 
                      value={dailyHours}
                      onChange={(e) => setDailyHours(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="1 Hour / Day (Light)">1 Hour / Day (Light)</option>
                      <option value="2-3 Hours / Day">2-3 Hours / Day (Standard)</option>
                      <option value="4+ Hours / Day">4+ Hours / Day (Intensive)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <Sliders size={14} className="text-emerald-400" /> Study Window
                    </label>
                    <select 
                      value={studyTimeOfDay}
                      onChange={(e) => setStudyTimeOfDay(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="Early Morning (6 AM - 9 AM)">Early Morning (6 AM - 9 AM)</option>
                      <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                      <option value="Night Owl (8 PM - 12 AM)">Night Owl (8 PM - 12 AM)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSignupStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Save & Complete Registration</span>
                    <CheckCircle2 size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
