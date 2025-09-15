export const ServiceNowJson = {
  "category": "integration",
  "type": "ServiceNow",
  "label": "ServiceNow",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/ServiceNow/getting_started",
  "description": "ServiceNow integration",
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
        "credType": "ServiceNow",
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
        "value": "Attachments",
        "variableName": "type",
        "errorSpan": "Please choose a Type",
        "required": true,
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "Attachments",
            "value": "Attachments"
          },
          {
            "option": "Table Records",
            "value": "Table Records"
          },
          {
            "option": "Incidents",
            "value": "Incidents"
          },
          {
            "option": "Users",
            "value": "Users"
          },
          {
            "option": "User Groups",
            "value": "User Groups"
          },
          {
            "option": "User Roles",
            "value": "User Roles"
          },
          {
            "option": "Business Services",
            "value": "Business Services"
          },
          {
            "option": "Configuration Items",
            "value": "Configuration Items"
          },
          {
            "option": "Departments",
            "value": "Departments"
          },
          {
            "option": "Dictionaries",
            "value": "Dictionaries"
          }
        ],
        "options": {
          "Attachments": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Attachments",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Attachments"
                },
                {
                  "option": "Get",
                  "value": "Get Attachment"
                },
                {
                  "option": "Upload",
                  "value": "Upload Attachment"
                },
                {
                  "option": "Delete",
                  "value": "Delete Attachment"
                },
              ],
              "options": {
                "Get Many Attachments": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Limit",
                    "placeholder": "Number of returned Attachments",
                    "variableName": "limit_GetManyAttachments",
                    "required": false,
                    "hasDynamicVariable": true,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "helperSpan": "Default is 1000.",
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Query",
                    "placeholder": "Query",
                    "variableName": "query_GetManyAttachments",
                    "required": false,
                    "hasDynamicVariable": true,
                    "helperSpan": "Encoded query used to filter the result set. Can be aquired following the instructions on this page: https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters",
                  },
                ],
                "Get Attachment": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Attachment ID",
                    "placeholder": "Attachment ID",
                    "variableName": "attachmentID_GetAttachment",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the Attachment to retrieve.",
                  },
                  {
                    "title": "Options",
                    "type": "accordion",
                    "accTitle": "Download Attachment",
                    "variableName": "download_GetAttachment",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "download_Option_GetAttachment",
                        },
                      ],
                    ],
                  },
                ],
                "Upload Attachment": [
                  {
                    "type": "api",
                    "label": "Table Name",
                    "variableName": "tableName_UploadAttachment",
                    "value": "None",
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
                            "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTables"
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
                      "path": "data.tables",
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
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Table Record ID",
                    "placeholder": "Table Record ID",
                    "variableName": "tableRecordID_UploadAttachment",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the record in the table specified above that you want to attach the attachment to.",
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Attachment file name",
                    "placeholder": "Attachment file name",
                    "variableName": "attachmentName_UploadAttachment",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "the name to be assigned to the uploaded Attachment.",
                  },
                  {
                    "type": "dropdown",
                    "label": "Attachment Content Type",
                    "value": "application/octet-stream",
                    "required": true,
                    "variableName": "contentType_UploadAttachment",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "application/EDI-X12",
                        "value": "application/EDI-X12"
                      },
                      {
                        "option": "application/EDIFACT",
                        "value": "application/EDIFACT"
                      },
                      {
                        "option": "application/javascript",
                        "value": "application/javascript"
                      },
                      {
                        "option": "application/octet-stream",
                        "value": "application/octet-stream"
                      },
                      {
                        "option": "application/ogg",
                        "value": "application/ogg"
                      },
                      {
                        "option": "application/pdf",
                        "value": "application/pdf"
                      },
                      {
                        "option": "application/xhtml+xml",
                        "value": "application/xhtml+xml"
                      },
                      {
                        "option": "application/x-shockwave-flash",
                        "value": "application/x-shockwave-flash"
                      },
                      {
                        "option": "application/json",
                        "value": "application/json"
                      },
                      {
                        "option": "application/ld+json",
                        "value": "application/ld+json"
                      },
                      {
                        "option": "application/xml",
                        "value": "application/xml"
                      },
                      {
                        "option": "application/zip",
                        "value": "application/zip"
                      },
                      {
                        "option": "application/x-www-form-urlencoded",
                        "value": "application/x-www-form-urlencoded"
                      },
                      {
                        "option": "audio/mpeg",
                        "value": "audio/mpeg"
                      },
                      {
                        "option": "audio/x-ms-wma",
                        "value": "audio/x-ms-wma"
                      },
                      {
                        "option": "audio/vnd.rn-realaudio",
                        "value": "audio/vnd.rn-realaudio"
                      },
                      {
                        "option": "audio/x-wav",
                        "value": "audio/x-wav"
                      },
                      {
                        "option": "image/gif",
                        "value": "image/gif"
                      },
                      {
                        "option": "image/jpeg",
                        "value": "image/jpeg"
                      },
                      {
                        "option": "image/png",
                        "value": "image/png"
                      },
                      {
                        "option": "image/tiff",
                        "value": "image/tiff"
                      },
                      {
                        "option": "image/vnd.microsoft.icon",
                        "value": "image/vnd.microsoft.icon"
                      },
                      {
                        "option": "image/x-icon",
                        "value": "image/x-icon"
                      },
                      {
                        "option": "image/vnd.djvu",
                        "value": "image/vnd.djvu"
                      },
                      {
                        "option": "image/svg+xml",
                        "value": "image/svg+xml"
                      },
                      {
                        "option": "multipart/mixed",
                        "value": "multipart/mixed"
                      },
                      {
                        "option": "multipart/alternative",
                        "value": "multipart/alternative"
                      },
                      {
                        "option": "multipart/related (using by MHTML (HTML mail).)",
                        "value": "multipart/related"
                      },
                      {
                        "option": "multipart/form-data",
                        "value": "multipart/form-data"
                      },
                      {
                        "option": "text/css",
                        "value": "text/css"
                      },
                      {
                        "option": "text/csv",
                        "value": "text/csv"
                      },
                      {
                        "option": "text/html",
                        "value": "text/html"
                      },
                      {
                        "option": "text/javascript",
                        "value": "text/javascript"
                      },
                      {
                        "option": "text/plain",
                        "value": "text/plain"
                      },
                      {
                        "option": "text/xml",
                        "value": "text/xml"
                      },
                      {
                        "option": "video/mpeg",
                        "value": "video/mpeg"
                      },
                      {
                        "option": "video/mp4",
                        "value": "video/mp4"
                      },
                      {
                        "option": "video/quicktime",
                        "value": "video/quicktime"
                      },
                      {
                        "option": "video/x-ms-wmv",
                        "value": "video/x-ms-wmv"
                      },
                      {
                        "option": "video/x-msvideo",
                        "value": "video/x-msvideo"
                      },
                      {
                        "option": "video/x-flv",
                        "value": "video/x-flv"
                      },
                      {
                        "option": "video/webm",
                        "value": "video/webm"
                      },
                      {
                        "option": "application/vnd.oasis.opendocument.text",
                        "value": "application/vnd.oasis.opendocument.text"
                      },
                      {
                        "option": "application/vnd.oasis.opendocument.spreadsheet",
                        "value": "application/vnd.oasis.opendocument.spreadsheet"
                      },
                      {
                        "option": "application/vnd.oasis.opendocument.presentation",
                        "value": "application/vnd.oasis.opendocument.presentation"
                      },
                      {
                        "option": "application/vnd.oasis.opendocument.graphics",
                        "value": "application/vnd.oasis.opendocument.graphics"
                      },
                      {
                        "option": "application/vnd.ms-excel",
                        "value": "application/vnd.ms-excel"
                      },
                      {
                        "option": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      },
                      {
                        "option": "application/vnd.ms-powerpoint",
                        "value": "application/vnd.ms-powerpoint"
                      },
                      {
                        "option": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        "value": "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                      },
                      {
                        "option": "application/msword",
                        "value": "application/msword"
                      },
                      {
                        "option": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      },
                      {
                        "option": "application/vnd.mozilla.xul+xml",
                        "value": "application/vnd.mozilla.xul+xml"
                      },
                    ]
                  },
                  {
                    "type": "dropdown",
                    "label": "Upload From",
                    "value": "url",
                    "required": true,
                    "variableName": "uploadFrom_UploadAttachment",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "URL",
                        "value": "url"
                      },
                      {
                        "option": "File",
                        "value": "byteString"
                      },
                    ],
                    "options": {
                      "url": [
                        {
                          "type": "textfield",
                          "label": "URL",
                          "required": true,
                          "variableName": "fileURL_UploadAttachment",
                          "value": "",
                          "placeholder": "URL",
                          "hasDynamicVariable": true
                        },
                      ],
                      "byteString": [
                        {
                          "type": "textfield",
                          "label": "File",
                          "required": true,
                          "variableName": "fileContent_UploadAttachment",
                          "value": "",
                          "placeholder": "File Name or Variable",
                          "hasDynamicVariable": true
                        },
                      ],
                    },
                  },
                ],
                "Delete Attachment": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Attachment ID",
                    "placeholder": "Attachment ID",
                    "variableName": "attachmentID_DeleteAttachment",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the Attachment to Delete.",
                  },
                ],
              }
            }
          ],
          "Table Records": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Table Records",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Table Records"
                },
                {
                  "option": "Get",
                  "value": "Get Table Record"
                },
                {
                  "option": "Create",
                  "value": "Create Table Record"
                },
                {
                  "option": "Update",
                  "value": "Update Table Record"
                },
                {
                  "option": "Delete",
                  "value": "Delete Table Record"
                },
              ],
              "options": {
                "Get Many Table Records": [
                  {
                    "type": "api",
                    "label": "Table Name",
                    "variableName": "tableName_GetManyTableRecords",
                    "value": "None",
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
                            "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTables"
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
                      "path": "data.tables",
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
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Limit",
                    "placeholder": "Number of returned Records",
                    "variableName": "limit_GetManyTableRecords",
                    "required": false,
                    "hasDynamicVariable": true,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "helperSpan": "Default is 10000.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Query to filter by",
                    "variableName": "query_GetManyTableRecords",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Query",
                          "variableName": "query_Option_GetManyTableRecords",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Encoded query used to filter the result set. Can be aquired following the instructions on this page: https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetManyTableRecords",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetManyTableRecords",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "dependOn": "tableName_GetManyTableRecords",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                            {
                              "type": "dropdown",
                              "name": "tableName_GetManyTableRecords",
                              "isAutomation": true
                            },
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetManyTableRecords",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetManyTableRecords",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetManyTableRecords",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetManyTableRecords",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ],
                "Get Table Record": [
                  {
                    "type": "api",
                    "label": "Table Name",
                    "variableName": "tableName_GetTableRecord",
                    "value": "None",
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
                            "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTables"
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
                      "path": "data.tables",
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
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Table Record ID",
                    "placeholder": "Table Record ID",
                    "variableName": "recordID_GetTableRecord",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the Record to retrieve.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetTableRecord",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetTableRecord",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "dependOn": "tableName_GetTableRecord",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                            {
                              "type": "dropdown",
                              "name": "tableName_GetTableRecord",
                              "isAutomation": true
                            },
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetTableRecord",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetTableRecord",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetTableRecord",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetTableRecord",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ],
                "Create Table Record": [
                  {
                    "type": "api",
                    "label": "Table Name",
                    "variableName": "tableName_CreateTableRecord",
                    "value": "None",
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
                            "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTables"
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
                      "path": "data.tables",
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
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Field",
                    "variableName": "field_CreateTableRecord",
                    "required": true,
                    "structure": [
                      {
                        "type": "row",
                        "title": "Field",
                        "variableName": "field_CreateTableRecord",
                        "removeButton": true
                      },
                      {
                        "type": "api",
                        "label": "Field ID",
                        "variableName": "fieldId_CreateTableRecord",
                        "value": "None",
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
                                "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                "key": "tableName",
                                "dependOn": "tableName_CreateTableRecord",
                                "isAutomation": true,
                              },
                            ]
                          }
                        ],
                        "res": {
                          "path": "data.fields",
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
                          {
                            "type": "dropdown",
                            "name": "tableName_CreateTableRecord",
                            "isAutomation": true
                          }
                        ],
                        "conditionOnFirstTime": [
                          {
                            "type": "dropdown",
                            "name": "cred",
                            "isAutomation": true
                          }
                        ],
                        "conditionOnRefresh": [
                          {
                            "type": "dropdown",
                            "name": "cred",
                            "isAutomation": true
                          }
                        ]
                      },
                      {
                        "type": "dropdown",
                        "label": "Field Content Type",
                        "value": "string",
                        "variableName": "fieldContentType_CreateTableRecord",
                        "errorSpan": "",
                        "required": true,
                        "hasDynamicVariable": false,
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
                          }
                        ],
                        "options": {
                          "string": [
                            {
                              "type": "textfield",
                              "label": "String Value",
                              "required": false,
                              "variableName": "fieldContentString_CreateTableRecord",
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
                              "variableName": "fieldContentBoolean_CreateTableRecord"
                            }
                          ],
                          "integer": [
                            {
                              "type": "textfield",
                              "label": "Integer Value",
                              "required": false,
                              "variableName": "fieldContentInteger_CreateTableRecord",
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
                              "variableName": "fieldContentFloat_CreateTableRecord",
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
                              "variableName": "fieldContentStringsList_CreateTableRecord",
                              "required": false,
                              "structure": [
                                {
                                  "type": "row",
                                  "title": "String",
                                  "variableName": "fieldContentStringsList_CreateTableRecord",
                                  "removeButton": true
                                },
                                {
                                  "type": "textfield",
                                  "value": "",
                                  "placeholder": "String Value",
                                  "variableName": "fieldContentListStringValue_CreateTableRecord",
                                  "required": false,
                                  "hasDynamicVariable": true
                                }
                              ],
                              "fieldsArray": []
                            }
                          ],
                        }
                      }
                    ]
                  },
                ],
                "Update Table Record": [
                  {
                    "type": "api",
                    "label": "Table Name",
                    "variableName": "tableName_UpdateTableRecord",
                    "value": "None",
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
                            "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTables"
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
                      "path": "data.tables",
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
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Table Record ID",
                    "placeholder": "Table Record ID",
                    "variableName": "recordID_UpdateTableRecord",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the Record to Update.",
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Field",
                    "variableName": "field_UpdateTableRecord",
                    "required": true,
                    "structure": [
                      {
                        "type": "row",
                        "title": "Field",
                        "variableName": "field_UpdateTableRecord",
                        "removeButton": true
                      },
                      {
                        "type": "api",
                        "label": "Field ID",
                        "variableName": "fieldId_UpdateTableRecord",
                        "value": "None",
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
                                "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                "key": "tableName",
                                "dependOn": "tableName_UpdateTableRecord",
                                "isAutomation": true,
                              },
                            ]
                          }
                        ],
                        "res": {
                          "path": "data.fields",
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
                          {
                            "type": "dropdown",
                            "name": "tableName_UpdateTableRecord",
                            "isAutomation": true
                          }
                        ],
                        "conditionOnFirstTime": [
                          {
                            "type": "dropdown",
                            "name": "cred",
                            "isAutomation": true
                          }
                        ],
                        "conditionOnRefresh": [
                          {
                            "type": "dropdown",
                            "name": "cred",
                            "isAutomation": true
                          }
                        ]
                      },
                      {
                        "type": "dropdown",
                        "label": "Field Content Type",
                        "value": "string",
                        "variableName": "fieldContentType_UpdateTableRecord",
                        "errorSpan": "",
                        "required": true,
                        "hasDynamicVariable": false,
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
                          }
                        ],
                        "options": {
                          "string": [
                            {
                              "type": "textfield",
                              "label": "String Value",
                              "required": false,
                              "variableName": "fieldContentString_UpdateTableRecord",
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
                              "variableName": "fieldContentBoolean_UpdateTableRecord"
                            }
                          ],
                          "integer": [
                            {
                              "type": "textfield",
                              "label": "Integer Value",
                              "required": false,
                              "variableName": "fieldContentInteger_UpdateTableRecord",
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
                              "variableName": "fieldContentFloat_UpdateTableRecord",
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
                              "variableName": "fieldContentStringsList_UpdateTableRecord",
                              "required": false,
                              "structure": [
                                {
                                  "type": "row",
                                  "title": "String",
                                  "variableName": "fieldContentStringsList_UpdateTableRecord",
                                  "removeButton": true
                                },
                                {
                                  "type": "textfield",
                                  "value": "",
                                  "placeholder": "String Value",
                                  "variableName": "fieldContentListStringValue_UpdateTableRecord",
                                  "required": false,
                                  "hasDynamicVariable": true
                                }
                              ],
                              "fieldsArray": []
                            }
                          ],
                        }
                      }
                    ]
                  },
                ],
                "Delete Table Record": [
                  {
                    "type": "api",
                    "label": "Table Name",
                    "variableName": "tableName_DeleteTableRecord",
                    "value": "None",
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
                            "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTables"
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
                      "path": "data.tables",
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
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Table Record ID",
                    "placeholder": "Table Record ID",
                    "variableName": "recordID_DeleteTableRecord",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the Record to Delete.",
                  },
                ],
              }
            }
          ],
          "Incidents": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Incidents",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Incidents"
                },
                {
                  "option": "Get",
                  "value": "Get Incident"
                },
                {
                  "option": "Create",
                  "value": "Create Incident"
                },
                {
                  "option": "Update",
                  "value": "Update Incident"
                },
                {
                  "option": "Delete",
                  "value": "Delete Incident"
                },
              ],
              "options": {
                "Get Many Incidents": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Limit",
                    "placeholder": "Number of returned Records",
                    "variableName": "limit_GetManyIncidents",
                    "required": false,
                    "hasDynamicVariable": true,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "helperSpan": "Default is 10000.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Query to filter by",
                    "variableName": "query_GetManyIncidents",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Query",
                          "variableName": "query_Option_GetManyIncidents",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Encoded query used to filter the result set. Can be aquired following the instructions on this page: https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetManyIncidents",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetManyIncidents",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "value": "incident"
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetManyIncidents",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetManyIncidents",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetManyIncidents",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetManyIncidents",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ],
                "Get Incident": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Incident ID",
                    "placeholder": "Incident ID",
                    "variableName": "recordID_GetIncident",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the Incident to retrieve.",
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetIncident",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "value": "incident"
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetIncident",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetIncident",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ],
                "Create Incident": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Short Description",
                    "placeholder": "Short Description",
                    "variableName": "shortDescription_CreateIncident",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Short description of the incident",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Assignment Group and Assignee",
                    // "accTitle": "Assignment Group ID",
                    "variableName": "groupID_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "groupID_Option_CreateIncident",
                          "label": "Assignment Group ID",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getUserGroups"
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
                            "path": "data.groups",
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
                            }
                          ],
                        },
                        {
                          "type": "api",
                          "variableName": "assigneeID_Option_CreateIncident",
                          "label": "Assignee ID",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getAssignees"
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
                                  "key": "groupID",
                                  "dependOn": "groupID_CreateIncident.groupID_Option_CreateIncident",
                                  "isAutomation": true
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.assignees",
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
                            {
                              "type": "dropdown",
                              "name": "groupID_CreateIncident.groupID_Option_CreateIncident",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Business Service ID",
                    "variableName": "businessServiceID_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "businessServiceID_Option_CreateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getBusinessServices"
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
                            "path": "data.services",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Caller ID",
                    "variableName": "callerID_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Caller ID",
                          "variableName": "callerID_Option_CreateIncident",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The unique identifier of the caller of the incident",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Category and Subcategory",
                    // "accTitle": "Category ID",
                    "variableName": "categoryID_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "label": "Category ID",
                          "variableName": "categoryID_Option_CreateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getCategories"
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
                            "path": "data.categories",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                        {
                          "type": "api",
                          "label": "Subcategory ID",
                          "variableName": "subcategoryID_Option_CreateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getSubCategories"
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
                                  "key": "categoryValue",
                                  "dependOn": "categoryID_CreateIncident.categoryID_Option_CreateIncident",
                                  "isAutomation": true
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.subcategories",
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
                            {
                              "type": "dropdown",
                              "name": "categoryID_CreateIncident.categoryID_Option_CreateIncident",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Close Notes",
                    "variableName": "closeNotes_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Close Notes",
                          "variableName": "closeNotes_Option_CreateIncident",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "minRows": "3",
                          "multiline": true,
                          "helperSpan": "The close notes for the incident",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Configuration Item IDs",
                    "variableName": "configurationItemID_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Incident's Configuration Items",
                          "label": "Field IDs",
                          "variableName": "configurationItemID_Option_CreateIncident",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getConfigurationItems"
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
                            "path": "data.items",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Contact Type",
                    "variableName": "contactType_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "contactType_Option_CreateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getContactTypes"
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
                            "path": "data.types",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "description_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Description",
                          "variableName": "description_Option_CreateIncident",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "minRows": "3",
                          "multiline": true,
                          "helperSpan": "The description of the incident",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Impact",
                    "variableName": "impact_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "3",
                          "required": false,
                          "variableName": "impact_Option_CreateIncident",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Low",
                              "value": "3"
                            },
                            {
                              "option": "Medium",
                              "value": "2"
                            },
                            {
                              "option": "High",
                              "value": "1"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Urgency",
                    "variableName": "urgency_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "3",
                          "required": false,
                          "variableName": "urgency_Option_CreateIncident",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Low",
                              "value": "3"
                            },
                            {
                              "option": "Medium",
                              "value": "2"
                            },
                            {
                              "option": "High",
                              "value": "1"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Resolution Code ID",
                    "variableName": "resolutionCodeID_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "resolutionCodeID_Option_CreateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getResolutionCodes"
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
                            "path": "data.codes",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "State ID",
                    "variableName": "stateID_CreateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "stateID_Option_CreateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getStates"
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
                            "path": "data.states",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                ],
                "Update Incident": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Incident ID",
                    "placeholder": "Incident ID",
                    "variableName": "recordID_UpdateIncident",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the Incident to Update.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Assignment Group and Assignee",
                    // "accTitle": "Assignment Group ID",
                    "variableName": "groupID_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "groupID_Option_UpdateIncident",
                          "label": "Assignment Group ID",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getUserGroups"
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
                            "path": "data.groups",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                        {
                          "type": "api",
                          "variableName": "assigneeID_Option_UpdateIncident",
                          "label": "Assignee ID",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getAssignees"
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
                                  "key": "groupID",
                                  "dependOn": "groupID_UpdateIncident.groupID_Option_UpdateIncident",
                                  "isAutomation": true
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.assignees",
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
                            {
                              "type": "dropdown",
                              "name": "groupID_UpdateIncident.groupID_Option_UpdateIncident",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Business Service ID",
                    "variableName": "businessServiceID_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "businessServiceID_Option_UpdateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getBusinessServices"
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
                            "path": "data.services",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Caller ID",
                    "variableName": "callerID_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Caller ID",
                          "variableName": "callerID_Option_UpdateIncident",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The unique identifier of the caller of the incident",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Category and Subcategory",
                    // "accTitle": "Category ID",
                    "variableName": "categoryID_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "label": "Category ID",
                          "variableName": "categoryID_Option_UpdateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getCategories"
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
                            "path": "data.categories",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                        {
                          "type": "api",
                          "label": "Subcategory ID",
                          "variableName": "subcategoryID_Option_UpdateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getSubCategories"
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
                                  "key": "categoryValue",
                                  "dependOn": "categoryID_UpdateIncident.categoryID_Option_UpdateIncident",
                                  "isAutomation": true
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.subcategories",
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
                            {
                              "type": "dropdown",
                              "name": "categoryID_UpdateIncident.categoryID_Option_UpdateIncident",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Close Notes",
                    "variableName": "closeNotes_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Close Notes",
                          "variableName": "closeNotes_Option_UpdateIncident",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "minRows": "3",
                          "multiline": true,
                          "helperSpan": "The close notes for the incident",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Configuration Item IDs",
                    "variableName": "configurationItemID_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Incident's Configuration Items",
                          "label": "Field IDs",
                          "variableName": "configurationItemID_Option_UpdateIncident",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getConfigurationItems"
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
                            "path": "data.items",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Contact Type",
                    "variableName": "contactType_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "contactType_Option_UpdateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getContactTypes"
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
                            "path": "data.types",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "description_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Description",
                          "variableName": "description_Option_UpdateIncident",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "minRows": "3",
                          "multiline": true,
                          "helperSpan": "The description of the incident",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Short Description",
                    "variableName": "shortDescription_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Short Description",
                          "variableName": "shortDescription_Option_UpdateIncident",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "minRows": "3",
                          "multiline": true,
                          "helperSpan": "The Short Description of the incident",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Impact",
                    "variableName": "impact_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "3",
                          "required": false,
                          "variableName": "impact_Option_UpdateIncident",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Low",
                              "value": "3"
                            },
                            {
                              "option": "Medium",
                              "value": "2"
                            },
                            {
                              "option": "High",
                              "value": "1"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Urgency",
                    "variableName": "urgency_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "3",
                          "required": false,
                          "variableName": "urgency_Option_UpdateIncident",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Low",
                              "value": "3"
                            },
                            {
                              "option": "Medium",
                              "value": "2"
                            },
                            {
                              "option": "High",
                              "value": "1"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Resolution Code ID",
                    "variableName": "resolutionCodeID_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "resolutionCodeID_Option_UpdateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getResolutionCodes"
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
                            "path": "data.codes",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "On Hold Reason ID",
                    "variableName": "holdReasonID_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "holdReasonID_Option_UpdateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getHoldReason"
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
                            "path": "data.reasons",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "State ID",
                    "variableName": "stateID_UpdateIncident",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "variableName": "stateID_Option_UpdateIncident",
                          "value": "None",
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getStates"
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
                            "path": "data.states",
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
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                ],
                "Delete Incident": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Incident ID",
                    "placeholder": "Incident ID",
                    "variableName": "recordID_DeleteIncident",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the Incident to delete.",
                  },
                ],
              }
            }
          ],
          "Users": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Users",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Users"
                },
                {
                  "option": "Get",
                  "value": "Get User"
                },
                {
                  "option": "Create",
                  "value": "Create User"
                },
                {
                  "option": "Update",
                  "value": "Update User"
                },
                {
                  "option": "Delete",
                  "value": "Delete User"
                },
              ],
              "options": {
                "Get Many Users": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Limit",
                    "placeholder": "Number of returned Records",
                    "variableName": "limit_GetManyUsers",
                    "required": false,
                    "hasDynamicVariable": true,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "helperSpan": "Default is 10000.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Query to filter by",
                    "variableName": "query_GetManyUsers",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Query",
                          "variableName": "query_Option_GetManyUsers",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Encoded query used to filter the result set. Can be aquired following the instructions on this page: https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetManyUsers",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetManyUsers",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "value": "sys_user"
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetManyUsers",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetManyUsers",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetManyUsers",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetManyUsers",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ],
                "Get User": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "User ID",
                    "placeholder": "User ID",
                    "variableName": "recordID_GetUser",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the User to retrieve.",
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetUser",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "value": "sys_user"
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetUser",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ],
                "Create User": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Introduction",
                    "placeholder": "Introduction",
                    "variableName": "introduction_CreateUser",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Introduction of the User",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Active",
                    "variableName": "active_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "active_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to activate the user",
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Building",
                    "variableName": "building_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Building",
                          "variableName": "building_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The Building address",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "City",
                    "variableName": "city_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "City",
                          "variableName": "city_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "City of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Company",
                    "variableName": "company_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Company",
                          "variableName": "company_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The name of the company for the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Country",
                    "variableName": "country_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Country",
                          "variableName": "country_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Country of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Department",
                    "variableName": "department_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Department",
                          "variableName": "department_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Department of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Email",
                    "variableName": "email_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "name@email.com",
                          "variableName": "email_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The email address associated with the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "First Name",
                    "variableName": "firstName_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "First Name",
                          "variableName": "firstName_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The first name of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Middle Name",
                    "variableName": "middleName_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Middle Name",
                          "variableName": "middleName_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The middle name of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Last Name",
                    "variableName": "lastName_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Last Name",
                          "variableName": "lastName_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The last name of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Gender",
                    "variableName": "gender_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Gender",
                          "variableName": "gender_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The gender of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Home Phone",
                    "variableName": "homePhone_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Home Phone",
                          "variableName": "homePhone_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Home phone Number of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Mobile Phone",
                    "variableName": "mobilePhone_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Mobile Phone",
                          "variableName": "mobilePhone_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Mobile phone Number of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Phone",
                    "variableName": "phone_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Phone",
                          "variableName": "phone_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The main phone number of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Location",
                    "variableName": "location_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Location",
                          "variableName": "location_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Location of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Manager",
                    "variableName": "manager_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Manager",
                          "variableName": "manager_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Manager of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Password",
                    "variableName": "password_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Password",
                          "Password": true,
                          "variableName": "password_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The user's password",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Password Needs Reset",
                    "variableName": "passNeedsReset_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "passNeedsReset_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to require a password reset when the user logs in",
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Role IDs",
                    "variableName": "roleID_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the User's Roles",
                          "variableName": "roleID_Option_CreateUser",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getUserRoles"
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
                            "path": "data.roles",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Source",
                    "variableName": "source_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Source",
                          "variableName": "source_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "State",
                    "variableName": "state_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "State",
                          "variableName": "state_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "State for the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Street",
                    "variableName": "street_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Street",
                          "variableName": "street_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Street information for the user separated by comma",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "User Name",
                    "variableName": "userName_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "User Name",
                          "variableName": "userName_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "A username associated with the user (e.g. user_name.123)",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Zip Code",
                    "variableName": "zipCode_CreateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Zip Code",
                          "variableName": "zipCode_Option_CreateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Zip code for the user",
                        }
                      ]
                    ]
                  },
                ],
                "Update User": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "User ID",
                    "placeholder": "User ID",
                    "variableName": "recordID_UpdateUser",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the User to Update.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Active",
                    "variableName": "active_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "active_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to activate the user",
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Building",
                    "variableName": "building_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Building",
                          "variableName": "building_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The Building address",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "City",
                    "variableName": "city_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "City",
                          "variableName": "city_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "City of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Company",
                    "variableName": "company_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Company",
                          "variableName": "company_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The name of the company for the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Country",
                    "variableName": "country_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Country",
                          "variableName": "country_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Country of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Department",
                    "variableName": "department_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Department",
                          "variableName": "department_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Department of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Email",
                    "variableName": "email_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "name@email.com",
                          "variableName": "email_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The email address associated with the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "First Name",
                    "variableName": "firstName_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "First Name",
                          "variableName": "firstName_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The first name of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Middle Name",
                    "variableName": "middleName_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Middle Name",
                          "variableName": "middleName_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The middle name of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Last Name",
                    "variableName": "lastName_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Last Name",
                          "variableName": "lastName_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The last name of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Gender",
                    "variableName": "gender_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Gender",
                          "variableName": "gender_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The gender of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Home Phone",
                    "variableName": "homePhone_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Home Phone",
                          "variableName": "homePhone_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Home phone Number of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Mobile Phone",
                    "variableName": "mobilePhone_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Mobile Phone",
                          "variableName": "mobilePhone_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Mobile phone Number of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Phone",
                    "variableName": "phone_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Phone",
                          "variableName": "phone_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The main phone number of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Location",
                    "variableName": "location_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Location",
                          "variableName": "location_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Location of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Manager",
                    "variableName": "manager_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Manager",
                          "variableName": "manager_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Manager of the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Password",
                    "variableName": "password_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Password",
                          "Password": true,
                          "variableName": "password_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "The user's password",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Password Needs Reset",
                    "variableName": "passNeedsReset_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "passNeedsReset_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to require a password reset when the user logs in",
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Role IDs",
                    "variableName": "roleID_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the User's Roles",
                          "variableName": "roleID_Option_UpdateUser",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getUserRoles"
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
                            "path": "data.roles",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Source",
                    "variableName": "source_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Source",
                          "variableName": "source_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "State",
                    "variableName": "state_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "State",
                          "variableName": "state_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "State for the user",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Street",
                    "variableName": "street_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Street",
                          "variableName": "street_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Street information for the user separated by comma",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Username",
                    "variableName": "userName_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Username",
                          "variableName": "userName_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "A username associated with the user (e.g. user_name.123)",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Zip Code",
                    "variableName": "zipCode_UpdateUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Zip Code",
                          "variableName": "zipCode_Option_UpdateUser",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Zip code for the user",
                        }
                      ]
                    ]
                  },
                ],
                "Delete User": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "User ID",
                    "placeholder": "User ID",
                    "variableName": "recordID_DeleteUser",
                    "required": true,
                    "hasDynamicVariable": true,
                    "helperSpan": "Sys_id of the User to Delete.",
                  },
                ],
              }
            }
          ],
          "User Groups": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many User Groups",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many User Groups"
                }
              ],
              "options": {
                "Get Many User Groups": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Limit",
                    "placeholder": "Number of returned Records",
                    "variableName": "limit_GetManyUserGroups",
                    "required": false,
                    "hasDynamicVariable": true,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "helperSpan": "Default is 10000.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Query to filter by",
                    "variableName": "query_GetManyUserGroups",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Query",
                          "variableName": "query_Option_GetManyUserGroups",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Encoded query used to filter the result set. Can be aquired following the instructions on this page: https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetManyUserGroups",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetManyUserGroups",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "value": "sys_user_group"
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetManyUserGroups",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetManyUserGroups",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetManyUserGroups",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetManyUserGroups",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ]
              }
            }
          ],
          "User Roles": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many User Roles",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many User Roles"
                }
              ],
              "options": {
                "Get Many User Roles": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Limit",
                    "placeholder": "Number of returned Records",
                    "variableName": "limit_GetManyUserRoles",
                    "required": false,
                    "hasDynamicVariable": true,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "helperSpan": "Default is 10000.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Query to filter by",
                    "variableName": "query_GetManyUserRoles",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Query",
                          "variableName": "query_Option_GetManyUserRoles",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Encoded query used to filter the result set. Can be aquired following the instructions on this page: https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetManyUserRoles",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetManyUserRoles",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "value": "sys_user_role"
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetManyUserRoles",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetManyUserRoles",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetManyUserRoles",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetManyUserRoles",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ]
              }
            }
          ],
          "Business Services": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Business Services",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Business Services"
                }
              ],
              "options": {
                "Get Many Business Services": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Limit",
                    "placeholder": "Number of returned Records",
                    "variableName": "limit_GetManyBusinessServices",
                    "required": false,
                    "hasDynamicVariable": true,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "helperSpan": "Default is 10000.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Query to filter by",
                    "variableName": "query_GetManyBusinessServices",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Query",
                          "variableName": "query_Option_GetManyBusinessServices",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Encoded query used to filter the result set. Can be aquired following the instructions on this page: https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetManyBusinessServices",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetManyBusinessServices",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "value": "cmdb_ci_service"
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetManyBusinessServices",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetManyBusinessServices",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetManyBusinessServices",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetManyBusinessServices",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ]
              }
            }
          ],
          "Configuration Items": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Configuration Items",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Configuration Items"
                }
              ],
              "options": {
                "Get Many Configuration Items": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Limit",
                    "placeholder": "Number of returned Records",
                    "variableName": "limit_GetManyConfigurationItems",
                    "required": false,
                    "hasDynamicVariable": true,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "helperSpan": "Default is 10000.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Query to filter by",
                    "variableName": "query_GetManyConfigurationItems",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Query",
                          "variableName": "query_Option_GetManyConfigurationItems",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Encoded query used to filter the result set. Can be aquired following the instructions on this page: https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetManyConfigurationItems",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetManyConfigurationItems",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "value": "cmdb_ci"
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetManyConfigurationItems",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetManyConfigurationItems",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetManyConfigurationItems",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetManyConfigurationItems",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ]
              }
            }
          ],
          "Departments": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Departments",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Departments"
                }
              ],
              "options": {
                "Get Many Departments": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Limit",
                    "placeholder": "Number of returned Records",
                    "variableName": "limit_GetManyDepatments",
                    "required": false,
                    "hasDynamicVariable": true,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "helperSpan": "Default is 10000.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Query to filter by",
                    "variableName": "query_GetManyDepatments",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Query",
                          "variableName": "query_Option_GetManyDepatments",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Encoded query used to filter the result set. Can be aquired following the instructions on this page: https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetManyDepatments",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetManyDepatments",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "value": "cmn_department"
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetManyDepatments",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetManyDepatments",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetManyDepatments",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetManyDepatments",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ]
              }
            }
          ],
          "Dictionaries": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Dictionaries",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Dictionaries"
                }
              ],
              "options": {
                "Get Many Dictionaries": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Limit",
                    "placeholder": "Number of returned Records",
                    "variableName": "limit_GetManyDictionaries",
                    "required": false,
                    "hasDynamicVariable": true,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "helperSpan": "Default is 10000.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Query to filter by",
                    "variableName": "query_GetManyDictionaries",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Query",
                          "variableName": "query_Option_GetManyDictionaries",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Encoded query used to filter the result set. Can be aquired following the instructions on this page: https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Returned Fields",
                    "variableName": "fieldIDs_GetManyDictionaries",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "multiselect": true,
                          "placeholder": "Please Choose the Fields to be returned",
                          "label": "Field IDs",
                          "variableName": "fieldIDs_Option_GetManyDictionaries",
                          "rightSideInput": true,
                          "value": [],
                          "required": false,
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
                                  "value": process.env.REACT_APP_DNS_URL + "serviceNow/getTableFields"
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
                                  "key": "tableName",
                                  "value": "sys_dictionary"
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.fields",
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
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Return Values",
                    "variableName": "returnValues_GetManyDictionaries",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "value": "false",
                          "required": false,
                          "variableName": "returnValues_Option_GetManyDictionaries",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Actual Values",
                              "value": "false"
                            },
                            {
                              "option": "Display Values",
                              "value": "true"
                            },
                            {
                              "option": "Both Actual and Display Values",
                              "value": "all"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Exclude Reference Link",
                    "variableName": "excludeReferenceLink_GetManyDictionaries",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeReferenceLink_Option_GetManyDictionaries",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Whether to exclude Table API links for reference fields",
                        },
                      ]
                    ]
                  },
                ]
              }
            }
          ]
        }
      }
    ]
  }
};