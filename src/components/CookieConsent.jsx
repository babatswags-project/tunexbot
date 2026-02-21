import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('tunexbot_legal_consent');
        const tempHide = sessionStorage.getItem('tunexbot_legal_consent_temp_hide');
        if (!consent && !tempHide) {
            // Slight delay so it slides up after initial load
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('tunexbot_legal_consent', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        // Do NOT save to localStorage so it reappears on reload
        sessionStorage.setItem('tunexbot_legal_consent_temp_hide', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 2rem)',
            maxWidth: '800px',
            background: 'rgba(10, 12, 20, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(139, 92, 246, 0.1)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            animation: 'slideUp 0.5s ease-out forwards'
        }}>
            <style>
                {`
                    @keyframes slideUp {
                        from { transform: translate(-50%, 150%); opacity: 0; }
                        to { transform: translate(-50%, 0); opacity: 1; }
                    }
                `}
            </style>

            <div>
                <h4 className="outfit-font" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>
                    Legal & Privacy Consent
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0, marginBottom: '1rem' }}>
                    Please read our <Link to="/legal/terms" style={{ color: 'var(--neon-cyan)', textDecoration: 'underline' }}>Terms and Conditions</Link>, <Link to="/legal/privacy" style={{ color: 'var(--neon-cyan)', textDecoration: 'underline' }}>Privacy Policy</Link>, and <Link to="/legal/cookies" style={{ color: 'var(--neon-cyan)', textDecoration: 'underline' }}>Cookie Policy</Link>. By understanding these legal policies, you'll know exactly how we handle your data before you navigate the website or make a purchase.
                </p>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'white', fontSize: '0.95rem', userSelect: 'none' }}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--neon-violet)' }}
                    />
                    I have read and agree to the policies above.
                </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <button onClick={handleReject} className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '0.75rem 1.5rem' }}>
                    Decline
                </button>
                <button
                    onClick={handleAccept}
                    disabled={!isChecked}
                    style={{
                        padding: '0.75rem 2rem',
                        boxShadow: isChecked ? '0 0 15px rgba(139, 92, 246, 0.4)' : 'none',
                        opacity: isChecked ? 1 : 0.5,
                        cursor: isChecked ? 'pointer' : 'not-allowed',
                        border: 'none',
                        borderRadius: '999px',
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        fontWeight: 600,
                        fontFamily: 'Outfit, sans-serif'
                    }}>
                    I Accept & Understand
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
