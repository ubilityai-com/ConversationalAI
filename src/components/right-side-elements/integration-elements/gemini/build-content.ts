import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Text") {
        if (inputs.operation === "Generate Text") {
            jsonToSend = {
                apiVersion: inputs.apiVersion,
                model: inputs.model_TextGeneration,
                prompt: inputs.prompt_TextGeneration,
                generationConfig: {
                    maxOutputTokens: getAccvalue(inputs, "maxOutputTokens"),
                    temperature: getAccvalue(inputs, "temperature"),
                    topP: getAccvalue(inputs, "topP"),
                    topK: getAccvalue(inputs, "topK"),
                    stopSequences: inputs.stopSequences.map((sequence: any) => {
                        return sequence.stop_sequence;
                    }),
                    candidateCount: getAccvalue(inputs, "candidateCount"),
                },
            };
        }
    } else if (inputs.type === "Image") {
        if (inputs.operation === "Generate Image") {
            jsonToSend = {
                prompt: inputs.prompt_GenerateImage,
                model: inputs.model_GenerateImage,
            };
        } else if (inputs.operation === "Edit Image") {
            jsonToSend = {
                ...jsonToSend,
                model: inputs.model_EditImage,
                prompt: inputs.prompt_EditImage,
                file: inputs.image_EditImage,
                mime_type: inputs.mime_type_EditImage,
            };
        }
    } else if (inputs.type === "File") {
        if (inputs.operation === "Analyze File") {
            jsonToSend = {
                model: inputs.model_AnalyzeFile,
                prompt: inputs.prompt_AnalyzeFile,
                mime_type: inputs.mime_type_AnalyzeFile,
            };
            if (inputs.inputType_AnalyzeFile === "FileAPI") {
                jsonToSend = {
                    ...jsonToSend,
                    uri: inputs.uri_AnalyzeFile,
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    file: inputs.file_AnalyzeFile,
                };
            }
        } else if (inputs.operation === "Upload File") {
            jsonToSend = {
                ...jsonToSend,
                file: inputs.file_UploadFile,
                mime_type: inputs.mime_type_UploadFile,
            };
        } else if (inputs.operation === "Get Many File") {
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "gemini",
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