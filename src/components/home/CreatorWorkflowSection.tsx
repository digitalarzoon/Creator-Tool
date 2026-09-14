import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Palette, 
  Gauge, 
  BarChart3, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';

export const CreatorWorkflowSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Research',
      tagline: 'Discover High-Intent Topics',
      desc: 'Identify low-competition keywords, trending breakout queries, and competitor content gaps before recording a single second.',
      icon: Search,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      to: '/category/research',
      toolsCount: '14 Tools'
    },
    {
      step: '02',
      title: 'Create',
      tagline: 'High-Retention Scripts & Hooks',
      desc: 'Generate viral 0-15s hooks, retention-engineered script chapters with visual B-roll cues, and psychological title variations.',
      icon: Sparkles,
      color: 'from-violet-600 to-purple-600',
      bgColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
      to: '/category/create',
      toolsCount: '12 Tools'
    },
    {
      step: '03',
      title: 'Design',
      tagline: 'High-CTR Thumbnail Blueprints',
      desc: 'Craft scroll-stopping thumbnail concepts, download 1080p MaxRes thumbnails for research, and verify mobile contrast.',
      icon: Palette,
      color: 'from-pink-600 to-rose-600',
      bgColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
      to: '/category/design',
      toolsCount: '12 Tools'
    },
    {
      step: '04',
      title: 'Optimize',
      tagline: 'Dominate YouTube SEO',
      desc: 'Maximize metadata readiness with search intent alignment, optimized description timestamps, and targeted YouTube tag clouds.',
      icon: Gauge,
      color: 'from-amber-600 to-orange-600',
      bgColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      to: '/category/optimize',
      toolsCount: '11 Tools'
    },
    {
      step: '05',
      title: 'Analyze',
      tagline: 'Channel & Video Forensics',
      desc: 'Audit view velocities, viewer engagement ratios, and competitor upload pacing using authentic public YouTube metrics.',
      icon: BarChart3,
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      to: '/category/analyze',
      toolsCount: '13 Tools'
    },
    {
      step: '06',
      title: 'Grow',
      tagline: 'Predictable Audience Scaling',
      desc: 'Build 30-day content calendars, high-converting community tab polls, and subscriber conversion loops to compound momentum.',
      icon: TrendingUp,
      color: 'from-indigo-600 to-violet-700',
      bgColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      to: '/category/grow',
      toolsCount: '10 Tools'
    }
  ];

  return (
    <section className="py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span>The Creator Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Proven 6-Stage YouTube Growth Engine
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            Move seamlessly from raw idea to optimized, high-ranking video without juggling dozens of disconnected apps.
          </p>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.step}
                to={s.to}
                className="group relative flex flex-col justify-between p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${s.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">
                        {s.toolsCount}
                      </span>
                      <span className="text-xl font-black text-slate-200 dark:text-slate-800 group-hover:text-violet-200 dark:group-hover:text-violet-900/60 transition-colors font-mono">
                        {s.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-0.5">
                    {s.tagline}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                  <span>Explore {s.title} Tools</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
