import { Bot } from "lucide-react";

export const ReactAgentJson = {
  type: "ReactAgent",
  label: "React Agent",
  description: "Large Language Model for text processing",
  icon: Bot,
  color: "bg-purple-500",
  category: "ai",
  automated: "json",
  defaults: {
    extras: {
      model: {
        enabled: true,
        type: "",
        content: {},
        description: "Select the model that fits your use case",
        title: "LLM Model",
      },
      memory: {
        enabled: true,
        type: "",
        content: {},
        description: "Select the memory that fits your use case",
        title: "Memory",
        // optional: true,
      },
      tool: {
        multiple: true,
        enabled: true,
        list: [],
        description: "Configure tools for the LLM agent to use",
        title: "Tools",
        // optional: true
      },
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
        type: "accordion",
        accTitle: "Prompt",
        variableName: "prompt",
        fieldsArray: [
          [{
            type: "textfield",
            multiline: true,
            minRows: 4,
            variableName: "prompt",
            value: "Write a concise summary of the following:{docs}CONCISE SUMMARY:",
            placeholder: "prompt",
            hasDynamicVariable: true,
          },]]
      }
    ]
  }
}
