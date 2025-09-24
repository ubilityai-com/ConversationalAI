export const OutlookJson = {
  category: "integration",
  type: "Outlook",
  label: "Outlook",
  color: "#53D2E2 ",
  docsPath: "Connectors/Outlook/getting_started",
  description: "Outlook integration",
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
        credType: "Microsoft",
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
            type: { fields: ["type"] },
          },
        },
        apiDependsOn: [],
        conditionOnFirstTime: [],
        conditionOnRefresh: [],
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
          {
            option: "Calendar",
            value: "Calendar",
          },
          {
            option: "Event",
            value: "Event",
          },
          {
            option: "Folder",
            value: "Folder",
          },
          {
            option: "Folder Message",
            value: "Folder Message",
          },
          {
            option: "Message",
            value: "Message",
          },
          {
            option: "Message Attachment",
            value: "Message Attachment",
          },
        ],
        options: {
          Contact: [
            {
              type: "dropdown",
              label: "Operation",
              value: "GetContact",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "GetContact",
                },
                {
                  option: "Get Many",
                  value: "GetManyContacts",
                },
                {
                  option: "Create",
                  value: "CreateContact",
                },
                {
                  option: "Update",
                  value: "UpdateContact",
                },
                {
                  option: "Delete",
                  value: "DeleteContact",
                },
              ],
              options: {
                "GetContact": [
                  {
                    type: "api",
                    label: "Contact",
                    variableName: "contact_id_GetContact",
                    value: "",
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
                              "outlook/getManyContact",
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
                        option: { fields: ["displayName"] },
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
                "GetManyContacts": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Filter",
                    variableName: "filter_GetManyContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "filter_GetManyContact",
                          rightSideInput: true,
                          placeholder: "Filter",
                          hasDynamicVariable: true,
                          helperSpan: "e.g displayname eq 'your name'",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_GetManyContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_GetManyContact",
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
                "CreateContact": [
                  {
                    type: "textfield",
                    label: "First Name",
                    required: true,
                    variableName: "givenName_CreateContact",
                    value: "",
                    placeholder: "First Name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Last Name",
                    required: false,
                    variableName: "surname_CreateContact",
                    value: "",
                    placeholder: "Last Name",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Business Address",
                    variableName: "businessAddress_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "City",
                          value: "",
                          placeholder: "City",
                          variableName: "city_businessAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "Country or Region",
                          value: "",
                          placeholder: "Country or Region",
                          variableName:
                            "countryOrRegion_businessAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "Postal Code",
                          value: "",
                          placeholder: "Postal Code",
                          variableName:
                            "postalCode_businessAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "State",
                          value: "",
                          placeholder: "State",
                          variableName: "state_businessAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "Street",
                          value: "",
                          placeholder: "Street",
                          variableName: "street_businessAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Home Address",
                    variableName: "homeAddress_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "City",
                          value: "",
                          placeholder: "City",
                          variableName: "city_homeAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "Country or Region",
                          value: "",
                          placeholder: "Country or Region",
                          variableName:
                            "countryOrRegion_homeAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "Postal Code",
                          value: "",
                          placeholder: "Postal Code",
                          variableName: "postalCode_homeAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "State",
                          value: "",
                          placeholder: "State",
                          variableName: "state_homeAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "Street",
                          value: "",
                          placeholder: "Street",
                          variableName: "street_homeAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Address",
                    variableName: "otherAddress_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "City",
                          value: "",
                          placeholder: "City",
                          variableName: "city_otherAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "Country or Region",
                          value: "",
                          placeholder: "Country or Region",
                          variableName:
                            "countryOrRegion_otherAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "Postal Code",
                          value: "",
                          placeholder: "Postal Code",
                          variableName: "postalCode_otherAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "State",
                          value: "",
                          placeholder: "State",
                          variableName: "state_otherAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "Street",
                          value: "",
                          placeholder: "Street",
                          variableName: "street_otherAddress_CreateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Business Website URL",
                    variableName: "businessHomePage_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "businessHomePage_CreateContact",
                          rightSideInput: true,
                          placeholder: "Business Website URL",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "File As",
                    variableName: "fileAs_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "fileAs_CreateContact",
                          rightSideInput: true,
                          placeholder: "File As",
                          hasDynamicVariable: true,
                          helperSpan:
                            "specify a name to file the contact under",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Personal Notes",
                    variableName: "personalNotes_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "personalNotes_CreateContact",
                          rightSideInput: true,
                          placeholder: "Personal Notes",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Job Title",
                    variableName: "jobTitle_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "jobTitle_CreateContact",
                          rightSideInput: true,
                          placeholder: "Job Title",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Company Name",
                    variableName: "companyName_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "companyName_CreateContact",
                          rightSideInput: true,
                          placeholder: "Company Name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Department",
                    variableName: "department_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "department_CreateContact",
                          rightSideInput: true,
                          placeholder: "Department",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile Phone",
                    variableName: "mobilePhone_CreateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "mobilePhone_CreateContact",
                          rightSideInput: true,
                          placeholder: "Mobile Phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Business Phone",
                    variableName: "businessPhones_CreateContact",
                    structure: [
                      {
                        type: "row",
                        title: "Business Phone",
                        variableName: "businessPhone",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        label: "Business Phone",
                        value: "",
                        required: false,
                        placeholder: "Business Phone",
                        variableName: "businessPhone_CreateContact",
                        hasDynamicVariable: true,
                      },
                    ],
                  },

                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Home Phone",
                    variableName: "homePhones_CreateContact",
                    structure: [
                      {
                        type: "row",
                        title: "Home Phone",
                        variableName: "homePhone",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        label: "Home Phone",
                        value: "",
                        required: false,
                        placeholder: "Home Phone",
                        variableName: "homePhone_CreateContact",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "email Address",
                    variableName: "emailAddresses_CreateContact",
                    structure: [
                      {
                        type: "row",
                        title: "email Address",
                        variableName: "emailAddress",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        label: "email Address",
                        value: "",
                        required: false,
                        placeholder: "email Address",
                        variableName: "emailAddress_CreateContact",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "UpdateContact": [
                  {
                    type: "api",
                    label: "Contact",
                    variableName: "contact_id_UpdateContact",
                    value: "",
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
                              "outlook/getManyContact",
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
                        option: { fields: ["displayName"] },
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
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "First Name",
                    variableName: "givenName_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "givenName_UpdateContact",
                          rightSideInput: true,
                          placeholder: "First Name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Last Name",
                    variableName: "surname_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "surname_UpdateContact",
                          rightSideInput: true,
                          placeholder: "Last Name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Business Website URL",
                    variableName: "businessHomePage_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "businessHomePage_UpdateContact",
                          rightSideInput: true,
                          placeholder: "Business Website URL",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Personal Notes",
                    variableName: "personalNotes_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "personalNotes_UpdateContact",
                          rightSideInput: true,
                          placeholder: "Personal Notes",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Job Title",
                    variableName: "jobTitle_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "jobTitle_UpdateContact",
                          rightSideInput: true,
                          placeholder: "Job Title",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Company Name",
                    variableName: "companyName_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "companyName_UpdateContact",
                          rightSideInput: true,
                          placeholder: "Company Name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Department",
                    variableName: "department_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "department_UpdateContact",
                          rightSideInput: true,
                          placeholder: "Department",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Mobile Phone",
                    variableName: "mobilePhone_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "mobilePhone_UpdateContact",
                          rightSideInput: true,
                          placeholder: "Mobile Phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Business Address ",
                    variableName: "businessAddress_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "City",
                          value: "",
                          placeholder: "City",
                          variableName: "city_businessAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "Country or Region",
                          value: "",
                          placeholder: "Country or Region",
                          variableName:
                            "countryOrRegion_businessAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "Postal Code",
                          value: "",
                          placeholder: "Postal Code",
                          variableName:
                            "postalCode_businessAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "State",
                          value: "",
                          placeholder: "State",
                          variableName: "state_businessAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "Street",
                          value: "",
                          placeholder: "Street",
                          variableName: "street_businessAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Home Address",
                    variableName: "homeAddress_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "City",
                          value: "",
                          placeholder: "City",
                          variableName: "city_homeAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "Country or Region",
                          value: "",
                          placeholder: "Country or Region",
                          variableName:
                            "countryOrRegion_homeAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "Postal Code",
                          value: "",
                          placeholder: "Postal Code",
                          variableName: "postalCode_homeAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "State",
                          value: "",
                          placeholder: "State",
                          variableName: "state_homeAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "Street",
                          value: "",
                          placeholder: "Street",
                          variableName: "street_homeAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Other Address",
                    variableName: "otherAddress_UpdateContact",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "City",
                          value: "",
                          placeholder: "City",
                          variableName: "city_otherAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "Country or Region",
                          value: "",
                          placeholder: "Country or Region",
                          variableName:
                            "countryOrRegion_otherAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "Postal Code",
                          value: "",
                          placeholder: "Postal Code",
                          variableName: "postalCode_otherAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "State",
                          value: "",
                          placeholder: "State",
                          variableName: "state_otherAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                        {
                          type: "textfield",
                          label: "Street",
                          value: "",
                          placeholder: "Street",
                          variableName: "street_otherAddress_UpdateContact",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Unfilled fields are treated as null, so you must re-enter old data to preserve it",
                        },
                      ],
                    ],
                  },

                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Business Phone",
                    variableName: "businessPhones_UpdateContact",
                    structure: [
                      {
                        type: "row",
                        title: "Business Phone",
                        variableName: "businessPhone",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        label: "Business Phone",
                        value: "",
                        required: false,
                        placeholder: "Business Phone",
                        variableName: "businessPhone_UpdateContact",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Home Phone",
                    variableName: "homePhones_UpdateContact",
                    structure: [
                      {
                        type: "row",
                        title: "Home Phone",
                        variableName: "homePhone",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        label: "Home Phone",
                        value: "",
                        required: false,
                        placeholder: "Home Phone",
                        variableName: "homePhone_UpdateContact",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "email Address",
                    variableName: "emailAddresses_UpdateContact",
                    structure: [
                      {
                        type: "row",
                        title: "email Address",
                        variableName: "emailAddress",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        label: "email Address",
                        value: "",
                        required: false,
                        placeholder: "email Address",
                        variableName: "emailAddress_UpdateContact",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "DeleteContact": [
                  {
                    type: "api",
                    label: "Contact",
                    variableName: "contact_id_DeleteContact",
                    value: "",
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
                              "outlook/getManyContact",
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
                        option: { fields: ["displayName"] },
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
          Calendar: [
            {
              type: "dropdown",
              label: "Operation",
              value: "GetCalendar",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "GetCalendar",
                },
                {
                  option: "Get Many",
                  value: "GetManyCalendars",
                },
                {
                  option: "Create",
                  value: "CreateCalendar",
                },
                {
                  option: "Update",
                  value: "UpdateCalendar",
                },
                {
                  option: "Delete",
                  value: "DeleteCalendar",
                },
              ],
              options: {
                "GetCalendar": [
                  {
                    type: "api",
                    label: "Calendar",
                    variableName: "calendar_id_GetCalendar",
                    value: "",
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
                              "outlook/getManyCalendar",
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
                      path: "data.Calendars",
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
                "GetManyCalendars": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Filter",
                    variableName: "filter_GetManyCalendar",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "filter_GetManyCalendar",
                          rightSideInput: true,
                          placeholder: "Filter",
                          hasDynamicVariable: true,
                          helperSpan: "e.g name eq 'your calendar'",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_GetManyCalendar",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_GetManyCalendar",
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
                "CreateCalendar": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "name_CreateCalendar",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Calendar Group",
                    variableName: "calendarGroup_id_CreateCalendar",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "calendarGroup_id_CreateCalendar",
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
                                    "outlook/getManyCalendarGroup",
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
                            path: "data.calendarGroups",
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
                    accTitle: "Color",
                    variableName: "color_CreateCalendar",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "auto",
                          variableName: "color_CreateCalendar",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Auto",
                              value: "auto",
                            },
                            {
                              option: "Light Blue",
                              value: "lightBlue",
                            },
                            {
                              option: "Light Brown",
                              value: "lightBrown",
                            },
                            {
                              option: "Light Gray",
                              value: "lightGray",
                            },
                            {
                              option: "Light Green",
                              value: "lightGreen",
                            },
                            {
                              option: "Light Orange",
                              value: "lightOrange",
                            },
                            {
                              option: "Light Pink",
                              value: "lightPink",
                            },
                            {
                              option: "Light Red",
                              value: "lightRed",
                            },
                            {
                              option: "Light Teal",
                              value: "lightTeal",
                            },
                            {
                              option: "Light Yellow",
                              value: "lightYellow",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "UpdateCalendar": [
                  {
                    type: "api",
                    label: "Calendar",
                    variableName: "calendar_id_UpdateCalendar",
                    value: "",
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
                              "outlook/getManyCalendar",
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
                      path: "data.Calendars",
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
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Name",
                    variableName: "name_UpdateCalendar",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "name_UpdateCalendar",
                          rightSideInput: true,
                          placeholder: "Name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Color",
                    variableName: "color_UpdateCalendar",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "color_UpdateCalendar",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Light Blue",
                              value: "lightBlue",
                            },
                            {
                              option: "Light Brown",
                              value: "lightBrown",
                            },
                            {
                              option: "Light Gray",
                              value: "lightGray",
                            },
                            {
                              option: "Light Green",
                              value: "lightGreen",
                            },
                            {
                              option: "Light Orange",
                              value: "lightOrange",
                            },
                            {
                              option: "Light Pink",
                              value: "lightPink",
                            },
                            {
                              option: "Light Red",
                              value: "lightRed",
                            },
                            {
                              option: "Light Teal",
                              value: "lightTeal",
                            },
                            {
                              option: "Light Yellow",
                              value: "lightYellow",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Default Calendar",
                    variableName: "isDefaultCalendar_UpdateCalendar",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isDefaultCalendar_UpdateCalendar",
                        },
                      ],
                    ],
                  },
                ],
                "DeleteCalendar": [
                  {
                    type: "api",
                    label: "Calendar",
                    variableName: "calendar_id_DeleteCalendar",
                    value: "",
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
                              "outlook/getManyCalendar",
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
                      path: "data.Calendars",
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
          Event: [
            {
              type: "dropdown",
              label: "Operation",
              value: "GetEvent",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "GetEvent",
                },
                {
                  option: "Get Many",
                  value: "GetManyEvents",
                },
                {
                  option: "Create",
                  value: "CreateEvent",
                },
                {
                  option: "Update",
                  value: "UpdateEvent",
                },
                {
                  option: "Delete",
                  value: "DeleteEvent",
                },
              ],
              options: {
                "GetEvent": [
                  {
                    type: "api",
                    label: "Calendar",
                    variableName: "calendar_id_GetEvent",
                    value: "",
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
                              "outlook/getManyCalendar",
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
                      path: "data.Calendars",
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
                    type: "api",
                    label: "Event",
                    variableName: "event_id_GetEvent",
                    value: "",
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
                              "outlook/getManyEvent",
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
                            key: "calendar_id",
                            dependOn: "calendar_id_GetEvent",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.Events",
                      keys: {
                        option: { fields: ["subject"] },
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
                "GetManyEvents": [
                  {
                    type: "api",
                    label: "Calendar",
                    variableName: "calendar_id_GetManyEvent",
                    value: "",
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
                              "outlook/getManyCalendar",
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
                      path: "data.Calendars",
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
                    type: "accordion",
                    title: "Options",
                    accTitle: "Filter",
                    variableName: "filter_GetManyEvent",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "filter_GetManyEvent",
                          rightSideInput: true,
                          placeholder: "Filter",
                          hasDynamicVariable: true,
                          helperSpan: "e.g importance eq 'normal'",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_GetManyEvent",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_GetManyEvent",
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
                "CreateEvent": [
                  {
                    type: "api",
                    label: "Calendar",
                    variableName: "calendar_id_CreateEvent",
                    value: "",
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
                              "outlook/getManyCalendar",
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
                      path: "data.Calendars",
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
                    type: "textfield",
                    label: "Subject",
                    required: true,
                    variableName: "subject_CreateEvent",
                    value: "",
                    placeholder: "Subject",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Start",
                    date: true,
                    datetimeLocal: true,
                    required: true,
                    variableName: "start_time_CreateEvent",
                    value: "",
                    placeholder: "Start",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "End",
                    date: true,
                    datetimeLocal: true,
                    required: true,
                    variableName: "end_time_CreateEvent",
                    value: "",
                    placeholder: "End",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Description",
                    variableName: "body_content_CreateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "body_content_CreateEvent",
                          rightSideInput: true,
                          placeholder: "Description",
                          hasDynamicVariable: true,
                          helperSpan: "Allows HTML",
                          minRows: "5",
                          multiline: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Show me as Free or Busy",
                    variableName: "showAs_CreateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "busy",
                          variableName: "showAs_CreateEvent",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Free",
                              value: "free",
                            },
                            {
                              option: "Busy",
                              value: "busy",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "All Day Event?",
                    variableName: "isAllDay_CreateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isAllDay_CreateEvent",
                        },
                      ],
                    ],
                  },
                ],
                "UpdateEvent": [
                  {
                    type: "api",
                    label: "Calendar",
                    variableName: "calendar_id_UpdateEvent",
                    value: "",
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
                              "outlook/getManyCalendar",
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
                      path: "data.Calendars",
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
                    type: "api",
                    label: "Event",
                    variableName: "event_id_UpdateEvent",
                    value: "",
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
                              "outlook/getManyEvent",
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
                            key: "calendar_id",
                            dependOn: "calendar_id_UpdateEvent",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.Events",
                      keys: {
                        option: { fields: ["subject"] },
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
                    accTitle: "Subject",
                    variableName: "subject_UpdateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          variableName: "subject_UpdateEvent",
                          value: "",
                          placeholder: "Subject",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Start",
                    variableName: "start_time_UpdateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          datetimeLocal: true,
                          variableName: "start_time_UpdateEvent",
                          value: "",
                          placeholder: "Start",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "End",
                    variableName: "end_time_UpdateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          datetimeLocal: true,
                          variableName: "end_time_UpdateEvent",
                          value: "",
                          placeholder: "End",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "body_content_UpdateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "body_content_UpdateEvent",
                          rightSideInput: true,
                          placeholder: "Description",
                          hasDynamicVariable: true,
                          helperSpan: "Allows HTML",
                          minRows: "5",
                          multiline: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Show me as Free or Busy",
                    variableName: "showAs_UpdateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "showAs_UpdateEvent",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "free",
                              value: "free",
                            },
                            {
                              option: "busy",
                              value: "busy",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "All Day Event?",
                    variableName: "isAllDay_UpdateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isAllDay_UpdateEvent",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Online Meeting",
                    variableName: "isOnlineMeeting_UpdateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "isOnlineMeeting_UpdateEvent",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Hide Attendees",
                    variableName: "hideAttendees_UpdateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "hideAttendees_UpdateEvent",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Importance",
                    variableName: "importance_UpdateEvent",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "",
                          variableName: "importance_UpdateEvent",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "low",
                              value: "low",
                            },
                            {
                              option: "normal",
                              value: "normal",
                            },
                            {
                              option: "high",
                              value: "high",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "categorie",
                    variableName: "categories_UpdateEvent",
                    structure: [
                      {
                        type: "row",
                        title: "categorie",
                        variableName: "categorie",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        label: "categorie",
                        value: "",
                        required: false,
                        placeholder: "categorie",
                        variableName: "categorie_UpdateEvent",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
                "DeleteEvent": [
                  {
                    type: "api",
                    label: "Calendar",
                    variableName: "calendar_id_DeleteEvent",
                    value: "",
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
                              "outlook/getManyCalendar",
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
                      path: "data.Calendars",
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
                    type: "api",
                    label: "Event",
                    variableName: "event_id_DeleteEvent",
                    value: "",
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
                              "outlook/getManyEvent",
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
                            key: "calendar_id",
                            dependOn: "calendar_id_DeleteEvent",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.Events",
                      keys: {
                        option: { fields: ["subject"] },
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
          Folder: [
            {
              type: "dropdown",
              label: "Operation",
              value: "GetFolder",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "GetFolder",
                },
                {
                  option: "Get Many",
                  value: "GetManyFolders",
                },
                {
                  option: "Create",
                  value: "CreateFolder",
                },
                {
                  option: "Update",
                  value: "UpdateFolder",
                },
                {
                  option: "Delete",
                  value: "DeleteFolder",
                },
              ],
              options: {
                "GetFolder": [
                  {
                    type: "api",
                    label: "Folder",
                    variableName: "folder_id_GetFolder",
                    value: "",
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
                              "outlook/getManyFolder",
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
                      path: "data.Folders",
                      keys: {
                        option: { fields: ["displayName"] },
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
                "GetManyFolders": [
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Filter",
                    variableName: "filter_GetManyFolder",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "filter_GetManyFolder",
                          rightSideInput: true,
                          placeholder: "Filter",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_GetManyFolder",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_GetManyFolder",
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
                "CreateFolder": [
                  {
                    type: "textfield",
                    label: "Name",
                    required: true,
                    variableName: "displayName_CreateFolder",
                    value: "",
                    placeholder: "Name",
                    hasDynamicVariable: true,
                  },
                ],
                "UpdateFolder": [
                  {
                    type: "api",
                    label: "Folder",
                    variableName: "folder_id_UpdateFolder",
                    value: "",
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
                              "outlook/getManyFolder",
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
                      path: "data.Folders",
                      keys: {
                        option: { fields: ["displayName"] },
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
                    accTitle: "Name",
                    variableName: "displayName_UpdateFolder",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          variableName: "displayName_UpdateFolder",
                          value: "",
                          placeholder: "Name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "DeleteFolder": [
                  {
                    type: "api",
                    label: "Folder",
                    variableName: "folder_id_DeleteFolder",
                    value: "",
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
                              "outlook/getManyFolder",
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
                      path: "data.Folders",
                      keys: {
                        option: { fields: ["displayName"] },
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
          "Folder Message": [
            {
              type: "dropdown",
              label: "Operation",
              value: "GetManyFolderMessages",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get Many",
                  value: "GetManyFolderMessages",
                },
              ],
              options: {
                "GetManyFolderMessages": [
                  {
                    type: "api",
                    label: "Folder",
                    variableName: "folder_id_GetManyFolderMessage",
                    value: "",
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
                              "outlook/getManyFolder",
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
                      path: "data.Folders",
                      keys: {
                        option: { fields: ["displayName"] },
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
                    accTitle: "Limit",
                    variableName: "limit_GetManyFolderMessage",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_GetManyFolderMessage",
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
                    title: "Filter By",
                    label: "Filter By",
                    type: "dropdown",
                    value: "filter",
                    variableName: "Filter_type",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Filter",
                        value: "filter",
                      },
                      {
                        option: "Search",
                        value: "search",
                      },
                    ],
                    options: {
                      filter: [
                        {
                          label: "Filter",
                          type: "textfield",
                          value: "",
                          variableName: "filter_GetManyFolderMessage",
                          rightSideInput: true,
                          placeholder: "Filter",
                          hasDynamicVariable: true,
                          helperSpan: "e.g. isRead eq false",
                        },
                      ],
                      search: [
                        {
                          label: "Search",
                          type: "textfield",
                          value: "",
                          variableName: "search_GetManyFolderMessage",
                          rightSideInput: true,
                          placeholder: "Search",
                          hasDynamicVariable: true,
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
          Message: [
            {
              type: "dropdown",
              label: "Operation",
              value: "GetMessage",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "GetMessage",
                },
                {
                  option: "Get Many",
                  value: "GetManyMessages",
                },
                {
                  option: "Send",
                  value: "SendMessage",
                },
                {
                  option: "Reply",
                  value: "ReplyMessage",
                },
                {
                  option: "Move",
                  value: "MoveMessage",
                },
                {
                  option: "Delete",
                  value: "DeleteMessage",
                },
              ],
              options: {
                "GetMessage": [
                  {
                    type: "api",
                    label: "Message",
                    variableName: "message_id_GetMessage",
                    value: "",
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
                              "outlook/getManyMessage",
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
                      path: "data.Messages",
                      keys: {
                        option: { fields: ["subject"] },
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
                "GetManyMessages": [
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Limit",
                    variableName: "limit_GetManyMessage",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_GetManyMessage",
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
                    title: "Filter By",
                    label: "Filter By",
                    type: "dropdown",
                    value: "filter",
                    variableName: "Filter_type",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Filter",
                        value: "filter",
                      },
                      {
                        option: "Search",
                        value: "search",
                      },
                    ],
                    options: {
                      filter: [
                        {
                          label: "Filter",
                          type: "textfield",
                          value: "",
                          variableName: "filter_GetManyMessage",
                          rightSideInput: true,
                          placeholder: "Filter",
                          hasDynamicVariable: true,
                          helperSpan: "e.g. isRead eq false",
                        },
                      ],
                      search: [
                        {
                          label: "Search",
                          type: "textfield",
                          value: "",
                          variableName: "search_GetManyMessage",
                          rightSideInput: true,
                          placeholder: "Search",
                          hasDynamicVariable: true,
                        },
                      ],
                    },
                  },
                ],
                "SendMessage": [
                  {
                    type: "dynamic",
                    required: true,
                    fieldsArray: [],
                    title: "To Email",
                    variableName: "to_emails_SendMessage",
                    structure: [
                      {
                        type: "row",
                        title: "To Email",
                        variableName: "mail",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        label: "To Email",
                        value: "",
                        required: true,
                        placeholder: "To Email",
                        variableName: "to_SendMessage",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "CC Email",
                    variableName: "cc_emails_SendMessage",
                    structure: [
                      {
                        type: "row",
                        title: "CC Email",
                        variableName: "ccmail",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        label: "CC Email",
                        value: "",
                        required: false,
                        placeholder: "CC Email",
                        variableName: "cc_SendMessage",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "BCC Email",
                    variableName: "bcc_emails_SendMessage",
                    structure: [
                      {
                        type: "row",
                        title: "BCC Email",
                        variableName: "bccmail",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        label: "BCC Email",
                        value: "",
                        required: false,
                        placeholder: "BCC Email",
                        variableName: "bcc_SendMessage",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Subject",
                    required: true,
                    variableName: "subject_SendMessage",
                    value: "",
                    placeholder: "Subject",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    label: "Message Format",
                    value: "text",
                    variableName: "bodyFormat_SendMessage",
                    errorSpan: "Please choose an Format",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "HTML",
                        value: "html",
                      },
                      {
                        option: "TEXT",
                        value: "text",
                      },
                    ],
                  },
                  {
                    type: "textfield",
                    label: "Message",
                    required: true,
                    variableName: "body_SendMessage",
                    value: "",
                    placeholder: "Message",
                    hasDynamicVariable: true,
                    minRows: "5",
                    multiline: true,
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    variableName: "attachmentsMessageSend",
                    title: "Attachment",
                    structure: [
                      {
                        type: "row",
                        title: "Attachment",
                        variableName: "attachment",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Upload Type",
                        value: "ByteString",
                        variableName: "uploadType",
                        errorSpan: "Please choose a type",
                        required: true,
                        hasDynamicVariable: true,
                        list: [
                          {
                            option: "File",
                            value: "ByteString",
                          },
                          {
                            option: "Url",
                            value: "url",
                          },
                        ],
                        options: {
                          ByteString: [
                            {
                              label: "File Name",
                              type: "textfield",
                              required: true,
                              placeholder: "File Name",
                              value: "",
                              variableName: "fileName",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                              helperSpan:
                                "Please make sure to input the extension e.g(.png,.txt,.csv) ",
                            },
                            {
                              label: "Content",
                              type: "textfield",
                              placeholder: "Content",
                              value: "",
                              required: true,
                              variableName: "contentBytes",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                          url: [
                            {
                              label: "File Name",
                              type: "textfield",
                              placeholder: "File Name",
                              value: "",
                              required: true,
                              variableName: "fileName",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                              helperSpan:
                                "Please make sure to input the extension e.g(.png,.txt,.csv) ",
                            },
                            {
                              type: "textfield",
                              label: "Url",
                              value: "",
                              placeholder: "Url",
                              required: true,
                              variableName: "url_attachment",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
                "ReplyMessage": [
                  {
                    type: "api",
                    label: "Message",
                    variableName: "message_id_ReplyMessage",
                    value: "",
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
                              "outlook/getManyMessage",
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
                      path: "data.Messages",
                      keys: {
                        option: { fields: ["subject"] },
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
                    type: "textfield",
                    label: "Reply Message",
                    required: true,
                    variableName: "reply_content_body_ReplyMessage",
                    value: "",
                    placeholder: "Reply Message",
                    hasDynamicVariable: true,
                    minRows: "5",
                    multiline: true,
                  },
                  {
                    type: "dropdown",
                    label: "Message Format",
                    value: "text",
                    variableName: "reply_contentType_body_ReplyMessage",
                    errorSpan: "Please choose an Format",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "HTML",
                        value: "html",
                      },
                      {
                        option: "TEXT",
                        value: "text",
                      },
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    variableName: "attachmentsMessageReply",
                    title: "Attachment",
                    structure: [
                      {
                        type: "row",
                        title: "Attachment",
                        variableName: "attachment",
                        removeButton: true,
                      },
                      {
                        type: "dropdown",
                        label: "Upload Type",
                        value: "ByteString",
                        variableName: "uploadType",
                        errorSpan: "Please choose a type",
                        required: true,
                        hasDynamicVariable: true,
                        list: [
                          {
                            option: "File",
                            value: "ByteString",
                          },
                          {
                            option: "Url",
                            value: "url",
                          },
                        ],
                        options: {
                          ByteString: [
                            {
                              label: "File Name",
                              type: "textfield",
                              required: true,
                              placeholder: "File Name",
                              value: "",
                              variableName: "fileName",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                              helperSpan:
                                "Please make sure to input the extension e.g(.png,.txt,.csv) ",
                            },
                            {
                              label: "Content",
                              type: "textfield",
                              placeholder: "Content",
                              value: "",
                              required: true,
                              variableName: "contentBytes",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                          url: [
                            {
                              label: "File Name",
                              type: "textfield",
                              placeholder: "File Name",
                              value: "",
                              required: true,
                              variableName: "fileName",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                              helperSpan:
                                "Please make sure to input the extension e.g(.png,.txt,.csv) ",
                            },
                            {
                              type: "textfield",
                              label: "Url",
                              value: "",
                              placeholder: "Url",
                              required: true,
                              variableName: "url_attachment",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
                "MoveMessage": [
                  {
                    type: "api",
                    label: "Message",
                    variableName: "message_id_MoveMessage",
                    value: "",
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
                              "outlook/getManyMessage",
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
                      path: "data.Messages",
                      keys: {
                        option: { fields: ["subject"] },
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
                    type: "api",
                    label: "Parent Folder",
                    variableName: "destinationId_MoveMessage",
                    value: "",
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
                              "outlook/getManyFolder",
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
                      path: "data.Folders",
                      keys: {
                        option: { fields: ["displayName"] },
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
                "DeleteMessage": [
                  {
                    type: "api",
                    label: "Message",
                    variableName: "message_id_DeleteMessage",
                    value: "",
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
                              "outlook/getManyMessage",
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
                      path: "data.Messages",
                      keys: {
                        option: { fields: ["subject"] },
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
          "Message Attachment": [
            {
              type: "dropdown",
              label: "Operation",
              value: "GetMessageAtt",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "GetMessageAtt",
                },
                {
                  option: "Get Many",
                  value: "GetManyMessageAtts",
                },
              ],
              options: {
                "GetMessageAtt": [
                  {
                    type: "api",
                    label: "Message",
                    variableName: "message_id_GetMessageAttachment",
                    value: "",
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
                              "outlook/getManyMessage",
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
                      path: "data.Messages",
                      keys: {
                        option: { fields: ["subject"] },
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
                    type: "api",
                    label: "Attachment",
                    variableName: "attachment_id_GetMessageAttachment",
                    value: "",
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
                              "outlook/getManyAttachment",
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
                            key: "message_id",
                            dependOn: "message_id_GetMessageAttachment",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.Attachments",
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
                    accTitle: "Return Content",
                    variableName: "content_GetMessageAttachment",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "content",
                        },
                      ],
                    ],
                  },
                ],
                "GetManyMessageAtts": [
                  {
                    type: "api",
                    label: "Message",
                    variableName: "message_id_GetManyMessageAttachment",
                    value: "",
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
                              "outlook/getManyMessage",
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
                      path: "data.Messages",
                      keys: {
                        option: { fields: ["subject"] },
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
                    accTitle: "Limit",
                    variableName: "limit_GetManyMessageAttachment",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          variableName: "limit_GetManyMessageAttachment",
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
                    type: "accordion",
                    accTitle: "Return Contents",
                    variableName: "contents_GetManyMessageAttachment",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "contents",
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
