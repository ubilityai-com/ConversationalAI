// VariableInput.tsx
import Document from '@tiptap/extension-document'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import { useRef, useState } from 'react'
// VariableMention.ts
import Mention from '@tiptap/extension-mention'
import { useFlowStore } from '../../store/flow-store'
export const docToPlainText = (doc: any): string => {
  const content = doc?.content?.[0]?.content ?? []
  return content
    .map((node: any) =>
      node.type === 'mention' ? `{${node.attrs.label}}` : node.text ?? ''
    )
    .join('')
}

export const plainTextToDoc = (text: string) => {
  const regex = /{(\w+)}/g
  const nodes = []
  let lastIndex = 0

  for (const match of text.matchAll(regex)) {
    const before = text.slice(lastIndex, match.index)
    if (before) nodes.push({ type: 'text', text: before })

    nodes.push({
      type: 'mention',
      attrs: { id: match[1], label: match[1] },
    })

    lastIndex = match.index! + match[0].length
  }

  const remaining = text.slice(lastIndex)
  if (remaining) nodes.push({ type: 'text', text: remaining })

  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: nodes,
      },
    ],
  }
}

export const VariableMention = Mention.extend({
  name: 'mention',
}).configure({
  HTMLAttributes: {
    class: 'mention',
  },
  renderLabel({ node }) {
    return `{${node.attrs.label}}`
  },
})

const VARIABLES = [
  { id: 'email', label: 'email' },
  { id: 'name', label: 'name' },
  { id: 'date', label: 'date' },
]

export const VariableInput = ({ initialValue="assasasasaassa{name}{name}kkk", onSave }: {
  initialValue?: string,
  onSave?: (value: string) => void,
}) => {
   const setVarPicker = useFlowStore(state => state.setVarPicker)
    const setVarPickerProps = useFlowStore(state => state.setVarPickerProps)
    const SelectedOutputOrVariable = useFlowStore(state => state.selectedOutputOrVariable)
    const setSelectedOutputOrVariable = useFlowStore(state => state.setSelectedOutputOrVariable)

    const {
        setIsPopoverInteracting,
        fieldRefs,
        setFieldRef,
        setFocusedField,
        blurTimeoutRef,
        setBlurTimeoutRef,
        focusedField
    } = useFlowStore()
    
    const isPopoverInteracting = useFlowStore(state => state.isPopoverInteracting)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      HardBreak,
      History,
      VariableMention,
      Placeholder.configure({
        placeholder: 'Type your message...',
      }),
    ],
    content: plainTextToDoc(initialValue || ''),
    onFocus: () => setVarPicker(true),
    onBlur: ({ event }) => {
      if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
        setVarPicker(false)
      }
    },
  })

  const insertMention = (item: { id: string; label: string }) => {
    editor?.chain().focus().insertContent({
      type: 'mention',
      attrs: {
        id: item.id,
        label: item.label,
      },
    }).run()
  }

  const handleSave = () => {

    const value = docToPlainText(editor?.getJSON())
    console.log({value,sss:editor?.getJSON()});
    
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <div className="border rounded px-3 py-2 focus-within:ring-2 ring-blue-300">
        <EditorContent editor={editor} className="min-h-[38px] outline-none" />
      </div>

      {showDropdown && (
        <div className="absolute left-0 top-full mt-2 w-48 rounded border bg-white shadow z-50">
          {VARIABLES.map(item => (
            <button
              key={item.id}
              onMouseDown={(e) => {
                e.preventDefault()
                insertMention(item)
              }}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-2">
        <button
          onClick={handleSave}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  )
}
