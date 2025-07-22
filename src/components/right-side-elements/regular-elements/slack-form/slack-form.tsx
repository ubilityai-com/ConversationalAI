import { Node, NodeProps } from "@xyflow/react";
import { useState } from "react";
import { SlackJson } from "../../../../elements/regular-elements/SlackJson";
import { useDebounceConfig } from "../../../../hooks/use-debounced-config";
import { objToReturnDefaultValues, objToReturnValuesToSend } from "../../../../lib/automation-utils";
import { getNextNodeId, stringifyAndExtractVariables } from "../../../../lib/utils";
import { useFlowStore } from "../../../../store/flow-store";
import { useRightDrawerStore } from "../../../../store/right-drawer-store";
import AutomationSimple from "../../../custom/automation-v4";

interface RegularConfigProps extends Record<string, any> {
    label: string;
    description: string;
    rightSideData: Record<string, any>;
}
interface RegularFormProps {
    selectedNode: NodeProps<Node<RegularConfigProps>>;
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
function isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
const getOperationName = (type: string, operation: string) => {
    let opToReturn;

    [
        { type: "Message", operation: "Send", toReturn: "SEND_MESSAGE" },
        { type: "Message", operation: "Update", toReturn: "UPDATE_MSG" },
        { type: "Message", operation: "Delete", toReturn: "DELETE_MSG" },
        { type: "Message", operation: "Get Permalink", toReturn: "GET_PERMALINK" },
        { type: "Channel", operation: "Get", toReturn: "GET_CHANNEL" },
        { type: "Channel", operation: "Get Many", toReturn: "GET_MANY_CHANNELS" },
        { type: "Channel", operation: "Create", toReturn: "CREATE_CHANNEL" },
        { type: "Channel", operation: "Archive", toReturn: "ARCHIVE_CONVERSATION" },
        {
            type: "Channel",
            operation: "UnArchive",
            toReturn: "UNARCHIVE_CONVERSATION",
        },
        { type: "Channel", operation: "Rename", toReturn: "RENAME_CONVERSATION" },
        { type: "Channel", operation: "Get Members", toReturn: "GET_MEMBERS" },
        {
            type: "Channel",
            operation: "Join Conversation",
            toReturn: "JOIN_CONVERSATION",
        },
        {
            type: "Channel",
            operation: "Leave Conversation",
            toReturn: "LEAVE_CONVERSATION",
        },
        { type: "Channel", operation: "Invite Users", toReturn: "INVITE_USERS" },
        { type: "User", operation: "Get", toReturn: "GET_USER" },
        { type: "User", operation: "Get Many", toReturn: "GET_MANY_USERS" },
        { type: "User", operation: "Get User Status", toReturn: "GET_USER_STATUS" },
        { type: "File", operation: "Get", toReturn: "GET_FILE" },
        { type: "File", operation: "Get Many", toReturn: "GET_MANY_FILES" },
        { type: "File", operation: "Upload", toReturn: "UPLOAD_FILE" },
        { type: "User Group", operation: "Get Many", toReturn: "GET_USER_GROUPS" },
        { type: "User Group", operation: "Create", toReturn: "CREATE_USER_GROUP" },
        { type: "User Group", operation: "Update", toReturn: "UPDATE_USER_GROUP" },
        {
            type: "User Group",
            operation: "Disable",
            toReturn: "DISABLE_USER_GROUP",
        },
        { type: "User Group", operation: "Enable", toReturn: "ENABLE_USER_GROUP" },
    ].forEach((op) => {
        if (op.type === type && op.operation === operation) {
            opToReturn = op.toReturn;
        }
    });
    return opToReturn;
};
export function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData
    const { edges, nodes } = params
    const json = rightSideData.json
    console.log({ rightSideData, json });

