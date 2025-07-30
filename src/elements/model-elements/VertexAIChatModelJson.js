export const VertexAIChatModelJson = {
  category: "model",
  type: "VertexAIChatModel",
  label: "Vertex AI Chat Model",
  color: "#72797b",
  description: "Language Model Vertex AI",
  rightSideData: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "VertexAi",
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
        type: "textfield",
        label: "Model",
        variableName: "model",
        required: true,
        value: "",
        placeholder: "Model",
        hasDynamicVariable: true,
      },
      {
        title: "Additional Fields",
        type: "accordion",
        accTitle: "Max Output Tokens",
        variableName: "maxOutputTokens",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "maxOutputTokens",
              numberField: true,
              value: "4096",
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
    ],
  },
};
