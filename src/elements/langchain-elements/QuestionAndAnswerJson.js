export const QuestionAndAnswerJson = {
  category: "langchain",
  type: "QuestionAndAnswer",
  label: "Question & Answer",
  color: "#72797b",
  normalHandle: ["integration", "basic", "automationTools", "langchain"],
  rightSideData: {
    nodesCanConnectWith: {
      1: { category: "model", title: "Chat Model", required: true },
      2: { category: "vectorStore", title: "Vector Store", required: true },
    },
    json: [
      {
        type: "textfield",
        label: "Prompt",
        multiline: true,
        minRows: 4,
        required: true,
        variableName: "prompt",
        value: "As an AI assistant you provide answers to the question {question} based on the provided context {context}. \nYou must adhere to the following points:\n-Do not use any external data source\n-Do not use your data set\n-Do not use internet to get answer\n-Do not use any external data source if the context is empty\n-Say I don't know. if the context is empty",
        placeholder: "e.g Whats going on your mind ?",
        hasDynamicVariable: true,
        validation: "validateRequiredWords",
        requiredWords: { "{question}": true, "{context}": true },
        helperSpan:
          "Prompt must include inputs variables: {question} and {context}.",
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
          Output: { answer: "", references: "" },
          Error: "",
          Status: "",
        },
      },
    ],
  },
};
