export const CerebrasChatModelJson = {
  "category": "model",
  "type": "CerebrasChatModel",
  "label": "Cerebras Chat Model",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/CerebrasChatModel/getting_started",
  "description": "For advanced usage with an AI chain",
  "defaultValid": false,
  "automated": "json",
  "automationConfig": "automated",
  "rightSideData": {
    "json": [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Cerebras",
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
                  process.env.REACT_APP_DNS_URL + "credentials",
              },
            ],
          },
        ],
        res: {
          path: "data",
          keys: {
            option: {
              fields: ["name"],
            },
            value: {
              fields: ["name"],
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
                  "cerebras/listModels",
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
                key: "modelType",
                value: "chat"
              }
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
              value: "https://api.cerebras.ai/v1",
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
              value: 4096,
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Temperature",
        variableName: "samplingTemperature",
        fieldsArray: [
          [
            {
              type: "textfield",
              // label: "Sampling Temperature",
              variableName: "samplingTemperature",
              numberField: true,
              typeOfValue: "float",
              value: "0.9",
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
              value: 60000,
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
      {
        type: "accordion",
        accTitle: "Top Probability",
        variableName: "top_P",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "top_P",
              numberField: true,
              typeOfValue: "float",
              value: "",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Frequency Penalty",
        variableName: "frequencyPenalty",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "frequencyPenalty",
              numberField: true,
              typeOfValue: "float",
              value: "",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Presence Penalty",
        variableName: "presencePenalty",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "presencePenalty",
              numberField: true,
              typeOfValue: "float",
              value: "",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
    ]
  }
};