import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { Key, User, CreditCard, RefreshCw, LogOut, AlertTriangle, ShieldCheck, ArrowLeft, Copy, Edit2, Clock, Eye, EyeOff, Database } from 'lucide-react';
import { WHATSAPP_LINK } from '../config';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);
    const [apiMsg, setApiMsg] = useState({ text: '', type: '' });
    const [passwordData, setPasswordData] = useState({ current: '', new: '' });
    const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });
    const [dbUrlInput, setDbUrlInput] = useState('');
    const [dbUrlMsg, setDbUrlMsg] = useState({ text: '', type: '' });
    const [isEditingDbUrl, setIsEditingDbUrl] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [customNameInput, setCustomNameInput] = useState('');
    const [nameMsg, setNameMsg] = useState({ text: '', type: '' });
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const calculateTimeLeft = (expiresAt) => {
        if (!expiresAt) return null;
        const difference = new Date(expiresAt) - new Date();
        if (difference <= 0) return { expired: true };

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    useEffect(() => {
        const initDashboard = async () => {
            const currentUser = authService.getCurrentUser();
            if (!currentUser) {
                navigate('/login');
                return;
            }

            // Set initial sync from local
            setUser(currentUser);

            // Sync from DB to ensure freshest data
            const freshUser = await authService.syncUserFromDB();
            if (freshUser) {
                setUser(freshUser);
                setCustomNameInput(freshUser.name || '');
                setDbUrlInput(freshUser.databaseUrl || '');
            }
            setLoading(false);

            const userToUse = freshUser || currentUser;
            if (userToUse.expiresAt && userToUse.plan !== 'Free Plan') {
                setTimeLeft(calculateTimeLeft(userToUse.expiresAt));
                const timer = setInterval(() => {
                    setTimeLeft(calculateTimeLeft(userToUse.expiresAt));
                }, 1000);
                return () => clearInterval(timer);
            }
        };
        initDashboard();
    }, [navigate]);

    useEffect(() => {
        if (location.state?.showUpgradeModal && user && user.plan !== 'Secondary Pro') {
            setShowUpgradeModal(true);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, user, navigate]);

    const handleLogout = async () => {
        await authService.logout();
        window.location.href = '/';
    };

    const handleProceedToSupport = (planName) => {
        setShowUpgradeModal(false);
        const url = new URL(WHATSAPP_LINK);
        url.searchParams.set('text', `Hello, I want to upgrade to the ${planName} plan. Please prioritize my request!`);
        window.open(url.toString(), '_blank');
    };

    const handleGenerateKey = async () => {
        setIsGenerating(true);
        setApiMsg({ text: '', type: '' });
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            const newKey = await authService.updateApiKey();
            setUser({ ...user, apiKey: newKey });
            setApiMsg({ text: 'New API Key automatically generated!', type: 'success' });
        } catch (err) {
            setApiMsg({ text: err.message, type: 'error' });
        }
        setIsGenerating(false);
    };

    const handleCopyKey = () => {
        navigator.clipboard.writeText(user.apiKey);
        setApiMsg({ text: 'API Key copied to clipboard!', type: 'success' });
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMsg({ text: '', type: '' });

        if (passwordData.new.length < 8) {
            setPasswordMsg({ text: 'New password must be at least 8 characters.', type: 'error' });
            return;
        }

        try {
            await authService.updatePassword(passwordData.new);
            setPasswordData({ current: '', new: '' });
            setPasswordMsg({ text: 'Password successfully updated.', type: 'success' });
        } catch (err) {
            setPasswordMsg({ text: err.message || 'Error updating password.', type: 'error' });
        }
    };

    const handleSaveName = async () => {
        if (!customNameInput || customNameInput.trim() === '') {
            setNameMsg({ text: 'Name cannot be empty.', type: 'error' });
            return;
        }
        if (customNameInput === user.name) {
            setIsEditingName(false);
            return;
        }

        setNameMsg({ text: 'Saving...', type: 'info' });
        try {
            const updatedUser = await authService.updateName(customNameInput);
            setUser(updatedUser);
            setNameMsg({ text: 'Name successfully updated!', type: 'success' });
            setTimeout(() => {
                setIsEditingName(false);
                setNameMsg({ text: '', type: '' });
            }, 2000);
        } catch (err) {
            setNameMsg({ text: err.message, type: 'error' });
        }
    };

    const handleSaveDbUrl = async () => {
        setDbUrlMsg({ text: 'Saving...', type: 'info' });
        try {
            const updatedUser = await authService.updateDatabaseUrl(dbUrlInput);
            setUser(updatedUser);
            setDbUrlMsg({ text: 'Database URL successfully updated!', type: 'success' });
            setTimeout(() => {
                setIsEditingDbUrl(false);
                setDbUrlMsg({ text: '', type: '' });
            }, 2000);
        } catch (err) {
            setDbUrlMsg({ text: err.message, type: 'error' });
        }
    };

    if (loading) return null;

    return (
        <div style={{ paddingTop: '140px', paddingBottom: '4rem', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            {/* Background elements */}
            <div className="bg-shape shape-1" style={{ top: '10%', right: '0%' }}></div>
            <div className="bg-shape shape-2" style={{ bottom: '10%', left: '0%' }}></div>

            <div className="container" style={{ maxWidth: '1000px' }}>

                <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-cyan)', marginBottom: '2rem', fontWeight: 500, padding: '0.5rem 0' }}>
                    <ArrowLeft size={16} /> Back to Home
                </a>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 className="outfit-font text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Client Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'}</p>
                    </div>
                    <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem' }}>

                    {/* Left Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* API Key Box */}
                        <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid var(--neon-cyan)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                                    <Key color="var(--neon-cyan)" size={24} />
                                </div>
                                <h2 className="outfit-font" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>Bot API Access Key</h2>
                            </div>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                This is your private key. Enter this key into the TuNeXbot desktop agent to authenticate your session.
                            </p>

                            {apiMsg.text && (
                                <div style={{ padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', background: apiMsg.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: apiMsg.type === 'error' ? '#EF4444' : '#10B981', border: `1px solid ${apiMsg.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}` }}>
                                    {apiMsg.text}
                                </div>
                            )}

                            <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', overflow: 'hidden' }}>
                                <code style={{ color: 'var(--neon-cyan)', fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)', wordBreak: 'break-all', overflowWrap: 'break-word', fontFamily: 'monospace', letterSpacing: showApiKey ? 'normal' : '2px', flex: 1 }}>
                                    {user?.apiKey ? (showApiKey ? user.apiKey : '••••••••••••') : 'No Key'}
                                </code>
                                {user?.apiKey && (
                                    <button onClick={() => setShowApiKey(!showApiKey)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.25rem', transition: 'color 0.2s', flexShrink: 0 }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'} title={showApiKey ? "Hide Key" : "Reveal Key"}>
                                        {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <button onClick={handleCopyKey} className="btn" style={{ flex: 1, background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', transition: 'all 0.2s ease' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}>
                                    <Copy size={16} /> Copy
                                </button>
                                <button onClick={handleGenerateKey} disabled={isGenerating} className="btn" style={{ flex: 1.5, background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', transition: 'all 0.2s ease' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}>
                                    {isGenerating ? <RefreshCw size={16} className="spin" /> : <RefreshCw size={16} />}
                                    Auto Gen
                                </button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', marginTop: '1rem', color: '#F59E0B', fontSize: '0.85rem' }}>
                                <AlertTriangle size={16} style={{ flexShrink: 0 }} /> Regeneration will instantly invalidate your current active sessions.
                            </div>
                        </div>

                        {/* Subscription Info */}
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                                    <CreditCard color="var(--neon-violet)" size={24} />
                                </div>
                                <h2 className="outfit-font" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>Current Plan</h2>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600 }}>
                                    <ShieldCheck size={14} /> Active
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Tier:</span>
                                <span style={{ color: 'white', fontWeight: 600 }}>{user?.plan || 'Free Plan'}</span>
                            </div>

                            {user?.plan !== 'Free Plan' && timeLeft && (
                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                                        <Clock size={16} /> Subscription Time Remaining
                                    </div>
                                    {timeLeft.expired ? (
                                        <div style={{ color: '#EF4444', fontWeight: 600, fontSize: '1.1rem' }}>Subscription Expired</div>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <div style={{ textAlign: 'center', flex: 1 }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{timeLeft.days}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>DAYS</div>
                                            </div>
                                            <div style={{ color: 'var(--neon-violet-light)', fontSize: '1.5rem', fontWeight: 800 }}>:</div>
                                            <div style={{ textAlign: 'center', flex: 1 }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{timeLeft.hours.toString().padStart(2, '0')}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>HRS</div>
                                            </div>
                                            <div style={{ color: 'var(--neon-violet-light)', fontSize: '1.5rem', fontWeight: 800 }}>:</div>
                                            <div style={{ textAlign: 'center', flex: 1 }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{timeLeft.minutes.toString().padStart(2, '0')}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>MIN</div>
                                            </div>
                                            <div style={{ color: 'var(--neon-violet-light)', fontSize: '1.5rem', fontWeight: 800 }}>:</div>
                                            <div style={{ textAlign: 'center', flex: 1 }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{timeLeft.seconds.toString().padStart(2, '0')}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>SEC</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {user?.plan === 'Secondary Pro' ? (
                                <button className="btn" disabled style={{ width: '100%', display: 'flex', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', cursor: 'not-allowed' }}>
                                    Maximum Plan Active
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={() => setShowUpgradeModal(true)} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    Upgrade Plan
                                </button>
                            )}
                        </div>

                        {/* Database URL Control */}
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                                        <Database color="#10B981" size={24} />
                                    </div>
                                    <h2 className="outfit-font" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>Cloud Execution DB</h2>
                                </div>
                                {user?.plan === 'Free Plan' && (
                                    <span style={{ fontSize: '0.75rem', background: 'rgba(239,68,68,0.1)', color: '#EF4444', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>PRO REQUIRED</span>
                                )}
                            </div>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                Link an external PostgreSQL database. The desktop client will automatically configure its environment variables to store bot state remotely.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                {isEditingDbUrl ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <input
                                            type="password"
                                            placeholder="postgresql://user:pass@host:5432/db"
                                            value={dbUrlInput}
                                            onChange={e => setDbUrlInput(e.target.value)}
                                            disabled={user?.plan === 'Free Plan'}
                                            style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', opacity: user?.plan === 'Free Plan' ? 0.5 : 1 }}
                                            onFocus={e => e.target.style.borderColor = '#10B981'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button onClick={handleSaveDbUrl} className="btn" style={{ flex: 1, background: '#10B981', color: 'black', fontWeight: 600 }}>Save URL</button>
                                            <button onClick={() => { setIsEditingDbUrl(false); setDbUrlInput(user?.databaseUrl || ''); setDbUrlMsg({ text: '', type: '' }); }} className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white' }}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <code style={{ color: user?.databaseUrl ? '#10B981' : 'var(--text-secondary)', fontSize: '0.95rem', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                                            {user?.databaseUrl ? 'postgresql://••••••••••••••••' : 'No Database Linked'}
                                        </code>
                                        <button
                                            onClick={() => setIsEditingDbUrl(true)}
                                            disabled={user?.plan === 'Free Plan'}
                                            style={{ background: 'transparent', border: 'none', color: user?.plan === 'Free Plan' ? 'var(--text-secondary)' : '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: user?.plan === 'Free Plan' ? 'not-allowed' : 'pointer', fontSize: '0.9rem', opacity: user?.plan === 'Free Plan' ? 0.5 : 1 }}
                                        >
                                            <Edit2 size={14} /> Update
                                        </button>
                                    </div>
                                )}
                                {dbUrlMsg.text && (
                                    <div style={{ marginTop: '0.75rem', padding: '0.5rem', borderRadius: '6px', color: dbUrlMsg.type === 'error' ? '#EF4444' : (dbUrlMsg.type === 'info' ? 'var(--neon-cyan)' : '#10B981'), fontSize: '0.85rem', background: dbUrlMsg.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)' }}>
                                        {dbUrlMsg.text}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Account Details */}
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                                    <User color="white" size={24} />
                                </div>
                                <h2 className="outfit-font" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>Account Settings</h2>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Full Name</div>
                                {isEditingName ? (
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <input
                                            type="text"
                                            value={customNameInput}
                                            onChange={e => setCustomNameInput(e.target.value)}
                                            style={{ flex: 1, padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }}
                                            onFocus={e => e.target.style.borderColor = 'var(--neon-cyan)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                        <button onClick={handleSaveName} className="btn btn-primary" style={{ padding: '0.75rem 1rem' }}>Save</button>
                                        <button onClick={() => { setIsEditingName(false); setCustomNameInput(user?.name || ''); setNameMsg({ text: '', type: '' }); }} className="btn" style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', color: 'white' }}>Cancel</button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ color: 'white' }}>{user?.name || 'N/A'}</div>
                                        <button onClick={() => setIsEditingName(true)} style={{ background: 'transparent', border: 'none', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                                            <Edit2 size={14} /> Edit
                                        </button>
                                    </div>
                                )}
                                {nameMsg.text && (
                                    <div style={{ marginTop: '0.5rem', color: nameMsg.type === 'error' ? '#EF4444' : (nameMsg.type === 'info' ? 'var(--neon-cyan)' : '#10B981'), fontSize: '0.85rem' }}>
                                        {nameMsg.text}
                                    </div>
                                )}
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Email Address</div>
                                <div style={{ color: 'white', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>{user?.email || 'N/A'}</div>
                            </div>

                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '2rem' }}></div>

                            <h3 className="outfit-font" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Change Password</h3>

                            {passwordMsg.text && (
                                <div style={{ padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', background: passwordMsg.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: passwordMsg.type === 'error' ? '#EF4444' : '#10B981', border: `1px solid ${passwordMsg.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}` }}>
                                    {passwordMsg.text}
                                </div>
                            )}

                            <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    type="password"
                                    required
                                    placeholder="Current Password"
                                    value={passwordData.current}
                                    onChange={e => setPasswordData({ ...passwordData, current: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                                />
                                <input
                                    type="password"
                                    required
                                    placeholder="New Password"
                                    value={passwordData.new}
                                    onChange={e => setPasswordData({ ...passwordData, new: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                                />
                                <button type="submit" className="btn" style={{ background: 'white', color: 'black', fontWeight: 600 }}>Save Password</button>
                            </form>
                        </div>

                    </div>
                </div>

            </div>

            {/* Upgrade Modal */}
            {showUpgradeModal && (
                <div
                    onClick={() => setShowUpgradeModal(false)}
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
                        background: 'rgba(5, 7, 12, 0.8)', backdropFilter: 'blur(10px)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '1rem'
                    }}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'rgba(15, 20, 30, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '16px', padding: '2.5rem', maxWidth: '500px', width: '100%',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(139, 92, 246, 0.15)',
                            animation: 'fadeInScale 0.3s ease-out forwards'
                        }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--neon-violet-light)' }}>
                            <CreditCard size={32} />
                            <h3 className="outfit-font" style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, color: 'white' }}>Select Upgrade Plan</h3>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                            Choose a premium plan to instantly boost your bot limits and unlock the Smart "Any" Function. Clicking a plan will redirect you to WhatsApp with instructions for our Support Team.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                            {user?.plan !== 'Primary Pro' && (
                                <button onClick={() => handleProceedToSupport('Primary Pro')} className="btn" style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', color: 'white', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Primary Pro</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--neon-violet-light)' }}>200 Bots + Cloud + Any Function</div>
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>$40/mo</div>
                                </button>
                            )}

                            <button onClick={() => handleProceedToSupport('Secondary Pro')} className="btn" style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', color: 'white', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Secondary Pro</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--neon-cyan)' }}>1000 Bots + Unlimited Proxies</div>
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>$100/mo</div>
                            </button>
                        </div>

                        <button type="button" onClick={(e) => { e.stopPropagation(); setShowUpgradeModal(false); }} className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '1rem' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
             .spin {
                 animation: spin 1s linear infinite;
             }
             @keyframes spin {
                 100% { transform: rotate(360deg); }
             }
             `
            }} />
        </div>
    );
};

export default Dashboard;
