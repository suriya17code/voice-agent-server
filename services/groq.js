const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// async function generateGroqResponse(message) {
//   const completion = await groq.chat.completions.create({
//     model: "llama3-8b-8192",
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are a helpful AI assistant inside a voice agent application. Keep answers concise and conversational.",
//       },
//       {
//         role: "user",
//         content: message,
//       },
//     ],
//     temperature: 0.6,
//     max_tokens: 250,
//   });

//   return completion.choices[0].message.content;
// }
async function generateGroqResponse(message) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI assistant inside a voice agent application. Keep answers concise and conversational.",
      },
      { role: "user", content: message },
    ],
    temperature: 0.6,
    max_tokens: 250,
  });

  return completion.choices[0].message.content;
}


module.exports = { generateGroqResponse };
