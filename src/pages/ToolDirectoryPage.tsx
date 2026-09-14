import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Search, Filter, Sparkles, X, Compass } from 'lucide-react';
import { TOOLS, CATEGORIES, CreatorTool } from '../data/tools.ts';
import { ToolCard } from '../components/common/ToolCard.tsx';

export const ToolDirectoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  
  const initialCategory = categorySlug || searchParams.get('cat') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [category, setCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [popularOnly, setPopularOnly] = useState<boolean>(false);

  useEffect(() => {
    if (categorySlug) {
      setCategory(categorySlug);
    }
  }, [categorySlug]);

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return TOOLS.filter(tool => {
      const matchesCat = category === 'all' || tool.category === category;
      if (!matchesCat) return false;

      if (popularOnly && !tool.isPopular && !tool.featured) return false;

      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q)
      );
    });
  }, [category, searchQuery, popularOnly]);

  const activeCategoryMeta = CATEGORIES.find(c => c.id === category);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Complete Creator Toolkit</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {activeCategoryMeta?.name === 'All Tools' ? 'All Creator Tools' : `${activeCategoryMeta?.name} Tools`}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {activeCategoryMeta?.description || 'Browse our complete catalog of 81 purpose-engineered YouTube growth and optimization tools.'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tools by name, workflow, or keyword (e.g., 'thumbnail', 'script', 'tags')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-700 focus:outline-none focus:border-violet-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Popular Filter Toggle */}
            <button
              onClick={() => setPopularOnly(!popularOnly)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                popularOnly
                  ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-300 text-amber-700 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${popularOnly ? 'text-amber-500 fill-amber-500' : ''}`} />
              <span>Popular Only</span>
            </button>
          </div>

          {/* Categories Pill Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-slate-100 dark:border-slate-800">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  category === cat.id
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <p>
            Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredTools.length}</strong> of 81 Creator Tools
          </p>
          {(searchQuery || category !== 'all' || popularOnly) && (
            <button
              onClick={() => {
                setCategory('all');
                setSearchQuery('');
                setPopularOnly(false);
              }}
              className="text-violet-600 dark:text-violet-400 hover:underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <Compass className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No tools found matching your criteria
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or select another category from the top filters.
            </p>
            <button
              onClick={() => {
                setCategory('all');
                setSearchQuery('');
                setPopularOnly(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-violet-600 text-white"
            >
              Show All 81 Tools
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
