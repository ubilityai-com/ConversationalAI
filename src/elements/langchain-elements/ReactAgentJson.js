export const ReactAgentJson = {
  "type": "ReactAgent",
  "label": "React Agent",
  "color": "black",
  "nodeType": "langchain",
  "new": true,
  normalHandle: ["regular", "basic", "automationTools", "langchain"],
  rightSideData: {
    nodesCanConnectWith: {
      '1': { nodeType: "model", title: "Chat Model", required: true },
      '2': { nodeType: "tool", title: "Tool", multiple: true, required: true },
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
      {
        type: "outputJson",
        value: {
          Output: {
            "answer": ""
          },
          Error: "",
          Status: "",
        },
      },
    ]
  }
}
