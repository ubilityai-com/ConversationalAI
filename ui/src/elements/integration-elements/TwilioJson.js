export const TwilioJson = {
  "category": "integration",
  "type": "Twilio",
  "label": "Twilio",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Twilio/getting_started",
  "description": "Twilio integration",
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
        credType: "Twilio",
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
            type: { fields: ["type"] },
          },
        },
        apiDependsOn: [],
      },
      {
        type: "dropdown",
        label: "Resource",
        value: "SMS",
        variableName: "type",
        errorSpan: "Please choose a Resource",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "SMS",
            value: "SMS",
          },
          {
            option: "Call",
            value: "Call",
          },
        ],
        options: {
          SMS: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Send SMS",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Send",
                  value: "Send SMS",
                },
              ],
              options: {
                "Send SMS": [
                  {
                    type: "textfield",
                    label: "From",
                    value: "",
                    required: true,
                    variableName: "From",
                    placeholder: "+14155238886",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "To",
                    value: "",
                    required: true,
                    placeholder: "+14155238886",
                    variableName: "TO",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Message",
                    value: "",
                    required: true,
                    placeholder: "Message",
                    variableName: "Message",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                ],
              },
            },
          ],
          Call: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Make Call",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Make",
                  value: "Make Call",
                },
              ],
              options: {
                "Make Call": [
                  {
                    type: "textfield",
                    label: "From",
                    value: "",
                    required: true,
                    variableName: "From",
                    placeholder: "+14155238886",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "TO",
                    value: "",
                    required: true,
                    placeholder: "+14155238886",
                    variableName: "TO",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "URL",
                    value: "",
                    required: true,
                    placeholder: "URL",
                    variableName: "URL",
                    hasDynamicVariable: true,
                    rightSideInput: true,
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