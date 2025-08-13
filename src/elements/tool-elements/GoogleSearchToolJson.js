export const GoogleSearchToolJson = {
  category: "tool",
  type: "GoogleSearchTool",
  label: "Google Search",
  color: "#72797b",
  automationConfig: "automated",
  description: "Useful to get real-time access to Google search results",
  rightSideData: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "GoogleSearch",
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
                  process.env.REACT_APP_DNS_URL + "credentials",
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
        label: "Name",
        variableName: "name",
        value: "",
        placeholder: "Name of the tool",
        hasDynamicVariable: true,
        required: true,
      },
      {
        type: "textfield",
        label: "Description",
        variableName: "description",
        value: "",
        multiline: true,
        minRows: 3,
        placeholder:
          "e.g Useful to get real-time access to Google search results",
        hasDynamicVariable: true,
        required: true,
      },
    ],
  },
};
