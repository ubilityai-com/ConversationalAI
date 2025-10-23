export const WolframAlphaToolJson = {
  category: "tool",
  type: "WolframAlphaTool",
  label: "Wolfram Alpha",
  color: "#72797b",
  automationConfig: "automated",
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
    ],
  },
};
