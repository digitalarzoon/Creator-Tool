import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Star, 
  Clock, 
  Bookmark, 
  FolderGit2, 
  Plus, 
  Trash2, 
  ArrowRight, 
  BarChart3, 
  Check, 
  Compass,
  Cloud,
  Copy,
  Download,
  Sliders,
  Settings,
  Target,
  FileText,
  Save,
  Radio,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { TOOLS } from '../data/tools.ts';

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    profile, 
    favorites, 
    history, 
    savedResults, 
    projects, 
    deleteResult, 
    deleteProject, 
    createProject,
    toggleFavorite,
    updateUserProfile,
    syncLocalDataToCloud,
    signInWithGoogle
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'content' | 'profile' | 'goals' | 'scratchpad'>('content');

  // Channel Profile State
  const [channelName, setChannelName] = useState(profile?.channelName || '');
  const [preferredNiche, setPreferredNiche] = useState(profile?.preferredNiche || 'Tech & YouTube Tools');
  const [targetAudience, setTargetAudience] = useState(profile?.targetAudience || 'YouTube Creators & Viewers');
  const [toneOfVoice, setToneOfVoice] = useState(profile?.toneOfVoice || 'Conversational & Engaging');
  const [subscribersGoal, setSubscribersGoal] = useState<number>(profile?.subscribersGoal || 1000);
  const [profileSaved, setProfileSaved] = useState(false);

  // Scratchpad State
  const [scratchpad, setScratchpad] = useState(() => {
    try {
      return localStorage.getItem('creatorgrow_scratchpad') || '💡 Video Hook Idea: Why 99% of Small Channels Fail at YouTube SEO (And how to rank in 2026)\n\n• Key Point 1: Search volume vs Search Intent\n• Key Point 2: First 30-second retention curve';
    } catch {
      return '';
    }
  });
  const [scratchpadSaved, setScratchpadSaved] = useState(false);

  // Export State
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [syncedCloud, setSyncedCloud] = useState(false);

  // New Project Modal State
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectNiche, setNewProjectNiche] = useState(preferredNiche);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      channelName,
      preferredNiche,
      targetAudience,
      toneOfVoice,
      subscribersGoal
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleSaveScratchpad = () => {
    try {
      localStorage.setItem('creatorgrow_scratchpad', scratchpad);
      setScratchpadSaved(true);
      setTimeout(() => setScratchpadSaved(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSyncCloud = async () => {
    await syncLocalDataToCloud();
    setSyncedCloud(true);
    setTimeout(() => setSyncedCloud(false), 2500);
  };

  const handleCopyYTStudio = (item: any) => {
    const formatted = `=== YOUTUBE VIDEO METADATA ===\nTitle: ${item.title}\nCategory: ${item.category}\nDate: ${new Date(item.createdAt).toLocaleDateString()}\n\n=== GENERATED CONTENT / SCRIPT ===\n${item.content}\n\nGenerated with CreatorGrow YouTube Tools`;
    navigator.clipboard.writeText(formatted);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFile = (item: any, format: 'md' | 'txt') => {
    const filename = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 30)}.${format}`;
    const text = format === 'md' 
      ? `# ${item.title}\n*Category: ${item.category} | Tool: ${item.toolSlug}*\n\n${item.content}`
      : `${item.title}\nCategory: ${item.category}\n\n${item.content}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    setIsCreatingProject(true);
    try {
      await createProject(newProjectName, newProjectDesc, newProjectNiche);
      setNewProjectName('');
      setNewProjectDesc('');
      setShowProjectModal(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsCreatingProject(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-6 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Creator Studio Hub</span>
                </span>
                {currentUser ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    <Cloud className="w-3.5 h-3.5" /> Cloud Synced
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    Guest Mode (Browser Storage)
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {currentUser ? (profile?.channelName || profile?.name || currentUser.displayName || 'Creator') : 'Your Creator Command Center'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {currentUser 
                  ? `Logged in as ${currentUser.email}. All your favorite tools, scripts, and campaigns are backed up to Firestore.`
                  : 'Manage your favorite tools, save generated video scripts, and organize projects. Sign in to back up across all devices.'}
              </p>
            </div>

            {/* Top Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              {!currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => signInWithGoogle()}
                    className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Google 1-Click Sync</span>
                  </button>
                  <Link
                    to="/login"
                    className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors shadow-sm"
                  >
                    Sign In / Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSyncCloud}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {syncedCloud ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Cloud className="w-3.5 h-3.5" />}
                    <span>{syncedCloud ? 'Cloud Synced!' : 'Sync Local Data'}</span>
                  </button>
                  <Link
                    to="/tools"
                    className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors shadow-sm"
                  >
                    Explore 81 Tools
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guest Cloud Upsell Banner if not signed in */}
        {!currentUser && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-cyan-950/40 dark:to-slate-900 border border-cyan-200 dark:border-cyan-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 shrink-0 mt-0.5">
                <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Save your favorite tools &amp; scripts across devices
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Sign in with your Google or email account to unlock unlimited multi-device cloud sync, AI channel persona customization, and campaign project workspaces.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
              >
                Sign Up Free
              </Link>
              <Link
                to="/login"
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Favorite Tools</span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{favorites.length}</p>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Pinned for quick access</span>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Saved Video Outputs</span>
              <Bookmark className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{savedResults.length}</p>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Titles, scripts &amp; hooks</span>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Channel Campaigns</span>
              <FolderGit2 className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{projects.length}</p>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Multi-video projects</span>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Tools Explored</span>
              <Clock className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{history.length}</p>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Recent history</span>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'content'
                ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Content &amp; Favorites ({savedResults.length + favorites.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>AI Channel Persona &amp; Niche</span>
          </button>

          <button
            onClick={() => setActiveTab('goals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'goals'
                ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Growth Milestones &amp; Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('scratchpad')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'scratchpad'
                ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Creator Scratchpad</span>
          </button>
        </div>

        {/* TAB 1: SAVED CONTENT & FAVORITES */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Col (Cols 1-7): Saved Results & Projects */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Saved Video Content with 1-Click Export Suite */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-emerald-500" />
                      <span>Saved Video Content &amp; Scripts</span>
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Outputs generated from AI tools with 1-click export to YouTube Studio
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{savedResults.length} items</span>
                </div>

                {savedResults.length > 0 ? (
                  <div className="space-y-4 max-h-[32rem] overflow-y-auto pr-1">
                    {savedResults.map(item => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                              {item.category}
                            </span>
                          </div>
                          
                          <div className="relative">
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap line-clamp-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </div>

                        {/* Export & Actions Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-200/40 dark:border-slate-800/60 text-[11px] text-slate-400">
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>

                          <div className="flex items-center gap-2">
                            {/* Copy YouTube Studio Format */}
                            <button
                              onClick={() => handleCopyYTStudio(item)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-600 text-[10px] font-bold transition-colors cursor-pointer"
                              title="Copy YouTube Studio formatted metadata"
                            >
                              <Copy className="w-3 h-3 text-cyan-500" />
                              <span>{copiedId === item.id ? 'Copied!' : 'YT Studio Format'}</span>
                            </button>

                            {/* Download Markdown */}
                            <button
                              onClick={() => handleDownloadFile(item, 'md')}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 text-[10px] font-bold transition-colors cursor-pointer"
                              title="Download Markdown file"
                            >
                              <Download className="w-3 h-3 text-indigo-500" />
                              <span>MD</span>
                            </button>

                            {/* Open Original Tool */}
                            <Link
                              to={`/tools/${item.toolSlug}`}
                              className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
                            >
                              Open Tool
                            </Link>

                            {/* Delete */}
                            <button
                              onClick={() => deleteResult(item.id)}
                              className="text-rose-400 hover:text-rose-600 p-1 cursor-pointer"
                              title="Delete output"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      No saved video outputs yet
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Generate video titles, scripts, hooks, or tags and click "Save to Dashboard" to keep them organized here.
                    </p>
                    <Link
                      to="/tools"
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 rounded-xl text-xs font-bold"
                    >
                      <span>Explore 81 Tools</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Creator Projects / Series */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-indigo-500" />
                      <span>Campaign Projects &amp; Video Series</span>
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Group multi-part videos, playlists, or sponsor sponsorships into organized campaign hubs
                    </p>
                  </div>
                  <button
                    onClick={() => setShowProjectModal(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Project</span>
                  </button>
                </div>

                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.map(p => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              {p.name}
                            </h4>
                            <button
                              onClick={() => deleteProject(p.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {p.description || 'No description added.'}
                          </p>
                        </div>
                        <div className="mt-4 pt-2 border-t border-slate-200/50 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{p.targetNiche}</span>
                          <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-400">
                    <FolderGit2 className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      No active projects yet
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Create your first campaign project to bundle multiple video ideas and scripts together.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Col (Cols 8-12): Favorite Tools & Recent Tool History */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Saved Favorite Tools */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>Favorite Tools ({favorites.length})</span>
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {currentUser ? 'Synced to your cloud account' : 'Saved in this browser'}
                    </p>
                  </div>
                  <Link to="/tools" className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline">
                    Browse All
                  </Link>
                </div>

                {favorites.length > 0 ? (
                  <div className="space-y-2">
                    {favorites.map(fav => (
                      <div
                        key={fav.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-cyan-50/60 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Link
                          to={`/tools/${fav.toolSlug}`}
                          className="font-semibold text-xs text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
                        >
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{fav.toolName}</span>
                        </Link>
                        <button
                          onClick={() => toggleFavorite({ id: fav.toolId, slug: fav.toolSlug, name: fav.toolName })}
                          className="text-amber-500 hover:text-slate-400 p-1 cursor-pointer"
                          title="Remove from favorites"
                        >
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <Star className="w-7 h-7 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      No favorite tools added yet
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Click the star on any of the 81 tools to pin it here for instant 1-click access!
                    </p>
                  </div>
                )}
              </div>

              {/* Tool Usage History */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-500" />
                    <span>Recently Used Tools</span>
                  </h2>
                </div>

                {history.length > 0 ? (
                  <div className="space-y-2">
                    {history.slice(0, 6).map(hist => (
                      <Link
                        key={hist.id}
                        to={`/tools/${hist.toolSlug}`}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                          {hist.toolName}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    Tools you visit will appear here for fast access.
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: AI CHANNEL PERSONA & NICHE */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-1">
                <Sliders className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">AI Voice &amp; Channel Tuner</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Customize AI Outputs to Your Channel
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                When you save your channel profile here, our 81 AI generators automatically adapt video hooks, descriptions, and script outlines to match your exact tone and audience!
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    YouTube Channel Name
                  </label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="e.g., Tech Simplified"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Primary Content Niche
                  </label>
                  <select
                    value={preferredNiche}
                    onChange={(e) => setPreferredNiche(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Tech & YouTube Tools">Tech &amp; YouTube Tools</option>
                    <option value="Gaming & Esports">Gaming &amp; Esports</option>
                    <option value="Personal Finance & Crypto">Personal Finance &amp; Investing</option>
                    <option value="Education & Science">Education, Science &amp; How-To</option>
                    <option value="Fitness & Health">Fitness, Gym &amp; Health</option>
                    <option value="Vlogs & Lifestyle">Vlogs, Travel &amp; Lifestyle</option>
                    <option value="Commentary & Pop Culture">Commentary, Reactions &amp; Culture</option>
                    <option value="Shorts & Fast Entertainment">Shorts &amp; Fast Entertainment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Audience Persona
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., Beginners looking to make money online with AI"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Preferred Tone of Voice
                </label>
                <select
                  value={toneOfVoice}
                  onChange={(e) => setToneOfVoice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Conversational & Engaging">Conversational &amp; Engaging (Friendly &amp; Relatable)</option>
                  <option value="High-Retention & Punchy">High-Retention &amp; Punchy (MrBeast / Fast-Paced)</option>
                  <option value="Authoritative & In-Depth">Authoritative &amp; In-Depth (Documentary / Educational)</option>
                  <option value="Humorous & Entertaining">Humorous &amp; Entertaining (Lighthearted / Memes)</option>
                  <option value="Direct & Minimalist">Direct &amp; Minimalist (No Fluff / Pure Value)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Next Subscriber Goal
                </label>
                <input
                  type="number"
                  value={subscribersGoal}
                  onChange={(e) => setSubscribersGoal(Number(e.target.value))}
                  placeholder="1000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  {profileSaved ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
                  <span>{profileSaved ? 'Preferences Saved!' : 'Save Channel Persona'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: GROWTH MILESTONES & TRACKER */}
        {activeTab === 'goals' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-1">
                <Target className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Channel Milestones</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                YouTube Partner Monetization &amp; Upload Consistency
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Keep your production pipeline on track to achieve monetization and weekly growth.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Milestone 1: Subscribers */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Subscriber Target</span>
                    <span className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400">{subscribersGoal} Subscribers</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-2">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: '45%' }} />
                  </div>
                  <span className="text-[10px] text-slate-400">Aim for 10 high-CTR video topics to push past this milestone!</span>
                </div>

                {/* Milestone 2: 4,000 Watch Hours */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">YouTube Partner Program (Watch Hours)</span>
                    <span className="text-xs font-extrabold text-amber-500">4,000 Hours</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-2">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '30%' }} />
                  </div>
                  <span className="text-[10px] text-slate-400">Use our High-Retention Script &amp; Hook tools to maximize watch time.</span>
                </div>
              </div>

              {/* Weekly Checklist */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Recommended Weekly Creator Checklist
                </h4>
                <div className="space-y-2">
                  {[
                    'Brainstorm 10 title & thumbnail concepts before hitting record',
                    'Draft a 3-part retention hook using the Hook Generator',
                    'Optimize description with primary keywords and timestamps',
                    'Test 2 distinct thumbnail color variants'
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input type="checkbox" className="rounded text-cyan-500 focus:ring-cyan-400 w-4 h-4" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CREATOR SCRATCHPAD */}
        {activeTab === 'scratchpad' && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-500" />
                  <span>Persistent Video Ideas Scratchpad</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Jot down fleeting hooks, sponsor notes, or video outlines on the fly
                </p>
              </div>

              <button
                onClick={handleSaveScratchpad}
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {scratchpadSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                <span>{scratchpadSaved ? 'Notes Saved!' : 'Save Notes'}</span>
              </button>
            </div>

            <textarea
              rows={12}
              value={scratchpad}
              onChange={(e) => setScratchpad(e.target.value)}
              placeholder="Paste ideas, script fragments, or video plans here..."
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>
        )}

        {/* Modal: New Project */}
        {showProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Create Creator Campaign Project
              </h3>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Project / Series Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="e.g., 30-Day AI Micro SaaS Series"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target Niche
                  </label>
                  <input
                    type="text"
                    value={newProjectNiche}
                    onChange={(e) => setNewProjectNiche(e.target.value)}
                    placeholder="e.g., Tech & Coding"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Description &amp; Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    placeholder="Key topics, planned duration, upload schedule..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowProjectModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingProject}
                    className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow cursor-pointer"
                  >
                    {isCreatingProject ? 'Saving...' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
