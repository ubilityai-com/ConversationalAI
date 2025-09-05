
export const MotorheadMemoryJson = {
    "category": "memory",
    type: "MotorheadMemory",
    label: "Motorhead Memory",
    color: "#72797b",
    description: "Use Motorhead Memory",
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