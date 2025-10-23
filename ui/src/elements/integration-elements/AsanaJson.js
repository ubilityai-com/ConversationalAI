export const AsanaJson = {
  "category": "integration",
  "type": "Asana",
  "label": "Asana",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Asana/getting_started",
  "description": "Asana integration",
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
        "credType": "Asana",
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
        label: "Resource",
        value: "Project",
        variableName: "type",
        errorSpan: "Please choose a resource",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Project",
            value: "Project",
          },
          {
            option: "Task",
            value: "Task",
          },
          {
            option: "Subtask",
            value: "Subtask",
          },
          {
            option: "User",
            value: "User",
          },
          {
            option: "Task Comment",
            value: "Task Comment",
          },
          {
            option: "Task Project",
            value: "Task Project",
          },
        ],
        options: {
          Project: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Project",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Project",
                },
                {
                  option: "Get Many",
                  value: "Get Many Project",
                },
                {
                  option: "Create",
                  value: "Create Project",
                },
                {
                  option: "Create Project Template",
                  value: "Create Project Template",
                },
                {
                  option: "Update",
                  value: "Update Project",
                },
                {
                  option: "Delete",
                  value: "Delete Project",
                },
              ],
              options: {
                "Get Project": [
                  {
                    type: "textfield",
                    label: "Project ID",
                    required: true,
                    variableName: "project_gid_GetProject",
                    value: "",
                    placeholder: "Project ID",
                    hasDynamicVariable: true,
                  },
                ],
                "Get Many Project": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_GetManyProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    accTitle: "Archived",
                    variableName: "archived_GetManyProject",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "archived_GetManyProject",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Teams",
                    variableName: "team_GetManyProject",
                    fieldsArray: [
                      [
                        {
                          "type": "api",
                          "variableName": "team_GetManyProject",
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
                                  "value": process.env.REACT_APP_DNS_URL + "asana/getTeams"
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
                                  "key": "workspace",
                                  "dependOn": "workspace_GetManyProject",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.teams",
                            "keys": {
                              "option": {
                                "fields": ["name"],
                              },
                              "value": {
                                "fields": ["gid"],
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
                              "name": "workspace_GetManyProject",
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
                    ],
                  },
                ],
                "Create Project": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateProject",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_CreateProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    "label": "Team GID",
                    "variableName": "team_CreateProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getTeams"
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
                            "key": "workspace",
                            "dependOn": "workspace_CreateProject",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.teams",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                        "name": "workspace_CreateProject",
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
                    accTitle: "Color",
                    variableName: "color_CreateProject",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "color_CreateProject",
                          errorSpan: "Please choose a color",
                          required: true,
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "dark-blue",
                              value: "dark-blue",
                            },
                            {
                              option: "dark-brown",
                              value: "dark-brown",
                            },
                            {
                              option: "dark-green",
                              value: "dark-green",
                            },
                            {
                              option: "dark-orange",
                              value: "dark-orange",
                            },
                            {
                              option: "dark-pink",
                              value: "dark-pink",
                            },
                            {
                              option: "dark-purple",
                              value: "dark-purple",
                            },
                            {
                              option: "dark-red",
                              value: "dark-red",
                            },
                            {
                              option: "dark-teal",
                              value: "dark-teal",
                            },
                            {
                              option: "dark-warm-gray",
                              value: "dark-warm-gray",
                            },
                            {
                              option: "light-blue",
                              value: "light-blue",
                            },
                            {
                              option: "light-green",
                              value: "light-green",
                            },
                            {
                              option: "light-orange",
                              value: "light-orange",
                            },
                            {
                              option: "light-pink",
                              value: "light-pink",
                            },
                            {
                              option: "light-purple",
                              value: "light-purple",
                            },
                            {
                              option: "light-red",
                              value: "light-red",
                            },
                            {
                              option: "light-teal",
                              value: "light-teal",
                            },
                            {
                              option: "light-warm-gray",
                              value: "light-warm-gray",
                            },
                            {
                              option: "light-yellow",
                              value: "light-yellow",
                            },
                            {
                              option: "none",
                              value: "none",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Due On",
                    variableName: "due_on_CreateProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          value: "",
                          placeholder: "Due On",
                          variableName: "due_on_CreateProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "The day on which this project is due. This takes a date with format YYYY-MM-DD.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Project description",
                    variableName: "notes_CreateProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Project description",
                          variableName: "notes_CreateProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Create Project Template": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_CreateProjectTemplate",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    "label": "Project Template GID",
                    "variableName": "project_template_gid_CreateProjectTemplate",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getProjectTemplates"
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
                            "key": "workspace",
                            "dependOn": "workspace_CreateProjectTemplate",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.templates",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                        "name": "workspace_CreateProjectTemplate",
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
                    label: "Name",
                    required: true,
                    variableName: "name_CreateProjectTemplate",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Public",
                    variableName: "public_CreateProjectTemplate",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "public_CreateProjectTemplate",
                        },
                      ],
                    ],
                  },
                ],
                "Update Project": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_UpdateProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    type: "textfield",
                    label: "Project ID",
                    required: true,
                    variableName: "project_gid_UpdateProject",
                    value: "",
                    placeholder: "Project ID",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Update Fields",
                    type: "accordion",
                    accTitle: "Color",
                    variableName: "color_UpdateProject",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "color_UpdateProject",
                          errorSpan: "Please choose a color",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "dark-blue",
                              value: "dark-blue",
                            },
                            {
                              option: "dark-brown",
                              value: "dark-brown",
                            },
                            {
                              option: "dark-green",
                              value: "dark-green",
                            },
                            {
                              option: "dark-orange",
                              value: "dark-orange",
                            },
                            {
                              option: "dark-pink",
                              value: "dark-pink",
                            },
                            {
                              option: "dark-purple",
                              value: "dark-purple",
                            },
                            {
                              option: "dark-red",
                              value: "dark-red",
                            },
                            {
                              option: "dark-teal",
                              value: "dark-teal",
                            },
                            {
                              option: "dark-warm-gray",
                              value: "dark-warm-gray",
                            },
                            {
                              option: "light-blue",
                              value: "light-blue",
                            },
                            {
                              option: "light-green",
                              value: "light-green",
                            },
                            {
                              option: "light-orange",
                              value: "light-orange",
                            },
                            {
                              option: "light-pink",
                              value: "light-pink",
                            },
                            {
                              option: "light-purple",
                              value: "light-purple",
                            },
                            {
                              option: "light-red",
                              value: "light-red",
                            },
                            {
                              option: "light-teal",
                              value: "light-teal",
                            },
                            {
                              option: "light-warm-gray",
                              value: "light-warm-gray",
                            },
                            {
                              option: "light-yellow",
                              value: "light-yellow",
                            },
                            {
                              option: "none",
                              value: "none",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_UpdateProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_UpdateProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner",
                    variableName: "owner_UpdateProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner",
                          variableName: "owner_UpdateProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Due On",
                    variableName: "due_on_UpdateProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          value: "",
                          placeholder: "Due On",
                          variableName: "due_on_UpdateProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "The day on which this project is due. This takes a date with format YYYY-MM-DD.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Notes",
                    variableName: "notes_UpdateProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Notes",
                          variableName: "notes_UpdateProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Team",
                    variableName: "team_UpdateProject",
                    fieldsArray: [
                      [
                        {
                          "type": "api",
                          "variableName": "team_UpdateProject",
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
                                  "value": process.env.REACT_APP_DNS_URL + "asana/getTeams"
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
                                  "key": "workspace",
                                  "dependOn": "workspace_UpdateProject",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.teams",
                            "keys": {
                              "option": {
                                "fields": ["name"],
                              },
                              "value": {
                                "fields": ["gid"],
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
                              "name": "workspace_UpdateProject",
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
                    ],
                  },
                ],
                "Delete Project": [
                  {
                    type: "textfield",
                    label: "Project ID",
                    required: true,
                    variableName: "project_gid_DeleteProject",
                    value: "",
                    placeholder: "Project ID",
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
          Task: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Task",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Task",
                },
                {
                  option: "Get Many",
                  value: "Get Many Task",
                },
                {
                  option: "Create",
                  value: "Create Task",
                },
                {
                  option: "Update",
                  value: "Update Task",
                },
                {
                  option: "Delete",
                  value: "Delete Task",
                },
                {
                  option: "Search",
                  value: "Search Task",
                },
                {
                  option: "Move",
                  value: "Move Task To Section",
                },
                {
                  option: "Duplicate Task",
                  value: "Duplicate Task",
                },
                {
                  option: "Upload File",
                  value: "Upload File",
                },
              ],
              options: {
                "Get Task": [
                  {
                    type: "textfield",
                    label: "Task ID",
                    required: true,
                    variableName: "task_gid_GetTask",
                    value: "",
                    placeholder: "Task ID",
                    hasDynamicVariable: true,
                  },
                ],
                "Get Many Task": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_GetManyTask",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    type: "dropdown",
                    label: "Filter By",
                    value: "assignee",
                    variableName: "Filter_type",
                    errorSpan: "Please choose an Filter",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "assignee",
                        value: "assignee",
                      },
                      {
                        option: "project",
                        value: "project",
                      },
                      {
                        option: "section",
                        value: "section",
                      },
                    ],
                    options: {
                      assignee: [
                        {
                          "type": "api",
                          "label": "Assignee GID",
                          "variableName": "assignee_GetManyTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "asana/getUsers"
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
                                  "key": "workspace",
                                  "dependOn": "workspace_GetManyTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.users",
                            "keys": {
                              "option": {
                                "fields": ["name"],
                              },
                              "value": {
                                "fields": ["gid"],
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
                              "name": "workspace_GetManyTask",
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
                      project: [
                        {
                          "type": "api",
                          "label": "Project GID",
                          "variableName": "project_GetManyTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "asana/getProjects"
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
                                  "key": "workspace",
                                  "dependOn": "workspace_GetManyTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.projects",
                            "keys": {
                              "option": {
                                "fields": ["name"],
                              },
                              "value": {
                                "fields": ["gid"],
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
                              "name": "workspace_GetManyTask",
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
                      section: [
                        {
                          "type": "api",
                          "label": "Project GID",
                          "variableName": "project_GetManyTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "asana/getProjects"
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
                                  "key": "workspace",
                                  "dependOn": "workspace_GetManyTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.projects",
                            "keys": {
                              "option": {
                                "fields": ["name"],
                              },
                              "value": {
                                "fields": ["gid"],
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
                              "name": "workspace_GetManyTask",
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
                          "label": "Section GID",
                          "variableName": "section_GetManyTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "asana/getSections"
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
                                  "key": "project_gid",
                                  "dependOn": "project_GetManyTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.sections",
                            "keys": {
                              "option": {
                                "fields": ["name"],
                              },
                              "value": {
                                "fields": ["gid"],
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
                              "name": "project_GetManyTask",
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
                    },
                  },
                  {
                    title: "More Filters",
                    type: "accordion",
                    accTitle: "Completed Since",
                    variableName: "completed_since_GetManyTask",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          datetimeLocal: true,
                          value: "",
                          placeholder: "Completed Since",
                          variableName: "completed_since_GetManyTask",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Modified Since",
                    variableName: "modified_since_GetManyTask",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          datetimeLocal: true,
                          value: "",
                          placeholder: "Modified Since",
                          variableName: "modified_since_GetManyTask",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Create Task": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_CreateTask",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateTask",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Assignee",
                    variableName: "assignee_CreateTask",
                    fieldsArray: [
                      [
                        {
                          "type": "api",
                          "variableName": "assignee_CreateTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "asana/getUsers"
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
                                  "key": "workspace",
                                  "dependOn": "workspace_CreateTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.users",
                            "keys": {
                              "option": {
                                "fields": ["name"],
                              },
                              "value": {
                                "fields": ["gid"],
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
                              "name": "workspace_CreateTask",
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
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assignee Status",
                    variableName: "assignee_status_CreateTask",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "upcoming",
                          variableName: "assignee_status_CreateTask",
                          errorSpan: "Please choose a assignee status",
                          required: true,
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Inbox",
                              value: "inbox",
                            },
                            {
                              option: "Today",
                              value: "today",
                            },
                            {
                              option: "Upcoming",
                              value: "upcoming",
                            },
                            {
                              option: "Later",
                              value: "later",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Completed",
                    variableName: "completed_CreateTask",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "completed_CreateTask",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Due On",
                    variableName: "due_on_CreateTask",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          value: "",
                          placeholder: "Due On",
                          variableName: "due_on_CreateTask",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Liked",
                    variableName: "liked_CreateTask",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "liked_CreateTask",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "notes_CreateTask",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "notes_CreateTask",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Project",
                    variableName: "projects_CreateTask",
                    required: false,
                    structure: [
                      {
                        type: "row",
                        title: "Project",
                        variableName: "project",
                        removeButton: true,
                      },
                      {
                        "type": "api",
                        "variableName": "project_CreateTask",
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
                                "value": process.env.REACT_APP_DNS_URL + "asana/getProjects"
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
                                "key": "workspace",
                                "dependOn": "workspace_CreateTask",
                                "isAutomation": true,
                              },
                            ]
                          }
                        ],
                        "res": {
                          "path": "data.projects",
                          "keys": {
                            "option": {
                              "fields": ["name"],
                            },
                            "value": {
                              "fields": ["gid"],
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
                            "name": "workspace_CreateTask",
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
                  },
                ],
                "Update Task": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_UpdateTask",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    type: "textfield",
                    label: "Task ID",
                    required: true,
                    variableName: "task_gid_UpdateTask",
                    value: "",
                    placeholder: "Task Id",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_UpdateTask",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_UpdateTask",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assignee",
                    variableName: "assignee_UpdateTask",
                    fieldsArray: [
                      [
                        {
                          "type": "api",
                          "variableName": "assignee_UpdateTask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "asana/getUsers"
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
                                  "key": "workspace",
                                  "dependOn": "workspace_UpdateTask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.users",
                            "keys": {
                              "option": {
                                "fields": ["name"],
                              },
                              "value": {
                                "fields": ["gid"],
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
                              "name": "workspace_UpdateTask",
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
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assignee Status",
                    variableName: "assignee_status_UpdateTask",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "inbox",
                          variableName: "assignee_status_UpdateTask",
                          errorSpan: "Please choose a assignee status",
                          required: true,
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Inbox",
                              value: "inbox",
                            },
                            {
                              option: "Today",
                              value: "today",
                            },
                            {
                              option: "Upcoming",
                              value: "upcoming",
                            },
                            {
                              option: "Later",
                              value: "later",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Completed",
                    variableName: "completed_UpdateTask",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "completed_UpdateTask",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Due On",
                    variableName: "due_on_UpdateTask",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          value: "",
                          placeholder: "Due On",
                          variableName: "due_on_UpdateTask",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Liked",
                    variableName: "liked_UpdateTask",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "liked_UpdateTask",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "notes_UpdateTask",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "notes_UpdateTask",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Task": [
                  {
                    type: "textfield",
                    label: "Task ID",
                    required: true,
                    variableName: "task_gid_DeleteTask",
                    value: "",
                    placeholder: "Task ID",
                    hasDynamicVariable: true,
                  },
                ],
                "Search Task": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_gid_SearchTask",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    title: "Filters",
                    type: "accordion",
                    accTitle: "Text",
                    variableName: "text_SearchTask",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Text",
                          variableName: "text_SearchTask",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Performs full-text search on both task name and description",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Completed",
                    variableName: "completed_SearchTask",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "completed_SearchTask",
                        },
                      ],
                    ],
                  },
                ],
                "Move Task To Section": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_MoveTask",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    type: "textfield",
                    label: "Task ID",
                    required: true,
                    variableName: "task_MoveTask",
                    value: "",
                    placeholder: "Task ID",
                    hasDynamicVariable: true,
                    helperSpan: "The task to move to this section",
                  },
                  {
                    "type": "api",
                    "label": "Project GID",
                    "variableName": "project_MoveTask",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getProjects"
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
                            "key": "workspace",
                            "dependOn": "workspace_MoveTask",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.projects",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                        "name": "workspace_MoveTask",
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
                    "label": "Section GID",
                    "variableName": "section_gid_MoveTask",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getSections"
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
                            "key": "project_gid",
                            "dependOn": "project_MoveTask",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.sections",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                        "name": "project_MoveTask",
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
                "Duplicate Task": [
                  {
                    type: "textfield",
                    label: "Task ID",
                    required: true,
                    variableName: "task_gid_DuplicateTask",
                    value: "",
                    placeholder: "Task ID",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_DuplicateTask",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                    helperSpan: "The name of the new task",
                  },
                  {
                    title: "Optional",
                    type: "accordion",
                    accTitle: "Fields to Include",
                    variableName: "include_DuplicateTask",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "include_DuplicateTask",
                          value: [],
                          list: [
                            {
                              option: "assignee",
                              value: "assignee",
                            },
                            {
                              option: "attachments",
                              value: "attachments",
                            },
                            {
                              option: "dates",
                              value: "dates",
                            },
                            {
                              option: "dependencies",
                              value: "dependencies",
                            },
                            {
                              option: "followers",
                              value: "followers",
                            },
                            {
                              option: "notes",
                              value: "notes",
                            },
                            {
                              option: "parent",
                              value: "parent",
                            },
                            {
                              option: "projects",
                              value: "projects",
                            },
                            {
                              option: "subtasks",
                              value: "subtasks",
                            },
                            {
                              option: "tags",
                              value: "tags",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Upload File": [
                  {
                    type: "textfield",
                    label: "Task ID",
                    required: true,
                    variableName: "parent_UploadFile",
                    value: "",
                    placeholder: "Task ID",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "File Name",
                    required: true,
                    variableName: "name_UploadFile",
                    value: "",
                    placeholder: "file.txt",
                    hasDynamicVariable: true,
                    helperSpan:
                      "Please don't input special characters and make sure to input the extension at the end e.g(.png,.txt,.csv)",
                  },
                  {
                    type: "textfield",
                    label: "Url",
                    required: true,
                    variableName: "url_UploadFile",
                    value: "",
                    placeholder: "Url",
                    hasDynamicVariable: true,
                    helperSpan:
                      "The URL of the external resource being attached.",
                  },
                ],
              },
            },
          ],
          Subtask: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Create Subtask",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Create",
                  value: "Create Subtask",
                },
                {
                  option: "Get Many",
                  value: "Get Many Subtask",
                },
              ],
              options: {
                "Create Subtask": [
                  {
                    type: "textfield",
                    label: "Parent Task ID",
                    required: true,
                    variableName: "task_gid_CreateSubtask",
                    value: "",
                    placeholder: "Parent Task ID",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateSubtask",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                    helperSpan: "Name of the task.",
                  },
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_CreateSubtask",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    accTitle: "Assignee",
                    variableName: "assignee_CreateSubtask",
                    fieldsArray: [
                      [
                        {
                          "type": "api",
                          "variableName": "assignee_CreateSubtask",
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
                                  "value": process.env.REACT_APP_DNS_URL + "asana/getUsers"
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
                                  "key": "workspace",
                                  "dependOn": "workspace_CreateSubtask",
                                  "isAutomation": true,
                                },
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.users",
                            "keys": {
                              "option": {
                                "fields": ["name"],
                              },
                              "value": {
                                "fields": ["gid"],
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
                              "name": "workspace_CreateSubtask",
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
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assignee Status",
                    variableName: "assignee_status_CreateSubtask",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "upcoming",
                          variableName: "assignee_status_CreateSubtask",
                          errorSpan: "Please choose a assignee status",
                          required: true,
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Inbox",
                              value: "inbox",
                            },
                            {
                              option: "Today",
                              value: "today",
                            },
                            {
                              option: "Upcoming",
                              value: "upcoming",
                            },
                            {
                              option: "Later",
                              value: "later",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Completed",
                    variableName: "completed_CreateSubtask",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "completed_CreateSubtask",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Due On",
                    variableName: "due_on_CreateSubtask",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          value: "",
                          placeholder: "Due On",
                          variableName: "due_on_CreateSubtask",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Liked",
                    variableName: "liked_CreateSubtask",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "liked_CreateSubtask",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "notes_CreateSubtask",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "notes_CreateSubtask",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Subtask": [
                  {
                    type: "textfield",
                    label: "Parent Task ID",
                    required: true,
                    variableName: "task_gid_GetManySubtask",
                    value: "",
                    placeholder: "Parent Task ID",
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
          User: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get User",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get User",
                },
                {
                  option: "Get Many",
                  value: "Get Many User",
                },
              ],
              options: {
                "Get User": [
                  {
                    type: "textfield",
                    label: "User ID",
                    required: true,
                    variableName: "user_gid_GetUser",
                    value: "",
                    placeholder: "User ID",
                    hasDynamicVariable: true,
                  },
                ],
                "Get Many User": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_gid_GetManyUser",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
              },
            },
          ],
          "Task Comment": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Add Task Comment",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Add",
                  value: "Add Task Comment",
                },
                {
                  option: "Remove",
                  value: "Remove Task Comment",
                },
              ],
              options: {
                "Add Task Comment": [
                  {
                    type: "textfield",
                    label: "Task ID",
                    required: true,
                    variableName: "task_gid_AddTaskComment",
                    value: "",
                    placeholder: "Task ID",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    label: "Text Format",
                    value: "text",
                    variableName: "Format_type",
                    errorSpan: "Please choose an Format",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Text",
                        value: "text",
                      },
                      {
                        option: "HTML Text",
                        value: "html_text",
                      },
                    ],
                    options: {
                      text: [
                        {
                          type: "textfield",
                          label: "Text",
                          required: true,
                          variableName: "text_AddTaskComment",
                          value: "",
                          placeholder: "Text",
                          hasDynamicVariable: true,
                          helperSpan: "The plain text of the comment to add.",
                        },
                      ],
                      html_text: [
                        {
                          type: "textfield",
                          label: "HTML Text",
                          required: true,
                          variableName: "html_text_AddTaskComment",
                          value: "",
                          placeholder: "HTML Text",
                          hasDynamicVariable: true,
                          helperSpan: "e.g <body>This is a comment.</body>",
                        },
                      ],
                    },
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Pinned",
                    variableName: "is_pinned_AddTaskComment",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "is_pinned_AddTaskComment",
                        },
                      ],
                    ],
                  },
                ],
                "Remove Task Comment": [
                  {
                    type: "textfield",
                    label: "Comment ID",
                    required: true,
                    variableName: "story_gid_RemoveTaskComment",
                    value: "",
                    placeholder: "Comment ID",
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
          "Task Project": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Add Project For Task",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Add",
                  value: "Add Project For Task",
                },
                {
                  option: "Remove",
                  value: "Remove Project For Task",
                },
                {
                  option: "Get Many",
                  value: "Get Tasks For Project",
                },
              ],
              options: {
                "Add Project For Task": [
                  {
                    type: "textfield",
                    label: "Task ID",
                    required: true,
                    variableName: "task_gid_AddTaskProject",
                    value: "",
                    placeholder: "Task ID",
                    hasDynamicVariable: true,
                    helperSpan: "The task to add to this project",
                  },
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_AddTaskProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    "label": "Project GID",
                    "variableName": "project_AddTaskProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getProjects"
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
                            "key": "workspace",
                            "dependOn": "workspace_AddTaskProject",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.projects",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                        "name": "workspace_AddTaskProject",
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
                    accTitle: "Insert After",
                    variableName: "insert_after_AddTaskProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Insert After",
                          variableName: "insert_after_AddTaskProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "A task in the project to insert the task after, or null to insert at the beginning of the list.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Insert Before",
                    variableName: "insert_before_AddTaskProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Insert Before",
                          variableName: "insert_before_AddTaskProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "A task in the project to insert the task before, or null to insert at the end of the list.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Section",
                    variableName: "section_AddTaskProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Section",
                          variableName: "section_AddTaskProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Remove Project For Task": [
                  {
                    type: "textfield",
                    label: "Task ID",
                    required: true,
                    variableName: "task_gid_RemoveTaskProject",
                    value: "",
                    placeholder: "Task ID",
                    hasDynamicVariable: true,
                    helperSpan: "The task to remove from this project",
                  },
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_RemoveTaskProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    "label": "Project GID",
                    "variableName": "project_RemoveTaskProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getProjects"
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
                            "key": "workspace",
                            "dependOn": "workspace_RemoveTaskProject",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.projects",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                        "name": "workspace_RemoveTaskProject",
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
                "Get Tasks For Project": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_GetTasks",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    "label": "Project GID",
                    "variableName": "project_gid_GetTasks",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getProjects"
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
                            "key": "workspace",
                            "dependOn": "workspace_GetTasks",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.projects",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                        "name": "workspace_GetTasks",
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
                    title: "Filters",
                    type: "accordion",
                    accTitle: "Completed Since",
                    variableName: "completed_since_GetTasks",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          datetimeLocal: true,
                          value: "",
                          placeholder: "Completed Since",
                          variableName: "completed_since_GetTasks",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          "Section Project": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Create Section Project",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Add",
                  value: "Create Section Project",
                },
                {
                  option: "Get Many",
                  value: "Get Section Project",
                },
              ],
              options: {
                "Create Section Project": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_CreateSectionProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    "label": "Project GID",
                    "variableName": "project_gid_CreateSectionProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getProjects"
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
                            "key": "workspace",
                            "dependOn": "workspace_CreateSectionProject",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.projects",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                        "name": "workspace_CreateSectionProject",
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
                    label: "Section Name",
                    required: true,
                    variableName: "name_CreateSectionProject",
                    value: "",
                    placeholder: "Section Name",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Insert After",
                    variableName: "insert_after_CreateSectionProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Insert After",
                          variableName: "insert_after_CreateSectionProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Cannot be provided together with Insert Before.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Insert Before",
                    variableName: "insert_before_CreateSectionProject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Insert Before",
                          variableName: "insert_before_CreateSectionProject",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Cannot be provided together with Insert After.",
                        },
                      ],
                    ],
                  },
                ],
                "Get Section Project": [
                  {
                    "type": "api",
                    "label": "Workspace GID",
                    "variableName": "workspace_GetSectionProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getWorkspaces"
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
                      "path": "data.workspaces",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                    "label": "Project GID",
                    "variableName": "project_gid_GetSectionProject",
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
                            "value": process.env.REACT_APP_DNS_URL + "asana/getProjects"
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
                            "key": "workspace",
                            "dependOn": "workspace_GetSectionProject",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.projects",
                      "keys": {
                        "option": {
                          "fields": ["name"],
                        },
                        "value": {
                          "fields": ["gid"],
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
                        "name": "workspace_GetSectionProject",
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
              },
            },
          ],
        },
      },
    ],
  }
};