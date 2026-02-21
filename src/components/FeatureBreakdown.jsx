import React from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Search, Bot } from 'lucide-react';

const FeatureBreakdown = () => {
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '900px' }}>

                <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-cyan)', marginBottom: '2rem', fontWeight: 500 }}>
                    <ArrowLeft size={16} /> Back to Home
                </a>

                <h1 className="outfit-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
                    In-Depth <span className="text-gradient">Feature Breakdown</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '4rem' }}>
                    Understand exactly how our bots function, their capabilities, and the difference between modes so you can maximize your traffic generation strategy.
                </p>

                {/* Any Mode vs XPath Mode */}
                <section style={{ marginBottom: '5rem' }}>
                    <h2 className="outfit-font" style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Bot className="text-gradient" size={32} /> Bot Targeting Modes
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
                        {/* XPath Mode */}
                        <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid var(--text-secondary)' }}>
                            <h3 className="outfit-font" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>XPath Mode</h3>
                            <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Available on all plans (including Free)</div>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                A highly specific, developer-centric mode. You must manually define exactly where the bot should click or interact by providing specific CSS Selectors or XPath coordinates from the webpage structure.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', color: 'var(--text-secondary)' }}><CheckCircle2 size={18} color="var(--neon-blue)" style={{ marginTop: '4px', flexShrink: 0 }} /> Best for static, unchanging websites</li>
                                <li style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', color: 'var(--text-secondary)' }}><CheckCircle2 size={18} color="var(--neon-blue)" style={{ marginTop: '4px', flexShrink: 0 }} /> Requires basic technical knowledge</li>
                                <li style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', color: 'var(--text-secondary)' }}><CheckCircle2 size={18} color="var(--neon-blue)" style={{ marginTop: '4px', flexShrink: 0 }} /> Exact, rigid execution</li>
                            </ul>
                        </div>

                        {/* Any Mode */}
                        <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid var(--neon-cyan)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--neon-cyan)', filter: 'blur(80px)', opacity: 0.2 }}></div>
                            <h3 className="outfit-font" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>"Any" Mode (Smart Function)</h3>
                            <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(6, 182, 212, 0.2)', borderRadius: '999px', fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--neon-cyan)', fontWeight: 600 }}>Pro Plans Only</div>
                            <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                Our smartest, most organic automation logic. Simply provide a search entry or tell the bot what to search for. Once activated, the bot will autonomously reason, browse the search results (or YouTube), and dynamically pick a link or video of its choice to click on.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                You control the parameters: simply give it a minimum and maximum duration to stay on the page. The bot does the rest, simulating highly realistic human browsing behavior that bypasses detection.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', color: 'var(--text-primary)' }}><Search size={18} color="var(--neon-cyan)" style={{ marginTop: '4px', flexShrink: 0 }} /> True autonomous browsing</li>
                                <li style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', color: 'var(--text-primary)' }}><Search size={18} color="var(--neon-cyan)" style={{ marginTop: '4px', flexShrink: 0 }} /> Maximum organic appearance for algorithms</li>
                                <li style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', color: 'var(--text-primary)' }}><Search size={18} color="var(--neon-cyan)" style={{ marginTop: '4px', flexShrink: 0 }} /> Zero technical setup required</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* YouTube Actions */}
                <section className="glass-panel" style={{ padding: '3rem', borderRadius: '24px' }}>
                    <h2 className="outfit-font" style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>
                        YouTube Engagement Restrictions
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                        To protect our proxy network infrastructure and ensure high-quality delivery for our premium customers, YouTube engagement actions (Like and Subscribe) are strictly gated by tier.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div>
                                <h4 style={{ color: 'white', fontSize: '1.125rem', marginBottom: '0.25rem' }}>Free Plan</h4>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Bots can watch videos to generate views.</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444', fontWeight: 500, background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                                <XCircle size={18} /> No Like / Subscribe
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                            <div>
                                <h4 style={{ color: 'white', fontSize: '1.125rem', marginBottom: '0.25rem' }}>Primary & Secondary Pro Plans</h4>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Full authorized engagement capabilities.</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-violet-light)', fontWeight: 500, background: 'rgba(139, 92, 246, 0.15)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                                <CheckCircle2 size={18} /> Full Like & Subscribe Enabled
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default FeatureBreakdown;
