import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Twitter, Github, Linkedin, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from '../common/Logo.tsx';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-2">
            <Link to="/" className="inline-block group">
              <Logo size={34} tagline="Smart AI & SEO Growth Suite" />
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 max-w-sm leading-relaxed">
              Smart AI &amp; SEO Tools to Accelerate Your YouTube Growth. 100% free creator growth tools for research, high-retention scripts, viral hooks, SEO optimization, and channel growth.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-violet-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-rose-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Workflow Tools Col */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Creator Workflow
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
              <li><Link to="/category/research" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">01 Research</Link></li>
              <li><Link to="/category/create" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">02 Create</Link></li>
              <li><Link to="/category/design" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">03 Design</Link></li>
              <li><Link to="/category/optimize" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">04 Optimize</Link></li>
              <li><Link to="/category/analyze" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">05 Analyze</Link></li>
              <li><Link to="/category/grow" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">06 Grow</Link></li>
              <li><Link to="/category/shorts" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Shorts Studio</Link></li>
            </ul>
          </div>

          {/* Popular Tools Col */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Featured Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
              <li><Link to="/tools/youtube-title-generator" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Title Generator</Link></li>
              <li><Link to="/tools/youtube-thumbnail-downloader" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Thumbnail Downloader</Link></li>
              <li><Link to="/tools/ai-youtube-script-generator" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">AI Script Writer</Link></li>
              <li><Link to="/tools/youtube-seo-checker" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">SEO Score Checker</Link></li>
              <li><Link to="/tools/youtube-channel-analyzer" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Channel Analyzer</Link></li>
              <li><Link to="/tools/shorts-hook-generator" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Viral Shorts Hooks</Link></li>
            </ul>
          </div>

          {/* Resources Col */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Growth Guides</Link></li>
              <li><Link to="/about" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">SEO Frameworks</Link></li>
              <li><Link to="/about" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Thumbnail Psychology</Link></li>
              <li><Link to="/about" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Shorts Algorithm</Link></li>
              <li><Link to="/contact" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Creator Support</Link></li>
            </ul>
          </div>

          {/* Company & Legal Col */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Trust Note */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80">
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/60 mb-6 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-700 dark:text-slate-300">Creator Transparency & Compliance:</strong> CreatorGrow is an independent SaaS creator development platform. CreatorGrow is not affiliated with, endorsed by, or partnered with YouTube, LLC or Alphabet Inc. YouTube is a registered trademark of Google LLC. All public video metadata, thumbnail inspections, and channel analysis utilize official APIs or public records for creator research and educational purposes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} CreatorGrow. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built for ambitious YouTube creators worldwide <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
