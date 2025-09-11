export const ZohoCRMJson = {
  category: "integration",
  type: "ZohoCRM",
  label: "ZohoCRM",
  color: "#53D2E2 ",
  docsPath: "Connectors/ZohoCRM/getting_started",
  description: "ZohoCRM integration",
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
        credType: "ZohoCRM",
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
                value:
                  process.env.REACT_APP_DNS_URL + "credentials",
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
        label: "Resource",
        value: "Account",
        variableName: "resource",
        errorSpan: "Please choose a Resource",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Account",
            value: "Account",
          },
          {
            option: "Contact",
            value: "Contact",
          },
          {
            option: "Call",
            value: "Call",
          },
          {
            option: "Deal",
            value: "Deal",
          },
          {
            option: "Lead",
            value: "Lead",
          },
        ],
        options: {
          Account: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Account",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get",
                  value: "Get Account",
                },
                {
                  option: "Create",
                  value: "Create Account",
                },
                {
                  option: "Delete",
                  value: "Delete Account",
                },
              ],
              options: {
                "Get Account": [
                  {
                    type: "api",
                    label: "Account",
                    variableName: "account_id",
                    value: "None",
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
                              "zohoCRM/listAccounts",
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
                      path: "data.accounts",
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
                "Delete Account": [
                  {
                    type: "api",
                    label: "Account",
                    variableName: "account_id",
                    value: "None",
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
                              "zohoCRM/listAccounts",
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
                      path: "data.accounts",
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
                "Create Account": [
                  {
                    type: "textfield",
                    label: "Account Name",
                    value: "",
                    required: true,
                    placeholder: "Name",
                    variableName: "Account_Name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Account Number",
                    variableName: "Account_Number_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "Account_Number",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account Site",
                    variableName: "Account_Site_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account Site",
                          variableName: "Account_Site",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account Type",
                    variableName: "Account_Type_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "Account_Type",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Analyst",
                              value: "Analyst",
                            },
                            {
                              option: "Competitor",
                              value: "Competitor",
                            },
                            {
                              option: "Customer",
                              value: "Customer",
                            },
                            {
                              option: "Distributor",
                              value: "Distributor",
                            },
                            {
                              option: "Integrator",
                              value: "Integrator",
                            },
                            {
                              option: "Investor",
                              value: "Investor",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Press",
                              value: "Press",
                            },
                            {
                              option: "Prospect",
                              value: "Prospect",
                            },
                            {
                              option: "Reseller",
                              value: "Reseller",
                            },
                            {
                              option: "Supplier",
                              value: "Supplier",
                            },
                            {
                              option: "Vendor",
                              value: "Vendor",
                            },
                            {
                              option: "Other",
                              value: "Other",
                            },
                          ],
                          options: {
                            Other: [
                              {
                                type: "textfield",
                                label: "Value",
                                value: "",
                                placeholder: "",
                                required: true,
                                variableName:
                                  "value_Account_Type_create_account",
                                hasDynamicVariable: true,
                              },
                            ],
                          },
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Annual Revenue",
                    variableName: "Annual_Revenue_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          numberField: true,
                          typeOfValue: "integer",
                          value: "",
                          placeholder: "0",
                          variableName: "Annual_Revenue",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "Description_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "Description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Employees",
                    variableName: "Employees_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "15",
                          variableName: "Employees",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Fax",
                    variableName: "Fax_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fax",
                          variableName: "Fax",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Industry",
                    variableName: "Industry_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Industry",
                          variableName: "Industry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "Phone_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "Phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Ticker Symbol",
                    variableName: "Ticker_Symbol_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Ticker Symbol",
                          variableName: "Ticker_Symbol",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "Website_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example-lb.com",
                          variableName: "Website",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Address",
                    variableName: "Billing_Address_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          label: "City",
                          placeholder: "City",
                          variableName: "Billing_City",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Zip Code",
                          placeholder: "Zip Code",
                          variableName: "Billing_Code",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Country",
                          placeholder: "Country",
                          variableName: "Billing_Country",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "State",
                          placeholder: "State",
                          variableName: "Billing_State",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Street",
                          placeholder: "Street",
                          hasDynamicVariable: true,
                          variableName: "Billing_Street",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Address",
                    variableName: "Shipping_Address_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          label: "City",
                          placeholder: "City",
                          variableName: "Shipping_City",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Zip Code",
                          placeholder: "Zip Code",
                          variableName: "Shipping_Code",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Country",
                          placeholder: "Country",
                          hasDynamicVariable: true,
                          variableName: "Shipping_Country",
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "State",
                          placeholder: "State",
                          variableName: "Shipping_State",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Street",
                          placeholder: "Street",
                          variableName: "Shipping_Street",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          Contact: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Contact",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get",
                  value: "Get Contact",
                },
                {
                  option: "Create",
                  value: "Create Contact",
                },
                {
                  option: "Delete",
                  value: "Delete Contact",
                },
              ],
              options: {
                "Get Contact": [
                  {
                    type: "api",
                    label: "Contact",
                    variableName: "contact_id",
                    value: "None",
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
                              "zohoCRM/listContacts",
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
                "Delete Contact": [
                  {
                    type: "api",
                    label: "Contact",
                    variableName: "contact_id",
                    value: "None",
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
                              "zohoCRM/listContacts",
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
                "Create Contact": [
                  {
                    type: "textfield",
                    label: "Last Name",
                    value: "",
                    required: true,
                    placeholder: "Name",
                    variableName: "Last_Name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Assistant",
                    variableName: "Assistant_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Assistant",
                          variableName: "Assistant",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Date of Birth",
                    variableName: "Date_of_Birth_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          placeholder: "YYYY-MM-DD",
                          variableName: "Date_of_Birth",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Department",
                    variableName: "Department_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Department",
                          variableName: "Department",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "Description_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "Description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "Email_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example@gmail.com",
                          variableName: "Email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Secondary Email",
                    variableName: "Secondary_Email_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example@gmail.com",
                          variableName: "Secondary_Email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Fax",
                    variableName: "Fax_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fax",
                          variableName: "Fax",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "First Name",
                    variableName: "First_Name_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "First Name",
                          variableName: "First_Name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing Address",
                    variableName: "Mailing_Address_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          label: "City",
                          placeholder: "City",
                          variableName: "Mailing_City",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Zip Code",
                          placeholder: "Zip Code",
                          variableName: "Mailing_Zip",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Country",
                          placeholder: "Country",
                          variableName: "Mailing_Country",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "State",
                          placeholder: "State",
                          variableName: "Mailing_State",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Street",
                          placeholder: "Street",
                          hasDynamicVariable: true,
                          variableName: "Mailing_Street",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile",
                    variableName: "Mobile_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile",
                          variableName: "Mobile",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Address",
                    variableName: "Other_Address_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          label: "City",
                          placeholder: "City",
                          variableName: "Other_City",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Zip Code",
                          placeholder: "Zip Code",
                          variableName: "Other_Zip",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Country",
                          placeholder: "Country",
                          variableName: "Other_Country",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "State",
                          placeholder: "State",
                          variableName: "Other_State",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Street",
                          placeholder: "Street",
                          hasDynamicVariable: true,
                          variableName: "Other_Street",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "Phone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "Phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone (Assistant)",
                    variableName: "Asst_Phone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "Asst_Phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone (Home)",
                    variableName: "Home_Phone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "Home_Phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone (Other)",
                    variableName: "Other_Phone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "Other_Phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Salutation",
                    variableName: "Salutation_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Salutation",
                          variableName: "Salutation",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Skype ID",
                    variableName: "Skype_ID_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Skype ID",
                          variableName: "Skype_ID",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Title",
                    variableName: "Title_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Title",
                          variableName: "Title",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Twitter",
                    variableName: "Twitter_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Twitter",
                          variableName: "Twitter",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          Call: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Create Call",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Create",
                  value: "Create Call",
                },
              ],
              options: {
                "Create Call": [
                  {
                    type: "dropdown",
                    label: "Call Type",
                    value: "None",
                    required: true,
                    variableName: "Call_Type_create_call",
                    list: [
                      {
                        option: "None",
                        value: "None",
                      },
                      {
                        option: "Inbound",
                        value: "Inbound",
                      },
                      {
                        option: "Outbound",
                        value: "Outbound",
                      },
                      {
                        option: "Missed",
                        value: "Missed",
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Call Start Date",
                    value: "",
                    required: true,
                    placeholder: "Call Start Date",
                    variableName: "Call_Start_Date_create_call",
                    hasDynamicVariable: true,
                    helperSpan: "DateTime format: YYYY-MM-DDTHH:mm:ss",
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Call Duration",
                    variableName: "Call_Duration_create_call",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Call Duration",
                          variableName: "Call_Duration_create_call",
                          hasDynamicVariable: true,
                          helperSpan:
                            "The time duration in HH:mm format that the call lasted for.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Subject",
                    variableName: "Subject_create_call",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Subject",
                          variableName: "Subject_create_call",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call To",
                    variableName: "Who_Id_contact_create_call",
                    fieldsArray: [
                      [
                        {
                          label: "Contact",
                          type: "api",
                          variableName: "Who_Id_contact_create_call",
                          value: "None",
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
                                    "zohoCRM/listContacts",
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
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Outbound Call Status",
                    variableName: "Outbound_Call_Status_create_call",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "Outbound_Call_Status_create_call",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Scheduled",
                              value: "Scheduled",
                            },
                            {
                              option: "Completed",
                              value: "Completed",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "Description_create_call",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "Description_create_call",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Purpose",
                    variableName: "Call_Purpose_create_call",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "Call_Purpose_create_call",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "None",
                              value: "-None-",
                            },
                            {
                              option: "Prospecting",
                              value: "Prospecting",
                            },
                            {
                              option: "Administrative",
                              value: "Administrative",
                            },
                            {
                              option: "Negotiation",
                              value: "Negotiation",
                            },
                            {
                              option: "Demo",
                              value: "Demo",
                            },
                            {
                              option: "Project",
                              value: "Project",
                            },
                            {
                              option: "Desk",
                              value: "Desk",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Related to",
                    variableName: "relatedTo",
                    fieldsArray: [
                      [
                        {
                          label: "Parent Module",
                          type: "dropdown",
                          value: "Accounts",
                          variableName: "ParentModule",
                          helperSpan:
                            "Choose a module to associate with the Parent ID.",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "Accounts",
                              value: "Accounts",
                            },
                            {
                              option: "Deals",
                              value: "Deals",
                            },
                            {
                              option: "Leads",
                              value: "Leads",
                            },
                          ],
                        },
                        {
                          type: "textfield",
                          label: "Parent ID",
                          value: "",
                          placeholder: "Parent ID",
                          variableName: "What_Id_create_call",
                          hasDynamicVariable: true,
                          helperSpan:
                            "Enter the ID for the selected Parent module (Leads, Deals, or Accounts).",
                        },
                      ],
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
                  option: "Get",
                  value: "Get Deal",
                },
                {
                  option: "Create",
                  value: "Create Deal",
                },
                {
                  option: "Delete",
                  value: "Delete Deal",
                },
              ],
              options: {
                "Get Deal": [
                  {
                    type: "api",
                    label: "Deal",
                    variableName: "deal_id",
                    value: "None",
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
                              "zohoCRM/listDeals",
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
                "Delete Deal": [
                  {
                    type: "api",
                    label: "Deal",
                    variableName: "deal_id",
                    value: "None",
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
                              "zohoCRM/listDeals",
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
                "Create Deal": [
                  {
                    type: "textfield",
                    label: "Deal Name",
                    required: true,
                    placeholder: "Deal Name",
                    value: "",
                    variableName: "Deal_Name",
                    rightSideInput: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    label: "Stage",
                    value: "Other",
                    required: true,
                    variableName: "Stage",
                    list: [
                      {
                        option: "Qualification",
                        value: "Qualification",
                      },
                      {
                        option: "Needs Analysis",
                        value: "Needs Analysis",
                      },
                      {
                        option: "Value Proposition",
                        value: "Value Proposition",
                      },
                      {
                        option: "Identify Decision Makers",
                        value: "Identify Decision Makers",
                      },
                      {
                        option: "Proposal/Price Quote",
                        value: "Proposal/Price Quote",
                      },
                      {
                        option: "Negotiation/Review",
                        value: "Negotiation/Review",
                      },
                      {
                        option: "Closed Won",
                        value: "Closed Won",
                      },
                      {
                        option: "Closed Lost to Competition",
                        value: "Closed Lost to Competition",
                      },
                      {
                        option: "Other",
                        value: "Other",
                      },
                    ],
                    options: {
                      Other: [
                        {
                          type: "textfield",
                          label: "Value",
                          value: "",
                          placeholder: "",
                          required: true,
                          variableName: "value_Stage_create_deal",
                          hasDynamicVariable: true,
                        },
                      ],
                    },
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Amount",
                    variableName: "Amount_create_deal",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "Amount",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Closing Date",
                    variableName: "Closing_Date_create_deal",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          placeholder: "YYYY-MM-DD",
                          variableName: "Closing_Date",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "Description_create_deal",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "Description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Next Step",
                    variableName: "Next_Step_create_deal",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Next Step",
                          variableName: "Next_Step",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Conversion Time",
                    variableName: "Lead_Conversion_Time_create_deal",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "0",
                          variableName: "Lead_Conversion_Time",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Overall Sales Duration",
                    variableName: "Overall_Sales_Duration_create_deal",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "0",
                          variableName: "Overall_Sales_Duration",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Probability",
                    variableName: "Probability_create_deal",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "0",
                          variableName: "Probability",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Sales Cycle Duration",
                    variableName: "Sales_Cycle_Duration_create_deal",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          typeOfValue: "integer",
                          numberField: true,
                          placeholder: "0",
                          variableName: "Sales_Cycle_Duration",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          Lead: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Lead",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get",
                  value: "Get Lead",
                },
                {
                  option: "Create",
                  value: "Create Lead",
                },
                {
                  option: "Delete",
                  value: "Delete Lead",
                },
              ],
              options: {
                "Get Lead": [
                  {
                    type: "api",
                    label: "Lead",
                    variableName: "lead_id",
                    value: "None",
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
                              "zohoCRM/listLeads",
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
                      path: "data.leads",
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
                "Delete Lead": [
                  {
                    type: "api",
                    label: "Lead",
                    variableName: "lead_id",
                    value: "None",
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
                              "zohoCRM/listLeads",
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
                      path: "data.leads",
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
                "Create Lead": [
                  {
                    type: "textfield",
                    label: "Last Name",
                    required: true,
                    placeholder: "Last Name",
                    value: "",
                    variableName: "Last_Name",
                    rightSideInput: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Company",
                    required: true,
                    placeholder: "Company",
                    value: "",
                    variableName: "Company",
                    rightSideInput: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Address",
                    variableName: "Address_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          label: "City",
                          placeholder: "City",
                          variableName: "City",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Zip Code",
                          placeholder: "Zip Code",
                          variableName: "Zip_Code",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Country",
                          placeholder: "Country",
                          variableName: "Country",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "State",
                          placeholder: "State",
                          variableName: "State",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          label: "Street",
                          placeholder: "Street",
                          variableName: "Street",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Annual Revenue",
                    variableName: "Annual_Revenue_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "Annual_Revenue",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "Description_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "Description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Designation",
                    variableName: "Designation_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Designation",
                          variableName: "Designation",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "Email_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example@gmail.com",
                          variableName: "Email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email Opt Out",
                    variableName: "Email_Opt_Out_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "Email_Opt_Out",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Fax",
                    variableName: "Fax_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fax",
                          variableName: "Fax",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "First Name",
                    variableName: "First_Name_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "First Name",
                          variableName: "First_Name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Industry",
                    variableName: "Industry_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Industry",
                          variableName: "Industry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Source",
                    variableName: "Lead_Source_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Lead Source",
                          variableName: "Lead_Source",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Status",
                    variableName: "Lead_Status_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Lead Status",
                          hasDynamicVariable: true,
                          variableName: "Lead_Status",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile",
                    variableName: "Mobile_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile",
                          variableName: "Mobile",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "Phone_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          hasDynamicVariable: true,
                          variableName: "Phone",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "No of Employees",
                    variableName: "No_of_Employees_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "No_of_Employees",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Salutation",
                    variableName: "Salutation_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Salutation",
                          variableName: "Salutation",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Skype ID",
                    variableName: "Skype_ID_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Skype ID",
                          variableName: "Skype_ID",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Secondary Email",
                    variableName: "Secondary_Email_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example@gmail.com",
                          variableName: "Secondary_Email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Twitter",
                    variableName: "Twitter_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Twitter",
                          variableName: "Twitter",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "Website_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Website",
                          variableName: "Website",
                          hasDynamicVariable: true,
                        },
                      ],
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
