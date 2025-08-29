
export const DataCollectorJson = {
  type: "DataCollector",
  label: "Data Collector",
  description: "Collects and stores data",
  color: "bg-gray-500",
  category: "ai",
  automated: "json",
  automationConfig: "automated",
  notTestable:true,
  defaults: {
    extras: {
      model: {
        enabled: true,
        type: "",
        content: {},
        description: "Select the model that fits your use case",
        title: "LLM Model",
      },
    },
    "json": [
      {
        "type": "dynamic",
        "fieldsArray": [],
        required: true,
        "title": "Required inputs",
        "variableName": "requiredInputs",
        "structure": [
          {
            "type": "row",
            "title": "Required inputs",
            "variableName": "requiredInputs",
            "removeButton": true
          },
          {
            "label": "Name",
            "type": "textfield",
            "placeholder": "Name",
            "value": "",
            required: true,
            "variableName": "name",
            "hasDynamicVariable": true,
            "rightSideInput": true
          },
          {
            "label": "Description",
            "type": "textfield",
            "value": "",
            required: true,
            "placeholder": "description",
            "variableName": "description",
            "hasDynamicVariable": true,
            "rightSideInput": true
          }
        ]
      }
    ]
  }
}
