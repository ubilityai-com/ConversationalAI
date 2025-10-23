import type { StateCreator } from "zustand"

export interface VariablesPickerProps {
  allowedNodeIds: string[]
  insertVariable: (variable: any) => void
}

export interface VariablePickerSlice {
  // Field references
  fieldRefs: { [key: string]: HTMLElement | null }
  setFieldRef: (key: string, ref: HTMLElement | null) => void

  // Focus management
  focusedField: string | null
  setFocusedField: (field: string | null) => void
  blurTimeoutRef: NodeJS.Timeout | null
  setBlurTimeoutRef: (timeout: NodeJS.Timeout | null) => void

  // Variables picker visibility
  variablesPickerVisible: boolean
  setVarPicker: (value: boolean) => void

  // Selected output/variable
  selectedOutputOrVariable: string | null
  setSelectedOutputOrVariable: (name: string | null) => void

  // Popover interaction
  isPopoverInteracting: boolean
  setIsPopoverInteracting: (open: boolean) => void

  // Variables picker props
  varPickerProps: VariablesPickerProps | null
  setVarPickerProps: (props: VariablesPickerProps | null) => void
}

export const createVariablePickerSlice: StateCreator<VariablePickerSlice> = (set) => ({
  // Field references
  fieldRefs: {},
  setFieldRef: (key, ref) =>
    set((state) => ({
      fieldRefs: {
        ...state.fieldRefs,
        [key]: ref,
      },
    })),

  // Focus management
  focusedField: null,
  setFocusedField: (field) => set({ focusedField: field }),
  blurTimeoutRef: null,
  setBlurTimeoutRef: (timeout) => set({ blurTimeoutRef: timeout }),

  // Variables picker visibility
  variablesPickerVisible: false,
  setVarPicker: (value) => {
    set(() => ({ variablesPickerVisible: value }))
  },

  // Selected output/variable
  selectedOutputOrVariable: null,
  setSelectedOutputOrVariable: (name) => {
    set({ selectedOutputOrVariable: name })
  },

  // Popover interaction
  isPopoverInteracting: false,
  setIsPopoverInteracting: (open) => {
    set({ isPopoverInteracting: open })
  },

  // Variables picker props
  varPickerProps: null,
  setVarPickerProps: (props) => {
    set({ varPickerProps: props })
  },
})
