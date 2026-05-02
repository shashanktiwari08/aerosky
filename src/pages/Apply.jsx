import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    role: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err) {
      alert('Error submitting application. Please check if the server is running.');
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (submitted) {
    return (
      <motion.div initial="hidden" animate="visible" variants={variants} className="container" style={{ maxWidth: '600px', padding: '6rem 2rem', textAlign: 'center' }}>
        <div className="form-card" style={{ borderTop: '2px solid var(--green-ok)' }}>
          <h2 style={{ color: 'var(--green-ok)', marginBottom: '1rem' }}>Application Submitted</h2>
          <p style={{ color: 'var(--wd)', marginBottom: '2.5rem' }}>
            Your profile is under review by the Aerosky Admin team. Once approved, you will receive your WhatsApp login credentials.
          </p>
          <button className="btn-gold" onClick={() => window.location.href='/'}>RETURN HOME</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={variants} className="container" style={{ maxWidth: '800px', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>Staff <em>Application</em></h1>
        <p style={{ color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem', marginTop: '0.5rem' }}>Aerosky Hospitality Network</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
            </div>
          </div>
          
          <div className="form-group">
            <label>WhatsApp Number</label>
            <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Role Category</label>
            <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ color: 'var(--gold)', background: 'var(--black2)' }}>
              <option value="" style={{ color: 'var(--gold)' }}>SELECT ROLE</option>
              <option value="Waiter" style={{ color: 'var(--gold)' }}>WAITER</option>
              <option value="Loader" style={{ color: 'var(--gold)' }}>LOADER</option>
              <option value="Dishwasher" style={{ color: 'var(--gold)' }}>DISH WASHER</option>
              <option value="Manager" style={{ color: 'var(--gold)' }}>SITE MANAGER</option>
            </select>
          </div>

          <div className="form-group">
            <label>Upload ID / Resume</label>
            <div style={{ border: '1px dashed var(--borderl)', textAlign: 'center', padding: '3rem', background: 'transparent' }}>
              <input type="file" id="resume" style={{ display: 'none' }} />
              <label htmlFor="resume" style={{ cursor: 'pointer', color: 'var(--wd)' }}>
                <span style={{ display: 'block', fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.5rem', lineHeight: '1' }}>+</span>
                Click to browse files
              </label>
            </div>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'right' }}>
            <button type="submit" className="btn-gold">
              SUBMIT APPLICATION
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Apply;
