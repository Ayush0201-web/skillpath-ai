const Groq = require('groq-sdk');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function testGroq() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: 'Say hello in 5 words.' }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 50,
    });
    console.log("Success:", chatCompletion.choices[0]?.message?.content);
  } catch (err) {
    console.error("Error:", err);
  }
}

testGroq();
