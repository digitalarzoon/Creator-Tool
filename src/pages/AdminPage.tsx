import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Database, 
  Users, 
  Sliders, 
  Search,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { TOOLS, CATEGORIES } from '../data/tools.ts';

export const AdminPage: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // If not admin, redirect to dashboard or home
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mb-3" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Access Required</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm text-center">
          This portal is restricted to authorized CreatorGrow administrators ({currentUser?.email || 'Unauthorized'}).
        </p>
        <Link to="/" className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold">
          Return to Home
        </Link>
      </div>
    );
  }

  const filteredTools = TOOLS.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Administrator Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              CreatorGrow System Control
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Logged in as admin: <strong className="text-violet-600">{currentUser?.email}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" /> Firestore & Auth Connected
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Registered Tools</span>
              <Activity className="w-4 h-4 text-violet-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{TOOLS.length}</p>
            <span className="text-[11px] text-emerald-600 font-bold">100% Active</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">AI Engine</span>
              <Sparkles className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-base font-bold text-slate-900 dark:text-white">Gemini 2.5 Flash</p>
            <span className="text-[11px] text-emerald-600 font-bold">Latency: ~600ms</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Workflow Categories</span>
              <Sliders className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">7 Stages</p>
            <span className="text-[11px] text-slate-400">Research → Shorts</span>
          </div>
        </div>

        {/* Tool Management Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Catalog Administration ({TOOLS.length} tools)
            </h3>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="pb-3 pl-2">Tool Name</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Slug</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredTools.map(tool => (
                  <tr key={tool.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-3 pl-2 font-bold text-slate-900 dark:text-white">
                      {tool.name}
                    </td>
                    <td className="py-3 capitalize text-slate-500">
                      {tool.category}
                    </td>
                    <td className="py-3 font-mono text-[11px] text-slate-400">
                      {tool.slug}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                        Live
                      </span>
                    </td>
                    <td className="py-3 pr-2 text-right">
                      <Link
                        to={`/tools/${tool.slug}`}
                        className="text-violet-600 dark:text-violet-400 font-bold hover:underline"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
