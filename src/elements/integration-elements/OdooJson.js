export const OdooJson = {
  "category": "integration",
  "type": "Odoo",
  "label": "Odoo",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Odoo/getting_started",
  "description": "Odoo integration",
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
        "credType": "Odoo",
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
        value: "Contact",
        variableName: "type",
        errorSpan: "Please choose a resource",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Contact",
            value: "Contact",
          },
          // {
          //   option: "Company",
          //   value: "Company",
          // },
          {
            option: "Custom Resource",
            value: "Custom Resource",
          },
          {
            option: "Opportunity",
            value: "Opportunity",
          },
          // {
          //   option: "User",
          //   value: "User",
          // },
          // {
          //   option: "Sales Team",
          //   value: "Sales Team",
          // },
          // {
          //   option: "Sales Team Member",
          //   value: "Sales Team Member",
          // },
          // {
          //   option: "Sales Orders",
          //   value: "Sales Orders",
          // },
          // {
          //   option: "Product",
          //   value: "Product",
          // },
          // {
          //   option: "Product Category",
          //   value: "Product Category",
          // },
        ],
        options: {
          Contact: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Contact",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Contact",
                },
                {
                  option: "Get Many",
                  value: "Get Many Contact",
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
              ],
              options: {
                "Get Contact": [
                  {
                    type: "api",
                    label: "Contacts",
                    variableName: "contact_id_GetContact",
                    value: "None",
                    required: true,
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
                              "odoo/getManyContact",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Contacts",
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
                    title: "Fields to Include",
                    accTitle: "Fields",
                    variableName: "fields_GetContact",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_GetContact",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
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
                              option: "Mobile",
                              value: "mobile",
                            },
                            {
                              option: "Website",
                              value: "website",
                            },
                            {
                              option: "Internal Notes",
                              value: "comment",
                            },
                            {
                              option: "Job Position",
                              value: "function",
                            },

                            {
                              option: "Tax Id",
                              value: "vat",
                            },
                            {
                              option: "City",
                              value: "city",
                            },
                            {
                              option: "Country ID",
                              value: "country_id",
                            },

                            {
                              option: "State ID",
                              value: "state_id",
                            },
                            {
                              option: "Street",
                              value: "street",
                            },
                            {
                              option: "Street 2",
                              value: "street2",
                            },
                            {
                              option: "Zip",
                              value: "zip",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Contact": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_Get_Many_Contact",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_Many_Contact",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
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
                              option: "Mobile",
                              value: "mobile",
                            },
                            {
                              option: "Website",
                              value: "website",
                            },
                            {
                              option: "Internal Notes",
                              value: "comment",
                            },
                            {
                              option: "Job Position",
                              value: "function",
                            },

                            {
                              option: "Tax Id",
                              value: "vat",
                            },
                            {
                              option: "City",
                              value: "city",
                            },
                            {
                              option: "Country ID",
                              value: "country_id",
                            },
                            {
                              option: "State ID",
                              value: "state_id",
                            },

                            {
                              option: "Street",
                              value: "street",
                            },
                            {
                              option: "Street 2",
                              value: "street2",
                            },
                            {
                              option: "Zip",
                              value: "zip",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_Get_Many_Contact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_Get_Many_Contact",
                          rightSideInput: true,
                          placeholder: "Limit",
                          hasDynamicVariable: true,
                          numberField: true,
                          typeOfValue: "integer",
                        },
                      ],
                    ],
                  },
                ],
                "Create Contact": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateContact",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },

                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "email_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile",
                    variableName: "mobile_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile",
                          variableName: "mobile_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "website_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Website",
                          variableName: "website_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Internal Notes",
                    variableName: "comment_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Internal Notes",
                          variableName: "comment_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Job Position",
                    variableName: "function_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Job Position",
                          variableName: "function_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tax Id",
                    variableName: "vat_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Tax Id",
                          variableName: "vat_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "City",
                    variableName: "city_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "City",
                          variableName: "city_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Street",
                    variableName: "street_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street",
                          variableName: "street_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Street 2",
                    variableName: "street2_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street 2",
                          variableName: "street2_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Zip",
                    variableName: "zip_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Zip",
                          variableName: "zip_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country",
                    variableName: "country_id_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "country_id",
                          value: "None",
                          required: false,
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
                                    "odoo/getManyCountry",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.Country",
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
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country State",
                    variableName: "state_id_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "state_id_CreateContact",
                          value: "None",
                          required: false,
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
                                    "odoo/getManyState",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.State",
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
                    ],
                  },
                ],
                "Update Contact": [
                  {
                    type: "api",
                    label: "Contacts",
                    variableName: "contact_id_UpdateContact",
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
                              "odoo/getManyContact",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Contacts",
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
                    title: "Update Fields",
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "email_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile",
                    variableName: "mobile_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile",
                          variableName: "mobile_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "website_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Website",
                          variableName: "website_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Internal Notes",
                    variableName: "comment_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Internal Notes",
                          variableName: "comment_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Job Position",
                    variableName: "function_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Job Position",
                          variableName: "function_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tax Id",
                    variableName: "vat_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Tax Id",
                          variableName: "vat_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "City",
                    variableName: "city_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "City",
                          variableName: "city_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Street",
                    variableName: "street_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street",
                          variableName: "street_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Street 2",
                    variableName: "street2_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street 2",
                          variableName: "street2_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Zip",
                    variableName: "zip_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Zip",
                          variableName: "zip_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country",
                    variableName: "country_id_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "country_id_UpdateContact",
                          value: "None",
                          required: false,
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
                                    "odoo/getManyCountry",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.Country",
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
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country State",
                    variableName: "state_id_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "state_id_UpdateContact",
                          value: "None",
                          required: false,
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
                                    "odoo/getManyState",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.State",
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
                    ],
                  },
                ],
                "Delete Contact": [
                  {
                    type: "api",
                    label: "Contacts",
                    variableName: "contact_id_DeleteContact",
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
                              "odoo/getManyContact",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Contacts",
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
          Company: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Company",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Company",
                },
                {
                  option: "Get Many",
                  value: "Get Many Company",
                },
                {
                  option: "Create",
                  value: "Create Company",
                },
                {
                  option: "Update",
                  value: "Update Company",
                },
              ],
              options: {
                "Get Company": [
                  {
                    type: "api",
                    label: "Company",
                    variableName: "company_id_GetCompany",
                    value: "None",
                    required: true,
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
                              "odoo/getManyCompany",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Companies",
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
                    title: "Fields to Include",
                    accTitle: "Fields",
                    variableName: "fields_GetCompany",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_GetCompany",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
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
                              option: "Mobile",
                              value: "mobile",
                            },
                            {
                              option: "Website",
                              value: "website",
                            },

                            {
                              option: "Tax Id",
                              value: "vat",
                            },
                            {
                              option: "City",
                              value: "city",
                            },
                            {
                              option: "Country ID",
                              value: "country_id",
                            },

                            {
                              option: "State ID",
                              value: "state_id",
                            },
                            {
                              option: "Street",
                              value: "street",
                            },
                            {
                              option: "Street 2",
                              value: "street2",
                            },
                            {
                              option: "Zip",
                              value: "zip",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Company": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_Get_Many_Company",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_Many_Company",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
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
                              option: "Mobile",
                              value: "mobile",
                            },
                            {
                              option: "Website",
                              value: "website",
                            },
                            {
                              option: "Tax Id",
                              value: "vat",
                            },
                            {
                              option: "City",
                              value: "city",
                            },
                            {
                              option: "Country Code",
                              value: "country_code",
                            },

                            {
                              option: "State ID",
                              value: "state_id",
                            },
                            {
                              option: "Street",
                              value: "street",
                            },
                            {
                              option: "Street 2",
                              value: "street2",
                            },
                            {
                              option: "Zip",
                              value: "zip",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_Get_Many_Company",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_Get_Many_Company",
                          rightSideInput: true,
                          placeholder: "Limit",
                          hasDynamicVariable: true,
                          numberField: true,
                          typeOfValue: "integer",
                        },
                      ],
                    ],
                  },
                ],
                "Create Company": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateCompany",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },

                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "email_CreateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_CreateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile",
                    variableName: "mobile_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile",
                          variableName: "mobile_CreateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "website_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Website",
                          variableName: "website_CreateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tax Id",
                    variableName: "vat_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Tax Id",
                          variableName: "vat_CreateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "City",
                    variableName: "city_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "City",
                          variableName: "city_CreateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Street",
                    variableName: "street_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street",
                          variableName: "street_CreateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Street 2",
                    variableName: "street2_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street 2",
                          variableName: "street2_CreateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Zip",
                    variableName: "zip_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Zip",
                          variableName: "zip_CreateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country",
                    variableName: "country_id_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "country_id_CreateCompany",
                          value: "None",
                          required: false,
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
                                    "odoo/getManyCountry",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.Country",
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
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country State",
                    variableName: "state_id_CreateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "state_id_CreateCompany",
                          value: "None",
                          required: false,
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
                                    "odoo/getManyState",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.State",
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
                    ],
                  },
                ],
                "Update Company": [
                  {
                    type: "api",
                    label: "Company",
                    variableName: "company_id_UpdateCompany",
                    value: "None",
                    required: true,
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
                              "odoo/getManyCompany",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Companies",
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
                    title: "Update Fields",
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_UpdateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "email_UpdateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_UpdateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile",
                    variableName: "mobile_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Mobile",
                          variableName: "mobile_UpdateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Website",
                    variableName: "website_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Website",
                          variableName: "website_UpdateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Tax Id",
                    variableName: "vat_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Tax Id",
                          variableName: "vat_UpdateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "City",
                    variableName: "city_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "City",
                          variableName: "city_UpdateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Street",
                    variableName: "street_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street",
                          variableName: "street_UpdateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Street 2",
                    variableName: "street2_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Street 2",
                          variableName: "street2_UpdateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Zip",
                    variableName: "zip_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Zip",
                          variableName: "zip_UpdateCompany",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country",
                    variableName: "country_id_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "country_id_UpdateCompany",
                          value: "None",
                          required: false,
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
                                    "odoo/getManyCountry",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.Country",
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
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Country State",
                    variableName: "state_id_UpdateCompany",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "state_id_UpdateCompany",
                          value: "None",
                          required: false,
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
                                    "odoo/getManyState",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.State",
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
                    ],
                  },
                ],
              },
            },
          ],
          "Custom Resource": [
            {
              type: "api",
              label: "Models",
              variableName: "model_CustomResource",
              value: "None",
              required: true,
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
                        "odoo/getAllModel",
                    },
                  ],
                },
                {
                  key: "headers",
                  obj: [
                    {
                      key: "Authorization",
                      dependOn: [
                        { type: "static", value: "Bearer " },
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
                path: "data.models",
                keys: {
                  option: { fields: ["display_name"] },
                  value: { fields: ["model"] },
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
              type: "dropdown",
              label: "Operation",
              value: "Get Custom Resource",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Custom Resource",
                },

                {
                  option: "Get Many",
                  value: "Get Many Custom Resource",
                },
                {
                  option: "Create",
                  value: "Create Custom Resource",
                },
                {
                  option: "Update",
                  value: "Update Custom Resource",
                },
                {
                  option: "Delete",
                  value: "Delete Custom Resource",
                },
              ],
              options: {
                "Get Custom Resource": [
                  {
                    type: "textfield",
                    label: "Custom Resource ID",
                    required: true,
                    variableName: "id_GetCustomResource",
                    value: "",
                    placeholder: "Custom Resource ID",
                    hasDynamicVariable: true,
                    numberField: true,
                    typeOfValue: "integer",
                  },

                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Field",
                    variableName: "fields_GetCustomResource",
                    structure: [
                      {
                        type: "row",
                        title: "Field to Include",
                        variableName: "fieldGet",
                        removeButton: true,
                      },

                      {
                        type: "textfield",
                        label: "Field",
                        value: "",
                        required: false,
                        placeholder: "Field",
                        variableName: "fields_GetCustom",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Get Many Custom Resource": [
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_Get_Many_CustomResource",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_Get_Many_CustomResource",
                          rightSideInput: true,
                          placeholder: "Limit",
                          hasDynamicVariable: true,
                          numberField: true,
                          typeOfValue: "integer",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Field",
                    variableName: "fields_GetManyCustomResource",
                    structure: [
                      {
                        type: "row",
                        title: "Field to Include",
                        variableName: "fieldGet",
                        removeButton: true,
                      },

                      {
                        type: "textfield",
                        label: "Field",
                        value: "",
                        required: false,
                        placeholder: "Field",
                        variableName: "fields_GetManyCustom",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Create Custom Resource": [
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Custom Field",
                    variableName: "customFields_CreateCustomResource",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "fieldCustom",
                        removeButton: true,
                      },

                      {
                        type: "textfield",
                        label: "Fields",
                        value: "",
                        required: true,
                        placeholder: "Fields",
                        variableName: "keyFields",
                        hasDynamicVariable: true,
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "valueFields",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Update Custom Resource": [
                  {
                    type: "textfield",
                    label: "Custom Resource ID",
                    required: true,
                    variableName: "id_UpdateCustomResource",
                    value: "",
                    placeholder: "Custom Resource ID",
                    hasDynamicVariable: true,
                    numberField: true,
                    typeOfValue: "integer",
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Update Field",
                    variableName: "customFields_UpdateCustomResource",
                    structure: [
                      {
                        type: "row",
                        title: "Custom Field",
                        variableName: "fieldCustom",
                        removeButton: true,
                      },

                      {
                        type: "textfield",
                        label: "Fields",
                        value: "",
                        required: true,
                        placeholder: "Fields",
                        variableName: "keyFields",
                        hasDynamicVariable: true,
                      },
                      {
                        type: "textfield",
                        label: "Value",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "valueFields",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "Delete Custom Resource": [
                  {
                    type: "textfield",
                    label: "Custom Resource ID",
                    required: true,
                    variableName: "id_DeleteCustomResource",
                    value: "",
                    placeholder: "Custom Resource ID",
                    hasDynamicVariable: true,
                    numberField: true,
                    typeOfValue: "integer",
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
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Opportunity",
                },
                {
                  option: "Get Many",
                  value: "Get Many Opportunity",
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
                "Get Opportunity": [
                  {
                    type: "api",
                    label: "Opportunity",
                    variableName: "opportunity_id_GetOpportunity",
                    value: "None",
                    required: true,
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
                              "odoo/getManyOpportunity",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Opportunities",
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
                    title: "Fields to Include",
                    accTitle: "Fields",
                    variableName: "fields_GetOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_GetOpportunity",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Email",
                              value: "email_normalized",
                            },
                            {
                              option: "Expected Revenue",
                              value: "expected_revenue",
                            },
                            {
                              option: "Description",
                              value: "description",
                            },
                            {
                              option: "Phone",
                              value: "phone",
                            },
                            {
                              option: "Priority",
                              value: "priority",
                            },
                            {
                              option: "Probability",
                              value: "probability",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Opportunity": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_Get_Many_Opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_Many_Opportunity",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Email",
                              value: "email_normalized",
                            },
                            {
                              option: "Expected Revenue",
                              value: "expected_revenue",
                            },
                            {
                              option: "Description",
                              value: "description",
                            },
                            {
                              option: "Phone",
                              value: "phone",
                            },
                            {
                              option: "Priority",
                              value: "priority",
                            },
                            {
                              option: "Probability",
                              value: "probability",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_Get_Many_Opportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_Get_Many_Opportunity",
                          rightSideInput: true,
                          placeholder: "Limit",
                          hasDynamicVariable: true,
                          numberField: true,
                          typeOfValue: "integer",
                        },
                      ],
                    ],
                  },
                ],
                "Create Opportunity": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateOpportunity",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Organization / Contact",
                    variableName: "partner_id_CreateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "partner_id_CreateOpportunity",
                          value: "None",
                          required: false,
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
                                    "odoo/getManyContact",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.Contacts",
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
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Salesperson",
                    variableName: "user_id_CreateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "user_id_CreateOpportunity",
                          value: "None",
                          required: false,
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
                                    "odoo/getManyUser",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.Users",
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
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Expected Revenue",
                    variableName: "expected_revenue_CreateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Expected Revenue",
                          variableName: "expected_revenue_CreateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          numberField: true,
                          typeOfValue: "float",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Recurring Revenue Monthly",
                    variableName: "recurring_revenue_monthly_CreateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Recurring Revenue Monthly",
                          variableName:
                            "recurring_revenue_monthly_CreateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          numberField: true,
                          typeOfValue: "float",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Internal Notes",
                    variableName: "description_CreateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Internal Notes",
                          variableName: "description_CreateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_CreateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_CreateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "priority_CreateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          required: false,
                          value: "None",
                          variableName: "priority_CreateOpportunity",
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Meduim",
                              value: "1",
                            },
                            {
                              option: "High",
                              value: "2",
                            },
                            {
                              option: "Very High",
                              value: "3",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Probability",
                    variableName: "probability_CreateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Probability",
                          variableName: "probability_CreateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          numberField: true,
                          typeOfValue: "float",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Expected Closing",
                    variableName: "date_deadline_CreateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Expected Closing",
                          variableName: "date_deadline_CreateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          date: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Tags Id",
                    variableName: "tag_ids_CreateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Tags Id",
                          variableName: "tag_ids_CreateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Update Opportunity": [
                  {
                    type: "api",
                    label: "Opportunity",
                    variableName: "opportunity_id_UpdateOpportunity",
                    value: "None",
                    required: true,
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
                              "odoo/getManyOpportunity",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Opportunities",
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
                    title: "Update Fields",
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_UpdateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_UpdateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Expected Revenue",
                    variableName: "expected_revenue_UpdateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Expected Revenue",
                          variableName: "expected_revenue_UpdateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          numberField: true,
                          typeOfValue: "float",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Internal Notes",
                    variableName: "description_UpdateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Internal Notes",
                          variableName: "description_UpdateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "phone_UpdateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_UpdateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Priority",
                    variableName: "priority_UpdateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          required: false,
                          value: "None",
                          variableName: "priority_UpdateOpportunity",
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Meduim",
                              value: "1",
                            },
                            {
                              option: "High",
                              value: "2",
                            },
                            {
                              option: "Very High",
                              value: "3",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Probability",
                    variableName: "probability_UpdateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Probability",
                          variableName: "probability_UpdateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          numberField: true,
                          typeOfValue: "float",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Expected Closing",
                    variableName: "date_deadline_UpdateOpportunity",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Expected Closing",
                          variableName: "date_deadline_UpdateOpportunity",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          date: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Opportunity": [
                  {
                    type: "api",
                    label: "Opportunity",
                    variableName: "opportunity_id_DeleteOpportunity",
                    value: "None",
                    required: true,
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
                              "odoo/getManyOpportunity",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Opportunities",
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
              ],
              options: {
                "Get User": [
                  {
                    type: "api",
                    label: "Users",
                    variableName: "user_id_GetUser",
                    value: "None",
                    required: true,
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
                              "odoo/getManyUser",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Users",
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
                    title: "Fields to Include",
                    accTitle: "Fields",
                    variableName: "fields_GetUser",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_GetUser",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Email",
                              value: "email",
                            },
                            {
                              option: "Opportunity Count",
                              value: "opportunity_count",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Get Many User": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields to Include",
                    variableName: "fields_Get_Many_User",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_Many_User",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Email",
                              value: "email",
                            },
                            {
                              option: "Opportunity Count",
                              value: "opportunity_count",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_Get_Many_User",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_Get_Many_User",
                          rightSideInput: true,
                          placeholder: "Limit",
                          hasDynamicVariable: true,
                          numberField: true,
                          typeOfValue: "integer",
                        },
                      ],
                    ],
                  },
                ],
                "Create User": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateUser",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Email",
                    required: true,
                    variableName: "email_CreateUser",
                    value: "",
                    placeholder: "Email",
                    hasDynamicVariable: true,
                  },
                ],
                "Update User": [
                  {
                    type: "api",
                    label: "Users",
                    variableName: "user_id_UpdateUser",
                    value: "None",
                    required: true,
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
                              "odoo/getManyUser",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Users",
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
                    title: "Update Fields",
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_UpdateUser",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_UpdateUser",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_UpdateUser",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "email_UpdateUser",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete User": [
                  {
                    type: "api",
                    label: "Users",
                    variableName: "user_id_DeleteUser",
                    value: "None",
                    required: true,
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
                              "odoo/getManyUser",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Users",
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
          "Sales Team": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Sales Team",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Sales Team",
                },
                {
                  option: "Get Many",
                  value: "Get Many Sales Team",
                },
                {
                  option: "Create",
                  value: "Create Sales Team",
                },
                {
                  option: "Update",
                  value: "Update Sales Team",
                },
                {
                  option: "Delete",
                  value: "Delete Sales Team",
                },
              ],
              options: {
                "Get Sales Team": [
                  {
                    type: "api",
                    label: "Sales Team",
                    variableName: "sales_team_id_GetSalesTeam",
                    value: "None",
                    required: true,
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
                              "odoo/getManySalesTeam",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.SalesTeam",
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
                    title: "Fields to Include",
                    accTitle: "Fields",
                    variableName: "fields_GetSalesTeam",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_GetSalesTeam",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Alias Name",
                              value: "alias_name",
                            },
                            {
                              option: "Alias Email",
                              value: "alias_email",
                            },
                            {
                              option: "Team Leader",
                              value: "user_id",
                            },
                            {
                              option: "Opportunities Count",
                              value: "opportunities_count",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Sales Team": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields to Include",
                    variableName: "fields_Get_Many_SalesTeam",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_Many_SalesTeam",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Alias Name",
                              value: "alias_name",
                            },
                            {
                              option: "Alias Email",
                              value: "alias_email",
                            },
                            {
                              option: "Team Leader",
                              value: "user_id",
                            },
                            {
                              option: "Opportunities Count",
                              value: "opportunities_count",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_Get_Many_SalesTeam",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_Get_Many_SalesTeam",
                          rightSideInput: true,
                          placeholder: "Limit",
                          hasDynamicVariable: true,
                          numberField: true,
                          typeOfValue: "integer",
                        },
                      ],
                    ],
                  },
                ],
                "Create Sales Team": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateSalesTeam",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Team Leader",
                    variableName: "user_id_CreateSalesTeam",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "user_id_CreateSalesTeam",
                          value: "None",
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
                                    "odoo/getManyUser",
                                },
                              ],
                            },
                            {
                              key: "headers",
                              obj: [
                                {
                                  key: "Authorization",
                                  dependOn: [
                                    { type: "static", value: "Bearer " },
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
                            path: "data.Users",
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
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Alias Name",
                    variableName: "alias_name_CreateSalesTeam",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Alias Name",
                          variableName: "alias_name_CreateSalesTeam",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "The name of the email alias, e.g. 'jobs' if you want to catch emails for <jobs@example.odoo.com>",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Accept Emails From",
                    variableName: "alias_contact_CreateSalesTeam",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          required: false,
                          value: "everyone",
                          variableName: "alias_contact_CreateSalesTeam",
                          list: [
                            {
                              option: "Everyone",
                              value: "everyone",
                            },
                            {
                              option: "Authenticated Partners",
                              value: "partners",
                            },
                            {
                              option: "Followers only",
                              value: "followers",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Update Sales Team": [
                  {
                    type: "api",
                    label: "Sales Team",
                    variableName: "sales_team_id_UpdateSalesTeam",
                    value: "None",
                    required: true,
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
                              "odoo/getManySalesTeam",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.SalesTeam",
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
                    title: "Update Fields",
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_UpdateSalesTeam",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_UpdateSalesTeam",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Alias Name",
                    variableName: "alias_name_UpdateSalesTeam",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Alias Name",
                          variableName: "alias_name_UpdateSalesTeam",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "The name of the email alias, e.g. 'jobs' if you want to catch emails for <jobs@example.odoo.com>",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Accept Emails From",
                    variableName: "alias_contact_UpdateSalesTeam",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          required: false,
                          value: "None",
                          variableName: "alias_contact_UpdateSalesTeam",
                          list: [
                            {
                              option: "None",
                              value: "None",
                            },
                            {
                              option: "Everyone",
                              value: "everyone",
                            },
                            {
                              option: "Authenticated Partners",
                              value: "partners",
                            },
                            {
                              option: "Followers only",
                              value: "followers",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Delete Sales Team": [
                  {
                    type: "api",
                    label: "Sales Team",
                    variableName: "sales_team_id_DeleteSalesTeam",
                    value: "None",
                    required: true,
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
                              "odoo/getManySalesTeam",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.SalesTeam",
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
          "Sales Team Member": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Sales Team Member",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Sales Team Member",
                },
                {
                  option: "Get Many",
                  value: "Get Many Sales Team Member",
                },
                {
                  option: "Create",
                  value: "Create Sales Team Member",
                },
                {
                  option: "Delete",
                  value: "Delete Sales Team Member",
                },
              ],
              options: {
                "Get Sales Team Member": [
                  {
                    type: "api",
                    label: "Sales Team Member",
                    variableName: "crm_team_id_GetSalesTeamMember",
                    value: "None",
                    required: true,
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
                              "odoo/getManySalesTeamMember",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.SalesTeamMember",
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
                    title: "Fields to Include",
                    accTitle: "Fields",
                    variableName: "fields_GetSalesTeamMember",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_GetSalesTeamMember",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Sales Team",
                              value: "crm_team_id",
                            },
                            {
                              option: "Email",
                              value: "email",
                            },
                            {
                              option: "Lead Month Count",
                              value: "lead_month_count",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Sales Team Member": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields to Include",
                    variableName: "fields_Get_Many_SalesTeamMember",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_Many_SalesTeamMember",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Sales Team",
                              value: "crm_team_id",
                            },
                            {
                              option: "Email",
                              value: "email",
                            },
                            {
                              option: "Lead Month Count",
                              value: "lead_month_count",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_Get_Many_SalesTeamMember",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_Get_Many_SalesTeamMember",
                          rightSideInput: true,
                          placeholder: "Limit",
                          hasDynamicVariable: true,
                          numberField: true,
                          typeOfValue: "integer",
                        },
                      ],
                    ],
                  },
                ],
                "Create Sales Team Member": [
                  {
                    type: "api",
                    label: "Sales Team",
                    variableName: "sales_team_id_CreateSalesTeamMember",
                    value: "None",
                    required: true,
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
                              "odoo/getManySalesTeam",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.SalesTeam",
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
                    label: "SalesPerson",
                    variableName: "user_id_CreateSalesTeamMember",
                    value: "None",
                    required: true,
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
                              "odoo/getManyUser",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Users",
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

                "Delete Sales Team Member": [
                  {
                    type: "api",
                    label: "Sales Team Member",
                    variableName: "crm_team_id_DeleteSalesTeamMember",
                    value: "None",
                    required: true,
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
                              "odoo/getManySalesTeamMember",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.SalesTeamMember",
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
          "Sales Orders": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Sales Orders",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Sales Orders",
                },
                {
                  option: "Get Many",
                  value: "Get Many Sales Orders",
                },
                {
                  option: "Create",
                  value: "Create Sales Orders",
                },
                {
                  option: "Update",
                  value: "Update Sales Orders",
                },
                {
                  option: "Delete",
                  value: "Delete Sales Orders",
                },
              ],
              options: {
                "Get Sales Orders": [
                  {
                    type: "api",
                    label: "Orders",
                    variableName: "order_id_Get_SalesOrders",
                    value: "None",
                    required: true,
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
                              "odoo/getManySalesOrder",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.SalesOrders",
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
                    accTitle: "Fields",
                    variableName: "fields_Get_SalesOrders",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_SalesOrders",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Customer ID",
                              value: "partner_id",
                            },
                            {
                              option: "Sales Person ID",
                              value: "user_id",
                            },
                            {
                              option: "Sales Team ID",
                              value: "team_id",
                            },
                            {
                              option: "Order Line",
                              value: "order_line",
                            },
                            {
                              option: "Note",
                              value: "note",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Sales Orders": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_Get_Many_SalesOrders",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_Many_SalesOrders",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Customer ID",
                              value: "partner_id",
                            },
                            {
                              option: "Sales Person ID",
                              value: "user_id",
                            },
                            {
                              option: "Sales Team ID",
                              value: "team_id",
                            },
                            {
                              option: "Order Line",
                              value: "order_line",
                            },
                            {
                              option: "Note",
                              value: "note",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_Get_Many_SalesOrders",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_Get_Many_SalesOrders",
                          rightSideInput: true,
                          placeholder: "Limit",
                          hasDynamicVariable: true,
                          numberField: true,
                          typeOfValue: "integer",
                        },
                      ],
                    ],
                  },
                ],
                "Create Sales Orders": [
                  {
                    type: "api",
                    label: "Customers",
                    variableName: "partner_id_CreateSalesOrders",
                    value: "None",
                    required: true,
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
                              "odoo/getManyContact",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Contacts",
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
                    label: "Salesperson",
                    variableName: "user_id_CreateSalesOrders",
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
                              "odoo/getManyUser",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Users",
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
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Order Line",
                    variableName: "order_line_CreateSalesOrders",
                    required: true,
                    structure: [
                      {
                        type: "row",
                        title: "Order Line",
                        variableName: "OrderLine",
                        removeButton: true,
                      },
                      {
                        type: "api",
                        label: "Products",
                        variableName: "product_id_CreateSalesOrders",
                        value: "None",
                        required: true,
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
                                  "odoo/getManyProduct",
                              },
                            ],
                          },
                          {
                            key: "headers",
                            obj: [
                              {
                                key: "Authorization",
                                dependOn: [
                                  { type: "static", value: "Bearer " },
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
                          path: "data.Products",
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
                        label: "Quantity",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "product_uom_qty_CreateSalesOrders",
                        hasDynamicVariable: true,
                        numberField: true,
                        typeOfValue: "integer",
                      },
                    ],
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Note",
                    variableName: "note_CreateSalesOrders",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Note",
                          variableName: "note_CreateSalesOrders",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Update Sales Orders": [
                  {
                    type: "api",
                    label: "Orders",
                    variableName: "order_id_UpdateSalesOrders",
                    value: "None",
                    required: true,
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
                              "odoo/getManySalesOrder",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.SalesOrders",
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
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Order Line",
                    variableName: "order_line_UpdateSalesOrders",
                    structure: [
                      {
                        type: "row",
                        title: "Order Line",
                        variableName: "OrderLine",
                        removeButton: true,
                      },

                      {
                        type: "api",
                        label: "Products",
                        variableName: "product_id_UpdateSalesOrders",
                        value: "None",
                        required: true,
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
                                  "odoo/getManyProduct",
                              },
                            ],
                          },
                          {
                            key: "headers",
                            obj: [
                              {
                                key: "Authorization",
                                dependOn: [
                                  { type: "static", value: "Bearer " },
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
                          path: "data.Products",
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
                        label: "Quantity",
                        value: "",
                        required: true,
                        placeholder: "",
                        variableName: "product_uom_qty_UpdateSalesOrders",
                        hasDynamicVariable: true,
                        numberField: true,
                        typeOfValue: "integer",
                      },
                    ],
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Note",
                    variableName: "note_UpdateSalesOrders",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Note",
                          variableName: "note_UpdateSalesOrders",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Sales Orders": [
                  {
                    type: "api",
                    label: "Orders",
                    variableName: "order_id_DeleteSalesOrders",
                    value: "None",
                    required: true,
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
                              "odoo/getManySalesOrder",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.SalesOrders",
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
          Product: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Product",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Product",
                },
                {
                  option: "Get Many",
                  value: "Get Many Product",
                },
                {
                  option: "Create",
                  value: "Create Product",
                },
                {
                  option: "Update",
                  value: "Update Product",
                },
                {
                  option: "Delete",
                  value: "Delete Product",
                },
              ],
              options: {
                "Get Product": [
                  {
                    type: "api",
                    label: "Products",
                    variableName: "product_id_Get_Product",
                    value: "None",
                    required: true,
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
                              "odoo/getManyProduct",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Products",
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
                    accTitle: "Fields",
                    variableName: "fields_Get_Product",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_Product",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Cost",
                              value: "standard_price",
                            },
                            {
                              option: "Price",
                              value: "list_price",
                            },

                            {
                              option: "Internal Notes",
                              value: "description",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Product": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_Get_Many_Product",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_Many_Product",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Cost",
                              value: "standard_price",
                            },
                            {
                              option: "Price",
                              value: "list_price",
                            },

                            {
                              option: "Internal Notes",
                              value: "description",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_Get_Many_Product",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_Get_Many_Product",
                          rightSideInput: true,
                          placeholder: "Limit",
                          hasDynamicVariable: true,
                          numberField: true,
                          typeOfValue: "integer",
                        },
                      ],
                    ],
                  },
                ],
                "Create Product": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateProduct",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Cost",
                    variableName: "standard_price_CreateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Cost",
                          variableName: "standard_price_CreateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          numberField: true,
                          typeOfValue: "float",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Price",
                    variableName: "list_price_CreateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Price",
                          variableName: "list_price_CreateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          numberField: true,
                          typeOfValue: "float",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Internal Notes",
                    variableName: "note_CreateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Internal Notes",
                          variableName: "note_CreateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Update Product": [
                  {
                    type: "api",
                    label: "Products",
                    variableName: "product_id_UpdateProduct",
                    value: "None",
                    required: true,
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
                              "odoo/getManyProduct",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Products",
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
                    title: "Update Fields",
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_UpdateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_UpdateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Cost",
                    variableName: "standard_price_UpdateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Cost",
                          variableName: "standard_price_UpdateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          numberField: true,
                          typeOfValue: "float",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Price",
                    variableName: "list_price_UpdateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Price",
                          variableName: "list_price_UpdateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          numberField: true,
                          typeOfValue: "float",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Internal Notes",
                    variableName: "note_UpdateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Internal Notes",
                          variableName: "note_UpdateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Product": [
                  {
                    type: "api",
                    label: "Products",
                    variableName: "product_id_DeleteProduct",
                    value: "None",
                    required: true,
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
                              "odoo/getManyProduct",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Products",
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
          "Product Category": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Product Category",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Product Category",
                },
                {
                  option: "Get Many",
                  value: "Get Many Product Category",
                },
                {
                  option: "Create",
                  value: "Create Product Category",
                },
                {
                  option: "Update",
                  value: "Update Product Category",
                },
                {
                  option: "Delete",
                  value: "Delete Product Category",
                },
              ],
              options: {
                "Get Product Category": [
                  {
                    type: "api",
                    label: "Product Category",
                    variableName: "category_id_GetProductCategory",
                    value: "None",
                    required: true,
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
                              "odoo/getManyProductCategory",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Categories",
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
                    accTitle: "Fields",
                    variableName: "fields_Get_ProductCategory",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_ProductCategory",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                            {
                              option: "Product Count",
                              value: "product_count",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Product Category": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Fields",
                    variableName: "fields_Get_Many_ProductCategory",
                    fieldsArray: [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Select",
                          variableName: "fields_Get_Many_ProductCategory",
                          value: [],
                          list: [
                            {
                              option: "Name",
                              value: "name",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_Get_Many_ProductCategory",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_Get_Many_ProductCategory",
                          rightSideInput: true,
                          placeholder: "Limit",
                          hasDynamicVariable: true,
                          numberField: true,
                          typeOfValue: "integer",
                        },
                      ],
                    ],
                  },
                ],
                "Create Product Category": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateProductCategory",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },
                ],
                "Update Product Category": [
                  {
                    type: "api",
                    label: "Product Category",
                    variableName: "category_id_UpdateProductCategory",
                    value: "None",
                    required: true,
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
                              "odoo/getManyProductCategory",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Categories",
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
                    title: "Update Fields",
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_UpdateProductCategory",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Name",
                          variableName: "name_UpdateProductCategory",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Product Category": [
                  {
                    type: "api",
                    label: "Product Category",
                    variableName: "category_id_DeleteProductCategory",
                    value: "None",
                    required: true,
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
                              "odoo/getManyProductCategory",
                          },
                        ],
                      },
                      {
                        key: "headers",
                        obj: [
                          {
                            key: "Authorization",
                            dependOn: [
                              { type: "static", value: "Bearer " },
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
                      path: "data.Categories",
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
        },
      },
    ],
  }
};