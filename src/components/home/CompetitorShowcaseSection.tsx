import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Eye, 
  Calendar, 
  Video, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Swords, 
  Search, 
  TrendingUp, 
  AlertCircle,
  Lightbulb,
  Zap,
  ExternalLink,
  Layers,
  Clock
} from 'lucide-react';

export interface ChannelData {
  name: string;
  handle: string;
  avatar?: string;
  avatarText: string;
  banner?: string;
  accentColor: string;
  subscribers: string;
  videoCount?: string;
  monthlyViews: string;
  uploadPacing: string;
  avgDuration: string;
  topFormat: string;
  titleFormula: string;
  thumbnailStyle: string;
  strongKeywords: string[];
  weaknesses: string[];
  recentVideos?: Array<{
    title: string;
    views: string;
    time: string;
  }>;
}

export const CompetitorShowcaseSection: React.FC = () => {
  const [channel1Input, setChannel1Input] = useState('BMM gaming ff');
  const [channel2Input, setChannel2Input] = useState('Thomas Frank');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [activeComparison, setActiveComparison] = useState<{
    c1: ChannelData;
    c2: ChannelData;
    contentGapOpportunity: string;
    actionPlan: string[];
  }>({
    c1: {
      name: 'BMM Gaming FF',
      handle: '@bmmgamingff',
      avatar: 'https://yt3.googleusercontent.com/3EyaJYMXYwGwnakqazWrr9_gUCOg-1Qh9qo6rOMLIRkKpotjNWBKt_5wuA5sfSycDbwpvMHnfg=s72-c-k-c0x00ffffff-no-rj',
      avatarText: 'BG',
      accentColor: 'from-amber-500 to-rose-600',
      subscribers: '9K subscribers',
      videoCount: '1.4K videos',
      monthlyViews: '~15K - 35K views / mo',
      uploadPacing: '1 - 2 videos / week',
      avgDuration: 'Shorts & 3-5 min montage showcases',
      topFormat: 'Free Fire XML Presets, Alight Motion Shakes & Gameplay Edits',
      titleFormula: 'Top [Count] [Effect/Pack] | [Game/Software] Preset Pack #[Part]',
      thumbnailStyle: 'High-saturation game render + glowing neon accents + action freeze',
      strongKeywords: ['Free Fire', 'XML Preset', 'Alight Motion', 'Shake Pack', 'FF CC XML', '4K Clips'],
      weaknesses: [
        'Heavy reliance on numeric part tags (#42, #109) reduces long-term evergreen organic search traffic',
        'Short video descriptions limit long-tail Google & YouTube search indexing'
      ],
      recentVideos: [
        {
          title: 'Top 10 Shake Effect Alight Motion | Free 4K Shake XML Preset Pack #42',
          views: '265 views',
          time: '6 days ago'
        },
        {
          title: 'Free Fire 4K HDR Quality Tutorial 🔥 | How To Increase Free Fire Video Quality',
          views: '118 views',
          time: '2 weeks ago'
        },
        {
          title: 'Top 5 HD FF CC XML 🔥 | New 4K Special CC Pack 🎮 #ff #xml #ccpack #17',
          views: '275 views',
          time: '3 weeks ago'
        }
      ]
    },
    c2: {
      name: 'Thomas Frank',
      handle: '@Thomasfrank',
      avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nIr5PB90HA3Uoa6w6PNkbMDZVVINovFpKb5hbHd7JwG0nP=s72-c-k-c0x00ffffff-no-rj',
      avatarText: 'TF',
      accentColor: 'from-indigo-500 to-violet-600',
      subscribers: '3.01M subscribers',
      videoCount: '281 videos',
      monthlyViews: '~2.8M - 4.5M views / mo',
      uploadPacing: 'Infrequent / Evergreen Focus',
      avgDuration: '15 - 25 mins',
      topFormat: 'Step-by-Step Workflow Systems & Productivity Walkthroughs',
      titleFormula: 'The Complete Guide to [System/Workflow] in [Year]',
      thumbnailStyle: 'Studio creator face + screen UI workflow preview + clean badge',
      strongKeywords: ['Productivity', 'Notion Systems', 'Study Tips', 'Workflow', 'Habits', 'Coding'],
      weaknesses: [
        'Long intervals between major uploads leaves space for agile creators',
        'Limited short-form Shorts presence for rapid viewer discovery'
      ],
      recentVideos: [
        {
          title: 'The ultimate guide to YouTube sponsorships and brand deals',
          views: '42K views',
          time: '2 years ago'
        },
        {
          title: 'Why are you scrolling your phone in bed AGAIN?',
          views: '75K views',
          time: '2 years ago'
        },
        {
          title: 'How to get everything you want this year',
          views: '162K views',
          time: '2 years ago'
        }
      ]
    },
    contentGapOpportunity: 'BMM Gaming FF commands deep engagement in the fast-growing gaming & editing niche (9K subscribers), while Thomas Frank (3.01M subscribers) leverages mainstream narrative storytelling and structured titles. By infusing Thomas Frank\'s hook clarity and SEO keyword front-loading into BMM Gaming FF\'s 4K editing tutorials, BMM Gaming FF can double search discoverability outside existing community groups.',
    actionPlan: [
      'Front-load primary search keywords (e.g., "Free Fire XML Tutorial") in the first 35 characters of titles instead of at the end.',
      'Add a 15-second contextual intro explaining why the preset or gameplay mechanic gives players an unfair competitive advantage.',
      'Publish detailed descriptions with 3-5 high-search tags and timestamped chapter markers.'
    ]
  });

  const presets = [
    { c1: 'BMM gaming ff', c2: 'Thomas Frank', label: 'BMM Gaming vs Thomas Frank' },
    { c1: 'MrBeast', c2: 'Mark Rober', label: 'MrBeast vs Mark Rober' },
    { c1: 'MKBHD', c2: 'Dave2D', label: 'MKBHD vs Dave2D' },
    { c1: 'Ali Abdaal', c2: 'Thomas Frank', label: 'Ali Abdaal vs Thomas Frank' },
    { c1: 'Veritasium', c2: 'Vsauce', label: 'Veritasium vs Vsauce' }
  ];

  const handleCompare = async (e?: React.FormEvent, overrideC1?: string, overrideC2?: string) => {
    if (e) e.preventDefault();
    const query1 = (overrideC1 !== undefined ? overrideC1 : channel1Input).trim();
    const query2 = (overrideC2 !== undefined ? overrideC2 : channel2Input).trim();

    if (!query1 || !query2) {
      setError('Please enter two YouTube channel names, @handles, or URLs to compare.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `/api/youtube/compare?c1=${encodeURIComponent(query1)}&c2=${encodeURIComponent(query2)}`;
      const res = await fetch(url);
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Failed to compare channels (Status ${res.status})`);
      }
      const data = await res.json();
      if (data && data.c1 && data.c2) {
        setActiveComparison({
          c1: data.c1,
          c2: data.c2,
          contentGapOpportunity: data.contentGapOpportunity || 'Detailed competitor gap analysis generated.',
          actionPlan: data.actionPlan || []
        });
      } else {
        throw new Error('Could not retrieve complete channel forensics. Please check the channel names.');
      }
    } catch (err: any) {
      console.error('Error fetching live channel comparison:', err);
      setError(err.message || 'Unable to audit channels right now. Please try again or check the spelling.');
    } finally {
      setLoading(false);
    }
  };

  const handlePresetSelect = (c1: string, c2: string) => {
    setChannel1Input(c1);
    setChannel2Input(c2);
    handleCompare(undefined, c1, c2);
  };

  return (
    <section id="channel-comparison-section" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-bold mb-3">
            <Swords className="w-3.5 h-3.5 text-cyan-500" />
            <span>Live YouTube Channel Forensics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Your Channel vs The Competition
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Enter <span className="font-semibold text-slate-800 dark:text-slate-200">any YouTube channel</span> (by name, @handle, or URL) to audit real subscribers, verified upload pacing, top packaging formulas, and actionable content gaps.
          </p>
        </div>

        {/* Channel Input Controls */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
          <form 
            onSubmit={(e) => handleCompare(e)} 
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              
              {/* Channel 1 Input */}
              <div className="md:col-span-5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Channel 1 (Your Channel or Focus Channel)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={channel1Input}
                    onChange={(e) => setChannel1Input(e.target.value)}
                    placeholder="e.g. BMM gaming ff or @handle"
                    className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
                  />
                </div>
              </div>

              {/* VS Divider Badge */}
              <div className="md:col-span-2 flex justify-center py-1 md:py-0">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-black text-xs text-slate-700 dark:text-slate-300 shadow-inner border border-slate-300 dark:border-slate-700">
                  VS
                </div>
              </div>

              {/* Channel 2 Input */}
              <div className="md:col-span-5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Channel 2 (Competitor Channel)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={channel2Input}
                    onChange={(e) => setChannel2Input(e.target.value)}
                    placeholder="e.g. Thomas Frank or competitor URL"
                    className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
                  />
                </div>
              </div>

            </div>

            {/* Error Message if any */}
            {error && (
              <div className="mt-3.5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Compare Button & Presets (Clean Wrap Layout - No Horizontal Scrollbar) */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
              
              {/* Presets wrapping cleanly */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 mr-1">
                  Try Presets:
                </span>
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePresetSelect(p.c1, p.c2)}
                    className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-400 transition-all text-[11px] font-medium cursor-pointer shadow-xs active:scale-95"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 disabled:opacity-50 text-white dark:text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer shrink-0 min-h-[44px]"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Auditing Live Channels...</span>
                  </>
                ) : (
                  <>
                    <Swords className="w-4 h-4" />
                    <span>Compare Channels Side-by-Side</span>
                  </>
                )}
              </button>

            </div>
          </form>
        </div>

        {/* Side-by-Side Comparison Board Card */}
        <div className="max-w-5xl mx-auto bg-slate-50 dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          
          {/* Top Board Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Verified Real-Time Comparison
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                Live YouTube Data
              </span>
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                {activeComparison.c1.name} <span className="text-slate-400">vs</span> {activeComparison.c2.name}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            
            {/* Left: Channel 1 */}
            <div className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-slate-900">
              
              {/* Channel Header Profile */}
              <div className="flex items-center gap-3.5 mb-6">
                {activeComparison.c1.avatar ? (
                  <img
                    src={activeComparison.c1.avatar}
                    alt={activeComparison.c1.name}
                    className="w-14 h-14 rounded-2xl object-cover shadow-md border border-slate-200 dark:border-slate-700 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeComparison.c1.accentColor} text-white flex items-center justify-center font-black text-lg shadow-md shrink-0`}>
                    {activeComparison.c1.avatarText}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                    Channel 1
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                    {activeComparison.c1.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-500 font-mono">{activeComparison.c1.handle}</span>
                    {activeComparison.c1.videoCount && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                        {activeComparison.c1.videoCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Core Metrics List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-500" />
                    Subscribers
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{activeComparison.c1.subscribers}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                    Est. Monthly Views
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{activeComparison.c1.monthlyViews}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-violet-500" />
                    Upload Cadence
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-right">{activeComparison.c1.uploadPacing}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Typical Duration
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{activeComparison.c1.avgDuration}</span>
                </div>
                
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Top Video Format:</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 inline-block leading-relaxed">
                    {activeComparison.c1.topFormat}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Title Pattern:</span>
                  <p className="text-xs italic text-slate-700 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-200/50 dark:border-slate-800">
                    "{activeComparison.c1.titleFormula}"
                  </p>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Thumbnail Formula:</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {activeComparison.c1.thumbnailStyle}
                  </p>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1.5">Top Keywords / Niches:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeComparison.c1.strongKeywords.map((kw, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Real Recent Uploads Audited */}
                {activeComparison.c1.recentVideos && activeComparison.c1.recentVideos.length > 0 && (
                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-500 block mb-2 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-cyan-500" />
                      Audited Recent Uploads:
                    </span>
                    <div className="space-y-2">
                      {activeComparison.c1.recentVideos.slice(0, 3).map((v, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 text-xs">
                          <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 leading-snug">
                            {v.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                            <span>{v.views}</span>
                            <span>•</span>
                            <span>{v.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Right: Channel 2 */}
            <div className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-slate-900">
              
              {/* Channel Header Profile */}
              <div className="flex items-center gap-3.5 mb-6">
                {activeComparison.c2.avatar ? (
                  <img
                    src={activeComparison.c2.avatar}
                    alt={activeComparison.c2.name}
                    className="w-14 h-14 rounded-2xl object-cover shadow-md border border-slate-200 dark:border-slate-700 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeComparison.c2.accentColor} text-white flex items-center justify-center font-black text-lg shadow-md shrink-0`}>
                    {activeComparison.c2.avatarText}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    Channel 2
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                    {activeComparison.c2.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-500 font-mono">{activeComparison.c2.handle}</span>
                    {activeComparison.c2.videoCount && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                        {activeComparison.c2.videoCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Core Metrics List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    Subscribers
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{activeComparison.c2.subscribers}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                    Est. Monthly Views
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{activeComparison.c2.monthlyViews}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-violet-500" />
                    Upload Cadence
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-right">{activeComparison.c2.uploadPacing}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Typical Duration
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{activeComparison.c2.avgDuration}</span>
                </div>
                
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Top Video Format:</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 inline-block leading-relaxed">
                    {activeComparison.c2.topFormat}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Title Pattern:</span>
                  <p className="text-xs italic text-slate-700 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-200/50 dark:border-slate-800">
                    "{activeComparison.c2.titleFormula}"
                  </p>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Thumbnail Formula:</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {activeComparison.c2.thumbnailStyle}
                  </p>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1.5">Top Keywords / Niches:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeComparison.c2.strongKeywords.map((kw, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Real Recent Uploads Audited */}
                {activeComparison.c2.recentVideos && activeComparison.c2.recentVideos.length > 0 && (
                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-500 block mb-2 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-indigo-500" />
                      Audited Recent Uploads:
                    </span>
                    <div className="space-y-2">
                      {activeComparison.c2.recentVideos.slice(0, 3).map((v, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 text-xs">
                          <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 leading-snug">
                            {v.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                            <span>{v.views}</span>
                            <span>•</span>
                            <span>{v.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Bottom Actionable Content Gap Breakdown */}
          <div className="p-4 sm:p-6 lg:p-8 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-4">
            
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-cyan-500 text-slate-950 shrink-0 mt-0.5 shadow-md">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                  <span>Identified Content Gap Opportunity</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold">
                    High Growth Potential
                  </span>
                </h5>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-2 leading-relaxed font-medium">
                  {activeComparison.contentGapOpportunity}
                </p>
              </div>
            </div>

            {/* Tactical Action Plan */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-900 dark:text-amber-400 block mb-3 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Strategic Action Playbook:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeComparison.actionPlan.map((action, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-start gap-3 shadow-xs">
                    <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Audited using live YouTube metadata &amp; verified upload timelines.
              </span>
              <Link
                to="/tools/competitor-channel-analyzer"
                className="inline-flex items-center gap-1.5 font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:underline"
              >
                <span>Launch Deep Channel Audit Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
