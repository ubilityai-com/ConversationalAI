import { forwardRef } from "react"
import ReactQuill, { ReactQuillProps } from "react-quill"
import "react-quill/dist/quill.snow.css"

export type QuillEditorProps = ReactQuillProps

// Generic wrapper around ReactQuill
export const QuillEditor = forwardRef<ReactQuill, QuillEditorProps>(
  ({ value, onChange, onFocus, onBlur, ...props }, ref) => {
    return (
      <ReactQuill
        ref={ref}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        theme="snow"
        {...props} // 🔑 allows passing any ReactQuillProps (modules, formats, etc.)
      />
    )
  }
)

QuillEditor.displayName = "QuillEditor"
