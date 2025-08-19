export const UpsertJson = {
    "category": "ai",
    type: "Upsert",
    label: "Upsert",
    color: "#72797b",
    normalHandle: ["integration", "basic", "automationTools", "ai"],
    rightSideData: {
        nodesCanConnectWith: {
            '1': { category: "docLoader", title: "Loader", required: true },
            '2': { category: "vectorStore", title: "Vector Store", required: true },
        },
        json: [
            // {
            //     type: "api",
            //     label: "Credentials",
            //     variableName: "cred",
            //     required: true,
            //     credential: true,
            //     credType: "Asana",
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
            //                         process.env.REACT_APP_DNS_URL + "credentials",
            //                 },
            //             ],
            //         },
            //     ],
            //     res: {
            //         path: "data",
            //         keys: {
            //             option: {
            //                 fields: ["name"],
            //             },
            //             value: {
            //                 fields: ["name"],
            //             },
            //             type: { fields: ["type"] },
            //         },
            //     },
            //     apiDependsOn: [],
            //     conditionOnFirstTime: [],
            //     conditionOnRefresh: [],
            // },
        ],
    },
};