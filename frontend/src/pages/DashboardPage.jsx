import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Clock, ChevronRight, Activity } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex-grow py-16 px-6 max-w-4xl mx-auto w-full relative">
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[var(--brand-green)] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none"></div>

      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold text-[var(--text)] font-heading mb-2">User Profile</h1>
        <p className="text-xl text-[var(--text-muted)]">Manage your account and view your progress.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          className="md:col-span-2 glass rounded-3xl p-8 sm:p-10 border border-[var(--border)] shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Subtle glow inside form */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-blue)] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none"></div>

          <div className="flex items-center gap-6 mb-10 relative z-10">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] flex items-center justify-center text-white text-4xl font-bold font-heading shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--text)] font-heading">{user?.name}</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(16,185,129,0.1)] text-[var(--success)] text-sm font-medium mt-2">
                <Activity size={14} /> Active Account
              </span>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-4 bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)]">
              <div className="w-10 h-10 rounded-lg bg-[rgba(10,37,64,0.1)] text-[var(--brand-blue)] flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Full Name</p>
                <p className="text-lg font-bold text-[var(--text)]">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)]">
              <div className="w-10 h-10 rounded-lg bg-[rgba(14,165,233,0.1)] text-[var(--accent)] flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Email Address</p>
                <p className="text-lg font-bold text-[var(--text)]">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)]">
              <div className="w-10 h-10 rounded-lg bg-[rgba(245,158,11,0.1)] text-[var(--warning)] flex items-center justify-center">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Member Since</p>
                <p className="text-lg font-bold text-[var(--text)]">Today</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="md:col-span-1 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass rounded-3xl p-8 border border-[var(--border)] flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            <div className="w-16 h-16 bg-[rgba(14,165,233,0.1)] text-[var(--accent)] rounded-full flex items-center justify-center mb-6">
              <Clock size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text)] font-heading mb-4">Assessment History</h3>
            <p className="text-[var(--text-muted)] mb-8">
              Review your past career predictions and AI action plans to track your growth.
            </p>
            
            <button 
              onClick={() => navigate('/history')}
              className="w-full py-4 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              View History <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
