export const McpToolJson = {
    "nodeType": "tool",
    type: "McpTool",
    label: "MCP",
    color: "#72797b",
    description: "Make it easier for AI agents to perform arithmetic",
    rightSideData: {
        json: [
            {
                type: "dropdown",
                label: "Get MCP By",
                value: "name",
                variableName: "getMcpBy",
                required: true,
                hasDynamicVariable: false,
                list: [
                    {
                        option: "Name",
                        value: "name",
                    },
                    {
                        option: "Url",
                        value: "url",
                    },
                ],
                options: {
                    "name": [
                        // {
                        //     type: "api",
                        //     label: "Name",
                        //     variableName: "name",
                        //     required: true,
                        //     value: "None",
                        //     list: [],
                        //     config: [
                        //         {
                        //             key: "method",
                        //             value: "get",
                        //         },
                        //         {
                        //             key: "headers",
                        //             obj: [
                        //                 {
                        //                     key: "Authorization",
                        //                     dependOn: [
                        //                         {
                        //                             type: "static",
                        //                             value: "Bearer ",
                        //                         },
                        //                         {
                        //                             type: "redux",
                        //                             value: "authentication.authToken",
                        //                         },
                        //                     ],
                        //                 },
                        //                 {
                        //                     key: "content-type",
                        //                     value: "application/json",
                        //                 },
                        //             ],
                        //         },
                        //         {
                        //             key: "url",
                        //             dependOn: [
                        //                 {
                        //                     type: "static",
                        //                     value:
                        //                         process.env.REACT_APP_DNS_URL + "api/mcp/list_mcp_files",
                        //                 },
                        //             ],
                        //         },
                        //     ],
                        //     res: {
                        //         path: "data",
                        //     },
                        //     apiDependsOn: [],
                        // },
                        {
                            type: "dropdown",
                            label: "Name",
                            variableName: "name",
                            value: "SlackMcpServer",
                            placeholder: "Name",
                            hasDynamicVariable: true,
                            required: true,
                            list: [
                                {
                                    option: "SlackMcpServer",
                                    value: "SlackMcpServer",
                                },
                                {
                                    option: "AirtableMcpServer",
                                    value: "AirtableMcpServer",
                                },
                                {
                                    option: "HubspotMcpServer",
                                    value: "HubspotMcpServer",
                                },
                                {
                                    option: "WhatsappMcpServer",
                                    value: "WhatsappMcpServer",
                                },
                                {
                                    option: "NotionMcpServer",
                                    value: "NotionMcpServer",
                                },
                            ],
                        },
                        {
                            type: "textfield",
                            label: "Credential",
                            variableName: "cred",
                            value: "",
                            placeholder: "credential",
                            hasDynamicVariable: true,
                            required: true,
                        },

                    ],
                    "url": [
                        {
                            type: "textfield",
                            label: "Name",
                            variableName: "name",
                            value: "",
                            placeholder: "Name",
                            hasDynamicVariable: true,
                            required: true,
                        },
                        {
                            type: "textfield",
                            label: "Url",
                            variableName: "url",
                            value: "",
                            placeholder: "Url",
                            hasDynamicVariable: true,
                            required: true,
                        },
                    ]
                }
            }
        ],
    },
};