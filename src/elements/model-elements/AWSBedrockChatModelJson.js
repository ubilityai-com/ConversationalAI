export const AWSBedrockChatModelJson = {
    "nodeType": "model",
    type: "AWSBedrockChatModel",
    label: "AWS Bedrock Chat Model",
    color: "#72797b",
    description: "Language Model AWS Bedrock" ,
    rightSideData: {
        json: [
            {
                type: "api",
                label: "Credentials",
                variableName: "cred",
                required: true,
                credential: true,
                credType: "AWSBedrock",
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
            {
                type: "accordion",
                accTitle: "Max Tokens",
                variableName: "maximumNumberOfTokens",
                fieldsArray: [
                  [
                    {
                      type: "textfield",
                      variableName: "maximumNumberOfTokens",
                      numberField: true,
                      value: "4096",
                      hasDynamicVariable: true,
                    },
                  ],
                ],
              },
        ],
    },
};