import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "Customer") {
        if (inputs.operation === "Get Customer By Id") {
          jsonToSend = {
            id: inputs.customer_id_Get_Customer,
          };
        } else if (inputs.operation === "Create Customer") {
          jsonToSend = {
            first_name: inputs.first_name_CreateCustomer,
            last_name: inputs.last_name_CreateCustomer,
            email: inputs.email_CreateCustomer,
            phone: inputs.phone_CreateCustomer,
            note: getAccvalue(inputs, "note_CreateCustomer"),
            tags: getAccvalue(inputs, "tags_CreateCustomer"),
            accepts_marketing: getAccvalue(
              inputs,
              "accepts_marketing_CreateCustomer"
            ),
            tax_exempt: getAccvalue(inputs, "tax_exempt_CreateCustomer"),
            send_email_invite: getAccvalue(
              inputs,
              "send_email_invite_CreateCustomer"
            ),
            addresses: [
              {
                first_name: getAccvalue(
                  inputs,
                  "addressInfo_CreateCustomer.first_name_addresses_CreateCustomer"
                ),

                last_name: getAccvalue(
                  inputs,
                  "addressInfo_CreateCustomer.last_name_addresses_CreateCustomer"
                ),
                address1: getAccvalue(
                  inputs,
                  "addressInfo_CreateCustomer.address1_addresses_CreateCustomer"
                ),
                address2: getAccvalue(
                  inputs,
                  "addressInfo_CreateCustomer.address2_addresses_CreateCustomer"
                ),
                city: getAccvalue(
                  inputs,
                  "addressInfo_CreateCustomer.city_addresses_CreateCustomer"
                ),

                zip: getAccvalue(
                  inputs,
                  "addressInfo_CreateCustomer.zip_addresses_CreateCustomer"
                ),
                country: getAccvalue(
                  inputs,
                  "addressInfo_CreateCustomer.country_addresses_CreateCustomer"
                ),
                province: getAccvalue(
                  inputs,
                  "addressInfo_CreateCustomer.province_addresses_CreateCustomer"
                ),
                phone: getAccvalue(
                  inputs,
                  "addressInfo_CreateCustomer.phone_addresses_CreateCustomer"
                ),
              },
            ],
          };
        }
      } else if (inputs.type === "Order") {
        if (inputs.operation === "Get Order By Id") {
          jsonToSend = {
            id: inputs.order_id_GetOrder,
          };
        } else if (inputs.operation === "Create Order") {
            jsonToSend = {
              ...jsonToSend,
              line_items: inputs.LineItems?.map((LineItem:any) => {
                return {
                  title: LineItem.Product_Name_LineItems_CreateOrder,
                  variant_title: LineItem.Product_Variant_LineItems_CreateOrder,
                  price: LineItem.price_LineItems_CreateOrder,
                  grams: LineItem.grams_LineItems_CreateOrder,
                  quantity: LineItem.quantity_LineItems_CreateOrder,
                };
              }),
              email: getAccvalue(inputs, "email_CreateOrder"),
              note: getAccvalue(inputs, "note_CreateOrder"),
              tags: getAccvalue(inputs, "tags_CreateOrder"),
              source_name: getAccvalue(inputs, "source_name_CreateOrder"),
              send_receipt: getAccvalue(inputs, "send_receipt_CreateOrder"),
              send_fulfillment_receipt: getAccvalue(
                inputs,
                "send_fulfillment_receipt_CreateOrder"
              ),
              inventory_behaviour: getAccvalue(
                inputs,
                "InventoryBehaviour_CreateOrder.type_InventoryBehaviour"
              ),

              financial_status: getAccvalue(
                inputs,
                "FinancialStatus_CreateOrder.type_FinancialStatus"
              ),
              shipping_address: {
                first_name: getAccvalue(
                  inputs,
                  "shippingAddresses.first_name_shippingAddresses_CreateOrder"
                ),
                last_name: getAccvalue(
                  inputs,
                  "shippingAddresses.last_name_shippingAddresses_CreateOrder"
                ),
                address1: getAccvalue(
                  inputs,
                  "shippingAddresses.address1_shippingAddresses_CreateOrder"
                ),
                address2: getAccvalue(
                  inputs,
                  "shippingAddresses.address2_shippingAddresses_CreateOrder"
                ),
                city: getAccvalue(
                  inputs,
                  "shippingAddresses.city_shippingAddresses_CreateOrder"
                ),
                zip: getAccvalue(
                  inputs,
                  "shippingAddresses.zip_shippingAddresses_CreateOrder"
                ),
                country: getAccvalue(
                  inputs,
                  "shippingAddresses.country_shippingAddresses_CreateOrder"
                ),
                province: getAccvalue(
                  inputs,
                  "shippingAddresses.province_shippingAddresses_CreateOrder"
                ),
                phone: getAccvalue(
                  inputs,
                  "shippingAddresses.phone_shippingAddresses_CreateOrder"
                ),
              },
              billing_address: {
                first_name: getAccvalue(
                  inputs,
                  "BillingAddresses.first_name_BillingAddresses_CreateOrder"
                ),
                last_name: getAccvalue(
                  inputs,
                  "BillingAddresses.last_name_BillingAddresses_CreateOrder"
                ),
                address1: getAccvalue(
                  inputs,
                  "BillingAddresses.address1_BillingAddresses_CreateOrder"
                ),
                address2: getAccvalue(
                  inputs,
                  "BillingAddresses.address2_BillingAddresses_CreateOrder"
                ),
                city: getAccvalue(
                  inputs,
                  "BillingAddresses.city_BillingAddresses_CreateOrder"
                ),
                zip: getAccvalue(inputs, "zip_BillingAddresses_CreateOrder"),
                country: getAccvalue(
                  inputs,
                  "BillingAddresses.country_BillingAddresses_CreateOrder"
                ),
                province: getAccvalue(
                  inputs,
                  "BillingAddresses.province_BillingAddresses_CreateOrder"
                ),
                phone: getAccvalue(
                  inputs,
                  "BillingAddresses.phone_BillingAddresses_CreateOrder"
                ),
              },
              location_id: getAccvalue(
                inputs,
                "location_id_CreateOrder"
              ),
              discount_codes: [
                {
                  code: getAccvalue(
                    inputs,
                    "discountCodes.code_CreateOrder"
                  ),
                  amount: getAccvalue(
                    inputs,
                    "discountCodes.amount_CreateOrder"
                  ),
                  type: getAccvalue(
                    inputs,
                    "discountCodes.type_discountCodes"
                  ),
                },
              ],
            };
            if (
              inputs.FulfillmentStatus_CreateOrder.type_FulfillmentStatus !=
              "null"
            ) {
              jsonToSend = {
                ...jsonToSend,
                fulfillment_status: getAccvalue(
                  inputs,
                  "FulfillmentStatus_CreateOrder.type_FulfillmentStatus"
                ),
              };
            }
        } else if (inputs.operation === "Delete Order") {
          jsonToSend = {
            id: inputs.order_id_DeleteOrder,
          };
        }
      } else if (inputs.type === "Product") {
        if (inputs.operation === "Get Product") {
          jsonToSend = {
            ...jsonToSend,
            product_id: inputs.product_id_Get_Product,
          };
        } else if (inputs.operation === "Create Product") {
          jsonToSend = {
            ...jsonToSend,
            title: inputs.title_CreateProduct,
            product_type: getAccvalue(inputs, "product_type_CreateProduct"),
            vendor: getAccvalue(inputs, "vendor_CreateProduct"),
            body_html: getAccvalue(inputs, "body_html_CreateProduct"),
            tags: getAccvalue(inputs, "tags_CreateProduct"),
            published_scope: getAccvalue(
              inputs,
              "published_scope_CreateProduct"
            ),
            published_at: getAccvalue(inputs, "published_at_CreateProduct"),
            sku: getAccvalue(inputs, "sku_CreateProduct"),
          };
          if (inputs.ImageURL.length > 0) {
            jsonToSend = {
              ...jsonToSend,
              images: inputs.ImageURL?.map((image:any) => {
                return { src: image.src_image_ImageURL_CreateProduct };
              }),
            };
          }
        } else if (inputs.operation === "Delete Product") {
          jsonToSend = {
            ...jsonToSend,
            product_id: inputs.product_id_DeleteProduct,
          };
        }
      } else if (inputs.type === "Product Variant") {
        if (inputs.operation === "Get Variant Product") {
          jsonToSend = {
            ...jsonToSend,
            id: inputs.product_id_GetVariantProduct,
          };
        } else if (inputs.operation === "Create Variant Product") {
          jsonToSend = {
            ...jsonToSend,
            id: inputs.product_id_CreateVariantProduct,
            option1: inputs.title_CreateVariantProduct,
            inventory_policy: getAccvalue(
              inputs,
              "inventory_policy_CreateVariantProduct"
            ),

            price: getAccvalue(inputs, "price_CreateVariantProduct"),
            compare_at_price: getAccvalue(
              inputs,
              "compare_at_price_CreateVariantProduct"
            ),
            sku: getAccvalue(inputs, "sku_CreateVariantProduct"),
          };
        }
      } else if (inputs.type === "Inventory Quantity") {
        if (inputs.operation === "Update Inventory Quantity") {
          jsonToSend = {
            ...jsonToSend,
            location_id: inputs.location_id_InventoryQuantity,
            inventory_item_id: inputs.inventory_item_id_InventoryQuantity,
            available: inputs.available_InventoryQuantity,
          };
        }
      } else if (inputs.type === "Blog Articles") {
        if (inputs.operation === "Create Blog Articles") {
          jsonToSend = {
            ...jsonToSend,
            blog_id: inputs.id_blog_articles,
            title: inputs.title_blog_articles,
            author: inputs.author_blog_articles,
            body_html: inputs.body_html_blog_articles,
            image: { src: getAccvalue(inputs, "src_image_blog_articles") },
            summary_html: getAccvalue(inputs, "summary_html_blog_articles"),
            tags: getAccvalue(inputs, "tags_blog_articles"),
          };
        }
      }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "shopify",
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