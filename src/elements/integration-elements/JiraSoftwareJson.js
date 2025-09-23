export const JiraSoftwareJson = {
  "category": "integration",
  "type": "JiraSoftware",
  "label": "Jira Software",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/JiraSoftware/getting_started",
  "description": "Jira Software integration",
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
        "credType": "Jira",
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
        "value": "Issue",
        "variableName": "type",
        "errorSpan": "Please choose a Type",
        "required": true,
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "Issue",
            "value": "Issue"
          },
          {
            "option": "Issue Attachment",
            "value": "Issue Attachment"
          },
          {
            "option": "Issue Comment",
            "value": "Issue Comment"
          },
          {
            "option": "User",
            "value": "User"
          }
        ],
        "options": {
          "Issue": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Issue",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get",
                  "value": "Get Issue"
                },
                {
                  "option": "Get Many",
                  "value": "List Issues"
                },
                {
                  "option": "Create",
                  "value": "Create Issue"
                },
                {
                  "option": "Delete",
                  "value": "Delete Issue"
                }
              ],
              "options": {
                "Get Issue": [
                  {
                    "type": "textfield",
                    "label": "Issue Key",
                    "required": true,
                    "variableName": "issueKeyGet",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Expand",
                    "variableName": "expand",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "expand",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Fields",
                    "variableName": "fields",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "fields",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Properties",
                    "variableName": "properties",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "properties",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                ],
                "List Issues": [
                  {
                    "type": "api",
                    "label": "Project Key",
                    "variableName": "projectIdGetMany",
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
                            "value": process.env.REACT_APP_DNS_URL + "jira/listProjects"
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
                      "path": "data.projects",
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
                  // {
                  //   "type": "textfield",
                  //   "label": "Project Key",
                  //   "required": true,
                  //   "variableName": "projectIdGetMany",
                  //   "value": "",
                  //   "placeholder": "Enter text..",
                  //   "hasDynamicVariable": true
                  // },
                  {
                    "type": "textfield",
                    "label": "Status",
                    "required": false,
                    "variableName": "statusGetMany",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "value": "50",
                    "label": "Limit",
                    "required": false,
                    "numberField": true,
                    "typeOfValue": "integer",
                    "variableName": "limitGetMany"
                  },
                  {
                    "title": "Filters",
                    "type": "accordion",
                    "accTitle": "Expand",
                    "variableName": "expandGetMany",
                    "fieldsArray": [
                      [
                        {
                          "hasDynamicVariable": true,
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "expandGetMany",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Fields",
                    "variableName": "fieldsGetMany",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "fieldsGetMany",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Properties",
                    "variableName": "propertiesGetMany",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "propertiesGetMany",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                "Create Issue": [
                  {
                    "type": "api",
                    "label": "Project Key",
                    "variableName": "projectIdCreate",
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
                            "value": process.env.REACT_APP_DNS_URL + "jira/listProjects"
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
                      "path": "data.projects",
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
                    "label": "Issue Type",
                    "variableName": "issueTypeCreate",
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
                            "value": process.env.REACT_APP_DNS_URL + "jira/listIssueTypes"
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
                            "key": "projectKey",
                            "dependOn": "projectIdCreate",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.issueTypes",
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
                        "name": "projectIdCreate",
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
                  // {
                  //   "type": "textfield",
                  //   "label": "Project Id",
                  //   "value": "",
                  //   "placeholder": "Enter text..",
                  //   "variableName": "projectIdCreate",
                  //   "required": true,
                  //   "hasDynamicVariable": true
                  // },
                  // {
                  //   "type": "textfield",
                  //   "label": "Issue Type",
                  //   "value": "",
                  //   "placeholder": "Enter text..",
                  //   "variableName": "issueTypeCreate",
                  //   "required": true,
                  //   "hasDynamicVariable": true
                  // },
                  {
                    "type": "textfield",
                    "label": "Summary",
                    "value": "",
                    "placeholder": "Enter text..",
                    "variableName": "summaryCreate",
                    "required": true,
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "description",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "description",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Reporter Id",
                    "variableName": "reporter",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "reporter",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Assignee Id",
                    "variableName": "assignee",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "assignee",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                ],
                "Delete Issue": [
                  {
                    "type": "textfield",
                    "label": "Issue Key",
                    "required": true,
                    "variableName": "issueKeyDelete",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  }
                ]
              }
            }
          ],
          "Issue Attachment": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Attachment",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get",
                  "value": "Get Attachment"
                },
                {
                  "option": "Get Many",
                  "value": "Get Many Attachment"
                },
                {
                  "option": "Create",
                  "value": "Create Attachment"
                },
                {
                  "option": "Download",
                  "value": "Download Attachment"
                },
                {
                  "option": "Delete",
                  "value": "Delete Attachment"
                }
              ],
              "options": {
                "Get Attachment": [
                  {
                    "type": "textfield",
                    "label": "Attachment Id",
                    "required": true,
                    "variableName": "attachmentID",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                ],
                "Download Attachment": [
                  {
                    "type": "textfield",
                    "label": "Attachment Id",
                    "required": true,
                    "variableName": "attachmentID_Download",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                ],
                "Get Many Attachment": [
                  {
                    "type": "textfield",
                    "label": "Issue Key",
                    "required": true,
                    "variableName": "issueKeyGetManyAttachment",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                ],
                "Create Attachment": [
                  {
                    "type": "dropdown",
                    "label": "Attachment Type",
                    "value": "Url",
                    "variableName": "urlOrBinary",
                    "errorSpan": "Please choose a Type",
                    "required": true,
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "Url",
                        "value": "Url"
                      },
                      {
                        "option": "File",
                        "value": "Binary"
                      }
                    ],
                    "options": {
                      "Url": [
                        {
                          "type": "textfield",
                          "label": "Url",
                          "required": true,
                          "variableName": "url",
                          "value": "",
                          "placeholder": "Url",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "label": "File Name",
                          "required": true,
                          "variableName": "fileNameUrl",
                          "value": "",
                          "placeholder": "Enter text..",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "label": "Issue Key",
                          "required": true,
                          "variableName": "issueKeyUrl",
                          "value": "",
                          "placeholder": "Enter text..",
                          "hasDynamicVariable": true
                        }
                      ],
                      "Binary": [
                        {
                          "type": "textfield",
                          "label": "File Variable Name",
                          "required": true,
                          "variableName": "binary",
                          "value": "",
                          "placeholder": "Enter text..",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "label": "File Name",
                          "required": true,
                          "variableName": "fileNameBinary",
                          "value": "",
                          "placeholder": "Enter text..",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "label": "Issue Key",
                          "required": true,
                          "variableName": "issueKeyBinary",
                          "value": "",
                          "placeholder": "Enter text..",
                          "hasDynamicVariable": true
                        }
                      ]
                    }
                  }
                ],
                "Delete Attachment": [
                  {
                    "type": "textfield",
                    "label": "Attachment Id",
                    "required": true,
                    "variableName": "attachmentID",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  }
                ]
              }
            }
          ],
          "Issue Comment": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Comment",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get",
                  "value": "Get Comment"
                },
                {
                  "option": "Get Many",
                  "value": "Get Many Comment"
                },
                {
                  "option": "Create",
                  "value": "Create Comment"
                },
                {
                  "option": "Update",
                  "value": "Update Comment"
                },
                {
                  "option": "Delete",
                  "value": "Delete Comment"
                }
              ],
              "options": {
                "Get Comment": [
                  {
                    "type": "textfield",
                    "label": "Issue Key",
                    "required": true,
                    "variableName": "issueKeyGetComment",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Comment Id",
                    "required": true,
                    "variableName": "commentId",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Options",
                    "type": "accordion",
                    "accTitle": "Expand",
                    "variableName": "expandGetComment",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "expandGetComment",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                ],
                "Get Many Comment": [
                  {
                    "type": "textfield",
                    "label": "Issue Key",
                    "required": true,
                    "variableName": "issueKeyGetManyComment",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Options",
                    "type": "accordion",
                    "accTitle": "Expand",
                    "variableName": "expandGetManyComment",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "expandGetManyComment",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                ],
                "Create Comment": [
                  {
                    "type": "textfield",
                    "label": "Issue Key",
                    "required": true,
                    "variableName": "issueKeyCreateComment",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Comment",
                    "multiline": true,
                    "minRows": "3",
                    "required": true,
                    "variableName": "commentBody",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                ],
                "Delete Comment": [
                  {
                    "type": "textfield",
                    "label": "Issue Key",
                    "required": true,
                    "variableName": "issueKeyDeleteComment",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Comment Id",
                    "required": true,
                    "variableName": "commentDelete",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  }
                ],
                "Update Comment": [
                  {
                    "type": "textfield",
                    "label": "Issue Key",
                    "required": true,
                    "variableName": "issueKeyUpdateComment",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Comment Id",
                    "required": true,
                    "variableName": "commentUpdate",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Comment",
                    "multiline": true,
                    "minRows": "3",
                    "required": true,
                    "variableName": "commentBody",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  }
                ]
              }
            }
          ],
          "User": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get User",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get",
                  "value": "Get User"
                },
                {
                  "option": "Get Many",
                  "value": "Get Many User"
                },
                {
                  "option": "Create",
                  "value": "Create User"
                }
              ],
              "options": {
                "Get User": [
                  {
                    "type": "textfield",
                    "label": "User Id",
                    "required": true,
                    "variableName": "userId",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "title": "Options",
                    "type": "accordion",
                    "accTitle": "Expand",
                    "variableName": "expandUser",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Enter text..",
                          "variableName": "expandUser",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                ],
                "Get Many User": [
                  {
                    "type": "textfield",
                    "label": "Email or Display Name",
                    "required": true,
                    "variableName": "emailuser",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                ],
                "Create User": [
                  {
                    "type": "textfield",
                    "label": "Email",
                    "required": true,
                    "variableName": "emailCreate",
                    "value": "",
                    "placeholder": "Enter text..",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "multiselect",
                    "label": "Products",
                    "required": false,
                    "placeholder": "Select",
                    "variableName": "products_CreateUser",
                    "value": [],
                    "list": [
                      {
                        "option": "jira-software",
                        "value": "jira-software",
                      },
                      {
                        "option": "jira-product-discovery",
                        "value": "jira-product-discovery",
                      },
                      {
                        "option": "jira-servicedesk",
                        "value": "jira-servicedesk",
                      },
                      {
                        "option": "jira-core",
                        "value": "jira-core",
                      },
                    ],
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