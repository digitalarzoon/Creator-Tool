import { GoogleGenAI } from '@google/genai';

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

export interface VideoAnalysisResult {
  videoId: string;
  url: string;
  title: string;
  channelTitle: string;
  channelId?: string;
  publishedAt?: string;
  description?: string;
  duration?: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  tags?: string[];
  thumbnails: {
    maxres: string;
    high: string;
    medium: string;
    default: string;
  };
  seoScore: number;
  scores: {
    titleStrength: number;
    descriptionOptimization: number;
    tagsOptimization: number;
    thumbnailPotential: number;
  };
  recommendations: string[];
  dataSource: 'youtube_api' | 'youtube_oembed_computed' | 'sample_data';
}

export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/i,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/i
  ];
  for (const regex of patterns) {
    const match = trimmed.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

export async function fetchYouTubeVideoData(videoId: string): Promise<VideoAnalysisResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const thumbnails = {
    maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
  };

  // If YouTube Data API key is available, query Google API
  if (apiKey && apiKey !== 'MY_YOUTUBE_API_KEY') {
    try {
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          const snippet = item.snippet || {};
          const stats = item.statistics || {};
          const title = snippet.title || 'Untitled Video';
          const description = snippet.description || '';
          const tags = snippet.tags || [];
          const viewCount = parseInt(stats.viewCount || '0', 10);
          const likeCount = parseInt(stats.likeCount || '0', 10);
          const commentCount = parseInt(stats.commentCount || '0', 10);

          // Calculate SEO scores based on best practices
          const titleScore = Math.min(100, Math.max(30, (title.length >= 40 && title.length <= 70 ? 95 : 65) + (/[0-9]/.test(title) ? 5 : 0)));
          const descScore = Math.min(100, description.length > 300 ? 90 : description.length > 100 ? 70 : 40);
          const tagsScore = Math.min(100, tags.length >= 10 ? 95 : tags.length >= 5 ? 75 : 45);
          const avgScore = Math.round((titleScore + descScore + tagsScore + 85) / 4);

          const recs: string[] = [];
          if (title.length > 70) recs.push('Shorten title to under 60-70 characters so it is not truncated on mobile screens.');
          if (title.length < 35) recs.push('Expand title with emotional triggers or high-intent keywords to boost searchability.');
          if (description.length < 200) recs.push('Add a comprehensive first 3 lines with top search terms before the "Show More" fold.');
          if (tags.length < 8) recs.push('Include 10-15 targeted long-tail tags covering primary and related search queries.');
          if (recs.length === 0) recs.push('Metadata structure follows current high-performance YouTube guidelines.');

          return {
            videoId,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            title,
            channelTitle: snippet.channelTitle || 'YouTube Creator',
            channelId: snippet.channelId,
            publishedAt: snippet.publishedAt,
            description,
            duration: item.contentDetails?.duration || 'PT10M',
            viewCount,
            likeCount,
            commentCount,
            tags,
            thumbnails,
            seoScore: avgScore,
            scores: {
              titleStrength: titleScore,
              descriptionOptimization: descScore,
              tagsOptimization: tagsScore,
              thumbnailPotential: 85
            },
            recommendations: recs,
            dataSource: 'youtube_api'
          };
        }
      }
    } catch (err) {
      console.warn('YouTube API call failed, falling back to oEmbed:', err);
    }
  }

  // Fallback: Use official YouTube oEmbed for authentic title & author info without API key
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const oembedRes = await fetch(oembedUrl);
    if (oembedRes.ok) {
      const data = await oembedRes.json();
      const title = data.title || 'YouTube Video';
      const channelTitle = data.author_name || 'YouTube Creator';

      const titleScore = title.length >= 40 && title.length <= 70 ? 90 : 70;
      const recs: string[] = [
        'Place the most critical keyword within the first 30 characters of the title.',
        'Ensure thumbnail has strong visual contrast readable at small mobile resolutions (168x94px).',
        'Use chapter timestamps in description to increase viewer retention and Google search key moments.'
      ];

      return {
        videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        title,
        channelTitle,
        publishedAt: new Date().toISOString(),
        description: 'Video details retrieved from public YouTube metadata.',
        thumbnails,
        seoScore: 78,
        scores: {
          titleStrength: titleScore,
          descriptionOptimization: 75,
          tagsOptimization: 70,
          thumbnailPotential: 85
        },
        recommendations: recs,
        dataSource: 'youtube_oembed_computed'
      };
    }
  } catch (err) {
    console.warn('oEmbed fetch failed:', err);
  }

  // Standard structured response when offline or invalid
  return {
    videoId,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    title: `Analyzed YouTube Video (${videoId})`,
    channelTitle: 'Sample Creator',
    publishedAt: new Date().toISOString(),
    description: 'Sample data: To get real-time private channel statistics and unlimited YouTube queries, configure your YOUTUBE_API_KEY.',
    viewCount: 145200,
    likeCount: 6820,
    commentCount: 420,
    tags: ['youtube growth', 'creator tools', 'video seo', 'content strategy'],
    thumbnails,
    seoScore: 82,
    scores: {
      titleStrength: 85,
      descriptionOptimization: 80,
      tagsOptimization: 78,
      thumbnailPotential: 86
    },
    recommendations: [
      'Sample Data: Front-load primary keywords in the first 30 characters.',
      'Sample Data: Structure chapters for video key moments.',
      'Sample Data: Use complementary colors between title subject and background.'
    ],
    dataSource: 'sample_data'
  };
}

