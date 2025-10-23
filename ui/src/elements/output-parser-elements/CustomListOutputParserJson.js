export const customListOutputParserJson = {
    "category": "outputParser",
    type: "CustomListOutputParser",
    label: "Comma Separated List Output Parser",
    defaultValid: true,
    color: "#72797b",
    description: "Parse the output of an LLM call as a list of values.",
    automationConfig:"automated",
    rightSideData: {
        json: [
            {
                "label": "Number Of Items",
                "type": "textfield",
                "value": "4",
                required: true,
                numberField: true,
                "variableName": "numberOfItems",
                "hasDynamicVariable": true,
                "rightSideInput": true,
            }
        ],
    },
};