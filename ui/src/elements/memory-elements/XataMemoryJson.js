
export const XataMemoryJson = {
    "category": "memory",
    type: "XataMemory",
    label: "Xata Memory",
    color: "#72797b",
    description: "Use Xata Memory",
    rightSideData: {
        json: [
            {
                type: "api",
                label: "Credentials",
                variableName: "cred",
                required: true,
                credential: true,
                credType: "Asana",
                value: "",
                list: [],
                config: [
                    {
                        key: "method",
                        value: "get",
                    },
                    
                    {
                        key: "url",
                        dependOn: [
                            {
                                type: "static",
                                value:
                                    process.env.REACT_APP_DNS_URL + "credentials",
                            },
                        ],
                    },
                ],
                res: {
                    path: "data",
                    keys: {
                        option: {
                            fields: ["name"],
                        },
                        value: {
                            fields: ["name"],
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
                label: "Session ID Key",
                required: true,
                variableName: "sessionIDKey",
                value: "",
                placeholder: "Session ID Key",
                hasDynamicVariable: true,
            },
        ],
    },
};