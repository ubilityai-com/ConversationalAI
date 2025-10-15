import { Bot } from "lucide-react";

export const QuestionAndAnswerJson = {
  "type": "QuestionAndAnswer",
  "label": "Question and Answer",
  "nodeType": "langchain",
  description: "Answer questions about retrieved documents",
  icon: Bot,
  category: "ai",
  color: "bg-teal-500",
  automationConfig: "automated",
  automated: "json",
  "defaults": {
    extras: {
      model: {
        enabled: true,
        type: "",
        content: {},
        description: "Select the model that fits your use case",
        title: "LLM Model",
      },
      vectorStore: {
        type: "",
        content: {},
        description: "Select the vector store that fits your use case",
        title: "Vector Store",
      },
      embedding: {
        type: "",
        content: {},
        description: "Select the Embedding that fits your use case",
        title: "Embedding",
      },
    },
    "json": [
      {
        type: "accordion",
        accTitle: "Question",
        variableName: "question",
        fieldsArray: [
          [{
            type: "textfield",
            isExpanded: true,
            label: "Question",
            multiline: true,
            minRows: 4,
            variableName: "question",
            value: "",
            placeholder: "By default will take the last user input",
            hasDynamicVariable: true,
          }]]
      },
      {
        type: "accordion",
        accTitle: "Prompt",
        variableName: "prompt",
        fieldsArray: [
          [
            {
              type: "textfield",
              label: "Prompt",
              multiline: true,
              minRows: 4,
              isExpanded: true,
              variableName: "prompt",
              value: "As an AI assistant you provide answers to the question {question} based on the given context. \nYou must adhere to the following points:\n-Do not use any external data source\n-Do not use your data set\n-Do not use internet to get answer\n-Do not use any external data source if the context is empty\n-Say I don't know. if the context is empty\n-------------------\ncontext: {context}",
              placeholder: "e.g Whats going on your mind ?",
              hasDynamicVariable: true,
              validation: "validateRequiredWords",
              requiredWords: { "{question}": true, "{context}": true },
              helperSpan:
                "Prompt must include inputs variables: {question} and {context}.",
            },
          ]
        ]
      }
    ]
  }
}
