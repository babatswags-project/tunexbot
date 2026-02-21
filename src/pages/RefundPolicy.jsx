import React from 'react';
import LegalPage from '../components/LegalPage';

const RefundPolicy = () => {
    return (
        <LegalPage title="Refund Policy">
            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>No Refunds Policy</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                At Tunexbot, we offer a fully functional <strong>Free Plan</strong> that allows you to test and experience our bot automation, proxy routing, and traffic generation software before making any financial commitment.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
                Because of this verifiable free tier, we maintain a strict <strong>No Refund</strong> policy for all paid subscriptions (Primary Pro and Secondary Pro).
            </p>

            <h4 className="outfit-font" style={{ color: 'white', fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Evaluation Period</h4>
            <p style={{ marginBottom: '1.5rem' }}>
                We highly encourage all users to utilize the Free Plan indefinitely to ensure our software meets your exact requirements, system technicalities, and performance expectations prior to upgrading. By purchasing a Pro tier, you acknowledge that you have sufficiently tested the application to your satisfaction.
            </p>

            <h4 className="outfit-font" style={{ color: 'white', fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Subscription Cancellations</h4>
            <p style={{ marginBottom: '1.5rem' }}>
                You may cancel your monthly subscription at any time. Your premium access will remain active until the end of your current billing cycle. Canceling a subscription does not trigger a refund for any time remaining in the billing cycle.
            </p>

            <h4 className="outfit-font" style={{ color: 'white', fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Exemptions</h4>
            <p style={{ marginBottom: '1.5rem' }}>
                The only exceptions made to this policy are in the event of documented fraudulent charges or severe system-wide outages exceeding 72 hours that solely impact our infrastructure (and not third-party platforms altering their algorithms).
            </p>
        </LegalPage>
    );
};

export default RefundPolicy;
