export const EmbeddingsIBMWatsonxJson = {
  "category": "embedding",
  "type": "EmbeddingsIBMWatsonx",
  "label": "Embeddings IBM Watsonx",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/EmbeddingsIBMWatsonx/getting_started",
  "description": "Use IBM Watsonx Embeddings",
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
        credType: "IBMWatsonx",
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
                  "ibmWatsonx/listModels",
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
                value: "embedding"
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
        accTitle: "Truncate Input Tokens",
        variableName: "truncateInputTokens",
        fieldsArray: [
          [
            {
              type: "textfield",
              label: "Truncate Input Tokens",
              variableName: "truncateInputTokens",
              numberField: true,
              value: "",
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
              label: "Max Retries",
              variableName: "maxRetries",
              numberField: true,
              value: "",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Max Concurrency",
        variableName: "maxConcurrency",
        fieldsArray: [
          [
            {
              type: "textfield",
              label: "Max Concurrency",
              variableName: "maxConcurrency",
              numberField: true,
              value: "",
              hasDynamicVariable: true,
            },
          ],
        ],
      },

    ],
  }
};