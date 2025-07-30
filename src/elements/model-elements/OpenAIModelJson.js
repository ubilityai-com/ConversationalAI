
export const OpenAIModelJson = {
    "category": "model",
    type: "OpenAIModel",
    label: "OpenAI Model",
    color: "#72797b",
    rightSideData: {
        json: [
            {
                type: "api",
                label: "Credentials",
                variableName: "cred",
                required: true,
                credential: true,
                credType: "Asana",
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
                value: "fromList",
                variableName: "model",
                required: true,
                hasDynamicVariable: false,
                list: [
                    {
                        option: "From List",
                        value: "fromList",
                    },
                    {
                        option: "By ID",
                        value: "byID",
                    },
                ],
                options: {
                    "fromList": [
                        {
                            type: "dropdown",
                            label: "Model List",
                            value: "fromList",
                            variableName: "df",
                            required: true,
                            hasDynamicVariable: false,
                            list: [
                                {
                                    option: "test",
                                    value: "fromList",
                                },
                                {
                                    option: "test1",
                                    value: "byID",
                                },
                            ],
                        }
                    ],
                    "byID": [
                        {
                            type: "textfield",
                            label: "Model ID",
                            required: true,
                            variableName: "fd",
                            value: "",
                            placeholder: "Enter ID",
                            hasDynamicVariable: true,
                        },
                    ]
                }
            },
            {
                title: "Additional Fields",
                type: "accordion",
                accTitle: "Base Url",
                variableName: "baseUrl",
                fieldsArray: [
                    [
                        {
                            type: "textfield",
                            label: "Base Url",
                            variableName: "baseUrl",
                            value: "https://api.openai.com/v1",
                            placeholder: "Base Url",
                            hasDynamicVariable: true,
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
                            label: "Frequency Penalty",
                            variableName: "frequencyPenalty",
                            value: "0.0",
                            numberField: true,
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
                            label: "Maximum Number Of Tokens",
                            variableName: "maximumNumberOfTokens",
                            numberField: true,
                            value: -1,
                            hasDynamicVariable: true,
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
                            label: "Presence Penalty",
                            variableName: "presencePenalty",
                            numberField: true,
                            value: 0.0,
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
                            label: "Sampling Temperature",
                            variableName: "samplingTemperature",
                            numberField: true,
                            value: 0.7,
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
                            label: "Timeout",
                            variableName: "Timeout",
                            numberField: true,
                            value: 60000,
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
                            label: "Max Retries",
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
                accTitle: "Top P",
                variableName: "topP",
                fieldsArray: [
                    [
                        {
                            type: "textfield",
                            label: "Top P",
                            variableName: "topP",
                            numberField: true,
                            value: 1.0,
                            placeholder: "Top P",
                            hasDynamicVariable: true,
                        },
                    ],
                ],
            },
        ],
    },
};