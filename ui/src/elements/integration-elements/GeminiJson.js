export const GeminiJson = {
  "category": "integration",
  "type": "Gemini",
  "label": "Gemini",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Gemini/getting_started",
  "description": "Gemini integration",
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
        "credType": "Gemini",
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
        value: "Text",
        variableName: "type",
        errorSpan: "Please choose a resource",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Text",
            value: "Text",
          },
          {
            option: "Image",
            value: "Image",
          },
          {
            option: "File",
            value: "File",
          },
        ],
        options: {
          Text: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Generate Text",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Generate Text",
                  value: "Generate Text",
                },
              ],
              options: {
                "Generate Text": [
                  {
                    type: "dropdown",
                    label: "API Version",
                    value: "v1",
                    variableName: "apiVersion",
                    errorSpan: "Please choose a Version",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Default",
                        value: "v1",
                      },
                      {
                        option: "Beta",
                        value: "v1beta",
                      },
                    ],
                  },
                  {
                    "type": "api",
                    "label": "Model",
                    "variableName": "model_TextGeneration",
                    "value": "",
                    "helperSpan": "The model to use for generating content.",
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
                            "value": process.env.REACT_APP_DNS_URL + "gemini/getModels"
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
                            "key": "api_version",
                            "dependOn": "apiVersion",
                            "isAutomation": true,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.models",
                      "keys": {
                        "option": {
                          "fields": ["displayName"],
                        },
                        "value": {
                          "fields": ["name"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                      {
                        "type": "dropdown",
                        "name": "apiVersion",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    type: "textfield",
                    label: "Prompt",
                    required: true,
                    variableName: "prompt_TextGeneration",
                    value: "",
                    placeholder: "Prompt",
                    hasDynamicVariable: true,
                    minRows: "5",
                    multiline: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Max Output Tokens",
                    variableName: "maxOutputTokens",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "integer",
                          variableName: "maxOutputTokens",
                          rightSideInput: true,
                          placeholder: "Max Output Tokens",
                          hasDynamicVariable: true,
                          helperSpan:
                            "The maximum number of tokens to use for the response. Maximum value is 2048.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Temperature",
                    variableName: "temperature",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "float",
                          variableName: "temperature",
                          rightSideInput: true,
                          placeholder: "Temperature",
                          hasDynamicVariable: true,
                          helperSpan:
                            "Controls the randomness of the output. Values can range from [0.0,1.0], inclusive. A value closer to 1.0 will produce responses that are more varied and creative, while a value closer to 0.0 will typically result in more straightforward responses from the model.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Top P",
                    variableName: "topP",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "float",
                          variableName: "topP",
                          rightSideInput: true,
                          placeholder: "Top P",
                          hasDynamicVariable: true,
                          helperSpan:
                            "The maximum cumulative probability of tokens to consider when sampling.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Top K",
                    variableName: "topK",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "float",
                          variableName: "topK",
                          rightSideInput: true,
                          placeholder: "Top K",
                          hasDynamicVariable: true,
                          helperSpan:
                            "The maximum number of tokens to consider when sampling.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Candidate Count",
                    variableName: "candidateCount",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          numberField: true,
                          typeOfValue: "int",
                          variableName: "candidateCount",
                          rightSideInput: true,
                          placeholder: "Candidate Count",
                          hasDynamicVariable: true,
                          helperSpan:
                            "Number of generated responses to return. This value must be between [1, 8], inclusive.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Stop Sequence",
                    variableName: "stopSequences",
                    structure: [
                      {
                        type: "row",
                        title: "Stop Sequence",
                        variableName: "stopSequences",
                        removeButton: true,
                      },
                      {
                        type: "textfield",
                        value: "",
                        required: true,
                        variableName: "stop_sequence",
                        placeholder: "Enter text..",
                        hasDynamicVariable: true,
                      },
                    ],
                  },
                ],
              },
            },
          ],
          Image: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Generate Image",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Generate an Image",
                  value: "Generate Image",
                },
                {
                  option: "Edit Image",
                  value: "Edit Image",
                },
              ],
              options: {
                "Generate Image": [
                  {
                    "type": "api",
                    "label": "Model",
                    "variableName": "model_GenerateImage",
                    "value": "",
                    "helperSpan": "The model to use for Generating an image.",
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
                            "value": process.env.REACT_APP_DNS_URL + "gemini/getImageModels"
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
                            "value": "v1beta",
                            "key": "api_version",
                            "isAutomation": false,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.models",
                      "keys": {
                        "option": {
                          "fields": ["displayName"],
                        },
                        "value": {
                          "fields": ["name"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    type: "textfield",
                    label: "Prompt",
                    value: "",
                    required: true,
                    variableName: "prompt_GenerateImage",
                    placeholder: "Prompt",
                    minRows: "5",
                    multiline: true,
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                ],
                "Edit Image": [
                  {
                    "type": "api",
                    "label": "Model",
                    "variableName": "model_EditImage",
                    "value": "",
                    "helperSpan": "The model to use for Editing an image.",
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
                            "value": process.env.REACT_APP_DNS_URL + "gemini/getImageModels"
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
                            "value": "v1beta",
                            "key": "api_version",
                            "isAutomation": false,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.models",
                      "keys": {
                        "option": {
                          "fields": ["displayName"],
                        },
                        "value": {
                          "fields": ["name"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    type: "textfield",
                    label: "Prompt",
                    value: "",
                    required: true,
                    variableName: "prompt_EditImage",
                    placeholder: "Prompt",
                    minRows: "5",
                    multiline: true,
                    hasDynamicVariable: true,
                    rightSideInput: true,
                    helperSpan: "",
                  },
                  {
                    type: "textfield",
                    label: "Image",
                    value: "",
                    required: true,
                    variableName: "image_EditImage",
                    placeholder: "Image",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Media Mime Type",
                    required: true,
                    variableName: "mime_type_EditImage",
                    value: "",
                    placeholder: "like 'image/png' for .png image",
                    hasDynamicVariable: true,
                    helperSpan:
                      "the value of the Content-type parameter to be included in the header that describes the type of the file. for more information see this page https://www.geeksforgeeks.org/http-headers-content-type/",
                  },
                ],
              },
            },
          ],
          File: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Analyze File",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Analyze File",
                  value: "Analyze File",
                },
                {
                  option: "Upload File",
                  value: "Upload File",
                },
                {
                  option: "Get Many File",
                  value: "Get Many File",
                },
              ],
              options: {
                "Analyze File": [
                  {
                    "type": "api",
                    "label": "Model",
                    "variableName": "model_AnalyzeFile",
                    "value": "",
                    "helperSpan": "The model to use for analyze file.",
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
                            "value": process.env.REACT_APP_DNS_URL + "gemini/getModels"
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
                            "value": "v1beta",
                            "key": "api_version",
                            "isAutomation": false,
                          },
                        ]
                      }
                    ],
                    "res": {
                      "path": "data.models",
                      "keys": {
                        "option": {
                          "fields": ["displayName"],
                        },
                        "value": {
                          "fields": ["name"],
                        },
                      },
                      "type": [],
                      "key": true,
                    },
                    "apiDependsOn": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnFirstTime": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ],
                    "conditionOnRefresh": [
                      {
                        "type": "dropdown",
                        "name": "cred",
                        "isAutomation": true
                      },
                    ]
                  },
                  {
                    type: "textfield",
                    label: "Prompt",
                    value: "",
                    required: true,
                    variableName: "prompt_AnalyzeFile",
                    placeholder: "Prompt",
                    minRows: "5",
                    multiline: true,
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Media Mime Type",
                    required: true,
                    variableName: "mime_type_AnalyzeFile",
                    value: "",
                    placeholder: "like 'image/png' for .png image",
                    hasDynamicVariable: true,
                    helperSpan:
                      "the value of the Content-type parameter to be included in the header that describes the type of the file. for more information see this page https://www.geeksforgeeks.org/http-headers-content-type/",
                  },
                  {
                    type: "dropdown",
                    label: "Input Type",
                    value: "FileAPI",
                    required: true,
                    variableName: "inputType_AnalyzeFile",
                    hasDynamicVariable: true,
                    helperSpan: "Choose Input Method",
                    list: [
                      {
                        option: "Fetch File",
                        value: "FileAPI",
                      },
                      {
                        option: "Attach File",
                        value: "AttachFile",
                      },
                    ],
                    options: {
                      FileAPI: [
                        {
                          "type": "api",
                          "label": "Files",
                          "variableName": "uri_AnalyzeFile",
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
                                  "value": process.env.REACT_APP_DNS_URL + "gemini/getFiles"
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
                              ]
                            }
                          ],
                          "res": {
                            "path": "data.files",
                            "keys": {
                              "option": {
                                "fields": ["displayName"],
                              },
                              "value": {
                                "fields": ["uri"],
                              },
                            },
                            "type": [],
                            "key": true,
                          },
                          "apiDependsOn": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                          ],
                          "conditionOnFirstTime": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                          ],
                          "conditionOnRefresh": [
                            {
                              "type": "dropdown",
                              "name": "cred",
                              "isAutomation": true
                            },
                          ]
                        },
                      ],
                      AttachFile: [
                        {
                          type: "textfield",
                          label: "File (File Variable Name)",
                          value: "",
                          required: true,
                          variableName: "file_AnalyzeFile",
                          placeholder: "File",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan: "When using Analyze File, ensure the file is under 20MB. For larger files, use Upload File first, then Analyze File. To retrieve an existing file, use Fetch File.."
                        },
                      ],
                    },
                  },
                ],
                "Upload File": [
                  {
                    type: "textfield",
                    label: "File",
                    value: "",
                    required: true,
                    variableName: "file_UploadFile",
                    placeholder: "File",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Media Mime Type",
                    required: true,
                    variableName: "mime_type_UploadFile",
                    value: "",
                    placeholder: "like 'image/png' for .png image",
                    hasDynamicVariable: true,
                    helperSpan:
                      "the value of the Content-type parameter to be included in the header that describes the type of the file. for more information see this page https://www.geeksforgeeks.org/http-headers-content-type/",
                  },
                ],
                "Get Many File": [
                ],
              },
            },
          ],
        },
      },
    ],
  }
};