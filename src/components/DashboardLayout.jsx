import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ role, userName, userRole, activeTab, onTabChange, children }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentRole = role || 'admin';
  const isAdmin = currentRole === 'admin';
  const isClient = currentRole === 'client';
  const isStaff = currentRole === 'staff';

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: '◈', show: true },
    { id: 'events', label: 'Event Schedule', icon: '◉', show: isAdmin || isStaff },
    { id: 'clients', label: 'Client Directory', icon: '◇', show: isAdmin },
    { id: 'staff', label: 'Service Staff', icon: '◎', show: isAdmin || isClient },
    { id: 'applications', label: 'Applications', icon: '✦', show: isAdmin },
    { id: 'must', label: 'Non-Negotiables', icon: '❗', show: isClient },
    { id: 'payments', label: 'Finance & Payouts', icon: '₹', show: true },
  ];

  const handleNavClick = (id) => {
    onTabChange(id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="luxury-dashboard">
      {/* MOBILE TOP NAV */}
      <header className="professional-header">
        <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
          <div className="menu-dots">
            <span></span><span></span><span></span>
          </div>
        </button>
        <div className="header-brand">AEROSKY <span className="tab-name">{activeTab}</span></div>
        <div className="header-user-status"></div>
      </header>

      {/* SIDEBAR (Desktop & Mobile) */}
      <aside className={`premium-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">AEROSKY<br/><span>HOSPITALITY</span></div>
          <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>✕</button>
        </div>
        
        <div className="sidebar-user">
          <div className="user-info">
            <span className="u-name">{userName}</span>
            <span className="u-role">{userRole}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.filter(item => item.show).map(item => (
            <button key={item.id} className={`nav-link-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => handleNavClick(item.id)}>
              <span className="link-icon">{item.icon}</span>
              <span className="link-text">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-link" onClick={() => navigate('/login')}>Logout Account</button>
        </div>
      </aside>

      {/* OVERLAY */}
      {isSidebarOpen && <div className="sidebar-blur-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* MAIN CONTENT AREA */}
      <main className="main-viewport">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
