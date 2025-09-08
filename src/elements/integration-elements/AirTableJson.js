export const AirTableJson = {
  "category": "integration",
  "type": "AirTable",
  "label": "AirTable",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/AirTable/getting_started",
  "description": "AirTable integration",
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
        "credType": "AirTable",
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
        "value": "Record",
        "variableName": "type",
        "errorSpan": "Please choose a Type",
        "required": true,
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "Records",
            "value": "Record"
          },
          {
            "option": "Bases",
            "value": "Base"
          },
        ],
        "options": {
          "Record": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Record",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get",
                  "value": "Get Record"
                },
                {
                  "option": "Get Many",
                  "value": "Find Records"
                },
                {
                  "option": "Create",
                  "value": "Create Record"
                },
                {
                  "option": "Update",
                  "value": "Update Record"
                },
                {
                  "option": "Update or Create",
                  "value": "Update Create Record"
                },
                {
                  "option": "Delete",
                  "value": "Delete Record"
                },
                {
                  "option": "Batch Delete",
                  "value": "Batch Delete Records"
                }
              ],
              "options": {
                "Get Record": [
                  {
                    "type": "api",
                    "label": "Base ID",
                    "variableName": "baseIdGet",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getBases"
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
                      "path": "data.bases",
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
                    "label": "Table ID",
                    "variableName": "tableIdGet",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getTables"
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
                            "key": "baseID",
                            "dependOn": "baseIdGet",
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
                        "name": "baseIdGet",
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
                    "type": "textfield",
                    "label": "Record ID",
                    "required": true,
                    "variableName": "recordIdGet",
                    "value": "",
                    "placeholder": "Record ID",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dropdown",
                    "label": "Returned Cell Format",
                    "value": "json",
                    "variableName": "cellFormatGet",
                    "errorSpan": "",
                    "required": false,
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "json",
                        "value": "json"
                      },
                      {
                        "option": "string",
                        "value": "string"
                      }
                    ],
                    "options": {
                      "string": [
                        {
                          "type": "textfield",
                          "label": "Time Zone",
                          "required": true,
                          "variableName": "timeZoneGet",
                          "value": "",
                          "placeholder": "Time Zone",
                          "hasDynamicVariable": true,
                          "helperSpan": "See https://support.airtable.com/hc/en-us/articles/216141558-Supported-timezones-for-SET-TIMEZONE for valid values."
                        },
                        {
                          "type": "textfield",
                          "label": "User Locale",
                          "required": true,
                          "variableName": "userLocaleGet",
                          "value": "",
                          "placeholder": "User Locale",
                          "hasDynamicVariable": true,
                          "helperSpan": "See https://support.airtable.com/hc/en-us/articles/220340268-Supported-locale-modifiers-for-SET-LOCALE for valid values."
                        }
                      ]
                    }
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Return Fields by Field ID",
                    "variableName": "returnByIdGet",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "returnByIdGet",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                "Find Records": [
                  {
                    "type": "api",
                    "label": "Base ID",
                    "variableName": "baseIdFind",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getBases"
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
                      "path": "data.bases",
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
                    "label": "Table ID",
                    "variableName": "tableIdFind",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getTables"
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
                            "key": "baseID",
                            "dependOn": "baseIdFind",
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
                        "name": "baseIdFind",
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
                    "type": "dropdown",
                    "label": "Returned Cell Format",
                    "value": "json",
                    "variableName": "cellFormatFind",
                    "errorSpan": "",
                    "required": false,
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "json",
                        "value": "json"
                      },
                      {
                        "option": "string",
                        "value": "string"
                      }
                    ],
                    "options": {
                      "string": [
                        {
                          "type": "textfield",
                          "label": "Time Zone",
                          "required": true,
                          "variableName": "timeZoneFind",
                          "value": "",
                          "placeholder": "Time Zone",
                          "hasDynamicVariable": true,
                          "helperSpan": "See https://support.airtable.com/hc/en-us/articles/216141558-Supported-timezones-for-SET-TIMEZONE for valid values."
                        },
                        {
                          "type": "textfield",
                          "label": "User Locale",
                          "required": true,
                          "variableName": "userLocaleFind",
                          "value": "",
                          "placeholder": "User Locale",
                          "hasDynamicVariable": true,
                          "helperSpan": "See https://support.airtable.com/hc/en-us/articles/220340268-Supported-locale-modifiers-for-SET-LOCALE for valid values."
                        }
                      ]
                    }
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Sort by Field",
                    "variableName": "sortFind",
                    "required": false,
                    "structure": [
                      {
                        "type": "row",
                        "title": "field",
                        "variableName": "sortFind",
                        "removeButton": true
                      },
                      {
                        "type": "dropdown",
                        "label": "Sort Order",
                        "value": "asc",
                        "variableName": "sortOrderFind",
                        "required": true,
                        "hasDynamicVariable": false,
                        "list": [
                          {
                            "option": "Ascending",
                            "value": "asc"
                          },
                          {
                            "option": "Descending",
                            "value": "desc"
                          }
                        ],
                        "options": {}
                      },
                      {
                        "type": "api",
                        "label": "Field ID",
                        "variableName": "fieldIdSortFind",
                        "value": "",
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
                                "value": process.env.REACT_APP_DNS_URL + "airtable/getTableFields"
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
                                "key": "baseID",
                                "dependOn": "baseIdFind",
                                "isAutomation": true,
                              },
                              {
                                "key": "tableID",
                                "dependOn": "tableIdFind",
                                "isAutomation": true,
                              },
                            ]
                          }
                        ],
                        "res": {
                          "path": "data.fields",
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
                            "name": "tableIdFind",
                            "isAutomation": true
                          }
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
                    ]
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "View",
                    "variableName": "viewIdFind",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "label": "View ID",
                          "variableName": "viewIdFind",
                          "value": "",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "airtable/getTableViews"
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
                                  "key": "baseID",
                                  "dependOn": "baseIdFind",
                                  "isAutomation": true,
                                },
                                {
                                  "key": "tableID",
                                  "dependOn": "tableIdFind",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.views",
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
                              "name": "tableIdFind",
                              "isAutomation": true
                            }
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
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Offset",
                    "variableName": "offset_Find",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Offset eg: itrP9nTDmt1wXL3ha/recXQqgESwEuE6KPT",
                          "variableName": "offset_Option_Find",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "To fetch the next page of records."
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldsFind",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "label": "Field IDs",
                          "variableName": "fieldIdFieldsFind",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "airtable/getTableFields"
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
                                  "key": "baseID",
                                  "dependOn": "baseIdFind",
                                  "isAutomation": true,
                                },
                                {
                                  "key": "tableID",
                                  "dependOn": "tableIdFind",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                              "name": "tableIdFind",
                              "isAutomation": true
                            }
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
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Page Size",
                    "variableName": "pageSizeFind",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Page Size",
                          "variableName": "pageSizeFind",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value must be integer between 0 and 100 with value 100 being the maximum"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Max Records",
                    "variableName": "maxRecordsFind",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Max number of returned records",
                          "variableName": "maxRecordsFind",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Formula",
                    "variableName": "formulaFind",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Airatble Formula",
                          "variableName": "formulaFind",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "If empty the operation will return all records in the table or view"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Fields by Field ID",
                    "variableName": "returnByIdFind",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "returnByIdFind",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                "Create Record": [
                  {
                    "type": "api",
                    "label": "Base ID",
                    "variableName": "baseIdCreate",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getBases"
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
                      "path": "data.bases",
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
                    "label": "Table ID",
                    "variableName": "tableIdCreate",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getTables"
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
                            "key": "baseID",
                            "dependOn": "baseIdCreate",
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
                        "name": "baseIdCreate",
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
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Field",
                    "variableName": "fieldCreate",
                    "required": true,
                    "structure": [
                      {
                        "type": "row",
                        "title": "Field",
                        "variableName": "fieldCreate",
                        "removeButton": true
                      },
                      {
                        "type": "api",
                        "label": "Field ID",
                        "variableName": "fieldIdCreate",
                        "value": "",
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
                                "value": process.env.REACT_APP_DNS_URL + "airtable/getTableFields"
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
                                "key": "baseID",
                                "dependOn": "baseIdCreate",
                                "isAutomation": true,
                              },
                              {
                                "key": "tableID",
                                "dependOn": "tableIdCreate",
                                "isAutomation": true,
                              },
                            ]
                          }
                        ],
                        "res": {
                          "path": "data.fields",
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
                            "name": "tableIdCreate",
                            "isAutomation": true
                          }
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
                        "type": "dropdown",
                        "label": "Field Content Type",
                        "value": "string",
                        "variableName": "fieldContentTypeCreate",
                        "errorSpan": "",
                        "required": true,
                        "hasDynamicVariable": false,
                        "helperSpan": "in order to choose content type refer to this link: https://airtable.com/developers/web/api/field-model",
                        "list": [
                          {
                            "option": "string",
                            "value": "string"
                          },
                          {
                            "option": "boolean",
                            "value": "boolean"
                          },
                          {
                            "option": "integer",
                            "value": "integer"
                          },
                          {
                            "option": "float",
                            "value": "float"
                          },
                          {
                            "option": "list of strings",
                            "value": "list"
                          },
                          {
                            "option": "list of attachments",
                            "value": "attachments"
                          }
                        ],
                        "options": {
                          "string": [
                            {
                              "type": "textfield",
                              "label": "String Value",
                              "required": false,
                              "variableName": "fieldContentStringCreate",
                              "value": "",
                              "placeholder": "String Value",
                              "hasDynamicVariable": true
                            }
                          ],
                          "boolean": [
                            {
                              "type": "checkbox",
                              "label": "Boolean Value",
                              "value": false,
                              "variableName": "fieldContentBooleanCreate"
                            }
                          ],
                          "integer": [
                            {
                              "type": "textfield",
                              "label": "Integer Value",
                              "required": false,
                              "variableName": "fieldContentIntegerCreate",
                              "value": "",
                              "placeholder": "Integer Value",
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "integer"
                            }
                          ],
                          "float": [
                            {
                              "type": "textfield",
                              "label": "Float Value",
                              "required": false,
                              "variableName": "fieldContentFloatCreate",
                              "value": "",
                              "placeholder": "Float Value",
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "float"
                            }
                          ],
                          "list": [
                            {
                              "type": "dynamic",
                              "title": "String",
                              "variableName": "fieldContentStringsListCreate",
                              "required": false,
                              "structure": [
                                {
                                  "type": "row",
                                  "title": "String",
                                  "variableName": "fieldContentStringsListCreate",
                                  "removeButton": true
                                },
                                {
                                  "type": "textfield",
                                  "value": "",
                                  "placeholder": "String Value",
                                  "variableName": "fieldContentListStringValueCreate",
                                  "required": false,
                                  "hasDynamicVariable": true
                                }
                              ],
                              "fieldsArray": []
                            }
                          ],
                          "attachments": [
                            {
                              "type": "dynamic",
                              "title": "Attachment",
                              "variableName": "fieldContentAttachmentsListCreate",
                              "required": true,
                              "structure": [
                                {
                                  "type": "row",
                                  "title": "Attachment",
                                  "variableName": "fieldContentAttachmentsListCreate",
                                  "removeButton": true
                                },
                                {
                                  "type": "textfield",
                                  "value": "",
                                  "placeholder": "URL",
                                  "variableName": "fieldContentListAttachmentURLCreate",
                                  "required": true,
                                  "hasDynamicVariable": true
                                },
                                {
                                  "type": "textfield",
                                  "value": "",
                                  "placeholder": "FileName",
                                  "variableName": "fieldContentListAttachmentFileNameCreate",
                                  "required": false,
                                  "hasDynamicVariable": true
                                }
                              ],
                              "fieldsArray": []
                            }
                          ]
                        }
                      }
                    ]
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Typecast",
                    "variableName": "typeCastCreate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "typeCastCreate",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Fields by Field ID",
                    "variableName": "returnByIdCreate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "returnByIdCreate",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                "Update Record": [
                  {
                    "type": "api",
                    "label": "Base ID",
                    "variableName": "baseIdUpdate",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getBases"
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
                      "path": "data.bases",
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
                    "label": "Table ID",
                    "variableName": "tableIdUpdate",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getTables"
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
                            "key": "baseID",
                            "dependOn": "baseIdUpdate",
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
                        "name": "baseIdUpdate",
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
                    "type": "textfield",
                    "label": "Record ID",
                    "required": true,
                    "variableName": "recordIdUpdate",
                    "value": "",
                    "placeholder": "Record ID",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Field",
                    "variableName": "fieldUpdate",
                    "required": true,
                    "structure": [
                      {
                        "type": "row",
                        "title": "Field",
                        "variableName": "fieldUpdate",
                        "removeButton": true
                      },
                      {
                        "type": "api",
                        "label": "Field ID",
                        "variableName": "fieldIdUpdate",
                        "value": "",
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
                                "value": process.env.REACT_APP_DNS_URL + "airtable/getTableFields"
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
                                "key": "baseID",
                                "dependOn": "baseIdUpdate",
                                "isAutomation": true,
                              },
                              {
                                "key": "tableID",
                                "dependOn": "tableIdUpdate",
                                "isAutomation": true,
                              },
                            ]
                          }
                        ],
                        "res": {
                          "path": "data.fields",
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
                            "name": "tableIdUpdate",
                            "isAutomation": true
                          }
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
                        "type": "dropdown",
                        "label": "Field Content Type",
                        "value": "string",
                        "variableName": "fieldContentTypeUpdate",
                        "errorSpan": "",
                        "required": true,
                        "hasDynamicVariable": false,
                        "helperSpan": "in order to choose content type refer to this link: https://airtable.com/developers/web/api/field-model",
                        "list": [
                          {
                            "option": "string",
                            "value": "string"
                          },
                          {
                            "option": "boolean",
                            "value": "boolean"
                          },
                          {
                            "option": "integer",
                            "value": "integer"
                          },
                          {
                            "option": "float",
                            "value": "float"
                          },
                          {
                            "option": "list of strings",
                            "value": "list"
                          },
                          {
                            "option": "list of attachments",
                            "value": "attachments"
                          }
                        ],
                        "options": {
                          "string": [
                            {
                              "type": "textfield",
                              "label": "String Value",
                              "required": false,
                              "variableName": "fieldContentStringUpdate",
                              "value": "",
                              "placeholder": "String Value",
                              "hasDynamicVariable": true
                            }
                          ],
                          "boolean": [
                            {
                              "type": "checkbox",
                              "label": "Boolean Value",
                              "value": false,
                              "variableName": "fieldContentBooleanUpdate"
                            }
                          ],
                          "integer": [
                            {
                              "type": "textfield",
                              "label": "Integer Value",
                              "required": false,
                              "variableName": "fieldContentIntegerUpdate",
                              "value": "",
                              "placeholder": "Integer Value",
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "integer"
                            }
                          ],
                          "float": [
                            {
                              "type": "textfield",
                              "label": "Float Value",
                              "required": false,
                              "variableName": "fieldContentFloatUpdate",
                              "value": "",
                              "placeholder": "Float Value",
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "float"
                            }
                          ],
                          "list": [
                            {
                              "type": "dynamic",
                              "title": "String",
                              "variableName": "fieldContentStringsListUpdate",
                              "required": false,
                              "structure": [
                                {
                                  "type": "row",
                                  "title": "String",
                                  "variableName": "fieldContentStringsListUpdate",
                                  "removeButton": true
                                },
                                {
                                  "type": "textfield",
                                  "value": "",
                                  "placeholder": "String Value",
                                  "variableName": "fieldContentListStringValueUpdate",
                                  "required": false,
                                  "hasDynamicVariable": true
                                }
                              ],
                              "fieldsArray": []
                            }
                          ],
                          "attachments": [
                            {
                              "type": "dynamic",
                              "title": "Attachment",
                              "variableName": "fieldContentAttachmentsListUpdate",
                              "required": true,
                              "structure": [
                                {
                                  "type": "row",
                                  "title": "Attachment",
                                  "variableName": "fieldContentAttachmentsListUpdate",
                                  "removeButton": true
                                },
                                {
                                  "type": "textfield",
                                  "value": "",
                                  "placeholder": "URL",
                                  "variableName": "fieldContentListAttachmentURLUpdate",
                                  "required": true,
                                  "hasDynamicVariable": true
                                },
                                {
                                  "type": "textfield",
                                  "value": "",
                                  "placeholder": "FileName",
                                  "variableName": "fieldContentListAttachmentFileNameUpdate",
                                  "required": false,
                                  "hasDynamicVariable": true
                                }
                              ],
                              "fieldsArray": []
                            }
                          ]
                        }
                      }
                    ]
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Typecast",
                    "variableName": "typeCastUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "typeCastUpdate",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Replace",
                    "variableName": "replaceUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "replaceUpdate",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                "Update Create Record": [
                  {
                    "type": "api",
                    "label": "Base ID",
                    "variableName": "baseIdUpdateCreate",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getBases"
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
                      "path": "data.bases",
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
                    "label": "Table ID",
                    "variableName": "tableIdUpdateCreate",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getTables"
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
                            "key": "baseID",
                            "dependOn": "baseIdUpdateCreate",
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
                        "name": "baseIdUpdateCreate",
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
                    "multiselect": true,
                    "placeholder": "Please Choose the Key fields to merge on instead of the Record ID",
                    "label": "Column IDs to Match On",
                    "variableName": "keyFeildsUpdateCreate",
                    "value": [],
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getTableFields"
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
                            "key": "baseID",
                            "dependOn": "baseIdUpdateCreate",
                            "isAutomation": true,
                          },
                          {
                            "key": "tableID",
                            "dependOn": "tableIdUpdateCreate",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.fields",
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
                        "name": "tableIdUpdateCreate",
                        "isAutomation": true
                      }
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
                    "type": "dropdown",
                    "label": "Input Method",
                    "value": "graphical",
                    "variableName": "inputMethodUpdateCreate",
                    "errorSpan": "",
                    "required": true,
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Json",
                        "value": "json"
                      },
                      {
                        "option": "Graphical",
                        "value": "graphical"
                      }
                    ],
                    "options": {
                      "json": [
                        {
                          "title": "Records (JSON Format)",
                          "type": "editor",
                          "showExpandIcon": true,
                          "defaultLanguage": "json",
                          "required": true,
                          "variableName": "recordsJsonUpdateCreate",
                          "value": "[]",
                          "helperSpan":
                            "the records to modify or create in the above format with the id being optional. for more information reference this page: https://airtable.com/developers/web/api/update-multiple-records where the value of the json should be the value of the records key in the documentation",
                        },
                      ],
                      "graphical": [
                        {
                          "type": "textfield",
                          "label": "Record ID",
                          "required": false,
                          "variableName": "recordIdUpdateCreate",
                          "value": "",
                          "placeholder": "Record ID",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Field",
                          "variableName": "fieldUpdateCreate",
                          "required": true,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Field",
                              "variableName": "fieldUpdateCreate",
                              "removeButton": true
                            },
                            {
                              "type": "api",
                              "label": "Field ID",
                              "variableName": "fieldIdUpdateCreate",
                              "value": "",
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
                                      "value": process.env.REACT_APP_DNS_URL + "airtable/getTableFields"
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
                                      "key": "baseID",
                                      "dependOn": "baseIdUpdateCreate",
                                      "isAutomation": true,
                                    },
                                    {
                                      "key": "tableID",
                                      "dependOn": "tableIdUpdateCreate",
                                      "isAutomation": true,
                                    },
                                  ]
                                }
                              ],
                              "res": {
                                "path": "data.fields",
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
                                  "name": "tableIdUpdateCreate",
                                  "isAutomation": true
                                }
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
                              "type": "dropdown",
                              "label": "Field Content Type",
                              "value": "string",
                              "variableName": "fieldContentTypeUpdateCreate",
                              "errorSpan": "",
                              "required": true,
                              "hasDynamicVariable": false,
                              "helperSpan": "in order to choose content type refer to this link: https://airtable.com/developers/web/api/field-model",
                              "list": [
                                {
                                  "option": "string",
                                  "value": "string"
                                },
                                {
                                  "option": "boolean",
                                  "value": "boolean"
                                },
                                {
                                  "option": "integer",
                                  "value": "integer"
                                },
                                {
                                  "option": "float",
                                  "value": "float"
                                },
                                {
                                  "option": "list of strings",
                                  "value": "list"
                                },
                                {
                                  "option": "list of attachments",
                                  "value": "attachments"
                                }
                              ],
                              "options": {
                                "string": [
                                  {
                                    "type": "textfield",
                                    "label": "String Value",
                                    "required": false,
                                    "variableName": "fieldContentStringUpdateCreate",
                                    "value": "",
                                    "placeholder": "String Value",
                                    "hasDynamicVariable": true
                                  }
                                ],
                                "boolean": [
                                  {
                                    "type": "checkbox",
                                    "label": "Boolean Value",
                                    "value": false,
                                    "variableName": "fieldContentBooleanUpdateCreate"
                                  }
                                ],
                                "integer": [
                                  {
                                    "type": "textfield",
                                    "label": "Integer Value",
                                    "required": false,
                                    "variableName": "fieldContentIntegerUpdateCreate",
                                    "value": "",
                                    "placeholder": "Integer Value",
                                    "hasDynamicVariable": true,
                                    "numberField": true,
                                    "typeOfValue": "integer"
                                  }
                                ],
                                "float": [
                                  {
                                    "type": "textfield",
                                    "label": "Float Value",
                                    "required": false,
                                    "variableName": "fieldContentFloatUpdateCreate",
                                    "value": "",
                                    "placeholder": "Float Value",
                                    "hasDynamicVariable": true,
                                    "numberField": true,
                                    "typeOfValue": "float"
                                  }
                                ],
                                "list": [
                                  {
                                    "type": "dynamic",
                                    "title": "String",
                                    "variableName": "fieldContentStringsListUpdateCreate",
                                    "required": false,
                                    "structure": [
                                      {
                                        "type": "row",
                                        "title": "String",
                                        "variableName": "fieldContentStringsListUpdateCreate",
                                        "removeButton": true
                                      },
                                      {
                                        "type": "textfield",
                                        "value": "",
                                        "placeholder": "String Value",
                                        "variableName": "fieldContentListStringValueUpdateCreate",
                                        "required": false,
                                        "hasDynamicVariable": true
                                      }
                                    ],
                                    "fieldsArray": []
                                  }
                                ],
                                "attachments": [
                                  {
                                    "type": "dynamic",
                                    "title": "Attachment",
                                    "variableName": "fieldContentAttachmentsListUpdateCreate",
                                    "required": true,
                                    "structure": [
                                      {
                                        "type": "row",
                                        "title": "Attachment",
                                        "variableName": "fieldContentAttachmentsListUpdateCreate",
                                        "removeButton": true
                                      },
                                      {
                                        "type": "textfield",
                                        "value": "",
                                        "placeholder": "URL",
                                        "variableName": "fieldContentListAttachmentURLUpdateCreate",
                                        "required": true,
                                        "hasDynamicVariable": true
                                      },
                                      {
                                        "type": "textfield",
                                        "value": "",
                                        "placeholder": "FileName",
                                        "variableName": "fieldContentListAttachmentFileNameUpdateCreate",
                                        "required": false,
                                        "hasDynamicVariable": true
                                      }
                                    ],
                                    "fieldsArray": []
                                  }
                                ]
                              }
                            }
                          ]
                        },
                      ]
                    }
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Typecast",
                    "variableName": "typeCastUpdateCreate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "typeCastUpdateCreate",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Fields by Field Id",
                    "variableName": "returnByIdUpdateCreate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "returnByIdUpdateCreate",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Replace",
                    "variableName": "replaceUpdateCreate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "replaceUpdateCreate",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                "Delete Record": [
                  {
                    "type": "api",
                    "label": "Base ID",
                    "variableName": "baseIdDelete",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getBases"
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
                      "path": "data.bases",
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
                    "label": "Table ID",
                    "variableName": "tableIdDelete",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getTables"
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
                            "key": "baseID",
                            "dependOn": "baseIdDelete",
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
                        "name": "baseIdDelete",
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
                    "type": "textfield",
                    "label": "Record ID",
                    "required": true,
                    "variableName": "recordIdDelete",
                    "value": "",
                    "placeholder": "Record ID",
                    "hasDynamicVariable": true
                  },
                ],
                "Batch Delete Records": [
                  {
                    "type": "api",
                    "label": "Base ID",
                    "variableName": "baseIdBatchDelete",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getBases"
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
                      "path": "data.bases",
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
                    "label": "Table ID",
                    "variableName": "tableIdBatchDelete",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getTables"
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
                            "key": "baseID",
                            "dependOn": "baseIdBatchDelete",
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
                        "name": "baseIdBatchDelete",
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
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Record",
                    "variableName": "recordBatchDelete",
                    "required": true,
                    "structure": [
                      {
                        "type": "row",
                        "title": "Record",
                        "variableName": "recordBatchDelete",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "placeholder": "Record ID",
                        "variableName": "recordIdBatchDelete",
                        "required": true,
                        "hasDynamicVariable": true
                      }
                    ]
                  },
                ]
              }
            }
          ],
          "Base": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Bases",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Schema",
                  "value": "Get Base Schema"
                },
                {
                  "option": "Get Many",
                  "value": "Get Many Bases"
                },
              ],
              "options": {
                "Get Base Schema": [
                  {
                    "type": "api",
                    "label": "Base ID",
                    "variableName": "baseID_GetBaseSchema",
                    "value": "",
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
                            "value": process.env.REACT_APP_DNS_URL + "airtable/getBases"
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
                      "path": "data.bases",
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
                "Get Many Bases": [
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Offset",
                    "variableName": "offset_GetManyBases",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Offset eg: itr23sEjsdfEr3282/appSW9R5uCNmRmfl6",
                          "variableName": "offset_Option_GetManyBases",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "To fetch the next page of records."
                        }
                      ]
                    ]
                  },
                ],
              }
            }
          ],
        }
      }
    ]
  }
};