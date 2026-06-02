import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';

export default function ResultsPage() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('predictionResult');
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!result) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <p className="text-[var(--text-muted)] text-xl">No results found. Please complete an assessment first.</p>
      </div>
    );
  }

  const predictionsList = result.predictions || result;

  return (
    <div className="flex-grow py-12 px-4 max-w-4xl mx-auto w-full">
      <motion.button 
        onClick={() => navigate('/dashboard')}
        className="mb-8 flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </motion.button>

      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text)] font-heading mb-4">Your Career Path</h2>
        {result.overallProfile && (
          <p className="text-xl text-[var(--text-muted)]">{result.overallProfile}</p>
        )}
      </motion.div>

      <div className="space-y-6 mb-12">
        {predictionsList.map((item, index) => (
          <motion.div 
            key={index}
            className={`glass rounded-2xl p-6 border ${index === 0 ? 'border-[var(--brand-green)] shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-[var(--border)]'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
              <div>
                <span className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Rank {index + 1}</span>
                <h3 className="text-2xl font-bold text-[var(--text)]">{item.career}</h3>
              </div>
              <div className="inline-flex items-center justify-center px-4 py-2 bg-[rgba(16,185,129,0.1)] text-[var(--success)] rounded-xl font-bold text-lg">
                {item.confidence.toFixed(1)}% Match
              </div>
            </div>
            
            <p className="text-[var(--text-muted)] mb-4">{item.reason}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Strong Skills</h5>
                <ul className="flex flex-wrap gap-2">
                  {item.strongSkills.length > 0 ? item.strongSkills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs bg-[var(--surface)] text-[var(--text)] px-2.5 py-1 rounded border border-[var(--border)]">
                      <CheckCircle2 size={12} className="text-[var(--success)]" /> {skill}
                    </li>
                  )) : <li className="text-[var(--text-muted)] text-xs italic">None identified</li>}
                </ul>
              </div>
              
              <div>
                <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Skill Gaps</h5>
                <ul className="flex flex-wrap gap-2">
                  {item.skillGaps.length > 0 ? item.skillGaps.map((skill, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs bg-[rgba(239,68,68,0.05)] text-[var(--text)] px-2.5 py-1 rounded border border-[rgba(239,68,68,0.2)]">
                      <XCircle size={12} className="text-[var(--danger)]" /> {skill}
                    </li>
                  )) : <li className="text-[var(--text-muted)] text-xs italic">None identified</li>}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {result.groqSummary && (
        <motion.div
          className="glass rounded-2xl p-8 border border-[var(--accent)] relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute top-[-20px] right-[-20px] text-8xl opacity-[0.03] text-[var(--brand-blue)] pointer-events-none">
            <BrainCircuit size={150} />
          </div>
          <h3 className="text-xl font-bold text-[var(--text)] mb-4 flex items-center gap-2 font-heading">
            <BrainCircuit className="text-[var(--accent)]" size={24} /> Personalized AI Summary
          </h3>
          <div className="text-[var(--text-muted)] text-md leading-relaxed space-y-4 whitespace-pre-wrap relative z-10">
            {result.groqSummary}
          </div>
        </motion.div>
      )}
    </div>
  );
}
