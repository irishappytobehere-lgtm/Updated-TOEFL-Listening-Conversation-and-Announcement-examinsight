import React from 'react';
import { QuestionItem } from '../types';
import { Search } from 'lucide-react';

interface DataTableProps {
  data: QuestionItem[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold w-24">ID</th>
              <th className="p-4 font-semibold w-40">Source (题源)</th>
              <th className="p-4 font-semibold w-32">Code (题号)</th>
              <th className="p-4 font-semibold w-48">Point (考点)</th>
              <th className="p-4 font-semibold">Question (题目)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="p-4 text-slate-400 font-mono text-xs">#{item.id}</td>
                  <td className="p-4 text-slate-700 font-medium text-sm">
                    <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 text-xs">
                      {item.source}
                    </span>
                  </td>
                  <td className="p-4 text-blue-600 font-mono text-sm font-semibold">{item.code}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium 
                      ${item.point.includes('main idea') ? 'bg-blue-100 text-blue-700' : 
                        item.point.includes('detail') ? 'bg-green-100 text-green-700' :
                        item.point.includes('inference') ? 'bg-purple-100 text-purple-700' :
                        item.point.includes('purpose') ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                      {item.point}
                    </span>
                  </td>
                  <td className="p-4 text-slate-700 text-sm">{item.question}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400 flex flex-col items-center justify-center">
                  <Search size={48} className="mb-2 opacity-20" />
                  No results found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 p-3 border-t border-slate-200 text-xs text-slate-500 flex justify-between">
        <span>Showing {data.length} records</span>
      </div>
    </div>
  );
};
