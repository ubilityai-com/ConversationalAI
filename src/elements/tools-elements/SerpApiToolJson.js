
export const SerpApiToolJson = {
    "nodeType": "tool",
    type: "SerpApiTool",
    label: "SerpApi",
    color: "#72797b",
    description: "Useful to get real user search results from all major search engines",
    rightSideData: {
        json: [
            {
                type: "api",
                label: "Credentials",
                variableName: "cred",
                required: true,
                credential: true,
                credType: "SerpApi",
                value: "None",
                list: [],
                config: [
                    {
                        key: "method",
                        value: "get",
                    },
                    {
                        key: "headers",
                        obj: [
                            {
                                key: "Authorization",
                                dependOn: [
                                    {
                                        type: "static",
                                        value: "Bearer ",
                                    },
                                    {
                                        type: "redux",
                                        value: "authentication.authToken",
                                    },
                                ],
                            },
                            {
                                key: "content-type",
                                value: "application/json",
                            },
                        ],
                    },
                    {
                        key: "url",
                        dependOn: [
                            {
                                type: "static",
                                value:
                                    process.env.REACT_APP_DNS_URL + "cloud/azure/credential/list",
                            },
                        ],
                    },
                ],
                res: {
                    path: "data",
                    keys: {
                        option: {
                            fields: ["credName"],
                        },
                        value: {
                            fields: ["credName"],
                        },
                        type: { fields: ["type"] },
                    },
                },
                apiDependsOn: [],
                conditionOnFirstTime: [],
                conditionOnRefresh: [],
            },
            {
                type: "textfield",
                label: "Description",
                variableName: "description",
                value: "",
                multiline: true,
                minRows: 3,
                placeholder: "e.g useful to get real user search results from all major search engines",
                hasDynamicVariable: true,
            },
            {
                title: "Additional Fields",
                type: "accordion",
                accTitle: "Country",
                variableName: "country",
                fieldsArray: [
                    [
                        {
                            type: "textfield",
                            label: "Country",
                            variableName: "country",
                            value: 'us',
                            placeholder: "us",
                            hasDynamicVariable: true,
                        },
                    ],
                ],
            },
            {
                type: "accordion",
                accTitle: "Device",
                variableName: "device",
                fieldsArray: [
                    [
                        {
                            type: "dropdown",
                            label: "Device",
                            variableName: "device",
                            value: 'Desktop',
                            hasDynamicVariable: true,
                            list: [
                                { option: "Desktop", value: "Desktop" },
                                { option: "Mobile", value: "Mobile" },
                                { option: "Tablet", value: "Tablet" }
                            ]
                        },
                    ],
                ],
            },
            {
                type: "accordion",
                accTitle: "Explicit Array",
                variableName: "explicitArray",
                fieldsArray: [
                    [
                        {
                            type: "checkbox",
                            variableName: "explicitArray",
                            value: false,
                            hasDynamicVariable: true,
                        },
                    ],
                ],
            },
            {
                type: "accordion",
                accTitle: "Google Domain",
                variableName: "googleDomain",
                fieldsArray: [
                    [
                        {
                            type: "textfield",
                            label: "Google Domain",
                            variableName: "googleDomain",
                            value: 'google.com',
                            placeholder: "google.com",
                            hasDynamicVariable: true,
                        },
                    ],
                ],
            },
            {
                type: "accordion",
                accTitle: "Language",
                variableName: "language",
                fieldsArray: [
                    [
                        {
                            type: "textfield",
                            label: "Language",
                            variableName: "language",
                            value: 'en',
                            placeholder: "en",
                            hasDynamicVariable: true,
                        },
                    ],
                ],
            }

        ]
    },
};