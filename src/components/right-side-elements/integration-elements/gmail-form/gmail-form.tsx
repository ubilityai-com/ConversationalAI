import { Node, NodeProps } from "@xyflow/react";
import { useState } from "react";
import { useDebounceConfig } from "../../../../hooks/use-debounced-config";
import { objToReturnDefaultValues, objToReturnValuesToSend } from "../../../../lib/automation-utils";
import { getNextNodeId, stringifyAndExtractVariables, validateArray } from "../../../../lib/utils";
import { useFlowStore } from "../../../../store/flow-store";
import { useRightDrawerStore } from "../../../../store/right-drawer-store";
import AutomationSimple from "../../../custom/automation-v4";
import { GmailJson } from "../../../../elements/integration-elements/GmailJson";

interface IntegrationConfigProps extends Record<string, any> {
    label: string;
    description: string;
    rightSideData: Record<string, any>;
}
interface IntegrationFormProps {
    selectedNode: NodeProps<Node<IntegrationConfigProps>>;
    handleRightSideDataUpdate: (value: any) => void;
}
const getAccvalue = (finaleObj: any, name: string) => {
    if (name.includes(".")) {
        const properties = name.split(".");
        const firstPart = properties[0];
        const secondPart = properties[1];
        return finaleObj[firstPart]
            ? finaleObj[firstPart][secondPart]
                ? finaleObj[firstPart][secondPart] || undefined
                : undefined
            : undefined;
    } else
        return finaleObj[name]
            ? finaleObj[name][name] ? finaleObj[name][name] || undefined : undefined
            : undefined;
};


