import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Award, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex-grow py-16 px-6 max-w-6xl mx-auto w-full relative">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--brand-blue)] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none"></div>

      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-extrabold text-[var(--text)] font-heading mb-6">About <span className="text-gradient">SkillPath AI</span></h1>
        <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
          We are a team of passionate technologists dedicated to bridging the gap between talent and opportunity through advanced artificial intelligence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <motion.div 
          className="glass p-10 rounded-3xl border border-[var(--border)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-16 h-16 bg-[rgba(10,37,64,0.1)] text-[var(--brand-blue)] rounded-2xl flex items-center justify-center mb-6">
            <Sparkles size={32} />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text)] font-heading mb-4">Our Mission</h2>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            To empower students and professionals by providing highly accurate, data-driven career predictions and actionable learning paths using state-of-the-art machine learning models.
          </p>
        </motion.div>

        <motion.div 
          className="glass p-10 rounded-3xl border border-[var(--border)]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-[rgba(16,185,129,0.1)] text-[var(--brand-green)] rounded-2xl flex items-center justify-center mb-6">
            <Code size={32} />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text)] font-heading mb-4">Our Technology</h2>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            We leverage a custom-trained XGBoost model with 94.9% accuracy, combined with Cloudflare Workers AI edge networks, to deliver instantaneous and deeply personalized career insights.
          </p>
        </motion.div>
      </div>

    </div>
  );
}
