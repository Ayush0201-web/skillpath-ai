import React, { useState, useEffect } from 'react';
import { getPredictionHistory } from '../utils/predictCareer';
import { motion } from 'framer-motion';
import { Clock, Briefcase, BrainCircuit } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getPredictionHistory();
        setHistory(data);
      } catch (err) {
        setError('Failed to load history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="text-[var(--danger)] bg-[rgba(239,68,68,0.1)] px-6 py-4 rounded-xl border border-[var(--danger)]">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex-grow py-12 px-6 max-w-5xl mx-auto w-full">
      <motion.div 
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold text-[var(--text)] font-heading mb-3">Your Assessment History</h1>
        <p className="text-xl text-[var(--text-muted)]">Track your career prediction progress over time.</p>
      </motion.div>

      {history.length === 0 ? (
        <motion.div 
          className="text-center py-20 glass rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Clock className="mx-auto text-[var(--text-muted)] mb-4" size={48} />
          <h3 className="text-2xl font-bold text-[var(--text)] mb-2 font-heading">No History Yet</h3>
          <p className="text-[var(--text-muted)]">Complete your first assessment to see it here.</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {history.map((item, index) => (
            <motion.div 
              key={item._id}
              className="glass rounded-3xl p-6 sm:p-8 border border-[var(--border)] hover:border-[var(--accent-light)] transition-colors relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-blue)] rounded-full mix-blend-multiply filter blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] mb-2">
                    <Clock size={16} />
                    {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--text)] font-heading flex items-center gap-2">
                    <Briefcase className="text-[var(--accent)]" size={24} />
                    {item.domain.toUpperCase()} Assessment
                  </h2>
                </div>
              </div>
              
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-[var(--text)] mb-4 font-heading">Top Predictions</h3>
                <ul className="space-y-4">
                  {item.results.slice(0, 3).map((pred, i) => (
                    <li key={i} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[var(--text)]">{pred.career}</span>
                        <span className="text-sm font-bold bg-[rgba(16,185,129,0.1)] text-[var(--success)] px-2 py-1 rounded">
                          {Math.round(pred.confidence)}% Match
                        </span>
                      </div>
                      <div className="w-full bg-[var(--border)] rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] h-1.5 rounded-full" 
                          style={{ width: `${pred.confidence}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {item.groqSummary && (
                <div className="mt-4 border-t border-[var(--border)] pt-6">
                  <h4 className="text-lg font-bold text-gradient flex items-center gap-2 mb-3 font-heading">
                    <BrainCircuit size={20} /> AI Action Plan Snippet
                  </h4>
                  <p className="text-[var(--text-muted)] line-clamp-2 italic border-l-2 border-[var(--brand-blue)] pl-4">
                    "{item.groqSummary}"
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
