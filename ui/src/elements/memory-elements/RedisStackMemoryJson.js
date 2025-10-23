
export const RedisStackMemoryJson = {
  "category": "memory",
  type: "RedisStackMemory",
  label: "Redis Stack Memory",
  color: "#72797b",
  description: "Stores the chat history in Redis",
  defaultValid: false,
  rightSideData: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Redis",
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
        "type": "dropdown",
        "label": "Message Type",
        "value": "newSession",
        "variableName": "messageType",
        "errorSpan": "Please choose a message type",
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "New Session",
            "value": "newSession"
          },
          {
            "option": "Existing Sessions",
            "value": "existingSessions"
          },
        ],
        "options": {
          "existingSessions": [
            {
              "type": "api",
              "label": "Sessions",
              "variableName": "sessions",
              "value": "",
              "required": true,
              "list": [],
              "config": [
                {
                  "key": "method",
                  "value": "post"
                },
                {
                  "key": "url",
                  "dependOn": [
                    {
                      "type": "static",
                      "value": process.env.REACT_APP_DNS_URL + "api/redis/list_sessions"
                    }
                  ]
                },
                {
                  "key": "data",
                  "obj": [
                    {
                      "key": "name",
                      "dependOn": "cred",
                      "isAutomation": true
                    },
                  ]
                }
              ],
              "res": {
                "path": "data.channels",
                "keys": {
                  "option": {
                    "fields": [
                      "name"
                    ]
                  },
                  "value": {
                    "fields": [
                      "id"
                    ]
                  }
                },
                "type": [],
                "key": true
              },
              "apiDependsOn": [
                {
                  "type": "dropdown",
                  "name": "cred",
                  "isAutomation": true
                },

              ],
            }
          ],
          "newSession": [{
            label: "Session Name",
            type: "textfield",
            variableName: "sessionName",
            value: "",
            required: true,
            placeholder: "Session Name",
            hasDynamicVariable: true,
          },]
        }
      },
      {
        type: "accordion",
        accTitle: "Session Time To Live (seconds)",
        variableName: "sessionTimeToLive",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "sessionTimeToLive",
              value: "",
              placeholder: "eg 5",
              numberField: true,
              hasDynamicVariable: true,
            },
          ],
        ],
      },

    ],
  },
};