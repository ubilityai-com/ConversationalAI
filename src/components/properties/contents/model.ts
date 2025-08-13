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
        return finaleObj[name] ? finaleObj[name][name] || undefined : undefined;
};
export const OpenAIChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json

    return {
        provider: "openAi",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                base_url: getAccvalue(json, "baseUrl"),
                max_tokens: parseInt(getAccvalue(json, "maximumNumberOfTokens")),
                temperature: parseFloat(getAccvalue(json, "samplingTemperature")),
                timeout: parseInt(getAccvalue(json, "timeout")),
                max_retries: parseInt(getAccvalue(json, "maxRetries")),
            },
        },
    }
}
export const TogetherAIChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "togetherAi",
        model: model.type,
        credential: json.cred,
        params: {
            optionals: {
                temperature: parseFloat(getAccvalue(json, "samplingTemperature")),
            },
        },
    }
}
export const AnthropicChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "anthropic",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                max_tokens: parseInt(getAccvalue(json, "maximumNumberOfTokens")),
                temperature: parseFloat(getAccvalue(json, "samplingTemperature")),
                top_k: parseInt(getAccvalue(json, "topK")),
                top_p: parseFloat(getAccvalue(json, "topP")),
            },
        },
    }
}
export const AzureChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "azureOpenAi",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                max_tokens: parseInt(getAccvalue(json, "maximumNumberOfTokens")),
                temperature: parseFloat(getAccvalue(json, "samplingTemperature")),
                timeout: parseInt(getAccvalue(json, "timeout")),
                max_retries: parseInt(getAccvalue(json, "maxRetries")),
                top_k: parseInt(getAccvalue(json, "topK")),
                top_p: parseFloat(getAccvalue(json, "topP")),
            },
        },
    }
}
export const OllamaChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    let jsonToSend: any = {}
    jsonToSend = {
        provider: "ollama",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                temperature: parseFloat(getAccvalue(json, "samplingTemperature")),
                top_k: parseInt(getAccvalue(json, "topK")),
                top_p: parseFloat(getAccvalue(json, "topP")),
                keep_alive: getAccvalue(json, "keepAlive"),
                num_gpu: parseInt(getAccvalue(json, "numGPU")),
                num_ctx: parseInt(getAccvalue(json, "contextLength")),
                num_thread: parseInt(getAccvalue(json, "numberCPUThreads")),
                repeat_penalty: parseFloat(getAccvalue(json, "repetitionPenalty")),
            },
        },
    };
    if (getAccvalue(json, "outputFormat") != "default") {
        let format = "";
        format = getAccvalue(json, "outputFormat");
        jsonToSend["optionals"] = {
            ...jsonToSend["optionals"],
            format: format,
        };
    }
    return jsonToSend
}
export const HuggingFaceChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "huggingFace",
        model: json.model ? json.model : "",
        credential: json.cred,
        params: {
            optionals: {
                max_new_tokens: parseInt(getAccvalue(json, "maxNewTokens")),
                temperature: parseFloat(getAccvalue(json, "samplingTemperature")),
                top_k: parseInt(getAccvalue(json, "topK")),
                top_p: parseFloat(getAccvalue(json, "topP")),
            },
        },
    }
}
export const CohereChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "cohere",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                temperature: parseFloat(getAccvalue(json, "samplingTemperature")),
            },
        },
    }
}
export const AWSBedrockChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "awsBedrock",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                max_tokens: parseInt(getAccvalue(json, "maximumNumberOfTokens")),
                temperature: parseFloat(getAccvalue(json, "samplingTemperature")),
            },
        },
    }
}
export const MistralAIChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "mistralAi",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                max_tokens: parseInt(getAccvalue(json, "maximumNumberOfTokens")),
                temperature: parseFloat(getAccvalue(json, "samplingTemperature")),
                max_retries: parseInt(getAccvalue(json, "maxRetries")),
                top_p: parseFloat(getAccvalue(json, "topP")),
                random_seed: parseInt(getAccvalue(json, "randomSeed")),
                safe_mode: Boolean(getAccvalue(json, "safeMode")),
            },
        },
    }
}
export const GooglePalmGeminiChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "googlePaLMGemini",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                temperature: parseFloat(getAccvalue(json, "samplingTemperature")),
                top_k: parseFloat(getAccvalue(json, "topK")),
                top_p: parseFloat(getAccvalue(json, "topP")),
            },
        },
    }
}
export const VertexAIChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "vertexAi",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                max_output_tokens: parseInt(getAccvalue(json, "maxOutputTokens")),
                top_k: parseInt(getAccvalue(json, "topK")),
                top_p: parseFloat(getAccvalue(json, "topP")),
            },
        },

    }
}
export const GoogleGenerativeAiChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "googleGenerativeAi",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                max_tokens: getAccvalue(json, "maxOutputTokens"),
                temperature: getAccvalue(json, "temperature"),
                top_p: getAccvalue(json, "topP"),
                top_k: getAccvalue(json, "topK"),
            },
        },
    }
}
export const GroqChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "groq",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                temperature: getAccvalue(json, "temperature"),
            },
        },

    }
}
export const AI21ChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "ai21",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                max_tokens: getAccvalue(json, "maxOutputTokens"),
                temperature: getAccvalue(json, "temperature"),
                top_p: getAccvalue(json, "topP"),
            },
        },
    }
}
export const FireworksChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    return {
        provider: "fireworks",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                temperature: getAccvalue(json, "temperature"),
            },
        },
    }
}
export const NvidiaChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.content.json
    let jsonToSend: any = {
        provider: "nvidia",
        model: json.model ? json.model : "",
        credential: json.cred,
        params: {
            optionals: {
                temperature: parseFloat(getAccvalue(json, "temperature")),
                max_tokens: parseInt(getAccvalue(json, "maxToken")),
                top_p: parseFloat(getAccvalue(json, "topP")),
                stop: json.stopWords.map((stopWord: any) => {
                    return stopWord.word;
                }),
            },
        },
    };
    const seedValue = parseInt(getAccvalue(json, "seed"));
    if (!isNaN(seedValue)) {
        jsonToSend = {
            ...jsonToSend,
            params: {
                ...jsonToSend.params,
                optionals: {
                    ...jsonToSend.params.optionals,
                    seed: seedValue,
                },
            },
        };
    }
    return jsonToSend
}
