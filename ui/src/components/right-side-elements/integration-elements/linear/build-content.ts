import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Issue") {
        if (inputs.operation === "Get Issues") {
            jsonToSend = {
                id: inputs.IssueID_GetIssue,
            };
        } else if (inputs.operation === "Delete Issues") {
            jsonToSend = {
                id: inputs.IssueID_DeleteIssue,
            };
        } else if (inputs.operation === "Get All Issues") {
            jsonToSend = {
                first: parseInt(getAccvalue(inputs, "Limit_getallIssue")),
            };
        } else if (inputs.operation === "Create Issues") {
            jsonToSend = {
                teamId: inputs.TeamNameorID_CreateIssue,
                title: inputs.Title_CreateIssue,
                assigneeId: getAccvalue(inputs, "AssigneeNameorID_CreateIssue"),
                description: getAccvalue(inputs, "Description_CreateIssue"),
                stateId: getAccvalue(inputs, "StateNameorID_CreateIssue"),
            };
        } else if (inputs.operation === "Update Issues") {
            jsonToSend = {
                id: inputs.IssueID_UpdateIssue,
                input: {
                    teamId: getAccvalue(inputs, "TeamNameorID_UpdateIssue"),
                    title: getAccvalue(inputs, "Title_UpdateIssue"),
                    assigneeId: getAccvalue(
                        inputs,
                        "AssigneeNameorID_UpdateIssue"
                    ),
                    description: getAccvalue(inputs, "Description_UpdateIssue"),
                    stateId: getAccvalue(inputs, "StateNameorID_UpdateIssue"),
                },
            };
        } else if (inputs.operation === "Add Link Issues") {
            jsonToSend = {
                issueId: inputs.IssueID_addlink,
                title: inputs.Title_addlink,
                url: inputs.Url_addlink,
            };
        }
    } else if (inputs.type === "Comment") {
        if (inputs.operation === "Add Comment Issues") {
            jsonToSend = {
                issueId: inputs.IssueID_AddCommentIssues,
                body: inputs.Body_AddCommentIssues,
            };
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "linear",
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