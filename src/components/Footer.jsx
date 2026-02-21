import React from 'react';
import logo from '../assets/logo.svg';
import { WHATSAPP_LINK } from '../config';

const Footer = () => {
    return (
        <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: '#030509', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div className="container">

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={logo} alt="TuNeXbot Logo" style={{ height: '36px', width: 'auto' }} />
                            <span className="outfit-font text-gradient" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                                TuNeXbot
                            </span>
                        </a>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '280px' }}>
                            Automating digital growth. Generate traffic, views, and revenue effortlessly with our premium bot systems.
                        </p>
                    </div>

                    <div>
                        <h4 className="outfit-font" style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', marginBottom: '1.25rem' }}>Product</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="/#features" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Features</a></li>
                            <li><a href="/#pricing" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Pricing</a></li>
                            <li><a href="/#faq" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>FAQ</a></li>
                            <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Contact Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="outfit-font" style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', marginBottom: '1.25rem' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="/legal/terms" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Terms of Service</a></li>
                            <li><a href="/legal/privacy" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Privacy Policy</a></li>
                            <li><a href="/legal/cookies" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Cookie Policy</a></li>
                            <li><a href="/legal/refund" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Refund Policy</a></li>
                        </ul>
                    </div>

                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'center', width: '100%' }}>
                        &copy; 2026 TuNeXbot. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
