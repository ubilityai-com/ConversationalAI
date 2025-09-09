export const GoogleCalendarJson = {
  "category": "integration",
  "type": "GoogleCalendar",
  "label": "Google Calendar",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/GoogleCalendar/getting_started",
  "description": "Google Calendar integration",
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
        credType: "Google",
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
        "type": "dropdown",
        "label": "Type",
        "value": "Event",
        "variableName": "type",
        "required": true,
        "hasDynamicVariable": true,
        "list": [
          {
            "option": "Event",
            "value": "Event"
          },
          {
            "option": "Calendar",
            "value": "Calendar"
          }
        ],
        "options": {
          "Event": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Event",
              "variableName": "operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Event",
                  "value": "Get Event"
                },
                {
                  "option": "Get All Events",
                  "value": "Get All Events"
                },
                {
                  "option": "Create Event",
                  "value": "Create Event"
                },
                {
                  "option": "Update Event",
                  "value": "Update Event"
                },
                {
                  "option": "Delete Event",
                  "value": "Delete Event"
                }
              ],
              "options": {
                "Get Event": [
                  {
                    "type": "textfield",
                    "label": "Calendar ID",
                    "value": "",
                    "variableName": "get_calendar_id",
                    "required": true,
                    "placeholder": "Please Enter Calendar Name : sample@mail.com",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Event ID",
                    "value": "",
                    "variableName": "get_event_id",
                    "required": true,
                    "placeholder": "Please Enter Event Id",
                    "hasDynamicVariable": true
                  },
                ],
                "Get All Events": [
                  {
                    "type": "textfield",
                    "label": "Calendar ID",
                    "value": "",
                    "variableName": "get_calendar_id",
                    "required": true,
                    "placeholder": "Please Enter Calendar Name : sample@mail.com",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "accordion",
                    "title": "Additional Fields",
                    "accTitle": "Order By",
                    "variableName": "get_all_events_order_by",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "startTime",
                          "variableName": "get_all_events_order_by",
                          "list": [
                            {
                              "option": "Start Time",
                              "value": "startTime"
                            },
                            {
                              "option": "Updated",
                              "value": "updated"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Before",
                    "variableName": "get_all_events_time_min",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "Before",
                          "variableName": "get_all_events_time_min",
                          "value": "",
                          "placeholder": "Y-m-dTH:M ex:2024-08-29T03:00:00+03:00",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "After",
                    "variableName": "get_all_events_time_max",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "After",
                          "variableName": "get_all_events_time_max",
                          "value": "",
                          "placeholder": "Y-m-dTH:M ex:2024-08-29T03:00:00+03:00",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "iCalUID",
                    "variableName": "get_all_events_iCalUID",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "placeholder": "Search event bt its calendar ID",
                          "value": "",
                          "variableName": "get_all_events_iCalUID",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Time Zone",
                    "variableName": "get_all_events_timeZone",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "placeholder": "Country/City",
                          "value": "",
                          "variableName": "get_all_events_timeZone",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Max Attendees",
                    "variableName": "get_all_events_max_attendees",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "placeholder": "max number of attendees",
                          "value": "",
                          "numberField": true,
                          "typeOfValue": "integer",
                          "variableName": "get_all_events_max_attendees",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Query",
                    "variableName": "get_all_events_query",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "placeholder": "query",
                          "value": "",
                          "variableName": "get_all_events_query",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Show Deleted",
                    "variableName": "get_all_events_showDeleted",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "True",
                          "variableName": "get_all_events_showDeleted",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "true",
                              "value": "True"
                            },
                            {
                              "option": "false",
                              "value": "False"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Show Hidden Invitations",
                    "variableName": "get_all_events_showHiddenInvitations",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "True",
                          "variableName": "get_all_events_showHiddenInvitations",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "true",
                              "value": "True"
                            },
                            {
                              "option": "false",
                              "value": "False"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Single Events",
                    "variableName": "get_all_events_singleEvents",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "True",
                          "variableName": "get_all_events_singleEvents",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "true",
                              "value": "True"
                            },
                            {
                              "option": "false",
                              "value": "False"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Updated Min",
                    "variableName": "get_all_events_updatedMin",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "Updated Min",
                          "variableName": "get_all_events_updatedMin",
                          "value": "",
                          "placeholder": "Y-m-dTH:M",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                ],
                "Create Event": [
                  {
                    "type": "textfield",
                    "label": "Calendar ID",
                    "value": "",
                    "variableName": "get_calendar_id",
                    "required": true,
                    "placeholder": "Please Enter Calendar Name : sample@mail.com",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Start Date and Time",
                    "required": true,
                    "variableName": "create_event_start_dateTime",
                    "value": "",
                    "placeholder": "Y-m-dTH:M ex:2024-08-29T03:00:00+03:00",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "End Date and Time",
                    "required": true,
                    "variableName": "create_event_end_dateTime",
                    "value": "",
                    "placeholder": "Y-m-dTH:M ex:2024-08-29T03:00:00+03:00",
                    "hasDynamicVariable": true
                  },
                  // {
                  //   "type": "accordion",
                  //   "accTitle": "Start",
                  //   "variableName": "create_event_start",
                  //   "fieldsArray": [
                  //     [
                  //       {
                  //         "type": "textfield",
                  //         "label": "Date Time",
                  //         "required": true,
                  //         "variableName": "create_event_start_dateTime",
                  //         "value": "",
                  //         "placeholder": "Y-m-dTH:M ex:2024-08-29T03:00:00+03:00",
                  //         "hasDynamicVariable": true
                  //       },
                  //       {
                  //         "type": "textfield",
                  //         "label": "Time Zone",
                  //         "value": "",
                  //         "required": false,
                  //         "variableName": "create_event_start_timezone",
                  //         "hasDynamicVariable": true
                  //       }
                  //     ]
                  //   ]
                  // },
                  // {
                  //   "type": "accordion",
                  //   "accTitle": "End",
                  //   "variableName": "create_event_end",
                  //   "fieldsArray": [
                  //     [
                  //       {
                  //         "type": "textfield",
                  //         "label": "Date Time",
                  //         "required": true,
                  //         "variableName": "create_event_end_dateTime",
                  //         "value": "",
                  //         "placeholder": "Y-m-dTH:M ex:2024-08-29T03:00:00+03:00",
                  //         "hasDynamicVariable": true
                  //       },
                  //       {
                  //         "type": "textfield",
                  //         "label": "Time Zone",
                  //         "value": "",
                  //         "required": false,
                  //         "variableName": "create_event_end_timezone",
                  //         "hasDynamicVariable": true
                  //       }
                  //     ]
                  //   ]
                  // },
                  {
                    "type": "accordion",
                    "title": "Additional Fields",
                    "accTitle": "Summary",
                    "variableName": "create_event_summary",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "Summary",
                          "value": "",
                          "variableName": "create_event_summary",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Time Zone",
                    "variableName": "create_event_timezone",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "Time Zone",
                          "value": "",
                          "required": false,
                          "variableName": "create_event_timezone",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Visibility",
                    "variableName": "create_event_visibility",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "default",
                          "variableName": "option",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "Default",
                              "value": "default"
                            },
                            {
                              "option": "Public",
                              "value": "public"
                            },
                            {
                              "option": "Private",
                              "value": "private"
                            },
                            {
                              "option": "Confidential",
                              "value": "confidential"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "create_event_description",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "description",
                          "value": "",
                          "variableName": "create_event_description",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Location",
                    "variableName": "create_event_location",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "Location",
                          "value": "",
                          "variableName": "create_event_location",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Max Attendees",
                    "variableName": "create_event_max_attendees",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "placeholder": "max number of attendees",
                          "value": "",
                          "numberField": true,
                          "typeOfValue": "integer",
                          "variableName": "create_event_max_attendees",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Conference Data",
                    "variableName": "create_event_conferenceData",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "placeholder": "Type Name or Id",
                          "value": "",
                          "variableName": "create_event_conferenceData",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "ID",
                    "variableName": "create_event_id",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "ID",
                          "value": "",
                          "variableName": "create_event_id",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Color ID",
                    "variableName": "create_event_color_id",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "Color ID",
                          "value": "",
                          "variableName": "create_event_color_id",
                          "hasDynamicVariable": true,
                          "placeholder": "1 , 2 , .. "
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Guests can Invite Others",
                    "variableName": "create_event_guestsCanInviteOthers",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "True",
                          "variableName": "create_event_guestsCanInviteOthers",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "true",
                              "value": "True"
                            },
                            {
                              "option": "false",
                              "value": "False"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Guests Can Modify",
                    "variableName": "create_event_guestsCanModify",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "True",
                          "variableName": "create_event_guestsCanModify",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "true",
                              "value": "True"
                            },
                            {
                              "option": "false",
                              "value": "False"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Guests Can See Other Guests",
                    "variableName": "create_event_guestsCanSeeOtherGuests",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "True",
                          "variableName": "create_event_guestsCanSeeOtherGuests",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "true",
                              "value": "True"
                            },
                            {
                              "option": "false",
                              "value": "False"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Send Updates",
                    "variableName": "create_event_sendUpdates",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "all",
                          "variableName": "create_event_sendUpdates",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "All",
                              "value": "all"
                            },
                            {
                              "option": "None",
                              "value": "none"
                            },
                            {
                              "option": "External Only",
                              "value": "externalOnly"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Attendees",
                    "required": false,
                    "variableName": "create_event_attendees",
                    "structure": [
                      {
                        "type": "textfield",
                        "value": "",
                        "variableName": "create_event_attendees",
                        "hasDynamicVariable": true
                      }
                    ]
                  },
                ],
                "Update Event": [
                  {
                    "type": "textfield",
                    "label": "Calendar ID",
                    "value": "",
                    "variableName": "get_calendar_id",
                    "required": true,
                    "placeholder": "Please Enter Calendar Name: sample@mail.com",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Event ID",
                    "value": "",
                    "variableName": "update_event_id",
                    "required": true,
                    "placeholder": "Please Enter Event Id",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Start",
                    "required": true,
                    "variableName": "update_event_start",
                    "value": "",
                    "placeholder": "Y-m-dTH:M ex:2024-08-29T03:00:00+03:00",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "End",
                    "required": true,
                    "variableName": "update_event_end",
                    "value": "",
                    "placeholder": "Y-m-dTH:M ex:2024-08-29T03:00:00+03:00",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "accordion",
                    "title": "Additional Fields",
                    "accTitle": "Summary",
                    "variableName": "update_event_summary",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "Summary",
                          "value": "",
                          "variableName": "update_event_summary",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Visibility",
                    "variableName": "update_event_visibility",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "default",
                          "variableName": "update_event_visibility",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "Default",
                              "value": "default"
                            },
                            {
                              "option": "Public",
                              "value": "public"
                            },
                            {
                              "option": "Private",
                              "value": "private"
                            },
                            {
                              "option": "Confidential",
                              "value": "confidential"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "update_event_description",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "description",
                          "value": "",
                          "variableName": "update_event_description",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Location",
                    "variableName": "update_event_location",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "Location",
                          "value": "",
                          "variableName": "update_event_location",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Max Attendees",
                    "variableName": "update_event_max_attendees",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "placeholder": "max number of attendees",
                          "value": "",
                          "numberField": true,
                          "typeOfValue": "integer",
                          "variableName": "update_event_max_attendees",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Conference Data",
                    "variableName": "update_event_conferenceData",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "placeholder": "Type Name or Id",
                          "value": "",
                          "variableName": "update_event_conferenceData",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "ID",
                    "variableName": "update_event_id2",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "ID",
                          "value": "",
                          "variableName": "update_event_id2",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Color ID",
                    "variableName": "update_event_color_id",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "label": "Color ID",
                          "value": "",
                          "placeholder": "1 , 2 , ..",
                          "variableName": "update_event_color_id",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "showDeleted",
                    "variableName": "update_event_guestsCanInviteOthers",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "True",
                          "variableName": "update_event_guestsCanInviteOthers",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "true",
                              "value": "True"
                            },
                            {
                              "option": "false",
                              "value": "False"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Guests Can Modify",
                    "variableName": "update_event_guestsCanModify",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "True",
                          "variableName": "update_event_guestsCanModify",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "true",
                              "value": "True"
                            },
                            {
                              "option": "false",
                              "value": "False"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Guests Can See Each Other",
                    "variableName": "update_event_guestsCanSeeOtherGuests",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "True",
                          "variableName": "update_event_guestsCanSeeOtherGuests",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "true",
                              "value": "True"
                            },
                            {
                              "option": "false",
                              "value": "False"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Send Updates",
                    "variableName": "update_event_sendUpdates",
                    "fieldsArray": [
                      [
                        {
                          "type": "dropdown",
                          "label": "Options",
                          "value": "all",
                          "variableName": "update_event_sendUpdates",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "All",
                              "value": "all"
                            },
                            {
                              "option": "None",
                              "value": "none"
                            },
                            {
                              "option": "External Only",
                              "value": "externalOnly"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "dynamic",
                    "fieldsArray": [],
                    "title": "Attendees",
                    "required": false,
                    "variableName": "update_event_attendees",
                    "structure": [
                      {
                        "type": "textfield",
                        "value": "",
                        "variableName": "update_event_attendees",
                        "hasDynamicVariable": true
                      }
                    ]
                  },
                ],
                "Delete Event": [
                  {
                    "type": "textfield",
                    "label": "Calendar ID",
                    "value": "",
                    "variableName": "get_calendar_id",
                    "required": true,
                    "placeholder": "Please Enter Calendar Name : sample@mail.com",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "textfield",
                    "label": "Event ID",
                    "value": "",
                    "variableName": "delete_event_id",
                    "required": true,
                    "placeholder": "Please Enter Event Id",
                    "hasDynamicVariable": true
                  }
                ]
              }
            }
          ],
          "Calendar": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Calendar",
              "variableName": "operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Calendar",
                  "value": "Get Calendar"
                }
              ],
              "options": {
                "Get Calendar": [
                  {
                    "type": "textfield",
                    "label": "Calendar ID",
                    "value": "",
                    "variableName": "get_calendar_id",
                    "required": true,
                    "placeholder": "Please Enter Calendar Name : sample@mail.com",
                    "hasDynamicVariable": true
                  },
                ]
              }
            }
          ]
        }
      }
    ]
  }
};