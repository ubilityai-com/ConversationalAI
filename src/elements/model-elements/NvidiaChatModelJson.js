export const NvidiaChatModelJson = {
  nodeType: "model",
  type: "NvidiaChatModel",
  label: "Nvidia Chat Model",
  color: "#72797b",
  description: "Language Model Nvidia",
  rightSideData: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Nvidia",
        value: "None",
        list: [],
        config: [
          {
            key: "method",
            value: "get",
          },
          {
            key: "headers",
            obj: [
              {
                key: "Authorization",
                dependOn: [
                  {
                    type: "static",
                    value: "Bearer ",
                  },
                  {
                    type: "redux",
                    value: "authentication.authToken",
                  },
                ],
              },
              {
                key: "content-type",
                value: "application/json",
              },
            ],
          },
          {
            key: "url",
            dependOn: [
              {
                type: "static",
                value:
                  process.env.REACT_APP_DNS_URL + "cloud/azure/credential/list",
              },
            ],
          },
        ],
        res: {
          path: "data",
          keys: {
            option: {
              fields: ["credName"],
            },
            value: {
              fields: ["credName"],
            },
            type: { fields: ["type"] },
          },
        },
        apiDependsOn: [],
        conditionOnFirstTime: [],
        conditionOnRefresh: [],
      },
      {
        type: "api",
        label: "Model",
        variableName: "model",
        value: "None",
        required: true,
        list: [],
        config: [
          {
            key: "method",
            value: "post",
          },
          {
            key: "url",
            dependOn: [
              {
                type: "static",
                value:
                  process.env.REACT_APP_DNS_URL +
                  "cloud/regular/langchain/getModels",
              },
            ],
          },
          {
            key: "headers",
            obj: [
              {
                key: "Authorization",
                dependOn: [
                  {
                    type: "static",
                    value: "Bearer ",
                  },
                  {
                    type: "redux",
                    value: "authentication.authToken",
                  },
                ],
              },
              {
                key: "content-type",
                value: "application/json",
              },
            ],
          },
          {
            key: "data",
            obj: [
              {
                key: "credential_name",
                dependOn: "cred",
                isAutomation: true,
              },
              {
                key: "provider",
                obj: [
                  {
                    key: "providerName",
                    value: "nvidia",
                  },
                  {
                    key: "modelType",
                    value: "chat",
                  },
                ],
              },
            ],
          },
        ],
        res: {
          path: "data.Models",
          type: [],
          key: true,
        },
        apiDependsOn: [
          {
            type: "dropdown",
            name: "cred",
            isAutomation: true,
          },
        ],
        conditionOnFirstTime: [
          {
            type: "dropdown",
            name: "cred",
            isAutomation: true,
          },
        ],
        conditionOnRefresh: [
          {
            type: "dropdown",
            name: "cred",
            isAutomation: true,
          },
        ],
      },
      {
        type: "dynamic",
        fieldsArray: [],
        title: "stop words",
        hasAI: true,
        variableName: "stopWords",
        required: false,
        structure: [
          {
            type: "row",
            title: "word",
            variableName: "stopwordsRow",
            removeButton: true,
          },
          {
            type: "textfield",
            value: "",
            placeholder: "word",
            variableName: "word",
            required: false,
            hasDynamicVariable: true,
            helperSpan:
              "Enter words that the model should ignore. These words will be excluded from the output to avoid repetition or irrelevant results.",
          },
        ],
      },
      {
        title: "Additional Fields",
        type: "accordion",
        accTitle: "Temperature",
        variableName: "temperature",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "temperature",
              numberField: true,
              value: 0.8,
              placeholder: "Sampling Temperature",
              hasDynamicVariable: true,
              helperSpan: "Sampling temperature in [0,1].",
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Top P",
        variableName: "topP",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "topP",
              value: 0.9,
              numberField: true,
              placeholder: "Top P",
              hasDynamicVariable: true,
              helperSpan:
                "Controls randomness. Picks from top tokens whose total probability ≥ top_p. Lower = focused, higher = creative.",
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Max Token",
        variableName: "maxToken",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "maxToken",
              numberField: true,
              value: 4096,
              placeholder: "max token",
              hasDynamicVariable: true,
              helperSpan: "Maximum number of tokens to generate.",
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Seed",
        variableName: "seed",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "seed",
              numberField: true,
              value: "",
              placeholder: "seed",
              hasDynamicVariable: true,
              helperSpan:
                "Leave empty for random output. Set a fixed number to ensure consistent results for the same input.",
            },
          ],
        ],
      },
    ],
  },
};
