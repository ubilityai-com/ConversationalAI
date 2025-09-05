export const AzureChatModelJson = {
  category: "model",
  type: "AzureChatModel",
  label: "Azure OpenAI Chat Model",
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
        credType: "AzureOpenAi",
        value: "",
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
        type: "textfield",
        label: "Deployment Name",
        variableName: "model",
        value: "",
        required: true,
        placeholder: "e.g.: gpt-4o",
        hasDynamicVariable: true,
      },
      {
        title: "Additional Fields",
        type: "accordion",
        accTitle: "Maximum Number Of Tokens",
        variableName: "maximumNumberOfTokens",
        fieldsArray: [
          [
            {
              type: "textfield",
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
        accTitle: "Sampling Temperature",
        variableName: "samplingTemperature",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "samplingTemperature",
              numberField: true,
              value: 0.8,
              placeholder: "Sampling Temperature",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      // {
      //   type: "accordion",
      //   accTitle: "Top K",
      //   variableName: "topK",
      //   fieldsArray: [
      //     [
      //       {
      //         type: "textfield",
      //         variableName: "topK",
      //         value: 40,
      //         numberField: true,
      //         placeholder: "Top K",
      //         hasDynamicVariable: true,
      //       },
      //     ],
      //   ],
      // },
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
        accTitle: "Max Retries",
        variableName: "maxRetries",
        fieldsArray: [
          [
            {
              type: "textfield",
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
        accTitle: "Timeout",
        variableName: "timeout",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "timeout",
              numberField: true,
              value: 60000,
              hasDynamicVariable: true,
            },
          ],
        ],
      },
    ],
  },
};
