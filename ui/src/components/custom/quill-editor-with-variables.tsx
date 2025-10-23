import { useRef } from "react"
import ReactQuill from "react-quill"
import { useFlowStore } from "../../store/root-store"
import { getAllPreviousNodes } from "../../lib/utils/utils"
import { QuillEditor, QuillEditorProps } from "../ui/quill-editor"

interface EditorProps extends QuillEditorProps {
  value: string
  variableName: string
  onChange: (value: string) => void
}

export function Editor({ value, variableName, onChange, ...props }: EditorProps) {
  const setVarPicker = useFlowStore((state) => state.setVarPicker)
  const setVarPickerProps = useFlowStore((state) => state.setVarPickerProps)
  const clickedElement = useFlowStore((state) => state.clickedElement)

  const {
    setFieldRef,
    setFocusedField,
    blurTimeoutRef,
    setBlurTimeoutRef,
  } = useFlowStore()

  const isPopoverInteracting = useFlowStore(
    (state) => state.isPopoverInteracting
  )

  const quillRef = useRef<ReactQuill | null>(null)

  const handleFieldFocus = () => {
    if (blurTimeoutRef) {
      clearTimeout(blurTimeoutRef)
      setBlurTimeoutRef(null)
    }
    setVarPicker(true)
    if (clickedElement) {
      setVarPickerProps({
        allowedNodeIds: getAllPreviousNodes(clickedElement?.id),
        insertVariable: insertText,
      })
    }
    const editorEl = quillRef.current?.editor?.root as HTMLElement | null
    setFieldRef(variableName, editorEl)
    setFocusedField(variableName)
  }

  const handleFieldBlur = () => {
    const timeout = setTimeout(() => {
      if (!isPopoverInteracting) {
        setVarPicker(false)
      }
    }, 100)
    setBlurTimeoutRef(timeout)
  }

  const insertText = (text: string) => {
    const editor = quillRef.current?.getEditor()
    if (editor) {
      const range = editor.getSelection(true)
      if (range) {
        editor.insertText(range.index, text, "user")
      } else {
        editor.insertText(editor.getLength() - 1, text, "user")
      }
      editor.setSelection(editor.getLength(), 0)
    }
  }

  return (
    <div>
      <QuillEditor
        ref={quillRef}
        value={value}
        onChange={onChange}
        onFocus={handleFieldFocus}
        onBlur={handleFieldBlur}
        {...props} // 🔑 forward extra props like modules, formats, placeholder, etc.
      />
    </div>
  )
}
