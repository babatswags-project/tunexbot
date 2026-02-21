import React from 'react';
import { Youtube, Globe2, ArrowUpRight } from 'lucide-react';

const CaseStudies = () => {
    return (
        <section id="case-studies" className="section" style={{ position: 'relative', background: 'rgba(255,255,255,0.02)' }}>
            <div className="container">

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="outfit-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
                        Success <span className="text-gradient-pink">Stories</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                        See how creators and webmasters are leveraging TuNeXbot to overcome the algorithm and kickstart their revenue.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>

                    {/* Case Study 1: YouTube */}
                    <div className="glass-card" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', background: 'rgba(236, 72, 153, 0.1)', borderBottomLeftRadius: '16px' }}>
                            <Youtube color="var(--neon-pink)" size={24} />
                        </div>

                        <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            YouTube Monetization
                        </div>

                        <h3 className="outfit-font" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
                            From Low Views to Partner Program
                        </h3>

                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                            "I was creating high-quality gaming content, but the algorithm wasn't picking it up. I was stuck at 50 views a video. By integrating TuNeXbot on the Primary Pro plan with my own proxies, I generated enough organic-looking initial traction to trigger YouTube's recommended feed. I hit my 4,000 watch hours in three weeks and got monetized."
                        </p>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neon-pink)', fontFamily: 'Outfit' }}>+4,500%</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Watch Time Increase</div>
                            </div>
                            <ArrowUpRight color="var(--text-secondary)" />
                        </div>
                    </div>

                    {/* Case Study 2: New Website */}
                    <div className="glass-card" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', background: 'rgba(6, 182, 212, 0.1)', borderBottomLeftRadius: '16px' }}>
                            <Globe2 color="var(--neon-cyan)" size={24} />
                        </div>

                        <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            Website Revenue Generation
                        </div>

                        <h3 className="outfit-font" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
                            Kickstarting Ad Revenue on a Fresh Blog
                        </h3>

                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                            "Getting Google AdSense approval is great, but earning $0 a day because you have zero traffic is brutal. I setup TuNeXbot's 'Any' function to autonomously search and click through my new tech blog. The intelligent browsing simulation drove thousands of unique hits daily, instantly turning my dormant site into a functioning revenue stream."
                        </p>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'Outfit' }}>$250/mo</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Initial Revenue Jump</div>
                            </div>
                            <ArrowUpRight color="var(--text-secondary)" />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default CaseStudies;
