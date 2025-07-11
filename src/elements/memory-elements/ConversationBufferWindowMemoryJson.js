export const ConversationBufferWindowMemoryJson = {
  "type": "ConversationBufferWindowMemory",
  "label": "Conversation Buffer Window Memory",
  "color": "black",
  "nodeType": "memory",
  "new": true,
  defaultValid: false,
  "rightSideData": {
    "json": [
      {
        type: "textfield",
        label: "Size",
        required: true,
        variableName: "size",
        typeOfValue: "integer",
        numberField: true,
        placeholder: "eg 5",
        value: "",
        hasDynamicVariable: true,
        helperSpan: "Last K messages to fetch"
      },

    ]
  }
}
