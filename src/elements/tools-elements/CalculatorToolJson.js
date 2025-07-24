
export const CalculatorToolJson = {
    "nodeType": "tool",
    type: "CalculatorTool",
    label: "Calculator",
    defaultValid: true,
    color: "#72797b",
    description: "Make it easier for AI agents to perform arithmetic",
    rightSideData: {
        json: [
            {
                type: "textfield",
                label: "Description",
                multiline: true,
                minRows: 3,
                variableName: "description",
                value: "",
                placeholder: "e.g useful to perform arithmetic maths",
                hasDynamicVariable: true,
            },
        ],
    },
};