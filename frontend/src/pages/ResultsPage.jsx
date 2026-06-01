import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { coursesData } from '../data/courses';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.result) {
      setData({ result: location.state.result, domain: location.state.domain });
    } else {
      const saved = sessionStorage.getItem('predictionResult');
      if (saved) {
        // We'd need domain too, but for simplicity assuming we have it or handle missing
        setData({ result: JSON.parse(saved), domain: "Unknown" });
      } else {
        navigate('/');
      }
    }
  }, [location, navigate]);

  if (!data) return null;

  const { result, domain } = data;
  const topCareer = result.predictions[0];
  
  // Create mock data for radar chart from strong skills and skill gaps
  // In a real scenario, we would pass the original formData skills to this page
  // Here we just use the top career's strong skills and gaps for illustration
  const radarData = [
    ...topCareer.strongSkills.map(skill => ({ subject: skill, A: 90, fullMark: 100 })),
    ...topCareer.skillGaps.map(skill => ({ subject: skill, A: 40, fullMark: 100 }))
  ];

  const recommendedCourses = coursesData[topCareer.career] || ["Advanced Technical Certification", "Industry Masterclass", "Professional Portfolio Project"];

  return (
    <div className="max-w-6xl mx-auto p-6 pb-24">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-bold text-[var(--accent-light)] mb-4">Your AI Career Prediction</h2>
        <p className="text-xl text-[var(--text-muted)]">{result.overallProfile}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold border-b border-[var(--border)] pb-2">Top Matches</h3>
          {result.predictions.map((pred, index) => (
            <div key={index} className={`p-6 rounded-xl border ${index === 0 ? 'bg-gradient-to-r from-[var(--surface)] to-[var(--primary)] border-[var(--accent)] shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-[var(--surface)] border-[var(--border)]'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-[var(--text)] flex items-center gap-3">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm ${index === 0 ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}>
                      #{pred.rank}
                    </span>
                    {pred.career}
                  </h4>
                  <p className="text-[var(--text-muted)] mt-2">{pred.reason}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[var(--success)]">{pred.confidence}%</div>
                  <div className="text-xs text-[var(--text-muted)]">Match</div>
                </div>
              </div>
              
              <div className="w-full bg-[var(--primary)] rounded-full h-2 mb-4">
                <div 
                  className="bg-[var(--success)] h-2 rounded-full" 
                  style={{ width: `${pred.confidence}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-[var(--accent-light)] block mb-1">Strong Skills:</strong>
                  <div className="flex flex-wrap gap-1">
                    {pred.strongSkills.map(s => <span key={s} className="bg-[var(--primary)] px-2 py-1 rounded text-xs">{s}</span>)}
                  </div>
                </div>
                <div>
                  <strong className="text-[var(--warning)] block mb-1">Skill Gaps:</strong>
                  <div className="flex flex-wrap gap-1">
                    {pred.skillGaps.map(s => <span key={s} className="bg-[var(--primary)] px-2 py-1 rounded text-xs">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Skill Radar</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Skills" dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Recommended Courses</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">To close your gaps for {topCareer.career}</p>
            <div className="space-y-3">
              {recommendedCourses.map((course, idx) => (
                <div key={idx} className="bg-[var(--primary)] p-3 rounded-lg border border-[var(--border)] flex items-start gap-3">
                  <span className="text-[var(--accent)] mt-1">📚</span>
                  <span className="text-sm">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center gap-6">
        <button onClick={() => navigate('/select-domain')} className="bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] text-white font-bold py-3 px-8 rounded-full transition-all">
          Retake Assessment
        </button>
        <button onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied to clipboard!");
        }} className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold py-3 px-8 rounded-full transition-all">
          Share Results
        </button>
      </div>
    </div>
  );
}
