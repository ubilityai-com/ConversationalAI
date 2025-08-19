
export const PineconeVectorStoreJson = {
    "nodeType": "vectorStore",
    type: "PineconeVectorStore",
    label: "Pinecone Vector Store",
    color: "#72797b",
    description: "Work with your data in pinecone Vector Store",
    rightSideData: {
        nodesCanConnectWith: { null: { nodeType: "embedding", title: "Embeddings", required: true } },
        json: [
            {
                type: "api",
                label: "Credentials",
                variableName: "cred",
                required: true,
                credential: true,
                credType: "Pinecone",
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
                type: "dropdown",
                label: "Operation",
                value: "retrieveDocs",
                variableName: "operation",
                required: true,
                hasDynamicVariable: false,
                list: [
                    {
                        option: "Retrieve Documents (For Agent/Chain)",
                        value: "retrieveDocs",
                    },
                    {
                        option: "Insert Data",
                        value: "insert",
                    }
                ],
                options: {
                    "retrieveDocs": [
                        {
                            type: "dropdown",
                            label: "Pinecone Index",
                            value: "fromList",
                            variableName: "pineconeIndex",
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
                                        label: "Index Name",
                                        required: true,
                                        variableName: "index_name",
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
                            accTitle: "Pinecone Namespace",
                            variableName: "pineconeNamespace",
                            fieldsArray: [
                                [
                                    {
                                        type: "textfield",
                                        label: "Pinecone Namespace",
                                        variableName: "pineconeNamespace",
                                        value: "",
                                        placeholder: "PineconeNamespace",
                                        hasDynamicVariable: true,
                                    },
                                ],
                            ],
                        },
                        {
                            "type": "dynamic",
                            "fieldsArray": [],
                            "title": "Metada Filter",
                            "variableName": "metaDataFilter",
                            "structure": [
                                {
                                    "type": "row",
                                    "title": "Metadata Filter",
                                    "variableName": "metaData",
                                    "removeButton": true
                                },
                                {
                                    "type": "textfield",
                                    "value": "",
                                    "placeholder": "Name",
                                    "variableName": "name"
                                },
                                {
                                    "type": "textfield",
                                    "value": "",
                                    "placeholder": "Value",
                                    "variableName": "value"
                                },
                            ]
                        },
                    ],
                    "insert": [
                        {
                            type: "textfield",
                            label: "Index Name",
                            required: true,
                            variableName: "index_name",
                            value: "",
                            placeholder: "index name",
                            hasDynamicVariable: true,
                        },
                    ]
                }
            },

        ],
    },
};