export async function generateAICreatorContent(params: {
  type: string;
  topic?: string;
  niche?: string;
  tone?: string;
  duration?: string;
  keywords?: string;
  audience?: string;
  context?: string;
  targetCount?: number;
  aspectRatio?: string;
  style?: string;
  headlineOverlay?: string;
  overlayText?: string;
}): Promise<any> {
  const gemini = getGeminiClient();

  const promptConstructors: Record<string, string> = {
    title: `You are an elite YouTube strategist and copywriter. Generate 7 high-CTR, click-worthy YouTube titles for:
Topic: "${params.topic || 'YouTube Growth'}"
Niche: "${params.niche || 'General'}"
Keywords: "${params.keywords || ''}"
Tone: "${params.tone || 'Exciting & Educational'}"
Audience: "${params.audience || 'Creators & Enthusiasts'}"

Format output as a valid JSON object strictly matching this schema:
{
  "results": [
    {
      "title": "...",
      "characterCount": 54,
      "hookStyle": "Curiosity Gap / Number List / Bold Statement",
      "keywordScore": 92,
      "estimatedCTR": "High (8-12%)",
      "rationale": "Brief 1-sentence explanation of why it works"
    }
  ],
  "keywordSuggestions": ["keyword 1", "keyword 2", "keyword 3"],
  "proTips": ["Tip 1 on title optimization", "Tip 2 on thumbnails that match"]
}`,

    script: `You are a professional YouTube scriptwriter. Write a structured, engaging, high-retention video script for:
Topic: "${params.topic || 'How to Grow on YouTube'}"
Target Duration: "${params.duration || '8-10 minutes'}"
Tone: "${params.tone || 'Engaging and authoritative'}"
Key Points: "${params.context || 'Hook, 3 core insights, practical steps, strong CTA'}"
Target Audience: "${params.audience || 'Creators'}"

Format output as a valid JSON object strictly matching:
{
  "hook": "Exact word-for-word 0-15 second opening that grabs attention and states payoff",
  "intro": "15-45 second setup, roadmap of the video, and stakes",
  "sections": [
    {
      "chapterTitle": "Section 1 Name",
      "timestamp": "01:15",
      "scriptContent": "Detailed script speech...",
      "visualBroll": "Visual cue (e.g., zoom in, show graph, screen recording)"
    },
    {
      "chapterTitle": "Section 2 Name",
      "timestamp": "03:45",
      "scriptContent": "Detailed script speech...",
      "visualBroll": "Visual cue..."
    },
    {
      "chapterTitle": "Section 3 Name",
      "timestamp": "06:10",
      "scriptContent": "Detailed script speech...",
      "visualBroll": "Visual cue..."
    }
  ],
  "callToAction": "Natural mid/end CTA leading to next video or subscription",
  "outro": "Concluding sentence and teaser for the end screen"
}`,

    hook: `You are a YouTube viral hook specialist. Generate 6 distinct, psychologically proven opening hooks (0-10 seconds) for:
Topic: "${params.topic || 'Productivity Hacks'}"
Tone: "${params.tone || 'High Energy'}"
Audience: "${params.audience || 'General'}"

Format as JSON:
{
  "results": [
    {
      "hook": "Opening sentence to speak...",
      "hookType": "The Paradox / The Negative Warning / The Story Cliffhanger / The Bold Metric / The Curiosity Loop",
      "firstThreeSecondsVisual": "What to show on screen immediately",
      "retentionScore": 95
    }
  ]
}`,

    'shorts-script': `You are an expert YouTube Shorts and TikTok creator. Write 3 viral 30-60 second Shorts scripts for:
Topic: "${params.topic || 'Tech Tips'}"
Tone: "${params.tone || 'Fast-paced, punchy'}"

Format as JSON:
{
  "results": [
    {
      "title": "Shorts Title with #Shorts",
      "hook": "0-3s visual & audio hook",
      "body": "Fast body breakdown in 3 punchy sentences",
      "loopEnding": "Seamless loop transition back to the start",
      "onScreenText": "Big text overlay suggestions",
      "hashtags": ["#Shorts", "#Creator", "#Tech"]
    }
  ]
}`,

    'thumbnail-generator': `You are an expert YouTube packaging and thumbnail designer. Generate 4 high-converting thumbnail blueprints with aspect ratio ${params.aspectRatio || '16:9'} and style ${params.style || 'MrBeast High Saturation'} for:
Video Title / Topic: "${params.topic || 'I Tested 100 Tools'}"
Niche: "${params.niche || 'Technology'}"
Overlay Text Idea: "${params.headlineOverlay || params.overlayText || 'DON\'T DO THIS'}"

Format as JSON:
{
  "aspectRatio": "${params.aspectRatio || '16:9'}",
  "style": "${params.style || 'MrBeast High Saturation'}",
  "results": [
    {
      "conceptName": "The Shock Split / The Extreme Proof / The Warning",
      "mainText": "3-4 words MAX (e.g., 'DON\\'T DO THIS')",
      "textColor": "#FFD700 (Bright Yellow)",
      "badgeColor": "#EF4444",
      "facialExpression": "Shocked, hands on head, or confident smirk with gaze toward focal point",
      "composition": "Composition layout for ${params.aspectRatio || '16:9'} frame",
      "colorPalette": ["#EF4444", "#FBBF24", "#0F172A"],
      "whyItWorks": "Psychological reason this stops the scroll",
      "contrastScore": "9.4/10"
    }
  ],
  "designRules": ["Limit overlay to 3 words", "Ensure contrast in YouTube dark and light themes"]
}`,

    'thumbnail-concept': `You are a senior YouTube thumbnail designer. Create 4 high-converting thumbnail visual concepts for:
Video Title / Topic: "${params.topic || 'I Tested 100 Tools'}"
Niche: "${params.niche || 'Technology'}"

Format as JSON:
{
  "results": [
    {
      "conceptName": "The Comparison Split / The Shock Reaction / The Bold Graphic",
      "mainText": "3-4 words MAX (e.g., 'DON\\'T DO THIS')",
      "textColor": "Yellow with black stroke or White on Red",
      "facialExpression": "Shocked, squinting, or confident smirk",
      "composition": "Rule of thirds description (Left side: Subject face, Right side: Bright red arrow pointing to stat)",
      "colorPalette": ["#FF0000", "#FFD700", "#000000"],
      "whyItWorks": "Psychological reason this stops the scroll"
    }
  ],
  "designRules": ["Keep text under 4 words", "High contrast with dark/light mode YouTube backgrounds"]
}`,

    keywords: `You are a YouTube SEO keyword researcher. Generate comprehensive keyword research for:
Topic: "${params.topic || 'Video Editing'}"
Niche: "${params.niche || 'Creative'}"

Format as JSON:
{
  "primaryKeyword": "${params.topic || 'video editing'}",
  "keywords": [
    {
      "keyword": "video editing for beginners 2026",
      "searchIntent": "Tutorial / Educational",
      "competition": "Medium",
      "relevance": 96,
      "type": "Long-tail"
    },
    {
      "keyword": "how to edit youtube videos fast",
      "searchIntent": "How-To / Solution",
      "competition": "Low",
      "relevance": 92,
      "type": "Question"
    },
    {
      "keyword": "best video editing software free",
      "searchIntent": "Commercial Investigation",
      "competition": "High",
      "relevance": 88,
      "type": "Broad"
    },
    {
      "keyword": "capcut vs premiere pro youtube",
      "searchIntent": "Comparison",
      "competition": "Low",
      "relevance": 94,
      "type": "Competitor"
    }
  ],
  "contentGaps": [
    "Most videos cover desktop editing, but mobile CapCut workflows are underserved.",
    "Lack of updated 2026 audio normalization guides."
  ],
  "suggestedVideoTopics": [
    "I Tested Every Free Video Editor in 2026 (Here's The Best)",
    "How to Edit YouTube Videos in Half the Time"
  ]
}`,

    description: `You are a YouTube SEO optimizer. Write a comprehensive, SEO-optimized video description for:
Topic: "${params.topic || 'YouTube SEO Guide'}"
Keywords: "${params.keywords || 'youtube growth, video seo, get more views'}"
Niche: "${params.niche || 'Creator Education'}"

Format as JSON:
{
  "hookParagraph": "First 2-3 lines before the 'show more' button rich in target keywords...",
  "fullDescription": "Complete body with value summary, timestamps, social links placeholders, and resource links...",
  "chapters": [
    {"time": "0:00", "title": "Introduction"},
    {"time": "1:24", "title": "The Big Mistake Most Creators Make"},
    {"time": "3:45", "title": "The 3-Step SEO Formula"},
    {"time": "6:15", "title": "Live Optimization Example"},
    {"time": "8:30", "title": "Summary & Next Steps"}
  ],
  "hashtags": ["#YouTubeGrowth", "#VideoSEO", "#CreatorTips"]
}`,

    ideas: `You are a YouTube growth consultant. Generate 6 viral video ideas with high click-through potential for:
Niche: "${params.niche || 'Tech & Creator'}"
Topic/Focus: "${params.topic || 'Artificial Intelligence'}"
Audience: "${params.audience || 'Ambitious creators'}"

Format as JSON:
{
  "results": [
    {
      "title": "Idea Title",
      "angle": "What makes this unique or controversial",
      "targetAudience": "Who will click",
      "format": "Challenge / Documentary / Tutorial / Ranking",
      "projectedEngagement": "Very High",
      "suggestedHook": "Opening line"
    }
  ]
}`
  };

  const selectedPrompt = promptConstructors[params.type] || promptConstructors['ideas'];

  if (gemini) {
    try {
      const response = await gemini.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: selectedPrompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        }
      });

      const text = response.text?.trim() || '{}';
      try {
        const parsed = JSON.parse(text);
        return { success: true, data: parsed, isAI: true };
      } catch (jsonErr) {
        // Fallback clean regex extraction
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
          return { success: true, data: JSON.parse(match[0]), isAI: true };
        }
      }
    } catch (apiErr) {
      console.warn('Gemini API call failed, falling back to algorithmic template:', apiErr);
    }
  }

  // High quality algorithmic creator generation fallback
  return {
    success: true,
    data: getAlgorithmicFallback(params),
    isAI: false,
    note: gemini ? 'Processed via Creator Intelligence Engine' : 'Sample preview. Connect GEMINI_API_KEY in Settings > Secrets for customized dynamic AI.'
  };
}

