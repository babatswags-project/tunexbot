import React from 'react';
import LegalPage from '../components/LegalPage';

const Terms = () => {
    return (
        <LegalPage title="Terms and Conditions">
            <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                By accessing and using TuNeXbot ("the Software"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Use License</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                Permission is granted to temporarily download one copy of the Software for personal or commercial automation use subject to your subscription tier restrictions. You may not:
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Modify, decompile, or reverse engineer the Software</li>
                <li>Bypass our proxy integration limits or exploit backend architecture</li>
                <li>Use the Software for any malicious DDoS or illegal activities</li>
            </ul>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Service Availability and Target Platforms</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                TuNeXbot automates browser actions. We do not provide proxies; users are responsible for integrating their own proxies. Furthermore, we do not guarantee permanent uptime on third-party platforms (such as YouTube or specific websites), as these platforms frequently update their anti-bot algorithms. Our team actively updates our evasion techniques, but service effectiveness may fluctuate.
            </p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Disclaimer</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                The materials on TuNeXbot's website and software are provided on an 'as is' basis. TuNeXbot makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability or non-infringement of intellectual property.
            </p>
        </LegalPage>
    );
};

export default Terms;
