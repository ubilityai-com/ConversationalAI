export const AI21ChatModelJson = {
  category: "model",
  type: "AI21ChatModel",
  label: "AI21 Chat Model",
  color: "#72797b",
  description: "Language Model AI21",
  rightSideData: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "AI21",
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
        type: "dropdown",
        label: "Model",
        variableName: "model",
        value: "jamba-mini",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "jamba-mini",
            value: "jamba-mini",
          },
          {
            option: "jamba-large",
            value: "jamba-large",
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
              value: "0.4",
              numberField: true,
              typeOfValue: "float",
              variableName: "temperature",
              rightSideInput: true,
              placeholder: "Temperature",
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
              variableName: "maximumNumberOfTokens",
              numberField: true,
              value: "512",
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
              value: "1",
              placeholder: "Top P",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
    ],
  },
};
