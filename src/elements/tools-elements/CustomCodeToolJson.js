
export const CustomCodeToolJson = {
    "nodeType": "tool",
    type: "CustomCodeTool",
    label: "Custom Code Tool",
    color: "#72797b",
    description: "Write a tool in JS or Python",
    rightSideData: {
        json: [
            {
                type: "textfield",
                label: "Name",
                required: true,
                variableName: "name",
                value: "",
                placeholder: "Name",
                hasDynamicVariable: true,
            },
            {
                type: "textfield",
                label: "Description",
                required:true,
                multiline: true,
                required:true,
                minRows: 3,
                variableName: "description",
                value: "",
                placeholder: "e.g useful to run code",
                hasDynamicVariable: true,
            },
            {
                "type": "dropdown",
                "label": "Type",
                "value": "Python",
                "variableName": "type",
                "hasDynamicVariable": false,
                "list": [
                  {
                    "option": "Python",
                    "value": "Python"
                  },
                  {
                    "option": "JavaScript",
                    "value": "JavaScript"
                  }
                ],
                "options": {
                  "Python": [
                    {
                        "type": "editor",
                        "defaultLanguage": "python",
                        "required":true,
                        "variableName": "code",
                        "value": "",
                        "height": "250px"
                      }
                  ],
                  "JavaScript": [
                    {
                        "type": "editor",
                        "defaultLanguage": "javascript",
                        "variableName": "code",
                        "required":true,
                        "value": "",
                        "height": "250px"
                      }
                  ]
                }
              },

        ],
    },
};