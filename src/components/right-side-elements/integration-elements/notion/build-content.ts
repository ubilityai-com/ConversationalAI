import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "User") {
        if (inputs.operation === "Get User") {
            jsonToSend = {
                ...jsonToSend,
                user_id: inputs.get_user_id
            };
        }
        else if (inputs.operation === "Get Many Users") {
            jsonToSend = {
                ...jsonToSend,
                page_size: inputs.get_many_users_limit

            };
        }
    } else if (inputs.type === "Page") {
        if (inputs.operation === "Get Page") {
            jsonToSend = {
                ...jsonToSend,
                page_id: inputs.get_page_id,
            };
        } else if (inputs.operation === "Create Page") {
            jsonToSend = {
                ...jsonToSend,
                parent: { type: "page_id", page_id: inputs.create_page_parent_id },
                properties: {
                    title: [
                        {
                            type: "text",
                            text: { content: inputs.create_page_title },
                            annotations: {
                                bold: inputs.create_page_title_properties.bold,
                                italic: inputs.create_page_title_properties.italic,
                                strikethrough: inputs.create_page_title_properties.strikethrough,
                                underline: inputs.create_page_title_properties.underline,
                                code: inputs.create_page_title_properties.code,
                                color: inputs.create_page_title_properties.color,
                            },

                        },
                    ],
                },
            };
        } else if (inputs.operation === "Archive Page") {
            jsonToSend = {
                ...jsonToSend,
                page_id: inputs.archive_page_id,
                archived: inputs.archive_page_archived,
            }
        }
    } else if (inputs.type === "Database") {
        if (inputs.operation === "Get Database") {
            jsonToSend = {
                ...jsonToSend,
                database_id: inputs.get_database_id
            };
        } else if (inputs.operation === "Get Many Databases") {
            jsonToSend = {
                ...jsonToSend,
                page_size: inputs.get_many_databases_limit
            }
        }
    } else if (inputs.type === "Block") {
        if (inputs.operation === "Get Block") {
            jsonToSend = {
                ...jsonToSend,
                block_id: inputs.get_block_id
            };
        }
        else if (inputs.operation === "Get Many Child Blocks") {
            jsonToSend = {
                ...jsonToSend,
                block_id: inputs.get_block_children,
                page_size: inputs.get_block_children_limit
            };
        }
        else if (inputs.operation === "Append Child Blocks") {
            jsonToSend = {
                ...jsonToSend,
                block_id: inputs.append_block_children,
                children: [{
                    object: "block",
                    type: inputs.append_child_type.option,
                    [inputs.append_child_type.option]: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    "content": inputs.append_child_type.content
                                }
                            }
                        ]
                    }
                }]
            }
            if (inputs.append_child_type.option === "to_do") {
                jsonToSend = {
                    ...jsonToSend,
                    children: [{
                        object: "block", type: inputs.append_child_type.option, [inputs.append_child_type.option]: { rich_text: [{ type: "text", text: { "content": inputs.append_child_type.content } }], checked: inputs.append_child_type.checked }
                    }]
                }
            }
            if (inputs.append_child_type.option === "image") {
                jsonToSend = {
                    ...jsonToSend,
                    children: [
                        {
                            object: "block",
                            type: inputs.append_child_type.option,
                            [inputs.append_child_type.option]: {
                                type: "external",
                                external: { "url": inputs.append_child_type.content }
                            }
                        }]
                }
            }
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "notion",
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