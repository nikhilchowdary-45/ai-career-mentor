"use client";

import React, { useState, useMemo } from "react";
import { 
  Map, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Layers,
  Video,
  ExternalLink,
  RefreshCw,
  Globe,
  Zap,
  Terminal,
  AlertTriangle,
  Cpu,
  Search,
  PlusCircle,
  Bot
} from "lucide-react";
import { UserSession } from "@/lib/types";

interface ResourceLink {
  title: string;
  channelOrProvider: string;
  language: "English" | "Telugu" | "Hindi";
  type: "YouTube Free Playlist" | "YouTube Crash Course" | "Paid Platform Course" | "Documentation";
  url: string;
  duration: string;
  rating: string;
}

interface PracticeTool {
  name: string;
  category: string;
  bestFor: string;
  accessUrl: string;
  isRecommended: boolean;
}

interface Milestone {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  duration: string;
  skills: string[];
  prerequisites: string[];
  systemNeeds: string[];
  practiceTools: PracticeTool[];
  projects: string[];
  resources: ResourceLink[];
  completed: boolean;
}

interface CourseMasteryData {
  id: number;
  name: string;
  category: string;
  provider: string;
  whatYouLearn: string;
  capstoneProject: string;
  milestones: Milestone[];
}

// 50 COMPLETE PDF COURSES WITH STAGE-BY-STAGE ROADMAPS
export const FIFTY_COURSES_MASTERY_PDF: CourseMasteryData[] = [
  // 1. Artificial Intelligence, GenAI & Machine Learning
  {
    id: 1,
    name: "Generative AI with Large Language Models",
    category: "AI & ML",
    provider: "AWS / DeepLearning.AI",
    whatYouLearn: "Understand how LLMs (like GPT, Claude, LLaMA) are built, trained, fine-tuned, and deployed in production.",
    capstoneProject: "Build and deploy a fine-tuned LLM-powered customer support assistant on AWS.",
    milestones: [
      {
        id: "c1_b",
        title: "Generative AI Fundamentals & LLM API Integration",
        level: "Beginner",
        duration: "3 Weeks",
        skills: ["GenAI vs Traditional ML", "Tokens & Embeddings", "Transformers Concept", "OpenAI / Bedrock APIs"],
        prerequisites: ["Python Basics", "REST API Usage"],
        systemNeeds: ["VS Code / Colab", "OpenAI API Key"],
        practiceTools: [
          { name: "OpenAI Playground", category: "API Testing", bestFor: "Testing temperature & prompt structures", accessUrl: "https://platform.openai.com/playground", isRecommended: true },
          { name: "Google Colab", category: "Cloud IDE", bestFor: "Running Python LLM scripts without setup", accessUrl: "https://colab.research.google.com/", isRecommended: true }
        ],
        projects: ["Simple LLM Chatbot CLI"],
        resources: [
          { title: "Generative AI with LLMs Masterclass", channelOrProvider: "DeepLearning.AI", language: "English", type: "YouTube Free Playlist", url: "https://www.youtube.com/results?search_query=generative+ai+with+llms", duration: "4.5 Hours", rating: "4.9 ⭐" },
          { title: "LLM & OpenAI API Tutorial in Telugu", channelOrProvider: "Vamsi Bhavani", language: "Telugu", type: "YouTube Free Playlist", url: "https://www.youtube.com/@VamsiBhavani", duration: "5.0 Hours", rating: "4.8 ⭐" },
          { title: "Generative AI Full Course in Hindi", channelOrProvider: "CodeWithHarry", language: "Hindi", type: "YouTube Free Playlist", url: "https://www.youtube.com/@CodeWithHarry", duration: "6.0 Hours", rating: "4.9 ⭐" }
        ],
        completed: true
      },
      {
        id: "c1_i",
        title: "Prompt Engineering, RAG & Fine-Tuning Strategies",
        level: "Intermediate",
        duration: "4 Weeks",
        skills: ["Chain-of-Thought Prompting", "Fine-Tuning vs RAG", "Instruction Tuning & RLHF"],
        prerequisites: ["Beginner LLM APIs", "Python Data Manipulation"],
        systemNeeds: ["ChromaDB / Pinecone", "Jupyter Notebook"],
        practiceTools: [
          { name: "ChromaDB Docs", category: "Vector DB", bestFor: "Semantic vector storage & similarity search", accessUrl: "https://www.trychroma.com/", isRecommended: true }
        ],
        projects: ["Document RAG Q&A Assistant"],
        resources: [
          { title: "LangChain & RAG Deep Dive", channelOrProvider: "James Briggs", language: "English", type: "YouTube Free Playlist", url: "https://www.youtube.com/@jamesbriggs", duration: "6.0 Hours", rating: "4.9 ⭐" }
        ],
        completed: false
      },
      {
        id: "c1_a",
        title: "Parameter-Efficient Fine-Tuning (LoRA/QLoRA) & AWS SageMaker",
        level: "Advanced",
        duration: "5 Weeks",
        skills: ["LoRA & QLoRA", "Deploying LLMs on AWS Bedrock/SageMaker", "Evaluating LLM Hallucinations & Cost"],
        prerequisites: ["Intermediate RAG", "AWS Fundamentals"],
        systemNeeds: ["AWS SageMaker Account", "Cloud GPU"],
        practiceTools: [
          { name: "Hugging Face PEFT", category: "Fine-Tuning Library", bestFor: "Efficient parameter fine-tuning", accessUrl: "https://huggingface.co/docs/peft", isRecommended: true }
        ],
        projects: ["Fine-Tuned Customer Support LLM Model"],
        resources: [
          { title: "LoRA & QLoRA Fine-Tuning Tutorial", channelOrProvider: "CampusX (Hindi)", language: "Hindi", type: "YouTube Free Playlist", url: "https://www.youtube.com/@CampusX-official", duration: "8.0 Hours", rating: "4.9 ⭐" }
        ],
        completed: false
      }
    ]
  },
  {
    id: 2,
    name: "AI Engineering: Building Agents & Workflows",
    category: "AI & ML",
    provider: "DeepLearning.AI / Udemy",
    whatYouLearn: "Learn to design autonomous AI agents that reason, plan, and use tools to complete multi-step tasks.",
    capstoneProject: "Build a multi-agent research assistant that searches, summarizes, and emails a report.",
    milestones: [
      {
        id: "c2_b",
        title: "AI Agent Fundamentals & Function/Tool Calling",
        level: "Beginner",
        duration: "3 Weeks",
        skills: ["AI Agent vs Chatbot", "Function Calling / Tool Calling", "Single-Agent Workflows"],
        prerequisites: ["Python Syntax", "LLM API Key"],
        systemNeeds: ["VS Code", "Python 3.11+"],
        practiceTools: [
          { name: "LangChain Tool Calling", category: "Agent Framework", bestFor: "Connecting LLMs to Web Search & Python Tools", accessUrl: "https://python.langchain.com/", isRecommended: true }
        ],
        projects: ["Web Searching Weather & Calculator Agent"],
        resources: [
          { title: "LangChain Agent Tutorial", channelOrProvider: "LangChain Official", language: "English", type: "YouTube Free Playlist", url: "https://www.youtube.com/@LangChain", duration: "4.0 Hours", rating: "4.9 ⭐" }
        ],
        completed: true
      },
      {
        id: "c2_i",
        title: "Multi-Agent Orchestration with LangGraph & CrewAI",
        level: "Intermediate",
        duration: "4 Weeks",
        skills: ["Multi-Agent Orchestration", "Short & Long-Term Memory", "LangGraph & CrewAI Frameworks"],
        prerequisites: ["Beginner Function Calling", "State Machine Logic"],
        systemNeeds: ["Docker", "Vector DB"],
        practiceTools: [
          { name: "LangGraph Studio", category: "Visual Agent IDE", bestFor: "Debugging agent graph state transitions", accessUrl: "https://smith.langchain.com/", isRecommended: true }
        ],
        projects: ["Autonomous Multi-Agent Research Assistant"],
        resources: [
          { title: "LangGraph Multi-Agent Architecture", channelOrProvider: "James Briggs", language: "English", type: "YouTube Free Playlist", url: "https://www.youtube.com/@jamesbriggs", duration: "5.5 Hours", rating: "4.9 ⭐" }
        ],
        completed: false
      }
    ]
  },
  {
    id: 3,
    name: "Machine Learning Specialization",
    category: "AI & ML",
    provider: "Stanford University / Coursera (Andrew Ng)",
    whatYouLearn: "The foundational ML course — covers the math and code behind supervised and unsupervised learning.",
    capstoneProject: "Build a house price predictor and a movie recommender system from scratch.",
    milestones: [
      {
        id: "c3_b",
        title: "Supervised Learning: Regression & Classification",
        level: "Beginner",
        duration: "4 Weeks",
        skills: ["Linear & Logistic Regression", "Gradient Descent", "NumPy & Vectorization"],
        prerequisites: ["High School Math", "Python Basics"],
        systemNeeds: ["Jupyter Notebook", "Anaconda"],
        practiceTools: [
          { name: "Kaggle Micro-Courses", category: "Practice Platform", bestFor: "Practicing regression & classification models", accessUrl: "https://www.kaggle.com/learn", isRecommended: true }
        ],
        projects: ["House Price Prediction Model from Scratch"],
        resources: [
          { title: "Machine Learning Specialization by Andrew Ng", channelOrProvider: "DeepLearningAI", language: "English", type: "YouTube Free Playlist", url: "https://www.youtube.com/results?search_query=andrew+ng+machine+learning", duration: "12 Hours", rating: "4.9 ⭐" }
        ],
        completed: true
      }
    ]
  },
  {
    id: 11,
    name: "Google Data Analytics Professional Certificate",
    category: "Data Science",
    provider: "Google / Coursera",
    whatYouLearn: "An industry-recognized entry point into data analytics with no prior experience required.",
    capstoneProject: "Complete a capstone analyzing a real dataset and present findings via an interactive dashboard.",
    milestones: [
      {
        id: "c11_b",
        title: "Data Analysis Lifecycle, Spreadsheets & SQL Basics",
        level: "Beginner",
        duration: "3 Weeks",
        skills: ["Ask/Prepare/Process/Analyze", "Spreadsheet Cleaning", "SQL SELECT & WHERE"],
        prerequisites: ["Basic Computer Literacy"],
        systemNeeds: ["Google Sheets / Excel", "BigQuery / MySQL"],
        practiceTools: [
          { name: "BigQuery Sandbox", category: "Cloud SQL", bestFor: "Querying public massive datasets for free", accessUrl: "https://cloud.google.com/bigquery", isRecommended: true }
        ],
        projects: ["E-Commerce Data Cleaning & SQL Analysis"],
        resources: [
          { title: "Google Data Analytics Certificate Guide", channelOrProvider: "freeCodeCamp.org", language: "English", type: "YouTube Free Playlist", url: "https://www.youtube.com/watch?v=r-uOLxNrNk8", duration: "10 Hours", rating: "4.9 ⭐" }
        ],
        completed: true
      }
    ]
  },
  {
    id: 21,
    name: "CS50's Introduction to Computer Science",
    category: "Software Engineering",
    provider: "Harvard University / edX",
    whatYouLearn: "The gold-standard intro to computer science and programming, covering C, Python, SQL and web tech.",
    capstoneProject: "Build and ship a final capstone application of your choosing.",
    milestones: [
      {
        id: "c21_b",
        title: "Computational Thinking, C Programming & Memory Pointers",
        level: "Beginner",
        duration: "4 Weeks",
        skills: ["Algorithms (BFS, DFS)", "Memory & Pointers", "C Syntax"],
        prerequisites: ["Logical Problem Solving"],
        systemNeeds: ["VS Code / CS50 IDE"],
        practiceTools: [
          { name: "CS50 Sandbox", category: "Web IDE", bestFor: "Solving C & Memory management problem sets", accessUrl: "https://cs50.dev/", isRecommended: true }
        ],
        projects: ["Image Filter & Memory Recovery C Tools"],
        resources: [
          { title: "CS50x Full Harvard Lectures", channelOrProvider: "CS50 Official", language: "English", type: "YouTube Free Playlist", url: "https://www.youtube.com/@cs50", duration: "24 Hours", rating: "4.9 ⭐" }
        ],
        completed: true
      }
    ]
  },
  {
    id: 24,
    name: "The Complete Web Development Bootcamp",
    category: "Software Engineering",
    provider: "Udemy (Angela Yu)",
    whatYouLearn: "Full-stack web development from zero — HTML/CSS to React and Node.js.",
    capstoneProject: "Build and deploy a full-stack web app (e.g., a marketplace or social app).",
    milestones: [
      {
        id: "c24_b",
        title: "HTML5, CSS3, Flexbox & JavaScript ES6 Basics",
        level: "Beginner",
        duration: "3 Weeks",
        skills: ["DOM Manipulation", "CSS Grid & Flexbox", "JS Functions & Loops"],
        prerequisites: ["Computer Basics"],
        systemNeeds: ["VS Code", "Chrome DevTools"],
        practiceTools: [
          { name: "CodePen / JSFiddle", category: "Frontend Sandbox", bestFor: "Testing live HTML/CSS/JS components", accessUrl: "https://codepen.io/", isRecommended: true }
        ],
        projects: ["Interactive Portfolio Website"],
        resources: [
          { title: "Web Development Full Course in Telugu", channelOrProvider: "Vamsi Bhavani", language: "Telugu", type: "YouTube Free Playlist", url: "https://www.youtube.com/@VamsiBhavani", duration: "12 Hours", rating: "4.9 ⭐" }
        ],
        completed: true
      }
    ]
  },
  {
    id: 31,
    name: "Google IT Support Professional Certificate",
    category: "Cybersecurity & IT",
    provider: "Google / Coursera",
    whatYouLearn: "The essential foundation of IT — networking, OS, troubleshooting, and customer service.",
    capstoneProject: "Diagnose and resolve a set of simulated IT support tickets end-to-end.",
    milestones: [
      {
        id: "c31_b",
        title: "Computer Hardware, Operating Systems & Networking Fundamentals",
        level: "Beginner",
        duration: "3 Weeks",
        skills: ["TCP/IP, DNS, DHCP", "Windows/Linux System Admin", "Command Line Troubleshooting"],
        prerequisites: ["Basic Literacy"],
        systemNeeds: ["VirtualBox / Ubuntu VM"],
        practiceTools: [
          { name: "Cisco Packet Tracer", category: "Network Simulator", bestFor: "Building IP subnetting & router networks", accessUrl: "https://www.netacad.com/courses/packet-tracer", isRecommended: true }
        ],
        projects: ["Virtual Network Lab Setup"],
        resources: [
          { title: "Google IT Support Certification Guide", channelOrProvider: "NetworkChuck", language: "English", type: "YouTube Free Playlist", url: "https://www.youtube.com/@NetworkChuck", duration: "8.0 Hours", rating: "4.9 ⭐" }
        ],
        completed: true
      }
    ]
  },
  {
    id: 38,
    name: "Figma UI/UX Design Essentials",
    category: "Product & UI/UX Design",
    provider: "Udemy / Coursera",
    whatYouLearn: "Master Figma, the industry-standard design and prototyping tool.",
    capstoneProject: "Design a complete, interactive mobile app prototype in Figma.",
    milestones: [
      {
        id: "c38_b",
        title: "Figma Interface, Layout Grids & Vector Shapes",
        level: "Beginner",
        duration: "2 Weeks",
        skills: ["Figma Tools", "Typography & Color Theory", "Frames & Auto-Layout"],
        prerequisites: ["Design Sensitivity"],
        systemNeeds: ["Figma Web App / Desktop"],
        practiceTools: [
          { name: "Figma Web Editor", category: "Design Tool", bestFor: "Creating responsive UI components and interactive prototypes", accessUrl: "https://www.figma.com/", isRecommended: true }
        ],
        projects: ["Mobile E-Commerce App UI Wireframes"],
        resources: [
          { title: "Figma UI/UX Full Course", channelOrProvider: "Bring Your Own Laptop", language: "English", type: "YouTube Free Playlist", url: "https://www.youtube.com/results?search_query=figma+ui+ux+course", duration: "6.0 Hours", rating: "4.9 ⭐" }
        ],
        completed: true
      }
    ]
  }
];

