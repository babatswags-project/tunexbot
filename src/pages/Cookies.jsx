import React from 'react';
import LegalPage from '../components/LegalPage';

const Cookies = () => {
    return (
        <LegalPage title="Cookie Policy">
            <p style={{ marginBottom: '1.5rem' }}>
                This Cookie Policy explains how TuNeXbot uses cookies and similar technologies to recognize you when you visit our website.
            </p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>What are cookies?</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by online service providers in order to make their websites or services work, or to work more efficiently, as well as to provide reporting information.
            </p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>How we use them</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Application to operate, and we refer to these as "essential" or "strictly necessary" cookies. For instance, these cookies remember your Pro Plan login state.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
                We also use analytics cookies to understand how our site is being used, so we can optimize the landing pages and dashboard interface for better performance.
            </p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Controlling Cookies</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser. If you choose to reject cookies, you may still use our website though your access to some functionality (like staying logged into the cloud dashboard) may be restricted.
            </p>
        </LegalPage>
    );
};

export default Cookies;
