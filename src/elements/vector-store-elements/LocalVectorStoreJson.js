
export const LocalVectorStoreJson  = {
    "nodeType": "vectorStore",
    type: "LocalVectorStore",
    label: "Local Store",
    color: "#72797b",
    description: "Upload your local documents and ask questions about your documents",
    relatedTo:"QuestionAndAnswer",
    rightSideData: {
        json:  [
            {
              type: "dropdown",
              label: "Data Format",
              value: "Binary",
              variableName: "dataFormat",
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
            },
            {
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
                variableName: "data",
                value: "",
                placeholder: "Data to sumarize",
                hasDynamicVariable: true,
              },
          ] 
    },
};