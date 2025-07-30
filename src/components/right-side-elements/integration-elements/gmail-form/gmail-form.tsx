import { useState } from "react";
import { GmailJson } from "../../../../elements/integration-elements/GmailJson";
import { useDebounceConfig } from "../../../../hooks/use-debounced-config";
import { getAccvalue, objToReturnDefaultValues, objToReturnValuesToSend } from "../../../../lib/automation-utils";
import { getNextNodeId, stringifyAndExtractVariables, validateArray } from "../../../../lib/utils";
import { useFlowStore } from "../../../../store/flow-store";
import { useRightDrawerStore } from "../../../../store/right-drawer-store";
import { NodeConfigProps, NodeFormProps } from "../../../../types/automation-types";
import AutomationSimple from "../../../custom/automation-v4";


export function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData
    const { edges, nodes } = params
    const json = rightSideData.json

    let jsonToSend = {};
    if (json.type === "Message") {
        jsonToSend = {
            message_id: json.messageID,
        };

        if (
            json.operation === "addLabel" ||
            json.operation === "removeLabel"
        ) {
            jsonToSend = {
                ...jsonToSend,
                label_id: json.labelNamesOrIDs,
            };
        } else if (json.operation === "getMessage") {
            jsonToSend = { ...jsonToSend, scope: json.scope };
            if (json.scope === "all") {
                jsonToSend = {
                    scope: json.scope,
                    includeSpamTrash: getAccvalue(
                        json,
                        "includeSpamAndTrashMessageGet"
                    ),
                };
                [
                    { option: "limitMessageGet", value: "maxResults", type: "number" },
                    { option: "labelNamesOrIDsMessageGet", value: "label_ids" },
                ].forEach((f) => {
                    if (
                        getAccvalue(json, f.option) &&
                        getAccvalue(json, f.option).trim()
                    )
                        jsonToSend = {
                            ...jsonToSend,
                            [f.value]: f.type === "number" ? parseInt(getAccvalue(json, f.option)) : getAccvalue(json, f.option),
                        };
                });
            }
        } else if (json.operation === "replyToMessage") {
            jsonToSend = {
                ...jsonToSend,
                in_reply_to: json.messageID,
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
            if (json.textMessage && json.textMessage.trim())
                jsonToSend = {
                    ...jsonToSend,
                    type: "html",
                    message: json.textMessage,
                };

            if (json.attachmentsMessageReply.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    attachments_list:
                        json.attachmentsMessageReply?.map((attach: any) => {
                            if (attach.uploadType == "ByteString") {
                                return {
                                    type: attach.uploadType,
                                    name: attach.fileName,
                                    content: attach.content,
                                }
                            } else if (attach.uploadType == "URL") {
                                return {
                                    type: attach.uploadType,
                                    name: attach.fileName,
                                    url: attach.url,
                                }
                            }
                        })
                }
            }
            [
                { option: "bccMessageReply", value: "bcc_recipients" },
                { option: "ccMessageReply", value: "cc_recipients" },
            ].forEach((f) => {
                if (
                    getAccvalue(json, f.option) &&
                    getAccvalue(json, f.option).trim()
                )
                    jsonToSend = {
                        ...jsonToSend,
                        [f.value]: getAccvalue(json, f.option),
                    };
            });
        } else if (json.operation === "sendMessage") {
            jsonToSend = {
                subject: json.subject,
                to: json.to,
                // type: json.emailType,
                type: "html",
                body: json.textMessage,
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
            if (json.attachmentsMessageSend.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    attachments_list:
                        json.attachmentsMessageSend?.map((attach: any) => {
                            if (attach.uploadType == "File") {
                                return {
                                    type: attach.uploadType,
                                    name: attach.fileName,
                                    content: attach.content,
                                }
                            } else if (attach.uploadType == "URL") {
                                return {
                                    type: attach.uploadType,
                                    name: attach.fileName,
                                    url: attach.url,
                                }
                            }
                        })
                }
            }

            [
                { option: "bccMessageSend", value: "bcc" },
                { option: "ccMessageSend", value: "cc" },
                // { option: "senderNameMessageSend", value: "from" },
            ].forEach((f) => {
                if (
                    getAccvalue(json, f.option) &&
                    getAccvalue(json, f.option).trim()
                )
                    jsonToSend = {
                        ...jsonToSend,
                        [f.value]: getAccvalue(json, f.option),
                    };
            });
        } else if (json.operation === "listAttachments") {
            jsonToSend = {
                message_id: json.messageID,
            };
        } else if (json.operation === "downloadAttachment") {
            jsonToSend = {
                message_id: json.messageID,
                attachment_id: json.attachmentID,
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
        }
    } else if (json.type === "Thread") {
        jsonToSend = { thread_id: json.threadID };
        if (json.operation === "deleteThread")
            jsonToSend = { thread_id: json.threadID };
        if (
            json.operation === "addLabelToThread" ||
            json.operation === "removeLabelFromThread"
        ) {
            jsonToSend = { ...jsonToSend, label_ids: json.labelNamesOrIDs };
        } else if (json.operation === "getThreads") {
            if (json.scope === "single")
                jsonToSend = {
                    ...jsonToSend,
                    scope: "single",
                };
            else if (json.scope === "all") {
                jsonToSend = {
                    scope: json.scope,
                    include_spam_trash: getAccvalue(
                        json,
                        "includeSpamAndTrashThreadGet"
                    ),
                };
                [
                    { option: "limitThreadGet", value: "limit", type: "number" },
                    { option: "labelNamesOrIDsThreadGet", value: "label_ids" },
                    { option: "receivedAfterThreadGet", value: "received_after" },
                    { option: "receivedBeforeThreadGet", value: "received_before" },
                    { option: "searchThreadGet", value: "search" },
                    { option: "readStatusThreadGet", value: "read_status" },
                ].forEach((f) => {
                    if (
                        getAccvalue(json, f.option) &&
                        getAccvalue(json, f.option).trim()
                    )
                        jsonToSend = {
                            ...jsonToSend,
                            [f.value]: f.type === "number" ? parseInt(getAccvalue(json, f.option)) : getAccvalue(json, f.option),
                        };
                });
            }
        } else if (json.operation === "replyToThread") {
            jsonToSend = {
                ...jsonToSend,
                in_reply_to: json.replyToThread_messageId,
                subject: getAccvalue(json, "replyToThread_subject"),
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
            if (json.textMessage && json.textMessage.trim())
                jsonToSend = {
                    ...jsonToSend,
                    email_type: "html",
                    message_body: json.textMessage,
                };
            if (json.attachmentsThreadReply.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    attachments_list:
                        json.attachmentsThreadReply?.map((attach: any) => {
                            if (attach.uploadType == "ByteString") {
                                return {
                                    type: attach.uploadType,
                                    name: attach.fileName,
                                    content: attach.content,
                                }
                            } else if (attach.uploadType == "URL") {
                                return {
                                    type: attach.uploadType,
                                    name: attach.fileName,
                                    url: attach.url,
                                }
                            }
                        })
                }
            }

            [
                { option: "bccThreadReply", value: "bcc_recipients" },
                { option: "ccThreadReply", value: "cc_recipients" },
            ].forEach((f) => {
                if (
                    getAccvalue(json, f.option) &&
                    getAccvalue(json, f.option).trim()
                )
                    jsonToSend = {
                        ...jsonToSend,
                        [f.value]: getAccvalue(json, f.option),
                    };
            });
        }
    } else if (json.type === "Draft") {
        if (json.operation === "deleteDraft")
            jsonToSend = { draft_id: json.draftID };
        else if (json.operation === "getDraft") {
            if (json.scope === "single")
                jsonToSend = {
                    draft_id: json.draftID,
                    scope: json.scope,
                };
            else if (json.scope === "all") {
                jsonToSend = { ...jsonToSend, scope: json.scope };
                if (
                    getAccvalue(json, "limitDraftGet") &&
                    getAccvalue(json, "limitDraftGet").trim()
                )
                    jsonToSend = {
                        ...jsonToSend,
                        limit: parseInt(getAccvalue(json, "limitDraftGet")),
                    };
            }
        } else if (json.operation === "createDraft") {
            jsonToSend = {
                subject: json.subject,
                to: json.toEmailDraftCreate,
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
            if (json.textMessage && json.textMessage.trim())
                jsonToSend = {
                    ...jsonToSend,
                    type: "html",
                    body: json.textMessage,
                };
            if (json.attachmentsDraftCreate.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    attachments_list:
                        json.attachmentsDraftCreate?.map((attach: any) => {
                            if (attach.uploadType == "ByteString") {
                                return {
                                    type: attach.uploadType,
                                    name: attach.fileName,
                                    content: attach.content,
                                }
                            } else if (attach.uploadType == "URL") {
                                return {
                                    type: attach.uploadType,
                                    name: attach.fileName,
                                    url: attach.url,
                                }
                            }
                        })
                }
            }

            [
                { option: "bccDraftCreate", value: "bcc" },
                { option: "ccDraftCreate", value: "cc" },
                // { option: "toEmailDraftCreate", value: "to" },
            ].forEach((f) => {
                if (
                    getAccvalue(json, f.option) &&
                    getAccvalue(json, f.option).trim()
                )
                    jsonToSend = {
                        ...jsonToSend,

                        [f.value]: getAccvalue(json, f.option),
                    };
            });
        }
    } else if (json.type === "Label") {
        if (json.operation === "createLabel") {
            jsonToSend = {
                name: json.name,
                labelListVisibility: getAccvalue(
                    json,
                    "labelListVisibilityLabelCreate"
                ),
                messageListVisibility: getAccvalue(
                    json,
                    "messageListVisibilityLabelCreate"
                ),
            };
        } else if (json.operation === "deleteLabel") {
            jsonToSend = { label_id: json.labelID };
        } else if (json.operation === "getLabels") {
            if (json.scope === "single")
                jsonToSend = {
                    label_id: json.labelID,
                    scope: json.scope,
                };
            else if (json.scope === "all") {
                jsonToSend = { scope: json.scope };
                if (
                    getAccvalue(json, "limitLabelGet") &&
                    getAccvalue(json, "limitLabelGet").trim()
                )
                    jsonToSend = {
                        ...jsonToSend,
                        limit: parseInt(getAccvalue(json, "limitLabelGet")),
                    };
            }
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "gmail",
            credential: json.cred,
            operation: json.operation,
            saveOutputAs: []
        }
    }
    return {
        cred: json?.cred,
        type: "AppIntegration",
        content: content,
        saveUserInputAs: null,
        next: getNextNodeId(selectedNode.id, edges, nodes, null),
        usedVariables: stringifyAndExtractVariables(content)
    };
}

