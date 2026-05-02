import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [clientPaymentStatus, setClientPaymentStatus] = useState(null);
  const [clientMustsList, setClientMustsList] = useState([]);
  const [selectedEventDate, setSelectedEventDate] = useState(null);
  const [expandedMusts, setExpandedMusts] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  
  // States for DB Data
  const [applications, setApplications] = useState([]);
  const [clients, setClients] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showSettleModal, setShowSettleModal] = useState(false);
  const [settleStaff, setSettleStaff] = useState(null);
  const [paymentInput, setPaymentInput] = useState({ amount: '', date: '', time: '' });
  const [assignStep, setAssignStep] = useState(false);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appsRes, clientsRes, staffRes] = await Promise.all([
        fetch(`${API_BASE}/applications`),
        fetch(`${API_BASE}/clients`),
        fetch(`${API_BASE}/staff`)
      ]);
      
      const apps = await appsRes.json();
      const cls = await clientsRes.json();
      const stf = await staffRes.json();

      setApplications(apps);
      setClients(cls);
      setStaffData(stf);
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  };

  const handleApproveApp = async (id) => {
    try {
      await fetch(`${API_BASE}/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Approved' })
      });
      fetchData();
      alert('Application Approved!');
    } catch (err) {
      alert('Error approving application');
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const client = Object.fromEntries(formData);
    
    try {
      await fetch(`${API_BASE}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
      });
      fetchData();
      setShowAddClient(false);
      alert('Client Added!');
    } catch (err) {
      alert('Error adding client');
    }
  };

  const processSettlement = async () => {
    const amt = parseFloat(paymentInput.amount);
    if (isNaN(amt) || amt <= 0) return alert('Enter a valid amount');
    
    const updatedStaff = {
      paid: settleStaff.paid + amt,
      balance: Math.max(0, settleStaff.balance - amt)
    };

    try {
      await fetch(`${API_BASE}/staff/${settleStaff._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStaff)
      });
      fetchData();
      setShowSettleModal(false);
      alert('Balance Settled!');
    } catch (err) {
      alert('Error settling balance');
    }
  };

  if (loading && activeTab === 'overview') {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--gold)' }}>Connecting to Backend...</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <DashboardLayout role="admin" userName="Admin" userRole="SUPERUSER" activeTab={activeTab} onTabChange={setActiveTab}>
      
      <div className="topbar">
        <div className="topbar-title">Admin <span>{activeTab.toUpperCase()}</span></div>
        <div className="topbar-date">Connected to MongoDB Compass</div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="content-area">
        
        {activeTab === 'overview' ? (
          <>
            <div className="stat-grid">
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Total Staff</div>
                <div className="stat-val">{staffData.length}</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Pending Applications</div>
                <div className="stat-val">{applications.filter(a => a.status === 'Pending').length}</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Total Clients</div>
                <div className="stat-val">{clients.length}</div>
              </motion.div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
              <motion.div variants={itemVariants}>
                <div className="sec-head">
                  <h3>New <em>Applications</em></h3>
                </div>
                <div className="tbl-wrap">
                  <table>
                    <thead><tr><th>Name</th><th>Role</th><th>Action</th></tr></thead>
                    <tbody>
                      {applications.filter(a => a.status === 'Pending').slice(0, 3).map(app => (
                        <tr key={app._id}>
                          <td>{app.firstName} {app.lastName}</td>
                          <td className="td-dim">{app.role}</td>
                          <td><button className="btn-gold btn-sm" onClick={() => handleApproveApp(app._id)}>Approve</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </>
        ) : activeTab === 'clients' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head">
              <h3>Client <em>Directory</em></h3>
              <button className="btn-gold btn-sm" onClick={() => setShowAddClient(!showAddClient)}>{showAddClient ? 'Cancel' : '+ Add Client'}</button>
            </div>

            {showAddClient && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="form-card" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleAddClient}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group"><label>Client Name</label><input name="name" required type="text" /></div>
                    <div className="form-group"><label>Contact Number</label><input name="phone" required type="text" /></div>
                    <div className="form-group"><label>Email</label><input name="email" required type="email" /></div>
                  </div>
                  <button type="submit" className="btn-gold" style={{ marginTop: '1rem' }}>Save to MongoDB</button>
                </form>
              </motion.div>
            )}

            <div className="tbl-wrap">
              <table>
                <thead><tr><th>Client Name</th><th>Contact Info</th><th>Total Spent</th><th>Action</th></tr></thead>
                <tbody>
                  {clients.map(c => (
                    <tr key={c._id}>
                      <td><span className="avatar">{c.name.substring(0,2).toUpperCase()}</span>{c.name}</td>
                      <td className="td-dim">{c.phone}</td>
                      <td style={{ color: 'var(--gold)' }}>₹{c.totalSpent}L</td>
                      <td><button className="btn-outline btn-sm">View Profile</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : activeTab === 'applications' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head"><h3>Staff <em>Applications</em></h3></div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>Applicant</th><th>Role</th><th>Phone</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app._id}>
                      <td>{app.firstName} {app.lastName}</td>
                      <td><span className="badge badge-new">{app.role}</span></td>
                      <td className="td-dim">{app.phone}</td>
                      <td><span className={`badge ${app.status === 'Approved' ? 'badge-ok' : 'badge-pend'}`}>{app.status}</span></td>
                      <td>
                        {app.status === 'Pending' && <button className="btn-gold btn-sm" onClick={() => handleApproveApp(app._id)}>Approve</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : activeTab === 'staff' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head"><h3>Staff <em>Directory</em></h3></div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>Member</th><th>Role</th><th>Paid</th><th>Balance</th><th>Action</th></tr></thead>
                <tbody>
                  {staffData.map(s => (
                    <tr key={s._id}>
                      <td>{s.name}</td>
                      <td className="td-dim">{s.role}</td>
                      <td style={{ color: 'var(--green-ok)' }}>₹{s.paid}</td>
                      <td style={{ color: 'var(--amber)' }}>₹{s.balance}</td>
                      <td><button className="btn-outline btn-sm" onClick={() => { setSettleStaff(s); setShowSettleModal(true); }}>Settle</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : null}

      </motion.div>

      {/* SETTLE MODAL */}
      <AnimatePresence>
        {showSettleModal && settleStaff && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="form-card" style={{ width: '90%', maxWidth: '450px', border: '1px solid var(--gold)' }}>
              <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Settle Balance</h3>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input type="number" onChange={e => setPaymentInput({...paymentInput, amount: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button className="btn-outline" style={{ flex: 1 }} onClick={() => setShowSettleModal(false)}>Cancel</button>
                <button className="btn-gold" style={{ flex: 1 }} onClick={processSettlement}>Confirm</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </DashboardLayout>
  );
};

export default AdminDashboard;
