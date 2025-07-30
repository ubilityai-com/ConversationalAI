export const UpsertJson = {
    "category": "langchain",
    type: "Upsert",
    label: "Upsert",
    color: "#72797b",
    normalHandle: ["integration", "basic", "automationTools", "langchain"],
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
            //                         process.env.REACT_APP_DNS_URL + "cloud/azure/credential/list",
            //                 },
            //             ],
            //         },
            //     ],
            //     res: {
            //         path: "data",
            //         keys: {
            //             option: {
            //                 fields: ["credName"],
            //             },
            //             value: {
            //                 fields: ["credName"],
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