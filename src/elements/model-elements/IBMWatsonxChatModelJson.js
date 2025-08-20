export const IBMWatsonxChatModelJson = {
  "category": "model",
  "type": "IBMWatsonxChatModel",
  "label": "IBM Watsonx Chat Model",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/IBMWatsonxChatModel/getting_started",
  "description": "For advanced usage with an AI chain",
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
        accTitle: "Maximum Number Of Tokens",
        variableName: "maximumNumberOfTokens",
        fieldsArray: [
          [
            {
              type: "textfield",
              // label: "Maximum Number Of Tokens",
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
        accTitle: "Temperature",
        variableName: "samplingTemperature",
        fieldsArray: [
          [
            {
              type: "textfield",
              // label: "Sampling Temperature",
              variableName: "samplingTemperature",
              numberField: true,
              typeOfValue: "float",
              value: "0.9",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Top Probability",
        variableName: "top_P",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "top_P",
              numberField: true,
              typeOfValue: "float",
              value: "",
              hasDynamicVariable: true,
              helperSpan: "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Frequency Penalty",
        variableName: "frequencyPenalty",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "frequencyPenalty",
              numberField: true,
              value: "",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "N",
        variableName: "completionChoicesNumber",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "completionChoicesNumber",
              numberField: true,
              value: "",
              hasDynamicVariable: true,
              helperSpan: "How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs.",
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Presence Penalty",
        variableName: "presencePenalty",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "presencePenalty",
              numberField: true,
              value: "",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Log Probs",
        variableName: "logProbs",
        fieldsArray: [
          [
            {
              type: "checkbox",
              value: false,
              variableName: "logProbs",
              label: "Log Probs",
              helperSpan: "Whether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the content of message.",
            },
          ],
        ],
      },
    ],
  }
};