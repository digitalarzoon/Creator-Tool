export interface CreatorTool {
  id: string;
  slug: string;
  name: string;
  category: 'research' | 'create' | 'design' | 'optimize' | 'analyze' | 'grow' | 'shorts';
  description: string;
  icon: string;
  featured?: boolean;
  isPopular?: boolean;
  aiType?: string;
  inputs: {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'url';
    placeholder?: string;
    options?: string[];
    defaultValue?: string;
    required?: boolean;
  }[];
  faq: { q: string; a: string }[];
  instructions: string[];
}

export const CATEGORIES = [
  { id: 'all', name: 'All Tools', count: 81, label: 'All', description: 'Browse our complete catalog of 81 purpose-engineered YouTube tools.' },
  { id: 'research', name: 'Research', label: '01 Research', description: 'Find keywords, trends, topics & competitors' },
  { id: 'create', name: 'Create', label: '02 Create', description: 'Generate scripts, hooks, intros & outlines' },
  { id: 'design', name: 'Design', label: '03 Design', description: 'Create, download & analyze thumbnails' },
  { id: 'optimize', name: 'Optimize', label: '04 Optimize', description: 'Titles, descriptions, tags & SEO' },
  { id: 'analyze', name: 'Analyze', label: '05 Analyze', description: 'Channel, video & competitor analytics' },
  { id: 'grow', name: 'Grow', label: '06 Grow', description: 'Audience retention, calendars & strategy' },
  { id: 'shorts', name: 'Shorts', label: 'Shorts Lab', description: 'Viral Short-form hooks, scripts & trends' },
] as const;

