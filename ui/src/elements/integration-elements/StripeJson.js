import { currencies_array } from "./currencies";
export const StripeJson = {
  "category": "integration",
  "type": "Stripe",
  "label": "Stripe",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/Stripe/getting_started",
  "description": "Stripe integration",
  "defaultValid": false,
  "automated": "json",
  "automationConfig": "automated",
  "defaults": {
    "json": [
      {
        type: "api",
        label: "Credentials",
        variableName: "cred",
        required: true,
        credential: true,
        credType: "Stripe",
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
        label: "Type",
        value: "Balance",
        variableName: "type",
        required: true,
        hasDynamicVariable: true,
        list: [
          {
            option: "Balance",
            value: "Balance",
          },
          {
            option: "PaymentIntent",
            value: "PaymentIntent",
          },
          {
            option: "Coupon",
            value: "Coupon",
          },
          {
            option: "Customer",
            value: "Customer",
          },
        ],
        options: {
          Balance: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Balance",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Get Balance",
                  value: "Get Balance",
                },
              ],
              options: {
                "Get Balance": [
                ],
              },
            },
          ],
          PaymentIntent: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get PaymentIntent",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get PaymentIntent",
                  value: "Get PaymentIntent",
                },
                {
                  option: "Get Many PaymentIntents",
                  value: "Get Many PaymentIntents",
                },
                {
                  option: "Create PaymentIntent",
                  value: "Create PaymentIntent",
                },
                {
                  option: "Update PaymentIntent",
                  value: "Update PaymentIntent",
                },
                {
                  option: "Cancel PaymentIntent",
                  value: "Cancel PaymentIntent",
                },
              ],
              options: {
                "Get PaymentIntent": [
                  {
                    type: "textfield",
                    label: "PaymentIntent Id",
                    placeholder: "Please Enter Id",
                    value: "",
                    variableName: "get_payment_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
                "Get Many PaymentIntents": [
                  {
                    type: "textfield",
                    label: "Limit",
                    placeholder: "Please Enter  Limit",
                    value: "",
                    variableName: "get_many_payments_limit",
                    required: false,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Customer",
                    placeholder: "Please Enter Customer Id",
                    value: "",
                    variableName: "get_many_payments_customer",
                    required: false,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Ending Before",
                    placeholder: "Please Enter PaymentIntent Id",
                    value: "",
                    variableName: "get_many_payments_ending_before",
                    required: false,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Starting After",
                    placeholder: "Please Enter PaymentIntent Id",
                    value: "",
                    variableName: "get_many_payments_starting_after",
                    required: false,
                    hasDynamicVariable: true,
                  },
                ],
                "Create PaymentIntent": [
                  {
                    type: "textfield",
                    label: "Amount",
                    placeholder: "Please Enter Amount ",
                    value: "",
                    variableName: "create_payment_amount",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    value: "None",
                    required: true,
                    label: "Currency",
                    variableName: "create_currency",
                    hasDynamicVariable: false,
                    list: [...currencies_array],
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Description",
                    variableName: "create_payment_description",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter payment description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Receipt Email",
                    variableName: "create_payment_receipt_email",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter payment receipt email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Customer",
                    variableName: "create_payment_customer",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter payment customer Id",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Automatic Payment Methods",
                    variableName: "create_payment_automatic_payment_methods",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "False",
                              value: "False",
                            },
                            {
                              option: "True",
                              value: "True",
                            },
                            {
                              option: "None",
                              value: "none",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Confirm",
                    variableName: "create_payment_confirm",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "none",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [
                            {
                              option: "False",
                              value: "False",
                            },
                            {
                              option: "True",
                              value: "True",
                            },
                            {
                              option: "None",
                              value: "none",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping",
                    variableName: "create_paymentintent_shipping",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "City",
                          value: "",
                          required: false,
                          placeholder: "please enter city name",
                          variableName: "city",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Country",
                          value: "",
                          required: false,
                          placeholder: "please enter country name",
                          variableName: "country",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Line 1",
                          value: "",
                          required: false,
                          placeholder: "please enter line1 ",
                          variableName: "line1",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Postal Code",
                          value: "",
                          required: false,
                          placeholder: "please enter postal code",
                          variableName: "postal_code",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "State",
                          value: "",
                          required: false,
                          placeholder: "please enter state",
                          variableName: "state",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Name",
                          value: "",
                          required: false,
                          placeholder: "please enter name",
                          variableName: "name",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Phone",
                          value: "",
                          required: false,
                          placeholder: "please enter phone number",
                          variableName: "phone",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Tracking Number",
                          value: "",
                          required: false,
                          placeholder: "please enter tracking number",
                          variableName: "tracking",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Update PaymentIntent": [
                  {
                    type: "textfield",
                    label: "PaymentIntent Id",
                    placeholder: "Please Enter Id",
                    value: "",
                    variableName: "update_payment_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Amount",
                    variableName: "update_payment_amount",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter amount",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Currency",
                    variableName: "update_currency",
                    fieldsArray: [
                      [
                        {
                          type: "dropdown",
                          value: "None",
                          variableName: "option",
                          hasDynamicVariable: false,
                          list: [...currencies_array],
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "update_payment_description",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter payment description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Receipt Email",
                    variableName: "update_payment_receipt_email",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter payment receipt email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Customer",
                    variableName: "update_payment_customer",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter payment customer Id",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping",
                    variableName: "update_paymentintent_shipping",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "City",
                          value: "",
                          required: false,
                          placeholder: "please enter city name",
                          variableName: "city",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Country",
                          value: "",
                          required: false,
                          placeholder: "please enter country name",
                          variableName: "country",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Line 1",
                          value: "",
                          required: false,
                          placeholder: "please enter line1 ",
                          variableName: "line1",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Postal Code",
                          value: "",
                          required: false,
                          placeholder: "please enter postal code",
                          variableName: "postal_code",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "State",
                          value: "",
                          required: false,
                          placeholder: "please enter state",
                          variableName: "state",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Name",
                          value: "",
                          required: false,
                          placeholder: "please enter name",
                          variableName: "name",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Phone",
                          value: "",
                          required: false,
                          placeholder: "please enter phone number",
                          variableName: "phone",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Tracking Number",
                          value: "",
                          required: false,
                          placeholder: "please enter tracking number",
                          variableName: "tracking",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Cancel PaymentIntent": [
                  {
                    type: "textfield",
                    label: "PaymentIntent Id",
                    placeholder: "Please Enter Id",
                    value: "",
                    variableName: "cancel_payment_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
          Coupon: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Create Coupon",
              variableName: "operation",
              required: true,
              hasDynamicVariable: false,
              list: [
                {
                  option: "Create Coupon",
                  value: "Create Coupon",
                },
                {
                  option: "Get Many Coupons",
                  value: "Get Many Coupons",
                },
              ],
              options: {
                "Create Coupon": [
                  {
                    type: "textfield",
                    label: "Percent Off ",
                    placeholder: "Please Enter Percent Off",
                    value: "",
                    variableName: "create_coupon_percent_off",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "dropdown",
                    value: "None",
                    required: false,
                    label: "Currency",
                    variableName: "create_coupon_currency",
                    hasDynamicVariable: false,
                    list: [...currencies_array],
                  },
                  {
                    type: "textfield",
                    label: "Name",
                    placeholder: "Please Enter Name",
                    value: "",
                    variableName: "create_coupon_name",
                    required: false,
                    hasDynamicVariable: true,
                  },
                ],
                "Get Many Coupons": [
                  {
                    type: "textfield",
                    label: "Limit",
                    placeholder: "Please Enter Coupons Limit",
                    value: "",
                    variableName: "get_many_coupons_limit",
                    required: false,
                    hasDynamicVariable: true,
                  },
                ],
              },
            },
          ],
          Customer: [
            {
              type: "dropdown",
              label: "Operation",
              value: "Get Customer",
              variableName: "operation",
              required: true,
              hasDynamicVariable: true,
              list: [
                {
                  option: "Get Customer",
                  value: "Get Customer",
                },
                {
                  option: "Get Many Customers",
                  value: "Get Many Customers",
                },
                {
                  option: "Create Customer",
                  value: "Create Customer",
                },
                {
                  option: "Update Customer",
                  value: "Update Customer",
                },
                {
                  option: "Delete Customer",
                  value: "Delete Customer",
                },
              ],
              options: {
                "Get Customer": [
                  {
                    type: "textfield",
                    label: "Customer Id",
                    placeholder: "Please Enter Customer Id",
                    value: "",
                    variableName: "get_customer_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                ],
                "Get Many Customers": [
                  {
                    type: "textfield",
                    label: "Limit",
                    placeholder: "Please Enter Limit",
                    value: "",
                    variableName: "get_many_customers_limit",
                    required: false,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "textfield",
                    label: "Email",
                    placeholder: "Please Enter Customer Email",
                    value: "",
                    variableName: "get_many_customers_email",
                    required: false,
                    hasDynamicVariable: true,
                  },
                ],
                "Create Customer": [
                  {
                    type: "textfield",
                    label: "Name",
                    placeholder: "Please Enter Customer Name",
                    value: "",
                    variableName: "create_customer_name",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    title: "Additional Fields",
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "create_customer_description",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter customer description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "create_customer_email",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter customer email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Balance",
                    variableName: "create_customer_balance",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter customer balance",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "create_customer_phone",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter customer phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },

                  {
                    type: "accordion",
                    accTitle: "Address",
                    variableName: "create_customer_address",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          value: "",
                          label: "City",
                          placeholder: "City",
                          variableName: "city",
                          hasDynamicVariable: false,
                        },
                        {
                          type: "textfield",
                          required: false,
                          value: "",
                          label: "Country",
                          placeholder: "Country",
                          variableName: "country",
                          hasDynamicVariable: false,
                        },
                        {
                          type: "textfield",
                          required: false,
                          value: "",
                          label: "Postal Code",
                          placeholder: "Postal Code",
                          variableName: "postal_code",
                          hasDynamicVariable: false,
                        },
                        {
                          type: "textfield",
                          label: "State",
                          required: false,
                          value: "",
                          placeholder: "state",
                          variableName: "state",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping",
                    variableName: "create_customer_shipping",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "City",
                          value: "",
                          required: false,
                          placeholder: "please enter city name",
                          variableName: "city",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Country",
                          value: "",
                          required: false,
                          placeholder: "please enter country name",
                          variableName: "country",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Line 1",
                          value: "",
                          required: false,
                          placeholder: "please enter line1 ",
                          variableName: "line1",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Postal Code",
                          value: "",
                          required: false,
                          placeholder: "please enter postal code",
                          variableName: "postal_code",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "State",
                          value: "",
                          required: false,
                          placeholder: "please enter state",
                          variableName: "state",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Name",
                          value: "",
                          required: false,
                          placeholder: "please enter name",
                          variableName: "name",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Phone",
                          value: "",
                          required: false,
                          placeholder: "please enter phone number",
                          variableName: "phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Update Customer": [
                  {
                    type: "textfield",
                    label: "Customer Id",
                    placeholder: "Please Enter Customer Id",
                    value: "",
                    variableName: "update_customer_id",
                    required: true,
                    hasDynamicVariable: true,
                  },
                  {
                    type: "accordion",
                    title: "Options",
                    accTitle: "Name",
                    variableName: "update_customer_name",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter customer name",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Description",
                    variableName: "update_customer_description",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter customer description",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Email",
                    variableName: "update_customer_email",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter customer email",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Balance",
                    variableName: "update_customer_balance",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter customer balance",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Phone",
                    variableName: "update_customer_phone",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          variableName: "option",
                          value: "",
                          placeholder: "please enter customer phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Address",
                    variableName: "update_customer_address",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          required: false,
                          value: "",
                          label: "City",
                          placeholder: "City",
                          variableName: "city",
                          hasDynamicVariable: false,
                        },
                        {
                          type: "textfield",
                          required: false,
                          value: "",
                          label: "Country",
                          placeholder: "Country",
                          variableName: "country",
                          hasDynamicVariable: false,
                        },
                        {
                          type: "textfield",
                          required: false,
                          value: "",
                          label: "Postal Code",
                          placeholder: "Postal Code",
                          variableName: "postal_code",
                          hasDynamicVariable: false,
                        },
                        {
                          type: "textfield",
                          label: "State",
                          required: false,
                          value: "",
                          placeholder: "state",
                          variableName: "state",
                          hasDynamicVariable: false,
                        },
                      ],
                    ],
                  },
                  {
                    type: "accordion",
                    accTitle: "Shipping",
                    variableName: "update_customer_shipping",
                    fieldsArray: [
                      [
                        {
                          type: "textfield",
                          label: "City",
                          value: "",
                          required: false,
                          placeholder: "please enter city name",
                          variableName: "city",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Country",
                          value: "",
                          required: false,
                          placeholder: "please enter country name",
                          variableName: "country",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Line 1",
                          value: "",
                          required: false,
                          placeholder: "please enter line1 ",
                          variableName: "line1",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Postal Code",
                          value: "",
                          required: false,
                          placeholder: "please enter postal code",
                          variableName: "postal_code",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "State",
                          value: "",
                          required: false,
                          placeholder: "please enter state",
                          variableName: "state",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Name",
                          value: "",
                          required: false,
                          placeholder: "please enter name",
                          variableName: "name",
                          hasDynamicVariable: true,
                        },
                        {
                          type: "textfield",
                          label: "Phone",
                          value: "",
                          required: false,
                          placeholder: "please enter phone number",
                          variableName: "phone",
                          hasDynamicVariable: true,
                        },
                      ],
                    ],
                  },
                ],
                "Delete Customer": [
                  {
                    type: "textfield",
                    label: "Customer Id",
                    placeholder: "Please Enter Customer Id",
                    value: "",
                    variableName: "delete_customer_id",
                    required: true,
                    hasDynamicVariable: true,
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