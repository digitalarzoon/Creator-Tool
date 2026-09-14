import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Users, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2 
} from 'lucide-react';

export const AnalyticsShowcaseSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Data-Backed Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Understand What Actually Drives Channel Growth
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Stop guessing why videos plateau. Inspect public view trajectories, watch time multipliers, and upload cadence indicators.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
              Sample Data
            </span>
            <Link
              to="/tools/youtube-channel-analyzer"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors"
            >
              Audit Channel
            </Link>
          </div>
        </div>

        {/* Analytics Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Card */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  30-Day Channel View Velocity
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Comparative performance across published uploads vs evergreen search
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-600" /> Current Period
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Previous
                </span>
              </div>
            </div>

            {/* SVG Dynamic Chart Graphic */}
            <div className="relative h-60 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                <line x1="0" y1="190" x2="500" y2="190" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />

                {/* Area Gradient */}
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Path Area */}
                <polygon 
                  points="0,170 50,150 100,160 150,110 200,90 250,115 300,70 350,55 400,60 450,25 500,15 500,200 0,200" 
                  fill="url(#chartGrad)" 
                />

                {/* Previous Period Line */}
                <polyline 
                  fill="none" 
                  stroke="currentColor" 
                  className="text-slate-300 dark:text-slate-700" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  points="0,185 50,175 100,170 150,155 200,145 250,150 300,130 350,120 400,115 450,95 500,90" 
                />

                {/* Main Curve Line */}
                <polyline 
                  fill="none" 
                  stroke="#7C3AED" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,170 50,150 100,160 150,110 200,90 250,115 300,70 350,55 400,60 450,25 500,15" 
                />

                {/* Data Points */}
                <circle cx="350" cy="55" r="4" fill="#7C3AED" className="ring-4 ring-violet-200" />
                <circle cx="500" cy="15" r="5" fill="#7C3AED" />
              </svg>
            </div>

            {/* Bottom Chart Timeline */}
            <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Day 1</span>
              <span>Day 7 (Upload 1)</span>
              <span>Day 14</span>
              <span>Day 21 (Upload 2)</span>
              <span>Day 30</span>
            </div>
          </div>

          {/* Right Metrics Breakdown */}
          <div className="space-y-4">
            
            {/* Metric Card 1 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-semibold">Average Retention</span>
                <Clock className="w-4 h-4 text-violet-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">61.4%</span>
                <span className="text-xs font-bold text-emerald-600">+8.5% above niche avg</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Strong 0-30s hook pacing prevents early drop-off.
              </p>
            </div>

            {/* Metric Card 2 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-semibold">Impression Click-Through (CTR)</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">10.8%</span>
                <span className="text-xs font-bold text-emerald-600">Top Tier</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                High contrast thumbnail text and 45-character titles.
              </p>
            </div>

            {/* Metric Card 3 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-semibold">Subscriber Conversion Ratio</span>
                <Users className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">3.4%</span>
                <span className="text-xs font-bold text-indigo-600">34 subs / 1k views</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Direct mid-roll verbal CTA and pinned comment synergy.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
