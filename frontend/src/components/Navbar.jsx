import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <motion.nav 
      className="sticky top-0 z-50 glass border-b border-[var(--border)] px-6 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_0_15px_rgba(32,178,170,0.4)] group-hover:shadow-[0_0_25px_rgba(32,178,170,0.8)] transition-all overflow-hidden p-1">
            <img 
              src="/Gemini_Generated_Image_xs2b5exs2b5exs2b.png" 
              alt="SkillPath AI Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight text-[var(--text)] group-hover:text-gradient transition-all">
            SkillPath AI
          </span>
        </Link>
        
        <div className="flex gap-8 items-center">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-gradient font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors ${location.pathname === '/about' ? 'text-gradient font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          >
            About
          </Link>
          {isAuthenticated && (
            <>
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors ${location.pathname === '/dashboard' ? 'text-gradient font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/history" 
                className={`text-sm font-medium transition-colors ${location.pathname === '/history' ? 'text-gradient font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
              >
                History
              </Link>
            </>
          )}

          <div className="flex items-center gap-5 ml-4 pl-6 border-l border-[var(--border)]">
            <button
              onClick={toggleTheme}
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-2 rounded-full hover:bg-[var(--surface)] focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[var(--text)]">
                  Hi, <span className="text-gradient">{user?.name?.split(' ')[0]}</span>
                </span>
                <button 
                  onClick={logout}
                  className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[rgba(239,68,68,0.1)]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link 
                  to="/login"
                  className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors px-4 py-2 rounded-lg hover:bg-[var(--surface)]"
                >
                  Log in
                </Link>
                <Link 
                  to="/register"
                  className="text-sm font-medium bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white hover:opacity-90 transition-opacity px-5 py-2 rounded-lg shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
