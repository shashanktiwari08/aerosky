import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ role, userName, userRole, activeTab, onTabChange, children }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = role === 'admin';
  const isClient = role === 'client';
  const isStaff = role === 'staff';

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: '◈', show: true },
    { id: 'events', label: 'Events', icon: '◉', show: isAdmin || isStaff, badge: isAdmin ? 3 : null },
    { id: 'clients', label: 'Clients', icon: '◇', show: isAdmin },
    { id: 'staff', label: 'Service Staff', icon: '◎', show: isAdmin || isClient },
    { id: 'applications', label: 'Applications', icon: '✦', show: isAdmin, badge: 4 },
    { id: 'must', label: 'The "Musts"', icon: '❗', show: isClient },
    { id: 'payments', label: 'Payments', icon: '₹', show: true },
    { id: 'account', label: 'Account', icon: '★', show: true },
  ];

  const SidebarContent = () => (
    <>
      <div className="sb-brand" style={{ padding: '2rem 1.5rem' }}>
        <div style={{ 
          color: 'var(--gold)', 
          fontSize: '1.2rem', 
          fontWeight: '700', 
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontFamily: '"Cormorant Garamond", serif',
          lineHeight: '1.2'
        }}>
          AEROSKY<br/>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '400' }}>HOSPITALITY</span>
        </div>
      </div>
      
      <div className="sb-admin">
        <div className="sb-admin-dot"></div>
        <div className="sb-admin-name">{userName} <span style={{ opacity: 0.5, fontSize: '0.6rem' }}>({userRole})</span></div>
      </div>

      <div className="sb-nav">
        {navItems.filter(item => item.show).map(item => (
          <button 
            key={item.id}
            className={`sb-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => {
              onTabChange(item.id);
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="sb-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="sb-badge-notif">{item.badge}</span>}
          </button>
        ))}
      </div>

      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <button 
          className="btn-outline" 
          style={{ width: '100%', fontSize: '0.7rem' }} 
          onClick={() => navigate('/login')}
        >
          LOGOUT
        </button>
      </div>
    </>
  );

  return (
    <div className="dashboard-layout">
      {/* MOBILE HEADER */}
      <div className="mobile-topbar">
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span><span></span><span></span>
          </div>
        </button>
        <div className="mobile-brand">AEROSKY</div>
        <div className="mobile-user-dot"></div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="sidebar desktop-only">
        <SidebarContent />
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="mobile-overlay"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="sidebar mobile-only"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className="main">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
