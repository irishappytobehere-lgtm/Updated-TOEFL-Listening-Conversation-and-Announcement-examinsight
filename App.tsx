import React, { useState, useMemo } from 'react';
import { DATASET } from './constants';
import { SummaryCards } from './components/SummaryCards';
import { DashboardCharts } from './components/DashboardCharts';
import { DataTable } from './components/DataTable';
import { LayoutDashboard, Table as TableIcon, Filter, X } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'table'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [selectedPoint, setSelectedPoint] = useState<string>('All');

  // Extract unique filter options
  const uniqueSources = useMemo(() => ['All', ...Array.from(new Set(DATASET.map(d => d.source)))], []);
  const uniquePoints = useMemo(() => {
    // Simplify points for the filter dropdown
    const rawPoints = Array.from(new Set(DATASET.map(d => d.point)));
    return ['All', ...rawPoints];
  }, []);

  // Filter Data Logic
  const filteredData = useMemo(() => {
    return DATASET.filter(item => {
      const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSource = selectedSource === 'All' || item.source === selectedSource;
      const matchesPoint = selectedPoint === 'All' || item.point === selectedPoint;
      
      return matchesSearch && matchesSource && matchesPoint;
    });
  }, [searchTerm, selectedSource, selectedPoint]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">TOEFL Listening Overview</h1>
                  <p className="text-xs text-slate-500 font-medium">Conversation and Announcement Analysis</p>
                </div>
              </div>
              <div className="hidden md:ml-8 md:flex md:space-x-4">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'dashboard' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <LayoutDashboard size={18} />
                    <span>Overview</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('table')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'table' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                   <div className="flex items-center space-x-2">
                    <TableIcon size={18} />
                    <span>Question DB</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex items-center">
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Last updated: Today
               </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section removed as it is now in navbar/more implicit */}

        {/* Global Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center text-slate-400 mr-2">
            <Filter size={20} />
            <span className="ml-2 font-medium text-sm text-slate-600">Filters:</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 w-full">
            <div className="relative">
              <select 
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-sm border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-50 border"
              >
                {uniqueSources.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sources' : s}</option>)}
              </select>
            </div>

            <div className="relative">
              <select 
                value={selectedPoint}
                onChange={(e) => setSelectedPoint(e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-sm border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-50 border"
              >
                {uniquePoints.map(p => <option key={p} value={p}>{p === 'All' ? 'All Types' : p}</option>)}
              </select>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-sm border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-50 border"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <SummaryCards data={filteredData} />

        {activeTab === 'dashboard' ? (
          <DashboardCharts data={filteredData} />
        ) : (
          <DataTable data={filteredData} />
        )}

      </main>
    </div>
  );
}

export default App;