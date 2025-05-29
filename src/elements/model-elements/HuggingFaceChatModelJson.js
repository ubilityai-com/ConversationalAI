export const HuggingFaceChatModelJson = {
    nodeType: "model",
    type: "HuggingFaceChatModel",
    label: "Hugging Face Chat Model",
    color: "#72797b",
    description: "Language Model HuggingFaceInference",
    rightSideData: {
      json: [
        {
          type: "api",
          label: "Credentials",
          variableName: "cred",
          required: true,
          credential: true,
          credType: "HuggingFace",
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
          placeholder: "Model",
          require:true,
          hasDynamicVariable: true,
          helperSpan:"The model is identified by the repo_id on Hugging Face."
        },
       
        {
          title: "Additional Fields",
          type: "accordion",
          accTitle: "Max Tokens",
          variableName: "maxNewTokens",
          fieldsArray: [
            [
              {
                type: "textfield",
                variableName: "maxNewTokens",
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
        {
          type: "accordion",
          accTitle: "Top K",
          variableName: "topK",
          fieldsArray: [
            [
              {
                type: "textfield",
                variableName: "topK",
                value: 40,
                numberField: true,
                placeholder: "Top K",
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
      ],
    },
  };
  