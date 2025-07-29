export const ConversationChainJson = {
  nodeType: "langchain",
  type: "ConversationChain",
  label: "Conversational Chain",
  color: "#72797b",
  normalHandle: ["integration", "basic", "automationTools", "langchain"],
  rightSideData: {
    nodesCanConnectWith: {
      1: { nodeType: "model", title: "Chat Model", required: true },
      2: { nodeType: "memory", title: "Memory", required: true },
    },
    json: [
      {
        type: "dropdown",
        label: "Prompt type",
        value: "default-prompt",
        variableName: "promptType",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Default Prompt",
            value: "default-prompt",
          },
          {
            option: "Chat Prompt",
            value: "chatPrompt",
          },
        ],
        options: {
          "chatPrompt": [
            {
              type: "textfield",
              label: "Template",
              multiline: true,
              minRows: 4,
              required: true,
              variableName: "template",
              value: "",
              placeholder: "Template",
              hasDynamicVariable: true,
            },
            {
              type: "dynamic",
              fieldsArray: [],
              title: "Messages",
              variableName: "messages",
              // required: true,
              structure: [
                {
                  type: "row",
                  title: "Message",
                  variableName: "message",
                  removeButton: true,
                },
                {
                  label: "Human Message",
                  type: "textfield",
                  value: "",
                  multiline: true,
                  minRows: 4,
                  // required: true,
                  placeholder: "message",
                  variableName: "humanMessage",
                  hasDynamicVariable: true,
                  rightSideInput: true,
                },
                {
                  label: "AI Message",
                  type: "textfield",
                  value: "",
                  multiline: true,
                  minRows: 4,
                  // required: true,
                  placeholder: "message",
                  variableName: "aiMessage",
                  hasDynamicVariable: true,
                  rightSideInput: true,
                },
              ],
            },
          ],
        },
      },
      {
        type: "textfield",
        label: "Question",
        required: true,
        multiline: true,
        minRows: 4,
        variableName: "question",
        chatbotQuestion: true,
        value: "",
        placeholder: "e.g Whats going on your mind ?",
        hasDynamicVariable: true,
      },
      {
        type: "outputJson",
        value: {
          Output: {
            "answer": "",
          },
          Error: "",
          Status: "",
        },
      },
    ],
  },
};
