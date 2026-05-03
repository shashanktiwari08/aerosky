import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ role, userName, userRole, activeTab, onTabChange, children }) => {
  const navigate = useNavigate();

  const isAdmin = role === 'admin';
  const isClient = role === 'client';
  const isStaff = role === 'staff';

  const navItems = [
    { id: 'overview', label: 'Home', icon: '◈', show: true },
    { id: 'events', label: 'Events', icon: '◉', show: isAdmin || isStaff },
    { id: 'clients', label: 'Clients', icon: '◇', show: isAdmin },
    { id: 'staff', label: 'Staff', icon: '◎', show: isAdmin || isClient },
    { id: 'applications', label: 'Apps', icon: '✦', show: isAdmin },
    { id: 'must', label: 'Musts', icon: '❗', show: isClient },
    { id: 'payments', label: 'Money', icon: '₹', show: true },
  ];

  return (
    <div className="dashboard-container">
      {/* DESKTOP SIDEBAR */}
      <aside className="desktop-sidebar">
        <div className="sb-brand">
          <div className="brand-text">AEROSKY<br/><span>HOSPITALITY</span></div>
        </div>
        <div className="sb-admin">
          <div className="sb-admin-name">{userName} <span className="role-tag">({userRole})</span></div>
        </div>
        <div className="sb-nav">
          {navItems.filter(item => item.show).map(item => (
            <button key={item.id} className={`sb-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => onTabChange(item.id)}>
              <span className="sb-icon">{item.icon}</span>
              <span className="sb-label">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="sb-footer">
          <button className="btn-outline" onClick={() => navigate('/login')}>LOGOUT</button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <header className="mobile-header">
        <div className="mobile-brand">AEROSKY <span>{activeTab.toUpperCase()}</span></div>
        <button className="mobile-logout" onClick={() => navigate('/login')}>Logout</button>
      </header>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {children}
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="mobile-bottom-nav">
        {navItems.filter(item => item.show).slice(0, 5).map(item => (
          <button key={item.id} className={`nav-btn ${activeTab === item.id ? 'active' : ''}`} onClick={() => onTabChange(item.id)}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DashboardLayout;
