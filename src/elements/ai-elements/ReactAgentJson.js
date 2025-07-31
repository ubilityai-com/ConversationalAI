export const ReactAgentJson = {
  "type": "ReactAgent",
  "label": "React Agent",
  "color": "black",
  "category": "ai",
  "new": true,
  normalHandle: ["integration", "basic", "automationTools", "ai"],
  rightSideData: {
    nodesCanConnectWith: {
      '1': { category: "model", title: "Chat Model", required: true },
      '2': { category: "tool", title: "Tool", multiple: true, required: true },
    },
    "json": [
      {
        type: "textfield",
        label: "Query",
        required: true,
        multiline: true,
        minRows: 4,
        variableName: "query",
        chatbotQuestion: true,
        value: "",
        placeholder: "e.g Whats going on your mind ?",
        hasDynamicVariable: true,
      },
    ]
  }
}
