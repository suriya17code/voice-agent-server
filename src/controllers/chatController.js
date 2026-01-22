const { generateGroqResponse } = require('../services/groqService');

const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    const reply = await generateGroqResponse(message);

    res.json({ response: reply });

  } catch (err) {
    console.error("Chat controller error:", err);
    res.status(err.status || 500).json({
      error: err.message || "Chat request failed",
    });
  }
};

module.exports = {
  handleChat
};
