export const GoogleContactsJson = {
  "category": "integration",
  "type": "GoogleContacts",
  "label": "Google Contacts",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/GoogleContacts/getting_started",
  "description": "Google Contacts integration",
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
        "credType": "Google",
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
        "value": "Contact",
        "variableName": "type",
        "errorSpan": "Please choose a Type",
        "required": true,
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "Contact",
            "value": "Contact"
          },
          {
            "option": "Contacts Group",
            "value": "Contacts Group"
          }
        ],
        "options": {
          "Contact": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get All Contacts",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get All Contacts"
                },
                {
                  "option": "Get",
                  "value": "Get Contact"
                },
                {
                  "option": "Search",
                  "value": "Search Contacts"
                },
                {
                  "option": "Create",
                  "value": "Create Contact"
                },
                {
                  "option": "Update",
                  "value": "Update Contact"
                },
                {
                  "option": "Delete",
                  "value": "Delete Contact"
                },
                // {
                //   "option": "Upload Contact Photo",
                //   "value": "Upload Contact Photo"
                // },
              ],
              "options": {
                "Get All Contacts": [
                  {
                    "type": "multiselect",
                    "label": "Fields",
                    "value": [],
                    "required": true,
                    "hasDynamicVariable": true,
                    "placeholder": "Please choose the fields to be returned",
                    "variableName": "personFieldsGetAllContacts",
                    "list": [
                      {
                        "option": "addresses",
                        "value": "addresses"
                      },
                      {
                        "option": "ageRanges",
                        "value": "ageRanges"
                      },
                      {
                        "option": "biographies",
                        "value": "biographies"
                      },
                      {
                        "option": "birthdays",
                        "value": "birthdays"
                      },
                      {
                        "option": "calendarUrls",
                        "value": "calendarUrls"
                      },
                      {
                        "option": "clientData",
                        "value": "clientData"
                      },
                      {
                        "option": "coverPhotos",
                        "value": "coverPhotos"
                      },
                      {
                        "option": "emailAddresses",
                        "value": "emailAddresses"
                      },
                      {
                        "option": "events",
                        "value": "events"
                      },
                      {
                        "option": "externalIds",
                        "value": "externalIds"
                      },
                      {
                        "option": "genders",
                        "value": "genders"
                      },
                      {
                        "option": "imClients",
                        "value": "imClients"
                      },
                      {
                        "option": "interests",
                        "value": "interests"
                      },
                      {
                        "option": "locales",
                        "value": "locales"
                      },
                      {
                        "option": "locations",
                        "value": "locations"
                      },
                      {
                        "option": "memberships",
                        "value": "memberships"
                      },
                      {
                        "option": "metadata",
                        "value": "metadata"
                      },
                      {
                        "option": "miscKeywords",
                        "value": "miscKeywords"
                      },
                      {
                        "option": "names",
                        "value": "names"
                      },
                      {
                        "option": "nicknames",
                        "value": "nicknames"
                      },
                      {
                        "option": "occupations",
                        "value": "occupations"
                      },
                      {
                        "option": "organizations",
                        "value": "organizations"
                      },
                      {
                        "option": "phoneNumbers",
                        "value": "phoneNumbers"
                      },
                      {
                        "option": "photos",
                        "value": "photos"
                      },
                      {
                        "option": "relations",
                        "value": "relations"
                      },
                      {
                        "option": "sipAddresses",
                        "value": "sipAddresses"
                      },
                      {
                        "option": "skills",
                        "value": "skills"
                      },
                      {
                        "option": "urls",
                        "value": "urls"
                      },
                      {
                        "option": "userDefined",
                        "value": "userDefined"
                      }
                    ]
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Returned Contacts' Count",
                    "variableName": "contactsCountGetAllContacts",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Number of returned Contacts",
                          "variableName": "contactsCountOptionGetAllContacts",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Valid values are between 1 and 1000, inclusive",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Sort Order",
                    "variableName": "sortOrderGetAllContacts",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Sort Order",
                          "value": "",
                          "required": false,
                          "variableName": "sortOrderOptionGetAllContacts",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "None",
                              "value": ""
                            },
                            {
                              "option": "LAST_MODIFIED_ASCENDING",
                              "value": "LAST_MODIFIED_ASCENDING"
                            },
                            {
                              "option": "LAST_MODIFIED_DESCENDING",
                              "value": "LAST_MODIFIED_DESCENDING"
                            },
                            {
                              "option": "FIRST_NAME_ASCENDING",
                              "value": "FIRST_NAME_ASCENDING"
                            },
                            {
                              "option": "LAST_NAME_ASCENDING",
                              "value": "LAST_NAME_ASCENDING"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                ],
                "Get Contact": [
                  {
                    "type": "textfield",
                    "label": "Resource Name",
                    "required": true,
                    "variableName": "resourceNameGetContact",
                    "value": "",
                    "placeholder": "in the format of 'people/{contact_ID}'",
                    "hasDynamicVariable": true,
                    "helperSpan": "the Unique identifier for the contact. Can be found in the Contact Object returned in the Get Many or search operations"
                  },
                  {
                    "type": "multiselect",
                    "label": "Fields",
                    "value": [],
                    "required": true,
                    "hasDynamicVariable": true,
                    "placeholder": "Please choose the fields to be returned",
                    "variableName": "personFieldsGetContact",
                    "list": [
                      {
                        "option": "addresses",
                        "value": "addresses"
                      },
                      {
                        "option": "ageRanges",
                        "value": "ageRanges"
                      },
                      {
                        "option": "biographies",
                        "value": "biographies"
                      },
                      {
                        "option": "birthdays",
                        "value": "birthdays"
                      },
                      {
                        "option": "calendarUrls",
                        "value": "calendarUrls"
                      },
                      {
                        "option": "clientData",
                        "value": "clientData"
                      },
                      {
                        "option": "coverPhotos",
                        "value": "coverPhotos"
                      },
                      {
                        "option": "emailAddresses",
                        "value": "emailAddresses"
                      },
                      {
                        "option": "events",
                        "value": "events"
                      },
                      {
                        "option": "externalIds",
                        "value": "externalIds"
                      },
                      {
                        "option": "genders",
                        "value": "genders"
                      },
                      {
                        "option": "imClients",
                        "value": "imClients"
                      },
                      {
                        "option": "interests",
                        "value": "interests"
                      },
                      {
                        "option": "locales",
                        "value": "locales"
                      },
                      {
                        "option": "locations",
                        "value": "locations"
                      },
                      {
                        "option": "memberships",
                        "value": "memberships"
                      },
                      {
                        "option": "metadata",
                        "value": "metadata"
                      },
                      {
                        "option": "miscKeywords",
                        "value": "miscKeywords"
                      },
                      {
                        "option": "names",
                        "value": "names"
                      },
                      {
                        "option": "nicknames",
                        "value": "nicknames"
                      },
                      {
                        "option": "occupations",
                        "value": "occupations"
                      },
                      {
                        "option": "organizations",
                        "value": "organizations"
                      },
                      {
                        "option": "phoneNumbers",
                        "value": "phoneNumbers"
                      },
                      {
                        "option": "photos",
                        "value": "photos"
                      },
                      {
                        "option": "relations",
                        "value": "relations"
                      },
                      {
                        "option": "sipAddresses",
                        "value": "sipAddresses"
                      },
                      {
                        "option": "skills",
                        "value": "skills"
                      },
                      {
                        "option": "urls",
                        "value": "urls"
                      },
                      {
                        "option": "userDefined",
                        "value": "userDefined"
                      }
                    ]
                  },
                ],
                "Search Contacts": [
                  {
                    "type": "textfield",
                    "label": "Query",
                    "required": true,
                    "variableName": "querySearchContacts",
                    "value": "",
                    "placeholder": "Plain Text Query",
                    "hasDynamicVariable": true,
                  },
                  {
                    "type": "multiselect",
                    "label": "Fields",
                    "value": [],
                    "required": true,
                    "hasDynamicVariable": true,
                    "placeholder": "Please choose the fields to be returned",
                    "variableName": "personFieldsSearchContacts",
                    "list": [
                      {
                        "option": "addresses",
                        "value": "addresses"
                      },
                      {
                        "option": "ageRanges",
                        "value": "ageRanges"
                      },
                      {
                        "option": "biographies",
                        "value": "biographies"
                      },
                      {
                        "option": "birthdays",
                        "value": "birthdays"
                      },
                      {
                        "option": "calendarUrls",
                        "value": "calendarUrls"
                      },
                      {
                        "option": "clientData",
                        "value": "clientData"
                      },
                      {
                        "option": "coverPhotos",
                        "value": "coverPhotos"
                      },
                      {
                        "option": "emailAddresses",
                        "value": "emailAddresses"
                      },
                      {
                        "option": "events",
                        "value": "events"
                      },
                      {
                        "option": "externalIds",
                        "value": "externalIds"
                      },
                      {
                        "option": "genders",
                        "value": "genders"
                      },
                      {
                        "option": "imClients",
                        "value": "imClients"
                      },
                      {
                        "option": "interests",
                        "value": "interests"
                      },
                      {
                        "option": "locales",
                        "value": "locales"
                      },
                      {
                        "option": "locations",
                        "value": "locations"
                      },
                      {
                        "option": "memberships",
                        "value": "memberships"
                      },
                      {
                        "option": "metadata",
                        "value": "metadata"
                      },
                      {
                        "option": "miscKeywords",
                        "value": "miscKeywords"
                      },
                      {
                        "option": "names",
                        "value": "names"
                      },
                      {
                        "option": "nicknames",
                        "value": "nicknames"
                      },
                      {
                        "option": "occupations",
                        "value": "occupations"
                      },
                      {
                        "option": "organizations",
                        "value": "organizations"
                      },
                      {
                        "option": "phoneNumbers",
                        "value": "phoneNumbers"
                      },
                      {
                        "option": "photos",
                        "value": "photos"
                      },
                      {
                        "option": "relations",
                        "value": "relations"
                      },
                      {
                        "option": "sipAddresses",
                        "value": "sipAddresses"
                      },
                      {
                        "option": "skills",
                        "value": "skills"
                      },
                      {
                        "option": "urls",
                        "value": "urls"
                      },
                      {
                        "option": "userDefined",
                        "value": "userDefined"
                      }
                    ]
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Returned Contacts' Count",
                    "variableName": "contactsCountSearchContacts",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Number of returned Contacts",
                          "variableName": "contactsCountOptionSearchContacts",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Defaults to 10. also maximum value is 30. Even if value entered is higher than 30, the operation will only return a maximum of thirty results",
                        }
                      ]
                    ]
                  },
                ],
                "Create Contact": [
                  {
                    "type": "textfield",
                    "label": "Given Name",
                    "required": false,
                    "variableName": "givenNameCreateContact",
                    "value": "",
                    "placeholder": "Given Name",
                    "hasDynamicVariable": true,
                  },
                  {
                    "type": "textfield",
                    "label": "Family Name",
                    "required": false,
                    "variableName": "familyNameCreateContact",
                    "value": "",
                    "placeholder": "Family Name",
                    "hasDynamicVariable": true,
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Honorific Prefix",
                    "variableName": "honorificPrefixAsCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Honorific Prefix",
                          "variableName": "honorificPrefixOptionCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Honorific Suffix",
                    "variableName": "honorificSuffixCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Honorific Suffix",
                          "variableName": "honorificSuffixOptionCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Middle Name",
                    "variableName": "middleNameCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Middle Name",
                          "variableName": "middleNameOptionCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Addresses",
                    "variableName": "AddressesCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Street Address",
                          "variableName": "streetAddressAddressesCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "City",
                          "variableName": "cityAddressesCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Region",
                          "variableName": "regionAddressesCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Country Code",
                          "variableName": "countryCodeAddressesCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Postal Code",
                          "variableName": "postalCodeAddressesCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        },
                        {
                          "type": "dropdown",
                          "label": "Type",
                          "value": "",
                          "variableName": "typeAddressesCreateContact",
                          "hasDynamicVariable": true,
                          "errorSpan": "required if you fill any of the address fields",
                          "list": [
                            {
                              "option": "None",
                              "value": ""
                            },
                            {
                              "option": "home",
                              "value": "home"
                            },
                            {
                              "option": "work",
                              "value": "work"
                            },
                            {
                              "option": "other",
                              "value": "other"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Birthday",
                    "variableName": "birthdayCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Year",
                          "variableName": "yearBirthdayCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Month",
                          "variableName": "monthBirthdayCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Day",
                          "variableName": "dayBirthdayCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Company",
                    "variableName": "companyCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Company",
                          "variableName": "paramsCompanyCreateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Company",
                              "variableName": "paramsCompanyCreateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "domainParamsCompanyCreateContact",
                              "value": "",
                              "placeholder": "Domain",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "textfield",
                              "variableName": "nameParamsCompanyCreateContact",
                              "value": "",
                              "placeholder": "Name",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "textfield",
                              "variableName": "titleParamsCompanyCreateContact",
                              "value": "",
                              "placeholder": "Title",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "checkbox",
                              "value": false,
                              "label": "Current",
                              "variableName": "currentParamsCompanyCreateContact",
                              "rightSideInput": true
                            },
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Custom Fields",
                    "variableName": "customFieldsCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Custom Field",
                          "variableName": "paramsCustomFieldsCreateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Custom Fields",
                              "variableName": "paramsCustomFieldsCreateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "keyParamsCustomFieldsCreateContact",
                              "value": "",
                              "placeholder": "Key",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "textfield",
                              "variableName": "valueParamsCustomFieldsCreateContact",
                              "value": "",
                              "placeholder": "Value",
                              "hasDynamicVariable": true,
                            },
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Email",
                    "variableName": "emailCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Email",
                          "variableName": "paramsEmailCreateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Email",
                              "variableName": "paramsEmailCreateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "valueParamsEmailCreateContact",
                              "value": "",
                              "placeholder": "Value",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "dropdown",
                              "label": "Type",
                              "value": "",
                              "required": true,
                              "variableName": "typeParamsEmailCreateContact",
                              "hasDynamicVariable": true,
                              "list": [
                                {
                                  "option": "None",
                                  "value": ""
                                },
                                {
                                  "option": "home",
                                  "value": "home"
                                },
                                {
                                  "option": "work",
                                  "value": "work"
                                },
                                {
                                  "option": "other",
                                  "value": "other"
                                }
                              ]
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Event",
                    "variableName": "eventCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Event",
                          "variableName": "paramsEventCreateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Event",
                              "variableName": "paramsEventCreateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Year",
                              "variableName": "yearParamsEventCreateContact",
                              "rightSideInput": true,
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "integer",
                              "helperSpan": "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                            },
                            {
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Month",
                              "variableName": "monthParamsEventCreateContact",
                              "rightSideInput": true,
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "integer",
                              "helperSpan": "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                            },
                            {
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Day",
                              "variableName": "dayParamsEventCreateContact",
                              "rightSideInput": true,
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "integer",
                              "helperSpan": "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                            },
                            {
                              "type": "dropdown",
                              "label": "Type",
                              "value": "",
                              "required": true,
                              "variableName": "typeParamsEventCreateContact",
                              "hasDynamicVariable": true,
                              "errorSpan": "required if you fill the any of the event date field",
                              "list": [
                                {
                                  "option": "None",
                                  "value": ""
                                },
                                {
                                  "option": "anniversary",
                                  "value": "anniversary"
                                },
                                {
                                  "option": "other",
                                  "value": "other"
                                }
                              ]
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "File As",
                    "variableName": "fileAsCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "File As",
                          "variableName": "fileAsOptionCreateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Contact Groups",
                    "variableName": "contactGroupsCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Resource Name of Contact Group",
                          "variableName": "paramsContactGroupsCreateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Resource Name",
                              "variableName": "paramsContactGroupsCreateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "resourceNameParamsContactGroupsCreateContact",
                              "value": "",
                              "required": true,
                              "placeholder": "Resource Name",
                              "hasDynamicVariable": true,
                              "helperSpan": "the Unique identifier for the contact Group. Can be found in the Contact Group Object returned in the Contact Group Get Many operation. It is in the format of 'contactGroups/{contactGroupId}'",
                            },
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Phone Numbers",
                    "variableName": "phoneNumbersCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Phone Number",
                          "variableName": "paramsPhoneNumbersCreateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Phone Number",
                              "variableName": "paramsPhoneNumbersCreateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "valueParamsPhoneNumbersCreateContact",
                              "value": "",
                              "placeholder": "Value",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "dropdown",
                              "label": "Type",
                              "value": "",
                              "required": true,
                              "variableName": "typeParamsPhoneNumbersCreateContact",
                              "hasDynamicVariable": true,
                              "list": [
                                {
                                  "option": "None",
                                  "value": ""
                                },
                                {
                                  "option": "home",
                                  "value": "home"
                                },
                                {
                                  "option": "work",
                                  "value": "work"
                                },
                                {
                                  "option": "mobile",
                                  "value": "mobile"
                                },
                                {
                                  "option": "homeFax",
                                  "value": "homeFax"
                                },
                                {
                                  "option": "workFax",
                                  "value": "workFax"
                                },
                                {
                                  "option": "otherFax",
                                  "value": "otherFax"
                                },
                                {
                                  "option": "pager",
                                  "value": "pager"
                                },
                                {
                                  "option": "workMobile",
                                  "value": "workMobile"
                                },
                                {
                                  "option": "workPager",
                                  "value": "workPager"
                                },
                                {
                                  "option": "main",
                                  "value": "main"
                                },
                                {
                                  "option": "googleVoice",
                                  "value": "googleVoice"
                                },
                                {
                                  "option": "other",
                                  "value": "other"
                                }
                              ]
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Relations",
                    "variableName": "relationsCreateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Relation",
                          "variableName": "paramsRelationsCreateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Relation",
                              "variableName": "paramsRelationsCreateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "personParamsRelationsCreateContact",
                              "value": "",
                              "placeholder": "Person",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "dropdown",
                              "label": "Type",
                              "value": "",
                              "required": true,
                              "variableName": "typeParamsRelationsCreateContact",
                              "hasDynamicVariable": true,
                              "list": [
                                {
                                  "option": "None",
                                  "value": ""
                                },
                                {
                                  "option": "spouse",
                                  "value": "spouse"
                                },
                                {
                                  "option": "child",
                                  "value": "child"
                                },
                                {
                                  "option": "mother",
                                  "value": "mother"
                                },
                                {
                                  "option": "father",
                                  "value": "father"
                                },
                                {
                                  "option": "parent",
                                  "value": "parent"
                                },
                                {
                                  "option": "brother",
                                  "value": "brother"
                                },
                                {
                                  "option": "sister",
                                  "value": "sister"
                                },
                                {
                                  "option": "friend",
                                  "value": "friend"
                                },
                                {
                                  "option": "relative",
                                  "value": "relative"
                                },
                                {
                                  "option": "domesticPartner",
                                  "value": "domesticPartner"
                                },
                                {
                                  "option": "manager",
                                  "value": "manager"
                                },
                                {
                                  "option": "assistant",
                                  "value": "assistant"
                                },
                                {
                                  "option": "referredBy",
                                  "value": "referredBy"
                                },
                                {
                                  "option": "partner",
                                  "value": "partner"
                                }
                              ]
                            }
                          ]
                        },
                      ]
                    ]
                  },
                ],
                "Update Contact": [
                  {
                    "type": "textfield",
                    "label": "Resource Name",
                    "required": true,
                    "variableName": "resourceNameUpdateContact",
                    "value": "",
                    "placeholder": "in the format of 'people/{contact_ID}'",
                    "hasDynamicVariable": true,
                    "helperSpan": "the Unique identifier for the contact. Can be found in the Contact Object returned in the Get Many or search operations"
                  },
                  {
                    "type": "textfield",
                    "label": "eTag",
                    "required": true,
                    "variableName": "eTagUpdateContact",
                    "value": "",
                    "placeholder": "eTag",
                    "hasDynamicVariable": true,
                    "helperSpan": "The HTTP entity tag of the resource. Can be found in the Contact Object returned in the Get, Get Many or search operations. note that if any operation where to be performed on the contact, the eTag changes, as such always aqcuire an up-to-date etag"
                  },
                  {
                    "type": "multiselect",
                    "label": "Fields To Update",
                    "value": [],
                    "required": true,
                    "hasDynamicVariable": true,
                    "placeholder": "Please choose the fields to be Updated",
                    "variableName": "personFieldsUpdateContact",
                    "list": [
                      {
                        "option": "names",
                        "value": "names"
                      },
                      {
                        "option": "addresses",
                        "value": "addresses"
                      },
                      {
                        "option": "birthdays",
                        "value": "birthdays"
                      },
                      {
                        "option": "organizations",
                        "value": "organizations"
                      },
                      {
                        "option": "userDefined",
                        "value": "userDefined"
                      },
                      {
                        "option": "emailAddresses",
                        "value": "emailAddresses"
                      },
                      {
                        "option": "events",
                        "value": "events"
                      },
                      {
                        "option": "fileAses",
                        "value": "fileAses"
                      },
                      {
                        "option": "memberships",
                        "value": "memberships"
                      },
                      {
                        "option": "phoneNumbers",
                        "value": "phoneNumbers"
                      },
                      {
                        "option": "relations",
                        "value": "relations"
                      }
                    ],
                    "helperSpan": "A field mask to restrict which fields on the person are updated. All updated fields will be replaced.",
                  },
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Name",
                    "variableName": "nameUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Given Name",
                          "variableName": "givenNameNameUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Family Name",
                          "variableName": "familyNameNameUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Middle Name",
                          "variableName": "middleNameNameUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Honorific Prefix",
                          "variableName": "honorificPrefixNameUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Honorific Suffix",
                          "variableName": "honorificSuffixNameUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Addresses",
                    "variableName": "AddressesUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Street Address",
                          "variableName": "streetAddressAddressesUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "City",
                          "variableName": "cityAddressesUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Region",
                          "variableName": "regionAddressesUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Country Code",
                          "variableName": "countryCodeAddressesUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Postal Code",
                          "variableName": "postalCodeAddressesUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                        },
                        {
                          "type": "dropdown",
                          "label": "Type",
                          "value": "",
                          "variableName": "typeAddressesUpdateContact",
                          "hasDynamicVariable": true,
                          "errorSpan": "required if you fill any of the address fields",
                          "list": [
                            {
                              "option": "None",
                              "value": ""
                            },
                            {
                              "option": "home",
                              "value": "home"
                            },
                            {
                              "option": "work",
                              "value": "work"
                            },
                            {
                              "option": "other",
                              "value": "other"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Birthday",
                    "variableName": "birthdayUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Year",
                          "variableName": "yearBirthdayUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Month",
                          "variableName": "monthBirthdayUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Day",
                          "variableName": "dayBirthdayUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Company",
                    "variableName": "companyUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Company",
                          "variableName": "paramsCompanyUpdateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Company",
                              "variableName": "paramsCompanyUpdateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "domainParamsCompanyUpdateContact",
                              "value": "",
                              "placeholder": "Domain",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "textfield",
                              "variableName": "nameParamsCompanyUpdateContact",
                              "value": "",
                              "placeholder": "Name",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "textfield",
                              "variableName": "titleParamsCompanyUpdateContact",
                              "value": "",
                              "placeholder": "Title",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "checkbox",
                              "value": false,
                              "label": "Current",
                              "variableName": "currentParamsCompanyUpdateContact",
                              "rightSideInput": true
                            },
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Custom Fields",
                    "variableName": "customFieldsUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Custom Field",
                          "variableName": "paramsCustomFieldsUpdateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Custom Fields",
                              "variableName": "paramsCustomFieldsUpdateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "keyParamsCustomFieldsUpdateContact",
                              "value": "",
                              "placeholder": "Key",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "textfield",
                              "variableName": "valueParamsCustomFieldsUpdateContact",
                              "value": "",
                              "placeholder": "Value",
                              "hasDynamicVariable": true,
                            },
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Email",
                    "variableName": "emailUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Email",
                          "variableName": "paramsEmailUpdateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Email",
                              "variableName": "paramsEmailUpdateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "valueParamsEmailUpdateContact",
                              "value": "",
                              "placeholder": "Value",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "dropdown",
                              "label": "Type",
                              "value": "",
                              "required": true,
                              "variableName": "typeParamsEmailUpdateContact",
                              "hasDynamicVariable": true,
                              "list": [
                                {
                                  "option": "None",
                                  "value": ""
                                },
                                {
                                  "option": "home",
                                  "value": "home"
                                },
                                {
                                  "option": "work",
                                  "value": "work"
                                },
                                {
                                  "option": "other",
                                  "value": "other"
                                }
                              ]
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Event",
                    "variableName": "eventUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Event",
                          "variableName": "paramsEventUpdateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Event",
                              "variableName": "paramsEventUpdateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Year",
                              "variableName": "yearParamsEventUpdateContact",
                              "rightSideInput": true,
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "integer",
                              "helperSpan": "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                            },
                            {
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Month",
                              "variableName": "monthParamsEventUpdateContact",
                              "rightSideInput": true,
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "integer",
                              "helperSpan": "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                            },
                            {
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Day",
                              "variableName": "dayParamsEventUpdateContact",
                              "rightSideInput": true,
                              "hasDynamicVariable": true,
                              "numberField": true,
                              "typeOfValue": "integer",
                              "helperSpan": "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                            },
                            {
                              "type": "dropdown",
                              "label": "Type",
                              "value": "",
                              "required": true,
                              "variableName": "typeParamsEventUpdateContact",
                              "hasDynamicVariable": true,
                              "errorSpan": "required if you fill the any of the event date field",
                              "list": [
                                {
                                  "option": "None",
                                  "value": ""
                                },
                                {
                                  "option": "anniversary",
                                  "value": "anniversary"
                                },
                                {
                                  "option": "other",
                                  "value": "other"
                                }
                              ]
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "File As",
                    "variableName": "fileAsUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "File As",
                          "variableName": "fileAsOptionUpdateContact",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Contact Groups",
                    "variableName": "contactGroupsUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Resource Name of Contact Group",
                          "variableName": "paramsContactGroupsUpdateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Resource Name",
                              "variableName": "paramsContactGroupsUpdateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "resourceNameParamsContactGroupsUpdateContact",
                              "value": "",
                              "required": true,
                              "placeholder": "Resource Name",
                              "hasDynamicVariable": true,
                              "helperSpan": "the Unique identifier for the contact Group. Can be found in the Contact Group Object returned in the Contact Group Get Many operation. It is in the format of 'contactGroups/{contactGroupId}'",
                            },
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Phone Numbers",
                    "variableName": "phoneNumbersUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Phone Number",
                          "variableName": "paramsPhoneNumbersUpdateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Phone Number",
                              "variableName": "paramsPhoneNumbersUpdateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "valueParamsPhoneNumbersUpdateContact",
                              "value": "",
                              "placeholder": "Value",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "dropdown",
                              "label": "Type",
                              "value": "",
                              "required": true,
                              "variableName": "typeParamsPhoneNumbersUpdateContact",
                              "hasDynamicVariable": true,
                              "list": [
                                {
                                  "option": "None",
                                  "value": ""
                                },
                                {
                                  "option": "home",
                                  "value": "home"
                                },
                                {
                                  "option": "work",
                                  "value": "work"
                                },
                                {
                                  "option": "mobile",
                                  "value": "mobile"
                                },
                                {
                                  "option": "homeFax",
                                  "value": "homeFax"
                                },
                                {
                                  "option": "workFax",
                                  "value": "workFax"
                                },
                                {
                                  "option": "otherFax",
                                  "value": "otherFax"
                                },
                                {
                                  "option": "pager",
                                  "value": "pager"
                                },
                                {
                                  "option": "workMobile",
                                  "value": "workMobile"
                                },
                                {
                                  "option": "workPager",
                                  "value": "workPager"
                                },
                                {
                                  "option": "main",
                                  "value": "main"
                                },
                                {
                                  "option": "googleVoice",
                                  "value": "googleVoice"
                                },
                                {
                                  "option": "other",
                                  "value": "other"
                                }
                              ]
                            }
                          ]
                        },
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Relations",
                    "variableName": "relationsUpdateContact",
                    "fieldsArray": [
                      [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Relation",
                          "variableName": "paramsRelationsUpdateContact",
                          "required": false,
                          "structure": [
                            {
                              "type": "row",
                              "title": "Relation",
                              "variableName": "paramsRelationsUpdateContact",
                              "removeButton": true
                            },
                            {
                              "type": "textfield",
                              "variableName": "personParamsRelationsUpdateContact",
                              "value": "",
                              "placeholder": "Person",
                              "hasDynamicVariable": true,
                            },
                            {
                              "type": "dropdown",
                              "label": "Type",
                              "value": "",
                              "required": true,
                              "variableName": "typeParamsRelationsUpdateContact",
                              "hasDynamicVariable": true,
                              "list": [
                                {
                                  "option": "None",
                                  "value": ""
                                },
                                {
                                  "option": "spouse",
                                  "value": "spouse"
                                },
                                {
                                  "option": "child",
                                  "value": "child"
                                },
                                {
                                  "option": "mother",
                                  "value": "mother"
                                },
                                {
                                  "option": "father",
                                  "value": "father"
                                },
                                {
                                  "option": "parent",
                                  "value": "parent"
                                },
                                {
                                  "option": "brother",
                                  "value": "brother"
                                },
                                {
                                  "option": "sister",
                                  "value": "sister"
                                },
                                {
                                  "option": "friend",
                                  "value": "friend"
                                },
                                {
                                  "option": "relative",
                                  "value": "relative"
                                },
                                {
                                  "option": "domesticPartner",
                                  "value": "domesticPartner"
                                },
                                {
                                  "option": "manager",
                                  "value": "manager"
                                },
                                {
                                  "option": "assistant",
                                  "value": "assistant"
                                },
                                {
                                  "option": "referredBy",
                                  "value": "referredBy"
                                },
                                {
                                  "option": "partner",
                                  "value": "partner"
                                }
                              ]
                            }
                          ]
                        },
                      ]
                    ]
                  },
                ],
                "Delete Contact": [
                  {
                    "type": "textfield",
                    "label": "Resource Name",
                    "required": true,
                    "variableName": "resourceNameDeleteContact",
                    "value": "",
                    "placeholder": "in the format of 'people/{contact_ID}'",
                    "hasDynamicVariable": true,
                    "helperSpan": "the Unique identifier for the contact. Can be found in the Contact Object returned in the Get Many or search operations"
                  },
                ],
                "Upload Contact Photo": [
                  {
                    "type": "textfield",
                    "label": "Resource Name",
                    "required": true,
                    "variableName": "resourceNameUploadContactPhoto",
                    "value": "",
                    "placeholder": "in the format of 'people/{contact_ID}'",
                    "hasDynamicVariable": true,
                    "helperSpan": "the Unique identifier for the contact. Can be found in the Contact Object returned in the Get Many or search operations"
                  },
                  {
                    "type": "multiselect",
                    "label": "Fields",
                    "value": [],
                    "required": false,
                    "hasDynamicVariable": true,
                    "placeholder": "Please choose the fields to be returned",
                    "variableName": "personFieldsUploadContactPhoto",
                    "list": [
                      {
                        "option": "addresses",
                        "value": "addresses"
                      },
                      {
                        "option": "ageRanges",
                        "value": "ageRanges"
                      },
                      {
                        "option": "biographies",
                        "value": "biographies"
                      },
                      {
                        "option": "birthdays",
                        "value": "birthdays"
                      },
                      {
                        "option": "calendarUrls",
                        "value": "calendarUrls"
                      },
                      {
                        "option": "clientData",
                        "value": "clientData"
                      },
                      {
                        "option": "coverPhotos",
                        "value": "coverPhotos"
                      },
                      {
                        "option": "emailAddresses",
                        "value": "emailAddresses"
                      },
                      {
                        "option": "events",
                        "value": "events"
                      },
                      {
                        "option": "externalIds",
                        "value": "externalIds"
                      },
                      {
                        "option": "genders",
                        "value": "genders"
                      },
                      {
                        "option": "imClients",
                        "value": "imClients"
                      },
                      {
                        "option": "interests",
                        "value": "interests"
                      },
                      {
                        "option": "locales",
                        "value": "locales"
                      },
                      {
                        "option": "locations",
                        "value": "locations"
                      },
                      {
                        "option": "memberships",
                        "value": "memberships"
                      },
                      {
                        "option": "metadata",
                        "value": "metadata"
                      },
                      {
                        "option": "miscKeywords",
                        "value": "miscKeywords"
                      },
                      {
                        "option": "names",
                        "value": "names"
                      },
                      {
                        "option": "nicknames",
                        "value": "nicknames"
                      },
                      {
                        "option": "occupations",
                        "value": "occupations"
                      },
                      {
                        "option": "organizations",
                        "value": "organizations"
                      },
                      {
                        "option": "phoneNumbers",
                        "value": "phoneNumbers"
                      },
                      {
                        "option": "photos",
                        "value": "photos"
                      },
                      {
                        "option": "relations",
                        "value": "relations"
                      },
                      {
                        "option": "sipAddresses",
                        "value": "sipAddresses"
                      },
                      {
                        "option": "skills",
                        "value": "skills"
                      },
                      {
                        "option": "urls",
                        "value": "urls"
                      },
                      {
                        "option": "userDefined",
                        "value": "userDefined"
                      }
                    ]
                  },
                  {
                    "type": "dropdown",
                    "label": "Upload From",
                    "value": "url",
                    "required": true,
                    "variableName": "uploadFromUploadContactPhoto",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "URL",
                        "value": "url"
                      },
                      {
                        "option": "Base64 Encoded String",
                        "value": "base64"
                      },
                    ],
                    "options": {
                      "url": [
                        {
                          "type": "textfield",
                          "label": "URL",
                          "required": true,
                          "variableName": "photoURLUploadContactPhoto",
                          "value": "",
                          "placeholder": "URL",
                          "hasDynamicVariable": true,
                          "helperSpan": "photo format must be: JPEG or PNG."
                        },
                      ],
                      "base64": [
                        {
                          "type": "textfield",
                          "label": "Base64 Encoded String",
                          "required": true,
                          "variableName": "photoBase64StringUploadContactPhoto",
                          "value": "",
                          "placeholder": "Base64 Encoded String",
                          "hasDynamicVariable": true,
                          "helperSpan": "photo format must be: JPEG or PNG."
                        },
                      ],
                    },
                  },
                ],
              }
            }
          ],
          "Contacts Group": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get All Contact Groups",
              "variableName": "operation",
              "errorSpan": "Please choose an Operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get All Contact Groups"
                },
                {
                  "option": "Create",
                  "value": "Create Group"
                },
                {
                  "option": "Update Contacts",
                  "value": "Update Contacts In Group"
                },
              ],
              "options": {
                "Get All Contact Groups": [
                  {
                    "title": "Additional Fields",
                    "type": "accordion",
                    "accTitle": "Returned Contact Groups' Count",
                    "variableName": "contactGroupsCountGetAllContactGroups",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Number of returned Contact Groups",
                          "variableName": "contactGroupsCountOptionGetAllContactGroups",
                          "rightSideInput": true,
                          "hasDynamicVariable": true,
                          "numberField": true,
                          "typeOfValue": "integer",
                          "helperSpan": "Valid values are between 1 and 1000, inclusive",
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Fields",
                    "variableName": "groupFieldsGetAllContactGroups",
                    "fieldsArray": [
                      [
                        {
                          type: "multiselect",
                          placeholder: "Please choose the fields to be returned",
                          variableName: "groupFieldsOptionGetAllContactGroups",
                          value: [],
                          list: [
                            {
                              option: "name",
                              value: "name",
                            },
                            {
                              option: "clientData",
                              value: "clientData",
                            },
                            {
                              option: "groupType",
                              value: "groupType",
                            },
                            {
                              option: "memberCount",
                              value: "memberCount",
                            },
                            {
                              option: "metadata",
                              value: "metadata",
                            },
                          ],
                        },
                      ]
                    ]
                  },
                ],
                "Create Group": [
                  {
                    "type": "textfield",
                    "label": "Group Name",
                    "required": true,
                    "variableName": "nameCreateGroup",
                    "value": "",
                    "placeholder": "Group Name",
                    "hasDynamicVariable": true,
                  },
                ],
                "Update Contacts In Group": [
                  {
                    "type": "textfield",
                    "label": "Resource Name",
                    "required": true,
                    "variableName": "resourceNameUpdateContactsInGroup",
                    "value": "",
                    "placeholder": "in the format of 'contactGroups/{contactGroupId}'",
                    "hasDynamicVariable": true,
                    "helperSpan": "the Unique identifier for the contact Group. Can be found in the Contact Group Object returned in the Contact Group Get Many operation"
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Contacts To Add",
                    "variableName": "addedContactsUpdateContactsInGroup",
                    "required": false,
                    "structure": [
                      {
                        "type": "row",
                        "title": "Contact Resource Name",
                        "variableName": "addedContactsUpdateContactsInGroup",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "required": true,
                        "variableName": "addedContactResourceNameUpdateContactsInGroup",
                        "value": "",
                        "placeholder": "in the format of 'people/{contact_ID}'",
                        "hasDynamicVariable": true,
                        "helperSpan": "the Unique identifier for the contact. Can be found in the Contact Object returned in the Get Many or search operations"
                      }
                    ]
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Contacts To Remove",
                    "variableName": "removedContactsUpdateContactsInGroup",
                    "required": false,
                    "structure": [
                      {
                        "type": "row",
                        "title": "Contact Resource Name",
                        "variableName": "removedContactsUpdateContactsInGroup",
                        "removeButton": true
                      },
                      {
                        "type": "textfield",
                        "required": true,
                        "variableName": "removedContactResourceNameUpdateContactsInGroup",
                        "value": "",
                        "placeholder": "in the format of 'people/{contact_ID}'",
                        "hasDynamicVariable": true,
                        "helperSpan": "the Unique identifier for the contact. Can be found in the Contact Object returned in the Get Many or search operations"
                      }
                    ]
                  },
                ],

              }
            }
          ]
        }
      }
    ]
  }
};