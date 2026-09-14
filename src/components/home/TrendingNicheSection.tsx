import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Flame, 
  Eye, 
  Zap, 
  Play, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  BarChart2, 
  Target, 
  HelpCircle,
  Copy,
  Check,
  Compass
} from 'lucide-react';
import { YOUTUBE_TRENDING_NICHES, TrendingNiche, TrendingVideoMetric } from '../../data/trendingData.ts';

export const TrendingNicheSection: React.FC = () => {
  const [selectedNicheId, setSelectedNicheId] = useState<string>('tech-ai');
  const [copiedHookId, setCopiedHookId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const currentNiche: TrendingNiche = 
    YOUTUBE_TRENDING_NICHES.find(n => n.id === selectedNicheId) || YOUTUBE_TRENDING_NICHES[0];

  const handleCopyHook = (video: TrendingVideoMetric) => {
    navigator.clipboard.writeText(video.hookFormula);
    setCopiedHookId(video.id);
    setTimeout(() => setCopiedHookId(null), 2500);
  };

  const handleUseFormat = (video: TrendingVideoMetric) => {
    navigate(`/tools/youtube-title-generator?topic=${encodeURIComponent(video.title)}&niche=${encodeURIComponent(currentNiche.name)}`);
  };

  // Filter breakout keywords if search term exists
  const filteredKeywords = currentNiche.breakoutKeywords.filter(k => 
    k.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.intent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="trending-niches" className="py-16 sm:py-20 bg-slate-50/60 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-bold mb-3">
              <Flame className="w-3.5 h-3.5 text-cyan-500 fill-cyan-500" />
              <span>Real YouTube Algorithm Trends</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Pick Your Niche for Trending Videos
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Target genuine breakout queries verified on YouTube right now, inspect verified algorithm triggers, and model top-performing viral video architectures.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/tools/youtube-trend-analyzer"
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Explore All Trends</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Niche Selector Pills */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 overflow-x-auto pb-3 no-scrollbar mb-8">
          {YOUTUBE_TRENDING_NICHES.map((niche) => {
            const isSelected = niche.id === currentNiche.id;
            return (
              <button
                key={niche.id}
                onClick={() => {
                  setSelectedNicheId(niche.id);
                  setSearchTerm('');
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 border-slate-900 dark:border-cyan-500 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{niche.name}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 dark:bg-slate-950 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Niche Algorithm Pulse Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  {currentNiche.name} • Algorithm Insight
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {currentNiche.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {currentNiche.algorithmInsight}
              </p>
            </div>

            <div className="lg:col-span-4 flex items-center justify-around sm:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800">
              <div className="text-center sm:text-right">
                <span className="text-[11px] font-semibold text-slate-400 block">Niche CTR Benchmark</span>
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {currentNiche.avgCtrBenchmark}
                </span>
                <span className="text-[10px] text-slate-500 block">Typical top 10%</span>
              </div>
              <div className="text-center sm:text-right">
                <span className="text-[11px] font-semibold text-slate-400 block">Avg 30s Retention</span>
                <span className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
                  {currentNiche.avgRetention30s}
                </span>
                <span className="text-[10px] text-slate-500 block">Algorithmic threshold</span>
              </div>
            </div>

          </div>
        </div>

        {/* Breakout Search Queries Table */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-500" />
              <span>Breakout Search Queries in {currentNiche.name}</span>
            </h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filter search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Verified YouTube Query</th>
                    <th className="py-3 px-4">Search Demand</th>
                    <th className="py-3 px-4">7-Day Surge</th>
                    <th className="py-3 px-4">Competition</th>
                    <th className="py-3 px-4">Viewer Intent</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  {filteredKeywords.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {item.keyword}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {item.volume}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full text-[11px]">
                          <TrendingUp className="w-3 h-3" />
                          {item.growthPercent}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.competition === 'Low' 
                            ? 'bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800' 
                            : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        }`}>
                          {item.competition} Competition
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {item.intent}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/tools/youtube-title-generator?topic=${encodeURIComponent(item.keyword)}&niche=${encodeURIComponent(currentNiche.name)}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 hover:underline"
                        >
                          <span>Generate Title</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* DEDICATED SECTION: Trend Video Performance of Selected Niche */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                <Play className="w-3.5 h-3.5 fill-rose-500" />
                <span>Deep Forensic Benchmark</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                Trend Video Performance — {currentNiche.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Detailed retention, packaging formulas, and psychological opening hooks powering top trending videos right now.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentNiche.trendingVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Video Preview Card with Visual Thumbnail */}
                  <div className="relative aspect-video bg-slate-950 overflow-hidden group">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-[11px] tracking-wider px-2.5 py-1 rounded shadow-lg uppercase">
                      {video.thumbnailBadgeText}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                      {video.duration}
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-md">
                        {video.views} views
                      </span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3" />
                        {video.velocity}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 sm:p-6 space-y-4">
                    
                    {/* Title and Channel */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={video.channelAvatar}
                          alt={video.channel}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {video.channel}
                        </span>
                        <span className="text-[10px] text-slate-400">• {video.publishedDaysAgo} days ago</span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                        {video.title}
                      </h4>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-slate-100 dark:border-slate-800 text-center">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                        <span className="text-[10px] text-slate-400 block">CTR Benchmark</span>
                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          {video.ctrBenchmark}
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                        <span className="text-[10px] text-slate-400 block">30s Retention</span>
                        <span className="text-xs font-black text-cyan-600 dark:text-cyan-400">
                          {video.retentionAt30s}
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                        <span className="text-[10px] text-slate-400 block">Pacing</span>
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          {video.viewsPerHour}
                        </span>
                      </div>
                    </div>

                    {/* Hook Breakdown */}
                    <div className="p-3.5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-900/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-cyan-800 dark:text-cyan-300 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-cyan-500" />
                          The 5-Second Opening Hook
                        </span>
                        <button
                          onClick={() => handleCopyHook(video)}
                          className="text-[10px] font-bold text-cyan-700 dark:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {copiedHookId === video.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedHookId === video.id ? 'Copied' : 'Copy Hook'}</span>
                        </button>
                      </div>
                      <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                        {video.hookFormula}
                      </p>
                    </div>

                    {/* Packaging Strategy */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                        Visual Packaging Strategy:
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {video.packagingStrategy}
                      </p>
                    </div>

                    {/* Algorithm Trigger */}
                    <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Algorithm Trigger:</strong> {video.algorithmTrigger}</span>
                    </div>

                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {video.targetKeywords.map((kw, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        #{kw}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleUseFormat(video)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 text-white dark:text-slate-950 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>Use This Format</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
