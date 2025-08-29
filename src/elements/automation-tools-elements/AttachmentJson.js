export const AttachmentJson = {
    category: "automationTools",
    "type": "Attachment",
    "label": "Attachment",
    "color": "#4BBFFF",
    description: "Attachment",
    defaultValid: false,
    automated: "json",
    automationConfig: "automated",
    notTestable: true,
    "defaults": {
        "json": [
            {
                "type": "dropdown",
                "label": "Method",
                "value": "Send file",
                "variableName": "method",
                "required": true,
                "hasDynamicVariable": false,
                "list": [
                    {
                        "option": "Send file",
                        "value": "Send file"
                    },
                    {
                        "option": "Receive file",
                        "value": "Receive file"
                    },
                ],
                options: {
                    "Send file": [
                        {
                            "type": "textfield",
                            "label": "File content",
                            "required": true,
                            "variableName": "fileContent",
                            "value": "",
                            "placeholder": "File content",
                            "hasDynamicVariable": true
                        },
                    ],
                    "Receive file": [
                        {
                            "type": "textfield",
                            "label": "Message",
                            "required": true,
                            "variableName": "message",
                            "value": "please upload your file",
                            "placeholder": "please upload your file",
                            "hasDynamicVariable": true
                        },
                    ]
                }

            }
        ]
    }
};
