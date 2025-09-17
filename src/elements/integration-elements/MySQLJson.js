export const MySQLJson = {
  "category": "integration",
  "type": "MySQL",
  "label": "MySQL",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/MySQL/getting_started",
  "description": "MySQL integration",
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
        "credType": "MySQL",
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
        value: "Execute SQL",
        variableName: "operation",
        errorSpan: "Please choose an Operation",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Execute SQL",
            value: "Execute SQL",
          },
        ],
        options: {
          "Execute SQL": [
            {
              type: "dynamic",
              fieldsArray: [],
              title: "Query and Value",
              required: true,
              variableName: "queriesAndValuesExecuteSQL",
              structure: [
                {
                  type: "row",
                  title: "Query",
                  variableName: "queriesAndValuesExecuteSQL",
                  removeButton: true,
                },
                {
                  type: "textfield",
                  label: "SQL Query",
                  multiline: true,
                  minRows: 3,
                  required: true,
                  variableName: "sqlQueryExecuteSQL",
                  value: "",
                  placeholder: "Enter Query Here",
                  hasDynamicVariable: true,
                },
                {
                  type: "dynamic",
                  json: {
                    variableName: "queryVariablesExecuteSQL",
                    title: "Variable",
                    fieldsArray: [],
                    structure: [
                      {
                        type: "row",
                        title: "Variable",
                        variableName: "queryVariablesExecuteSQL",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Variable Content Type",
                        value: "string",
                        variableName: "variableValueExecuteSQL",
                        errorSpan: "",
                        required: false,
                        hasDynamicVariable: true,
                        list: [
                          {
                            option: "string",
                            value: "string",
                          },
                          {
                            option: "text",
                            value: "text",
                          },
                          {
                            option: "boolean",
                            value: "boolean",
                          },
                          {
                            option: "integer",
                            value: "integer",
                          },
                          {
                            option: "float",
                            value: "float",
                          },
                          {
                            option:"date",
                            value:"date",
                          }
                        ],
                        options: {
                          string: [
                            {
                              type: "textfield",
                              label: "String Value",
                              required: false,
                              variableName: "variableStringValueExecuteSQL",
                              value: "",
                              placeholder: "String Value",
                              hasDynamicVariable: true,
                            },
                          ],
                          date: [
                            {
                              type: "textfield",
                              label: "Date Value",
                              required: false,
                              variableName: "variableDateValueExecuteSQL",
                              value: "",
                              placeholder: "Date Value",
                              hasDynamicVariable: true,
                              helperSpan:"Enter the date in the format YYYY-MM-DD"
                            },
                          ],
                          text: [
                            {
                              type: "textfield",
                              label: "Text Value",
                              multiline: true,
                              minRows: 3,
                              required: false,
                              variableName: "variableTextValueExecuteSQL",
                              value: "",
                              placeholder: "Enter Text Here",
                              hasDynamicVariable: true,
                            },
                          ],
                          boolean: [
                            {
                              type: "checkbox",
                              label: "Boolean Value",
                              value: false,
                              variableName: "variableBooleanValueExecuteSQL",
                              hasDynamicVariable: true,
                            },
                          ],
                          integer: [
                            {
                              type: "textfield",
                              label: "Integer Value",
                              required: false,
                              variableName: "variableIntegerValueExecuteSQL",
                              value: "",
                              placeholder: "Integer Value",
                              hasDynamicVariable: true,
                              numberField: true,
                              typeOfValue: "integer",
                            },
                          ],
                          float: [
                            {
                              type: "textfield",
                              label: "Float Value",
                              required: false,
                              variableName: "variableFloatValueExecuteSQL",
                              value: "",
                              placeholder: "Float Value",
                              hasDynamicVariable: true,
                              numberField: true,
                              typeOfValue: "float",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
            {
              title: "Additional Fields",
              type: "accordion",
              accTitle: "Connection Timeout",
              variableName: "connectionTimeoutExecuteSQL",
              fieldsArray: [
                [
                  {
                    type: "textfield",
                    value: "",
                    placeholder: "Connection Timeout",
                    variableName: "connectionTimeoutOptionExecuteSQL",
                    rightSideInput: true,
                    hasDynamicVariable: true,
                    numberField: true,
                    typeOfValue: "integer",
                  },
                ],
              ],
            },
            {
              type: "accordion",
              accTitle: "Pool Size",
              variableName: "poolSizeExecuteSQL",
              fieldsArray: [
                [
                  {
                    type: "textfield",
                    value: "",
                    placeholder: "Pool Size",
                    variableName: "poolSizeOptionExecuteSQL",
                    rightSideInput: true,
                    hasDynamicVariable: true,
                    numberField: true,
                    typeOfValue: "integer",
                  },
                ],
              ],
            },
            {
              type: "accordion",
              accTitle: "Query Batching",
              variableName: "queryBatchingExecuteSQL",
              fieldsArray: [
                [
                  {
                    type: "dropdown",
                    label: "Query Batching",
                    value: "single",
                    variableName: "queryBatchingOptionExecuteSQL",
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "single",
                        value: "single",
                      },
                      {
                        option: "transaction",
                        value: "transaction",
                      },
                    ],
                  },
                ],
              ],
            },
            // {
            //   "type": "accordion",
            //   "accTitle": "Replace Empty String Input in Parameters with Null",
            //   "variableName": "replaceEmptyExecuteSQL",
            //   "fieldsArray": [
            //     [
            //       {
            //         "type": "checkbox",
            //         "value": false,
            //         "variableName": "replaceEmptyOptionExecuteSQL",
            //         "rightSideInput": true
            //       }
            //     ]
            //   ]
            // },
            {
              type: "accordion",
              accTitle: "Output Details",
              variableName: "outputDetailsExecuteSQL",
              fieldsArray: [
                [
                  {
                    type: "checkbox",
                    value: false,
                    variableName: "outputDetailsOptionExecuteSQL",
                    rightSideInput: true,
                    helperSpan:
                      "is responsible for displaying query_execution_information",
                  },
                ],
              ],
            },
          ],
        },
      },
    ],
  }
};