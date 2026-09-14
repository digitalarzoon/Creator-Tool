import React from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  BarChart3, 
  CheckCircle2, 
  Zap, 
  Eye, 
  ThumbsUp, 
  Gauge,
  ArrowUpRight,
  Search,
  Play
} from 'lucide-react';

export const HeroDashboardVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      
      {/* Background Decorative Glow */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Dashboard Card */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-5 md:p-6 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
              Creator Studio Hub
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/60">
              Sample Data
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Workflow: Active
            </span>
          </div>
        </div>

        {/* Workflow Path Indicator */}
        <div className="py-3 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider overflow-x-auto no-scrollbar gap-2">
          <span className="text-violet-600 dark:text-violet-400">01 Research</span>
          <span>→</span>
          <span className="text-indigo-600 dark:text-indigo-400">02 Create</span>
          <span>→</span>
          <span className="text-emerald-600 dark:text-emerald-400">03 Optimize</span>
          <span>→</span>
          <span className="text-amber-600 dark:text-amber-400">04 Grow</span>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-semibold">Subscribers</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">124.8K</p>
            <span className="text-[10px] font-bold text-emerald-600">+14.2% mo/mo</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-semibold">30d Views</span>
              <Eye className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">840.2K</p>
            <span className="text-[10px] font-bold text-indigo-600">+28.5% pacing</span>
          </div>

          <div className="p-3 rounded-2xl bg-violet-50/70 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/50">
            <div className="flex items-center justify-between text-violet-500 mb-1">
              <span className="text-[10px] font-semibold">SEO Score</span>
              <Gauge className="w-3.5 h-3.5 text-violet-600" />
            </div>
            <p className="text-base font-extrabold text-violet-700 dark:text-violet-300">96/100</p>
            <span className="text-[10px] font-bold text-violet-600">Optimal Hook</span>
          </div>
        </div>

        {/* Video Performance & Thumbnail Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 mb-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Latest Video Performance
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              Top 1 of 10
            </span>
          </div>

          <div className="flex gap-3 items-center">
            {/* Thumbnail Mockup */}
            <div className="relative w-28 aspect-video rounded-xl bg-slate-900 overflow-hidden shrink-0 shadow-sm border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
                alt="Video Thumbnail Preview"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                <span className="text-[8px] font-black text-amber-300 tracking-wider">DON'T DO THIS</span>
              </div>
              <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-white text-[8px] font-mono">
                12:40
              </span>
            </div>

            {/* Video Details */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                How I Built a $10k/mo Micro SaaS with AI in 2026
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                  <Eye className="w-3 h-3 text-slate-400" /> 48.2K views
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-slate-400" /> 98.4% ratio
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-medium">
                  CTR: 11.2%
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                  Retention: 64%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Generator Real-Time Preview Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50/70 dark:from-slate-800/80 dark:to-violet-950/30 border border-violet-200/70 dark:border-violet-800/50">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-violet-900 dark:text-violet-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              AI Script & Title Engine
            </span>
            <span className="text-[9px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              Gemini Powered
            </span>
          </div>
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 italic">
            "The 3-Second Hook: 99% of creators build videos backwards. Here is the 1 framework that changes everything."
          </p>
          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-violet-200/50 dark:border-violet-900/50 text-[10px] text-slate-500">
            <span>Hook Strength: <strong>96/100</strong></span>
            <span className="text-violet-700 dark:text-violet-300 font-bold flex items-center gap-0.5">
              Ready to export <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

      </div>

      {/* Floating Badge 1: Competitor Alert */}
      <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl animate-bounce-slow">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
          +42%
        </div>
        <div>
          <p className="text-xs font-bold text-slate-800 dark:text-white">Content Gap Found</p>
          <p className="text-[10px] text-slate-400">Competitor missing 3 key search queries</p>
        </div>
      </div>

      {/* Floating Badge 2: Keyword Velocity */}
      <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
        <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
        <span className="text-xs font-bold text-slate-800 dark:text-white">
          Trending Niche Alert
        </span>
      </div>

    </div>
  );
};
