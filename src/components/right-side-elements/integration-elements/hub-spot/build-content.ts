import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

const checkValueIfNone = (inputs: Record<string, any>, name: string) => {
    if (name.includes(".")) {
        const properties = name.split(".");
        const firstPart = properties[0];
        const secondPart = properties[1];
        return inputs[firstPart]
            ? inputs[firstPart][secondPart]
                ? inputs[firstPart][secondPart] === "none"
                    ? undefined
                    : inputs[firstPart][secondPart]
                : undefined
            : undefined;
    } else
        return inputs[name]
            ? inputs[name][name] === "none"
                ? undefined
                : inputs[name][name]
            : undefined;
};
export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "Contact") {
        if (inputs.operation === "Get Contact") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.id_contacts,
                properties: getAccvalue(inputs, "get_contact_properties")?.map(
                    (fields: any) => fields.value
                ),
            };
        } else if (inputs.operation === "Delete Contact") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.id_contacts,
            };
        } else if (inputs.operation === "Create Contact") {
            jsonToSend = {
                ...jsonToSend,
                properties: {
                    email: inputs.create_contact_email,
                    lifecyclestage: checkValueIfNone(
                        inputs,
                        "create_contact_lifecyclestage.option"
                    ),
                    city: getAccvalue(inputs, "create_contact_city.option"),
                    company: getAccvalue(inputs, "create_contact_company.option"),
                    country: getAccvalue(inputs, "create_contact_country.option"),
                    website: getAccvalue(inputs, "create_contact_website.option"),
                    work_email: getAccvalue(
                        inputs,
                        "create_contact_work_email.option"
                    ),
                    field_of_study: getAccvalue(
                        inputs,
                        "create_contact_field_of_study.option"
                    ),
                    firstname: getAccvalue(
                        inputs,
                        "create_contact_firstname.option"
                    ),
                    lastname: getAccvalue(
                        inputs,
                        "create_contact_lastname.option"
                    ),
                    industry: getAccvalue(
                        inputs,
                        "create_contact_industry.option"
                    ),
                    job_function: getAccvalue(
                        inputs,
                        "create_contact_job_function.option"
                    ),
                    jobtitle: getAccvalue(
                        inputs,
                        "create_contact_job_title.option"
                    ),
                    message: getAccvalue(inputs, "create_contact_message.option"),
                    mobilephone: getAccvalue(
                        inputs,
                        "create_contact_phone_number.option"
                    ),
                    numemployees: checkValueIfNone(
                        inputs,
                        "create_contact_number_of_employees.option"
                    ),
                    zip: getAccvalue(inputs, "create_contact_postal_code.option"),
                    relationship_status: getAccvalue(
                        inputs,
                        "create_contact_relationship_status.option"
                    ),
                    seniority: getAccvalue(
                        inputs,
                        "create_contact_seniority.option"
                    ),
                    fax: getAccvalue(inputs, "create_contact_fax_number.option"),
                    date_of_birth: getAccvalue(
                        inputs,
                        "create_contact_two_fields.date_of_birth"
                    ),
                    gender: checkValueIfNone(
                        inputs,
                        "create_contact_two_fields.gender"
                    ),
                    hs_lead_status: checkValueIfNone(
                        inputs,
                        "create_contact_lead_status_name.option"
                    ),
                },
            };
        }
    } else if (inputs.type === "Deal") {
        if (inputs.operation === "Get Deal") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.id_deals,
                properties: getAccvalue(inputs, "get_deal_properties")?.map(
                    (fields: any) => fields.value
                ),
            };
        } else if (inputs.operation === "Delete Deal") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.id_deals,
            };
        } else if (inputs.operation === "Create Deal") {
            jsonToSend = {
                ...jsonToSend,
                properties: {
                    dealname: inputs.create_deal_name,
                    description: getAccvalue(
                        inputs,
                        "create_deal_description.option"
                    ),
                    amount: getAccvalue(inputs, "create_deal_amount.option"),
                    dealtype: checkValueIfNone(inputs, "create_deal_type.option"),
                    dealstage: checkValueIfNone(inputs, "create_deal_stage.option"),
                },
                dealCreateTime: getAccvalue(
                    inputs,
                    "create_deal_createdate.optionTime"
                ),
                dealCreateDate: getAccvalue(
                    inputs,
                    "create_deal_createdate.optionDate"
                ),
                dealCloseTime: getAccvalue(
                    inputs,
                    "create_deal_closedate.optionTime"
                ),
                dealCloseDate: getAccvalue(
                    inputs,
                    "create_deal_closedate.optionDate"
                ),
            };
        }
    } else if (inputs.type === "Ticket") {
        if (inputs.operation === "Get Ticket") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.id_tickets,
                properties: getAccvalue(inputs, "get_ticket_properties")?.map(
                    (fields: any) => fields.value
                ),
            };
        } else if (inputs.operation === "Delete Ticket") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.id_tickets,
            };
        } else if (inputs.operation === "Create Ticket") {
            jsonToSend = {
                ...jsonToSend,
                properties: {
                    hs_pipeline_stage: inputs.create_ticket_pipeline_stage,
                    subject: inputs.create_ticket_subject,
                    hs_ticket_priority: checkValueIfNone(
                        inputs,
                        "create_ticket_priority.option"
                    ),
                    hs_ticket_category: checkValueIfNone(
                        inputs,
                        "create_ticket_category.option"
                    ),
                    hs_pipeline: checkValueIfNone(
                        inputs,
                        "create_ticket_pipeline.option"
                    ),
                },
                ticketCreateTime: getAccvalue(
                    inputs,
                    "create_ticket_createdate.optionTime"
                ),
                ticketCreateDate: getAccvalue(
                    inputs,
                    "create_ticket_createdate.optionDate"
                ),
            };
        }
    } else if (inputs.type === "Engagements_Call") {
        if (inputs.operation === "Get Call") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.id_calls,
            };
        } else if (inputs.operation === "Create Call") {
            jsonToSend = {
                ...jsonToSend,
                metadata: {
                    body: getAccvalue(inputs, "create_call_body"),
                    durationMilliseconds: getAccvalue(
                        inputs,
                        "create_call_duration"
                    ),
                    fromNumber: getAccvalue(inputs, "create_call_fromNumber"),
                    recordingUrl: getAccvalue(inputs, "create_call_recordingUrl"),
                    status: checkValueIfNone(inputs, "create_call_status"),
                    toNumber: getAccvalue(inputs, "create_call_to_number"),
                    title: getAccvalue(inputs, "create_call_title"),
                    direction: checkValueIfNone(inputs, "create_call_direction"),
                    disposition: getAccvalue(inputs, "create_call_disposition"),
                },
                associations: {
                    contactIds: inputs.contactIds?.map((contact: any) => {
                        return contact.contactId_associations_create_call;
                    }),
                    companyIds: inputs.companyIds?.map((company: any) => {
                        return company.companyId_associations_create_call;
                    }),
                    dealIds: inputs.dealIds?.map((deal: any) => {
                        return deal.dealId_associations_create_call;
                    }),
                    ticketIds: inputs.ticketIds?.map((ticket: any) => {
                        return ticket.ticketId_associations_create_call;
                    }),
                },
                engagement: {
                    timestamp: getAccvalue(inputs, "create_call_timestamp"),
                    type: "CALL",
                },
            };
        } else if (inputs.operation === "Delete Call") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.id_calls,
            };
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "hubspot_software",
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