export const TOOLS: CreatorTool[] = [
  // 1-14 RESEARCH TOOLS
  {
    id: 'youtube-keyword-research',
    slug: 'youtube-keyword-research',
    name: 'YouTube Keyword Research',
    category: 'research',
    description: 'Discover search relevance, competition scores, long-tail variations, and search intent for high-ranking topics.',
    icon: 'Search',
    featured: true,
    isPopular: true,
    aiType: 'keywords',
    inputs: [
      { name: 'topic', label: 'Main Topic / Seed Keyword', type: 'text', placeholder: 'e.g., Notion setup for students', required: true },
      { name: 'niche', label: 'Channel Niche', type: 'select', options: ['Tech & Software', 'Gaming', 'Productivity', 'Finance & Crypto', 'Fitness', 'Education', 'Lifestyle', 'Vlog', 'Business'], defaultValue: 'Productivity' },
      { name: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Beginners, college students' },
    ],
    faq: [
      { q: 'How are keyword scores determined?', a: 'Scores are calculated evaluating search intent clarity, competitor saturation, and organic discoverability parameters.' },
      { q: 'Should I target high or low competition keywords?', a: 'Newer channels gain initial algorithmic velocity by targeting high-relevance low-competition long-tail keywords.' }
    ],
    instructions: ['Enter your seed topic or niche keyword', 'Review intent categories and competitor gaps', 'Select 3-5 long tail variations for your tags and description']
  },
  {
    id: 'youtube-keyword-generator',
    slug: 'youtube-keyword-generator',
    name: 'YouTube Keyword Generator',
    category: 'research',
    description: 'Instantly generate dozens of semantic keyword variations directly tailored to the YouTube search algorithm.',
    icon: 'Tag',
    aiType: 'keywords',
    inputs: [
      { name: 'topic', label: 'Video Subject', type: 'text', placeholder: 'e.g., Python automated web scraping', required: true },
      { name: 'niche', label: 'Niche', type: 'text', placeholder: 'Coding tutorials' }
    ],
    faq: [
      { q: 'Can I copy these keywords to my tags?', a: 'Yes, with one click you can copy all generated keywords formatted as comma-separated YouTube tags.' }
    ],
    instructions: ['Enter your video concept', 'Copy top keywords into video metadata and spoken dialogue']
  },
  {
    id: 'long-tail-keyword-generator',
    slug: 'long-tail-keyword-generator',
    name: 'Long-Tail Keyword Generator',
    category: 'research',
    description: 'Find low-competition, high-intent phrases that help new and growing channels rank immediately on YouTube search.',
    icon: 'ListFilter',
    aiType: 'keywords',
    inputs: [
      { name: 'topic', label: 'Broad Keyword', type: 'text', placeholder: 'e.g., camera gear', required: true },
      { name: 'niche', label: 'Specific Angle', type: 'text', placeholder: 'budget filmmaking for beginners' }
    ],
    faq: [{ q: 'Why are long-tail keywords better for small channels?', a: 'They face 80% less competition from legacy channels and match specific search problems.' }],
    instructions: ['Specify your core keyword', 'Extract questions and low-competition phrases']
  },
  {
    id: 'trending-youtube-topics',
    slug: 'trending-youtube-topics',
    name: 'Trending YouTube Topics Finder',
    category: 'research',
    description: 'Identify rising topics and seasonal breakout trends within your specific creator category before they peak.',
    icon: 'TrendingUp',
    featured: true,
    aiType: 'ideas',
    inputs: [
      { name: 'niche', label: 'Your Niche', type: 'text', placeholder: 'e.g., AI Tools, Fitness, Street Food', required: true },
      { name: 'audience', label: 'Target Demographic', type: 'text', placeholder: 'e.g., Solopreneurs, Gen-Z creators' }
    ],
    faq: [{ q: 'How often should I jump on trending topics?', a: 'Balance 30% trend-jacking content with 70% evergreen searchable content.' }],
    instructions: ['Enter your target creator niche', 'Browse trending angles and recommended formats']
  },
  {
    id: 'content-gap-finder',
    slug: 'content-gap-finder',
    name: 'Content Gap Finder',
    category: 'research',
    description: 'Uncover missing information, outdated tutorials, and unsatisfied viewer queries in your competitor space.',
    icon: 'Compass',
    aiType: 'keywords',
    inputs: [
      { name: 'topic', label: 'Competitor / Topic Space', type: 'text', placeholder: 'e.g., Home gym equipment setup', required: true }
    ],
    faq: [{ q: 'What is a YouTube content gap?', a: 'A topic where viewer search demand is high, but existing video results are either low quality, outdated, or off-topic.' }],
    instructions: ['Audit competitor topic saturation', 'Produce videos that solve the missing questions']
  },
  {
    id: 'competitor-channel-analyzer',
    slug: 'competitor-channel-analyzer',
    name: 'Competitor Channel Analyzer',
    category: 'research',
    description: 'Benchmark publishing frequency, estimated performance indicators, and recent top topics across rival channels.',
    icon: 'Users',
    featured: true,
    inputs: [
      { name: 'url', label: 'Competitor Channel URL or Handle', type: 'text', placeholder: 'https://youtube.com/@competitor or @handle', required: true },
      { name: 'myChannel', label: 'Your Channel Name (Optional Comparison)', type: 'text', placeholder: 'My Channel' }
    ],
    faq: [
      { q: 'Is competitor data private?', a: 'No, all competitor metrics are synthesized strictly from publicly available YouTube channel information.' }
    ],
    instructions: ['Paste competitor channel link or handle', 'Review upload pacing, top videos, and strategic opportunities']
  },

  // 15-26 CREATE TOOLS
  {
    id: 'youtube-title-generator',
    slug: 'youtube-title-generator',
    name: 'AI YouTube Title Generator',
    category: 'create',
    description: 'Generate high-CTR, psychological click-worthy titles with character counts, hook styles, and estimated CTR ratings.',
    icon: 'Sparkles',
    featured: true,
    isPopular: true,
    aiType: 'title',
    inputs: [
      { name: 'topic', label: 'Video Topic / Premise', type: 'text', placeholder: 'e.g., I built a SaaS in 24 hours with AI', required: true },
      { name: 'niche', label: 'Niche', type: 'select', options: ['Tech & AI', 'Business & Finance', 'Self-Improvement', 'Gaming', 'Entertainment', 'Fitness', 'Education'], defaultValue: 'Tech & AI' },
      { name: 'keywords', label: 'Target Keyword (Optional)', type: 'text', placeholder: 'e.g., build micro saas' },
      { name: 'tone', label: 'Title Tone', type: 'select', options: ['Curiosity Gap & Viral', 'Authoritative & Definitive', 'High Energy & Exciting', 'Warning & Negative Constraint', 'Story & Documentary'], defaultValue: 'Curiosity Gap & Viral' }
    ],
    faq: [
      { q: 'Why is title character count crucial?', a: 'YouTube truncates titles beyond 60-70 characters on mobile devices, which account for over 70% of views.' },
      { q: 'What makes a high-CTR title?', a: 'A clear payoff, emotional hook or curiosity gap, and zero wasted words.' }
    ],
    instructions: ['Input your video idea and target niche', 'Review 7 customized title variations with psychological hooks', 'Test the top 2 against your thumbnail concept']
  },
  {
    id: 'ai-youtube-script-generator',
    slug: 'ai-youtube-script-generator',
    name: 'AI YouTube Script Generator',
    category: 'create',
    description: 'Craft structured, high-retention full scripts including hooks, intros, section breakdown with visual B-roll cues, and call-to-actions.',
    icon: 'FileText',
    featured: true,
    isPopular: true,
    aiType: 'script',
    inputs: [
      { name: 'topic', label: 'Video Subject / Theme', type: 'text', placeholder: 'e.g., The 3-Step Cold Email Framework for High-Ticket Clients', required: true },
      { name: 'duration', label: 'Target Duration', type: 'select', options: ['3-5 minutes (Fast-paced)', '8-10 minutes (Optimal retention)', '15-20 minutes (Deep dive)'], defaultValue: '8-10 minutes (Optimal retention)' },
      { name: 'tone', label: 'Creator Voice', type: 'select', options: ['Authoritative & Actionable', 'Conversational & Relatable', 'Energetic & Inspiring', 'Direct & Minimalist'], defaultValue: 'Authoritative & Actionable' },
      { name: 'context', label: 'Core Points to Cover', type: 'textarea', placeholder: 'Include: Mistake 1, Mindset shift, Step by step execution with template' }
    ],
    faq: [
      { q: 'Can I edit the generated script?', a: 'Yes! You can edit, copy sections directly, regenerate specific paragraphs, and save scripts to your creator dashboard.' }
    ],
    instructions: ['Outline your topic and main talking points', 'Generate your chaptered script', 'Review the visual B-roll cues for editing guidance']
  },
  {
    id: 'ai-hook-generator',
    slug: 'ai-hook-generator',
    name: 'AI Viral Hook Generator',
    category: 'create',
    description: 'Engineer 0-15 second openings designed to crush initial viewer drop-off and retain 70%+ of your audience past the first minute.',
    icon: 'Anchor',
    featured: true,
    aiType: 'hook',
    inputs: [
      { name: 'topic', label: 'Video Topic', type: 'text', placeholder: 'e.g., Why 90% of Gym Memberships Go Unused in February', required: true },
      { name: 'tone', label: 'Style of Hook', type: 'select', options: ['The Bold Warning', 'The Curiosity Loop', 'The Reversal Paradox', 'The High-Stakes Experiment'], defaultValue: 'The Bold Warning' }
    ],
    faq: [
      { q: 'Why do hooks dictate YouTube algorithm promotion?', a: 'YouTube measures immediate drop-off during seconds 0-30. Strong hooks keep viewers engaged, triggering algorithmic push.' }
    ],
    instructions: ['Input your video core proposition', 'Pick from 4 psychological hook archetypes', 'Pair with immediate fast visual cut in your edit']
  },
  {
    id: 'youtube-description-generator',
    slug: 'youtube-description-generator',
    name: 'YouTube Description Generator',
    category: 'create',
    description: 'Generate SEO-optimized descriptions with first-3-line hook summaries, timestamps, links placeholders, and hashtags.',
    icon: 'AlignLeft',
    aiType: 'description',
    inputs: [
      { name: 'topic', label: 'Video Title or Main Topic', type: 'text', placeholder: 'e.g., Ultimate Productivity Setup with Apple Vision Pro', required: true },
      { name: 'keywords', label: 'Primary Keywords', type: 'text', placeholder: 'apple vision pro, productivity, spatial computing' }
    ],
    faq: [{ q: 'Do YouTube descriptions still affect search?', a: 'Yes, the first 200 characters are indexed by both YouTube and Google Search results.' }],
    instructions: ['Provide video title and target keywords', 'Generate full formatted description with auto-generated chapters']
  },
  {
    id: 'youtube-chapter-generator',
    slug: 'youtube-chapter-generator',
    name: 'YouTube Chapter Generator',
    category: 'create',
    description: 'Transform your raw outline or transcript into clean, timestamped YouTube chapters that boost Google Key Moments.',
    icon: 'Clock',
    aiType: 'description',
    inputs: [
      { name: 'topic', label: 'Video Topic or Transcript Segment', type: 'textarea', placeholder: 'Paste your video sections or outline...', required: true }
    ],
    faq: [{ q: 'Does YouTube require chapter formatting?', a: 'Format must start at 0:00, have at least 3 chapters, and each chapter must be at least 10 seconds long.' }],
    instructions: ['Paste your talking points', 'Copy formatted timestamps into your description']
  },

  // 27-38 DESIGN & THUMBNAIL TOOLS
  {
    id: 'youtube-thumbnail-downloader',
    slug: 'youtube-thumbnail-downloader',
    name: 'YouTube Thumbnail Downloader',
    category: 'design',
    description: 'Download original high-definition (MaxRes 1080p, HQ 720p, MQ, SD) thumbnails for research, inspiration, and analysis.',
    icon: 'Download',
    featured: true,
    isPopular: true,
    inputs: [
      { name: 'url', label: 'YouTube Video URL', type: 'url', placeholder: 'https://www.youtube.com/watch?v=...', required: true }
    ],
    faq: [
      { q: 'What resolutions are available?', a: 'MaxResDefault (1920x1080 / 1280x720), HQDefault (480x360), MQDefault (320x180), and Default (120x90).' },
      { q: 'What is the usage guidance?', a: 'Downloaded thumbnails should be used strictly for research, inspiration, audits, or content the user has legitimate rights to use.' }
    ],
    instructions: ['Paste any public YouTube video link', 'Preview thumbnail options across multiple resolutions', 'Click Download Image or Copy Direct Link']
  },
  {
    id: 'ai-thumbnail-generator',
    slug: 'ai-thumbnail-generator',
    name: 'AI YouTube Thumbnail Generator',
    category: 'design',
    description: 'Generate high-CTR YouTube thumbnails with custom aspect ratios (16:9 for main videos, 9:16 for Shorts, 1:1 for Community, 4:3), high-contrast visual styles, bold text overlays, and 1-click downloads.',
    icon: 'Image',
    featured: true,
    isPopular: true,
    aiType: 'thumbnail-generator',
    inputs: [
      { name: 'topic', label: 'Video Title or Topic', type: 'text', placeholder: 'e.g., I Built a Full App with AI in 60 Minutes', required: true },
      { 
        name: 'aspectRatio', 
        label: 'Thumbnail Aspect Ratio', 
        type: 'select', 
        options: ['16:9 (Standard YouTube 1280x720)', '9:16 (YouTube Shorts 1080x1920)', '1:1 (Community Post / Square 1080x1080)', '4:3 (Classic Display 1024x768)'], 
        required: true 
      },
      { 
        name: 'style', 
        label: 'Visual Style Preset', 
        type: 'select', 
        options: [
          'MrBeast Style (High Saturation & Expressive)',
          'Hyper-Realistic & Cinematic',
          'Dramatic Mystery / Documentary',
          'Clean Tech & Neon Cyberpunk',
          'Minimalist Flat Aesthetic'
        ], 
        required: true 
      },
      { name: 'headlineOverlay', label: '2-4 Word Overlay Text', type: 'text', placeholder: 'e.g., DON\'T DO THIS or 100 DAYS' },
      { name: 'niche', label: 'Channel Niche', type: 'text', placeholder: 'Software Engineering / AI' }
    ],
    faq: [
      { q: 'Which aspect ratio should I select?', a: 'Choose 16:9 for standard horizontal YouTube uploads, 9:16 for YouTube Shorts, 1:1 for Community feed posts, or 4:3 for legacy embeds.' },
      { q: 'How many words should be on my thumbnail text overlay?', a: 'Keep overlay text strictly under 4 words. The thumbnail visual should trigger emotional curiosity without repeating the title.' }
    ],
    instructions: [
      'Enter your video title or main topic',
      'Select your required aspect ratio (16:9, 9:16, 1:1, or 4:3)',
      'Choose a visual packaging style and bold 3-word overlay hook',
      'Generate, test mobile contrast on dark/light feeds, and download your high-resolution PNG'
    ]
  },
  {
    id: 'thumbnail-analyzer',
    slug: 'thumbnail-analyzer',
    name: 'Thumbnail Analyzer & Contrast Checker',
    category: 'design',
    description: 'Analyze thumbnail composition, mobile legibility, focal point prominence, and dark/light mode YouTube background contrast.',
    icon: 'Maximize2',
    featured: true,
    inputs: [
      { name: 'url', label: 'YouTube Video URL or Image URL', type: 'text', placeholder: 'https://www.youtube.com/watch?v=... or image URL', required: true },
      { name: 'topic', label: 'Target Video Title (for synergy score)', type: 'text', placeholder: 'e.g., How to Stop Procrastinating' }
    ],
    faq: [
      { q: 'Can thumbnail tools guarantee CTR?', a: 'No tool can predict actual viewer CTR with certainty because audience context varies; this tool evaluates proven visual design principles.' }
    ],
    instructions: ['Enter a YouTube video URL or paste an image link', 'Evaluate mobile contrast preview (168x94px)', 'Review actionable visual hierarchy recommendations']
  },
  {
    id: 'thumbnail-preview-tool',
    slug: 'thumbnail-preview-tool',
    name: 'YouTube Feed Thumbnail Previewer',
    category: 'design',
    description: 'Test how your thumbnail and title appear inside the live YouTube Desktop, Mobile, and Sidebar layouts before publishing.',
    icon: 'Layout',
    inputs: [
      { name: 'url', label: 'Thumbnail Image URL (or YouTube Link)', type: 'text', placeholder: 'Paste image or video link', required: true },
      { name: 'topic', label: 'Proposed Video Title', type: 'text', placeholder: 'My Awesome Video Title (2026)', required: true }
    ],
    faq: [{ q: 'Why preview on mobile?', a: 'Over 70% of video clicks occur on mobile screens where thumbnails are smaller and title characters are truncated.' }],
    instructions: ['Input proposed image and title', 'Toggle between Desktop Feed, Mobile App, and Sidebar modes']
  },

  // 39-49 OPTIMIZATION TOOLS
  {
    id: 'youtube-seo-checker',
    slug: 'youtube-seo-checker',
    name: 'YouTube SEO Score Checker',
    category: 'optimize',
    description: 'Deep audit of video title length, keyword placement, description structure, tags diversity, and chapter markers.',
    icon: 'Gauge',
    featured: true,
    isPopular: true,
    inputs: [
      { name: 'url', label: 'YouTube Video URL', type: 'url', placeholder: 'https://www.youtube.com/watch?v=...', required: true }
    ],
    faq: [
      { q: 'What is a good YouTube SEO score?', a: 'A score of 80+ indicates strong title keyword alignment, detailed description, and proper metadata structuring.' }
    ],
    instructions: ['Paste your YouTube video link', 'Inspect score breakdown across Title, Description, and Tags', 'Implement suggested optimization fixes']
  },
  {
    id: 'youtube-tag-generator',
    slug: 'youtube-tag-generator',
    name: 'YouTube Tag & Hashtag Generator',
    category: 'optimize',
    description: 'Generate high-ranking tags and hashtags formatted with proper comma separation ready for immediate copy-pasting.',
    icon: 'Hash',
    aiType: 'keywords',
    inputs: [
      { name: 'topic', label: 'Video Concept', type: 'text', placeholder: 'e.g., Beginner dumbbell home workout routine', required: true },
      { name: 'niche', label: 'Category', type: 'text', placeholder: 'Fitness & Health' }
    ],
    faq: [{ q: 'Do tags still matter on YouTube?', a: 'While less impactful than titles and thumbnails, tags help YouTube classify spelling variations and niche associations.' }],
    instructions: ['Input your topic', 'Click Copy All Tags to clipboard', 'Paste into YouTube Studio tags section']
  },
  {
    id: 'title-ab-generator',
    slug: 'title-ab-generator',
    name: 'YouTube Title A/B Test Generator',
    category: 'optimize',
    description: 'Generate contrasting title pairs specifically engineered for YouTube Studio\'s "Test & Compare" A/B testing feature.',
    icon: 'Split',
    aiType: 'title',
    inputs: [
      { name: 'topic', label: 'Current Video Title or Topic', type: 'text', placeholder: 'e.g., How I Saved $10,000 in College', required: true }
    ],
    faq: [{ q: 'What is YouTube Test & Compare?', a: 'YouTube natively lets you test up to 3 thumbnails and titles to measure watch time share across real viewers.' }],
    instructions: ['Input your core premise', 'Generate 3 contrasting psychological angles (Curiosity vs Benefit vs Direct Statement)']
  },

  // 50-62 ANALYTICS TOOLS
  {
    id: 'youtube-channel-analyzer',
    slug: 'youtube-channel-analyzer',
    name: 'YouTube Channel Analyzer',
    category: 'analyze',
    description: 'Analyze public channel statistics, estimated upload frequency, subscriber trajectory, and top performing video patterns.',
    icon: 'BarChart2',
    featured: true,
    isPopular: true,
    inputs: [
      { name: 'url', label: 'Channel URL, Handle or Name', type: 'text', placeholder: 'e.g., @mkbhd or https://youtube.com/@...', required: true }
    ],
    faq: [
      { q: 'Is this data real-time?', a: 'Public metrics are fetched via the YouTube API or public channels; sample data is clearly labeled when demoing.' }
    ],
    instructions: ['Enter any public YouTube channel handle', 'Review video counts, publishing cadence, and performance averages']
  },
  {
    id: 'youtube-video-analyzer',
    slug: 'youtube-video-analyzer',
    name: 'YouTube Video Performance Analyzer',
    category: 'analyze',
    description: 'Deep dive into a specific YouTube video: views, likes, comment ratio, publishing age velocity, and SEO health.',
    icon: 'PlaySquare',
    featured: true,
    inputs: [
      { name: 'url', label: 'YouTube Video URL', type: 'url', placeholder: 'https://www.youtube.com/watch?v=...', required: true }
    ],
    faq: [{ q: 'Can I analyze any public video?', a: 'Yes, any unlisted or public YouTube video can be audited.' }],
    instructions: ['Paste the video link', 'Inspect engagement ratios and optimization opportunities']
  },
  {
    id: 'competitor-growth-tracker',
    slug: 'competitor-growth-tracker',
    name: 'Competitor Growth Tracker & Gap Audit',
    category: 'analyze',
    description: 'Compare two channels side-by-side: view velocity, recent topic coverage, and audience attention gaps.',
    icon: 'GitCompare',
    featured: true,
    inputs: [
      { name: 'myChannel', label: 'Your Channel Name / Handle', type: 'text', placeholder: 'Your Channel', required: true },
      { name: 'url', label: 'Competitor Channel Handle', type: 'text', placeholder: '@competitor', required: true }
    ],
    faq: [{ q: 'Does this access private creator data?', a: 'No, all competitor comparison data is synthesized strictly from publicly accessible channel footprints.' }],
    instructions: ['Enter both channel handles', 'Audit top video formats and underserved keywords']
  },

  // 63-72 GROWTH TOOLS
  {
    id: 'content-calendar-generator',
    slug: 'content-calendar-generator',
    name: '30-Day YouTube Content Planner',
    category: 'grow',
    description: 'Build a personalized 4-week publishing calendar with topic ideas, format cadence, and strategic promotion milestones.',
    icon: 'Calendar',
    featured: true,
    aiType: 'ideas',
    inputs: [
      { name: 'niche', label: 'Channel Focus / Niche', type: 'text', placeholder: 'e.g., Personal Finance for 20-somethings', required: true },
      { name: 'duration', label: 'Upload Frequency', type: 'select', options: ['1 video/week (Steady)', '2 videos/week (Accelerated)', 'Daily Shorts + 1 Longform (Max velocity)'], defaultValue: '2 videos/week (Accelerated)' }
    ],
    faq: [{ q: 'How does consistent scheduling affect the algorithm?', a: 'While upload time does not directly alter search rank, consistency builds viewer habits and return viewer retention.' }],
    instructions: ['Define your niche and upload pace', 'Generate your 30-day publishing schedule', 'Save to your CreatorGrow dashboard']
  },
  {
    id: 'youtube-poll-generator',
    slug: 'youtube-poll-generator',
    name: 'YouTube Community Poll Generator',
    category: 'grow',
    description: 'Generate high-engagement Community tab polls that trigger thousands of votes and boost channel algorithmic freshness.',
    icon: 'MessageSquare',
    aiType: 'ideas',
    inputs: [
      { name: 'topic', label: 'Discussion Subject', type: 'text', placeholder: 'e.g., Which camera should I review next?', required: true }
    ],
    faq: [{ q: 'Why do community polls matter?', a: 'Community posts appear in the home feeds of non-subscribers, functioning as free viral discovery for your channel.' }],
    instructions: ['Input your topic', 'Select from controversial, curious, or diagnostic poll templates']
  },

  // 73-81 SHORTS TOOLS
  {
    id: 'shorts-hook-generator',
    slug: 'shorts-hook-generator',
    name: 'YouTube Shorts Hook Generator',
    category: 'shorts',
    description: 'Generate 0-3 second instant visual and audio hooks that prevent viewers from swiping away in the Shorts feed.',
    icon: 'Zap',
    featured: true,
    isPopular: true,
    aiType: 'hook',
    inputs: [
      { name: 'topic', label: 'Shorts Subject', type: 'text', placeholder: 'e.g., 3 Hidden iPhone Features Nobody Knows', required: true },
      { name: 'tone', label: 'Style', type: 'select', options: ['Mind-Blowing Secret', 'Stop Doing This', 'Quick Hack / Time Saver', 'Surprising Contrast'], defaultValue: 'Mind-Blowing Secret' }
    ],
    faq: [{ q: 'What is a good Viewed vs Swiped Away ratio?', a: 'Top-tier Shorts achieve 75%+ Viewed vs Swiped Away in YouTube analytics. The first 2 seconds decide this metric.' }],
    instructions: ['Input your Shorts topic', 'Pair spoken hook with large on-screen text overlay in first frame']
  },
  {
    id: 'shorts-script-generator',
    slug: 'shorts-script-generator',
    name: 'AI Shorts Script Generator',
    category: 'shorts',
    description: 'Write complete 30-50 second vertical video scripts with seamless loop endings, visual cues, and big text overlay callouts.',
    icon: 'Smartphone',
    featured: true,
    isPopular: true,
    aiType: 'shorts-script',
    inputs: [
      { name: 'topic', label: 'Shorts Topic', type: 'text', placeholder: 'e.g., The $1,000,000 coffee mistake', required: true },
      { name: 'tone', label: 'Vibe', type: 'select', options: ['Fast & Punchy', 'Story / Anecdote', 'Humorous & Relatable', 'Educational Fact'], defaultValue: 'Fast & Punchy' }
    ],
    faq: [{ q: 'What is a seamless loop ending?', a: 'Ending the script mid-thought so the final word bridges directly into the opening sentence, multiplying average percentage viewed.' }],
    instructions: ['Enter your Shorts premise', 'Read script with a natural speaking cadence under 45 seconds', 'Use the loop ending to drive re-watches']
  },
  {
    id: 'shorts-trend-finder',
    slug: 'shorts-trend-finder',
    name: 'Shorts Viral Trend Finder',
    category: 'shorts',
    description: 'Identify breakout sound formats, visual trends, and high-velocity storytelling patterns taking off across YouTube Shorts.',
    icon: 'Radio',
    aiType: 'ideas',
    inputs: [
      { name: 'niche', label: 'Your Creator Category', type: 'text', placeholder: 'e.g., Cooking, Tech, Fitness, Gaming', required: true }
    ],
    faq: [{ q: 'How long do Shorts trends last?', a: 'Short-form trends typically peak within 14-21 days. Move quickly from idea to publish.' }],
    instructions: ['Specify your niche', 'Review current viral pacing structures and adapt for your content']
  }
];

export function getToolBySlug(slug: string): CreatorTool | undefined {
  return TOOLS.find(t => t.slug === slug);
}

export function searchTools(query: string, category: string = 'all'): CreatorTool[] {
  const cleanQ = query.toLowerCase().trim();
  return TOOLS.filter(tool => {
    const matchesCategory = category === 'all' || tool.category === category;
    if (!matchesCategory) return false;
    if (!cleanQ) return true;
    return (
      tool.name.toLowerCase().includes(cleanQ) ||
      tool.description.toLowerCase().includes(cleanQ) ||
      tool.category.toLowerCase().includes(cleanQ)
    );
  });
}
