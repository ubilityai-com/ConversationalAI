export const OpenAIChatModelJson = {
  nodeType: "model",
  type: "OpenAIChatModel",
  label: "OpenAI Chat Model",
  color: "#72797b",
  description: "For advanced usage with an AI chain",
  defaultValid: false,
  rightSideData: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "OpenAI",
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
                    value: "openai",
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
        accTitle: "Base Url",
        variableName: "baseUrl",
        fieldsArray: [
          [
            {
              type: "textfield",
              // label: "Base Url",
              variableName: "baseUrl",
              value: "https://api.openai.com/v1",
              placeholder: "Base Url",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Maximum Number Of Tokens",
        variableName: "maximumNumberOfTokens",
        fieldsArray: [
          [
            {
              type: "textfield",
              // label: "Maximum Number Of Tokens",
              variableName: "maximumNumberOfTokens",
              numberField: true,
              value: "4096",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Sampling Temperature",
        variableName: "samplingTemperature",
        fieldsArray: [
          [
            {
              type: "textfield",
              // label: "Sampling Temperature",
              variableName: "samplingTemperature",
              numberField: true,
              value: "0.8",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Timeout",
        variableName: "timeout",
        fieldsArray: [
          [
            {
              type: "textfield",
              // label: "Timeout",
              variableName: "timeout",
              numberField: true,
              value: "60000",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Max Retries",
        variableName: "maxRetries",
        fieldsArray: [
          [
            {
              type: "textfield",
              // label: "Max Retries",
              variableName: "maxRetries",
              numberField: true,
              value: 2,
              hasDynamicVariable: true,
            },
          ],
        ],
      },
    ],
  },
};
