import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import logo from '../assets/logo.svg';
import { authService } from '../services/authService';
import { supabase } from '../lib/supabase';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Track if we actually have the recovery token, or if there's an error
    const [hasToken, setHasToken] = useState(false);
    const [urlError, setUrlError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check for error parameters in the URL hash (from Supabase if token is expired/invalid)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const errorDescription = hashParams.get('error_description');

        if (errorDescription) {
            // Reformat "+"" signs to spaces for readability
            setUrlError(errorDescription.replace(/\+/g, ' '));
            setHasToken(false);
            return;
        }

        // Supabase appends access_token to the hash or passes it as a query param
        // Depending on the flow, we just verify auth session is present (since we click the link to reset)
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setHasToken(true);
            } else {
                // We might be listening to auth state change if the link automatically logged them in
                const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                    if (event === 'PASSWORD_RECOVERY') {
                        setHasToken(true);
                    }
                });

                // Also check if a hash token exists just in case
                if (window.location.hash.includes('access_token')) {
                    setHasToken(true);
                }

                return () => subscription.unsubscribe();
            }
        });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        try {
            await authService.updatePassword(password);
            setSuccess('Password updated successfully! Redirecting...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="bg-shape shape-1" style={{ top: '-10%', right: '-10%' }}></div>
            <div className="bg-shape shape-2" style={{ bottom: '-10%', left: '-10%' }}></div>

            <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '3rem', margin: '2rem', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <img src={logo} alt="TuNeXbot Logo" style={{ height: '48px', width: 'auto' }} />
                </div>
                <h2 className="outfit-font" style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Reset Password
                </h2>

                {!hasToken ? (
                    <>
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2.5rem' }}>
                            {urlError ? (
                                <span style={{ color: '#EF4444' }}>{urlError}. Please request a new password reset from the login page.</span>
                            ) : (
                                "Invalid or expired reset link. Please request a new password reset from the login page."
                            )}
                        </p>
                        <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            Go to Login
                        </button>
                    </>
                ) : (
                    <>
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2.5rem' }}>
                            Enter your new password below.
                        </p>

                        {error && (
                            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <AlertCircle size={18} /> {error}
                            </div>
                        )}

                        {success && (
                            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <CheckCircle2 size={18} /> {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }}>
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    placeholder="New Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
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
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'border 0.3s' }}
                                    onFocus={e => e.target.style.borderColor = 'var(--neon-violet)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>

                            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
                                {isLoading ? 'Saving...' : 'Reset Password'} {isLoading ? null : <ArrowRight size={18} />}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
