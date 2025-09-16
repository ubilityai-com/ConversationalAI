import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "Balance") {
        if (inputs.operation === "Get Balance") {
          jsonToSend = {};
        }
      } else if (inputs.type === "PaymentIntent") {
        if (inputs.operation === "Get PaymentIntent") {
          jsonToSend = {
            ...jsonToSend,
            payment_id: inputs.get_payment_id,
          };
        } else if (inputs.operation === "Get Many PaymentIntents") {
          jsonToSend = {
            ...jsonToSend,
            limit: inputs.get_many_payments_limit,
            customer: inputs.get_many_payments_customer,
            ending_before: inputs.get_many_payments_ending_before,
            starting_after: inputs.get_many_payments_starting_after,
          };
        } else if (inputs.operation === "Cancel PaymentIntent") {
          jsonToSend = {
            ...jsonToSend,
            payment_id: inputs.cancel_payment_id,
          };
        } else if (inputs.operation === "Create PaymentIntent") {
          jsonToSend = {
            ...jsonToSend,
            amount: inputs.create_payment_amount,
            currency: inputs.create_currency,
            description: getAccvalue(
              inputs,
              "create_payment_description.option"
            ),
            receipt_email: getAccvalue(
              inputs,
              "create_payment_receipt_email.option"
            ),
            customer: getAccvalue(inputs, "create_payment_customer.option"),
            automatic_payment_methods: {
              enabled: getAccvalue(
                inputs,
                "create_payment_automatic_payment_methods.option"
              ),
            },

            confirm: getAccvalue(inputs, "create_payment_confirm.option"),

            shipping: {
              address: {
                city: getAccvalue(
                  inputs,
                  "create_paymentintent_shipping.city"
                ),
                country: getAccvalue(
                  inputs,
                  "create_paymentintent_shipping.country"
                ),
                line1: getAccvalue(
                  inputs,
                  "create_paymentintent_shipping.line1"
                ),
                postal_code: getAccvalue(
                  inputs,
                  "create_paymentintent_shipping.postal_code"
                ),
                state: getAccvalue(
                  inputs,
                  "create_paymentintent_shipping.state"
                ),
              },

              name: getAccvalue(
                inputs,
                "create_paymentintent_shipping.name"
              ),
              phone: getAccvalue(
                inputs,
                "create_paymentintent_shipping.phone"
              ),
              tracking_number: getAccvalue(
                inputs,
                "create_paymentintent_shipping.tracking_number"
              ),
            },
          };
        } else if (inputs.operation === "Update PaymentIntent") {
          jsonToSend = {
            ...jsonToSend,
            payment_id: inputs.update_payment_id,
            description: getAccvalue(
              inputs,
              "update_payment_description.option"
            ),
            amount: getAccvalue(inputs, "update_payment_amount.option"),
            currency: getAccvalue(inputs, "update_currency.option"),
            receipt_email: getAccvalue(
              inputs,
              "update_payment_receipt_email.option"
            ),
            customer: getAccvalue(inputs, "update_payment_customer.option"),

            confirm: getAccvalue(inputs, "update_payment_confirm.option"),
            shipping: {
              address: {
                city: getAccvalue(
                  inputs,
                  "update_paymentintent_shipping.city"
                ),
                country: getAccvalue(
                  inputs,
                  "update_paymentintent_shipping.country"
                ),
                line1: getAccvalue(
                  inputs,
                  "update_paymentintent_shipping.line1"
                ),
                postal_code: getAccvalue(
                  inputs,
                  "update_paymentintent_shipping.postal_code"
                ),
                state: getAccvalue(
                  inputs,
                  "update_paymentintent_shipping.state"
                ),
              },

              name: getAccvalue(
                inputs,
                "update_paymentintent_shipping.name"
              ),
              phone: getAccvalue(
                inputs,
                "update_paymentintent_shipping.phone"
              ),
              tracking_number: getAccvalue(
                inputs,
                "update_paymentintent_shipping.tracking_number"
              ),
            },
          };
        }
      } else if (inputs.type === "Coupon") {
        if (inputs.operation === "Create Coupon") {
          jsonToSend = {
            ...jsonToSend,
            percent_off: inputs.create_coupon_percent_off,
            currency: inputs.create_coupon_currency,
            name: inputs.create_coupon_name,
          };
        } else if (inputs.operation === "Get Many Coupons") {
          jsonToSend = {
            ...jsonToSend,
            limit: inputs.get_many_coupons_limit,
          };
        }
      } else if (inputs.type === "Customer") {
        if (inputs.operation === "Get Customer") {
          jsonToSend = {
            ...jsonToSend,
            customer_id: inputs.get_customer_id,
          };
        } else if (inputs.operation === "Get Many Customers") {
          jsonToSend = {
            ...jsonToSend,
            limit: inputs.get_many_customers_limit,
            email: inputs.get_many_customers_email,
          };
        } else if (inputs.operation === "Delete Customer") {
          jsonToSend = {
            ...jsonToSend,
            customer_id: inputs.delete_customer_id,
          };
        } else if (inputs.operation === "Create Customer") {
          jsonToSend = {
            ...jsonToSend,
            name: inputs.create_customer_name,
            email: getAccvalue(inputs, "create_customer_email.option"),

            description: getAccvalue(
              inputs,
              "create_customer_description.option"
            ),
            balance: getAccvalue(inputs, "create_customer_balance.option"),
            phone: getAccvalue(inputs, "create_customer_phone.option"),
            shipping: {
              address: {
                city: getAccvalue(inputs, "create_customer_shipping.city"),
                country: getAccvalue(
                  inputs,
                  "create_customer_shipping.country"
                ),
                line1: getAccvalue(
                  inputs,
                  "create_customer_shipping.country"
                ),
                postal_code: getAccvalue(
                  inputs,
                  "create_customer_shipping.postal_code"
                ),
                state: getAccvalue(inputs, "create_customer_shipping.state"),
              },
              name: getAccvalue(inputs, "create_customer_shipping.name"),
              phone: getAccvalue(inputs, "create_customer_shipping.name"),
            },
            address: {
              city: getAccvalue(inputs, "create_customer_address.city"),
              country: getAccvalue(
                inputs,
                "create_customer_address.country"
              ),
              postal_code: getAccvalue(
                inputs,
                "create_customer_address.postal_code"
              ),
              state: getAccvalue(inputs, "create_customer_address.state"),
            },
          };
        } else if (inputs.operation === "Update Customer") {
          jsonToSend = {
            ...jsonToSend,
            customer_id: inputs.update_customer_id,
            email: getAccvalue(inputs, "update_customer_email.option"),
            name: getAccvalue(inputs, "update_customer_name.option"),
            description: getAccvalue(
              inputs,
              "update_customer_description.option"
            ),
            balance: getAccvalue(inputs, "update_customer_balance.option"),
            phone: getAccvalue(inputs, "update_customer_phone.option"),
            shipping: {
              address: {
                city: getAccvalue(inputs, "update_customer_shipping.city"),
                country: getAccvalue(
                  inputs,
                  "update_customer_shipping.country"
                ),
                line1: getAccvalue(
                  inputs,
                  "update_customer_shipping.country"
                ),
                postal_code: getAccvalue(
                  inputs,
                  "update_customer_shipping.postal_code"
                ),
                state: getAccvalue(inputs, "update_customer_shipping.state"),
              },
              name: getAccvalue(inputs, "update_customer_shipping.name"),
              phone: getAccvalue(inputs, "update_customer_shipping.phone"),
            },

            address: {
              city: getAccvalue(inputs, "update_customer_address.city"),
              country: getAccvalue(
                inputs,
                "update_customer_address.country"
              ),
              postal_code: getAccvalue(
                inputs,
                "update_customer_address.postal_code"
              ),
              state: getAccvalue(inputs, "update_customer_address.state"),
            },
          };
          console.log(jsonToSend);
        }
      }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "stripe_software",
            credential: inputs.cred,
            operation: inputs.operation,
            saveOutputAs: getOutputVariablesByNodeId(selectedNode.id),
        },
    };
    return {
        type: "AppIntegration",
        content: content,
        cred: inputs?.cred,
    };
}