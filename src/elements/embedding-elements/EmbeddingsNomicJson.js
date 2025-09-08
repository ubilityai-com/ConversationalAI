export const EmbeddingsNomicJson = {
  nodeType: "embedding",
  type: "EmbeddingsNomic",
  label: "Embeddings Nomic",
  color: "#72797b",
  description: "Use Nomic Embeddings",
  rightSideData: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Nomic",
        value: "",
        list: [],
        config: [
          {
            key: "method",
            value: "get",
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
            type: { fields: ["type"] },
          },
        },
        apiDependsOn: [],
        conditionOnFirstTime: [],
        conditionOnRefresh: [],
      },
      {
        type: "dropdown",
        value: "nomic-embed-text-v1",
        required: true,
        label: "Model",
        variableName: "model",
        hasDynamicVariable: false,
        list: [
          {
            option: "nomic-embed-text-v1",
            value: "nomic-embed-text-v1",
          },
          {
            option: "nomic-embed-text-v1.5",
            value: "nomic-embed-text-v1.5",
          },
        ],
      },
      {
        title: "Additional Fields",
        type: "accordion",
        accTitle: "Dimensions ",
        variableName: "dimensions",
        fieldsArray: [
          [
            {
              type: "textfield",
              variableName: "dimensions",
              numberField: true,
              value: "",
              placeholder: "e.g., 384, 512, 768",
              hasDynamicVariable: true,
              helperSpan: "The embedding dimension.",
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Inference Mode ",
        variableName: "inference",
        fieldsArray: [
          [
            {
              type: "dropdown",
              value: "remote",
              label: "Inference Mode",
              variableName: "inference",
              hasDynamicVariable: false,
              list: [
                {
                  option: "dynamic ",
                  value: "dynamic ",
                },
                {
                  option: "local ",
                  value: "local ",
                },
                {
                  option: "remote ",
                  value: "remote ",
                },
              ],
            },
          ],
        ],
      },
      {
        type: "accordion",
        accTitle: "Device",
        variableName: "device",
        fieldsArray: [
          [
            {
              type: "dropdown",
              value: "cpu",
              label: "Device",
              variableName: "device",
              hasDynamicVariable: false,
              list: [
                {
                  option: "cpu ",
                  value: "cpu ",
                },
                {
                  option: "gpu ",
                  value: "gpu ",
                },
                {
                  option: "nvidia ",
                  value: "nvidia ",
                },
                {
                  option: "amd ",
                  value: "amd ",
                },
              ],
              helperSpan: "The device to use for local embeddings.",
            },
          ],
        ],
      },
    ],
  },
};
