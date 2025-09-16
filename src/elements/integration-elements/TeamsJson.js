export const TeamsJson = {
  "category": "integration",
  "type": "Teams",
  "label": "Microsoft Teams",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Teams/getting_started",
  "description": "Teams integration",
  "defaultValid": false,
  "automated": "json",
  "automationConfig": "automated",
  "defaults": {
    "json": [
      {
        "type": "api",
        "label": "Credentials",
        "variableName": "cred",
        "required": true,
        "credential": true,
        "credType": "Microsoft",
        "value": "",
        "list": [],
        "config": [
          {
            "key": "method",
            "value": "get"
          },
          {
            "key": "url",
            "dependOn": [
              {
                "type": "static",
                "value": process.env.REACT_APP_DNS_URL + "credentials",
              }
            ]
          },
        ],
        "res": {
          "path": "data",
          "keys": {
            "option": {
              "fields": [
                "name"
              ]
            },
            "value": {
              "fields": [
                "name"
              ]
            },
            "type": {
              "fields": ["type"]
            },
          },
        },
        "apiDependsOn": [],
      },
      {
        type: "dropdown",
        label: "Type",
        value: "Team",
        variableName: "type",
        errorSpan: "Please choose a Type",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Team",
            value: "Team",
          },
          {
            option: "Channel",
            value: "Channel",
          },
          {
            option: "Chat Message",
            value: "Chat Message",
          },
        ],
        options: {
          Team: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Create Team",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Create",
                  value: "Create Team",
                },
                {
                  option: "Get Many",
                  value: "Get Many Teams",
                },
              ],
              options: {
                "Create Team": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "nameCreate",
                    value: "",
                    placeholder: "Enter text..",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Descirption",
                    variableName: "descCreate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter Text..",
                          variableName: "descCreate",
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Teams": [
                ],
              },
            },
          ],
          Channel: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Channel",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get Many",
                  value: "Get Many Channels",
                },
                {
                  option: "Get",
                  value: "Get Channel",
                },
                {
                  option: "Create",
                  value: "Create Channel",
                },
              ],
              options: {
                "Get Many Channels": [
                  {
                    type: "api",
                    label: "Team",
                    variableName: "teamGetManyChannels",
                    value: "None",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "teams/getTeams",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                            key: "credential_name",
                            dependOn: "cred",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.teams",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
                      },
                      type: [],
                      key: true,
                    },
                    apiDependsOn: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "Get Channel": [
                  {
                    type: "api",
                    label: "Team",
                    variableName: "teamGetChannel",
                    value: "None",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "teams/getTeams",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                            key: "credential_name",
                            dependOn: "cred",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.teams",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
                      },
                      type: [],
                      key: true,
                    },
                    apiDependsOn: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "api",
                    label: "Channel",
                    variableName: "channelGetChannel",
                    value: "None",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "teams/getChannels",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                            key: "credential_name",
                            dependOn: "cred",
                            isAutomation: true,
                          },
                          {
                            key: "teamId",
                            dependOn: "teamGetChannel",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.channels",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
                      },
                      type: [],
                      key: true,
                    },
                    apiDependsOn: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                      {
                        type: "dropdown",
                        name: "teamGetChannel",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "Create Channel": [
                  {
                    type: "api",
                    label: "Team",
                    variableName: "team_id_CreateChannel",
                    value: "None",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "teams/getTeams",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                            key: "credential_name",
                            dependOn: "cred",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.teams",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
                      },
                      type: [],
                      key: true,
                    },
                    apiDependsOn: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "New Channel Name",
                    required: true,
                    variableName: "displayName_CreateChannel",
                    value: "",
                    placeholder: "New Channel Name",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Descirption",
                    variableName: "descirption_CreateChannel",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter Text..",
                          variableName: "descirption_CreateChannel",
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "membershipType_CreateChannel",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "standard",
                          variableName: "membershipType_CreateChannel",
                          required: false,
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Standard",
                              value: "standard",
                            },
                            {
                              option: "Private",
                              value: "private",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          "Chat Message": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Send Message",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Create",
                  value: "Send Message",
                },
                {
                  option: "Get",
                  value: "Get ChatMessages",
                },
                {
                  option: "Get Many",
                  value: "Get Many ChatMessages",
                },
              ],
              options: {
                "Send Message": [
                  {
                    type: "api",
                    label: "Team",
                    variableName: "teamSendMessage",
                    value: "None",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "teams/getTeams",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                            key: "credential_name",
                            dependOn: "cred",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.teams",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
                      },
                      type: [],
                      key: true,
                    },
                    apiDependsOn: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "api",
                    label: "Channel",
                    variableName: "channelSendMessage",
                    value: "None",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "teams/getChannels",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                            key: "credential_name",
                            dependOn: "cred",
                            isAutomation: true,
                          },
                          {
                            key: "teamId",
                            dependOn: "teamSendMessage",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.channels",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
                      },
                      type: [],
                      key: true,
                    },
                    apiDependsOn: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                      {
                        type: "dropdown",
                        name: "teamSendMessage",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "dropdown",
                    label: "Message Type",
                    value: "text",
                    variableName: "messageType",
                    required: false,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "HTML",
                        value: "html",
                      },
                      {
                        option: "Text",
                        value: "text",
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Message",
                    required: true,
                    variableName: "messageCreate",
                    value: "",
                    placeholder: "Enter Text...",
                    hasDynamicVariable: true,
                  },
                ],
                "Get ChatMessages": [
                  {
                    type: "api",
                    label: "Team",
                    variableName: "team_id_GetChatMessages",
                    value: "None",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "teams/getTeams",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                            key: "credential_name",
                            dependOn: "cred",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.teams",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
                      },
                      type: [],
                      key: true,
                    },
                    apiDependsOn: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "api",
                    label: "Channel",
                    variableName: "channel_id_GetChatMessages",
                    value: "None",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "teams/getChannels",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                            key: "credential_name",
                            dependOn: "cred",
                            isAutomation: true,
                          },
                          {
                            key: "teamId",
                            dependOn: "team_id_GetChatMessages",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.channels",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
                      },
                      type: [],
                      key: true,
                    },
                    apiDependsOn: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                      {
                        type: "dropdown",
                        name: "team_id_GetChatMessages",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Message ID",
                    required: true,
                    variableName: "message_id_GetChatMessages",
                    value: "",
                    placeholder: "Message ID",
                    hasDynamicVariable: true,
                  },
                ],
                "Get Many ChatMessages": [
                  {
                    type: "api",
                    label: "Team",
                    variableName: "team_id_GetManyChatMessages",
                    value: "None",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "teams/getTeams",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                            key: "credential_name",
                            dependOn: "cred",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.teams",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
                      },
                      type: [],
                      key: true,
                    },
                    apiDependsOn: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "api",
                    label: "Channel",
                    variableName: "channel_id_GetManyChatMessages",
                    value: "None",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "teams/getChannels",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                            key: "credential_name",
                            dependOn: "cred",
                            isAutomation: true,
                          },
                          {
                            key: "teamId",
                            dependOn: "team_id_GetManyChatMessages",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.channels",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
                      },
                      type: [],
                      key: true,
                    },
                    apiDependsOn: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                      {
                        type: "dropdown",
                        name: "team_id_GetManyChatMessages",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  }
};