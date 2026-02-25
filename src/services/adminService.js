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
    updateUserPlan: async (userId, newPlan, durationDays) => {
        if (!userId) throw new Error("A user ID is required to process an upgrade.");

        let updateData = { plan: newPlan };

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

        const { error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', userId);

        if (error) {
            console.error("Admin upgrade error:", error);
            throw new Error(`Failed to apply the ${newPlan} to the targeted user.`);
        }

        return updateData;
    }
};
