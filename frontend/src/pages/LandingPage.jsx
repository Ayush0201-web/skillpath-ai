import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Sparkles, Target, Zap, Shield, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated } = useContext(AuthContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--brand-blue)] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[var(--brand-green)] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 w-full">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-[var(--accent)]">
              <Sparkles size={16} /> Meet the future of career guidance
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold text-[var(--text)] tracking-tight mb-8 leading-tight font-heading"
          >
            Discover Your Perfect <br/>
            <span className="text-gradient">Tech Career Path</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-[var(--text-muted)] mb-12 leading-relaxed"
          >
            Leverage advanced AI to analyze your skills, pinpoint your strengths, and navigate directly toward your dream job.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            {isAuthenticated ? (
              <Link 
                to="/assess" 
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white font-bold rounded-xl text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start New Assessment <ChevronRight size={20} />
              </Link>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white font-bold rounded-xl text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Get Started Free <ChevronRight size={20} />
                </Link>
                <Link 
                  to="/login" 
                  className="w-full sm:w-auto px-8 py-4 glass text-[var(--text)] font-bold rounded-xl text-lg hover:bg-[var(--surface)] transition-all flex items-center justify-center"
                >
                  Log in
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-[rgba(16,185,129,0.1)] text-[var(--success)] rounded-2xl flex items-center justify-center mb-6">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text)] mb-4 font-heading">Precision Mapping</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">Our ML model analyzes over 50 data points to find roles perfectly matching your unique skill signature.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-[rgba(14,165,233,0.1)] text-[var(--accent)] rounded-2xl flex items-center justify-center mb-6">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text)] mb-4 font-heading">AI Action Plans</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">Get instant, personalized feedback from Cloudflare Workers AI detailing exactly what skills you need to learn next.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-[rgba(245,158,11,0.1)] text-[var(--warning)] rounded-2xl flex items-center justify-center mb-6">
              <Shield size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text)] mb-4 font-heading">Data Driven</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">Backed by industry trends and real-world tech requirements to keep you ahead of the hiring curve.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
