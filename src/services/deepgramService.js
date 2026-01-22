const { createClient } = require("@deepgram/sdk");
const fetch = require('node-fetch');
const env = require('../config/env');

const deepgram = createClient(env.DEEPGRAM_API_KEY);

const transcribeFile = async (buffer) => {
  try {
    const response = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: "nova-2",
        smart_format: true,
        language: "en",
      }
    );

    if (response.error) {
      throw new Error(`Deepgram error: ${response.error.message}`);
    }

    if (!response.result || !response.result.results) {
      throw new Error('Invalid Deepgram response structure');
    }

    return response.result.results.channels[0].alternatives[0].transcript;
  } catch (error) {
    console.error('Deepgram services error:', error);
    throw error;
  }
};

const generateSpeech = async (text) => {
  try {
    console.log('TTS request for text:', text);
    const response = await fetch('https://api.deepgram.com/v1/speak?model=aura-2-odysseus-en', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${env.DEEPGRAM_API_KEY}`,
        'Content-Type': 'text/plain'
      },
      body: text
    });

    if (!response.ok) {
      throw new Error(`Deepgram TTS failed: ${response.status}`);
    }
    
    return response.body;

  } catch (error) {
    console.error('Deepgram TTS error:', error);
    throw error;
  }
};

module.exports = {
  transcribeFile,
  generateSpeech
};
