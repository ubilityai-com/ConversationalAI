export const SqlDatabaseChainJson = {
  "type": "SqlDatabaseChain",
  "label": "SQL Database Chain",
  "color": "black",
  "category": "ai",
  normalHandle: ["integration", "basic", "automationTools", "ai"],
  "rightSideData": {
    "nodesCanConnectWith": {
      "1": { category: "model", title: "Chat Model", required: true },
    },
    "json": [
      {
        type: "dropdown",
        label: "Database Type",
        value: "postgres",
        variableName: "dbType",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "PostgresSQL",
            value: "postgres",
          },
          {
            option: "MySQL",
            value: "mySQL",
          },
        ],
        options: {
          "postgres": [{
            "type": "api",
            "label": "Credentials",
            "variableName": "cred",
            "required": true,
            "credential": true,
            "credType": "Postgres",
            "value": "None",
            "list": [],
            "config": [
              {
                "key": "method",
                "value": "get"
              },
              {
                "key": "headers",
                "obj": [
                  {
                    "key": "Authorization",
                    "dependOn": [
                      {
                        "type": "static",
                        "value": "Bearer "
                      },
                      {
                        "type": "redux",
                        "value": "authentication.authToken"
                      }
                    ]
                  },
                  {
                    "key": "content-type",
                    "value": "application/json"
                  }
                ]
              },
              {
                "key": "url",
                "dependOn": [
                  {
                    "type": "static",
                    "value": process.env.REACT_APP_DNS_URL + "credentials"
                  }
                ]
              },
            ],
            "res": {
              "path": "data",
              "keys": {
                "option": {
                  "fields": [
                    "credName"
                  ]
                },
                "value": {
                  "fields": [
                    "credName"
                  ]
                },
                "type": {
                  "fields": ["type"]
                },
              },
            },
            "apiDependsOn": [],
          }],
          "mySQL": [{
            "type": "api",
            "label": "Credentials",
            "variableName": "cred",
            "required": true,
            "credential": true,
            "credType": "MySQL",
            "value": "None",
            "list": [],
            "config": [
              {
                "key": "method",
                "value": "get"
              },
              {
                "key": "headers",
                "obj": [
                  {
                    "key": "Authorization",
                    "dependOn": [
                      {
                        "type": "static",
                        "value": "Bearer "
                      },
                      {
                        "type": "redux",
                        "value": "authentication.authToken"
                      }
                    ]
                  },
                  {
                    "key": "content-type",
                    "value": "application/json"
                  }
                ]
              },
              {
                "key": "url",
                "dependOn": [
                  {
                    "type": "static",
                    "value": process.env.REACT_APP_DNS_URL + "credentials"
                  }
                ]
              },
            ],
            "res": {
              "path": "data",
              "keys": {
                "option": {
                  "fields": [
                    "credName"
                  ]
                },
                "value": {
                  "fields": [
                    "credName"
                  ]
                },
                "type": {
                  "fields": ["type"]
                },
              },
            },
            "apiDependsOn": [],
          },]
        }
      },
      {
        type: "textfield",
        label: "Question",
        required: true,
        multiline: true,
        minRows: 4,
        variableName: "question",
        chatbotQuestion: true,
        value: "",
        placeholder: "e.g how many users is in the users table ?",
        hasDynamicVariable: true,
      },
      {
        type: "accordion",
        accTitle: "Tables to include or ignore",
        variableName: "tablesToIncludeOrIgnore",
        fieldsArray: [
          [
            {
              type: "dropdown",
              value: "includeTables",
              variableName: "tablesIncOrIgn",
              hasDynamicVariable: false,
              list: [
                {
                  option: "Tables Included",
                  value: "includeTables",
                },
                {
                  option: "Tables Ignored",
                  value: "ignoreTables",
                },
              ],
            },
            {
              type: "dynamic",
              fieldsArray: [],
              title: "Table",
              variableName: "tablesNameList",
              structure: [
                {
                  type: "row",
                  title: "Table Name",
                  variableName: "rowTN",
                  removeButton: true,
                },
                {
                  "type": "textfield",
                  "placeholder": "Table Name",
                  "value": "",
                  "required": true,
                  "variableName": "tableName",
                  "hasDynamicVariable": true,
                  "rightSideInput": true,
                },]
            }
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Sample table's rows info",
        variableName: "sampleRowsInTableInfo",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "sampleRowsInTableInfo",
              numberField: true,
              placeholder: "Sample table's rows info",
              typeOfValue: "integer",
              value: "3",
              hasDynamicVariable: true,
            },
          ],
        ],
      },

      {
        type: "accordion",
        accTitle: "Top Keys",
        variableName: "topKeys",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "topKeys",
              placeholder: "Top Keys",
              numberField: true,
              typeOfValue: "integer",
              value: "10",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Custom Prompt",
        variableName: "customPrompt",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "customPrompt",
              multiline: true,
              minRows: 3,
              value: "",
              hasDynamicVariable: true,
              placeholder: "Custom Prompt",
              chatbotQuestion: true,
              validation: "validateRequiredWords",
              requiredWords: { "{agent_scratchpad}": true },
              helperSpan: "Prompt must include input variable: {agent_scratchpad}."
            },
          ],
        ],
      },
      {
        "type": "outputJson",
        "value": {
          "Output": { "input": "", "output": "" },
          "Error": "",
          "Status": ""
        }
      }
    ]
  }
}