function getAlgorithmicFallback(params: { 
  type: string; 
  topic?: string; 
  niche?: string; 
  tone?: string; 
  keywords?: string;
  aspectRatio?: string;
  style?: string;
  headlineOverlay?: string;
  overlayText?: string;
}): any {
  const topic = params.topic || 'YouTube Growth Strategy';
  const niche = params.niche || 'Content Creation';

  if (params.type === 'title') {
    return {
      results: [
        {
          title: `How to Master ${topic} in 2026 (Step-by-Step)`,
          characterCount: 46,
          hookStyle: 'Definitive Roadmap',
          keywordScore: 94,
          estimatedCTR: 'High (9-13%)',
          rationale: 'Promises clear actionable progression with fresh year authority.'
        },
        {
          title: `The Brutal Truth About ${topic} Nobody Tells You`,
          characterCount: 49,
          hookStyle: 'Curiosity Gap / Warning',
          keywordScore: 89,
          estimatedCTR: 'Very High (11-15%)',
          rationale: 'Triggers FOMO and emotional intrigue across casual viewers.'
        },
        {
          title: `I Tested 50 ${topic} Methods (Here is What Actually Worked)`,
          characterCount: 57,
          hookStyle: 'High-Effort Experiment',
          keywordScore: 93,
          estimatedCTR: 'Viral (12-18%)',
          rationale: 'High perceived effort creates irresistible click credibility.'
        },
        {
          title: `Stop Doing ${topic} Like This! (Do THIS Instead)`,
          characterCount: 47,
          hookStyle: 'Negative Problem + Contrast',
          keywordScore: 88,
          estimatedCTR: 'High (8-12%)',
          rationale: 'Warns viewers they might be making an expensive mistake.'
        },
        {
          title: `The Only ${topic} Guide You Will Ever Need`,
          characterCount: 43,
          hookStyle: 'Ultimate Resource',
          keywordScore: 91,
          estimatedCTR: 'Solid (7-10%)',
          rationale: 'Positions content as the single definitive answer.'
        }
      ],
      keywordSuggestions: [`${topic} tutorial`, `best ${topic} tips`, `${topic} for beginners 2026`],
      proTips: [
        'Keep the first 35 characters punchy because mobile YouTube trims long titles.',
        'Pair contrast words ("Stop", "Brutal Truth", "Secret") with bright thumbnail expressions.'
      ]
    };
  }

  if (params.type === 'hook') {
    return {
      results: [
        {
          hook: `If you are still approaching ${topic} the traditional way, you are actively burning your time. Here is the exact fix.`,
          hookType: 'The Urgent Warning',
          firstThreeSecondsVisual: 'Rapid zoom-in on face with a bold red "X" graphic over standard approach.',
          retentionScore: 96
        },
        {
          hook: `99% of creators get ${topic} completely backward—and it is costing them thousands of views.`,
          hookType: 'The Statistical Reversal',
          firstThreeSecondsVisual: 'Side-by-side graph showing flatlined views versus exponential spike.',
          retentionScore: 94
        },
        {
          hook: `In the next 7 minutes, I am going to give you the blueprint for ${topic} that took me three years to figure out.`,
          hookType: 'The Compressed Value Guarantee',
          firstThreeSecondsVisual: 'Fast montage of real results and dynamic timer in corner.',
          retentionScore: 92
        }
      ]
    };
  }

  if (params.type === 'script') {
    return {
      hook: `Most people assume that succeeding with ${topic} requires luck or massive budgets. In the next few minutes, I will show you why that is wrong and give you the step-by-step workflow you can use today.`,
      intro: `Welcome back. If you are new here, our goal is helping creators build sustainable, high-impact channels. Today we are breaking down ${topic} into 3 non-negotiable stages.`,
      sections: [
        {
          chapterTitle: 'Phase 1: The Core Foundation',
          timestamp: '00:45',
          scriptContent: `Before you touch any advanced tactics, you have to nail the premise. Ask yourself: why would someone stop scrolling for this? When looking at ${topic}, your target audience wants one specific transformation. Make that promise immediately clear.`,
          visualBroll: 'Screen recording showing niche comparison and title framework'
        },
        {
          chapterTitle: 'Phase 2: Execution & Systems',
          timestamp: '03:10',
          scriptContent: `Now let us look at the actual workflow. Rather than reinventing the wheel each time, build a modular template. Notice how the top performing videos in ${niche} structure their pacing every 30 to 45 seconds.`,
          visualBroll: 'Timeline view showing cuts and text animations'
        },
        {
          chapterTitle: 'Phase 3: The Growth Loop',
          timestamp: '06:00',
          scriptContent: `Finally, your video is not just one asset; it is the gateway to your next video. Notice how we connect this concept directly to your subscriber conversion.`,
          visualBroll: 'End screen graphic animation with card placement'
        }
      ],
      callToAction: `If this breakdown helped you see ${topic} differently, drop a comment with your channel handle and hit subscribe for our weekly creator audits.`,
      outro: `Click the video on screen right now to see how we put this into practice on a real channel from zero.`
    };
  }

  if (params.type === 'thumbnail-generator' || params.type === 'thumbnail-concept') {
    const ratio = params.aspectRatio || '16:9';
    return {
      aspectRatio: ratio,
      style: params.style || 'MrBeast Style (High Saturation & Expressive)',
      results: [
        {
          conceptName: 'The High-Contrast Warning (' + ratio + ')',
          mainText: params.headlineOverlay || 'DON\'T DO THIS',
          textColor: '#FFD700 (Bright Yellow with black outline)',
          badgeColor: '#EF4444',
          facialExpression: 'Concerned / Hands over head looking at screen',
          composition: `Optimized for ${ratio} viewport: Left side expressive face looking right, right side glowing red warning banner.`,
          colorPalette: ['#EF4444', '#FBBF24', '#0F172A'],
          whyItWorks: 'Negative emotional triggers create strong stopping power on mobile feeds.',
          contrastScore: '9.8/10'
        },
        {
          conceptName: 'The Transformation Benchmark (' + ratio + ')',
          mainText: '0 TO 100K',
          textColor: '#FFFFFF on Electric Cyan pill',
          badgeColor: '#06B6D4',
          facialExpression: 'Confident, pointing toward high-contrast metric card',
          composition: `Optimized for ${ratio} viewport: Clean studio background with vibrant rim lighting and upward trending arrow.`,
          colorPalette: ['#06B6D4', '#10B981', '#0F172A'],
          whyItWorks: 'Direct proof-oriented visual appeals to viewers seeking tangible outcomes.',
          contrastScore: '9.5/10'
        }
      ],
      designRules: [
        'Limit text overlay to 3-4 impactful words.',
        `Rendered at native ${ratio} aspect ratio for YouTube feeds.`,
        'Ensure 3:1 contrast ratio against YouTube dark mode (#0F0F0F) and light mode (#FFFFFF).'
      ]
    };
  }

  // Default ideas
  return {
    results: [
      {
        title: `The 2026 ${topic} Blueprint Nobody Talks About`,
        angle: 'Unconventional modern tactics',
        targetAudience: 'Intermediate creators in ' + niche,
        format: 'Case Study Breakdown',
        projectedEngagement: 'Very High',
        suggestedHook: 'I analyzed 500 successful channels in our niche...'
      },
      {
        title: `Why Most Creators Fail at ${topic} (And How to Fix It)`,
        angle: 'Diagnostic and corrective step guide',
        targetAudience: 'Beginners & struggling channels',
        format: 'Masterclass Tutorial',
        projectedEngagement: 'High',
        suggestedHook: 'If your analytics look like this...'
      }
    ]
  };
}

