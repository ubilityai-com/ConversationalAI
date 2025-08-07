
export const EmbeddingsOllamaJson = {
    "nodeType": "embedding",
    type: "EmbeddingsOllama",
    label: "Embeddings Ollama",
    color: "#72797b",
    description: "Use Ollama Embeddings",
    rightSideData: {
        json: [
            {
                type: "api",
                label: "Credentials",
                variableName: "cred",
                required: true,
                credential: true,
                credType: "Ollama",
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

        ],
    },
};