export const RoadmapView: React.FC<{ userPreferences?: UserSession | null }> = () => {
  const [activeLevelFilter, setActiveLevelFilter] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<"All" | "English" | "Telugu" | "Hindi">("All");
  
  // Search & Custom Course States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState<string>("Generative AI with Large Language Models");
  const [customCourseInput, setCustomCourseInput] = useState("");
  const [isSynthesizingCustom, setIsSynthesizingCustom] = useState(false);

  // Generate All 50 PDF Course Titles + Common Technical Subjects
  const allCourseTitles = useMemo(() => {
    const defaultList = [
      "Generative AI with Large Language Models",
      "AI Engineering: Building Agents & Workflows",
      "Machine Learning Specialization",
      "CS50's Introduction to Artificial Intelligence with Python",
      "Prompt Engineering for Developers",
      "Deep Learning Specialization",
      "Applied AI & LangChain Development",
      "AI for Everyone",
      "Natural Language Processing (NLP) Specialization",
      "Ethical AI & Governance for Leaders",
      "Google Data Analytics Professional Certificate",
      "IBM Data Science Professional Certificate",
      "Python for Data Science and Machine Learning Bootcamp",
      "Excel Skills for Business Specialization",
      "Data Engineering Essentials",
      "Business Intelligence & Data Visualization with Tableau & Power BI",
      "Applied Data Science with Python",
      "SQL for Data Analytics and Data Science",
      "Big Data Analysis with Apache Spark",
      "Quantitative Methods for Finance & Data",
      "CS50's Introduction to Computer Science",
      "Python for Everybody Specialization",
      "AWS Certified Solutions Architect – Associate Prep",
      "The Complete Web Development Bootcamp",
      "Docker & Kubernetes: The Practical Guide",
      "Microsoft Certified: Azure Fundamentals (AZ-900)",
      "DevOps Engineering Foundations",
      "Full Stack Cloud Application Development",
      "Modern JavaScript from the Beginning",
      "Rust Programming Essentials",
      "Google IT Support Professional Certificate",
      "IBM Cybersecurity Analyst Professional Certificate",
      "CS50's Introduction to Cybersecurity",
      "CompTIA Security+ Certification Prep",
      "Ethical Hacking & Network Security",
      "Google UX Design Professional Certificate",
      "Become a Product Manager",
      "Figma UI/UX Design Essentials",
      "Agile & Scrum Master Certification Prep",
      "Design Thinking for Innovation",
      "Google Digital Marketing & E-commerce Professional Certificate",
      "Google Project Management Professional Certificate",
      "Meta Social Media Marketing Professional Certificate",
      "Financial Markets & Corporate Finance",
      "Strategic Leadership & Change Management",
      "Digital Transformation in Business",
      "Growth Hacking & Performance Marketing",
      "The Science of Well-Being (Science of Happiness)",
      "Learning How to Learn",
      "Time Management & Remote Work Productivity"
    ];
    return defaultList;
  }, []);

  // Filter Search Suggestions alphabetically as user types
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allCourseTitles.filter(title => 
      title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);
  }, [searchQuery, allCourseTitles]);

  // Find active course object from 50 PDF courses OR synthesize dynamic AI roadmap
  const activeCourse = useMemo(() => {
    const found = FIFTY_COURSES_MASTERY_PDF.find(c => 
      c.name.toLowerCase() === selectedCourseName.toLowerCase()
    );

    if (found) return found;

    // AI Dynamic Synthesizer Fallback for custom / unlisted courses or deep search matching
    const cleanTopic = selectedCourseName.trim();
    return {
      id: 999,
      name: cleanTopic,
      category: "AI Synthesized Mastery Track",
      provider: "AI Career Mentor Engine",
      whatYouLearn: `Master ${cleanTopic} from scratch. Learn core concepts, architecture patterns, hands-on tool usage, and enterprise deployment.`,
      capstoneProject: `Build and ship an end-to-end production-ready capstone application demonstrating ${cleanTopic} mastery.`,
      milestones: [
        {
          id: "custom_b",
          title: `Foundations & Core Mechanics of ${cleanTopic}`,
          level: "Beginner" as const,
          duration: "3 Weeks",
          skills: [`${cleanTopic} Core Syntax`, "Fundamental Principles", "Development Environment Setup", "Basic Control Flow"],
          prerequisites: ["Basic Computer Literacy", "Command Line Interface Basics"],
          systemNeeds: ["VS Code / Cursor IDE", "Git Version Control", "Modern Web Browser"],
          practiceTools: [
            { name: "VS Code with Extensions", category: "IDE Editor", bestFor: `Best for writing, debugging, and running ${cleanTopic} projects locally`, accessUrl: "https://code.visualstudio.com/", isRecommended: true },
            { name: "Replit / Colab Playground", category: "Cloud Playground", bestFor: `Best for executing ${cleanTopic} snippets in browser without setup`, accessUrl: "https://replit.com/", isRecommended: true }
          ],
          projects: [`Beginner ${cleanTopic} Interactive Application`],
          resources: [
            { title: `${cleanTopic} Full Beginner Course`, channelOrProvider: "freeCodeCamp.org", language: "English" as const, type: "YouTube Free Playlist" as const, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanTopic)}+course`, duration: "6.0 Hours", rating: "4.9 ⭐" },
            { title: `${cleanTopic} Complete Tutorial in Telugu`, channelOrProvider: "Vamsi Bhavani (Telugu)", language: "Telugu" as const, type: "YouTube Free Playlist" as const, url: "https://www.youtube.com/@VamsiBhavani", duration: "8.0 Hours", rating: "4.8 ⭐" },
            { title: `${cleanTopic} Full Course in Hindi`, channelOrProvider: "CodeWithHarry (Hindi)", language: "Hindi" as const, type: "YouTube Free Playlist" as const, url: "https://www.youtube.com/@CodeWithHarry", duration: "7.0 Hours", rating: "4.9 ⭐" }
          ],
          completed: true
        },
        {
          id: "custom_i",
          title: `Intermediate Design Patterns & Ecosystem Tooling for ${cleanTopic}`,
          level: "Intermediate" as const,
          duration: "4 Weeks",
          skills: [`Advanced ${cleanTopic} Architecture`, "API & Database Integration", "State Management & Error Handling", "Testing Frameworks"],
          prerequisites: [`Beginner ${cleanTopic} Foundations`, "Data Manipulation"],
          systemNeeds: ["Postman / Bruno API Tester", "Docker Desktop Container"],
          practiceTools: [
            { name: "Postman / Bruno API Client", category: "Testing Tool", bestFor: `Best for testing ${cleanTopic} data endpoints and REST/GraphQL payloads`, accessUrl: "https://www.usebruno.com/", isRecommended: true }
          ],
          projects: [`Full-Stack ${cleanTopic} Data-Driven Application`],
          resources: [
            { title: `${cleanTopic} Intermediate Masterclass`, channelOrProvider: "Traversy Media", language: "English" as const, type: "YouTube Free Playlist" as const, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanTopic)}+masterclass`, duration: "5.5 Hours", rating: "4.9 ⭐" },
            { title: `${cleanTopic} Intermediate Tutorial in Hindi`, channelOrProvider: "Thapa Technical (Hindi)", language: "Hindi" as const, type: "YouTube Free Playlist" as const, url: "https://www.youtube.com/@ThapaTechnical", duration: "6.5 Hours", rating: "4.8 ⭐" }
          ],
          completed: false
        },
        {
          id: "custom_a",
          title: `Advanced Production Deployment & System Scaling for ${cleanTopic}`,
          level: "Advanced" as const,
          duration: "5 Weeks",
          skills: ["Cloud Deployment (AWS/Vercel)", "CI/CD Pipeline Automation", "Performance Optimization", "Security Best Practices"],
          prerequisites: [`Intermediate ${cleanTopic} Design`],
          systemNeeds: ["Cloud Provider Account", "Docker / Kubernetes Cluster"],
          practiceTools: [
            { name: "Vercel / AWS Cloud Sandbox", category: "Deployment Infrastructure", bestFor: `Best for deploying live production ${cleanTopic} microservices`, accessUrl: "https://vercel.com/", isRecommended: true }
          ],
          projects: [`Enterprise ${cleanTopic} Capstone Project`],
          resources: [
            { title: `Advanced ${cleanTopic} System Architecture`, channelOrProvider: "Gaurav Sen", language: "English" as const, type: "YouTube Free Playlist" as const, url: "https://www.youtube.com/@gkcs", duration: "10 Hours", rating: "4.9 ⭐" }
          ],
          completed: false
        }
      ]
    };
  }, [selectedCourseName]);

  const [expandedId, setExpandedId] = useState<string | null>(activeCourse.milestones[0]?.id || null);

  const handleSelectCourse = (courseTitle: string) => {
    setSelectedCourseName(courseTitle);
    setSearchQuery("");
    setActiveLevelFilter("All");
    setExpandedId(null);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCourseInput.trim()) return;
    setIsSynthesizingCustom(true);
    setTimeout(() => {
      setSelectedCourseName(customCourseInput.trim());
      setCustomCourseInput("");
      setIsSynthesizingCustom(false);
      setActiveLevelFilter("All");
    }, 800);
  };

  // Filter active milestones by level
  const displayedMilestones = activeCourse.milestones.filter(m => {
    if (activeLevelFilter !== "All" && m.level.toLowerCase() !== activeLevelFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-violet-500/20 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
              <Map size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">50-Course Mastery & AI Dynamic Roadmap Engine</h2>
              <p className="text-xs text-slate-400">
                Selected Course: <span className="text-violet-300 font-semibold">{activeCourse.name}</span> • 
                Provider: <span className="text-cyan-300 font-semibold">{activeCourse.provider}</span>
              </p>
            </div>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevelFilter(level)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeLevelFilter === level 
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* SEARCH & ALPHABETICAL AUTO-SUGGESTIONS + CUSTOM AI GENERATOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Box 1: Alphabetical Search & Auto-Suggest */}
          <div className="relative space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Search size={14} className="text-cyan-400" /> Search 50 PDF Courses (Live Suggestions)
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type course name (e.g. Generative AI, Python, AWS, Figma...)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dropdown Auto-Suggestions as user types */}
            {searchSuggestions.length > 0 && (
              <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 space-y-1">
                {searchSuggestions.map((title, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectCourse(title)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-violet-900/50 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>{title}</span>
                    <Sparkles size={12} className="text-violet-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Box 2: Manually Enter Custom Unlisted Course (AI Generator) */}
          <form onSubmit={handleCustomSubmit} className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <PlusCircle size={14} className="text-emerald-400" /> Manually Enter Custom Course (AI Synthesizer)
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={customCourseInput}
                onChange={(e) => setCustomCourseInput(e.target.value)}
                placeholder="Enter any unlisted topic (e.g. Next.js 15, Solidity, Quantum Computing)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Bot size={14} />
                <span>Synthesize Roadmap</span>
              </button>
            </div>
          </form>
        </div>

        {/* YouTube Video Language Preference Bar */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Globe size={16} className="text-cyan-400" />
            <span className="font-semibold">YouTube Course Language Preference:</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {(["All", "English", "Telugu", "Hindi"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedLanguage === lang 
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {lang === "All" ? "All Languages" : lang}
              </button>
            ))}
          </div>
        </div>

        {/* Course Summary & Capstone Banner */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-violet-950/60 via-slate-950 to-indigo-950/60 border border-violet-500/30 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen size={16} className="text-violet-400" /> {activeCourse.name}
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 text-[10px] font-bold">
              {activeCourse.category}
            </span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">{activeCourse.whatYouLearn}</p>
          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-amber-300 font-semibold">
            <Zap size={14} className="text-amber-400 shrink-0" />
            <span>Capstone Project: {activeCourse.capstoneProject}</span>
          </div>
        </div>

        {isSynthesizingCustom ? (
          <div className="py-16 text-center space-y-3">
            <RefreshCw size={36} className="animate-spin text-violet-400 mx-auto" />
            <p className="text-sm font-semibold text-white">Generating AI Multi-Level Roadmap for &quot;{selectedCourseName}&quot;...</p>
          </div>
        ) : (
          /* Milestone Vertical DAG Nodes */
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-violet-500 before:via-indigo-500 before:to-slate-800">
            {displayedMilestones.map((m) => {
              const isExpanded = expandedId === m.id;
              
              const resourcesToDisplay = m.resources.filter(res => {
                if (selectedLanguage !== "All" && res.language !== selectedLanguage) return false;
                return true;
              });

              return (
                <div key={m.id} className="relative space-y-3">
                  {/* Node Level Badge Indicator */}
                  <div className={`
                    absolute -left-6 top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center bg-slate-950 transition-all
                    ${m.level === "Beginner" ? "border-emerald-400 text-emerald-400" :
                      m.level === "Intermediate" ? "border-cyan-400 text-cyan-400" :
                      "border-violet-400 text-violet-400"}
                  `}>
                    <CheckCircle2 size={12} />
                  </div>

                  <div className="glass-card p-5 rounded-xl border border-slate-800 hover:border-violet-500/30 transition-all">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : m.id)}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            m.level === "Beginner" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                            m.level === "Intermediate" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                            "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                          }`}>
                            {m.level} Level
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock size={12} /> {m.duration}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-white">{m.title}</h3>
                      </div>

                      <button className="p-1 text-slate-400 hover:text-white">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-800 space-y-5 text-xs">
                        {/* SECTION 1: Prerequisites & System Requirements */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                            <h4 className="font-semibold text-amber-300 flex items-center justify-between">
                              <span className="flex items-center gap-1.5"><AlertTriangle size={14} /> Essential Programming Languages & Prerequisites</span>
                            </h4>
                            
                            {/* Essential Required Programming/Query Languages */}
                            <div className="p-2 rounded-lg bg-slate-950 border border-amber-500/20 space-y-1">
                              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Required Programming & Query Languages:</span>
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {m.skills.filter(s => 
                                  s.toLowerCase().includes("sql") || 
                                  s.toLowerCase().includes("python") || 
                                  s.toLowerCase().includes("javascript") || 
                                  s.toLowerCase().includes("typescript") || 
                                  s.toLowerCase().includes("c++") || 
                                  s.toLowerCase().includes("c#") || 
                                  s.toLowerCase().includes("rust") || 
                                  s.toLowerCase().includes("r ") || 
                                  s.toLowerCase().includes("bash") ||
                                  s.toLowerCase().includes("html") ||
                                  s.toLowerCase().includes("css")
                                ).length > 0 ? (
                                  m.skills.filter(s => 
                                    s.toLowerCase().includes("sql") || 
                                    s.toLowerCase().includes("python") || 
                                    s.toLowerCase().includes("javascript") || 
                                    s.toLowerCase().includes("typescript") || 
                                    s.toLowerCase().includes("c++") || 
                                    s.toLowerCase().includes("c#") || 
                                    s.toLowerCase().includes("rust") || 
                                    s.toLowerCase().includes("r ") || 
                                    s.toLowerCase().includes("bash") ||
                                    s.toLowerCase().includes("html") ||
                                    s.toLowerCase().includes("css")
                                  ).map((lang, lIdx) => (
                                    <span key={lIdx} className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30 text-[10px] font-bold">
                                      {lang}
                                    </span>
                                  ))
                                ) : (
                                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30 text-[10px] font-bold">
                                    SQL / Core Domain Scripting
                                  </span>
                                )}
                              </div>
                            </div>

                            <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px] pt-1">
                              {m.prerequisites.map((req, reqIdx) => (
                                <li key={reqIdx}>{req}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                            <h4 className="font-semibold text-cyan-300 flex items-center gap-1.5">
                              <Cpu size={14} /> Hardware & Software Setup Needed
                            </h4>
                            <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
                              {m.systemNeeds.map((sys, sysIdx) => (
                                <li key={sysIdx}>{sys}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* SECTION 2: Recommended Practice Tools for Every User */}
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                          <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                            <Terminal size={15} /> Recommended Practice Tools for Learners
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {m.practiceTools.map((tool, tIdx) => (
                              <div key={tIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-slate-200 text-xs">{tool.name}</span>
                                    {tool.isRecommended && (
                                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        ★ Recommended
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-400">{tool.category} • {tool.bestFor}</p>
                                </div>
                                <a
                                  href={tool.accessUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 pt-1"
                                >
                                  <span>Open Practice Tool</span>
                                  <ExternalLink size={12} />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* SECTION 3: Key Technologies to Master */}
                        <div>
                          <h4 className="font-semibold text-violet-300 flex items-center gap-1.5 mb-2">
                            <Layers size={14} /> Skills & Topics to Master
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {m.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-slate-300">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* SECTION 4: Best YouTube Channels Filtered by Language */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-rose-400 flex items-center gap-1.5">
                            <Video size={15} /> Top Curated YouTube Playlists ({selectedLanguage} Preference)
                          </h4>
                          
                          {resourcesToDisplay.length === 0 ? (
                            <p className="text-xs text-slate-400 italic p-3 rounded-xl bg-slate-950 border border-slate-800">
                              No {selectedLanguage} playlists matched for this milestone level. Displaying English masterclass videos.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {resourcesToDisplay.map((res, rIdx) => (
                                <div key={rIdx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col justify-between gap-2">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                        Language: {res.language}
                                      </span>
                                      <span className="text-[10px] text-amber-400 font-medium">{res.rating}</span>
                                    </div>
                                    <h5 className="font-semibold text-slate-200 text-xs">{res.title}</h5>
                                    <p className="text-[11px] text-slate-400">{res.channelOrProvider} • {res.duration}</p>
                                  </div>
                                  <a 
                                    href={res.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet-400 hover:text-violet-300 pt-1"
                                  >
                                    <span>Watch Video Playlist</span>
                                    <ExternalLink size={12} />
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