export function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData
    const { edges, nodes } = params
    const finaleObj = rightSideData.json

    let jsonToSend = {};
    if (finaleObj.type === "Message") {
        jsonToSend = {
            message_id: finaleObj.messageID,
        };

        if (
            finaleObj.operation === "addLabel" ||
            finaleObj.operation === "removeLabel"
        ) {
            jsonToSend = {
                ...jsonToSend,
                label_id: finaleObj.labelNamesOrIDs,
            };
        } else if (finaleObj.operation === "getMessage") {
            jsonToSend = { ...jsonToSend, scope: finaleObj.scope };
            if (finaleObj.scope === "all") {
                jsonToSend = {
                    scope: finaleObj.scope,
                    includeSpamTrash: getAccvalue(
                        finaleObj,
                        "includeSpamAndTrashMessageGet"
                    ),
                };
                [
                    { option: "limitMessageGet", value: "maxResults", type: "number" },
                    { option: "labelNamesOrIDsMessageGet", value: "label_ids" },
                ].forEach((f) => {
                    if (
                        getAccvalue(finaleObj, f.option) &&
                        getAccvalue(finaleObj, f.option).trim()
                    )
                        jsonToSend = {
                            ...jsonToSend,
                            [f.value]: f.type === "number" ? parseInt(getAccvalue(finaleObj, f.option)) : getAccvalue(finaleObj, f.option),
                        };
                });
            }
        } else if (finaleObj.operation === "replyToMessage") {
            jsonToSend = {
                ...jsonToSend,
                in_reply_to: finaleObj.messageID,
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
            if (finaleObj.textMessage && finaleObj.textMessage.trim())
                jsonToSend = {
                    ...jsonToSend,
                    type: "html",
                    message: finaleObj.textMessage,
                };

            if (finaleObj.attachmentsMessageReply.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    attachments_list:
                        finaleObj.attachmentsMessageReply?.map((attach: any) => {
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
                    getAccvalue(finaleObj, f.option) &&
                    getAccvalue(finaleObj, f.option).trim()
                )
                    jsonToSend = {
                        ...jsonToSend,
                        [f.value]: getAccvalue(finaleObj, f.option),
                    };
            });
        } else if (finaleObj.operation === "sendMessage") {
            jsonToSend = {
                subject: finaleObj.subject,
                to: finaleObj.to,
                // type: finaleObj.emailType,
                type: "html",
                body: finaleObj.textMessage,
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
            if (finaleObj.attachmentsMessageSend.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    attachments_list:
                        finaleObj.attachmentsMessageSend?.map((attach: any) => {
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
                    getAccvalue(finaleObj, f.option) &&
                    getAccvalue(finaleObj, f.option).trim()
                )
                    jsonToSend = {
                        ...jsonToSend,
                        [f.value]: getAccvalue(finaleObj, f.option),
                    };
            });
        } else if (finaleObj.operation === "listAttachments") {
            jsonToSend = {
                message_id: finaleObj.messageID,
            };
        } else if (finaleObj.operation === "downloadAttachment") {
            jsonToSend = {
                message_id: finaleObj.messageID,
                attachment_id: finaleObj.attachmentID,
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
        }
    } else if (finaleObj.type === "Thread") {
        jsonToSend = { thread_id: finaleObj.threadID };
        if (finaleObj.operation === "deleteThread")
            jsonToSend = { thread_id: finaleObj.threadID };
        if (
            finaleObj.operation === "addLabelToThread" ||
            finaleObj.operation === "removeLabelFromThread"
        ) {
            jsonToSend = { ...jsonToSend, label_ids: finaleObj.labelNamesOrIDs };
        } else if (finaleObj.operation === "getThreads") {
            if (finaleObj.scope === "single")
                jsonToSend = {
                    ...jsonToSend,
                    scope: "single",
                };
            else if (finaleObj.scope === "all") {
                jsonToSend = {
                    scope: finaleObj.scope,
                    include_spam_trash: getAccvalue(
                        finaleObj,
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
                        getAccvalue(finaleObj, f.option) &&
                        getAccvalue(finaleObj, f.option).trim()
                    )
                        jsonToSend = {
                            ...jsonToSend,
                            [f.value]: f.type === "number" ? parseInt(getAccvalue(finaleObj, f.option)) : getAccvalue(finaleObj, f.option),
                        };
                });
            }
        } else if (finaleObj.operation === "replyToThread") {
            jsonToSend = {
                ...jsonToSend,
                in_reply_to: finaleObj.replyToThread_messageId,
                subject: getAccvalue(finaleObj, "replyToThread_subject"),
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
            if (finaleObj.textMessage && finaleObj.textMessage.trim())
                jsonToSend = {
                    ...jsonToSend,
                    email_type: "html",
                    message_body: finaleObj.textMessage,
                };
            if (finaleObj.attachmentsThreadReply.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    attachments_list:
                        finaleObj.attachmentsThreadReply?.map((attach: any) => {
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
                    getAccvalue(finaleObj, f.option) &&
                    getAccvalue(finaleObj, f.option).trim()
                )
                    jsonToSend = {
                        ...jsonToSend,
                        [f.value]: getAccvalue(finaleObj, f.option),
                    };
            });
        }
    } else if (finaleObj.type === "Draft") {
        if (finaleObj.operation === "deleteDraft")
            jsonToSend = { draft_id: finaleObj.draftID };
        else if (finaleObj.operation === "getDraft") {
            if (finaleObj.scope === "single")
                jsonToSend = {
                    draft_id: finaleObj.draftID,
                    scope: finaleObj.scope,
                };
            else if (finaleObj.scope === "all") {
                jsonToSend = { ...jsonToSend, scope: finaleObj.scope };
                if (
                    getAccvalue(finaleObj, "limitDraftGet") &&
                    getAccvalue(finaleObj, "limitDraftGet").trim()
                )
                    jsonToSend = {
                        ...jsonToSend,
                        limit: parseInt(getAccvalue(finaleObj, "limitDraftGet")),
                    };
            }
        } else if (finaleObj.operation === "createDraft") {
            jsonToSend = {
                subject: finaleObj.subject,
                to: finaleObj.toEmailDraftCreate,
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
            if (finaleObj.textMessage && finaleObj.textMessage.trim())
                jsonToSend = {
                    ...jsonToSend,
                    type: "html",
                    body: finaleObj.textMessage,
                };
            if (finaleObj.attachmentsDraftCreate.length > 0) {
                jsonToSend = {
                    ...jsonToSend,
                    attachments_list:
                        finaleObj.attachmentsDraftCreate?.map((attach: any) => {
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
                    getAccvalue(finaleObj, f.option) &&
                    getAccvalue(finaleObj, f.option).trim()
                )
                    jsonToSend = {
                        ...jsonToSend,

                        [f.value]: getAccvalue(finaleObj, f.option),
                    };
            });
        }
    } else if (finaleObj.type === "Label") {
        if (finaleObj.operation === "createLabel") {
            jsonToSend = {
                name: finaleObj.name,
                labelListVisibility: getAccvalue(
                    finaleObj,
                    "labelListVisibilityLabelCreate"
                ),
                messageListVisibility: getAccvalue(
                    finaleObj,
                    "messageListVisibilityLabelCreate"
                ),
            };
        } else if (finaleObj.operation === "deleteLabel") {
            jsonToSend = { label_id: finaleObj.labelID };
        } else if (finaleObj.operation === "getLabels") {
            if (finaleObj.scope === "single")
                jsonToSend = {
                    label_id: finaleObj.labelID,
                    scope: finaleObj.scope,
                };
            else if (finaleObj.scope === "all") {
                jsonToSend = { scope: finaleObj.scope };
                if (
                    getAccvalue(finaleObj, "limitLabelGet") &&
                    getAccvalue(finaleObj, "limitLabelGet").trim()
                )
                    jsonToSend = {
                        ...jsonToSend,
                        limit: parseInt(getAccvalue(finaleObj, "limitLabelGet")),
                    };
            }
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "gmail",
            credential: finaleObj.cred,
            operation: finaleObj.operation,
            saveOutputAs: []
        }
    }
    return {
        cred: finaleObj?.cred,
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
}: IntegrationFormProps) {
    const [schema, setSchema] = useState<any[]>(GmailJson.defaults.json);
    const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)
    const setNodeFilledDataByKey = useRightDrawerStore((state) => state.setNodeFilledDataByKey)

    const { localConfig, updateNestedConfig } =
        useDebounceConfig<IntegrationConfigProps["rightSideData"]>(
            {
                ...selectedNode.data.rightSideData,
                json: objToReturnDefaultValues(schema, selectedNode.data.rightSideData.json),

            },
            {
                delay: 300,
                onSave: (savedConfig) => {
                    setNodeFilledDataByKey(selectedNode.id, "json", savedConfig.json)

                    // Save label changes
                    updateNodesValidationById(selectedNode.id, validateArray(schema, savedConfig.json))
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
                onFieldChange={({ path, value }) => {
                    updateNestedConfig(`${"json"}.${path}`, value)
                }}
            />
        </div>
    );
}
