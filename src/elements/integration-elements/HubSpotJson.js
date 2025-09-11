export const HubSpotJson = {
  category: "integration",
  type: "HubSpot",
  label: "HubSpot",
  color: "#53D2E2 ",
  docsPath: "Connectors/HubSpot/getting_started",
  description: "HubSpot integration",
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
        credType: "HubSpot",
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
        value: "Contact",
        variableName: "type",
        required: true,
        hasDynamicVariable: true,
        list: [
          {
            option: "Contact",
            value: "Contact",
          },

          {
            option: "Deal",
            value: "Deal",
          },
          {
            option: "Ticket",
            value: "Ticket",
          },
          {
            option: "Engagements - Call",
            value: "Engagements_Call",
          },
        ],
        options: {
          Contact: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Contact",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get Contact",
                  value: "Get Contact",
                },
                {
                  option: "Create Contact",
                  value: "Create Contact",
                },
                {
                  option: "Delete Contact",
                  value: "Delete Contact",
                },
              ],
              options: {
                "Create Contact": [
                  {
                    type: "textfield",
                    label: "Contact Email",
                    placeholder: "Please Enter Contact Email",
                    value: "",
                    variableName: "create_contact_email",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Lifecycle Stage",
                    variableName: "create_contact_lifecyclestage",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "lead",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "lead",
                              value: "lead",
                            },
                            {
                              option: "Marketing Qualified Lead",
                              value: "marketingqualifiedlead",
                            },

                            {
                              option: "subscriber",
                              value: "subscriber",
                            },
                            {
                              option: "Sales Qualified Lead",
                              value: "salesqualifiedlead",
                            },
                            {
                              option: "opportunity",
                              value: "opportunity",
                            },
                            {
                              option: "customer",
                              value: "customer",
                            },

                            {
                              option: "other",
                              value: "other",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Number Of Employees",
                    variableName: "create_contact_number_of_employees",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "1-5",
                              value: "1-5",
                            },

                            {
                              option: "5-25",
                              value: "5-25",
                            },
                            {
                              option: "25-50",
                              value: "25-50",
                            },
                            {
                              option: "50-100",
                              value: "50-100",
                            },
                            {
                              option: "100-500",
                              value: "100-500",
                            },

                            {
                              option: "500-1000",
                              value: "500-1000",
                            },
                            {
                              option: "1000+",
                              value: "1000+",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Gender and Date of Birth ",
                    variableName: "create_contact_two_fields",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          label: "Gender",
                          value: "male",
                          variableName: "gender",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "male",
                              value: "male",
                            },
                            {
                              option: "female",
                              value: "female",
                            },
                          ],
                        },
                        {
                          type: "textfield",
                          label: "Date of Birth",
                          required: false,
                          variableName: "date_of_birth",
                          value: "",
                          date: true,
                          datetimeLocal: true,
                          placeholder: "YYYY-MM-DD",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Status Name",
                    variableName: "create_contact_lead_status_name",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "BAD_TIMING",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Attempted to Contact",
                              value: "ATTEMPTED_TO_CONTACT",
                            },
                            {
                              option: "Bad Timing",
                              value: "BAD_TIMING",
                            },
                            {
                              option: "Open Deal",
                              value: "OPEN_DEAL",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "City",
                    variableName: "create_contact_city",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "city",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Company",
                    variableName: "create_contact_company",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "option",
                          placeholder: "company name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Fax number",
                    variableName: "create_contact_fax_number",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "option",
                          placeholder: "fax number",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country",
                    variableName: "create_contact_country",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "country name",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "create_contact_website",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "website",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Work Email",
                    variableName: "create_contact_work_email",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "option",
                          placeholder: "work email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Field of Study",
                    variableName: "create_contact_field_of_study",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "field of study",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "First Name",
                    variableName: "create_contact_firstname",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "option",
                          placeholder: "first name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Last Name",
                    variableName: "create_contact_lastname",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "last name",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Industry",
                    variableName: "create_contact_industry",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "industry",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Job Function",
                    variableName: "create_contact_job_function",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "job function",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Job Title",
                    variableName: "create_contact_job_title",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "job title",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Message",
                    variableName: "create_contact_message",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "message",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone Number",
                    variableName: "create_contact_phone_number",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "enter phone number",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Postal Code",
                    variableName: "create_contact_postal_code",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "postal code",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Relationship Status",
                    variableName: "create_contact_relationship_status",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "relationship status",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Seniority",
                    variableName: "create_contact_seniority",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "seniority",
                          variableName: "option",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Get Contact": [
                  {
                    type: "api",
                    label: "Get from List",
                    variableName: "id_contacts",
                    value: "",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "hubspot/getContacts",
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
                      path: "data.contacts",
                      keys: {
                        option: { fields: ["email"] },
                        value: { fields: ["id"] },
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
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Properties",
                    variableName: "get_contact_properties",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "get_contact_properties",
                          value: [],
                          list: [
                            {
                              option: "City",
                              value: "city",
                            },
                            {
                              option: "Country",
                              value: "country",
                            },
                            {
                              option: "Company",
                              value: "company",
                            },
                            {
                              option: "Website",
                              value: "website",
                            },
                            {
                              option: "Work Email",
                              value: "work_email",
                            },
                            {
                              option: "Field Of Study",
                              value: "field_of_study",
                            },
                            {
                              option: "First Name",
                              value: "firstname",
                            },
                            {
                              option: "Last Name",
                              value: "lastname",
                            },
                            {
                              option: "Industry",
                              value: "industry",
                            },
                            {
                              option: "Date of Birth",
                              value: "date_of_birth",
                            },
                            {
                              option: "Job Function",
                              value: "job_function",
                            },
                            {
                              option: "Job title",
                              value: "jobtitle",
                            },
                            {
                              option: "Relationship Status",
                              value: "relationship_status",
                            },
                            {
                              option: "Message",
                              value: "message",
                            },
                            {
                              option: "Mobile Phone Number",
                              value: "mobilephone",
                            },
                            {
                              option: "Number of Employees",
                              value: "numemployees",
                            },
                            {
                              option: "Zip",
                              value: "zip",
                            },
                            {
                              option: "Seniority",
                              value: "seniority",
                            },
                            {
                              option: "Fax Number",
                              value: "fax",
                            },
                            {
                              option: "Gender",
                              value: "gender",
                            },
                            {
                              option: "Lead Status",
                              value: "hs_lead_status",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Delete Contact": [
                  {
                    type: "api",
                    label: "Delete from List",
                    variableName: "id_contacts",
                    value: "",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "hubspot/getContacts",
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
                      path: "data.contacts",
                      keys: {
                        option: { fields: ["email"] },
                        value: { fields: ["id"] },
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
              },
            },
          ],
          Deal: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Deal",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get Deal",
                  value: "Get Deal",
                },
                {
                  option: "Create Deal",
                  value: "Create Deal",
                },
                {
                  option: "Delete Deal",
                  value: "Delete Deal",
                },
              ],
              options: {
                "Get Deal": [
                  {
                    type: "api",
                    label: "Get from List",
                    variableName: "id_deals",
                    value: "",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "hubspot/getDeals",
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
                      path: "data.deals",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
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
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Properties",
                    variableName: "get_deal_properties",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "get_deal_properties",
                          value: [],
                          list: [
                            {
                              option: "Deal Name",
                              value: "dealname",
                            },
                            {
                              option: "Deal Stage",
                              value: "dealstage",
                            },
                            {
                              option: "Amount In Home Currency",
                              value: "amount_in_home_currency",
                            },
                            {
                              option: "Forecast Amount",
                              value: "hs_forecast_amount",
                            },
                            {
                              option: "Close Date",
                              value: "closedate",
                            },
                            {
                              option: "Create Date",
                              value: "createdate",
                            },
                            {
                              option: "Description",
                              value: "description",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Create Deal": [
                  {
                    type: "textfield",
                    label: "Name",
                    placeholder: "Please Enter Deal Name",
                    value: "",
                    variableName: "create_deal_name",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Deal Type",
                    variableName: "create_deal_type",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Existing Business",
                              value: "existingbusiness",
                            },
                            {
                              option: "New Business",
                              value: "newbusiness",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Deal Stage",
                    variableName: "create_deal_stage",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Contract Sent",
                              value: "contractsent",
                            },
                            {
                              option: "Presentation Scheduled",
                              value: "presentationscheduled",
                            },
                            {
                              option: "Closed Won",
                              value: "closedwon",
                            },
                            {
                              option: "Decision Maker Bought In",
                              value: "decisionmakerboughtin",
                            },
                            {
                              option: "Appointment Scheduled",
                              value: "appointmentscheduled",
                            },
                            {
                              option: "Qualified To Buy",
                              value: "qualifiedtobuy",
                            },
                            {
                              option: "Closed Lost",
                              value: "closedlost",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Create Date",
                    variableName: "create_deal_createdate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: true,
                          variableName: "optionTime",
                          label: "Deal Create Time",
                          value: "",
                          placeholder: "HH:MM",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          required: true,
                          variableName: "optionDate",
                          label: "Deal Create Date",
                          value: "",
                          placeholder: "It should be in format : YYYY-MM-DD",
                          hasDynamicVariable: true,
                          helperSpan:
                            "If you don't specify a date, the date will be considered today's date.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Close Date",
                    variableName: "create_deal_closedate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: true,
                          variableName: "optionTime",
                          label: "Deal Close Time",
                          value: "",
                          placeholder: "HH:MM",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          required: true,
                          variableName: "optionDate",
                          label: "Deal Close Date",
                          value: "",
                          placeholder: "It should be in format : YYYY-MM-DD",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Amount",
                    variableName: "create_deal_amount",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Amount",
                          variableName: "option",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "create_deal_description",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "description",
                          variableName: "option",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Deal": [
                  {
                    type: "api",
                    label: "Get from List",
                    variableName: "id_deals",
                    value: "",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "hubspot/getDeals",
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
                      path: "data.deals",
                      keys: {
                        option: { fields: ["name"] },
                        value: { fields: ["id"] },
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
              },
            },
          ],
          Ticket: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Ticket",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get Ticket",
                  value: "Get Ticket",
                },
                {
                  option: "Create Ticket",
                  value: "Create Ticket",
                },
                {
                  option: "Delete Ticket",
                  value: "Delete Ticket",
                },
              ],
              options: {
                "Get Ticket": [
                  {
                    type: "api",
                    label: "Get from List",
                    variableName: "id_tickets",
                    value: "",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "hubspot/getTickets",
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
                      path: "data.tickets",
                      keys: {
                        option: { fields: ["id"] },
                        value: { fields: ["id"] },
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
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Properties",
                    variableName: "get_ticket_properties",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "get_ticket_properties",
                          value: [],
                          list: [
                            {
                              option: "Create Date",
                              value: "createdate",
                            },
                            {
                              option: "Closed Date",
                              value: "closed_date",
                            },
                            {
                              option: "Ticket Priority",
                              value: "hs_ticket_priority",
                            },
                            {
                              option: "Owner Id",
                              value: "hubspot_owner_id",
                            },
                            {
                              option: "Subject",
                              value: "subject",
                            },
                            {
                              option: "Ticket Category",
                              value: "hs_ticket_category",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Create Ticket": [
                  {
                    type: "dropdown",
                    label: "Pipeline Stage",
                    value: "1",
                    variableName: "create_ticket_pipeline_stage",
                    hasDynamicVariable: false,
                    required: true,
                    list: [
                      {
                        option: "New",
                        value: "1",
                      },
                      {
                        option: "Waiting On Contact",
                        value: "2",
                      },
                      {
                        option: "Waiting On Us",
                        value: "3",
                      },
                      {
                        option: "Closed",
                        value: "4",
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Subject",
                    placeholder: "Please Enter Ticket Subject",
                    value: "",
                    variableName: "create_ticket_subject",
                    required: false,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Ticket Priority",
                    variableName: "create_ticket_priority",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Low",
                              value: "LOW",
                            },
                            {
                              option: "Medium",
                              value: "MEDIUM",
                            },
                            {
                              option: "High",
                              value: "HIGH",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Ticket Category",
                    variableName: "create_ticket_category",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Billing Issue",
                              value: "BILLING_ISSUE",
                            },
                            {
                              option: "Feature Request",
                              value: "FEATURE_REQUEST",
                            },
                            {
                              option: "Product Issue",
                              value: "PRODUCT_ISSUE",
                            },
                            {
                              option: "General Inquiry",
                              value: "GENERAL_INQUIRY",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Pipeline",
                    variableName: "create_ticket_pipeline",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Support Pipeline",
                              value: "0",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Create Date",
                    variableName: "create_ticket_createdate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: true,
                          variableName: "optionTime",
                          value: "",
                          label: "Ticket Create Time",
                          placeholder: "HH:MM",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          required: true,
                          variableName: "optionDate",
                          value: "",
                          label: "Ticket Create Date",
                          placeholder: "It should be in the format: YYYY-MM-DD",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Ticket": [
                  {
                    type: "api",
                    label: "Get from List",
                    variableName: "id_tickets",
                    value: "",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "hubspot/getTickets",
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
                      path: "data.tickets",
                      keys: {
                        option: { fields: ["id"] },
                        value: { fields: ["id"] },
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
              },
            },
          ],
          Engagements_Call: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Call",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get Call",
                  value: "Get Call",
                },
                {
                  option: "Create Call",
                  value: "Create Call",
                },
                {
                  option: "Delete Call",
                  value: "Delete Call",
                },
              ],
              options: {
                "Get Call": [
                  {
                    type: "api",
                    label: "Get from List",
                    variableName: "id_calls",
                    value: "",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "hubspot/getCalls",
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
                      path: "data.calls",
                      keys: {
                        option: { fields: ["id"] },
                        value: { fields: ["id"] },
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
                "Create Call": [
                  {
                    title: "Metadata",
                    type: "accordion",
                    accTitle: "Body",
                    variableName: "create_call_body",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "call body",
                          variableName: "create_call_body",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Duration Milliseconds",
                    variableName: "create_call_duration",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "call duration (ms)",
                          variableName: "create_call_duration",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "From Number",
                    variableName: "create_call_from_number",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "call from number",
                          variableName: "create_call_from_number",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recording URL",
                    variableName: "create_call_recordingUrl",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Recording URL",
                          variableName: "create_call_recordingUrl",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Status",
                    variableName: "create_call_status",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "create_call_status",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Completed",
                              value: "COMPLETED",
                            },
                            {
                              option: "Busy",
                              value: "BUSY",
                            },
                            {
                              option: "Calling crm user",
                              value: "CALLING_CRM_USER",
                            },
                            {
                              option: "Canceled",
                              value: "CANCELED",
                            },
                            {
                              option: "Connecting",
                              value: "CONNECTING",
                            },
                            {
                              option: "Failed",
                              value: "FAILED",
                            },
                            {
                              option: "In Progress",
                              value: "IN_PROGRESS",
                            },
                            {
                              option: "No Answer",
                              value: "NO_ANSWER",
                            },
                            {
                              option: "Queued",
                              value: "QUEUED",
                            },
                            {
                              option: "Ringing",
                              value: "RINGING",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "To Number",
                    variableName: "create_call_to_number",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "call to number",
                          variableName: "create_call_to_number",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Title",
                    variableName: "create_call_title",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "call title",
                          variableName: "create_call_title",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Direction",
                    variableName: "create_call_direction",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "create_call_direction",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "INBOUND",
                              value: "INBOUND",
                            },
                            {
                              option: "OUTBOUND",
                              value: "OUTBOUND",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Disposition",
                    variableName: "create_call_disposition",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "create_call_disposition",
                          value: "",
                          required: false,
                          hasDynamicVariable: true,
                          list: [],
                          config: [
                            { key: "method", value: "post" },
                            {
                              key: "url",
                              dependOn: [
                                {
                                  type: "static",
                                  value:
                                    process.env.REACT_APP_DNS_URL +
                                    "hubspot/getDispositions",
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
                            path: "data.Dispositions",
                            keys: {
                              option: { fields: ["label"] },
                              value: { fields: ["id"] },
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
                    title: "Engagement",
                    type: "accordion",
                    accTitle: "Call Timestamp",
                    variableName: "create_call_timestamp",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          placeholder: "Please Enter Call Timestamp",
                          value: "",
                          variableName: "create_call_timestamp",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    title: "Associations",
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    subTitle: "ContactId",
                    variableName: "contactIds",
                    structure: [
                      {
                        type: "row",
                        title: "ContactId",
                        variableName: "contactIds",
                        removeButton: true,
                      },
                      {
                        type: "api",
                        label: "Contact",
                        variableName: "contactId_associations_create_call",
                        value: "",
                        required: true,
                        list: [],
                        config: [
                          { key: "method", value: "post" },
                          {
                            key: "url",
                            dependOn: [
                              {
                                type: "static",
                                value:
                                  process.env.REACT_APP_DNS_URL +
                                  "hubspot/getContacts",
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
                          path: "data.contacts",
                          keys: {
                            option: { fields: ["email"] },
                            value: { fields: ["id"] },
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
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    subTitle: "CompanyId",
                    variableName: "companyIds",
                    structure: [
                      {
                        type: "row",
                        title: "CompanyId",
                        variableName: "companyIds",
                        removeButton: true,
                      },
                      {
                        type: "api",
                        label: "Company",
                        variableName: "companyId_associations_create_call",
                        value: "",
                        required: true,
                        list: [],
                        config: [
                          { key: "method", value: "post" },
                          {
                            key: "url",
                            dependOn: [
                              {
                                type: "static",
                                value:
                                  process.env.REACT_APP_DNS_URL +
                                  "hubspot/getCompanies",
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
                          path: "data.companies",
                          keys: {
                            option: { fields: ["domain"] },
                            value: { fields: ["id"] },
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
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    subTitle: "DealId",
                    variableName: "dealIds",
                    structure: [
                      {
                        type: "row",
                        title: "DealId",
                        variableName: "dealIds",
                        removeButton: true,
                      },
                      {
                        type: "api",
                        label: "Deal",
                        variableName: "dealId_associations_create_call",
                        value: "",
                        required: true,
                        list: [],
                        config: [
                          { key: "method", value: "post" },
                          {
                            key: "url",
                            dependOn: [
                              {
                                type: "static",
                                value:
                                  process.env.REACT_APP_DNS_URL +
                                  "hubspot/getDeals",
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
                          path: "data.deals",
                          keys: {
                            option: { fields: ["name"] },
                            value: { fields: ["id"] },
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
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    subTitle: "TicketId",
                    variableName: "ticketIds",
                    structure: [
                      {
                        type: "row",
                        title: "TicketId",
                        variableName: "ticketIds",
                        removeButton: true,
                      },
                      {
                        type: "api",
                        label: "Ticket",
                        variableName: "ticketId_associations_create_call",
                        value: "",
                        required: true,
                        list: [],
                        config: [
                          { key: "method", value: "post" },
                          {
                            key: "url",
                            dependOn: [
                              {
                                type: "static",
                                value:
                                  process.env.REACT_APP_DNS_URL +
                                  "hubspot/getTickets",
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
                          path: "data.tickets",
                          keys: {
                            option: { fields: ["id"] },
                            value: { fields: ["id"] },
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
                  },
                ],
                "Delete Call": [
                  {
                    type: "api",
                    label: "Get from List",
                    variableName: "id_calls",
                    value: "",
                    required: true,
                    list: [],
                    config: [
                      { key: "method", value: "post" },
                      {
                        key: "url",
                        dependOn: [
                          {
                            type: "static",
                            value:
                              process.env.REACT_APP_DNS_URL +
                              "hubspot/getCalls",
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
                      path: "data.calls",
                      keys: {
                        option: { fields: ["id"] },
                        value: { fields: ["id"] },
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
              },
            },
          ],
        },
      },
    ],
  },
};
