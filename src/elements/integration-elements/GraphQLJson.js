export const GraphQLJson = {
  "category": "integration",
  "type": "GraphQL",
  "label": "GraphQL",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/GraphQL/getting_started",
  "description": "GraphQL integration",
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
        "credType": "GraphQL",
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
        label: "Operation",
        value: "HTTP Request Method",
        variableName: "type",
        errorSpan: "Please choose a Type",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "HTTP Request Method",
            value: "HTTP Request Method",
          },
        ],
        options: {
          "HTTP Request Method": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Graphql Post",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Post",
                  value: "Graphql Post",
                },
              ],
              options: {
                "Graphql Post": [
                  {
                    type: "textfield",
                    label: "Url",
                    required: true,
                    variableName: "Url",
                    value: "",
                    placeholder: "Url",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Query",
                    required: true,
                    variableName: "query",
                    value: "",
                    placeholder: "query",
                    hasDynamicVariable: true,
                    multiline: true,
                    minRows: 5,
                  },
                  {
                    title: "Variables",
                    type: "editor",
                    showExpandIcon: true,
                    defaultLanguage: "json",
                    label: "Variables",
                    required: true,
                    variableName: "variables",
                    value: "",
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
        },
      },
    ]
  }
};