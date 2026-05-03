import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="sidebar-inner">
      <div className="sb-brand">
        <div className="brand-text">
          AEROSKY<br/>
          <span>HOSPITALITY</span>
        </div>
      </div>
      
      <div className="sb-admin">
        <div className="sb-admin-dot"></div>
        <div className="sb-admin-name">{userName} <span className="role-tag">({userRole})</span></div>
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
            <span className="sb-label">{item.label}</span>
            {item.badge && <span className="sb-badge-notif">{item.badge}</span>}
          </button>
        ))}
      </div>

      <div className="sb-footer">
        <button className="btn-outline" onClick={() => navigate('/login')}>LOGOUT</button>
      </div>
    </div>
  );

  return (
    <div className={`dashboard-container ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      {/* MOBILE TOPBAR */}
      <div className="mobile-header">
        <button className="menu-btn" onClick={toggleMobileMenu}>
          <div className={`nav-icon ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span><span></span><span></span>
          </div>
        </button>
        <div className="mobile-logo">AEROSKY</div>
        <div className="mobile-status"></div>
      </div>

      {/* SIDEBAR (Responsive) */}
      <aside className={`dashboard-sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <SidebarContent />
      </aside>

      {/* OVERLAY for Mobile */}
      {isMobileMenuOpen && <div className="sidebar-overlay" onClick={toggleMobileMenu}></div>}

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
