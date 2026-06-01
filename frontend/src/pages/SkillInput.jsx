import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { domainsData } from '../data/domains';
import { predictCareer } from '../utils/predictCareer';

export default function SkillInput() {
  const { domain } = useParams();
  const navigate = useNavigate();
  const decodedDomain = decodeURIComponent(domain);
  const domainInfo = domainsData[decodedDomain];

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    marks10: '',
    marks12: '',
    grad: '',
    backlogs: 0,
    internship: false,
    projects: 0,
    certifications: 0,
    interest: '',
    skills: domainInfo ? domainInfo.skills.reduce((acc, skill) => ({ ...acc, [skill]: 5 }), {}) : {},
    softSkills: {
      communication: 5,
      leadership: 5,
      teamwork: 5,
      problemSolving: 5
    }
  });

  if (!domainInfo) {
    return <div className="p-8 text-center text-red-500">Domain not found.</div>;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSkillChange = (skill, value) => {
    setFormData(prev => ({
      ...prev,
      skills: { ...prev.skills, [skill]: parseInt(value) }
    }));
  };

  const handleSoftSkillChange = (skill, value) => {
    setFormData(prev => ({
      ...prev,
      softSkills: { ...prev.softSkills, [skill]: parseInt(value) }
    }));
  };

  const calculateProgress = () => {
    let filled = 0;
    const required = ['marks10', 'marks12', 'grad', 'interest'];
    required.forEach(field => {
      if (formData[field] !== '') filled++;
    });
    return Math.floor((filled / required.length) * 100);
  };

  const getSliderColor = (val) => {
    if (val <= 4) return 'bg-red-500';
    if (val <= 7) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (calculateProgress() < 100) {
      alert("Please fill in all required academic fields.");
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await predictCareer(decodedDomain, formData);
      sessionStorage.setItem('predictionResult', JSON.stringify(result));
      navigate('/result', { state: { result, domain: decodedDomain } });
    } catch (error) {
      console.error(error);
      alert("An error occurred during prediction. Please try again.");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[var(--primary)] z-50 flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full mb-6"
        />
        <h2 className="text-2xl font-bold text-[var(--text)]">Analyzing your skills...</h2>
        <p className="text-[var(--text-muted)] mt-2">Matching career patterns with AI</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24">
      <h2 className="text-3xl font-bold mb-8 text-[var(--accent-light)]">
        {domainInfo.name} Skill Assessment
      </h2>
      
      <div className="mb-8 bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)] sticky top-0 z-10 shadow-lg">
        <div className="flex justify-between text-sm mb-2">
          <span>Profile Completion</span>
          <span>{calculateProgress()}%</span>
        </div>
        <div className="w-full bg-[var(--primary)] rounded-full h-2">
          <div 
            className="bg-[var(--accent)] h-2 rounded-full transition-all duration-300" 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <section className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]">
          <h3 className="text-2xl font-bold mb-6 border-b border-[var(--border)] pb-2">Section A — Academic Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-[var(--text-muted)]">10th Marks (%) *</label>
              <input type="number" name="marks10" value={formData.marks10} onChange={handleInputChange} required min="0" max="100" className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-md p-2 text-[var(--text)] focus:border-[var(--accent)] outline-none" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[var(--text-muted)]">12th Marks (%) *</label>
              <input type="number" name="marks12" value={formData.marks12} onChange={handleInputChange} required min="0" max="100" className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-md p-2 text-[var(--text)] focus:border-[var(--accent)] outline-none" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[var(--text-muted)]">Graduation Marks (%) *</label>
              <input type="number" name="grad" value={formData.grad} onChange={handleInputChange} required min="0" max="100" className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-md p-2 text-[var(--text)] focus:border-[var(--accent)] outline-none" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[var(--text-muted)]">Number of Backlogs</label>
              <input type="number" name="backlogs" value={formData.backlogs} onChange={handleInputChange} min="0" className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-md p-2 text-[var(--text)] focus:border-[var(--accent)] outline-none" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[var(--text-muted)]">Number of Projects</label>
              <input type="number" name="projects" value={formData.projects} onChange={handleInputChange} min="0" className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-md p-2 text-[var(--text)] focus:border-[var(--accent)] outline-none" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[var(--text-muted)]">Number of Certifications</label>
              <input type="number" name="certifications" value={formData.certifications} onChange={handleInputChange} min="0" className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-md p-2 text-[var(--text)] focus:border-[var(--accent)] outline-none" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[var(--text-muted)]">Interest Area *</label>
              <select name="interest" value={formData.interest} onChange={handleInputChange} required className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-md p-2 text-[var(--text)] focus:border-[var(--accent)] outline-none">
                <option value="">Select an interest</option>
                {domainInfo.roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center mt-8">
              <label className="flex items-center cursor-pointer gap-3">
                <input type="checkbox" name="internship" checked={formData.internship} onChange={handleInputChange} className="w-5 h-5 accent-[var(--accent)]" />
                <span className="text-[var(--text)]">Internship Done?</span>
              </label>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]">
          <h3 className="text-2xl font-bold mb-6 border-b border-[var(--border)] pb-2">Section B — Technical Skills (1-10)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {domainInfo.skills.map(skill => (
              <div key={skill}>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-[var(--text-muted)]">{skill}</label>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${getSliderColor(formData.skills[skill])}`}>
                    {formData.skills[skill]}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" max="10" 
                  value={formData.skills[skill]} 
                  onChange={(e) => handleSkillChange(skill, e.target.value)}
                  className="w-full accent-[var(--accent)]" 
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]">
          <h3 className="text-2xl font-bold mb-6 border-b border-[var(--border)] pb-2">Section C — Soft Skills (1-10)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.keys(formData.softSkills).map(skill => {
              const formattedName = skill.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return (
                <div key={skill}>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-[var(--text-muted)]">{formattedName}</label>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${getSliderColor(formData.softSkills[skill])}`}>
                      {formData.softSkills[skill]}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="10" 
                    value={formData.softSkills[skill]} 
                    onChange={(e) => handleSoftSkillChange(skill, e.target.value)}
                    className="w-full accent-[var(--accent)]" 
                  />
                </div>
              );
            })}
          </div>
        </section>

        <div className="text-center">
          <button type="submit" className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold py-4 px-12 rounded-full text-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            Predict My Career
          </button>
        </div>
      </form>
    </div>
  );
}
