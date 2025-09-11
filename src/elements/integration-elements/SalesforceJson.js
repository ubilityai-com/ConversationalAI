export const SalesforceJson = {
  "category": "integration",
  "type": "Salesforce",
  "label": "SalesForce",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Salesforce/getting_started",
  "description": "SalesForce integration",
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
        "credType": "SalesForce",
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
        value: "Account",
        variableName: "type",
        errorSpan: "Please choose a Type",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Account",
            value: "Account",
          },
          // {
          //   option: "Attachment",
          //   value: "Attachment",
          // },
          {
            option: "Case",
            value: "Case",
          },
          {
            option: "Contact",
            value: "Contact",
          },
          {
            option: "Custom Object",
            value: "Custom Object",
          },
          // {
          //   option: "Document",
          //   value: "Document",
          // },
          {
            option: "Flow",
            value: "Flow",
          },
          {
            option: "Lead",
            value: "Lead",
          },
          {
            option: "Opportunity",
            value: "Opportunity",
          },
          {
            option: "Search",
            value: "Search",
          },
          {
            option: "Task",
            value: "Task",
          },
          {
            option: "User",
            value: "User",
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
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Account",
                },
                {
                  option: "Get Many",
                  value: "List Accounts",
                },
                {
                  option: "Get Summary",
                  value: "Get Account Summary",
                },
                {
                  option: "Create",
                  value: "Create Account",
                },
                {
                  option: "Update",
                  value: "Update Account",
                },
                {
                  option: "Delete",
                  value: "Delete Account",
                },
                {
                  option: "Add Note",
                  value: "Add Note To Record",
                },
              ],
              options: {
                "Craete Account": [
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "Name",
                    required: true,
                    variableName: "name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Account Number",
                    variableName: "AccountNumber_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account Number",
                          variableName: "AccountNumber",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account Source",
                    variableName: "AccountSource_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "AccountSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                  "value_AccountSource_create_account",
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
                    variableName: "AnnualRevenue_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "0.00",
                          variableName: "AnnualRevenue",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing City",
                    variableName: "BillingCity_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing City",
                          variableName: "BillingCity",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Country",
                    variableName: "BillingCountry_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing Country",
                          variableName: "BillingCountry",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Postal Code",
                    variableName: "BillingPostalCode_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing Postal Code",
                          variableName: "BillingPostalCode",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing State",
                    variableName: "BillingState_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing State",
                          variableName: "BillingState",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Street",
                    variableName: "BillingStreet_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing Street",
                          variableName: "BillingStreet",
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
                          multiline: true,
                          minRows: 3,
                          placeholder: "Description",
                          variableName: "Description",
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
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Jigsaw",
                    variableName: "Jigsaw_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Jigsaw",
                          variableName: "Jigsaw",
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
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Number Of Employees",
                    variableName: "NumberOfEmployees_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: 0,
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "Number Of Employees",
                          variableName: "NumberOfEmployees",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "OwnerId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Parent ID",
                    variableName: "ParentId_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Parent ID",
                          variableName: "ParentId",
                          helperSpan: "Parent Account ID",
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
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "SicDesc",
                    variableName: "SicDesc_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "SicDesc",
                          variableName: "SicDesc",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "Type_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "Type",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Call",
                              value: "Call",
                            },
                            {
                              option: "Email",
                              value: "Email",
                            },
                            {
                              option: "LinkedIn",
                              value: "LinkedIn",
                            },
                            {
                              option: "List Email",
                              value: "ListEmail",
                            },
                            {
                              option: "Task",
                              value: "Task",
                            },
                            {
                              option: "Cadence",
                              value: "Cadence",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping City",
                    variableName: "ShippingCity_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping City",
                          variableName: "ShippingCity",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Country",
                    variableName: "ShippingCountry_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping Country",
                          variableName: "ShippingCountry",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Postal Code",
                    variableName: "ShippingPostalCode_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping Postal Code",
                          variableName: "ShippingPostalCode",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping State",
                    variableName: "ShippingState_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping State",
                          variableName: "ShippingState",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Street",
                    variableName: "ShippingStreet_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping Street",
                          variableName: "ShippingStreet",
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
                          placeholder: "example.company.com",
                          variableName: "Website",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_account",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_account",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "customerPriority",
                            value: "customerPriority",
                          },
                          {
                            option: "sla",
                            value: "sla",
                          },
                          {
                            option: "active",
                            value: "active",
                          },
                          {
                            option: "numberofLocations",
                            value: "numberofLocations",
                          },
                          {
                            option: "upsellOpportunity",
                            value: "upsellOpportunity",
                          },
                          {
                            option: "slaSerialNumber",
                            value: "slaSerialNumber",
                          },
                          {
                            option: "slaExpirationDate",
                            value: "slaExpirationDate",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                
                "Get Account": [
                  {
                    type: "api",
                    label: "Account",
                    variableName: "accountId",
                    value: "None",
                    required: true,
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
                              "salesforce/listAccounts",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "List Accounts": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_list_accounts",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fields",
                          variableName: "fields",
                          helperSpan: "Fields to include separated by ,",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Condition",
                    variableName: "conditions_list_accounts",
                    structure: [
                      {
                        type: "row",
                        title: "Condition",
                        variableName: "conditions_list_accounts",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        required: true,
                        placeholder: "field='example'",
                        variableName: "conditions",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Account Summary": [
                ],
                "Create Account": [
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "Name",
                    required: true,
                    variableName: "name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Account Number",
                    variableName: "AccountNumber_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account Number",
                          variableName: "AccountNumber",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account Source",
                    variableName: "AccountSource_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "AccountSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                  "value_AccountSource_create_account",
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
                    variableName: "AnnualRevenue_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "0.00",
                          variableName: "AnnualRevenue",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing City",
                    variableName: "BillingCity_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing City",
                          variableName: "BillingCity",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Country",
                    variableName: "BillingCountry_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing Country",
                          variableName: "BillingCountry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Postal Code",
                    variableName: "BillingPostalCode_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing Postal Code",
                          variableName: "BillingPostalCode",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing State",
                    variableName: "BillingState_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing State",
                          variableName: "BillingState",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Street",
                    variableName: "BillingStreet_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing Street",
                          variableName: "BillingStreet",
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
                          multiline: true,
                          minRows: 3,
                          placeholder: "Description",
                          variableName: "Description",
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
                    accTitle: "Jigsaw",
                    variableName: "Jigsaw_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Jigsaw",
                          variableName: "Jigsaw",
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
                    accTitle: "Number Of Employees",
                    variableName: "NumberOfEmployees_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: 0,
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "Number Of Employees",
                          variableName: "NumberOfEmployees",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "OwnerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Parent ID",
                    variableName: "ParentId_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Parent ID",
                          variableName: "ParentId",
                          helperSpan: "Parent Account ID",
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
                    accTitle: "SicDesc",
                    variableName: "SicDesc_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "SicDesc",
                          variableName: "SicDesc",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "Type_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "Type",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Call",
                              value: "Call",
                            },
                            {
                              option: "Email",
                              value: "Email",
                            },
                            {
                              option: "LinkedIn",
                              value: "LinkedIn",
                            },
                            {
                              option: "List Email",
                              value: "ListEmail",
                            },
                            {
                              option: "Task",
                              value: "Task",
                            },
                            {
                              option: "Cadence",
                              value: "Cadence",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping City",
                    variableName: "ShippingCity_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping City",
                          variableName: "ShippingCity",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Country",
                    variableName: "ShippingCountry_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping Country",
                          variableName: "ShippingCountry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Postal Code",
                    variableName: "ShippingPostalCode_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping Postal Code",
                          variableName: "ShippingPostalCode",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping State",
                    variableName: "ShippingState_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping State",
                          variableName: "ShippingState",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Street",
                    variableName: "ShippingStreet_create_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping Street",
                          variableName: "ShippingStreet",
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
                          placeholder: "example.company.com",
                          variableName: "Website",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_account",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_account",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "customerPriority",
                            value: "customerPriority",
                          },
                          {
                            option: "sla",
                            value: "sla",
                          },
                          {
                            option: "active",
                            value: "active",
                          },
                          {
                            option: "numberofLocations",
                            value: "numberofLocations",
                          },
                          {
                            option: "upsellOpportunity",
                            value: "upsellOpportunity",
                          },
                          {
                            option: "slaSerialNumber",
                            value: "slaSerialNumber",
                          },
                          {
                            option: "slaExpirationDate",
                            value: "slaExpirationDate",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Update Account": [
                  {
                    type: "api",
                    label: "Account",
                    variableName: "accountId",
                    value: "None",
                    required: true,
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
                              "salesforce/listAccounts",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Name",
                    variableName: "name_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account Number",
                    variableName: "AccountNumber_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account Number",
                          variableName: "AccountNumber",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account Source",
                    variableName: "AccountSource_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "AccountSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                  "value_AccountSource_update_account",
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
                    variableName: "AnnualRevenue_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "0.00",
                          variableName: "AnnualRevenue",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing City",
                    variableName: "BillingCity_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing City",
                          variableName: "BillingCity",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Country",
                    variableName: "BillingCountry_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing Country",
                          variableName: "BillingCountry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Postal Code",
                    variableName: "BillingPostalCode_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing Postal Code",
                          variableName: "BillingPostalCode",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing State",
                    variableName: "BillingState_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing State",
                          variableName: "BillingState",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Street",
                    variableName: "BillingStreet_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Billing Street",
                          variableName: "BillingStreet",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "Description_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          multiline: true,
                          minRows: 3,
                          placeholder: "Description",
                          variableName: "Description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Fax",
                    variableName: "Fax_update_account",
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
                    accTitle: "Jigsaw",
                    variableName: "Jigsaw_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Jigsaw",
                          variableName: "Jigsaw",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Industry",
                    variableName: "Industry_update_account",
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
                    accTitle: "Number Of Employees",
                    variableName: "NumberOfEmployees_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: 0,
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "Number Of Employees",
                          variableName: "NumberOfEmployees",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "OwnerId_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "OwnerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Parent ID",
                    variableName: "ParentId_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Parent ID",
                          variableName: "ParentId",
                          helperSpan: "Parent Account ID",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "Phone_update_account",
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
                    accTitle: "SicDesc",
                    variableName: "SicDesc_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "SicDesc",
                          variableName: "SicDesc",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "Type_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "Type",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Call",
                              value: "Call",
                            },
                            {
                              option: "Email",
                              value: "Email",
                            },
                            {
                              option: "LinkedIn",
                              value: "LinkedIn",
                            },
                            {
                              option: "List Email",
                              value: "ListEmail",
                            },
                            {
                              option: "Task",
                              value: "Task",
                            },
                            {
                              option: "Cadence",
                              value: "Cadence",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping City",
                    variableName: "ShippingCity_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping City",
                          variableName: "ShippingCity",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Country",
                    variableName: "ShippingCountry_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping Country",
                          variableName: "ShippingCountry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Postal Code",
                    variableName: "ShippingPostalCode_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping Postal Code",
                          variableName: "ShippingPostalCode",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping State",
                    variableName: "ShippingState_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping State",
                          variableName: "ShippingState",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Street",
                    variableName: "ShippingStreet_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Shipping Street",
                          variableName: "ShippingStreet",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "Website_update_account",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example.company.com",
                          variableName: "Website",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_update_account",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_update_account",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "customerPriority",
                            value: "customerPriority",
                          },
                          {
                            option: "sla",
                            value: "sla",
                          },
                          {
                            option: "active",
                            value: "active",
                          },
                          {
                            option: "numberofLocations",
                            value: "numberofLocations",
                          },
                          {
                            option: "upsellOpportunity",
                            value: "upsellOpportunity",
                          },
                          {
                            option: "slaSerialNumber",
                            value: "slaSerialNumber",
                          },
                          {
                            option: "slaExpirationDate",
                            value: "slaExpirationDate",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Delete Account": [
                  {
                    type: "api",
                    label: "Account",
                    variableName: "accountId",
                    value: "None",
                    required: true,
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
                              "salesforce/listAccounts",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "Add Note To Record": [
                  {
                    type: "api",
                    label: "Account",
                    variableName: "parentId",
                    value: "None",
                    required: true,
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
                              "salesforce/listAccounts",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Title",
                    value: "",
                    required: true,
                    placeholder: "Title",
                    variableName: "title",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Body",
                    variableName: "body_add_note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Body",
                          variableName: "body",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_add_Note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Private",
                    variableName: "isPrivate_add_note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isPrivate",
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          Attachment: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Attachment",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Attachment",
                },
                {
                  option: "Get Many",
                  value: "List Attachments",
                },
                {
                  option: "Get Summary",
                  value: "Get Attachment Summary",
                },
                {
                  option: "Create",
                  value: "Create Attachment",
                },
                {
                  option: "Update",
                  value: "Update Attachment",
                },
                {
                  option: "Delete",
                  value: "Delete Attachment",
                },
              ],
              options: {
                "Craete Attachment": [
                  {
                    type: "textfield",
                    label: "Parent ID",
                    value: "",
                    placeholder: "Parent ID",
                    required: true,
                    variableName: "parentId",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "file.txt",
                    helperSpan:
                      "Please don't input special characters and make sure to input the extension at the end e.g(.png,.txt,.csv) ",
                    required: true,
                    variableName: "name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    label: "Upload Type",
                    value: "Binary",
                    variableName: "uploadType",
                    errorSpan: "Please choose a type",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "Binary",
                        value: "Binary",
                      },
                      {
                        option: "Url",
                        value: "Url",
                      },
                    ],
                    options: {
                      Binary: [
                        {
                          type: "textfield",
                          minRows: "5",
                          multiline: true,
                          label: "Binary",
                          value: "",
                          placeholder: "Binary",
                          required: true,
                          variableName: "binary",
                          rightSideInput: true,
                          hasDynamicVariable: true,
                        },
                      ],
                      Url: [
                        {
                          type: "textfield",
                          label: "Url",
                          value: "",
                          placeholder: "Url",
                          required: true,
                          variableName: "url",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    },
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_create_attachment",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "OwnerId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Private",
                    variableName: "isPrivate_create_attachment",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isPrivate",
                        },
                      ],
                    ],
                  },
                ],
                "Get Attachment": [
                  {
                    type: "api",
                    label: "Attachment",
                    variableName: "attachmentId",
                    value: "None",
                    required: true,
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
                              "salesforce/listAttachments",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.attachments",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "List Attachments": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_list_attachments",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fields",
                          variableName: "fields",
                          helperSpan: "Fields to include separated by ,",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Condition",
                    variableName: "conditions_list_attachments",
                    structure: [
                      {
                        type: "row",
                        title: "Condition",
                        variableName: "conditions_list_attachments",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        required: true,
                        placeholder: "field='example'",
                        variableName: "conditions",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Attachment Summary": [
                ],
                "Create Attachment": [
                  {
                    type: "textfield",
                    label: "Parent ID",
                    value: "",
                    placeholder: "Parent ID",
                    required: true,
                    variableName: "parentId",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "file.txt",
                    helperSpan:
                      "Please don't input special characters and make sure to input the extension at the end e.g(.png,.txt,.csv) ",
                    required: true,
                    variableName: "name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    label: "Upload Type",
                    value: "Binary",
                    variableName: "uploadType",
                    errorSpan: "Please choose a type",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "Binary",
                        value: "Binary",
                      },
                      {
                        option: "Url",
                        value: "Url",
                      },
                    ],
                    options: {
                      Binary: [
                        {
                          type: "textfield",
                          minRows: "5",
                          multiline: true,
                          label: "Binary",
                          value: "",
                          placeholder: "Binary",
                          required: true,
                          variableName: "binary",
                          rightSideInput: true,
                          hasDynamicVariable: true,
                        },
                      ],
                      Url: [
                        {
                          type: "textfield",
                          label: "Url",
                          value: "",
                          placeholder: "Url",
                          required: true,
                          variableName: "url",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    },
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_create_attachment",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "OwnerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Private",
                    variableName: "isPrivate_create_attachment",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isPrivate",
                        },
                      ],
                    ],
                  },
                ],
                "Update Attachment": [
                  {
                    type: "api",
                    label: "Attachment",
                    variableName: "attachmentId",
                    value: "None",
                    required: true,
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
                              "salesforce/listAttachments",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.attachments",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
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
                    accTitle: "Name",
                    variableName: "name_update_attachment",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "file.txt",
                          helperSpan:
                            "Please don't input special characters, make sure to input the extension at the end e.g(.png,.txt,.csv) and set the same existed extension ",
                          variableName: "name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_update_attachment",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "OwnerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Private",
                    variableName: "isPrivate_update_attachment",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isPrivate",
                        },
                      ],
                    ],
                  },
                ],
                "Delete Attachment": [
                  {
                    type: "api",
                    label: "Attachment",
                    variableName: "attachmentId",
                    value: "None",
                    required: true,
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
                              "salesforce/listAttachments",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.attachments",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
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
          Case: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Case",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get",
                  value: "Get Case",
                },
                {
                  option: "Get Many",
                  value: "List Cases",
                },
                {
                  option: "Get Summary",
                  value: "Get Case Summary",
                },
                {
                  option: "Create",
                  value: "Create Case",
                },
                {
                  option: "Update",
                  value: "Update Case",
                },
                {
                  option: "Delete",
                  value: "Delete Case",
                },
                {
                  option: "Add Comment",
                  value: "Add Comment To Case",
                },
              ],
              options: {
                "Craete Case": [
                  {
                    type: "dropdown",
                    label: "Type",
                    value: "Other",
                    required: true,
                    variableName: "type_create_case",
                    list: [
                      {
                        option: "Feature Request",
                        value: "Feature Request",
                      },
                      {
                        option: "Problem",
                        value: "Problem",
                      },
                      {
                        option: "Question",
                        value: "Question",
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
                          variableName: "value_type_create_case",
                          hasDynamicVariable: true,
                        },
                      ],
                    },
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Contact ID",
                    variableName: "contactId_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Contact ID",
                          variableName: "contactId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account ID",
                    variableName: "accountId_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account ID",
                          variableName: "accountId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Parent ID",
                    variableName: "parentId_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Parent ID",
                          variableName: "parentId",
                          helperSpan: "Parent Case ID",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Name",
                    variableName: "SuppliedName_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Supplied Name",
                          variableName: "SuppliedName",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Email",
                    variableName: "SuppliedEmail_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example@gmail.com",
                          variableName: "SuppliedEmail",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Phone",
                    variableName: "SuppliedPhone_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Supplied Phone",
                          variableName: "SuppliedPhone",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Company",
                    variableName: "SuppliedCompany_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Supplied Company",
                          variableName: "SuppliedCompany",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Status",
                    variableName: "status_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "status",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Closed",
                              value: "Closed",
                            },
                            {
                              option: "Escalated",
                              value: "Escalated",
                            },
                            {
                              option: "Waiting on Customer",
                              value: "Waiting on Customer",
                            },
                            {
                              option: "New",
                              value: "New",
                            },
                            {
                              option: "Working",
                              value: "Working",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Reason",
                    variableName: "reason_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "reason",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Complex functionality",
                              value: "Complex functionality",
                            },
                            {
                              option: "Existing problem",
                              value: "Existing problem",
                            },
                            {
                              option: "Instructions not clear",
                              value: "Instructions not clear",
                            },
                            {
                              option: "New problem",
                              value: "New problem",
                            },
                            {
                              option: "User didn't attend training",
                              value: "User didn't attend training",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Origin",
                    variableName: "origin_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "origin",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Email",
                              value: "Email",
                            },
                            {
                              option: "Phone",
                              value: "Phone",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Subject",
                    variableName: "subject_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Subject",
                          variableName: "subject",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "priority_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "priority",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "High",
                              value: "High",
                            },
                            {
                              option: "Low",
                              value: "Low",
                            },
                            {
                              option: "Medium",
                              value: "Medium",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "is Escalated",
                    variableName: "isEscalated_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isEscalated",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner Id",
                    variableName: "ownerId_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner Id",
                          variableName: "ownerId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_case",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_case",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "engineeringReqNumber",
                            value: "engineeringReqNumber",
                          },
                          {
                            option: "SLAViolation",
                            value: "SLAViolation",
                          },
                          {
                            option: "product",
                            value: "product",
                          },
                          {
                            option: "potentialLiability",
                            value: "potentialLiability",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Case": [
                  {
                    type: "api",
                    label: "Case",
                    variableName: "caseId",
                    value: "None",
                    required: true,
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
                              "salesforce/listCases",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.cases",
                      keys: {
                        option: {
                          fields: ["id"],
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "List Cases": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_list_cases",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fields",
                          variableName: "fields",
                          helperSpan: "Fields to include separated by ,",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Condition",
                    variableName: "conditions_list_cases",
                    structure: [
                      {
                        type: "row",
                        title: "Condition",
                        variableName: "conditions_list_cases",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        required: true,
                        placeholder: "field='example'",
                        variableName: "conditions",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Case Summary": [
                ],
                "Create Case": [
                  {
                    type: "dropdown",
                    label: "Type",
                    value: "Other",
                    required: true,
                    variableName: "type_create_case",
                    list: [
                      {
                        option: "Feature Request",
                        value: "Feature Request",
                      },
                      {
                        option: "Problem",
                        value: "Problem",
                      },
                      {
                        option: "Question",
                        value: "Question",
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
                          variableName: "value_type_create_case",
                          hasDynamicVariable: true,
                        },
                      ],
                    },
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Contact ID",
                    variableName: "contactId_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Contact ID",
                          variableName: "contactId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account ID",
                    variableName: "accountId_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account ID",
                          variableName: "accountId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Parent ID",
                    variableName: "parentId_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Parent ID",
                          variableName: "parentId",
                          helperSpan: "Parent Case ID",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Name",
                    variableName: "SuppliedName_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Supplied Name",
                          variableName: "SuppliedName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Email",
                    variableName: "SuppliedEmail_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example@gmail.com",
                          variableName: "SuppliedEmail",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Phone",
                    variableName: "SuppliedPhone_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Supplied Phone",
                          variableName: "SuppliedPhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Company",
                    variableName: "SuppliedCompany_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Supplied Company",
                          variableName: "SuppliedCompany",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Status",
                    variableName: "status_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "status",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Closed",
                              value: "Closed",
                            },
                            {
                              option: "Escalated",
                              value: "Escalated",
                            },
                            {
                              option: "Waiting on Customer",
                              value: "Waiting on Customer",
                            },
                            {
                              option: "New",
                              value: "New",
                            },
                            {
                              option: "Working",
                              value: "Working",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Reason",
                    variableName: "reason_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "reason",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Complex functionality",
                              value: "Complex functionality",
                            },
                            {
                              option: "Existing problem",
                              value: "Existing problem",
                            },
                            {
                              option: "Instructions not clear",
                              value: "Instructions not clear",
                            },
                            {
                              option: "New problem",
                              value: "New problem",
                            },
                            {
                              option: "User didn't attend training",
                              value: "User didn't attend training",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Origin",
                    variableName: "origin_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "origin",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Email",
                              value: "Email",
                            },
                            {
                              option: "Phone",
                              value: "Phone",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Subject",
                    variableName: "subject_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Subject",
                          variableName: "subject",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "priority_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "priority",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "High",
                              value: "High",
                            },
                            {
                              option: "Low",
                              value: "Low",
                            },
                            {
                              option: "Medium",
                              value: "Medium",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "is Escalated",
                    variableName: "isEscalated_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isEscalated",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner Id",
                    variableName: "ownerId_create_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner Id",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_case",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_case",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "engineeringReqNumber",
                            value: "engineeringReqNumber",
                          },
                          {
                            option: "SLAViolation",
                            value: "SLAViolation",
                          },
                          {
                            option: "product",
                            value: "product",
                          },
                          {
                            option: "potentialLiability",
                            value: "potentialLiability",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Update Case": [
                  {
                    type: "api",
                    label: "Case",
                    variableName: "caseId",
                    value: "None",
                    required: true,
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
                              "salesforce/listCases",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.cases",
                      keys: {
                        option: {
                          fields: ["id"],
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
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
                    accTitle: "Type",
                    variableName: "type_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "type",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Feature Request",
                              value: "Feature Request",
                            },
                            {
                              option: "Problem",
                              value: "Problem",
                            },
                            {
                              option: "Question",
                              value: "Question",
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
                                variableName: "value_type_update_case",
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
                    accTitle: "Contact ID",
                    variableName: "contactId_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Contact ID",
                          variableName: "contactId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account ID",
                    variableName: "accountId_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account ID",
                          variableName: "accountId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Parent ID",
                    variableName: "parentId_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Parent ID",
                          variableName: "parentId",
                          helperSpan: "Parent Case ID",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Name",
                    variableName: "SuppliedName_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Supplied Name",
                          variableName: "SuppliedName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Email",
                    variableName: "SuppliedEmail_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Supplied Email",
                          variableName: "SuppliedEmail",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Phone",
                    variableName: "SuppliedPhone_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Supplied Phone",
                          variableName: "SuppliedPhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Supplied Company",
                    variableName: "SuppliedCompany_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Supplied Company",
                          variableName: "SuppliedCompany",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Status",
                    variableName: "status_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "status",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Closed",
                              value: "Closed",
                            },
                            {
                              option: "Escalated",
                              value: "Escalated",
                            },
                            {
                              option: "Waiting on Customer",
                              value: "Waiting on Customer",
                            },
                            {
                              option: "New",
                              value: "New",
                            },
                            {
                              option: "Working",
                              value: "Working",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Reason",
                    variableName: "reason_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "reason",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Complex functionality",
                              value: "Complex functionality",
                            },
                            {
                              option: "Existing problem",
                              value: "Existing problem",
                            },
                            {
                              option: "Instructions not clear",
                              value: "Instructions not clear",
                            },
                            {
                              option: "New problem",
                              value: "New problem",
                            },
                            {
                              option: "User didn't attend training",
                              value: "User didn't attend training",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Origin",
                    variableName: "origin_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "origin",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Email",
                              value: "Email",
                            },
                            {
                              option: "Phone",
                              value: "Phone",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Subject",
                    variableName: "subject_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Subject",
                          variableName: "subject",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "priority_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "priority",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "High",
                              value: "High",
                            },
                            {
                              option: "Low",
                              value: "Low",
                            },
                            {
                              option: "Medium",
                              value: "Medium",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "is Escalated",
                    variableName: "isEscalated_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isEscalated",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner Id",
                    variableName: "ownerId_update_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner Id",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_update_case",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_update_case",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "engineeringReqNumber",
                            value: "engineeringReqNumber",
                          },
                          {
                            option: "SLAViolation",
                            value: "SLAViolation",
                          },
                          {
                            option: "product",
                            value: "product",
                          },
                          {
                            option: "potentialLiability",
                            value: "potentialLiability",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Delete Case": [
                  {
                    type: "api",
                    label: "Case",
                    variableName: "caseId",
                    value: "None",
                    required: true,
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
                              "salesforce/listCases",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.cases",
                      keys: {
                        option: {
                          fields: ["id"],
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "Add Comment To Case": [
                  {
                    type: "api",
                    label: "Case",
                    variableName: "caseId",
                    value: "None",
                    required: true,
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
                              "salesforce/listCases",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.cases",
                      keys: {
                        option: {
                          fields: ["id"],
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
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
                    accTitle: "Comment Body",
                    variableName: "commentBody_add_comment_to_case",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Comment Body",
                          variableName: "commentBody",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Published",
                    variableName: "isPublished_add_comment_to_case",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isPublished",
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
                  option: "Add Note",
                  value: "Add Note To Record",
                },
                {
                  option: "Get",
                  value: "Get Contact",
                },
                {
                  option: "Get Many",
                  value: "List Contacts",
                },
                {
                  option: "Get Summary",
                  value: "Get Contact Summary",
                },
                {
                  option: "Create",
                  value: "Create Contact",
                },
                {
                  option: "Update",
                  value: "Update Contact",
                },
                {
                  option: "Delete",
                  value: "Delete Contact",
                },
                {
                  option: "Add Contact To Campaign",
                  value: "Add Contact To Campaign",
                },
              ],
              options: {
                "Craete Contact": [
                  {
                    type: "textfield",
                    label: "Last Name",
                    value: "",
                    placeholder: "Last Name",
                    required: true,
                    variableName: "lastName",
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Salutation",
                    variableName: "salutation_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "Mr.",
                          variableName: "salutation",
                          list: [
                            {
                              option: "Mr.",
                              value: "Mr.",
                            },
                            {
                              option: "Ms.",
                              value: "Ms.",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "First Name",
                    variableName: "firstName_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "First Name",
                          variableName: "firstName",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Title",
                    variableName: "title_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Title",
                          variableName: "title",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Department",
                    variableName: "department_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Department",
                          variableName: "department",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Record ID",
                    variableName: "masterRecordId_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Record ID",
                          variableName: "MasterRecordId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account ID",
                    variableName: "accountId_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account ID",
                          variableName: "accountId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example@gmail.com",
                          variableName: "email",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Street",
                    variableName: "otherStreet_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Street",
                          variableName: "otherStreet",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other City",
                    variableName: "otherCity_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other City",
                          variableName: "otherCity",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other State",
                    variableName: "otherState_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other State",
                          variableName: "otherState",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Postal Code",
                    variableName: "otherPostalCode_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Postal Code",
                          variableName: "otherPostalCode",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Country",
                    variableName: "otherCountry_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Country",
                          variableName: "otherCountry",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing Street",
                    variableName: "mailingStreet_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          multiline: true,
                          minRows: 2,
                          placeholder: "Mailing Street",
                          variableName: "mailingStreet",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing City",
                    variableName: "mailingCity_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing City",
                          variableName: "mailingCity",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing State",
                    variableName: "mailingState_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing State",
                          variableName: "mailingState",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing Postal Code",
                    variableName: "mailingPostalCode_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing Postal Code",
                          variableName: "mailingPostalCode",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing Country",
                    variableName: "mailingCountry_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing Country",
                          variableName: "mailingCountry",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Fax",
                    variableName: "fax_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fax",
                          variableName: "fax",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile Phone",
                    variableName: "mobilePhone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile Phone",
                          variableName: "mobilePhone",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Home Phone",
                    variableName: "homePhone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Home Phone",
                          variableName: "homePhone",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Phone",
                    variableName: "otherPhone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Phone",
                          variableName: "otherPhone",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assistant Name",
                    variableName: "assistantName_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Assistant Name",
                          variableName: "assistantName",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assistant Phone",
                    variableName: "assistantPhone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Assistant Phone",
                          variableName: "assistantPhone",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Source",
                    variableName: "leadSource_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "leadSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                variableName: "value_leadSource_create_contact",
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
                    accTitle: "Birthdate",
                    variableName: "birthdate_create_contact",
                    fieldsArray: [
                      [
                        {
                          date: true,
                          type: "textfield",
                          value: "",
                          placeholder: "Birthdate",
                          variableName: "birthdate",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner Id",
                    variableName: "ownerId_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner Id",
                          variableName: "ownerId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email Bounced Reason",
                    variableName: "emailBouncedReason_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email Bounced Reason",
                          variableName: "emailBouncedReason",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email Bounced Date",
                    variableName: "emailBouncedDate_create_contact",
                    fieldsArray: [
                      [
                        {
                          date: true,
                          label: "Date",
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Date",
                          variableName: "date",
                        },
                        {
                          label: "Time",
                          timeWithSeconds: true,
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Time",
                          variableName: "time",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Jigsaw",
                    variableName: "Jigsaw_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Jigsaw",
                          variableName: "Jigsaw",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_contact",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_contact",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "level",
                            value: "level",
                          },
                          {
                            option: "languages",
                            value: "languages",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Contact": [
                  {
                    type: "api",
                    label: "Contact",
                    variableName: "contactId",
                    value: "None",
                    required: true,
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
                              "salesforce/listContacts",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "List Contacts": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_list_contacts",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fields",
                          variableName: "fields",
                          helperSpan: "Fields to include separated by ,",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Condition",
                    variableName: "conditions_list_contacts",
                    structure: [
                      {
                        type: "row",
                        title: "Condition",
                        variableName: "conditions_list_contacts",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        required: true,
                        placeholder: "field='example'",
                        variableName: "conditions",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Contact Summary": [
                ],
                "Create Contact": [
                  {
                    type: "textfield",
                    label: "Last Name",
                    value: "",
                    placeholder: "Last Name",
                    required: true,
                    variableName: "lastName",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Salutation",
                    variableName: "salutation_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "Mr.",
                          variableName: "salutation",
                          list: [
                            {
                              option: "Mr.",
                              value: "Mr.",
                            },
                            {
                              option: "Ms.",
                              value: "Ms.",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "First Name",
                    variableName: "firstName_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "First Name",
                          variableName: "firstName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Title",
                    variableName: "title_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Title",
                          variableName: "title",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Department",
                    variableName: "department_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Department",
                          variableName: "department",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Record ID",
                    variableName: "masterRecordId_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Record ID",
                          variableName: "MasterRecordId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account ID",
                    variableName: "accountId_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account ID",
                          variableName: "accountId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example@gmail.com",
                          variableName: "email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Street",
                    variableName: "otherStreet_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Street",
                          variableName: "otherStreet",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other City",
                    variableName: "otherCity_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other City",
                          variableName: "otherCity",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other State",
                    variableName: "otherState_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other State",
                          variableName: "otherState",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Postal Code",
                    variableName: "otherPostalCode_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Postal Code",
                          variableName: "otherPostalCode",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Country",
                    variableName: "otherCountry_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Country",
                          variableName: "otherCountry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing Street",
                    variableName: "mailingStreet_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          multiline: true,
                          minRows: 2,
                          placeholder: "Mailing Street",
                          variableName: "mailingStreet",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing City",
                    variableName: "mailingCity_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing City",
                          variableName: "mailingCity",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing State",
                    variableName: "mailingState_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing State",
                          variableName: "mailingState",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing Postal Code",
                    variableName: "mailingPostalCode_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing Postal Code",
                          variableName: "mailingPostalCode",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing Country",
                    variableName: "mailingCountry_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing Country",
                          variableName: "mailingCountry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Fax",
                    variableName: "fax_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fax",
                          variableName: "fax",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile Phone",
                    variableName: "mobilePhone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile Phone",
                          variableName: "mobilePhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Home Phone",
                    variableName: "homePhone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Home Phone",
                          variableName: "homePhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Phone",
                    variableName: "otherPhone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Phone",
                          variableName: "otherPhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assistant Name",
                    variableName: "assistantName_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Assistant Name",
                          variableName: "assistantName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assistant Phone",
                    variableName: "assistantPhone_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Assistant Phone",
                          variableName: "assistantPhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Source",
                    variableName: "leadSource_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "leadSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                variableName: "value_leadSource_create_contact",
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
                    accTitle: "Birthdate",
                    variableName: "birthdate_create_contact",
                    fieldsArray: [
                      [
                        {
                          date: true,
                          type: "textfield",
                          value: "",
                          placeholder: "Birthdate",
                          variableName: "birthdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner Id",
                    variableName: "ownerId_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner Id",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email Bounced Reason",
                    variableName: "emailBouncedReason_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email Bounced Reason",
                          variableName: "emailBouncedReason",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email Bounced Date",
                    variableName: "emailBouncedDate_create_contact",
                    fieldsArray: [
                      [
                        {
                          date: true,
                          label: "Date",
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Date",
                          variableName: "date",
                          hasDynamicVariable: true,
                        },
                        {
                          label: "Time",
                          timeWithSeconds: true,
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Time",
                          variableName: "time",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Jigsaw",
                    variableName: "Jigsaw_create_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Jigsaw",
                          variableName: "Jigsaw",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_contact",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_contact",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "level",
                            value: "level",
                          },
                          {
                            option: "languages",
                            value: "languages",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Update Contact": [
                  {
                    type: "api",
                    label: "Contact",
                    variableName: "contactId",
                    value: "None",
                    required: true,
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
                              "salesforce/listContacts",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
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
                    accTitle: "Salutation",
                    variableName: "salutation_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "salutation",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Mr.",
                              value: "Mr.",
                            },
                            {
                              option: "Ms.",
                              value: "Ms.",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "First Name",
                    variableName: "firstName_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "First Name",
                          variableName: "firstName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Last Name",
                    variableName: "lastName_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Last Name",
                          variableName: "lastName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Title",
                    variableName: "title_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Title",
                          variableName: "title",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Department",
                    variableName: "department_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Department",
                          variableName: "department",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Record ID",
                    variableName: "masterRecordId_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Record ID",
                          variableName: "MasterRecordId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account ID",
                    variableName: "accountId_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account ID",
                          variableName: "accountId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "example@gmail.com",
                          variableName: "email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Street",
                    variableName: "otherStreet_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Street",
                          variableName: "otherStreet",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other City",
                    variableName: "otherCity_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other City",
                          variableName: "otherCity",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other State",
                    variableName: "otherState_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other State",
                          variableName: "otherState",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Postal Code",
                    variableName: "otherPostalCode_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Postal Code",
                          variableName: "otherPostalCode",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Country",
                    variableName: "otherCountry_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Country",
                          variableName: "otherCountry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing Street",
                    variableName: "mailingStreet_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          multiline: true,
                          minRows: 2,
                          placeholder: "Mailing Street",
                          variableName: "mailingStreet",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing City",
                    variableName: "mailingCity_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing City",
                          variableName: "mailingCity",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing State",
                    variableName: "mailingState_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing State",
                          variableName: "mailingState",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing Postal Code",
                    variableName: "mailingPostalCode_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing Postal Code",
                          variableName: "mailingPostalCode",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mailing Country",
                    variableName: "mailingCountry_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mailing Country",
                          variableName: "mailingCountry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Fax",
                    variableName: "fax_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fax",
                          variableName: "fax",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile Phone",
                    variableName: "mobilePhone_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile Phone",
                          variableName: "mobilePhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Home Phone",
                    variableName: "homePhone_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Home Phone",
                          variableName: "homePhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Phone",
                    variableName: "otherPhone_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Other Phone",
                          variableName: "otherPhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assistant Name",
                    variableName: "assistantName_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Assistant Name",
                          variableName: "assistantName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Assistant Phone",
                    variableName: "assistantPhone_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Assistant Phone",
                          variableName: "assistantPhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Source",
                    variableName: "leadSource_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "leadSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                variableName: "value_leadSource_update_contact",
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
                    accTitle: "Birthdate",
                    variableName: "birthdate_update_contact",
                    fieldsArray: [
                      [
                        {
                          date: true,
                          type: "textfield",
                          value: "",
                          placeholder: "Birthdate",
                          variableName: "birthdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner Id",
                    variableName: "ownerId_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner Id",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email Bounced Reason",
                    variableName: "emailBouncedReason_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email Bounced Reason",
                          variableName: "emailBouncedReason",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email Bounced Date",
                    variableName: "emailBouncedDate_update_contact",
                    fieldsArray: [
                      [
                        {
                          date: true,
                          label: "Date",
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Date",
                          variableName: "date",
                          hasDynamicVariable: true,
                        },
                        {
                          label: "Time",
                          timeWithSeconds: true,
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Time",
                          variableName: "time",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Jigsaw",
                    variableName: "Jigsaw_update_contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Jigsaw",
                          variableName: "Jigsaw",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_update_contact",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_update_contact",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "level",
                            value: "level",
                          },
                          {
                            option: "languages",
                            value: "languages",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Delete Contact": [
                  {
                    type: "api",
                    label: "Contact",
                    variableName: "contactId",
                    value: "None",
                    required: true,
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
                              "salesforce/listContacts",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "Add Contact To Campaign": [
                  {
                    type: "api",
                    label: "Contact",
                    variableName: "contactId",
                    value: "None",
                    required: true,
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
                              "salesforce/listContacts",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "api",
                    label: "Campaign",
                    variableName: "campaignId",
                    value: "None",
                    required: true,
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
                              "salesforce/listCampaigns",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.campaigns",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
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
                    accTitle: "Status",
                    variableName: "status_add_contact_to_campaign",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "status",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Sent",
                              value: "Sent",
                            },
                            {
                              option: "Responded",
                              value: "Responded",
                            },
                            {
                              option: "Not Interested",
                              value: "Not Interested",
                            },
                            {
                              option: "Do Not Call",
                              value: "Do Not Call",
                            },
                            {
                              option: "Attended",
                              value: "Attended",
                            },
                            {
                              option: "Converted",
                              value: "Converted",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Add Note To Record": [
                  {
                    type: "api",
                    label: "Contact",
                    variableName: "parentId",
                    value: "None",
                    required: true,
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
                              "salesforce/listContacts",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Title",
                    value: "",
                    required: true,
                    placeholder: "Title",
                    variableName: "title",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Body",
                    variableName: "body_add_note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Body",
                          variableName: "body",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_add_Note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Private",
                    variableName: "isPrivate_add_note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isPrivate",
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          "Custom Object": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Custom Obj",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get a custom object record",
                  value: "Get Custom Obj",
                },
                {
                  option: "Get many custom object records",
                  value: "ListCustom Objs",
                },
                {
                  option: "Create a custom object record",
                  value: "Create Custom Obj",
                },
                {
                  option: "Update a custom object record",
                  value: "Update Custom Obj",
                },
                {
                  option: "Delete a custom object record",
                  value: "Delete Custom Obj",
                },
              ],
              options: {
                "Craete Custom Obj": [
                  {
                    type: "textfield",
                    label: "Custom Object Name",
                    value: "",
                    placeholder: "Custom Object Name",
                    required: true,
                    helperSpan: "Please add '__c' at the end of the name",
                    variableName: "customObjectName",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "Name",
                    required: true,
                    variableName: "name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Owner ID",
                    variableName: "ownerId_create_custom_object",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_custom_obj",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_custom_obj",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "answered_Calls_before_SLA_Threshold",
                            value: "answered_Calls_before_SLA_Threshold",
                          },
                          {
                            option: "average_Talk_Time_for_Queue_Calls",
                            value: "average_Talk_Time_for_Queue_Calls",
                          },
                          {
                            option: "total_Waiting_Time_in_Queue",
                            value: "total_Waiting_Time_in_Queue",
                          },
                          {
                            option: "abandoned_Calls",
                            value: "abandoned_Calls",
                          },
                          {
                            option: "average_Waiting_Time_in_Queue",
                            value: "average_Waiting_Time_in_Queue",
                          },
                          {
                            option: "sla",
                            value: "sla",
                          },
                          {
                            option: "total_Wrap_Up_Time",
                            value: "total_Wrap_Up_Time",
                          },
                          {
                            option: "missed_Calls",
                            value: "missed_Calls",
                          },
                          {
                            option: "answered_Queue_Calls",
                            value: "answered_Queue_Calls",
                          },
                          {
                            option: "abandoned_Calls_after_SLA_Threshold",
                            value: "abandoned_Calls_after_SLA_Threshold",
                          },
                          {
                            option: "average_Inbound_Handle_Time",
                            value: "average_Inbound_Handle_Time",
                          },
                          {
                            option: "calls_Landed_in_Queue",
                            value: "calls_Landed_in_Queue",
                          },
                          {
                            option: "average_Abandon_Time",
                            value: "average_Abandon_Time",
                          },
                          {
                            option: "queues",
                            value: "queues",
                          },
                          {
                            option: "abandoned_Calls_before_SLA_Threshold",
                            value: "abandoned_Calls_before_SLA_Threshold",
                          },
                          {
                            option: "answered_Calls_after_SLA_Threshold",
                            value: "answered_Calls_after_SLA_Threshold",
                          },
                          {
                            option: "total_Talk_Time_for_Queue_Calls",
                            value: "total_Talk_Time_for_Queue_Calls",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Custom Obj": [
                  {
                    type: "textfield",
                    label: "Custom Object Name",
                    value: "",
                    placeholder: "Custom Object Name",
                    required: true,
                    // helperSpan: "Please add '__c' at the end of the name",
                    variableName: "customObjectName",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "api",
                    label: "Record Id",
                    variableName: "recordId",
                    value: "None",
                    required: true,
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
                              "salesforce/listCustomObjectRecords",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                          {
                            key: "customObjectName",
                            dependOn: "customObjectName",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.CustomObjs",
                      keys: {
                        option: {
                          fields: ["id"],
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
                      {
                        type: "dropdown",
                        name: "customObjectName",
                        isAutomation: true,
                      },
                    ],
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "ListCustom Objs": [
                  {
                    type: "textfield",
                    label: "Custom Object Name",
                    value: "",
                    placeholder: "Custom Object Name",
                    required: true,
                    // helperSpan: "Please add '__c' at the end of the name",
                    variableName: "customObjectName",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_list_custom_objects",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fields",
                          variableName: "fields",
                          helperSpan: "Fields to include separated by ,",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Condition",
                    variableName: "conditions_list_custom_objects",
                    structure: [
                      {
                        type: "row",
                        title: "Condition",
                        variableName: "conditions_list_custom_objects",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        required: true,
                        placeholder: "field='example'",
                        variableName: "conditions",
                        hasDynamicVariable: true,
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Create Custom Obj": [
                  {
                    type: "textfield",
                    label: "Custom Object Name",
                    value: "",
                    placeholder: "Custom Object Name",
                    required: true,
                    // helperSpan: "Please add '__c' at the end of the name",
                    variableName: "customObjectName",
                    hasDynamicVariable: true,
                  },
                  // {
                  //   type: "textfield",
                  //   label: "Name",
                  //   value: "",
                  //   placeholder: "Name",
                  //   required: true,
                  //   variableName: "name",
                  //   hasDynamicVariable: true,
                  // },
                  // {
                  //   type: "accordion",
                  //   title: "Options",
                  //   accTitle: "Owner ID",
                  //   variableName: "ownerId_create_custom_object",
                  //   fieldsArray: [
                  //     [
                  //       {
                  //         type: "textfield",
                  //         value: "",
                  //         placeholder: "Owner ID",
                  //         variableName: "ownerId",
                  //       },
                  //     ],
                  //   ],
                  // },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_custom_obj",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_custom_obj",
                        removeButton: true,
                      },
                      // {
                      //   type: "dropdown",
                      //   label: "Field Name",
                      //   value: "None",
                      //   required: true,
                      //   variableName: "fieldName",
                      //   list: [
                      //     {
                      //       option: "None",
                      //       value: "None",
                      //     },
                      //     {
                      //       option: "answered_Calls_before_SLA_Threshold",
                      //       value: "answered_Calls_before_SLA_Threshold",
                      //     },
                      //     {
                      //       option: "average_Talk_Time_for_Queue_Calls",
                      //       value: "average_Talk_Time_for_Queue_Calls",
                      //     },
                      //     {
                      //       option: "total_Waiting_Time_in_Queue",
                      //       value: "total_Waiting_Time_in_Queue",
                      //     },
                      //     {
                      //       option: "abandoned_Calls",
                      //       value: "abandoned_Calls",
                      //     },
                      //     {
                      //       option: "average_Waiting_Time_in_Queue",
                      //       value: "average_Waiting_Time_in_Queue",
                      //     },
                      //     {
                      //       option: "sla",
                      //       value: "sla",
                      //     },
                      //     {
                      //       option: "total_Wrap_Up_Time",
                      //       value: "total_Wrap_Up_Time",
                      //     },
                      //     {
                      //       option: "missed_Calls",
                      //       value: "missed_Calls",
                      //     },
                      //     {
                      //       option: "answered_Queue_Calls",
                      //       value: "answered_Queue_Calls",
                      //     },
                      //     {
                      //       option: "abandoned_Calls_after_SLA_Threshold",
                      //       value: "abandoned_Calls_after_SLA_Threshold",
                      //     },
                      //     {
                      //       option: "average_Inbound_Handle_Time",
                      //       value: "average_Inbound_Handle_Time",
                      //     },
                      //     {
                      //       option: "calls_Landed_in_Queue",
                      //       value: "calls_Landed_in_Queue",
                      //     },
                      //     {
                      //       option: "average_Abandon_Time",
                      //       value: "average_Abandon_Time",
                      //     },
                      //     {
                      //       option: "queues",
                      //       value: "queues",
                      //     },
                      //     {
                      //       option: "abandoned_Calls_before_SLA_Threshold",
                      //       value: "abandoned_Calls_before_SLA_Threshold",
                      //     },
                      //     {
                      //       option: "answered_Calls_after_SLA_Threshold",
                      //       value: "answered_Calls_after_SLA_Threshold",
                      //     },
                      //     {
                      //       option: "total_Talk_Time_for_Queue_Calls",
                      //       value: "total_Talk_Time_for_Queue_Calls",
                      //     },
                      //   ],
                      // },
                      {
                        type: "textfield",
                        label: "Field Name",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "fieldName",
                        hasDynamicVariable: true,
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Update Custom Obj": [
                  {
                    type: "textfield",
                    label: "Custom Object Name",
                    value: "",
                    placeholder: "Custom Object Name",
                    required: true,
                    // helperSpan: "Please add '__c' at the end of the name",
                    variableName: "customObjectName",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "api",
                    label: "Record Id",
                    variableName: "recordId",
                    value: "None",
                    required: true,
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
                              "salesforce/listCustomObjectRecords",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                          {
                            key: "customObjectName",
                            dependOn: "customObjectName",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.CustomObjs",
                      keys: {
                        option: {
                          fields: ["id"],
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
                      {
                        type: "dropdown",
                        name: "customObjectName",
                        isAutomation: true,
                      },
                    ],
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  // {
                  //   type: "accordion",
                  //   title: "Options",
                  //   accTitle: "Name",
                  //   variableName: "name_update_custom_object",
                  //   fieldsArray: [
                  //     [
                  //       {
                  //         type: "textfield",
                  //         value: "",
                  //         placeholder: "Name",
                  //         variableName: "name",
                  //       },
                  //     ],
                  //   ],
                  // },
                  // {
                  //   type: "accordion",
                  //   accTitle: "Owner ID",
                  //   variableName: "ownerId_update_custom_object",
                  //   fieldsArray: [
                  //     [
                  //       {
                  //         type: "textfield",
                  //         value: "",
                  //         placeholder: "Owner ID",
                  //         variableName: "ownerId",
                  //       },
                  //     ],
                  //   ],
                  // },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_update_custom_obj",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_update_custom_obj",
                        removeButton: true,
                      },
                      // {
                      //   type: "dropdown",
                      //   label: "Field Name",
                      //   value: "None",
                      //   required: true,
                      //   variableName: "fieldName",
                      //   list: [
                      //     {
                      //       option: "None",
                      //       value: "None",
                      //     },
                      //     {
                      //       option: "answered_Calls_before_SLA_Threshold",
                      //       value: "answered_Calls_before_SLA_Threshold",
                      //     },
                      //     {
                      //       option: "average_Talk_Time_for_Queue_Calls",
                      //       value: "average_Talk_Time_for_Queue_Calls",
                      //     },
                      //     {
                      //       option: "total_Waiting_Time_in_Queue",
                      //       value: "total_Waiting_Time_in_Queue",
                      //     },
                      //     {
                      //       option: "abandoned_Calls",
                      //       value: "abandoned_Calls",
                      //     },
                      //     {
                      //       option: "average_Waiting_Time_in_Queue",
                      //       value: "average_Waiting_Time_in_Queue",
                      //     },
                      //     {
                      //       option: "sla",
                      //       value: "sla",
                      //     },
                      //     {
                      //       option: "total_Wrap_Up_Time",
                      //       value: "total_Wrap_Up_Time",
                      //     },
                      //     {
                      //       option: "missed_Calls",
                      //       value: "missed_Calls",
                      //     },
                      //     {
                      //       option: "answered_Queue_Calls",
                      //       value: "answered_Queue_Calls",
                      //     },
                      //     {
                      //       option: "abandoned_Calls_after_SLA_Threshold",
                      //       value: "abandoned_Calls_after_SLA_Threshold",
                      //     },
                      //     {
                      //       option: "average_Inbound_Handle_Time",
                      //       value: "average_Inbound_Handle_Time",
                      //     },
                      //     {
                      //       option: "calls_Landed_in_Queue",
                      //       value: "calls_Landed_in_Queue",
                      //     },
                      //     {
                      //       option: "average_Abandon_Time",
                      //       value: "average_Abandon_Time",
                      //     },
                      //     {
                      //       option: "queues",
                      //       value: "queues",
                      //     },
                      //     {
                      //       option: "abandoned_Calls_before_SLA_Threshold",
                      //       value: "abandoned_Calls_before_SLA_Threshold",
                      //     },
                      //     {
                      //       option: "answered_Calls_after_SLA_Threshold",
                      //       value: "answered_Calls_after_SLA_Threshold",
                      //     },
                      //     {
                      //       option: "total_Talk_Time_for_Queue_Calls",
                      //       value: "total_Talk_Time_for_Queue_Calls",
                      //     },
                      //   ],
                      // },
                      {
                        type: "textfield",
                        label: "Field Name",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "fieldName",
                        hasDynamicVariable: true,
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Delete Custom Obj": [
                  {
                    type: "textfield",
                    label: "Custom Object Name",
                    value: "",
                    placeholder: "Custom Object Name",
                    required: true,
                    // helperSpan: "Please add '__c' at the end of the name",
                    variableName: "customObjectName",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "api",
                    label: "Record Id",
                    variableName: "recordId",
                    value: "None",
                    required: true,
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
                              "salesforce/listCustomObjectRecords",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                          {
                            key: "customObjectName",
                            dependOn: "customObjectName",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.CustomObjs",
                      keys: {
                        option: {
                          fields: ["id"],
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
                      {
                        type: "dropdown",
                        name: "customObjectName",
                        isAutomation: true,
                      },
                    ],
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
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
          Document: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Upload Document",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Upload",
                  value: "Upload Document",
                },
              ],
              options: {
                "Upload Document": [
                  {
                    type: "textfield",
                    label: "Title",
                    value: "",
                    placeholder: "Title",
                    required: true,
                    variableName: "title",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "file.txt",
                    helperSpan:
                      "Please don't input special characters and make sure to input the extension at the end e.g(.png,.txt,.csv) ",
                    required: true,
                    variableName: "pathOnClient",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    label: "Upload Type",
                    value: "Binary",
                    variableName: "uploadType",
                    errorSpan: "Please choose a type",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "Binary",
                        value: "Binary",
                      },
                      {
                        option: "Url",
                        value: "Url",
                      },
                    ],
                    options: {
                      Binary: [
                        {
                          type: "textfield",
                          minRows: "5",
                          multiline: true,
                          label: "Binary",
                          value: "",
                          placeholder: "Binary",
                          required: true,
                          variableName: "binary",
                          rightSideInput: true,
                          hasDynamicVariable: true,
                        },
                      ],
                      Url: [
                        {
                          type: "textfield",
                          label: "Url",
                          value: "",
                          placeholder: "Url",
                          required: true,
                          variableName: "url",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    },
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_upload_document",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "OwnerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_upload_document",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          Flow: [
            {
              type: "dropdown",
              label: "Operation",
              value: "List Flows",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get Many",
                  value: "List Flows",
                },
              ],
              options: {
                "List Flows": [
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
                  option: "Add Note",
                  value: "Add Note To Record",
                },
                {
                  option: "Get",
                  value: "Get Lead",
                },
                {
                  option: "Get Many",
                  value: "List Leads",
                },
                {
                  option: "Get Summary",
                  value: "Get Lead Summary",
                },
                {
                  option: "Create",
                  value: "Create Lead",
                },
                {
                  option: "Update",
                  value: "Update Lead",
                },
                {
                  option: "Delete",
                  value: "Delete Lead",
                },
                {
                  option: "Add Lead To Campaign",
                  value: "Add Lead To Campaign",
                },
              ],
              options: {
                "Craete Lead": [
                  {
                    type: "textfield",
                    label: "Last Name",
                    value: "",
                    placeholder: "Last Name",
                    required: true,
                    variableName: "lastName",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Company",
                    value: "",
                    placeholder: "Company",
                    required: true,
                    variableName: "company",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Salutation",
                    variableName: "salutation_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "Mr.",
                          variableName: "salutation",
                          list: [
                            {
                              option: "Mr.",
                              value: "Mr.",
                            },
                            {
                              option: "Ms.",
                              value: "Ms.",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "First Name",
                    variableName: "firstName_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "First Name",
                          variableName: "firstName",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Title",
                    variableName: "title_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Title",
                          variableName: "title",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Street",
                    variableName: "Street_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street",
                          variableName: "Street",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "City",
                    variableName: "City_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "City",
                          variableName: "City",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "State",
                    variableName: "State_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "State",
                          variableName: "State",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Postal Code",
                    variableName: "postalCode_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Postal Code",
                          variableName: "postalCode",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country",
                    variableName: "country_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Country",
                          variableName: "country",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile Phone",
                    variableName: "mobilePhone_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile Phone",
                          variableName: "mobilePhone",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "email",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "website_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Website",
                          variableName: "website",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Source",
                    variableName: "leadSource_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "leadSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                variableName: "value_leadSource_create_lead",
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
                    accTitle: "Status",
                    variableName: "status_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "status",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Contacted",
                              value: "Contacted",
                            },
                            {
                              option: "New",
                              value: "New",
                            },
                            {
                              option: "Nurturing",
                              value: "Nurturing",
                            },
                            {
                              option: "Qualified",
                              value: "Qualified",
                            },
                            {
                              option: "Unqualified",
                              value: "Unqualified",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Industry",
                    variableName: "industry_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Industry",
                          variableName: "industry",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Rating",
                    variableName: "rating_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Rating",
                          variableName: "rating",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Annual Revenue",
                    variableName: "annualRevenue_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "0.00",
                          variableName: "annualRevenue",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Number Of Employees",
                    variableName: "numberOfEmployees_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: 0,
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "Number Of Employees",
                          variableName: "numberOfEmployees",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner Id",
                    variableName: "ownerId_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner Id",
                          variableName: "ownerId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Jigsaw",
                    variableName: "Jigsaw_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Jigsaw",
                          variableName: "Jigsaw",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Unread By Owner",
                    variableName: "isUnreadByOwner_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isUnreadByOwner",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Record ID",
                    variableName: "masterRecordId_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Record ID",
                          variableName: "MasterRecordId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_lead",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_lead",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "siccode",
                            value: "siccode",
                          },
                          {
                            option: "productInterest",
                            value: "productInterest",
                          },
                          {
                            option: "primary",
                            value: "primary",
                          },
                          {
                            option: "currentGenerators",
                            value: "currentGenerators",
                          },
                          {
                            option: "numberofLocations",
                            value: "numberofLocations",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Lead": [
                  {
                    type: "api",
                    label: "Lead",
                    variableName: "leadId",
                    value: "None",
                    required: true,
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
                              "salesforce/listLeads",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "List Leads": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_list_leads",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fields",
                          variableName: "fields",
                          helperSpan: "Fields to include separated by ,",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Condition",
                    variableName: "conditions_list_leads",
                    structure: [
                      {
                        type: "row",
                        title: "Condition",
                        variableName: "conditions_list_leads",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        required: true,
                        placeholder: "field='example'",
                        variableName: "conditions",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Lead Summary": [
                ],
                "Create Lead": [
                  {
                    type: "textfield",
                    label: "Last Name",
                    value: "",
                    placeholder: "Last Name",
                    required: true,
                    variableName: "lastName",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Company",
                    value: "",
                    placeholder: "Company",
                    required: true,
                    variableName: "company",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Salutation",
                    variableName: "salutation_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "Mr.",
                          variableName: "salutation",
                          list: [
                            {
                              option: "Mr.",
                              value: "Mr.",
                            },
                            {
                              option: "Ms.",
                              value: "Ms.",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "First Name",
                    variableName: "firstName_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "First Name",
                          variableName: "firstName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Title",
                    variableName: "title_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Title",
                          variableName: "title",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Street",
                    variableName: "Street_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street",
                          variableName: "Street",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "City",
                    variableName: "City_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "City",
                          variableName: "City",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "State",
                    variableName: "State_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "State",
                          variableName: "State",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Postal Code",
                    variableName: "postalCode_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Postal Code",
                          variableName: "postalCode",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country",
                    variableName: "country_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Country",
                          variableName: "country",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile Phone",
                    variableName: "mobilePhone_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile Phone",
                          variableName: "mobilePhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "website_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Website",
                          variableName: "website",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Source",
                    variableName: "leadSource_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "leadSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                variableName: "value_leadSource_create_lead",
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
                    accTitle: "Status",
                    variableName: "status_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "status",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Contacted",
                              value: "Contacted",
                            },
                            {
                              option: "New",
                              value: "New",
                            },
                            {
                              option: "Nurturing",
                              value: "Nurturing",
                            },
                            {
                              option: "Qualified",
                              value: "Qualified",
                            },
                            {
                              option: "Unqualified",
                              value: "Unqualified",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Industry",
                    variableName: "industry_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Industry",
                          variableName: "industry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Rating",
                    variableName: "rating_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Rating",
                          variableName: "rating",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Annual Revenue",
                    variableName: "annualRevenue_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "0.00",
                          variableName: "annualRevenue",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Number Of Employees",
                    variableName: "numberOfEmployees_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: 0,
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "Number Of Employees",
                          variableName: "numberOfEmployees",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner Id",
                    variableName: "ownerId_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner Id",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Jigsaw",
                    variableName: "Jigsaw_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Jigsaw",
                          variableName: "Jigsaw",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Unread By Owner",
                    variableName: "isUnreadByOwner_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isUnreadByOwner",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Record ID",
                    variableName: "masterRecordId_create_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Record ID",
                          variableName: "MasterRecordId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_lead",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_lead",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "siccode",
                            value: "siccode",
                          },
                          {
                            option: "productInterest",
                            value: "productInterest",
                          },
                          {
                            option: "primary",
                            value: "primary",
                          },
                          {
                            option: "currentGenerators",
                            value: "currentGenerators",
                          },
                          {
                            option: "numberofLocations",
                            value: "numberofLocations",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Update Lead": [
                  {
                    type: "api",
                    label: "Lead",
                    variableName: "leadId",
                    value: "None",
                    required: true,
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
                              "salesforce/listLeads",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
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
                    accTitle: "Salutation",
                    variableName: "salutation_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "salutation",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Mr.",
                              value: "Mr.",
                            },
                            {
                              option: "Ms.",
                              value: "Ms.",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "First Name",
                    variableName: "firstName_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "First Name",
                          variableName: "firstName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Last Name",
                    variableName: "lastName_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Last Name",
                          variableName: "lastName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Company",
                    variableName: "company_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Company",
                          variableName: "company",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Title",
                    variableName: "title_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Title",
                          variableName: "title",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Street",
                    variableName: "Street_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street",
                          variableName: "Street",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "City",
                    variableName: "City_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "City",
                          variableName: "City",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "State",
                    variableName: "State_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "State",
                          variableName: "State",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Postal Code",
                    variableName: "postalCode_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Postal Code",
                          variableName: "postalCode",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country",
                    variableName: "country_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Country",
                          variableName: "country",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile Phone",
                    variableName: "mobilePhone_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile Phone",
                          variableName: "mobilePhone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "website_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Website",
                          variableName: "website",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Source",
                    variableName: "leadSource_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "leadSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                variableName: "value_leadSource_update_lead",
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
                    accTitle: "Status",
                    variableName: "status_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "status",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Contacted",
                              value: "Contacted",
                            },
                            {
                              option: "New",
                              value: "New",
                            },
                            {
                              option: "Nurturing",
                              value: "Nurturing",
                            },
                            {
                              option: "Qualified",
                              value: "Qualified",
                            },
                            {
                              option: "Unqualified",
                              value: "Unqualified",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Industry",
                    variableName: "industry_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Industry",
                          variableName: "industry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Rating",
                    variableName: "rating_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Rating",
                          variableName: "rating",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Annual Revenue",
                    variableName: "annualRevenue_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "0.00",
                          variableName: "annualRevenue",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Number Of Employees",
                    variableName: "numberOfEmployees_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: 0,
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "Number Of Employees",
                          variableName: "numberOfEmployees",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner Id",
                    variableName: "ownerId_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner Id",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Jigsaw",
                    variableName: "Jigsaw_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Jigsaw",
                          variableName: "Jigsaw",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Unread By Owner",
                    variableName: "isUnreadByOwner_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isUnreadByOwner",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Record ID",
                    variableName: "masterRecordId_update_lead",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Record ID",
                          variableName: "MasterRecordId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_update_lead",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_update_lead",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "siccode",
                            value: "siccode",
                          },
                          {
                            option: "productInterest",
                            value: "productInterest",
                          },
                          {
                            option: "primary",
                            value: "primary",
                          },
                          {
                            option: "currentGenerators",
                            value: "currentGenerators",
                          },
                          {
                            option: "numberofLocations",
                            value: "numberofLocations",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Delete Lead": [
                  {
                    type: "api",
                    label: "Lead",
                    variableName: "leadId",
                    value: "None",
                    required: true,
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
                              "salesforce/listLeads",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "Add Lead To Campaign": [
                  {
                    type: "api",
                    label: "Lead",
                    variableName: "leadId",
                    value: "None",
                    required: true,
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
                              "salesforce/listLeads",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "api",
                    label: "Campaign",
                    variableName: "campaignId",
                    value: "None",
                    required: true,
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
                              "salesforce/listCampaigns",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.campaigns",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
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
                    accTitle: "Status",
                    variableName: "status_add_lead_to_campaign",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "status",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Sent",
                              value: "Sent",
                            },
                            {
                              option: "Responded",
                              value: "Responded",
                            },
                            {
                              option: "Not Interested",
                              value: "Not Interested",
                            },
                            {
                              option: "Do Not Call",
                              value: "Do Not Call",
                            },
                            {
                              option: "Attended",
                              value: "Attended",
                            },
                            {
                              option: "Converted",
                              value: "Converted",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Add Note To Record": [
                  {
                    type: "api",
                    label: "Lead",
                    variableName: "parentId",
                    value: "None",
                    required: true,
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
                              "salesforce/listLeads",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Title",
                    value: "",
                    required: true,
                    placeholder: "Title",
                    variableName: "title",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Body",
                    variableName: "body_add_note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Body",
                          variableName: "body",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_add_Note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Private",
                    variableName: "isPrivate_add_note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isPrivate",
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          Opportunity: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Opportunity",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Add Note",
                  value: "Add Note To Record",
                },
                {
                  option: "Get",
                  value: "Get Opportunity",
                },
                {
                  option: "Get Many",
                  value: "List Opportunities",
                },
                {
                  option: "Get Summary",
                  value: "Get Opportunity Summary",
                },
                {
                  option: "Create",
                  value: "Create Opportunity",
                },
                {
                  option: "Update",
                  value: "Update Opportunity",
                },
                {
                  option: "Delete",
                  value: "Delete Opportunity",
                },
              ],
              options: {
                "Craete Opportunity": [
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "Name",
                    required: true,
                    variableName: "name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    label: "Stage Name",
                    value: "None",
                    variableName: "stageName",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "None",
                        value: "None",
                      },
                      {
                        option: "Closed Lost",
                        value: "Closed Lost",
                      },
                      {
                        option: "Closed Won",
                        value: "Closed Won",
                      },
                      {
                        option: "Meet & Present",
                        value: "Meet & Present",
                      },
                      {
                        option: "Negotiate",
                        value: "Negotiate",
                      },
                      {
                        option: "Propose",
                        value: "Propose",
                      },
                      {
                        option: "Qualify",
                        value: "Qualify",
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Close Date",
                    value: "",
                    date: true,
                    placeholder: "Select a Date",
                    required: true,
                    variableName: "closeDate",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Account ID",
                    variableName: "accountId_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account ID",
                          variableName: "accountId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Amount",
                    variableName: "amount_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "float",
                          placeholder: "2500.0",
                          variableName: "amount",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Probability",
                    variableName: "probability_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "float",
                          placeholder: "100.0",
                          variableName: "Probability",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "type_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "type",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Business",
                              value: "Business",
                            },
                            {
                              option: "New Business",
                              value: "New Business",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Next Step",
                    variableName: "nextStep_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Next Step",
                          variableName: "nextStep",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Source",
                    variableName: "leadSource_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "leadSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                  "value_leadSource_create_opportunity",
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
                    accTitle: "Forecast Category Name",
                    variableName: "forecastCategoryName_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Forecast Category Name",
                          variableName: "forecastCategoryName",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Campaign ID",
                    variableName: "campaignId_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Campaign ID",
                          variableName: "campaignId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Pricebook2 ID",
                    variableName: "pricebook2Id_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Pricebook2 ID",
                          variableName: "pricebook2Id",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_opportunity",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_opportunity",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "deliveryInstallationStatus",
                            value: "deliveryInstallationStatus",
                          },
                          {
                            option: "trackingNumber",
                            value: "trackingNumber",
                          },
                          {
                            option: "orderNumber",
                            value: "orderNumber",
                          },
                          {
                            option: "currentGenerators",
                            value: "currentGenerators",
                          },
                          {
                            option: "mainCompetitors",
                            value: "mainCompetitors",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Opportunity": [
                  {
                    type: "api",
                    label: "Opportunity",
                    variableName: "opportunityId",
                    value: "None",
                    required: true,
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
                              "salesforce/listOpportunities",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.opportunities",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "List Opportunities": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_list_opportunities",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fields",
                          variableName: "fields",
                          helperSpan: "Fields to include separated by ,",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Condition",
                    variableName: "conditions_list_opportunities",
                    structure: [
                      {
                        type: "row",
                        title: "Condition",
                        variableName: "conditions_list_opportunities",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        required: true,
                        placeholder: "field='example'",
                        variableName: "conditions",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Opportunity Summary": [
                ],
                "Create Opportunity": [
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "Name",
                    required: true,
                    variableName: "name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    label: "Stage Name",
                    value: "None",
                    variableName: "stageName",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "None",
                        value: "None",
                      },
                      {
                        option: "Closed Lost",
                        value: "Closed Lost",
                      },
                      {
                        option: "Closed Won",
                        value: "Closed Won",
                      },
                      {
                        option: "Meet & Present",
                        value: "Meet & Present",
                      },
                      {
                        option: "Negotiate",
                        value: "Negotiate",
                      },
                      {
                        option: "Propose",
                        value: "Propose",
                      },
                      {
                        option: "Qualify",
                        value: "Qualify",
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Close Date",
                    value: "",
                    date: true,
                    placeholder: "Select a Date",
                    required: true,
                    variableName: "closeDate",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Account ID",
                    variableName: "accountId_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account ID",
                          variableName: "accountId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Amount",
                    variableName: "amount_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "float",
                          placeholder: "2500.0",
                          variableName: "amount",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Probability",
                    variableName: "probability_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "float",
                          placeholder: "100.0",
                          variableName: "Probability",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "type_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "type",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Business",
                              value: "Business",
                            },
                            {
                              option: "New Business",
                              value: "New Business",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Next Step",
                    variableName: "nextStep_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Next Step",
                          variableName: "nextStep",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Source",
                    variableName: "leadSource_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "leadSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                  "value_leadSource_create_opportunity",
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
                    accTitle: "Forecast Category Name",
                    variableName: "forecastCategoryName_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Forecast Category Name",
                          variableName: "forecastCategoryName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Campaign ID",
                    variableName: "campaignId_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Campaign ID",
                          variableName: "campaignId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Pricebook2 ID",
                    variableName: "pricebook2Id_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Pricebook2 ID",
                          variableName: "pricebook2Id",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_create_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_create_opportunity",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_create_opportunity",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "deliveryInstallationStatus",
                            value: "deliveryInstallationStatus",
                          },
                          {
                            option: "trackingNumber",
                            value: "trackingNumber",
                          },
                          {
                            option: "orderNumber",
                            value: "orderNumber",
                          },
                          {
                            option: "currentGenerators",
                            value: "currentGenerators",
                          },
                          {
                            option: "mainCompetitors",
                            value: "mainCompetitors",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Update Opportunity": [
                  {
                    type: "api",
                    label: "Opportunity",
                    variableName: "opportunityId",
                    value: "None",
                    required: true,
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
                              "salesforce/listOpportunities",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.opportunities",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Name",
                    variableName: "name_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Stage Name",
                    variableName: "stageName_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "stageName",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Closed Lost",
                              value: "Closed Lost",
                            },
                            {
                              option: "Closed Won",
                              value: "Closed Won",
                            },
                            {
                              option: "Meet & Present",
                              value: "Meet & Present",
                            },
                            {
                              option: "Negotiate",
                              value: "Negotiate",
                            },
                            {
                              option: "Propose",
                              value: "Propose",
                            },
                            {
                              option: "Qualify",
                              value: "Qualify",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Close Date",
                    variableName: "closeDate_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          placeholder: "Select a Date",
                          variableName: "closeDate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Account ID",
                    variableName: "accountId_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Account ID",
                          variableName: "accountId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Amount",
                    variableName: "amount_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "float",
                          placeholder: "2500.0",
                          variableName: "amount",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Probability",
                    variableName: "probability_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "float",
                          placeholder: "100.0",
                          variableName: "Probability",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "type_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "type",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Business",
                              value: "Business",
                            },
                            {
                              option: "New Business",
                              value: "New Business",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Next Step",
                    variableName: "nextStep_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Next Step",
                          variableName: "nextStep",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Lead Source",
                    variableName: "leadSource_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "leadSource",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Advertisement",
                              value: "Advertisement",
                            },
                            {
                              option: "Employee Referral",
                              value: "Employee Referral",
                            },
                            {
                              option: "External Referral",
                              value: "External Referral",
                            },
                            {
                              option: "Partner",
                              value: "Partner",
                            },
                            {
                              option: "Public Relations",
                              value: "Public Relations",
                            },
                            {
                              option: "Seminar - Internal",
                              value: "Seminar - Internal",
                            },
                            {
                              option: "Seminar - Partner",
                              value: "Seminar - Partner",
                            },
                            {
                              option: "Trade Show",
                              value: "Trade Show",
                            },
                            {
                              option: "Web",
                              value: "Web",
                            },
                            {
                              option: "Word of mouth",
                              value: "Word of mouth",
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
                                  "value_leadSource_update_opportunity",
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
                    accTitle: "Forecast Category Name",
                    variableName: "forecastCategoryName_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Forecast Category Name",
                          variableName: "forecastCategoryName",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Campaign ID",
                    variableName: "campaignId_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Campaign ID",
                          variableName: "campaignId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Pricebook2 ID",
                    variableName: "pricebook2Id_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Pricebook2 ID",
                          variableName: "pricebook2Id",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_update_opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_update_opportunity",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "customFields_update_opportunity",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Field Name",
                        value: "None",
                        required: true,
                        variableName: "fieldName",
                        list: [
                          {
                            option: "None",
                            value: "None",
                          },
                          {
                            option: "deliveryInstallationStatus",
                            value: "deliveryInstallationStatus",
                          },
                          {
                            option: "trackingNumber",
                            value: "trackingNumber",
                          },
                          {
                            option: "orderNumber",
                            value: "orderNumber",
                          },
                          {
                            option: "currentGenerators",
                            value: "currentGenerators",
                          },
                          {
                            option: "mainCompetitors",
                            value: "mainCompetitors",
                          },
                        ],
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "value",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Delete Opportunity": [
                  {
                    type: "api",
                    label: "Opportunity",
                    variableName: "opportunityId",
                    value: "None",
                    required: true,
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
                              "salesforce/listOpportunities",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.opportunities",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "Add Note To Record": [
                  {
                    type: "api",
                    label: "Opportunity",
                    variableName: "parentId",
                    value: "None",
                    required: true,
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
                              "salesforce/listOpportunities",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.opportunities",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Title",
                    value: "",
                    required: true,
                    placeholder: "Title",
                    variableName: "title",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Body",
                    variableName: "body_add_note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Body",
                          variableName: "body",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_add_Note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Private",
                    variableName: "isPrivate_add_note_to_record",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isPrivate",
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          Search: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Search Records",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Search",
                  value: "Search Records",
                },
              ],
              options: {
                "Search Records": [
                  {
                    type: "textfield",
                    label: "Query",
                    value: "",
                    placeholder: "SELECT field FROM TableName",
                    required: true,
                    variableName: "query",
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
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get",
                  value: "Get Task",
                },
                {
                  option: "Get Many",
                  value: "List Tasks",
                },
                {
                  option: "Get Summary",
                  value: "Get Task Summary",
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
              ],
              options: {
                "Craete Task": [
                  {
                    type: "dropdown",
                    label: "Status",
                    value: "Other",
                    variableName: "status_create_task",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "Completed",
                        value: "Completed",
                      },
                      {
                        option: "Deferred",
                        value: "Deferred",
                      },
                      {
                        option: "In Progress",
                        value: "In Progress",
                      },
                      {
                        option: "Not Started",
                        value: "Not Started",
                      },
                      {
                        option: "Waiting on someone else",
                        value: "Waiting on someone else",
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
                          variableName: "value_status_create_task",
                          hasDynamicVariable: true,
                        },
                      ],
                    },
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "activityDate",
                    variableName: "activityDate_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          placeholder: "Select a Date",
                          variableName: "activityDate",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "priority_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "priority",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "High",
                              value: "High",
                            },
                            {
                              option: "Low",
                              value: "Low",
                            },
                            {
                              option: "Normal",
                              value: "Normal",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Duration In Seconds",
                    variableName: "callDurationInSeconds_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "Call Duration In Seconds",
                          variableName: "callDurationInSeconds",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Type",
                    variableName: "callType_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "callType",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Inbound",
                              value: "Inbound",
                            },
                            {
                              option: "Internal",
                              value: "Internal",
                            },
                            {
                              option: "Outbound",
                              value: "Outbound",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Disposition",
                    variableName: "callDisposition_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Call Disposition",
                          variableName: "callDisposition",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Object",
                    variableName: "callObject_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Call Object",
                          variableName: "callObject",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Reminder Date Time",
                    variableName: "reminderDateTime_create_task",
                    fieldsArray: [
                      [
                        {
                          date: true,
                          label: "Date",
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Date",
                          variableName: "date",
                        },
                        {
                          label: "Time",
                          timeWithSeconds: true,
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Time",
                          variableName: "time",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Reminder Set",
                    variableName: "isReminderSet_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isReminderSet",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Subject",
                    variableName: "subject_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "subject",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Call",
                              value: "Call",
                            },
                            {
                              option: "Send Letter",
                              value: "Send Letter",
                            },
                            {
                              option: "Send Quote",
                              value: "Send Quote",
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
                                variableName: "value_subject_create_task",
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
                    accTitle: "Type",
                    variableName: "taskSubtype_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "taskSubtype",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Call",
                              value: "Call",
                            },
                            {
                              option: "Email",
                              value: "Email",
                            },
                            {
                              option: "LinkedIn",
                              value: "LinkedIn",
                            },
                            {
                              option: "List Email",
                              value: "ListEmail",
                            },
                            {
                              option: "Task",
                              value: "Task",
                            },
                            {
                              option: "Cadence",
                              value: "Cadence",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Who ID",
                    variableName: "whoId_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Who ID",
                          variableName: "whoId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "What ID",
                    variableName: "whatId_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "What ID",
                          variableName: "whatId",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Interval",
                    variableName: "recurrenceInterval_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "recurrenceInterval",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Regenerated Type",
                    variableName: "recurrenceRegeneratedType_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "recurrenceRegeneratedType",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "After Due Date",
                              value: "RecurrenceRegenerateAfterDueDate",
                            },
                            {
                              option: "After Date Completed",
                              value: "RecurrenceRegenerateAfterToday",
                            },
                            {
                              option: "(Task Closed)",
                              value: "RecurrenceRegenerated",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Day Of Week Mask",
                    variableName: "recurrenceDayOfWeekMask_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "recurrenceDayOfWeekMask",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Day Of Month",
                    variableName: "recurrenceDayOfMonth_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "recurrenceDayOfMonth",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Instance",
                    variableName: "recurrenceInstance_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "recurrenceInstance",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Month Of Year",
                    variableName: "recurrenceMonthOfYear_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "recurrenceMonthOfYear",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "January",
                              value: "January",
                            },
                            {
                              option: "February",
                              value: "February",
                            },
                            {
                              option: "March",
                              value: "March",
                            },
                            {
                              option: "April",
                              value: "April",
                            },
                            {
                              option: "May",
                              value: "May",
                            },
                            {
                              option: "June",
                              value: "June",
                            },
                            {
                              option: "July",
                              value: "July",
                            },
                            {
                              option: "August",
                              value: "August",
                            },
                            {
                              option: "September",
                              value: "September",
                            },
                            {
                              option: "October",
                              value: "October",
                            },
                            {
                              option: "November",
                              value: "November",
                            },
                            {
                              option: "December",
                              value: "December",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Dates",
                    variableName: "recurrenceDates_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          label: "Recurrence Start Date Only",
                          placeholder: "Select a Date",
                          variableName: "recurrenceStartDateOnly",
                        },
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          label: "Recurrence End Date Only",
                          placeholder: "Select a Date",
                          variableName: "recurrenceEndDateOnly",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Time Zone Sid Key",
                    variableName: "recurrenceTimeZoneSidKey_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Recurrence Time Zone Sid Key",
                          variableName: "recurrenceTimeZoneSidKey",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Type",
                    variableName: "recurrenceType_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "recurrenceType",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Recurs Daily",
                              value: "RecursDaily",
                            },
                            {
                              option: "Recurs Every Weekday",
                              value: "RecursEveryWeekday",
                            },
                            {
                              option: "Recurs Monthly",
                              value: "RecursMonthly",
                            },
                            {
                              option: "Recurs Monthly Nth",
                              value: "RecursMonthlyNth",
                            },
                            {
                              option: "Recurs Weekly",
                              value: "RecursWeekly",
                            },
                            {
                              option: "Recurs Yearly",
                              value: "RecursYearly",
                            },
                            {
                              option: "Recurs Yearly Nth",
                              value: "RecursYearlyNth",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Get Task": [
                  {
                    type: "api",
                    label: "Task",
                    variableName: "taskId",
                    value: "None",
                    required: true,
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
                              "salesforce/listTasks",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.tasks",
                      keys: {
                        option: {
                          fields: ["id"],
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "List Tasks": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_list_tasks",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fields",
                          variableName: "fields",
                          helperSpan: "Fields to include separated by ,",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Condition",
                    variableName: "conditions_list_tasks",
                    structure: [
                      {
                        type: "row",
                        title: "Condition",
                        variableName: "conditions_list_tasks",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        required: true,
                        placeholder: "field='example'",
                        variableName: "conditions",
                        hasDynamicVariable: true,
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Task Summary": [
                ],
                "Create Task": [
                  {
                    type: "dropdown",
                    label: "Status",
                    value: "Other",
                    variableName: "status_create_task",
                    required: true,
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "Completed",
                        value: "Completed",
                      },
                      {
                        option: "Deferred",
                        value: "Deferred",
                      },
                      {
                        option: "In Progress",
                        value: "In Progress",
                      },
                      {
                        option: "Not Started",
                        value: "Not Started",
                      },
                      {
                        option: "Waiting on someone else",
                        value: "Waiting on someone else",
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
                          variableName: "value_status_create_task",
                          hasDynamicVariable: true,
                        },
                      ],
                    },
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "activityDate",
                    variableName: "activityDate_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          placeholder: "Select a Date",
                          variableName: "activityDate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "priority_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "priority",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "High",
                              value: "High",
                            },
                            {
                              option: "Low",
                              value: "Low",
                            },
                            {
                              option: "Normal",
                              value: "Normal",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Duration In Seconds",
                    variableName: "callDurationInSeconds_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "Call Duration In Seconds",
                          variableName: "callDurationInSeconds",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Type",
                    variableName: "callType_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "callType",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Inbound",
                              value: "Inbound",
                            },
                            {
                              option: "Internal",
                              value: "Internal",
                            },
                            {
                              option: "Outbound",
                              value: "Outbound",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Disposition",
                    variableName: "callDisposition_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Call Disposition",
                          variableName: "callDisposition",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Object",
                    variableName: "callObject_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Call Object",
                          variableName: "callObject",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Reminder Date Time",
                    variableName: "reminderDateTime_create_task",
                    fieldsArray: [
                      [
                        {
                          date: true,
                          label: "Date",
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Date",
                          variableName: "date",
                          hasDynamicVariable: true,
                        },
                        {
                          label: "Time",
                          timeWithSeconds: true,
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Time",
                          variableName: "time",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Reminder Set",
                    variableName: "isReminderSet_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isReminderSet",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Subject",
                    variableName: "subject_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "subject",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Call",
                              value: "Call",
                            },
                            {
                              option: "Send Letter",
                              value: "Send Letter",
                            },
                            {
                              option: "Send Quote",
                              value: "Send Quote",
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
                                variableName: "value_subject_create_task",
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
                    accTitle: "Type",
                    variableName: "taskSubtype_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "taskSubtype",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Call",
                              value: "Call",
                            },
                            {
                              option: "Email",
                              value: "Email",
                            },
                            {
                              option: "LinkedIn",
                              value: "LinkedIn",
                            },
                            {
                              option: "List Email",
                              value: "ListEmail",
                            },
                            {
                              option: "Task",
                              value: "Task",
                            },
                            {
                              option: "Cadence",
                              value: "Cadence",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Who ID",
                    variableName: "whoId_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Who ID",
                          variableName: "whoId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "What ID",
                    variableName: "whatId_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "What ID",
                          variableName: "whatId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Interval",
                    variableName: "recurrenceInterval_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "recurrenceInterval",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Regenerated Type",
                    variableName: "recurrenceRegeneratedType_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "recurrenceRegeneratedType",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "After Due Date",
                              value: "RecurrenceRegenerateAfterDueDate",
                            },
                            {
                              option: "After Date Completed",
                              value: "RecurrenceRegenerateAfterToday",
                            },
                            {
                              option: "(Task Closed)",
                              value: "RecurrenceRegenerated",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Day Of Week Mask",
                    variableName: "recurrenceDayOfWeekMask_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "recurrenceDayOfWeekMask",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Day Of Month",
                    variableName: "recurrenceDayOfMonth_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "recurrenceDayOfMonth",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Instance",
                    variableName: "recurrenceInstance_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "recurrenceInstance",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Month Of Year",
                    variableName: "recurrenceMonthOfYear_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "recurrenceMonthOfYear",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "January",
                              value: "January",
                            },
                            {
                              option: "February",
                              value: "February",
                            },
                            {
                              option: "March",
                              value: "March",
                            },
                            {
                              option: "April",
                              value: "April",
                            },
                            {
                              option: "May",
                              value: "May",
                            },
                            {
                              option: "June",
                              value: "June",
                            },
                            {
                              option: "July",
                              value: "July",
                            },
                            {
                              option: "August",
                              value: "August",
                            },
                            {
                              option: "September",
                              value: "September",
                            },
                            {
                              option: "October",
                              value: "October",
                            },
                            {
                              option: "November",
                              value: "November",
                            },
                            {
                              option: "December",
                              value: "December",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Dates",
                    variableName: "recurrenceDates_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          label: "Recurrence Start Date Only",
                          placeholder: "Select a Date",
                          variableName: "recurrenceStartDateOnly",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          label: "Recurrence End Date Only",
                          placeholder: "Select a Date",
                          variableName: "recurrenceEndDateOnly",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Time Zone Sid Key",
                    variableName: "recurrenceTimeZoneSidKey_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Recurrence Time Zone Sid Key",
                          variableName: "recurrenceTimeZoneSidKey",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Type",
                    variableName: "recurrenceType_create_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "recurrenceType",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Recurs Daily",
                              value: "RecursDaily",
                            },
                            {
                              option: "Recurs Every Weekday",
                              value: "RecursEveryWeekday",
                            },
                            {
                              option: "Recurs Monthly",
                              value: "RecursMonthly",
                            },
                            {
                              option: "Recurs Monthly Nth",
                              value: "RecursMonthlyNth",
                            },
                            {
                              option: "Recurs Weekly",
                              value: "RecursWeekly",
                            },
                            {
                              option: "Recurs Yearly",
                              value: "RecursYearly",
                            },
                            {
                              option: "Recurs Yearly Nth",
                              value: "RecursYearlyNth",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Update Task": [
                  {
                    type: "api",
                    label: "Task",
                    variableName: "taskId",
                    value: "None",
                    required: true,
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
                              "salesforce/listTasks",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.tasks",
                      keys: {
                        option: {
                          fields: ["id"],
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Status",
                    variableName: "status_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Status",
                          variableName: "status",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "activityDate",
                    variableName: "activityDate_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          placeholder: "Select a Date",
                          variableName: "activityDate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "priority_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "priority",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "High",
                              value: "High",
                            },
                            {
                              option: "Low",
                              value: "Low",
                            },
                            {
                              option: "Normal",
                              value: "Normal",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Owner ID",
                    variableName: "ownerId_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Owner ID",
                          variableName: "ownerId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "description_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Description",
                          variableName: "description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Duration In Seconds",
                    variableName: "callDurationInSeconds_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "Call Duration In Seconds",
                          variableName: "callDurationInSeconds",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Type",
                    variableName: "callType_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "callType",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Inbound",
                              value: "Inbound",
                            },
                            {
                              option: "Internal",
                              value: "Internal",
                            },
                            {
                              option: "Outbound",
                              value: "Outbound",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Disposition",
                    variableName: "callDisposition_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Call Disposition",
                          variableName: "callDisposition",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Call Object",
                    variableName: "callObject_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Call Object",
                          variableName: "callObject",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Reminder Date Time",
                    variableName: "reminderDateTime_update_task",
                    fieldsArray: [
                      [
                        {
                          date: true,
                          label: "Date",
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Date",
                          variableName: "date",
                          hasDynamicVariable: true,
                        },
                        {
                          label: "Time",
                          timeWithSeconds: true,
                          type: "textfield",
                          value: "",
                          placeholder: "Select a Time",
                          variableName: "time",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Is Reminder Set",
                    variableName: "isReminderSet_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isReminderSet",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Subject",
                    variableName: "subject_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "subject",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Call",
                              value: "Call",
                            },
                            {
                              option: "Send Letter",
                              value: "Send Letter",
                            },
                            {
                              option: "Send Quote",
                              value: "Send Quote",
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
                                variableName: "value_subject_update_task",
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
                    accTitle: "Type",
                    variableName: "taskSubtype_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "taskSubtype",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Call",
                              value: "Call",
                            },
                            {
                              option: "Email",
                              value: "Email",
                            },
                            {
                              option: "LinkedIn",
                              value: "LinkedIn",
                            },
                            {
                              option: "List Email",
                              value: "ListEmail",
                            },
                            {
                              option: "Task",
                              value: "Task",
                            },
                            {
                              option: "Cadence",
                              value: "Cadence",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Who ID",
                    variableName: "whoId_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Who ID",
                          variableName: "whoId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "What ID",
                    variableName: "whatId_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "What ID",
                          variableName: "whatId",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Interval",
                    variableName: "recurrenceInterval_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "recurrenceInterval",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Regenerated Type",
                    variableName: "recurrenceRegeneratedType_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "recurrenceRegeneratedType",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "After Due Date",
                              value: "RecurrenceRegenerateAfterDueDate",
                            },
                            {
                              option: "After Date Completed",
                              value: "RecurrenceRegenerateAfterToday",
                            },
                            {
                              option: "(Task Closed)",
                              value: "RecurrenceRegenerated",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Day Of Week Mask",
                    variableName: "recurrenceDayOfWeekMask_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "recurrenceDayOfWeekMask",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Day Of Month",
                    variableName: "recurrenceDayOfMonth_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          placeholder: "0",
                          variableName: "recurrenceDayOfMonth",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Instance",
                    variableName: "recurrenceInstance_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "recurrenceInstance",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Month Of Year",
                    variableName: "recurrenceMonthOfYear_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "Please Select one",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "January",
                              value: "January",
                            },
                            {
                              option: "February",
                              value: "February",
                            },
                            {
                              option: "March",
                              value: "March",
                            },
                            {
                              option: "April",
                              value: "April",
                            },
                            {
                              option: "May",
                              value: "May",
                            },
                            {
                              option: "June",
                              value: "June",
                            },
                            {
                              option: "July",
                              value: "July",
                            },
                            {
                              option: "August",
                              value: "August",
                            },
                            {
                              option: "September",
                              value: "September",
                            },
                            {
                              option: "October",
                              value: "October",
                            },
                            {
                              option: "November",
                              value: "November",
                            },
                            {
                              option: "December",
                              value: "December",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Dates",
                    variableName: "recurrenceDates_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          label: "Recurrence Start Date Only",
                          placeholder: "Select a Date",
                          variableName: "recurrenceStartDateOnly",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          value: "",
                          date: true,
                          label: "Recurrence End Date Only",
                          placeholder: "Select a Date",
                          variableName: "recurrenceEndDateOnly",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Time Zone Sid Key",
                    variableName: "recurrenceTimeZoneSidKey_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Recurrence Time Zone Sid Key",
                          variableName: "recurrenceTimeZoneSidKey",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurrence Type",
                    variableName: "recurrenceType_update_task",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "recurrenceType",
                          list: [
                            {
                              option: "None",
                              value: "none",
                            },
                            {
                              option: "Recurs Daily",
                              value: "RecursDaily",
                            },
                            {
                              option: "Recurs Every Weekday",
                              value: "RecursEveryWeekday",
                            },
                            {
                              option: "Recurs Monthly",
                              value: "RecursMonthly",
                            },
                            {
                              option: "Recurs Monthly Nth",
                              value: "RecursMonthlyNth",
                            },
                            {
                              option: "Recurs Weekly",
                              value: "RecursWeekly",
                            },
                            {
                              option: "Recurs Yearly",
                              value: "RecursYearly",
                            },
                            {
                              option: "Recurs Yearly Nth",
                              value: "RecursYearlyNth",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Delete Task": [
                  {
                    type: "api",
                    label: "Task",
                    variableName: "taskId",
                    value: "None",
                    required: true,
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
                              "salesforce/listTasks",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                      path: "data.tasks",
                      keys: {
                        option: {
                          fields: ["id"],
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
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
                  option: "Get Many",
                  value: "List Users",
                },
              ],
              options: {
                "Get User": [
                  {
                    type: "api",
                    label: "User",
                    variableName: "userId",
                    value: "None",
                    required: true,
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
                              "salesforce/listUsers",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              {
                                type: "static",
                                value: "Bearer ",
                              },
                              {
                                type: "redux",
                                value: "authentication.authToken",
                              },
                            ],
                          },
                          {
                            key: "content-type",
                            value: "application/json",
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
                    conditionOnFirstTime: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                    conditionOnRefresh: [
                      {
                        type: "dropdown",
                        name: "cred",
                        isAutomation: true,
                      },
                    ],
                  },
                ],
                "List Users": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_list_users",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Fields",
                          variableName: "fields",
                          helperSpan: "Fields to include separated by ,",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Condition",
                    variableName: "conditions_list_users",
                    structure: [
                      {
                        type: "row",
                        title: "Condition",
                        variableName: "conditions_list_users",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        required: true,
                        placeholder: "field='example'",
                        variableName: "conditions",
                        hasDynamicVariable: true,
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
  }
};