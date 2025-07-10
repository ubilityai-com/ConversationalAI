import { create } from "zustand";
import axios from "axios";


interface CredentialState {
    loading: boolean;
    error: string | null;
    success: boolean;
    response: any;
    credentials: any[];
    createCred: (data: any) => Promise<void>;
    fetchCreds: () => Promise<void>;
    deleteCred: (id: string) => Promise<void>;
}

export const useCredentialStore = create<CredentialState>((set, get) => ({
    loading: false,
    error: null,
    success: false,
    response: null,
    credentials: [],

    // POST
    createCred: async (data) => {
        set({ loading: true, error: null, success: false });
        try {
            const res = await axios.post("/api/credentials", data, {
                headers: { "Content-Type": "application/json" },
            });
            set({ success: true, response: res.data, loading: false });
            get().fetchCreds(); // refresh after post
        } catch (error: any) {
            set({
                error: error.response?.data?.message || error.message || "Unknown error",
                loading: false,
            });
        }
    },

    // GET
    fetchCreds: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get("/api/credentials");
            set({ credentials: res.data, loading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || error.message || "Unknown error",
                loading: false,
            });
        }
    },

    // DELETE
    deleteCred: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/credentials/${id}`);
            // Refresh the credentials list after deletion
            await get().fetchCreds();
            set({ loading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || error.message || "Unknown error",
                loading: false,
            });
        }
    },
}));
