const express = require('express');
const multer = require('multer');
const audioController = require('../controllers/audioController');
const chatController = require('../controllers/chatController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Audio Routes
router.post('/transcribe', upload.single('audio'), audioController.transcribeAudio);
router.post('/speak', audioController.generateSpeech);

// Chat Routes
router.post('/chat', chatController.handleChat);

module.exports = router;
