const token = "b4c37814f833571aee24b457c1ff7268"; // From user's truncated history maybe? No, let's login first or bypass auth.
// Actually, I can just write a script that sends a POST to the Python ML server directly to see if that works.
// And another that sends to the Node backend (bypassing auth or using a fake token if I disable auth temporarily).

async function testML() {
  try {
    const res = await fetch('http://127.0.0.1:5001/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: "CS/IT",
        gender: "Male",
        age: 21,
        marks10: 85,
        marks12: 88,
        grad: 75,
        backlogs: 0,
        internship: true,
        projects: 2,
        certifications: 1,
        interest: "Software Engineering",
        softSkills: { communication: 8, leadership: 7, teamwork: 9, problemSolving: 8 },
        skills: { Python: 8, Java: 7 }
      })
    });
    console.log("ML Status:", res.status);
    console.log("ML Body:", await res.text());
  } catch (e) {
    console.error("ML Error:", e.message);
  }
}

testML();
