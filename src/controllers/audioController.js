const deepgramService = require('../services/deepgramService');

const transcribeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file" });
    }

    console.log('Audio file received, size:', req.file.size);
    const transcript = await deepgramService.transcribeFile(req.file.buffer);
    
    console.log('Transcript:', transcript);
    res.json({ transcript });
  } catch (err) {
    console.error("STT controller error:", err.message);
    res.status(500).json({ error: "STT failed" });
  }
};

const generateSpeech = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    const audioStream = await deepgramService.generateSpeech(text);
    
    res.setHeader("Content-Type", "audio/mpeg");
    audioStream.pipe(res);

  } catch (err) {
    console.error("TTS controller error:", err.message);
    // Fallback to text response if TTS fails
    res.json({ text: req.body.text, fallback: true });
  }
};

module.exports = {
  transcribeAudio,
  generateSpeech
};
