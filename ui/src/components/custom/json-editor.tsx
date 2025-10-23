import CodeMirror from "@uiw/react-codemirror"
import { json } from "@codemirror/lang-json"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView } from "@codemirror/view"
import { linter, Diagnostic } from "@codemirror/lint"

interface JsonEditorProps {
  value: string
  onChange: (value: string) => void
  height?: string
  placeholder?: string
  theme?: "light" | "dark"
  language?: "json" | "binary"
}

export function JsonEditor({
  value,
  onChange,
  height = "200px",
  placeholder,
  theme = "light",
  language = "json",
}: JsonEditorProps) {
  const getLanguageExtension = () => {
    switch (language) {
      case "binary":
        return []
      default:
        return json()
    }
  }

  // JSON validator for linting
  const jsonLinter = linter((view) => {

    const diagnostics: Diagnostic[] = []
    if (language === "json") {
      try {
        JSON.parse(view.state.doc.toString())
      } catch (e: any) {
        diagnostics.push({
          from: 0,
          to: view.state.doc.length,
          severity: "error",
          message: e.message,
        })
      }
    }
    return diagnostics
  })

  const extensions = [
    getLanguageExtension(),
    EditorView.theme({
      "&": { fontSize: "14px" },
      ".cm-content": { padding: "12px", minHeight: height },
      ".cm-focused": { outline: "none" },
      ".cm-editor": { borderRadius: "6px" },
      ".cm-scroller": {
        fontFamily:
          "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, monospace",
      },
    }),
    ...(language === "json" ? [jsonLinter] : []),
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
