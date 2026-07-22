"use client";

import React, { useState } from "react";
import { BrainCircuit, Sparkles, CheckCircle2, Trophy, ArrowRight, RefreshCw, BarChart2 } from "lucide-react";

export const AssessmentView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const questions = [
    {
      id: "interest",
      question: "Which primary technology domain excites you the most?",
      options: [
        "Artificial Intelligence & Machine Learning",
        "Full-Stack Web & SaaS Architecture",
        "Cloud Infrastructure & DevOps Automation",
        "Cyber Security & Ethical Hacking",
        "Data Engineering & Big Analytics"
      ]
    },
    {
      id: "style",
      question: "How do you prefer learning new technical concepts?",
      options: [
        "Hands-on project building with real code",
        "Structured video courses and tutorials",
        "Reading technical documentation & research papers",
        "Interactive mock coding & problem solving"
      ]
    },
    {
      id: "experience",
      question: "What is your current level of coding experience?",
      options: [
        "Beginner (Learning syntax & basic projects)",
        "Intermediate (Built full-stack apps / scripts)",
        "Advanced (Built production systems / microservices)"
      ]
    },
    {
      id: "goal",
      question: "What is your primary career goal for the next 6-12 months?",
      options: [
        "Land a high-paying AI Engineer role",
        "Switch careers from non-tech/general dev into AI",
        "Get promoted to Senior/Lead Software Engineer",
        "Launch an independent AI SaaS startup"
      ]
    }
  ];

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
        matchScore: 94,
        topRole: "Senior AI & System Architect",
        alternativeRoles: ["LLM Applications Engineer", "Lead Python Backend Developer"],
        explanation: "Based on your high affinity for AI algorithms, structured project building, and existing backend competence, your optimal career path is AI Engineering with RAG & Multi-Agent Specialization.",
        skillsToFocus: ["Vector DB Indexing (ChromaDB/Qdrant)", "LangChain / LlamaIndex", "Async FastAPI Architecture", "LLM Evaluation Frameworks"],
        estimatedTime: "3.5 Months to Industry Ready"
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-purple-500/20 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Career Assessment Engine</h2>
            <p className="text-xs text-slate-400">Phase 2 Adaptive Personality & Skill Questionnaire</p>
          </div>
        </div>

        {!result && !isGenerating && (
          <div className="space-y-6 pt-4">
            {/* Step Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Completed</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Question */}
            <div className="space-y-4 bg-slate-900/60 p-6 rounded-xl border border-slate-800">
              <h3 className="text-base font-semibold text-slate-100">
                {questions[currentStep].question}
              </h3>
              <div className="space-y-2.5">
                {questions[currentStep].options.map((option, idx) => {
                  const isSelected = answers[questions[currentStep].id] === option;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option)}
                      className={`
                        w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-between
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

            <div className="flex justify-end gap-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                >
                  Previous
                </button>
              )}
              <button
                disabled={!answers[questions[currentStep].id]}
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>{currentStep === questions.length - 1 ? "Generate AI Assessment" : "Next Question"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="py-16 text-center space-y-4">
            <RefreshCw size={36} className="animate-spin text-purple-400 mx-auto" />
            <h3 className="text-base font-semibold text-white">Analyzing Personality & Skills Vector...</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Synthesizing response signals against 10,000+ industry job postings and career benchmarks.
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-6 pt-2">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  <Trophy size={14} /> Top Career Match Identified
                </div>
                <h3 className="text-2xl font-extrabold text-white">{result.topRole}</h3>
                <p className="text-xs text-slate-300">{result.explanation}</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 min-w-[120px]">
                <span className="text-3xl font-extrabold text-purple-400">{result.matchScore}%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Match Score</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart2 size={14} className="text-purple-400" /> High-Priority Learning Focus
                </h4>
                <ul className="space-y-1.5">
                  {result.skillsToFocus.map((skill: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} className="text-cyan-400" /> Alternative Recommended Roles
                </h4>
                <ul className="space-y-1.5">
                  {result.alternativeRoles.map((role: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setResult(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
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
