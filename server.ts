import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { 
  generateAICreatorContent, 
  generateAIThumbnailImage, 
  fetchYouTubeVideoData, 
  extractYouTubeId,
  fetchYouTubeChannelData,
  compareYouTubeChannels
} from './server/apiHandlers.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Health / Status
app.get('/api/system/status', (req, res) => {
  res.json({
    status: 'operational',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    youtubeApiConfigured: Boolean(process.env.YOUTUBE_API_KEY && process.env.YOUTUBE_API_KEY !== 'MY_YOUTUBE_API_KEY'),
    version: '2.5.0'
  });
});

// AI Generation API
app.post('/api/ai/generate', async (req, res) => {
  try {
    const result = await generateAICreatorContent(req.body);
    res.json(result);
  } catch (err: any) {
    console.error('AI generation error:', err);
    res.status(500).json({ error: err.message || 'AI Generation Failed' });
  }
});

// AI Thumbnail Generator API (with aspect ratio selection: 16:9, 9:16, 1:1, 4:3)
app.post('/api/ai/generate-thumbnail', async (req, res) => {
  try {
    const result = await generateAIThumbnailImage(req.body);
    res.json(result);
  } catch (err: any) {
    console.error('Thumbnail generation error:', err);
    res.status(500).json({ error: err.message || 'Thumbnail Generation Failed' });
  }
});

// YouTube Video Analyzer
app.get('/api/youtube/video', async (req, res) => {
  try {
    const queryUrl = (req.query.url as string) || (req.query.id as string) || '';
    const videoId = extractYouTubeId(queryUrl);
    if (!videoId) {
      return res.status(400).json({ error: 'Please enter a valid YouTube video URL or ID' });
    }
    const data = await fetchYouTubeVideoData(videoId);
    res.json(data);
  } catch (err: any) {
    console.error('YouTube Video fetch error:', err);
    res.status(500).json({ error: err.message || 'Video Fetch Failed' });
  }
});

// Real YouTube Channel Analyzer
app.get('/api/youtube/channel', async (req, res) => {
  try {
    const query = (req.query.query as string) || (req.query.q as string) || (req.query.channel as string) || '';
    if (!query) {
      return res.status(400).json({ error: 'Please provide a channel name, handle, or URL.' });
    }
    const data = await fetchYouTubeChannelData(query);
    res.json(data);
  } catch (err: any) {
    console.error('YouTube Channel fetch error:', err);
    res.status(500).json({ error: err.message || 'Channel Fetch Failed' });
  }
});

// Real Side-by-Side YouTube Channel Comparison
app.get('/api/youtube/compare', async (req, res) => {
  try {
    const c1 = (req.query.c1 as string) || '';
    const c2 = (req.query.c2 as string) || '';
    if (!c1 || !c2) {
      return res.status(400).json({ error: 'Please provide two channels to compare (c1 and c2).' });
    }
    const comparison = await compareYouTubeChannels(c1, c2);
    res.json(comparison);
  } catch (err: any) {
    console.error('YouTube Channel comparison error:', err);
    res.status(500).json({ error: err.message || 'Comparison Failed' });
  }
});

app.post('/api/youtube/compare', async (req, res) => {
  try {
    const c1 = req.body.c1 || (req.query.c1 as string) || '';
    const c2 = req.body.c2 || (req.query.c2 as string) || '';
    if (!c1 || !c2) {
      return res.status(400).json({ error: 'Please provide two channels to compare (c1 and c2).' });
    }
    const comparison = await compareYouTubeChannels(c1, c2);
    res.json(comparison);
  } catch (err: any) {
    console.error('YouTube Channel comparison error:', err);
    res.status(500).json({ error: err.message || 'Comparison Failed' });
  }
});

// Static files in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CreatorGrow server running on port ${PORT}`);
});
