import { GripVertical } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useFlowStore } from "../store/root-store"
import { PropertiesPanel } from "./properties-panel"
import { VariablesPanel } from "./variable-picker"

export default function RightSideDrawer() {
  const drawerRef = useRef<HTMLDivElement>(null)
  const [drawerWidth, setDrawerWidth] = useState(400)

  const clickedElement = useFlowStore((state) => state.clickedElement)
  const variablesPickerVisible = useFlowStore((state) => state.variablesPickerVisible)
  const setVarPicker = useFlowStore((state) => state.setVarPicker)

  // Initialize and handle window resize
  useEffect(() => {
    const updateWidth = () => {
      const rightSideWidth = document.body.offsetWidth * 0.3
      setDrawerWidth(Math.max(400, rightSideWidth))
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  // Handle drawer resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = document.body.offsetWidth - moveEvent.clientX
      if (newWidth >= 400 && newWidth <= 900) setDrawerWidth(newWidth)
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <>
      <VariablesPanel
        isOpen={variablesPickerVisible}
        onClose={() => setVarPicker(false)}
        right={drawerWidth}
      />

      <div
        ref={drawerRef}
        data-open={!!clickedElement ? "open" : "closed"}
        style={{ width: `${drawerWidth}px`, overflow: "visible" }}
        className="fixed top-[65px] right-0 h-[calc(100%-61px)] min-h-[calc(100%-61px)] group bg-background shadow-2xl border-l border-border transition-transform duration-300 ease-in-out z-40 data-[open=closed]:translate-x-full data-[open=open]:translate-x-0"
      >
        {/* Dragger */}
        <div
          className="group-data-[open=closed]:hidden absolute left-0 inset-y-0 w-1 cursor-ew-resize flex items-center hover:bg-[#72afdd] hover:opacity-50"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-[#72afdd] rounded-full p-1 hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Properties Panel */}
        <div className="flex-1 h-full overflow-y-auto">
          <PropertiesPanel />
        </div>
      </div>
    </>
  )
}
