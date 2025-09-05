export const SlackJson = {
  "category": "integration",
  "type": "Slack",
  "label": "Slack",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Slack/getting_started",
  description: "Slack integration",
  defaultValid: false,
  automated: "json",
  automationConfig:"automated",
  "defaults": {
    "json": [
      {
        "type": "api",
        "label": "Credentials",
        "variableName": "cred",
        "required": true,
        "credential": true,
        "credType": "Slack",
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
        "value": "Message",
        "variableName": "type",
        "errorSpan": "Please choose a Type",
        "required": true,
        "hasDynamicVariable": false,
        "list": [
          {
            "option": "Message",
            "value": "Message"
          },
          {
            "option": "Channel",
            "value": "Channel"
          },
          {
            "option": "User",
            "value": "User"
          },
          {
            "option": "File",
            "value": "File"
          },
          {
            "option": "User Group",
            "value": "User Group"
          }
        ],
        "options": {
          "Message": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Send",
              "variableName": "operation",
              "errorSpan": "Please choose an operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Send",
                  "value": "Send"
                },
                {
                  "option": "Delete",
                  "value": "Delete"
                },
                {
                  "option": "Get Permalink",
                  "value": "Get Permalink"
                },
                {
                  "option": "Update",
                  "value": "Update"
                }
              ],
              "options": {
                "Send": [
                  {
                    "type": "dropdown",
                    "label": "Send Message To",
                    "value": "User",
                    "variableName": "receiverType",
                    "errorSpan": "Please choose the type of the receiver",
                    "required": true,
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "Channel",
                        "value": "Channel"
                      },
                      {
                        "option": "User",
                        "value": "User"
                      }
                    ],
                    "options": {
                      "Channel": [
                        {
                          "type": "api",
                          "label": "Channel",
                          "variableName": "channel",
                          "value": "",
                          "required": true,
                          "list": [],
                          "config": [
                            {
                              "key": "method",
                              "value": "post"
                            },
                            {
                              "key": "url",
                              "dependOn": [
                                {
                                  "type": "static",
                                  "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                                }
                              ]
                            },
                            {
                              "key": "data",
                              "obj": [
                                {
                                  "key": "credential_name",
                                  "dependOn": "cred",
                                  "isAutomation": true
                                },
                                {
                                  "key": "base_url",
                                  "value": "https://www.slack.com/api",
                                  "isAutomation": false
                                }
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.channels",
                            "keys": {
                              "option": {
                                "fields": [
                                  "name"
                                ]
                              },
                              "value": {
                                "fields": [
                                  "id"
                                ]
                              }
                            },
                            "type": [],
                            "key": true
                          },
                          "apiDependsOn": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "Channel",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "Channel",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "Channel",
                              "isAutomation": true
                            }
                          ]
                        }
                      ],
                      "User": [
                        {
                          "type": "api",
                          "label": "User",
                          "variableName": "user",
                          "value": "",
                          "required": true,
                          "list": [],
                          "config": [
                            {
                              "key": "method",
                              "value": "post"
                            },
                            {
                              "key": "url",
                              "dependOn": [
                                {
                                  "type": "static",
                                  "value": process.env.REACT_APP_DNS_URL + "slack/listUsers"
                                }
                              ]
                            },
                            {
                              "key": "data",
                              "obj": [
                                {
                                  "key": "credential_name",
                                  "dependOn": "cred",
                                  "isAutomation": true
                                },
                                {
                                  "key": "base_url",
                                  "value": "https://www.slack.com/api",
                                  "isAutomation": false
                                }
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.Users",
                            "keys": {
                              "option": {
                                "fields": [
                                  "name"
                                ]
                              },
                              "value": {
                                "fields": [
                                  "id"
                                ]
                              }
                            },
                            "type": [],
                            "key": true
                          },
                          "apiDependsOn": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "User",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "User",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "User",
                              "isAutomation": true
                            }
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "type": "dropdown",
                    "label": "Message Type",
                    "value": "Simple Text Message",
                    "variableName": "messageType",
                    "errorSpan": "Please choose a message type",
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "Simple Text Message",
                        "value": "Simple Text Message"
                      },
                      {
                        "option": "Blocks",
                        "value": "Blocks"
                      },
                      {
                        "option": "Attachments",
                        "value": "Attachments"
                      }
                    ],
                    "options": {
                      "Simple Text Message": [
                        {
                          "type": "textFormatter",
                          "label": "Text Message",
                          "value": "",
                          "required": true,
                          "custom": true,
                          "variableName": "textMessage",
                          "formats": [
                            {
                              "type": "bold",
                              "toSearch": "strong",
                              "toReplace": "*"
                            },
                            {
                              "type": "italic",
                              "toSearch": "em",
                              "toReplace": "_"
                            },
                            {
                              "type": "link"
                            },
                            {
                              "type": "strike",
                              "toSearch": "s",
                              "toReplace": "~"
                            },
                            {
                              "type": "code-block",
                              "toSearch": "<pre class='ql-syntax' spellcheck='false'>",
                              "toReplace": "```"
                            },
                            {
                              "type": "code",
                              "toSearch": "code",
                              "toReplace": "`"
                            }
                          ],
                          "modules": {
                            "toolbar": [
                              "bold",
                              "italic",
                              "link",
                              "strike",
                              "code",
                              "code-block"
                            ]
                          }
                        }
                      ],
                      "Blocks": [
                        {
                          "type": "textfield",
                          "label": "Blocks",
                          "value": "",
                          "minRows": "5",
                          "multiline": true,
                          "placeholder": "Blocks",
                          "required": true,
                          "variableName": "blocks",
                          "hasDynamicVariable": true,
                          "rightSideInput": true,
                          "helperSpan": "To create blocks, use <a href='https://app.slack.com/block-kit-builder' target='blank' rel='noopener noreferrer'>Slack's Block Kit Builder</a>"
                        }
                      ],
                      "Attachments": [
                        {
                          "type": "dynamic",
                          "fieldsArray": [],
                          "title": "Attachment",
                          "required": true,
                          "variableName": "Attachments",
                          "structure": [
                            {
                              "type": "row",
                              "title": "Attachments",
                              "variableName": "attachment",
                              "removeButton": true
                            },
                            {
                              "label": "FallBack Text",
                              "type": "textfield",
                              "placeholder": "Fallback text",
                              "value": "",
                              "variableName": "fallbackText",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "Title",
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Title",
                              "variableName": "title",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "Color",
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Color",
                              "variableName": "color",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "PreText",
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Pretext",
                              "variableName": "pretext",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "Text",
                              "type": "textfield",
                              "value": "",
                              "placeholder": "text",
                              "variableName": "text",
                              "required": true,
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "Title Link",
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Title Link",
                              "variableName": "titleLink",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "Author Name",
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Author Name",
                              "variableName": "authorName",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "Author Link",
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Author Link",
                              "variableName": "authorLink",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "Image URL",
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Image URL",
                              "variableName": "imageURL",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "Thumbnail URL",
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Thumbnail URL",
                              "variableName": "thumbnailURL",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "Footer",
                              "type": "textfield",
                              "value": "",
                              "placeholder": "Footer",
                              "variableName": "footer",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "label": "Message Timestamp",
                              "type": "textfield",
                              "value": "",
                              "numberField": true,
                              "placeholder": "Message Timestamp",
                              "variableName": "messageTimestamp",
                              "hasDynamicVariable": true,
                              "rightSideInput": true
                            },
                            {
                              "type": "dynamic",
                              "json": {
                                "variableName": "Fields",
                                "title": "Fields",
                                "fieldsArray": [],
                                "structure": [
                                  {
                                    "type": "row",
                                    "title": "Field",
                                    "variableName": "field",
                                    "removeButton": true
                                  },
                                  {
                                    "label": "Title",
                                    "type": "textfield",
                                    "value": "",
                                    "placeholder": "Title",
                                    "variableName": "title",
                                    "hasDynamicVariable": true,
                                    "rightSideInput": true
                                  },
                                  {
                                    "label": "Value",
                                    "type": "textfield",
                                    "value": "",
                                    "placeholder": "value",
                                    "variableName": "value",
                                    "hasDynamicVariable": true,
                                    "rightSideInput": true
                                  },
                                  {
                                    "type": "checkbox",
                                    "label": "Short",
                                    "value": true,
                                    "variableName": "short",
                                    "hasDynamicVariable": true,
                                    "rightSideInput": true
                                  },
                                ]
                              }
                            }
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "type": "accordion",
                    "title": "Optional",
                    "accTitle": "Link User and Channel Name",
                    "variableName": "linkUserAndChannelNameMessageSend",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "linkUserAndChannelNameMessageSend"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Reply to a Message",
                    "variableName": "replyToMessageMessageSend",
                    "fieldsArray": [
                      [
                        {
                          "label": "Message Timestamp to Reply To",
                          "type": "textfield",
                          "value": "",
                          "numberField": true,
                          "placeholder": "Message Timestamp to Reply To",
                          "variableName": "messageTimestampToReplyToMessageSend",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        },
                        {
                          "type": "checkbox",
                          "label": "Reply to Thread",
                          "value": false,
                          "variableName": "replyToThreadMessageSend"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Use Markdown",
                    "variableName": "useMarkDownMessageSend",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": true,
                          "variableName": "useMarkDownMessageSend"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Unfurl Links",
                    "variableName": "unfurlLinksMessageSend",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": true,
                          "variableName": "unfurlLinksMessageSend"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Unfurl Media",
                    "variableName": "unfurlMediaMessageSend",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": true,
                          "variableName": "unfurlMediaMessageSend"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Send as User",
                    "variableName": "sendAsUserMessageSend",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "sendAsUserMessageSend"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "channel": "",
                        "ts": "",
                        "message": {
                          "app_id": "",
                          "team": "",
                          "bot_id": "",
                          "user": ""
                        }
                      }
                    }
                  }
                ],
                "Delete": [
                  {
                    "type": "dropdown",
                    "label": "Delete Message From",
                    "value": "Channel",
                    "variableName": "receiverType",
                    "errorSpan": "Please choose the type of the receiver",
                    "required": true,
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "Channel",
                        "value": "Channel"
                      },
                      {
                        "option": "User",
                        "value": "User"
                      }
                    ],
                    "options": {
                      "Channel": [
                        {
                          "type": "api",
                          "label": "Channel",
                          "variableName": "channel",
                          "value": "",
                          "list": [],
                          "required": true,
                          "config": [
                            {
                              "key": "method",
                              "value": "post"
                            },
                            {
                              "key": "url",
                              "dependOn": [
                                {
                                  "type": "static",
                                  "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                                }
                              ]
                            },
                            {
                              "key": "data",
                              "obj": [
                                {
                                  "key": "credential_name",
                                  "dependOn": "cred",
                                  "isAutomation": true
                                },
                                {
                                  "key": "base_url",
                                  "dependOn": "baseURL",
                                  "value": "https://www.slack.com/api",
                                  "isAutomation": false
                                }
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.channels",
                            "keys": {
                              "option": {
                                "fields": [
                                  "name"
                                ]
                              },
                              "value": {
                                "fields": [
                                  "id"
                                ]
                              }
                            },
                            "type": [],
                            "key": true
                          },
                          "apiDependsOn": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "Channel",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "Channel",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "Channel",
                              "isAutomation": true
                            }
                          ]
                        }
                      ],
                      "User": [
                        {
                          "type": "api",
                          "label": "User",
                          "variableName": "user",
                          "value": "",
                          "required": true,
                          "list": [],
                          "config": [
                            {
                              "key": "method",
                              "value": "post"
                            },
                            {
                              "key": "url",
                              "dependOn": [
                                {
                                  "type": "static",
                                  "value": process.env.REACT_APP_DNS_URL + "slack/listUsers"
                                }
                              ]
                            },
                            {
                              "key": "data",
                              "obj": [
                                {
                                  "key": "credential_name",
                                  "dependOn": "cred",
                                  "isAutomation": true
                                },
                                {
                                  "key": "base_url",
                                  "value": "https://www.slack.com/api",
                                  "isAutomation": false
                                }
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.Users",
                            "keys": {
                              "option": {
                                "fields": [
                                  "name"
                                ]
                              },
                              "value": {
                                "fields": [
                                  "id"
                                ]
                              }
                            },
                            "type": [],
                            "key": true
                          },
                          "apiDependsOn": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "User",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "User",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "User",
                              "isAutomation": true
                            }
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "label": "Message Timestamp",
                    "type": "textfield",
                    "value": "",
                    "numberField": true,
                    "required": true,
                    "placeholder": "Message Timestamp",
                    "variableName": "messageTimestamp",
                    "hasDynamicVariable": true,
                    "rightSideInput": true
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": { "Result": "The message has been deleted from this channel ID: ''" }
                    }
                  }
                ],
                "Get Permalink": [
                  {
                    "type": "dropdown",
                    "label": "Get From",
                    "value": "User",
                    "variableName": "getFrom",
                    "required": true,
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "Channel",
                        "value": "Channel"
                      },
                      {
                        "option": "User",
                        "value": "User"
                      }
                    ],
                    "options": {
                      "Channel": [
                        {
                          "type": "api",
                          "label": "Channel",
                          "variableName": "channel",
                          "value": "",
                          "required": true,
                          "list": [],
                          "config": [
                            {
                              "key": "method",
                              "value": "post"
                            },
                            {
                              "key": "url",
                              "dependOn": [
                                {
                                  "type": "static",
                                  "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                                }
                              ]
                            },
                            {
                              "key": "data",
                              "obj": [
                                {
                                  "key": "credential_name",
                                  "dependOn": "cred",
                                  "isAutomation": true
                                },
                                {
                                  "key": "base_url",
                                  "dependOn": "baseURL",
                                  "value": "https://www.slack.com/api",
                                  "isAutomation": false
                                }
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.channels",
                            "keys": {
                              "option": {
                                "fields": [
                                  "name"
                                ]
                              },
                              "value": {
                                "fields": [
                                  "id"
                                ]
                              }
                            },
                            "type": [],
                            "key": true
                          },
                          "apiDependsOn": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "getFrom",
                              "value": "User",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "getFrom",
                              "value": "User",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "getFrom",
                              "value": "User",
                              "isAutomation": true
                            }
                          ]
                        }
                      ],
                      "User": [
                        {
                          "type": "textfield",
                          "label": "User ID",
                          "required": true,
                          "variableName": "userID",
                          "value": "",
                          "placeholder": "D80WJE9MDKE",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    }
                  },
                  {
                    "label": "Message Timestamp",
                    "type": "textfield",
                    "value": "",
                    "required": true,
                    "hasDynamicVariable": true,
                    "rightSideInput": true,
                    "numberField": true,
                    "placeholder": "Message Timestamp",
                    "variableName": "messageTimestamp"
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "channel": "",
                        "permalink": ""
                      }
                    }
                  }
                ],
                "Update": [
                  {
                    "type": "dropdown",
                    "label": "Send Message To",
                    "value": "User",
                    "variableName": "receiverType",
                    "errorSpan": "Please choose the type of the receiver",
                    "required": true,
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "Channel",
                        "value": "Channel"
                      },
                      {
                        "option": "User",
                        "value": "User"
                      }
                    ],
                    "options": {
                      "Channel": [
                        {
                          "type": "api",
                          "label": "Channel",
                          "variableName": "channel",
                          "value": "",
                          "required": true,
                          "list": [],
                          "config": [
                            {
                              "key": "method",
                              "value": "post"
                            },
                            {
                              "key": "url",
                              "dependOn": [
                                {
                                  "type": "static",
                                  "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                                }
                              ]
                            },
                            {
                              "key": "data",
                              "obj": [
                                {
                                  "key": "credential_name",
                                  "dependOn": "cred",
                                  "isAutomation": true
                                },
                                {
                                  "key": "base_url",
                                  "value": "https://www.slack.com/api",
                                  "isAutomation": false
                                }
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.channels",
                            "keys": {
                              "option": {
                                "fields": [
                                  "name"
                                ]
                              },
                              "value": {
                                "fields": [
                                  "id"
                                ]
                              }
                            },
                            "type": [],
                            "key": true
                          },
                          "apiDependsOn": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "Channel",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "Channel",
                              "isAutomation": true
                            }
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                            {
                              "type": "dropdown",
                              "name": "receiverType",
                              "value": "Channel",
                              "isAutomation": true
                            }
                          ]
                        }
                      ],
                      "User": [
                        {
                          "type": "textfield",
                          "label": "User ID",
                          "required": true,
                          "variableName": "user",
                          "value": "",
                          "placeholder": "D80WJE9MDKE",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    }
                  },
                  {
                    "label": "Message Timestamp",
                    "type": "textfield",
                    "value": "",
                    "numberField": true,
                    "required": true,
                    "placeholder": "Message Timestamp",
                    "variableName": "messageTimestamp",
                    "hasDynamicVariable": true,
                    "rightSideInput": true
                  },
                  {
                    "type": "textFormatter",
                    "label": "Text Message",
                    "value": "",
                    "custom": true,
                    "variableName": "textMessage",
                    "formats": [
                      {
                        "type": "bold",
                        "toSearch": "strong",
                        "toReplace": "*"
                      },
                      {
                        "type": "italic",
                        "toSearch": "em",
                        "toReplace": "_"
                      },
                      {
                        "type": "link"
                      },
                      {
                        "type": "strike",
                        "toSearch": "s",
                        "toReplace": "~"
                      },
                      {
                        "type": "code-block",
                        "toSearch": "<pre class='ql-syntax' spellcheck='false'>",
                        "toReplace": "```"
                      },
                      {
                        "type": "code",
                        "toSearch": "code",
                        "toReplace": "`"
                      }
                    ],
                    "modules": {
                      "toolbar": [
                        "bold",
                        "italic",
                        "link",
                        "strike",
                        "code",
                        "code-block"
                      ]
                    }
                  },
                  {
                    "type": "accordion",
                    "title": "Options",
                    "accTitle": "Link User and Channel Name",
                    "variableName": "linkUserAndChannelNameMessageUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "linkUserAndChannelNameMessageUpdate"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Reply Broadcast",
                    "variableName": "replyBroadcastMessageUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "replyBroadcastMessageUpdate"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "As User",
                    "variableName": "asUserMessageUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "asUserMessageUpdate"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "File IDs",
                    "variableName": "fileIDsMessageUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "File IDs",
                          "variableName": "fileIDsMessageUpdate",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "channel": "",
                        "ts": "",
                        "message": {
                          "app_id": "",
                          "team": "",
                          "bot_id": "",
                          "user": ""
                        }
                      }
                    }
                  }
                ]
              }
            }
          ],
          "Channel": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get",
              "variableName": "operation",
              "errorSpan": "Please choose an operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get",
                  "value": "Get"
                },
                {
                  "option": "Get Many",
                  "value": "Get Many"
                },
                {
                  "option": "Create",
                  "value": "Create"
                },
                {
                  "option": "Archive",
                  "value": "Archive"
                },
                {
                  "option": "UnArchive",
                  "value": "UnArchive"
                },
                {
                  "option": "Rename",
                  "value": "Rename"
                },
                {
                  "option": "Get Members",
                  "value": "Get Members"
                },
                {
                  "option": "Join Conversation",
                  "value": "Join Conversation"
                },
                {
                  "option": "Leave Conversation",
                  "value": "Leave Conversation"
                },
                {
                  "option": "Invite Users",
                  "value": "Invite Users"
                }
              ],
              "options": {
                "Get": [
                  {
                    "type": "api",
                    "label": "Channel",
                    "variableName": "channel",
                    "value": "",
                    "required": true,
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "dependOn": "baseURL",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.channels",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "accordion",
                    "title": "Optional",
                    "accTitle": "Include Num of Members",
                    "variableName": "includeNumOfMembersChannelGet",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "includeNumOfMembersChannelGet"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "channel": {
                          "id": "",
                          "name": "",
                          "is_member": "",
                          "is_archived": ""
                        }
                      }
                    }
                  }
                ],
                "Get Many": [
                  {
                    "type": "accordion",
                    "title": "Filters",
                    "accTitle": "Exclude Archived",
                    "variableName": "excludeArchivedChannelGetMany",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "excludeArchivedChannelGetMany"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Types",
                    "variableName": "typesChannelGetMany",
                    "fieldsArray": [
                      [
                        {
                          "type": "multiselect",
                          "placeholder": "Please choose one",
                          "value": [
                            {
                              "option": "public_channel",
                              "value": "public_channel"
                            }
                          ],
                          "variableName": "typesChannelGetMany",
                          "list": [
                            {
                              "option": "public_channel",
                              "value": "public_channel"
                            },
                            {
                              "option": "private_channel",
                              "value": "private_channel"
                            },
                            {
                              "option": "mpim",
                              "value": "mpim"
                            },
                            {
                              "option": "im",
                              "value": "im"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "channels": [
                          {
                            "id": "",
                            "name": "",
                            "is_channel": false,
                            "is_group": false,
                            "is_im": false,
                            "created": 0,
                            "creator": "",
                            "is_archived": false,
                            "is_general": false,
                            "unlinked": 0,
                            "name_normalized": "",
                            "is_shared": false,
                            "is_ext_shared": false,
                            "is_org_shared": false,
                            "pending_shared": [],
                            "is_pending_ext_shared": false,
                            "is_member": false,
                            "is_private": false,
                            "is_mpim": false,
                            "updated": 0,
                            "topic": {
                              "value": "",
                              "creator": "",
                              "last_set": 0
                            },
                            "purpose": {
                              "value": "",
                              "creator": "",
                              "last_set": 0
                            },
                            "previous_names": [],
                            "num_members": 0
                          },
                        ],
                        "response_json": {
                          "ok": false,
                          "channels": [
                            {
                              "id": "",
                              "name": "",
                              "is_channel": false,
                              "is_group": false,
                              "is_im": false,
                              "created": 0,
                              "creator": "",
                              "is_archived": false,
                              "is_general": false,
                              "unlinked": 0,
                              "name_normalized": "",
                              "is_shared": false,
                              "is_ext_shared": false,
                              "is_org_shared": false,
                              "pending_shared": [],
                              "is_pending_ext_shared": false,
                              "is_member": false,
                              "is_private": false,
                              "is_mpim": false,
                              "updated": 0,
                              "topic": {
                                "value": "",
                                "creator": "",
                                "last_set": 0
                              },
                              "purpose": {
                                "value": "",
                                "creator": "",
                                "last_set": 0
                              },
                              "previous_names": [],
                              "num_members": 0
                            },
                          ],
                          "response_metadata": {
                            "next_cursor": ""
                          }
                        }
                      }

                    }
                  }
                ],
                "Create": [
                  {
                    "type": "textfield",
                    "label": "Channel",
                    "value": "",
                    "placeholder": "Channel",
                    "required": true,
                    "variableName": "channel",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "checkbox",
                    "label": "Private Channel",
                    "value": false,
                    "variableName": "privateChannel"
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "channel": {
                          "id": "",
                          "name": "",
                          "is_private": ""
                        }
                      }
                    }
                  }
                ],
                "Archive": [
                  {
                    "type": "api",
                    "label": "Channel",
                    "variableName": "channel",
                    "required": true,
                    "value": "",
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "dependOn": "baseURL",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.channels",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": { "Result": "The channel has been archived successfully, channel ID: ''" }
                    }
                  }
                ],
                "UnArchive": [
                  {
                    "type": "api",
                    "label": "Channel",
                    "variableName": "channel",
                    "value": "",
                    "required": true,
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "dependOn": "baseURL",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.channels",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": { "Result": "The channel has been unarchived successfully, channel ID: ''" }
                    }
                  }
                ],
                "Rename": [
                  {
                    "type": "api",
                    "label": "Channel",
                    "variableName": "channel",
                    "value": "",
                    "required": true,
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "dependOn": "baseURL",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.channels",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "textfield",
                    "label": "New Channel Name",
                    "required": true,
                    "value": "",
                    "placeholder": "Channel",
                    "variableName": "name",
                    "hasDynamicVariable": true
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "channel": {
                          "id": "",
                          "name": ""
                        }
                      }
                    }
                  }
                ],
                "Get Members": [
                  {
                    "type": "api",
                    "label": "Channel",
                    "variableName": "channel",
                    "value": "",
                    "required": true,
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "dependOn": "baseURL",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.channels",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "members": []
                      }
                    }
                  }
                ],
                "Join Conversation": [
                  {
                    "type": "api",
                    "label": "Channel",
                    "variableName": "channel",
                    "value": "",
                    "required": true,
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "dependOn": "baseURL",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.channels",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "channel": {
                          "id": "",
                          "name": "",
                          "is_member": ""
                        }
                      }
                    }
                  }
                ],
                "Leave Conversation": [
                  {
                    "type": "api",
                    "label": "Channel",
                    "variableName": "channel",
                    "value": "",
                    "required": true,
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "dependOn": "baseURL",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.channels",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": { "Result": "You are leaved this channel: ''" }
                    }
                  }
                ],
                "Invite Users": [
                  {
                    "type": "api",
                    "label": "Channel",
                    "variableName": "channel",
                    "value": "",
                    "required": true,
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "dependOn": "baseURL",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.channels",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "api",
                    "multiselect": true,
                    "placeholder": "You can Choose more than one",
                    "label": "Users",
                    "value": [],
                    "list": [],
                    "variableName": "users",
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listUsers"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.Users",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "channels": {}
                      }
                    }
                  }
                ]
              }
            }
          ],
          "User": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get",
              "variableName": "operation",
              "errorSpan": "Please choose an operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get User Status",
                  "value": "Get User Status"
                },
                {
                  "option": "Get Many",
                  "value": "Get Many"
                },
                {
                  "option": "Get",
                  "value": "Get"
                }
              ],
              "options": {
                "Get": [
                  {
                    "type": "api",
                    "label": "User",
                    "variableName": "user",
                    "value": "",
                    "required": true,
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listUsers"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.Users",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "user": {
                          "id": "",
                          "name": "",
                          "team_id": ""
                        }
                      }
                    }
                  }
                ],
                "Get Many": [
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "members": [
                          {
                            "id": "",
                            "team_id": "",
                            "name": "",
                            "deleted": false,
                            "color": "",
                            "real_name": "",
                            "tz": "",
                            "tz_label": "",
                            "tz_offset": 0,
                            "profile": {
                              "avatar_hash": "",
                              "status_text": "",
                              "status_emoji": "",
                              "real_name": "",
                              "display_name": "",
                              "real_name_normalized": "",
                              "display_name_normalized": "",
                              "email": "",
                              "image_24": "",
                              "image_32": "",
                              "image_48": "",
                              "image_72": "",
                              "image_192": "",
                              "image_512": "",
                              "team": ""
                            },
                            "is_admin": false,
                            "is_owner": false,
                            "is_primary_owner": false,
                            "is_restricted": false,
                            "is_ultra_restricted": false,
                            "is_bot": false,
                            "updated": 0,
                            "is_app_user": false,
                            "has_2fa": false
                          },
                        ],
                        "response_json": {
                          "ok": false,
                          "members": [
                            {
                              "id": "",
                              "team_id": "",
                              "name": "",
                              "deleted": false,
                              "color": "",
                              "real_name": "",
                              "tz": "",
                              "tz_label": "",
                              "tz_offset": 0,
                              "profile": {
                                "avatar_hash": "",
                                "status_text": "",
                                "status_emoji": "",
                                "real_name": "",
                                "display_name": "",
                                "real_name_normalized": "",
                                "display_name_normalized": "",
                                "email": "",
                                "image_24": "",
                                "image_32": "",
                                "image_48": "",
                                "image_72": "",
                                "image_192": "",
                                "image_512": "",
                                "team": ""
                              },
                              "is_admin": false,
                              "is_owner": false,
                              "is_primary_owner": false,
                              "is_restricted": false,
                              "is_ultra_restricted": false,
                              "is_bot": false,
                              "updated": 0,
                              "is_app_user": false,
                              "has_2fa": false
                            },
                          ],
                          "cache_ts": 0,
                          "response_metadata": {
                            "next_cursor": ""
                          }
                        }
                      }
                    }
                  }
                ],
                "Get User Status": [
                  {
                    "type": "api",
                    "label": "User",
                    "variableName": "user",
                    "value": "",
                    "required": true,
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listUsers"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.Users",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "presence": ""
                      }
                    }
                  }
                ]
              }
            }
          ],
          "File": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get",
              "variableName": "operation",
              "errorSpan": "Please choose an operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Get Many",
                  "value": "Get Many"
                },
                {
                  "option": "Get",
                  "value": "Get"
                },
                {
                  "option": "Upload",
                  "value": "Upload"
                }
              ],
              "options": {
                "Get": [
                  {
                    "type": "textfield",
                    "label": "File ID",
                    "value": "",
                    "placeholder": "File ID",
                    "required": true,
                    "variableName": "fileID",
                    "hasDynamicVariable": true,
                    "rightSideInput": true
                  },
                  {
                    "type": "accordion",
                    "title": "Optional",
                    "accTitle": "Download File",
                    "variableName": "downloadFile_GetFile",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "downloadFile_Optional_GetFile",
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "content": null,
                        "file": {}
                      }
                    }
                  }
                ],
                "Get Many": [
                  {
                    "type": "accordion",
                    "title": "Filters",
                    "accTitle": "Channel Name OR ID",
                    "variableName": "channelNameOrIDFileGetMany",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Channel Name OR ID",
                          "required": false,
                          "variableName": "channelNameOrIDFileGetMany",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Show Files Hidden By Limit",
                    "variableName": "showFilesHiddenByLimitFileGetMany",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "showFilesHiddenByLimitFileGetMany"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Message Timestamp From",
                    "variableName": "messageTimestampFromFileGetMany",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "numberField": true,
                          "placeholder": "Message Timestamp From",
                          "variableName": "messageTimestampFromFileGetMany",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Message Timestamp To",
                    "variableName": "messageTimestampToFileGetMany",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "numberField": true,
                          "placeholder": "Message Timestamp To",
                          "variableName": "messageTimestampToFileGetMany",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Types",
                    "variableName": "typesFileGetMany",
                    "fieldsArray": [
                      [
                        {
                          "type": "multiselect",
                          "placeholder": "Please choose one",
                          "value": [
                            {
                              "option": "gdocs",
                              "value": "gdocs"
                            },
                            {
                              "option": "images",
                              "value": "images"
                            },
                            {
                              "option": "pdfs",
                              "value": "pdfs"
                            },
                            {
                              "option": "snippets",
                              "value": "snippets"
                            },
                            {
                              "option": "spaces",
                              "value": "spaces"
                            },
                            {
                              "option": "zips",
                              "value": "zips"
                            }
                          ],
                          "variableName": "typesFileGetMany",
                          "list": [
                            {
                              "option": "gdocs",
                              "value": "gdocs"
                            },
                            {
                              "option": "images",
                              "value": "images"
                            },
                            {
                              "option": "pdfs",
                              "value": "pdfs"
                            },
                            {
                              "option": "snippets",
                              "value": "snippets"
                            },
                            {
                              "option": "spaces",
                              "value": "spaces"
                            },
                            {
                              "option": "zips",
                              "value": "zips"
                            }
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "User Name or ID",
                    "variableName": "userNameOrIDFileGetMany",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "User Name or ID",
                          "variableName": "userNameOrIDFileGetMany",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "files": [
                          {
                            "id": "",
                            "created": 0,
                            "timestamp": 0,
                            "name": "",
                            "title": "",
                            "mimetype": "",
                            "filetype": "",
                            "pretty_type": "",
                            "user": "",
                            "editable": false,
                            "size": 0,
                            "mode": "",
                            "is_external": false,
                            "external_type": "",
                            "is_public": false,
                            "public_url_shared": false,
                            "display_as_bot": false,
                            "username": "",
                            "url_private": "",
                            "url_private_download": "",
                            "thumb_64": "",
                            "thumb_80": "",
                            "thumb_360": "",
                            "thumb_360_w": 0,
                            "thumb_360_h": 0,
                            "thumb_160": "",
                            "thumb_360_gif": "",
                            "image_exif_rotation": 0,
                            "original_w": 0,
                            "original_h": 0,
                            "deanimate_gif": "",
                            "pjpeg": "",
                            "permalink": "",
                            "permalink_public": "",
                            "channels": [
                              ""
                            ],
                            "groups": [],
                            "ims": [],
                            "comments_count": 0
                          },
                        ],
                        "response_json": {
                          "ok": false,
                          "files": [
                            {
                              "id": "",
                              "created": 0,
                              "timestamp": 0,
                              "name": "",
                              "title": "",
                              "mimetype": "",
                              "filetype": "",
                              "pretty_type": "",
                              "user": "",
                              "editable": false,
                              "size": 0,
                              "mode": "",
                              "is_external": false,
                              "external_type": "",
                              "is_public": false,
                              "public_url_shared": false,
                              "display_as_bot": false,
                              "username": "",
                              "url_private": "",
                              "url_private_download": "",
                              "thumb_64": "",
                              "thumb_80": "",
                              "thumb_360": "",
                              "thumb_360_w": 0,
                              "thumb_360_h": 0,
                              "thumb_160": "",
                              "thumb_360_gif": "",
                              "image_exif_rotation": 0,
                              "original_w": 0,
                              "original_h": 0,
                              "deanimate_gif": "",
                              "pjpeg": "",
                              "permalink": "",
                              "permalink_public": "",
                              "channels": [
                                ""
                              ],
                              "groups": [],
                              "ims": [],
                              "comments_count": 0
                            },
                          ],
                          "paging": {
                            "count": 0,
                            "total": 0,
                            "page": 0,
                            "pages": 0
                          }
                        }
                      }
                    }
                  }
                ],
                "Upload": [
                  {
                    "type": "dropdown",
                    "label": "Upload Type",
                    "value": "File Content",
                    "variableName": "uploadType",
                    "errorSpan": "Please choose a type",
                    "required": true,
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "Url",
                        "value": "Url"
                      },
                      {
                        "option": "File Content",
                        "value": "File Content"
                      }
                    ],
                    "options": {
                      "File Content": [
                        {
                          "type": "textfield",
                          "label": "File upload",
                          "value": "",
                          "placeholder": "File upload",
                          "required": true,
                          "variableName": "fileContent",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "label": "File Name",
                          "required": true,
                          "placeholder": "file Name",
                          "variableName": "fileName",
                          "rightSideInput": true,
                          "hasDynamicVariable": true
                        }
                      ],
                      "Url": [
                        {
                          "type": "textfield",
                          "label": "Url",
                          "value": "",
                          "placeholder": "Url",
                          "required": true,
                          "variableName": "url",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        },
                        {
                          "type": "textfield",
                          "value": "",
                          "label": "File Name",
                          "required": true,
                          "placeholder": "file.txt",
                          "helperSpan": "Please don't input special characters and make sure to input the extension at the end e.g(.png,.txt,.csv) ",
                          "variableName": "fileName",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    }
                  },
                  {
                    "type": "api",
                    "label": "Channel",
                    "variableName": "channelNameOrIDFileUpload",
                    "value": "",
                    "required": true,
                    "list": [],
                    "config": [
                      {
                        "key": "method",
                        "value": "post"
                      },
                      {
                        "key": "url",
                        "dependOn": [
                          {
                            "type": "static",
                            "value": process.env.REACT_APP_DNS_URL + "slack/listChannels"
                          }
                        ]
                      },
                      {
                        "key": "data",
                        "obj": [
                          {
                            "key": "credential_name",
                            "dependOn": "cred",
                            "isAutomation": true
                          },
                          {
                            "key": "base_url",
                            "value": "https://www.slack.com/api",
                            "isAutomation": false
                          }
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.channels",
                      "keys": {
                        "option": {
                          "fields": [
                            "name"
                          ]
                        },
                        "value": {
                          "fields": [
                            "id"
                          ]
                        }
                      },
                      "type": [],
                      "key": true
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      }
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Initial Comment",
                    "title": "Optional",
                    "variableName": "initialCommentFileUpload",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Initial Comment",
                          "variableName": "initialCommentFileUpload",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Title",
                    "variableName": "titleFileUpload",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Title",
                          "variableName": "titleFileUpload",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Thread TimeStamp",
                    "variableName": "threadTimestampFileUpload",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Thread TimeStamp",
                          "required": false,
                          "variableName": "threadTimestampFileUpload",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "content": null,
                        "file": {}
                      }
                    }
                  }
                ]
              }
            }
          ],
          "User Group": [
            {
              "type": "dropdown",
              "label": "Operation",
              "value": "Get Many",
              "variableName": "operation",
              "errorSpan": "Please choose an operation",
              "required": true,
              "hasDynamicVariable": false,
              "list": [
                {
                  "option": "Create",
                  "value": "Create"
                },
                {
                  "option": "Get Many",
                  "value": "Get Many"
                },
                {
                  "option": "Update",
                  "value": "Update"
                },
                {
                  "option": "Enable",
                  "value": "Enable"
                },
                {
                  "option": "Disable",
                  "value": "Disable"
                }
              ],
              "options": {
                "Get Many": [
                  {
                    "type": "accordion",
                    "title": "Optional",
                    "accTitle": "Include Count",
                    "variableName": "includeCountUserGroupGet",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "includeCountUserGroupGet"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Include Disabled",
                    "variableName": "includeDisabledUserGroupGet",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "includeDisabledUserGroupGet"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Include Users",
                    "variableName": "includeUsersUserGroupGet",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "includeUsersUserGroupGet"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "usergroups": []
                      }
                    }
                  }
                ],
                "Create": [
                  {
                    "type": "textfield",
                    "label": "Name",
                    "required": true,
                    "value": "",
                    "placeholder": "Name",
                    "variableName": "name",
                    "hasDynamicVariable": true,
                    "rightSideInput": true
                  },
                  {
                    "type": "accordion",
                    "title": "Optional",
                    "accTitle": "Channel Name or ID",
                    "variableName": "channelNameOrIDUserGroupCreate",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Channel Name or ID",
                          "variableName": "channelNameOrIDUserGroupCreate",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "descriptionUserGroupCreate",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Description",
                          "variableName": "descriptionUserGroupCreate",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Handle",
                    "variableName": "handleUserGroupCreate",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Handle",
                          "variableName": "handleUserGroupCreate",
                          "hasDynamicVariable": true
                        },
                        {
                          "type": "accordion",
                          "accTitle": "Include Count",
                          "variableName": "includeCountUserGroupCreate",
                          "fieldsArray": [
                            [
                              {
                                "type": "checkbox",
                                "value": true,
                                "variableName": "includeCountUserGroupCreate"
                              }
                            ]
                          ]
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "usergroup": {}
                      }
                    }
                  }
                ],
                "Update": [
                  {
                    "type": "textfield",
                    "label": "User Group ID",
                    "value": "",
                    "required": true,
                    "placeholder": "User Group ID",
                    "variableName": "userGroupID",
                    "hasDynamicVariable": true,
                    "rightSideInput": true
                  },
                  {
                    "type": "accordion",
                    "title": "Updated Fields",
                    "accTitle": "Channel Name or ID",
                    "variableName": "channelNameOrIDUserGroupUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Channel Name or ID",
                          "variableName": "channelNameOrIDUserGroupUpdate",
                          "hasDynamicVariable": true,
                          "rightSideInput": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Description",
                    "variableName": "descriptionUserGroupUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Description",
                          "variableName": "descriptionUserGroupUpdate",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Handle",
                    "variableName": "handleUserGroupUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Handle",
                          "variableName": "handleUserGroupUpdate",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Include Count",
                    "variableName": "includeCountUserGroupUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "includeCountUserGroupUpdate"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "accordion",
                    "accTitle": "Name",
                    "variableName": "nameUserGroupUpdate",
                    "fieldsArray": [
                      [
                        {
                          "type": "textfield",
                          "value": "",
                          "placeholder": "Name",
                          "variableName": "nameUserGroupUpdate",
                          "hasDynamicVariable": true
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "usergroup": {}
                      }
                    }
                  }
                ],
                "Enable": [
                  {
                    "type": "textfield",
                    "label": "User Group ID",
                    "value": "",
                    "required": true,
                    "placeholder": "User Group ID",
                    "variableName": "userGroupIDGroupEnable",
                    "hasDynamicVariable": true,
                    "rightSideInput": true
                  },
                  {
                    "type": "accordion",
                    "title": "Optional",
                    "accTitle": "Include Count",
                    "variableName": "includeCountUserGroupEnable",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "includeCountUserGroupEnable"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "usergroup": {}
                      }
                    }
                  }
                ],
                "Disable": [
                  {
                    "type": "textfield",
                    "label": "User Group ID",
                    "value": "",
                    "required": true,
                    "placeholder": "User Group ID",
                    "variableName": "userGroupIDGroupDisable",
                    "hasDynamicVariable": true,
                    "rightSideInput": true
                  },
                  {
                    "type": "accordion",
                    "title": "Optional",
                    "accTitle": "Include Count",
                    "variableName": "includeCountUserGroupDisable",
                    "fieldsArray": [
                      [
                        {
                          "type": "checkbox",
                          "value": false,
                          "variableName": "includeCountUserGroupDisable"
                        }
                      ]
                    ]
                  },
                  {
                    "type": "outputJson",
                    "value": {
                      "Output": {
                        "usergroup": {}
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
};
