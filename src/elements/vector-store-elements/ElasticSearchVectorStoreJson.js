
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