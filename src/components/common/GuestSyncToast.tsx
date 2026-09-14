import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, ArrowRight, Cloud, CloudOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';

export const GuestSyncToast: React.FC = () => {
  const { guestPrompt, dismissGuestPrompt, isLoggedIn } = useAuth();

  if (!guestPrompt?.show || isLoggedIn) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-slate-900/95 dark:bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-cyan-500/30 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
            <Cloud className="w-5 h-5 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800">
                Cloud Sync Available
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {guestPrompt.message}
            </p>

            <div className="mt-3 flex items-center gap-2.5">
              <Link
                to={guestPrompt.actionLink || '/login'}
                onClick={dismissGuestPrompt}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-all shadow-sm"
              >
                <span>{guestPrompt.actionText || 'Sign In to Sync'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={dismissGuestPrompt}
                className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Keep using offline
              </button>
            </div>
          </div>

          <button
            onClick={dismissGuestPrompt}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
