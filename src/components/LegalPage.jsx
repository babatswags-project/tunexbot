import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ArrowLeft } from 'lucide-react';

const LegalPage = ({ title, children }) => {

    return (
        <>
            <Header />
            <main style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '4rem' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-cyan)', marginBottom: '2rem', fontWeight: 500 }}>
                        <ArrowLeft size={16} /> Back to Home
                    </a>
                    <h1 className="outfit-font text-gradient" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>
                        {title}
                    </h1>
                    <div className="glass-card" style={{ padding: '3rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default LegalPage;
