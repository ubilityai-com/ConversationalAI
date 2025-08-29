export const OnedriveJson = {
  "category": "integration",
  "type": "Onedrive",
  "label": "Microsoft Onedrive",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Onedrive/getting_started",
  "description": "Microsoft Onedrive integration",
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
              "value": "Get File",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get",
                  "value": "Get File"
                },
                {
                  "option": "Copy",
                  "value": "Copy File"
                },
                {
                  "option": "Delete",
                  "value": "Delete File"
                },
                {
                  "option": "Create New Text File",
                  "value": "Create New Text File"
                },
                {
                  "option": "Download",
                  "value": "Download File"
                },
                {
                  "option": "Download File From ShareLink",
                  "value": "Download File From ShareLink"
                },
                {
                  "option": "Rename",
                  "value": "Rename File"
                },
                {
                  "option": "Search",
                  "value": "Search File"
                },
                {
                  "option": "Share",
                  "value": "Share File"
                },
                {
                  "option": "Upload",
                  "value": "Upload File"
                },
                {
                  "option": "Replace File Content",
                  "value": "Replace File Content"
                },
              ],
              "options": {
                "Get File": [
                  {
                    "type": "textfield",
                    "label": "File ID",
                    "required": true,
                    "variableName": "fileIDGetFile",
                    "value": "",
                    "placeholder": "File ID",
                    "hasDynamicVariable": true
                  },
                ],
                "Copy File": [
                  {
                    "type": "textfield",
                    "label": "File ID",
                    "required": true,
                    "variableName": "fileIDCopyFile",
                    "value": "",
                    "placeholder": "File ID",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "New File Name",
                    "required": false,
                    "variableName": "fileNameCopyFile",
                    "value": "",
                    "placeholder": "New File Name",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Parent Reference",
                    "type": "accordion",
                    "accTitle": "Parent Drive ID",
                    "variableName": "parentDriveIDCopyFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent Drive ID",
                          "variableName": "parentDriveIDOptionCopyFile",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Parent Drive Type",
                    "variableName": "parentDriveTypeCopyFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent Drive Type",
                          "variableName": "parentDriveTypeOptionCopyFile",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Parent ID",
                    "variableName": "parentIDCopyFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent ID",
                          "variableName": "parentIDOptionCopyFile",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "ID of the driveItem in the drive or a listItem in a list."
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Parent Name",
                    "variableName": "parentNameCopyFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent Name",
                          "variableName": "parentNameOptionCopyFile",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Parent Path",
                    "variableName": "parentPathCopyFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent Path",
                          "variableName": "parentPathOptionCopyFile",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Parent Share ID",
                    "variableName": "parentShareIDCopyFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent Share ID",
                          "variableName": "parentShareIDOptionCopyFile",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Parent Site ID",
                    "variableName": "parentSiteIDCopyFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent Site ID",
                          "variableName": "parentSiteIDOptionCopyFile",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        }
                      ]
                    ]
                  },
                ],
                "Delete File": [
                  {
                    "type": "textfield",
                    "label": "File ID",
                    "required": true,
                    "variableName": "fileIDDeleteFile",
                    "value": "",
                    "placeholder": "File ID",
                    "hasDynamicVariable": true
                  },
                ],
                "Create New Text File": [
                  {
                    "type": "textfield",
                    "label": "Parent Folder ID",
                    "required": true,
                    "variableName": "parentFolderIDCreateNewTextFile",
                    "value": "",
                    "placeholder": "Parent Folder ID",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "New File Name",
                    "required": true,
                    "variableName": "fileNameCreateNewTextFile",
                    "value": "",
                    "placeholder": "New File Name",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "File Content",
                    "multiline": true,
                    "minRows": 5,
                    "required": true,
                    "variableName": "fileContentCreateNewTextFile",
                    "value": "",
                    "placeholder": "File Content",
                    "hasDynamicVariable": true,
                  },
                ],
                "Download File": [
                  {
                    "type": "textfield",
                    "label": "File ID",
                    "required": true,
                    "variableName": "fileIDDownloadFile",
                    "value": "",
                    "placeholder": "File ID",
                    "hasDynamicVariable": true
                  },
                ],
                "Download File From ShareLink": [
                  {
                    "type": "textfield",
                    "label": "ShareLink URL",
                    "required": true,
                    "variableName": "shareLinkDownloadFileFromSharelink",
                    "value": "",
                    "placeholder": "ShareLink URL",
                    "hasDynamicVariable": true
                  },
                ],
                "Rename File": [
                  {
                    "type": "textfield",
                    "label": "File ID",
                    "required": true,
                    "variableName": "fileIDRenameFile",
                    "value": "",
                    "placeholder": "File ID",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "New File Name",
                    "required": true,
                    "variableName": "fileNameRenameFile",
                    "value": "",
                    "placeholder": "New File Name",
                    "hasDynamicVariable": true
                  },
                ],
                "Search File": [
                  {
                    "type": "textfield",
                    "label": "Query",
                    "required": true,
                    "variableName": "searchQuerySearchFile",
                    "value": "",
                    "placeholder": "Query",
                    "hasDynamicVariable": true
                  },
                ],
                "Share File": [
                  {
                    "type": "textfield",
                    "label": "File ID",
                    "required": true,
                    "variableName": "fileIDShareFile",
                    "value": "",
                    "placeholder": "File ID",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dropdown",
                    "label": "Share Type",
                    "value": "view",
                    "required": true,
                    "variableName": "shareTypeShareFile",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "View",
                        "value": "view"
                      },
                      {
                        "option": "Edit",
                        "value": "edit"
                      },
                      {
                        "option": "Embed",
                        "value": "embed"
                      },
                    ]
                  },
                  {
                    "type": "dropdown",
                    "label": "Share Scope",
                    "value": "anonymous",
                    "required": true,
                    "variableName": "shareScopeShareFile",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Anonymous",
                        "value": "anonymous"
                      },
                      {
                        "option": "Organization",
                        "value": "organization"
                      },
                      {
                        "option": "Users",
                        "value": "users"
                      },
                    ]
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Share Password",
                    "variableName": "PasswordShareFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Share Password",
                          "variableName": "PasswordOptionShareFile",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Share Expiration Date and Time",
                    "variableName": "expirationDateTimeShareFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Share Expiration Date and Time",
                          "variableName": "expirationDateTimeOptionShareFile",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Should be A String with format of yyyy-MM-ddTHH:mm:ssZ of DateTime indicating the expiration time of the permission."
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Retain Inherited Permissions",
                    "variableName": "retainInheritedPermissionsShareFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "retainInheritedPermissionsOptionShareFile",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                "Upload File": [
                  {
                    "type": "textfield",
                    "label": "Parent Folder ID",
                    "required": true,
                    "variableName": "parentFolderIDUploadFile",
                    "value": "",
                    "placeholder": "Parent Folder ID",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "New File Name",
                    "required": true,
                    "variableName": "fileNameUploadFile",
                    "value": "",
                    "placeholder": "New File Name",
                    "hasDynamicVariable": true,
                    "helperSpan": "Please make sure to also input the extension e.g(.png,.txt,.csv)",
                  },
                  {
                    "type": "textfield",
                    "label": "Content-type",
                    "required": true,
                    "variableName": "fileContentTypeUploadFile",
                    "value": "",
                    "placeholder": "like 'text/plain' for plain text files",
                    "hasDynamicVariable": true,
                    "helperSpan": "the value of the Content-type parameter to be included in the header that describes the type of the file. for more information see this page https://www.geeksforgeeks.org/http-headers-content-type/",
                  },
                  {
                    "type": "dropdown",
                    "label": "Upload From",
                    "value": "url",
                    "required": true,
                    "variableName": "uploadFromUploadFile",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "URL",
                        "value": "url"
                      },
                      {
                        "option": "File Content",
                        "value": "byteString"
                      },
                    ],
                    "options": {
                      "url": [
                        {
                          "type": "textfield",
                          "label": "URL",
                          "required": true,
                          "variableName": "fileURLUploadFile",
                          "value": "",
                          "placeholder": "URL",
                          "hasDynamicVariable": true
                        },
                      ],
                      "byteString": [
                        {
                          "type": "textfield",
                          "label": "File Content",
                          "required": true,
                          "variableName": "fileContentUploadFile",
                          "value": "",
                          "placeholder": "File Content",
                          "hasDynamicVariable": true
                        },
                      ],
                    },
                  },
                ],
                "Replace File Content": [
                  {
                    "type": "textfield",
                    "label": "File ID",
                    "required": true,
                    "variableName": "fileIDReplaceFileContent",
                    "value": "",
                    "placeholder": "File ID",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Content-type",
                    "required": true,
                    "variableName": "fileContentTypeReplaceFileContent",
                    "value": "",
                    "placeholder": "like 'text/plain' for plain text files",
                    "hasDynamicVariable": true,
                    "helperSpan": "the value of the Content-type parameter to be included in the header that describes the type of the file. for more information see this page https://www.geeksforgeeks.org/http-headers-content-type/",
                  },
                  {
                    "type": "dropdown",
                    "label": "Upload Content From",
                    "value": "url",
                    "required": true,
                    "variableName": "uploadFromReplaceFileContent",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "URL",
                        "value": "url"
                      },
                      {
                        "option": "File Content",
                        "value": "byteString"
                      },
                    ],
                    "options": {
                      "url": [
                        {
                          "type": "textfield",
                          "label": "URL",
                          "required": true,
                          "variableName": "fileURLReplaceFileContent",
                          "value": "",
                          "placeholder": "URL",
                          "hasDynamicVariable": true
                        },
                      ],
                      "byteString": [
                        {
                          "type": "textfield",
                          "label": "File Content",
                          "required": true,
                          "variableName": "fileContentReplaceFileContent",
                          "value": "",
                          "placeholder": "File Content",
                          "hasDynamicVariable": true
                        },
                      ],
                    },
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
                  "option": "Get Children",
                  "value": "Get Items in Folder"
                },
                {
                  "option": "Rename",
                  "value": "Rename Folder"
                },
                {
                  "option": "Search",
                  "value": "Search Folder"
                },
                {
                  "option": "Share",
                  "value": "Share Folder"
                }
              ],
              "options": {
                "Create Folder": [
                  {
                    "type": "textfield",
                    "label": "New Folder Name",
                    "required": true,
                    "variableName": "folderNameCreateFolder",
                    "value": "",
                    "placeholder": "New Folder Name",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Parent Folder ID",
                    "variableName": "parentFolderIDCreateFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent Folder ID",
                          "variableName": "parentFolderIDOptionCreateFolder",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "if left empty, the new folder will be created in the root of the drive",
                        }
                      ]
                    ]
                  },
                ],
                "Delete Folder": [
                  {
                    "type": "textfield",
                    "label": "Folder ID",
                    "required": true,
                    "variableName": "folderIDDeleteFolder",
                    "value": "",
                    "placeholder": "Folder ID",
                    "hasDynamicVariable": true
                  },
                ],
                "Get Items in Folder": [
                  {
                    "type": "textfield",
                    "label": "Folder ID",
                    "required": true,
                    "variableName": "folderIDGetFolderChildren",
                    "value": "",
                    "placeholder": "Folder ID",
                    "hasDynamicVariable": true
                  },
                ],
                "Rename Folder": [
                  {
                    "type": "textfield",
                    "label": "Folder ID",
                    "required": true,
                    "variableName": "folderIDRenameFolder",
                    "value": "",
                    "placeholder": "Folder ID",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "New Folder Name",
                    "required": true,
                    "variableName": "folderNameRenameFolder",
                    "value": "",
                    "placeholder": "New Folder Name",
                    "hasDynamicVariable": true
                  },
                ],
                "Search Folder": [
                  {
                    "type": "textfield",
                    "label": "Query",
                    "required": true,
                    "variableName": "searchQuerySearchFolder",
                    "value": "",
                    "placeholder": "Query",
                    "hasDynamicVariable": true
                  },
                ],
                "Share Folder": [
                  {
                    "type": "textfield",
                    "label": "Folder ID",
                    "required": true,
                    "variableName": "folderIDShareFolder",
                    "value": "",
                    "placeholder": "Folder ID",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "dropdown",
                    "label": "Share Type",
                    "value": "view",
                    "required": true,
                    "variableName": "shareTypeShareFolder",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "View",
                        "value": "view"
                      },
                      {
                        "option": "Edit",
                        "value": "edit"
                      },
                      {
                        "option": "Embed",
                        "value": "embed"
                      },
                    ]
                  },
                  {
                    "type": "dropdown",
                    "label": "Share Scope",
                    "value": "anonymous",
                    "required": true,
                    "variableName": "shareScopeShareFolder",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Anonymous",
                        "value": "anonymous"
                      },
                      {
                        "option": "Organization",
                        "value": "organization"
                      },
                      {
                        "option": "Users",
                        "value": "users"
                      },
                    ]
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Share Password",
                    "variableName": "PasswordShareFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Share Password",
                          "variableName": "PasswordOptionShareFolder",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Share Expiration Date and Time",
                    "variableName": "expirationDateTimeShareFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Share Expiration Date and Time",
                          "variableName": "expirationDateTimeOptionShareFolder",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Should be A String with format of yyyy-MM-ddTHH:mm:ssZ of DateTime indicating the expiration time of the permission."
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Retain Inherited Permissions",
                    "variableName": "retainInheritedPermissionsShareFolder",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "retainInheritedPermissionsOptionShareFolder",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
              }
            }
          ]
        }
      }
    ]
  }
};