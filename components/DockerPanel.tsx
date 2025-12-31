
import React, { useState } from 'react';

const DockerPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compose' | 'nextjs' | 'python'>('compose');

  const snippets = {
    compose: `version: '3.9'
services:
  frontend:
    build: ./next-app
    ports: ["3000:3000"]
    env_file: .env.production
    depends_on: [backend]

  backend:
    build: ./fastapi-agent
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://agent:agent@db:5432/agents
      - LANGCHAIN_TRACING_V2=true
    depends_on: [db, redis]

  redis:
    image: redis:alpine # Used for LangGraph persistence`,
    nextjs: `# --- Stage 1: Base image ---
# Use alpine for a smaller footprint and reduced attack surface
FROM node:18-alpine AS base

# --- Stage 2: Install dependencies ---
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Copy lock files to leverage Docker layer caching
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

# --- Stage 3: Build application ---
FROM base AS builder
WORKDIR /app
# Copy deps from previous stage to avoid re-installing
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Disable telemetry during build for privacy and speed
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

# --- Stage 4: Production runner ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Security Best Practice: Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Only copy necessary files to keep the final image as light as possible
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]`,
    python: `FROM python:3.11-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Enterprise Orchestration</h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Deploying a production-ready agent stack requires seamless coordination between Next.js (SSR/ISR), 
            FastAPI (Agent Endpoints), and LangGraph (Persistence). Docker Compose ties these together for 
            reproducible environments.
          </p>
          <div className="space-y-4">
            <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex gap-4">
              <div className="text-2xl">⚡</div>
              <div>
                <h4 className="font-bold text-slate-200">Next.js Multi-Stage</h4>
                <p className="text-sm text-slate-500">Minimize image size by separating build and run environments.</p>
              </div>
            </div>
            <div className="p-5 bg-green-500/5 rounded-2xl border border-green-500/10 flex gap-4">
              <div className="text-2xl">🤖</div>
              <div>
                <h4 className="font-bold text-slate-200">FastAPI Async Workers</h4>
                <p className="text-sm text-slate-500">Optimized for high-latency LLM calls and tool execution.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
          <div className="flex border-b border-slate-700 bg-slate-800/50">
            {['compose', 'nextjs', 'python'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                {tab === 'compose' ? 'Stack Compose' : tab === 'nextjs' ? 'Next.js Image' : 'FastAPI Image'}
              </button>
            ))}
          </div>
          <pre className="p-8 text-sm code-font overflow-x-auto text-blue-100/70 leading-relaxed max-h-[500px]">
            {snippets[activeTab]}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DockerPanel;
