import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { QuestionItem } from '../types';

interface DashboardChartsProps {
  data: QuestionItem[];
}

// Consistent color palette for question types
const COLOR_MAP: Record<string, string> = {
  'purpose': '#3b82f6', // Blue
  'detail': '#ef4444', // Red
  'inference': '#f59e0b', // Amber/Orange
  'suggestion': '#10b981', // Green
  'main idea': '#8b5cf6', // Purple
  'reasons': '#ec4899', // Pink
  'next move': '#f97316', // Orange-Red
  'opinion': '#06b6d4', // Cyan
  'default': '#94a3b8' // Slate
};

const normalizePoint = (p: string) => {
  const clean = p.split('/')[0].split(' (')[0].trim();
  if (clean.includes('detail')) return 'detail';
  return clean;
};

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  
  // 1. Module 1 Data Processing
  const m1Data = useMemo(() => {
    const m1Questions = data.filter(d => d.code.startsWith('M1'));
    const counts: Record<string, number> = {};
    m1Questions.forEach(item => {
      const p = normalizePoint(item.point);
      counts[p] = (counts[p] || 0) + 1;
    });
    return Object.keys(counts)
      .map(name => ({ name, value: counts[name] }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  const m1Total = useMemo(() => data.filter(d => d.code.startsWith('M1')).length, [data]);

  // 2. Module 2 Data Processing
  const m2Data = useMemo(() => {
    const m2Questions = data.filter(d => d.code.startsWith('M2'));
    const counts: Record<string, number> = {};
    m2Questions.forEach(item => {
      const p = normalizePoint(item.point);
      counts[p] = (counts[p] || 0) + 1;
    });
    return Object.keys(counts)
      .map(name => ({ name, value: counts[name] }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  const m2Total = useMemo(() => data.filter(d => d.code.startsWith('M2')).length, [data]);

  // 3. Comparative Data Processing
  const comparisonData = useMemo(() => {
    const allTypes = new Set<string>();
    data.forEach(d => allTypes.add(normalizePoint(d.point)));
    
    return Array.from(allTypes).map(type => {
      const m1Count = data.filter(d => d.code.startsWith('M1') && normalizePoint(d.point) === type).length;
      const m2Count = data.filter(d => d.code.startsWith('M2') && normalizePoint(d.point) === type).length;
      return {
        name: type,
        M1: m1Count,
        M2: m2Count,
        total: m1Count + m2Count
      };
    }).sort((a, b) => b.total - a.total);
  }, [data]);

  return (
    <div className="space-y-6 mb-8">
      
      {/* Top Row: Module Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Module 1 Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Module 1 (M1) Breakdown</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {m1Total} Questions
            </span>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={m1Data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {m1Data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.name] || COLOR_MAP.default} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [value, 'Questions']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Module 2 Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Module 2 (M2) Breakdown</h3>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {m2Total} Questions
            </span>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={m2Data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {m2Data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.name] || COLOR_MAP.default} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [value, 'Questions']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Comparative Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Comparative Analysis: M1 vs M2 Question Types</h3>
        <p className="text-sm text-slate-500 mb-6">Side-by-side comparison of question distribution across modules.</p>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" align="right" />
              <Bar name="Module 1" dataKey="M1" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar name="Module 2" dataKey="M2" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
