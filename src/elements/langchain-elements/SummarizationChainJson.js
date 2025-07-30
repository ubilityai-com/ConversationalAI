export const SummarizationChainJson = {
  "type": "SummarizationChain",
  "label": "Summarization Chain",
  "color": "black",
  "category": "langchain",
  normalHandle: ["integration", "basic", "automationTools", "langchain"],
  "rightSideData": {
    "nodesCanConnectWith": {
      "1": { category: "model", title: "Chat Model", required: true },
    },
    "json": [

      {
        type: "dropdown",
        label: "Data Form",
        value: "Binary",
        variableName: "dataForm",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Binary",
            value: "Binary",
          },
          {
            option: "URL",
            value: "URL",
          },
        ],
        options: {
          "Binary": [
            {
              type: "dropdown",
              label: "Data Type",
              value: "pdf",
              variableName: "dataType",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "PDF",
                  value: "pdf",
                },
                {
                  option: "TXT",
                  value: "txt",
                },
                {
                  option: "CSV",
                  value: "csv",
                },
                {
                  option: "JSON",
                  value: "json",
                },],
            }]
        }
      },
      {
        type: "textfield",
        label: "Data",
        required: true,
        variableName: "data",
        value: "",
        placeholder: "Data to sumarize",
        hasDynamicVariable: true,
      },
      {
        type: "dropdown",
        label: "Summarization Method",
        value: "stuff",
        variableName: "summarizationMethod",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Stuff",
            value: "stuff",
          },
          {
            option: "Refine",
            value: "refine",
          },
          {
            option: "Map Reduce",
            value: "map_reduce",
          },],
        options: {
          "stuff": [
            {
              type: "accordion",
              accTitle: "Prompt",
              variableName: "prompt",
              fieldsArray: [
                [{
                  type: "textfield",
                  multiline: true,
                  minRows: 4,
                  variableName: "prompt",
                  value: "Write a concise summary of the following:{docs}CONCISE SUMMARY:",
                  placeholder: "prompt",
                  hasDynamicVariable: true,
                  validation: "validateRequiredWords",
                  requiredWords: { "{docs}": true },
                  helperSpan: "Prompt must include input variable: {docs}."
                },]]
            }], "refine": [
              {
                type: "accordion",
                accTitle: "Refine Prompt",
                variableName: "refinePrompt",
                fieldsArray: [
                  [{
                    type: "textfield",
                    multiline: true,
                    minRows: 4,
                    variableName: "refinePrompt",
                    value: "Your job is to produce a final summary\nWe have provided an existing summary up to a certain point\nWe have the opportunity to refine the existing summary (only if needed) with some more context below.\n------------\n{docs}\n------------\nIf the context isn't useful, return the original summary.",
                    placeholder: "Refine Prompt",
                    hasDynamicVariable: true,
                    validation: "validateRequiredWords",
                    requiredWords: { "{docs}": true },
                    helperSpan: "Prompt must include input variable: {docs}."
                  }]]
              }, {
                type: "accordion",
                accTitle: "Initial Prompt",
                variableName: "initialPrompt",
                fieldsArray: [
                  [{
                    type: "textfield",
                    multiline: true,
                    minRows: 4,
                    variableName: "initialPrompt",
                    value: "Write a concise summary of the following:{docs}CONCISE SUMMARY:",
                    placeholder: "Initial Prompt",
                    hasDynamicVariable: true,
                    validation: "validateRequiredWords",
                    requiredWords: { "{docs}": true },
                    helperSpan: "Prompt must include input variable: {docs}."
                  },]]
              }],
          "map_reduce": [{
            type: "accordion",
            accTitle: "Prompt",
            variableName: "prompt",
            fieldsArray: [
              [{
                type: "textfield",
                multiline: true,
                minRows: 4,
                variableName: "prompt",
                value: "Write a concise summary of the following:{docs}CONCISE SUMMARY:",
                placeholder: "Prompt",
                hasDynamicVariable: true,
                validation: "validateRequiredWords",
                requiredWords: { "{docs}": true },
                helperSpan: "Prompt must include input variable: {docs}."
              },]]
          }]
        },

      },

      {
        type: "accordion",
        accTitle: "Text Splitter",
        variableName: "textSplitter",
        fieldsArray: [
          [
            {
              type: "dropdown",
              value: "CharacterTextSplitter",
              variableName: "textSplitter",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Character Text Splitter",
                  value: "CharacterTextSplitter",
                },
                {
                  option: "Recursive Character Text Splitter",
                  value: "RecursiveCharacterTextSplitter",
                },
                {
                  option: "Token Text Splitter",
                  value: "TokenTextSplitter",
                },
              ],
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Chunk Size",
        variableName: "chunkSize",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "chunkSize",
              numberField: true,
              typeOfValue: "integer",
              value: "1000",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Chunk Overlap",
        variableName: "chunkOverlap",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "chunkOverlap",
              numberField: true,
              typeOfValue: "integer",
              value: "20",
              hasDynamicVariable: true,
            },
          ],
        ],
      },
      {
        "type": "outputJson",
        "value": {
          "Output": { "Summary": "" },
          "Error": "",
          "Status": ""
        }
      }
    ]
  }
}
