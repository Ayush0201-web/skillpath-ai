const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Prediction = require('../models/Prediction');

// @route POST /api/predict
// @desc Create a new prediction, get AI summary, and save to DB
router.post('/', auth, async (req, res) => {
  try {
    const formData = req.body;
    
    // Forward the request to our Flask ML service
    const flaskResponse = await fetch('http://127.0.0.1:5001/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!flaskResponse.ok) {
      const errorText = await flaskResponse.text();
      console.error("Flask ML Service Error:", errorText);
      return res.status(flaskResponse.status).json({ message: "ML Service Error", details: errorText });
    }

    const data = await flaskResponse.json();
    const predictionsList = data.predictions || data;
    
    // Call Cloudflare Workers AI for personalized summary
    let groqSummary = "AI summary unavailable.";
    try {
      const topCareer = predictionsList[0];
      const prompt = `You are an expert career counselor AI. The user has submitted a skill assessment. 
Their top predicted career is: ${topCareer.career}.
Their current strong skills are: ${topCareer.strongSkills.join(", ")}.
Their current skill gaps are: ${topCareer.skillGaps.join(", ")}.

In 2-3 short, highly encouraging paragraphs, summarize exactly which specific areas (skill gaps) they need to work on more in order to successfully achieve this career. Do not use markdown headers, just plain text paragraphs.`;

      const cfResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt }
          ]
        })
      });

      if (cfResponse.ok) {
        const cfData = await cfResponse.json();
        if (cfData.success && cfData.result && cfData.result.response) {
          groqSummary = cfData.result.response;
        }
      } else {
        console.error("Cloudflare AI Error HTTP:", cfResponse.status);
      }
    } catch (aiErr) {
      console.error("Cloudflare AI Network Error:", aiErr);
    }

    // Attach to response payload
    data.groqSummary = groqSummary;

    // Save prediction to database
    const newPrediction = new Prediction({
      user: req.user.id,
      domain: formData.domain,
      formData: formData,
      results: predictionsList,
      groqSummary: groqSummary
    });

    await newPrediction.save();

    res.json(data);
    
  } catch (err) {
    console.error("Error forwarding request to ML service:", err);
    res.status(500).json({ message: "Internal server error communicating with ML service." });
  }
});

// @route GET /api/predict/history
// @desc Get user's prediction history
router.get('/history', auth, async (req, res) => {
  try {
    const history = await Prediction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ message: "Internal server error fetching history." });
  }
});

module.exports = router;
