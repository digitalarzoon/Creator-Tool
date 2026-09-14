import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

export const FavoritesPage: React.FC = () => {
  const { favorites, toggleFavorite } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-6 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Your Favorite Creator Tools</h1>
            <p className="text-xs text-slate-500">Quick access to your most frequently used YouTube utilities.</p>
          </div>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map(fav => (
              <div key={fav.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{fav.toolName}</h3>
                  <span className="text-[10px] text-slate-400 mt-1 block">Saved to favorites</span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link to={`/tools/${fav.toolSlug}`} className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1">
                    <span>Open Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button onClick={() => toggleFavorite({ id: fav.toolId, slug: fav.toolSlug, name: fav.toolName })} className="text-amber-500 hover:text-slate-400 text-xs cursor-pointer">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No favorite tools yet</p>
            <p className="text-xs text-slate-400 mt-1">Browse all 81 tools and click the star icon to pin favorites here.</p>
            <Link to="/tools" className="mt-4 inline-block px-4 py-2 bg-cyan-500 text-slate-950 rounded-xl text-xs font-bold">
              Explore Tools
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export const HistoryPage: React.FC = () => {
  const { history, clearHistory } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-6 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Tool History</h1>
            <p className="text-xs text-slate-500">Recently accessed creator tools</p>
          </div>
          {history.length > 0 && (
            <button onClick={clearHistory} className="text-xs text-rose-600 font-bold hover:underline cursor-pointer">
              Clear History
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
            {history.map(h => (
              <div key={h.id} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{h.toolName}</h4>
                  <span className="text-[10px] text-slate-400">Used on {new Date(h.usedAt).toLocaleString()}</span>
                </div>
                <Link to={`/tools/${h.toolSlug}`} className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline">
                  Launch Tool →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-400">No tools used in this session yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
