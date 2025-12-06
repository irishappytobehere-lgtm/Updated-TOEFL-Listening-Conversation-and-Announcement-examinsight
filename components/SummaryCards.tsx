import React from 'react';
import { BookOpen, Archive, CheckCircle, Star } from 'lucide-react';
import { QuestionItem } from '../types';

interface SummaryCardsProps {
  data: QuestionItem[];
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const totalQuestions = data.length;
  const sourcesCount = new Set(data.map(d => d.source)).size;
  
  // Normalize points to count unique types correctly
  const uniqueTypes = new Set(data.map(d => {
    const p = d.point.split('/')[0].split(' (')[0].trim();
    return p.includes('detail') ? 'detail' : p;
  })).size;

  const mostCommonPoint = data.reduce((acc, curr) => {
    let p = curr.point.split('/')[0].split(' (')[0].trim();
    if (p.includes('detail')) p = 'detail';
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topPointEntry = Object.entries(mostCommonPoint).sort((a, b) => (b[1] as number) - (a[1] as number))[0];
  const topType = topPointEntry ? topPointEntry[0] : '-';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Questions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <BookOpen size={24} />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Total Questions</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">{totalQuestions}</h3>
        </div>
      </div>

      {/* Unique Sources */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
          <Archive size={24} />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Unique Sources</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">{sourcesCount}</h3>
        </div>
      </div>

      {/* Question Types */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
          <CheckCircle size={24} />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Question Types</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">{uniqueTypes}</h3>
        </div>
      </div>

      {/* Top Type */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
          <Star size={24} />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Top Type</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1 capitalize">{topType}</h3>
        </div>
      </div>
    </div>
  );
};