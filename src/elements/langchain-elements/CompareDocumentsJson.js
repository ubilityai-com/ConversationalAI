export const CompareDocumentsJson = {
  nodeType: "langchain",
  type: "CompareDocuments",
  label: "Compare Documents",
  color: "#72797b",
  normalHandle: ["integration", "basic", "automationTools", "langchain"],
  rightSideData: {
    nodesCanConnectWith: {
      1: { nodeType: "model", title: "Chat Model", required: true },
      2: { nodeType: "vectorStore", title: "Vector Store", required: true },
    },
    json: [
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
        type: "dynamic",
        fieldsArray: [],
        title: "Files",
        required: true,
        variableName: "files",
        minSize: 2,
        errorSpan: "There at least should be 2 files.",
        structure: [
          {
            type: "row",
            title: "File Name",
            variableName: "files",
            removeButton: true,
          },
          {
            type: "textfield",
            label: "File name",
            required: true,
            variableName: "name",
            value: "",
            placeholder: "e.g myPdfName",
            hasDynamicVariable: true,
          },
        ],
      },
      {
        type: "outputJson",
        value: {
          Output: {
            input: "",
            history: "",
            output: "",
          },
          Error: "",
          Status: "",
        },
      },
    ],
  },
};
