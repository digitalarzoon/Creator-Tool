import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowUpRight } from 'lucide-react';
import { CreatorTool } from '../../data/tools.ts';
import { IconHelper } from './IconHelper.tsx';
import { useAuth } from '../../context/AuthContext.tsx';

interface ToolCardProps {
  tool: CreatorTool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { isFavorite, toggleFavorite } = useAuth();
  const favorited = isFavorite(tool.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleFavorite(tool);
  };

  return (
    <div className="group relative flex flex-col justify-between p-5 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-cyan-300 dark:hover:border-cyan-700 transition-all duration-200">
      <div>
        {/* Header with Icon and Category */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
            <IconHelper name={tool.icon} size={22} />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.featured && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/60">
                Popular
              </span>
            )}
            <button
              onClick={handleFavoriteClick}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                favorited
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 text-amber-500'
                  : 'border-transparent text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Star className={`w-4 h-4 ${favorited ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link to={`/tools/${tool.slug}`} className="block">
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {tool.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer action */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 capitalize">
          {tool.category} Tool
        </span>
        <Link
          to={`/tools/${tool.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 group/btn"
        >
          <span>Use Tool</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
