
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DockerPanel from './components/DockerPanel';
import ArchitectureChart from './components/ArchitectureChart';
import LangGraphPanel from './components/LangGraphPanel';
import UIAssistant from './components/UIAssistant';

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
              NEW: Agentic Workflows with LangGraph
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">AGENTIC</span> STACK
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
              Architect stateful, production-ready AI agents with <strong>Next.js</strong>, <strong>FastAPI</strong>, and <strong>LangGraph</strong>. 
              Containerized for the cloud.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <button 
                onClick={() => scrollTo('langgraph')}
                className="bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-2xl font-bold transition-all shadow-2xl shadow-indigo-900/30 active:scale-95 text-lg"
              >
                Explore Agents
              </button>
              <button 
                onClick={() => scrollTo('docker')}
                className="bg-slate-900/50 hover:bg-slate-800 px-10 py-4 rounded-2xl font-bold border border-slate-800 transition-all active:scale-95 text-lg backdrop-blur-sm"
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
              <div key={i} className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 text-center">
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
                Building an AI agent is only 10% of the battle. The remaining 90% is ensuring 
                low-latency delivery, state persistence across restarts, and a polished frontend 
                that can stream complex outputs.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400 font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-slate-100">Stateful Cycles</h4>
                    <p className="text-sm text-slate-500">Allow agents to loop back for tool calls and self-correction.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0 text-pink-400 font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-slate-100">Next.js Streaming</h4>
                    <p className="text-sm text-slate-500">Pipe agent events directly to the UI using Server-Sent Events (SSE).</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <ArchitectureChart />
            </div>
          </div>

          {/* Interactive AI Assistant integration */}
          <div className="mt-16 pt-16 border-t border-slate-900/50">
            <h3 className="text-2xl font-bold text-center mb-8 text-slate-300">Consult the Stack Architect</h3>
            <UIAssistant />
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
              Open-source blueprint for the next generation of AI-driven web applications. 
              Designed for developers who demand performance, statefulness, and scale.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-300 mb-4 uppercase text-xs tracking-widest">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">LangGraph Docs</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">FastAPI Specs</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Next.js Patterns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-300 mb-4 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Github Repo</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Enterprise Support</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Stack Updates</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-900 text-center">
          <p className="text-xs text-slate-600 font-mono tracking-tighter">
            CONTAINERIZED & PERSISTED WITH LANGGRAPH & DOCKER // v2.4.0-STABLE
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
