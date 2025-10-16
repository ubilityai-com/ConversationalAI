import type { StateCreator } from "zustand"

export interface UISlice {
  // Theme
  theme: boolean
  toggleTheme: () => void

  // Right panel
  isRightOpen: boolean
  setIsRightOpen: (open: boolean) => void

  // Dialog
  isFormDialogOpen: boolean
  setIsFormDialogOpen: (open: boolean) => void

  dialogProps: Record<string, any>
  setDialogProps: (props: Record<string, any>) => void

  formDialogStatus: any
  setFormDialogStatus: (status: any) => void

  // Snackbar
  showSnackBarMessage:
    | {
        open: true
        message: string | null
        color: "default" | "destructive" | "success" | "warning" | "info" | null
        duration: number
      }
    | {
        open: false
      }
  setShowSnackBarMessage: (
    message:
      | {
          open: true
          message: string
          color: "default" | "destructive" | "success" | "warning" | "info"
          duration: number
        }
      | {
          open: false
        },
  ) => void
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
  // Theme
  theme: typeof window !== "undefined" ? localStorage.getItem("darkMode") === "true" : false,
  toggleTheme: () => set((state) => ({ theme: !state.theme })),

  // Right panel
  isRightOpen: false,
  setIsRightOpen: (open) => set({ isRightOpen: open }),

  // Dialog
  isFormDialogOpen: false,
  setIsFormDialogOpen: (open) => set({ isFormDialogOpen: open }),

  dialogProps: {},
  setDialogProps: (props) => set({ dialogProps: props }),

  formDialogStatus: null,
  setFormDialogStatus: (status) => set({ formDialogStatus: status }),

  // Snackbar
  showSnackBarMessage: {
    open: false,
  },
  setShowSnackBarMessage: (message) => set({ showSnackBarMessage: message }),
})
