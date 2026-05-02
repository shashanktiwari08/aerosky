import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [role, setRole] = useState('staff');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (role === 'admin' && phone === 'admin' && password === 'admin123') {
      navigate('/admin');
    } else if (role === 'staff' && phone === 'staff' && password === 'staff123') {
      navigate('/service-dashboard');
    } else if (role === 'client' && phone === 'client' && password === 'client123') {
      navigate('/client-dashboard');
    } else {
      setError('Invalid credentials for selected role.');
    }
  };

  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants} className="container" style={{ maxWidth: '450px', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2>Portal <em>Access</em></h2>
        <p style={{ color: 'var(--wd)', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '0.5rem' }}>Secure Authentication</p>
      </div>

      <div className="form-card">
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
          {['staff', 'client', 'admin'].map(r => (
            <button 
              key={r}
              type="button"
              className="btn-outline" 
              style={{ 
                flex: 1, 
                padding: '0.5rem', 
                fontSize: '0.65rem',
                border: role === r ? '1px solid var(--gold)' : '1px solid transparent',
                color: role === r ? 'var(--gold)' : 'var(--wd)',
                background: role === r ? 'var(--gold-dim)' : 'transparent'
              }}
              onClick={() => { setRole(r); setError(''); }}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        {error && <div style={{ color: 'var(--red)', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>{role === 'client' ? 'Client ID / Email' : 'WhatsApp Number'}</label>
            <input 
              type="text" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
              placeholder={`Enter '${role}'`}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder={`Enter '${role}123'`}
            />
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '0.8rem' }}>
              SECURE LOGIN
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
