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
export const EmbeddingsOpenAI = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content

    return {
        provider: "openAi",
        model: content.model,
        cred: content.cred,
      }
}
export const EmbeddingsTogetherAi = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return  {
        provider: "togetherAi",
        model: content.model,
        cred: content.cred,
      };
}
export const AnthropicChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "anthropic",
        model: content.model,
        credential: content.cred,
    }
}
export const AzureChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "azureOpenAi",
        model: content.model,
        credential: content.cred,
    }
}
export const EmbeddingsOllama = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "ollama",
        model: content.model,
        credential: content.cred,
    };
}
export const HuggingFaceChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "huggingFace",
        model: content.model ? content.model : "",
        credential: content.cred
    }
}
export const EmbeddingsCohere = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "cohere",
        model: content.model,
        credential: content.cred
    }
}
export const AWSBedrockChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "awsBedrock",
        model: content.model,
        credential: content.cred,
        params: {
            optionals: {
                max_tokens: parseInt(getAccvalue(content, "maximumNumberOfTokens")),
                temperature: parseFloat(getAccvalue(content, "samplingTemperature")),
            },
        },
    }
}
export const EmbeddingsMistralAI = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "mistralAi",
        model: content.model,
        credential: content.cred,
        params: {
            optionals: {
                max_tokens: parseInt(getAccvalue(content, "maximumNumberOfTokens")),
                temperature: parseFloat(getAccvalue(content, "samplingTemperature")),
                max_retries: parseInt(getAccvalue(content, "maxRetries")),
                top_p: parseFloat(getAccvalue(content, "topP")),
                random_seed: parseInt(getAccvalue(content, "randomSeed")),
                safe_mode: Boolean(getAccvalue(content, "safeMode")),
            },
        },
    }
}
export const GooglePalmGeminiChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "googlePaLMGemini",
        model: content.model,
        credential: content.cred,
        params: {
            optionals: {
                temperature: parseFloat(getAccvalue(content, "samplingTemperature")),
                top_k: parseFloat(getAccvalue(content, "topK")),
                top_p: parseFloat(getAccvalue(content, "topP")),
            },
        },
    }
}
export const VertexAIChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "vertexAi",
        model: content.model,
        credential: content.cred,
        params: {
            optionals: {
                max_output_tokens: parseInt(getAccvalue(content, "maxOutputTokens")),
                top_k: parseInt(getAccvalue(content, "topK")),
                top_p: parseFloat(getAccvalue(content, "topP")),
            },
        },

    }
}
export const GoogleGenerativeAiChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "googleGenerativeAi",
        model: content.model,
        credential: content.cred,
        params: {
            optionals: {
                max_tokens: getAccvalue(content, "maxOutputTokens"),
                temperature: getAccvalue(content, "temperature"),
                top_p: getAccvalue(content, "topP"),
                top_k: getAccvalue(content, "topK"),
            },
        },
    }
}
export const GroqChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "groq",
        model: content.model,
        credential: content.cred,
        params: {
            optionals: {
                temperature: getAccvalue(content, "temperature"),
            },
        },

    }
}
export const AI21ChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "ai21",
        model: content.model,
        credential: content.cred,
        params: {
            optionals: {
                max_tokens: getAccvalue(content, "maxOutputTokens"),
                temperature: getAccvalue(content, "temperature"),
                top_p: getAccvalue(content, "topP"),
            },
        },
    }
}
export const FireworksChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    return {
        provider: "fireworks",
        model: content.model,
        credential: content.cred,
        params: {
            optionals: {
                temperature: getAccvalue(content, "temperature"),
            },
        },
    }
}
export const EmbeddingsNvidia = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const content = model.content
    let jsonToSend: any = {
        provider: "nvidia",
        model: content.model ? content.model : "",
        credential: content.cred,
        params: {
            optionals: {
                temperature: parseFloat(getAccvalue(content, "temperature")),
                max_tokens: parseInt(getAccvalue(content, "maxToken")),
                top_p: parseFloat(getAccvalue(content, "topP")),
                stop: content.stopWords.map((stopWord: any) => {
                    return stopWord.word;
                }),
            },
        },
    };
   
    return jsonToSend
}
