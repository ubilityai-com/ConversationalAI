export const MistralAIChatModelJson = {
    nodeType: "model",
    type: "MistralAIChatModel",
    label: "Mistral AI Chat Model",
    color: "#72797b",
    description: "For advanced usage with an AI chain",
    rightSideData: {
      json: [
        {
          type: "api",
          label: "Credentials",
          variableName: "cred",
          required: true,
          credential: true,
          credType: "MistralAi",
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
                      value: "mistralAi",
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
          accTitle: "Temperature",
          variableName: "samplingTemperature",
          fieldsArray: [
            [
              {
                type: "textfield",
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
          accTitle: "Max Output Tokens",
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
          accTitle: "Random Seed",
          variableName: "randomSeed",
          fieldsArray: [
            [
              {
                type: "textfield",
                variableName: "randomSeed",
                numberField: true,
                value: "",
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
                placeholder: "Top P",
                hasDynamicVariable: true,
              },
            ],
          ],
        },
        {
        type: "accordion",
        accTitle: "Safe Mode",
        variableName: "safeMode",
        fieldsArray: [
            [
              {
              type: "checkbox",
              value: false,
              variableName: "safeMode",
              rightSideInput: true
              }
            ]
          ]
        },
      ],
    },
  };
  