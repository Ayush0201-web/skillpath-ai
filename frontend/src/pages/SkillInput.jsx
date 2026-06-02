import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, AlertCircle, TrendingUp } from 'lucide-react';

const SKILLS_MAP = {
  'CS/IT': ['Python', 'C++', 'Java', 'Data Structures', 'Web Development', 'Machine Learning', 'Databases'],
  'Mechanical': ['AutoCAD', 'Thermodynamics', 'Fluid Mechanics', 'Robotics & Automation', 'Manufacturing Processes', 'SolidWorks'],
  'Electrical': ['Circuit Design', 'Power Systems', 'Control Systems', 'Microcontrollers', 'MATLAB', 'Electrical Machines'],
  'Civil': ['AutoCAD', 'Structural Analysis', 'Surveying', 'Construction Management', 'Geotechnical Engineering', 'Revit'],
  'Electronics & Communication': ['Digital Electronics', 'Signals & Systems', 'Microprocessors', 'VLSI Design', 'Communication Systems', 'Embedded Systems'],
  'Commerce': ['Accounting', 'Financial Analysis', 'Taxation', 'Business Economics', 'Marketing Management', 'Excel']
};

export default function SkillInput() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    domain: 'CS/IT',
    gender: 'Male',
    age: 21,
    marks10: '',
    marks12: '',
    grad: '',
    backlogs: 0,
    internship: false,
    projects: 0,
    certifications: 0,
    interest: '',
    softSkills: {
      communication: 5,
      leadership: 5,
      teamwork: 5,
      problemSolving: 5
    },
    skills: {}
  });

  const availableSkills = SKILLS_MAP[formData.domain] || SKILLS_MAP['CS/IT'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'domain') {
      setFormData({ 
        ...formData, 
        domain: value, 
        skills: {} // Reset skills when domain changes
      });
    } else {
      setFormData({ 
        ...formData, 
        [name]: type === 'checkbox' ? checked : value 
      });
    }
  };

  const handleSoftSkillChange = (skill, value) => {
    setFormData({
      ...formData,
      softSkills: {
        ...formData.softSkills,
        [skill]: parseInt(value)
      }
    });
  };

  const handleTechSkillChange = (skill, value) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [skill]: parseInt(value)
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error('Prediction request failed');
      }

      const data = await response.json();
      sessionStorage.setItem('predictionResult', JSON.stringify(data));
      navigate('/results');
    } catch (err) {
      console.error(err);
      setError('Failed to generate prediction. Please make sure the backend services are running.');
    } finally {
      setLoading(false);
    }
  };

  const renderSlider = (label, value, onChange) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-[var(--text)]">{label}</label>
        <span className="text-xs font-bold bg-[rgba(14,165,233,0.1)] text-[var(--accent)] px-2 py-1 rounded">
          {value || 0} / 10
        </span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="10" 
        value={value || 0} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-2 bg-[var(--surface)] rounded-lg appearance-none cursor-pointer border border-[var(--border)] accent-[var(--accent)]"
      />
      <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
        <span>Beginner</span>
        <span>Expert</span>
      </div>
    </div>
  );

  return (
    <div className="flex-grow py-12 px-4 max-w-4xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-[var(--text)] font-heading mb-3">Skill Assessment</h1>
          <p className="text-xl text-[var(--text-muted)]">Rate your proficiencies on a scale of 0-10 for accurate AI mapping.</p>
        </div>

        {error && (
          <div className="bg-[rgba(239,68,68,0.1)] border border-[var(--danger)] text-[var(--danger)] px-4 py-4 rounded-xl mb-8 flex items-center gap-3">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10 glass p-8 sm:p-10 rounded-3xl border border-[var(--border)] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-blue)] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none"></div>

          {/* Academic Info */}
          <section>
            <h3 className="text-2xl font-bold text-[var(--text)] font-heading mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[rgba(10,37,64,0.1)] text-[var(--brand-blue)] flex items-center justify-center text-sm">1</span>
              Academic Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Engineering Department / Domain</label>
                <select 
                  name="domain" 
                  value={formData.domain} 
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all text-[var(--text)]"
                >
                  <option value="CS/IT">Computer Science & IT</option>
                  <option value="Mechanical">Mechanical Engineering</option>
                  <option value="Electrical">Electrical Engineering</option>
                  <option value="Civil">Civil Engineering</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Commerce">Commerce / Business</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Age</label>
                <input 
                  type="number" min="15" max="60" name="age" required
                  value={formData.age} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all text-[var(--text)]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">10th Marks (%)</label>
                <input 
                  type="number" step="0.1" min="0" max="100" name="marks10" required
                  value={formData.marks10} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all"
                  placeholder="e.g. 85.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">12th Marks (%)</label>
                <input 
                  type="number" step="0.1" min="0" max="100" name="marks12" required
                  value={formData.marks12} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all"
                  placeholder="e.g. 88.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Graduation / Degree Marks (%)</label>
                <input 
                  type="number" step="0.1" min="0" max="100" name="grad" required
                  value={formData.grad} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all"
                  placeholder="e.g. 75.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Active Backlogs</label>
                <input 
                  type="number" min="0" max="10" name="backlogs" required
                  value={formData.backlogs} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all"
                  placeholder="0"
                />
              </div>
            </div>
          </section>

          <hr className="border-[var(--border)]" />

          {/* Experience Info */}
          <section>
            <h3 className="text-2xl font-bold text-[var(--text)] font-heading mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[rgba(16,185,129,0.1)] text-[var(--brand-green)] flex items-center justify-center text-sm">2</span>
              Experience & Interests
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl cursor-pointer hover:border-[var(--accent)] transition-all">
                  <input 
                    type="checkbox" name="internship"
                    checked={formData.internship} onChange={handleInputChange}
                    className="w-5 h-5 accent-[var(--accent)]"
                  />
                  <span className="text-[var(--text)] font-medium">I have completed at least one internship.</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Number of Projects</label>
                <input 
                  type="number" min="0" name="projects" required
                  value={formData.projects} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Number of Certifications</label>
                <input 
                  type="number" min="0" name="certifications" required
                  value={formData.certifications} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Primary Area of Interest</label>
                <input 
                  type="text" name="interest" required
                  value={formData.interest} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all"
                  placeholder="e.g., Software Engineering, Web Development, Automation"
                />
              </div>
            </div>
          </section>

          <hr className="border-[var(--border)]" />

          {/* Soft Skills */}
          <section>
            <h3 className="text-2xl font-bold text-[var(--text)] font-heading mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[rgba(245,158,11,0.1)] text-[var(--warning)] flex items-center justify-center text-sm">3</span>
              Soft Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {renderSlider('Communication', formData.softSkills.communication, (val) => handleSoftSkillChange('communication', val))}
              {renderSlider('Leadership', formData.softSkills.leadership, (val) => handleSoftSkillChange('leadership', val))}
              {renderSlider('Teamwork', formData.softSkills.teamwork, (val) => handleSoftSkillChange('teamwork', val))}
              {renderSlider('Problem Solving', formData.softSkills.problemSolving, (val) => handleSoftSkillChange('problemSolving', val))}
            </div>
          </section>

          <hr className="border-[var(--border)]" />

          {/* Technical Skills */}
          <section>
            <h3 className="text-2xl font-bold text-[var(--text)] font-heading mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[rgba(139,92,246,0.1)] text-[#8b5cf6] flex items-center justify-center text-sm">4</span>
              Technical Proficiencies ({formData.domain})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {availableSkills.map(skill => (
                <React.Fragment key={skill}>
                  {renderSlider(skill, formData.skills[skill], (val) => handleTechSkillChange(skill, val))}
                </React.Fragment>
              ))}
            </div>
          </section>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white font-bold rounded-xl text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-pulse flex items-center gap-2"><TrendingUp className="animate-bounce" /> Analyzing Profile...</span>
              ) : (
                <>Generate Career Prediction <ChevronRight size={20} /></>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
