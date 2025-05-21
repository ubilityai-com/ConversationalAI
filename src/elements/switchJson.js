export const SwitchJson = [
    {
      type: "dynamic",
      variableName: "conditions",
      maxLength: 10,
      structure: [
        {
          type: "dropdown",
          label: "Data Type",
          value: "String",
          variableName: "operator_type",
          list: [
            {
              option: "String",
              value: "String",
            },
            {
              option: "Number",
              value: "Number",
            },
          ],
          options: {
            "String": [
              {
                type: "textfield",
                label: "First Operator",
                required: true,
                variableName: "first_operator",
                value: "",
                placeholder: "First Operator",
              },
              {
                type: "dropdown",
                label: "Operation",
                value: "=",
                variableName: "operation",
                list: [
                  {
                    option: "Equal",
                    value: "=",
                  },
                  {
                    option: "Not Equal",
                    value: "!=",
                  },
                  {
                    option: "Contains",
                    value: "in",
                  },
                  {
                    option: "Does not contains",
                    value: "not in",
                  }
  
                ]
              },
              {
                type: "textfield",
                label: "Second Operator",
                required: true,
                variableName: "second_operator",
                value: "",
                placeholder: "Second Operator",
              }
            ],
            "Number": [
              {
                type: "textfield",
                label: "First Operator",
                required: true,
                variableName: "first_operator",
                value: "",
                // numberField: true,
                placeholder: "First Operator",
              },
              {
                type: "dropdown",
                label: "Operation",
                value: "=",
                variableName: "operation",
                list: [
                  {
                    option: "Equal",
                    value: "=",
                  },
                  {
                    option: "Not Equal",
                    value: "!=",
                  },
                  {
                    option: "Greater Than",
                    value: ">",
                  },
                  {
                    option: "Greater Than Or Equal",
                    value: ">=",
                  },
                  {
                    option: "Less Than",
                    value: "<",
                  },
                  {
                    option: "Less Than Or Equal",
                    value: "<=",
                  }
  
                ]
              },
              {
                type: "textfield",
                label: "Second Operator",
                required: true,
                // numberField: true,
                variableName: "second_operator",
                value: "",
                placeholder: "Second Operator",
              }
            ],
          }
        }
      ],
      fieldsArray: [
        [
          {
            type: "dropdown",
            label: "Type",
            value: "String",
            variableName: "operator_type",
            list: [
              {
                option: "String",
                value: "String",
              },
              {
                option: "Number",
                value: "Number",
              },
            ],
            options: {
              "String": [
                {
                  type: "textfield",
                  label: "First Operator",
                  required: true,
                  variableName: "first_operator",
                  value: "",
                  placeholder: "First Operator",
                },
                {
                  type: "dropdown",
                  label: "Operation",
                  value: "=",
                  variableName: "operation",
                  list: [
                    {
                      option: "Equal",
                      value: "=",
                    },
                    {
                      option: "Not Equal",
                      value: "!=",
                    },
                    {
                      option: "Contains",
                      value: "in",
                    },
                    {
                      option: "Does not contains",
                      value: "not in",
                    }
  
                  ]
                },
                {
                  type: "textfield",
                  label: "Second Operator",
                  required: true,
                  variableName: "second_operator",
                  value: "",
                  placeholder: "Second Operator",
                }
              ],
              "Number": [
                {
                  type: "textfield",
                  label: "First Operator",
                  required: true,
                  variableName: "first_operator",
                  value: "",
                  // numberField: true,
                  placeholder: "First Operator",
                },
                {
                  type: "dropdown",
                  label: "Operation",
                  value: "=",
                  variableName: "operation",
                  list: [
                    {
                      option: "Equal",
                      value: "=",
                    },
                    {
                      option: "Not Equal",
                      value: "!=",
                    },
                    {
                      option: "Greater Than",
                      value: ">",
                    },
                    {
                      option: "Greater Than Or Equal",
                      value: ">=",
                    },
                    {
                      option: "Less Than",
                      value: "<",
                    },
                    {
                      option: "Less Than Or Equal",
                      value: "<=",
                    }
  
                  ]
                },
                {
                  type: "textfield",
                  label: "Second Operator",
                  required: true,
                  // numberField: true,
                  variableName: "second_operator",
                  value: "",
                  placeholder: "Second Operator",
                }
              ]
            }
          },
        ]
      ],
      title: "Conditions",
    },
  ];