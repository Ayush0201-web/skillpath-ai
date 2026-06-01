import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--primary)] flex flex-col">
      {/* Navbar will be added later */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-light)] to-[var(--accent)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SkillPath AI
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-[var(--text-muted)] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Discover the career your skills are built for
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 w-48 shadow-lg">
            <h3 className="text-3xl font-bold text-[var(--accent-light)]">28</h3>
            <p className="text-[var(--text-muted)]">Career Roles</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 w-48 shadow-lg">
            <h3 className="text-3xl font-bold text-[var(--success)]">4</h3>
            <p className="text-[var(--text-muted)]">Domains</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 w-48 shadow-lg">
            <h3 className="text-3xl font-bold text-[var(--warning)]">100%</h3>
            <p className="text-[var(--text-muted)]">AI-Powered</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link to="/select-domain">
            <button className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold py-4 px-10 rounded-full text-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_rgba(129,140,248,0.7)]">
              Get Started
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
