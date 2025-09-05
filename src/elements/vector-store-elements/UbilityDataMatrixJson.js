
export const UbilityDataMatrixJson = {
    "nodeType": "vectorStore",
    type: "UbilityDataMatrix",
    label: "Ubility Data Matrix",
    color: "#72797b",
    description: "Work with your data in Ubility Data Matrix",
    rightSideData: {
        nodesCanConnectWith: { null: { nodeType: "embedding", title: "Embeddings", required: true } },
        json: [
            {
                type: "api",
                label: "Credentials",
                variableName: "cred",
                required: true,
                credential: true,
                credType: "DataMatrix",
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
                label: "Description",
                required: true,
                variableName: "description",
                value: "",
                placeholder: "description",
                hasDynamicVariable: true,
            },
            {
                type: "textfield",
                label: "Model",
                required: true,
                variableName: "model",
                value: "",
                placeholder: "model",
                hasDynamicVariable: true,
            },
            {
                type: "textfield",
                label: "Dimentionality",
                required: true,
                variableName: "dimentionality",
                value: "",
                placeholder: "Dimentionality",
                hasDynamicVariable: true,
            },
        ],
    },
};