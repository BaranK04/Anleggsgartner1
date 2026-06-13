import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (error) {
  console.warn('Could not initialize Gemini Client: ', error);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({ error: 'AI Services not configured' });
      }

      const { message, context } = req.body;
      
      const systemPrompt = `You are a professional customer service assistant for "ANLEGGSGARTNER 1", a premium landscaping and paving contractor in Trondheim and Trøndelag, Norway. 
      You communicate exclusively in Norwegian (Bokmål). Tone: Professional, reliable, experienced, confident, and polite. 
      Help the customer with their questions about curb stones, paving, excavation, planting, and outdoor environments. 
      Encourage them to book a free inspection (befaring) using out booking system.
      Current Context: ${JSON.stringify(context)}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: 'Hei! Jeg er Anleggsgartner 1 sin AI-assistent. Hvordan kan jeg hjelpe deg i dag?' }] },
          { role: 'user', parts: [{ text: message }] }
        ],
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error('Chat API Error:', error);
      res.status(500).json({ error: 'Failed to process chat request' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
