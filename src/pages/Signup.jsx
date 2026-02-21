import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.svg';
import { authService } from '../services/authService';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
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

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setIsLoading(false);
            return;
        }

        try {
            await authService.signup(formData.name, formData.email, formData.password);

            // Force a hard reload to update header state
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

            {/* Background Shapes */}
            <div className="bg-shape shape-1" style={{ top: '-10%', right: '-10%' }}></div>
            <div className="bg-shape shape-2" style={{ bottom: '-10%', left: '-10%' }}></div>

            <Link to="/" style={{ position: 'absolute', top: 'calc(1rem + env(safe-area-inset-top))', left: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-cyan)', fontWeight: 500, zIndex: 10, padding: '0.5rem' }}>
                <ArrowLeft size={16} /> Back to Home
            </Link>

            <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '3rem', margin: '2rem', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <img src={logo} alt="TuNeXbot Logo" style={{ height: '48px', width: 'auto' }} />
                </div>
                <h2 className="outfit-font" style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Create an Account
                </h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2.5rem' }}>
                    Get started with your Free Plan and supercharge your traffic.
                </p>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }}>
                            <User size={20} />
                        </div>
                        <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'border 0.3s' }}
                            onFocus={e => e.target.style.borderColor = 'var(--neon-violet)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

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

                    <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
                        {isLoading ? 'Processing...' : 'Sign Up'} {isLoading ? null : <ArrowRight size={18} />}
                    </button>
                </form>

                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--neon-violet-light)', fontWeight: 600 }}>Log in here</Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;
