// Express.js API route for business AI chat (proxy to OpenAI or your backend)
const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

// You can use process.env.OPENAI_API_KEY or any other backend logic
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/business-ai-chat', async (req, res) => {
  const { message, userEmail, userName } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are a helpful business assistant for ${userName || 'the user'} (${userEmail || 'unknown email'}).` },
        { role: 'user', content: message }
      ],
      max_tokens: 300
    });
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ error: 'AI error', details: e.message });
  }
});

module.exports = router;
