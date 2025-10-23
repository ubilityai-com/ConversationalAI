export const LinearJson = {
  "category": "integration",
  "type": "Linear",
  "label": "Linear",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Linear/getting_started",
  "description": "Linear integration",
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
        "credType": "Linear",
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
        label: "Type",
        value: "Issue",
        variableName: "type",
        errorSpan: "Please choose a Type",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Issue",
            value: "Issue",
          },
          {
            option: "Comment",
            value: "Comment",
          },
        ],
        options: {
          Issue: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Issues",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Issues",
                },
                {
                  option: "Create",
                  value: "Create Issues",
                },
                {
                  option: "Add Link",
                  value: "Add Link Issues",
                },
                {
                  option: "Delete",
                  value: "Delete Issues",
                },
                {
                  option: "Get Many",
                  value: "Get All Issues",
                },
                {
                  option: "Update",
                  value: "Update Issues",
                },
              ],
              options: {
                "Get Issues": [
                  {
                    type: "textfield",
                    label: "Issue ID",
                    required: true,
                    variableName: "IssueID_GetIssue",
                    value: "",
                    placeholder: "Issue ID",
                    hasDynamicVariable: true,
                  },
                ],
                "Get All Issues": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Limit",
                    variableName: "Limit_getallIssue",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "50",
                          placeholder: "Limit",
                          variableName: "Limit_getallIssue",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Issues": [
                  {
                    type: "textfield",
                    label: "Issue ID",
                    required: true,
                    variableName: "IssueID_DeleteIssue",
                    value: "",
                    placeholder: "Issue ID",
                    hasDynamicVariable: true,
                  },
                ],
                "Create Issues": [
                  {
                    type: "textfield",
                    label: "Team Name or ID",
                    required: true,
                    variableName: "TeamNameorID_CreateIssue",
                    value: "",
                    placeholder: "Team Name or ID",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Title",
                    required: true,
                    variableName: "Title_CreateIssue",
                    value: "",
                    placeholder: "Title",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Assignee Name or ID",
                    variableName: "AssigneeNameorID_CreateIssue",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Assignee Name or ID",
                          variableName: "AssigneeNameorID_CreateIssue",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "Description_CreateIssue",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "Description_CreateIssue",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "State Name or ID",
                    variableName: "StateNameorID_CreateIssue",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "State Name or ID",
                          variableName: "StateNameorID_CreateIssue",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Update Issues": [
                  {
                    type: "textfield",
                    label: "Issue ID",
                    required: true,
                    variableName: "IssueID_UpdateIssue",
                    value: "",
                    placeholder: "Issue ID",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Team Name or ID",
                    variableName: "TeamNameorID_UpdateIssue",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          variableName: "TeamNameorID_UpdateIssue",
                          value: "",
                          placeholder: "Team Name or ID",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Title",
                    variableName: "Title_UpdateIssue",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          variableName: "Title_UpdateIssue",
                          value: "",
                          placeholder: "Title",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assignee Name or ID",
                    variableName: "AssigneeNameorID_UpdateIssue",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Assignee Name or ID",
                          variableName: "AssigneeNameorID_UpdateIssue",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "Description_UpdateIssue",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "Description_UpdateIssue",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "State Name or ID",
                    variableName: "StateNameorID_UpdateIssue",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "State Name or ID",
                          variableName: "StateNameorID_UpdateIssue",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Add Link Issues": [
                  {
                    type: "textfield",
                    label: "Issue ID",
                    required: true,
                    variableName: "IssueID_addlink",
                    value: "",
                    placeholder: "Issue ID",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Title",
                    required: true,
                    variableName: "Title_addlink",
                    value: "",
                    placeholder: "Title",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Url",
                    required: true,
                    variableName: "Url_addlink",
                    value: "",
                    placeholder: "Url",
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
          Comment: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Add Comment Issues",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Add Comment",
                  value: "Add Comment Issues",
                },
              ],
              options: {
                "Add Comment Issues": [
                  {
                    type: "textfield",
                    label: "Issue ID",
                    required: true,
                    variableName: "IssueID_AddCommentIssues",
                    value: "",
                    placeholder: "Issue ID",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Body",
                    required: true,
                    variableName: "Body_AddCommentIssues",
                    value: "",
                    placeholder: "Body",
                    hasDynamicVariable: true,
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