export interface TrendingVideoMetric {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  views: string;
  viewsNumeric: number;
  publishedDaysAgo: number;
  velocity: string; // e.g. "4.8x channel average"
  viewsPerHour: string;
  ctrBenchmark: string; // e.g. "12.4%"
  retentionAt30s: string; // e.g. "72%"
  thumbnailUrl: string;
  thumbnailBadgeText: string;
  duration: string;
  hookFormula: string;
  packagingStrategy: string;
  algorithmTrigger: string;
  targetKeywords: string[];
}

export interface TrendingNiche {
  id: string;
  name: string;
  categorySlug: string;
  icon: string;
  tagline: string;
  algorithmInsight: string;
  avgCtrBenchmark: string;
  avgRetention30s: string;
  breakoutKeywords: {
    keyword: string;
    growthPercent: string;
    competition: 'Low' | 'Medium' | 'High';
    intent: 'How-To / Educational' | 'Curiosity / Drama' | 'Comparison / Review' | 'Entertainment';
    volume: string;
  }[];
  trendingVideos: TrendingVideoMetric[];
}

export const YOUTUBE_TRENDING_NICHES: TrendingNiche[] = [
  {
    id: 'tech-ai',
    name: 'Tech & AI Automation',
    categorySlug: 'research',
    icon: 'Cpu',
    tagline: 'Autonomous AI agents, coding workflows, open-source models, and developer productivity',
    algorithmInsight: 'YouTube algorithm in Tech is heavily favoring practical "Build with me in X minutes" and real benchmark comparisons over speculative hype. Viewers crave terminal demonstrations and GitHub repos.',
    avgCtrBenchmark: '8.5% - 11.2%',
    avgRetention30s: '68%',
    breakoutKeywords: [
      { keyword: 'AI Coding Agent Tutorial 2026', growthPercent: '+215%', competition: 'Low', intent: 'How-To / Educational', volume: '185K/mo' },
      { keyword: 'Local LLMs on Mac Studio', growthPercent: '+160%', competition: 'Medium', intent: 'Comparison / Review', volume: '120K/mo' },
      { keyword: 'Cursor AI vs Windsurf vs Copilot', growthPercent: '+140%', competition: 'Low', intent: 'Comparison / Review', volume: '95K/mo' },
      { keyword: 'Automate Boring Tasks with Python & Gemini', growthPercent: '+95%', competition: 'Low', intent: 'How-To / Educational', volume: '140K/mo' }
    ],
    trendingVideos: [
      {
        id: 'tech-1',
        title: 'I Built a $10k/mo Micro SaaS in 48 Hours Using AI Agents',
        channel: 'Indie Dev Lab',
        channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        views: '842,000',
        viewsNumeric: 842000,
        publishedDaysAgo: 4,
        velocity: '5.4x channel baseline',
        viewsPerHour: '+12,400/hr',
        ctrBenchmark: '12.8%',
        retentionAt30s: '74%',
        thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        thumbnailBadgeText: 'DON\'T WRITE CODE',
        duration: '14:22',
        hookFormula: '"99% of developers build apps the hard way. In the next 14 minutes, I will show you the exact autonomous workflow that built this live app."',
        packagingStrategy: 'Extreme contrast: Old VS Code IDE on left with red cross vs single prompt terminal on right with green checkmark.',
        algorithmTrigger: 'High session watch time: 65% of viewers watched past the 10-minute code walkthrough.',
        targetKeywords: ['AI SaaS', 'Autonomous coding', 'Micro SaaS 2026']
      },
      {
        id: 'tech-2',
        title: 'Stop Using Cloud AI: The $0 Local Setup You Need',
        channel: 'Hardware Hacker',
        channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        views: '1,210,000',
        viewsNumeric: 1210000,
        publishedDaysAgo: 8,
        velocity: '4.2x channel baseline',
        viewsPerHour: '+8,900/hr',
        ctrBenchmark: '11.5%',
        retentionAt30s: '70%',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
        thumbnailBadgeText: '$0 SUBSCRIPTIONS',
        duration: '18:05',
        hookFormula: '"OpenAI and Anthropic are charging you $200 a month for computing you already own. Here is the 10-minute setup."',
        packagingStrategy: 'Cost comparison visual ($240/yr cancelled vs $0 offline shield).',
        algorithmTrigger: 'Surge in high-intent search traffic for privacy-focused local models.',
        targetKeywords: ['Ollama setup', 'Local LLM benchmark', 'Free AI workstation']
      }
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming & Sandbox',
    categorySlug: 'shorts',
    icon: 'Gamepad2',
    tagline: 'Hardcore survival challenges, GTA 6 leaks, sandbox mechanics, and speedrun drama',
    algorithmInsight: 'Sandbox gaming videos are winning through "Stakes & Penalty" hooks. The algorithm promotes videos with strong narrative tension in the first 15 seconds where a single mistake resets days of work.',
    avgCtrBenchmark: '10.5% - 14.5%',
    avgRetention30s: '76%',
    breakoutKeywords: [
      { keyword: 'Minecraft 100 Days Hardcore in a World with Custom Physics', growthPercent: '+190%', competition: 'Medium', intent: 'Curiosity / Drama', volume: '420K/mo' },
      { keyword: 'GTA 6 Real World Physics Breakdown', growthPercent: '+310%', competition: 'Low', intent: 'Entertainment', volume: '650K/mo' },
      { keyword: 'Roblox Studio Game Made in 24 Hours', growthPercent: '+115%', competition: 'Low', intent: 'How-To / Educational', volume: '210K/mo' },
      { keyword: 'Impossible Elden Ring Boss Challenge', growthPercent: '+85%', competition: 'High', intent: 'Entertainment', volume: '180K/mo' }
    ],
    trendingVideos: [
      {
        id: 'gaming-1',
        title: 'I Spent 100 Days in Minecraft But Every Death Resets My PC',
        channel: 'PixelSurvivor',
        channelAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80',
        views: '2,890,000',
        viewsNumeric: 2890000,
        publishedDaysAgo: 5,
        velocity: '6.8x channel baseline',
        viewsPerHour: '+34,000/hr',
        ctrBenchmark: '14.2%',
        retentionAt30s: '81%',
        thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
        thumbnailBadgeText: 'DO NOT DIE',
        duration: '28:40',
        hookFormula: '"If my health bar hits zero at any second during this 100-day run, a script will automatically wipe my entire hard drive."',
        packagingStrategy: 'Hyper-saturated color palette, skull icon overlay, giant red timer counting down.',
        algorithmTrigger: 'Binge watch session initiation: Viewers watch 20+ minutes and click recommended sequel.',
        targetKeywords: ['Minecraft 100 Days', 'Hardcore challenge', 'Extreme stakes gaming']
      },
      {
        id: 'gaming-2',
        title: 'GTA 6 Leaked Physics Engine vs GTA 5: The Frame-by-Frame Proof',
        channel: 'GameTheory Nexus',
        channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        views: '1,750,000',
        viewsNumeric: 1750000,
        publishedDaysAgo: 3,
        velocity: '5.1x channel baseline',
        viewsPerHour: '+22,500/hr',
        ctrBenchmark: '13.0%',
        retentionAt30s: '75%',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
        thumbnailBadgeText: '2026 REALISM',
        duration: '12:15',
        hookFormula: '"Look closely at the water displacement in this 2-second clip. Rockstar solved an 11-year graphics problem."',
        packagingStrategy: 'Split screen comparison with zoom lens magnification and yellow pointer arrow.',
        algorithmTrigger: 'Extreme viewer comment velocity debating physics accuracy.',
        targetKeywords: ['GTA 6 physics', 'GTA 5 vs GTA 6', 'Rockstar engine breakdown']
      }
    ]
  },
  {
    id: 'finance',
    name: 'Personal Finance & Wealth',
    categorySlug: 'seo',
    icon: 'DollarSign',
    tagline: 'Index funds, recession hedges, high-yield cash flow, and tax loopholes explained simply',
    algorithmInsight: 'Finance CPMs are at historic highs ($35-$60). Successful videos avoid generic "save money" cliches and use specific dollar amounts and tangible balance sheet walkthroughs.',
    avgCtrBenchmark: '7.8% - 10.4%',
    avgRetention30s: '65%',
    breakoutKeywords: [
      { keyword: 'How to Invest $10,000 in 2026 (Zero Risk Strategy)', growthPercent: '+175%', competition: 'Low', intent: 'How-To / Educational', volume: '310K/mo' },
      { keyword: 'High Yield Savings Account Trap You Missed', growthPercent: '+240%', competition: 'Low', intent: 'Curiosity / Drama', volume: '190K/mo' },
      { keyword: 'S&P 500 vs Real Estate Cash Flow Breakdown', growthPercent: '+110%', competition: 'Medium', intent: 'Comparison / Review', volume: '150K/mo' },
      { keyword: 'Tax Strategies the Ultra-Wealthy Actually Use', growthPercent: '+85%', competition: 'Medium', intent: 'How-To / Educational', volume: '220K/mo' }
    ],
    trendingVideos: [
      {
        id: 'fin-1',
        title: 'Where I Put $100,000 Right Now (Not Stocks or Real Estate)',
        channel: 'Modern Capital',
        channelAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        views: '920,000',
        viewsNumeric: 920000,
        publishedDaysAgo: 6,
        velocity: '4.5x channel baseline',
        viewsPerHour: '+11,000/hr',
        ctrBenchmark: '11.8%',
        retentionAt30s: '69%',
        thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
        thumbnailBadgeText: 'NEW STRATEGY',
        duration: '16:48',
        hookFormula: '"If you keep your emergency fund in a regular bank account right now, you are losing approximately $340 every single month to hidden rate cuts."',
        packagingStrategy: 'Clean portfolio sheet with blurred third column and high-contrast green percentages.',
        algorithmTrigger: 'High viewer return rate and multiple bookmarks/shares to external communities.',
        targetKeywords: ['Where to invest 2026', 'High yield cash strategy', 'Safe portfolio hedge']
      }
    ]
  },
  {
    id: 'documentary',
    name: 'True Crime & Video Essays',
    categorySlug: 'create',
    icon: 'Film',
    tagline: 'Internet mysteries, dark corporate downfalls, cold cases, and investigative storytelling',
    algorithmInsight: 'Long-form video essays (30-60 min) are dominating watch-time rankings. The algorithm rewards mood-setting cold opens with documentary-grade pacing and custom sound design.',
    avgCtrBenchmark: '9.2% - 13.0%',
    avgRetention30s: '78%',
    breakoutKeywords: [
      { keyword: 'The Billion-Dollar Silicon Valley Disappearance', growthPercent: '+280%', competition: 'Low', intent: 'Curiosity / Drama', volume: '290K/mo' },
      { keyword: 'The Darkest Scam in Internet History Explained', growthPercent: '+195%', competition: 'Low', intent: 'Curiosity / Drama', volume: '410K/mo' },
      { keyword: 'The Unsolved Deep Sea Submersible Mystery', growthPercent: '+130%', competition: 'Medium', intent: 'Curiosity / Drama', volume: '340K/mo' },
      { keyword: 'How a College Kid Outsmarted the FBI', growthPercent: '+90%', competition: 'Low', intent: 'Curiosity / Drama', volume: '180K/mo' }
    ],
    trendingVideos: [
      {
        id: 'doc-1',
        title: 'The Secret Downfall of the Internet\'s Most Loved Creator',
        channel: 'ShadowArchives',
        channelAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        views: '3,450,000',
        viewsNumeric: 3450000,
        publishedDaysAgo: 7,
        velocity: '7.2x channel baseline',
        viewsPerHour: '+41,000/hr',
        ctrBenchmark: '13.9%',
        retentionAt30s: '83%',
        thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
        thumbnailBadgeText: 'THE COVER-UP',
        duration: '42:18',
        hookFormula: '"On July 14th, 2024, a single deleted hard drive exposed a 6-year deception involving 4 million followers."',
        packagingStrategy: 'Grainy film texture, spotlight face silhouette, censored red bar across eyes.',
        algorithmTrigger: 'Extraordinary average view duration: 26 minutes average watch time per viewer.',
        targetKeywords: ['Internet documentary', 'Creator downfall', 'Video essay mystery']
      }
    ]
  },
  {
    id: 'fitness',
    name: 'Fitness, Health & Longevity',
    categorySlug: 'optimize',
    icon: 'Activity',
    tagline: 'Hypertrophy science, zone-2 endurance, metabolic health, and real body recompositions',
    algorithmInsight: 'Fitness viewers have developed fatigue toward "get shredded in 7 days". Trending videos cite peer-reviewed biomechanics studies and debunk legacy gym myths with 3D anatomy animations.',
    avgCtrBenchmark: '8.0% - 11.5%',
    avgRetention30s: '67%',
    breakoutKeywords: [
      { keyword: 'The Science-Based Workout Split That Beats PPL', growthPercent: '+185%', competition: 'Low', intent: 'How-To / Educational', volume: '240K/mo' },
      { keyword: 'Zone 2 Cardio Protocols for Rapid Fat Oxidation', growthPercent: '+140%', competition: 'Low', intent: 'How-To / Educational', volume: '160K/mo' },
      { keyword: 'The 3 Exercises That Ruined Your Rotator Cuff', growthPercent: '+125%', competition: 'Low', intent: 'How-To / Educational', volume: '190K/mo' },
      { keyword: 'High Protein Meal Prep Under $25 a Week', growthPercent: '+90%', competition: 'Medium', intent: 'How-To / Educational', volume: '320K/mo' }
    ],
    trendingVideos: [
      {
        id: 'fit-1',
        title: 'Stop Doing Bench Press Like This (It Destroys Your Shoulders)',
        channel: 'Biomechanic Labs',
        channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        views: '1,450,000',
        viewsNumeric: 1450000,
        publishedDaysAgo: 5,
        velocity: '4.9x channel baseline',
        viewsPerHour: '+16,000/hr',
        ctrBenchmark: '12.1%',
        retentionAt30s: '72%',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
        thumbnailBadgeText: 'STOP DOING THIS',
        duration: '11:34',
        hookFormula: '"If you flare your elbows past this 45-degree angle, you are placing 400 pounds of shearing force directly on your anterior capsule."',
        packagingStrategy: 'Side-by-side shoulder anatomy skeleton with bright red glowing pain indicator.',
        algorithmTrigger: 'High repeat view rate as gym-goers re-watch before performing their sets.',
        targetKeywords: ['Bench press form', 'Shoulder pain fix', 'Hypertrophy science']
      }
    ]
  },
  {
    id: 'productivity',
    name: 'Productivity & Deep Work',
    categorySlug: 'create',
    icon: 'Zap',
    tagline: 'Dopamine resets, deep focus systems, Notion workspaces, and solopreneur workflows',
    algorithmInsight: 'Productivity trends have shifted toward "Anti-Burnout" and physical desk ergonomics over hustle culture. Viewers want frictionless micro-habits.',
    avgCtrBenchmark: '8.4% - 11.0%',
    avgRetention30s: '66%',
    breakoutKeywords: [
      { keyword: 'The 4-Hour Deep Work Protocol That Replaced My 10-Hour Day', growthPercent: '+220%', competition: 'Low', intent: 'How-To / Educational', volume: '280K/mo' },
      { keyword: 'Digital Minimalism: My Phone Setup for Zero Distraction', growthPercent: '+135%', competition: 'Low', intent: 'How-To / Educational', volume: '190K/mo' },
      { keyword: 'How to Actually Read 50 Books a Year', growthPercent: '+95%', competition: 'Medium', intent: 'How-To / Educational', volume: '140K/mo' }
    ],
    trendingVideos: [
      {
        id: 'prod-1',
        title: 'How I Fixed My Broken Dopamine in Exactly 7 Days',
        channel: 'Clarity Quest',
        channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        views: '2,100,000',
        viewsNumeric: 2100000,
        publishedDaysAgo: 9,
        velocity: '5.2x channel baseline',
        viewsPerHour: '+18,000/hr',
        ctrBenchmark: '12.6%',
        retentionAt30s: '77%',
        thumbnailUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80',
        thumbnailBadgeText: '7-DAY PROTOCOL',
        duration: '15:10',
        hookFormula: '"Your brain isn\'t broken; it\'s just drowning in cheap dopamine. Here is the exact morning routine that gave me back 4 hours of pure focus."',
        packagingStrategy: 'Split aesthetic: Overwhelmed desk with 5 screens vs clean minimalist walnut desk with single notebook.',
        algorithmTrigger: 'Exceptional cross-platform virality on Twitter/X and TikTok linking back to full YouTube video.',
        targetKeywords: ['Dopamine detox', 'Deep work protocol', 'Focus reset 2026']
      }
    ]
  }
];
