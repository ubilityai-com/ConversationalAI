export const GoogleDriveJson = {
  "category": "integration",
  "type": "GoogleDrive",
  "label": "Google Drive",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/GoogleDrive/getting_started",
  "description": "GoogleDrive integration",
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
        "type": "dropdown",
        "label": "Type",
        "value": "File",
        "variableName": "type",
        "errorSpan": "Please choose a Type",
        "required": true,
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "File",
            "value": "File"
          },
          {
            "option": "Folder",
            "value": "Folder"
          }
        ],
        "options": {
          "File": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Copy File",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Copy",
                  "value": "Copy File"
                },
                {
                  "option": "Create From Text",
                  "value": "Create File"
                },
                {
                  "option": "Delete",
                  "value": "Delete File"
                },
                {
                  "option": "Move",
                  "value": "Move File"
                },
                {
                  "option": "Share",
                  "value": "Share File"
                },
                // {
                //   "option": "Update",
                //   "value": "Update File"
                // },
                {
                  "option": "Upload",
                  "value": "Upload File"
                },
                {
                  "option": "Search",
                  "value": "List Files"
                },
                {
                  "option": "Download",
                  "value": "Get File"
                }
              ],
              "options": {
                "Copy File": [
                  {
                    "type": "textfield",
                    "label": "File Id",
                    "required": true,
                    "variableName": "fileIdCopy",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dropdown",
                    "value": "Copy In The Same Folder",
                    "variableName": "copyDropdown",
                    "label": "Place",
                    "list": [
                      {
                        "option": "Copy In The Same Folder",
                        "value": "Copy In The Same Folder"
                      },
                      {
                        "option": "Copy In Another Folder",
                        "value": "Copy In Another Folder"
                      }
                    ],
                    "options": {
                      "Copy In Another Folder": [
                        {
                          "type": "textfield",
                          "label": "Folder Id",
                          "required": true,
                          "variableName": "folderIdCopy",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true
                        }
                      ]
                    }
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "File Name",
                    "variableName": "fileNameCopy",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "variableName": "option",
                          "rightSideInput": true,
                          "placeholder": "Enter Text..",
                          "helperSpan": "The name of the new file. If not set, “Copy of {original file name}” will be used.",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "descriptionCopy",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "variableName": "option",
                          "placeholder": "Enter Text..",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                ],
                "Create File": [
                  {
                    "type": "textfield",
                    "label": "Text",
                    "required": true,
                    "variableName": "textFileCreate",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "File Name",
                    "required": false,
                    "variableName": "fileNameCreate",
                    "value": "",
                    "helperSpan": "The name of the file you want to create. If not specified, 'Untitled' will be used.",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Folder Id",
                    "variableName": "folderIdCreate",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "option",
                          "rightSideInput": true,
                          "helperSpan": "The Folder Where You Want To Create The File",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "OCR Language",
                    "variableName": "ocrFileCreate",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "option",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Use Content As Indexable Text",
                    "variableName": "checkboxCreateFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "option"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Propertie",
                    "variableName": "actionDynamic",
                    "structure": [
                      {
                        "type": "row",
                        "title": "Properties",
                        "variableName": "dynamicdrive",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "label": "Key",
                        "required": true,
                        "variableName": "keyPropCreateFile",
                        "placeholder": "Enter text..",
                        "hasDynamicVariable": true
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "label": "Value",
                        "required": true,
                        "variableName": "valuePropCreateFile",
                        "placeholder": "Enter text..",
                        "hasDynamicVariable": true
                      }
                    ]
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "APP Propertie",
                    "variableName": "actionDynamic2",
                    "structure": [
                      {
                        "type": "row",
                        "title": "Object",
                        "variableName": "dynamicAppdrive",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "label": "Key",
                        "required": true,
                        "variableName": "keyAppPropCreateFile",
                        "placeholder": "Enter text..",
                        "hasDynamicVariable": true
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "label": "Value",
                        "required": true,
                        "variableName": "valueAppPropCreateFile",
                        "placeholder": "Enter text..",
                        "hasDynamicVariable": true
                      }
                    ]
                  },
                ],
                "Delete File": [
                  {
                    "type": "textfield",
                    "label": "File Id",
                    "required": true,
                    "variableName": "fileIdDeleteFile",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Delete Permanently",
                    "variableName": "deleteTrash",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "deleteTrash",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                "Move File": [
                  {
                    "type": "textfield",
                    "label": "File Id",
                    "required": true,
                    "variableName": "fileIdMove",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Parent Folder",
                    "required": true,
                    "variableName": "folderParentMove",
                    "helperSpan": "The Folder where to move the file",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                ],
                "Share File": [
                  {
                    "type": "textfield",
                    "label": "File Id",
                    "required": true,
                    "variableName": "fileIdShare",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dropdown",
                    "label": "Role",
                    "required": true,
                    "value": "commenter",
                    "variableName": "dropRole",
                    "list": [
                      {
                        "option": "Commenter",
                        "value": "commenter"
                      },
                      {
                        "option": "Owner",
                        "value": "owner"
                      },
                      {
                        "option": "Reader",
                        "value": "reader"
                      },
                      {
                        "option": "Writer",
                        "value": "writer"
                      }
                    ]
                  },
                  {
                    "type": "dropdown",
                    "label": "Type",
                    "required": true,
                    "value": "user",
                    "variableName": "dropType",
                    "list": [
                      {
                        "option": "User",
                        "value": "user"
                      },
                      {
                        "option": "Group",
                        "value": "group"
                      },
                      {
                        "option": "Domain",
                        "value": "domain"
                      },
                      {
                        "option": "Anyone",
                        "value": "anyone"
                      }
                    ],
                    "options": {
                      "user": [
                        {
                          "type": "textfield",
                          "label": "Email Address",
                          "required": true,
                          "variableName": "emailShare",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true
                        }
                      ],
                      "group": [
                        {
                          "type": "textfield",
                          "label": "Email Address",
                          "required": true,
                          "variableName": "emailShareGroup",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true
                        }
                      ],
                      "domain": [
                        {
                          "type": "textfield",
                          "label": "Domain",
                          "required": true,
                          "variableName": "domainShare",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "checkbox",
                          "label": "Allow File Discovery",
                          "variableName": "fileDisCheckbox",
                          "value": false
                        }
                      ]
                    }
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Email Message",
                    "variableName": "emailMessageShare",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "required": false,
                          "variableName": "emailMessageShare",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Send Notification Email",
                    "variableName": "notifiEmailShare",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "notifiEmailShare",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Use Domain Admin Access",
                    "variableName": "domainAdminShare",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "domainAdminShare",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Move To New Owners Root",
                    "variableName": "newOwnersShare",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "newOwnersShare",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                // "Update File": [
                //   {
                //     "type": "textfield",
                //     "label": "File Id",
                //     "required": true,
                //     "variableName": "fileIdUpdate",
                //     "value": "",
                //     "placeholder": "Enter Text..",
                //     "hasDynamicVariable": true
                //   },
                //   {
                //     "type": "textfield",
                //     "label": "Binary Data",
                //     "value": "",
                //     "placeholder": "Enter Binary Data..",
                //     "required": true,
                //     "variableName": "dataUpdate",
                //     "rightSideInput": true
                //   },
                //   {
                //     "title": "Additional Fields",
                //     "type": "accordion",
                //     "accTitle": "New File Name",
                //     "variableName": "newFileNameUpdte",
                //     "fieldsArray": [
                //       [
                //         {
                //           "type": "textfield",
                //           "value": "",
                //           "placeholder": "Enter Text..",
                //           "required": false,
                //           "variableName": "newFileNameUpdte",
                //           "rightSideInput": true
                //         }
                //       ]
                //     ]
                //   },
                //   {
                //     "type": "dynamic",
                //     "fieldsArray": [],
                //     "title": "Propertie",
                //     "variableName": "actionDynamicUpdate",
                //     "structure": [
                //       {
                //         "type": "row",
                //         "title": "Properties",
                //         "variableName": "dynamicdriveUpdate",
                //         "removeButton": true
                //       },
                //       {
                //         "type": "textfield",
                //         "value": "",
                //         "label": "Key",
                //         "required": true,
                //         "variableName": "keyPropCreateFileUpdate",
                //         "placeholder": "Enter text..",
                //         "hasDynamicVariable": true
                //       },
                //       {
                //         "type": "textfield",
                //         "value": "",
                //         "label": "Value",
                //         "required": true,
                //         "variableName": "valuePropCreateFileUpdate",
                //         "placeholder": "Enter text..",
                //         "hasDynamicVariable": true
                //       }
                //     ]
                //   },
                //   {
                //     "type": "dynamic",
                //     "fieldsArray": [],
                //     "title": "APP Propertie",
                //     "variableName": "actionDynamic2Update",
                //     "structure": [
                //       {
                //         "type": "row",
                //         "title": "Object",
                //         "variableName": "dynamicAppdriveUpdate",
                //         "removeButton": true
                //       },
                //       {
                //         "type": "textfield",
                //         "value": "",
                //         "label": "Key",
                //         "required": true,
                //         "variableName": "keyAppPropCreateFileUpdate",
                //         "placeholder": "Enter text..",
                //         "hasDynamicVariable": true
                //       },
                //       {
                //         "type": "textfield",
                //         "value": "",
                //         "label": "Value",
                //         "required": true,
                //         "variableName": "valueAppPropCreateFileUpdate",
                //         "placeholder": "Enter text..",
                //         "hasDynamicVariable": true
                //       }
                //     ]
                //   },
                //   {
                //     "title": "Additional Fields",
                //     "type": "accordion",
                //     "accTitle": "OCR Language",
                //     "variableName": "ocrUpdate",
                //     "fieldsArray": [
                //       [
                //         {
                //           "type": "textfield",
                //           "value": "",
                //           "placeholder": "Enter Text..",
                //           "required": false,
                //           "variableName": "ocrUpdate",
                //           "rightSideInput": true
                //         }
                //       ]
                //     ]
                //   },
                //   {
                //     "type": "accordion",
                //     "accTitle": "Use Content As Indexable Text",
                //     "variableName": "contentUpdate",
                //     "fieldsArray": [
                //       [
                //         {
                //           "type": "checkbox",
                //           "value": false,
                //           "variableName": "contentUpdate",
                //           "rightSideInput": true
                //         }
                //       ]
                //     ]
                //   },
                // ],
                "Upload File": [
                  {
                    "type": "dropdown",
                    "label": "Type",
                    "required": true,
                    "value": "Binary",
                    "variableName": "dropData",
                    "list": [
                      {
                        "option": "Binary",
                        "value": "Binary"
                      },
                      {
                        "option": "Url",
                        "value": "Url"
                      }
                    ],
                    "options": {
                      "Binary": [
                        {
                          "type": "textfield",
                          "label": "Binary Data",
                          "required": true,
                          "variableName": "binaryUpload",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "label": "File Name",
                          "placeholder": "Enter text..",
                          "variableName": "nameUploadBinary",
                          "rightSideInput": true,
                          "required": true,
                          "hasDynamicVariable": true
                        }
                      ],
                      "Url": [
                        {
                          "type": "textfield",
                          "label": "Url",
                          "required": true,
                          "variableName": "urlUpload",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "label": "File Name",
                          "placeholder": "Enter text..",
                          "variableName": "nameUploadUrl",
                          "rightSideInput": true,
                          "required": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    }
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Folder Id",
                    "variableName": "folderIdUpload",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "folderIdUpload",
                          "rightSideInput": true,
                          "helperSpan": "The Folder Where You Want To Upload The File",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "OCR Language",
                    "variableName": "ocrFileUpload",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "ocrFileUpload",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Use Content As Indexable Text",
                    "variableName": "checkboxUploadFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "checkboxUploadFile"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Propertie",
                    "variableName": "actionDynamicUpload",
                    "structure": [
                      {
                        "type": "row",
                        "title": "Properties",
                        "variableName": "dynamicdrive",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "label": "Key",
                        "required": true,
                        "variableName": "keyPropUploadFile",
                        "placeholder": "Enter text..",
                        "hasDynamicVariable": true
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "label": "Value",
                        "required": true,
                        "variableName": "valuePropUploadFile",
                        "placeholder": "Enter text..",
                        "hasDynamicVariable": true
                      }
                    ]
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "APP Propertie",
                    "variableName": "actionDynamic2Upload",
                    "structure": [
                      {
                        "type": "row",
                        "title": "Object",
                        "variableName": "dynamicAppdrive",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "label": "Key",
                        "required": true,
                        "variableName": "keyAppPropUploadFile",
                        "placeholder": "Enter text..",
                        "hasDynamicVariable": true
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "label": "Value",
                        "required": true,
                        "variableName": "valueAppPropUploadFile",
                        "placeholder": "Enter text..",
                        "hasDynamicVariable": true
                      }
                    ]
                  },
                ],
                "List Files": [
                  {
                    "type": "dropdown",
                    "label": "Search By",
                    "required": true,
                    "value": "Name",
                    "variableName": "searchBy",
                    "list": [
                      {
                        "option": "Name",
                        "value": "Name"
                      },
                      {
                        "option": "Query",
                        "value": "Query"
                      }
                    ],
                    "options": {
                      "Name": [
                        {
                          "type": "textfield",
                          "label": "Name",
                          "required": false,
                          "variableName": "fileFolderName",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true,
                          "helperSpan": "The name of the file to search for. Returns also files whose names partially match this search term."
                        }
                      ],
                      "Query": [
                        {
                          "type": "textfield",
                          "label": "Query",
                          "required": false,
                          "variableName": "fileFolderQuery",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true,
                          "helperSpan": "Use the Google query strings syntax to search for a specific set of files."
                        }
                      ]
                    }
                  },
                  {
                    "type": "textfield",
                    "label": "Limit",
                    "required": false,
                    "variableName": "limitSearch",
                    "value": "50",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Parent Folder Id",
                    "variableName": "parentFolderId",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "parentFolderId",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "File MIME Type",
                    "variableName": "mimeTypeFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "multiselect",
                          "placeholder": "Select",
                          "value": [],
                          "variableName": "mimeTypeFile",
                          "list": [
                            {
                              "option": "Audio",
                              "value": "mimeType ='application/vnd.google-apps.audio'"
                            },
                            {
                              "option": "3rd Party Shortcut",
                              "value": "mimeType ='application/vnd.google-apps.drive-sdk'"
                            },
                            {
                              "option": "Google Apps Scripts",
                              "value": "mimeType ='application/vnd.google-apps.script'"
                            },
                            {
                              "option": "Google Docs",
                              "value": "mimeType ='application/vnd.google-apps.document'"
                            },
                            {
                              "option": "Google Drawing",
                              "value": "mimeType ='application/vnd.google-apps.drawing'"
                            },
                            {
                              "option": "Google Forms",
                              "value": "mimeType ='application/vnd.google-apps.form'"
                            },
                            {
                              "option": "Google Fusion Tables",
                              "value": "mimeType ='application/vnd.google-apps.fusiontable'"
                            },
                            {
                              "option": "Google My Maps",
                              "value": "mimeType ='application/vnd.google-apps.map'"
                            },
                            {
                              "option": "Google Sheets",
                              "value": "mimeType ='application/vnd.google-apps.spreadsheet'"
                            },
                            {
                              "option": "Google Sites",
                              "value": "mimeType ='application/vnd.google-apps.site'"
                            },
                            {
                              "option": "Google Slides",
                              "value": "mimeType ='application/vnd.google-apps.presentation'"
                            },
                            {
                              "option": "Google Photos",
                              "value": "mimeType ='application/vnd.google-apps.photo'"
                            },
                            {
                              "option": "Google Jamboard",
                              "value": "mimeType ='application/vnd.google-apps.jam'"
                            },
                            {
                              "option": "Shortcut",
                              "value": "mimeType ='application/vnd.google-apps.shortcut'"
                            },
                            {
                              "option": "Unknown",
                              "value": "mimeType ='application/vnd.google-apps.unknown'"
                            },
                            {
                              "option": "Video",
                              "value": "mimeType ='application/vnd.google-apps.video'"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "In the trash",
                    "variableName": "inTheTrashFiles",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "inTheTrashFiles"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Fields",
                    "variableName": "fieldsLists",
                    "fieldsArray": [
                      [
                        {
                          "type": "multiselect",
                          "placeholder": "Select",
                          "variableName": "fieldsLists",
                          "value": [],
                          "list": [
                            {
                              "option": "nextPageToken",
                              "value": "nextPageToken"
                            },
                            {
                              "option": "Kind",
                              "value": "kind"
                            },
                            {
                              "option": "incompleteSearch",
                              "value": "incompleteSearch"
                            },
                            {
                              "option": "Id",
                              "value": "id"
                            },
                            {
                              "option": "Name",
                              "value": "name"
                            },
                            {
                              "option": "Owners",
                              "value": "owners"
                            },
                            {
                              "option": "Trashed",
                              "value": "trashed"
                            },
                            {
                              "option": "*",
                              "value": "*"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                ],
                "Get File": [
                  {
                    "type": "textfield",
                    "label": "File Id",
                    "required": true,
                    "variableName": "fileIdGetFile",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                ],
              }
            }
          ],
          "Folder": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Create Folder",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Create",
                  "value": "Create Folder"
                },
                {
                  "option": "Delete",
                  "value": "Delete Folder"
                },
                {
                  "option": "Share",
                  "value": "Share Folder"
                },
                {
                  "option": "Move",
                  "value": "Move Folder"
                },
                {
                  "option": "Search",
                  "value": "List Folders"
                }
              ],
              "options": {
                "Create Folder": [
                  {
                    "type": "textfield",
                    "label": "Folder Name",
                    "required": true,
                    "variableName": "folderIdCreateFolder22",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Folder Id",
                    "variableName": "folderIdCreateFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "folderIdCreateFolder",
                          "rightSideInput": true,
                          "helperSpan": "The Folder Where You Want To Create The Folder",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                ],
                "Delete Folder": [
                  {
                    "type": "textfield",
                    "label": "Folder Id",
                    "required": true,
                    "variableName": "folderIdDeleteFile",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Delete Permanently",
                    "variableName": "deleteTrashFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "deleteTrashFolder",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  }
                ],
                "Share Folder": [
                  {
                    "type": "textfield",
                    "label": "Folder Id",
                    "required": true,
                    "variableName": "folderIdShareFolder",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dropdown",
                    "label": "Role",
                    "required": true,
                    "value": "commenter",
                    "variableName": "dropRoleFolder",
                    "list": [
                      {
                        "option": "Commenter",
                        "value": "commenter"
                      },
                      {
                        "option": "Owner",
                        "value": "owner"
                      },
                      {
                        "option": "Reader",
                        "value": "reader"
                      },
                      {
                        "option": "Writer",
                        "value": "writer"
                      }
                    ]
                  },
                  {
                    "type": "dropdown",
                    "label": "Type",
                    "required": true,
                    "value": "user",
                    "variableName": "dropTypeFolder",
                    "list": [
                      {
                        "option": "User",
                        "value": "user"
                      },
                      {
                        "option": "Group",
                        "value": "group"
                      },
                      {
                        "option": "Domain",
                        "value": "domain"
                      },
                      {
                        "option": "Anyone",
                        "value": "anyone"
                      }
                    ],
                    "options": {
                      "user": [
                        {
                          "type": "textfield",
                          "label": "Email Address",
                          "required": true,
                          "variableName": "emailShareFolder",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true
                        }
                      ],
                      "group": [
                        {
                          "type": "textfield",
                          "label": "Email Address",
                          "required": true,
                          "variableName": "emailShareGroupFolder",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true
                        }
                      ],
                      "domain": [
                        {
                          "type": "textfield",
                          "label": "Domain",
                          "required": true,
                          "variableName": "domainShareFolder",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "checkbox",
                          "label": "Allow File Discovery",
                          "variableName": "fileDisCheckboxFolder",
                          "value": false
                        }
                      ]
                    }
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Email Message",
                    "variableName": "emailMessageShareFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "required": false,
                          "variableName": "emailMessageShareFolder",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Send Notification Email",
                    "variableName": "notifiEmailShareFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "notifiEmailShareFolder",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Use Domain Admin Access",
                    "variableName": "domainAdminShareFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "domainAdminShareFolder",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Move To New Owners Root",
                    "variableName": "newOwnersShareFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "newOwnersShareFolder",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                "Move Folder": [
                  {
                    "type": "textfield",
                    "label": "Folder Id",
                    "required": true,
                    "variableName": "folderIdMove",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Parent Folder",
                    "required": true,
                    "variableName": "folderParentMoveFolder",
                    "helperSpan": "The Folder where to move the Folder",
                    "value": "",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                ],
                "List Folders": [
                  {
                    "type": "dropdown",
                    "label": "Search By",
                    "required": true,
                    "value": "Name",
                    "variableName": "searchByF",
                    "list": [
                      {
                        "option": "Name",
                        "value": "Name"
                      },
                      {
                        "option": "Query",
                        "value": "Query"
                      }
                    ],
                    "options": {
                      "Name": [
                        {
                          "type": "textfield",
                          "label": "Name",
                          "required": false,
                          "variableName": "FolderName",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true,
                          "helperSpan": "The name of the folder to search for. Returns also folders whose names partially match this search term."
                        }
                      ],
                      "Query": [
                        {
                          "type": "textfield",
                          "label": "Query",
                          "required": false,
                          "variableName": "FolderQuery",
                          "value": "",
                          "placeholder": "Enter Text..",
                          "hasDynamicVariable": true,
                          "helperSpan": "Use the Google query strings syntax to search for a specific set of folders."
                        }
                      ]
                    }
                  },
                  {
                    "type": "textfield",
                    "label": "Limit",
                    "required": false,
                    "variableName": "limitSearchFolder",
                    "value": "50",
                    "placeholder": "Enter Text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Parent Folder Id",
                    "variableName": "parentFolderIdFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "parentFolderIdFolder",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "In the trash",
                    "variableName": "inTheTrashFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "inTheTrashFolder"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Fields",
                    "variableName": "fieldsLists2",
                    "fieldsArray": [
                      [
                        {
                          "type": "multiselect",
                          "placeholder": "Select",
                          "variableName": "fieldsLists2",
                          "value": [],
                          "list": [
                            {
                              "option": "nextPageToken",
                              "value": "nextPageToken"
                            },
                            {
                              "option": "Kind",
                              "value": "kind"
                            },
                            {
                              "option": "incompleteSearch",
                              "value": "incompleteSearch"
                            },
                            {
                              "option": "Id",
                              "value": "id"
                            },
                            {
                              "option": "Name",
                              "value": "name"
                            },
                            {
                              "option": "Owners",
                              "value": "owners"
                            },
                            {
                              "option": "Trashed",
                              "value": "trashed"
                            },
                            {
                              "option": "*",
                              "value": "*"
                            }
                          ]
                        }
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