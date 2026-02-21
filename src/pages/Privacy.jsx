import React from 'react';
import LegalPage from '../components/LegalPage';

const Privacy = () => {
    return (
        <LegalPage title="Privacy Policy">
            <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

            <p style={{ marginBottom: '1.5rem' }}>
                Your privacy is important to us. It is TuNeXbot's policy to respect your privacy regarding any information we may collect from you across our website and application.
            </p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Local Data Storage & Free Plan</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                If you are operating on our <strong>Free Plan</strong>, your bot execution data, interaction histories, and target configurations are stored <strong>strictly locally</strong> on your machine. We do not transmit or store this operational data on our external servers.
            </p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Cloud Storage & Pro Plans</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                Upgrading to a <strong>Primary Pro</strong> or <strong>Secondary Pro</strong> plan enables secure cloud synchronization. In order to provide seamless automation across multiple devices and dedicated account management, we collect and store your bot configurations and execution metrics securely in our databases.
            </p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Proxy Usage Data</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                TuNeXbot does not supply network proxies. Users must provide their own proxies for the bot. To prevent abuse of the software mechanics, we monitor overall bandwidth consumption and generic target domains. We do not log specific session keys or injected payloads to ensure the privacy of your automation targets.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
                We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access.
            </p>
        </LegalPage>
    );
};

export default Privacy;
