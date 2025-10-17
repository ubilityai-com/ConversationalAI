import { getAccvalue, isJsonString } from "../../../../lib/automation-utils";
import { getNextNodeId, stringifyAndExtractVariables } from "../../../../lib/utils/utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData
    const json = rightSideData.json;

    let bodyJsonToSend: any = {
        type: json.bodyType ? json.bodyType : "",
    };
    let authorizationJsonToSend: any = {
        type: json.authorizationType,
    };

    if (json.authorizationType === "API Key") {
        authorizationJsonToSend = {
            ...authorizationJsonToSend,
            key: json.key,
            value: json.value,
            addTo: json.addTo,
        };
    } else if (json.authorizationType === "Bearer Token") {
        authorizationJsonToSend = {
            ...authorizationJsonToSend,
            token: json.token,
        };
    } else if (json.authorizationType === "Basic Auth") {
        authorizationJsonToSend = {
            ...authorizationJsonToSend,
            username: json.username,
            password: json.password,
        };
    }
    if (json.bodyType === "") {
        bodyJsonToSend = { ...bodyJsonToSend };
    } else if (json.bodyType === "Form Data") {
        bodyJsonToSend = {
            ...bodyJsonToSend,
            formData: json.formData,
        };
    } else if (json.bodyType === "Binary") {
        bodyJsonToSend = {
            ...bodyJsonToSend,
            binaryData: json.binaryCode,
        };
    } else if (json.bodyType === "JSON") {
        bodyJsonToSend = {
            ...bodyJsonToSend,
            json: isJsonString(json.jsonCode)
                ? JSON.parse(json.jsonCode)
                : {},
        };
    }
    const content = {
        data: {
            method: json.method,
            url: json.url,
            authorization_params: authorizationJsonToSend ?? {},
            body_params: bodyJsonToSend ?? {},
            headers_params: json.header ?? [],
            query_params: json.queryParams ?? [],
            optional: {
                ssl: Boolean(getAccvalue(json, "ssl")),
                timeout: getAccvalue(json, "timeout"),
            },
            saveOutputAs: getOutputVariablesByNodeId(selectedNode.id),
        }
    }
    return {
        type: "HttpRequest",
        content: content,
    };
}