    let jsonToSend = {};
    if (json.type === "Message") {
        if (json.operation === "Send") {
            if (json.receiverType === "User")
                jsonToSend = { channel: json.user };
            else jsonToSend = { channel: json.channel };
            if (json.messageType === "Blocks") {
                jsonToSend = {
                    ...jsonToSend,
                    blocks: isJsonString(json.blocks)
                        ? JSON.parse(json.blocks)
                        : json.blocks,
                };
            } else if (
                json.messageType === "Simple Text Message" &&
                json.textMessage &&
                json.textMessage.trim()
            ) {
                jsonToSend = { ...jsonToSend, text: json.textMessage };
            } else if (json.messageType === "Attachments") {
                jsonToSend = {
                    ...jsonToSend,
                    attachments:
                        json.hasOwnProperty("Attachments") &&
                            json.Attachments.length > 0
                            ? json.Attachments.map((attach: any) => {
                                return {
                                    fallback: attach.fallbackText,
                                    pretext: attach.pretext,
                                    author_name: attach.authorName,
                                    author_link: attach.authorLink,
                                    title: attach.title,
                                    title_link: attach.titleLink,
                                    text: attach.text,
                                    image_url: attach.imageURL,
                                    thumb_url: attach.thumbnailURL,
                                    footer: attach.footer,
                                    ts: attach.messageTimestamp?.toString(),
                                    fields: attach.Fields,
                                    color: attach.color,
                                };
                            })
                            : [],
                };
            }
            if (
                json.hasOwnProperty("replyToMessageMessageSend") &&
                json.replyToMessageMessageSend
                    .messageTimestampToReplyToMessageSend &&
                json.replyToMessageMessageSend.messageTimestampToReplyToMessageSend.trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    thread_ts:
                        json.replyToMessageMessageSend
                            .messageTimestampToReplyToMessageSend,
                    reply_broadcast:
                        json.replyToMessageMessageSend.replyToThreadMessageSend,
                };
            jsonToSend = {
                ...jsonToSend,
                link_names: getAccvalue(
                    json,
                    "linkUserAndChannelNameMessageSend"
                ),
                mrkdwn: getAccvalue(json, "useMarkDownMessageSend"),
                unfurl_links: getAccvalue(json, "unfurlLinksMessageSend"),
                unfurl_media: getAccvalue(json, "unfurlMediaMessageSend"),
                as_user: getAccvalue(json, "sendAsUserMessageSend"),
            };
        } else if (json.operation === "Update") {
            if (json.receiverType === "User")
                jsonToSend = { channel: json.user };
            else jsonToSend = { channel: json.channel };
            jsonToSend = {
                ...jsonToSend,
                ts: json.messageTimestamp.toString(),
                link_names: getAccvalue(
                    json,
                    "linkUserAndChannelNameMessageUpdate"
                ),
                reply_broadcast: getAccvalue(
                    json,
                    "replyBroadcastMessageUpdate"
                ),
                as_user: getAccvalue(json, "asUserMessageUpdate"),
            };
            if (json.textMessage && json.textMessage.trim())
                jsonToSend = { ...jsonToSend, text: json.textMessage };
            if (
                getAccvalue(json, "fileIDsMessageUpdate") &&
                getAccvalue(json, "fileIDsMessageUpdate").trim()
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    file_ids: getAccvalue(json, "fileIDsMessageUpdate").trim(),
                };
            }
        } else if (json.operation === "Delete") {
            if (json.receiverType === "User")
                jsonToSend = { channel: json.user };
            else jsonToSend = { channel: json.channel };
            jsonToSend = {
                ...jsonToSend,
                ts: json.messageTimestamp.toString(),
            };
        } else if (json.operation === "Get Permalink") {
            jsonToSend = {
                ...jsonToSend,
                message_ts: json.messageTimestamp.toString(),
                channel:
                    json.getFrom === "Channel"
                        ? json.channel
                        : json.userID,
            };
        }
    } else if (json.type === "Channel") {
        if (json.operation === "Get") {
            jsonToSend = {
                ...jsonToSend,
                channel: json.channel,
                include_num_members: getAccvalue(
                    json,
                    "includeNumOfMembersChannelGet"
                ),
            };
        } else if (json.operation === "Get Many") {
            jsonToSend = {
                ...jsonToSend,
                types: Array.isArray(getAccvalue(json, "typesChannelGetMany"))
                    ? getAccvalue(json, "typesChannelGetMany").map((o: any) => {
                        return o.option?.toLowerCase();
                    })
                    : [],
                exclude_archived: getAccvalue(
                    json,
                    "excludeArchivedChannelGetMany"
                ),
            };
        } else if (json.operation === "Create") {
            jsonToSend = {
                ...jsonToSend,
                name: json.channel,
                is_private: json.privateChannel,
            };
        } else if (json.operation === "Rename") {
            jsonToSend = {
                ...jsonToSend,
                channel: json.channel,
                name: json.name,
            };
        } else if (
            json.operation === "Archive" ||
            json.operation === "UnArchive" ||
            json.operation === "Get Members" ||
            json.operation === "Join Conversation" ||
            json.operation === "Leave Conversation"
        ) {
            jsonToSend = {
                ...jsonToSend,
                channel: json.channel,
            };
        } else if (json.operation === "Invite Users") {
            jsonToSend = {
                ...jsonToSend,
                channel: json.channel,
                users: json.users.map((o: any) => o.value),
            };
        }
    } else if (json.type === "User") {
        if (
            json.operation === "Get" ||
            json.operation === "Get User Status"
        ) {
            jsonToSend = { user: json.user };
        }
    } else if (json.type === "File") {
        if (json.operation === "Get") {
            jsonToSend = {
                file: json.fileID,
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}",
                download_file: getAccvalue(json, "downloadFile_GetFile.downloadFile_Optional_GetFile"),
            };
        } else if (json.operation === "Get Many") {
            if (
                getAccvalue(json, "channelNameOrIDFileGetMany") &&
                getAccvalue(json, "channelNameOrIDFileGetMany").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    channel: getAccvalue(json, "channelNameOrIDFileGetMany"),
                };
            if (
                getAccvalue(json, "userNameOrIDFileGetMany") &&
                getAccvalue(json, "userNameOrIDFileGetMany").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    user: getAccvalue(json, "userNameOrIDFileGetMany"),
                };
            if (
                getAccvalue(json, "messageTimestampFromFileGetMany") &&
                getAccvalue(json, "messageTimestampFromFileGetMany").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    ts_from: getAccvalue(
                        json,
                        "messageTimestampFromFileGetMany"
                    ),
                };
            if (
                getAccvalue(json, "messageTimestampToFileGetMany") &&
                getAccvalue(json, "messageTimestampToFileGetMany").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    ts_to: getAccvalue(json, "messageTimestampToFileGetMany"),
                };
            jsonToSend = {
                ...jsonToSend,
                show_files_hidden_by_limit: getAccvalue(
                    json,
                    "showFilesHiddenByLimitFileGetMany"
                ),
                types: Array.isArray(getAccvalue(json, "typesFileGetMany"))
                    ? getAccvalue(json, "typesFileGetMany").length === 6
                        ? ["all"]
                        : getAccvalue(json, "typesFileGetMany").map(
                            (o: any) => o.option
                        )
                    : [],
            };
        } else if (json.operation === "Upload") {
            jsonToSend = {
                ...jsonToSend,
                channel: json["channelNameOrIDFileUpload"],
                user_id: "${u1s2e3r4i5d6}",
                flow_id: "${f1l2o3w4i5d6}"
            };
            if (
                getAccvalue(json, "titleFileUpload") &&
                getAccvalue(json, "titleFileUpload").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    title: getAccvalue(json, "titleFileUpload"),
                }; // String
            if (
                getAccvalue(json, "initialCommentFileUpload") &&
                getAccvalue(json, "initialCommentFileUpload").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    initial_comment: getAccvalue(
                        json,
                        "initialCommentFileUpload"
                    ),
                };
            if (
                getAccvalue(json, "threadTimestampFileUpload") &&
                getAccvalue(json, "threadTimestampFileUpload").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    thread_ts: getAccvalue(
                        json,
                        "threadTimestampFileUpload"
                    ).toString(),
                }; // String => timestamp
            if (json.uploadType === "Url")
                jsonToSend = {
                    ...jsonToSend,
                    url: json.url,
                    filename: json.fileName,
                };
            else if (json.uploadType === "File Content")
                jsonToSend = {
                    ...jsonToSend,
                    content: json.fileContent,
                    filename: json.fileName, // String
                };
        }
    } else if (json.type === "User Group") {
        if (json.operation === "Get Many") {
            jsonToSend = {
                include_count: getAccvalue(json, "includeCountUserGroupGet"),
                include_disabled: getAccvalue(
                    json,
                    "includeDisabledUserGroupGet"
                ),
                include_users: getAccvalue(json, "includeUsersUserGroupGet"),
            };
        } else if (json.operation === "Create") {
            jsonToSend = {
                name: json.name,
                include_count: getAccvalue(
                    json,
                    "includeCountUserGroupCreate"
                ),
            };
            if (
                getAccvalue(json, "channelNameOrIDUserGroupCreate") &&
                getAccvalue(json, "channelNameOrIDUserGroupCreate").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    channels: getAccvalue(json, "channelNameOrID"),
                };
            if (
                getAccvalue(json, "descriptionUserGroupCreate") &&
                getAccvalue(json, "descriptionUserGroupCreate").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    description: getAccvalue(json, "descriptionUserGroupCreate"),
                };
            if (
                getAccvalue(json, "handleUserGroupCreate") &&
                getAccvalue(json, "handleUserGroupCreate").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    handle: getAccvalue(json, "handleUserGroupCreate"),
                };
        } else if (json.operation == "Update") {
            jsonToSend = {
                usergroup: json.userGroupID,
                include_count: getAccvalue(
                    json,
                    "includeCountUserGroupUpdate"
                ),
            };
            if (
                getAccvalue(json, "channelNameOrIDUserGroupUpdate") &&
                getAccvalue(json, "channelNameOrIDUserGroupUpdate").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    channels: getAccvalue(
                        json,
                        "channelNameOrIDUserGroupUpdate"
                    ),
                };
            if (
                getAccvalue(json, "descriptionUserGroupUpdate") &&
                getAccvalue(json, "descriptionUserGroupUpdate").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    description: getAccvalue(json, "descriptionUserGroupUpdate"),
                };
            if (
                getAccvalue(json, "handleUserGroupUpdate") &&
                getAccvalue(json, "handleUserGroupUpdate").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    handle: getAccvalue(json, "handleUserGroupUpdate"),
                };

            if (
                getAccvalue(json, "nameUserGroupUpdate") &&
                getAccvalue(json, "nameUserGroupUpdate").trim()
            )
                jsonToSend = {
                    ...jsonToSend,
                    name: getAccvalue(json, "nameUserGroupUpdate"),
                };
        } else if (json.operation === "Enable") {
            jsonToSend = {
                usergroup: json.userGroupIDGroupEnable,
                include_count: getAccvalue(
                    json,
                    "includeCountUserGroupEnable"
                ),
            };
        } else if (json.operation === "Disable") {
            jsonToSend = {
                usergroup: json.userGroupIDGroupDisable,
                include_count: getAccvalue(
                    json,
                    "includeCountUserGroupDisable"
                ),
            };
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "slack",
            credential: json.cred,
            operation: getOperationName(json.type, json.operation),
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

export default function SlackForm({
    selectedNode,
    handleRightSideDataUpdate,
}: RegularFormProps) {
    const [schema, setSchema] = useState<any[]>(SlackJson.defaults.json);
    const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)
    const setNodeFilledDataByKey = useRightDrawerStore((state) => state.setNodeFilledDataByKey)

    const { localConfig, updateNestedConfig, setLocalConfig } =
        useDebounceConfig<RegularConfigProps["rightSideData"]>(
            {
                ...selectedNode.data.rightSideData,
                json: objToReturnDefaultValues(schema, selectedNode.data.rightSideData.json),


            },
            {
                delay: 300,
                onSave: (savedConfig) => {
                    console.log({ savedConfig, selectedNode });
                    setNodeFilledDataByKey(selectedNode.id, "json", savedConfig.json)

                    // Save label changes   
                    const nodeValid = useRightDrawerStore.getState().automation.validation[selectedNode.id].json
                    updateNodesValidationById(selectedNode.id, nodeValid)
                    handleRightSideDataUpdate({

                        ...savedConfig,
                        json: objToReturnValuesToSend(schema, savedConfig.json)


                    });
                    // handleRightSideDataUpdate(savedConfig)
                },
            }
        );
    console.log({ selectedNode, localConfig });
    // useEffect(() => {
    //     console.log("mount");

    //     return () => {
    //         console.log("unmounnnnt");
    //         setLocalConfig({ ...selectedNode.data.rightSideData, json: objToReturnDefaultValues(schema, localConfig.json) })

    //     }
    // }, [])
    return (
        <div className="space-y-6">
            <AutomationSimple
                filledDataName="json"
                schema={schema}
                fieldValues={localConfig.json}
                setSchema={setSchema}
                flowZoneSelectedId={selectedNode.id}
                onFieldChange={({ path, value }) => {
                    console.log({ path, value });
                    updateNestedConfig(`${"json"}.${path}`, value)
                }}
            />
        </div>
    );
}
