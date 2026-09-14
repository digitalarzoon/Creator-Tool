import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  Maximize2,
  AlertCircle,
  Ratio,
  Layers,
  Palette,
  Sliders,
  Check
} from 'lucide-react';

export const ThumbnailShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'downloader' | 'analyzer'>('generator');
  
  // Interactive aspect ratio state for the generator showcase
  const [selectedRatio, setSelectedRatio] = useState<'16:9' | '9:16' | '1:1' | '4:3'>('16:9');
  const [selectedStyle, setSelectedStyle] = useState<string>('MrBeast High Saturation');
  const [overlayText, setOverlayText] = useState<string>('DON\'T DO THIS');
  const [badgeText, setBadgeText] = useState<string>('THE REVERSAL');

  const ratioOptions: { id: '16:9' | '9:16' | '1:1' | '4:3'; label: string; desc: string; containerClass: string }[] = [
    { id: '16:9', label: '16:9 Widescreen', desc: 'YouTube Standard Video (1280x720)', containerClass: 'aspect-video' },
    { id: '9:16', label: '9:16 Vertical', desc: 'YouTube Shorts (1080x1920)', containerClass: 'aspect-[9/16] max-h-[380px]' },
    { id: '1:1', label: '1:1 Square', desc: 'Community Posts & Mobile Feed', containerClass: 'aspect-square max-h-[340px]' },
    { id: '4:3', label: '4:3 Classic', desc: 'Tablets & Embed Layouts', containerClass: 'aspect-[4/3] max-h-[340px]' }
  ];

  const stylePresets = [
    { name: 'MrBeast High Saturation', bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80', badgeColor: 'bg-red-600', textColor: 'text-amber-300' },
    { name: 'Cinematic Tech & Neon', bg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80', badgeColor: 'bg-cyan-600', textColor: 'text-cyan-300' },
    { name: 'True Crime Mystery', bg: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80', badgeColor: 'bg-slate-900', textColor: 'text-rose-400' }
  ];

  const currentStyle = stylePresets.find(s => s.name === selectedStyle) || stylePresets[0];
  const activeRatioConfig = ratioOptions.find(r => r.id === selectedRatio) || ratioOptions[0];

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800">
              High-CTR Visual Packaging
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
              AI Thumbnail Generator with Custom Aspect Ratios
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Thumbnails drive 80% of your initial click-through rate. Generate custom aspect ratios tailored for main videos, Shorts, and Community posts with instant mobile contrast testing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/tools/youtube-thumbnail-downloader"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Thumbnail Downloader
            </Link>
            <Link
              to="/tools/ai-thumbnail-generator"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-black shadow-sm transition-all"
            >
              Open Thumbnail Studio
            </Link>
          </div>
        </div>

        {/* Showcase Mode Tabs */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'generator' 
                ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            AI Thumbnail Generator &amp; Aspect Ratio Selector
          </button>
          <button
            onClick={() => setActiveTab('downloader')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'downloader' 
                ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            1080p Resolution Downloader
          </button>
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'analyzer' 
                ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Mobile Legibility Audit
          </button>
        </div>

        {/* Tab 1: AI THUMBNAIL GENERATOR & ASPECT RATIO SELECTOR */}
        {activeTab === 'generator' && (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            
            {/* Aspect Ratio Selector Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Ratio className="w-3.5 h-3.5 text-cyan-500" />
                  Select Required Aspect Ratio:
                </span>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  Current: {selectedRatio} ({activeRatioConfig.desc})
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {ratioOptions.map((r) => {
                  const isSelected = selectedRatio === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRatio(r.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-white dark:bg-slate-800 border-cyan-500 shadow-md ring-2 ring-cyan-500/20' 
                          : 'bg-white/60 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-black ${isSelected ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-800 dark:text-white'}`}>
                          {r.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-500" />}
                      </div>
                      <span className="text-[10px] text-slate-500 block leading-tight">
                        {r.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Interactive Generator Canvas Studio */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Controls */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Overlay Text Input */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Bold 2-4 Word Text Hook
                  </label>
                  <input
                    type="text"
                    value={overlayText}
                    onChange={(e) => setOverlayText(e.target.value.toUpperCase())}
                    maxLength={20}
                    placeholder="e.g. DON'T DO THIS"
                    className="w-full px-3.5 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {['DON\'T DO THIS', '100 DAYS', '0 TO 100K', 'IT\'S OVER', 'SECRET TRICK'].map(sample => (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => setOverlayText(sample)}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 cursor-pointer"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Badge Label */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Top Corner Badge / Category
                  </label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value.toUpperCase())}
                    maxLength={16}
                    placeholder="e.g. THE REVERSAL"
                    className="w-full px-3.5 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                {/* Style Presets */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Visual Style Preset
                  </label>
                  <div className="space-y-1.5">
                    {stylePresets.map(st => (
                      <button
                        key={st.name}
                        type="button"
                        onClick={() => setSelectedStyle(st.name)}
                        className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          selectedStyle === st.name
                            ? 'bg-white dark:bg-slate-800 border-cyan-500 text-cyan-600 dark:text-cyan-400'
                            : 'bg-white/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span>{st.name}</span>
                        {selectedStyle === st.name && <Check className="w-3.5 h-3.5 text-cyan-500" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <Link
                    to={`/tools/ai-thumbnail-generator?topic=${encodeURIComponent('I Tested 100 AI Tools')}&aspectRatio=${encodeURIComponent(selectedRatio)}&style=${encodeURIComponent(selectedStyle)}`}
                    className="w-full py-3 rounded-xl bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 text-white dark:text-slate-950 text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Open in AI Thumbnail Generator Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

              {/* Right Live Visual Aspect Preview */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold">Live Aspect Preview ({selectedRatio})</span>
                  <span className="font-mono text-[11px] text-emerald-500 font-bold">Contrast AA Compliant</span>
                </div>

                {/* Adaptive Aspect Ratio Frame */}
                <div className={`relative w-full max-w-lg ${activeRatioConfig.containerClass} rounded-2xl overflow-hidden bg-slate-950 shadow-2xl border-2 border-slate-300 dark:border-slate-700 group transition-all duration-300 flex items-center justify-center`}>
                  <img
                    src={currentStyle.bg}
                    alt="AI Thumbnail Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

                  {/* Top Badge */}
                  <div className={`absolute top-3 left-3 ${currentStyle.badgeColor} text-white font-black text-[10px] tracking-wider px-2 py-0.5 rounded shadow uppercase`}>
                    {badgeText || 'THE REVERSAL'}
                  </div>

                  {/* Aspect Ratio Watermark */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded border border-white/10">
                    {selectedRatio}
                  </div>

                  {/* Main High-Contrast Text Overlay */}
                  <div className="absolute bottom-4 inset-x-4 text-center">
                    <div className="inline-block bg-black/90 backdrop-blur-sm px-4 py-2 rounded-xl border-2 border-amber-400 shadow-2xl">
                      <span className={`text-base sm:text-xl font-black tracking-tight ${currentStyle.textColor} drop-shadow-md`}>
                        {overlayText || 'DON\'T DO THIS'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-lg mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Aspect ratio: <strong>{selectedRatio}</strong></span>
                  <span>Rule: <strong>Focal subject + 3-word hook</strong></span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: 1080p Downloader */}
        {activeTab === 'downloader' && (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Download Uncompressed 1080p YouTube Thumbnails
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Paste any public YouTube video URL or ID to retrieve official MaxRes (1920x1080), High Quality (1280x720), and Standard definitions directly from Google servers.
              </p>
              <div className="pt-2">
                <Link
                  to="/tools/youtube-thumbnail-downloader"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow"
                >
                  <span>Launch 1080p Thumbnail Downloader</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mobile Legibility Audit */}
        {activeTab === 'analyzer' && (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Mobile Feed Thumbnail Legibility Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Over 72% of YouTube impressions occur on mobile screens at roughly 168x94 pixels. Audit whether your text and focal subjects remain readable when scaled down to mobile feeds.
              </p>
              <div className="pt-2">
                <Link
                  to="/tools/thumbnail-analyzer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow"
                >
                  <span>Audit Your Thumbnail Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
