
export const ElasticSearchVectorStoreJson = {
    "nodeType": "vectorStore",
    type: "ElasticSearchVectorStore",
    label: "Elastic search Vector Store",
    color: "#72797b",
    description: "Work with your data in Elastic search Vector Store",
    rightSideData: {
        json: [
            {
                type: "api",
                label: "Credentials",
                variableName: "cred",
                required: true,
                credential: true,
                credType: "ElasticSearch",
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
                label: "Index Name",
                required: true,
                variableName: "index_name",
                value: "",
                placeholder: "index name",
                hasDynamicVariable: true,
            },
        ],
    },
};