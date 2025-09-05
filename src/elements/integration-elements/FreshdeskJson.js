export const FreshdeskJson = {
  "category": "integration",
  "type": "Freshdesk",
  "label": "Freshdesk",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Freshdesk/getting_started",
  "description": "Freshdesk integration",
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
        "credType": "Freshdesk",
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
        type: "dropdown",
        label: "Type",
        value: "Ticket",
        variableName: "type",
        errorSpan: "Please choose a Type",
        required: true,
        hasDynamicVariable: true,
        list: [
          {
            option: "Ticket",
            value: "Ticket",
          },
          {
            option: "Contact",
            value: "Contact",
          },
        ],
        options: {
          Ticket: [
            {
              type: "dropdown",
              label: "Operation",
              value: "GET TICKET",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get",
                  value: "GET TICKET",
                },
                {
                  option: "Get Many",
                  value: "GET MANY TICKETS",
                },
                {
                  option: "Create",
                  value: "CREATE TICKET",
                },
                {
                  option: "Update",
                  value: "UPDATE TICKET",
                },
                {
                  option: "Delete",
                  value: "DELETE TICKET",
                },
              ],
              options: {
                "GET TICKET": [
                  {
                    "type": "api",
                    "label": "Ticket ID",
                    "variableName": "ticketID_GetTicket",
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
                            "value": process.env.REACT_APP_DNS_URL + "freshdesk/listTickets"
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
                      "path": "data.tickets",
                      "keys": {
                        "option": {
                          "fields": ["id"],
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
                "GET MANY TICKETS": [
                  {
                    title: "Filters",
                    type: "accordion",
                    accTitle: "Company ID",
                    variableName: "company_id_Ticket_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Company ID",
                          variableName: "company_id_Ticket_Get_Many",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Requester ID",
                    variableName: "requester_id_Ticket_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Requester ID",
                          variableName: "requester_id_Ticket_Get_Many",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_Ticket_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          variableName: "email_Ticket_Get_Many",
                          value: "",
                          placeholder: "Email",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Include",
                    variableName: "include_Ticket_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "include",
                          value: [],
                          list: [
                            {
                              option: "Company",
                              value: "company",
                            },
                            {
                              option: "Description",
                              value: "description",
                            },
                            {
                              option: "Requester",
                              value: "requester",
                            },
                            {
                              option: "Stats",
                              value: "stats",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Order",
                    variableName: "order_type_Ticket_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          placeholder: "Select",
                          variableName: "order_type_Ticket_Get_Many",
                          value: "desc",
                          list: [
                            {
                              option: "DESC",
                              value: "desc",
                            },
                            {
                              option: "ASC",
                              value: "asc",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Order By",
                    variableName: "order_by_Ticket_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          placeholder: "Select",
                          variableName: "order_by_Ticket_Get_Many",
                          value: "",
                          list: [
                            {
                              option: "Created At",
                              value: "created_at",
                            },
                            {
                              option: "Updated At",
                              value: "updated_at",
                            },
                            {
                              option: "Due By",
                              value: "due_by",
                            },
                            {
                              option: "Status",
                              value: "status",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Updated Since",
                    variableName: "updated_since_Ticket_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          placeholder: "Select date and time",
                          variableName: "updated_since_Ticket_Get_Many",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                ],
                "CREATE TICKET": [
                  {
                    type: "dropdown",
                    label: "Requester Identification",
                    value: "requester_id",
                    variableName: "requester_ticket_create",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "Requester ID",
                        value: "requester_id",
                      },
                      {
                        option: "Email",
                        value: "email",
                      },
                      {
                        option: "Phone",
                        value: "phone",
                      },
                      {
                        option: "Facebook ID",
                        value: "facebook_id",
                      },
                      {
                        option: "Twitter ID",
                        value: "twitter_id",
                      },
                      {
                        option: "Unique External ID",
                        value: "unique_external_id",
                      },
                    ],
                    options: {
                      requester_id: [
                        {
                          type: "textfield",
                          label: "Value",
                          required: true,
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Requester ID",
                          variableName: "requester_id_ticket_create",
                          value: "",
                          hasDynamicVariable: true,
                        },
                      ],
                      email: [
                        {
                          type: "textfield",
                          label: "Value",
                          required: true,
                          placeholder: "Email",
                          variableName: "email_ticket_create",
                          value: "",
                          hasDynamicVariable: true,
                        },
                      ],
                      phone: [
                        {
                          type: "textfield",
                          label: "Value",
                          required: true,
                          placeholder: "Phone",
                          variableName: "phone_ticket_create",
                          value: "",
                          hasDynamicVariable: true,
                        },
                      ],
                      facebook_id: [
                        {
                          type: "textfield",
                          label: "Value",
                          required: true,
                          placeholder: "Facebook ID",
                          variableName: "facebook_id_ticket_create",
                          value: "",
                          hasDynamicVariable: true,
                        },
                      ],
                      twitter_id: [
                        {
                          type: "textfield",
                          label: "Value",
                          required: true,
                          placeholder: "Twitter ID",
                          variableName: "twitter_id_ticket_create",
                          value: "",
                          hasDynamicVariable: true,
                        },
                      ],
                      unique_external_id: [
                        {
                          type: "textfield",
                          label: "Value",
                          required: true,
                          placeholder: "Unique External ID",
                          variableName: "unique_external_id_ticket_create",
                          value: "",
                          hasDynamicVariable: true,
                        },
                      ],
                    },
                  },
                  {
                    type: "textfield",
                    label: "Subject",
                    required: true,
                    variableName: "subject_ticket_create",
                    value: "",
                    placeholder: "Subject",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Description",
                    required: true,
                    variableName: "description_ticket_create",
                    value: "",
                    placeholder: "Description",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    label: "Status",
                    value: "",
                    variableName: "status_ticket_create",
                    errorSpan: "Please choose a Status",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "Pending",
                        value: "3",
                      },
                      {
                        option: "Resolved",
                        value: "4",
                      },
                      {
                        option: "Open",
                        value: "2",
                      },
                      {
                        option: "Closed",
                        value: "5",
                      },
                    ],
                  },
                  {
                    type: "dropdown",
                    label: "Priority",
                    value: "",
                    variableName: "priority_ticket_create",
                    errorSpan: "Please choose a Priority",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "Low",
                        value: "1",
                      },
                      {
                        option: "Medium",
                        value: "2",
                      },
                      {
                        option: "High",
                        value: "3",
                      },
                      {
                        option: "Urgent",
                        value: "'4'",
                      },
                    ],
                  },
                  {
                    type: "dropdown",
                    label: "Source",
                    value: "",
                    variableName: "source_ticket_create",
                    errorSpan: "Please choose a Source",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "Portal",
                        value: "2",
                      },
                      {
                        option: "Chat",
                        value: "7",
                      },
                      {
                        option: "Email",
                        value: "1",
                      },
                      {
                        option: "Feedback Widget",
                        value: "9",
                      },
                      {
                        option: "Outbound Email",
                        value: "10",
                      },
                      {
                        option: "Phone",
                        value: "3",
                      },
                    ],
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Agent ID",
                    variableName: "responder_id_ticket_create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Agent ID",
                          variableName: "responder_id_ticket_create",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Company ID",
                    variableName: "company_id_ticket_create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Company ID",
                          variableName: "company_id_ticket_create",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Due by",
                    variableName: "due_by_ticket_create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Date and time",
                          variableName: "due_by_ticket_create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email Config ID",
                    variableName: "email_config_id_ticket_create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "0",
                          variableName: "email_config_id_ticket_create",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "FR Due By",
                    variableName: "fr_due_by_ticket_create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Date and time",
                          variableName: "fr_due_by_ticket_create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Group ID",
                    variableName: "group_id_ticket_create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Group ID",
                          variableName: "group_id_ticket_create",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_ticket_create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          variableName: "name_ticket_create",
                          value: "",
                          placeholder: "Name",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Product ID",
                    variableName: "product_id_ticket_create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Product ID",
                          variableName: "product_id_ticket_create",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "type_ticket_create",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "type_ticket_create",
                          list: [
                            {
                              option: "Refund",
                              value: "Refund",
                            },
                            {
                              option: "Question",
                              value: "Question",
                            },
                            {
                              option: "Problem",
                              value: "Problem",
                            },
                            {
                              option: "Incident",
                              value: "Incident",
                            },
                            {
                              option: "Feature Request",
                              value: "Feature Request",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "CC_Email",
                    variableName: "cc_emails_ticket_create",
                    structure: [
                      {
                        type: "row",
                        title: "Email",
                        variableName: "cc_emails_ticket_create",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "cc_email",
                        variableName: "emailValue",
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Tag",
                    variableName: "tags_ticket_create",
                    structure: [
                      {
                        type: "row",
                        title: "Tag",
                        variableName: "tags_ticket_create",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "Tag",
                        variableName: "tagName",
                      },
                    ],
                  },
                ],
                "UPDATE TICKET": [
                  {
                    "type": "api",
                    "label": "Ticket ID",
                    "variableName": "ticketID_UpdateTicket",
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
                            "value": process.env.REACT_APP_DNS_URL + "freshdesk/listTickets"
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
                      "path": "data.tickets",
                      "keys": {
                        "option": {
                          "fields": ["id"],
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
                    title: "Update Fields",
                    type: "accordion",
                    accTitle: "Status",
                    variableName: "status_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "status_ticket_update",
                          list: [
                            {
                              option: "Pending",
                              value: "3",
                            },
                            {
                              option: "Resolved",
                              value: "4",
                            },
                            {
                              option: "Open",
                              value: "2",
                            },
                            {
                              option: "Closed",
                              value: "5",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "priority_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "priority_ticket_update",
                          list: [
                            {
                              option: "Low",
                              value: "1",
                            },
                            {
                              option: "Medium",
                              value: "2",
                            },
                            {
                              option: "High",
                              value: "3",
                            },
                            {
                              option: "Urgent",
                              value: "4",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Source",
                    variableName: "source_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "source_ticket_update",
                          list: [
                            {
                              option: "Portal",
                              value: "2",
                            },
                            {
                              option: "Chat",
                              value: "7",
                            },
                            {
                              option: "Email",
                              value: "1",
                            },
                            {
                              option: "Feedback Widget",
                              value: "9",
                            },
                            {
                              option: "Outbound Email",
                              value: "10",
                            },
                            {
                              option: "Phone",
                              value: "3",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Agent ID",
                    variableName: "responder_id_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Agent ID",
                          variableName: "responder_id_ticket_update",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "email",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Company ID",
                    variableName: "company_id_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Company ID",
                          variableName: "company_id_ticket_update",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Due by",
                    variableName: "due_by_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Date and time",
                          variableName: "due_by",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "FR Due By",
                    variableName: "fr_due_by_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Date and time",
                          variableName: "fr_due_by",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email Config ID",
                    variableName: "email_config_id_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "0",
                          variableName: "email_config_id_ticket_update",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Group ID",
                    variableName: "group_id_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Group ID",
                          variableName: "group_id_ticket_update",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          variableName: "name_ticket_update",
                          value: "",
                          placeholder: "Name",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Product ID",
                    variableName: "product_id_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "Product ID",
                          variableName: "product_id_ticket_update",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "type_ticket_update",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "type_ticket_update",
                          list: [
                            {
                              option: "Refund",
                              value: "Refund",
                            },
                            {
                              option: "Question",
                              value: "Question",
                            },
                            {
                              option: "Problem",
                              value: "Problem",
                            },
                            {
                              option: "Incident",
                              value: "Incident",
                            },
                            {
                              option: "Feature Request",
                              value: "Feature Request",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Tag",
                    variableName: "tags_ticket_update",
                    structure: [
                      {
                        type: "row",
                        title: "Tag",
                        variableName: "tags_ticket_update",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "Tag",
                        variableName: "tagName",
                      },
                    ],
                  },
                  {
                    title: "Requester",
                    type: "dropdown",
                    label: "Requester Identification",
                    value: "requester_id",
                    variableName: "requester",
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Requester ID",
                        value: "requester_id",
                      },
                      {
                        option: "Email",
                        value: "email",
                      },
                      {
                        option: "Phone",
                        value: "phone",
                      },
                      {
                        option: "Facebook ID",
                        value: "facebook_id",
                      },
                      {
                        option: "Twitter ID",
                        value: "twitter_id",
                      },
                      {
                        option: "Unique External ID",
                        value: "unique_external_id",
                      },
                    ],
                    options: {
                      requester_id: [
                        {
                          type: "textfield",
                          label: "Requester Value",
                          typeOfValue: "integer",
                          numberField: true,
                          variableName: "requester_id_ticket_update",
                          value: "",
                          placeholder: "Requester ID",
                        },
                      ],
                      email: [
                        {
                          type: "textfield",
                          label: "Requester Value",
                          variableName: "email_ticket_update",
                          value: "",
                          placeholder: "Email",
                        },
                      ],
                      phone: [
                        {
                          type: "textfield",
                          label: "Requester Value",
                          variableName: "phone_ticket_update",
                          value: "",
                          placeholder: "Phone",
                        },
                      ],
                      facebook_id: [
                        {
                          type: "textfield",
                          label: "Requester Value",
                          variableName: "facebook_id_ticket_update",
                          value: "",
                          placeholder: "Facebook ID",
                        },
                      ],
                      twitter_id: [
                        {
                          type: "textfield",
                          label: "Requester Value",
                          variableName: "twitter_id_ticket_update",
                          value: "",
                          placeholder: "Twitter ID",
                        },
                      ],
                      unique_external_id: [
                        {
                          type: "textfield",
                          label: "Requester Value",
                          variableName: "unique_external_id_ticket_update",
                          value: "",
                          placeholder: "Unique External ID",
                        },
                      ],
                    },
                  },
                ],
                "DELETE TICKET": [{
                    "type": "api",
                    "label": "Ticket ID",
                    "variableName": "ticketID_DeleteTicket",
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
                            "value": process.env.REACT_APP_DNS_URL + "freshdesk/listTickets"
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
                      "path": "data.tickets",
                      "keys": {
                        "option": {
                          "fields": ["id"],
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
              },
            },
          ],
          Contact: [
            {
              type: "dropdown",
              label: "Operation",
              value: "GET CONTACT",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get",
                  value: "GET CONTACT",
                },
                {
                  option: "Get Many",
                  value: "GET MANY CONTACTS",
                },
                {
                  option: "Create",
                  value: "CREATE CONTACT",
                },
                {
                  option: "Update",
                  value: "UPDATE CONTACT",
                },
                {
                  option: "Delete",
                  value: "DELETE CONTACT",
                },
              ],
              options: {
                "GET CONTACT": [
                  {
                    "type": "api",
                    "label": "Contact ID",
                    "variableName": "contactID_GetContact",
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
                            "value": process.env.REACT_APP_DNS_URL + "freshdesk/listContacts"
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
                      "path": "data.contacts",
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
                "GET MANY CONTACTS": [
                  {
                    title: "Filters",
                    type: "accordion",
                    accTitle: "Company ID",
                    variableName: "company_id_Contact_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          placeholder: "0",
                          variableName: "company_id_Contact_Get_Many",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_Contact_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          variableName: "email_Contact_Get_Many",
                          value: "",
                          placeholder: "Email",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile",
                    variableName: "mobile_Contact_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile",
                          variableName: "mobile_Contact_Get_Many",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_Contact_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_Contact_Get_Many",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "State",
                    variableName: "state_Contact_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          placeholder: "Select",
                          variableName: "state_Contact_Get_Many",
                          value: "",
                          list: [
                            {
                              option: "Blocked",
                              value: "blocked",
                            },
                            {
                              option: "Deleted",
                              value: "deleted",
                            },
                            {
                              option: "Unverified",
                              value: "unverified",
                            },
                            {
                              option: "Verified",
                              value: "verified",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Updated Since",
                    variableName: "updated_since_Contact_Get_Many",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Date and time",
                          variableName: "updated_since_Contact_Get_Many",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                ],
                "CREATE CONTACT": [
                  {
                    type: "textfield",
                    label: "Email",
                    required: true,
                    variableName: "email_Contact_Create",
                    value: "",
                    placeholder: "example@gmail.com",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_Contact_Create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Address",
                    variableName: "address_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Address",
                          variableName: "address_Contact_Create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Company ID",
                    variableName: "company_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          numberField: true,
                          value: "",
                          typeOfValue: "integer",
                          placeholder: "Company ID",
                          variableName: "company_id_Contact_Create",
                          hasDynamicVariable: false,
                        },
                        {
                          label: "Other companies",
                          type: "textfield",
                          numberField: true,
                          value: "",
                          typeOfValue: "integer",
                          placeholder: "Company ID",
                          variableName: "other_company_id_Contact_Create",
                          hasDynamicVariable: false,
                        },
                        {
                          type: "checkbox",
                          value: false,
                          variableName:
                            "view_all_tickets_of_other_companies_Contact_Create",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description_Contact_Create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Job Title",
                    variableName: "job_title_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Job Title",
                          variableName: "job_title_Contact_Create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Language",
                    variableName: "language_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "en",
                          variableName: "language_Contact_Create",
                          list: [
                            {
                              option: "English",
                              value: "en",
                            },
                            {
                              option: "French",
                              value: "fr",
                            },
                            {
                              option: "German",
                              value: "de",
                            },
                            {
                              option: "Spanish",
                              value: "es",
                            },
                            {
                              option: "Japanese",
                              value: "ja",
                            },
                            {
                              option: "Portuguese (Brazil)",
                              value: "pt-BR",
                            },
                            {
                              option: "Chinese (Simplified)",
                              value: "zh-CN",
                            },
                            {
                              option: "Chinese (Traditional, Hong Kong)",
                              value: "zh-HK",
                            },
                            {
                              option: "Chinese (Traditional, Taiwan)",
                              value: "zh-TW",
                            },
                            {
                              option: "Arabic",
                              value: "ar",
                            },
                            {
                              option: "Bulgarian",
                              value: "bg",
                            },
                            {
                              option: "Bosnian",
                              value: "bs",
                            },
                            {
                              option: "Catalan",
                              value: "ca",
                            },
                            {
                              option: "Czech",
                              value: "cs",
                            },
                            {
                              option: "Danish",
                              value: "da",
                            },
                            {
                              option: "Greek",
                              value: "el",
                            },
                            {
                              option: "Spanish (Latin America)",
                              value: "es-419",
                            },
                            {
                              option: "Spanish (Latin America)",
                              value: "es-LA",
                            },
                            {
                              option: "Estonian",
                              value: "et",
                            },
                            {
                              option: "Finnish",
                              value: "fi",
                            },
                            {
                              option: "Filipino",
                              value: "fil",
                            },
                            {
                              option: "Hebrew",
                              value: "he",
                            },
                            {
                              option: "Croatian",
                              value: "hr",
                            },
                            {
                              option: "Hungarian",
                              value: "hu",
                            },
                            {
                              option: "Indonesian",
                              value: "id",
                            },
                            {
                              option: "Icelandic",
                              value: "is",
                            },
                            {
                              option: "Italian",
                              value: "it",
                            },
                            {
                              option: "Japanese",
                              value: "ja-JP",
                            },
                            {
                              option: "Korean",
                              value: "ko",
                            },
                            {
                              option: "Lithuanian",
                              value: "lt",
                            },
                            {
                              option: "Latvian",
                              value: "lv-LV",
                            },
                            {
                              option: "Malay",
                              value: "ms",
                            },
                            {
                              option: "Norwegian Bokmål",
                              value: "nb-NO",
                            },
                            {
                              option: "Dutch",
                              value: "nl",
                            },
                            {
                              option: "Norwegian",
                              value: "no",
                            },
                            {
                              option: "Polish",
                              value: "pl",
                            },
                            {
                              option: "Portuguese (Portugal)",
                              value: "pt-PT",
                            },
                            {
                              option: "Romanian",
                              value: "ro",
                            },
                            {
                              option: "Russian",
                              value: "ru",
                            },
                            {
                              option: "Slovak",
                              value: "sk",
                            },
                            {
                              option: "Slovenian",
                              value: "sl",
                            },
                            {
                              option: "Serbian",
                              value: "sr",
                            },
                            {
                              option: "Swedish",
                              value: "sv-SE",
                            },
                            {
                              option: "Thai",
                              value: "th",
                            },
                            {
                              option: "Turkish",
                              value: "tr",
                            },
                            {
                              option: "Ukrainian",
                              value: "uk",
                            },
                            {
                              option: "Vietnamese",
                              value: "vi",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile",
                    variableName: "mobile_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile",
                          variableName: "mobile_Contact_Create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_Contact_Create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Time Zone",
                    variableName: "time_zone_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Time Zone",
                          variableName: "time_zone_Contact_Create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Twitter ID",
                    variableName: "twitter_id_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Twitter ID",
                          variableName: "twitter_id_Contact_Create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Unique External ID",
                    variableName: "unique_external_id_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Unique External ID",
                          variableName: "unique_external_id_Contact_Create",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "View All Tickets",
                    variableName: "view_all_tickets_Contact_Create",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "view_all_tickets_Contact_Create",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "custom_fields_Contact_Create",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "custom_fields_Contact_Create",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "Name",
                        variableName: "key",
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "Value",
                        variableName: "value",
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Other Email",
                    variableName: "other_emails_Contact_Create",
                    structure: [
                      {
                        type: "row",
                        title: "Email",
                        variableName: "other_emails_Contact_Create",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "Email",
                        variableName: "emailValue",
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Tag",
                    variableName: "tags_Contact_Create",
                    structure: [
                      {
                        type: "row",
                        title: "Tag",
                        variableName: "tags_Contact_Create",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "Tag",
                        variableName: "tagName",
                      },
                    ],
                  },
                ],
                "UPDATE CONTACT": [
                  {
                    "type": "api",
                    "label": "Contact ID",
                    "variableName": "contactID_UpdateContact",
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
                            "value": process.env.REACT_APP_DNS_URL + "freshdesk/listContacts"
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
                      "path": "data.contacts",
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
                    title: "Update Fields",
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          variableName: "email_Contact_Update",
                          value: "",
                          placeholder: "example@gmail.com",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_Contact_Update",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Address",
                    variableName: "address_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Address",
                          variableName: "address_Contact_Update",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Company ID",
                    variableName: "company_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          numberField: true,
                          value: "",
                          typeOfValue: "integer",
                          placeholder: "Company ID",
                          variableName: "company_id_Contact_Update",
                          hasDynamicVariable: false,
                        },
                        {
                          label: "Other companies",
                          type: "textfield",
                          numberField: true,
                          value: "",
                          typeOfValue: "integer",
                          placeholder: "Company ID",
                          variableName: "other_company_id_Contact_Update",
                          hasDynamicVariable: false,
                        },
                        {
                          type: "checkbox",
                          value: false,
                          variableName:
                            "view_all_tickets_of_other_companies_Contact_Update",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description_Contact_Update",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Job Title",
                    variableName: "job_title_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Job Title",
                          variableName: "job_title_Contact_Update",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Language",
                    variableName: "language_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "language_Contact_Update",
                          list: [
                            {
                              option: "English",
                              value: "en",
                            },
                            {
                              option: "French",
                              value: "fr",
                            },
                            {
                              option: "German",
                              value: "de",
                            },
                            {
                              option: "Spanish",
                              value: "es",
                            },
                            {
                              option: "Japanese",
                              value: "ja",
                            },
                            {
                              option: "Portuguese (Brazil)",
                              value: "pt-BR",
                            },
                            {
                              option: "Chinese (Simplified)",
                              value: "zh-CN",
                            },
                            {
                              option: "Chinese (Traditional, Hong Kong)",
                              value: "zh-HK",
                            },
                            {
                              option: "Chinese (Traditional, Taiwan)",
                              value: "zh-TW",
                            },
                            {
                              option: "Arabic",
                              value: "ar",
                            },
                            {
                              option: "Bulgarian",
                              value: "bg",
                            },
                            {
                              option: "Bosnian",
                              value: "bs",
                            },
                            {
                              option: "Catalan",
                              value: "ca",
                            },
                            {
                              option: "Czech",
                              value: "cs",
                            },
                            {
                              option: "Danish",
                              value: "da",
                            },
                            {
                              option: "Greek",
                              value: "el",
                            },
                            {
                              option: "Spanish (Latin America)",
                              value: "es-419",
                            },
                            {
                              option: "Spanish (Latin America)",
                              value: "es-LA",
                            },
                            {
                              option: "Estonian",
                              value: "et",
                            },
                            {
                              option: "Finnish",
                              value: "fi",
                            },
                            {
                              option: "Filipino",
                              value: "fil",
                            },
                            {
                              option: "Hebrew",
                              value: "he",
                            },
                            {
                              option: "Croatian",
                              value: "hr",
                            },
                            {
                              option: "Hungarian",
                              value: "hu",
                            },
                            {
                              option: "Indonesian",
                              value: "id",
                            },
                            {
                              option: "Icelandic",
                              value: "is",
                            },
                            {
                              option: "Italian",
                              value: "it",
                            },
                            {
                              option: "Japanese",
                              value: "ja-JP",
                            },
                            {
                              option: "Korean",
                              value: "ko",
                            },
                            {
                              option: "Lithuanian",
                              value: "lt",
                            },
                            {
                              option: "Latvian",
                              value: "lv-LV",
                            },
                            {
                              option: "Malay",
                              value: "ms",
                            },
                            {
                              option: "Norwegian Bokmål",
                              value: "nb-NO",
                            },
                            {
                              option: "Dutch",
                              value: "nl",
                            },
                            {
                              option: "Norwegian",
                              value: "no",
                            },
                            {
                              option: "Polish",
                              value: "pl",
                            },
                            {
                              option: "Portuguese (Portugal)",
                              value: "pt-PT",
                            },
                            {
                              option: "Romanian",
                              value: "ro",
                            },
                            {
                              option: "Russian",
                              value: "ru",
                            },
                            {
                              option: "Slovak",
                              value: "sk",
                            },
                            {
                              option: "Slovenian",
                              value: "sl",
                            },
                            {
                              option: "Serbian",
                              value: "sr",
                            },
                            {
                              option: "Swedish",
                              value: "sv-SE",
                            },
                            {
                              option: "Thai",
                              value: "th",
                            },
                            {
                              option: "Turkish",
                              value: "tr",
                            },
                            {
                              option: "Ukrainian",
                              value: "uk",
                            },
                            {
                              option: "Vietnamese",
                              value: "vi",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile",
                    variableName: "mobile_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile",
                          variableName: "mobile_Contact_Update",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_Contact_Update",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Time Zone",
                    variableName: "time_zone_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Time Zone",
                          variableName: "time_zone_Contact_Update",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Twitter ID",
                    variableName: "twitter_id_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Twitter ID",
                          variableName: "twitter_id_Contact_Update",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Unique External ID",
                    variableName: "unique_external_id_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Unique External ID",
                          variableName: "unique_external_id_Contact_Update",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "View All Tickets",
                    variableName: "view_all_tickets_Contact_Update",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "view_all_tickets_Contact_Update",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "custom_fields_Contact_Update",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "custom_fields_Contact_Update",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "Name",
                        variableName: "key",
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "Value",
                        variableName: "value",
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Other Email",
                    variableName: "other_emails_Contact_Update",
                    structure: [
                      {
                        type: "row",
                        title: "Email",
                        variableName: "other_emails_Contact_Update",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "",
                        variableName: "emailValue",
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Tag",
                    variableName: "tags_Contact_Update",
                    structure: [
                      {
                        type: "row",
                        title: "Tag",
                        variableName: "tags_Contact_Update",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "Tag",
                        variableName: "tagName",
                      },
                    ],
                  },
                ],
                "DELETE CONTACT": [
                  {
                    "type": "api",
                    "label": "Contact ID",
                    "variableName": "contactID_DeleteContact",
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
                            "value": process.env.REACT_APP_DNS_URL + "freshdesk/listContacts"
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
                      "path": "data.contacts",
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
              },
            },
          ],
        },
      },
    ]
  }
};