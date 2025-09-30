import { Bot } from "lucide-react";

export const ReactAgentJson = {
  type: "ReactAgent",
  label: "AI Agent",
  description: "Large Language Model for text processing",
  icon: Bot,
  color: "bg-purple-500",
  category: "ai",
  automated: "json",
  automationConfig: "automated",
  defaults: {
    extras: {
      model: {
        enabled: true,
        type: "",
        content: {},
        description: "Select the model that fits your use case",
        title: "LLM Model",
      },
      tool: {
        multiple: true,
        enabled: true,
        list: [],
        description: "Configure tools for the LLM agent to use",
        title: "Tool",
        optional: true
      },
    },
    "json": [
      {
        type: "accordion",
        accTitle: "Query",
        variableName: "query",
        fieldsArray: [
          [{
            type: "textfield",
            isExpanded: true,
            label: "Query",
            multiline: true,
            minRows: 4,
            variableName: "query",
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
          [{
            type: "textfield",
            multiline: true,
            isExpanded: true,
            label: "prompt",
            minRows: 4,
            variableName: "prompt",
            value: "",
            placeholder: "prompt",
            hasDynamicVariable: true,
          }]]
      }
    ]
  }
}
