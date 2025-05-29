export const StructuredOutputParserJson = {
    "nodeType": "outputParser",
    type: "StructuredOutputParser",
    label: "Structured Output Parser",
    defaultValid: true,
    color: "#72797b",
    description: "Parse the output of an LLM call into a given (JSON) structure.",
    rightSideData: {
        "structure": [],
        json: [
            {
                type: "dynamic",
                fieldsArray: [],
                title: "JSON Structure",
                variableName: "jsonStructure",
                required: true,
                structure: [
                    {
                        type: "row",
                        title: "Structure",
                        variableName: "jsonStructure",
                        removeButton: true,
                    },
                    {
                        type: "dropdown",
                        label: "Type",
                        value: "string",
                        variableName: "type",
                        hasDynamicVariable: false,
                        list: [
                            {
                                option: "string",
                                value: "string",
                            },
                            {
                                option: "number",
                                value: "number",
                            },
                            {
                                option: "boolean",
                                value: "boolean",
                            },
                            {
                                option: "List of strings",
                                value: "list[string]",
                            }
                        ]
                    },
                    {
                        "label": "Name",
                        "type": "textfield",
                        "value": "",
                        required: true,
                        "placeholder": "name",
                        "variableName": "name",
                        "hasDynamicVariable": true,
                        "rightSideInput": true,
                    },
                    {
                        "label": "Description",
                        "type": "textfield",
                        "value": "",
                        required: true,
                        "placeholder": "description",
                        "variableName": "description",
                        "hasDynamicVariable": true,
                        "rightSideInput": true,
                    }
                ],
            },
        ],
    },
};