import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";
type Option = { option: string, value: string, type?: string }
export default function getContent(selectedNode: any) {
  const rightSideData = selectedNode.data.rightSideData;
  const inputs = rightSideData.json;

  let jsonToSend = {};

  if (inputs.type === "Issue") {
    if (inputs.operation === "Get Issue") {
      jsonToSend = {
        id: inputs.issueKeyGet,
      };
      [
        { option: "expand", value: "expand" },
        { option: "fields", value: "fields" },
        { option: "properties", value: "properties" },
      ].map((f: Option) => {
        if (
          getAccvalue(inputs, f.option) &&
          getAccvalue(inputs, f.option).toString().trim()
        )
          jsonToSend = {
            ...jsonToSend,
            [f.value]: f.type === "integer" ? parseInt(getAccvalue(inputs, f.option)) || getAccvalue(inputs, f.option) : getAccvalue(inputs, f.option),
          };
      });
    }
    else if (inputs.operation === "List Issues") {
      jsonToSend = {
        ...jsonToSend,
        jql_str: {
          project: inputs.projectIdGetMany,
          status: inputs.statusGetMany
        },
        maxResults: inputs.limitGetMany
      };
      [
        { option: "expandGetMany", value: "expand" },
        { option: "fieldsGetMany", value: "fields" },
        { option: "propertiesGetMany", value: "properties" },
      ].map((f: Option) => {
        if (
          getAccvalue(inputs, f.option) &&
          getAccvalue(inputs, f.option).toString().trim()
        )
          jsonToSend = {
            ...jsonToSend,
            [f.value]: f.type === "integer" ? parseInt(getAccvalue(inputs, f.option)) || getAccvalue(inputs, f.option) : getAccvalue(inputs, f.option),
          };
      });
    }
    else if (inputs.operation === "Create Issue") {
      jsonToSend = {
        ...jsonToSend,
        project: inputs.projectIdCreate,
        summary: inputs.summaryCreate,
        issuetype: inputs.issueTypeCreate,
        reporter: {
          id: inputs.reporter.reporter
        }
      };
      [
        { option: "description", value: "description" },
        { option: "assignee", value: "assignee" },
      ].map((f: Option) => {
        if (
          getAccvalue(inputs, f.option) &&
          getAccvalue(inputs, f.option).toString().trim()
        )
          jsonToSend = {
            ...jsonToSend,
            [f.value]: f.type === "integer" ? parseInt(getAccvalue(inputs, f.option)) || getAccvalue(inputs, f.option) : getAccvalue(inputs, f.option),
          };
      });
    }
    else if (inputs.operation === "Delete Issue") {
      jsonToSend = {
        ...jsonToSend,
        id: inputs.issueKeyDelete,
      };
    }
  }
  else if (inputs.type === "Issue Attachment") {
    if (inputs.operation === "Get Attachment") {
      jsonToSend = {
        ...jsonToSend,
        id: inputs.attachmentID,
      };
    }
    else if (inputs.operation === "Download Attachment") {
      jsonToSend = {
        ...jsonToSend,
        id: inputs.attachmentID_Download,
      };
    }
    else if (inputs.operation === "Get Many Attachment") {
      jsonToSend = {
        ...jsonToSend,
        id: inputs.issueKeyGetManyAttachment,
      };
    }
    else if (inputs.operation === "Create Attachment") {
      if (inputs.urlOrBinary == "Url") {
        jsonToSend = {
          ...jsonToSend,
          url: inputs.url,
          filename: inputs.fileNameUrl,
          issue: inputs.issueKeyUrl,
        };
      }
      else if (inputs.urlOrBinary == "Binary") {
        jsonToSend = {
          ...jsonToSend,
          attachment: inputs.binary,
          filename: inputs.fileNameBinary,
          issue: inputs.issueKeyBinary,
        };
      }
    }
    else if (inputs.operation === "Delete Attachment") {
      jsonToSend = {
        ...jsonToSend,
        id: inputs.attachmentID,

      };
    }
  }
  else if (inputs.type === "Issue Comment") {
    if (inputs.operation === "Get Comment") {
      jsonToSend = {
        ...jsonToSend,
        issue: inputs.issueKeyGetComment,
        comment: inputs.commentId,

      };
      [
        { option: "expandGetComment", value: "expand" },
      ].map((f: Option) => {
        if (
          getAccvalue(inputs, f.option) &&
          getAccvalue(inputs, f.option).toString().trim()
        )
          jsonToSend = {
            ...jsonToSend,
            [f.value]: f.type === "integer" ? parseInt(getAccvalue(inputs, f.option)) || getAccvalue(inputs, f.option) : getAccvalue(inputs, f.option),
          };
      });
    }
    else if (inputs.operation === "Get Many Comment") {
      jsonToSend = {
        ...jsonToSend,
        issue: inputs.issueKeyGetManyComment,
      };
      [
        { option: "expandGetManyComment", value: "expand" },
      ].map((f: Option) => {
        if (
          getAccvalue(inputs, f.option) &&
          getAccvalue(inputs, f.option).toString().trim()
        )
          jsonToSend = {
            ...jsonToSend,
            [f.value]: f.type === "integer" ? parseInt(getAccvalue(inputs, f.option)) || getAccvalue(inputs, f.option) : getAccvalue(inputs, f.option),
          };
      });
    }
    else if (inputs.operation === "Create Comment") {
      jsonToSend = {
        ...jsonToSend,
        issue: inputs.issueKeyCreateComment,
        body: inputs.commentBody,
      };
    }
    else if (inputs.operation === "Delete Comment") {
      jsonToSend = {
        ...jsonToSend,
        comment: inputs.commentDelete,
        issue: inputs.issueKeyDeleteComment,

      };
    }
    else if (inputs.operation === "Update Comment") {
      jsonToSend = {
        ...jsonToSend,
        comment: inputs.commentUpdate,
        issue: inputs.issueKeyUpdateComment,
        body: inputs.commentBody,
      };

    }
  }
  else if (inputs.type === "User") {
    if (inputs.operation === "Get User") {
      jsonToSend = {
        ...jsonToSend,
        id: inputs.userId,
      };
      [
        { option: "expandUser", value: "expand" },
      ].map((f: Option) => {
        if (
          getAccvalue(inputs, f.option) &&
          getAccvalue(inputs, f.option).toString().trim()
        )
          jsonToSend = {
            ...jsonToSend,
            [f.value]: f.type === "integer" ? parseInt(getAccvalue(inputs, f.option)) || getAccvalue(inputs, f.option) : getAccvalue(inputs, f.option),
          };
      });
    }
    else if (inputs.operation === "Get Many User") {
      jsonToSend = {
        ...jsonToSend,
        query: inputs.emailuser,
      };
    }
    else if (inputs.operation === "Create User") {
      jsonToSend = {
        ...jsonToSend,
        username: inputs.username,
        email: inputs.emailCreate,
      };
    }
  }

  const content = {
    type: "data",
    data: {
      content_json: jsonToSend,
      app: "jira_software",
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