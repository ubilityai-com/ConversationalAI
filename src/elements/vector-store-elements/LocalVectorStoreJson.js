
export const LocalVectorStoreJson = {
  "nodeType": "vectorStore",
  type: "LocalVectorStore",
  label: "Local Store",
  color: "#72797b",
  description: "Upload your local documents and ask questions about your documents",
  relatedTo: "QuestionAndAnswer",
  rightSideData: {
    json: [
      {
        type: "dropdown",
        label: "Type",
        value: "Name",
        variableName: "type",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Uploaded Files",
            value: "Name",
          },
          {
            option: "URL",
            value: "URL",
          },
        ],
        options: {
          "Name": [
            {
              type: "textfield",
              label: "File",
              variableName: "file",
              value: "",
              required: true,
              placeholder:"select a file variable"
            },
          ],
           "URL": [{
            type: "dropdown",
            label: "Data Type",
            value: "PDF",
            variableName: "dataType",
            required: true,
            hasDynamicVariable: false,
            list: [
              {
                option: "PDF",
                value: "PDF",
              },
              {
                option: "TEXT",
                value: "TEXT",
              },
              {
                option: "CSV",
                value: "CSV",
              },
              {
                option: "JSON",
                value: "JSON",
              },],
          },
          {
            type: "textfield",
            label: "Data",
            required: true,
            variableName: "file",
            value: "",
            placeholder: "Data to summarize",
            hasDynamicVariable: true,
          },]
        }
      },

    ]
  },
};