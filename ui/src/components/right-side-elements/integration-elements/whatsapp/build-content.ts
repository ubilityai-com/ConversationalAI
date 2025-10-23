import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Message") {
        if (inputs.operation === "Send Message") {
            jsonToSend = {
                ...jsonToSend,
                phone_number_id: inputs.phone_number_id_SendMessage,
                to: inputs.to_SendMessage,
                type: inputs.MessageType_SendMessage,
            };
            if (inputs.MessageType_SendMessage === "text") {
                jsonToSend = {
                    ...jsonToSend,
                    text: {
                        body: inputs.body_SendTextMessage,
                        preview_url: getAccvalue(
                            inputs,
                            "preview_url_SendTextMessage"
                        ),
                    },
                };
            } else if (inputs.MessageType_SendMessage === "audio") {
                jsonToSend = {
                    ...jsonToSend,
                    audio: {
                        link: inputs.link_SendAudioMessage,
                        id: inputs.mediaID_SendAudioMessage,
                    },
                };
            } else if (inputs.MessageType_SendMessage === "contacts") {
                jsonToSend = {
                    ...jsonToSend,
                    contacts: [
                        {
                            name: {
                                formatted_name:
                                    inputs.formatted_name_SendContactsMessage,
                                first_name: inputs.first_name_SendContactsMessage,
                                last_name: inputs.last_name_SendContactsMessage,
                                middle_name: inputs.middle_name_SendContactsMessage,
                                suffix: inputs.suffix_SendContactsMessage,
                                prefix: inputs.prefix_SendContactsMessage,
                            },
                            birthday: getAccvalue(
                                inputs,
                                "birthday_SendContactsMessage"
                            ),
                            org: {
                                company: getAccvalue(
                                    inputs,
                                    "organization_SendContactsMessage.company_SendContactsMessage"
                                ),
                                title: getAccvalue(
                                    inputs,
                                    "organization_SendContactsMessage.title_SendContactsMessage"
                                ),
                                department: getAccvalue(
                                    inputs,
                                    "organization_SendContactsMessage.department_SendContactsMessage"
                                ),
                            },
                            addresses: inputs.addresses_SendContactsMessage?.map(
                                (address:any) => {
                                    return {
                                        type: address.type_SendContactsMessage,
                                        street: address.street_SendContactsMessage,
                                        city: address.city_SendContactsMessage,
                                        state: address.state_SendContactsMessage,
                                        zip: address.zip_SendContactsMessage,
                                        country: address.country_SendContactsMessage,
                                        country_code: address.country_code_SendContactsMessage,
                                    };
                                }
                            ),
                            emails: inputs.emails_SendContactsMessage?.map((email:any) => {
                                return {
                                    type: email.type_emails_SendContactsMessage,
                                    email: email.email_emails_SendContactsMessage,
                                };
                            }),
                            phones: inputs.phones_SendContactsMessage?.map((phone:any) => {
                                return {
                                    type: phone.type_phones_SendContactsMessage,
                                    phone: phone.phone_phones_SendContactsMessage,
                                };
                            }),
                            urls: inputs.urls_SendContactsMessage?.map((url:any) => {
                                return {
                                    type: url.type_urls_SendContactsMessage,
                                    url: url.url_urls_SendContactsMessage,
                                };
                            }),
                        },
                    ],
                };
            } else if (inputs.MessageType_SendMessage === "document") {
                jsonToSend = {
                    ...jsonToSend,
                    document: {
                        link: inputs.link_SendDocumentMessage,
                        id: inputs.mediaID_SendDocumentMessage,
                        filename: getAccvalue(
                            inputs,
                            "filename_SendDocumentMessage"
                        ),
                        caption: getAccvalue(inputs, "caption_SendDocumentMessage"),
                    },
                };
            } else if (inputs.MessageType_SendMessage === "image") {
                jsonToSend = {
                    ...jsonToSend,
                    image: {
                        link: inputs.link_SendImageMessage,
                        id: inputs.mediaID_SendImageMessage,
                        caption: getAccvalue(inputs, "caption_SendImageMessage"),
                    },
                };
            } else if (inputs.MessageType_SendMessage === "location") {
                jsonToSend = {
                    ...jsonToSend,
                    location: {
                        latitude: inputs.latitude_SendLocationMessage,
                        longitude: inputs.longitude_SendLocationMessage,
                        name: getAccvalue(inputs, "name_SendLocationMessage"),
                        address: getAccvalue(inputs, "address_SendLocationMessage"),
                    },
                };
            } else if (inputs.MessageType_SendMessage === "video") {
                jsonToSend = {
                    ...jsonToSend,
                    video: {
                        link: inputs.link_SendVideoMessage,
                        id: inputs.mediaID_SendVideoMessage,
                        caption: getAccvalue(inputs, "caption_SendVideoMessage"),
                    },
                };
            }
        }
        else if (inputs.operation === "Send Template Message") {
            jsonToSend = {
                ...jsonToSend,
                phone_number_id: inputs.phone_number_id_SendMessageTemplate,
                to: inputs.to_SendMessageTemplate,
                template_value: inputs.template_SendMessageTemplate,
                // components: inputs.components_SendMessageTemplate?.map(
                //   (component) => {
                //     return {
                //       type: component.type_component_SendMessageTemplate,
                //       // parameters: component.parameters.map((param) => {
                //       //   return {
                //       //     type: param.type,
                //       //     text: param.text,
                //       //   };
                //       // }),
                //     };
                //   }
                // ),
            };
        }
    }
    else if (inputs.type === "Media") {
        if (inputs.operation === "Get Media") {
            jsonToSend = {
                ...jsonToSend,
                media_id: inputs.mediaID_GetMedia,
            };
        }
        else if (inputs.operation === "Download Media") {
            jsonToSend = {
                ...jsonToSend,
                media_url: inputs.mediaURL_DownloadMedia,
                media_type: inputs.mediaMimeType_DownloadMedia,
            };
        }
        else if (inputs.operation === "Download Trigger Media") {
            jsonToSend = {
                ...jsonToSend,
                media_id: inputs.mediaID_DownloadTriggerMedia,
            };
        }
        else if (inputs.operation === "Upload Media") {
            jsonToSend = {
                ...jsonToSend,
                phone_number_id: inputs.phone_number_id_UploadMedia,
                media_type: inputs.fileContentType_UploadMedia,
            }
            if (inputs.uploadFrom_UploadMedia === "url") {
                jsonToSend = {
                    ...jsonToSend,
                    url: inputs.fileURL_UploadMedia,
                }
            }
            else if (inputs.uploadFrom_UploadMedia === "byteString") {
                jsonToSend = {
                    ...jsonToSend,
                    content: inputs.fileContent_UploadMedia,
                }
            }
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "whatsapp",
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