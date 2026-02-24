import { supabase } from '../lib/supabase';

const CURRENT_USER_KEY = 'tunexbot_current_user';

const generateApiKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const authService = {
    // Create a new user account via Supabase Auth
    signup: async (name, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: name // This populates the "Display name" column in Supabase Auth
                }
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        if (data.user) {
            // Need to create the profile row, if triggers/Row Level Security are set up
            // Or we do it here directly
            const newApiKey = generateApiKey();
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: data.user.id,
                        email: email,
                        name: name,
                        plan: 'Free Plan',
                        api_key: newApiKey
                    }
                ]);

            if (profileError) {
                console.error("Profile creation error:", profileError);
                throw new Error("Account created, but failed to initialize profile. " + profileError.message);
            }

            const newUser = {
                id: data.user.id,
                name,
                email,
                plan: 'Free Plan',
                apiKey: newApiKey
            };

            // Store minimal fallback in localstorage (though Supabase session handles true auth)
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
            return newUser;
        }
        throw new Error('An unknown error occurred during signup.');
    },

    // Helper to process Auto-Upgrades (setting 30 days) and Auto-Downgrades (expired)
    _processPlanLogic: async (profileData) => {
        let plan = profileData.plan;
        let expiresAt = profileData.expires_at;
        let needsDbUpdate = false;

        // 1. If admin upgraded the plan in the DB but didn't set a date, automatically give 30 days
        if (plan !== 'Free Plan' && !expiresAt) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 30);
            expiresAt = expiryDate.toISOString();
            needsDbUpdate = true;
        }
        // 2. If the plan has expired, instantly downgrade back to Free Plan
        else if (plan !== 'Free Plan' && expiresAt && new Date(expiresAt) <= new Date()) {
            plan = 'Free Plan';
            expiresAt = null;
            needsDbUpdate = true;
        }

        if (needsDbUpdate && profileData.id) {
            await supabase.from('profiles').update({ plan: plan, expires_at: expiresAt }).eq('id', profileData.id);
        }

        return { plan, expiresAt };
    },

    // Login a user
    login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            if (error.message === 'Invalid login credentials') {
                throw new Error('Incorrect email or password. Please try again or create an account.');
            }
            throw new Error(error.message);
        }

        if (data.user) {
            // Fetch user profile from profiles table
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();

            if (profileError) {
                console.error("Profile fetch error:", profileError);
                throw new Error("Logged in, but failed to fetch user profile.");
            }

            const { plan, expiresAt } = await authService._processPlanLogic(profileData);

            const user = {
                id: data.user.id,
                email: data.user.email,
                name: profileData.name,
                plan: plan,
                apiKey: profileData.api_key,
                expiresAt: expiresAt,
                databaseUrl: profileData.database_url,
                createdAt: profileData.created_at
            };

            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
            return user;
        }
        throw new Error('Invalid email or password.');
    },

    // Logout current user
    logout: async () => {
        await supabase.auth.signOut();
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    // Password reset request
    resetPassword: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://tunexbot.com/reset-password',
        });

        if (error) {
            throw new Error(error.message);
        }
        return true;
    },

    // Update password for an authenticated session
    updatePassword: async (newPassword) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });
        if (error) {
            throw new Error(error.message);
        }
        return true;
    },

    // Synchronize local session with latest DB data (useful for plan/api key changes)
    syncUserFromDB: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) return null;

        const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (error || !profileData) return null;

        const { plan, expiresAt } = await authService._processPlanLogic(profileData);

        const user = {
            id: session.user.id,
            email: session.user.email,
            name: profileData.name,
            plan: plan,
            apiKey: profileData.api_key,
            expiresAt: expiresAt,
            databaseUrl: profileData.database_url,
            createdAt: profileData.created_at
        };

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return user;
    },

    // Get current logged-in user session (synchronous, relies on synced local store)
    getCurrentUser: () => {
        const userStr = localStorage.getItem(CURRENT_USER_KEY);
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    // Generate new unique API Key
    updateApiKey: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) throw new Error("Not logged in");

        let newKey;
        let isUnique = false;

        // Loop to ensure uniqueness across the DB
        while (!isUnique) {
            newKey = generateApiKey();
            const { data: existingUser, error: checkError } = await supabase
                .from('profiles')
                .select('id')
                .eq('api_key', newKey)
                .maybeSingle();

            if (checkError) {
                console.error("Error checking API key uniqueness:", checkError);
                throw new Error("Database error while verifying API key.");
            }

            if (!existingUser) {
                isUnique = true;
            }
        }

        // Update profile in DB
        const { error } = await supabase
            .from('profiles')
            .update({ api_key: newKey })
            .eq('id', session.user.id);

        if (error) {
            console.error("API update error:", error);
            throw new Error("Failed to update API key in the database.");
        }

        // Update local session
        await authService.syncUserFromDB();
        return newKey;
    },

    // Update User Display Name
    updateName: async (newName) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) throw new Error("Not logged in");
        if (!newName || newName.trim() === '') throw new Error('Name cannot be empty');

        // Update in profiles table
        const { error: dbError } = await supabase
            .from('profiles')
            .update({ name: newName.trim() })
            .eq('id', session.user.id);

        if (dbError) throw new Error("Failed to update name in database.");

        // Update in auth.users metadata (so it shows in the Supabase Dashboard "Users" tab)
        const { error: authError } = await supabase.auth.updateUser({
            data: { display_name: newName.trim() }
        });

        if (authError) throw new Error("Failed to update auth metadata.");

        // Sync and return
        return await authService.syncUserFromDB();
    },

    // Update Database URL
    updateDatabaseUrl: async (newDatabaseUrl) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) throw new Error("Not logged in");

        // Format to null if empty so DB holds a perfect null
        const urlToSave = newDatabaseUrl && newDatabaseUrl.trim() !== '' ? newDatabaseUrl.trim() : null;

        const { error } = await supabase
            .from('profiles')
            .update({ database_url: urlToSave })
            .eq('id', session.user.id);

        if (error) {
            console.error("Database URL update error:", error);
            throw new Error("Failed to update Database URL. Please try again.");
        }

        // Update local session
        return await authService.syncUserFromDB();
    }
};
