import React, { useState } from 'react';
import { ChevronRight, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { authService } from '../services/authService';
import { WHATSAPP_LINK } from '../config';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentUser = authService.getCurrentUser();

  return (
    <header className="glass-panel" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} onClick={() => setIsMobileMenuOpen(false)}>
          <img src={logo} alt="Tunexbot Logo" style={{ height: '36px', width: 'auto' }} />
          <span className="outfit-font text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Tunexbot
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', gap: '2rem' }} className="desktop-nav">
          <a href="/#features" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Features</a>
          <a href="/#pricing" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Pricing</a>
          <a href="/#faq" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>FAQ</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Support</a>
        </nav>

        {/* CTA */}
        <div style={{ display: 'none', alignItems: 'center', gap: '1rem' }} className="desktop-cta">
          {currentUser ? (
            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} /> Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>Log In</Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                Get Started <ChevronRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-btn" style={{ display: 'block', cursor: 'pointer', color: 'white' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: '100%',
          height: 'calc(100vh - 80px)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          background: 'rgba(7, 9, 15, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          overflowY: 'auto',
          zIndex: 990,
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <a href="/#features" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '1.5rem', fontWeight: 600, padding: '0.5rem 0' }}>Features</a>
          <a href="/#pricing" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '1.5rem', fontWeight: 600, padding: '0.5rem 0' }}>Pricing</a>
          <a href="/#faq" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '1.5rem', fontWeight: 600, padding: '0.5rem 0' }}>FAQ</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '1.5rem', fontWeight: 600, padding: '0.5rem 0' }}>Support</a>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem 0' }}></div>

          {currentUser ? (
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '1rem', fontSize: '1.25rem', marginTop: '1rem', gap: '0.5rem' }}>
              <User size={20} /> Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '1.5rem', fontWeight: 600, textAlign: 'center', padding: '0.5rem 0' }}>Log In</Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '1rem', fontSize: '1.25rem', marginTop: '1rem' }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}} />
    </header>
  );
};

export default Header;
