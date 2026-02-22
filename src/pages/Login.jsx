import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.svg';
import { authService } from '../services/authService';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [isResetting, setIsResetting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (authService.getCurrentUser()) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMsg('');

        try {
            if (isResetting) {
                await authService.resetPassword(formData.email);
                setMsg('Password reset email sent! Check your inbox and spam folder.');
                setIsResetting(false);
            } else {
                await authService.login(formData.email, formData.password);
                window.location.href = '/dashboard';
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', paddingTop: 'calc(5rem + env(safe-area-inset-top))', position: 'relative', overflowX: 'hidden' }}>

            {/* Background Shapes */}
            <div className="bg-shape shape-1" style={{ top: '-10%', right: '-10%' }}></div>
            <div className="bg-shape shape-2" style={{ bottom: '-10%', left: '-10%' }}></div>

            <div style={{ position: 'fixed', top: 'calc(1rem + env(safe-area-inset-top))', left: '1rem', zIndex: 100 }}>
                <Link to="/" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(7, 9, 15, 0.9)', backdropFilter: 'blur(10px)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.6rem 1rem', fontSize: '0.9rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </div>

            <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '3rem', margin: 'auto', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <img src={logo} alt="TuNeXbot Logo" style={{ height: '48px', width: 'auto' }} />
                </div>
                <h2 className="outfit-font" style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Welcome Back
                </h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2.5rem' }}>
                    Log in to manage your TuNeXbot configurations.
                </p>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', lineHeight: 1.4 }}>
                        <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} /> <div>{error}</div>
                    </div>
                )}

                {msg && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }}>
                            <Mail size={20} />
                        </div>
                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'border 0.3s' }}
                            onFocus={e => e.target.style.borderColor = 'var(--neon-violet)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {!isResetting && (
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }}>
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'border 0.3s' }}
                                onFocus={e => e.target.style.borderColor = 'var(--neon-violet)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={() => setIsResetting(!isResetting)} style={{ background: 'transparent', border: 'none', color: 'var(--neon-cyan)', fontSize: '0.9rem', cursor: 'pointer', outline: 'none' }}>
                            {isResetting ? 'Back to Login' : 'Forgot Password?'}
                        </button>
                    </div>

                    <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
                        {isLoading ? 'Processing...' : (isResetting ? 'Send Reset Link' : 'Log In')} {isLoading ? null : <ArrowRight size={18} />}
                    </button>
                </form>

                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem' }}>
                    Don't have an account yet? <Link to="/signup" style={{ color: 'var(--neon-violet-light)', fontWeight: 600 }}>Sign up for free</Link>
                </p>

            </div>
        </div>
    );
};

export default Login;
