export const ConditionAgentJson = {
    "category": "ai",
    type: "ConditionAgent",
    label: "Condition agent",
    color: "#ccd3d5",
    normalHandle: ["integration", "basic", "automationTools", "ai"],
    rightSideData: {
        save: false,
        variableName: "",
        loopFromSwitch: false,
        loopFromName: "",
        nodesCanConnectWith: {
            '1': { category: "model", title: "Chat Model", required: true },
            "2": { category: "outputParser", title: "Output Parser" },
        },
        json: [
            {
                type: "textfield",
                label: "Instruction",
                required: true,
                multiline: true,
                minRows: 4,
                variableName: "instruction",
                chatbotQuestion: true,
                value: "",
                placeholder: "e.g Whats going on your mind ?",
                hasDynamicVariable: true,
            },
            {
                type: "textfield",
                label: "Input",
                required: true,
                multiline: true,
                minRows: 4,
                variableName: "input",
                chatbotQuestion: true,
                value: "",
                placeholder: "e.g Whats going on your mind ?",
                hasDynamicVariable: true,
            },
            {
                type: "dynamic",
                fieldsArray: [],
                title: "Scenarios",
                hasAI: true,
                variableName: "scenarios",
                required: false,
                structure: [
                    {
                        type: "row",
                        title: "Scenario",
                        variableName: "ScenarioRow",
                        removeButton: true,
                    },
                    {
                        type: "textfield",
                        value: "",
                        placeholder: "scenario",
                        variableName: "scenario",
                        required: false,
                        hasDynamicVariable: true,
                    },
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
