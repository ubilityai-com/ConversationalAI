export const ZendeskJson = {
  category: "integration",
  type: "Zendesk",
  label: "Zendesk",
  color: "#53D2E2 ",
  docsPath: "Connectors/Zendesk/getting_started",
  description: "Zendesk integration",
  defaultValid: false,
  automated: "json",
  automationConfig: "automated",
  defaults: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Zendesk",
        value: "",
        list: [],
        config: [
          {
            key: "method",
            value: "get",
          },
          {
            key: "url",
            dependOn: [
              {
                type: "static",
                value: process.env.REACT_APP_DNS_URL + "credentials",
              },
            ],
          },
        ],
        res: {
          path: "data",
          keys: {
            option: {
              fields: ["name"],
            },
            value: {
              fields: ["name"],
            },
            type: {
              fields: ["type"],
            },
          },
        },
        apiDependsOn: [],
      },
      {
        type: "dropdown",
        label: "Type",
        value: "Ticket",
        variableName: "type",
        required: true,
        hasDynamicVariable: true,
        list: [
          {
            option: "Ticket",
            value: "Ticket",
          },
          {
            option: "User",
            value: "User",
          },
          {
            option: "Organization",
            value: "Organization",
          },
        ],
        options: {
          Ticket: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Ticket",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Ticket",
                },
                {
                  option: "Get All",
                  value: "Get All Tickets",
                },
                {
                  option: "Create",
                  value: "Create Ticket",
                },
                {
                  option: "Update",
                  value: "Update Ticket",
                },
                {
                  option: "Delete",
                  value: "Delete Ticket",
                },
                {
                  option: "Recover",
                  value: "Recover Ticket",
                },
              ],
              options: {
                "Get Ticket": [
                  {
                    type: "textfield",
                    label: "Ticket ID",
                    value: "",
                    variableName: "get_ticket_id",
                    required: true,
                    placeholder: "Ticket ID",
                    hasDynamicVariable: true,
                  },
                ],
                "Get All Tickets": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Status",
                    variableName: "get_all_tickets_status",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "get_all_tickets_status",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "Closed",
                              value: "closed",
                            },
                            {
                              option: "New",
                              value: "new",
                            },
                            {
                              option: "Pending",
                              value: "pending",
                            },
                            {
                              option: "Solved",
                              value: "solved",
                            },
                            {
                              option: "Open",
                              value: "open",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Sort Order",
                    variableName: "get_all_tickets_sort_order",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "asc",
                          variableName: "get_all_tickets_sort_order",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Ascending",
                              value: "asc",
                            },
                            {
                              option: "Descending",
                              value: "desc",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Sort By",
                    variableName: "get_all_tickets_sort_by",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "get_all_tickets_sort_by",
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "Priority",
                              value: "priority",
                            },
                            {
                              option: "Status",
                              value: "status",
                            },
                            {
                              option: "Created At",
                              value: "created_at",
                            },
                            {
                              option: "Updated At",
                              value: "updated_at",
                            },
                            {
                              option: "Ticket Type",
                              value: "ticket_type",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Group",
                    variableName: "get_all_tickets_group_id",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "get_all_tickets_group_id",
                          value: "",
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getGroups",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.groups",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["id"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Create Ticket": [
                  {
                    type: "textfield",
                    label: "Description",
                    value: "",
                    variableName: "create_ticket_description",
                    placeholder: "Description",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Additional Fields",
                    accTitle: "External ID",
                    variableName: "operation_create_ticket_external_id",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "External ID",
                          variableName: "operation_create_ticket_external_id",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Group",
                    variableName: "create_ticket_grp_id",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "create_ticket_grp_id",
                          value: "",
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getGroups",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.groups",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["id"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recipient",
                    variableName: "create_ticket_recipient",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "create_ticket_recipient",
                          placeholder: "sample@mail.com",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Requester",
                    variableName: "create_ticket_requester_id",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "create_ticket_requester_id",
                          value: "",
                          required: false,
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getUsers",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.users",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["id"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Status",
                    variableName: "create_ticket_status",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_ticket_status",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "Closed",
                              value: "closed",
                            },
                            {
                              option: "New",
                              value: "new",
                            },
                            {
                              option: "Pending",
                              value: "pending",
                            },
                            {
                              option: "Solved",
                              value: "solved",
                            },
                            {
                              option: "Open",
                              value: "open",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "create_ticket_priority",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_ticket_priority",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "Low",
                              value: "low",
                            },
                            {
                              option: "Normal",
                              value: "normal",
                            },
                            {
                              option: "High",
                              value: "high",
                            },
                            {
                              option: "Urgent",
                              value: "urgent",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Subject",
                    variableName: "create_ticket_subject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "subject",
                          variableName: "create_ticket_subject",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "create_ticket_type",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_ticket_type",
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "Question",
                              value: "question",
                            },
                            {
                              option: "Incident",
                              value: "incident",
                            },
                            {
                              option: "Task",
                              value: "task",
                            },
                            {
                              option: "Problem",
                              value: "problem",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tags",
                    variableName: "create_ticket_tags",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          multiselect: true,
                          placeholder: "Choose the tags",
                          variableName: "create_ticket_tags",
                          rightSideInput: true,
                          value: [],
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getTags",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.tags",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["name"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                          
                        },
                      ],
                    ],
                  },
                ],
                "Update Ticket": [
                  {
                    type: "textfield",
                    label: "Ticket ID",
                    placeholder: "Please Enter ticket Id",
                    value: "",
                    variableName: "update_ticket_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "External ID",
                    variableName: "update_ticket_external_id",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "External ID",
                          variableName: "update_ticket_external_id",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Decription",
                    variableName: "update_ticket_description",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "description",
                          variableName: "update_ticket_description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Requester",
                    variableName: "update_ticket_requester_id",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "update_ticket_requester_id",
                          value: "",
                          required: false,
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getUsers",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.users",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["id"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                          
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Recipient",
                    variableName: "update_ticket_recipient",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "ex : sample@mail.com",
                          variableName: "update_ticket_recipient",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Status",
                    variableName: "update_ticket_status",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_ticket_status",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "Closed",
                              value: "closed",
                            },
                            {
                              option: "New",
                              value: "new",
                            },
                            {
                              option: "Pending",
                              value: "pending",
                            },
                            {
                              option: "Solved",
                              value: "solved",
                            },
                            {
                              option: "Open",
                              value: "open",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "update_ticket_priority",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_ticket_priority",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "Low",
                              value: "low",
                            },
                            {
                              option: "Normal",
                              value: "normal",
                            },
                            {
                              option: "High",
                              value: "high",
                            },
                            {
                              option: "Urgent",
                              value: "urgent",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Subject",
                    variableName: "update_ticket_subject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "subject",
                          variableName: "update_ticket_subject",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tags",
                    variableName: "update_ticket_tags",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          multiselect: true,
                          placeholder: "Choose the tags",
                          variableName: "update_ticket_tags",
                          rightSideInput: true,
                          value: [],
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getTags",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.tags",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["name"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                          
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "update_ticket_type",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_ticket_type",
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "Question",
                              value: "question",
                            },
                            {
                              option: "Incident",
                              value: "incident",
                            },
                            {
                              option: "Task",
                              value: "task",
                            },
                            {
                              option: "Problem",
                              value: "problem",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Group",
                    variableName: "update_ticket_grp_id",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "update_ticket_grp_id",
                          value: "",
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getGroups",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.groups",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["id"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                          
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assignee Email",
                    variableName: "update_ticket_assignee_email",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Assignee Email",
                          variableName: "update_ticket_assignee_email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Ticket": [
                  {
                    type: "textfield",
                    label: "Ticket ID",
                    value: "",
                    placeholder: "Please Enter ticket Id",
                    variableName: "delete_ticket_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
                "Recover Ticket": [
                  {
                    type: "textfield",
                    label: "Suspended Ticket ID",
                    value: "",
                    placeholder: "Please Enter ticket Id",
                    variableName: "recover_ticket_id",
                    required: true,
                    hasDynamicVariable: false,
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
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get",
                  value: "Get User",
                },
                {
                  option: "Get All",
                  value: "Get All Users",
                },
                {
                  option: "Create",
                  value: "Create User",
                },
                {
                  option: "Update",
                  value: "Update User",
                },
                {
                  option: "Delete",
                  value: "Delete User",
                },
                {
                  option: "Search",
                  value: "Search User",
                },
                {
                  option: "Get Data",
                  value: "Get Data Related To User",
                },
                {
                  option: "Get User Organization",
                  value: "Get User Organization",
                },
              ],
              options: {
                "Get User": [
                  {
                    type: "textfield",
                    label: "User ID",
                    value: "",
                    variableName: "get_user_id",
                    required: true,
                    placeholder: "Please Enter user Id",
                    hasDynamicVariable: true,
                  },
                ],
                "Get All Users": [
                  {
                    title: "Filters",
                    type: "accordion",
                    accTitle: "Role",
                    variableName: "get_all_users_roles",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "get_all_users_roles",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "End-User",
                              value: "end-user",
                            },
                            {
                              option: "Agent",
                              value: "agent",
                            },
                            {
                              option: "Admin",
                              value: "admin",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Create User": [
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "Please Enter User Name",
                    variableName: "create_user_name",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Email",
                    value: "",
                    placeholder: "Please Enter User Email",
                    variableName: "create_user_email",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Alias",
                    variableName: "create_user_alias",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "alias",
                          variableName: "create_user_alias",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Details",
                    variableName: "create_user_details",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "details",
                          variableName: "create_user_details",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "External Id",
                    variableName: "create_user_external_id",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "External ID",
                          variableName: "create_user_external_id",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Timezone",
                    variableName: "create_user_timezone",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Timezone",
                          variableName: "create_user_timezone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Locale",
                    variableName: "create_user_locale",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "ex : en-US",
                          variableName: "create_user_locale",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tags",
                    variableName: "create_user_tags",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          multiselect: true,
                          placeholder: "Choose the tags",
                          variableName: "create_user_tags",
                          rightSideInput: true,
                          value: [],
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getTags",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.tags",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["name"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                          
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Notes",
                    variableName: "create_user_notes",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Notes",
                          variableName: "create_user_notes",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Organization",
                    variableName: "create_user_org_id",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "create_user_org_id",
                          value: "",
                          required: false,
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getOrganizations",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.organizations",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["id"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                          
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "create_user_phone",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "phone number",
                          variableName: "create_user_phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Signature",
                    variableName: "create_user_signature",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "signature",
                          variableName: "create_user_signature",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Suspended",
                    variableName: "create_user_suspended_users",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_user_suspended_users",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Verified",
                    variableName: "create_user_verified_users",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_user_verified_users",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Reports CSV",
                    variableName: "create_user_report_csv",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_user_report_csv",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Restricted Agent",
                    variableName: "create_user_restricted_agent",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_user_restricted_agent",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Moderator",
                    variableName: "create_user_moderator",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_user_moderator",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Only Private Comments",
                    variableName: "create_user_only_private_comments",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_user_only_private_comments",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Role",
                    variableName: "create_user_role",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_user_role",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "End User",
                              value: "end-user",
                            },
                            {
                              option: "Agent",
                              value: "agent",
                            },
                            {
                              option: "Admin",
                              value: "admin",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Ticket Restriction",
                    variableName: "create_user_ticket_restriction",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "create_user_ticket_restriction",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "Organization",
                              value: "organization",
                            },
                            {
                              option: "Groups",
                              value: "groups",
                            },
                            {
                              option: "Assigned",
                              value: "assigned",
                            },
                            {
                              option: "Requested",
                              value: "requested",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Update User": [
                  {
                    type: "textfield",
                    label: "User Id",
                    value: "",
                    placeholder: "Please Enter User Id",
                    variableName: "update_user_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Email",
                    variableName: "update_user_email",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "update_user_email",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "update_user_name",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "name",
                          variableName: "update_user_name",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Alias",
                    variableName: "update_user_alias",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "alias",
                          variableName: "update_user_alias",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Details",
                    variableName: "update_user_details",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "details",
                          variableName: "update_user_details",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "External Id",
                    variableName: "update_user_external_id",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "External ID",
                          variableName: "update_user_external_id",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Timezone",
                    variableName: "update_user_timezone",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Timezone",
                          variableName: "update_user_timezone",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Locale",
                    variableName: "update_user_locale",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "ex : en-US",
                          variableName: "update_user_locale",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tags",
                    variableName: "update_user_tags",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          multiselect: true,
                          placeholder: "Choose the tags",
                          variableName: "update_user_tags",
                          rightSideInput: true,
                          value: [],
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getTags",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.tags",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["name"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                          
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Notes",
                    variableName: "update_user_notes",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Notes",
                          variableName: "update_user_notes",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Organization ",
                    variableName: "update_user_org_id",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "update_user_org_id",
                          value: "",
                          required: false,
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getOrganizations",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.organizations",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["id"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                          
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "update_user_phone",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "phone number",
                          variableName: "update_user_phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Signature",
                    variableName: "update_user_signature",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "signature",
                          variableName: "update_user_signature",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Suspended",
                    variableName: "update_user_suspended_users",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_user_suspended_users",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Verified",
                    variableName: "update_user_verified_users",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_user_verified_users",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Reports CSV",
                    variableName: "update_user_report_csv",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_user_report_csv",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Restricted Agent",
                    variableName: "update_user_restricted_agent",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_user_restricted_agent",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Moderator",
                    variableName: "update_user_moderator",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_user_moderator",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Only Private Comments",
                    variableName: "update_user_only_private_comments",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_user_only_private_comments",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "True",
                              value: "true",
                            },
                            {
                              option: "False",
                              value: "false",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Role",
                    variableName: "update_user_role",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_user_role",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "End User",
                              value: "end-user",
                            },
                            {
                              option: "Agent",
                              value: "agent",
                            },
                            {
                              option: "Admin",
                              value: "admin",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Ticket Restriction",
                    variableName: "update_user_ticket_restriction",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "update_user_ticket_restriction",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "",
                              value: "",
                            },
                            {
                              option: "Organization",
                              value: "organization",
                            },
                            {
                              option: "Groups",
                              value: "groups",
                            },
                            {
                              option: "Assigned",
                              value: "assigned",
                            },
                            {
                              option: "Requested",
                              value: "requested",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Delete User": [
                  {
                    type: "textfield",
                    label: "User ID",
                    value: "",
                    placeholder: "Please Enter User Id",
                    variableName: "delete_user_id",
                    required: true,
                    hasDynamicVariable: false,
                  },
                ],
                "Search User": [
                  {
                    type: "accordion",
                    title: "Filter",
                    accTitle: "External ID",
                    variableName: "search_user_external_id",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Please Enter external Id",
                          variableName: "search_user_external_id",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Query",
                    variableName: "search_user_query",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          placeholder: "Query",
                          value: "",
                          variableName: "search_user_query",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Get Data Related To User": [
                  {
                    type: "textfield",
                    label: "User ID",
                    value: "",
                    placeholder: "Please Enter user Id",
                    variableName: "get_data_related_to_user_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
                "Get User Organization": [
                  {
                    type: "textfield",
                    label: "User ID",
                    value: "",
                    placeholder: "Please Enter User Id",
                    variableName: "get_user_org_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
          Organization: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Organization",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Organization",
                },
                {
                  option: "Get All",
                  value: "Get All Organizations",
                },
                {
                  option: "Delete",
                  value: "Delete Organization",
                },
                {
                  option: "Create",
                  value: "Create Organization",
                },
                {
                  option: "Update",
                  value: "Update Organization",
                },
                {
                  option: "Get Related Data",
                  value: "Get Data Related To Organization",
                },
                {
                  option: "Count",
                  value: "Count Organizations",
                },
              ],
              options: {
                "Get Organization": [
                  {
                    type: "textfield",
                    label: "Organization ID",
                    value: "",
                    placeholder: "Please Enter Organization Id",
                    variableName: "get_org",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
                "Get All Organizations": [],
                "Delete Organization": [
                  {
                    type: "textfield",
                    label: "Organization Id",
                    value: "",
                    placeholder: "Please Enter Organization Id",
                    variableName: "delete_org_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
                "Create Organization": [
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "Please Enter Organization Name",
                    variableName: "create_org_name",
                    required: true,
                    hasDynamicVariable: false,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Details",
                    variableName: "create_org_details",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "details",
                          variableName: "create_org_details",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tags",
                    variableName: "create_org_tags",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          multiselect: true,
                          placeholder: "Choose the tags",
                          variableName: "create_org_tags",
                          rightSideInput: true,
                          value: [],
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getTags",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.tags",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["name"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                          
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Notes",
                    variableName: "create_org_notes",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Notes",
                          variableName: "create_org_notes",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Update Organization": [
                  {
                    placeholder: "Please Enter Organization Id",
                    type: "textfield",
                    label: "Organization ID",
                    value: "",
                    variableName: "update_org_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Organization Name",
                    variableName: "update_org_name",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "name",
                          variableName: "update_org_name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Details",
                    variableName: "update_org_details",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "details",
                          variableName: "update_org_details",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tags",
                    variableName: "update_org_tags",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          multiselect: true,
                          placeholder: "Choose the tags",
                          variableName: "update_org_tags",
                          rightSideInput: true,
                          value: [],
                          list: [],
                          config: [
                            {
                              key: "method",
                              value: "post",
                            },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "zendesk/getTags",
                                },
                              ],
                            },
                            {
                              key: "data",
                              obj: [
                                {
                                  key: "credential_name",
                                  dependOn: "cred",
                                  isAutomation: true,
                                },
                              ],
                            },
                          ],
                          res: {
                            path: "data.tags",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["name"],
                              },
                            },
                            type: [],
                            key: true,
                          },
                          apiDependsOn: [
                            {
                              type: "dropdown",
                              name: "cred",
                              isAutomation: true,
                            },
                          ],
                          
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Notes",
                    variableName: "update_org_notes",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "notes",
                          variableName: "update_org_notes",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                ],
                "Get Data Related To Organization": [
                  {
                    type: "textfield",
                    label: "Organization Id",
                    value: "",
                    placeholder: "Please Enter Organization Id",
                    variableName: "get_data_related_to_org",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
                "Count Organizations": [],
              },
            },
          ],
        },
      },
    ],
  },
};
