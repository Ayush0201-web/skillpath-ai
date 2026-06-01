import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 min-h-screen">
      <motion.div 
        className="text-center mb-16 mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-bold text-[var(--text)] mb-4">About SkillPath AI</h2>
        <p className="text-xl text-[var(--text-muted)]">Building the future of career guidance</p>
      </motion.div>

      <motion.section 
        className="mb-12 bg-[var(--surface)] p-8 rounded-2xl border border-[var(--border)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-[var(--accent-light)]">Project Overview</h3>
        <p className="text-[var(--text)] leading-relaxed mb-4">
          SkillPath AI is a modern web application designed to help students discover the career paths they are best suited for. By analyzing academic performance, technical skills, and soft skills, our AI engine predicts the top career matches and provides a tailored roadmap for success.
        </p>
        <p className="text-[var(--text)] leading-relaxed">
          Powered by Claude AI (claude-sonnet-4-20250514), the platform evaluates complex skill profiles against industry requirements across 4 major domains, offering insights into 28 specialized career roles.
        </p>
      </motion.section>

      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--surface)] p-6 rounded-xl text-center border border-[var(--border)] relative">
            <div className="w-12 h-12 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h4 className="text-lg font-bold mb-2">Select Domain</h4>
            <p className="text-sm text-[var(--text-muted)]">Choose your field of study from our 4 primary domains.</p>
          </div>
          <div className="bg-[var(--surface)] p-6 rounded-xl text-center border border-[var(--border)] relative">
            <div className="w-12 h-12 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h4 className="text-lg font-bold mb-2">Input Skills</h4>
            <p className="text-sm text-[var(--text-muted)]">Provide your academic details and rate your technical & soft skills.</p>
          </div>
          <div className="bg-[var(--surface)] p-6 rounded-xl text-center border border-[var(--border)] relative">
            <div className="w-12 h-12 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h4 className="text-lg font-bold mb-2">Get Predictions</h4>
            <p className="text-sm text-[var(--text-muted)]">Receive AI-driven career matches, skill gap analysis, and course recommendations.</p>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--border)]">
          <h3 className="text-xl font-bold mb-4 text-[var(--accent-light)]">Dataset & Scope</h3>
          <ul className="space-y-3 text-[var(--text)]">
            <li className="flex justify-between border-b border-[var(--border)] pb-2"><span>Analyzed Student Profiles</span> <strong className="text-[var(--success)]">5000+</strong></li>
            <li className="flex justify-between border-b border-[var(--border)] pb-2"><span>Engineering & Comm. Domains</span> <strong className="text-[var(--success)]">4</strong></li>
            <li className="flex justify-between border-b border-[var(--border)] pb-2"><span>Unique Career Roles</span> <strong className="text-[var(--success)]">28</strong></li>
            <li className="flex justify-between pb-2"><span>Technical Skills Tracked</span> <strong className="text-[var(--success)]">48</strong></li>
          </ul>
        </div>

        <div className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--border)]">
          <h3 className="text-xl font-bold mb-4 text-[var(--accent-light)]">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-[var(--primary)] px-3 py-1 rounded-md text-sm border border-[var(--border)]">React 18</span>
            <span className="bg-[var(--primary)] px-3 py-1 rounded-md text-sm border border-[var(--border)]">Vite</span>
            <span className="bg-[var(--primary)] px-3 py-1 rounded-md text-sm border border-[var(--border)]">Tailwind CSS v4</span>
            <span className="bg-[var(--primary)] px-3 py-1 rounded-md text-sm border border-[var(--border)]">React Router v6</span>
            <span className="bg-[var(--primary)] px-3 py-1 rounded-md text-sm border border-[var(--border)]">Framer Motion</span>
            <span className="bg-[var(--primary)] px-3 py-1 rounded-md text-sm border border-[var(--border)]">Recharts</span>
            <span className="bg-[var(--primary)] px-3 py-1 rounded-md text-sm border border-[var(--border)]">Lucide React</span>
            <span className="bg-[var(--primary)] px-3 py-1 rounded-md text-sm border border-[var(--border)] border-[var(--accent)] text-[var(--accent-light)]">Claude AI API</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
