import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";
 const checkValueIfNone = (inputs:Record<string,any>, name:string) => {
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


    if (inputs.type === "Account") {
        if (inputs.operation === "Get Account") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.accountId,
            };
        } else if (inputs.operation === "List Accounts") {
            jsonToSend = {
                ...jsonToSend,
                fields: getAccvalue(inputs, "fields_list_accounts.fields"),
            };
            if (
                inputs.hasOwnProperty("conditions_list_accounts") &&
                inputs.conditions_list_accounts.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    conditions: inputs.conditions_list_accounts.map((cdt: any) => {
                        return cdt.conditions;
                    }),
                };
            }
        } else if (inputs.operation === "Get Account Summary") {
        } else if (inputs.operation === "Craete Account" || inputs.operation === "Create Account") {
            jsonToSend = {
                ...jsonToSend,
                name: inputs.name,
                AccountNumber: getAccvalue(
                    inputs,
                    "AccountNumber_create_account.AccountNumber"
                ),
                AnnualRevenue: getAccvalue(
                    inputs,
                    "AnnualRevenue_create_account.AnnualRevenue"
                ),
                BillingCity: getAccvalue(
                    inputs,
                    "BillingCity_create_account.BillingCity"
                ),
                BillingCountry: getAccvalue(
                    inputs,
                    "BillingCountry_create_account.BillingCountry"
                ),
                BillingPostalCode: getAccvalue(
                    inputs,
                    "BillingPostalCode_create_account.BillingPostalCode"
                ),
                BillingState: getAccvalue(
                    inputs,
                    "BillingState_create_account.BillingState"
                ),
                BillingStreet: getAccvalue(
                    inputs,
                    "BillingStreet_create_account.BillingStreet"
                ),
                Description: getAccvalue(
                    inputs,
                    "Description_create_account.Description"
                ),
                Fax: getAccvalue(inputs, "Fax_create_account.Fax"),
                Jigsaw: getAccvalue(inputs, "Jigsaw_create_account.Jigsaw"),
                Industry: getAccvalue(
                    inputs,
                    "Industry_create_account.Industry"
                ),
                NumberOfEmployees: getAccvalue(
                    inputs,
                    "NumberOfEmployees_create_account.NumberOfEmployees"
                ),
                OwnerId: getAccvalue(inputs, "ownerId_create_account.OwnerId"),
                ParentId: getAccvalue(
                    inputs,
                    "ParentId_create_account.ParentId"
                ),
                Phone: getAccvalue(inputs, "Phone_create_account.Phone"),
                SicDesc: getAccvalue(inputs, "SicDesc_create_account.SicDesc"),
                Type: checkValueIfNone(inputs, "Type_create_account.Type"),
                ShippingCity: getAccvalue(
                    inputs,
                    "ShippingCity_create_account.ShippingCity"
                ),
                ShippingCountry: getAccvalue(
                    inputs,
                    "ShippingCountry_create_account.ShippingCountry"
                ),
                ShippingPostalCode: getAccvalue(
                    inputs,
                    "ShippingPostalCode_create_account.ShippingPostalCode"
                ),
                ShippingState: getAccvalue(
                    inputs,
                    "ShippingState_create_account.ShippingState"
                ),
                ShippingStreet: getAccvalue(
                    inputs,
                    "ShippingStreet_create_account.ShippingStreet"
                ),
                Website: getAccvalue(inputs, "Website_create_account.Website"),
                RecordTypeId: getAccvalue(
                    inputs,
                    "RecordTypeId_create_account.RecordTypeId"
                ),
            };
            let customFields = {};
            inputs.customFields_create_account.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
            if (
                inputs.hasOwnProperty("AccountSource_create_account") &&
                getAccvalue(
                    inputs,
                    "AccountSource_create_account.AccountSource"
                ) === "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    AccountSource: getAccvalue(
                        inputs,
                        "AccountSource_create_account.value_AccountSource_create_account"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    AccountSource: checkValueIfNone(
                        inputs,
                        "AccountSource_create_account.AccountSource"
                    ),
                };
            }
        } else if (inputs.operation === "Update Account") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.accountId,
                name: getAccvalue(inputs, "name_update_account.name"),
                AccountNumber: getAccvalue(
                    inputs,
                    "AccountNumber_update_account.AccountNumber"
                ),
                AnnualRevenue: getAccvalue(
                    inputs,
                    "AnnualRevenue_update_account.AnnualRevenue"
                ),
                BillingCity: getAccvalue(
                    inputs,
                    "BillingCity_update_account.BillingCity"
                ),
                BillingCountry: getAccvalue(
                    inputs,
                    "BillingCountry_update_account.BillingCountry"
                ),
                BillingPostalCode: getAccvalue(
                    inputs,
                    "BillingPostalCode_update_account.BillingPostalCode"
                ),
                BillingState: getAccvalue(
                    inputs,
                    "BillingState_update_account.BillingState"
                ),
                BillingStreet: getAccvalue(
                    inputs,
                    "BillingStreet_update_account.BillingStreet"
                ),
                Description: getAccvalue(
                    inputs,
                    "Description_update_account.Description"
                ),
                Fax: getAccvalue(inputs, "Fax_update_account.Fax"),
                Jigsaw: getAccvalue(inputs, "Jigsaw_update_account.Jigsaw"),
                Industry: getAccvalue(
                    inputs,
                    "Industry_update_account.Industry"
                ),
                NumberOfEmployees: getAccvalue(
                    inputs,
                    "NumberOfEmployees_update_account.NumberOfEmployees"
                ),
                OwnerId: getAccvalue(inputs, "OwnerId_update_account.OwnerId"),
                ParentId: getAccvalue(
                    inputs,
                    "ParentId_update_account.ParentId"
                ),
                Phone: getAccvalue(inputs, "Phone_update_account.Phone"),
                SicDesc: getAccvalue(inputs, "SicDesc_update_account.SicDesc"),
                Type: checkValueIfNone(inputs, "Type_update_account.Type"),
                ShippingCity: getAccvalue(
                    inputs,
                    "ShippingCity_update_account.ShippingCity"
                ),
                ShippingCountry: getAccvalue(
                    inputs,
                    "ShippingCountry_update_account.ShippingCountry"
                ),
                ShippingPostalCode: getAccvalue(
                    inputs,
                    "ShippingPostalCode_update_account.ShippingPostalCode"
                ),
                ShippingState: getAccvalue(
                    inputs,
                    "ShippingState_update_account.ShippingState"
                ),
                ShippingStreet: getAccvalue(
                    inputs,
                    "ShippingStreet_update_account.ShippingStreet"
                ),
                Website: getAccvalue(inputs, "Website_update_account.Website"),
                RecordTypeId: getAccvalue(
                    inputs,
                    "RecordTypeId_update_account.RecordTypeId"
                ),
            };
            let customFields = {};
            inputs.customFields_update_account.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
            if (
                inputs.hasOwnProperty("AccountSource_update_account") &&
                getAccvalue(
                    inputs,
                    "AccountSource_update_account.AccountSource"
                ) === "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    AccountSource: getAccvalue(
                        inputs,
                        "AccountSource_update_account.value_AccountSource_update_account"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    AccountSource: checkValueIfNone(
                        inputs,
                        "AccountSource_update_account.AccountSource"
                    ),
                };
            }
        } else if (inputs.operation === "Delete Account") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.accountId,
            };
        } else if (inputs.operation === "Add Note To Record") {
            jsonToSend = {
                ...jsonToSend,
                parentId: inputs.parentId,
                title: inputs.title,
                body: getAccvalue(inputs, "body_add_note_to_record.body"),
                ownerId: getAccvalue(
                    inputs,
                    "ownerId_add_Note_to_record.ownerId"
                ),
                isPrivate: getAccvalue(
                    inputs,
                    "isPrivate_add_note_to_record.isPrivate"
                ),
            };
        }
    } else if (inputs.type === "Attachment") {
        if (inputs.operation === "Get Attachment") {
            jsonToSend = {
                id: inputs.attachmentId,
            };
        } else if (inputs.operation === "List Attachments") {
            jsonToSend = {
                ...jsonToSend,
                fields: getAccvalue(inputs, "fields_list_attachments.fields"),
            };
            if (
                inputs.hasOwnProperty("conditions_list_attachments") &&
                inputs.conditions_list_attachments.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    conditions: inputs.conditions_list_attachments.map((cdt:any) => {
                        return cdt.conditions;
                    }),
                };
            }
        } else if (inputs.operation === "Get Attachment Summary") {
        } else if (inputs.operation === "Craete Attachment" || inputs.operation === "Create Attachment") {
            jsonToSend = {
                ...jsonToSend,
                parentId: inputs.parentId,
                name: inputs.name,
                OwnerId: getAccvalue(
                    inputs,
                    "ownerId_create_attachment.OwnerId"
                ),
                isPrivate: getAccvalue(
                    inputs,
                    "isPrivate_create_attachment.isPrivate"
                ),
            };
            if (inputs.uploadType === "Binary")
                jsonToSend = {
                    ...jsonToSend,
                    binary: inputs.binary,
                };
            else if (inputs.uploadType === "Url")
                jsonToSend = {
                    ...jsonToSend,
                    url: inputs.url,
                };
        } else if (inputs.operation === "Update Attachment") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.attachmentId,
                name: getAccvalue(inputs, "name_update_attachment.name"),
                OwnerId: getAccvalue(
                    inputs,
                    "ownerId_update_attachment.OwnerId"
                ),
                isPrivate: getAccvalue(
                    inputs,
                    "isPrivate_update_attachment.isPrivate"
                ),
            };
        } else if (inputs.operation === "Delete Attachment") {
            jsonToSend = {
                id: inputs.attachmentId,
            };
        }
    } else if (inputs.type === "Case") {
        if (inputs.operation === "Get Case") {
            jsonToSend = {
                id: inputs.caseId,
            };
        } else if (inputs.operation === "List Cases") {
            jsonToSend = {
                ...jsonToSend,
                fields: getAccvalue(inputs, "fields_list_cases.fields"),
            };
            if (
                inputs.hasOwnProperty("conditions_list_cases") &&
                inputs.conditions_list_cases.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    conditions: inputs.conditions_list_cases.map((cdt:any) => {
                        return cdt.conditions;
                    }),
                };
            }
        } else if (inputs.operation === "Get Case Summary") {
        } else if (inputs.operation === "Craete Case" || inputs.operation === "Create Case") {
            if (inputs.type_create_case === "Other") {
                jsonToSend = {
                    ...jsonToSend,
                    type: inputs.value_type_create_case,
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    type: inputs.type_create_case,
                };
            }
            jsonToSend = {
                ...jsonToSend,
                contactId: getAccvalue(
                    inputs,
                    "contactId_create_case.contactId"
                ),
                accountId: getAccvalue(
                    inputs,
                    "accountId_create_case.accountId"
                ),
                parentId: getAccvalue(inputs, "parentId_create_case.parentId"),
                SuppliedName: getAccvalue(
                    inputs,
                    "SuppliedName_create_case.SuppliedName"
                ),
                SuppliedEmail: getAccvalue(
                    inputs,
                    "SuppliedEmail_create_case.SuppliedEmail"
                ),
                SuppliedPhone: getAccvalue(
                    inputs,
                    "SuppliedPhone_create_case.SuppliedPhone"
                ),
                SuppliedCompany: getAccvalue(
                    inputs,
                    "SuppliedCompany_create_case.SuppliedCompany"
                ),
                status: checkValueIfNone(inputs, "status_create_case.status"),
                reason: checkValueIfNone(inputs, "reason_create_case.reason"),
                origin: checkValueIfNone(inputs, "origin_create_case.origin"),
                subject: getAccvalue(inputs, "subject_create_case.subject"),
                priority: checkValueIfNone(
                    inputs,
                    "priority_create_case.priority"
                ),
                description: getAccvalue(
                    inputs,
                    "description_create_case.description"
                ),
                isEscalated: getAccvalue(
                    inputs,
                    "isEscalated_create_case.isEscalated"
                ),
                ownerId: getAccvalue(inputs, "ownerId_create_case.ownerId"),
            };
            let customFields = {};
            inputs.customFields_create_case.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
        } else if (inputs.operation === "Update Case") {
            jsonToSend = {
                id: inputs.caseId,
                // type: getAccvalue(inputs, "type_update_case.type"),
                contactId: getAccvalue(
                    inputs,
                    "contactId_update_case.contactId"
                ),
                accountId: getAccvalue(
                    inputs,
                    "accountId_update_case.accountId"
                ),
                parentId: getAccvalue(inputs, "parentId_update_case.parentId"),
                SuppliedName: getAccvalue(
                    inputs,
                    "SuppliedName_update_case.SuppliedName"
                ),
                SuppliedEmail: getAccvalue(
                    inputs,
                    "SuppliedEmail_update_case.SuppliedEmail"
                ),
                SuppliedPhone: getAccvalue(
                    inputs,
                    "SuppliedPhone_update_case.SuppliedPhone"
                ),
                SuppliedCompany: getAccvalue(
                    inputs,
                    "SuppliedCompany_update_case.SuppliedCompany"
                ),
                status: checkValueIfNone(inputs, "status_update_case.status"),
                reason: checkValueIfNone(inputs, "reason_update_case.reason"),
                origin: checkValueIfNone(inputs, "origin_update_case.origin"),
                subject: getAccvalue(inputs, "subject_update_case.subject"),
                priority: checkValueIfNone(
                    inputs,
                    "priority_update_case.priority"
                ),
                description: getAccvalue(
                    inputs,
                    "description_update_case.description"
                ),
                isEscalated: getAccvalue(
                    inputs,
                    "isEscalated_update_case.isEscalated"
                ),
                ownerId: getAccvalue(inputs, "ownerId_update_case.ownerId"),
            };
            let customFields = {};
            inputs.customFields_update_case.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
            if (
                inputs.hasOwnProperty("type_update_case") &&
                getAccvalue(inputs, "type_update_case.type") === "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    type: getAccvalue(
                        inputs,
                        "type_update_case.value_type_update_case"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    type: checkValueIfNone(inputs, "type_update_case.type"),
                };
            }
        } else if (inputs.operation === "Delete Case") {
            jsonToSend = {
                id: inputs.caseId,
            };
        } else if (inputs.operation === "Add Comment To Case") {
            jsonToSend = {
                parentId: inputs.caseId,
                commentBody: getAccvalue(
                    inputs,
                    "commentBody_add_comment_to_case.commentBody"
                ),
                isPublished: getAccvalue(
                    inputs,
                    "isPublished_add_comment_to_case.isPublished"
                ),
            };
        }
    } else if (inputs.type === "Contact") {
        if (inputs.operation === "Get Contact") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.contactId,
            };
        } else if (inputs.operation === "List Contacts") {
            jsonToSend = {
                ...jsonToSend,
                fields: getAccvalue(inputs, "fields_list_contacts.fields"),
            };
            if (
                inputs.hasOwnProperty("conditions_list_contacts") &&
                inputs.conditions_list_contacts.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    conditions: inputs.conditions_list_contacts.map((cdt:any) => {
                        return cdt.conditions;
                    }),
                };
            }
        } else if (inputs.operation === "Get Contact Summary") {
        } else if (inputs.operation === "Craete Contact" || inputs.operation === "Create Contact") {
            jsonToSend = {
                ...jsonToSend,
                lastName: inputs.lastName,
                salutation: getAccvalue(
                    inputs,
                    "salutation_create_contact.salutation"
                ),
                firstName: getAccvalue(
                    inputs,
                    "firstName_create_contact.firstName"
                ),
                title: getAccvalue(inputs, "title_create_contact.title"),
                description: getAccvalue(
                    inputs,
                    "description_create_contact.description"
                ),
                department: getAccvalue(
                    inputs,
                    "department_create_contact.department"
                ),
                MasterRecordId: getAccvalue(
                    inputs,
                    "masterRecordId_create_contact.MasterRecordId"
                ),
                accountId: getAccvalue(
                    inputs,
                    "accountId_create_contact.accountId"
                ),
                email: getAccvalue(inputs, "email_create_contact.email"),
                otherStreet: getAccvalue(
                    inputs,
                    "otherStreet_create_contact.otherStreet"
                ),
                otherCity: getAccvalue(
                    inputs,
                    "otherCity_create_contact.otherCity"
                ),
                otherState: getAccvalue(
                    inputs,
                    "otherState_create_contact.otherState"
                ),
                otherPostalCode: getAccvalue(
                    inputs,
                    "otherPostalCode_create_contact.otherPostalCode"
                ),
                otherCountry: getAccvalue(
                    inputs,
                    "otherCountry_create_contact.otherCountry"
                ),
                mailingStreet: getAccvalue(
                    inputs,
                    "mailingStreet_create_contact.mailingStreet"
                ),
                mailingCity: getAccvalue(
                    inputs,
                    "mailingCity_create_contact.mailingCity"
                ),
                mailingState: getAccvalue(
                    inputs,
                    "mailingState_create_contact.mailingState"
                ),
                mailingPostalCode: getAccvalue(
                    inputs,
                    "mailingPostalCode_create_contact.mailingPostalCode"
                ),
                mailingCountry: getAccvalue(
                    inputs,
                    "mailingCountry_create_contact.mailingCountry"
                ),
                phone: getAccvalue(inputs, "phone_create_contact.phone"),
                fax: getAccvalue(inputs, "fax_create_contact.fax"),
                mobilePhone: getAccvalue(
                    inputs,
                    "mobilePhone_create_contact.mobilePhone"
                ),
                homePhone: getAccvalue(
                    inputs,
                    "homePhone_create_contact.homePhone"
                ),
                otherPhone: getAccvalue(
                    inputs,
                    "otherPhone_create_contact.otherPhone"
                ),
                assistantName: getAccvalue(
                    inputs,
                    "assistantName_create_contact.assistantName"
                ),
                assistantPhone: getAccvalue(
                    inputs,
                    "assistantPhone_create_contact.assistantPhone"
                ),
                birthdate: getAccvalue(
                    inputs,
                    "birthdate_create_contact.birthdate"
                ),
                ownerId: getAccvalue(inputs, "ownerId_create_contact.ownerId"),
                emailBouncedReason: getAccvalue(
                    inputs,
                    "emailBouncedReason_create_contact.emailBouncedReason"
                ),
                Jigsaw: getAccvalue(inputs, "Jigsaw_create_contact.Jigsaw"),
            };
            let customFields = {};
            inputs.customFields_create_contact.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
            if (
                inputs.hasOwnProperty("leadSource_create_contact") &&
                getAccvalue(inputs, "leadSource_create_contact.leadSource") ===
                "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: getAccvalue(
                        inputs,
                        "leadSource_create_contact.value_leadSource_create_contact"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: checkValueIfNone(
                        inputs,
                        "leadSource_create_contact.leadSource"
                    ),
                };
            }
            if (
                inputs.hasOwnProperty("emailBouncedDate_create_contact") &&
                inputs.emailBouncedDate_create_contact.date &&
                inputs.emailBouncedDate_create_contact.time
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    emailBouncedDate:
                        getAccvalue(
                            inputs,
                            "emailBouncedDate_create_contact.date"
                        ) === undefined &&
                            getAccvalue(
                                inputs,
                                "emailBouncedDate_create_contact.time"
                            ) === undefined
                            ? undefined
                            : new Date(
                                `${getAccvalue(
                                    inputs,
                                    "emailBouncedDate_create_contact.date"
                                )} ${getAccvalue(
                                    inputs,
                                    "emailBouncedDate_create_contact.time"
                                )}`
                            ).toISOString(),
                };
            }
        } else if (inputs.operation === "Update Contact") {
            jsonToSend = {
                ...jsonToSend,
                id: inputs.contactId,
                firstName: getAccvalue(
                    inputs,
                    "firstName_update_contact.firstName"
                ),
                lastName: getAccvalue(
                    inputs,
                    "lastName_update_contact.lastName"
                ),
                title: getAccvalue(inputs, "title_update_contact.title"),
                description: getAccvalue(
                    inputs,
                    "description_update_contact.description"
                ),
                department: getAccvalue(
                    inputs,
                    "department_update_contact.department"
                ),
                MasterRecordId: getAccvalue(
                    inputs,
                    "masterRecordId_update_contact.MasterRecordId"
                ),
                accountId: getAccvalue(
                    inputs,
                    "accountId_update_contact.accountId"
                ),
                email: getAccvalue(inputs, "email_update_contact.email"),
                otherStreet: getAccvalue(
                    inputs,
                    "otherStreet_update_contact.otherStreet"
                ),
                otherCity: getAccvalue(
                    inputs,
                    "otherCity_update_contact.otherCity"
                ),
                otherState: getAccvalue(
                    inputs,
                    "otherState_update_contact.otherState"
                ),
                otherPostalCode: getAccvalue(
                    inputs,
                    "otherPostalCode_update_contact.otherPostalCode"
                ),
                otherCountry: getAccvalue(
                    inputs,
                    "otherCountry_update_contact.otherCountry"
                ),
                mailingStreet: getAccvalue(
                    inputs,
                    "mailingStreet_update_contact.mailingStreet"
                ),
                mailingCity: getAccvalue(
                    inputs,
                    "mailingCity_update_contact.mailingCity"
                ),
                mailingState: getAccvalue(
                    inputs,
                    "mailingState_update_contact.mailingState"
                ),
                mailingPostalCode: getAccvalue(
                    inputs,
                    "mailingPostalCode_update_contact.mailingPostalCode"
                ),
                mailingCountry: getAccvalue(
                    inputs,
                    "mailingCountry_update_contact.mailingCountry"
                ),
                phone: getAccvalue(inputs, "phone_update_contact.phone"),
                fax: getAccvalue(inputs, "fax_update_contact.fax"),
                mobilePhone: getAccvalue(
                    inputs,
                    "mobilePhone_update_contact.mobilePhone"
                ),
                homePhone: getAccvalue(
                    inputs,
                    "homePhone_update_contact.homePhone"
                ),
                otherPhone: getAccvalue(
                    inputs,
                    "otherPhone_update_contact.otherPhone"
                ),
                assistantName: getAccvalue(
                    inputs,
                    "assistantName_update_contact.assistantName"
                ),
                assistantPhone: getAccvalue(
                    inputs,
                    "assistantPhone_update_contact.assistantPhone"
                ),
                birthdate: getAccvalue(
                    inputs,
                    "birthdate_update_contact.birthdate"
                ),
                ownerId: getAccvalue(inputs, "ownerId_update_contact.ownerId"),
                emailBouncedReason: getAccvalue(
                    inputs,
                    "emailBouncedReason_update_contact.emailBouncedReason"
                ),
                Jigsaw: getAccvalue(inputs, "Jigsaw_update_contact.Jigsaw"),
            };
            let customFields = {};
            inputs.customFields_update_contact.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
            if (
                inputs.hasOwnProperty("leadSource_update_contact") &&
                getAccvalue(inputs, "leadSource_update_contact.leadSource") ===
                "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: getAccvalue(
                        inputs,
                        "leadSource_update_contact.value_leadSource_update_contact"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: checkValueIfNone(
                        inputs,
                        "leadSource_update_contact.leadSource"
                    ),
                };
            }
            if (
                inputs.hasOwnProperty("emailBouncedDate_update_contact") &&
                inputs.emailBouncedDate_update_contact.date &&
                inputs.emailBouncedDate_update_contact.time
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    emailBouncedDate:
                        getAccvalue(
                            inputs,
                            "emailBouncedDate_update_contact.date"
                        ) === undefined &&
                            getAccvalue(
                                inputs,
                                "emailBouncedDate_update_contact.time"
                            ) === undefined
                            ? undefined
                            : new Date(
                                `${getAccvalue(
                                    inputs,
                                    "emailBouncedDate_update_contact.date"
                                )} ${getAccvalue(
                                    inputs,
                                    "emailBouncedDate_update_contact.time"
                                )}`
                            ).toISOString(),
                };
            }
            if (
                inputs.hasOwnProperty("salutation_update_contact") &&
                inputs.salutation_update_contact.salutation !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    salutation: inputs.salutation_update_contact.salutation,
                };
            }
        } else if (inputs.operation === "Delete Contact") {
            jsonToSend = {
                id: inputs.contactId,
            };
        } else if (inputs.operation === "Add Contact To Campaign") {
            jsonToSend = {
                contactId: inputs.contactId,
                campaignId: inputs.campaignId,
            };
            if (
                inputs.hasOwnProperty("status_add_contact_to_campaign") &&
                inputs.status_add_contact_to_campaign.status !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    status: getAccvalue(
                        inputs,
                        "status_add_contact_to_campaign.status"
                    ),
                };
            }
        } else if (inputs.operation === "Add Note To Record") {
            jsonToSend = {
                ...jsonToSend,
                parentId: inputs.parentId,
                title: inputs.title,
                body: getAccvalue(inputs, "body_add_note_to_record.body"),
                ownerId: getAccvalue(
                    inputs,
                    "ownerId_add_Note_to_record.ownerId"
                ),
                isPrivate: getAccvalue(
                    inputs,
                    "isPrivate_add_note_to_record.isPrivate"
                ),
            };
        }
    } else if (inputs.type === "Custom Object") {
        if (inputs.operation === "Get Custom Obj") {
            jsonToSend = {
                customObjectName: inputs.customObjectName,
                id: inputs.recordId,
            };
        } else if (inputs.operation === "ListCustom Objs") {
            jsonToSend = {
                customObjectName: inputs.customObjectName,
                fields: getAccvalue(inputs, "fields_list_custom_objects.fields"),
            };
            if (
                inputs.hasOwnProperty("conditions_list_custom_objects") &&
                inputs.conditions_list_custom_objects.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    conditions: inputs.conditions_list_custom_objects.map(
                        (cdt:any) => {
                            return cdt.conditions;
                        }
                    ),
                };
            }
        } else if (inputs.operation === "Craete Custom Obj" || inputs.operation === "Create Custom Obj") {
            jsonToSend = {
                ...jsonToSend,
                customObjectName: inputs.customObjectName,
                name: inputs.name,
                ownerId: getAccvalue(
                    inputs,
                    "ownerId_create_custom_object.ownerId"
                ),
            };
            let customFields = {};
            inputs.customFields_create_custom_obj.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
        } else if (inputs.operation === "Update Custom Obj") {
            jsonToSend = {
                ...jsonToSend,
                customObjectName: inputs.customObjectName,
                id: inputs.recordId,
                name: getAccvalue(inputs, "name_update_custom_object.name"),
                ownerId: getAccvalue(
                    inputs,
                    "ownerId_update_custom_object.ownerId"
                ),
            };
            let customFields = {};
            inputs.customFields_update_custom_obj.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
        } else if (inputs.operation === "Delete Custom Obj") {
            jsonToSend = {
                ...jsonToSend,
                customObjectName: inputs.customObjectName,
                id: inputs.recordId,
            };
        }
    } else if (inputs.type === "Document") {
        if (inputs.operation === "Upload Document") {
            jsonToSend = {
                ...jsonToSend,
                title: inputs.title,
                pathOnClient: inputs.pathOnClient,
                OwnerId: getAccvalue(inputs, "ownerId_upload_document.OwnerId"),
                description: getAccvalue(
                    inputs,
                    "description_upload_document.description"
                ),
            };
            if (inputs.uploadType === "Binary")
                jsonToSend = {
                    ...jsonToSend,
                    binary: inputs.binary,
                };
            else if (inputs.uploadType === "Url")
                jsonToSend = {
                    ...jsonToSend,
                    url: inputs.url,
                };
        }
    } else if (inputs.type === "Flow") {
        if (inputs.operation === "List Flows") {
        }
    } else if (inputs.type === "Lead") {
        if (inputs.operation === "Get Lead") {
            jsonToSend = {
                id: inputs.leadId,
            };
        } else if (inputs.operation === "List Leads") {
            jsonToSend = {
                ...jsonToSend,
                fields: getAccvalue(inputs, "fields_list_leads.fields"),
            };
            if (
                inputs.hasOwnProperty("conditions_list_leads") &&
                inputs.conditions_list_leads.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    conditions: inputs.conditions_list_leads.map((cdt:any) => {
                        return cdt.conditions;
                    }),
                };
            }
        } else if (inputs.operation === "Get Lead Summary") {
        } else if (inputs.operation === "Craete Lead" || inputs.operation === "Create Lead") {
            jsonToSend = {
                lastName: inputs.lastName,
                company: inputs.company,
                salutation: getAccvalue(
                    inputs,
                    "salutation_create_lead.salutation"
                ),
                firstName: getAccvalue(
                    inputs,
                    "firstName_create_lead.firstName"
                ),
                title: getAccvalue(inputs, "title_create_lead.title"),
                Street: getAccvalue(inputs, "Street_create_lead.Street"),
                City: getAccvalue(inputs, "City_create_lead.City"),
                State: getAccvalue(inputs, "State_create_lead.State"),
                postalCode: getAccvalue(
                    inputs,
                    "postalCode_create_lead.postalCode"
                ),
                country: getAccvalue(inputs, "country_create_lead.country"),
                phone: getAccvalue(inputs, "phone_create_lead.phone"),
                mobilePhone: getAccvalue(
                    inputs,
                    "mobilePhone_create_lead.mobilePhone"
                ),
                email: getAccvalue(inputs, "email_create_lead.email"),
                website: getAccvalue(inputs, "website_create_lead.website"),
                description: getAccvalue(
                    inputs,
                    "description_create_lead.description"
                ),
                status: checkValueIfNone(inputs, "status_create_lead.status"),
                industry: getAccvalue(inputs, "industry_create_lead.industry"),
                rating: getAccvalue(inputs, "rating_create_lead.rating"),
                annualRevenue: getAccvalue(
                    inputs,
                    "annualRevenue_create_lead.annualRevenue"
                ),
                numberOfEmployees: getAccvalue(
                    inputs,
                    "numberOfEmployees_create_lead.numberOfEmployees"
                ),
                ownerId: getAccvalue(inputs, "ownerId_create_lead.ownerId"),
                Jigsaw: getAccvalue(inputs, "Jigsaw_create_lead.Jigsaw"),
                isUnreadByOwner: getAccvalue(
                    inputs,
                    "isUnreadByOwner_create_lead.isUnreadByOwner"
                ),
                MasterRecordId: getAccvalue(
                    inputs,
                    "masterRecordId_create_lead.MasterRecordId"
                ),
            };
            let customFields = {};
            inputs.customFields_create_lead.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
            if (
                inputs.hasOwnProperty("leadSource_create_lead") &&
                getAccvalue(inputs, "leadSource_create_lead.leadSource") ===
                "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: getAccvalue(
                        inputs,
                        "leadSource_create_lead.value_leadSource_create_lead"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: checkValueIfNone(
                        inputs,
                        "leadSource_create_lead.leadSource"
                    ),
                };
            }
        } else if (inputs.operation === "Update Lead") {
            jsonToSend = {
                id: inputs.leadId,
            };
            jsonToSend = {
                id: inputs.leadId,
                lastName: getAccvalue(inputs, "lastName_update_lead.lastName"),
                company: getAccvalue(inputs, "company_update_lead.company"),
                firstName: getAccvalue(
                    inputs,
                    "firstName_update_lead.firstName"
                ),
                title: getAccvalue(inputs, "title_update_lead.title"),
                Street: getAccvalue(inputs, "Street_update_lead.Street"),
                City: getAccvalue(inputs, "City_update_lead.City"),
                State: getAccvalue(inputs, "State_update_lead.State"),
                postalCode: getAccvalue(
                    inputs,
                    "postalCode_update_lead.postalCode"
                ),
                country: getAccvalue(inputs, "country_update_lead.country"),
                phone: getAccvalue(inputs, "phone_update_lead.phone"),
                mobilePhone: getAccvalue(
                    inputs,
                    "mobilePhone_update_lead.mobilePhone"
                ),
                email: getAccvalue(inputs, "email_update_lead.email"),
                website: getAccvalue(inputs, "website_update_lead.website"),
                description: getAccvalue(
                    inputs,
                    "description_update_lead.description"
                ),
                status: checkValueIfNone(inputs, "status_update_lead.status"),
                industry: getAccvalue(inputs, "industry_update_lead.industry"),
                rating: getAccvalue(inputs, "rating_update_lead.rating"),
                annualRevenue: getAccvalue(
                    inputs,
                    "annualRevenue_update_lead.annualRevenue"
                ),
                numberOfEmployees: getAccvalue(
                    inputs,
                    "numberOfEmployees_update_lead.numberOfEmployees"
                ),
                ownerId: getAccvalue(inputs, "ownerId_update_lead.ownerId"),
                Jigsaw: getAccvalue(inputs, "Jigsaw_update_lead.Jigsaw"),
                isUnreadByOwner: getAccvalue(
                    inputs,
                    "isUnreadByOwner_update_lead.isUnreadByOwner"
                ),
                MasterRecordId: getAccvalue(
                    inputs,
                    "masterRecordId_update_lead.MasterRecordId"
                ),
            };
            let customFields = {};
            inputs.customFields_update_lead.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
            if (
                inputs.hasOwnProperty("leadSource_update_lead") &&
                getAccvalue(inputs, "leadSource_update_lead.leadSource") ===
                "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: getAccvalue(
                        inputs,
                        "leadSource_update_lead.value_leadSource_update_lead"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: checkValueIfNone(
                        inputs,
                        "leadSource_update_lead.leadSource"
                    ),
                };
            }
            if (
                inputs.hasOwnProperty("salutation_update_lead") &&
                inputs.salutation_update_lead.salutation !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    salutation: inputs.salutation_update_lead.salutation,
                };
            }
        } else if (inputs.operation === "Delete Lead") {
            jsonToSend = {
                id: inputs.leadId,
            };
        } else if (inputs.operation === "Add Lead To Campaign") {
            jsonToSend = {
                leadId: inputs.leadId,
                campaignId: inputs.campaignId,
            };
            if (
                inputs.hasOwnProperty("status_add_lead_to_campaign") &&
                inputs.status_add_lead_to_campaign.status !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    status: getAccvalue(
                        inputs,
                        "status_add_lead_to_campaign.status"
                    ),
                };
            }
        } else if (inputs.operation === "Add Note To Record") {
            jsonToSend = {
                ...jsonToSend,
                parentId: inputs.parentId,
                title: inputs.title,
                body: getAccvalue(inputs, "body_add_note_to_record.body"),
                ownerId: getAccvalue(
                    inputs,
                    "ownerId_add_Note_to_record.ownerId"
                ),
                isPrivate: getAccvalue(
                    inputs,
                    "isPrivate_add_note_to_record.isPrivate"
                ),
            };
        }
    } else if (inputs.type === "Opportunity") {
        if (inputs.operation === "Get Opportunity") {
            jsonToSend = {
                id: inputs.opportunityId,
            };
        } else if (inputs.operation === "List Opportunities") {
            jsonToSend = {
                ...jsonToSend,
                fields: getAccvalue(inputs, "fields_list_opportunities.fields"),
            };
            if (
                inputs.hasOwnProperty("conditions_list_opportunities") &&
                inputs.conditions_list_opportunities.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    conditions: inputs.conditions_list_opportunities.map((cdt:any) => {
                        return cdt.conditions;
                    }),
                };
            }
        } else if (inputs.operation === "Get Opportunity Summary") {
        } else if (inputs.operation === "Craete Opportunity" || inputs.operation === "Create Opportunity") {
            jsonToSend = {
                ...jsonToSend,
                stageName: inputs.stageName,
                name: inputs.name,
                closeDate: inputs.closeDate,
                accountId: getAccvalue(
                    inputs,
                    "accountId_create_opportunity.accountId"
                ),
                amount: getAccvalue(inputs, "amount_create_opportunity.amount"),
                Probability: getAccvalue(
                    inputs,
                    "probability_create_opportunity.Probability"
                ),
                description: getAccvalue(
                    inputs,
                    "description_create_opportunity.description"
                ),
                type: checkValueIfNone(inputs, "type_create_opportunity.type"),
                nextStep: getAccvalue(
                    inputs,
                    "nextStep_create_opportunity.nextStep"
                ),
                forecastCategoryName: getAccvalue(
                    inputs,
                    "forecastCategoryName_create_opportunity.forecastCategoryName"
                ),
                campaignId: getAccvalue(
                    inputs,
                    "campaignId_create_opportunity.campaignId"
                ),
                pricebook2Id: getAccvalue(
                    inputs,
                    "pricebook2Id_create_opportunity.pricebook2Id"
                ),
                ownerId: getAccvalue(
                    inputs,
                    "ownerId_create_opportunity.ownerId"
                ),
            };
            let customFields = {};
            inputs.customFields_create_opportunity.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
            if (
                inputs.hasOwnProperty("leadSource_create_opportunity") &&
                getAccvalue(
                    inputs,
                    "leadSource_create_opportunity.leadSource"
                ) === "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: getAccvalue(
                        inputs,
                        "leadSource_create_opportunity.value_leadSource_create_opportunity"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: checkValueIfNone(
                        inputs,
                        "leadSource_create_opportunity.leadSource"
                    ),
                };
            }
        } else if (inputs.operation === "Update Opportunity") {
            jsonToSend = {
                id: inputs.opportunityId,
                name: getAccvalue(inputs, "name_update_opportunity.name"),
                stageName: checkValueIfNone(
                    inputs,
                    "stageName_update_opportunity.stageName"
                ),
                closeDate: getAccvalue(
                    inputs,
                    "closeDate_update_opportunity.closeDate"
                ),
                accountId: getAccvalue(
                    inputs,
                    "accountId_update_opportunity.accountId"
                ),
                amount: getAccvalue(inputs, "amount_update_opportunity.amount"),
                Probability: getAccvalue(
                    inputs,
                    "probability_update_opportunity.Probability"
                ),
                description: getAccvalue(
                    inputs,
                    "description_update_opportunity.description"
                ),
                type: checkValueIfNone(inputs, "type_update_opportunity.type"),
                nextStep: getAccvalue(
                    inputs,
                    "nextStep_update_opportunity.nextStep"
                ),
                forecastCategoryName: getAccvalue(
                    inputs,
                    "forecastCategoryName_update_opportunity.forecastCategoryName"
                ),
                campaignId: getAccvalue(
                    inputs,
                    "campaignId_update_opportunity.campaignId"
                ),
                pricebook2Id: getAccvalue(
                    inputs,
                    "pricebook2Id_update_opportunity.pricebook2Id"
                ),
                ownerId: getAccvalue(
                    inputs,
                    "ownerId_update_opportunity.ownerId"
                ),
            };
            let customFields = {};
            inputs.customFields_update_opportunity.map((customField:any) => {
                customFields = {
                    ...customFields,
                    [customField.fieldName + "__c"]: customField.value,
                };
            });
            jsonToSend = {
                ...jsonToSend,
                ...customFields,
            };
            if (
                inputs.hasOwnProperty("leadSource_update_opportunity") &&
                getAccvalue(
                    inputs,
                    "leadSource_update_opportunity.leadSource"
                ) === "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: getAccvalue(
                        inputs,
                        "leadSource_update_opportunity.value_leadSource_update_opportunity"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    leadSource: checkValueIfNone(
                        inputs,
                        "leadSource_update_opportunity.leadSource"
                    ),
                };
            }
        } else if (inputs.operation === "Delete Opportunity") {
            jsonToSend = {
                id: inputs.opportunityId,
            };
        } else if (inputs.operation === "Add Note To Record") {
            jsonToSend = {
                ...jsonToSend,
                parentId: inputs.parentId,
                title: inputs.title,
                body: getAccvalue(inputs, "body_add_note_to_record.body"),
                ownerId: getAccvalue(
                    inputs,
                    "ownerId_add_Note_to_record.ownerId"
                ),
                isPrivate: getAccvalue(
                    inputs,
                    "isPrivate_add_note_to_record.isPrivate"
                ),
            };
        }
    } else if (inputs.type === "Search") {
        if (inputs.operation === "Search Records") {
            jsonToSend = {
                ...jsonToSend,
                query: inputs.query,
            };
        }
    } else if (inputs.type === "Task") {
        if (inputs.operation === "Get Task") {
            jsonToSend = {
                id: inputs.taskId,
            };
        } else if (inputs.operation === "List Tasks") {
            jsonToSend = {
                ...jsonToSend,
                fields: getAccvalue(inputs, "fields_list_tasks.fields"),
            };
            if (
                inputs.hasOwnProperty("conditions_list_tasks") &&
                inputs.conditions_list_tasks.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    conditions: inputs.conditions_list_tasks.map((cdt:any) => {
                        return cdt.conditions;
                    }),
                };
            }
        } else if (inputs.operation === "Get Task Summary") {
        } else if (inputs.operation === "Craete Task" || inputs.operation === "Create Task") {
            if (
                inputs.hasOwnProperty("status_create_task") &&
                inputs.status_create_task === "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    status: inputs.value_status_create_task,
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    status: inputs.status_create_task,
                };
            }
            if (
                inputs.hasOwnProperty("subject_create_task") &&
                getAccvalue(inputs, "subject_create_task.subject") === "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    subject: getAccvalue(
                        inputs,
                        "subject_create_task.value_subject_create_task"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    subject: checkValueIfNone(
                        inputs,
                        "subject_create_task.subject"
                    ),
                };
            }
            if (
                inputs.hasOwnProperty("callType_create_task") &&
                inputs.callType_create_task.callType !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    callType: inputs.callType_create_task.callType,
                };
            }
            if (
                inputs.hasOwnProperty("priority_create_task") &&
                inputs.priority_create_task.priority !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    priority: inputs.priority_create_task.priority,
                };
            }
            if (
                inputs.hasOwnProperty("recurrenceType_create_task") &&
                inputs.recurrenceType_create_task.recurrenceType !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    recurrenceType:
                        inputs.recurrenceType_create_task.recurrenceType,
                };
            }
            if (
                inputs.hasOwnProperty("taskSubtype_create_task") &&
                inputs.taskSubtype_create_task.taskSubtype !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    taskSubtype: inputs.taskSubtype_create_task.taskSubtype,
                };
            }
            jsonToSend = {
                ...jsonToSend,
                activityDate: getAccvalue(
                    inputs,
                    "activityDate_create_task.activityDate"
                ),
                ownerId: getAccvalue(inputs, "ownerId_create_task.ownerId"),
                description: getAccvalue(
                    inputs,
                    "description_create_task.description"
                ),
                callDurationInSeconds: getAccvalue(
                    inputs,
                    "callDurationInSeconds_create_task.callDurationInSeconds"
                ),
                callDisposition: getAccvalue(
                    inputs,
                    "callDisposition_create_task.callDisposition"
                ),
                callObject: getAccvalue(
                    inputs,
                    "callObject_create_task.callObject"
                ),
                isReminderSet: getAccvalue(
                    inputs,
                    "isReminderSet_create_task.isReminderSet"
                ),
                recurrenceInterval: getAccvalue(
                    inputs,
                    "recurrenceInterval_create_task.recurrenceInterval"
                ),
                recurrenceRegeneratedType: checkValueIfNone(
                    inputs,
                    "recurrenceRegeneratedType_create_task.recurrenceRegeneratedType"
                ),
                whoId: getAccvalue(inputs, "whoId_create_task.whoId"),
                whatId: getAccvalue(inputs, "whatId_create_task.whatId"),
                recurrenceDayOfWeekMask: getAccvalue(
                    inputs,
                    "recurrenceDayOfWeekMask_create_task.recurrenceDayOfWeekMask"
                ),
                recurrenceDayOfMonth: getAccvalue(
                    inputs,
                    "recurrenceDayOfMonth_create_task.recurrenceDayOfMonth"
                ),
                recurrenceStartDateOnly: getAccvalue(
                    inputs,
                    "recurrenceDates_create_task.recurrenceStartDateOnly"
                ),
                recurrenceEndDateOnly: getAccvalue(
                    inputs,
                    "recurrenceDates_create_task.recurrenceEndDateOnly"
                ),
                recurrenceTimeZoneSidKey: getAccvalue(
                    inputs,
                    "recurrenceTimeZoneSidKey_create_task.recurrenceTimeZoneSidKey"
                ),
                recurrenceInstance: getAccvalue(
                    inputs,
                    "recurrenceInstance_create_task.recurrenceInstance"
                ),
            };
            if (
                inputs.hasOwnProperty("reminderDateTime_create_task") &&
                inputs.reminderDateTime_create_task.date &&
                inputs.reminderDateTime_create_task.time
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    reminderDateTime:
                        getAccvalue(inputs, "reminderDateTime_create_task.date") ===
                            undefined &&
                            getAccvalue(inputs, "reminderDateTime_create_task.time") ===
                            undefined
                            ? undefined
                            : new Date(
                                `${getAccvalue(
                                    inputs,
                                    "reminderDateTime_create_task.date"
                                )} ${getAccvalue(
                                    inputs,
                                    "reminderDateTime_create_task.time"
                                )}`
                            ).toISOString(),
                };
            }
            if (
                inputs.hasOwnProperty("recurrenceMonthOfYear_create_task") &&
                inputs.recurrenceMonthOfYear_create_task
                    .recurrenceMonthOfYear !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    recurrenceMonthOfYear:
                        inputs.recurrenceMonthOfYear_create_task
                            .recurrenceMonthOfYear,
                    recurrenceInstance: getAccvalue(
                        inputs,
                        "recurrenceInstance_update_task.recurrenceInstance"
                    ),
                };
            }
        } else if (inputs.operation === "Update Task") {
            if (
                inputs.hasOwnProperty("callType_update_task") &&
                inputs.callType_update_task.callType !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    callType: inputs.callType_update_task.callType,
                };
            }
            if (
                inputs.hasOwnProperty("taskSubtype_update_task") &&
                inputs.taskSubtype_update_task.taskSubtype !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    taskSubtype: inputs.taskSubtype_update_task.taskSubtype,
                };
            }
            if (
                inputs.hasOwnProperty("subject_update_task") &&
                getAccvalue(inputs, "subject_update_task.subject") === "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    subject: getAccvalue(
                        inputs,
                        "subject_update_task.value_subject_update_task"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    subject: checkValueIfNone(
                        inputs,
                        "subject_update_task.subject"
                    ),
                };
            }
            jsonToSend = {
                ...jsonToSend,
                id: inputs.taskId,
                status: getAccvalue(inputs, "status_update_task.status"),
                activityDate: getAccvalue(
                    inputs,
                    "activityDate_update_task.activityDate"
                ),
                priority: checkValueIfNone(
                    inputs,
                    "priority_update_task.priority"
                ),
                ownerId: getAccvalue(inputs, "ownerId_update_task.ownerId"),
                description: getAccvalue(
                    inputs,
                    "description_update_task.description"
                ),
                callDurationInSeconds: getAccvalue(
                    inputs,
                    "callDurationInSeconds_update_task.callDurationInSeconds"
                ),
                callDisposition: getAccvalue(
                    inputs,
                    "callDisposition_update_task.callDisposition"
                ),
                callObject: getAccvalue(
                    inputs,
                    "callObject_update_task.callObject"
                ),
                isReminderSet: getAccvalue(
                    inputs,
                    "isReminderSet_update_task.isReminderSet"
                ),
                recurrenceInterval: getAccvalue(
                    inputs,
                    "recurrenceInterval_update_task.recurrenceInterval"
                ),
                recurrenceRegeneratedType: checkValueIfNone(
                    inputs,
                    "recurrenceRegeneratedType_update_task.recurrenceRegeneratedType"
                ),
                whoId: getAccvalue(inputs, "whoId_update_task.whoId"),
                whatId: getAccvalue(inputs, "whatId_update_task.whatId"),
                recurrenceDayOfWeekMask: getAccvalue(
                    inputs,
                    "recurrenceDayOfWeekMask_update_task.recurrenceDayOfWeekMask"
                ),
                recurrenceDayOfMonth: getAccvalue(
                    inputs,
                    "recurrenceDayOfMonth_update_task.recurrenceDayOfMonth"
                ),
                recurrenceStartDateOnly: getAccvalue(
                    inputs,
                    "recurrenceDates_update_task.recurrenceStartDateOnly"
                ),
                recurrenceEndDateOnly: getAccvalue(
                    inputs,
                    "recurrenceDates_update_task.recurrenceEndDateOnly"
                ),
                recurrenceTimeZoneSidKey: getAccvalue(
                    inputs,
                    "recurrenceTimeZoneSidKey_update_task.recurrenceTimeZoneSidKey"
                ),
            };
            if (
                inputs.hasOwnProperty("recurrenceType_update_task") &&
                inputs.recurrenceType_update_task.recurrenceType !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    recurrenceType:
                        inputs.recurrenceType_update_task.recurrenceType,
                };
            }
            if (
                inputs.hasOwnProperty("reminderDateTime_update_task") &&
                inputs.reminderDateTime_update_task.date &&
                inputs.reminderDateTime_update_task.time
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    reminderDateTime:
                        getAccvalue(inputs, "reminderDateTime_update_task.date") ===
                            undefined &&
                            getAccvalue(inputs, "reminderDateTime_update_task.time") ===
                            undefined
                            ? undefined
                            : new Date(
                                `${getAccvalue(
                                    inputs,
                                    "reminderDateTime_update_task.date"
                                )} ${getAccvalue(
                                    inputs,
                                    "reminderDateTime_update_task.time"
                                )}`
                            ).toISOString(),
                };
            }
            if (
                inputs.hasOwnProperty("recurrenceMonthOfYear_update_task") &&
                inputs.recurrenceMonthOfYear_update_task
                    .recurrenceMonthOfYear !== "none"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    recurrenceMonthOfYear:
                        inputs.recurrenceMonthOfYear_update_task
                            .recurrenceMonthOfYear,
                };
            }
        } else if (inputs.operation === "Delete Task") {
            jsonToSend = {
                id: inputs.taskId,
            };
        }
    } else if (inputs.type === "User") {
        if (inputs.operation === "Get User") {
            jsonToSend = {
                id: inputs.userId,
            };
        } else if (inputs.operation === "List Users") {
            jsonToSend = {
                ...jsonToSend,
                fields: getAccvalue(inputs, "fields_list_users.fields"),
            };
            if (
                inputs.hasOwnProperty("conditions_list_users") &&
                inputs.conditions_list_users.length !== 0
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    conditions: inputs.conditions_list_users.map((cdt:any) => {
                        return cdt.conditions;
                    }),
                };
            }
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "salesforce",
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