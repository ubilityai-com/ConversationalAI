export const NotionJson = {
  category: "integration",
  type: "Notion",
  label: "Notion",
  color: "#53D2E2 ",
  docsPath: "Connectors/Notion/getting_started",
  description: "Notion integration",
  defaultValid: false,
  automated: "json",
  automationConfig: "automated",
  defaults: {
    json: [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Notion",
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
                value: process.env.REACT_APP_DNS_URL + "credentials",
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
      },
      {
        type: "dropdown",
        label: "Type",
        value: "User",
        variableName: "type",
        required: true,
        hasDynamicVariable: true,
        list: [
          {
            option: "User",
            value: "User",
          },
          {
            option: "Database",
            value: "Database",
          },
          {
            option: "Page",
            value: "Page",
          },
          {
            option: "Block",
            value: "Block",
          },
        ],
        options: {
          User: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get User",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get User",
                  value: "Get User",
                },
                {
                  option: "Get Many Users",
                  value: "Get Many Users",
                },
              ],
              options: {
                "Get User": [
                  {
                    type: "textfield",
                    label: "User ID",
                    value: "",
                    variableName: "get_user_id",
                    required: true,
                    placeholder: "Please Enter user Id",
                    hasDynamicVariable: true,
                  },
                ],
                "Get Many Users": [
                  {
                    type: "textfield",
                    label: "Limit",
                    value: "",
                    variableName: "get_many_users_limit",
                    required: false,
                    placeholder: "maximum : 100",
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
          Database: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Database",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get Database",
                  value: "Get Database",
                },
                {
                  option: "Get Many Databases",
                  value: "Get Many Databases",
                },
                {
                  option: "Search Database",
                  value: "Search Database",
                },
              ],
              options: {
                "Get Database": [
                  {
                    type: "textfield",
                    label: "Database Id",
                    value: "",
                    placeholder: "Please Enter database Id",
                    variableName: "get_database_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
                "Get Many Databases": [
                  {
                    type: "textfield",
                    label: "Limit",
                    value: "",
                    variableName: "get_many_databases_limit",
                    required: false,
                    placeholder: "maximum : 100",
                    hasDynamicVariable: true,
                  },
                ],
                "Search Database": [
                  {
                    type: "textfield",
                    label: "Database Id",
                    value: "",
                    placeholder: "Please Enter database Id",
                    variableName: "search_database_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
          Page: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Page",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get Page",
                  value: "Get Page",
                },
                {
                  option: "Archive Page",
                  value: "Archive Page",
                },

                {
                  option: "Create Page",
                  value: "Create Page",
                },
              ],
              options: {
                "Get Page": [
                  {
                    type: "textfield",
                    label: "Page ID",
                    value: "",
                    variableName: "get_page_id",
                    required: true,
                    placeholder: "Please Enter Page Id",
                    hasDynamicVariable: true,
                  },
                ],
                "Create Page": [
                  {
                    type: "textfield",
                    label: "Parent ID",
                    value: "",
                    variableName: "create_page_parent_id",
                    required: true,
                    placeholder: "Please Enter Parent Id",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Title",
                    value: "",
                    placeholder: "Please Enter Page Title",
                    variableName: "create_page_title",
                    required: true,
                    hasDynamicVariable: false,
                  },
                  {
                    type: "accordion",
                    accTitle: "Title Properties",
                    variableName: "create_page_title_properties",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          label: "Bold",
                          value: false,
                          variableName: "bold",
                        },
                        {
                          type: "checkbox",
                          label: "Italic",
                          value: false,
                          variableName: "italic",
                        },
                        {
                          type: "checkbox",
                          label: "StrikeThrough",
                          value: false,
                          variableName: "strikethrough",
                        },
                        {
                          type: "checkbox",
                          label: "Underline",
                          value: false,
                          variableName: "underline",
                        },
                        {
                          type: "checkbox",
                          label: "Code",
                          value: false,
                          variableName: "code",
                        },
                        {
                          type: "textfield",
                          label: "Color",
                          value: "",
                          placeholder: "Please enter color name",
                          variableName: "color",
                          required: false,
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                ],
                "Archive Page": [
                  {
                    type: "textfield",
                    label: "Page ID",
                    value: "",
                    variableName: "archive_page_id",
                    required: true,
                    placeholder: "Please Enter Page Id",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "checkbox",
                    label: "Archive Page",
                    value: false,
                    variableName: "archive_page_archived",
                  },
                ],
              },
            },
          ],
          Block: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Block",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Append Child Blocks",
                  value: "Append Child Blocks",
                },
                {
                  option: "Get Many Child Blocks",
                  value: "Get Many Child Blocks",
                },
                {
                  option: "Get Block",
                  value: "Get Block",
                },
              ],
              options: {
                "Get Block": [
                  {
                    type: "textfield",
                    label: "Block ID",
                    value: "",
                    placeholder: "Please Enter Block Id",
                    variableName: "get_block_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
                "Append Child Blocks": [
                  {
                    type: "textfield",
                    label: "Block Id",
                    value: "",
                    placeholder: "Please Enter Block Id",
                    variableName: "append_block_children",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    accTitle: "Type Name or Id",
                    label: "Type Name or Id",
                    variableName: "append_child_type",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "paragraph",
                          variableName: "option",
                          hasDynamicVariable: true,
                          list: [
                            {
                              option: "Paragraph",
                              value: "paragraph",
                            },
                            {
                              option: "Heading 1",
                              value: "heading_1",
                            },
                            {
                              option: "Heading 2",
                              value: "heading_2",
                            },
                            {
                              option: "Heading 3",
                              value: "heading_3",
                            },

                            {
                              option: "Image",
                              value: "image",
                            },
                            {
                              option: "Numbered List Item",
                              value: "numbered_list_item",
                            },
                            {
                              option: "Bulleted List Item",
                              value: "bulleted_list_item",
                            },
                            {
                              option: "Toggle",
                              value: "toggle",
                            },
                            {
                              option: "To Do",
                              value: "to_do",
                            },
                          ],
                          options: {
                            paragraph: [
                              {
                                type: "textfield",
                                label: "Text",
                                value: "",
                                placeholder: "Please enter text",
                                variableName: "content",
                                required: false,
                                hasDynamicVariable: false,
                              },
                            ],
                            heading_1: [
                              {
                                type: "textfield",
                                label: "Text",
                                value: "",
                                placeholder: "Please enter text",
                                variableName: "content",
                                required: false,
                                hasDynamicVariable: false,
                              },
                            ],
                            heading_2: [
                              {
                                type: "textfield",
                                label: "Text",
                                value: "",
                                placeholder: "Please enter text",
                                variableName: "content",
                                required: false,
                                hasDynamicVariable: false,
                              },
                            ],
                            heading_3: [
                              {
                                type: "textfield",
                                label: "Text",
                                value: "",
                                placeholder: "Please enter text",
                                variableName: "content",
                                required: false,
                                hasDynamicVariable: false,
                              },
                            ],
                            toggle: [
                              {
                                type: "textfield",
                                label: "Text",
                                value: "",
                                placeholder: "Please enter text",
                                variableName: "content",
                                required: false,
                                hasDynamicVariable: false,
                              },
                            ],
                            to_do: [
                              {
                                type: "checkbox",
                                label: "Checked",
                                value: false,
                                variableName: "content",
                              },
                              {
                                type: "textfield",
                                label: "Text",
                                value: "",
                                placeholder: "Please enter text",
                                variableName: "content",
                                required: false,
                                hasDynamicVariable: false,
                              },
                            ],
                            image: [
                              {
                                type: "textfield",
                                label: "Image URL",
                                value: "",
                                placeholder: "Please enter image url",
                                variableName: "content",
                                required: false,
                                hasDynamicVariable: false,
                              },
                            ],
                            numbered_list_item: [
                              {
                                type: "textfield",
                                label: "Text",
                                value: "",
                                placeholder: "Please enter text",
                                variableName: "content",
                                required: false,
                                hasDynamicVariable: false,
                              },
                            ],
                            bulleted_list_item: [
                              {
                                type: "textfield",
                                label: "Text",
                                value: "",
                                placeholder: "Please enter text",
                                variableName: "content",
                                required: false,
                                hasDynamicVariable: false,
                              },
                            ],
                          },
                        },
                      ],
                    ],
                  },
                ],
                "Get Many Child Blocks": [
                  {
                    type: "textfield",
                    label: "Block Id",
                    value: "",
                    placeholder: "Please Enter Block Id",
                    variableName: "get_block_children",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Limit",
                    value: "",
                    variableName: "get_block_children_limit",
                    required: false,
                    placeholder: "maximum : 100",
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};
