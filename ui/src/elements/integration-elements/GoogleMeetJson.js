export const GoogleMeetJson = {
  "category": "integration",
  "type": "GoogleMeet",
  "label": "Google Meet",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/GoogleMeet/getting_started",
  "description": "Google Meet integration",
  "defaultValid": false,
  "automated": "json",
  "automationConfig": "automated",
  "defaults": {
    "json": [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "GoogleMeet",
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
        conditionOnFirstTime: [],
        conditionOnRefresh: [],
      },
      {
        type: "dropdown",
        label: "Operation",
        value: "Create Meet",
        variableName: "operation",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Schedule a Meeting",
            value: "Create Meet",
          },
        ],
        options: {
          'Create Meet': [
            {
              type: "api",
              label: "Calendar",
              variableName: "calendarId",
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
                        "google_meet/getCalendars"
                    },
                  ],
                },
                {
                  key: "data",
                  obj: [
                    {
                      "key": "credential_name",
                      "dependOn": "cred",
                      "isAutomation": true
                    },
                  ],
                },
              ],
              res: {
                path: "data.calendars",
                keys: {
                  option: { fields: ["summary"] },
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
              label: "TimeZone",
              variableName: "timeZone",
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
                        "google_meet/getTimezone"
                    },
                  ],
                },
                {
                  key: "data",
                  obj: [
                    {
                      "key": "credential_name",
                      "dependOn": "cred",
                      "isAutomation": true
                    },
                    {
                      key: "calendarId",
                      dependOn: "calendarId",
                      isAutomation: true,
                    },
                  ],
                },
              ],
              res: {
                path: "data",
                keys: {
                  option: { fields: ["timeZone"] },
                  value: { fields: ["timeZone"] },
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
              label: "Start Date & Time",
              required: true,
              value: "",
              variableName: "dTimeStart",
              placeholder: "Enter Text..",
              hasDynamicVariable: true,
            },
            {
              type: "textfield",
              label: "End Date & Time",
              required: true,
              value: "",
              variableName: "dTimeEnd",
              placeholder: "Enter Text..",
              hasDynamicVariable: true,
            },
            {
              "type": "dynamic",
              "fieldsArray": [],
              "title": "Attendee Email",
              "variableName": "emails",
              "structure": [
                {
                  "type": "row",
                  "title": "Attendee Email",
                  "variableName": "emails",
                  "removeButton": true
                },
                {
                  "type": "textfield",
                  "value": "",
                  "placeholder": "Enter Text..",
                  "variableName": "emailsAttendee"
                },
              ]
            },
            {
              title: "Additional Fields",
              type: "accordion",
              accTitle: "Summary",
              variableName: "summaryMeet",
              fieldsArray: [
                [
                  {
                    type: "textfield",
                    value: "",
                    variableName: "summaryMeet",
                    rightSideInput: true,
                    placeholder: "Enter Text..",
                    hasDynamicVariable: true
                  }
                ]
              ]
            },
            {
              type: "accordion",
              accTitle: "Description",
              variableName: "descMeet",
              fieldsArray: [
                [
                  {
                    type: "textfield",
                    value: "",
                    variableName: "descMeet",
                    rightSideInput: true,
                    multiline: true,
                    minRows: 3,
                    placeholder: "Enter Text..",
                    hasDynamicVariable: true
                  }
                ]
              ]
            },
          ]
        },
      },
    ]
  }
};