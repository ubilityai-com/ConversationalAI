import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Attachments") {
        if (inputs.operation === "Get Many Attachments") {
            jsonToSend = {
                ...jsonToSend,
                sysparm_limit: inputs.limit_GetManyAttachments,
                sysparm_query: inputs.query_GetManyAttachments,
            }
        }
        else if (inputs.operation === "Get Attachment") {
            jsonToSend = {
                ...jsonToSend,
                attachment_id: inputs.attachmentID_GetAttachment,
                download: getAccvalue(inputs, "download_GetAttachment.download_Option_GetAttachment"),
            }
        }
        else if (inputs.operation === "Upload Attachment") {
            jsonToSend = {
                ...jsonToSend,
                file_name: inputs.attachmentName_UploadAttachment,
                table_name: inputs.tableName_UploadAttachment,
                table_sys_id: inputs.tableRecordID_UploadAttachment,
                content_type: inputs.contentType_UploadAttachment,
            }
            if (inputs.uploadFrom_UploadAttachment === "url") {
                jsonToSend = {
                    ...jsonToSend,
                    url: inputs.fileURL_UploadAttachment,
                }
            }
            else if (inputs.uploadFrom_UploadAttachment === "byteString") {
                jsonToSend = {
                    ...jsonToSend,
                    content: inputs.fileContent_UploadAttachment,
                }
            }
        }
        else if (inputs.operation === "Delete Attachment") {
            jsonToSend = {
                ...jsonToSend,
                attachment_id: inputs.attachmentID_DeleteAttachment,
            }
        }
    }
    else if (inputs.type === "Table Records") {
        if (inputs.operation === "Get Many Table Records") {
            jsonToSend = {
                ...jsonToSend,
                table_id: inputs.tableName_GetManyTableRecords,
                sysparm_limit: inputs.limit_GetManyTableRecords,
                sysparm_query: getAccvalue(inputs, "query_GetManyTableRecords.query_Option_GetManyTableRecords"),
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetManyTableRecords.fieldIDs_Option_GetManyTableRecords")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetManyTableRecords.returnValues_Option_GetManyTableRecords"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetManyTableRecords.excludeReferenceLink_Option_GetManyTableRecords"),
            }
        }
        else if (inputs.operation === "Get Table Record") {
            jsonToSend = {
                ...jsonToSend,
                table_id: inputs.tableName_GetTableRecord,
                record_id: inputs.recordID_GetTableRecord,
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetTableRecord.fieldIDs_Option_GetTableRecord")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetTableRecord.returnValues_Option_GetTableRecord"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetTableRecord.excludeReferenceLink_Option_GetTableRecord"),
            }
        }
        else if (inputs.operation === "Create Table Record") {
            let fieldsDict = {}
            inputs.field_CreateTableRecord.map((field:any) => {
                if (field.fieldContentType_CreateTableRecord === "string") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldId_CreateTableRecord]: field.fieldContentString_CreateTableRecord || ""
                    }
                }
                else if (field.fieldContentType_CreateTableRecord === "boolean") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldId_CreateTableRecord]: field.fieldContentBoolean_CreateTableRecord
                    }
                }
                else if (field.fieldContentType_CreateTableRecord === "integer") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldId_CreateTableRecord]: field.fieldContentInteger_CreateTableRecord
                    }
                }
                else if (field.fieldContentType_CreateTableRecord === "float") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldId_CreateTableRecord]: field.fieldContentFloat_CreateTableRecord
                    }
                }
                else if (field.fieldContentType_CreateTableRecord === "list") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldId_CreateTableRecord]: field.fieldContentStringsList_CreateTableRecord.map((stringList:any) => {
                            return stringList.fieldContentListStringValue_CreateTableRecord || ""
                        })
                    }
                }
            })
            jsonToSend = {
                ...jsonToSend,
                table_id: inputs.tableName_CreateTableRecord,
                added_fields: fieldsDict,
            }
        }
        else if (inputs.operation === "Update Table Record") {
            let fieldsDict = {}
            inputs.field_UpdateTableRecord.map((field:any) => {
                if (field.fieldContentType_UpdateTableRecord === "string") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldId_UpdateTableRecord]: field.fieldContentString_UpdateTableRecord || ""
                    }
                }
                else if (field.fieldContentType_UpdateTableRecord === "boolean") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldId_UpdateTableRecord]: field.fieldContentBoolean_UpdateTableRecord
                    }
                }
                else if (field.fieldContentType_UpdateTableRecord === "integer") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldId_UpdateTableRecord]: field.fieldContentInteger_UpdateTableRecord
                    }
                }
                else if (field.fieldContentType_UpdateTableRecord === "float") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldId_UpdateTableRecord]: field.fieldContentFloat_UpdateTableRecord
                    }
                }
                else if (field.fieldContentType_UpdateTableRecord === "list") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldId_UpdateTableRecord]: field.fieldContentStringsList_UpdateTableRecord.map((stringList:any) => {
                            return stringList.fieldContentListStringValue_UpdateTableRecord || ""
                        })
                    }
                }
            })
            jsonToSend = {
                ...jsonToSend,
                table_id: inputs.tableName_UpdateTableRecord,
                record_id: inputs.recordID_UpdateTableRecord,
                added_fields: fieldsDict,
            }
        }
        else if (inputs.operation === "Delete Table Record") {
            jsonToSend = {
                ...jsonToSend,
                table_id: inputs.tableName_DeleteTableRecord,
                record_id: inputs.recordID_DeleteTableRecord,
            }
        }
    }
    else if (inputs.type === "Incidents") {
        if (inputs.operation === "Get Many Incidents") {
            jsonToSend = {
                ...jsonToSend,
                sysparm_limit: inputs.limit_GetManyIncidents,
                sysparm_query: getAccvalue(inputs, "query_GetManyIncidents.query_Option_GetManyIncidents"),
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetManyIncidents.fieldIDs_Option_GetManyIncidents")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetManyIncidents.returnValues_Option_GetManyIncidents"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetManyIncidents.excludeReferenceLink_Option_GetManyIncidents"),
            }
        }
        else if (inputs.operation === "Get Incident") {
            jsonToSend = {
                ...jsonToSend,
                record_id: inputs.recordID_GetIncident,
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetIncident.fieldIDs_Option_GetIncident")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetIncident.returnValues_Option_GetIncident"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetIncident.excludeReferenceLink_Option_GetIncident"),
            }
        }
        else if (inputs.operation === "Create Incident") {
            jsonToSend = {
                ...jsonToSend,
                added_fields: {
                    short_description: inputs.shortDescription_CreateIncident,
                    assignment_group: getAccvalue(inputs, "groupID_CreateIncident.groupID_Option_CreateIncident"),
                    assigned_to: getAccvalue(inputs, "groupID_CreateIncident.assigneeID_Option_CreateIncident"),
                    business_service: getAccvalue(inputs, "businessServiceID_CreateIncident.businessServiceID_Option_CreateIncident"),
                    caller_id: getAccvalue(inputs, "callerID_CreateIncident.callerID_Option_CreateIncident"),
                    category: getAccvalue(inputs, "categoryID_CreateIncident.categoryID_Option_CreateIncident"),
                    subcategory: getAccvalue(inputs, "categoryID_CreateIncident.subcategoryID_Option_CreateIncident"),
                    close_notes: getAccvalue(inputs, "closeNotes_CreateIncident.closeNotes_Option_CreateIncident"),
                    cmdb_ci: getAccvalue(inputs, "configurationItemID_CreateIncident.configurationItemID_Option_CreateIncident")?.map((include:any) => include.value).join(","),
                    contact_type: getAccvalue(inputs, "contactType_CreateIncident.contactType_Option_CreateIncident"),
                    description: getAccvalue(inputs, "description_CreateIncident.description_Option_CreateIncident"),
                    impact: getAccvalue(inputs, "impact_CreateIncident.impact_Option_CreateIncident"),
                    urgency: getAccvalue(inputs, "urgency_CreateIncident.urgency_Option_CreateIncident"),
                    close_code: getAccvalue(inputs, "resolutionCodeID_CreateIncident.resolutionCodeID_Option_CreateIncident"),
                    state: getAccvalue(inputs, "stateID_CreateIncident.stateID_Option_CreateIncident"),
                },
            }
        }
        else if (inputs.operation === "Update Incident") {
            jsonToSend = {
                ...jsonToSend,
                record_id: inputs.recordID_UpdateIncident,
                added_fields: {
                    hold_reason: getAccvalue(inputs, "holdReasonID_UpdateIncident.holdReasonID_Option_UpdateIncident"),
                    short_description: getAccvalue(inputs, "shortDescription_UpdateIncident.shortDescription_Option_UpdateIncident"),
                    assignment_group: getAccvalue(inputs, "groupID_UpdateIncident.groupID_Option_UpdateIncident"),
                    assigned_to: getAccvalue(inputs, "groupID_UpdateIncident.assigneeID_Option_UpdateIncident"),
                    business_service: getAccvalue(inputs, "businessServiceID_UpdateIncident.businessServiceID_Option_UpdateIncident"),
                    caller_id: getAccvalue(inputs, "callerID_UpdateIncident.callerID_Option_UpdateIncident"),
                    category: getAccvalue(inputs, "categoryID_UpdateIncident.categoryID_Option_UpdateIncident"),
                    subcategory: getAccvalue(inputs, "categoryID_UpdateIncident.subcategoryID_Option_UpdateIncident"),
                    close_notes: getAccvalue(inputs, "closeNotes_UpdateIncident.closeNotes_Option_UpdateIncident"),
                    cmdb_ci: getAccvalue(inputs, "configurationItemID_UpdateIncident.configurationItemID_Option_UpdateIncident")?.map((include:any) => include.value).join(","),
                    contact_type: getAccvalue(inputs, "contactType_UpdateIncident.contactType_Option_UpdateIncident"),
                    description: getAccvalue(inputs, "description_UpdateIncident.description_Option_UpdateIncident"),
                    impact: getAccvalue(inputs, "impact_UpdateIncident.impact_Option_UpdateIncident"),
                    urgency: getAccvalue(inputs, "urgency_UpdateIncident.urgency_Option_UpdateIncident"),
                    close_code: getAccvalue(inputs, "resolutionCodeID_UpdateIncident.resolutionCodeID_Option_UpdateIncident"),
                    state: getAccvalue(inputs, "stateID_UpdateIncident.stateID_Option_UpdateIncident"),
                },
            }
        }
        else if (inputs.operation === "Delete Incident") {
            jsonToSend = {
                ...jsonToSend,
                record_id: inputs.recordID_DeleteIncident,
            }
        }
    }
    else if (inputs.type === "Users") {
        if (inputs.operation === "Get Many Users") {
            jsonToSend = {
                ...jsonToSend,
                sysparm_limit: inputs.limit_GetManyUsers,
                sysparm_query: getAccvalue(inputs, "query_GetManyUsers.query_Option_GetManyUsers"),
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetManyUsers.fieldIDs_Option_GetManyUsers")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetManyUsers.returnValues_Option_GetManyUsers"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetManyUsers.excludeReferenceLink_Option_GetManyUsers"),
            }
        }
        else if (inputs.operation === "Get User") {
            jsonToSend = {
                ...jsonToSend,
                record_id: inputs.recordID_GetUser,
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetUser.fieldIDs_Option_GetUser")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetUser.returnValues_Option_GetUser"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetUser.excludeReferenceLink_Option_GetUser"),
            }
        }
        else if (inputs.operation === "Create User") {
            jsonToSend = {
                ...jsonToSend,
                added_fields: {
                    introduction: inputs.introduction_CreateUser,
                    active: getAccvalue(inputs, "active_CreateUser.active_Option_CreateUser"),
                    building: getAccvalue(inputs, "building_CreateUser.building_Option_CreateUser"),
                    city: getAccvalue(inputs, "city_CreateUser.city_Option_CreateUser"),
                    company: getAccvalue(inputs, "company_CreateUser.company_Option_CreateUser"),
                    country: getAccvalue(inputs, "country_CreateUser.country_Option_CreateUser"),
                    department: getAccvalue(inputs, "department_CreateUser.department_Option_CreateUser"),
                    email: getAccvalue(inputs, "email_CreateUser.email_Option_CreateUser"),
                    first_name: getAccvalue(inputs, "firstName_CreateUser.firstName_Option_CreateUser"),
                    middle_name: getAccvalue(inputs, "middleName_CreateUser.middleName_Option_CreateUser"),
                    last_name: getAccvalue(inputs, "lastName_CreateUser.lastName_Option_CreateUser"),
                    gender: getAccvalue(inputs, "gender_CreateUser.gender_Option_CreateUser"),
                    home_phone: getAccvalue(inputs, "homePhone_CreateUser.homePhone_Option_CreateUser"),
                    mobile_phone: getAccvalue(inputs, "mobilePhone_CreateUser.mobilePhone_Option_CreateUser"),
                    phone: getAccvalue(inputs, "phone_CreateUser.phone_Option_CreateUser"),
                    location: getAccvalue(inputs, "location_CreateUser.location_Option_CreateUser"),
                    manager: getAccvalue(inputs, "manager_CreateUser.manager_Option_CreateUser"),
                    user_password: getAccvalue(inputs, "password_CreateUser.password_Option_CreateUser"),
                    password_needs_reset: getAccvalue(inputs, "passNeedsReset_CreateUser.passNeedsReset_Option_CreateUser"),
                    roles: getAccvalue(inputs, "roleID_CreateUser.roleID_Option_CreateUser")?.map((include:any) => include.value).join(","),
                    source: getAccvalue(inputs, "source_CreateUser.source_Option_CreateUser"),
                    state: getAccvalue(inputs, "state_CreateUser.state_Option_CreateUser"),
                    street: getAccvalue(inputs, "street_CreateUser.street_Option_CreateUser"),
                    user_name: getAccvalue(inputs, "userName_CreateUser.userName_Option_CreateUser"),
                    zip: getAccvalue(inputs, "zipCode_CreateUser.zipCode_Option_CreateUser"),
                },
            }
        }
        else if (inputs.operation === "Update User") {
            jsonToSend = {
                ...jsonToSend,
                record_id: inputs.recordID_UpdateUser,
                added_fields: {
                    active: getAccvalue(inputs, "active_UpdateUser.active_Option_UpdateUser"),
                    building: getAccvalue(inputs, "building_UpdateUser.building_Option_UpdateUser"),
                    city: getAccvalue(inputs, "city_UpdateUser.city_Option_UpdateUser"),
                    company: getAccvalue(inputs, "company_UpdateUser.company_Option_UpdateUser"),
                    country: getAccvalue(inputs, "country_UpdateUser.country_Option_UpdateUser"),
                    department: getAccvalue(inputs, "department_UpdateUser.department_Option_UpdateUser"),
                    email: getAccvalue(inputs, "email_UpdateUser.email_Option_UpdateUser"),
                    first_name: getAccvalue(inputs, "firstName_UpdateUser.firstName_Option_UpdateUser"),
                    middle_name: getAccvalue(inputs, "middleName_UpdateUser.middleName_Option_UpdateUser"),
                    last_name: getAccvalue(inputs, "lastName_UpdateUser.lastName_Option_UpdateUser"),
                    gender: getAccvalue(inputs, "gender_UpdateUser.gender_Option_UpdateUser"),
                    home_phone: getAccvalue(inputs, "homePhone_UpdateUser.homePhone_Option_UpdateUser"),
                    mobile_phone: getAccvalue(inputs, "mobilePhone_UpdateUser.mobilePhone_Option_UpdateUser"),
                    phone: getAccvalue(inputs, "phone_UpdateUser.phone_Option_UpdateUser"),
                    location: getAccvalue(inputs, "location_UpdateUser.location_Option_UpdateUser"),
                    manager: getAccvalue(inputs, "manager_UpdateUser.manager_Option_UpdateUser"),
                    user_password: getAccvalue(inputs, "password_UpdateUser.password_Option_UpdateUser"),
                    password_needs_reset: getAccvalue(inputs, "passNeedsReset_UpdateUser.passNeedsReset_Option_UpdateUser"),
                    roles: getAccvalue(inputs, "roleID_UpdateUser.roleID_Option_UpdateUser")?.map((include:any) => include.value).join(","),
                    source: getAccvalue(inputs, "source_UpdateUser.source_Option_UpdateUser"),
                    state: getAccvalue(inputs, "state_UpdateUser.state_Option_UpdateUser"),
                    street: getAccvalue(inputs, "street_UpdateUser.street_Option_UpdateUser"),
                    user_name: getAccvalue(inputs, "userName_UpdateUser.userName_Option_UpdateUser"),
                    zip: getAccvalue(inputs, "zipCode_UpdateUser.zipCode_Option_UpdateUser"),
                },
            }
        }
        else if (inputs.operation === "Delete User") {
            jsonToSend = {
                ...jsonToSend,
                record_id: inputs.recordID_DeleteUser,
            }
        }
    }
    else if (inputs.type === "User Groups") {
        if (inputs.operation === "Get Many User Groups") {
            jsonToSend = {
                ...jsonToSend,
                sysparm_limit: inputs.limit_GetManyUserGroups,
                sysparm_query: getAccvalue(inputs, "query_GetManyUserGroups.query_Option_GetManyUserGroups"),
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetManyUserGroups.fieldIDs_Option_GetManyUserGroups")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetManyUserGroups.returnValues_Option_GetManyUserGroups"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetManyUserGroups.excludeReferenceLink_Option_GetManyUserGroups"),
            }
        }
    }
    else if (inputs.type === "User Roles") {
        if (inputs.operation === "Get Many User Roles") {
            jsonToSend = {
                ...jsonToSend,
                sysparm_limit: inputs.limit_GetManyUserRoles,
                sysparm_query: getAccvalue(inputs, "query_GetManyUserRoles.query_Option_GetManyUserRoles"),
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetManyUserRoles.fieldIDs_Option_GetManyUserRoles")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetManyUserRoles.returnValues_Option_GetManyUserRoles"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetManyUserRoles.excludeReferenceLink_Option_GetManyUserRoles"),
            }
        }
    }
    else if (inputs.type === "Business Services") {
        if (inputs.operation === "Get Many Business Services") {
            jsonToSend = {
                ...jsonToSend,
                sysparm_limit: inputs.limit_GetManyBusinessServices,
                sysparm_query: getAccvalue(inputs, "query_GetManyBusinessServices.query_Option_GetManyBusinessServices"),
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetManyBusinessServices.fieldIDs_Option_GetManyBusinessServices")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetManyBusinessServices.returnValues_Option_GetManyBusinessServices"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetManyBusinessServices.excludeReferenceLink_Option_GetManyBusinessServices"),
            }
        }
    }
    else if (inputs.type === "Configuration Items") {
        if (inputs.operation === "Get Many Configuration Items") {
            jsonToSend = {
                ...jsonToSend,
                sysparm_limit: inputs.limit_GetManyConfigurationItems,
                sysparm_query: getAccvalue(inputs, "query_GetManyConfigurationItems.query_Option_GetManyConfigurationItems"),
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetManyConfigurationItems.fieldIDs_Option_GetManyConfigurationItems")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetManyConfigurationItems.returnValues_Option_GetManyConfigurationItems"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetManyConfigurationItems.excludeReferenceLink_Option_GetManyConfigurationItems"),
            }
        }
    }
    else if (inputs.type === "Departments") {
        if (inputs.operation === "Get Many Departments") {
            jsonToSend = {
                ...jsonToSend,
                sysparm_limit: inputs.limit_GetManyDepatments,
                sysparm_query: getAccvalue(inputs, "query_GetManyDepatments.query_Option_GetManyDepatments"),
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetManyDepatments.fieldIDs_Option_GetManyDepatments")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetManyDepatments.returnValues_Option_GetManyDepatments"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetManyDepatments.excludeReferenceLink_Option_GetManyDepatments"),
            }
        }
    }
    else if (inputs.type === "Dictionaries") {
        if (inputs.operation === "Get Many Dictionaries") {
            jsonToSend = {
                ...jsonToSend,
                sysparm_limit: inputs.limit_GetManyDictionaries,
                sysparm_query: getAccvalue(inputs, "query_GetManyDictionaries.query_Option_GetManyDictionaries"),
                sysparm_fields: getAccvalue(inputs, "fieldIDs_GetManyDictionaries.fieldIDs_Option_GetManyDictionaries")?.map((include:any) => include.value).join(","),
                sysparm_display_value: getAccvalue(inputs, "returnValues_GetManyDictionaries.returnValues_Option_GetManyDictionaries"),
                sysparm_exclude_reference_link: getAccvalue(inputs, "excludeReferenceLink_GetManyDictionaries.excludeReferenceLink_Option_GetManyDictionaries"),
            }
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "service_now",
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