export const WhatsappJson = {
  "category": "integration",
  "type": "Whatsapp",
  "label": "Whatsapp",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Whatsapp/getting_started",
  "description": "Whatsapp integration",
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
        "credType": "Whatsapp",
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
        value: "Message",
        variableName: "type",
        errorSpan: "Please choose a resource",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Message",
            value: "Message",
          },
          {
            option: "Media",
            value: "Media",
          },
        ],
        options: {
          Message: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Send Message",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Send",
                  value: "Send Message",
                },
                {
                  option: "Send Template",
                  value: "Send Template Message",
                },
              ],
              options: {
                "Send Message": [
                  {
                    type: "api",
                    label: "Sender Phone Number",
                    variableName: "phone_number_id_SendMessage",
                    value: "",
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
                              "whatsapp/getPhoneNumbers",
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
                      path: "data.PhoneNumbers",
                      keys: {
                        option: {
                          fields: ["display_phone_number"],
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
                    label: "Recipient's Phone Number",
                    required: true,
                    variableName: "to_SendMessage",
                    value: "",
                    placeholder: "Recipient's Phone Number",
                    hasDynamicVariable: true,
                    helperSpan: "",
                  },
                  {
                    type: "dropdown",
                    label: "MessageType",
                    value: "text",
                    variableName: "MessageType_SendMessage",
                    errorSpan: "Please choose a Type",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Text",
                        value: "text",
                      },
                      {
                        option: "Audio",
                        value: "audio",
                      },
                      {
                        option: "Contacts",
                        value: "contacts",
                      },
                      {
                        option: "Document",
                        value: "document",
                      },
                      {
                        option: "Image",
                        value: "image",
                      },
                      {
                        option: "Location",
                        value: "location",
                      },
                      {
                        option: "Video",
                        value: "video",
                      },
                    ],
                    options: {
                      text: [
                        {
                          type: "textfield",
                          label: "Text Body",
                          required: true,
                          variableName: "body_SendTextMessage",
                          value: "",
                          placeholder: "Text Body",
                          hasDynamicVariable: true,
                          helperSpan:
                            "Message body text. Supports URLs. Maximum 4096 characters.",
                        },
                        {
                          title: "Additional Fields",
                          type: "accordion",
                          accTitle: "Show URL Previews",
                          variableName: "preview_url_SendTextMessage",
                          fieldsArray: [
                            [
                              {
                                type: "checkbox",
                                value: false,
                                variableName: "preview_url_SendTextMessage",
                                helperSpan:
                                  "Set to true to have the WhatsApp client attempt to render a link preview of any URL in the body text string.",
                              },
                            ],
                          ],
                        },
                      ],
                      audio: [
                        {
                          "type": "dropdown",
                          "label": "Media From",
                          "value": "link",
                          "required": true,
                          "variableName": "mediaFrom_SendAudioMessage",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Link",
                              "value": "link"
                            },
                            {
                              "option": "Media ID",
                              "value": "media id"
                            },
                          ],
                          "options": {
                            "link": [
                              {
                                type: "textfield",
                                label: "Link",
                                required: true,
                                variableName: "link_SendAudioMessage",
                                value: "",
                                placeholder: "Link",
                                hasDynamicVariable: true,
                                helperSpan: "Link of the audio to be sent",
                              },
                            ],
                            "media id": [
                              {
                                type: "textfield",
                                label: "Media ID",
                                required: true,
                                variableName: "mediaID_SendAudioMessage",
                                value: "",
                                placeholder: "Media ID",
                                hasDynamicVariable: true,
                                helperSpan: "Media ID of the audio to be sent",
                              },
                            ],
                          },
                        },
                      ],
                      contacts: [
                        {
                          title: "Name",
                          type: "textfield",
                          label: "Formatted Name",
                          required: true,
                          variableName: "formatted_name_SendContactsMessage",
                          value: "",
                          placeholder: "Formatted Name",
                          hasDynamicVariable: true,
                          helperSpan:
                            "Contact's formatted name. This will appear in the message alongside the profile arrow button.",
                        },
                        {
                          type: "textfield",
                          label: "First Name",
                          required: true,
                          variableName: "first_name_SendContactsMessage",
                          value: "",
                          placeholder: "First Name",
                          hasDynamicVariable: true,
                          helperSpan: "Contact's first name.",
                        },
                        {
                          type: "textfield",
                          label: "Last Name",
                          required: true,
                          variableName: "last_name_SendContactsMessage",
                          value: "",
                          placeholder: "Last Name",
                          hasDynamicVariable: true,
                          helperSpan: "Contact's last name.",
                        },
                        {
                          type: "textfield",
                          label: "Middle Name",
                          required: false,
                          variableName: "middle_name_SendContactsMessage",
                          value: "",
                          placeholder: "Middle Name",
                          hasDynamicVariable: true,
                          helperSpan: "Contact's middle name.",
                        },
                        {
                          type: "textfield",
                          label: "Suffix",
                          required: false,
                          variableName: "suffix_SendContactsMessage",
                          value: "",
                          placeholder: "Suffix",
                          hasDynamicVariable: true,
                          helperSpan:
                            "Suffix for the contact's name, if applicable.",
                        },
                        {
                          type: "textfield",
                          label: "Prefix",
                          required: false,
                          variableName: "prefix_SendContactsMessage",
                          value: "",
                          placeholder: "Prefix",
                          hasDynamicVariable: true,
                          helperSpan:
                            "Prefix for the contact's name, such as Mr., Ms., Dr., etc.",
                        },
                        {
                          title: "Additional Fields",
                          type: "accordion",
                          accTitle: "Birthday",
                          variableName: "birthday_SendContactsMessage",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                variableName: "birthday_SendContactsMessage",
                                date: true,
                                value: "",
                                placeholder: "Birthday",
                                hasDynamicVariable: true,
                                helperSpan:
                                  "Contact's birthday in YYYY-MM-DD format.",
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Organization",
                          variableName: "organization_SendContactsMessage",
                          fieldsArray: [
                            [
                              {
                                label: "Company",
                                type: "textfield",
                                variableName: "company_SendContactsMessage",
                                value: "",
                                placeholder: "Company",
                                hasDynamicVariable: true,
                                helperSpan:
                                  "Name of the company where the contact works.",
                              },
                              {
                                label: "Title",
                                type: "textfield",
                                variableName: "title_SendContactsMessage",
                                value: "",
                                placeholder: "Title",
                                hasDynamicVariable: true,
                                helperSpan: "Contact's job title.",
                              },
                              {
                                label: "Department",
                                type: "textfield",
                                variableName: "department_SendContactsMessage",
                                value: "",
                                placeholder: "Department",
                                hasDynamicVariable: true,
                                helperSpan: "Department within the company.",
                              },
                            ],
                          ],
                        },
                        {
                          type: "dynamic",
                          fieldsArray: [],
                          title: "Addresses",
                          variableName: "addresses_SendContactsMessage",
                          structure: [
                            {
                              type: "row",
                              title: "Address",
                              variableName: "address_SendContactsMessage",
                              removeButton: true,
                            },
                            {
                              type: "dropdown",
                              label: "Type",
                              value: "home",
                              variableName: "type_SendContactsMessage",
                              required: true,
                              hasDynamicVariable: false,
                              list: [
                                {
                                  option: "Home",
                                  value: "home",
                                },
                                {
                                  option: "Work",
                                  value: "work",
                                },
                              ],
                            },
                            {
                              type: "textfield",
                              label: "Street",
                              value: "",
                              placeholder: "Street",
                              variableName: "street_SendContactsMessage",
                              hasDynamicVariable: true,
                            },
                            {
                              type: "textfield",
                              label: "City",
                              value: "",
                              placeholder: "City",
                              variableName: "city_SendContactsMessage",
                              hasDynamicVariable: true,
                            },
                            {
                              type: "textfield",
                              label: "State",
                              value: "",
                              placeholder: "State",
                              variableName: "state_SendContactsMessage",
                              hasDynamicVariable: true,
                            },
                            {
                              type: "textfield",
                              label: "Zip",
                              value: "",
                              placeholder: "Zip",
                              variableName: "zip_SendContactsMessage",
                              hasDynamicVariable: true,
                            },
                            {
                              type: "textfield",
                              label: "Country",
                              value: "",
                              placeholder: "Country",
                              variableName: "country_SendContactsMessage",
                              hasDynamicVariable: true,
                            },
                            {
                              type: "textfield",
                              label: "Country Code",
                              value: "",
                              placeholder: "Country Code",
                              variableName: "country_code_SendContactsMessage",
                              hasDynamicVariable: true,
                            },
                          ],
                        },
                        {
                          type: "dynamic",
                          fieldsArray: [],
                          title: "Email",
                          variableName: "emails_SendContactsMessage",
                          structure: [
                            {
                              type: "row",
                              title: "Email",
                              variableName: "emails_SendContactsMessage",
                              removeButton: true,
                            },
                            {
                              type: "dropdown",
                              label: "Type",
                              value: "home",
                              variableName: "type_emails_SendContactsMessage",
                              required: true,
                              hasDynamicVariable: false,
                              list: [
                                {
                                  option: "Home",
                                  value: "home",
                                },
                                {
                                  option: "Work",
                                  value: "work",
                                },
                              ],
                            },
                            {
                              type: "textfield",
                              label: "Email",
                              required: true,
                              value: "",
                              placeholder: "Email",
                              variableName: "email_emails_SendContactsMessage",
                              hasDynamicVariable: true,
                            },
                          ],
                        },
                        {
                          type: "dynamic",
                          fieldsArray: [],
                          title: "Phone",
                          variableName: "phones_SendContactsMessage",
                          structure: [
                            {
                              type: "row",
                              title: "Phone",
                              variableName: "phones_SendContactsMessage",
                              removeButton: true,
                            },
                            {
                              type: "dropdown",
                              label: "Type",
                              value: "home",
                              variableName: "type_phones_SendContactsMessage",
                              required: true,
                              hasDynamicVariable: false,
                              list: [
                                {
                                  option: "Cell",
                                  value: "cell",
                                },
                                {
                                  option: "Home",
                                  value: "home",
                                },
                                {
                                  option: "Iphone",
                                  value: "iPhone",
                                },
                                {
                                  option: "Main",
                                  value: "main",
                                },
                                {
                                  option: "WhatsApp ID",
                                  value: "mobile",
                                },
                                {
                                  option: "Work",
                                  value: "work",
                                },
                              ],
                            },
                            {
                              type: "textfield",
                              label: "Phone",
                              required: true,
                              value: "",
                              placeholder: "Phone",
                              variableName: "phone_phones_SendContactsMessage",
                              hasDynamicVariable: true,
                            },
                          ],
                        },
                        {
                          type: "dynamic",
                          fieldsArray: [],
                          title: "URL",
                          variableName: "urls_SendContactsMessage",
                          structure: [
                            {
                              type: "row",
                              title: "URL",
                              variableName: "urls_SendContactsMessage",
                              removeButton: true,
                            },
                            {
                              type: "dropdown",
                              label: "Type",
                              value: "home",
                              variableName: "type_urls_SendContactsMessage",
                              required: true,
                              hasDynamicVariable: false,
                              list: [
                                {
                                  option: "Home",
                                  value: "home",
                                },
                                {
                                  option: "Work",
                                  value: "work",
                                },
                              ],
                            },
                            {
                              type: "textfield",
                              label: "URL",
                              required: true,
                              value: "",
                              placeholder: "URL",
                              variableName: "url_urls_SendContactsMessage",
                              hasDynamicVariable: true,
                            },
                          ],
                        },
                      ],
                      document: [
                        {
                          "type": "dropdown",
                          "label": "Media From",
                          "value": "link",
                          "required": true,
                          "variableName": "mediaFrom_SendDocumentMessage",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Link",
                              "value": "link"
                            },
                            {
                              "option": "Media ID",
                              "value": "media id"
                            },
                          ],
                          "options": {
                            "link": [
                              {
                                type: "textfield",
                                label: "Link",
                                required: true,
                                variableName: "link_SendDocumentMessage",
                                value: "",
                                placeholder: "Link",
                                hasDynamicVariable: true,
                                helperSpan: "Link of the document to be sent",
                              },
                            ],
                            "media id": [
                              {
                                type: "textfield",
                                label: "Media ID",
                                required: true,
                                variableName: "mediaID_SendDocumentMessage",
                                value: "",
                                placeholder: "Media ID",
                                hasDynamicVariable: true,
                                helperSpan: "Media ID of the document to be sent",
                              },
                            ],
                          },
                        },
                        {
                          title: "Additional Fields",
                          type: "accordion",
                          accTitle: "Filename",
                          variableName: "filename_SendDocumentMessage",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                variableName: "filename_SendDocumentMessage",
                                value: "",
                                placeholder: "Filename",
                                hasDynamicVariable: true,
                                helperSpan:
                                  "Document filename, with extension.",
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Caption",
                          variableName: "caption_SendDocumentMessage",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                variableName: "caption_SendDocumentMessage",
                                value: "",
                                placeholder: "Caption",
                                hasDynamicVariable: true,
                                helperSpan: "Document caption text.",
                              },
                            ],
                          ],
                        },
                      ],
                      image: [
                        {
                          "type": "dropdown",
                          "label": "Media From",
                          "value": "link",
                          "required": true,
                          "variableName": "mediaFrom_SendImageMessage",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Link",
                              "value": "link"
                            },
                            {
                              "option": "Media ID",
                              "value": "media id"
                            },
                          ],
                          "options": {
                            "link": [
                              {
                                type: "textfield",
                                label: "Link",
                                required: true,
                                variableName: "link_SendImageMessage",
                                value: "",
                                placeholder: "Link",
                                hasDynamicVariable: true,
                                helperSpan: "Link of the image to be sent",
                              },
                            ],
                            "media id": [
                              {
                                type: "textfield",
                                label: "Media ID",
                                required: true,
                                variableName: "mediaID_SendImageMessage",
                                value: "",
                                placeholder: "Media ID",
                                hasDynamicVariable: true,
                                helperSpan: "Media ID of the image to be sent",
                              },
                            ],
                          },
                        },
                        {
                          title: "Additional Fields",
                          type: "accordion",
                          accTitle: "Caption",
                          variableName: "caption_SendImageMessage",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                variableName: "caption_SendImageMessage",
                                value: "",
                                placeholder: "Caption",
                                hasDynamicVariable: true,
                                helperSpan: "Image caption text.",
                              },
                            ],
                          ],
                        },
                      ],
                      location: [
                        {
                          type: "textfield",
                          label: "Latitude",
                          required: true,
                          variableName: "latitude_SendLocationMessage",
                          value: "",
                          placeholder: "Latitude",
                          hasDynamicVariable: true,
                          helperSpan: "Location latitude in decimal degrees.",
                        },
                        {
                          type: "textfield",
                          label: "Longitude",
                          required: true,
                          variableName: "longitude_SendLocationMessage",
                          value: "",
                          placeholder: "Longitude",
                          hasDynamicVariable: true,
                          helperSpan: "Location longitude in decimal degrees.",
                        },
                        {
                          title: "Additional Fields",
                          type: "accordion",
                          accTitle: "Name",
                          variableName: "name_SendLocationMessage",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                variableName: "name_SendLocationMessage",
                                value: "",
                                placeholder: "Name",
                                hasDynamicVariable: true,
                                helperSpan: "Location name.",
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Address",
                          variableName: "address_SendLocationMessage",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                variableName: "address_SendLocationMessage",
                                value: "",
                                placeholder: "Address",
                                hasDynamicVariable: true,
                                helperSpan: "Location address.",
                              },
                            ],
                          ],
                        },
                      ],
                      video: [
                        {
                          "type": "dropdown",
                          "label": "Media From",
                          "value": "link",
                          "required": true,
                          "variableName": "mediaFrom_SendVideoMessage",
                          "hasDynamicVariable": true,
                          "list": [
                            {
                              "option": "Link",
                              "value": "link"
                            },
                            {
                              "option": "Media ID",
                              "value": "media id"
                            },
                          ],
                          "options": {
                            "link": [
                              {
                                type: "textfield",
                                label: "Link",
                                required: true,
                                variableName: "link_SendVideoMessage",
                                value: "",
                                placeholder: "Link",
                                hasDynamicVariable: true,
                                helperSpan: "Link of the video to be sent",
                              },
                            ],
                            "media id": [
                              {
                                type: "textfield",
                                label: "Media ID",
                                required: true,
                                variableName: "mediaID_SendVideoMessage",
                                value: "",
                                placeholder: "Media ID",
                                hasDynamicVariable: true,
                                helperSpan: "Media ID of the video to be sent",
                              },
                            ],
                          },
                        },
                        {
                          title: "Additional Fields",
                          type: "accordion",
                          accTitle: "Caption",
                          variableName: "caption_SendVideoMessage",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                variableName: "caption_SendVideoMessage",
                                value: "",
                                placeholder: "Caption",
                                hasDynamicVariable: true,
                                helperSpan: "Video caption text.",
                              },
                            ],
                          ],
                        },
                      ],
                    },
                  },
                ],
                "Send Template Message": [
                  {
                    type: "api",
                    label: "Sender Phone Number",
                    variableName: "phone_number_id_SendMessageTemplate",
                    value: "",
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
                              "whatsapp/getPhoneNumbers",
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
                      path: "data.PhoneNumbers",
                      keys: {
                        option: {
                          fields: ["display_phone_number"],
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
                    label: "Recipient's Phone Number",
                    required: true,
                    variableName: "to_SendMessageTemplate",
                    value: "",
                    placeholder: "Recipient's Phone Number",
                    hasDynamicVariable: true,
                    helperSpan: "",
                  },
                  {
                    type: "api",
                    label: "Template",
                    variableName: "template_SendMessageTemplate",
                    value: "",
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
                              "whatsapp/getTemplates",
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
                      path: "data.Templates",
                      keys: {
                        option: {
                          fields: ["label"],
                        },
                        value: {
                          fields: ["value"],
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
                  // {
                  //   type: "dynamic",
                  //   fieldsArray: [],
                  //   title: "Component",
                  //   variableName: "components_SendMessageTemplate",
                  //   structure: [
                  //     {
                  //       type: "row",
                  //       title: "Component",
                  //       variableName: "components_SendMessageTemplate",
                  //       removeButton: true,
                  //     },
                  //     {
                  //       type: "dropdown",
                  //       label: "Type",
                  //       value: "body",
                  //       variableName: "type_component_SendMessageTemplate",
                  //       required: false,
                  //       hasDynamicVariable: false,
                  //       list: [
                  //         {
                  //           option: "Body",
                  //           value: "body",
                  //         },
                  //         {
                  //           option: "Button",
                  //           value: "button",
                  //         },
                  //         {
                  //           option: "Header",
                  //           value: "header",
                  //         },
                  //       ],
                  //       options: {
                  //         body: [
                  //           {
                  //             type: "dynamic",
                  //             fieldsArray: [],
                  //             title: "Parameter",
                  //             variableName: "parameters_SendMessageTemplate",
                  //             structure: [
                  //               {
                  //                 type: "row",
                  //                 title: "Parameter",
                  //                 variableName:
                  //                   "parameters_SendMessageTemplate",
                  //                 removeButton: true,
                  //               },
                  //               {
                  //                 type: "dropdown",
                  //                 label: "Type",
                  //                 value: "text",
                  //                 variableName: "type_SendMessageTemplate",
                  //                 required: false,
                  //                 hasDynamicVariable: false,
                  //                 list: [
                  //                   {
                  //                     option: "Text",
                  //                     value: "text",
                  //                   },
                  //                   {
                  //                     option: "Currency",
                  //                     value: "currency",
                  //                   },
                  //                   {
                  //                     option: "Date Time",
                  //                     value: "date_time",
                  //                   },
                  //                 ],
                  //                 options: {
                  //                   text: [
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Text",
                  //                       required: false,
                  //                       variableName:
                  //                         "text_type_SendMessageTemplate",
                  //                       value: "",
                  //                       placeholder: "Text",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                   ],
                  //                   currency: [
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Currency Code",
                  //                       required: false,
                  //                       variableName:
                  //                         "currency_code_type_SendMessageTemplate",
                  //                       value: "",
                  //                       placeholder: "Currency Code",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Amount",
                  //                       required: false,
                  //                       variableName:
                  //                         "amount_1000_type_SendMessageTemplate",
                  //                       numberField: true,
                  //                       typeOfValue: "integer",
                  //                       value: "",
                  //                       placeholder: "Amount",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Fallback Value",
                  //                       required: false,
                  //                       variableName:
                  //                         "fallback_value_type_SendMessageTemplate",
                  //                       value: "",
                  //                       placeholder: "Fallback Value",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                   ],
                  //                   date_time: [
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Date Time",
                  //                       required: false,
                  //                       date: true,
                  //                       datetimeLocal: true,
                  //                       variableName:
                  //                         "fallback_value_type_SendMessageTemplate",
                  //                       value: "",
                  //                       placeholder: "Date Time",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                   ],
                  //                 },
                  //               },
                  //             ],
                  //           },
                  //         ],
                  //         button: [
                  //           {
                  //             type: "dropdown",
                  //             label: "Sub Type",
                  //             value: "quick_reply",
                  //             variableName: "sub_type",
                  //             required: true,
                  //             hasDynamicVariable: false,
                  //             list: [
                  //               {
                  //                 option: "Quick Reply",
                  //                 value: "quick_reply",
                  //               },
                  //               {
                  //                 option: "URL",
                  //                 value: "url",
                  //               },
                  //             ],
                  //           },
                  //           {
                  //             type: "textfield",
                  //             label: "Index",
                  //             required: false,
                  //             variableName: "index",
                  //             numberField: true,
                  //             typeOfValue: "integer",
                  //             value: "",
                  //             placeholder: "Index",
                  //             hasDynamicVariable: true,
                  //             helperSpan: "",
                  //           },
                  //           {
                  //             type: "dynamic",
                  //             fieldsArray: [],
                  //             title: "Parameter",
                  //             variableName:
                  //               "parameters_button_SendMessageTemplate",
                  //             structure: [
                  //               {
                  //                 type: "row",
                  //                 title: "Parameter",
                  //                 variableName:
                  //                   "parameters_button_SendMessageTemplate",
                  //                 removeButton: true,
                  //               },
                  //               {
                  //                 type: "dropdown",
                  //                 label: "Type",
                  //                 value: "text",
                  //                 variableName:
                  //                   "type_button_SendMessageTemplate",
                  //                 required: false,
                  //                 hasDynamicVariable: false,
                  //                 list: [
                  //                   {
                  //                     option: "Text",
                  //                     value: "text",
                  //                   },
                  //                   {
                  //                     option: "Payload",
                  //                     value: "payload",
                  //                   },
                  //                 ],
                  //                 options: {
                  //                   text: [
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Text",
                  //                       required: false,
                  //                       variableName:
                  //                         "text_type_button_SendMessageTemplate",
                  //                       value: "",
                  //                       placeholder: "Text",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                   ],
                  //                   payload: [
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Payload",
                  //                       required: false,
                  //                       variableName:
                  //                         "payload_type_button_SendMessageTemplate",
                  //                       value: "",
                  //                       placeholder: "Payload",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                   ],
                  //                 },
                  //               },
                  //             ],
                  //           },
                  //         ],
                  //         header: [
                  //           {
                  //             type: "dynamic",
                  //             fieldsArray: [],
                  //             title: "Parameter",
                  //             variableName:
                  //               "parameters_header_SendMessageTemplate",
                  //             structure: [
                  //               {
                  //                 type: "row",
                  //                 title: "Parameter",
                  //                 variableName:
                  //                   "parameters_header_SendMessageTemplate",
                  //                 removeButton: true,
                  //               },
                  //               {
                  //                 type: "dropdown",
                  //                 label: "Type",
                  //                 value: "text",
                  //                 variableName:
                  //                   "type_header_SendMessageTemplate",
                  //                 required: false,
                  //                 hasDynamicVariable: false,
                  //                 list: [
                  //                   {
                  //                     option: "Text",
                  //                     value: "text",
                  //                   },
                  //                   {
                  //                     option: "Currency",
                  //                     value: "currency",
                  //                   },
                  //                   {
                  //                     option: "Date Time",
                  //                     value: "date_time",
                  //                   },
                  //                   {
                  //                     option: "Image",
                  //                     value: "image",
                  //                   },
                  //                 ],
                  //                 options: {
                  //                   text: [
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Text",
                  //                       required: false,
                  //                       variableName:
                  //                         "text_type_header_SendMessageTemplate",
                  //                       value: "",
                  //                       placeholder: "Text",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                   ],
                  //                   currency: [
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Currency Code",
                  //                       required: false,
                  //                       variableName:
                  //                         "currency_code_type_header_SendMessageTemplate",
                  //                       value: "",
                  //                       placeholder: "Currency Code",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Amount",
                  //                       required: false,
                  //                       variableName:
                  //                         "amount_1000_type_header_SendMessageTemplate",
                  //                       numberField: true,
                  //                       typeOfValue: "integer",
                  //                       value: "",
                  //                       placeholder: "Amount",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                   ],
                  //                   date_time: [
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Date Time",
                  //                       required: false,
                  //                       date: true,
                  //                       datetimeLocal: true,
                  //                       variableName:
                  //                         "fallback_value_type_header_SendMessageTemplate",
                  //                       value: "",
                  //                       placeholder: "Date Time",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                   ],
                  //                   image: [
                  //                     {
                  //                       type: "textfield",
                  //                       label: "Link",
                  //                       required: false,
                  //                       variableName:
                  //                         "link_type_header_SendMessageTemplate",
                  //                       value: "",
                  //                       placeholder: "Link",
                  //                       hasDynamicVariable: true,
                  //                       helperSpan: "",
                  //                     },
                  //                   ],
                  //                 },
                  //               },
                  //             ],
                  //           },
                  //         ],
                  //       },
                  //     },
                  //   ],
                  // },
                ],
              },
            },
          ],
          Media: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Media",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Media",
                },
                {
                  option: "Download",
                  value: "Download Media",
                },
                {
                  option: "Download From ID",
                  value: "Download Trigger Media",
                },
                {
                  option: "Upload",
                  value: "Upload Media",
                },
              ],
              options: {
                "Get Media": [
                  {
                    type: "textfield",
                    label: "Media ID",
                    required: true,
                    variableName: "mediaID_GetMedia",
                    value: "",
                    placeholder: "Media ID",
                    hasDynamicVariable: true,
                  },
                ],
                "Download Media": [
                  {
                    type: "textfield",
                    label: "Media URL",
                    required: true,
                    variableName: "mediaURL_DownloadMedia",
                    value: "",
                    placeholder: "Media URL",
                    hasDynamicVariable: true,
                  },
                ],
                "Download Trigger Media": [
                  {
                    type: "textfield",
                    label: "Media ID",
                    required: true,
                    variableName: "mediaID_DownloadTriggerMedia",
                    value: "",
                    placeholder: "Media ID",
                    hasDynamicVariable: true,
                    helperSpan: "The media_id variable from the trigger. can be acquired from test trigger or upload media operation.",
                  },
                ],
                "Upload Media": [
                  {
                    type: "api",
                    label: "Sender Phone Number",
                    variableName: "phone_number_id_UploadMedia",
                    value: "",
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
                              "whatsapp/getPhoneNumbers",
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
                      path: "data.PhoneNumbers",
                      keys: {
                        option: {
                          fields: ["display_phone_number"],
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
                    "type": "textfield",
                    "label": "Media Mime Type",
                    "required": true,
                    "variableName": "fileContentType_UploadMedia",
                    "value": "",
                    "placeholder": "like 'image/png' for .png images",
                    "hasDynamicVariable": true,
                    "helperSpan": "the value of the Content-type parameter to be included in the header that describes the type of the file. for more information see this page https://www.geeksforgeeks.org/http-headers-content-type/",
                  },
                  {
                    "type": "dropdown",
                    "label": "Upload From",
                    "value": "url",
                    "required": true,
                    "variableName": "uploadFrom_UploadMedia",
                    "hasDynamicVariable": true,
                    "list": [
                      {
                        "option": "URL",
                        "value": "url"
                      },
                      {
                        "option": "File",
                        "value": "byteString"
                      },
                    ],
                    "options": {
                      "url": [
                        {
                          "type": "textfield",
                          "label": "URL",
                          "required": true,
                          "variableName": "fileURL_UploadMedia",
                          "value": "",
                          "placeholder": "URL",
                          "hasDynamicVariable": true
                        },
                      ],
                      "byteString": [
                        {
                          "type": "textfield",
                          "label": "File (File Variable Name)",
                          "required": true,
                          "variableName": "fileContent_UploadMedia",
                          "value": "",
                          "placeholder": "File",
                          "hasDynamicVariable": true,
                          "helperSpan":"For a list of supported media types and formats for WhatsApp Cloud API, please refer to the official documentation: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types"
                        },
                      ],
                    },
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