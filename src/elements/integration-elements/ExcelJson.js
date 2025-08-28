export const ExcelJson = {
  "category": "integration",
  "type": "Excel",
  "label": "Microsoft Excel",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Excel/getting_started",
  "description": "Excel integration",
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
        value: "Workbook",
        variableName: "type",
        errorSpan: "Please choose a Type",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Workbook",
            value: "Workbook",
          },
          {
            option: "Sheet",
            value: "Sheet",
          },
          {
            option: "Table",
            value: "Table",
          },
        ],
        options: {
          Workbook: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Add Worksheet",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Add Sheet",
                  value: "Add Worksheet",
                },
                {
                  option: "Delete",
                  value: "Delete Workbook",
                },
                {
                  option: "Get Many",
                  value: "Get Many Workbooks",
                },
              ],
              options: {
                "Add Worksheet": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idCreateSheet",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "name",
                    variableName: "nameAddSheet",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter Text..",
                          variableName: "nameAddSheet",
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Workbook": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idDeleteWorkbook",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                ],
                "Get Many Workbooks": [
                ],
              },
            },
          ],
          Sheet: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Append",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Append",
                  value: "Append",
                },
                {
                  option: "Clear Sheet",
                  value: "Clear Sheet",
                },
                {
                  option: "Delete Worksheet",
                  value: "Delete Worksheet",
                },
                {
                  option: "Get Many Worksheets",
                  value: "Get Many Worksheets",
                },
                {
                  option: "Update Sheet",
                  value: "Update Sheet",
                },
                {
                  option: "Get Rows",
                  value: "Get Rows",
                },
              ],
              options: {
                Append: [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idAppend",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idSheetAppend",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idAppend",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idAppend",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    type: "textfield",
                    label: "Range",
                    required: true,
                    variableName: "rangeAppend",
                    value: "",
                    placeholder: "A1:B1",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    label: "Shift",
                    value: "down",
                    variableName: "shift",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Down",
                        value: "down",
                      },
                      {
                        option: "Right",
                        value: "right",
                      },
                    ],
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Raw Data",
                    variableName: "valuesAppend",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          multiline: true,
                          minRows: 2,
                          placeholder:
                            "[['Sara','1/2/2006','Berlin'],['George','5/3/2010','Paris']]",
                          helperSpan:
                            "Raw values for the specified range as array of string arrays in JSON format",
                          variableName: "valuesAppend",
                          rightSideInput: true,
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Clear Sheet": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idClear",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idSheetClear",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idClear",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idClear",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    type: "dropdown",
                    label: "Apply To",
                    value: "All",
                    variableName: "applyToClear",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "All",
                        value: "All",
                      },
                      {
                        option: "Formats",
                        value: "Formats",
                      },
                      {
                        option: "Contents",
                        value: "Contents",
                      },
                    ],
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Range",
                    variableName: "rangeClear",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "Range",
                          required: false,
                          variableName: "rangeClear",
                          value: "",
                          placeholder: "A1:B1",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Worksheet": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idDelete",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idSheetDelete",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idDelete",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idDelete",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                ],
                "Get Many Worksheets": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idGetManyWorkbook",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                ],
                "Update Sheet": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idUpdateSheet",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idUpdateSheetSheet",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idUpdateSheet",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idUpdateSheet",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    type: "textfield",
                    label: "Range",
                    required: true,
                    variableName: "rangeUpdateSheet",
                    value: "",
                    placeholder: "A1:B1",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Raw Data",
                    required: true,
                    variableName: "rawDataUpdateSheet",
                    value: "",
                    multiline: true,
                    minRows: 1,
                    placeholder:
                      "[['Sara','1/2/2006','Berlin'],['George','5/3/2010','Paris']]",
                    helperSpan:
                      "Raw values for the specified range as array of string arrays in JSON format",
                    hasDynamicVariable: true,
                  },
                ],
                "Get Rows": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idGetRows",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idSheetGetRows",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idGetRows",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idGetRows",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Range",
                    variableName: "rangeGetRows",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          variableName: "rangeGetRows",
                          value: "",
                          placeholder: "A1:B1",
                          rightSideInput: true,
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          Table: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Append Rows",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Append",
                  value: "Append Rows",
                },
                {
                  option: "Convert To Range",
                  value: "Convert To Range",
                },
                {
                  option: "Create",
                  value: "Add Table",
                },
                {
                  option: "Delete",
                  value: "Delete Table",
                },
                {
                  option: "Get Columns",
                  value: "Get Many Columns",
                },
                {
                  option: "Get Rows",
                  value: "Get Many Rows",
                },
                {
                  option: "Lookup",
                  value: "Lookup",
                },
              ],
              options: {
                "Append Rows": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idAppendRows",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idAppendRowsSheet",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idAppendRows",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idAppendRows",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Table ID",
                    "variableName": "idAppendRowsTable",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getTables"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idAppendRows",
                            "isAutomation": true,
                          },
                          {
                            "key": "worksheetId",
                            "dependOn": "idAppendRowsSheet",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.tables",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idAppendRows",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idAppendRowsSheet",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    type: "dropdown",
                    label: "Type",
                    value: "columns",
                    variableName: "typeAppend",
                    required: false,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Map Each Column Below",
                        value: "columns",
                      },
                      {
                        option: "Raw",
                        value: "raw",
                      },
                    ],
                    options: {
                      columns: [
                        {
                          type: "dynamic",
                          fieldsArray: [],
                          title: "Column",
                          variableName: "columnsMap",
                          structure: [
                            {
                              type: "row",
                              title: "Object",
                              variableName: "columnsMap",
                              removeButton: true,
                            },
                            {
                              "type": "api",
                              "label": "Column ID",
                              "variableName": "idAppendRowsColumns",
                              "value": "None",
                              "required": true,
                              "hasDynamicVariable": true,
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
                                      "value": process.env.REACT_APP_DNS_URL + "excel/getColumns"
                                    }
                                  ]
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
                                  "key": "data",
                                  "obj": [
                                    {
                                      "key": "credential_name",
                                      "dependOn": "cred",
                                      "isAutomation": true
                                    },
                                    {
                                      "key": "workbookId",
                                      "dependOn": "idAppendRows",
                                      "isAutomation": true,
                                    },
                                    {
                                      "key": "worksheetId",
                                      "dependOn": "idAppendRowsSheet",
                                      "isAutomation": true,
                                    },
                                    {
                                      "key": "tableID",
                                      "dependOn": "idAppendRowsTable",
                                      "isAutomation": true,
                                    },
                                  ]
                                }
                              ],
                              "res": {
                                "path": "data.columns",
                                "keys": {
                                  "option": {
                                    "fields": ["name"],
                                  },
                                  "value": {
                                    "fields": ["id"],
                                  },
                                },
                                "type": [],
                                "key": true,
                              },
                              "apiDependsOn": [
                                {
                                  "type": "dropdown",
                                  "name": "cred",
                                  "isAutomation": true
                                },
                                {
                                  "type": "dropdown",
                                  "name": "idAppendRows",
                                  "isAutomation": true
                                },
                                {
                                  "type": "dropdown",
                                  "name": "idAppendRowsSheet",
                                  "isAutomation": true
                                },
                                {
                                  "type": "dropdown",
                                  "name": "idAppendRowsTable",
                                  "isAutomation": true
                                },
                              ],
                              "conditionOnFirstTime": [
                                {
                                  "type": "dropdown",
                                  "name": "cred",
                                  "isAutomation": true
                                },
                              ],
                              "conditionOnRefresh": [
                                {
                                  "type": "dropdown",
                                  "name": "cred",
                                  "isAutomation": true
                                },
                              ]
                            },
                            {
                              type: "textfield",
                              value: "",
                              label: "Value",
                              required: true,
                              variableName: "valueMapColumns",
                              placeholder: "Enter text..",
                              hasDynamicVariable: true,
                            },
                          ],
                        },
                      ],
                      raw: [
                        {
                          label: "Raw Data",
                          type: "textfield",
                          multiline: true,
                          minRows: 1,
                          placeholder:
                            "[['Sara','1/2/2006','Berlin'],['George','5/3/2010','Paris']]",
                          helperSpan:
                            "Raw values for the specified range as array of string arrays in JSON format",
                          value: "",
                          variableName: "rawDataAppendRowsTable",
                          rightSideInput: true,
                        },
                      ],
                    },
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Index",
                    variableName: "indexAppendRows",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "indexAppendRows",
                          rightSideInput: true,
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Convert To Range": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idConvert",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idConvertSheet",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idConvert",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idConvert",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Table ID",
                    "variableName": "idConvertTable",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getTables"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idConvert",
                            "isAutomation": true,
                          },
                          {
                            "key": "worksheetId",
                            "dependOn": "idConvertSheet",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.tables",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idConvert",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idConvertSheet",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                ],
                "Add Table": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idAddTable",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idAddTableSheet",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idAddTable",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idAddTable",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    type: "textfield",
                    label: "Address",
                    required: true,
                    variableName: "addressAddTable",
                    value: "",
                    placeholder: "A1:D7",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Has Headers",
                    variableName: "addTableHeader",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          label: "Has Header",
                          variableName: "addTableHeader",
                          rightSideInput: true,
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Table": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idDeleteTable",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idDeleteTableSheet",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idDeleteTable",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idDeleteTable",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Table ID",
                    "variableName": "idDeleteTableTable",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getTables"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idDeleteTable",
                            "isAutomation": true,
                          },
                          {
                            "key": "worksheetId",
                            "dependOn": "idDeleteTableSheet",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.tables",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idDeleteTable",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idDeleteTableSheet",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                ],
                "Get Many Columns": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idGetColumns",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idGetColumnsSheet",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idGetColumns",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idGetColumns",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Table ID",
                    "variableName": "idGetColumnsTable",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getTables"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idGetColumns",
                            "isAutomation": true,
                          },
                          {
                            "key": "worksheetId",
                            "dependOn": "idGetColumnsSheet",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.tables",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idGetColumns",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idGetColumnsSheet",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "getColumnsLimit",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "getColumnsLimit",
                          rightSideInput: true,
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Rows": [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idGetRows",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idGetRowsSheet",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idGetRows",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idGetRows",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Table ID",
                    "variableName": "idGetRowsTable",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getTables"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idGetRows",
                            "isAutomation": true,
                          },
                          {
                            "key": "worksheetId",
                            "dependOn": "idGetRowsSheet",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.tables",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idGetRows",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idGetRowsSheet",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "getRowsLimit",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "getRowsLimit",
                          rightSideInput: true,
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                Lookup: [
                  {
                    "type": "api",
                    "label": "Workbook ID",
                    "variableName": "idLookup",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorkbooks"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.workbooks",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Sheet ID",
                    "variableName": "idLookupSheet",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getWorksheets"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idLookup",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.worksheets",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idLookup",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    "type": "api",
                    "label": "Table ID",
                    "variableName": "idLookupTable",
                    "value": "None",
                    "required": true,
                    "hasDynamicVariable": true,
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
                            "value": process.env.REACT_APP_DNS_URL + "excel/getTables"
                          }
                        ]
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
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "workbookId",
                            "dependOn": "idLookup",
                            "isAutomation": true,
                          },
                          {
                            "key": "worksheetId",
                            "dependOn": "idLookupSheet",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.tables",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["id"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idLookup",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "idLookupSheet",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    type: "textfield",
                    label: "Lookup Column",
                    required: true,
                    variableName: "lookupColumn",
                    value: "",
                    placeholder: "Enter Text..",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Lookup Value",
                    required: true,
                    variableName: "lookupValue",
                    value: "",
                    placeholder: "Enter Text..",
                    hasDynamicVariable: true,
                  },
                  {
                    label: "Return All Matches",
                    type: "checkbox",
                    value: false,
                    variableName: "returnAll",
                    rightSideInput: true,
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