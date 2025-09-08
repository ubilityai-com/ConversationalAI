export const GoogleSheetsJson = {
  "category": "integration",
  "type": "GoogleSheets",
  "label": "Google Sheets",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/GoogleSheets/getting_started",
  "description": "GoogleSheets integration",
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
        "credType": "Google",
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
        "value": "Document",
        "variableName": "type",
        "errorSpan": "Please choose a Type",
        "required": true,
        "hasDynamicVariable": true,
        "list": [
          {
            "option": "Document",
            "value": "Document"
          },
          {
            "option": "Sheet Within Document",
            "value": "Sheet Within Document"
          }
        ],
        "options": {
          "Document": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "CREATE_SPREADSHEET",
              "variableName": "operation",
              "required": true,
              "hasDynamicVariable": true,
              "list": [
                {
                  "option": "Create",
                  "value": "CREATE_SPREADSHEET"
                }
              ],
              "options": {
                "CREATE_SPREADSHEET": [
                  {
                    "type": "textfield",
                    "label": "Title",
                    "value": "",
                    "placeholder": "Document1",
                    "required": true,
                    "variableName": "title",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Sheet",
                    "variableName": "sheet_info",
                    "structure": [
                      {
                        "type": "row",
                        "title": "Sheet",
                        "variableName": "sheet_info",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "placeholder": "Sheet1",
                        "variableName": "title_sheet"
                      },
                      {
                        "type": "checkbox",
                        "value": false,
                        "label": "Hidden",
                        "variableName": "hidden_sheet"
                      }
                    ]
                  },
                  {
                    "type": "accordion",
                    "title": "Options",
                    "accTitle": "Locale",
                    "variableName": "locale_document_create_spreadsheet",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "en_US",
                          "variableName": "locale",
                          "helperSpan": "The locale of the spreadsheet in one of the following formats: 1- an ISO 639-1 language code such as en. 2- an ISO 639-2 language code such as fil, if no 639-1 code exists. 3- a combination of the ISO language code and country code, such as en_US",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Recalculation Interval",
                    "variableName": "autoRecalc_document_create_spreadsheet",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "ON_CHANGE",
                          "variableName": "autoRecalc",
                          "list": [
                            {
                              "option": "On Change",
                              "value": "ON_CHANGE"
                            },
                            {
                              "option": "Minute",
                              "value": "MINUTE"
                            },
                            {
                              "option": "Hour",
                              "value": "HOUR"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                ],
                "DELETE_SPREADSHEET": [
                  {
                    "type": "textfield",
                    "label": "Document ID",
                    "value": "",
                    "required": true,
                    "placeholder": "1Dpr04SO8gWwUua9KpmXD3D5Zs6uhAp8-r0JMX9mhLlc",
                    "variableName": "spreadsheetId",
                    "hasDynamicVariable": true
                  }
                ]
              }
            }
          ],
          "Sheet Within Document": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "CREATE_SHEET",
              "variableName": "operation",
              "required": true,
              "hasDynamicVariable": true,
              "list": [
                {
                  "option": "Create Sheet",
                  "value": "CREATE_SHEET"
                },
                {
                  "option": "Remove Sheet",
                  "value": "REMOVE_SHEET"
                },
                {
                  "option": "Read Data",
                  "value": "READ_ROWS"
                },
                {
                  "option": "Update Rows",
                  "value": "UPDATE_ROWS"
                },
                {
                  "option": "Append Data",
                  "value": "APPEND_DATA"
                },
                {
                  "option": "Delete Data",
                  "value": "DELETE_COLS_OR_ROWS"
                },
                {
                  "option": "Clear Data",
                  "value": "CLEAR_DATA"
                }
              ],
              "options": {
                "CREATE_SHEET": [
                  {
                    "type": "textfield",
                    "label": "Document ID",
                    "value": "",
                    "required": true,
                    "placeholder": "1Dpr04SO8gWwUua9KpmXD3D5Zs6uhAp8-r0JMX9mhLlc",
                    "variableName": "spreadsheetId",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Sheet",
                    "required": true,
                    "variableName": "sheet_info_create_sheet",
                    "structure": [
                      {
                        "type": "row",
                        "title": "Sheet",
                        "variableName": "sheet_info_create_sheet",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "label": "Title",
                        "value": "",
                        "placeholder": "Sheet1",
                        "required": true,
                        "variableName": "title",
                        "hasDynamicVariable": true
                      },
                      {
                        "label": "Hidden",
                        "type": "checkbox",
                        "value": false,
                        "variableName": "hidden",
                        "hasDynamicVariable": true
                      },
                      {
                        "label": "Right To Left",
                        "type": "checkbox",
                        "value": false,
                        "variableName": "rightToLeft",
                        "hasDynamicVariable": true
                      },
                      {
                        "type": "textfield",
                        "label": "Sheet ID",
                        "value": "",
                        "placeholder": "0",
                        "typeOfValue": "integer",
                        "numberField": true,
                        "variableName": "sheetId",
                        "hasDynamicVariable": true
                      },
                      {
                        "type": "textfield",
                        "label": "Index",
                        "value": "",
                        "placeholder": "0",
                        "typeOfValue": "integer",
                        "numberField": true,
                        "variableName": "index",
                        "hasDynamicVariable": true
                      }
                    ]
                  },
                ],
                "REMOVE_SHEET": [
                  {
                    "type": "textfield",
                    "label": "Document ID",
                    "value": "",
                    "required": true,
                    "placeholder": "1Dpr04SO8gWwUua9KpmXD3D5Zs6uhAp8-r0JMX9mhLlc",
                    "variableName": "spreadsheetId",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Sheet",
                    "required": true,
                    "hasDynamicVariable": true,
                    "variableName": "sheet_info_remove_sheet",
                    "structure": [
                      {
                        "type": "row",
                        "title": "Sheet",
                        "variableName": "sheet_info_remove_sheet",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "label": "Sheet ID",
                        "value": 0,
                        "numberField": true,
                        "typeOfValue": "integer",
                        "required": true,
                        "placeholder": "sheet1",
                        "variableName": "sheetId",
                        "hasDynamicVariable": true
                      }
                    ]
                  },
                ],
                "READ_ROWS": [
                  {
                    "type": "textfield",
                    "label": "Document ID",
                    "value": "",
                    "required": true,
                    "placeholder": "1Dpr04SO8gWwUua9KpmXD3D5Zs6uhAp8-r0JMX9mhLlc",
                    "variableName": "spreadsheetId",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Sheet Name",
                    "value": "",
                    "required": true,
                    "placeholder": "sheet1",
                    "variableName": "sheetName",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "accordion",
                    "title": "Filters",
                    "accTitle": "Range",
                    "variableName": "range_sheet_read_rows",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "From",
                          "value": "",
                          "placeholder": "A2",
                          "variableName": "from"
                        },
                        {
                          "type": "textfield",
                          "label": "To",
                          "value": "",
                          "placeholder": "D10",
                          "variableName": "to"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Dimension",
                    "variableName": "majorDimension_sheet_read_rows",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "DIMENSION_UNSPECIFIED",
                          "variableName": "majorDimension_sheet_read_rows",
                          "list": [
                            {
                              "option": "Unspecified",
                              "value": "DIMENSION_UNSPECIFIED"
                            },
                            {
                              "option": "Rows",
                              "value": "ROWS"
                            },
                            {
                              "option": "Columns",
                              "value": "COLUMNS"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                ],
                "UPDATE_ROWS": [
                  {
                    "type": "textfield",
                    "label": "Document ID",
                    "value": "",
                    "required": true,
                    "placeholder": "1Dpr04SO8gWwUua9KpmXD3D5Zs6uhAp8-r0JMX9mhLlc",
                    "variableName": "spreadsheetId",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Sheet Name",
                    "value": "",
                    "required": true,
                    "placeholder": "sheet1",
                    "variableName": "sheetName",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Range",
                    "type": "textfield",
                    "label": "From",
                    "value": "",
                    "required": true,
                    "placeholder": "A2",
                    "variableName": "from_range",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "To",
                    "value": "",
                    "required": true,
                    "placeholder": "D10",
                    "variableName": "to_range",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Row",
                    "required": true,
                    "variableName": "values_sheet_update_rows",
                    "structure": [
                      {
                        "type": "row",
                        "title": "Row",
                        "variableName": "values_sheet_update_rows",
                        "removeButton": true
                      },
                      {
                        "type": "dynamic",
                        "json": {
                          "fieldsArray": [],
                          "title": "Cell",
                          "variableName": "cell_sheet_update_rows",
                          "structure": [
                            {
                              "type": "row",
                              "title": "Cell",
                              "variableName": "cell_sheet_update_rows",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "value": "",
                              "required": true,
                              "placeholder": "text",
                              "variableName": "cellData",
                              "hasDynamicVariable": true
                            }
                          ]
                        }
                      }
                    ]
                  },
                ],
                "APPEND_DATA": [
                  {
                    "type": "textfield",
                    "label": "Document ID",
                    "value": "",
                    "required": true,
                    "placeholder": "1Dpr04SO8gWwUua9KpmXD3D5Zs6uhAp8-r0JMX9mhLlc",
                    "variableName": "spreadsheetId",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Sheet Name",
                    "value": "",
                    "required": true,
                    "placeholder": "sheet1",
                    "variableName": "sheetName",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Row",
                    "required": true,
                    "variableName": "values_sheet_append_data",
                    "structure": [
                      {
                        "type": "row",
                        "title": "Row",
                        "variableName": "values_sheet_append_data",
                        "removeButton": true
                      },
                      {
                        "type": "dynamic",
                        "json": {
                          "fieldsArray": [],
                          "title": "Cell",
                          "variableName": "cell_sheet_append_data",
                          "structure": [
                            {
                              "type": "row",
                              "title": "Cell",
                              "variableName": "cell_sheet_append_data",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "value": "",
                              "required": true,
                              "placeholder": "text",
                              "variableName": "cellData",
                              "hasDynamicVariable": true
                            }
                          ]
                        }
                      }
                    ]
                  },
                ],
                "DELETE_COLS_OR_ROWS": [
                  {
                    "type": "textfield",
                    "label": "Document ID",
                    "value": "",
                    "required": true,
                    "placeholder": "1Dpr04SO8gWwUua9KpmXD3D5Zs6uhAp8-r0JMX9mhLlc",
                    "variableName": "spreadsheetId",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Dimension",
                    "required": true,
                    "variableName": "range_sheet_delete_data",
                    "structure": [
                      {
                        "type": "row",
                        "title": "Dimension",
                        "variableName": "range_sheet_delete_data",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "label": "Sheet ID",
                        "value": "",
                        "numberField": true,
                        "typeOfValue": "integer",
                        "required": true,
                        "variableName": "sheetId",
                        "hasDynamicVariable": true
                      },
                      {
                        "type": "dropdown",
                        "label": "Dimension",
                        "value": "ROWS",
                        "required": true,
                        "variableName": "dimension",
                        "list": [
                          {
                            "option": "Rows",
                            "value": "ROWS"
                          },
                          {
                            "option": "Columns",
                            "value": "COLUMNS"
                          }
                        ]
                      },
                      {
                        "type": "textfield",
                        "label": "Start Index",
                        "value": 0,
                        "numberField": true,
                        "typeOfValue": "integer",
                        "required": true,
                        "variableName": "startIndex",
                        "helperSpan": "Delete action starts after this index",
                        "hasDynamicVariable": true
                      },
                      {
                        "type": "textfield",
                        "label": "End Index",
                        "value": 0,
                        "numberField": true,
                        "typeOfValue": "integer",
                        "required": true,
                        "variableName": "endIndex",
                        "helperSpan": "Delete action ends at this index",
                        "hasDynamicVariable": true
                      }
                    ]
                  },
                ],
                "CLEAR_DATA": [
                  {
                    "type": "textfield",
                    "label": "Document ID",
                    "value": "",
                    "required": true,
                    "placeholder": "1Dpr04SO8gWwUua9KpmXD3D5Zs6uhAp8-r0JMX9mhLlc",
                    "variableName": "spreadsheetId",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Sheet Name",
                    "value": "",
                    "required": true,
                    "placeholder": "sheet1",
                    "variableName": "sheetName",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dropdown",
                    "label": "Range",
                    "value": "Range",
                    "variableName": "range",
                    "list": [
                      {
                        "option": "Range",
                        "value": "Range"
                      },
                      {
                        "option": "Single Cell",
                        "value": "Single Cell"
                      }
                    ],
                    "options": {
                      "Range": [
                        {
                          "title": "Range",
                          "type": "textfield",
                          "label": "From",
                          "required": true,
                          "value": "",
                          "placeholder": "A2",
                          "variableName": "from_range_sheet_clear_data",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "label": "To",
                          "value": "",
                          "required": true,
                          "placeholder": "D10",
                          "variableName": "to_range_sheet_clear_data",
                          "hasDynamicVariable": true
                        }
                      ],
                      "Single Cell": [
                        {
                          "type": "textfield",
                          "label": "Cell range",
                          "value": "",
                          "required": true,
                          "placeholder": "C4",
                          "variableName": "range_sheet_clear_data",
                          "hasDynamicVariable": true
                        }
                      ]
                    }
                  },
                ]
              }
            }
          ]
        }
      }
    ],
  }
};