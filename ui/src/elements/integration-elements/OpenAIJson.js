export const OpenAIJson = {
  "category": "integration",
  "type": "OpenAI",
  "label": "OpenAI",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/OpenAI/getting_started",
  "description": "OpenAI integration",
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
        "credType": "OpenAI",
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
        value: "Audio",
        variableName: "type",
        errorSpan: "Please choose a Resource",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Audio",
            value: "Audio",
          },
          {
            option: "Image",
            value: "Image",
          },
        ],
        options: {
          "Audio": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Speech To Text",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Audio To Text",
                  value: "Speech To Text",
                },
                {
                  option: "Text To Audio",
                  value: "Text To Speech",
                },
              ],
              options: {
                "Text To Speech": [
                  {
                    type: "textfield",
                    label: "Text Input",
                    value: "",
                    required: true,
                    variableName: "TextInput",
                    placeholder: "Text Input",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                    helperSpan: "The maximum length is 4096 characters.",
                  },
                  {
                    type: "dropdown",
                    label: "Model",
                    value: "tts-1",
                    required: true,
                    variableName: "Model",
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "TTS-1",
                        value: "tts-1",
                      },
                      {
                        option: "TTS-1-HD",
                        value: "tts-1-hd",
                      },
                    ],
                  },
                  {
                    type: "dropdown",
                    value: "alloy",
                    label: "Voice",
                    required: true,
                    variableName: "Voice",
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "Alloy",
                        value: "alloy",
                      },
                      {
                        option: "Echo",
                        value: "echo",
                      },
                      {
                        option: "Fable",
                        value: "fable",
                      },
                      {
                        option: "Nova",
                        value: "nova",
                      },
                      {
                        option: "Onyx",
                        value: "onyx",
                      },
                      {
                        option: "Shimmer",
                        value: "shimmer",
                      }
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Response Format",
                    title: "Options",
                    variableName: "ResponseFormat",
                    fieldsArray: [[
                      {
                        type: "dropdown",
                        value: "mp3",
                        variableName: "ResponseFormat",
                        hasDynamicVariable: false,
                        list: [
                          {
                            option: "MP3",
                            value: "mp3",
                          },
                          {
                            option: "OPUS",
                            value: "opus",
                          },
                          {
                            option: "AAC",
                            value: "aac",
                          },
                          {
                            option: "FLAC",
                            value: "flac",
                          }
                        ],
                      },
                    ],
                    ]
                  },
                  {
                    type: "accordion",
                    accTitle: "Audio Speed",
                    variableName: "AudioSpeed",
                    fieldsArray: [[
                      {
                        type: "textfield",
                        value: "1.0",
                        placeholder: "Audio Speed",
                        variableName: "AudioSpeed",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                      },
                    ],
                    ]
                  },
                ],
                "Speech To Text": [
                  {
                    type: "textfield",
                    label: "File",
                    value: "",
                    required: true,
                    variableName: "File",
                    placeholder: "File",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Model",
                    value: "whisper-1",
                    required: true,
                    variableName: "Model",
                    placeholder: "Model",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "accordion",
                    accTitle: "Language of the Audio File",
                    title: "Options",
                    variableName: "LanguageoftheAudioFile",
                    fieldsArray: [[
                      {
                        type: "textfield",
                        value: "",
                        placeholder: "Language of the Audio File",
                        variableName: "LanguageoftheAudioFile",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                      },
                    ],
                    ]
                  },
                  {
                    type: "accordion",
                    accTitle: "Temperature",
                    variableName: "Temperature",
                    fieldsArray: [[
                      {
                        type: "textfield",
                        value: "0.0",
                        placeholder: "Temperature",
                        variableName: "Temperature",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                      },
                    ],
                    ]
                  },
                ],


              }
            }
          ],
          Image: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Generate Image",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Generate an Image",
                  value: "Generate Image",
                },
                {
                  option: "Analyze Image",
                  value: "Analyze Image",
                },
                {
                  option: "Edit Image",
                  value: "Edit Image",
                },
              ],
              options: {
                "Generate Image": [
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
                    helperSpan:
                      "A text description of the desired image(s). The maximum length is 1000 characters for dall-e-2, 4000 characters for dall-e-3 and 32000 characters for gpt-1.",
                  },
                  {
                    type: "dropdown",
                    label: "Model",
                    value: "dall-e-3",
                    required: true,
                    variableName: "model_GenerateImage",
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "DALL-E-2",
                        value: "dall-e-2",
                      },
                      {
                        option: "DALL-E-3",
                        value: "dall-e-3",
                      },
                      {
                        option: "GPT-IMAGE-1",
                        value: "gpt-image-1",
                      },
                    ],
                    options: {
                      "dall-e-2": [
                        {
                          type: "accordion",
                          accTitle: "Resolution",
                          title: "Options",
                          variableName: "resolution_GenerateImage",
                          fieldsArray: [
                            [
                              {
                                type: "dropdown",
                                value: "1024x1024",
                                variableName: "resolution_GenerateImage",
                                helperSpan: "The size of the generated images.",
                                hasDynamicVariable: false,
                                list: [
                                  {
                                    option: "256x256",
                                    value: "256x256",
                                  },
                                  {
                                    option: "512x512",
                                    value: "512x512",
                                  },
                                  {
                                    option: "1024x1024",
                                    value: "1024x1024",
                                  },
                                ],
                              },
                            ],
                          ],
                        },
                      ],
                      "dall-e-3": [
                        {
                          type: "accordion",
                          accTitle: "Resolution",
                          title: "Options",
                          variableName: "resolution_GenerateImage",
                          fieldsArray: [
                            [
                              {
                                type: "dropdown",
                                value: "1024x1024",
                                variableName: "resolution_GenerateImage",
                                helperSpan: "The size of the generated images.",
                                hasDynamicVariable: false,
                                list: [
                                  {
                                    option: "1024x1024",
                                    value: "1024x1024",
                                  },
                                  {
                                    option: "1792x1024",
                                    value: "1792x1024",
                                  },
                                  {
                                    option: "1024x1792",
                                    value: "1024x1792",
                                  },
                                ],
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Quality",
                          variableName: "quality_GenerateImage",
                          fieldsArray: [
                            [
                              {
                                type: "dropdown",
                                value: "hd",
                                variableName: "quality_GenerateImage",
                                helperSpan:
                                  "The quality of the image that will be generated.",
                                hasDynamicVariable: false,
                                list: [
                                  {
                                    option: "HD",
                                    value: "hd",
                                  },
                                  {
                                    option: "Standard",
                                    value: "standard",
                                  },
                                ],
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Style",
                          variableName: "style_GenerateImage",
                          fieldsArray: [
                            [
                              {
                                type: "dropdown",
                                value: "vivid",
                                variableName: "style_GenerateImage",
                                helperSpan:
                                  "The style of the generated images. ",
                                hasDynamicVariable: false,
                                list: [
                                  {
                                    option: "Vivid",
                                    value: "vivid",
                                  },
                                  {
                                    option: "Natural",
                                    value: "natural",
                                  },
                                ],
                              },
                            ],
                          ],
                        },
                      ],
                      "gpt-image-1": [
                        {
                          "label": "Output Format",
                          "type": "dropdown",
                          "value": "png",
                          "variableName": "outputformat_GenerateImage",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "png",
                              "value": "png"
                            },
                            {
                              "option": "jpeg",
                              "value": "jpeg",
                            },
                            {
                              "option": "webp",
                              "value": "webp",
                            },
                          ],
                        },
                        {
                          "title": "Options",
                          "type": "accordion",
                          "accTitle": "Quality",
                          "variableName": "quality_GenerateImage",
                          "fieldsArray": [
                            [
                              {
                                "type": "dropdown",
                                "value": "high",
                                "variableName": "quality_GenerateImage",
                                "helperSpan":
                                  "The quality of the image that will be generated.",
                                "hasDynamicVariable": false,
                                "list": [
                                  {
                                    "option": "High",
                                    "value": "high",
                                  },
                                  {
                                    "option": "Medium",
                                    "value": "medium",
                                  },
                                  {
                                    "option": "Low",
                                    "value": "low",
                                  },
                                ],
                              },
                            ],
                          ],
                        },
                        {
                          type: "accordion",
                          accTitle: "Resolution",
                          variableName: "resolution_GenerateImage",
                          fieldsArray: [
                            [
                              {
                                type: "dropdown",
                                value: "1024x1024",
                                variableName: "resolution_GenerateImage",
                                helperSpan: "The size of the generated images.",
                                hasDynamicVariable: false,
                                list: [

                                  {
                                    "option": "1024x1024",
                                    "value": "1024x1024",
                                  },
                                  {
                                    "option": "Landscape",
                                    "value": "1536x1024",
                                  },
                                  {
                                    "option": "Portrait",
                                    "value": "1024x1536",
                                  },
                                ],
                              },
                            ],
                          ],
                        },

                      ]
                    },
                  },
                ],
                "Analyze Image": [
                  {
                    type: "textfield",
                    label: "Text Input",
                    value: "",
                    required: true,
                    variableName: "input_text_AnalyzeImage",
                    placeholder: "what is in this image?",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "api",
                    label: "Model",
                    variableName: "model_AnalyzeImage",
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
                              "openaiConnector/getModels",
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
                      path: "data.Models",
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
                    type: "dropdown",
                    label: "Input Type",
                    value: "url",
                    required: true,
                    variableName: "inputType_AnalyzeImage",
                    hasDynamicVariable: true,
                    list: [
                      {
                        option: "URL",
                        value: "url",
                      },
                      {
                        option: "File",
                        value: "byteString",
                      },
                    ],
                    options: {
                      url: [
                        {
                          type: "textfield",
                          label: "URL",
                          required: true,
                          variableName: "image_url_AnalyzeImage",
                          value: "",
                          placeholder: "URL",
                          hasDynamicVariable: true,
                        },
                      ],
                      byteString: [
                        {
                          type: "textfield",
                          label: "File",
                          required: true,
                          variableName: "file_AnalyzeImage",
                          value: "",
                          placeholder: "File",
                          hasDynamicVariable: true,
                        },
                      ],
                    },
                  },
                ],
                "Edit Image": [
                  {
                    "type": "textfield",
                    "label": "Prompt",
                    "value": "",
                    "required": true,
                    "variableName": "prompt_EditImage",
                    "placeholder": "Prompt",
                    "minRows": "5",
                    "multiline": true,
                    "hasDynamicVariable": true,
                    "rightSideInput": true,
                    "helperSpan":
                      "A text description of the desired image(s). The maximum length is 1000 characters for dall-e-2 and 32000 characters for gpt-1.",
                  },
                  {
                    "type": "dropdown",
                    "label": "Model",
                    "value": "dall-e-2",
                    "required": true,
                    "variableName": "model_EditImage",
                    "hasDynamicVariable": false,
                    "list": [
                      {
                        "option": "DALL-E-2",
                        "value": "dall-e-2",
                      },
                      {
                        "option": "GPT-IMAGE-1",
                        "value": "gpt-image-1",
                      },
                    ],
                    "options": {
                      "dall-e-2": [
                        {
                          "type": "textfield",
                          "label": "Image To Edit",
                          "value": "",
                          "required": true,
                          "variableName": "image_EditImage",
                          "placeholder": "Image To Edit",
                          "hasDynamicVariable": true,
                          "rightSideInput": true,
                        },
                        {
                          "type": "accordion",
                          "accTitle": "Resolution",
                          "title": "Options",
                          "variableName": "resolution_EditImage",
                          "fieldsArray": [
                            [
                              {
                                "type": "dropdown",
                                "value": "1024x1024",
                                "variableName": "resolution_EditImage",
                                "helperSpan": "The size of the generated images.",
                                "hasDynamicVariable": false,
                                "list": [
                                  {
                                    "option": "256x256",
                                    "value": "256x256",
                                  },
                                  {
                                    "option": "512x512",
                                    "value": "512x512",
                                  },
                                  {
                                    "option": "1024x1024",
                                    "value": "1024x1024",
                                  },
                                ],
                              },
                            ],
                          ],
                        },
                      ],
                      "gpt-image-1": [
                        {
                          "type": "dynamic",
                          "required": true,
                          "fieldsArray": [],
                          "title": "Image(s) To Edit",
                          "variableName": "images_EditImage",
                          "structure": [
                            {
                              "type": "row",
                              "title": "Images",
                              "variableName": "image",
                              "removeButton": true,
                            },
                            {
                              "type": "textfield",
                              "label": "Image",
                              "value": "",
                              "required": true,
                              "placeholder": "Image(s) To Edit",
                              "variableName": "toEdit_EditImage",
                              "hasDynamicVariable": true,
                            },
                          ],
                        },
                        {
                          "label": "Output Format",
                          "type": "dropdown",
                          "value": "png",
                          "variableName": "outputformat_EditImage",
                          "hasDynamicVariable": false,
                          "list": [
                            {
                              "option": "png",
                              "value": "png"
                            },
                            {
                              "option": "jpeg",
                              "value": "jpeg",
                            },
                            {
                              "option": "webp",
                              "value": "webp",
                            },
                          ],
                        },
                        {
                          "title": "Options",
                          "type": "accordion",
                          "accTitle": "Quality",
                          "variableName": "quality_EditImage",
                          "fieldsArray": [
                            [
                              {
                                "type": "dropdown",
                                "value": "medium",
                                "variableName": "quality_EditImage",
                                "helperSpan":
                                  "The quality of the image that will be generated.",
                                "hasDynamicVariable": false,
                                "list": [
                                  // {
                                  //   "option": "High",
                                  //   "value": "high",
                                  // },
                                  {
                                    "option": "Medium",
                                    "value": "medium",
                                  },
                                  {
                                    "option": "Low",
                                    "value": "low",
                                  },
                                ],
                              },
                            ],
                          ],
                        },
                        {
                          "type": "accordion",
                          "accTitle": "Resolution",
                          "variableName": "resolution_EditImage",
                          "fieldsArray": [
                            [
                              {
                                "type": "dropdown",
                                "value": "1024x1024",
                                "variableName": "resolution_EditImage",
                                "helperSpan": "The size of the generated images.",
                                "hasDynamicVariable": false,
                                "list": [
                                  {
                                    "option": "1024x1024",
                                    "value": "1024x1024",
                                  },
                                  {
                                    "option": "Landscape",
                                    "value": "1536x1024",
                                  },
                                  {
                                    "option": "Portrait",
                                    "value": "1024x1536",
                                  },
                                ],
                              },
                            ],
                          ],
                        },
                      ]
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