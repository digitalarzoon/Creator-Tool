import React from 'react';
import { ShieldCheck, Mail, Sparkles, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-3">
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          About CreatorGrow
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
          CreatorGrow was engineered to eliminate creative burnout and guesswork for video creators. Modern creators are forced to switch between half a dozen disconnected tools just to research a keyword, draft a hook, design a thumbnail, and audit SEO.
        </p>

        <div className="mt-8 space-y-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            CreatorGrow consolidates the complete creator lifecycle into an intuitive 6-stage workflow: <strong>Research → Create → Design → Optimize → Analyze → Grow</strong>. Every tool is specifically calibrated for YouTube algorithmic mechanics, respecting title character truncation limits, mobile screen contrast requirements, and audience retention psychology.
          </p>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Our Data Integrity Pledge</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We never fabricate simulated private metrics or fake subscriber stats. Any demo analytics are explicitly marked as Sample Data. All tool algorithms rely on verifiable public signals and advanced intelligence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-3">
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Contact CreatorGrow
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Have questions, tool requests, or feedback? Our creator support team is here to assist you.
        </p>

        <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for contacting CreatorGrow! We will respond within 24 hours.'); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
              <input type="text" required placeholder="Jane Creator" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input type="email" required placeholder="jane@example.com" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Channel Link (Optional)</label>
              <input type="text" placeholder="https://youtube.com/@yourchannel" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message</label>
              <textarea rows={4} required placeholder="How can we help your channel?" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-violet-500" />
            </div>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed space-y-4 text-slate-600 dark:text-slate-400">
          <p>
            CreatorGrow respects your privacy. When you sign up or authenticate with Google, we store your email, display name, and preferences solely to maintain your creator workspace, saved results, favorites, and project plans.
          </p>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">YouTube Data & Public Queries</h3>
          <p>
            When utilizing tools such as the YouTube Thumbnail Downloader, Video SEO Analyzer, or Channel Analyzer, CreatorGrow fetches publicly accessible YouTube video metadata or oEmbed records. We never access private channel settings or unlisted private credentials without explicit OAuth authorization.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed space-y-4 text-slate-600 dark:text-slate-400">
          <p>
            By accessing or using CreatorGrow, you agree to these Terms. You agree to use all generation tools, keyword research, and thumbnail utilities responsibly and strictly in accordance with applicable laws and third-party platform community terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs font-bold">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>Important Legal Notice & Platform Disclaimer</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">YouTube Disclaimer & Usage Rights</h1>
        <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed space-y-4 text-slate-600 dark:text-slate-400">
          <p>
            <strong>Independence Notice:</strong> CreatorGrow is an independent creator development software platform. CreatorGrow is <strong>not endorsed by, affiliated with, sponsored by, or partner of YouTube, LLC or Google LLC</strong>. YouTube is a registered trademark of Google LLC.
          </p>
          <p>
            <strong>Thumbnail Downloader Guidance:</strong> Thumbnails downloaded using our inspection utilities are provided strictly for research, inspiration, auditing, and assets for which the user has legitimate copyright or commercial license. You are solely responsible for ensuring compliance with copyright laws and YouTube community guidelines.
          </p>
          <p>
            <strong>Performance Estimates:</strong> All SEO scores, CTR estimates, and audience retention tips reflect algorithmic best practices. No tool can guarantee exact YouTube algorithm impressions or subscriber counts.
          </p>
        </div>
      </div>
    </div>
  );
};
