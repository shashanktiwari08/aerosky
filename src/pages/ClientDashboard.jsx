import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [mustsList, setMustsList] = useState([]);
  const [mustInput, setMustInput] = useState('');

  // Load mock state from localStorage
  useEffect(() => {
    const status = localStorage.getItem('clientPaymentStatus');
    if (status) setPaymentStatus(status);
    
    const musts = JSON.parse(localStorage.getItem('clientMustsList') || '[]');
    setMustsList(musts);
  }, [activeTab]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('clientPaymentStatus', 'pending');
    setPaymentStatus('pending');
    alert('Payment proof submitted successfully! Awaiting Admin approval.');
  };

  const handleMustSubmit = (e) => {
    e.preventDefault();
    const newMust = {
      id: Date.now(),
      text: mustInput,
      timestamp: new Date().toLocaleString()
    };
    const updatedMusts = [...mustsList, newMust];
    localStorage.setItem('clientMustsList', JSON.stringify(updatedMusts));
    setMustsList(updatedMusts);
    setMustInput('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const totalAmount = 500000;
  const advancePaid = paymentStatus === 'approved' ? 250000 : 150000;
  const remaining = totalAmount - advancePaid;

  return (
    <DashboardLayout role="client" userName="Rahul Sharma" userRole="CLIENT" activeTab={activeTab} onTabChange={setActiveTab}>
      
      <div className="topbar">
        <div className="topbar-title">Client <span>{activeTab === 'must' ? 'Non-Negotiables' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span></div>
        <div className="topbar-date">
          <span style={{ color: 'var(--green-ok)' }}>●</span> Confirmed Event
        </div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="content-area">
        
        {activeTab === 'overview' ? (
          <>
            <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Total Amount</div>
                <div className="stat-val">₹5,00,000</div>
                <div className="stat-sub">Grand Wedding Reception</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Advance Paid</div>
                <div className="stat-val" style={{ color: 'var(--green-ok)' }}>₹{advancePaid.toLocaleString()}</div>
                <div className="stat-sub up">Received & Confirmed</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Amount Remaining</div>
                <div className="stat-val" style={{ color: 'var(--red)' }}>₹{remaining.toLocaleString()}</div>
                <div className="stat-sub pend">Due before May 10</div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} style={{ background: 'var(--green)', border: '1px solid var(--green-light)', padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', color: '#fff', margin: '0 0 1.5rem 0', fontWeight: '400' }}>Grand Wedding Reception</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', color: '#d8f3dc' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#a3b18a' }}>DATE</span>
                  <span style={{ fontSize: '1.2rem', color: '#fff' }}>15 May 2026</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#a3b18a' }}>VENUE</span>
                  <span style={{ fontSize: '1.2rem', color: '#fff' }}>Taj Hotel, Mumbai</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#a3b18a' }}>SITE MANAGER</span>
                  <span style={{ fontSize: '1.2rem', color: '#fff' }}>Mr. Rajesh Kumar</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#a3b18a' }}>CONTACT</span>
                  <span style={{ fontSize: '1.2rem', color: '#fff' }}>+91 98765 12345</span>
                </div>
              </div>
            </motion.div>
          </>
        ) : activeTab === 'must' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head">
              <h3>The <em>Musts</em></h3>
            </div>
            <div className="form-card" style={{ marginBottom: '2rem', background: 'rgba(201, 168, 76, 0.05)', borderColor: 'var(--gold)' }}>
              <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: '1.2rem', fontFamily: '"Cormorant Garamond", serif' }}>What We Can Never Compromise On</h4>
              <p style={{ color: 'var(--white)', lineHeight: '1.8' }}>
                At Aerosky Hospitality, we understand that every client has distinct priorities. 
                This section is dedicated to your absolute <strong>Non-Negotiables</strong>. 
                Whether it is the exact temperature of the welcome drinks, the strict timing of the bride's entry, or specific VIP handling instructions—tell us what matters most to you. We guarantee that these "Musts" will be the foundation of our event execution.
              </p>
            </div>

            {mustsList.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Your Recorded Requirements</h4>
                {mustsList.map((must) => (
                  <div key={must.id} className="form-card" style={{ marginBottom: '1rem', borderColor: 'var(--green-ok)', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--green-ok)', fontWeight: '500', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Requirement #{must.id.toString().slice(-4)}</span>
                      <span className="td-dim" style={{ fontSize: '0.75rem' }}>{must.timestamp}</span>
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', color: 'var(--white)', lineHeight: '1.6' }}>
                      {must.text}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="form-card">
              <h4 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Add New Requirement</h4>
              <form onSubmit={handleMustSubmit}>
                <div className="form-group">
                  <label>Describe Your Non-Negotiable</label>
                  <textarea 
                    required 
                    value={mustInput}
                    onChange={(e) => setMustInput(e.target.value)}
                    placeholder="e.g. The floral arrangement MUST use fresh orchids only."
                    style={{ minHeight: '120px' }}
                  ></textarea>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn-gold" style={{ padding: '0.8rem 2rem' }}>Save & Lock Requirement</button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : activeTab === 'payments' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head">
              <h3>Make a <em>Payment</em></h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="form-card">
                <h4 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1.2rem', fontFamily: '"Cormorant Garamond", serif' }}>Submit Payment Details</h4>
                
                {paymentStatus === 'pending' ? (
                  <div style={{ textAlign: 'center', padding: '2rem', border: '1px dashed var(--amber)', color: 'var(--amber)' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--amber)' }}>Payment Under Review</h3>
                    <p style={{ fontSize: '0.9rem' }}>You have submitted a payment proof. It is currently awaiting Admin approval.</p>
                  </div>
                ) : paymentStatus === 'approved' ? (
                  <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid var(--green-ok)', color: 'var(--green-ok)', background: 'rgba(29, 158, 117, 0.1)' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--green-ok)' }}>Payment Complete</h3>
                    <p style={{ fontSize: '0.9rem' }}>Your recent payment of ₹1,00,000 has been approved by the Admin.</p>
                  </div>
                ) : (
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="form-group">
                      <label>Amount to Pay (₹)</label>
                      <input type="number" required defaultValue="100000" />
                    </div>
                    
                    <div className="form-group">
                      <label>Payment Method</label>
                      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                        <option value="online">Online / UPI Transfer</option>
                        <option value="cash">Cash Payment (To Manager)</option>
                        <option value="cheque">Bank Cheque</option>
                      </select>
                    </div>

                    {paymentMethod === 'online' && (
                      <div className="form-group">
                        <label>Upload Payment Screenshot</label>
                        <div style={{ border: '1px dashed var(--border)', textAlign: 'center', padding: '2rem', background: 'transparent' }}>
                          <input type="file" id="screenshot" style={{ display: 'none' }} required />
                          <label htmlFor="screenshot" style={{ cursor: 'pointer', color: 'var(--wd)' }}>
                            <span style={{ display: 'block', fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.5rem', lineHeight: '1' }}>+</span>
                            Attach Screenshot
                          </label>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'cheque' && (
                      <div className="form-group">
                        <label>Cheque Number</label>
                        <input type="text" required placeholder="Enter Cheque No." />
                      </div>
                    )}

                    <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '1rem' }}>Submit Payment Details</button>
                  </form>
                )}
              </div>

              <div>
                <div className="tbl-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Transaction History</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentStatus === 'approved' && (
                        <tr>
                          <td>Latest Payment<br/><span className="td-dim" style={{fontSize: '0.7rem'}}>Just Now</span></td>
                          <td>₹1,00,000</td>
                          <td><span className="badge badge-ok">Confirmed</span></td>
                        </tr>
                      )}
                      {paymentStatus === 'pending' && (
                        <tr>
                          <td>Pending Submission<br/><span className="td-dim" style={{fontSize: '0.7rem'}}>Just Now</span></td>
                          <td>₹1,00,000</td>
                          <td><span className="badge badge-pend">Pending</span></td>
                        </tr>
                      )}
                      <tr>
                        <td>Initial Booking Advance<br/><span className="td-dim" style={{fontSize: '0.7rem'}}>01 Mar 2026</span></td>
                        <td>₹1,50,000</td>
                        <td><span className="badge badge-ok">Confirmed</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'staff' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head">
              <h3>Assigned <em>Staff</em></h3>
              <button className="btn-outline btn-sm">Download List</button>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{width: '25%'}}>Staff ID</th>
                    <th style={{width: '35%'}}>Name</th>
                    <th style={{width: '20%'}}>Role</th>
                    <th style={{width: '20%'}}>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i}>
                      <td><span className="badge badge-ok" style={{ background: 'var(--gold-dim)', color: 'var(--gold)', borderColor: 'var(--border)' }}>STAFF-00{i}</span></td>
                      <td>
                        <span className="avatar">S{i}</span>
                        Staff Member {i}
                      </td>
                      <td className="td-dim">{i === 1 ? 'Site Supervisor' : i % 2 === 0 ? 'Loader' : 'Waiter'}</td>
                      <td className="td-dim">+91 90000 1111{i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '3rem', color: 'var(--gold)' }}>🛠️</div>
            <h2>{activeTab.toUpperCase()} <em>Module</em></h2>
            <p className="td-dim">This section is currently under construction in the mock layout.</p>
            <button className="btn-gold mt-1" onClick={() => setActiveTab('overview')}>Back to Overview</button>
          </motion.div>
        )}

      </motion.div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
