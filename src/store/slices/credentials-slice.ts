import type { StateCreator } from "zustand"
import chatbotApis from "../../api/chatbotApis"

export interface CredentialsSlice {
  loading: boolean
  error: string | null
  success: boolean
  response: any
  credentials: any[]

  createCred: (data: any) => Promise<boolean>
  fetchCreds: () => Promise<void>
  deleteCred: (id: string) => Promise<void>
}

export const createCredentialsSlice: StateCreator<CredentialsSlice> = (set, get) => ({
  loading: false,
  error: null,
  success: false,
  response: null,
  credentials: [],

  createCred: async (data) => {
    const state = get() as any
    set({ loading: true, error: null, success: false })

    try {
      const res = await chatbotApis.createCred(data)
      set({ success: true, response: res.data, loading: false })

      state.setIsFormDialogOpen?.(false)
      state.setShowSnackBarMessage?.({
        open: true,
        message: res.data.message || "credential created successfully",
        color: "success",
        duration: 3000,
      })

      return true
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message || "Unknown error",
        loading: false,
      })
      return false
    }
  },

  fetchCreds: async () => {
    set({ loading: true, error: null })

    try {
      const res = await chatbotApis.fetchCreds()
      set({ credentials: res.data, loading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message || "Unknown error",
        loading: false,
      })
    }
  },

  deleteCred: async (id) => {
    set({ loading: true, error: null })

    try {
      await chatbotApis.deleteCred(id)
      await (get() as any).fetchCreds()
      set({ loading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message || "Unknown error",
        loading: false,
      })
    }
  },
})
