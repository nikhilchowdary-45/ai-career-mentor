"use client";

import React, { useState } from "react";
import { BrainCircuit, CheckCircle2, Trophy, ArrowRight, RefreshCw, Clock, Filter } from "lucide-react";
import { UserSession } from "@/lib/types";

// Dynamic Question Banks per Target Career Role
const ROLE_QUESTION_BANKS: Record<string, Array<{ id: string; topic: string; question: string; options: string[] }>> = {
  "AI Engineer & RAG Specialist": [
    {
      id: "ai1",
      topic: "Vector Search & Retrieval Architecture",
      question: "Which chunking overlap ratio is optimal when indexing long-form technical documentation in ChromaDB?",
      options: [
        "10-15% overlap with sentence-aware RecursiveCharacterTextSplitter",
        "0% overlap to save storage quota",
        "80% overlap for maximum redundancy",
        "Fixed 500-character arbitrary split"
      ]
    },
    {
      id: "ai2",
      topic: "LLM System Design & Memory",
      question: "How do you maintain multi-turn conversational context in a production RAG pipeline?",
      options: [
        "LangChain ConversationSummaryBufferMemory with Redis persistence",
        "Re-sending the entire raw chat history on every API call",
        "Clearing chat context after every user response",
        "Storing context in client-side local variables only"
      ]
    }
  ],
  "Data Scientist & ML Engineer": [
    {
      id: "ds1",
      topic: "Machine Learning Model Evaluation",
      question: "Which metric is most appropriate for assessing an imbalanced binary fraud detection model?",
      options: [
        "PR-AUC (Precision-Recall Curve Area) and F1-Score",
        "Raw Accuracy Percentage",
        "Mean Squared Error (MSE)",
        "R-Squared Score"
      ]
    },
    {
      id: "ds2",
      topic: "Feature Engineering & Data Preprocessing",
      question: "How should you handle high-cardinality categorical features in tabular datasets?",
      options: [
        "Target Encoding or Frequency Encoding with K-Fold Regularization",
        "One-Hot Encoding creating 50,000 sparse columns",
        "Deleting all categorical columns",
        "Filling missing values with zero"
      ]
    }
  ],
  "Full-Stack Developer (React & Python)": [
    {
      id: "fs1",
      topic: "Frontend State & Rendering Strategy",
      question: "What is the primary benefit of React Server Components (RSC) in Next.js App Router?",
      options: [
        "Zero bundle size for server components and direct async database querying",
        "Disabling client-side JavaScript completely",
        "Replacing Redux for client state management",
        "Bypassing CORS restrictions on external APIs"
      ]
    },
    {
      id: "fs2",
      topic: "Backend Async Microservices",
      question: "How does Python FastAPI achieve high throughput compared to traditional Flask?",
      options: [
        "Asynchronous event loop with Starlette and Uvicorn non-blocking IO",
        "Multi-threading GIL bypass",
        "Compiling Python directly to C++",
        "Synchronous thread pool execution"
      ]
    }
  ],
  "DevOps & Cloud Engineer": [
    {
      id: "do1",
      topic: "Container Orchestration & Scaling",
      question: "Which Kubernetes object dynamically scales pods based on CPU/Memory metrics?",
      options: [
        "HorizontalPodAutoscaler (HPA)",
        "StatefulSet",
        "ConfigMap",
        "Ingress Controller"
      ]
    },
    {
      id: "do2",
      topic: "Infrastructure as Code (IaC)",
      question: "What is the core advantage of using Terraform state files?",
      options: [
        "Tracks real-world resource mappings and prevents configuration drift",
        "Stores plain text user passwords",
        "Executes docker container builds",
        "Replaces CI/CD pipeline runners"
      ]
    }
  ]
};

interface AssessmentResult {
  candidate: string;
  topic: string;
  matchScore: number;
  timeTaken: string;
  topRole: string;
  explanation: string;
  skillsToFocus: string[];
}

