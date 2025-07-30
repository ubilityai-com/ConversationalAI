
export const EmbeddingsOpenAIJson = {
    "nodeType": "embedding",
    type: "EmbeddingsOpenAI",
    label: "Embeddings OpenAI",
    color: "#72797b",
    description: "Use Embeddings OpenAI",
    rightSideData: {
        json: [
            {
                type: "api",
                label: "Credentials",
                variableName: "cred",
                required: true,
                credential: true,
                credType: "OpenAI",
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
                required:true,
                value: "",
                placeholder: "Model",
                hasDynamicVariable: true,
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
                accTitle: "Batch Size",
                variableName: "batchSize",
                fieldsArray: [
                    [
                        {
                            type: "textfield",
                            label: "Batch Size",
                            variableName: "batchSize",
                            numberField: true,
                            value: 512,
                            hasDynamicVariable: true,
                        },
                    ],
                ],
            },
            {
                type: "accordion",
                accTitle: "Strip New Lines",
                variableName: "stripNewLines",
                fieldsArray: [
                    [
                        {
                            type: "checkbox",
                            value: false,
                            variableName: "stripNewLines",
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
                            variableName: "timeout",
                            numberField: true,
                            value: -1,
                            hasDynamicVariable: true,
                        },
                    ],
                ],
            },

        ],
    },
};