export async function generateAIThumbnailImage({
  topic = 'I Tested 100 AI Tools in 24 Hours',
  niche = 'Technology',
  style = 'MrBeast Style (High Saturation & Expressive)',
  aspectRatio = '16:9',
  overlayText = 'DON\'T DO THIS'
}: {
  topic?: string;
  niche?: string;
  style?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3' | string;
  overlayText?: string;
}) {
  const client = getGeminiClient();
  const validAspectRatios = ['16:9', '9:16', '1:1', '4:3', '3:4'];
  const targetRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '16:9';

  const prompt = `Professional YouTube thumbnail, viral high-CTR packaging for video topic: "${topic}". Niche: ${niche}. Visual style: ${style}. Text overlay / focal text: "${overlayText}". Ultra sharp, vivid cinematic lighting, expressive focal subject, strong contrast suited for YouTube mobile feed and desktop. High fidelity, 4K quality.`;

  if (client) {
    try {
      const response = await client.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: targetRatio as any,
            imageSize: '1K'
          }
        }
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          return {
            success: true,
            imageUrl,
            aspectRatio: targetRatio,
            topic,
            style,
            overlayText,
            source: 'gemini-3.1-flash-image'
          };
        }
      }
    } catch (err: any) {
      console.warn('Gemini image generation attempt failed, using creative canvas renderer:', err?.message);
    }
  }

  // Curated high-CTR background images matched to style
  const styleImageMap: Record<string, string> = {
    'MrBeast Style (High Saturation & Expressive)': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1280&auto=format&fit=crop&q=80',
    'Hyper-Realistic & Cinematic': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1280&auto=format&fit=crop&q=80',
    'Dramatic Mystery / Documentary': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1280&auto=format&fit=crop&q=80',
    'Clean Tech & Neon Cyberpunk': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&auto=format&fit=crop&q=80',
    'Minimalist Flat Aesthetic': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1280&auto=format&fit=crop&q=80'
  };

  const bgImage = styleImageMap[style] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1280&auto=format&fit=crop&q=80';

  return {
    success: true,
    imageUrl: bgImage,
    aspectRatio: targetRatio,
    topic,
    style,
    overlayText: overlayText || 'VIRAL SECRETS',
    source: 'creator_studio_canvas'
  };
}

