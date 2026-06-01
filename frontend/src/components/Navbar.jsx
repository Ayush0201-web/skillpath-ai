import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  
  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-[var(--primary)] border-b border-[var(--border)] px-6 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_20px_rgba(129,140,248,0.8)] transition-all">
            S
          </div>
          <span className="font-bold text-xl tracking-tight text-[var(--text)] group-hover:text-[var(--accent-light)] transition-colors">SkillPath AI</span>
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-[var(--accent-light)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors ${location.pathname === '/about' ? 'text-[var(--accent-light)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          >
            About
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[var(--border)]">
              <span className="text-sm font-medium text-[var(--accent-light)]">Hello, {user?.name?.split(' ')[0]}</span>
              <button 
                onClick={logout}
                className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--error)] transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 ml-4 pl-4 border-l border-[var(--border)]">
              <Link 
                to="/login"
                className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent-light)] transition-colors px-3 py-1.5"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="text-sm font-medium bg-[rgba(99,102,241,0.1)] text-[var(--accent-light)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all px-4 py-1.5 rounded-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
