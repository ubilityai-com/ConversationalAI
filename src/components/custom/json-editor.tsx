"use client"

import CodeMirror from "@uiw/react-codemirror"
import { json } from "@codemirror/lang-json"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView } from "@codemirror/view"

interface JsonEditorProps {
  value: string
  onChange: (value: string) => void
  height?: string
  placeholder?: string
  theme?: "light" | "dark"
}

export function JsonEditor({ value, onChange, height = "200px", placeholder, theme = "light" }: JsonEditorProps) {
  const extensions = [
    json(),
    EditorView.theme({
      "&": {
        fontSize: "14px",
      },
      ".cm-content": {
        padding: "12px",
        minHeight: height,
      },
      ".cm-focused": {
        outline: "none",
      },
      ".cm-editor": {
        borderRadius: "6px",
      },
      ".cm-scroller": {
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, monospace",
      },
    }),
  ]

  return (
    <div className="relative border rounded-md overflow-hidden">
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={extensions}
        theme={theme === "dark" ? oneDark : undefined}
        placeholder={placeholder}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightSelectionMatches: false,
        }}
      />
    </div>
  )
}
