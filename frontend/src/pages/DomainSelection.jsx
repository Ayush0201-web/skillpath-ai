import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Database, Server, Smartphone, Cpu, Shield, ArrowRight } from 'lucide-react';

const domains = [
  { id: 'frontend', name: 'Frontend Development', icon: <Code size={24} />, color: 'from-blue-500 to-cyan-400' },
  { id: 'backend', name: 'Backend Development', icon: <Server size={24} />, color: 'from-emerald-500 to-teal-400' },
  { id: 'fullstack', name: 'Full Stack Development', icon: <Database size={24} />, color: 'from-purple-500 to-indigo-400' },
  { id: 'mobile', name: 'Mobile App Development', icon: <Smartphone size={24} />, color: 'from-orange-500 to-amber-400' },
  { id: 'data_science', name: 'Data Science & ML', icon: <Cpu size={24} />, color: 'from-pink-500 to-rose-400' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: <Shield size={24} />, color: 'from-slate-600 to-gray-500' }
];

export default function DomainSelection() {
  const navigate = useNavigate();

  const handleDomainSelect = (domainId) => {
    navigate(`/input/${domainId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex-grow py-12 px-6 max-w-7xl mx-auto w-full relative flex flex-col items-center justify-center">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[var(--brand-blue)] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none"></div>

      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold text-[var(--text)] font-heading mb-2">
          Select a <span className="text-gradient">Career Domain</span>
        </h1>
        <p className="text-xl text-[var(--text-muted)]">Choose the path you want to assess your skills against.</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {domains.map((domain) => (
          <motion.div 
            key={domain.id}
            variants={itemVariants}
            onClick={() => handleDomainSelect(domain.id)}
            className="group cursor-pointer glass rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden border border-[var(--border)] shadow-lg hover:shadow-xl"
          >
            {/* Hover Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${domain.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {domain.icon}
              </div>
              <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] group-hover:bg-[var(--surface)] group-hover:text-[var(--text)] transition-colors">
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-[var(--text)] font-heading relative z-10">{domain.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
