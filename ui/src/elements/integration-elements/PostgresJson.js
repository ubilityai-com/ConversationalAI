export const PostgresJson = {
  "category": "integration",
  "type": "Postgres",
  "label": "Postgres",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Postgres/getting_started",
  "description": "Postgres integration",
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
        "credType": "Postgres",
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
        "type": "dropdown",
        "label": "Type",
        "variableName": "type",
        "required": true,
        "value": "Custom",
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "Custom",
            "value": "Custom",
          },
        ],
        "options": {
          "Custom": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Custom Query",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Custom Query",
                  "value": "Custom Query"
                }
              ],
              "options": {
                "Custom Query": [
                  {
                    "type": "textfield",
                    "label": "Query",
                    "variableName": "query",
                    "required": true,
                    "multiline": true,
                    "minRows": 3,
                    "value": "",
                  },
                ]
              }
            }
          ]
        },
      },
    ],
  }
};