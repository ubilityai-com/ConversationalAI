export const ShopifyJson = {
  category: "integration",
  type: "Shopify",
  label: "Shopify",
  color: "#53D2E2 ",
  docsPath: "Connectors/Shopify/getting_started",
  description: "Shopify integration",
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
        credType: "Shopify",
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
            type: { fields: ["type"] },
          },
        },
        apiDependsOn: [],
        conditionOnFirstTime: [],
        conditionOnRefresh: [],
      },
      {
        type: "dropdown",
        label: "Resource",
        value: "Customer",
        variableName: "type",
        errorSpan: "Please choose a resource",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Customer",
            value: "Customer",
          },
          {
            option: "Order",
            value: "Order",
          },
          {
            option: "Product",
            value: "Product",
          },
          {
            option: "Product Variant",
            value: "Product Variant",
          },
          {
            option: "Inventory Quantity",
            value: "Inventory Quantity",
          },
          {
            option: "Blog Articles",
            value: "Blog Articles",
          },
        ],
        options: {
          Customer: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Customer By Id",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Customer By Id",
                },
                {
                  option: "Create",
                  value: "Create Customer",
                },
              ],
              options: {
                "Get Customer By Id": [
                  {
                    type: "textfield",
                    label: "Customer Id",
                    required: true,
                    variableName: "customer_id_Get_Customer",
                    value: "",
                    placeholder: "Customer Id",
                    hasDynamicVariable: true,
                  },
                ],
                "Create Customer": [
                  {
                    type: "textfield",
                    label: "First Name",
                    required: true,
                    variableName: "first_name_CreateCustomer",
                    value: "",
                    placeholder: "First Name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Last Name",
                    required: true,
                    variableName: "last_name_CreateCustomer",
                    value: "",
                    placeholder: "Last Name",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Email",
                    required: true,
                    variableName: "email_CreateCustomer",
                    value: "",
                    placeholder: "Email",
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Phone Number",
                    required: true,
                    variableName: "phone_CreateCustomer",
                    value: "",
                    placeholder: "Phone Number",
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Note",
                    variableName: "note_CreateCustomer",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Note",
                          variableName: "note_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tags",
                    variableName: "tags_CreateCustomer",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Tags",
                          variableName: "tags_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Accepts Marketing",
                    variableName: "accepts_marketing_CreateCustomer",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "accepts_marketing_CreateCustomer",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tax Exempt",
                    variableName: "tax_exempt_CreateCustomer",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "tax_exempt_CreateCustomer",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Send E-Mail Invite",
                    variableName: "send_email_invite_CreateCustomer",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "send_email_invite_CreateCustomer",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Addresses",
                    variableName: "addressInfo_CreateCustomer",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "First Name",
                          value: "",
                          placeholder: "First Name",
                          variableName: "first_name_addresses_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          type: "textfield",
                          label: "Last Name",
                          value: "",
                          placeholder: "Last Name",
                          variableName: "last_name_addresses_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "address",
                          type: "textfield",
                          value: "",
                          placeholder: "address",
                          variableName: "address1_addresses_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Address con't",
                          type: "textfield",
                          value: "",
                          placeholder: "Address con't",
                          variableName: "address2_addresses_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "City",
                          type: "textfield",
                          value: "",
                          placeholder: "City",
                          variableName: "city_addresses_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Postal/Zip code",
                          type: "textfield",
                          value: "",
                          placeholder: "Postal/Zip code",
                          variableName: "zip_addresses_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Country",
                          type: "textfield",
                          value: "",
                          placeholder: "Country",
                          variableName: "country_addresses_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Province",
                          type: "textfield",
                          value: "",
                          placeholder: "Province",
                          variableName: "province_addresses_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Phone",
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_addresses_CreateCustomer",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          Order: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Order By Id",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Order By Id",
                },
                {
                  option: "Create",
                  value: "Create Order",
                },
                {
                  option: "Delete",
                  value: "Delete Order",
                },
              ],
              options: {
                "Get Order By Id": [
                  {
                    type: "api",
                    label: "Orders",
                    variableName: "order_id_GetOrder",
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
                              "shopify/getOrders",
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
                      path: "data.orders",
                      keys: {
                        option: {
                          fields: ["name"],
                        },
                        value: {
                          fields: ["id"],
                        },
                      },
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
                  },
                ],
                "Create Order": [
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    required: true,
                    title: "Line item",
                    variableName: "LineItems",
                    structure: [
                      {
                        type: "row",
                        title: "Line item",
                        variableName: "LineItems",
                        removeButton: true,
                      },
                      {
                        label: "Product Name",
                        type: "textfield",
                        value: "",
                        required: true,
                        placeholder: "Product Name",
                        variableName: "Product_Name_LineItems_CreateOrder",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                      },
                      {
                        label: "Product Variant",
                        type: "textfield",
                        value: "",
                        placeholder: "Product Variant",
                        variableName: "Product_Variant_LineItems_CreateOrder",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                      },
                      {
                        label: "Product Quantity",
                        type: "textfield",
                        required: true,
                        value: "",
                        placeholder: "Product Quantity",
                        variableName: "quantity_LineItems_CreateOrder",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                        numberField: true,
                        typeOfValue: "integer",
                        helperSpan:
                          "The quantity will be set to the number you enter.",
                      },
                      {
                        label: "Product Price",
                        type: "textfield",
                        value: "",
                        placeholder: "Product Price",
                        required: true,
                        variableName: "price_LineItems_CreateOrder",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                      },
                      {
                        label: "Weight in Grams",
                        type: "textfield",
                        value: "",
                        placeholder: "Weight in Grams",
                        variableName: "grams_LineItems_CreateOrder",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                      },
                    ],
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Location",
                    variableName: "location_id_CreateOrder",
                    fieldsArray: [
                      [
                        {
                          type: "api",
                          variableName: "location_id_CreateOrder",
                          value: "",
                          required: false,
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
                                    "shopify/getLocations",
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
                            path: "data.locations",
                            keys: {
                              option: {
                                fields: ["name"],
                              },
                              value: {
                                fields: ["id"],
                              },
                            },
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
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "email_CreateOrder",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Email",
                          variableName: "email_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Note",
                    variableName: "note_CreateOrder",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Note",
                          variableName: "note_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tags",
                    variableName: "tags_CreateOrder",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Tags",
                          variableName: "tags_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Source Name",
                    variableName: "source_name_CreateOrder",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Source Name",
                          variableName: "source_name_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Send Receipt",
                    variableName: "send_receipt_CreateOrder",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "send_receipt_CreateOrder",
                          helperSpan:
                            "Should an order confirmation be sent to the customer?",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Inventory Behaviour",
                    variableName: "InventoryBehaviour_CreateOrder",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "bypass",
                          variableName: "type_InventoryBehaviour",
                          errorSpan: "Please choose a Inventory Behaviour",
                          required: true,
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Bypass (Take No Action)",
                              value: "bypass",
                            },
                            {
                              option: "Decrement Ignoring Policy",
                              value: "decrement_ignoring_policy",
                            },
                            {
                              option: "Decrement Obeying Policy",
                              value: "decrement_obeying_policy",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Fulfillment Status",
                    variableName: "FulfillmentStatus_CreateOrder",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "null",
                          variableName: "type_FulfillmentStatus",
                          errorSpan: "Please choose a Fulfillment Status",
                          required: true,
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Null",
                              value: "null",
                            },
                            {
                              option: "Fulfilled",
                              value: "fulfilled",
                            },
                            {
                              option: "Partial",
                              value: "partial",
                            },
                            {
                              option: "Not Eligible",
                              value: "not_eligible",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Financial Status",
                    variableName: "FinancialStatus_CreateOrder",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "pending",
                          variableName: "type_FinancialStatus",
                          errorSpan: "Please choose a Financial Status",
                          required: true,
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Pending",
                              value: "pending",
                            },
                            {
                              option: "Authorized",
                              value: "authorized",
                            },
                            {
                              option: "Partially Paid",
                              value: "partially_paid",
                            },
                            {
                              option: "Paid",
                              value: "paid",
                            },
                            {
                              option: "Partially Refunded",
                              value: "partially_refunded",
                            },
                            {
                              option: "Refunded",
                              value: "refunded",
                            },
                            {
                              option: "Voided",
                              value: "voided",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Send Fulfillment Receipt",
                    variableName: "send_fulfillment_receipt_CreateOrder",
                    fieldsArray: [
                      [
                        {
                          type: "checkbox",
                          value: false,
                          variableName: "send_fulfillment_receipt_CreateOrder",
                          helperSpan:
                            "Should a fulfillment confirmation be sent to the customer?",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping Addresses",
                    variableName: "shippingAddresses",
                    fieldsArray: [
                      [
                        {
                          label: "First Name",
                          type: "textfield",
                          value: "",
                          placeholder: "First Name",
                          variableName:
                            "first_name_shippingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Last Name",
                          type: "textfield",
                          value: "",
                          placeholder: "Last Name",
                          variableName:
                            "last_name_shippingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "address",
                          type: "textfield",
                          value: "",
                          placeholder: "address",
                          variableName:
                            "address1_shippingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Address con't",
                          type: "textfield",
                          value: "",
                          placeholder: "Address con't",
                          variableName:
                            "address2_shippingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "City",
                          type: "textfield",
                          value: "",
                          placeholder: "City",
                          variableName: "city_shippingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Postal/Zip code",
                          type: "textfield",
                          value: "",
                          placeholder: "Postal/Zip code",
                          variableName: "zip_shippingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Country",
                          type: "textfield",
                          value: "",
                          placeholder: "Country",
                          variableName: "country_shippingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Province",
                          type: "textfield",
                          value: "",
                          placeholder: "Province",
                          variableName:
                            "province_shippingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Phone",
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_shippingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Billing Address",
                    variableName: "BillingAddresses",
                    fieldsArray: [
                      [
                        {
                          label: "First Name",
                          type: "textfield",
                          value: "",
                          placeholder: "First Name",
                          variableName:
                            "first_name_BillingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Last Name",
                          type: "textfield",
                          value: "",
                          placeholder: "Last Name",
                          variableName:
                            "last_name_BillingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "address",
                          type: "textfield",
                          value: "",
                          placeholder: "address",
                          variableName: "address1_BillingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Address con't",
                          type: "textfield",
                          value: "",
                          placeholder: "Address con't",
                          variableName: "address2_BillingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "City",
                          type: "textfield",
                          value: "",
                          placeholder: "City",
                          variableName: "city_BillingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Postal/Zip code",
                          type: "textfield",
                          value: "",
                          placeholder: "Postal/Zip code",
                          variableName: "zip_BillingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Country",
                          type: "textfield",
                          value: "",
                          placeholder: "Country",
                          variableName: "country_BillingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Province",
                          type: "textfield",
                          value: "",
                          placeholder: "Province",
                          variableName: "province_BillingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Phone",
                          type: "textfield",
                          value: "",
                          placeholder: "Phone",
                          variableName: "phone_BillingAddresses_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Discount Codes",
                    variableName: "discountCodes",
                    fieldsArray: [
                      [
                        {
                          label: "Code",
                          type: "textfield",
                          value: "",
                          placeholder: "Code",
                          variableName: "code_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Amount",
                          type: "textfield",
                          value: "",
                          placeholder: "Amount",
                          variableName: "amount_CreateOrder",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                        {
                          label: "Type of discount",
                          type: "dropdown",
                          value: "fixed_amount",
                          variableName: "type_discountCodes",
                          errorSpan: "Please choose a type",
                          required: true,
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "Fixed Amount",
                              value: "fixed_amount",
                            },
                            {
                              option: "Percentage",
                              value: "percentage",
                            },
                            {
                              option: "Shipping",
                              value: "shipping",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                "Delete Order": [
                  {
                    type: "api",
                    label: "Orders",
                    variableName: "order_id_DeleteOrder",
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
                              "shopify/getOrders",
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
                      path: "data.orders",
                      keys: {
                        option: {
                          fields: ["name"],
                        },
                        value: {
                          fields: ["id"],
                        },
                      },
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
                  },
                ],
              },
            },
          ],
          Product: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Product",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Product",
                },
                {
                  option: "Create",
                  value: "Create Product",
                },
                {
                  option: "Delete",
                  value: "Delete Product",
                },
              ],
              options: {
                "Get Product": [
                  {
                    type: "api",
                    label: "Products",
                    variableName: "product_id_Get_Product",
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
                              "shopify/getProducts",
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
                      path: "data.products",
                      keys: {
                        option: {
                          fields: ["title"],
                        },
                        value: {
                          fields: ["id"],
                        },
                      },
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
                  },
                ],
                "Create Product": [
                  {
                    type: "textfield",
                    label: "Title",
                    value: "",
                    required: true,
                    placeholder: "Title",
                    variableName: "title_CreateProduct",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Published Scope",
                    variableName: "published_scope_CreateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "global",
                          variableName: "published_scope_CreateProduct",
                          errorSpan: "Please choose an Published Scope",
                          required: true,
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "global",
                              value: "global",
                            },
                            {
                              option: "web",
                              value: "web",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Product Type",
                    variableName: "product_type_CreateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Product Type",
                          variableName: "product_type_CreateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Vendor",
                    variableName: "vendor_CreateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Vendor",
                          variableName: "vendor_CreateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Product Description",
                    variableName: "body_html_CreateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Product Description",
                          variableName: "body_html_CreateProduct",
                          minRows: "5",
                          multiline: true,
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan: "Can use html elements.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tags",
                    variableName: "tags_CreateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Tags",
                          variableName: "tags_CreateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan: "Comma Separated list of tags.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "SKU",
                    variableName: "sku_CreateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "SKU",
                          variableName: "sku_CreateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Published At",
                    variableName: "published_at_CreateProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          date: true,
                          value: "",
                          placeholder: "Published At",
                          variableName: "published_at_CreateProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "The date and time when the product was published. This must be a date in the past. Defaults to the current date if left blank",
                        },
                      ],
                    ],
                  },
                  {
                    type: "dynamic",
                    fieldsArray: [],
                    title: "Image URL",
                    variableName: "ImageURL",
                    structure: [
                      {
                        type: "row",
                        title: "Image URL",
                        variableName: "ImageURL",
                        removeButton: true,
                      },
                      {
                        label: "Image URL",
                        type: "textfield",
                        value: "",
                        placeholder: "Image URL",
                        variableName: "src_image_ImageURL_CreateProduct",
                        hasDynamicVariable: true,
                        rightSideInput: true,
                      },
                    ],
                  },
                ],
                "Delete Product": [
                  {
                    type: "api",
                    label: "Products",
                    variableName: "product_id_DeleteProduct",
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
                              "shopify/getProducts",
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
                      path: "data.products",
                      keys: {
                        option: {
                          fields: ["title"],
                        },
                        value: {
                          fields: ["id"],
                        },
                      },
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
                  },
                ],
              },
            },
          ],
          "Product Variant": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Variant Product",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get",
                  value: "Get Variant Product",
                },
                {
                  option: "Create",
                  value: "Create Variant Product",
                },
              ],
              options: {
                "Get Variant Product": [
                  {
                    type: "api",
                    label: "Product",
                    variableName: "product_id_GetVariantProduct",
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
                              "shopify/getProducts",
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
                      path: "data.products",
                      keys: {
                        option: {
                          fields: ["title"],
                        },
                        value: {
                          fields: ["id"],
                        },
                      },
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
                  },
                ],
                "Create Variant Product": [
                  {
                    type: "api",
                    label: "Product",
                    variableName: "product_id_CreateVariantProduct",
                    value: "true",
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
                              "shopify/getProducts",
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
                      path: "data.products",
                      keys: {
                        option: {
                          fields: ["title"],
                        },
                        value: {
                          fields: ["id"],
                        },
                      },
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
                  },
                  {
                    type: "textfield",
                    label: "Title",
                    value: "",
                    placeholder: "Title",
                    variableName: "title_CreateVariantProduct",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Inventory Policy",
                    variableName: "inventory_policy_CreateVariantProduct",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "deny",
                          variableName: "inventory_policy_CreateVariantProduct",
                          errorSpan: "Please choose an Inventory Policy",
                          required: true,
                          hasDynamicVariable: false,
                          helperSpan:
                            "What should Shopify do when inventory is exhausted: deny sales or continue selling?",
                          list: [
                            {
                              option: "deny",
                              value: "deny",
                            },
                            {
                              option: "continue",
                              value: "continue",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Price",
                    variableName: "price_CreateVariantProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Price",
                          variableName: "price_CreateVariantProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Please enter the price in the following format: 1.0",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Compare at Price",
                    variableName: "compare_at_price_CreateVariantProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Compare at Price",
                          variableName: "compare_at_price_CreateVariantProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan:
                            "Please enter the price in the following format: 1.0",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "SKU",
                    variableName: "sku_CreateVariantProduct",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "SKU",
                          variableName: "sku_CreateVariantProduct",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
          "Inventory Quantity": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Update Inventory Quantity",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Update Inventory Quantity",
                  value: "Update Inventory Quantity",
                },
              ],
              options: {
                "Update Inventory Quantity": [
                  {
                    type: "api",
                    label: "Location",
                    variableName: "location_id_InventoryQuantity",
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
                              "shopify/getLocations",
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
                      path: "data.locations",
                      keys: {
                        option: {
                          fields: ["name"],
                        },
                        value: {
                          fields: ["id"],
                        },
                      },
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
                  },
                  {
                    type: "api",
                    label: "Product",
                    variableName: "id_Product_inventory",
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
                              "shopify/getProducts",
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
                      path: "data.products",
                      keys: {
                        option: {
                          fields: ["title"],
                        },
                        value: {
                          fields: ["id"],
                        },
                      },
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
                  },
                  {
                    type: "api",
                    label: "Variant Product",
                    variableName: "inventory_item_id_InventoryQuantity",
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
                              "shopify/getInventoryItemIdVariantsProducts",
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
                          ,
                          {
                            key: "product_id",
                            dependOn: "id_Product_inventory",
                            isAutomation: true,
                          },
                        ],
                      },
                    ],
                    res: {
                      path: "data.variants",
                      keys: {
                        option: {
                          fields: ["title"],
                        },
                        value: {
                          fields: ["inventory_item_id"],
                        },
                      },
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
                  },
                  {
                    type: "textfield",
                    label: "Quantity",
                    value: "",
                    placeholder: "Quantity",
                    required: true,
                    variableName: "available_InventoryQuantity",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                    numberField: true,
                    typeOfValue: "integer",
                    helperSpan:
                      "The quantity will be set to the number you enter.",
                  },
                ],
              },
            },
          ],
          "Blog Articles": [
            {
              type: "dropdown",
              label: "Operation",
              value: "Create Blog Articles",
              variableName: "operation",
              errorSpan: "Please choose an Operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Create",
                  value: "Create Blog Articles",
                },
              ],
              options: {
                "Create Blog Articles": [
                  {
                    type: "api",
                    label: "Blog",
                    variableName: "id_blog_articles",
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
                              "shopify/getBlogs",
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
                      path: "data.blogs",
                      keys: {
                        option: {
                          fields: ["title"],
                        },
                        value: {
                          fields: ["id"],
                        },
                      },
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
                  },
                  {
                    type: "textfield",
                    label: "Title",
                    value: "",
                    placeholder: "Title",
                    required: true,
                    variableName: "title_blog_articles",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Author Name",
                    value: "",
                    placeholder: "Author Name",
                    required: true,
                    variableName: "author_blog_articles",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                  },
                  {
                    type: "textfield",
                    label: "Content",
                    value: "",
                    minRows: "5",
                    multiline: true,
                    placeholder: "Content",
                    required: true,
                    variableName: "body_html_blog_articles",
                    hasDynamicVariable: true,
                    rightSideInput: true,
                    helperSpan: "Supports HTML.",
                  },
                  {
                    title: "Options",
                    type: "accordion",
                    accTitle: "Featured Image URL",
                    variableName: "src_image_blog_articles",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Image URL",
                          variableName: "src_image_blog_articles",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Excerpt/Summary",
                    variableName: "summary_html_blog_articles",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          minRows: "5",
                          multiline: true,
                          placeholder: "Enter text",
                          required: false,
                          variableName: "summary_html_blog_articles",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                          helperSpan: "Supports HTML.",
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Tags",
                    variableName: "tags_blog_articles",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          value: "",
                          placeholder: "Tags",
                          variableName: "tags_blog_articles",
                          hasDynamicVariable: true,
                          rightSideInput: true,
                        },
                      ],
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
};
