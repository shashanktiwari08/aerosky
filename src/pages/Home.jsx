import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const { scrollY } = useScroll();
  
  // Transform values based on scroll
  const bgColor = useTransform(scrollY, [0, 500], ["#FAF8F2", "#0D0D0D"]); // White to Black
  const textColor = useTransform(scrollY, [0, 400], ["#0D0D0D", "#FAF8F2"]); // Black to White

  const [bookingData, setBookingData] = useState({
    name: '',
    event: '',
    date: '',
    description: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const message = `Hello Aerosky Hospitality! %0A%0A*Booking Inquiry*%0AName: ${bookingData.name}%0AEvent: ${bookingData.event}%0ADate: ${bookingData.date}%0ADescription: ${bookingData.description}`;
    const whatsappUrl = `https://wa.me/919811339509?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // ALL IMAGES INCLUDING THE NEW ONE
  const allImages = [
    "/images/IMG_20230215_200207.jpg", // Newest Image
    "/images/IMG-20211122-WA0057.jpg",
    "/images/IMG-20220914-WA0076.jpg",
    "/images/IMG-20220914-WA0081.jpg",
    "/images/IMG-20220914-WA0094.jpg",
    "/images/IMG-20220914-WA0100.jpg",
    "/images/IMG-20221105-WA0045.jpg",
    "/images/IMG-20221105-WA0051.jpg",
    "/images/IMG-20221105-WA0056.jpg",
    "/images/IMG-20221111-WA0008.jpg",
    "/images/IMG-20221208-WA0023.jpg",
    "/images/IMG-20221210-WA0058.jpg",
    "/images/IMG-20221210-WA0059.jpg",
    "/images/IMG-20221210-WA0060.jpg",
    "/images/IMG_20211120_180438.jpg",
    "/images/IMG_20220916_185534.jpg",
    "/images/IMG_20220916_191134.jpg",
    "/images/IMG_20221015_175356.jpg",
    "/images/IMG_20221015_181019.jpg",
    "/images/IMG_20221015_181030.jpg",
    "/images/IMG_20221015_181038.jpg"
  ];

  const services = [
    {
      title: "Corporate Events",
      text: "Seamless execution for professional gatherings and large-scale summits.",
      img: "/images/IMG-20221105-WA0051.jpg"
    },
    {
      title: "Grand Weddings",
      text: "Making your special day unforgettable with premium decor and management.",
      img: "/images/IMG-20220914-WA0081.jpg"
    },
    {
      title: "Premium Catering",
      text: "Curated culinary experiences featuring world-class chefs and themes.",
      img: "/images/IMG-20221210-WA0060.jpg"
    }
  ];

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      style={{ backgroundColor: bgColor }}
    >
      
      {/* Structural Hero Section */}
      <section className="hero-wrapper" style={{ minHeight: '90vh', background: 'var(--white)', transition: 'background 0.8s ease' }}>
        <motion.div variants={itemVariants} className="hero-content" style={{ marginTop: '2rem', zIndex: 10 }}>
          
          <div style={{ marginBottom: '3rem' }}>
            <img 
              src="/update2026.jpeg" 
              alt="Aerosky Logo" 
              style={{ 
                maxWidth: '450px', 
                width: '95%'
              }} 
            />
          </div>

          <motion.h1 style={{ marginBottom: '1.5rem', fontSize: '5rem', color: 'var(--black)', fontWeight: '400' }}>
            Luxury <span className="text-gold text-italic">Defined.</span><br/>
            Memories Created.
          </motion.h1>
          
          <motion.p style={{ 
            color: '#444', 
            fontSize: '1.2rem', 
            maxWidth: '750px', 
            margin: '0 auto 3rem auto', 
            letterSpacing: '2px', 
            lineHeight: '1.8', 
            opacity: 0.9 
          }}>
            Since 2001, Aerosky Hospitality has set the gold standard in premium catering, sophisticated decor, and flawless event management.
          </motion.p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn-gold" style={{ padding: '1rem 2.5rem', background: 'var(--black)', color: 'var(--gold)' }}>CLIENT PORTAL</Link>
            <Link to="/apply" className="btn-outline" style={{ padding: '1rem 2.5rem', borderColor: 'var(--black)', color: 'var(--black)' }}>JOIN OUR TEAM</Link>
          </div>
        </motion.div>
      </section>

      {/* Services Section with Video Textured Background Overlay */}
      <section className="video-bg-container" style={{ padding: '8rem 0' }}>
        <video className="video-bg-element" autoPlay muted loop playsInline>
          <source src="/images/VID-20211025-WA0090.mp4" type="video/mp4" />
        </video>
        <div className="video-mesh-overlay"></div>
        <div className="video-gradient-overlay"></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="sec-head" style={{ justifyContent: 'center', marginBottom: '5rem', flexDirection: 'column', textAlign: 'center' }}>
            <p style={{ color: 'var(--gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>Excellence in Every Detail</p>
            <h3 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', color: 'var(--white)' }}>Our <em>Signature</em> Services</h3>
          </div>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {services.map((s, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }} 
                className="service-card-img" 
                style={{ backgroundImage: `url(${s.img})` }}
              >
                <div className="card-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.title}</div>
                <p className="card-text" style={{ color: 'var(--white)', opacity: 0.8 }}>{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '6rem 2rem' }}>
        
        {/* About Section */}
        <motion.section id="about" variants={itemVariants} className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', marginBottom: '10rem', alignItems: 'center' }}>
          <motion.div style={{ color: textColor }}>
            <p style={{ color: 'var(--gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '1rem' }}>Our Legacy</p>
            <h2 style={{ marginBottom: '2rem', fontSize: '3.5rem' }}>25+ Years of <em className="text-gold">Grandeur</em></h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.9' }}>
              Founded in 2001, Aerosky Hospitality has evolved into a premier institution under the visionary leadership of Mr. Diwakar Tiwari. 
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="card" 
            style={{ 
              background: 'var(--wf)', 
              border: '1px solid var(--borderl)', 
              padding: '4rem',
              textAlign: 'center'
            }}
          >
            <div style={{ color: 'var(--gold)', marginBottom: '1.5rem', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '500' }}>Founder & Visionary</div>
            <motion.h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: textColor }}>Mr. Diwakar Tiwari</motion.h2>
            <div style={{ width: '60px', height: '2px', background: 'var(--gold)', margin: '0 auto 2.5rem auto' }}></div>
            <motion.p style={{ color: textColor, fontSize: '1.4rem', marginBottom: '2.5rem', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif', lineHeight: '1.6' }}>
              "True hospitality is about making people feel seen, heard, and celebrated."
            </motion.p>
            <Link to="/apply" className="btn-outline btn-sm">Read Full Story</Link>
          </motion.div>
        </motion.section>

        {/* EXPANSIVE GALLERY SECTION (USING ALL IMAGES) */}
        <motion.section id="work" variants={itemVariants} style={{ marginBottom: '10rem' }}>
          <div className="sec-head" style={{ justifyContent: 'center', marginBottom: '5rem', flexDirection: 'column', textAlign: 'center' }}>
            <p style={{ color: 'var(--gold)', letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>Glimpses of Excellence</p>
            <h3 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', color: 'var(--gold)' }}>Our <em>Journey</em> in Frames</h3>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1rem',
            padding: '1rem',
            background: 'var(--black2)',
            borderRadius: '15px',
            border: '1px solid var(--borderl)'
          }}>
            {allImages.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  height: '350px', 
                  overflow: 'hidden', 
                  borderRadius: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
              >
                <img 
                  src={img} 
                  alt={`Event ${i}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section id="contact" variants={itemVariants} style={{ marginBottom: '4rem' }}>
          <div className="sec-head" style={{ justifyContent: 'center', marginBottom: '5rem', flexDirection: 'column', textAlign: 'center' }}>
            <motion.h3 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', color: textColor }}>Plan Your <em>Masterpiece</em></motion.h3>
            <p style={{ color: 'var(--gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Connect With Us</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem' }}>
            <div className="form-card" style={{ padding: '3rem', background: 'var(--wf)' }}>
              <h4 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginBottom: '2rem', fontFamily: '"Cormorant Garamond", serif' }}>Direct Booking Inquiry</h4>
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" required placeholder="Enter your name" value={bookingData.name} onChange={e => setBookingData({...bookingData, name: e.target.value})} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Event Type</label>
                    <input type="text" required placeholder="e.g. Wedding" value={bookingData.event} onChange={e => setBookingData({...bookingData, event: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input type="date" required value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Event Description</label>
                  <textarea required placeholder="Briefly describe your vision..." style={{ minHeight: '100px' }} value={bookingData.description} onChange={e => setBookingData({...bookingData, description: e.target.value})}></textarea>
                </div>
                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '1rem' }}>SEND WHATSAPP INQUIRY</button>
              </form>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="card" style={{ textAlign: 'center', flex: 1, padding: '3rem 2rem', background: 'var(--wf)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '1.5rem', opacity: 0.8 }}>📸</div>
                <h4 style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: '500' }}>Instagram Official</h4>
                <div style={{ height: '1px', width: '40px', background: 'var(--borderl)', marginBottom: '1.5rem' }}></div>
                <a 
                  href="https://www.instagram.com/hospitality.aerosky?igsh=MWtrYzFraDNzcXVxdQ%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ justifyContent: 'center', fontSize: '1rem', letterSpacing: '2px', fontWeight: '600', border: '1px solid var(--borderl)', padding: '0.8rem 1.5rem', color: textColor }}
                >
                  FOLLOW @HOSPITALITY.AEROSKY
                </a>
              </div>
              <div className="card" style={{ textAlign: 'center', flex: 1, padding: '3rem 2rem', background: 'var(--wf)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '1.5rem', opacity: 0.8 }}>✉️</div>
                <h4 style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: '500' }}>Contact Support</h4>
                <div style={{ height: '1px', width: '40px', background: 'var(--borderl)', marginBottom: '1.5rem' }}></div>
                <p style={{ fontSize: '1.8rem', color: 'var(--gold)', fontWeight: '300', fontFamily: '"Cormorant Garamond", serif', letterSpacing: '1px' }}>+91 98113 39509</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--wd)', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '0.5rem' }}>Available for Inquiries</p>
              </div>
            </div>
          </div>
        </motion.section>

      </div>

      <footer style={{ textAlign: 'center', padding: '6rem 0', background: 'var(--black2)', borderTop: '1px solid var(--border)' }}>
        <h4 style={{ 
          color: 'var(--gold)', 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          letterSpacing: '5px', 
          textTransform: 'uppercase', 
          marginBottom: '2rem' 
        }}>
          AEROSKY HOSPITALITY
        </h4>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <a href="#about" style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '2px' }}>ABOUT</a>
          <a href="#work" style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '2px' }}>GALLERY</a>
          <a href="#contact" style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '2px' }}>CONTACT</a>
        </div>
        <p style={{ color: 'var(--wd)', fontSize: '0.65rem', letterSpacing: '3px' }}>
          © 2026 AEROSKY HOSPITALITY. CRAFTING LUXURY SINCE 2001.
        </p>
      </footer>

    </motion.div>
  );
};

export default Home;
