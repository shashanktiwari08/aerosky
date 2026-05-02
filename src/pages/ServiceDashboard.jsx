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
        <div className="topbar-title">My <span>{activeTab === 'support' ? 'Queries / Complaints' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span></div>
        <div className="topbar-date">
          <span style={{ color: 'var(--green-ok)' }}>●</span> Active & Approved
        </div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="content-area" style={{ position: 'relative' }}>
        
        {activeTab === 'overview' ? (
          <>
            <div className="stat-grid">
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Events Done</div>
                <div className="stat-val">12</div>
                <div className="stat-sub up">Total completed</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Upcoming Events</div>
                <div className="stat-val">2</div>
                <div className="stat-sub">Assigned to you</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Total Earned</div>
                <div className="stat-val">₹14.4K</div>
                <div className="stat-sub up">All time</div>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-label">Payment Pending</div>
                <div className="stat-val">₹1,200</div>
                <div className="stat-sub pend">1 event</div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} style={{ background: 'var(--green)', border: '1px solid var(--green-light)', padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '2px', color: '#a3b18a', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Next Assigned Event</div>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', color: '#fff', margin: '0 0 1rem 0', fontWeight: '400' }}>Sharma Wedding</h2>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem', color: '#d8f3dc' }}>
                  <span>Taj Hotel, New Delhi</span>
                  <span>Role: Waiter</span>
                  <span>Site Manager: Mr. Rajiv</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', color: 'var(--gold)' }}>
                <div style={{ fontSize: '4rem', fontFamily: '"Cormorant Garamond", serif', lineHeight: '1' }}>10</div>
                <div style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>May 2026</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="sec-head">
                <h3>My Upcoming <em>Events</em></h3>
                <button className="btn-outline btn-sm" onClick={() => setActiveTab('events')}>View All / Calendar</button>
              </div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Venue</th>
                      <th>Date</th>
                      <th>Role</th>
                      <th>Site Manager</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sharma Wedding</td>
                      <td className="td-dim">Taj Hotel, Delhi</td>
                      <td className="td-dim">10 May 2026</td>
                      <td>Waiter</td>
                      <td>Mr. Rajiv</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        ) : activeTab === 'events' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head">
              <h3>Event <em>Calendar</em></h3>
            </div>
            
            <div className="cal-wrap">
              <div className="cal-head">
                <div className="cal-nav"><button>◀ Prev</button></div>
                <div className="cal-month">May 2026</div>
                <div className="cal-nav"><button>Next ▶</button></div>
              </div>
              <div className="cal-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="cal-day-label">{day}</div>
                ))}
                
                {calendarDays.map((day, i) => (
                  <div 
                    key={i} 
                    className={`cal-cell ${day.other ? 'other' : ''} ${day.today ? 'today' : ''} ${day.hasEvent ? 'has-event' : ''}`}
                    onClick={() => {
                      if (day.hasEvent) {
                        setSelectedEventDate(day.num);
                      }
                    }}
                    style={{ cursor: day.hasEvent ? 'pointer' : 'default' }}
                  >
                    <div className="cal-num">{day.num}</div>
                    {day.hasEvent && <div className="cal-evt">{day.eventName}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="sec-head" style={{ marginTop: '3rem' }}>
              <h3>All <em>Assignments</em></h3>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Role</th>
                    <th>Site Manager</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sharma Wedding</td>
                    <td className="td-dim">Taj Hotel, Delhi</td>
                    <td className="td-dim">10 May 2026</td>
                    <td>Waiter</td>
                    <td>Mr. Rajiv</td>
                  </tr>
                  <tr>
                    <td>Annual Gala</td>
                    <td className="td-dim">ITC Grand, Delhi</td>
                    <td className="td-dim">24 May 2026</td>
                    <td>Waiter</td>
                    <td>Ms. Kavitha</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </motion.div>
        ) : activeTab === 'support' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head">
              <h3>Submit a <em>Query</em></h3>
            </div>
            <div className="form-card" style={{ maxWidth: '800px' }}>
              <p style={{ color: 'var(--wd)', marginBottom: '2rem' }}>
                If you have any issues regarding a past event, your scheduled shift, or delayed payments, please submit your complaint here. Our Admin team reviews these daily.
              </p>

              {querySubmitted ? (
                 <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid var(--green-ok)', color: 'var(--green-ok)', background: 'rgba(29, 158, 117, 0.1)' }}>
                   <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                   <h3 style={{ marginBottom: '1rem', color: 'var(--green-ok)' }}>Ticket Submitted</h3>
                   <p style={{ fontSize: '0.9rem', color: 'var(--wd)' }}>We have received your query and will contact you via WhatsApp shortly.</p>
                 </div>
              ) : (
                <form onSubmit={handleSupportSubmit}>
                  <div className="form-group">
                    <label>Related To</label>
                    <select required>
                      <option value="">Select Category...</option>
                      <option value="payment">Delayed / Incorrect Payment</option>
                      <option value="event">Event Assignment / Cancellation</option>
                      <option value="manager">Issue with Site Manager</option>
                      <option value="other">Other / General Query</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message Details</label>
                    <textarea 
                      required 
                      placeholder="Please describe your issue in detail..."
                      style={{ minHeight: '150px' }}
                    ></textarea>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <button type="submit" className="btn-gold">SUBMIT TICKET</button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        ) : activeTab === 'payments' ? (
          <motion.div variants={itemVariants}>
            <div className="sec-head">
              <h3>My <em>Payments History</em></h3>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date & Time Paid</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gupta Reception</td>
                    <td className="td-dim">18 Apr 2026, 10:45 AM</td>
                    <td style={{ color: 'var(--green-ok)' }}>₹1,200</td>
                    <td><span className="badge badge-ok">Paid</span></td>
                  </tr>
                  <tr>
                    <td>Verma Birthday</td>
                    <td className="td-dim">10 Apr 2026, 04:20 PM</td>
                    <td style={{ color: 'var(--green-ok)' }}>₹1,500</td>
                    <td><span className="badge badge-ok">Paid</span></td>
                  </tr>
                  <tr>
                    <td>TechCorp Event</td>
                    <td className="td-dim">03 Apr 2026, 09:15 AM</td>
                    <td style={{ color: 'var(--green-ok)' }}>₹900</td>
                    <td><span className="badge badge-ok">Paid</span></td>
                  </tr>
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

      {/* EVENT DETAILS MODAL */}
      <AnimatePresence>
        {selectedEventDate && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ background: 'var(--black2)', padding: '2rem', border: '1px solid var(--gold)', width: '90%', maxWidth: '600px' }}
            >
              {calendarDays.filter(d => d.num === selectedEventDate && d.hasEvent).map(day => (
                <div key={day.num}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <h3 style={{ color: 'var(--gold)', fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem' }}>{day.eventName}</h3>
                    <button className="btn-outline btn-sm" onClick={() => setSelectedEventDate(null)}>Close X</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                      <div style={{ marginBottom: '1.5rem' }}><strong style={{ color: 'var(--wd)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Client:</strong> <br/><span style={{ fontSize: '1.2rem' }}>{day.eventDetails.client}</span></div>
                      <div style={{ marginBottom: '1.5rem' }}><strong style={{ color: 'var(--wd)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Venue:</strong> <br/><span style={{ fontSize: '1.2rem' }}>{day.eventDetails.venue}</span></div>
                      <div style={{ marginBottom: '1.5rem' }}><strong style={{ color: 'var(--wd)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Date:</strong> <br/><span style={{ fontSize: '1.2rem' }}>{day.eventDetails.date}</span></div>
                    </div>
                    <div>
                      <div style={{ marginBottom: '1.5rem' }}><strong style={{ color: 'var(--wd)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Site Manager:</strong> <br/><span style={{ fontSize: '1.2rem', color: 'var(--green-ok)' }}>{day.eventDetails.manager}</span></div>
                      <div>
                        <strong style={{ color: 'var(--wd)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Assigned Staff:</strong>
                        <ul style={{ listStyle: 'none', marginTop: '0.5rem', padding: 0 }}>
                          {day.eventDetails.staff.map((s, idx) => (
                            <li key={idx} style={{ padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <span className="sb-icon" style={{ fontSize: '0.8rem', color: 'var(--gold)', marginRight: '0.5rem' }}>◎</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default ServiceDashboard;
