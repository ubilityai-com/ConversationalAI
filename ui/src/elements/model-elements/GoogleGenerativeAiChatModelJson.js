export const GoogleGenerativeAiChatModelJson = {
  category: "model",
  type: "GoogleGenerativeAiChatModel",
  label: "Google GenerativeAi Chat Model",
  color: "#72797b",
  description: "Language Model Google GenerativeAi",
  rightSideData: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Gemini",
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
        type: "dropdown",
        label: "API Version",
        value: "v1",
        variableName: "apiVersion",
        errorSpan: "Please choose a Version",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Default",
            value: "v1",
          },
          {
            option: "Beta",
            value: "v1beta",
          },
        ],
      },
      {
        type: "api",
        label: "Model",
        variableName: "model",
        value: "",
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
                  "googleGenerativeAi/listModels",
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
                key: "apiVersion",
                dependOn: "apiVersion",
                isAutomation: true,
              },
              {
                key: "modelType",
                value: "generateContent"
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
          {
            type: "dropdown",
            name: "apiVersion",
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
        accTitle: "Max Output Tokens",
        variableName: "maxOutputTokens",
        fieldsArray: [
          [
            {
              type: "textfield",
              value: "",
              numberField: true,
              typeOfValue: "integer",
              variableName: "maxOutputTokens",
              rightSideInput: true,
              placeholder: "Max Output Tokens",
              hasDynamicVariable: true,
              helperSpan:
                "The maximum number of tokens to use for the response. Maximum value is 2048.",
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Temperature",
        variableName: "temperature",
        fieldsArray: [
          [
            {
              type: "textfield",
              value: "",
              numberField: true,
              typeOfValue: "float",
              variableName: "temperature",
              rightSideInput: true,
              placeholder: "Temperature",
              hasDynamicVariable: true,
              helperSpan:
                "Controls the randomness of the output. Values can range from [0.0,1.0], inclusive. A value closer to 1.0 will produce responses that are more varied and creative, while a value closer to 0.0 will typically result in more straightforward responses from the model.",
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
              value: "",
              numberField: true,
              typeOfValue: "float",
              variableName: "topP",
              rightSideInput: true,
              placeholder: "Top P",
              hasDynamicVariable: true,
              helperSpan:
                "The maximum cumulative probability of tokens to consider when sampling.",
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
              value: "",
              numberField: true,
              typeOfValue: "float",
              variableName: "topK",
              rightSideInput: true,
              placeholder: "Top K",
              hasDynamicVariable: true,
              helperSpan:
                "The maximum number of tokens to consider when sampling.",
            },
          ],
        ],
      },
    ],
  },
};
