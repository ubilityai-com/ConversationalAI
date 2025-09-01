import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};


    if (inputs.type === "Ticket") {
        if (inputs.operation === "GET TICKET") {
            jsonToSend = {
                ticket_id: inputs.ticketID_GetTicket,
            };
        } else if (inputs.operation === "GET MANY TICKETS") {
            jsonToSend = {
                ...jsonToSend,
                order_by: getAccvalue(inputs, "order_by_Ticket_Get_Many"),
                company_id: getAccvalue(inputs, "company_id_Ticket_Get_Many"),
                requester_id: getAccvalue(
                    inputs,
                    "requester_id_Ticket_Get_Many"
                ),
                email: getAccvalue(inputs, "email_Ticket_Get_Many"),
                order_type: getAccvalue(inputs, "order_type_Ticket_Get_Many"),
                updated_since: getAccvalue(
                    inputs,
                    "updated_since_Ticket_Get_Many"
                ),
            };
            if (
                inputs.hasOwnProperty("include_Ticket_Get_Many") &&
                inputs.include_Ticket_Get_Many?.include &&
                inputs.include_Ticket_Get_Many.include.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    include: inputs.include_Ticket_Get_Many.include
                        .map((item: any) => {
                            return item.value;
                        })
                        .join(","),
                };
            }
        } else if (inputs.operation === "CREATE TICKET") {
            jsonToSend = {
                ...jsonToSend,
                subject: inputs.subject_ticket_create,
                description: inputs.description_ticket_create,
                status:
                    parseInt(inputs.status_ticket_create) ||
                    inputs.status_ticket_create,
                priority:
                    parseInt(inputs.priority_ticket_create) ||
                    inputs.priority_ticket_create,
                source:
                    parseInt(inputs.source_ticket_create) ||
                    inputs.source_ticket_create,
                responder_id: getAccvalue(inputs, "responder_id_ticket_create"),
                company_id: getAccvalue(inputs, "company_id_ticket_create"),
                due_by: getAccvalue(inputs, "due_by_ticket_create"),
                email_config_id: getAccvalue(
                    inputs,
                    "email_config_id_ticket_create"
                ),
                fr_due_by: getAccvalue(inputs, "fr_due_by_ticket_create"),
                group_id: getAccvalue(inputs, "group_id_ticket_create"),
                name: getAccvalue(inputs, "name_ticket_create"),
                product_id: getAccvalue(inputs, "product_id_ticket_create"),
                type: getAccvalue(inputs, "type_ticket_create"),
                cc_emails: inputs.cc_emails_ticket_create.map((cc_email: any) => {
                    return cc_email.emailValue;
                }),
                tags: inputs.tags_ticket_create.map((tag: any) => {
                    return tag.tagName;
                }),
            };

            if (inputs.requester_ticket_create === "requester_id") {
                jsonToSend = {
                    ...jsonToSend,
                    requester_id: inputs.requester_id_ticket_create,
                };
            } else if (inputs.requester_ticket_create === "email") {
                jsonToSend = {
                    ...jsonToSend,
                    email: inputs.email_ticket_create,
                };
            } else if (inputs.requester_ticket_create === "phone") {
                jsonToSend = {
                    ...jsonToSend,
                    phone: inputs.phone_ticket_create,
                };
            } else if (inputs.requester_ticket_create === "facebook_id") {
                jsonToSend = {
                    ...jsonToSend,
                    facebook_id: inputs.facebook_id_ticket_create,
                };
            } else if (inputs.requester_ticket_create === "twitter_id") {
                jsonToSend = {
                    ...jsonToSend,
                    twitter_id: inputs.twitter_id_ticket_create,
                };
            } else if (
                inputs.requester_ticket_create === "unique_external_id"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    unique_external_id: inputs.unique_external_id_ticket_create,
                };
            }
        } else if (inputs.operation === "UPDATE TICKET") {
            jsonToSend = {
                ticket_id: inputs.ticketID_UpdateTicket,
                status:
                    parseInt(getAccvalue(inputs, "status_ticket_update")) ||
                    getAccvalue(inputs, "status_ticket_update"),
                priority:
                    parseInt(getAccvalue(inputs, "priority_ticket_update")) ||
                    getAccvalue(inputs, "priority_ticket_update"),
                source:
                    parseInt(getAccvalue(inputs, "source_ticket_update")) ||
                    getAccvalue(inputs, "source_ticket_update"),
                responder_id: getAccvalue(inputs, "responder_id_ticket_update"),
                email: getAccvalue(inputs, "email_ticket_update.email"),
                company_id: getAccvalue(inputs, "company_id_ticket_update"),
                due_by: getAccvalue(inputs, "due_by_ticket_update.due_by"),
                email_config_id: getAccvalue(
                    inputs,
                    "email_config_id_ticket_update"
                ),
                fr_due_by: getAccvalue(
                    inputs,
                    "fr_due_by_ticket_update.fr_due_by"
                ),
                group_id: getAccvalue(inputs, "group_id_ticket_update"),
                name: getAccvalue(inputs, "name_ticket_update"),
                product_id: getAccvalue(inputs, "product_id_ticket_update"),
                type: getAccvalue(inputs, "type_ticket_update"),
            };
            if (inputs.requester_ticket_update === "requester_id") {
                jsonToSend = {
                    ...jsonToSend,
                    requester_id: inputs.requester_id_ticket_update,
                };
            } else if (inputs.requester_ticket_update === "email") {
                jsonToSend = {
                    ...jsonToSend,
                    email: inputs.email_ticket_update,
                };
            } else if (inputs.requester_ticket_update === "phone") {
                jsonToSend = {
                    ...jsonToSend,
                    phone: inputs.phone_ticket_update,
                };
            } else if (inputs.requester_ticket_update === "facebook_id") {
                jsonToSend = {
                    ...jsonToSend,
                    facebook_id: inputs.facebook_id_ticket_update,
                };
            } else if (inputs.requester_ticket_update === "twitter_id") {
                jsonToSend = {
                    ...jsonToSend,
                    twitter_id: inputs.twitter_id_ticket_update,
                };
            } else if (
                inputs.requester_ticket_update === "unique_external_id"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    unique_external_id: inputs.unique_external_id_ticket_update,
                };
            }
            if (
                inputs.hasOwnProperty("tags_ticket_update") &&
                inputs.tags_ticket_update.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    tags: inputs.tags_ticket_update.map((tag: any) => {
                        return tag.tagName;
                    }),
                };
            }
        } else if (inputs.operation === "DELETE TICKET") {
            jsonToSend = {
                ticket_id: inputs.ticketID_DeleteTicket,
            };
        }
    } else if (inputs.type === "Contact") {
        if (inputs.operation === "GET CONTACT") {
            jsonToSend = {
                contact_id: inputs.contactID_GetContact,
            };
        } else if (inputs.operation === "GET MANY CONTACTS") {
            jsonToSend = {
                ...jsonToSend,
                company_id: getAccvalue(inputs, "company_id_Contact_Get_Many"),
                email: getAccvalue(inputs, "email_Contact_Get_Many"),
                mobile: getAccvalue(inputs, "mobile_Contact_Get_Many"),
                phone: getAccvalue(inputs, "phone_Contact_Get_Many"),
                state: getAccvalue(inputs, "state_Contact_Get_Many"),
                updated_since: getAccvalue(
                    inputs,
                    "updated_since_Contact_Get_Many"
                ),
            };
        } else if (inputs.operation === "CREATE CONTACT") {
            jsonToSend = {
                email: inputs.email_Contact_Create,
                name: getAccvalue(inputs, "name_Contact_Create"),
                address: getAccvalue(inputs, "address_Contact_Create"),
                description: getAccvalue(inputs, "description_Contact_Create"),
                job_title: getAccvalue(inputs, "job_title_Contact_Create"),
                language: getAccvalue(inputs, "language_Contact_Create"),
                mobile: getAccvalue(inputs, "mobile_Contact_Create"),
                phone: getAccvalue(inputs, "phone_Contact_Create"),
                time_zone: getAccvalue(inputs, "time_zone_Contact_Create"),
                twitter_id: getAccvalue(inputs, "twitter_id_Contact_Create"),
                unique_external_id: getAccvalue(
                    inputs,
                    "unique_external_id_Contact_Create"
                ),
                view_all_tickets: getAccvalue(inputs, "view_all_tickets_Contact_Create"),
            };
            if (
                inputs.hasOwnProperty("custom_fields_Contact_Create") &&
                inputs.custom_fields_Contact_Create.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    custom_fields: inputs.custom_fields_Contact_Create.map(
                        (custom_field: any) => {
                            return {
                                [custom_field.key]: custom_field.value,
                            };
                        }
                    ),
                };
            }
            if (
                inputs.hasOwnProperty("other_emails_Contact_Create") &&
                inputs.other_emails_Contact_Create.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    other_emails: inputs.other_emails_Contact_Create.map(
                        (email: any) => {
                            return email.emailValue;
                        }
                    ),
                };
            }
            if (
                inputs.hasOwnProperty("tags_Contact_Create") &&
                inputs.tags_Contact_Create.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    tags: inputs.tags_Contact_Create.map((tag: any) => {
                        return tag.tagName;
                    }),
                };
            }
            if (
                inputs.hasOwnProperty("company_Contact_Create") &&
                inputs.company_Contact_Create.company_id_Contact_Create &&
                inputs.company_Contact_Create.other_company_id_Contact_Create
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    company_id:
                        inputs.company_Contact_Create.company_id_Contact_Create,
                    other_companies: {
                        company_id:
                            inputs.company_Contact_Create
                                .other_company_id_Contact_Create,
                        view_all_tickets:
                            inputs.company_Contact_Create
                                .view_all_tickets_of_other_companies_Contact_Create,
                    },
                };
            } else if (
                inputs.hasOwnProperty("company_Contact_Create") &&
                inputs.company_Contact_Create.company_id_Contact_Create &&
                !inputs.company_Contact_Create.other_company_id_Contact_Create
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    company_id:
                        inputs.company_Contact_Create.company_id_Contact_Create,
                };
            }
        } else if (inputs.operation === "UPDATE CONTACT") {
            jsonToSend = {
                contact_id: inputs.contactID_UpdateContact,
            };
            if (
                inputs.hasOwnProperty("custom_fields_Contact_Update") &&
                inputs.custom_fields_Contact_Update.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    custom_fields: inputs.custom_fields_Contact_Update.map(
                        (custom_field: any) => {
                            return {
                                [custom_field.key]: custom_field.value,
                            };
                        }
                    ),
                };
            }
            if (
                inputs.hasOwnProperty("other_emails_Contact_Update") &&
                inputs.other_emails_Contact_Update.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    other_emails: inputs.other_emails_Contact_Update.map(
                        (email: any) => {
                            return email.emailValue;
                        }
                    ),
                };
            }
            if (
                inputs.hasOwnProperty("tags_Contact_Update") &&
                inputs.tags_Contact_Update.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    tags: inputs.tags_Contact_Update.map((tag: any) => {
                        return tag.tagName;
                    }),
                };
            }
            if (
                inputs.hasOwnProperty("company_Contact_Update") &&
                inputs.company_Contact_Update.company_id_Contact_Update &&
                inputs.company_Contact_Update.other_company_id_Contact_Update
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    company_id:
                        inputs.company_Contact_Update.company_id_Contact_Update,
                    other_companies: {
                        company_id:
                            inputs.company_Contact_Update
                                .other_company_id_Contact_Update,
                        view_all_tickets:
                            inputs.company_Contact_Update
                                .view_all_tickets_of_other_companies_Contact_Update,
                    },
                };
            } else if (
                inputs.hasOwnProperty("company_Contact_Update") &&
                inputs.company_Contact_Update.company_id_Contact_Update &&
                !inputs.company_Contact_Update.other_company_id_Contact_Update
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    company_id:
                        inputs.company_Contact_Update.company_id_Contact_Update,
                };
            }
            jsonToSend = {
                ...jsonToSend,
                email: getAccvalue(inputs, "email_Contact_Update"),
                name: getAccvalue(inputs, "name_Contact_Update"),
                address: getAccvalue(inputs, "address_Contact_Update"),
                description: getAccvalue(inputs, "description_Contact_Update"),
                job_title: getAccvalue(inputs, "job_title_Contact_Update"),
                language: getAccvalue(inputs, "language_Contact_Update"),
                mobile: getAccvalue(inputs, "mobile_Contact_Update"),
                phone: getAccvalue(inputs, "phone_Contact_Update"),
                time_zone: getAccvalue(inputs, "time_zone_Contact_Update"),
                twitter_id: getAccvalue(inputs, "twitter_id_Contact_Update"),
                unique_external_id: getAccvalue(
                    inputs,
                    "unique_external_id_Contact_Update"
                ),
                view_all_tickets: getAccvalue(inputs, "view_all_tickets_Contact_Update"),
            };
        } else if (inputs.operation === "DELETE CONTACT") {
            jsonToSend = {
                contact_id: inputs.contactID_DeleteContact,
            };
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "freshdesk",
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