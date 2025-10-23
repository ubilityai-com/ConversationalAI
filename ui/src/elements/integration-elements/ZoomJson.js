export const ZoomJson = {
  "category": "integration",
  "type": "Zoom",
  "label": "Zoom",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Zoom/getting_started",
  "description": "Zoom integration",
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
        "credType": "Zoom",
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
        value: "Meeting",
        variableName: "type",
        errorSpan: "Please choose a Type",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Meeting",
            value: "Meeting",
          },
        ],
        options: {
          Meeting: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Create Meeting",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Create",
                  value: "Create Meeting",
                },
                {
                  option: "Get",
                  value: "Get Meeting",
                },
                {
                  option: "Get Many",
                  value: "List Meetings",
                },
                {
                  option: "Update",
                  value: "Update Meeting",
                },
                {
                  option: "Delete",
                  value: "Delete Meeting",
                },

              ],
              options: {
                "Create Meeting": [
                  {
                    type: "textfield",
                    label: "Topic",
                    required: false,
                    variableName: "topicCreate",
                    value: "",
                    placeholder: "Enter text..",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Agenda",
                    variableName: "agenda",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "agenda",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Duration",
                    variableName: "duration",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "duration",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Password",
                    variableName: "password",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          password: true,
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "password",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Schedule For",
                    variableName: "scheduleFor",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "scheduleFor",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Start Time",
                    variableName: "startTime",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "startTime",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Timezone Name or ID",
                    variableName: "timezone",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "Pacific/Midway",
                          required: false,
                          variableName: "timezone",
                          list: [
                            {
                              option: "Pacific/Midway",
                              value: "Pacific/Midway"
                            },
                            {
                              option: "Pacific/Pago_Pago",
                              value: "Pacific/Pago_Pago"
                            },
                            {
                              option: "Pacific/Honolulu",
                              value: "Pacific/Honolulu"
                            },
                            {
                              option: "America/Anchorage",
                              value: "America/Anchorage",
                            },
                            {
                              option: "America/Vancouver",
                              value: "America/Vancouver"
                            },
                            {
                              option: "America/Los_Angeles",
                              value: "America/Los_Angeles"
                            },
                            {
                              option: "America/Tijuana",
                              value: "America/Tijuana",
                            },
                            {
                              option: "America/Edmonton",
                              value: "America/Edmonton",
                            },
                            {
                              option: "America/Denver",
                              value: "America/Denver",
                            },
                            {
                              option: "America/Phoenix",
                              value: "America/Phoenix",
                            },
                            {
                              option: "America/Mazatlan",
                              value: "America/Mazatlan",
                            },
                            {
                              option: "America/Winnipeg",
                              value: "America/Winnipeg",
                            },
                            {
                              option: "America/Regina",
                              value: "America/Regina",
                            },
                            {
                              option: "America/Chicago",
                              value: "America/Chicago",
                            },
                            {
                              option: "America/Mexico_City",
                              value: "America/Mexico_City"
                            },
                            {
                              option: "America/Guatemala",
                              value: "America/Guatemala"
                            },
                            {
                              option: "America/El_Salvador",
                              value: "America/El_Salvador"
                            },
                            {
                              option: "America/Managua",
                              value: "America/Managua"
                            },
                            {
                              option: "America/Costa_Rica",
                              value: "America/Costa_Rica"
                            },
                            {
                              option: "America/Montreal",
                              value: "America/Montreal"
                            },
                            {
                              option: "America/New_York",
                              value: "America/New_York"
                            },
                            {
                              option: "America/Indianapolis",
                              value: "America/Indianapolis",
                            },
                            {
                              option: "America/Panama",
                              value: "America/Panama",
                            },
                            {
                              option: "America/Bogota",
                              value: "America/Bogota",
                            },
                            {
                              option: "America/Lima",
                              value: "America/Lima",
                            },
                            {
                              option: "America/Halifax",
                              value: "America/Halifax",
                            },
                            {
                              option: "America/Puerto_Rico",
                              value: "America/Puerto_Rico",
                            },
                            {
                              option: "America/Caracas",
                              value: "America/Caracas",
                            },
                            {
                              option: "America/Santiago",
                              value: "America/Santiago",
                            },
                            {
                              option: "America/St_Johns",
                              value: "America/St_Johns",
                            },
                            {
                              option: "America/Montevideo",
                              value: "America/Montevideo",
                            },
                            {
                              option: "America/Araguaina",
                              value: "America/Araguaina",
                            },
                            {
                              option: "America/Argentina/Buenos_Aires",
                              value: "America/Argentina/Buenos_Aires",
                            },
                            {
                              option: "America/Godthab",
                              value: "America/Godthab",
                            },
                            {
                              option: "America/Sao_Paulo",
                              value: "America/Sao_Paulo",
                            },
                            {
                              option: "Atlantic/Azores",
                              value: "Atlantic/Azores",
                            },
                            {
                              option: "Canada/Atlantic",
                              value: "Canada/Atlantic",
                            },
                            {
                              option: "Atlantic/Cape_Verde",
                              value: "Atlantic/Cape_Verde",
                            },
                            {
                              option: "UTC",
                              value: "UTC",
                            },
                            {
                              option: "Etc/Greenwich",
                              value: "Etc/Greenwich",
                            },
                            {
                              option: "Europe/Belgrade",
                              value: "Europe/Belgrade",
                            },
                            {
                              option: "CET",
                              value: "CET",
                            },
                            {
                              option: "Atlantic/Reykjavik",
                              value: "Atlantic/Reykjavik",
                            },
                            {
                              option: "Europe/Dublin",
                              value: "Europe/Dublin",
                            },
                            {
                              option: "Europe/London",
                              value: "Europe/London",
                            },
                            {
                              option: "Europe/Lisbon",
                              value: "Europe/Lisbon",
                            },
                            {
                              option: "Africa/Casablanca",
                              value: "Africa/Casablanca",
                            },
                            {
                              option: "Africa/Nouakchott",
                              value: "Africa/Nouakchott",
                            },
                            {
                              option: "Europe/Oslo",
                              value: "Europe/Oslo",
                            },
                            {
                              option: "Europe/Copenhagen",
                              value: "Europe/Copenhagen",
                            },
                            {
                              option: "Europe/Brussels",
                              value: "Europe/Brussels",
                            },
                            {
                              option: "Europe/Berlin",
                              value: "Europe/Berlin",
                            },
                            {
                              option: "Europe/Helsinki",
                              value: "Europe/Helsinki",
                            },
                            {
                              option: "Europe/Amsterdam",
                              value: "Europe/Amsterdam",
                            },
                            {
                              option: "Europe/Rome",
                              value: "Europe/Rome",
                            },
                            {
                              option: "Europe/Stockholm",
                              value: "Europe/Stockholm",
                            },
                            {
                              option: "Europe/Vienna",
                              value: "Europe/Vienna",
                            },
                            {
                              option: "Europe/Luxembourg",
                              value: "Europe/Luxembourg",
                            },
                            {
                              option: "Europe/Paris",
                              value: "Europe/Paris",
                            },
                            {
                              option: "Europe/Zurich",
                              value: "Europe/Zurich",
                            },
                            {
                              option: "Europe/Madrid",
                              value: "Europe/Madrid",
                            },
                            {
                              option: "Africa/Bangui",
                              value: "Africa/Bangui",
                            },
                            {
                              option: "Africa/Algiers",
                              value: "Africa/Algiers",
                            },
                            {
                              option: "Africa/Tunis",
                              value: "Africa/Tunis",
                            },
                            {
                              option: "Africa/Harare",
                              value: "Africa/Harare",
                            },
                            {
                              option: "Africa/Nairobi",
                              value: "Africa/Nairobi",
                            },
                            {
                              option: "Europe/Warsaw",
                              value: "Europe/Warsaw",
                            },
                            {
                              option: "Europe/Prague",
                              value: "Europe/Prague",
                            },

                            {
                              option: "Europe/Budapest",
                              value: "Europe/Budapest",
                            },
                            {
                              option: "Europe/Sofia",
                              value: "Europe/Sofia",
                            },
                            {
                              option: "Europe/Istanbul",
                              value: "Europe/Istanbul",
                            },
                            {
                              option: "Europe/Athens",
                              value: "Europe/Athens",
                            },
                            {
                              option: "Europe/Bucharest",
                              value: "Europe/Bucharest",
                            },
                            {
                              option: "Asia/Nicosia",
                              value: "Asia/Nicosia",
                            },
                            {
                              option: "Asia/Beirut",
                              value: "Asia/Beirut",
                            },
                            {
                              option: "Asia/Damascus",
                              value: "Asia/Damascus",
                            },
                            {
                              option: "Asia/Jerusalem",
                              value: "Asia/Jerusalem",
                            },
                            {
                              option: "Asia/Amman",
                              value: "Asia/Amman",
                            },
                            {
                              option: "Africa/Tripoli",
                              value: "Africa/Tripoli",
                            },
                            {
                              option: "Africa/Cairo",
                              value: "Africa/Cairo",
                            },
                            {
                              option: "Africa/Johannesburg",
                              value: "Africa/Johannesburg",
                            },
                            {
                              option: "Europe/Moscow",
                              value: "Europe/Moscow",
                            },
                            {
                              option: "Asia/Baghdad",
                              value: "Asia/Baghdad",
                            },
                            {
                              option: "Asia/Kuwait",
                              value: "Asia/Kuwait",
                            },
                            {
                              option: "Asia/Riyadh",
                              value: "Asia/Riyadh",
                            },
                            {
                              option: "Asia/Bahrain",
                              value: "Asia/Bahrain",
                            },
                            {
                              option: "Asia/Qatar",
                              value: "Asia/Qatar",
                            },
                            {
                              option: "Asia/Aden",
                              value: "Asia/Aden",
                            },
                            {
                              option: "Asia/Tehran",
                              value: "Asia/Tehran",
                            },
                            {
                              option: "Africa/Khartoum",
                              value: "Africa/Khartoum",
                            },
                            {
                              option: "Africa/Djibouti",
                              value: "Africa/Djibouti",
                            },
                            {
                              option: "Africa/Mogadishu",
                              value: "Africa/Mogadishu",
                            },
                            {
                              option: "Asia/Dubai",
                              value: "Asia/Dubai",
                            },
                            {
                              option: "Asia/Muscat",
                              value: "Asia/Muscat",
                            },
                            {
                              option: "Asia/Baku",
                              value: "Asia/Baku",
                            },
                            {
                              option: "Asia/Kabul",
                              value: "Asia/Kabul",
                            },
                            {
                              option: "Asia/Yekaterinburg",
                              value: "Asia/Yekaterinburg",
                            },
                            {
                              option: "Asia/Tashkent",
                              value: "Asia/Tashkent",
                            },
                            {
                              option: "Asia/Calcutta",
                              value: "Asia/Calcutta",
                            },
                            {
                              option: "Asia/Kathmandu",
                              value: "Asia/Kathmandu",
                            },
                            {
                              option: "Asia/Novosibirsk",
                              value: "Asia/Novosibirsk",
                            },
                            {
                              option: "Asia/Almaty",
                              value: "Asia/Almaty",
                            },
                            {
                              option: "Asia/Dacca",
                              value: "Asia/Dacca",
                            },
                            {
                              option: "Asia/Krasnoyarsk",
                              value: "Asia/Krasnoyarsk",
                            },
                            {
                              option: "Asia/Dhaka",
                              value: "Asia/Dhaka",
                            },
                            {
                              option: "Asia/Bangkok",
                              value: "Asia/Bangkok",
                            },
                            {
                              option: "Asia/Saigon",
                              value: "Asia/Saigon",
                            },
                            {
                              option: "Asia/Jakarta",
                              value: "Asia/Jakarta",
                            },
                            {
                              option: "Asia/Irkutsk",
                              value: "Asia/Irkutsk",
                            },
                            {
                              option: "Asia/Shanghai",
                              value: "Asia/Shanghai",
                            },
                            {
                              option: "Asia/Hong_Kong",
                              value: "Asia/Hong_Kong",
                            },
                            {
                              option: "Asia/Taipei",
                              value: "Asia/Taipei",
                            },
                            {
                              option: "Asia/Kuala_Lumpur",
                              value: "Asia/Kuala_Lumpur",
                            },
                            {
                              option: "Asia/Singapore",
                              value: "Asia/Singapore",
                            },
                            {
                              option: "Australia/Perth",
                              value: "Australia/Perth",
                            },
                            {
                              option: "Asia/Yakutsk",
                              value: "Asia/Yakutsk",
                            },
                            {
                              option: "Asia/Seoul",
                              value: "Asia/Seoul",
                            },
                            {
                              option: "Asia/Tokyo",
                              value: "Asia/Tokyo",
                            },
                            {
                              option: "Australia/Darwin",
                              value: "Australia/Darwin",
                            },
                            {
                              option: "Australia/Adelaide",
                              value: "Australia/Adelaide",
                            },
                            {
                              option: "Asia/Vladivostok",
                              value: "Asia/Vladivostok",
                            },
                            {
                              option: "Pacific/Port_Moresby",
                              value: "Pacific/Port_Moresby",
                            },
                            {
                              option: "Australia/Brisbane",
                              value: "Australia/Brisbane",
                            },
                            {
                              option: "Australia/Sydney",
                              value: "Australia/Sydney ",
                            },
                            {
                              option: "Australia/Hobart",
                              value: "Australia/Hobart",
                            },
                            {
                              option: "Asia/Magadan",
                              value: "Asia/Magadan",
                            },
                            {
                              option: "SST",
                              value: "SST",
                            },
                            {
                              option: "Pacific/Noumea",
                              value: "Pacific/Noumea",
                            },
                            {
                              option: "Asia/Kamchatka",
                              value: "Asia/Kamchatka",
                            },
                            {
                              option: "Pacific/Fiji",
                              value: "Pacific/Fiji",
                            },
                            {
                              option: "Pacific/Auckland",
                              value: "Pacific/Auckland",
                            },
                            {
                              option: "Asia/Kolkata",
                              value: "Asia/Kolkata",
                            },
                            {
                              option: "Europe/Kiev",
                              value: "Europe/Kiev",
                            },
                            {
                              option: "America/Tegucigalpa",
                              value: "America/Tegucigalpa",
                            },
                            {
                              option: "Pacific/Apia",
                              value: "Pacific/Apia",
                            },




                          ],
                        },


                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "typeCreate",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "2",
                          required: false,
                          variableName: "typeCreate",
                          list: [
                            {
                              option: "An instant meeting",
                              value: "1"
                            },
                            {
                              option: "A scheduled meeting",
                              value: "2"
                            },
                            {
                              option: "A recurring meeting with no fixed time",
                              value: "3"
                            },
                            {
                              option: "A recurring meeting with fixed time",
                              value: "8"
                            },

                          ]
                        }
                      ],
                    ],
                  },
                  {
                    title: "Settings",
                    type: "accordion",
                    accTitle: "Audio",
                    variableName: "audioCreate",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "both",
                          required: false,
                          variableName: "audioCreate",
                          list: [
                            {
                              option: "Both Telephony and VoIP",
                              value: "both"
                            },
                            {
                              option: "Telephony only",
                              value: "telephony"
                            },
                            {
                              option: "VoIP only",
                              value: "voip"
                            },
                            {
                              option: "Third party audio conference",
                              value: "thirdParty"
                            },

                          ]
                        }
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Alternative Hosts",
                    variableName: "alternativeHosts",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "alternativeHosts",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Auto Recording",
                    variableName: "autoRecording",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          required: false,
                          variableName: "autoRecording",
                          list: [
                            {
                              option: "Record on local",
                              value: "local"
                            },
                            {
                              option: " Record on cloud",
                              value: "cloud"
                            },
                            {
                              option: "Disabled",
                              value: "none"
                            },

                          ]
                        }
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Host Video",
                    variableName: "hostVideo",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "hostVideo",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Join Before Host",
                    variableName: "joinBeforeHost",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "joinBeforeHost",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Muting Upon Entry",
                    variableName: "mutingUponEntry",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "mutingUponEntry",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Participant Video",
                    variableName: "participantVideo",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "participantVideo",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Watermark",
                    variableName: "watermarkCreate",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "watermarkCreate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Registration Type",
                    variableName: "registrationType",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "1",
                          required: false,
                          variableName: "registrationType",
                          list: [
                            {
                              option: "Attendees register once and can attend any meeting occurrence.",
                              value: "1"
                            },
                            {
                              option: "Attendees must register for each meeting occurrence",
                              value: "2"
                            },
                            {
                              option: "Attendees register once and can select one or more meeting occurrences to attend",
                              value: "3"
                            },

                          ]
                        }
                      ],
                    ],
                  },
                ],
                "Get Meeting": [
                  {
                    type: "textfield",
                    label: "Meeting Id",
                    required: true,
                    variableName: "meetingIdGet",
                    value: "",
                    placeholder: "Enter text..",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Occurrence Id",
                    variableName: "occurrenceIdGet",
                    fieldsArray: [
                      [
                        {
                          hasDynamicVariable: true,
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "occurrenceIdGet",
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
                "List Meetings": [
                  {
                    type: "textfield",
                    label: "Limit",
                    value: "30",
                    placeholder: "Enter text..",
                    variableName: "limitGetMany",
                    required: false,
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "typeGetMany",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "scheduled",
                          required: false,
                          variableName: "typeGetMany",
                          list: [
                            {
                              option: "Scheduled",
                              value: "scheduled"
                            },
                            {
                              option: "Live",
                              value: "live"
                            },
                            {
                              option: "Upcoming",
                              value: "upcoming"
                            },
                            {
                              option: "Previous Meetings",
                              value: "previous_meetings"
                            },

                          ]
                        }
                      ],
                    ],
                  },
                ],
                "Delete Meeting": [
                  {
                    type: "textfield",
                    label: "Meeting Id",
                    required: true,
                    variableName: "meetingIdDelete",
                    value: "",
                    placeholder: "Enter text..",
                    hasDynamicVariable: true,
                  },
                ],
                "Update Meeting": [
                  {
                    type: "textfield",
                    label: "Meeting Id",
                    required: true,
                    variableName: "meetingIdUpdate",
                    value: "",
                    placeholder: "Enter text..",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Agenda",
                    variableName: "agendaUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "agendaUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Topic",
                    variableName: "topicUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "topicUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Duration",
                    variableName: "durationUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "durationUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Password",
                    variableName: "passwordUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          password: true,
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "passwordUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Schedule For",
                    variableName: "scheduleForUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "scheduleForUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Start Time",
                    variableName: "startTimeUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "startTimeUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Timezone Name or ID",
                    variableName: "timezoneUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "Pacific/Midway",
                          required: false,
                          variableName: "timezoneUpdate",
                          list: [
                            {
                              option: "Pacific/Midway",
                              value: "Pacific/Midway"
                            },
                            {
                              option: "Pacific/Pago_Pago",
                              value: "Pacific/Pago_Pago"
                            },
                            {
                              option: "Pacific/Honolulu",
                              value: "Pacific/Honolulu"
                            },
                            {
                              option: "America/Anchorage",
                              value: "America/Anchorage",
                            },
                            {
                              option: "America/Vancouver",
                              value: "America/Vancouver"
                            },
                            {
                              option: "America/Los_Angeles",
                              value: "America/Los_Angeles"
                            },
                            {
                              option: "America/Tijuana",
                              value: "America/Tijuana",
                            },
                            {
                              option: "America/Edmonton",
                              value: "America/Edmonton",
                            },
                            {
                              option: "America/Denver",
                              value: "America/Denver",
                            },
                            {
                              option: "America/Phoenix",
                              value: "America/Phoenix",
                            },
                            {
                              option: "America/Mazatlan",
                              value: "America/Mazatlan",
                            },
                            {
                              option: "America/Winnipeg",
                              value: "America/Winnipeg",
                            },
                            {
                              option: "America/Regina",
                              value: "America/Regina",
                            },
                            {
                              option: "America/Chicago",
                              value: "America/Chicago",
                            },
                            {
                              option: "America/Mexico_City",
                              value: "America/Mexico_City"
                            },
                            {
                              option: "America/Guatemala",
                              value: "America/Guatemala"
                            },
                            {
                              option: "America/El_Salvador",
                              value: "America/El_Salvador"
                            },
                            {
                              option: "America/Managua",
                              value: "America/Managua"
                            },
                            {
                              option: "America/Costa_Rica",
                              value: "America/Costa_Rica"
                            },
                            {
                              option: "America/Montreal",
                              value: "America/Montreal"
                            },
                            {
                              option: "America/New_York",
                              value: "America/New_York"
                            },
                            {
                              option: "America/Indianapolis",
                              value: "America/Indianapolis",
                            },
                            {
                              option: "America/Panama",
                              value: "America/Panama",
                            },
                            {
                              option: "America/Bogota",
                              value: "America/Bogota",
                            },
                            {
                              option: "America/Lima",
                              value: "America/Lima",
                            },
                            {
                              option: "America/Halifax",
                              value: "America/Halifax",
                            },
                            {
                              option: "America/Puerto_Rico",
                              value: "America/Puerto_Rico",
                            },
                            {
                              option: "America/Caracas",
                              value: "America/Caracas",
                            },
                            {
                              option: "America/Santiago",
                              value: "America/Santiago",
                            },
                            {
                              option: "America/St_Johns",
                              value: "America/St_Johns",
                            },
                            {
                              option: "America/Montevideo",
                              value: "America/Montevideo",
                            },
                            {
                              option: "America/Araguaina",
                              value: "America/Araguaina",
                            },
                            {
                              option: "America/Argentina/Buenos_Aires",
                              value: "America/Argentina/Buenos_Aires",
                            },
                            {
                              option: "America/Godthab",
                              value: "America/Godthab",
                            },
                            {
                              option: "America/Sao_Paulo",
                              value: "America/Sao_Paulo",
                            },
                            {
                              option: "Atlantic/Azores",
                              value: "Atlantic/Azores",
                            },
                            {
                              option: "Canada/Atlantic",
                              value: "Canada/Atlantic",
                            },
                            {
                              option: "Atlantic/Cape_Verde",
                              value: "Atlantic/Cape_Verde",
                            },
                            {
                              option: "UTC",
                              value: "UTC",
                            },
                            {
                              option: "Etc/Greenwich",
                              value: "Etc/Greenwich",
                            },
                            {
                              option: "Europe/Belgrade",
                              value: "Europe/Belgrade",
                            },
                            {
                              option: "CET",
                              value: "CET",
                            },
                            {
                              option: "Atlantic/Reykjavik",
                              value: "Atlantic/Reykjavik",
                            },
                            {
                              option: "Europe/Dublin",
                              value: "Europe/Dublin",
                            },
                            {
                              option: "Europe/London",
                              value: "Europe/London",
                            },
                            {
                              option: "Europe/Lisbon",
                              value: "Europe/Lisbon",
                            },
                            {
                              option: "Africa/Casablanca",
                              value: "Africa/Casablanca",
                            },
                            {
                              option: "Africa/Nouakchott",
                              value: "Africa/Nouakchott",
                            },
                            {
                              option: "Europe/Oslo",
                              value: "Europe/Oslo",
                            },
                            {
                              option: "Europe/Copenhagen",
                              value: "Europe/Copenhagen",
                            },
                            {
                              option: "Europe/Brussels",
                              value: "Europe/Brussels",
                            },
                            {
                              option: "Europe/Berlin",
                              value: "Europe/Berlin",
                            },
                            {
                              option: "Europe/Helsinki",
                              value: "Europe/Helsinki",
                            },
                            {
                              option: "Europe/Amsterdam",
                              value: "Europe/Amsterdam",
                            },
                            {
                              option: "Europe/Rome",
                              value: "Europe/Rome",
                            },
                            {
                              option: "Europe/Stockholm",
                              value: "Europe/Stockholm",
                            },
                            {
                              option: "Europe/Vienna",
                              value: "Europe/Vienna",
                            },
                            {
                              option: "Europe/Luxembourg",
                              value: "Europe/Luxembourg",
                            },
                            {
                              option: "Europe/Paris",
                              value: "Europe/Paris",
                            },
                            {
                              option: "Europe/Zurich",
                              value: "Europe/Zurich",
                            },
                            {
                              option: "Europe/Madrid",
                              value: "Europe/Madrid",
                            },
                            {
                              option: "Africa/Bangui",
                              value: "Africa/Bangui",
                            },
                            {
                              option: "Africa/Algiers",
                              value: "Africa/Algiers",
                            },
                            {
                              option: "Africa/Tunis",
                              value: "Africa/Tunis",
                            },
                            {
                              option: "Africa/Harare",
                              value: "Africa/Harare",
                            },
                            {
                              option: "Africa/Nairobi",
                              value: "Africa/Nairobi",
                            },
                            {
                              option: "Europe/Warsaw",
                              value: "Europe/Warsaw",
                            },
                            {
                              option: "Europe/Prague",
                              value: "Europe/Prague",
                            },

                            {
                              option: "Europe/Budapest",
                              value: "Europe/Budapest",
                            },
                            {
                              option: "Europe/Sofia",
                              value: "Europe/Sofia",
                            },
                            {
                              option: "Europe/Istanbul",
                              value: "Europe/Istanbul",
                            },
                            {
                              option: "Europe/Athens",
                              value: "Europe/Athens",
                            },
                            {
                              option: "Europe/Bucharest",
                              value: "Europe/Bucharest",
                            },
                            {
                              option: "Asia/Nicosia",
                              value: "Asia/Nicosia",
                            },
                            {
                              option: "Asia/Beirut",
                              value: "Asia/Beirut",
                            },
                            {
                              option: "Asia/Damascus",
                              value: "Asia/Damascus",
                            },
                            {
                              option: "Asia/Jerusalem",
                              value: "Asia/Jerusalem",
                            },
                            {
                              option: "Asia/Amman",
                              value: "Asia/Amman",
                            },
                            {
                              option: "Africa/Tripoli",
                              value: "Africa/Tripoli",
                            },
                            {
                              option: "Africa/Cairo",
                              value: "Africa/Cairo",
                            },
                            {
                              option: "Africa/Johannesburg",
                              value: "Africa/Johannesburg",
                            },
                            {
                              option: "Europe/Moscow",
                              value: "Europe/Moscow",
                            },
                            {
                              option: "Asia/Baghdad",
                              value: "Asia/Baghdad",
                            },
                            {
                              option: "Asia/Kuwait",
                              value: "Asia/Kuwait",
                            },
                            {
                              option: "Asia/Riyadh",
                              value: "Asia/Riyadh",
                            },
                            {
                              option: "Asia/Bahrain",
                              value: "Asia/Bahrain",
                            },
                            {
                              option: "Asia/Qatar",
                              value: "Asia/Qatar",
                            },
                            {
                              option: "Asia/Aden",
                              value: "Asia/Aden",
                            },
                            {
                              option: "Asia/Tehran",
                              value: "Asia/Tehran",
                            },
                            {
                              option: "Africa/Khartoum",
                              value: "Africa/Khartoum",
                            },
                            {
                              option: "Africa/Djibouti",
                              value: "Africa/Djibouti",
                            },
                            {
                              option: "Africa/Mogadishu",
                              value: "Africa/Mogadishu",
                            },
                            {
                              option: "Asia/Dubai",
                              value: "Asia/Dubai",
                            },
                            {
                              option: "Asia/Muscat",
                              value: "Asia/Muscat",
                            },
                            {
                              option: "Asia/Baku",
                              value: "Asia/Baku",
                            },
                            {
                              option: "Asia/Kabul",
                              value: "Asia/Kabul",
                            },
                            {
                              option: "Asia/Yekaterinburg",
                              value: "Asia/Yekaterinburg",
                            },
                            {
                              option: "Asia/Tashkent",
                              value: "Asia/Tashkent",
                            },
                            {
                              option: "Asia/Calcutta",
                              value: "Asia/Calcutta",
                            },
                            {
                              option: "Asia/Kathmandu",
                              value: "Asia/Kathmandu",
                            },
                            {
                              option: "Asia/Novosibirsk",
                              value: "Asia/Novosibirsk",
                            },
                            {
                              option: "Asia/Almaty",
                              value: "Asia/Almaty",
                            },
                            {
                              option: "Asia/Dacca",
                              value: "Asia/Dacca",
                            },
                            {
                              option: "Asia/Krasnoyarsk",
                              value: "Asia/Krasnoyarsk",
                            },
                            {
                              option: "Asia/Dhaka",
                              value: "Asia/Dhaka",
                            },
                            {
                              option: "Asia/Bangkok",
                              value: "Asia/Bangkok",
                            },
                            {
                              option: "Asia/Saigon",
                              value: "Asia/Saigon",
                            },
                            {
                              option: "Asia/Jakarta",
                              value: "Asia/Jakarta",
                            },
                            {
                              option: "Asia/Irkutsk",
                              value: "Asia/Irkutsk",
                            },
                            {
                              option: "Asia/Shanghai",
                              value: "Asia/Shanghai",
                            },
                            {
                              option: "Asia/Hong_Kong",
                              value: "Asia/Hong_Kong",
                            },
                            {
                              option: "Asia/Taipei",
                              value: "Asia/Taipei",
                            },
                            {
                              option: "Asia/Kuala_Lumpur",
                              value: "Asia/Kuala_Lumpur",
                            },
                            {
                              option: "Asia/Singapore",
                              value: "Asia/Singapore",
                            },
                            {
                              option: "Australia/Perth",
                              value: "Australia/Perth",
                            },
                            {
                              option: "Asia/Yakutsk",
                              value: "Asia/Yakutsk",
                            },
                            {
                              option: "Asia/Seoul",
                              value: "Asia/Seoul",
                            },
                            {
                              option: "Asia/Tokyo",
                              value: "Asia/Tokyo",
                            },
                            {
                              option: "Australia/Darwin",
                              value: "Australia/Darwin",
                            },
                            {
                              option: "Australia/Adelaide",
                              value: "Australia/Adelaide",
                            },
                            {
                              option: "Asia/Vladivostok",
                              value: "Asia/Vladivostok",
                            },
                            {
                              option: "Pacific/Port_Moresby",
                              value: "Pacific/Port_Moresby",
                            },
                            {
                              option: "Australia/Brisbane",
                              value: "Australia/Brisbane",
                            },
                            {
                              option: "Australia/Sydney",
                              value: "Australia/Sydney ",
                            },
                            {
                              option: "Australia/Hobart",
                              value: "Australia/Hobart",
                            },
                            {
                              option: "Asia/Magadan",
                              value: "Asia/Magadan",
                            },
                            {
                              option: "SST",
                              value: "SST",
                            },
                            {
                              option: "Pacific/Noumea",
                              value: "Pacific/Noumea",
                            },
                            {
                              option: "Asia/Kamchatka",
                              value: "Asia/Kamchatka",
                            },
                            {
                              option: "Pacific/Fiji",
                              value: "Pacific/Fiji",
                            },
                            {
                              option: "Pacific/Auckland",
                              value: "Pacific/Auckland",
                            },
                            {
                              option: "Asia/Kolkata",
                              value: "Asia/Kolkata",
                            },
                            {
                              option: "Europe/Kiev",
                              value: "Europe/Kiev",
                            },
                            {
                              option: "America/Tegucigalpa",
                              value: "America/Tegucigalpa",
                            },
                            {
                              option: "Pacific/Apia",
                              value: "Pacific/Apia",
                            },




                          ],
                        },


                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Type",
                    variableName: "typeUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "2",
                          required: false,
                          variableName: "typeUpdate",
                          list: [
                            {
                              option: "An instant meeting",
                              value: "1"
                            },
                            {
                              option: "A scheduled meeting",
                              value: "2"
                            },
                            {
                              option: "A recurring meeting with no fixed time",
                              value: "3"
                            },
                            {
                              option: "A recurring meeting with fixed time",
                              value: "8"
                            },

                          ]
                        }
                      ],
                    ],
                  },
                  {
                    title: "Settings",
                    type: "accordion",
                    accTitle: "Audio",
                    variableName: "audioUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "both",
                          required: false,
                          variableName: "audioUpdate",
                          list: [
                            {
                              option: "Both Telephony and VoIP",
                              value: "both"
                            },
                            {
                              option: "Telephony only",
                              value: "telephony"
                            },
                            {
                              option: "VoIP only",
                              value: "voip"
                            },
                            {
                              option: "Third party audio conference",
                              value: "thirdParty"
                            },

                          ]
                        }
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Alternative Hosts",
                    variableName: "alternativeHostsUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Enter text..",
                          variableName: "alternativeHostsUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Auto Recording",
                    variableName: "autoRecordingUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          required: false,
                          variableName: "autoRecordingUpdate",
                          list: [
                            {
                              option: "Record on local",
                              value: "local"
                            },
                            {
                              option: " Record on cloud",
                              value: "cloud"
                            },
                            {
                              option: "Disabled",
                              value: "none"
                            },

                          ]
                        }
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Host Video",
                    variableName: "hostVideoUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "hostVideoUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Join Before Host",
                    variableName: "joinBeforeHostUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "joinBeforeHostUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Muting Upon Entry",
                    variableName: "mutingUponEntryUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "mutingUponEntryUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Participant Video",
                    variableName: "participantVideoUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "participantVideoUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Watermark",
                    variableName: "watermarkUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "watermarkUpdate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Registration Type",
                    variableName: "registrationTypeUpdate",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "1",
                          required: false,
                          variableName: "registrationTypeUpdate",
                          list: [
                            {
                              option: "Attendees register once and can attend any meeting occurrence.",
                              value: "1"
                            },
                            {
                              option: "Attendees must register for each meeting occurrence",
                              value: "2"
                            },
                            {
                              option: "Attendees register once and can select one or more meeting occurrences to attend",
                              value: "3"
                            },

                          ]
                        }
                      ],
                    ],
                  },
                ],

              }
            }
          ],
        },

      },
    ],
  }
};