import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DockerPanel from './components/DockerPanel';
import ArchitectureChart from './components/ArchitectureChart';
import LangGraphPanel from './components/LangGraphPanel';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 selection:bg-indigo-500/30">
      <Navbar onNavigate={scrollTo} activeSection={activeSection} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Hero Section */}
        <section id="home" className="py-20 md:py-32 space-y-12">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/5 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-semibold tracking-wide shadow-xl shadow-indigo-950/10">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Modern Agentic Stack Architecture
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">AGENTIC</span> STACK
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
              Architect stateful, production-ready AI agents with <strong>Next.js</strong>, <strong>FastAPI</strong>, and <strong>LangGraph</strong>. 
              Containerized for high-scale environments.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <button 
                onClick={() => scrollTo('langgraph')}
                className="btn-primary"
              >
                Explore Agent Logic
              </button>
              <button 
                onClick={() => scrollTo('docker')}
                className="btn-secondary"
              >
                View Docker Setup
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16">
            {[
              { label: 'Frontend', value: 'Next.js 15', color: 'text-pink-400' },
              { label: 'Orchestration', value: 'LangGraph', color: 'text-purple-400' },
              { label: 'Engine', value: 'FastAPI', color: 'text-emerald-400' },
              { label: 'Ops', value: 'Docker', color: 'text-blue-400' },
            ].map((stat, i) => (
              <div key={i} className="card-gradient p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">{stat.label}</p>
                <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LangGraph Section */}
        <section id="langgraph" className="py-24 border-t border-slate-900/50">
          <LangGraphPanel />
        </section>

        {/* Docker & Ops Section */}
        <section id="docker" className="py-24 border-t border-slate-900/50">
          <DockerPanel />
        </section>

        {/* Architecture Specs */}
        <section id="framework" className="py-24 border-t border-slate-900/50">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Holistic Integration</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Building an AI agent requires more than just a prompt. This architecture ensures 
                low-latency delivery, persistent state through cyclic graphs, and a scalable 
                backend capable of handling complex tool-use scenarios.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400 font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-slate-100">Stateful Cycles</h4>
                    <p className="text-sm text-slate-500">Enable recursive reasoning loops where agents can self-correct and verify results.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0 text-pink-400 font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-slate-100">FastAPI Async Stream</h4>
                    <p className="text-sm text-slate-500">Deliver real-time tokens and tool events to the frontend via Server-Sent Events (SSE).</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <ArchitectureChart />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#080808] py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">A</div>
               <span className="text-slate-100 font-black text-2xl tracking-tight">Agentic Stack</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              Standardized blueprint for building AI-first web platforms. 
              Focused on reliability, performance, and modern developer experience.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-300 mb-4 uppercase text-xs tracking-widest">Documentation</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Core Concepts</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Deployment Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-300 mb-4 uppercase text-xs tracking-widest">Community</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Discord Server</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Changelog</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-900 text-center">
          <p className="text-xs text-slate-600 font-mono tracking-tighter">
            PROUDLY CONTAINERIZED // STABLE v3.1.0 // &copy; 2025 AGENTIC STACK ARCHITECTS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;