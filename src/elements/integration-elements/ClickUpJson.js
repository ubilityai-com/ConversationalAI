export const ClickUpJson = {
  "category": "integration",
  "type": "ClickUp",
  "label": "ClickUp",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/ClickUp/getting_started",
  "description": "ClickUp integration",
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
        "credType": "ClickUp",
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
        "value": "Checklist",
        "variableName": "type",
        "errorSpan": "Please choose a Type",
        "required": true,
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "Checklist",
            "value": "Checklist"
          },
          {
            "option": "Checklist Item",
            "value": "Checklist Item"
          },
          {
            "option": "Folder",
            "value": "Folder"
          },
          {
            "option": "List",
            "value": "List"
          },
          {
            "option": "Task",
            "value": "Task"
          },
          {
            "option": "Task Dependency",
            "value": "Task Dependency"
          },
          {
            "option": "Time Entry",
            "value": "Time Entry"
          },
        ],
        "options": {
          "Checklist": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Create Checklist",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Create",
                  "value": "Create Checklist"
                },
                {
                  "option": "Update",
                  "value": "Update Checklist"
                },
                {
                  "option": "Delete",
                  "value": "Delete Checklist"
                },
              ],
              "options": {
                "Create Checklist": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Task ID",
                    "placeholder": "Task ID",
                    "variableName": "taskIDCreateChecklist",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Name",
                    "placeholder": "Name",
                    "variableName": "nameCreateChecklist",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                ],
                "Update Checklist": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Checklist ID",
                    "placeholder": "Checklist ID",
                    "variableName": "idUpdateChecklist",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Name",
                    "variableName": "nameUpdateChecklist",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Name",
                          "variableName": "nameOptionUpdateChecklist",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Position",
                    "variableName": "positionUpdateChecklist",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Position",
                          "variableName": "positionOptionUpdateChecklist",
                          "hasDynamicVariable": true,
                          "rightSideInput": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                        },
                      ]
                    ]
                  },
                ],
                "Delete Checklist": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Checklist ID",
                    "placeholder": "Checklist ID",
                    "variableName": "idDeleteChecklist",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                ],
              }
            }
          ],
          "Checklist Item": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Create Checklist Item",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Create",
                  "value": "Create Checklist Item"
                },
                {
                  "option": "Update",
                  "value": "Update Checklist Item"
                },
                {
                  "option": "Delete",
                  "value": "Delete Checklist Item"
                },
              ],
              "options": {
                "Create Checklist Item": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Checklist ID",
                    "placeholder": "Checklist ID",
                    "variableName": "idCreateChecklistItem",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Name",
                    "placeholder": "Name",
                    "variableName": "nameCreateChecklistItem",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Assignee ID",
                    "variableName": "assigneeIDCreateChecklistItem",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Assignee ID",
                          "variableName": "assigneeIDOptionCreateChecklistItem",
                          "hasDynamicVariable": true,
                          "rightSideInput": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                        },
                      ]
                    ]
                  },
                ],
                "Update Checklist Item": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Checklist ID",
                    "placeholder": "Checklist ID",
                    "variableName": "idUpdateChecklistItem",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Checklist Item ID",
                    "placeholder": "Checklist Item ID",
                    "variableName": "itemIDUpdateChecklistItem",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Assignee ID",
                    "variableName": "assigneeIDUpdateChecklistItem",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Assignee ID",
                          "variableName": "assigneeIDOptionUpdateChecklistItem",
                          "hasDynamicVariable": true,
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Name",
                    "variableName": "nameUpdateChecklistItem",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Name",
                          "variableName": "nameOptionUpdateChecklistItem",
                          "hasDynamicVariable": true,
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Parent Checklist Item ID ",
                    "variableName": "parentIDUpdateChecklistItem",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent Checklist Item ID ",
                          "variableName": "parentIDOptionUpdateChecklistItem",
                          "hasDynamicVariable": true,
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Resolved",
                    "variableName": "resolvedUpdateChecklistItem",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "resolvedOptionUpdateChecklistItem",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                ],
                "Delete Checklist Item": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Checklist ID",
                    "placeholder": "Checklist ID",
                    "variableName": "idDeleteChecklistItem",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Checklist Item ID",
                    "placeholder": "Checklist Item ID",
                    "variableName": "itemIDDeleteChecklistItem",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                ],
              }
            }
          ],
          "Folder": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Folders",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Folders"
                },
                {
                  "option": "Get",
                  "value": "Get Folder"
                },
                {
                  "option": "Create",
                  "value": "Create Folder"
                },
                {
                  "option": "Update",
                  "value": "Update Folder"
                },
                {
                  "option": "Delete",
                  "value": "Delete Folder"
                },
              ],
              "options": {
                "Get Many Folders": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDGetManyFolders",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDGetManyFolders",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDGetManyFolders",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDGetManyFolders",
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
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Archived",
                    "variableName": "archivedGetManyFolders",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "archivedOptionGetManyFolders",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                ],
                "Get Folder": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDGetFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDGetFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDGetFolder",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDGetFolder",
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
                    "hasDynamicVariable": true,
                    "label": "Folder ID",
                    "variableName": "folderIDGetFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                            "key": "space_id",
                            "dependOn": "spaceIDGetFolder",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.folders",
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
                        "name": "spaceIDGetFolder",
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
                ],
                "Create Folder": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDCreateFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDCreateFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDCreateFolder",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDCreateFolder",
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
                    "label": "Name",
                    "placeholder": "Name",
                    "variableName": "nameCreateFolder",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                ],
                "Update Folder": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDUpdateFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDUpdateFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDUpdateFolder",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDUpdateFolder",
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
                    "hasDynamicVariable": true,
                    "label": "Folder ID",
                    "variableName": "folderIDUpdateFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                            "key": "space_id",
                            "dependOn": "spaceIDUpdateFolder",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.folders",
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
                        "name": "spaceIDUpdateFolder",
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
                    "label": "Name",
                    "placeholder": "Name",
                    "variableName": "nameUpdateFolder",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                ],
                "Delete Folder": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDDeleteFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDDeleteFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDDeleteFolder",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDDeleteFolder",
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
                    "hasDynamicVariable": true,
                    "label": "Folder ID",
                    "variableName": "folderIDDeleteFolder",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                            "key": "space_id",
                            "dependOn": "spaceIDDeleteFolder",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.folders",
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
                        "name": "spaceIDDeleteFolder",
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
                ],
              }
            }
          ],
          "List": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Lists",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Lists"
                },
                {
                  "option": "Get",
                  "value": "Get List"
                },
                {
                  "option": "Get Members",
                  "value": "Get List Members"
                },
                {
                  "option": "Create",
                  "value": "Create List"
                },
                {
                  "option": "Update",
                  "value": "Update List"
                },
                {
                  "option": "Delete",
                  "value": "Delete List"
                },
              ],
              "options": {
                "Get Many Lists": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDGetManyLists",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDGetManyLists",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDGetManyLists",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDGetManyLists",
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
                    "hasDynamicVariable": true,
                    "label": "Folder ID",
                    "variableName": "folderIDGetManyLists",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                            "key": "space_id",
                            "dependOn": "spaceIDGetManyLists",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.folders",
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
                        "name": "spaceIDGetManyLists",
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
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Archived",
                    "variableName": "archivedGetManyLists",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "archivedOptionGetManyLists",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                ],
                "Get List": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDGetList",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDGetList",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDGetList",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDGetList",
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
                    "label": "List Type",
                    "value": "Foldered",
                    "required": true,
                    "variableName": "listTypeGetList",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Foldered List",
                        "value": "Foldered",
                      },
                      {
                        "option": "Folderless List",
                        "value": "Folderless",
                      },
                    ],
                    "options": {
                      "Foldered": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "Folder ID",
                          "variableName": "folderIDGetList",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDGetList",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.folders",
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
                              "name": "spaceIDGetList",
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
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "folderedListIDGetList",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getLists"
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
                                  "key": "folder_id",
                                  "dependOn": "folderIDGetList",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "folderIDGetList",
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
                      ],
                      "Folderless": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "folderlessListIDGetList",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolderlessLists"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDGetList",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "spaceIDGetList",
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
                      ],
                    },
                  },
                ],
                "Get List Members": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDGetListMembers",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDGetListMembers",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDGetListMembers",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDGetListMembers",
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
                    "label": "List Type",
                    "value": "Foldered",
                    "required": true,
                    "variableName": "listTypeGetListMembers",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Foldered List",
                        "value": "Foldered",
                      },
                      {
                        "option": "Folderless List",
                        "value": "Folderless",
                      },
                    ],
                    "options": {
                      "Foldered": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "Folder ID",
                          "variableName": "folderIDGetListMembers",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDGetListMembers",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.folders",
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
                              "name": "spaceIDGetListMembers",
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
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "folderedListIDGetListMembers",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getLists"
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
                                  "key": "folder_id",
                                  "dependOn": "folderIDGetListMembers",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "folderIDGetListMembers",
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
                      ],
                      "Folderless": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "folderlessListIDGetListMembers",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolderlessLists"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDGetListMembers",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "spaceIDGetListMembers",
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
                      ],
                    },
                  },
                ],
                "Create List": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDCreateList",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDCreateList",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDCreateList",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDCreateList",
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
                    "hasDynamicVariable": true,
                    "label": "Folder ID",
                    "variableName": "folderIDCreateList",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                            "key": "space_id",
                            "dependOn": "spaceIDCreateList",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.folders",
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
                        "name": "spaceIDCreateList",
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
                    "label": "Name",
                    "placeholder": "Name",
                    "variableName": "nameCreateList",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Assignee ID",
                    "variableName": "assigneeCreateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Assignee ID",
                          "variableName": "assigneeOptionCreateList",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Content",
                    "variableName": "contentCreateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Content",
                          "variableName": "contentOptionCreateList",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Due Date",
                    "variableName": "dueDateCreateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Due Date",
                          "variableName": "dueDateOptionCreateList",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Due Date Time",
                    "variableName": "dueDateTimeCreateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "dueDateTimeOptionCreateList",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Priority",
                    "variableName": "priorityCreateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Priority",
                          "variableName": "priorityOptionCreateList",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Status",
                    "variableName": "statusCreateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Status",
                          "variableName": "statusOptionCreateList",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Status refers to the List color rather than the task Statuses available in the List. Optional Values: (red, blue, green, etc...)",
                        }
                      ]
                    ]
                  },
                ],
                "Update List": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDUpdateList",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDUpdateList",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDUpdateList",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDUpdateList",
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
                    "label": "List Type",
                    "value": "Foldered",
                    "required": true,
                    "variableName": "listTypeUpdateList",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Foldered List",
                        "value": "Foldered",
                      },
                      {
                        "option": "Folderless List",
                        "value": "Folderless",
                      },
                    ],
                    "options": {
                      "Foldered": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "Folder ID",
                          "variableName": "folderIDUpdateList",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDUpdateList",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.folders",
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
                              "name": "spaceIDUpdateList",
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
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "listIDUpdateList",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getLists"
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
                                  "key": "folder_id",
                                  "dependOn": "folderIDUpdateList",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "folderIDUpdateList",
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
                      ],
                      "Folderless": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "listIDUpdateList",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolderlessLists"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDUpdateList",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "spaceIDUpdateList",
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
                      ],
                    },
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Assignee ID",
                    "variableName": "assigneeUpdateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "Assignee ID",
                          "variableName": "assigneeOptionUpdateList",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getTeamMembers"
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
                                  "key": "team_id",
                                  "dependOn": "teamIDUpdateList",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.members",
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
                              "name": "teamIDUpdateList",
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
                    "accTitle": "Name",
                    "variableName": "nameUpdateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Name",
                          "variableName": "nameOptionUpdateList",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Content",
                    "variableName": "contentUpdateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Content",
                          "variableName": "contentOptionUpdateList",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Due Date",
                    "variableName": "dueDateUpdateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Due Date",
                          "variableName": "dueDateOptionUpdateList",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Due Date Time",
                    "variableName": "dueDateTimeUpdateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "dueDateTimeOptionUpdateList",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Priority",
                    "variableName": "priorityUpdateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Priority",
                          "variableName": "priorityOptionUpdateList",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Status",
                    "variableName": "statusUpdateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Status",
                          "variableName": "statusOptionUpdateList",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "helperSpan": "Status refers to the List color rather than the task Statuses available in the List. Optional Values: (red, blue, green, etc...)",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Unset Status",
                    "variableName": "unsetStatusUpdateList",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "unsetStatusOptionUpdateList",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                ],
                "Delete List": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDDeleteList",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDDeleteList",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDDeleteList",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDDeleteList",
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
                    "label": "List Type",
                    "value": "Foldered",
                    "required": true,
                    "variableName": "listTypeDeleteList",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Foldered List",
                        "value": "Foldered",
                      },
                      {
                        "option": "Folderless List",
                        "value": "Folderless",
                      },
                    ],
                    "options": {
                      "Foldered": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "Folder ID",
                          "variableName": "folderIDDeleteList",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDDeleteList",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.folders",
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
                              "name": "spaceIDDeleteList",
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
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "folderedListIDDeleteList",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getLists"
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
                                  "key": "folder_id",
                                  "dependOn": "folderIDDeleteList",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "folderIDDeleteList",
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
                      ],
                      "Folderless": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "folderlessListIDDeleteList",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolderlessLists"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDDeleteList",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "spaceIDDeleteList",
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
                      ],
                    },
                  },
                ],
              }
            }
          ],
          "Task": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Tasks",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Tasks"
                },
                {
                  "option": "Get",
                  "value": "Get Task"
                },
                {
                  "option": "Get Members",
                  "value": "Get Task Members"
                },
                {
                  "option": "Create",
                  "value": "Create Task"
                },
                {
                  "option": "Update",
                  "value": "Update Task"
                },
                {
                  "option": "Delete",
                  "value": "Delete Task"
                },
              ],
              "options": {
                "Get Many Tasks": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDGetManyTasks",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDGetManyTasks",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDGetManyTasks",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDGetManyTasks",
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
                    "label": "List Type",
                    "value": "Foldered",
                    "required": true,
                    "variableName": "listTypeGetManyTasks",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Foldered List",
                        "value": "Foldered",
                      },
                      {
                        "option": "Folderless List",
                        "value": "Folderless",
                      },
                    ],
                    "options": {
                      "Foldered": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "Folder ID",
                          "variableName": "folderIDGetManyTasks",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDGetManyTasks",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.folders",
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
                              "name": "spaceIDGetManyTasks",
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
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "listIDGetManyTasks",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getLists"
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
                                  "key": "folder_id",
                                  "dependOn": "folderIDGetManyTasks",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "folderIDGetManyTasks",
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
                      ],
                      "Folderless": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "listIDGetManyTasks",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolderlessLists"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDGetManyTasks",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "spaceIDGetManyTasks",
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
                      ],
                    },
                  },
                  // {
                  //   "type": "dynamic",
                  //   "fieldsArray": [],
                  //   "title": "Custom Field",
                  //   "variableName": "customFieldsGetManyTasks",
                  //   "required": false,
                  //   "structure": [
                  //     {
                  //       "type": "row",
                  //       "title": "Custom Field",
                  //       "variableName": "customFieldsGetManyTasks",
                  //       "removeButton": true
                  //     },
                  //     {
                  //       "type": "api",
                  //       "hasDynamicVariable": true,
                  //       "label": "Field ID",
                  //       "variableName": "fieldIDGetManyTasks",
                  //       "value": "None",
                  //       "required": true,
                  //       "list": [],
                  //       "config": [
                  //         {
                  //           "key": "method",
                  //           "value": "post"
                  //         },
                  //         {
                  //           "key": "url",
                  //           "dependOn": [
                  //             {
                  //               "type": "static",
                  //               "value": process.env.REACT_APP_DNS_URL +"clickup/getAccessibleCustomFields"
                  //             }
                  //           ]
                  //         },
                  //         {
                  //           "key": "data",
                  //           "obj": [
                  //             {
                  //               "key": "credential_name",
                  //               "dependOn": "cred",
                  //               "isAutomation": true
                  //             },
                  //             {
                  //               "key": "list_id",
                  //               "dependOn": "listIDGetManyTasks",
                  //               "isAutomation": true,
                  //             },
                  //           ]
                  //         }
                  //       ],
                  //       "res": {
                  //         "path": "data.fields",
                  //         "keys": {
                  //           "option": {
                  //             "fields": [
                  //               "name"
                  //             ]
                  //           },
                  //           "value": {
                  //             "fields": [
                  //               "id"
                  //             ]
                  //           }
                  //         },
                  //         "type": [],
                  //         "key": true
                  //       },
                  //       "apiDependsOn": [
                  //         {
                  //           "type": "dropdown",
                  //           "name": "cred",
                  //           "isAutomation": true
                  //         },
                  //         {
                  //           "type": "dropdown",
                  //           "name": "listIDGetManyTasks",
                  //           "isAutomation": true
                  //         }
                  //       ],
                  //       "conditionOnFirstTime": [
                  //         {
                  //           "type": "dropdown",
                  //           "name": "cred",
                  //           "isAutomation": true
                  //         }
                  //       ],
                  //       "conditionOnRefresh": [
                  //         {
                  //           "type": "dropdown",
                  //           "name": "cred",
                  //           "isAutomation": true
                  //         }
                  //       ]
                  //     },
                  //     {
                  //       "type": "dropdown",
                  //       "label": "Operator",
                  //       "value": "=",
                  //       "required": true,
                  //       "variableName": "operatorGetManyTasks",
                  //       "hasDynamicVariable": true,
                  //       "list": [
                  //         {
                  //           "option": "Equal",
                  //           "value": "=",
                  //         },
                  //         {
                  //           "option": "<",
                  //           "value": "<",
                  //         },
                  //         {
                  //           "option": "<=",
                  //           "value": "<=",
                  //         },
                  //         {
                  //           "option": ">",
                  //           "value": ">",
                  //         },
                  //         {
                  //           "option": ">=",
                  //           "value": ">=",
                  //         },
                  //         {
                  //           "option": "!=",
                  //           "value": "!=",
                  //         },
                  //         {
                  //           "option": "IS NULL",
                  //           "value": "IS NULL",
                  //         },
                  //         {
                  //           "option": "IS NOT NULL",
                  //           "value": "IS NOT NULL",
                  //         },
                  //       ],
                  //     },
                  //     {
                  //       "type": "textfield",
                  //       "value": "",
                  //       "placeholder": "Value",
                  //       "variableName": "valueGetManyTasks",
                  //       "required": false,
                  //       "hasDynamicVariable": true,
                  //     },
                  //   ]
                  // },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Archived",
                    "variableName": "archivedGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "archivedOptionGetManyTasks",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Include Closed",
                    "variableName": "includeClosedGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "includeClosedOptionGetManyTasks",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Subtasks",
                    "variableName": "subtasksGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "subtasksOptionGetManyTasks",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Order By",
                    "variableName": "orderByGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Order By",
                          "value": "None",
                          "required": false,
                          "variableName": "orderByOptionGetManyTasks",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "None",
                              "value": "None",
                            },
                            {
                              "option": "ID",
                              "value": "id"
                            },
                            {
                              "option": "Created",
                              "value": "created"
                            },
                            {
                              "option": "Updated",
                              "value": "updated"
                            },
                            {
                              "option": "Due Date",
                              "value": "due_date"
                            },
                          ],
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Date Created Greater Than",
                    "variableName": "dateCreatedGtGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Date Created Greater Than",
                          "variableName": "dateCreatedGtOptionGetManyTasks",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Date Created Less Than",
                    "variableName": "dateCreatedLtGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Date Created Less Than",
                          "variableName": "dateCreatedLtOptionGetManyTasks",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Date Updated Greater Than",
                    "variableName": "dateUpdatedGtGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Date Updated Greater Than",
                          "variableName": "dateUpdatedGtOptionGetManyTasks",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Date Updated Less Than",
                    "variableName": "dateUpdatedLtGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Date Updated Less Than",
                          "variableName": "dateUpdatedLtOptionGetManyTasks",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Due Date Greater Than",
                    "variableName": "dueDateGtGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Due Date Greater Than",
                          "variableName": "dueDateGtOptionGetManyTasks",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Due Date Less Than",
                    "variableName": "dueDateLtGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Due Date Less Than",
                          "variableName": "dueDateLtOptionGetManyTasks",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Assignee IDs",
                    "variableName": "assigneeIDsGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "multiselect": true,
                          "placeholder": "Please Choose",
                          "label": "Assignee IDs",
                          "variableName": "assigneeIDsOptionGetManyTasks",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getTeamMembers"
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
                                  "key": "team_id",
                                  "dependOn": "teamIDGetManyTasks",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.members",
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
                              "name": "teamIDGetManyTasks",
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
                    "accTitle": "Statuses",
                    "variableName": "statusesGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "multiselect": true,
                          "placeholder": "Please Choose",
                          "label": "Statuses",
                          "variableName": "statusesOptionGetManyTasks",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getListStatuses"
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
                                  "key": "list_id",
                                  "dependOn": "listIDGetManyTasks",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.statuses",
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
                              "name": "listIDGetManyTasks",
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
                    "accTitle": "Tag Names",
                    "variableName": "tagIDsGetManyTasks",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "multiselect": true,
                          "placeholder": "Please Choose",
                          "label": "Tag Names",
                          "variableName": "tagIDsOptionGetManyTasks",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getTags"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDGetManyTasks",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.tags",
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
                              "name": "spaceIDGetManyTasks",
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
                ],
                "Get Task": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Task ID",
                    "placeholder": "Task ID",
                    "variableName": "taskIDGetTask",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                ],
                "Get Task Members": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Task ID",
                    "placeholder": "Task ID",
                    "variableName": "taskIDGetTaskMembers",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                ],
                "Create Task": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDCreateTask",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "hasDynamicVariable": true,
                    "label": "Space ID",
                    "variableName": "spaceIDCreateTask",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getSpaces"
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
                            "key": "team_id",
                            "dependOn": "teamIDCreateTask",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.spaces",
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
                        "name": "teamIDCreateTask",
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
                    "label": "List Type",
                    "value": "Foldered",
                    "required": true,
                    "variableName": "listTypeCreateTask",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Foldered List",
                        "value": "Foldered",
                      },
                      {
                        "option": "Folderless List",
                        "value": "Folderless",
                      },
                    ],
                    "options": {
                      "Foldered": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "Folder ID",
                          "variableName": "folderIDCreateTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolders"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDCreateTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.folders",
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
                              "name": "spaceIDCreateTask",
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
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "listIDCreateTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getLists"
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
                                  "key": "folder_id",
                                  "dependOn": "folderIDCreateTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "folderIDCreateTask",
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
                      ],
                      "Folderless": [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "List ID",
                          "variableName": "listIDCreateTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getFolderlessLists"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDCreateTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.lists",
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
                              "name": "spaceIDCreateTask",
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
                      ],
                    },
                  },
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Name",
                    "placeholder": "Name",
                    "variableName": "nameCreateTask",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Custom Field",
                    "variableName": "customFieldsCreateTask",
                    "required": false,
                    "structure": [
                      {
                        "type": "row",
                        "title": "Custom Field",
                        "variableName": "customFieldsCreateTask",
                        "removeButton": true
                      },
                      {
                        "type": "api",
                        "hasDynamicVariable": true,
                        "label": "Field ID",
                        "variableName": "fieldIDCreateTask",
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
                                "value": process.env.REACT_APP_DNS_URL + "clickup/getAccessibleCustomFields"
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
                                "key": "list_id",
                                "dependOn": "listIDCreateTask",
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
                            "name": "listIDCreateTask",
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
                        "label": "Value Type",
                        "value": "String",
                        "required": true,
                        "variableName": "valueTypeCreateTask",
                        "hasDynamicVariable": true,
                        "list": [
                          {
                            "option": "String",
                            "value": "String",
                          },
                          {
                            "option": "Integer",
                            "value": "Integer",
                          },
                        ],
                        "options": {
                          "String": [
                            {
                              "type": "textfield",
                              "value": "",
                              "label": "Value",
                              "placeholder": "Value",
                              "variableName": "valueCreateTask",
                              "required": false,
                              "hasDynamicVariable": true,
                            },
                          ],
                          "Integer": [
                            {
                              "type": "textfield",
                              "value": "",
                              "label": "Value",
                              "placeholder": "Value",
                              "variableName": "valueCreateTask",
                              "required": false,
                              "rightSideInput": true,
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "integer",
                            }
                          ],
                        },
                      },
                    ]
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "descriptionCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Description",
                          "variableName": "descriptionOptionCreateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Due Date",
                    "variableName": "dueDateCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Due Date",
                          "variableName": "dueDateOptionCreateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Due Date Time",
                    "variableName": "dueDateTimeCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "dueDateTimeOptionCreateTask",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Notify All",
                    "variableName": "notifyAllCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "notifyAllOptionCreateTask",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Parent ID",
                    "variableName": "parentIDCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent ID",
                          "variableName": "parentIDOptionCreateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Priority",
                    "variableName": "priorityCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Priority",
                          "variableName": "priorityOptionCreateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Start Date",
                    "variableName": "startDateCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Start Date",
                          "variableName": "startDateOptionCreateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Start Date Time",
                    "variableName": "startDateTimeCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "startDateTimeOptionCreateTask",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Time Estimate",
                    "variableName": "timeEstimateCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Time Estimate",
                          "variableName": "timeEstimateOptionCreateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Assignee IDs",
                    "variableName": "assigneeIDsCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "multiselect": true,
                          "placeholder": "Please Choose",
                          "label": "Assignee IDs",
                          "variableName": "assigneeIDsOptionCreateTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getTeamMembers"
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
                                  "key": "team_id",
                                  "dependOn": "teamIDCreateTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.members",
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
                              "name": "teamIDCreateTask",
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
                    "accTitle": "Status",
                    "variableName": "statusCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "label": "Status",
                          "variableName": "statusOptionCreateTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getListStatuses"
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
                                  "key": "list_id",
                                  "dependOn": "listIDCreateTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.statuses",
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
                              "name": "listIDCreateTask",
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
                    "accTitle": "Tag Names",
                    "variableName": "tagIDsCreateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "api",
                          "hasDynamicVariable": true,
                          "multiselect": true,
                          "placeholder": "Please Choose",
                          "label": "Tag Names",
                          "variableName": "tagIDsOptionCreateTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "clickup/getTags"
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
                                  "key": "space_id",
                                  "dependOn": "spaceIDCreateTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.tags",
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
                              "name": "spaceIDCreateTask",
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
                ],
                "Update Task": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Task ID",
                    "placeholder": "Task ID",
                    "variableName": "taskIDUpdateTask",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Add Assignee",
                    "variableName": "addAssigneesIDUpdateTask",
                    "required": false,
                    "structure": [
                      {
                        "type": "row",
                        "title": "Assignee",
                        "variableName": "addAssigneesIDUpdateTask",
                        "removeButton": true,
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "placeholder": "Assignee ID",
                        "variableName": "addedAssigneeIDUpdateTask",
                        "required": false,
                        "hasDynamicVariable": true,
                        "numberField": true,
                        "typeOfValue": "integer",
                      },
                    ],
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Remove Assignee",
                    "variableName": "removeAssigneesIDUpdateTask",
                    "required": false,
                    "structure": [
                      {
                        "type": "row",
                        "title": "Assignee",
                        "variableName": "removeAssigneesIDUpdateTask",
                        "removeButton": true,
                      },
                      {
                        "type": "textfield",
                        "value": "",
                        "placeholder": "Assignee ID",
                        "variableName": "removedAssigneeIDUpdateTask",
                        "required": false,
                        "hasDynamicVariable": true,
                        "numberField": true,
                        "typeOfValue": "integer",
                      },
                    ],
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Name",
                    "variableName": "nameUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Name",
                          "variableName": "nameOptionUpdateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "descriptionUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Description",
                          "variableName": "descriptionOptionUpdateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Due Date",
                    "variableName": "dueDateUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Due Date",
                          "variableName": "dueDateOptionUpdateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Due Date Time",
                    "variableName": "dueDateTimeUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "dueDateTimeOptionUpdateTask",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Notify All",
                    "variableName": "notifyAllUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "notifyAllOptionUpdateTask",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Parent ID",
                    "variableName": "parentIDUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Parent ID",
                          "variableName": "parentIDOptionUpdateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Priority",
                    "variableName": "priorityUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Priority",
                          "variableName": "priorityOptionUpdateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Status",
                    "variableName": "statusUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Status",
                          "variableName": "statusOptionUpdateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Start Date",
                    "variableName": "startDateUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Start Date",
                          "variableName": "startDateOptionUpdateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Start Date Time",
                    "variableName": "startDateTimeUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "startDateTimeOptionUpdateTask",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Time Estimate",
                    "variableName": "timeEstimateUpdateTask",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Time Estimate",
                          "variableName": "timeEstimateOptionUpdateTask",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be in milliseconds like '8640000'",
                        }
                      ]
                    ]
                  },
                ],
                "Delete Task": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Task ID",
                    "placeholder": "Task ID",
                    "variableName": "taskIDDelete",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                ],
              }
            }
          ],
          "Task Dependency": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Create Task Dependency",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Create",
                  "value": "Create Task Dependency"
                },
                {
                  "option": "Delete",
                  "value": "Delete Task Dependency"
                },
              ],
              "options": {
                "Create Task Dependency": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Task ID",
                    "placeholder": "Task ID",
                    "variableName": "taskIDCreateTaskDependency",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "type": "dropdown",
                    "label": "Dependency Type",
                    "value": "Depends On",
                    "required": true,
                    "variableName": "dependencyTypeCreateTaskDependency",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Depends On",
                        "value": "Depends On",
                      },
                      {
                        "option": "Dependency Of",
                        "value": "Dependency Of",
                      },
                    ],
                    "options": {
                      "Depends On": [
                        {
                          "type": "textfield",
                          "value": "",
                          "label": "Task ID",
                          "placeholder": "Task ID",
                          "variableName": "taskIDDependsOnCreateTaskDependency",
                          "hasDynamicVariable": true,
                          "required": true,
                        },
                      ],
                      "Dependency Of": [
                        {
                          "type": "textfield",
                          "value": "",
                          "label": "Task ID",
                          "placeholder": "Task ID",
                          "variableName": "taskIDDependencyOfCreateTaskDependency",
                          "hasDynamicVariable": true,
                          "required": true,
                        },
                      ],
                    },
                  },
                ],
                "Delete Task Dependency": [
                  {
                    "type": "textfield",
                    "value": "",
                    "label": "Task ID",
                    "placeholder": "Task ID",
                    "variableName": "taskIDDeleteTaskDependency",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "type": "dropdown",
                    "label": "Dependency Type",
                    "value": "Depends On",
                    "required": true,
                    "variableName": "dependencyTypeDeleteTaskDependency",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "Depends On",
                        "value": "Depends On",
                      },
                      {
                        "option": "Dependency Of",
                        "value": "Dependency Of",
                      },
                    ],
                    "options": {
                      "Depends On": [
                        {
                          "type": "textfield",
                          "value": "",
                          "label": "Task ID",
                          "placeholder": "Task ID",
                          "variableName": "taskIDDependsOnDeleteTaskDependency",
                          "hasDynamicVariable": true,
                          "required": true,
                        },
                      ],
                      "Dependency Of": [
                        {
                          "type": "textfield",
                          "value": "",
                          "label": "Task ID",
                          "placeholder": "Task ID",
                          "variableName": "taskIDDependencyOfDeleteTaskDependency",
                          "hasDynamicVariable": true,
                          "required": true,
                        },
                      ],
                    },
                  },
                ],
              }
            }
          ],
          "Time Entry": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many Time Entries",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many Time Entries"
                },
                {
                  "option": "Get",
                  "value": "Get Time Entry"
                },
                {
                  "option": "Delete",
                  "value": "Delete Time Entry"
                },
                {
                  "option": "Start",
                  "value": "Start Time Entry"
                },
                {
                  "option": "Stop",
                  "value": "Stop Time Entry"
                },
              ],
              "options": {
                "Get Many Time Entries": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDGetManyTimeEntries",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Start Date",
                    "variableName": "startDateGetManyTimeEntries",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Start Date",
                          "variableName": "startDateOptionGetManyTimeEntries",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "End Date",
                    "variableName": "endDateGetManyTimeEntries",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "End Date",
                          "variableName": "endDateOptionGetManyTimeEntries",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Value should be Unix Timestamp in milliseconds like '1723365709000'",
                        }
                      ]
                    ]
                  },
                ],
                "Get Time Entry": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDGetTimeEntry",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "label": "Time Entry ID",
                    "placeholder": "Time Entry ID",
                    "variableName": "timeEntryIDGetTimeEntry",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                ],
                "Delete Time Entry": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDDeleteTimeEntry",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "label": "Time Entry ID",
                    "placeholder": "Time Entry ID",
                    "variableName": "timeEntryIDDeleteTimeEntry",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                ],
                "Start Time Entry": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDStartTimeEntry",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                    "label": "Task ID",
                    "placeholder": "Task ID",
                    "variableName": "taskIDStartTimeEntry",
                    "hasDynamicVariable": true,
                    "required": true,
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Billable",
                    "variableName": "billableStartTimeEntry",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "billableOptionStartTimeEntry",
                          "rightSideInput": true,
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "descriptionStartTimeEntry",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Description",
                          "variableName": "descriptionOptionStartTimeEntry",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                ],
                "Stop Time Entry": [
                  {
                    "type": "api",
                    "hasDynamicVariable": true,
                    "label": "Team ID",
                    "variableName": "teamIDStopTimeEntry",
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
                            "value": process.env.REACT_APP_DNS_URL + "clickup/getTeams"
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
                      "path": "data.teams",
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
                ],
              }
            }
          ],
        }
      },
    ]
  }
};