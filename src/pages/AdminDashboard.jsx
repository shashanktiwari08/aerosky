import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  // States for DB Data
  const [applications, setApplications] = useState([]);
  const [clients, setClients] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [events, setEvents] = useState([]);

  // Modal/Form States
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [settleStaff, setSettleStaff] = useState(null);
  const [paymentInput, setPaymentInput] = useState({ amount: '' });

  const API_BASE = 'https://aerosky-p80o.onrender.com/api';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appsRes, clientsRes, staffRes, eventsRes] = await Promise.all([
        fetch(`${API_BASE}/applications`),
        fetch(`${API_BASE}/clients`),
        fetch(`${API_BASE}/staff`),
        fetch(`${API_BASE}/events`)
      ]);
      
      const apps = await appsRes.json();
      const cls = await clientsRes.json();
      const stf = await staffRes.json();
      const evts = await eventsRes.json();

      setApplications(apps);
      setClients(cls);
      setStaffData(stf);
      setEvents(evts);
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

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const event = Object.fromEntries(formData);
    
    try {
      await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      fetchData();
      setShowAddEvent(false);
      alert('Event Scheduled!');
    } catch (err) {
      alert('Error scheduling event');
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
    return (
      <DashboardLayout role="admin" userName="Admin" userRole="SUPERUSER" activeTab={activeTab} onTabChange={setActiveTab}>
        <div className="luxury-loader-wrap">
          <div className="loader-diamond"></div>
          <div className="loader-text">Waking Up Cloud Server</div>
          <p style={{ color: 'var(--wd)', fontSize: '0.8rem', textAlign: 'center', maxWidth: '300px' }}>
            Please allow up to 50 seconds for the secure database to initialize...
          </p>
        </div>
      </DashboardLayout>
    );
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
        <div className="topbar-date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
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
                <div className="stat-label">Upcoming Events</div>
                <div className="stat-val">{events.length}</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Total Revenue</div>
                <div className="stat-val">₹{clients.reduce((acc, c) => acc + (c.totalSpent || 0), 0)}L</div>
              </motion.div>
            </div>

            <div className="stat-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <motion.div variants={itemVariants}>
                <div className="sec-head"><h3>Recent <em>Applications</em></h3></div>
                <div className="tbl-wrap">
                  <table>
                    <thead><tr><th>Name</th><th>Role</th><th>Action</th></tr></thead>
                    <tbody>
                      {applications.filter(a => a.status === 'Pending').slice(0, 3).map(app => (
                        <tr key={app._id}>
                          <td>{app.firstName}</td>
                          <td className="td-dim">{app.role}</td>
                          <td><button className="btn-gold btn-sm" onClick={() => handleApproveApp(app._id)}>Approve</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="sec-head"><h3>Next <em>Events</em></h3></div>
                <div className="tbl-wrap">
                  <table>
                    <thead><tr><th>Event</th><th>Date</th><th>Manager</th></tr></thead>
                    <tbody>
                      {events.slice(0, 3).map(evt => (
                        <tr key={evt._id}>
                          <td>{evt.name}</td>
                          <td className="td-dim">{evt.date}</td>
                          <td><span className="badge badge-ok">{evt.manager}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </>
        ) : activeTab === 'events' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head">
              <h3>Event <em>Schedule</em></h3>
              <button className="btn-gold btn-sm" onClick={() => setShowAddEvent(!showAddEvent)}>{showAddEvent ? 'Cancel' : '+ New Event'}</button>
            </div>

            {showAddEvent && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="form-card" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleAddEvent}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="form-group"><label>Event Name</label><input name="name" required type="text" /></div>
                    <div className="form-group"><label>Client</label><input name="client" required type="text" /></div>
                    <div className="form-group"><label>Date</label><input name="date" required type="date" /></div>
                    <div className="form-group"><label>Venue</label><input name="venue" required type="text" /></div>
                    <div className="form-group"><label>Site Manager</label><input name="manager" required type="text" /></div>
                  </div>
                  <button type="submit" className="btn-gold" style={{ marginTop: '1rem' }}>Create Event</button>
                </form>
              </motion.div>
            )}

            <div className="tbl-wrap">
              <table>
                <thead><tr><th>Event</th><th>Date</th><th>Venue</th><th>Manager</th><th>Status</th></tr></thead>
                <tbody>
                  {events.map(e => (
                    <tr key={e._id}>
                      <td><div style={{ fontWeight: 600 }}>{e.name}</div><div style={{ fontSize: '0.7rem', color: 'var(--wd)' }}>{e.client}</div></td>
                      <td className="td-dim">{e.date}</td>
                      <td className="td-dim">{e.venue}</td>
                      <td>{e.manager}</td>
                      <td><span className="badge badge-ok">{e.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : activeTab === 'clients' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head">
              <h3>Client <em>Directory</em></h3>
              <button className="btn-gold btn-sm" onClick={() => setShowAddClient(!showAddClient)}>{showAddClient ? 'Cancel' : '+ Add Client'}</button>
            </div>

            {showAddClient && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="form-card" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleAddClient}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="form-group"><label>Client Name</label><input name="name" required type="text" /></div>
                    <div className="form-group"><label>Contact Number</label><input name="phone" required type="text" /></div>
                    <div className="form-group"><label>Email</label><input name="email" required type="email" /></div>
                  </div>
                  <button type="submit" className="btn-gold" style={{ marginTop: '1rem' }}>Save Client</button>
                </form>
              </motion.div>
            )}

            <div className="tbl-wrap">
              <table>
                <thead><tr><th>Client</th><th>Contact</th><th>Revenue</th><th>Action</th></tr></thead>
                <tbody>
                  {clients.map(c => (
                    <tr key={c._id}>
                      <td><span className="avatar">{c.name.substring(0,2).toUpperCase()}</span>{c.name}</td>
                      <td className="td-dim">{c.phone}</td>
                      <td style={{ color: 'var(--gold)' }}>₹{c.totalSpent}L</td>
                      <td><button className="btn-outline btn-sm">View</button></td>
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
                      <td><span className="badge badge-ok">{app.role}</span></td>
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
        ) : activeTab === 'payments' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head"><h3>Financial <em>Overview</em></h3></div>
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label">Pending Payouts</div>
                <div className="stat-val">₹{staffData.reduce((acc, s) => acc + (s.balance || 0), 0)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Disbursed</div>
                <div className="stat-val">₹{staffData.reduce((acc, s) => acc + (s.paid || 0), 0)}</div>
              </div>
            </div>
          </motion.div>
        ) : null}

      </motion.div>

      {/* SETTLE MODAL */}
      <AnimatePresence>
        {showSettleModal && settleStaff && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', padding: '1rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="form-card" style={{ width: '100%', maxWidth: '400px' }}>
              <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Settle Balance: {settleStaff.name}</h3>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input type="number" value={paymentInput.amount} onChange={e => setPaymentInput({amount: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
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
