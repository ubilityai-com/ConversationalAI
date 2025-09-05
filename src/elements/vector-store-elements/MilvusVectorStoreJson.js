
export const MilvusVectorStoreJson = {
    "nodeType": "vectorStore",
    type: "MilvusVectorStore",
    label: "Milvus Vector Store",
    color: "#72797b",
    description: "Work with your data in milvus Vector Store",
    rightSideData: {
        nodesCanConnectWith: { null: { nodeType: "embedding", title: "Embeddings", required: true } },
        json: [
            {
                type: "api",
                label: "Credentials",
                variableName: "cred",
                required: true,
                credential: true,
                credType: "Milvus",
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
        ]
    },
};