export default function GmailForm({
    selectedNode,
    handleRightSideDataUpdate,
}: NodeFormProps) {
    const [schema, setSchema] = useState<any[]>(GmailJson.defaults.json);
    const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)
    const setNodeFilledDataByKey = useRightDrawerStore((state) => state.setNodeFilledDataByKey)

    const { localConfig, updateNestedConfig } =
        useDebounceConfig<NodeConfigProps["rightSideData"]>(
            {
                ...selectedNode.data.rightSideData,
                json: objToReturnDefaultValues(schema, selectedNode.data.rightSideData.json),

            },
            {
                delay: 300,
                onSave: (savedConfig) => {
                    setNodeFilledDataByKey(selectedNode.id, "json", savedConfig.json)

                    // Save label changes
                    const nodeValid = validateArray(schema, savedConfig.json);
                    updateNodesValidationById(selectedNode.id, !!nodeValid);
                    handleRightSideDataUpdate({
                        ...savedConfig,
                        json: objToReturnValuesToSend(schema, savedConfig.json)

                    });
                },
            }
        );

    return (
        <div className="space-y-6">
            <AutomationSimple
                filledDataName="json"
                schema={schema}
                fieldValues={localConfig.json}
                setSchema={setSchema}
                flowZoneSelectedId={selectedNode.id}
                onFieldChange={(partialState, replace) => {

                    if (replace) updateNestedConfig(`${"json"}`, partialState);
                    else
                        updateNestedConfig(`${"json"}`, {
                            ...localConfig.json,
                            ...partialState,
                        });
                }}
            />
        </div>
    );
}
