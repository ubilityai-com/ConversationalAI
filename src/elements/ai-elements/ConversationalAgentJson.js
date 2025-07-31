export const ConversationalAgentJson = {
  "type": "ConversationalAgent",
  "label": "Conversational Agent",
  "color": "black",
  "category": "ai",
  "new": true,
  extra: { nodeRobotType: "AiAgent" },
  normalHandle: ["integration", "basic", "automationTools", "ai"],
  rightSideData: {
    nodesCanConnectWith: {
      '1': { category: "model", title: "Chat Model", required: true },
      '2': { category: "memory", title: "Memory" },
      '3': { category: "tool", title: "Tool", multiple: true, required: true },
      "4": { category: "outputParser", title: "Output Parser" },

    },
    "json": [
      {
        type: "textfield",
        label: "Question",
        required: true,
        multiline: true,
        minRows: 4,
        chatbotQuestion: true,
        variableName: "question",
        value: "",
        placeholder: "e.g Whats going on your mind ?",
        hasDynamicVariable: true,
      },
      {
        type: "accordion",
        title: "Additional Fields",
        accTitle: "System Message",
        variableName: "systemMessage",
        fieldsArray: [
          [
            {
              type: "textfield",
              label: "System Message",
              multiline: true,
              minRows: 4,
              required: true,
              variableName: "systemMessage",
              value: "You are a helpful AI assistant.",
              placeholder: "e.g Hello, how can you help me?",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Max Iterations",
        variableName: "maxIterations",
        fieldsArray: [
          [
            {
              type: "textfield",
              label: "Max Iterations",
              variableName: "maxIterations",
              numberField: true,
              value: 10,
              required: true,
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Return Intermediate Steps",
        variableName: "returnIntermediateSteps",
        fieldsArray: [
          [
            {
              type: "checkbox",
              value: false,
              variableName: "returnIntermediateSteps",
              rightSideInput: true,
            },
          ],
        ],
      },
      {
        type: "outputJson",
        value: {
          Output: {
            "input": "",
            "history": "",
            "output": ""
          },
          Error: "",
          Status: "",
        },
      },
    ]
  }
}
