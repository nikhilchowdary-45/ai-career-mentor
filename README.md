# AI Career Mentor

[![Next.js Version](https://img.shields.io/badge/Next.js-16.2.11--Turbopack-blueviolet?logo=nextdotjs&style=flat-square)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/React-19.2.4-cyan?logo=react&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-emerald?logo=fastapi&style=flat-square)](https://fastapi.tiangolo.com/)
[![Three.js](https://img.shields.io/badge/WebGL-Three.js--R3F-orange?logo=three.js&style=flat-square)](https://threejs.org/)

An enterprise-grade, immersive career guidance and learning optimization platform. Engineered with a Next.js App Router frontend, a FastAPI backend, and an interactive 3D WebGL space canvas, **AI Career Mentor** acts as a personal coach—helping developers, switchers, and graduates map out skills, optimize resumes, and practice live mock interviews.

---

## 🚀 Key Modules & Features

### 🌌 1. 3D WebGL Space Canvas
*   Interactive particle field rendering 1,200 floating stars and an orbiting wireframe icosahedron.
*   **Performance Optimization:** Listens to the browser visibility API to toggle rendering (`frameloop="never"`) when the user switches tabs, reducing GPU/CPU load to exactly zero.
*   **React Purity Compliance:** Built with deterministic Linear Congruential Generators (LCG) to preserve pure render checks under React 19.

### 🗺️ 2. Dynamic Career Roadmaps
*   Multilevel progression paths (**Beginner → Intermediate → Advanced**) custom-tailored to 50+ built-in tech career paths.
*   Presents interactive needs, prerequisites (SQL, Python, etc.), and matches the best learning tools.
*   Automated AI roadmap generator for custom inputs, featuring an autocomplete search index.

### 📝 3. Tailored Skill Assessments
*   Dynamic, role-specific question banks that test core conceptual and practical competencies.
*   Generates comprehensive, data-driven report scorecards showing career match scores, time-taken breakdowns, and action items.

### 📂 4. Resume Parser & Analyzer
*   Secure local file uploads supporting PDF/Doc resume parsing.
*   Extracts relevant keywords, flags skill gaps, and scores overall compatibility against target roles.

### 🎙️ 5. AI Interview Coach & Chatbot
*   Interactive audio-visual console simulating live interview questions.
*   Context-aware AI career counselor powered by LLM parameters to address career switch issues, profile guidance, and roadmap queries.

---

## 🛠️ Technology Stack

### Frontend Architecture
*   **Framework:** Next.js 16 (App Router) using Turbopack compiler.
*   **Runtime Library:** React 19 (Hooks, strict purity, and deferred microtask updates).
*   **Styling:** Custom CSS + Glassmorphic elements.
*   **3D Graphics:** React Three Fiber (R3F) & `@react-three/drei` (WebGL wrapper).
*   **Icons:** Lucide React.

### Backend Infrastructure
*   **Core Engine:** FastAPI (Python).
*   **Features:** CORS-safe origins, secure API router.

---

## ⚙️ Quick Start & Local Setup

### 1. Prerequisites
Ensure you have node version `v18+` and npm installed.

### 2. Frontend Installation
Clone the repository and install project dependencies:
```bash
# Clone the repository
git clone https://github.com/your-username/ai-career-mentor.git
cd ai-career-mentor

# Install clean dependency node tree
npm install
```

### 3. Run the Development Server
Start the frontend Next.js development server:
```bash
npm run dev
```
*   **Local Access:** [http://localhost:3000](http://localhost:3000)
*   **Local Network Access:** [http://192.168.1.6:3000](http://192.168.1.6:3000)

### 4. Running the Production Build
Generate an optimized production build:
```bash
npm run build
npm start
```

---

## 🔒 Security & Safe Sandboxing
*   **Hydration Gates:** Initialized with an asynchronous loading page client wrapper to guarantee zero layout shifts (CLS) on slow networks or cookie-restricted browser sandboxes.
*   **Guarded Storage:** All `localStorage` interactions are isolated inside try-catch validation blocks, shielding the app lifecycle from sandbox errors.
*   **Network Dev Access:** Pre-configured `allowedDevOrigins` inside `next.config.ts` to support external devices connected via local routers.
