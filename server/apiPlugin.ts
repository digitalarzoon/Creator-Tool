import type { Plugin } from 'vite';
import { 
  generateAICreatorContent, 
  generateAIThumbnailImage, 
  fetchYouTubeVideoData, 
  extractYouTubeId,
  fetchYouTubeChannelData,
  compareYouTubeChannels
} from './apiHandlers.ts';

export function apiPlugin(): Plugin {
  return {
    name: 'creator-grow-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        res.setHeader('Content-Type', 'application/json');

        const host = req.headers.host || 'localhost';
        const url = new URL(req.url, `http://${host}`);
        const pathname = url.pathname;

        try {
          if (pathname === '/api/system/status') {
            res.end(JSON.stringify({
              status: 'operational',
              geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
              youtubeApiConfigured: Boolean(process.env.YOUTUBE_API_KEY && process.env.YOUTUBE_API_KEY !== 'MY_YOUTUBE_API_KEY'),
              version: '2.5.0'
            }));
            return;
          }

          if (pathname === '/api/ai/generate' && req.method === 'POST') {
            let body = '';
            for await (const chunk of req) {
              body += chunk;
            }
            const params = JSON.parse(body || '{}');
            const result = await generateAICreatorContent(params);
            res.end(JSON.stringify(result));
            return;
          }

          if (pathname === '/api/ai/generate-thumbnail' && req.method === 'POST') {
            let body = '';
            for await (const chunk of req) {
              body += chunk;
            }
            const params = JSON.parse(body || '{}');
            const result = await generateAIThumbnailImage(params);
            res.end(JSON.stringify(result));
            return;
          }

          if (pathname === '/api/youtube/video') {
            const queryUrl = url.searchParams.get('url') || url.searchParams.get('id') || '';
            const videoId = extractYouTubeId(queryUrl);
            if (!videoId) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Please enter a valid YouTube video URL or ID (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)' }));
              return;
            }
            const data = await fetchYouTubeVideoData(videoId);
            res.end(JSON.stringify(data));
            return;
          }

          // Real YouTube Channel Data
          if (pathname === '/api/youtube/channel') {
            const query = url.searchParams.get('query') || url.searchParams.get('q') || url.searchParams.get('channel') || url.searchParams.get('url') || '';
            if (!query) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Please enter a YouTube channel name, handle, or URL.' }));
              return;
            }
            const data = await fetchYouTubeChannelData(query);
            res.end(JSON.stringify(data));
            return;
          }

          // Real Side-by-Side YouTube Channel Comparison
          if (pathname === '/api/youtube/compare' || pathname === '/api/youtube/competitor') {
            let c1 = url.searchParams.get('c1') || url.searchParams.get('myChannel') || '';
            let c2 = url.searchParams.get('c2') || url.searchParams.get('competitor') || '';

            if (req.method === 'POST') {
              let body = '';
              for await (const chunk of req) {
                body += chunk;
              }
              try {
                const parsed = JSON.parse(body || '{}');
                c1 = parsed.c1 || parsed.myChannel || c1;
                c2 = parsed.c2 || parsed.competitor || c2;
              } catch (e) {}
            }

            if (!c1 || !c2) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Please provide both channel 1 and channel 2 to compare.' }));
              return;
            }

            const comparison = await compareYouTubeChannels(c1, c2);
            res.end(JSON.stringify(comparison));
            return;
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ error: `Not found: ${pathname}` }));
        } catch (err: any) {
          console.error('API router error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
        }
      });
    }
  };
}
