import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ServiceDashboard from './pages/ServiceDashboard';
import ClientDashboard from './pages/ClientDashboard';

// Wrapper to conditionally render Navbar
const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard') || location.pathname.includes('admin');

  return (
    <>
      {!isDashboard && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/service-dashboard" element={<ServiceDashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
