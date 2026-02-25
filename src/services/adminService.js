import { supabase } from '../lib/supabase';

export const adminService = {
    // Fetch all user profiles from the database
    fetchAllUsers: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Admin fetch error:", error);
            throw new Error("Failed to load user database.");
        }
        return data || [];
    },

    // Apply an upgrade or downgrade manually to a user
    updateUserPlan: async (userId, newPlan, durationDays, databaseUrl) => {
        if (!userId) throw new Error("A user ID is required to process an upgrade.");

        let updateData = {
            plan: newPlan,
            database_url: databaseUrl || null
        };

        if (newPlan === 'Free Plan') {
            // Instant downgrade logic identical to natural authService logic
            updateData.expires_at = null;
            updateData.downgraded_at = new Date().toISOString();
        } else {
            // Pro Plan Upgrade Logic
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + parseInt(durationDays || 30));

            updateData.expires_at = expiryDate.toISOString();
            updateData.downgraded_at = null; // Wipe out any lingering deletion timer!
        }

        const { data, error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', userId)
            .select();

        if (error) {
            console.error("Admin upgrade error:", error);
            throw new Error(`Execution Failed: ${error.message || JSON.stringify(error)}`);
        }

        if (!data || data.length === 0) {
            throw new Error(`Execution Blocked by Database RLS Policy! You must execute the SQL bypass command to edit another user's profile.`);
        }

        return updateData;
    }
};
