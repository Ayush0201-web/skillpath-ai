import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { domainsData } from '../data/domains';

export default function DomainSelection() {
  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold text-center mb-12 mt-8 text-[var(--text)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        What's your field of study?
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.keys(domainsData).map((key, index) => {
          const domain = domainsData[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/input/${encodeURIComponent(key)}`} className="block">
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all cursor-pointer h-full">
                  <h3 className="text-2xl font-bold mb-4 text-[var(--accent-light)] flex items-center gap-3">
                    {/* Placeholder icon text */}
                    <span className="text-3xl">💻</span>
                    {domain.name}
                  </h3>
                  <div className="flex justify-between text-sm text-[var(--text-muted)] mb-4">
                    <span>{domain.skills.length} Skills Analyzed</span>
                    <span>{domain.roles.length} Career Paths</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {domain.skills.slice(0, 5).map(skill => (
                      <span key={skill} className="bg-[var(--primary)] text-xs px-3 py-1 rounded-full border border-[var(--border)]">
                        {skill}
                      </span>
                    ))}
                    <span className="bg-[var(--primary)] text-xs px-3 py-1 rounded-full border border-[var(--border)] text-[var(--accent-light)]">
                      +{domain.skills.length - 5} more
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