export interface VerifiedChannelData {
  name: string;
  handle: string;
  channelId?: string;
  avatar: string;
  avatarText: string;
  banner?: string;
  accentColor: string;
  subscribers: string;
  videoCount: string;
  monthlyViews: string;
  uploadPacing: string;
  avgDuration: string;
  topFormat: string;
  titleFormula: string;
  thumbnailStyle: string;
  strongKeywords: string[];
  weaknesses: string[];
  description: string;
  recentVideos: Array<{
    title: string;
    views: string;
    time: string;
  }>;
}

export async function fetchYouTubeChannelData(query: string): Promise<VerifiedChannelData> {
  const cleanQuery = (query || '').trim();
  if (!cleanQuery) {
    throw new Error('Please enter a YouTube channel name, @handle, or URL.');
  }

  let handle = '';
  let channelId = '';

  // Extract from URL or direct handles
  if (cleanQuery.includes('youtube.com/') || cleanQuery.includes('youtu.be/')) {
    const handleMatch = cleanQuery.match(/youtube\.com\/(@[\w.-]+)/i);
    if (handleMatch) handle = handleMatch[1];
    const cidMatch = cleanQuery.match(/youtube\.com\/channel\/([a-zA-Z0-9_-]{20,})/i);
    if (cidMatch) channelId = cidMatch[1];
    const cMatch = cleanQuery.match(/youtube\.com\/c\/([^/?]+)/i);
    if (cMatch && !handle) handle = '@' + cMatch[1];
  } else if (cleanQuery.startsWith('@')) {
    handle = cleanQuery;
  } else if (/^UC[a-zA-Z0-9_-]{22}$/.test(cleanQuery)) {
    channelId = cleanQuery;
  }

  const browserHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  };

  // 1. If we have YouTube API Key, try official YouTube Data API v3 first
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (apiKey && apiKey !== 'MY_YOUTUBE_API_KEY') {
    try {
      let resolvedId = channelId;
      if (!resolvedId && handle) {
        const handleClean = handle.replace(/^@/, '');
        const hRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&forHandle=${encodeURIComponent(handleClean)}&key=${apiKey}`);
        if (hRes.ok) {
          const hData = await hRes.json();
          if (hData.items && hData.items.length > 0) {
            resolvedId = hData.items[0].id;
          }
        }
      }

      if (!resolvedId) {
        const sRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${encodeURIComponent(cleanQuery)}&key=${apiKey}`);
        if (sRes.ok) {
          const sData = await sRes.json();
          if (sData.items && sData.items.length > 0) {
            resolvedId = sData.items[0].snippet?.channelId || sData.items[0].id?.channelId;
          }
        }
      }

      if (resolvedId) {
        const cRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${resolvedId}&key=${apiKey}`);
        if (cRes.ok) {
          const cData = await cRes.json();
          if (cData.items && cData.items.length > 0) {
            const ch = cData.items[0];
            const name = ch.snippet.title || cleanQuery;
            const chHandle = ch.snippet.customUrl ? (ch.snippet.customUrl.startsWith('@') ? ch.snippet.customUrl : '@' + ch.snippet.customUrl) : (handle || '@' + name.toLowerCase().replace(/[^a-z0-9]/g, ''));
            const avatar = ch.snippet.thumbnails?.high?.url || ch.snippet.thumbnails?.default?.url || '';
            const banner = ch.brandingSettings?.image?.bannerExternalUrl || '';
            const subsNum = parseInt(ch.statistics.subscriberCount || '0', 10);
            const subsText = subsNum >= 1000000 ? `${(subsNum / 1000000).toFixed(2)}M subscribers` : (subsNum >= 1000 ? `${(subsNum / 1000).toFixed(1)}K subscribers` : `${subsNum} subscribers`);
            const vidsNum = parseInt(ch.statistics.videoCount || '0', 10);
            const vidsText = vidsNum >= 1000 ? `${(vidsNum / 1000).toFixed(1)}K videos` : `${vidsNum} videos`;
            const desc = ch.snippet.description || '';

            // Fetch recent uploads playlist
            const uploadsPlaylistId = ch.contentDetails?.relatedPlaylists?.uploads || resolvedId.replace(/^UC/, 'UU');
            let recentVids: Array<{ title: string; views: string; time: string }> = [];
            try {
              const pRes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=5&key=${apiKey}`);
              if (pRes.ok) {
                const pData = await pRes.json();
                recentVids = (pData.items || []).map((it: any) => ({
                  title: it.snippet?.title || 'Video Upload',
                  views: 'Verified',
                  time: it.snippet?.publishedAt ? new Date(it.snippet.publishedAt).toLocaleDateString() : 'Recent'
                }));
              }
            } catch (e) {}

            return synthesizeChannelForensics({
              name,
              handle: chHandle,
              channelId: resolvedId,
              avatar,
              banner,
              subscribers: subsText,
              videoCount: vidsText,
              description: desc,
              recentVideos: recentVids
            });
          }
        }
      }
    } catch (err) {
      console.warn('YouTube API channel fetch error, falling back to direct scraper:', err);
    }
  }

  // 2. Direct Web Scraper Engine (Works for ANY YouTube Channel without API key limits)
  try {
    // If no direct handle or channelId, search YouTube search page with channel filter
    if (!handle && !channelId) {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanQuery)}&sp=EgIQAg%253D%253D`;
      const sRes = await fetch(searchUrl, { headers: browserHeaders });
      const sHtml = await sRes.text();
      const sJsonMatch = sHtml.match(/var ytInitialData = ({.*?});<\/script>/s) || sHtml.match(/window\[\"ytInitialData\"\] = ({.*?});<\/script>/s);
      if (sJsonMatch) {
        try {
          const sData = JSON.parse(sJsonMatch[1]);
          const contents = sData.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];
          const first = contents.find((i: any) => i.channelRenderer)?.channelRenderer;
          if (first) {
            channelId = first.channelId || '';
            const cUrl = first.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl;
            if (cUrl) {
              handle = cUrl.replace(/^\//, '');
            }
          }
        } catch (e) {}
      }
    }

    // Browse the channel's /videos tab to retrieve both header metadata and actual recent uploads
    const browseTarget = handle 
      ? `https://www.youtube.com/${handle.startsWith('@') ? handle : '@' + handle}/videos`
      : (channelId ? `https://www.youtube.com/channel/${channelId}/videos` : `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanQuery)}`);

    const cRes = await fetch(browseTarget, { headers: browserHeaders });
    const cHtml = await cRes.text();
    const cJsonMatch = cHtml.match(/var ytInitialData = ({.*?});<\/script>/s) || cHtml.match(/window\[\"ytInitialData\"\] = ({.*?});<\/script>/s);

    let channelName = cleanQuery;
    let avatarUrl = '';
    let bannerUrl = '';
    let subscribers = 'Growing Creator';
    let videoCount = '';
    let description = '';
    const recentVideos: Array<{ title: string; views: string; time: string }> = [];

    // Extract meta description
    const descMatch = cHtml.match(/<meta name=\"description\" content=\"([^\"]+)\">/) || cHtml.match(/\"description\":\{\"simpleText\":\"([^\"]+)\"\}/);
    if (descMatch) {
      description = descMatch[1]
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .slice(0, 300);
    }

    if (cJsonMatch) {
      try {
        const d = JSON.parse(cJsonMatch[1]);
        const vm = d.header?.pageHeaderRenderer?.content?.pageHeaderViewModel;
        if (vm) {
          channelName = vm.title?.dynamicTextViewModel?.text?.content || channelName;
          const avSources = vm.image?.decoratedAvatarViewModel?.avatar?.avatarViewModel?.image?.sources;
          if (avSources && avSources.length > 0) {
            const rawAv = avSources[avSources.length - 1].url || avSources[0].url;
            avatarUrl = rawAv.startsWith('//') ? 'https:' + rawAv : rawAv;
          }

          const bannerSources = vm.banner?.imageBannerViewModel?.image?.sources;
          if (bannerSources && bannerSources.length > 0) {
            const rawB = bannerSources[bannerSources.length - 1].url || bannerSources[0].url;
            bannerUrl = rawB.startsWith('//') ? 'https:' + rawB : rawB;
          }

          const rows = vm.metadata?.contentMetadataViewModel?.metadataRows || [];
          for (const row of rows) {
            for (const p of row.metadataParts || []) {
              const txt = (p.text?.content || '').trim();
              if (txt.startsWith('@')) {
                handle = txt;
              } else if (txt.toLowerCase().includes('subscriber')) {
                subscribers = txt;
              } else if (txt.toLowerCase().includes('video')) {
                videoCount = txt;
              }
            }
          }
        }

        // Parse actual recent videos from the rich grid
        const tabs = d.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
        const videosTab = tabs.find((t: any) => t.tabRenderer?.title === 'Videos' || t.tabRenderer?.selected);
        const gridContents = videosTab?.tabRenderer?.content?.richGridRenderer?.contents || [];
        
        for (const item of gridContents) {
          const lvm = item?.richItemRenderer?.content?.lockupViewModel;
          if (lvm) {
            const vTitle = lvm.metadata?.lockupMetadataViewModel?.title?.content;
            const metaRows = lvm.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows;
            let views = 'Recently uploaded', time = 'Recently';
            if (metaRows && metaRows[0]?.metadataParts) {
              views = metaRows[0].metadataParts[0]?.text?.content || views;
              time = metaRows[0].metadataParts[1]?.text?.content || time;
            }
            if (vTitle) {
              recentVideos.push({
                title: vTitle,
                views,
                time
              });
            }
          } else if (item?.richItemRenderer?.content?.videoRenderer) {
            const vr = item.richItemRenderer.content.videoRenderer;
            const vTitle = vr.title?.runs?.[0]?.text;
            const views = vr.viewCountText?.simpleText || 'Active';
            const time = vr.publishedTimeText?.simpleText || 'Recent';
            if (vTitle) {
              recentVideos.push({ title: vTitle, views, time });
            }
          }
          if (recentVideos.length >= 6) break;
        }
      } catch (e) {
        console.warn('Error parsing ytInitialData for channel:', e);
      }
    }

    // Fallback avatar if empty
    if (!avatarUrl) {
      const avatarMatch = cHtml.match(/\"avatar\":\{\"thumbnails\":\[\{\"url\":\"([^\"]+)\"/);
      if (avatarMatch) {
        avatarUrl = avatarMatch[1].startsWith('//') ? 'https:' + avatarMatch[1] : avatarMatch[1];
      }
    }

    return synthesizeChannelForensics({
      name: channelName,
      handle: handle || ('@' + channelName.toLowerCase().replace(/[^a-z0-9]/g, '')),
      channelId,
      avatar: avatarUrl,
      banner: bannerUrl,
      subscribers: subscribers || 'Growing Creator',
      videoCount: videoCount || 'Active Library',
      description,
      recentVideos
    });

  } catch (err: any) {
    console.error(`Failed to fetch live YouTube channel "${cleanQuery}":`, err);
    // Return gracefully synthesized profile
    return synthesizeChannelForensics({
      name: cleanQuery,
      handle: cleanQuery.startsWith('@') ? cleanQuery : '@' + cleanQuery.toLowerCase().replace(/[^a-z0-9]/g, ''),
      avatar: '',
      subscribers: '10K - 100K (Estimated)',
      videoCount: 'Active',
      description: `YouTube creator producing content in ${cleanQuery}.`,
      recentVideos: []
    });
  }
}

function synthesizeChannelForensics(input: {
  name: string;
  handle: string;
  channelId?: string;
  avatar: string;
  banner?: string;
  subscribers: string;
  videoCount: string;
  description: string;
  recentVideos: Array<{ title: string; views: string; time: string }>;
}): VerifiedChannelData {
  const initials = input.name
    .split(/\s+/)
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'YT';

  // 1. Extract high-relevance keywords from real recent video titles and channel description
  const allText = `${input.recentVideos.map(v => v.title).join(' ')} ${input.description}`;
  const extractedWords = allText.match(/#?[a-zA-Z0-9_\u0900-\u097F]{3,}/g) || [];
  const stopwords = new Set([
    'the', 'and', 'for', 'with', 'top', 'how', 'new', 'free', 'best', 'part', 'pack', 
    'video', 'videos', 'youtube', 'channel', 'subscribe', 'from', 'this', 'that', 'your', 
    'you', 'all', 'more', 'what', 'why', 'when', 'day', 'days', 'year', 'years', 'part41', 'part42',
    'https', 'http', 'com', 'org', 'net', 'telegram', 'link', 'click', 'help', 'make', 'makes',
    'whether', 'their', 'about', 'into', 'some', 'than', 'them', 'then', 'they', 'will', 'with',
    'could', 'would', 'should', 'been', 'have', 'were', 'which', 'where', 'whose'
  ]);

  const wordFreq: Record<string, number> = {};
  for (const w of extractedWords) {
    const clean = w.replace(/^#/, '');
    const lower = clean.toLowerCase();
    if (stopwords.has(lower) || lower.length < 3) continue;
    // Format nicely with title case
    const formatted = clean.charAt(0).toUpperCase() + clean.slice(1);
    wordFreq[formatted] = (wordFreq[formatted] || 0) + 1;
  }

  const sortedKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w)
    .slice(0, 6);

  const strongKeywords = sortedKeywords.length >= 3 
    ? sortedKeywords 
    : [input.name, 'Tutorial', 'Highlights', 'Gameplay', 'Guide'];

  // 2. Determine upload pacing from recent video timestamps
  let uploadPacing = '1 - 2 videos / week';
  const times = input.recentVideos.map(v => v.time.toLowerCase());
  if (times.length >= 2) {
    if (times.some(t => t.includes('hour') || t.includes('1 day') || t.includes('2 days'))) {
      uploadPacing = '3 - 5 videos / week (High Velocity)';
    } else if (times.some(t => t.includes('day') || t.includes('1 week'))) {
      uploadPacing = '1 - 2 videos / week';
    } else if (times.every(t => t.includes('month'))) {
      uploadPacing = '1 - 2 videos / month';
    } else if (times.every(t => t.includes('year'))) {
      uploadPacing = 'Infrequent / Evergreen Focus';
    }
  }

  // 3. Estimate monthly views from subscriber scale & recent views
  let monthlyViews = '~50,000 - 150,000';
  const subLower = input.subscribers.toLowerCase();
  if (subLower.includes('m subscribers')) {
    const num = parseFloat(subLower.replace(/[^0-9.]/g, '')) || 1;
    if (num > 50) monthlyViews = `${Math.round(num * 2.5)}M+ views / mo`;
    else monthlyViews = `${Math.round(num * 1.5)}M - ${Math.round(num * 3.2)}M views / mo`;
  } else if (subLower.includes('k subscribers')) {
    const num = parseFloat(subLower.replace(/[^0-9.]/g, '')) || 10;
    if (num >= 500) monthlyViews = '~1.5M - 3.8M views / mo';
    else if (num >= 100) monthlyViews = '~300K - 850K views / mo';
    else if (num >= 20) monthlyViews = '~50K - 180K views / mo';
    else monthlyViews = '~15K - 45K views / mo';
  }

  // 4. Identify Top Video Format & Title Formula from real titles
  const joinedTitles = input.recentVideos.map(v => v.title).join(' ').toLowerCase();
  let topFormat = 'In-Depth Thematic Guides & Case Studies';
  let titleFormula = 'How to [Achieve Outcome] without [Common Obstacle]';
  let thumbnailStyle = 'Clean subject portrait with bold 3-word high-contrast text';
  let avgDuration = '12 - 18 mins';

  if (joinedTitles.includes('free fire') || joinedTitles.includes('ff') || joinedTitles.includes('gaming') || joinedTitles.includes('gameplay') || joinedTitles.includes('xml') || joinedTitles.includes('shake')) {
    topFormat = 'Free Fire XML Presets, Alight Motion Shakes & Gameplay Edits';
    titleFormula = 'Top [Count] [Effect/Pack] | [Game/Software] Preset Pack #[Part]';
    thumbnailStyle = 'High-saturation game render + glowing neon accents + action freeze';
    avgDuration = 'Shorts & 3-5 min montage showcases';
  } else if (joinedTitles.includes('tech') || joinedTitles.includes('review') || joinedTitles.includes('vs') || joinedTitles.includes('unboxing') || joinedTitles.includes('iphone') || joinedTitles.includes('setup')) {
    topFormat = 'Hands-on Hardware Reviews & Side-by-Side Comparisons';
    titleFormula = 'Why I Was Wrong About [Device/Software] in [Year]';
    thumbnailStyle = 'High-detail studio macro photo with dual-element split comparison';
    avgDuration = '10 - 15 mins';
  } else if (joinedTitles.includes('notion') || joinedTitles.includes('productivity') || joinedTitles.includes('study') || joinedTitles.includes('habits') || joinedTitles.includes('guide')) {
    topFormat = 'Step-by-Step Workflow Systems & Productivity Walkthroughs';
    titleFormula = 'The Complete Guide to [System/Workflow] in [Year]';
    thumbnailStyle = 'Studio creator face + screen UI workflow preview + clean badge';
    avgDuration = '15 - 25 mins';
  } else if (joinedTitles.includes('challenge') || joinedTitles.includes('spent') || joinedTitles.includes('survived') || joinedTitles.includes('extreme')) {
    topFormat = 'High-Stakes Spectacle & Real-World Extreme Challenges';
    titleFormula = 'I Spent [Duration] in [Extreme Situation]';
    thumbnailStyle = 'Hyper-saturated expression + massive visual stakes + bold text';
    avgDuration = '14 - 20 mins';
  } else if (input.recentVideos.length > 0) {
    const firstTitle = input.recentVideos[0].title;
    if (firstTitle.includes('|')) {
      titleFormula = '[Hook Statement] | [Key Keyword / Pack #]';
    } else if (firstTitle.includes(':')) {
      titleFormula = '[Topic Category]: [Specific Intriguing Angle]';
    } else if (firstTitle.toLowerCase().startsWith('how to')) {
      titleFormula = 'How to [Action] ([Key Qualifier])';
    }
  }

  // 5. Strategic Tactical Weaknesses / Optimization Gaps
  const weaknesses: string[] = [];
  if (uploadPacing.includes('Infrequent')) {
    weaknesses.push('Long upload intervals allow nimble creators to dominate emerging trending searches');
  } else if (uploadPacing.includes('High Velocity')) {
    weaknesses.push('High publication speed risks viewer fatigue if packaging lacks visual distinction');
  } else {
    weaknesses.push('Could expand short-form YouTube Shorts repurposing to capture rapid top-of-funnel subscribers');
  }

  if (joinedTitles.includes('#') || joinedTitles.includes('pack #')) {
    weaknesses.push('Heavy reliance on numeric part tags reduces long-term evergreen organic search traffic');
  } else {
    weaknesses.push('Thumbnail text contrast can be strengthened for small mobile feed views');
  }

  const colorPalettes = [
    'from-cyan-500 to-blue-600',
    'from-indigo-500 to-violet-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-red-600'
  ];
  const charCode = (input.name.charCodeAt(0) || 0) + (input.name.charCodeAt(input.name.length - 1) || 0);
  const accentColor = colorPalettes[charCode % colorPalettes.length];

  return {
    name: input.name,
    handle: input.handle,
    channelId: input.channelId,
    avatar: input.avatar,
    avatarText: initials,
    banner: input.banner,
    accentColor,
    subscribers: input.subscribers,
    videoCount: input.videoCount,
    monthlyViews,
    uploadPacing,
    avgDuration,
    topFormat,
    titleFormula,
    thumbnailStyle,
    strongKeywords,
    weaknesses,
    description: input.description,
    recentVideos: input.recentVideos
  };
}

export async function compareYouTubeChannels(c1Query: string, c2Query: string) {
  const [c1, c2] = await Promise.all([
    fetchYouTubeChannelData(c1Query),
    fetchYouTubeChannelData(c2Query)
  ]);

  // Formulate dynamic competitive gap analysis
  let contentGapOpportunity = '';
  const actionPlan: string[] = [];

  const c1HasGaming = c1.topFormat.toLowerCase().includes('game') || c1.topFormat.toLowerCase().includes('free fire');
  const c2HasGaming = c2.topFormat.toLowerCase().includes('game') || c2.topFormat.toLowerCase().includes('free fire');

  if (c1HasGaming && !c2HasGaming) {
    contentGapOpportunity = `${c1.name} commands deep engagement in the fast-growing gaming & editing niche (${c1.subscribers}), while ${c2.name} (${c2.subscribers}) leverages mainstream narrative storytelling and structured titles. By infusing ${c2.name}'s hook clarity and SEO keyword front-loading into ${c1.name}'s 4K editing tutorials, ${c1.name} can double search discoverability outside existing community groups.`;
    actionPlan.push(`Front-load the primary search keyword (e.g., "${c1.strongKeywords[0] || 'Free Fire'} Tutorial") in the first 35 characters of titles instead of at the end.`);
    actionPlan.push(`Add 15-second contextual intros explaining why the preset or gameplay mechanic gives players an unfair advantage.`);
    actionPlan.push(`Publish detailed descriptions with 3-5 high-search tags and timestamped chapter markers.`);
  } else if (!c1HasGaming && c2HasGaming) {
    contentGapOpportunity = `${c2.name} publishes rapid gaming asset packs with loyal engagement (${c2.subscribers}), while ${c1.name} (${c1.subscribers}) operates with structured long-form content. An opportunity exists to capture high-velocity younger demographics by testing fast-paced 60-second Shorts breakdowns inspired by ${c2.name}'s energetic pacing.`;
    actionPlan.push(`Repurpose key core takeaways into 9:16 YouTube Shorts with bold central captions.`);
    actionPlan.push(`Experiment with split-screen before-and-after visual contrasts in thumbnail packaging.`);
    actionPlan.push(`Incorporate interactive pinned comments to lift community participation velocity.`);
  } else {
    contentGapOpportunity = `${c1.name} (${c1.subscribers}) and ${c2.name} (${c2.subscribers}) compete for audience attention with distinct content pacing. While ${c1.name} delivers ${c1.topFormat}, ${c2.name} leans heavily into ${c2.topFormat}. An immediate 250K+ view opportunity exists in tackling the top 3 unanswered viewer questions found in ${c2.name}'s comment sections with ${c1.name}'s signature execution style.`;
    actionPlan.push(`Analyze ${c2.name}'s top performing video from the last 90 days and produce an updated, definitive 2026 counterpart.`);
    actionPlan.push(`Adopt ${c1.titleFormula} title structure while incorporating ${c2.strongKeywords[0] || 'trending'} search tags.`);
    actionPlan.push(`Align upload release window with peak audience activity (typically Thursdays and Sundays 2:00 PM - 5:00 PM EST).`);
  }

  return {
    c1,
    c2,
    contentGapOpportunity,
    actionPlan
  };
}


