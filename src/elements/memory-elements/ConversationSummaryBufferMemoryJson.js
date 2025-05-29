export const ConversationSummaryBufferMemoryJson = {
  "type": "ConversationSummaryBufferMemory",
  "label": "Conversation Summary Buffer Memory",
  "color": "black",
  "nodeType": "memory",
  "new": true,
  "rightSideData": {
    "json": [
      {
        type: "textfield",
        required:true,
        label: "Max token limit",
        variableName: "maxTokenLimit",
        value:"",
        numberField: true,
        typeOfValue:"integer",
        placeholder: "eg 50",
        hasDynamicVariable: true,
        helperSpan:"Summarize conversations once token limit is reached"
      },
    ]
  }
}
