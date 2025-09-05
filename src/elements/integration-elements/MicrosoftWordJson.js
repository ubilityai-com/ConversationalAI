export const MicrosoftWordJson = {
  "category": "integration",
  "type": "MicrosoftWord",
  "label": "Microsoft Word",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Microsoft/getting_started",
  "description": "MicrosoftWord integration",
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
        "credType": "Microsoft",
        "value": "None",
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
        value: "Edit",
        variableName: "type",
        errorSpan: "Please choose a resource",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Edit Document",
            value: "Edit",
          },
        ],
        options: {
          Edit: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Replace Strings",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Replace Strings",
                  value: "Replace Strings",
                },
                {
                  option: "Replace Table",
                  value: "Replace Table",
                },
              ],
              options: {
                "Replace Strings": [
                  {
                    type: "dropdown",
                    label: "Extract Document From",
                    value: "Base64 String",
                    variableName: "extractFrom_ReplaceStrings",
                    errorSpan: "",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "File Variable",
                        value: "Base64 String",
                      },
                      {
                        option: "Direct Download Link",
                        value: "Direct Download Link",
                      },
                    ],
                    options: {
                      "Base64 String": [
                        {
                          type: "textfield",
                          label: "File Variable",
                          required: true,
                          variableName: "extractFrom_Base64_ReplaceStrings",
                          value: "",
                          placeholder: "File Variable",
                          hasDynamicVariable: true,
                          helperSpan:
                            "the File name that represents a file in the platform.",
                        },
                      ],
                      "Direct Download Link": [
                        {
                          type: "textfield",
                          label: "Direct Download Link",
                          required: true,
                          variableName:
                            "extractFrom_DownloadLink_ReplaceStrings",
                          value: "",
                          placeholder: "Direct Download Link",
                          hasDynamicVariable: true,
                          helperSpan:
                            "The direct download link of the docx document. can be obtained from the download operations in onedrive and sharepoint",
                        },
                      ],
                    },
                  },
                  {
                    label: "Type of values",
                    type: "dropdown",
                    required: false,
                    value: "Dynamic",
                    hasDynamicVariable: false,
                    variableName: "typeOfValues",
                    list: [
                      {
                        option: "Dictionary",
                        value: "Dictionary",
                      },
                      {
                        option: "Dynamic",
                        value: "Dynamic",
                      },
                    ],
                    options: {
                      Dictionary: [
                        {
                          type: "editor",
                          showExpandIcon: true,
                          defaultLanguage: "json",
                          required: true,
                          variableName: "dict_ReplaceStrings",
                          value: "{}",
                          helperSpan:
                            "Dictionary included the strings to replace. eg.: {'oldString1':'newString1', 'oldString2':'newString2'}",
                        },
                      ],
                      Dynamic: [
                        {
                          type: "dynamic",
                          fieldsArray: [],
                          title: "Value",
                          variableName: "strings_ReplaceStrings",
                          required: true,
                          structure: [
                            {
                              type: "row",
                              title: "Value",
                              variableName: "strings_ReplaceStrings",
                              removeButton: true,
                            },
                            {
                              type: "textfield",
                              value: "",
                              label: "Old Value",
                              placeholder: "Old Value",
                              variableName: "strings_Old_ReplaceStrings",
                              required: true,
                              hasDynamicVariable: true,
                              // "helperSpan": "old string to replace. only works for paragraphs"
                            },
                            {
                              type: "textfield",
                              value: "",
                              label: "New Value",
                              placeholder: "New Value",
                              variableName: "strings_New_ReplaceStrings",
                              required: true,
                              hasDynamicVariable: true,
                              // "helperSpan": "New string to replace instead of the old. only works for paragraphs"
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
                "Replace Table": [
                  {
                    type: "dropdown",
                    label: "Extract Document From",
                    value: "Base64 String",
                    variableName: "extractFrom_ReplaceTable",
                    errorSpan: "",
                    required: true,
                    hasDynamicVariable: false,
                    list: [
                      {
                        option: "File Variable",
                        value: "Base64 String",
                      },
                      {
                        option: "Direct Download Link",
                        value: "Direct Download Link",
                      },
                    ],
                    options: {
                      "Base64 String": [
                        {
                          type: "textfield",
                          label: "File Variable",
                          required: true,
                          variableName: "extractFrom_Base64_ReplaceTable",
                          value: "",
                          placeholder: "File Variable",
                          hasDynamicVariable: true,
                          helperSpan:
                            "the File name that represents a file in the platform.",
                        },
                      ],
                      "Direct Download Link": [
                        {
                          type: "textfield",
                          label: "Direct Download Link",
                          required: true,
                          variableName: "extractFrom_DownloadLink_ReplaceTable",
                          value: "",
                          placeholder: "Direct Download Link",
                          hasDynamicVariable: true,
                          helperSpan:
                            "The direct download link of the docx document. can be obtained from the download operations in onedrive and sharepoint",
                        },
                      ],
                    },
                  },
                  {
                    type: "textfield",
                    label: "Index",
                    required: true,
                    variableName: "index_ReplaceTable",
                    value: "",
                    placeholder: "Index",
                    hasDynamicVariable: true,
                    numberField: true,
                    typeOfValue: "integer",
                  },
                  {
                    label: "Type of values",
                    type: "dropdown",
                    required: false,
                    value: "List",
                    hasDynamicVariable: false,
                    variableName: "typeOfValues",
                    list: [
                      {
                        option: "List",
                        value: "List",
                      },
                      {
                        option: "Dynamic",
                        value: "Dynamic",
                      },
                    ],
                    options: {
                      List: [
                        {
                          type: "editor",
                          showExpandIcon: true,
                          defaultLanguage: "json",
                          required: true,
                          variableName: "list_ReplaceTable",
                          value: "[]",
                          helperSpan:
                            'List included the rows values to replace. eg.: [ ["cell 1","cell 2", "cell 3"], ["cell 4","cell 5", "cell 6"] ]',
                        },
                      ],
                      Dynamic: [
                        {
                          type: "dynamic",
                          fieldsArray: [],
                          title: "Row",
                          required: true,
                          variableName: "row_ReplaceTable",
                          structure: [
                            {
                              type: "row",
                              title: "Row",
                              variableName: "row_ReplaceTable",
                              removeButton: true,
                            },
                            {
                              type: "dynamic",
                              json: {
                                fieldsArray: [],
                                title: "Cell",
                                variableName: "cell_ReplaceTable",
                                structure: [
                                  {
                                    type: "row",
                                    title: "Cell",
                                    variableName: "cell_ReplaceTable",
                                    removeButton: true,
                                  },
                                  {
                                    type: "textfield",
                                    value: "",
                                    required: true,
                                    placeholder: "text",
                                    variableName: "text",
                                    hasDynamicVariable: true,
                                    helperSpan: "The new content of the cell",
                                  },
                                ],
                              },
                            },
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
    ]
  }
};