export const FireworksChatModelJson = {
  category: "model",
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
