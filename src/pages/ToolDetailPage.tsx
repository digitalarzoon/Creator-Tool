import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Copy, 
  Check, 
  Bookmark, 
  Download, 
  RefreshCw, 
  Star, 
  Eye, 
  HelpCircle, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Gauge
} from 'lucide-react';
import { getToolBySlug, TOOLS, CreatorTool } from '../data/tools.ts';
import { IconHelper } from '../components/common/IconHelper.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { ToolCard } from '../components/common/ToolCard.tsx';

export const ToolDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug || '');
  const { currentUser, profile, favorites, isFavorite, toggleFavorite, recordToolUsage, saveResult } = useAuth();

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Thumbnail Downloader Specific State
  const [extractedVideoId, setExtractedVideoId] = useState<string | null>(null);

  // SEO Score Specific State
  const [seoResult, setSeoResult] = useState<any>(null);

  // AI Thumbnail Generator Specific State
  const [thumbnailData, setThumbnailData] = useState<{
    imageUrl: string;
    aspectRatio: string;
    topic: string;
    style: string;
    overlayText: string;
  } | null>(null);
  const [previewBgTheme, setPreviewBgTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (tool) {
      // Initialize form values
      const initial: Record<string, string> = {};
      tool.inputs.forEach(input => {
        initial[input.name] = input.defaultValue || (input.options ? input.options[0] : '');
      });
      setFormValues(initial);
      setGeneratedOutput(null);
      setError(null);
      setSeoResult(null);
      setExtractedVideoId(null);
      setThumbnailData(null);

      // Record in history automatically
      recordToolUsage({ id: tool.id, slug: tool.slug, name: tool.name });
    }
  }, [tool, slug]);

  if (!tool) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Tool Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested creator tool could not be located.</p>
        <Link to="/tools" className="mt-4 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold">
          Return to Tools Catalog
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(tool.id);

  const handleInputChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const clean = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = clean.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleRunTool = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCopied(false);
    setSavedSuccess(false);

    try {
      // 1. YouTube Thumbnail Downloader Handler
      if (tool.id === 'youtube-thumbnail-downloader' || tool.slug === 'youtube-thumbnail-downloader') {
        const urlInput = formValues['url'] || '';
        const vid = extractYouTubeId(urlInput);
        if (!vid) {
          throw new Error('Please enter a valid YouTube Video URL (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or youtu.be/...)');
        }
        setExtractedVideoId(vid);
        setLoading(false);
        return;
      }

      // 2. YouTube SEO Checker Handler
      if (tool.id === 'youtube-seo-checker' || tool.id === 'youtube-video-analyzer') {
        const urlInput = formValues['url'] || '';
        const vid = extractYouTubeId(urlInput);
        if (!vid) {
          throw new Error('Please enter a valid YouTube Video URL.');
        }

        const res = await fetch(`/api/youtube/video?videoId=${encodeURIComponent(vid)}`);
        if (!res.ok) {
          throw new Error('Could not fetch video information. Please ensure the link is public.');
        }
        const data = await res.json();
        
        // Calculate dynamic SEO score
        const titleLength = data.title ? data.title.length : 0;
        const hasNumbersInTitle = /\d/.test(data.title || '');
        const descLength = data.description ? data.description.length : 0;
        const tagsCount = data.tags ? data.tags.length : 0;

        let score = 50;
        if (titleLength >= 35 && titleLength <= 65) score += 20;
        else if (titleLength > 65) score += 10;
        if (hasNumbersInTitle) score += 10;
        if (descLength > 200) score += 10;
        if (tagsCount > 5) score += 10;

        setSeoResult({
          video: data,
          score: Math.min(score, 98),
          videoId: vid
        });
        setLoading(false);
        return;
      }

      // 3. AI Thumbnail Generator Handler (with Aspect Ratio Selection)
      if (tool.id === 'ai-thumbnail-generator' || tool.slug === 'ai-thumbnail-generator') {
        const rawRatio = formValues['aspectRatio'] || '16:9';
        let cleanRatio = '16:9';
        if (rawRatio.includes('9:16')) cleanRatio = '9:16';
        else if (rawRatio.includes('1:1')) cleanRatio = '1:1';
        else if (rawRatio.includes('4:3')) cleanRatio = '4:3';

        const thumbRes = await fetch('/api/ai/generate-thumbnail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: formValues['topic'] || 'I Tested 100 AI Tools',
            niche: formValues['niche'] || 'Technology',
            style: formValues['style'] || 'MrBeast Style (High Saturation & Expressive)',
            aspectRatio: cleanRatio,
            overlayText: formValues['headlineOverlay'] || 'DON\'T DO THIS'
          })
        });

        if (!thumbRes.ok) {
          const errData = await thumbRes.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to generate thumbnail.');
        }

        const thumbData = await thumbRes.json();
        setThumbnailData({
          imageUrl: thumbData.imageUrl,
          aspectRatio: cleanRatio,
          topic: formValues['topic'] || 'I Tested 100 AI Tools',
          style: formValues['style'] || 'MrBeast Style (High Saturation & Expressive)',
          overlayText: formValues['headlineOverlay'] || 'DON\'T DO THIS'
        });

        // Also generate text blueprint
        const textRes = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toolSlug: tool.slug,
            category: tool.category,
            inputs: {
              ...formValues,
              aspectRatio: cleanRatio
            }
          })
        });
        if (textRes.ok) {
          const tData = await textRes.json();
          setGeneratedOutput(tData.output);
        }

        setLoading(false);
        return;
      }

      // 4. Competitor Channel Analyzer Handler (Live YouTube Channel Data)
      if (tool.id === 'competitor-channel-analyzer' || tool.slug === 'competitor-channel-analyzer') {
        const query = formValues['url'] || formValues['channel'] || formValues['handle'] || '';
        if (!query.trim()) throw new Error('Please enter a YouTube channel name, @handle, or URL.');
        const res = await fetch(`/api/youtube/channel?query=${encodeURIComponent(query.trim())}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to fetch YouTube channel.');
        }
        const ch = await res.json();
        const md = `### 🎯 Live Channel Audit: ${ch.name} (${ch.handle})

- **Verified Subscribers**: ${ch.subscribers}
- **Total Uploads**: ${ch.videoCount || 'Active'}
- **Estimated Monthly Views**: ${ch.monthlyViews}
- **Upload Cadence**: ${ch.uploadPacing}
- **Typical Video Duration**: ${ch.avgDuration}
- **Primary Video Format**: ${ch.topFormat}

---

#### 💡 Packaging & Click-Through Formula
- **Title Structure**: \`${ch.titleFormula}\`
- **Thumbnail Archetype**: ${ch.thumbnailStyle}
- **Core Ranking Keywords**: ${ch.strongKeywords?.join(', ') || 'Niche tags'}

---

#### 🔍 Audited Recent Uploads
${(ch.recentVideos || []).map((v: any) => `- **${v.title}** (${v.views} • ${v.time})`).join('\n') || '- Live uploads retrieved.'}

---

#### ⚡ Strategic Exploitation & Content Gaps
${(ch.weaknesses || []).map((w: any) => `1. ${w}`).join('\n')}
`;
        setGeneratedOutput(md);
        setLoading(false);
        return;
      }

      // 5. Competitor Growth Tracker Handler (Live Side-by-Side YouTube Comparison)
      if (tool.id === 'competitor-growth-tracker' || tool.slug === 'competitor-growth-tracker') {
        const c1 = formValues['myChannel'] || '';
        const c2 = formValues['url'] || formValues['competitor'] || '';
        if (!c1.trim() || !c2.trim()) throw new Error('Please enter both channel names or handles to compare.');
        const res = await fetch(`/api/youtube/compare?c1=${encodeURIComponent(c1.trim())}&c2=${encodeURIComponent(c2.trim())}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to compare channels.');
        }
        const cmp = await res.json();
        const md = `### ⚔️ Side-by-Side Channel Audit: ${cmp.c1.name} vs ${cmp.c2.name}

| Metric | ${cmp.c1.name} (${cmp.c1.handle}) | ${cmp.c2.name} (${cmp.c2.handle}) |
| :--- | :--- | :--- |
| **Subscribers** | ${cmp.c1.subscribers} | ${cmp.c2.subscribers} |
| **Uploads** | ${cmp.c1.videoCount || 'Active'} | ${cmp.c2.videoCount || 'Active'} |
| **Est. Monthly Views** | ${cmp.c1.monthlyViews} | ${cmp.c2.monthlyViews} |
| **Upload Cadence** | ${cmp.c1.uploadPacing} | ${cmp.c2.uploadPacing} |
| **Top Format** | ${cmp.c1.topFormat} | ${cmp.c2.topFormat} |

---

#### 💡 High-Yield Content Gap Opportunity
${cmp.contentGapOpportunity}

---

#### 🚀 Tactical Action Plan to Outrank
${(cmp.actionPlan || []).map((step: string, i: number) => `${i + 1}. **${step}**`).join('\n\n')}
`;
        setGeneratedOutput(md);
        setLoading(false);
        return;
      }

      // 6. Standard AI Generation Handler (Titles, Scripts, Hooks, Descriptions, etc.)
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolSlug: tool.slug,
          category: tool.category,
          inputs: {
            ...formValues,
            channelName: profile?.channelName || formValues['channelName'] || '',
            targetAudience: profile?.targetAudience || formValues['audience'] || '',
            toneOfVoice: profile?.toneOfVoice || formValues['tone'] || '',
            preferredNiche: profile?.preferredNiche || formValues['niche'] || ''
          }
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate output. Please check your inputs and try again.');
      }

      const data = await res.json();
      setGeneratedOutput(data.output);

    } catch (err: any) {
      console.error('Tool execution failed:', err);
      setError(err.message || 'An unexpected error occurred while executing tool.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToDashboard = async () => {
    if (!generatedOutput) return;

    try {
      await saveResult({
        toolId: tool.id,
        toolSlug: tool.slug,
        title: formValues['topic'] || formValues['niche'] || formValues['videoTopic'] || tool.name,
        content: generatedOutput,
        category: tool.category
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err: any) {
      alert('Could not save result: ' + err.message);
    }
  };

  const downloadThumbnailCanvas = () => {
    if (!thumbnailData) return;
    const canvas = document.createElement('canvas');
    let w = 1280, h = 720;
    if (thumbnailData.aspectRatio === '9:16') {
      w = 1080; h = 1920;
    } else if (thumbnailData.aspectRatio === '1:1') {
      w = 1080; h = 1080;
    } else if (thumbnailData.aspectRatio === '4:3') {
      w = 1024; h = 768;
    }
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, w, h);

      // Vignette
      const grad = ctx.createLinearGradient(0, h * 0.45, 0, h);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Top corner badge
      ctx.fillStyle = '#EF4444';
      ctx.fillRect(30, 30, 220, 52);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('HIGH-CTR', 140, 56);

      // Text hook
      const text = thumbnailData.overlayText || 'VIRAL TOPIC';
      const fontSize = Math.round(h * 0.085);
      ctx.font = `900 ${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const textWidth = ctx.measureText(text).width;
      const boxPadX = 36;
      const boxPadY = 18;
      const boxY = h * 0.82;
      const boxH = fontSize + boxPadY * 2;
      const boxW = textWidth + boxPadX * 2;

      ctx.fillStyle = 'rgba(0,0,0,0.92)';
      ctx.fillRect((w - boxW) / 2, boxY - boxH / 2, boxW, boxH);

      ctx.lineWidth = 6;
      ctx.strokeStyle = '#FBBF24';
      ctx.strokeRect((w - boxW) / 2, boxY - boxH / 2, boxW, boxH);

      ctx.fillStyle = '#FDE047';
      ctx.fillText(text, w / 2, boxY);

      try {
        const link = document.createElement('a');
        link.download = `yt-thumbnail-${thumbnailData.aspectRatio}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (e) {
        window.open(thumbnailData.imageUrl, '_blank');
      }
    };
    img.onerror = () => {
      window.open(thumbnailData.imageUrl, '_blank');
    };
    img.src = thumbnailData.imageUrl;
  };

  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation & Pinned Favorites */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-cyan-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/category/${tool.category}`} className="capitalize hover:text-cyan-600 transition-colors">
              {tool.category}
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{tool.name}</span>
          </div>

          {favorites.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 shrink-0">
                <Star className="w-3 h-3 text-amber-500 fill-amber-400" /> Pinned:
              </span>
              {favorites.slice(0, 4).map(fav => (
                <Link
                  key={fav.id}
                  to={`/tools/${fav.toolSlug}`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    fav.toolSlug === tool.slug
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500'
                  }`}
                >
                  {fav.toolName}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Tool Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 shrink-0">
                <IconHelper name={tool.icon} size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {tool.name}
                  </h1>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                    {tool.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>

            {/* Favorite Action Button */}
            <button
              onClick={() => toggleFavorite(tool)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-colors self-start sm:self-center cursor-pointer ${
                favorited
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-600 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Star className={`w-4 h-4 ${favorited ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{favorited ? 'Pinned to Favorites' : 'Pin Favorite'}</span>
            </button>
          </div>
        </div>

        {/* Main Working Grid: Inputs & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Form Inputs (Cols 1-5) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Configure & Run
            </h3>

            <form onSubmit={handleRunTool} className="space-y-4">
              {tool.inputs.map(input => (
                <div key={input.name}>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {input.label} {input.required && <span className="text-rose-500">*</span>}
                  </label>

                  {input.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      value={formValues[input.name] || ''}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      placeholder={input.placeholder}
                      required={input.required}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-violet-500"
                    />
                  ) : input.type === 'select' ? (
                    <select
                      value={formValues[input.name] || input.options?.[0] || ''}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-violet-500"
                    >
                      {input.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={input.type}
                      value={formValues[input.name] || ''}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      placeholder={input.placeholder}
                      required={input.required}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-violet-500"
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 disabled:opacity-50 text-white dark:text-slate-950 text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing & Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-400 dark:text-slate-950" />
                    <span>Run {tool.name}</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick instructions box */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300">How to use:</span>
              <ul className="list-disc pl-4 space-y-1">
                {tool.instructions.map((ins, i) => (
                  <li key={i}>{ins}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results Area (Cols 6-12) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm min-h-[420px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Output & Results</span>
                  {generatedOutput && (
                    <span className="text-[11px] font-semibold text-slate-400">
                      ({generatedOutput.length} characters)
                    </span>
                  )}
                </h3>

                {generatedOutput && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={handleSaveToDashboard}
                      className="px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-xs font-semibold hover:bg-cyan-100 dark:hover:bg-cyan-900/60 flex items-center gap-1.5 transition-colors cursor-pointer border border-cyan-200 dark:border-cyan-800"
                    >
                      {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Bookmark className="w-3.5 h-3.5" />}
                      <span>{savedSuccess ? (currentUser ? 'Saved (Cloud)' : 'Saved (Browser)') : 'Save to Dashboard'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Error state */}
              {error && (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Execution Notice</p>
                    <p className="mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              {/* Thumbnail Downloader Specific Render */}
              {extractedVideoId && (
                <div className="space-y-6 animate-fade-in">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                      YouTube Video ID: <strong>{extractedVideoId}</strong>
                    </span>
                    <a
                      href={`https://www.youtube.com/watch?v=${extractedVideoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Resolutions Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* MaxRes 1080p */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>MaxRes (1080p / HD)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700">1920x1080</span>
                      </div>
                      <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
                        <img 
                          src={`https://img.youtube.com/vi/${extractedVideoId}/maxresdefault.jpg`} 
                          alt="MaxRes Preview"
                          className="w-full h-full object-cover"
                          onError={(e: any) => {
                            e.target.src = `https://img.youtube.com/vi/${extractedVideoId}/hqdefault.jpg`;
                          }}
                        />
                      </div>
                      <a
                        href={`https://img.youtube.com/vi/${extractedVideoId}/maxresdefault.jpg`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={`yt-thumbnail-${extractedVideoId}-maxres.jpg`}
                        className="w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download 1080p Image</span>
                      </a>
                    </div>

                    {/* High Quality 720p */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>High Quality (HQ)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700">480x360</span>
                      </div>
                      <div className="aspect-video bg-black rounded-xl overflow-hidden">
                        <img 
                          src={`https://img.youtube.com/vi/${extractedVideoId}/hqdefault.jpg`} 
                          alt="HQ Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <a
                        href={`https://img.youtube.com/vi/${extractedVideoId}/hqdefault.jpg`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Open / Download HQ</span>
                      </a>
                    </div>
                  </div>

                  {/* Usage notice */}
                  <div className="p-3 bg-slate-100/70 dark:bg-slate-800/60 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                    <span>
                      Usage Notice: Downloaded thumbnails are intended strictly for research, inspiration, audits, or content you have legitimate rights to use.
                    </span>
                  </div>
                </div>
              )}

              {/* SEO Score Result Render */}
              {seoResult && (
                <div className="space-y-5 animate-fade-in">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                        Overall SEO Score
                      </span>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                        {seoResult.score} / 100
                      </h4>
                    </div>
                    <Gauge className="w-10 h-10 text-violet-600" />
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <p className="font-bold text-slate-900 dark:text-white">Video Title:</p>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5">{seoResult.video.title}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Length: {seoResult.video.title?.length || 0} characters</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <p className="font-bold text-slate-900 dark:text-white">Public Tags Detected:</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {seoResult.video.tags && seoResult.video.tags.length > 0 ? (
                          seoResult.video.tags.map((tag: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px]">
                              #{tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 italic">No public tags detected in video metadata</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Thumbnail Generator Specific Render */}
              {thumbnailData && (
                <div className="space-y-5 animate-fade-in mb-6">
                  <div className="flex items-center justify-between p-3 bg-slate-100/70 dark:bg-slate-800/60 rounded-2xl text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 dark:text-white">
                        Aspect Ratio: <span className="text-cyan-600 dark:text-cyan-400 font-mono font-black">{thumbnailData.aspectRatio}</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 font-semibold">
                        AA Contrast Compliant
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewBgTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        {previewBgTheme === 'dark' ? '☀️ Light Feed' : '🌙 Dark Feed'}
                      </button>
                    </div>
                  </div>

                  {/* Feed Background Simulator Container */}
                  <div className={`p-4 sm:p-6 rounded-3xl border transition-colors ${
                    previewBgTheme === 'dark' 
                      ? 'bg-slate-950 border-slate-800 text-white' 
                      : 'bg-slate-100 border-slate-200 text-slate-900'
                  }`}>
                    
                    {/* Adaptive Aspect Ratio Canvas Frame */}
                    <div className={`relative overflow-hidden rounded-2xl shadow-2xl border-2 border-slate-400 dark:border-slate-600 group ${
                      thumbnailData.aspectRatio === '9:16' ? 'aspect-[9/16] max-w-[280px] mx-auto' :
                      thumbnailData.aspectRatio === '1:1' ? 'aspect-square max-w-[340px] mx-auto' :
                      thumbnailData.aspectRatio === '4:3' ? 'aspect-[4/3] max-w-[420px] mx-auto' :
                      'aspect-video w-full'
                    }`}>
                      <img
                        src={thumbnailData.imageUrl}
                        alt="AI Generated Thumbnail"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/35 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-[10px] sm:text-xs tracking-wider px-2.5 py-0.5 rounded shadow-lg uppercase">
                        HIGH-CTR
                      </div>

                      <div className="absolute top-3 right-3 bg-black/80 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded border border-white/20">
                        {thumbnailData.aspectRatio}
                      </div>

                      {/* Bold 2-4 Word Text Hook */}
                      <div className="absolute bottom-4 inset-x-3 text-center">
                        <div className="inline-block bg-black/95 backdrop-blur-sm px-4 py-2 rounded-xl border-2 border-amber-400 shadow-2xl">
                          <span className="text-sm sm:text-lg font-black tracking-tight text-amber-300 drop-shadow">
                            {thumbnailData.overlayText || 'VIRAL TOPIC'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Mock YouTube Metadata Row */}
                    <div className="mt-3 max-w-lg mx-auto flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-xs shrink-0">
                        CG
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">
                          {thumbnailData.topic}
                        </p>
                        <p className="text-[11px] opacity-60">
                          CreatorGrow Studio • 1.2M views • 2 hours ago
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={downloadThumbnailCanvas}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download {thumbnailData.aspectRatio} PNG</span>
                    </button>

                    <a
                      href={thumbnailData.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Clean Base Visual</span>
                    </a>
                  </div>

                  <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800 text-[11px] text-cyan-900 dark:text-cyan-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>
                      Generated with {thumbnailData.style} preset in {thumbnailData.aspectRatio} aspect ratio. Includes high-saturation focal subject, contrast AA compliance, and mobile feed simulation.
                    </span>
                  </div>
                </div>
              )}

              {/* Standard AI Generated Text Render */}
              {generatedOutput && (
                <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-mono p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                  {generatedOutput}
                </div>
              )}

              {/* Empty state before running */}
              {!generatedOutput && !extractedVideoId && !seoResult && !error && !loading && (
                <div className="text-center py-20 text-slate-400">
                  <Sparkles className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Ready to Generate
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Fill in your topic or link in the left panel and click "Run {tool.name}" to see results.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom info tip */}
            <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>CreatorGrow Studio Engine</span>
              <span>Saved results sync to your dashboard</span>
            </div>
          </div>

        </div>

        {/* Tool FAQ Accordion */}
        {tool.faq && tool.faq.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-12">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions About {tool.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.faq.map((f, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-violet-500" />
                    <span>{f.q}</span>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                More {tool.category.toUpperCase()} Tools
              </h3>
              <Link to={`/category/${tool.category}`} className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                View All {tool.category} Tools →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTools.map(rTool => (
                <ToolCard key={rTool.id} tool={rTool} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
