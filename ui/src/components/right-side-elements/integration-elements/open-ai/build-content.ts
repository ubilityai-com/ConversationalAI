import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "Audio") {
        if (inputs.operation === "Text To Speech") {
            jsonToSend = {
                ...jsonToSend,
                input: inputs.TextInput,
                model: inputs.Model,
                voice: inputs.Voice,
                response_format: getAccvalue(inputs, "ResponseFormat"),
                speed: getAccvalue(inputs, "AudioSpeed"),


            };
        } else if (inputs.operation === "Speech To Text") {
            jsonToSend = {
                ...jsonToSend,
                file: inputs.File,
                model: inputs.Model,
                language: getAccvalue(inputs, "LanguageoftheAudioFile"),
                temperature: getAccvalue(inputs, "Temperature"),
            };
        }
    } else if (inputs.type === "Image") {
        if (inputs.operation === "Generate Image") {
            jsonToSend = {
                ...jsonToSend,
                prompt: inputs.prompt_GenerateImage,
                model: inputs.model_GenerateImage,
            };
            if (inputs.model_GenerateImage === "dall-e-2") {
                jsonToSend = {
                    ...jsonToSend,
                    size: getAccvalue(inputs, "resolution_GenerateImage"),
                };
            } else if (inputs.model_GenerateImage === "dall-e-3") {
                jsonToSend = {
                    ...jsonToSend,
                    size: getAccvalue(inputs, "resolution_GenerateImage"),
                    quality: getAccvalue(inputs, "quality_GenerateImage"),
                    style: getAccvalue(inputs, "style_GenerateImage"),
                };
            }
            else if (inputs.model_GenerateImage === "gpt-image-1") {
                jsonToSend = {
                    ...jsonToSend,
                    output_format: inputs.outputformat_GenerateImage,
                    size: getAccvalue(inputs, "resolution_GenerateImage"),
                    quality: getAccvalue(inputs, "quality_GenerateImage"),
                };
            }
        } else if (inputs.operation === "Analyze Image") {
            jsonToSend = {
                ...jsonToSend,
                model: inputs.model_AnalyzeImage,
                input_text: inputs.input_text_AnalyzeImage,
            };
            if (inputs.inputType_AnalyzeImage === "url") {
                jsonToSend = {
                    ...jsonToSend,
                    image_url: inputs.image_url_AnalyzeImage,
                };
            } else if (inputs.inputType_AnalyzeImage === "byteString") {
                jsonToSend = {
                    ...jsonToSend,
                    file: inputs.file_AnalyzeImage,
                };
            }
        } else if (inputs.operation === "Edit Image") {
            jsonToSend = {
                ...jsonToSend,
                model: inputs.model_EditImage,
                prompt: inputs.prompt_EditImage,
            };
            if (inputs.model_EditImage === "dall-e-2") {
                jsonToSend = {
                    ...jsonToSend,
                    images: [inputs.image_EditImage],
                    size: getAccvalue(inputs, "resolution_EditImage"),
                };
            } else if (inputs.model_EditImage === "gpt-image-1") {
                jsonToSend = {
                    ...jsonToSend,
                    images: inputs.images_EditImage?.map((image:any) => image.toEdit_EditImage),
                    output_format: inputs.outputformat_EditImage,
                    quality: getAccvalue(inputs, "quality_EditImage"),
                    size: getAccvalue(inputs, "resolution_EditImage"),
                };
            }
        }

    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "openai_connector",
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