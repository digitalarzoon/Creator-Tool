import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  ShieldCheck, 
  Check, 
  HelpCircle,
  TrendingUp,
  Palette,
  Gauge,
  BarChart2,
  Smartphone,
  Flame,
  Star
} from 'lucide-react';
import { CreatorWorkflowSection } from '../components/home/CreatorWorkflowSection.tsx';
import { ThumbnailShowcaseSection } from '../components/home/ThumbnailShowcaseSection.tsx';
import { AnalyticsShowcaseSection } from '../components/home/AnalyticsShowcaseSection.tsx';
import { CompetitorShowcaseSection } from '../components/home/CompetitorShowcaseSection.tsx';
import { TrendingNicheSection } from '../components/home/TrendingNicheSection.tsx';
import { ToolCard } from '../components/common/ToolCard.tsx';
import { TOOLS } from '../data/tools.ts';

export const HomePage: React.FC = () => {
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/tools?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/tools');
    }
  };

  const popularTools = TOOLS.filter(t => t.isPopular || t.featured).slice(0, 6);
  const researchTools = TOOLS.filter(t => t.category === 'research').slice(0, 3);
  const aiCreateTools = TOOLS.filter(t => t.category === 'create').slice(0, 3);
  const shortsTools = TOOLS.filter(t => t.category === 'shorts').slice(0, 3);

  const searchExamples = [
    { label: 'Find keywords', q: 'keywords' },
    { label: 'Generate a video title', q: 'title' },
    { label: 'AI thumbnail generator', q: 'thumbnail' },
    { label: 'Find video ideas', q: 'ideas' },
    { label: 'Analyze a competitor', q: 'competitor' },
    { label: 'Download 1080p thumbnail', q: 'downloader' }
  ];

  const faqs = [
    {
      q: 'How does CreatorGrow differ from generic AI tools?',
      a: 'Generic AI models generate generic prose. CreatorGrow tools are purpose-engineered around YouTube\'s specific algorithm mechanics: mobile title character cutoffs, first-30-second retention pacing, 3-word thumbnail contrast rules, and search intent classification.'
    },
    {
      q: 'Do I need a paid YouTube API key to use the platform?',
      a: 'No! You can immediately use all tools, generate titles, craft scripts, audit SEO scores, and download 1080p thumbnails without any API key. For live channel synchronization and unlimited real-time queries, you can connect your optional YouTube Data API key.'
    },
    {
      q: 'Can I use downloaded thumbnails on my own videos?',
      a: 'Downloaded thumbnails should be used strictly for research, inspiration, comparative audits, or assets you have direct ownership/permission to use. Always follow YouTube\'s community guidelines and copyright policies.'
    },
    {
      q: 'Does CreatorGrow work for YouTube Shorts?',
      a: 'Yes! We have a dedicated Shorts Lab featuring viral 0-3s hook generators, vertical script writers with seamless loop endings, and trend discovery tools designed for mobile feeds.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 2. HERO SECTION (Clean, Streamlined, High-Impact) */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        
        {/* Ambient background styling */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-cyan-50/50 via-transparent to-transparent dark:from-cyan-950/20 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/70 border border-cyan-200/80 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-bold shadow-2xs mb-6">
            <Sparkles className="w-3.5 h-3.5 fill-cyan-500 text-cyan-500" />
            <span>100% Free • No Sign-In Required • 81 Creator Tools</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Smart AI &amp; SEO Tools to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600">Accelerate Your YouTube Growth</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            Research high-ranking video topics, generate viral hooks, write high-retention scripts, and optimize SEO with 81 specialized creator tools. 100% free and open for every creator—no sign-in or credit card required.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-8">
            <Link
              to="/tools"
              className="px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span>Explore All 81 Tools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/tools/youtube-title-generator"
              className="px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white text-sm font-bold border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
            >
              Start Creating Now
            </Link>
          </div>

          {/* HERO TOOL SEARCH BAR */}
          <div className="pt-8 max-w-2xl mx-auto">
            <form 
              onSubmit={handleSearchSubmit}
              className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-xl p-1.5 focus-within:border-cyan-500 transition-colors gap-1.5 sm:gap-0"
            >
              <div className="flex items-center flex-1 px-2 py-1 sm:py-0">
                <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="What do you want to accomplish? (e.g., thumbnail, title, script, competitor)"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full bg-transparent py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-black rounded-xl bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 text-white dark:text-slate-950 transition-colors shrink-0 cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Search Tools
              </button>
            </form>

            {/* Search Example Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-500 dark:text-slate-400 mr-1">Popular:</span>
              {searchExamples.map((ex) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => navigate(`/tools?q=${encodeURIComponent(ex.q)}`)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/60 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200/60 dark:border-slate-800 transition-colors text-[11px] cursor-pointer"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. TRENDING NICHE & TREND VIDEO PERFORMANCE SECTION */}
      <TrendingNicheSection />

      {/* 4. POPULAR TOOLS */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4 fill-amber-500" />
                <span>Trending With Creators</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                Most Popular Creator Tools
              </h2>
            </div>
            <Link
              to="/tools"
              className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 flex items-center gap-1"
            >
              <span>View All 81 Tools</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CREATOR WORKFLOW (01 to 06) */}
      <CreatorWorkflowSection />

      {/* 6. RESEARCH TOOLS SHOWCASE */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Stage 01 • Discovery
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                YouTube Topic & Keyword Research
              </h3>
            </div>
            <Link
              to="/category/research"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>See All 14 Research Tools</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. AI CREATOR TOOLS SHOWCASE */}
      <section className="py-16 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Stage 02 • Content Creation
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                AI Scripts, Viral Hooks & Title Engineering
              </h3>
            </div>
            <Link
              to="/category/create"
              className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
            >
              <span>See All 12 Create Tools</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiCreateTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. THUMBNAIL SHOWCASE */}
      <ThumbnailShowcaseSection />

      {/* 9. ANALYTICS DASHBOARD PREVIEW */}
      <AnalyticsShowcaseSection />

      {/* 10. COMPETITOR RESEARCH PREVIEW */}
      <CompetitorShowcaseSection />

      {/* 11. SHORTS TOOLS */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                Short-Form Vertical Studio
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Viral YouTube Shorts Engine
              </h3>
            </div>
            <Link
              to="/category/shorts"
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <span>See All 9 Shorts Tools</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shortsTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* 12. WHY CREATORGROW */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-full">
              Engineered For Results
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
              Why Serious Creators Choose CreatorGrow
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Designed specifically around the nuances of modern YouTube algorithms and audience retention psychology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Zero AI Fluff
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Prompts are strictly calibrated with character-count awareness, mobile truncation rules, and proven viewer psychological triggers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Authentic YouTube Data Integrity
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                We never fabricate private metrics or fake subscriber stats. Video metadata and public statistics are derived accurately and clearly labeled.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Connected Creator Workflow
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Save your keywords directly into video outlines, generate titles from your hooks, and save every project into your persistent cloud dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 13. CREATOR GROWTH CTA */}
      <section className="py-20 bg-gradient-to-br from-violet-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-violet-200 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Ready to accelerate your channel?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Research Smarter. Create Better. Grow Faster.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-xl mx-auto leading-relaxed">
            Join thousands of creators who use CreatorGrow to eliminate creative burnout and publish high-ranking, high-CTR YouTube content every week.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/tools"
              className="px-7 py-3.5 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 text-xs sm:text-sm font-extrabold shadow-xl hover:scale-105 transition-all"
            >
              Start Creating (100% Free)
            </Link>
            <Link
              to="/dashboard"
              className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-colors"
            >
              Open Creator Studio
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400" /> Zero Sign-In Required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400" /> Instant Cloud &amp; Local Persistence
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400" /> 81 Dedicated YouTube Tools
            </span>
          </div>
        </div>
      </section>

      {/* 14. FAQ SECTION */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
              Answers for Creators
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800"
              >
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
