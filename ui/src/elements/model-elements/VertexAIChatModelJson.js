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
        value: "",
        list: [],
        config: [
          {
            key: "method",
            value: "get",
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
