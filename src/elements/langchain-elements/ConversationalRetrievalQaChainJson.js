export const ConversationalRetrievalQaChainJson = {
  "type": "ConversationalRetrievalQaChain",
  "label": "Conversational Retrieval QA Chain",
  "color": "black",
  "nodeType": "langchain",
  "normalHandle": ["integration", "basic", "automationTools", "langchain"],
  "new": true,
  "rightSideData": {
    "nodesCanConnectWith": {
      "1": { "nodeType": "model", "title": "Chat Model", "required": true },
      "2": { "nodeType": "memory", "title": "Memory", "required": true },
      "3": { "nodeType": "vectorStore", "title": "Vector Store", "required": true },
    },
    "json": [
      {
        type: "textfield",
        label: "Question",
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
        "type": "accordion",
        "accTitle": "Rephrase Prompt",
        "variableName": "rephrasePrompt",
        "fieldsArray": [
          [
            {
              type: "textfield",
              multiline: true,
              minRows: 4,
              variableName: "rephrasePrompt",
              value: "Given the following conversation and a user question, rephrase the question to be a standalone question.\nChat History:\n{history}\nStandalone Question:",
              placeholder: "e.g Whats going on your mind ?",
              hasDynamicVariable: true,
              validation: "validateRequiredWords",
              requiredWords: { "{history}": true },
              helperSpan:
                "Prompt must include inputs variables: {history}.",
            },
          ]
        ]
      },
      {
        "type": "accordion",
        "accTitle": "Response Prompt",
        "variableName": "responsePrompt",
        "fieldsArray": [
          [
            {
              type: "textfield",
              multiline: true,
              minRows: 4,
              variableName: "responsePrompt",
              value: "I want you to act as a document that I am having a conversation with. Your name is \"AI Assistant\". Using the provided context, answer the user's question to the best of your ability using the resources provided.\nIf there is nothing in the context relevant to the question at hand, just say \"Hmm, I'm not sure\" and stop after that. Refuse to answer any question not about the info. Never break character.\n------------\n\n{context}\n\n------------\nREMEMBER: If there is no relevant information within the context, just say \"Hmm, I'm not sure\". Don't try to make up an answer. Never break character.",
              placeholder: "e.g Whats going on your mind ?",
              hasDynamicVariable: true,
              validation: "validateRequiredWords",
              requiredWords: { "{context}": true },
              helperSpan:
                "Prompt must include inputs variables: {context}.",
            },
          ]
        ]
      },
      {
        type: "outputJson",
        value: {
          Output: { answer: "" },
          Error: "",
          Status: "",
        },
      },
    ]
  }
}
