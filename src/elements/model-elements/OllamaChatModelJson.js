export const OllamaChatModelJson = {
  nodeType: "model",
  type: "OllamaChatModel",
  label: "Ollama Chat Model",
  color: "#72797b",
  description: "Language Model Ollama",
  rightSideData: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Ollama",
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
                    value: "ollama",
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
        title: "Additional Fields",
        type: "accordion",
        accTitle: "Sampling Temperature",
        variableName: "samplingTemperature",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "samplingTemperature",
              numberField: true,
              value: 0.7,
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Top K",
        variableName: "topK",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "topK",
              numberField: true,
              value: 40,
              hasDynamicVariable: true,
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
              numberField: true,
              value: 0.9,
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Keep Alive",
        variableName: "keepAlive",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "keepAlive",
              value: "5m",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Number of GPUs",
        variableName: "numGPU",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "numGPU",
              numberField: true,
              value: -1,
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Context Length",
        variableName: "contextLength",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "contextLength",
              numberField: true,
              value: 2048,
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Number of CPU Threads",
        variableName: "numberCPUThreads",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "numberCPUThreads",
              numberField: true,
              value: 0,
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Repetition Penalty",
        variableName: "repetitionPenalty",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "repetitionPenalty",
              numberField: true,
              value: 1.1,
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Output Format",
        variableName: "outputFormat",
        fieldsArray: [
          [
            {
              type: "dropdown",
              value: "default",
              variableName: "outputFormat",
              hasDynamicVariable: true,
              list: [
                {
                  option: "Default",
                  value: "default",
                },
                {
                  option: "Json",
                  value: "json",
                },
              ],
            },
          ],
        ],
      },
    ],
  },
};
