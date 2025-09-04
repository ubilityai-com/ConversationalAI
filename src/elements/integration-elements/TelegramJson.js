export const TelegramJson = {
  "category": "integration",
  "type": "Telegram",
  "label": "Telegram",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Telegram/getting_started",
  "description": "Telegram integration",
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
        "credType": "Telegram",
        "value": "None",
        "list": [],
        "config": [
          {
            "key": "method",
            "value": "get"
          },
          {
            "key": "headers",
            "obj": [
              {
                "key": "Authorization",
                "dependOn": [
                  {
                    "type": "static",
                    "value": "Bearer "
                  },
                  {
                    "type": "redux",
                    "value": "authentication.authToken"
                  }
                ]
              },
              {
                "key": "content-type",
                "value": "application/json"
              }
            ]
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
          "value": "Chat",
          "variableName": "type",
          "errorSpan": "Please choose a Type",
          "required": true,
          "hasDynamicVariable": false,
          "list": [
            {
              "option": "Chat",
              "value": "Chat",
            },
            {
              "option": "Message",
              "value": "Message",
            },
            {
              "option": "File",
              "value": "File",
            },
          ],
          "options": {
            "Chat": [
              {
                "type": "dropdown",
                "label": "Operation",
                "value": "Get Chat",
                "variableName": "operation",
                "errorSpan": "Please choose an Operation",
                "required": true,
                "hasDynamicVariable": false,
                "list": [
                  {
                    "option": "Get Chat",
                    "value": "Get Chat",
                  },
                ],
                "options": {
                  "Get Chat": [
                    {
                      "type": "textfield",
                      "label": "Chat Id",
                      "required": true,
                      "variableName": "chatId_getChat",
                      "value": "",
                      "placeholder": "chat id",
                      "helperSpan": "Unique identifier for the target chat or username of the target channel (in the format @channelusername)",
                      "hasDynamicVariable": true,
                    },
                  ],
                  }
                }
              ],
            "Message": [
                {
                  "type": "dropdown",
                  "label": "Operation",
                  "value": "Send Message",
                  "variableName": "operation",
                  "errorSpan": "Please choose an Operation",
                  "required": true,
                  "hasDynamicVariable": false,
                  "list": [
                    {
                      "option": "Send Message Text",
                      "value": "Send Message",
                    },
                    {
                      "option": "Delete Message",
                      "value": "Delete Message",
                    },
                  ],
                  "options": {
                    "Send Message": [
                      {
                        "type": "textfield",
                        "label": "Chat Id",
                        "required": true,
                        "variableName": "chatId_sendMessage",
                        "value": "",
                        "helperSpan": "Unique identifier for the target chat or username of the target channel (in the format @channelusername)",
                        "hasDynamicVariable": true,
                      },
                      {
                        "type": "textfield",
                        "label": "Text",
                        "required": true,
                        "variableName": "text_sendMessage",
                        "value": "",
                        "placeholder": "text to send",
                        "hasDynamicVariable": true,
                      },
                      {
                        "title":"Additional Fields",
                        "type": "accordion",
                        "accTitle": "Disabel Notification",
                        "variableName": "is_DisableNotification_sendMessage",
                        "fieldsArray": [
                          [
                            {
                              "type": "checkbox",
                              "value": false,
                              "variableName": "is_DisableNotification_sendMessage",
                            },
                          ],
                        ],
                      },
                      {
                        "type": "accordion",
                        "accTitle": "Protect Content",
                        "variableName": "is_ProtectContent_sendMessage",
                        "fieldsArray": [
                          [
                            {
                              "type": "checkbox",
                              "value": false,
                              "variableName": "is_ProtectContent_sendMessage",
                            },
                          ],
                        ],
                      },
                    ],
                    "Delete Message": [
                      {
                        "type": "textfield",
                        "label": "Chat Id",
                        "placeholder":"Chat Id",
                        "required": true,
                        "variableName": "chatId_deleteMessage",
                        "hasDynamicVariable": true,
                        "value":""
                      },
                      {
                        "type": "textfield",
                        "label": "Message Id",
                        "placeholder":"Message Id",
                        "required": true,
                        "variableName": "messageId_deleteMessage",
                        "hasDynamicVariable": true,
                        "value":""
                      }, 
                    ],
                    }
                  }
              ],
            "File":[
                  {
                    "type": "dropdown",
                    "label": "Operation",
                    "value": "Get File",
                    "variableName": "operation",
                    "errorSpan": "Please choose an Operation",
                    "required": true,
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "Get File",
                        "value": "Get File",
                      }, 
                      {
                        "option": "Send File",
                        "value": "Send File",
                      },                  
  
                    ],
                    "options": {
                      "Get File": [
                        {
                          "type": "textfield",
                          "label": "File Id",
                          "required": true,
                          "variableName": "fileId_getFile",
                          "placeholder":"File Id",
                          "hasDynamicVariable": true,
                          "value":""
                        },
                      ],
                      "Send File":[
                        {
                          "type": "textfield",
                          "label": "Chat Id",
                          "required": true,
                          "variableName": "chatId_sendFile",
                          "placeholder":"Chat Id",
                          "hasDynamicVariable": true,
                          "value":""
                        },
                        {
                          "type": "textfield",
                          "label": "File (File Variable Name)",
                          "placeholder":"File (File Variable Name)",
                          "required": true,
                          "variableName": "fileContent_sendFile",
                          "hasDynamicVariable": true,
                          "value":""
                        },
                        {
                          "title":"Additional Fields",
                          "type": "accordion",
                          "accTitle": "Disabel Notification",
                          "variableName": "is_DisableNotification_sendFile",
                          "fieldsArray": [
                            [
                              {
                                "type": "checkbox",
                                "value": false,
                                "variableName": "is_DisableNotification_sendFile",
                              },
                            ],
                          ],
                        },
                        {
                          "type": "accordion",
                          "accTitle": "Protect Content",
                          "variableName": "is_ProtectContent_sendFile",
                          "fieldsArray": [
                            [
                              {
                                "type": "checkbox",
                                "value": false,
                                "variableName": "is_ProtectContent_sendFile",
                              },
                            ],
                          ],
                        },
                      ]
                      }
                  }
              ],
            }
        }
    ]
  }
};