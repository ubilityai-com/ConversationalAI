import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};


    if (inputs.type === "Contact") {
        if (inputs.operation === "Get Contact") {
            jsonToSend = {
                ...jsonToSend,
                contact_id: inputs.contact_id_GetContact,
                fields: getAccvalue(inputs, "fields_GetContact")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Get Many Contact") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_Get_Many_Contact"),
                fields: getAccvalue(inputs, "fields_Get_Many_Contact")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Create Contact") {
            jsonToSend = {
                ...jsonToSend,
                name: inputs.name_CreateContact,
                email: getAccvalue(inputs, "email_CreateContact"),
                phone: getAccvalue(inputs, "phone_CreateContact"),
                mobile: getAccvalue(inputs, "mobile_CreateContact"),
                website: getAccvalue(inputs, "website_CreateContact"),
                comment: getAccvalue(inputs, "comment_CreateContact"),
                function: getAccvalue(inputs, "function_CreateContact"),
                vat: getAccvalue(inputs, "vat_CreateContact"),
                city: getAccvalue(inputs, "city_CreateContact"),
                street: getAccvalue(inputs, "street_CreateContact"),
                street2: getAccvalue(inputs, "street2_CreateContact"),
                zip: getAccvalue(inputs, "zip_CreateContact"),
                country_id:
                    parseInt(getAccvalue(inputs, "country_id_CreateContact")) ||
                    getAccvalue(inputs, "country_id_CreateContact"),
                state_id:
                    parseInt(getAccvalue(inputs, "state_id_CreateContact")) ||
                    getAccvalue(inputs, "state_id_CreateContact"),
            };
        } else if (inputs.operation === "Update Contact") {
            jsonToSend = {
                contact_id: inputs.contact_id_UpdateContact,
                name: getAccvalue(inputs, "name_UpdateContact"),
                email: getAccvalue(inputs, "email_UpdateContact"),
                phone: getAccvalue(inputs, "phone_UpdateContact"),
                mobile: getAccvalue(inputs, "mobile_UpdateContact"),
                website: getAccvalue(inputs, "website_UpdateContact"),
                comment: getAccvalue(inputs, "comment_UpdateContact"),
                function: getAccvalue(inputs, "function_UpdateContact"),
                vat: getAccvalue(inputs, "vat_UpdateContact"),
                city: getAccvalue(inputs, "city_UpdateContact"),
                street: getAccvalue(inputs, "street_UpdateContact"),
                street2: getAccvalue(inputs, "street2_UpdateContact"),
                zip: getAccvalue(inputs, "zip_UpdateContact"),
                country_id:
                    parseInt(getAccvalue(inputs, "country_id_UpdateContact")) ||
                    getAccvalue(inputs, "country_id_UpdateContact"),
                state_id:
                    parseInt(getAccvalue(inputs, "state_id_UpdateContact")) ||
                    getAccvalue(inputs, "state_id_UpdateContact"),
            };
        } else if (inputs.operation === "Delete Contact") {
            jsonToSend = {
                contact_id:
                    parseInt(inputs.contact_id_DeleteContact) ||
                    inputs.contact_id_DeleteContact,
            };
        }
    } else if (inputs.type === "Company") {
        if (inputs.operation === "Get Company") {
            jsonToSend = {
                ...jsonToSend,
                company_id: inputs.company_id_GetCompany,
                fields: getAccvalue(inputs, "fields_GetCompany")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Get Many Company") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_Get_Many_Company"),
                fields: getAccvalue(inputs, "fields_Get_Many_Company")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Create Company") {
            jsonToSend = {
                ...jsonToSend,
                name: inputs.name_CreateCompany,
                email: getAccvalue(inputs, "email_CreateCompany"),
                phone: getAccvalue(inputs, "phone_CreateCompany"),
                mobile: getAccvalue(inputs, "mobile_CreateCompany"),
                website: getAccvalue(inputs, "website_CreateCompany"),
                vat: getAccvalue(inputs, "vat_CreateCompany"),
                city: getAccvalue(inputs, "city_CreateCompany"),
                street: getAccvalue(inputs, "street_CreateCompany"),
                street2: getAccvalue(inputs, "street2_CreateCompany"),
                zip: getAccvalue(inputs, "zip_CreateCompany"),
                country_id:
                    parseInt(getAccvalue(inputs, "country_id_CreateCompany")) ||
                    getAccvalue(inputs, "country_id_CreateCompany"),
                state_id:
                    parseInt(getAccvalue(inputs, "state_id_CreateCompany")) ||
                    getAccvalue(inputs, "state_id_CreateCompany"),
            };
        } else if (inputs.operation === "Update Company") {
            jsonToSend = {
                company_id: inputs.company_id_UpdateCompany,
                name: getAccvalue(inputs, "name_UpdateCompany"),
                email: getAccvalue(inputs, "email_UpdateCompany"),
                phone: getAccvalue(inputs, "phone_UpdateCompany"),
                mobile: getAccvalue(inputs, "mobile_UpdateCompany"),
                website: getAccvalue(inputs, "website_UpdateCompany"),
                vat: getAccvalue(inputs, "vat_UpdateCompany"),
                city: getAccvalue(inputs, "city_UpdateCompany"),
                street: getAccvalue(inputs, "street_UpdateCompany"),
                street2: getAccvalue(inputs, "street2_UpdateCompany"),
                zip: getAccvalue(inputs, "zip_UpdateCompany"),
                country_id:
                    parseInt(getAccvalue(inputs, "country_id_UpdateCompany")) ||
                    getAccvalue(inputs, "country_id_UpdateCompany"),
                state_id:
                    parseInt(getAccvalue(inputs, "state_id_UpdateCompany")) ||
                    getAccvalue(inputs, "state_id_UpdateCompany"),
            };
        }
    } else if (inputs.type === "Custom Resource") {
        if (inputs.operation === "Get Custom Resource") {
            jsonToSend = {
                ...jsonToSend,
                customResource_id: inputs.id_GetCustomResource,
                fields: inputs.fields_GetCustomResource?.map((fieldGet:any) => {
                    return fieldGet.fields_GetCustom;
                }),
            };
        } else if (inputs.operation === "Get Many Custom Resource") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_Get_Many_CustomResource"),
                fields: inputs.fields_GetManyCustomResource?.map((fieldGet:any) => {
                    return fieldGet.fields_GetManyCustom;
                }),
            };
        } else if (inputs.operation === "Create Custom Resource") {
            let customFields = {};
            inputs.customFields_CreateCustomResource.map((fieldCustom:any) => {
                customFields = {
                    ...customFields,
                    [fieldCustom.keyFields]: fieldCustom.valueFields,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
        } else if (inputs.operation === "Update Custom Resource") {
            let customFields = {};
            inputs.customFields_UpdateCustomResource.map((fieldCustom:any) => {
                customFields = {
                    ...customFields,
                    [fieldCustom.keyFields]: fieldCustom.valueFields,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
                customResource_id: inputs.id_UpdateCustomResource,
            };
        } else if (inputs.operation === "Delete Custom Resource") {
            jsonToSend = {
                ...jsonToSend,
                customResource_id: parseInt(inputs.id_DeleteCustomResource),
            };
        }
        jsonToSend = {
            ...jsonToSend,
            model: inputs.model_CustomResource,
        };
    } else if (inputs.type === "Opportunity") {
        if (inputs.operation === "Get Opportunity") {
            jsonToSend = {
                ...jsonToSend,
                opportunity_id: inputs.opportunity_id_GetOpportunity,
                fields: getAccvalue(inputs, "fields_GetOpportunity")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Get Many Opportunity") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_Get_Many_Opportunity"),
                fields: getAccvalue(inputs, "fields_Get_Many_Opportunity")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Create Opportunity") {
            jsonToSend = {
                ...jsonToSend,
                name: inputs.name_CreateOpportunity,
                partner_id:
                    parseInt(
                        getAccvalue(inputs, "partner_id_CreateOpportunity")
                    ) || getAccvalue(inputs, "partner_id_CreateOpportunity"),
                user_id:
                    parseInt(getAccvalue(inputs, "user_id_CreateOpportunity")) ||
                    getAccvalue(inputs, "user_id_CreateOpportunity"),
                expected_revenue: getAccvalue(
                    inputs,
                    "expected_revenue_CreateOpportunity"
                ),
                recurring_revenue_monthly: getAccvalue(
                    inputs,
                    "recurring_revenue_monthly_CreateOpportunity"
                ),
                description: getAccvalue(
                    inputs,
                    "description_CreateOpportunity"
                ),
                phone: getAccvalue(inputs, "phone_CreateOpportunity"),

                probability: getAccvalue(
                    inputs,
                    "probability_CreateOpportunity"
                ),
                date_deadline: getAccvalue(
                    inputs,
                    "date_deadline_CreateOpportunity"
                ),
                tag_ids: getAccvalue(inputs, "tag_ids_CreateOpportunity"),
            };
            if (inputs.priority_CreateOpportunity != "None") {
                jsonToSend = {
                    ...jsonToSend,
                    priority: getAccvalue(inputs, "priority_CreateOpportunity"),
                };
            }
        } else if (inputs.operation === "Update Opportunity") {
            jsonToSend = {
                opportunity_id: inputs.opportunity_id_UpdateOpportunity,
                name: getAccvalue(inputs, "name_UpdateOpportunity"),
                expected_revenue: getAccvalue(
                    inputs,
                    "expected_revenue_UpdateOpportunity"
                ),
                description: getAccvalue(
                    inputs,
                    "description_UpdateOpportunity"
                ),
                phone: getAccvalue(inputs, "phone_UpdateOpportunity"),
                probability: getAccvalue(
                    inputs,
                    "probability_UpdateOpportunity"
                ),
                date_deadline: getAccvalue(
                    inputs,
                    "date_deadline_UpdateOpportunity"
                ),
            };
            if (inputs.priority_UpdateOpportunity != "None") {
                jsonToSend = {
                    ...jsonToSend,
                    priority: getAccvalue(inputs, "priority_UpdateOpportunity"),
                };
            }
        } else if (inputs.operation === "Delete Opportunity") {
            jsonToSend = {
                opportunity_id: parseInt(
                    inputs.opportunity_id_DeleteOpportunity ||
                    inputs.opportunity_id_DeleteOpportunity
                ),
            };
        }
    } else if (inputs.type === "User") {
        if (inputs.operation === "Get User") {
            jsonToSend = {
                ...jsonToSend,
                user_id: inputs.user_id_GetUser,
                fields: getAccvalue(inputs, "fields_GetUser")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Get Many User") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_Get_Many_User"),
                fields: getAccvalue(inputs, "fields_Get_Many_User")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Create User") {
            jsonToSend = {
                name: inputs.name_CreateUser,
                login: inputs.email_CreateUser,
            };
        } else if (inputs.operation === "Update User") {
            jsonToSend = {
                user_id: inputs.user_id_UpdateUser,
                name: getAccvalue(inputs, "name_UpdateUser"),
                login: getAccvalue(inputs, "email_UpdateUser"),
            };
        } else if (inputs.operation === "Delete User") {
            jsonToSend = {
                user_id:
                    parseInt(inputs.user_id_DeleteUser) ||
                    inputs.user_id_DeleteUser,
            };
        }
    } else if (inputs.type === "Sales Team") {
        if (inputs.operation === "Get Sales Team") {
            jsonToSend = {
                ...jsonToSend,
                sales_team_id: inputs.sales_team_id_GetSalesTeam,
                fields: getAccvalue(inputs, "fields_GetSalesTeam")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Get Many Sales Team") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_Get_Many_SalesTeam"),
                fields: getAccvalue(inputs, "fields_Get_Many_SalesTeam")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Create Sales Team") {
            jsonToSend = {
                name: inputs.name_CreateSalesTeam,
                user_id:
                    parseInt(getAccvalue(inputs, "user_id_CreateSalesTeam")) ||
                    getAccvalue(inputs, "user_id_CreateSalesTeam"),
                alias_name: getAccvalue(inputs, "alias_name_CreateSalesTeam"),
                alias_contact: getAccvalue(
                    inputs,
                    "alias_contact_CreateSalesTeam"
                ),
            };
        } else if (inputs.operation === "Update Sales Team") {
            jsonToSend = {
                sales_team_id: inputs.sales_team_id_UpdateSalesTeam,
                name: getAccvalue(inputs, "name_UpdateSalesTeam"),
                alias_name: getAccvalue(inputs, "alias_name_UpdateSalesTeam"),
            };
            if (inputs.alias_contact_UpdateSalesTeam != "None") {
                jsonToSend = {
                    ...jsonToSend,
                    alias_contact: getAccvalue(
                        inputs,
                        "alias_contact_UpdateSalesTeam"
                    ),
                };
            }
        } else if (inputs.operation === "Delete Sales Team") {
            jsonToSend = {
                sales_team_id:
                    parseInt(inputs.sales_team_id_DeleteSalesTeam) ||
                    inputs.sales_team_id_DeleteSalesTeam,
            };
        }
    } else if (inputs.type === "Sales Team Member") {
        if (inputs.operation === "Get Sales Team Member") {
            jsonToSend = {
                ...jsonToSend,
                crm_team_id: inputs.crm_team_id_GetSalesTeamMember,
                fields: getAccvalue(inputs, "fields_GetSalesTeamMember")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Get Many Sales Team Member") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_Get_Many_SalesTeamMember"),
                fields: getAccvalue(
                    inputs,
                    "fields_Get_Many_SalesTeamMember"
                )?.map((fields:any) => fields.value),
            };
        } else if (inputs.operation === "Create Sales Team Member") {
            jsonToSend = {
                crm_team_id: inputs.sales_team_id_CreateSalesTeamMember,
                user_id: inputs.user_id_CreateSalesTeamMember,
            };
        } else if (inputs.operation === "Delete Sales Team Member") {
            jsonToSend = {
                crm_team_id: inputs.crm_team_id_DeleteSalesTeamMember,
            };
        }
    } else if (inputs.type === "Sales Orders") {
        if (inputs.operation === "Get Sales Orders") {
            jsonToSend = {
                ...jsonToSend,
                order_id: inputs.order_id_Get_SalesOrders,
                fields: getAccvalue(inputs, "fields_Get_SalesOrders")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Get Many Sales Orders") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_Get_Many_SalesOrders"),
                fields: getAccvalue(inputs, "fields_Get_Many_SalesOrders")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Create Sales Orders") {
            jsonToSend = {
                ...jsonToSend,
                partner_id: inputs.partner_id_CreateSalesOrders,
                user_id: inputs.user_id_CreateSalesOrders,
                note: getAccvalue(inputs, "note_CreateSalesOrders"),
                order_lines_data: inputs.order_line_CreateSalesOrders?.map(
                    (OrderLine:any) => {
                        return {
                            product_id: parseInt(OrderLine.product_id_CreateSalesOrders),
                            product_uom_qty: OrderLine.product_uom_qty_CreateSalesOrders,
                        };
                    }
                ),
            };
        } else if (inputs.operation === "Update Sales Orders") {
            jsonToSend = {
                order_id: inputs.order_id_UpdateSalesOrders,
                order_lines_data: inputs.order_line_UpdateSalesOrders?.map(
                    (OrderLine:any) => {
                        return {
                            product_id: parseInt(OrderLine.product_id_UpdateSalesOrders),
                            product_uom_qty: OrderLine.product_uom_qty_UpdateSalesOrders,
                        };
                    }
                ),
                note: getAccvalue(inputs, "note_UpdateSalesOrders"),
            };
        } else if (inputs.operation === "Delete Sales Orders") {
            jsonToSend = {
                order_id:
                    parseInt(inputs.order_id_DeleteSalesOrders) ||
                    inputs.order_id_DeleteSalesOrders,
            };
        }
    } else if (inputs.type === "Product") {
        if (inputs.operation === "Get Product") {
            jsonToSend = {
                ...jsonToSend,
                product_id: inputs.product_id_Get_Product,
                fields: getAccvalue(inputs, "fields_Get_Product")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Get Many Product") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_Get_Many_Product"),
                fields: getAccvalue(inputs, "fields_Get_Many_Product")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Create Product") {
            jsonToSend = {
                ...jsonToSend,
                name: inputs.name_CreateProduct,
                standard_price: getAccvalue(
                    inputs,
                    "standard_price_CreateProduct"
                ),
                list_price: getAccvalue(inputs, "list_price_CreateProduct"),
                description: getAccvalue(inputs, "note_CreateProduct"),
            };
        } else if (inputs.operation === "Update Product") {
            jsonToSend = {
                ...jsonToSend,
                product_id: inputs.product_id_UpdateProduct,
                name: getAccvalue(inputs, "name_UpdateProduct"),
                standard_price: getAccvalue(
                    inputs,
                    "standard_price_UpdateProduct"
                ),
                list_price: getAccvalue(inputs, "list_price_UpdateProduct"),
                description: getAccvalue(inputs, "note_UpdateProduct"),
            };
        } else if (inputs.operation === "Delete Product") {
            jsonToSend = {
                product_id:
                    parseInt(inputs.product_id_DeleteProduct) ||
                    inputs.product_id_DeleteProduct,
            };
        }
    } else if (inputs.type === "Product Category") {
        if (inputs.operation === "Get Product Category") {
            jsonToSend = {
                ...jsonToSend,
                category_id: inputs.category_id_GetProductCategory,
                fields: getAccvalue(inputs, "fields_Get_ProductCategory")?.map(
                    (fields:any) => fields.value
                ),
            };
        } else if (inputs.operation === "Get Many Product Category") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_Get_Many_ProductCategory"),
                fields: getAccvalue(
                    inputs,
                    "fields_Get_Many_ProductCategory"
                )?.map((fields:any) => fields.value),
            };
        } else if (inputs.operation === "Create Product Category") {
            jsonToSend = {
                ...jsonToSend,
                name: inputs.name_CreateProductCategory,
            };
        } else if (inputs.operation === "Update Product Category") {
            jsonToSend = {
                ...jsonToSend,
                category_id: inputs.category_id_UpdateProductCategory,
                name: getAccvalue(inputs, "name_UpdateProductCategory"),
            };
        } else if (inputs.operation === "Delete Product Category") {
            jsonToSend = {
                category_id: inputs.category_id_DeleteProductCategory,
            };
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "odoo",
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