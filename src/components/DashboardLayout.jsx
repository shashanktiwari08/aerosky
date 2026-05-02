import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ role, userName, userRole, activeTab, onTabChange, children }) => {
  const navigate = useNavigate();

  const isStaff = role === 'staff';
  const isAdmin = role === 'admin';
  const isClient = role === 'client';

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sb-brand" style={{ padding: '2rem 1rem' }}>
          <div style={{ 
            color: 'var(--gold)', 
            fontSize: '1rem', 
            fontWeight: '700', 
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontFamily: '"Cormorant Garamond", serif',
            lineHeight: '1.2'
          }}>
            AEROSKY<br/>
            <span style={{ fontSize: '0.7rem', letterSpacing: '2px', fontWeight: '400' }}>HOSPITALITY</span>
          </div>
        </div>
        <div className="sb-admin">
          <div className="sb-admin-dot"></div>
          <div className="sb-admin-name">{userName} · {userRole}</div>
        </div>
        <div className="sb-nav">
          <div className="sb-section">Overview</div>
          <button 
            className={`sb-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => onTabChange('overview')}
            style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
          >
            <span className="sb-icon">◈</span> Dashboard
          </button>

          {isAdmin && (
            <>
              <div className="sb-section">Manage</div>
              <button 
                className={`sb-item ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => onTabChange('events')}
                style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
              >
                <span className="sb-icon">◉</span> Events <span className="sb-badge" style={{ marginLeft: 'auto', background: 'var(--red)', color: '#fff', fontSize: '0.55rem', padding: '1px 6px', borderRadius: '8px' }}>3</span>
              </button>
              <button 
                className={`sb-item ${activeTab === 'clients' ? 'active' : ''}`}
                onClick={() => onTabChange('clients')}
                style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
              >
                <span className="sb-icon">◇</span> Clients
              </button>
              <button 
                className={`sb-item ${activeTab === 'staff' ? 'active' : ''}`}
                onClick={() => onTabChange('staff')}
                style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
              >
                <span className="sb-icon">◎</span> Service Staff
              </button>
              <button 
                className={`sb-item ${activeTab === 'applications' ? 'active' : ''}`}
                onClick={() => onTabChange('applications')}
                style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
              >
                <span className="sb-icon">✦</span> Applications <span className="sb-badge" style={{ marginLeft: 'auto', background: 'var(--red)', color: '#fff', fontSize: '0.55rem', padding: '1px 6px', borderRadius: '8px' }}>4</span>
              </button>
            </>
          )}

          {isClient && (
            <>
              <div className="sb-section">Event Details</div>
              <button 
                className={`sb-item ${activeTab === 'must' ? 'active' : ''}`}
                onClick={() => onTabChange('must')}
                style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
              >
                <span className="sb-icon">❗</span> The "Musts"
              </button>
              <button 
                className={`sb-item ${activeTab === 'staff' ? 'active' : ''}`}
                onClick={() => onTabChange('staff')}
                style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
              >
                <span className="sb-icon">◎</span> Assigned Staff
              </button>
            </>
          )}

          {isStaff && (
            <>
              <div className="sb-section">My Work</div>
              <button 
                className={`sb-item ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => onTabChange('events')}
                style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
              >
                <span className="sb-icon">◉</span> Upcoming Events
              </button>
              <button 
                className={`sb-item ${activeTab === 'support' ? 'active' : ''}`}
                onClick={() => onTabChange('support')}
                style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
              >
                <span className="sb-icon">💬</span> Help & Support
              </button>
            </>
          )}

          <div className="sb-section">Finance</div>
          <button 
            className={`sb-item ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => onTabChange('payments')}
            style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
          >
            <span className="sb-icon">₹</span> Payments
          </button>

          <div className="sb-section">Settings</div>
          <button 
            className={`sb-item ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => onTabChange('account')}
            style={{ width: '100%', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
          >
            <span className="sb-icon">★</span> Account
          </button>
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
          <button 
            className="btn-outline" 
            style={{ width: '100%', fontSize: '0.65rem' }} 
            onClick={() => navigate('/login')}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
