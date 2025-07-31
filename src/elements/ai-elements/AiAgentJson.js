export const AiAgentJson = {
  "category": "ai",
  type: "AiAgent",
  label: "AI Agent",
  color: "#72797b",
  hidden: true,
  normalHandle: ["integration", "basic", "automationTools", "ai"],
  rightSideData: {
    nodesCanConnectWith: {
      '1': { category: "model", title: "Chat Model", required: true },
      '2': { category: "memory", title: "Memory" },
      '3': { category: "tool", title: "Tool", multiple: true, required: true },
      "4": { category: "outputParser", title: "Output Parser" },

    },
    json: [
      {
        type: "dropdown",
        label: "Agent",
        value: "conversational-agent",
        variableName: "agent",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Conversational Agent",
            value: "conversational-agent",
          },
          {
            option: "OpenAI Functions Agent",
            value: "openai-functions-agent",
          },
          {
            option: "ReAct Agent",
            value: "react",
          },
        ],
        options: {
          "conversational-agent": [
            //     {
            //       type: "dropdown",
            //       label: "Prompt type",
            //       value: "default-prompt",
            //       variableName: "prompt-type",
            //       required: true,
            //       hasDynamicVariable: false,
            //       list: [
            //         {
            //           option: "Default Prompt",
            //           value: "default-prompt",
            //         },
            //         {
            //           option: "Custom Prompt",
            //           value: "custom-prompt",
            //         },
            //       ],
            //       options: {
            //         "custom-prompt": [
            //           {
            //             type: "textfield",
            //             label: "Prompt",
            //             multiline: true,
            //             required: true,
            //             minRows: 4,
            //             variableName: "prompt",
            //             value: "",
            //             placeholder: "e.g Whats going on your mind ?",
            //             hasDynamicVariable: true,
            //           },
            //         ],
            //       },
            //     },
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
            // {
            //   type: "checkbox",
            //   value: false,
            //   label: "Require Specific Output Format",
            //   variableName: "requireSpecificOutputFormat",
            //   rightSideInput: true,
            // },
            // {
            //   type: "accordion",
            //   title: "Additional Fields",
            //   accTitle: "Human Message",
            //   variableName: "humanMessage",
            //   fieldsArray: [
            //     [
            //       {
            //         type: "textfield",
            //         label: "Human Message",
            //         multiline: true,
            //         minRows: 4,
            //         variableName: "humanMessage",
            //         value: "",
            //         placeholder: "e.g Hello, how can you help me?",
            //         hasDynamicVariable: true,
            //       },
            //     ],
            //   ],
            // },
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
          ],
          "openai-functions-agent": [
            // {
            //   type: "dropdown",
            //   label: "Prompt type",
            //   value: "default-prompt",
            //   variableName: "prompt-type",
            //   required: true,
            //   hasDynamicVariable: false,
            //   list: [
            //     {
            //       option: "Default Prompt",
            //       value: "default-prompt",
            //     },
            //     {
            //       option: "Custom Prompt",
            //       value: "custom-prompt",
            //     },
            //   ],
            //   options: {
            //     "custom-prompt": [
            //       {
            //         type: "textfield",
            //         label: "Prompt",
            //         multiline: true,
            //         minRows: 4,
            //         required: true,
            //         variableName: "prompt",
            //         value: "",
            //         placeholder: "e.g Whats going on your mind ?",
            //         hasDynamicVariable: true,
            //       },
            //     ],
            //   },
            // },
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
            // {
            //   type: "checkbox",
            //   value: false,
            //   label: "Require Specific Output Format",
            //   variableName: "requireSpecificOutputFormat",
            //   rightSideInput: true,
            // },
            {
              title: "Additional Fields",
              type: "accordion",
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
          ],
          react: [
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
                    required: true,
                    value: 10,
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
          ],
        },
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
    ],
  },
};
