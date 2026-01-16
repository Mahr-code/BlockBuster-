import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import './Header.css';
import './Footer.css';

// Minimal App shell to demonstrate Header integration. Replace page placeholders with real pages later.

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<div style={{padding: '2rem'}}>Home (placeholder)</div>} />
            <Route path="/threads" element={<div style={{padding: '2rem'}}>Threads (placeholder)</div>} />
            <Route path="/jobs" element={<div style={{padding: '2rem'}}>Jobs (placeholder)</div>} />
            <Route path="/submit" element={<div style={{padding: '2rem'}}>Submit (placeholder)</div>} />
            <Route path="/login" element={<div style={{padding: '2rem'}}>Login (placeholder)</div>} />
            <Route path="/register" element={<div style={{padding: '2rem'}}>Register (placeholder)</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};export default App;
