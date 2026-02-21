import React, { useState } from 'react';
import { Check, Star, AlertCircle, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { WHATSAPP_LINK } from '../config';
import { authService } from '../services/authService';

const Pricing = () => {
    const navigate = useNavigate();
    const plans = [
        {
            name: 'Free Plan',
            price: '$0',
            period: 'forever',
            desc: 'Perfect for testing our service and small personal projects.',
            features: [
                'Up to 40 Bot Profiles',
                'Local PC Data Storage Only',
                'XPath Mode (Selectors/XPath only)',
                'Standard Platform Actions',
                'No YouTube Like/Subscribe'
            ],
            buttonText: 'Get Started Free',
            isPopular: false,
            color: 'var(--text-secondary)'
        },
        {
            name: 'Primary Pro',
            price: '$30',
            period: 'per month',
            desc: 'Ideal for growing websites and automated YouTube channels.',
            features: [
                'Up to 200 Bot Profiles',
                'Secure Cloud Data Storage',
                'Smart "Any" Function enabled',
                'Full YouTube Actions (Like/Sub)',
                'Custom Proxy Integration',
                'Priority Support'
            ],
            buttonText: 'Upgrade to Primary Pro',
            isPopular: true,
            color: 'var(--gradient-primary)'
        },
        {
            name: 'Secondary Pro',
            price: '$100',
            period: 'per month',
            desc: 'Uncapped potential for large-scale monetization and traffic empires.',
            features: [
                'Up to 1000 Bot Profiles',
                'Secure Cloud Data Storage',
                'Ultra-Fast Delivery',
                'Smart "Any" Function enabled',
                'Full YouTube Actions (Like/Sub)',
                'Unlimited Custom Proxy Support',
                'Dedicated Account Manager'
            ],
            buttonText: 'Go Secondary Pro',
            isPopular: false,
            color: 'var(--neon-cyan)'
        }
    ];

    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleUpgradeClick = (planName) => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            setShowLoginModal(true);
            return;
        }

        const currentPlan = currentUser.plan || 'Free Plan';

        if (currentPlan === 'Secondary Pro') {
            navigate('/dashboard');
        } else if (currentPlan === 'Primary Pro') {
            if (planName === 'Primary Pro') {
                navigate('/dashboard');
            } else {
                navigate('/dashboard', { state: { showUpgradeModal: true } });
            }
        } else {
            navigate('/dashboard', { state: { showUpgradeModal: true } });
        }
    };

    return (
        <section id="pricing" className="section" style={{ position: 'relative', background: 'rgba(0,0,0,0.2)' }}>
            <div className="container">

                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 className="outfit-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
                        Simple, Transparent <span className="text-gradient">Pricing</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                        Choose the plan that fits your growth. Upgrade, downgrade, or cancel anytime.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem', alignItems: 'center' }}>
                    {plans.map((plan, i) => (
                        <div key={i} className="glass-card" style={{
                            padding: '3rem 2rem',
                            position: 'relative',
                            transform: plan.isPopular ? 'scale(1.05)' : 'scale(1)',
                            borderColor: plan.isPopular ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 255, 255, 0.05)',
                            boxShadow: plan.isPopular ? '0 0 40px rgba(139, 92, 246, 0.2)' : 'none',
                            zIndex: plan.isPopular ? 10 : 1
                        }}>

                            {plan.isPopular && (
                                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gradient-primary)', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: '0 4px 10px rgba(139, 92, 246, 0.4)' }}>
                                    <Star size={14} fill="white" /> Most Popular
                                </div>
                            )}

                            <h3 className="outfit-font" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>{plan.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', minHeight: '40px' }}>{plan.desc}</p>

                            <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                                <span className="outfit-font" style={{ fontSize: '3rem', fontWeight: 800, color: 'white' }}>{plan.price}</span>
                                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>/{plan.period}</span>
                            </div>

                            {plan.price === '$0' ? (
                                <Link to="/signup" className="btn btn-outline" style={{ width: '100%', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                                    {plan.buttonText}
                                </Link>
                            ) : (
                                <button onClick={() => handleUpgradeClick(plan.name)} className={plan.isPopular ? "btn btn-primary" : "btn btn-outline"} style={{ width: '100%', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
                                    {plan.buttonText}
                                </button>
                            )}

                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                                        <div style={{ background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', padding: '0.25rem', color: plan.isPopular ? 'var(--neon-violet-light)' : 'var(--text-secondary)' }}>
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1rem' }}>
                        Need a more detailed comparison of what each function means (XPath Mode, "Any" Function, YouTube Actions)?
                    </p>
                    <Link to="/features/breakdown" className="btn btn-outline" style={{ display: 'inline-block', padding: '0.75rem 2rem', fontSize: '1rem' }}>
                        View In-Depth Feature Breakdown
                    </Link>
                </div>

            </div>


            {/* Login Required Modal */}
            {showLoginModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
                    background: 'rgba(5, 7, 12, 0.8)', backdropFilter: 'blur(10px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '1rem'
                }}>
                    <div style={{
                        background: 'rgba(15, 20, 30, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '16px', padding: '2.5rem', maxWidth: '450px', width: '100%',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)', animation: 'fadeInScale 0.3s ease-out forwards', textAlign: 'center'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--neon-violet-light)' }}>
                            <User size={48} />
                        </div>
                        <h3 className="outfit-font" style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1rem 0', color: 'white' }}>Account Required</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                            Please log in or create a free account before upgrading your plan. This ensures your premium subscription is securely linked to your bot dashboard.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <button onClick={() => setShowLoginModal(false)} className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', flex: 1, minWidth: '100px' }}>
                                Cancel
                            </button>
                            <Link to="/login" className="btn btn-outline" style={{ flex: 1.5, display: 'flex', justifyContent: 'center', minWidth: '120px' }}>
                                Log In
                            </Link>
                            <Link to="/signup" className="btn btn-primary" style={{ flex: 1.5, display: 'flex', justifyContent: 'center', minWidth: '120px' }}>
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Pricing;
