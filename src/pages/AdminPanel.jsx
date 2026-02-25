import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Search, Users, AlertTriangle, RefreshCw, CheckCircle, Database, Power } from 'lucide-react';
import { adminService } from '../services/adminService';

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminEmailInput, setAdminEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Core Data State
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [actionStatus, setActionStatus] = useState({ text: '', type: '' });

    // Table Editing State
    const [editingUserId, setEditingUserId] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState('Free Plan');
    const [durationDays, setDurationDays] = useState(30);
    const [databaseUrl, setDatabaseUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initial Fetch when Authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadUsers();
        }
    }, [isAuthenticated]);

    // Search Filtering logic
    useEffect(() => {
        if (!searchQuery) {
            setFilteredUsers(users);
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = users.filter(u =>
                (u.email && u.email.toLowerCase().includes(lowerQuery)) ||
                (u.name && u.name.toLowerCase().includes(lowerQuery))
            );
            setFilteredUsers(filtered);
        }
    }, [searchQuery, users]);

    const loadUsers = async () => {
        setIsLoading(true);
        setActionStatus({ text: '', type: '' });
        try {
            const data = await adminService.fetchAllUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (err) {
            setActionStatus({ text: 'Error loading user database: ' + err.message, type: 'error' });
        }
        setIsLoading(false);
    };

    // Master Password logic
    const handleLogin = (e) => {
        e.preventDefault();
        if (adminEmailInput === 'babatswags@gmail.com' && passwordInput === 'Tunex5445775445') {
            setIsAuthenticated(true);
            setErrorMsg('');
        } else {
            setErrorMsg('Invalid administrator credentials.');
            setPasswordInput('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="gradient-background" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem 2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                            <Shield color="#EF4444" size={32} />
                        </div>
                    </div>
                    <h2 className="outfit-font" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Admin Access</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>Enter the master password to continue.</p>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="email"
                                value={adminEmailInput}
                                onChange={(e) => setAdminEmailInput(e.target.value)}
                                placeholder="Admin Email Address"
                                required
                                style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', transition: 'border-color 0.2s', fontSize: '1rem', textAlign: 'center' }}
                                onFocus={e => e.target.style.borderColor = '#EF4444'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Master Password"
                                required
                                style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', transition: 'border-color 0.2s', fontSize: '1rem', textAlign: 'center', letterSpacing: '2px' }}
                                onFocus={e => e.target.style.borderColor = '#EF4444'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>
                        <button type="submit" className="btn" style={{ background: '#EF4444', color: 'black', fontWeight: 600, padding: '0.875rem' }}>
                            Unlock Dashboard
                        </button>
                    </form>

                    {errorMsg && (
                        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#EF4444', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px' }}>
                            <AlertTriangle size={16} /> {errorMsg}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const handleApplyPlan = async (userId) => {
        setIsSubmitting(true);
        setActionStatus({ text: 'Applying update...', type: 'info' });
        try {
            await adminService.updateUserPlan(userId, selectedPlan, durationDays, databaseUrl);

            // Refresh local state to reflect update
            const updatedUsers = users.map(u => {
                if (u.id === userId) {
                    const newExpiry = new Date();
                    newExpiry.setDate(newExpiry.getDate() + parseInt(durationDays));
                    return {
                        ...u,
                        plan: selectedPlan,
                        database_url: databaseUrl,
                        expires_at: selectedPlan === 'Free Plan' ? null : newExpiry.toISOString(),
                        downgraded_at: selectedPlan === 'Free Plan' ? new Date().toISOString() : null
                    };
                }
                return u;
            });
            setUsers(updatedUsers);

            setEditingUserId(null);
            setActionStatus({ text: 'User successfully updated!', type: 'success' });

            // Clear success message after 3 seconds
            setTimeout(() => setActionStatus({ text: '', type: '' }), 3000);

        } catch (err) {
            setActionStatus({ text: err.message || 'Failed to update user', type: 'error' });
        }
        setIsSubmitting(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="gradient-background" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', background: 'rgba(10, 10, 12, 0.8)', backdropFilter: 'blur(12px)', padding: '1.5rem 2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '12px' }}>
                            <Shield color="#EF4444" size={28} />
                        </div>
                        <div>
                            <h1 className="outfit-font" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', margin: 0 }}>Administrator Control Panel</h1>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Manage subscriptions and user access</div>
                        </div>
                    </div>
                </header>

                <div className="glass-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 className="outfit-font" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Users size={20} color="var(--neon-cyan)" /> User Database ({filteredUsers.length})
                        </h2>

                        <div style={{ display: 'flex', gap: '1rem', flex: 1, justifyContent: 'flex-end', minWidth: '300px' }}>
                            <div style={{ position: 'relative', maxWidth: '350px', width: '100%' }}>
                                <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text"
                                    placeholder="Search by email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }}
                                />
                            </div>
                            <button onClick={loadUsers} disabled={isLoading} className="btn" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem' }} title="Refresh Database">
                                <RefreshCw size={18} color="white" className={isLoading ? 'spin' : ''} />
                            </button>
                        </div>
                    </div>

                    {actionStatus.text && (
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '8px', color: actionStatus.type === 'error' ? '#EF4444' : actionStatus.type === 'info' ? 'var(--neon-cyan)' : '#10B981', background: actionStatus.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : actionStatus.type === 'info' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {actionStatus.type === 'error' ? <AlertTriangle size={18} /> : (actionStatus.type === 'info' ? <RefreshCw size={18} className="spin" /> : <CheckCircle size={18} />)}
                            {actionStatus.text}
                        </div>
                    )}

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Email / Name</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Current Plan</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Registered At</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Expiry State</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Cloud DB</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>
                                            <RefreshCw className="spin" size={24} color="var(--neon-cyan)" style={{ margin: '0 auto 1rem' }} />
                                            <div style={{ color: 'var(--text-secondary)' }}>Loading Database...</div>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                            No users found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((u) => (
                                        <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: editingUserId === u.id ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ color: 'white', fontWeight: 600, marginBottom: '0.25rem' }}>{u.email}</div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{u.name || 'Unnamed User'}</div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    background: u.plan === 'Free Plan' ? 'rgba(255,255,255,0.1)' : 'rgba(139, 92, 246, 0.1)',
                                                    color: u.plan === 'Free Plan' ? 'var(--text-secondary)' : 'var(--neon-violet-light)',
                                                    border: `1px solid ${u.plan === 'Free Plan' ? 'rgba(255,255,255,0.1)' : 'rgba(139, 92, 246, 0.3)'}`,
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '999px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600
                                                }}>
                                                    {u.plan}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                {formatDate(u.created_at)}
                                            </td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                {u.expires_at ? (
                                                    <span style={{ color: '#10B981' }}>{formatDate(u.expires_at)}</span>
                                                ) : u.downgraded_at ? (
                                                    <span style={{ color: '#EF4444' }}>Downgraded: {formatDate(u.downgraded_at)}</span>
                                                ) : (
                                                    'None Active'
                                                )}
                                            </td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                {u.database_url ? (
                                                    <span style={{ color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Database size={14} /> Linked</span>
                                                ) : 'Unlinked'}
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                {editingUserId === u.id ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                                                        <select
                                                            value={selectedPlan}
                                                            onChange={(e) => setSelectedPlan(e.target.value)}
                                                            style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px', outline: 'none' }}
                                                        >
                                                            <option value="Free Plan">Free Plan</option>
                                                            <option value="Primary Pro">Primary Pro</option>
                                                            <option value="Secondary Pro">Secondary Pro</option>
                                                        </select>

                                                        {selectedPlan !== 'Free Plan' && (
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    value={durationDays}
                                                                    onChange={(e) => setDurationDays(e.target.value)}
                                                                    style={{ width: '60px', padding: '0.5rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px', outline: 'none', textAlign: 'center' }}
                                                                />
                                                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Days</span>
                                                            </div>
                                                        )}

                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '220px' }}>
                                                            <Database size={16} color="var(--text-secondary)" />
                                                            <input
                                                                type="text"
                                                                placeholder="postgres://..."
                                                                value={databaseUrl}
                                                                onChange={(e) => setDatabaseUrl(e.target.value)}
                                                                style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px', outline: 'none', fontSize: '0.85rem' }}
                                                            />
                                                        </div>

                                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                            <button onClick={() => handleApplyPlan(u.id)} disabled={isSubmitting} className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
                                                                Apply
                                                            </button>
                                                            <button onClick={() => setEditingUserId(null)} disabled={isSubmitting} className="btn" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)' }}>
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => { setEditingUserId(u.id); setSelectedPlan(u.plan); setDurationDays(30); setDatabaseUrl(u.database_url || ''); }}
                                                        className="btn"
                                                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                                    >
                                                        Manage Plan
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
