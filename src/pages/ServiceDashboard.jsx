import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const ServiceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const [selectedEventDate, setSelectedEventDate] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setQuerySubmitted(true);
  };

  // Generate basic mock calendar days
  const calendarDays = [];
  for (let i = 26; i <= 30; i++) calendarDays.push({ num: i, other: true }); 
  for (let i = 1; i <= 31; i++) {
    calendarDays.push({ 
      num: i, 
      today: i === 2, 
      hasEvent: i === 10 || i === 24, 
      eventName: i === 10 ? 'Sharma Wedding' : i === 24 ? 'Annual Gala' : null,
      eventDetails: i === 10 ? {
        client: 'Rahul Sharma',
        venue: 'Taj Hotel, Delhi',
        date: '10 May 2026',
        manager: 'Mr. Rajiv (+91 98765 11111)',
        staff: ['Rahul K (Waiter)', 'Amit M (Loader)', 'Priya S (Host)']
      } : i === 24 ? {
        client: 'TechCorp Pvt Ltd',
        venue: 'ITC Grand, Delhi',
        date: '24 May 2026',
        manager: 'Ms. Kavitha (+91 98765 22222)',
        staff: ['Rahul K (Waiter)', 'Sunita K (Host)', 'Rajesh (Loader)']
      } : null
    });
  }
  for (let i = 1; i <= 4; i++) calendarDays.push({ num: i, other: true }); 

  return (
    <DashboardLayout role="staff" userName="Rahul Kumar" userRole="WAITER" activeTab={activeTab} onTabChange={setActiveTab}>
      
      <div className="topbar">
        <div className="topbar-title">My <span>{activeTab === 'support' ? 'Queries' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span></div>
        <div className="topbar-date">
          <span style={{ color: 'var(--green-ok)' }}>●</span> Active & Approved
        </div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="content-area">
        
        {activeTab === 'overview' ? (
          <>
            <div className="stat-grid">
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Events Done</div>
                <div className="stat-val">12</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Upcoming</div>
                <div className="stat-val">2</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Total Earned</div>
                <div className="stat-val">₹14.4K</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Balance</div>
                <div className="stat-val">₹1,200</div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="form-card" style={{ background: 'var(--green)', borderColor: 'var(--green-light)', padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '2px', color: '#a3b18a', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Next Event</div>
                  <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', color: '#fff', margin: '0 0 1rem 0', fontWeight: '400' }}>Sharma Wedding</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.8rem', color: '#d8f3dc' }}>
                    <span>Taj Hotel, Delhi</span>
                    <span>Role: Waiter</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', color: 'var(--gold)' }}>
                  <div style={{ fontSize: '4rem', fontFamily: '"Cormorant Garamond", serif', lineHeight: '1' }}>10</div>
                  <div style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>May 2026</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="sec-head"><h3>Assignment <em>List</em></h3></div>
              <div className="tbl-wrap">
                <table>
                  <thead><tr><th>Event</th><th>Venue</th><th>Date</th></tr></thead>
                  <tbody>
                    <tr><td>Sharma Wedding</td><td className="td-dim">Taj Hotel</td><td className="td-dim">10 May</td></tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        ) : activeTab === 'events' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head"><h3>Event <em>Calendar</em></h3></div>
            <div className="cal-wrap">
              <div className="cal-head">
                <div className="cal-month">May 2026</div>
              </div>
              <div className="cal-grid">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                  <div key={day} className="cal-day-label">{day}</div>
                ))}
                {calendarDays.map((day, i) => (
                  <div key={i} className={`cal-cell ${day.other ? 'other' : ''} ${day.today ? 'today' : ''} ${day.hasEvent ? 'has-event' : ''}`}
                    onClick={() => day.hasEvent && setSelectedEventDate(day.num)}>
                    <div className="cal-num">{day.num}</div>
                    {day.hasEvent && <div className="cal-evt">EVT</div>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'support' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head"><h3>Submit <em>Query</em></h3></div>
            <div className="form-card">
              {querySubmitted ? (
                 <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--green-ok)' }}><h3>Submitted Successfully</h3></div>
              ) : (
                <form onSubmit={handleSupportSubmit}>
                  <div className="form-group"><label>Category</label><select required><option value="payment">Payment Issue</option><option value="event">Event Issue</option></select></div>
                  <div className="form-group"><label>Message</label><textarea required style={{ minHeight: '120px' }}></textarea></div>
                  <button type="submit" className="btn-gold" style={{ width: '100%' }}>SUBMIT</button>
                </form>
              )}
            </div>
          </motion.div>
        ) : activeTab === 'payments' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head"><h3>Payment <em>History</em></h3></div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>Event</th><th>Paid On</th><th>Amount</th></tr></thead>
                <tbody>
                  <tr><td>Gupta Reception</td><td className="td-dim">18 Apr 2026</td><td style={{ color: 'var(--green-ok)' }}>₹1,200</td></tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : null}
      </motion.div>

      <AnimatePresence>
        {selectedEventDate && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', padding: '1rem' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="form-card" style={{ width: '100%', maxWidth: '500px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--gold)' }}>Event Details</h3>
                <button onClick={() => setSelectedEventDate(null)} style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer' }}>X</button>
              </div>
              <p>Details for event on May {selectedEventDate} will appear here.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default ServiceDashboard;
