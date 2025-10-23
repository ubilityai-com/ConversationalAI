export const CohereChatModelJson = {
  "category": "model",
  type: "CohereChatModel",
  label: "Cohere Chat Model",
  color: "#72797b",
  description: "Language Model Cohere",
  rightSideData: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Cohere",
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
                  "cohere/listModels",
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
    ],
  },
};