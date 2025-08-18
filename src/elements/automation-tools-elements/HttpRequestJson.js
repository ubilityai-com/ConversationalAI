export const HttpRequestJson = {
  category: "automationTools",
  "type": "HttpRequest",
  "label": "Http Request",
  "color": "#4BBFFF",
  description: "Http Request",
  defaultValid: false,
  automated: "json",
  automationConfig: "automated",
  "defaults": {
    "json": [
      {
        "type": "dropdown",
        "label": "Method",
        "value": "GET",
        "variableName": "method",
        "required": true,
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "Get",
            "value": "GET"
          },
          {
            "option": "Post",
            "value": "POST"
          },
          {
            "option": "Delete",
            "value": "DELETE"
          },
          {
            "option": "Put",
            "value": "PUT"
          },
          {
            "option": "Patch",
            "value": "PATCH"
          }
        ]
      },
      {
        "type": "textfield",
        "label": "Url",
        "required": true,
        "variableName": "url",
        "value": "",
        "placeholder": "url",
        "hasDynamicVariable": true
      },
      {
        "type": "dropdown",
        "label": "Authorization Type",
        "value": "No Auth",
        "variableName": "authorizationType",
        "required": true,
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "No Auth",
            "value": "No Auth"
          },
          {
            "option": "API Key",
            "value": "API Key"
          },
          {
            "option": "Bearer Token",
            "value": "Bearer Token"
          },
          {
            "option": "Basic Auth",
            "value": "Basic Auth"
          }
        ],
        "options": {
          "API Key": [
            {
              "type": "textfield",
              "label": "Key",
              "required": true,
              "variableName": "key",
              "value": "",
              "placeholder": "key",
              "hasDynamicVariable": true
            },
            {
              "type": "textfield",
              "label": "Value",
              "required": true,
              "variableName": "value",
              "value": "",
              "placeholder": "value",
              "hasDynamicVariable": true
            },
            {
              "type": "dropdown",
              "label": "Add to",
              "value": "Header",
              "variableName": "addTo",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Header",
                  "value": "Header"
                },
                {
                  "option": "Query Params",
                  "value": "Query Params"
                }
              ]
            }
          ],
          "Bearer Token": [
            {
              "type": "textfield",
              "label": "Token",
              "required": true,
              "variableName": "token",
              "value": "",
              "placeholder": "token",
              "hasDynamicVariable": true
            }
          ],
          "Basic Auth": [
            {
              "type": "textfield",
              "label": "Username",
              "required": true,
              "variableName": "username",
              "value": "",
              "placeholder": "username",
              "hasDynamicVariable": true
            },
            {
              "type": "textfield",
              "label": "Password",
              "required": true,
              "variableName": "password",
              "value": "",
              "placeholder": "password",
              "hasDynamicVariable": true
            }
          ]
        }
      },
      {
        "type": "dropdown",
        "label": "Body Type",
        "value": "None",
        "variableName": "bodyType",
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "None",
            "value": "None"
          },
          {
            "option": "Json",
            "value": "JSON"
          },
          {
            "option": "Form Data",
            "value": "Form Data"
          },
          {
            "option": "Binary",
            "value": "Binary"
          }
        ],
        "options": {
          "JSON": [
            {
              "type": "editor",
              "defaultLanguage": "json",
              "variableName": "jsonCode",
              showExpandIcon: true,
              "value": "{}",
              "height": "250px"
            }
          ],
          "Form Data": [
            {
              "type": "dynamic",
              "fieldsArray": [],
              "variableName": "formData",
              "title": "Form data",
              "structure": [
                {
                  "type": "row",
                  "title": "Form Data",
                  "variableName": "formData",
                  "removeButton": true
                },
                {
                  "type": "dropdown",
                  "label": "Data Type",
                  "value": "binary",
                  "variableName": "type",
                  "required": true,
                  "hasDynamicVariable": false,
                  "list": [
                    {
                      "option": "Binary",
                      "value": "binary"
                    },
                    {
                      "option": "Text",
                      "value": "text"
                    },
                    {
                      "option": "Url",
                      "value": "url"
                    }
                  ]
                },
                {
                  "type": "textfield",
                  "label": "Key",
                  "required": true,
                  "variableName": "key",
                  "value": "",
                  "placeholder": "key",
                  "hasDynamicVariable": true
                },
                {
                  "type": "textfield",
                  "label": "Value",
                  "required": true,
                  "variableName": "value",
                  "value": "",
                  "placeholder": "value",
                  "hasDynamicVariable": true
                }
              ]
            }
          ],
          "Binary": [
            {
              "type": "editor",
              "defaultLanguage": "plaintext",
              "variableName": "binaryCode",
              showExpandIcon: true,
              "value": "",
              "height": "250px"
            }
          ]
        }
      },
      {
        "type": "dynamic",
        "fieldsArray": [],
        "title": "Query Param",
        "variableName": "queryParams",
        "structure": [
          {
            "type": "row",
            "title": "Query Params",
            "variableName": "queryParams",
            "removeButton": true
          },
          {
            "label": "Key",
            "type": "textfield",
            "placeholder": "key",
            "value": "",
            "variableName": "key",
            "hasDynamicVariable": true,
            "rightSideInput": true
          },
          {
            "label": "Value",
            "type": "textfield",
            "value": "",
            "placeholder": "value",
            "variableName": "value",
            "hasDynamicVariable": true,
            "rightSideInput": true
          }
        ]
      },
      {
        "type": "dynamic",
        "fieldsArray": [],
        "title": "Header",
        "variableName": "header",
        "structure": [
          {
            "type": "row",
            "title": "Header",
            "variableName": "queryParams",
            "removeButton": true
          },
          {
            "label": "Name",
            "type": "textfield",
            "placeholder": "name",
            "value": "",
            "variableName": "name",
            "hasDynamicVariable": true,
            "rightSideInput": true
          },
          {
            "label": "Value",
            "type": "textfield",
            "value": "",
            "placeholder": "value",
            "variableName": "value",
            "hasDynamicVariable": true,
            "rightSideInput": true
          }
        ]
      },
      {
        "type": "accordion",
        "title": "Options",
        "label": "SSL",
        "accTitle": "SSL",
        "variableName": "ssl",
        "fieldsArray": [
          [
            {
              "type": "checkbox",
              "value": "true",
              "variableName": "ssl"
            }
          ]
        ]
      },
      {
        "type": "accordion",
        "accTitle": "Timeout",
        "variableName": "timeout",
        "fieldsArray": [
          [
            {
              "type": "textfield",
              "label": "Timeout",
              "value": "30",
              "numberField": true,
              "typeOfValue": "integer",
              "variableName": "timeout"
            }
          ]
        ]
      },
      {
        "type": "outputJson",
        "value": {
          // "Output": {
          "Output": "",
          "Error": "",
          "Status": ""
          // }
        }
      }
    ]
  }
};