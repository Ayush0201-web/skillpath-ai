export async function predictCareer(domain, formData) {
  try {
    const response = await fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      // Pass the domain along with the rest of the form data
      body: JSON.stringify({ domain, ...formData })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch from ML backend:", error);
    
    // Fallback if the ML backend isn't running
    return {
      "predictions": [
        {
          "rank": 1,
          "career": "Error: ML Service Offline",
          "confidence": 0,
          "reason": "Ensure the Flask ML service and Node.js backend are running.",
          "strongSkills": [],
          "skillGaps": []
        }
      ],
      "overallProfile": "Could not reach the prediction service."
    };
  }
}

export async function getPredictionHistory() {
  try {
    const response = await fetch("http://localhost:5000/api/predict/history", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return [];
  }
}
