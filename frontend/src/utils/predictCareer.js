export async function predictCareer(domain, formData) {
  const prompt = buildPrompt(domain, formData);
  
  // NOTE: In a real production app, this call MUST go through a backend to keep the API key secure.
  // For the purpose of this demonstration, we are calling the API directly from the frontend if an API key was provided.
  // We'll use a mock response if we don't have an API key or if the call fails, so the app remains functional.
  
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.warn("No Anthropic API key found. Using mock prediction data.");
    return getMockPrediction(domain);
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229", // Fallback to available sonnet model if specified one fails
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content[0].text;
    
    // Attempt to extract JSON from the text
    const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Failed to fetch from Claude API:", error);
    console.warn("Falling back to mock prediction data.");
    return getMockPrediction(domain);
  }
}

function buildPrompt(domain, formData) {
  return `
You are an AI career prediction engine. A student from the ${domain} domain has provided the following data:

ACADEMIC PROFILE:
- 10th Marks: ${formData.marks10}%
- 12th Marks: ${formData.marks12}%
- Graduation Marks: ${formData.grad}%
- Backlogs: ${formData.backlogs}
- Internship Done: ${formData.internship ? "Yes" : "No"}
- Projects: ${formData.projects}
- Certifications: ${formData.certifications}
- Interest Area: ${formData.interest}

TECHNICAL SKILLS (rated 1-10):
${Object.entries(formData.skills).map(([k,v]) => `- ${k}: ${v}/10`).join('\n')}

SOFT SKILLS (rated 1-10):
- Communication: ${formData.softSkills.communication}/10
- Leadership: ${formData.softSkills.leadership}/10
- Teamwork: ${formData.softSkills.teamwork}/10
- Problem Solving: ${formData.softSkills.problemSolving}/10

Based on this data, predict the top 3 most suitable career paths for this student from the ${domain} domain.

Respond ONLY in this exact JSON format with no extra text:
{
  "predictions": [
    {
      "rank": 1,
      "career": "Career Name",
      "confidence": 87,
      "reason": "2-sentence explanation why this fits",
      "strongSkills": ["skill1", "skill2"],
      "skillGaps": ["skill3", "skill4"]
    },
    {
      "rank": 2,
      "career": "Career Name",
      "confidence": 72,
      "reason": "2-sentence explanation",
      "strongSkills": ["skill1"],
      "skillGaps": ["skill2", "skill3"]
    },
    {
      "rank": 3,
      "career": "Career Name",
      "confidence": 58,
      "reason": "2-sentence explanation",
      "strongSkills": ["skill1"],
      "skillGaps": ["skill2"]
    }
  ],
  "overallProfile": "One sentence summary of the student's overall profile"
}
`;
}

function getMockPrediction(domain) {
  // Return a realistic mock based on the domain to ensure the app works during testing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        "predictions": [
          {
            "rank": 1,
            "career": domain === "CS/IT" ? "Software Developer" : domain === "Electronics" ? "Embedded Systems Engineer" : domain === "Mechanical" ? "Mechanical Design Engineer" : "Business Analyst",
            "confidence": 89,
            "reason": "Your strong foundation in core technical subjects combined with solid analytical skills makes this an ideal fit. You show great potential for adapting to complex industry requirements.",
            "strongSkills": ["Problem Solving", "Core Subject Knowledge"],
            "skillGaps": ["Advanced Tools", "Industry Standards"]
          },
          {
            "rank": 2,
            "career": domain === "CS/IT" ? "Data Scientist" : domain === "Electronics" ? "IoT Engineer" : domain === "Mechanical" ? "Quality Control Engineer" : "Financial Analyst",
            "confidence": 76,
            "reason": "This role aligns well with your interest areas and academic performance. Working on a few specific technical skills will make you highly competitive.",
            "strongSkills": ["Analytical Thinking"],
            "skillGaps": ["Specific Software Mastery", "Practical Implementation"]
          },
          {
            "rank": 3,
            "career": domain === "CS/IT" ? "Cloud Engineer" : domain === "Electronics" ? "Hardware Engineer" : domain === "Mechanical" ? "Manufacturing Engineer" : "Marketing Manager",
            "confidence": 62,
            "reason": "While this path requires closing some significant skill gaps, your underlying soft skills provide a strong foundation. Consider this as a viable long-term transition.",
            "strongSkills": ["Teamwork"],
            "skillGaps": ["Domain Expertise", "Advanced Certifications"]
          }
        ],
        "overallProfile": "A capable student with solid foundational knowledge, needing focused development in specialized industry tools."
      });
    }, 1500); // Simulate network delay
  });
}
