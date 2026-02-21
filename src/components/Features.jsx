import React from 'react';
import { Eye, DollarSign, TrendingUp, Zap, Server, Shield } from 'lucide-react';

const Features = () => {
    const customFeatures = [
        {
            icon: <TrendingUp className="text-gradient" size={32} color="#06B6D4" />,
            title: 'Website Traffic Automation',
            desc: 'Drive massive, high-quality traffic to any website to increase visibility, lower bounce rates, and improve SEO ranking.'
        },
        {
            icon: <DollarSign className="text-gradient" size={32} color="#3B82F6" />,
            title: 'Monetized Site Growth',
            desc: 'Safely send visitors to your ads-enabled or monetized sites to skyrocket your daily earnings and revenue streams.'
        },
        {
            icon: <Eye className="text-gradient" size={32} color="#8B5CF6" />,
            title: 'YouTube View Boosting',
            desc: 'Generate thousands of organic-looking views on your YouTube videos to trigger algorithms and hit monetization goals.'
        },
        {
            icon: <Zap className="text-gradient" size={32} color="#F59E0B" />,
            title: 'Instant Delivery',
            desc: 'Our distributed bot network starts working the moment you launch your campaign. Notice results in minutes.'
        },
        {
            icon: <Server className="text-gradient" size={32} color="#EC4899" />,
            title: 'Full Proxy Support',
            desc: 'Integrate seamlessly with your own residential or private proxies to ensure all traffic is diverse, global, and undetectable.'
        },
        {
            icon: <Shield className="text-gradient" size={32} color="#10B981" />,
            title: 'Anti-Ban Protection',
            desc: 'Advanced human-emulation algorithms bypass captchas and strict platform firewalls to keep your assets completely safe.'
        }
    ];

    return (
        <section id="features" className="section" style={{ position: 'relative' }}>
            <div className="container">

                <div style={{ textAlign: 'center', marginBottom: '5rem', maxWidth: '700px', margin: '0 auto 5rem auto' }}>
                    <h2 className="outfit-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
                        Unleash the Power of <br />
                        <span className="text-gradient-cyan">Intelligent Bots</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                        TuNeXbot uses state-of-the-art browser automation to simulate real human behavior, ensuring every hit counts towards your success.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
                    {customFeatures.map((f, i) => (
                        <div key={i} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden', group: 'hover' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', marginBottom: '1rem' }}>
                                {f.icon}
                            </div>
                            <h3 className="outfit-font" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{f.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>

                            {/* Subtle hover glow layer */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.1), transparent 70%)', opacity: 0, transition: 'opacity 0.3s' }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '0'}>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Features;
