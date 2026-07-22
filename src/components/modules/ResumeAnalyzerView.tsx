"use client";

import React, { useState } from "react";
import { FileText, Upload, Sparkles, AlertTriangle, CheckCircle, FileCheck, RefreshCw } from "lucide-react";

export const ResumeAnalyzerView: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = () => {
    if (!file) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setReport({
        atsScore: 92,
        grammarScore: 98,
        technicalScore: 88,
        quantificationScore: 84,
        weakPoints: [
          "Project bullet 2 lacks quantitative metrics (e.g. latency improvement, user throughput)",
          "Missing explicit mention of Vector Search (ChromaDB / Qdrant) in key skills section"
        ],
        suggestions: [
          "Change 'Built a RAG chatbot' to 'Architected a RAG search engine reducing retrieval latency by 35% across 50,000 document vectors'",
          "Add Docker and CI/CD workflow keywords to increase recruiter ATS match percentage"
        ],
        improvedBulletPreview: "Designed and deployed a asynchronous microservice API using FastAPI, SQLAlchemy 2.0, and PostgreSQL, handling 1,500 requests/minute with 99.9% uptime."
      });
    }, 2200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-purple-500/20 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Resume Audit & ATS Scoring Engine</h2>
            <p className="text-xs text-slate-400">Upload PDF resume for deep LLM ATS evaluation & bullet point optimization</p>
          </div>
        </div>

        {/* File Drag Drop Area */}
        <div className="p-8 border-2 border-dashed border-slate-800 hover:border-purple-500/50 rounded-2xl bg-slate-900/40 text-center space-y-4 transition-all">
          <div className="h-12 w-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto">
            <Upload size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200">
              {file ? file.name : "Drag and drop your PDF resume here, or browse files"}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Supports PDF up to 5MB</p>
          </div>
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileUpload}
            className="hidden" 
            id="resume-upload" 
          />
          <div className="flex justify-center gap-3">
            <label 
              htmlFor="resume-upload"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
            >
              Choose PDF File
            </label>
            {file && (
              <button
                onClick={startAnalysis}
                disabled={analyzing}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2"
              >
                {analyzing ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Analyzing ATS Score...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Run AI Resume Audit</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Audit Results Presentation */}
        {report && (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30 text-center">
                <span className="text-2xl font-extrabold text-purple-400">{report.atsScore} / 100</span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">ATS Match Score</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-2xl font-extrabold text-emerald-400">{report.grammarScore}%</span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Grammar & Tone</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-2xl font-extrabold text-cyan-400">{report.technicalScore}%</span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Technical Depth</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-2xl font-extrabold text-amber-400">{report.quantificationScore}%</span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Metric Impact</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle size={14} /> Weak Points & Critical Gaps
                </h3>
                <ul className="space-y-2">
                  {report.weakPoints.map((wp: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                      <span>{wp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle size={14} /> Recommended Actionable Fixes
                </h3>
                <ul className="space-y-2">
                  {report.suggestions.map((sug: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 space-y-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">AI Bullet Point Optimization Preview</span>
              <p className="text-xs text-slate-200 font-mono bg-slate-950 p-3 rounded-lg border border-purple-500/20 leading-relaxed">
                "{report.improvedBulletPreview}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
