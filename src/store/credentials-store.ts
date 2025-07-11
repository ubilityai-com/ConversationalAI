import { create } from "zustand";
import axios from "axios";
import { useFlowStore } from "./flow-store";


interface CredentialState {
    loading: boolean;
    error: string | null;
    success: boolean;
    response: any;
    credentials: any[];
    createCred: (data: any) => Promise<boolean>;
    fetchCreds: () => Promise<void>;
    deleteCred: (id: string) => Promise<void>;
    activate: (data: any) => Promise<void>;
}

export const useCredentialStore = create<CredentialState>((set, get) => ({
    loading: false,
    error: null,
    success: false,
    response: null,
    credentials: [],
    activate: async (data) => {
        set({ loading: true, error: null, success: false });
        try {
            const res = await axios.post(process.env.REACT_APP_DNS_URL + "activate_bo", data, {
                headers: { "Content-Type": "application/json" },
            });
            set({ success: true, response: res.data, loading: false });

        } catch (error: any) {
            set({
                error: error.response?.data?.message || error.message || "Unknown error",
                loading: false,
            });
        }
    },

    // POST
    createCred: async (data) => {
        const { setIsFormDialogOpen, setShowSnackBarMessage } = useFlowStore.getState()
        set({ loading: true, error: null, success: false });
        try {
            const res = await axios.post(process.env.REACT_APP_DNS_URL + "credentials", data, {
                headers: { "Content-Type": "application/json" },
            });
            set({ success: true, response: res.data, loading: false });
            setIsFormDialogOpen(false)
            setShowSnackBarMessage({ open: true, message: res.data.message || "credential created successfully", color: "success", duration: 3000 })
            get().fetchCreds(); // refresh after post
            return true

        } catch (error: any) {
            set({
                error: error.response?.data?.message || error.message || "Unknown error",
                loading: false,
            });
            return false
        }
    },

    // GET
    fetchCreds: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(process.env.REACT_APP_DNS_URL + "credentials");
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
            await axios.delete(`${process.env.REACT_APP_DNS_URL}credentials/${id}`);
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
