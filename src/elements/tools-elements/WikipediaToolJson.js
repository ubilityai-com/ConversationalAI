
export const WikipediaToolJson = {
    "nodeType": "tool",
    type: "WikipediaTool",
    label: "Wikipedia",
    color: "#72797b",
    defaultValid:true,
    description: "Search In Wikipedia",
    rightSideData: {
        json: [
            {
                type: "textfield",
                label: "Description",
                variableName: "description",
                value: "",
                multiline: true,
                minRows: 3,
                placeholder: "e.g useful to search In Wikipedia",
                hasDynamicVariable: true,
            },
        ],
    },
};