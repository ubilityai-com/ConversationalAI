export const FireworksChatModelJson = {
    nodeType: "model",
    type: "FireworksChatModel",
    label: "Fireworks Chat Model",
    color: "#72797b",
    description: "Language Model Fireworks",
    rightSideData: {
      json: [
        {
          type: "api",
          label: "Credentials",
          variableName: "cred",
          required: true,
          credential: true,
          credType: "Fireworks",
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
          value: "",
          placeholder: "accounts/fireworks/models/llama-v3-70b-instruct",
          hasDynamicVariable: true,
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
                value: "0.8",
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
      ],
    },
  };
  