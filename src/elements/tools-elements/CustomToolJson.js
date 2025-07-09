
export const CustomToolJson = {
    "nodeType": "tool",
    type: "CustomTool",
    label: "Custom Tool",
    color: "#72797b",
    description: "Uses another ubility workflow as a tool.",
    defaultValid: false,
    rightSideData: {
        inputsDescription: null,
        webhookActive: "None",
        json: [
            {
                type: "textfield",
                label: "Name",
                required: true,
                variableName: "name",
                value: "",
                placeholder: "Name",
                hasDynamicVariable: true,
                helperSpan: "Name should not contain any spaces"
            },
            {
                type: "textfield",
                label: "Description",
                multiline: true,
                required: true,
                minRows: 3,
                variableName: "description",
                value: "",
                placeholder: "e.g useful to trigger a workflow",
                hasDynamicVariable: true,
            },
        ],
    },
};