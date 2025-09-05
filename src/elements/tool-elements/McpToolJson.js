export const McpToolJson = {
  category: "tool",
  type: "McpTool",
  label: "MCP",
  color: "#72797b",
  automationConfig: "automated",
  description: "Make it easier for AI agents to perform arithmetic",
  rightSideData: {
    json: [
      {
        type: "dropdown",
        label: "Get MCP By",
        value: "url",
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
          name: [
            {
              type: "api",
              label: "Mcp Name",
              variableName: "name",
              required: true,
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
                        process.env.REACT_APP_DNS_URL + "langchain/listMcps",
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
                    fields: ["type"],
                  },
                },
              },
              apiDependsOn: [],
            },
            {
              type: "api",
              label: "Credentials",
              variableName: "cred",
              required: true,
              // credential: true,
              value: "",
              list: [],
              config: [
                {
                  key: "method",
                  value: "get",
                },
                {
                  key: "params",
                  obj: [
                    {
                      key: "type",
                      dependOn: "name",
                      isAutomation: true,
                    },
                  ]
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
              apiDependsOn: [
                {
                  type: "dropdown",
                  name: "name",
                  isAutomation: true,
                },
              ],
            },
            {
              type: "api",
              label: "Selected Tools",
              variableName: "selectedTools",
              value: [],
              required: true,
              multiselect: true,
              list: [],
              config: [
                {
                  key: "method",
                  value: "post",
                },
                {
                  key: "url",
                  dependOn: [
                    {
                      type: "static",
                      value:
                        process.env.REACT_APP_DNS_URL +
                        "langchain/listMcpTools",
                    },
                  ],
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
                  key: "data",
                  obj: [
                    {
                      key: "data",
                      obj: [
                        {
                          key: "name",
                          dependOn: "name",
                          isAutomation: true,
                        },
                        {
                          key: "credential",
                          dependOn: "cred",
                          isAutomation: true,
                        },
                        {
                          key: "type",
                          value: "mcp"
                        }

                      ]
                    },

                  ],
                },
              ],
              res: {
                path: "data",
                type: [],
                key: true,
              },
              apiDependsOn: [
                {
                  type: "dropdown",
                  name: "name",
                  isAutomation: true,
                },
                {
                  type: "api",
                  name: "cred",
                  isAutomation: true,
                },
              ],

            },
          ],
          url: [
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
            {
              type: "api",
              label: "Selected Tools",
              variableName: "selectedTools",
              value: [],
              required: true,
              multiselect: true,
              list: [],
              config: [
                {
                  key: "method",
                  value: "post",
                },
                {
                  key: "url",
                  dependOn: [
                    {
                      type: "static",
                      value:
                        process.env.REACT_APP_DNS_URL +
                        "langchain/listMcpTools",
                    },
                  ],
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
                  key: "data",
                  obj: [
                    {
                      key: "data",
                      obj: [
                        {
                          key: "name",
                          dependOn: "name",
                          isAutomation: true,
                        },
                        {
                          key: "url",
                          dependOn: "url",
                          isAutomation: true,
                        },
                        {
                          key: "type",
                          value: "mcp"
                        }

                      ]
                    },

                  ],
                },
              ],
              res: {
                path: "data",
                type: [],
                key: true,
              },
              apiDependsOn: [
                {
                  type: "textfield",
                  name: "name",
                  isAutomation: true,
                },
                {
                  type: "textfield",
                  name: "url",
                  isAutomation: true,
                },
              ],

            },
          ],
        },
      },
    ],
  },
};