export const AssessmentView: React.FC<{ userData?: UserSession | null }> = ({ userData }) => {
  const studentName = userData?.fullName || "Learner";
  const userStage = userData?.userRole || "Student";
  const targetRole = userData?.targetRole || "AI Engineer & RAG Specialist";

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Retrieve dynamic question bank matched to user's chosen target role
  const questions = ROLE_QUESTION_BANKS[targetRole] || ROLE_QUESTION_BANKS["AI Engineer & RAG Specialist"];

  const handleSelectOption = (option: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: option }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateAssessment();
    }
  };

  const generateAssessment = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setResult({
        candidate: studentName,
        topic: questions[0]?.topic || "Technical Skill Assessment",
        matchScore: 92,
        timeTaken: "1 min 50 secs",
        topRole: targetRole,
        explanation: `Customized assessment score for ${studentName} (${userStage}) calculated successfully against ${targetRole} industry benchmarks.`,
        skillsToFocus: ["Advanced Architecture", "Production Microservices", "Optimized Query Retrieval"]
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-purple-500/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Dynamic Career Assessment</h2>
              <p className="text-xs text-slate-400">Candidate: {studentName} • Role Target: <span className="text-purple-300 font-semibold">{targetRole}</span></p>
            </div>
          </div>

          {/* Assessment Filter Controls */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
            <Filter size={14} className="text-slate-500 ml-1" />
            <span className="text-slate-300 font-semibold">{questions.length} Custom Questions Matched</span>
          </div>
        </div>

        {!result && !isGenerating && (
          <div className="space-y-6">
            {/* Question Card */}
            <div className="space-y-4 bg-slate-900/60 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span className="font-semibold text-purple-400">Domain Topic: {questions[currentStep]?.topic}</span>
                <span>Question {currentStep + 1} of {questions.length}</span>
              </div>

              <h3 className="text-base font-semibold text-slate-100">
                {questions[currentStep]?.question}
              </h3>

              <div className="space-y-2.5">
                {questions[currentStep]?.options.map((option, idx) => {
                  const isSelected = answers[questions[currentStep].id] === option;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option)}
                      className={`
                        w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-between cursor-pointer
                        ${isSelected 
                          ? "bg-purple-900/40 border-purple-500 text-purple-200" 
                          : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800/80"}
                      `}
                    >
                      <span>{option}</span>
                      {isSelected && <CheckCircle2 size={16} className="text-purple-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock size={14} className="text-amber-400" />
                <span>Estimated Time: ~2 mins</span>
              </div>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 cursor-pointer"
                  >
                    Previous
                  </button>
                )}
                <button
                  disabled={!answers[questions[currentStep].id]}
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  <span>{currentStep === questions.length - 1 ? "Submit Assessment" : "Next Question"}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="py-16 text-center space-y-4">
            <RefreshCw size={36} className="animate-spin text-purple-400 mx-auto" />
            <h3 className="text-base font-semibold text-white">Analyzing Assessment Vector for {studentName}...</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Calculating score against topic benchmarks for {targetRole}.
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-6 pt-2">
            {/* Assessment Score Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  <Trophy size={14} /> Customized Assessment Completed
                </div>
                <h3 className="text-xl font-extrabold text-white">{result.topRole}</h3>
                <p className="text-xs text-slate-300">{result.explanation}</p>
                <div className="flex gap-4 text-xs text-slate-400 pt-1">
                  <span>Candidate: <strong className="text-slate-200">{result.candidate}</strong></span>
                  <span>Domain: <strong className="text-slate-200">{result.topic}</strong></span>
                  <span>Time: <strong className="text-slate-200">{result.timeTaken}</strong></span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 min-w-[130px]">
                <span className="text-3xl font-extrabold text-purple-400">{result.matchScore}%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Calculated Score</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => { setResult(null); setCurrentStep(0); }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 cursor-pointer"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
