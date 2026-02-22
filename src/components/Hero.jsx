import React, { useState, useEffect } from 'react';
import { ArrowRight, Activity, Youtube, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnimatedStat = ({ endValue, suffix = '+', duration = 2000, decimals = 1 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(easeProgress * endValue);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(endValue);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [endValue, duration]);

    return <span>{count.toFixed(decimals)}{suffix}</span>;
};

const Hero = () => {
    return (
        <section className="section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '120px' }}>
            {/* Background Animated Shapes */}
            <div className="bg-shape shape-1 animate-pulse"></div>
            <div className="bg-shape shape-2 animate-float"></div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)', zIndex: -1 }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '999px', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
                    <span className="animate-pulse" style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-cyan)', boxShadow: '0 0 15px 2px var(--neon-cyan)' }}></span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--neon-cyan)' }}>TuNeXbot v2.0 is Live</span>
                </div>

                <h1 className="outfit-font" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                    Advanced <span className="text-gradient">Traffic & Engagement</span> <br /> Software
                </h1>

                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                    The ultimate advanced bot software to generate high-quality traffic for your websites, monetized platforms, and YouTube channels. Maximize views and earn more funds effortlessly.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                        Start Generating Traffic <ArrowRight size={20} />
                    </Link>
                    <a href="#features" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                        Explore Features
                    </a>
                </div>

                {/* Floating Stats Showcase */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '6rem', flexWrap: 'wrap' }}>
                    {[
                        { icon: <Globe className="text-gradient" size={24} color="#8B5CF6" />, value: <AnimatedStat endValue={2.2} suffix="K+" duration={2000} decimals={1} />, label: 'Sites Boosted' },
                        { icon: <Youtube className="text-gradient" size={24} color="#EC4899" />, value: <AnimatedStat endValue={5.6} suffix="K+" duration={2200} decimals={1} />, label: 'YouTube Boosted' },
                        { icon: <Activity className="text-gradient" size={24} color="#06B6D4" />, value: <AnimatedStat endValue={99.9} suffix="%" duration={2500} decimals={1} />, label: 'Uptime Reliability' }
                    ].map((stat, i) => (
                        <div key={i} className="glass-card" style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '240px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '12px' }}>
                                {stat.icon}
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div className="outfit-font" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{stat.value}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
