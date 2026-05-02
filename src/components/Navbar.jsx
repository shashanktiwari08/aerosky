import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`public-nav ${scrolled ? 'scrolled' : 'at-top'}`} style={{ transition: 'all 0.5s ease' }}>
      <Link to="/" className="logo-container" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <span style={{ 
          color: scrolled ? 'var(--gold)' : 'var(--black)', 
          fontSize: '1.2rem', 
          fontWeight: '700', 
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontFamily: '"Cormorant Garamond", serif',
          transition: 'color 0.5s ease'
        }}>
          AEROSKY HOSPITALITY
        </span>
      </Link>
      <ul className={`nav-links ${scrolled ? '' : 'at-top'}`}>
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><Link to="/apply" style={{ color: scrolled ? 'var(--gold)' : 'var(--black)', fontWeight: '600', transition: 'color 0.5s ease' }}>Careers</Link></li>
        <li><Link to="/login" className="btn-gold" style={{ 
          padding: '0.4rem 1.4rem', 
          marginLeft: '1rem',
          background: scrolled ? 'var(--gold)' : 'var(--black)',
          color: scrolled ? 'var(--black)' : 'var(--gold)',
          transition: 'all 0.5s ease'
        }}>Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
