export const ConditionAgentJson = {
    "nodeType": "langchain",
    type: "ConditionAgent",
    label: "Condition agent",
    color: "#ccd3d5",
    normalHandle: ["regular", "basic", "automationTools", "langchain"],
    rightSideData: {
        nodesCanConnectWith: {
            '1': { nodeType: "model", title: "Chat Model", required: true },
            "2": { nodeType: "outputParser", title: "Output Parser" },
        },
        json: [
            {
                type: "textfield",
                label: "Question",
                required: true,
                multiline: true,
                minRows: 4,
                chatbotQuestion: true,
                variableName: "question",
                value: "",
                placeholder: "e.g Whats going on your mind ?",
                hasDynamicVariable: true,
            },
            {
                type: "accordion",
                title: "Additional Fields",
                accTitle: "System Message",
                variableName: "systemMessage",
                fieldsArray: [
                    [
                        {
                            type: "textfield",
                            label: "System Message",
                            multiline: true,
                            minRows: 4,
                            required: true,
                            variableName: "systemMessage",
                            value: "You are a helpful AI assistant.",
                            placeholder: "e.g Hello, how can you help me?",
                            hasDynamicVariable: true,
                        },
                    ],
                ],
            },
            {
                type: "accordion",
                accTitle: "Max Iterations",
                variableName: "maxIterations",
                fieldsArray: [
                    [
                        {
                            type: "textfield",
                            label: "Max Iterations",
                            variableName: "maxIterations",
                            numberField: true,
                            value: 10,
                            required: true,
                            hasDynamicVariable: true,
                        },
                    ],
                ],
            },
            {
                type: "outputJson",
                value: {
                    "Output": {
                        "Agent": {
                            "Status": "",
                            "Output": {}
                        },
                        "Condition": {
                            "Status": "",
                            "Output": {}
                        }
                    },
                    "Error": "",
                    "Status": "",
                },
            },
        ],
    },
};
