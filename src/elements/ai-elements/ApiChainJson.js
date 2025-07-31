export const ApiChainJson = {
    category: "ai",
    type: "ApiChain",
    label: "API Chain",
    color: "#72797b",
    normalHandle: ["integration", "basic", "automationTools", "ai"],
    rightSideData: {
        nodesCanConnectWith: {
            "1": { category: "model", title: "Chat Model", required: true },
        },
        outputData: {},
        json: [
            {
                type: "textfield",
                label: "Question",
                multiline: true,
                minRows: 4,
                required: true,
                variableName: "question",
                value: "",
                placeholder:
                    "What is a good name for a company that makes product?",
                hasDynamicVariable: true,
            },
            {
                type: "textfield",
                label: "API Documentation",
                multiline: true,
                minRows: 4,
                required: true,
                variableName: "apiDocs",
                value: "",
                placeholder:
                    "What is a good name for a company that makes product?",
                hasDynamicVariable: true,
            },
            {
                "type": "accordion",
                "accTitle": "URL Prompt",
                "variableName": "apiUrlPrompt",
                "fieldsArray": [
                    [
                        {
                            type: "textfield",
                            label: "URL Prompt",
                            multiline: true,
                            minRows: 4,
                            required: true,
                            variableName: "apiUrlPrompt",
                            value: "You are given the below API Documentation:\n{api_docs}\nUsing this documentation, generate the full API url to call for answering the user question.\nYou should build the API url in order to get a response that is as short as possible, while still getting the necessary information to answer the question. Pay attention to deliberately exclude any unnecessary pieces of data in the API call.\n\nQuestion:{question}\nAPI url:",
                            placeholder: "What is a good name for a company that makes product?",
                            hasDynamicVariable: true,
                            validation: "validateRequiredWords",
                            requiredWords: { "{question}": true, "{api_docs}": true }
                        },
                    ]
                ]
            },
            {
                "type": "accordion",
                "accTitle": "Response Prompt",
                "variableName": "apiResponsePrompt",
                "fieldsArray": [
                    [
                        {
                            type: "textfield",
                            label: "Response Prompt",
                            multiline: true,
                            minRows: 4,
                            required: true,
                            variableName: "apiResponsePrompt",
                            value: "You are given the below API Documentation:\n{api_docs}\nUsing this documentation, generate the full API url to call for answering the user question.\nYou should build the API url in order to get a response that is as short as possible, while still getting the necessary information to answer the question. Pay attention to deliberately exclude any unnecessary pieces of data in the API call.\n\nQuestion:{question}\nAPI url: {api_url}\n\nHere is the response from the API:\n\n{api_response}\n\nSummarize this response to answer the original question.\n\nSummary:",
                            placeholder: "What is a good name for a company that makes product?",
                            hasDynamicVariable: true,
                            validation: "validateRequiredWords",
                            requiredWords: { "{question}": true, "{api_docs}": true, "{api_url}": true, "{api_response}": true }
                        },
                    ]
                ]
            },



            {
                type: "dynamic",
                fieldsArray: [],
                title: "Header",
                variableName: "headers",
                structure: [
                    {
                        type: "row",
                        title: "Header",
                        variableName: "header",
                        removeButton: true,
                    },
                    {
                        label: "Key",
                        type: "textfield",
                        value: "",
                        placeholder: "key",
                        variableName: "key",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                    },
                    {
                        label: "Value",
                        type: "textfield",
                        value: "",
                        placeholder: "value",
                        variableName: "value",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                    },
                ],
            },
            {
                type: "outputJson",
                value: {
                    Output: {
                        "output": "",
                        "question": ""
                    },
                    Error: "",
                    Status: "",
                },
            },
        ],

    },
};
