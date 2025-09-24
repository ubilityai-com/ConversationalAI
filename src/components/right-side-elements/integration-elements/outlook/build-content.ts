import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "Contact") {
        if (inputs.operation === "GetContact") {
            jsonToSend = {
                ...jsonToSend,
                contact_id: inputs.contact_id_GetContact,
            };
        } else if (inputs.operation === "GetManyContacts") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_GetManyContact"),
                filter: getAccvalue(inputs, "filter_GetManyContact"),
            };
        } else if (inputs.operation === "CreateContact") {
            jsonToSend = {
                ...jsonToSend,
                givenName: inputs.givenName_CreateContact,
                surname: inputs.surname_CreateContact,

                businessAddress: {
                    city: getAccvalue(
                        inputs,
                        "businessAddress_CreateContact.city_businessAddress_CreateContact"
                    ),
                    countryOrRegion: getAccvalue(
                        inputs,
                        "businessAddress_CreateContact.countryOrRegion_businessAddress_CreateContact"
                    ),
                    postalCode: getAccvalue(
                        inputs,
                        "businessAddress_CreateContact.postalCode_businessAddress_CreateContact"
                    ),
                    state: getAccvalue(
                        inputs,
                        "businessAddress_CreateContact.state_businessAddress_CreateContact"
                    ),
                    street: getAccvalue(
                        inputs,
                        "businessAddress_CreateContact.street_businessAddress_CreateContact"
                    ),
                },
                homeAddress: {
                    city: getAccvalue(
                        inputs,
                        "homeAddress_CreateContact.city_homeAddress_CreateContact"
                    ),
                    countryOrRegion: getAccvalue(
                        inputs,
                        "homeAddress_CreateContact.countryOrRegion_homeAddress_CreateContact"
                    ),
                    postalCode: getAccvalue(
                        inputs,
                        "homeAddress_CreateContact.postalCode_homeAddress_CreateContact"
                    ),
                    state: getAccvalue(
                        inputs,
                        "homeAddress_CreateContact.state_homeAddress_CreateContact"
                    ),
                    street: getAccvalue(
                        inputs,
                        "homeAddress_CreateContact.street_homeAddress_CreateContact"
                    ),
                },
                otherAddress: {
                    city: getAccvalue(
                        inputs,
                        "otherAddress_CreateContact.city_otherAddress_CreateContact"
                    ),
                    countryOrRegion: getAccvalue(
                        inputs,
                        "otherAddress_CreateContact.countryOrRegion_otherAddress_CreateContact"
                    ),
                    postalCode: getAccvalue(
                        inputs,
                        "otherAddress_CreateContact.postalCode_otherAddress_CreateContact"
                    ),
                    state: getAccvalue(
                        inputs,
                        "otherAddress_CreateContact.state_otherAddress_CreateContact"
                    ),
                    street: getAccvalue(
                        inputs,
                        "otherAddress_CreateContact.street_otherAddress_CreateContact"
                    ),
                },
                businessHomePage: getAccvalue(
                    inputs,
                    "businessHomePage_CreateContact"
                ),
                fileAs: getAccvalue(inputs, "fileAs_CreateContact"),
                personalNotes: getAccvalue(
                    inputs,
                    "personalNotes_CreateContact"
                ),
                jobTitle: getAccvalue(inputs, "jobTitle_CreateContact"),
                companyName: getAccvalue(inputs, "companyName_CreateContact"),
                department: getAccvalue(inputs, "department_CreateContact"),
                mobilePhone: getAccvalue(inputs, "mobilePhone_CreateContact"),
            };
            if (inputs.businessPhones_CreateContact.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    businessPhones: inputs.businessPhones_CreateContact?.map((businessPhone: any) => {
                        return businessPhone.businessPhone_CreateContact;
                    }),
                };
            }
            if (inputs.homePhones_CreateContact.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    homePhones: inputs.homePhones_CreateContact?.map(
                        (homePhone: any) => {
                            return homePhone.homePhone_CreateContact;
                        }
                    ),
                };
            }
            if (inputs.emailAddresses_CreateContact.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    emailAddresses: inputs.emailAddresses_CreateContact?.map(
                        (emailAddress: any) => {
                            return { address: emailAddress.emailAddress_CreateContact };
                        }
                    ),
                };
            }
        } else if (inputs.operation === "UpdateContact") {
            jsonToSend = {
                ...jsonToSend,
                contact_id: inputs.contact_id_UpdateContact,
                givenName: getAccvalue(inputs, "givenName_UpdateContact"),
                surname: getAccvalue(inputs, "surname_UpdateContact"),
                businessHomePage: getAccvalue(
                    inputs,
                    "businessHomePage_UpdateContact"
                ),
                personalNotes: getAccvalue(
                    inputs,
                    "personalNotes_UpdateContact"
                ),
                jobTitle: getAccvalue(inputs, "jobTitle_UpdateContact"),
                companyName: getAccvalue(inputs, "companyName_UpdateContact"),
                department: getAccvalue(inputs, "department_UpdateContact"),
                mobilePhone: getAccvalue(inputs, "mobilePhone_UpdateContact"),
                businessAddress: {
                    city: getAccvalue(
                        inputs,
                        "businessAddress_UpdateContact.city_businessAddress_UpdateContact"
                    ),
                    countryOrRegion: getAccvalue(
                        inputs,
                        "businessAddress_UpdateContact.countryOrRegion_businessAddress_UpdateContact"
                    ),
                    postalCode: getAccvalue(
                        inputs,
                        "businessAddress_UpdateContact.postalCode_businessAddress_UpdateContact"
                    ),
                    state: getAccvalue(
                        inputs,
                        "businessAddress_UpdateContact.state_businessAddress_UpdateContact"
                    ),
                    street: getAccvalue(
                        inputs,
                        "businessAddress_UpdateContact.street_businessAddress_UpdateContact"
                    ),
                },
                homeAddress: {
                    city: getAccvalue(
                        inputs,
                        "homeAddress_UpdateContact.city_homeAddress_UpdateContact"
                    ),
                    countryOrRegion: getAccvalue(
                        inputs,
                        "homeAddress_UpdateContact.countryOrRegion_homeAddress_UpdateContact"
                    ),
                    postalCode: getAccvalue(
                        inputs,
                        "homeAddress_UpdateContact.postalCode_homeAddress_UpdateContact"
                    ),
                    state: getAccvalue(
                        inputs,
                        "homeAddress_UpdateContact.state_homeAddress_UpdateContact"
                    ),
                    street: getAccvalue(
                        inputs,
                        "homeAddress_UpdateContact.street_homeAddress_UpdateContact"
                    ),
                },
                otherAddress: {
                    city: getAccvalue(
                        inputs,
                        "otherAddress_UpdateContact.city_otherAddress_UpdateContact"
                    ),
                    countryOrRegion: getAccvalue(
                        inputs,
                        "otherAddress_UpdateContact.countryOrRegion_otherAddress_UpdateContact"
                    ),
                    postalCode: getAccvalue(
                        inputs,
                        "otherAddress_UpdateContact.postalCode_otherAddress_UpdateContact"
                    ),
                    state: getAccvalue(
                        inputs,
                        "otherAddress_UpdateContact.state_otherAddress_UpdateContact"
                    ),
                    street: getAccvalue(
                        inputs,
                        "otherAddress_UpdateContact.street_otherAddress_UpdateContact"
                    ),
                },
            };
            if (inputs.businessPhones_UpdateContact.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    businessPhones: inputs.businessPhones_UpdateContact?.map(
                        (businessPhone: any) => {
                            return businessPhone.businessPhone_UpdateContact;
                        }
                    ),
                };
            }
            if (inputs.homePhones_UpdateContact.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    homePhones: inputs.homePhones_UpdateContact?.map(
                        (homePhone: any) => {
                            return homePhone.homePhone_UpdateContact;
                        }
                    ),
                };
            }
            if (inputs.emailAddresses_UpdateContact.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    emailAddresses: inputs.emailAddresses_UpdateContact?.map(
                        (emailAddress: any) => {
                            return { address: emailAddress.emailAddress_UpdateContact };
                        }
                    ),
                };
            }
        } else if (inputs.operation === "DeleteContact") {
            jsonToSend = {
                ...jsonToSend,
                contact_id: inputs.contact_id_DeleteContact,
            };
        }
    } else if (inputs.type === "Calendar") {
        if (inputs.operation === "GetCalendar") {
            jsonToSend = {
                ...jsonToSend,
                calendar_id: inputs.calendar_id_GetCalendar,
            };
        } else if (inputs.operation === "GetManyCalendars") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_GetManyCalendar"),
                filter: getAccvalue(inputs, "filter_GetManyCalendar"),
            };
        } else if (inputs.operation === "CreateCalendar") {
            jsonToSend = {
                ...jsonToSend,
                name: inputs.name_CreateCalendar,
                calendarGroup_id: getAccvalue(
                    inputs,
                    "calendarGroup_id_CreateCalendar"
                ),
                color: getAccvalue(inputs, "color_CreateCalendar"),
            };
        } else if (inputs.operation === "UpdateCalendar") {
            jsonToSend = {
                ...jsonToSend,
                calendar_id: inputs.calendar_id_UpdateCalendar,
                name: getAccvalue(inputs, "name_UpdateCalendar"),
                isDefaultCalendar: getAccvalue(
                    inputs,
                    "isDefaultCalendar_UpdateCalendar"
                ),
            };
            if (inputs.color_UpdateCalendar != "None") {
                jsonToSend = {
                    ...jsonToSend,
                    color: getAccvalue(
                        inputs,
                        "color_UpdateCalendar"
                    ),
                };
            }
        } else if (inputs.operation === "DeleteCalendar") {
            jsonToSend = {
                ...jsonToSend,
                calendar_id: inputs.calendar_id_DeleteCalendar,
            };
        }
    } else if (inputs.type === "Event") {
        if (inputs.operation === "GetEvent") {
            jsonToSend = {
                ...jsonToSend,
                calendar_id: inputs.calendar_id_GetEvent,
                event_id: inputs.event_id_GetEvent,
            };
        } else if (inputs.operation === "GetManyEvents") {
            jsonToSend = {
                ...jsonToSend,
                calendar_id: inputs.calendar_id_GetManyEvent,
                limit: getAccvalue(inputs, "limit_GetManyEvent"),
                filter: getAccvalue(inputs, "filter_GetManyEvent"),
            };
        } else if (inputs.operation === "CreateEvent") {
            jsonToSend = {
                ...jsonToSend,
                calendar_id: inputs.calendar_id_CreateEvent,
                subject: inputs.subject_CreateEvent,
                start_time: inputs.start_time_CreateEvent,
                end_time: inputs.end_time_CreateEvent,
                body_content: getAccvalue(inputs, "body_content_CreateEvent"),
                showAs: getAccvalue(inputs, "showAs_CreateEvent"),
                isAllDay: getAccvalue(inputs, "isAllDay_CreateEvent"),
            };
        } else if (inputs.operation === "UpdateEvent") {
            jsonToSend = {
                ...jsonToSend,
                calendar_id: inputs.calendar_id_UpdateEvent,
                event_id: inputs.event_id_UpdateEvent,
                subject: getAccvalue(inputs, "subject_UpdateEvent"),
                start_time: getAccvalue(inputs, "start_time_UpdateEvent"),
                end_time: getAccvalue(inputs, "end_time_UpdateEvent"),
                body_content: getAccvalue(inputs, "body_content_UpdateEvent"),
                isAllDay: getAccvalue(inputs, "isAllDay_UpdateEvent"),
                isOnlineMeeting: getAccvalue(
                    inputs,
                    "isOnlineMeeting_UpdateEvent"
                ),
                hideAttendees: getAccvalue(inputs, "hideAttendees_UpdateEvent"),
            };
            if (inputs.showAs_UpdateEvent != "None") {
                jsonToSend = {
                    ...jsonToSend,
                    showAs: getAccvalue(inputs, "showAs_UpdateEvent"),
                };
            }
            if (inputs.importance_UpdateEvent != "None") {
                jsonToSend = {
                    ...jsonToSend,
                    importance: getAccvalue(inputs, "importance_UpdateEvent"),

                };
            }
            if (inputs.categories_UpdateEvent.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    categories: inputs.categories_UpdateEvent?.map((categorie: any) => {
                        return categorie.categorie_UpdateEvent;
                    }),
                };
            }
        } else if (inputs.operation === "DeleteEvent") {
            jsonToSend = {
                ...jsonToSend,
                calendar_id: inputs.calendar_id_DeleteEvent,
                event_id: inputs.event_id_DeleteEvent,
            };
        }
    } else if (inputs.type === "Folder") {
        if (inputs.operation === "GetFolder") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folder_id_GetFolder,
            };
        } else if (inputs.operation === "GetManyFolders") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_GetManyFolder"),
                filter: getAccvalue(inputs, "filter_GetManyFolder"),
            };
        } else if (inputs.operation === "CreateFolder") {
            jsonToSend = {
                ...jsonToSend,
                displayName: inputs.displayName_CreateFolder,
            };
        } else if (inputs.operation === "UpdateFolder") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folder_id_UpdateFolder,
                displayName: getAccvalue(inputs, "displayName_UpdateFolder"),
            };
        } else if (inputs.operation === "DeleteFolder") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folder_id_DeleteFolder,
            };
        }
    } else if (inputs.type === "Folder Message") {
        if (inputs.operation === "GetManyFolderMessages") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folder_id_GetManyFolderMessage,
                limit: getAccvalue(inputs, "limit_GetManyFolderMessage"),
            };
            if (inputs.Filter_type === "filter") {
                jsonToSend = {
                    ...jsonToSend,
                    filter: inputs.filter_GetManyFolderMessage,
                };
            } else if (inputs.Filter_type === "search") {
                jsonToSend = {
                    ...jsonToSend,
                    search: inputs.search_GetManyFolderMessage,
                };
            }
        }
    } else if (inputs.type === "Message") {
        if (inputs.operation === "GetMessage") {
            jsonToSend = {
                ...jsonToSend,
                message_id: inputs.message_id_GetMessage,
            };
        } else if (inputs.operation === "GetManyMessages") {
            jsonToSend = {
                ...jsonToSend,
                limit: getAccvalue(inputs, "limit_GetManyMessage"),
            };
            if (inputs.Filter_type === "filter") {
                jsonToSend = {
                    ...jsonToSend,
                    filter: inputs.filter_GetManyMessage,
                };
            } else if (inputs.Filter_type === "search") {
                jsonToSend = {
                    ...jsonToSend,
                    search: inputs.search_GetManyMessage,
                };
            }
        } else if (inputs.operation === "SendMessage") {
            jsonToSend = {
                ...jsonToSend,
            }
            if (inputs.cc_emails_SendMessage.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    cc_emails: inputs.cc_emails_SendMessage?.map((ccmail: any) => {
                        return ccmail.cc_SendMessage;
                    }),
                };
            }
            if (inputs.bcc_emails_SendMessage.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    bcc_emails: inputs.bcc_emails_SendMessage?.map((bccmail: any) => {
                        return bccmail.bcc_SendMessage;
                    }),
                };
            }
            jsonToSend = {
                ...jsonToSend,
                to_emails: inputs.to_emails_SendMessage?.map((mail: any) => {
                    return mail.to_SendMessage;
                }),
                subject: inputs.subject_SendMessage,
                bodyFormat: inputs.bodyFormat_SendMessage,
                body: inputs.body_SendMessage,
            };
            if (inputs.attachmentsMessageSend.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    attachments: inputs.attachmentsMessageSend?.map((attach: any) => {
                        if (attach.uploadType == "ByteString") {
                            return {
                                type: attach.uploadType,
                                fileName: attach.fileName,
                                contentBytes: attach.contentBytes,
                            };
                        } else if (attach.uploadType == "url") {
                            return {
                                type: attach.uploadType,
                                fileName: attach.fileName,
                                url_attachment: attach.url_attachment,
                            };
                        }
                    }),
                };
            }
        } else if (inputs.operation === "ReplyMessage") {
            jsonToSend = {
                ...jsonToSend,
                message_id: inputs.message_id_ReplyMessage,
                reply_content_body: inputs.reply_content_body_ReplyMessage,
                reply_contentType_body:
                    inputs.reply_contentType_body_ReplyMessage,
            };
            if (inputs.attachmentsMessageReply.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    attachments: inputs.attachmentsMessageReply?.map((attach: any) => {
                        if (attach.uploadType == "ByteString") {
                            return {
                                type: attach.uploadType,
                                fileName: attach.fileName,
                                contentBytes: attach.contentBytes,
                            };
                        } else if (attach.uploadType == "url") {
                            return {
                                type: attach.uploadType,
                                fileName: attach.fileName,
                                url_attachment: attach.url_attachment,
                            };
                        }
                    }),
                };
            }
        } else if (inputs.operation === "MoveMessage") {
            jsonToSend = {
                ...jsonToSend,
                message_id: inputs.message_id_MoveMessage,
                destinationId: inputs.destinationId_MoveMessage,
            };
        } else if (inputs.operation === "DeleteMessage") {
            jsonToSend = {
                ...jsonToSend,
                message_id: inputs.message_id_DeleteMessage,
            };
        }
    } else if (inputs.type === "Message Attachment") {
        if (inputs.operation === "GetMessageAtt") {
            jsonToSend = {
                ...jsonToSend,
                message_id: inputs.message_id_GetMessageAttachment,
                attachment_id: inputs.attachment_id_GetMessageAttachment,
                returnContent: inputs.content_GetMessageAttachment.content,
            };
        } else if (inputs.operation === "GetManyMessageAtts") {
            jsonToSend = {
                ...jsonToSend,
                message_id: inputs.message_id_GetManyMessageAttachment,
                limit: getAccvalue(inputs, "limit_GetManyMessageAttachment"),
                returnContent: inputs.contents_GetManyMessageAttachment.contents,
            };
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "microsoft_outlook",
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