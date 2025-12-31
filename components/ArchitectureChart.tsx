
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

const data = [
  { name: 'Next.js (App Dir)', score: 95, fill: '#f472b6' },
  { name: 'FastAPI Backend', score: 98, fill: '#10b981' },
  { name: 'LangGraph Engine', score: 92, fill: '#a855f7' },
  { name: 'Docker Orchestration', score: 88, fill: '#3b82f6' },
  { name: 'UIAssistant Components', score: 90, fill: '#06b6d4' },
];

const ArchitectureChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-slate-900/30 p-8 rounded-3xl border border-slate-800 shadow-inner">
      <h3 className="text-xl font-bold mb-6 text-slate-100 flex items-center gap-2">
        <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
        System Integration Cohesion
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 40, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="#64748b" 
            fontSize={12}
            width={150}
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip 
            cursor={{fill: '#1e293b', opacity: 0.4}}
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
          />
          <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={32}>
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ArchitectureChart;
