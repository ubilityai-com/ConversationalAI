export const GmailJson = {
  nodeType: "integration",
  type: "Gmail",
  label: "Gmail",
  color: "orange",
  description: "Gmail integration",
  defaultValid: false,
  category: "Control",
  automated: "json",
  defaults: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Google",
        value: "None",
        list: [],
        config: [
          {
            key: "method",
            value: "get",
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
        label: "Type",
        value: "Message",
        variableName: "type",
        errorSpan: "Please choose a Type",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Message",
            value: "Message",
          },
          {
            option: "Label",
            value: "Label",
          },
          {
            option: "Draft",
            value: "Draft",
          },
          {
            option: "Thread",
            value: "Thread",
          },
        ],
        options: {
          Message: [
            {
              type: "dropdown",
              label: "Operation",
              value: "sendMessage",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Send",
                  value: "sendMessage",
                },
                {
                  option: "Get",
                  value: "getMessage",
                },
                {
                  option: "Delete",
                  value: "deleteMessage",
                },
                {
                  option: "Add Label",
                  value: "addLabel",
                },
                {
                  option: "Mark as Read",
                  value: "markAsRead",
                },
                {
                  option: "Mark as Unread",
                  value: "markAsUnread",
                },
                {
                  option: "Remove Label",
                  value: "removeLabel",
                },
                {
                  option: "Reply",
                  value: "replyToMessage",
                },
                {
                  option: "List Attachments",
                  value: "listAttachments",
                },
                {
                  option: "Download Attachment",
                  value: "downloadAttachment",
                },
              ],
              options: {
                addLabel: [
                  {
                    type: "textfield",
                    label: "Message ID",
                    value: "",
                    placeholder: "Message ID",
                    required: true,
                    variableName: "messageID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Label Names or IDs",
                    value: "",
                    placeholder: "Label Names or IDs",
                    required: true,
                    variableName: "labelNamesOrIDs",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        threadId: "",
                        labelIds: [],
                      },
                    },
                  },
                ],
                listAttachments: [
                  {
                    type: "textfield",
                    label: "Message ID",
                    value: "",
                    placeholder: "Message ID",
                    required: true,
                    variableName: "messageID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        "attachments": [
                          {
                            "body": {
                              "attachmentId": "",
                              "size": 0
                            },
                            "filename": "",
                            "headers": [
                              {
                                "name": "",
                                "value": ""
                              },
                              {
                                "name": "",
                                "value": ""
                              },
                              {
                                "name": "",
                                "value": ""
                              }
                            ],
                            "mimeType": "",
                            "partId": ""
                          }
                        ]
                      },
                      Error: "",
                      Status: "",
                    },
                  },
                ],
                downloadAttachment: [
                  {
                    type: "textfield",
                    label: "Message ID",
                    value: "",
                    placeholder: "Message ID",
                    required: true,
                    variableName: "messageID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Attachment ID",
                    value: "",
                    placeholder: "Attachment ID",
                    required: true,
                    variableName: "attachmentID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {},
                      Error: "",
                      Status: "",
                    },
                  },
                ],
                deleteMessage: [
                  {
                    type: "textfield",
                    label: "Message ID",
                    value: "",
                    placeholder: "Message ID",
                    required: true,
                    variableName: "messageID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                ],
                getMessage: [
                  {
                    type: "dropdown",
                    label: "Scope",
                    value: "single",
                    variableName: "scope",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Single",
                        value: "single",
                      },
                      {
                        option: "All",
                        value: "all",
                      },
                    ],
                    options: {
                      single: [
                        {
                          type: "textfield",
                          label: "Message ID",
                          value: "",
                          placeholder: "Message ID",
                          required: true,
                          variableName: "messageID",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "outputJson",
                          value: {
                            Output: {
                              id: "",
                              threadId: "",
                              labelIds: [],
                              attachmentId: "",
                            },
                          },
                        },
                      ],
                      all: [
                        {
                          type: "accordion",
                          accTitle: "Include Spam and Trash",
                          variableName: "includeSpamAndTrashMessageGet",
                          fieldsArray: [
                            [
                              {
                                type: "checkbox",
                                value: false,
                                variableName: "includeSpamAndTrashMessageGet",
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Label Names or IDs",
                          variableName: "labelNamesOrIDsMessageGet",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                value: "",
                                placeholder: "Label Names or IDs",
                                variableName: "labelNamesOrIDsMessageGet",
                                hasDynamicVariable: true,
                                rightSideInput: true,
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Limit",
                          variableName: "limitMessageGet",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                value: 100,
                                numberField: true,
                                typeOfValue: "integer",
                                placeholder: "Limit",
                                variableName: "limitMessageGet",
                                hasDynamicVariable: true,
                                rightSideInput: true,
                              },
                            ],
                          ],
                        },
                        {
                          type: "outputJson",
                          value: {
                            Output: {
                              messages: [
                                {
                                  id: "",
                                  threadId: "",
                                  labelIds: [],
                                  snippet: "",
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
                markAsRead: [
                  {
                    type: "textfield",
                    label: "Message ID",
                    value: "",
                    placeholder: "Message ID",
                    required: true,
                    variableName: "messageID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        threadId: "",
                        labelIds: [],
                        snippet: "",
                      },
                    },
                  },
                ],
                markAsUnread: [
                  {
                    type: "textfield",
                    label: "Message ID",
                    value: "",
                    placeholder: "Message ID",
                    required: true,
                    variableName: "messageID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        threadId: "",
                        labelIds: [],
                        snippet: "",
                      },
                    },
                  },
                ],
                removeLabel: [
                  {
                    type: "textfield",
                    label: "Message ID",
                    value: "",
                    placeholder: "Message ID",
                    required: true,
                    variableName: "messageID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Label Names or IDs",
                    value: "",
                    placeholder: "Label Names or IDs",
                    required: true,
                    variableName: "labelNamesOrIDs",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        threadId: "",
                        labelIds: [],
                        snippet: "",
                      },
                    },
                  },
                ],
                replyToMessage: [
                  {
                    type: "textfield",
                    label: "Message ID",
                    value: "",
                    placeholder: "Message ID",
                    required: true,
                    variableName: "messageID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textFormatter",
                    required: true,
                    label: "Message Body",
                    value: "",
                    variableName: "textMessage",
                    formats: [
                      {
                        type: "bold",
                        toSearch: "strong",
                        toReplace: "*",
                      },
                      {
                        type: "italic",
                        toSearch: "em",
                        toReplace: "_",
                      },
                      {
                        type: "link",
                      },
                      {
                        type: "strike",
                        toSearch: "s",
                        toReplace: "~",
                      },
                      // {
                      //   type: "code-block",
                      //   toSearch: "<pre class='ql-syntax' spellcheck='false'>",
                      //   toReplace: "```",
                      // },
                      // {
                      //   type: "code",
                      //   toSearch: "code",
                      //   toReplace: "`",
                      // },
                    ],
                    modules: {
                      toolbar: [
                        "bold",
                        "italic",
                        "link",
                        "strike",
                        // "code",
                        // "code-block",
                      ],
                    },
                  },
                  // {
                  //   "type": "dropdown",
                  //   "label": "Email Type",
                  //   "value": "plain",
                  //   "variableName": "emailType",
                  //   "hasDynamicVariable": false,
                  //   "list": [
                  //     {
                  //       "option": "Text",
                  //       "value": "plain"
                  //     },
                  //     {
                  //       "option": "HTML",
                  //       "value": "html"
                  //     }
                  //   ],
                  //   "options": {
                  //     "html": [
                  //       {
                  //         "type": "textFormatter",
                  //         "label": "Text Message",
                  //         "value": "",
                  //         "variableName": "textMessage",
                  //         "formats": [
                  //           {
                  //             "type": "bold",
                  //             "toSearch": "strong",
                  //             "toReplace": "*"
                  //           },
                  //           {
                  //             "type": "italic",
                  //             "toSearch": "em",
                  //             "toReplace": "_"
                  //           },
                  //           {
                  //             "type": "link"
                  //           },
                  //           {
                  //             "type": "strike",
                  //             "toSearch": "s",
                  //             "toReplace": "~"
                  //           },
                  //           {
                  //             "type": "code-block",
                  //             "toSearch": "<pre class='ql-syntax' spellcheck='false'>",
                  //             "toReplace": "```"
                  //           },
                  //           {
                  //             "type": "code",
                  //             "toSearch": "code",
                  //             "toReplace": "`"
                  //           }
                  //         ],
                  //         "modules": {
                  //           "toolbar": [
                  //             "bold",
                  //             "italic",
                  //             "link",
                  //             "strike",
                  //             "code",
                  //             "code-block"
                  //           ]
                  //         }
                  //       }
                  //     ],
                  //     "plain": [
                  //       {
                  //         "type": "textfield",
                  //         "value": "",
                  //         "required": true,
                  //         "variableName": "textMessage",
                  //         "multiline": true,
                  //         "minRows": 3,
                  //         "label": "Message text",
                  //         "hasDynamicVariable": true,
                  //         "rightSideInput": true
                  //       }
                  //     ]
                  //   }
                  // },
                  {
                    type: "accordion",
                    accTitle: "BCC",
                    variableName: "bccMessageReply",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "info@example.com",
                          variableName: "bccMessageReply",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "CC",
                    variableName: "ccMessageReply",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "info@example.com",
                          variableName: "ccMessageReply",
                          hasDynamicVariable: true,
                        },
                      ],
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
                            option: "Binary",
                            value: "ByteString",
                          },
                          {
                            option: "Url",
                            value: "URL",
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
                              variableName: "content",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                          URL: [
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
                              variableName: "url",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        threadId: "",
                        labelIds: [],
                        snippet: "",
                      },
                    },
                  },
                ],
                sendMessage: [
                  {
                    type: "textfield",
                    label: "To",
                    value: "",
                    placeholder: "info@example.com",
                    required: true,
                    variableName: "to",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Subject",
                    value: "",
                    placeholder: "Subject",
                    required: true,
                    variableName: "subject",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textFormatter",
                    required: true,
                    label: "Message Body",
                    value: "",
                    variableName: "textMessage",
                    formats: [
                      {
                        type: "bold",
                        toSearch: "strong",
                        toReplace: "*",
                      },
                      {
                        type: "italic",
                        toSearch: "em",
                        toReplace: "_",
                      },
                      {
                        type: "link",
                      },
                      {
                        type: "strike",
                        toSearch: "s",
                        toReplace: "~",
                      },
                    ],
                    modules: {
                      toolbar: [
                        "bold",
                        "italic",
                        "link",
                        "strike",
                      ],
                    },
                  },
                  {
                    type: "accordion",
                    accTitle: "BCC",
                    variableName: "bccMessageSend",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "info@example.com",
                          variableName: "bccMessageSend",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "CC",
                    variableName: "ccMessageSend",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "info@example.com",
                          variableName: "ccMessageSend",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
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
                        value: "File",
                        variableName: "uploadType",
                        errorSpan: "Please choose a type",
                        required: true,
                        hasDynamicVariable: true,
                        list: [
                          {
                            option: "Upload File",
                            value: "File",
                          },
                          {
                            option: "Url",
                            value: "URL",
                          },
                        ],
                        options: {
                          File: [
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
                              label: "File upload",
                              type: "textfield",
                              placeholder: "File upload",
                              value: "",
                              required: true,
                              variableName: "content",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                          URL: [
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
                              variableName: "url",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        threadId: "",
                        labelIds: [],
                        snippet: "",
                      },
                    },
                  },
                ],
              },
            },
          ],
          Thread: [
            {
              type: "dropdown",
              label: "Operation",
              value: "addLabelToThread",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Add Label",
                  value: "addLabelToThread",
                },
                {
                  option: "Delete",
                  value: "deleteThread",
                },
                {
                  option: "Get",
                  value: "getThreads",
                },
                {
                  option: "Remove Label",
                  value: "removeLabelFromThread",
                },
                {
                  option: "Reply",
                  value: "replyToThread",
                },
                {
                  option: "Trash",
                  value: "trashThread",
                },
                {
                  option: "Untrash",
                  value: "untrashThread",
                },
              ],
              options: {
                addLabelToThread: [
                  {
                    type: "textfield",
                    label: "Thread ID",
                    value: "",
                    placeholder: "Thread ID",
                    required: true,
                    variableName: "threadID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Label Names or IDs",
                    value: "",
                    placeholder: "Label Names or IDs",
                    required: true,
                    variableName: "labelNamesOrIDs",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        labelIds: [],
                      },
                    },
                  },
                ],
                deleteThread: [
                  {
                    type: "textfield",
                    label: "Thread ID",
                    value: "",
                    placeholder: "Thread ID",
                    required: true,
                    variableName: "threadID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                ],
                getThreads: [
                  {
                    type: "dropdown",
                    label: "Scope",
                    value: "all",
                    variableName: "scope",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "All",
                        value: "all",
                      },
                      {
                        option: "Single",
                        value: "single",
                      },
                    ],
                    options: {
                      single: [
                        {
                          type: "textfield",
                          label: "Thread ID",
                          value: "",
                          placeholder: "Thread ID",
                          required: true,
                          variableName: "threadID",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "outputJson",
                          value: {
                            Output: {
                              id: "",
                              snippet: "",
                            },
                          },
                        },
                      ],
                      all: [
                        {
                          type: "accordion",
                          title: "Optional",
                          accTitle: "Include Spam and Trash",
                          variableName: "includeSpamAndTrashThreadGet",
                          fieldsArray: [
                            [
                              {
                                type: "checkbox",
                                value: false,
                                variableName: "includeSpamAndTrashThreadGet",
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Label Names or IDs",
                          variableName: "labelNamesOrIDsThreadGet",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                value: "",
                                placeholder: "Label Names or IDs",
                                variableName: "labelNamesOrIDsThreadGet",
                                hasDynamicVariable: true,
                                rightSideInput: true,
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Limit",
                          variableName: "limitThreadGet",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                value: "",
                                numberField: true,
                                typeOfValue: "integer",
                                placeholder: "Limit",
                                variableName: "limitThreadGet",
                                hasDynamicVariable: true,
                                rightSideInput: true,
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Search",
                          variableName: "searchThreadGet",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                value: "",
                                placeholder: "has:attachment",
                                variableName: "searchThreadGet",
                                hasDynamicVariable: true,
                                rightSideInput: true,
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Received After",
                          variableName: "receivedAfterThreadGet",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                value: "",
                                date: true,
                                placeholder: "Received After",
                                variableName: "receivedAfterThreadGet",
                                hasDynamicVariable: true,
                                rightSideInput: true,
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Received Before",
                          variableName: "receivedBeforeThreadGet",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                hasDynamicVariable: true,
                                rightSideInput: true,
                                value: "",
                                date: true,
                                placeholder: "Received Before",
                                variableName: "receivedBeforeThreadGet",
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Read Status",
                          variableName: "readStatusThreadGet",
                          fieldsArray: [
                            [
                              {
                                type: "dropdown",
                                list: [
                                  {
                                    option: "Unread emails only",
                                    value: "unread",
                                  },
                                  {
                                    option: "Unread and read emails",
                                    value: "read",
                                  },
                                  {
                                    option: "Read emails only",
                                    value: "read",
                                  },
                                ],
                                value: "unread",
                                variableName: "readStatusThreadGet",
                              },
                            ],
                          ],
                        },
                        {
                          type: "outputJson",
                          value: {
                            Output: {
                              all_threads: [
                                {
                                  id: "",
                                  snippet: "",
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
                removeLabelFromThread: [
                  {
                    type: "textfield",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                    label: "Thread ID",
                    value: "",
                    placeholder: "Thread ID",
                    required: true,
                    variableName: "threadID",
                  },
                  {
                    type: "textfield",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                    label: "Label Names or IDs",
                    value: "",
                    placeholder: "Label Names or IDs",
                    required: true,
                    variableName: "labelNamesOrIDs",
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        labelsRemoved: [],
                      },
                    },
                  },
                ],
                replyToThread: [
                  {
                    type: "textfield",
                    label: "Thread ID",
                    value: "",
                    placeholder: "Thread ID",
                    required: true,
                    variableName: "threadID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Message ID",
                    value: "",
                    placeholder: "Message ID",
                    required: true,
                    variableName: "replyToThread_messageId",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textFormatter",
                    label: "Message Body",
                    value: "",
                    required: true,
                    variableName: "textMessage",
                    formats: [
                      {
                        type: "bold",
                        toSearch: "strong",
                        toReplace: "*",
                      },
                      {
                        type: "italic",
                        toSearch: "em",
                        toReplace: "_",
                      },
                      {
                        type: "link",
                      },
                      {
                        type: "strike",
                        toSearch: "s",
                        toReplace: "~",
                      },

                    ],
                    modules: {
                      toolbar: [
                        "bold",
                        "italic",
                        "link",
                        "strike",

                      ],
                    },
                  },
                  {
                    type: "accordion",
                    accTitle: "Subject",
                    variableName: "replyToThread_subject",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Subject",
                          variableName: "replyToThread_subject",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "BCC",
                    variableName: "bccThreadReply",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "info@example.com",
                          variableName: "bccThreadReply",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "CC",
                    variableName: "ccThreadReply",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "info@example.com",
                          variableName: "ccThreadReply",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    variableName: "attachmentsThreadReply",
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
                            option: "Binary",
                            value: "ByteString",
                          },
                          {
                            option: "Url",
                            value: "URL",
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
                              variableName: "content",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                          URL: [
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
                              variableName: "url",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        threadId: "",
                        labelIds: [],
                        snippet: "",
                      },
                    },
                  },
                ],
                trashThread: [
                  {
                    type: "textfield",
                    label: "Thread ID",
                    value: "",
                    placeholder: "Thread ID",
                    required: true,
                    variableName: "threadID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        labelIds: [],
                      },
                    },
                  },
                ],
                untrashThread: [
                  {
                    type: "textfield",
                    label: "Thread ID",
                    value: "",
                    placeholder: "Thread ID",
                    required: true,
                    variableName: "threadID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        labelIds: [],
                      },
                    },
                  },
                ],
              },
            },
          ],
          Label: [
            {
              type: "dropdown",
              label: "Operation",
              value: "createLabel",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Create",
                  value: "createLabel",
                },
                {
                  option: "Delete",
                  value: "deleteLabel",
                },
                {
                  option: "Get",
                  value: "getLabels",
                },
              ],
              options: {
                createLabel: [
                  {
                    type: "textfield",
                    label: "Name",
                    value: "",
                    placeholder: "Name",
                    required: true,
                    variableName: "name",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "accordion",
                    title: "Optional",
                    accTitle: "Label List Visibility",
                    variableName: "labelListVisibilityLabelCreate",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          list: [
                            {
                              option: "Show",
                              value: "labelShow",
                            },
                            {
                              option: "Hide",
                              value: "labelHide",
                            },
                            {
                              option: "Show If Unread",
                              value: "labelShowIfUnread",
                            },
                          ],
                          value: "labelShow",
                          variableName: "labelListVisibilityLabelCreate",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Message List Visibility",
                    variableName: "messageListVisibilityLabelCreate",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          list: [
                            {
                              option: "Show",
                              value: "show",
                            },
                            {
                              option: "Hide",
                              value: "hide",
                            },
                          ],
                          value: "show",
                          variableName: "messageListVisibilityLabelCreate",
                        },
                      ],
                    ],
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        name: "",
                        labelListVisbility: "",
                      },
                    },
                  },
                ],
                deleteLabel: [
                  {
                    type: "textfield",
                    label: "Label ID",
                    value: "",
                    placeholder: "Label ID",
                    required: true,
                    variableName: "labelID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                ],
                getLabels: [
                  {
                    type: "dropdown",
                    label: "Scope",
                    value: "single",
                    variableName: "scope",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Single",
                        value: "single",
                      },
                      {
                        option: "All",
                        value: "all",
                      },
                    ],
                    options: {
                      single: [
                        {
                          type: "textfield",
                          label: "Label ID",
                          value: "",
                          placeholder: "Label ID",
                          required: true,
                          variableName: "labelID",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "outputJson",
                          value: {
                            Output: {
                              id: "",
                              name: "",
                              labelListVisbility: "",
                              type: "",
                            },
                          },
                        },
                      ],
                      all: [
                        {
                          type: "accordion",
                          accTitle: "Limit",
                          variableName: "limitLabelGet",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                value: "",
                                numberField: true,
                                typeOfValue: "integer",
                                placeholder: "Limit",
                                variableName: "limitLabelGet",
                                hasDynamicVariable: true,
                                rightSideInput: true,
                              },
                            ],
                          ],
                        },
                        {
                          type: "outputJson",
                          value: {
                            Output: {
                              labels: [
                                {
                                  id: "",
                                  name: "",
                                  messageListVisibility: "",
                                  labelListVisibility: "",
                                  type: "",
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
          Draft: [
            {
              type: "dropdown",
              label: "Operation",
              value: "createDraft",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Create",
                  value: "createDraft",
                },
                {
                  option: "Delete",
                  value: "deleteDraft",
                },
                {
                  option: "Get",
                  value: "getDraft",
                },
              ],
              options: {
                createDraft: [
                  {
                    type: "textfield",
                    label: "Subject",
                    value: "",
                    placeholder: "Subject",
                    required: true,
                    variableName: "subject",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textFormatter",
                    label: "Message Body",
                    value: "",
                    required: true,
                    variableName: "textMessage",
                    formats: [
                      {
                        type: "bold",
                        toSearch: "strong",
                        toReplace: "*",
                      },
                      {
                        type: "italic",
                        toSearch: "em",
                        toReplace: "_",
                      },
                      {
                        type: "link",
                      },
                      {
                        type: "strike",
                        toSearch: "s",
                        toReplace: "~",
                      },
                      // {
                      //   type: "code-block",
                      //   toSearch: "<pre class='ql-syntax' spellcheck='false'>",
                      //   toReplace: "```",
                      // },
                      // {
                      //   type: "code",
                      //   toSearch: "code",
                      //   toReplace: "`",
                      // },
                    ],
                    modules: {
                      toolbar: [
                        "bold",
                        "italic",
                        "link",
                        "strike",
                        // "code",
                        // "code-block",
                      ],
                    },
                  },
                  {
                    label: "To Email",
                    type: "textfield",
                    value: "",
                    required: true,
                    placeholder: "info@example.com",
                    variableName: "toEmailDraftCreate",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    accTitle: "BCC",
                    variableName: "bccDraftCreate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "info@example.com",
                          variableName: "bccDraftCreate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "CC",
                    variableName: "ccDraftCreate",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "info@example.com",
                          variableName: "ccDraftCreate",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    variableName: "attachmentsDraftCreate",
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
                            option: "Binary",
                            value: "ByteString",
                          },
                          {
                            option: "Url",
                            value: "URL",
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
                              variableName: "content",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                          URL: [
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
                              variableName: "url",
                              hasDynamicVariable: true,
                              rightSideInput: true,
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    type: "outputJson",
                    value: {
                      Output: {
                        id: "",
                        message: {
                          ID: "",
                          threadId: "",
                          labelIds: [],
                          snippet: "",
                        },
                      },
                    },
                  },
                ],
                deleteDraft: [
                  {
                    type: "textfield",
                    label: "Draft ID",
                    value: "",
                    required: true,
                    placeholder: "Draft ID",
                    variableName: "draftID",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                ],
                getDraft: [
                  {
                    type: "dropdown",
                    label: "Scope",
                    value: "single",
                    variableName: "scope",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Single",
                        value: "single",
                      },
                      {
                        option: "All",
                        value: "all",
                      },
                    ],
                    options: {
                      single: [
                        {
                          type: "textfield",
                          label: "Draft ID",
                          value: "",
                          required: true,
                          placeholder: "Draft ID",
                          variableName: "draftID",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "outputJson",
                          value: {
                            Output: {
                              id: "",
                              message: {
                                ID: "",
                                threadId: "",
                                labelIds: [],
                                snippet: "",
                              },
                            },
                          },
                        },
                      ],
                      all: [
                        {
                          type: "accordion",
                          accTitle: "Limit",
                          variableName: "limitDraftGet",
                          fieldsArray: [
                            [
                              {
                                type: "textfield",
                                value: "",
                                numberField: true,
                                typeOfValue: "integer",
                                placeholder: "Limit",
                                variableName: "limitDraftGet",
                                hasDynamicVariable: true,
                                rightSideInput: true,
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
      },
    ],
    jsonOutput: {},
  },
};
