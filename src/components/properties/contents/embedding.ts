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
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json

    return {
        provider: "openAi",
        model: json.model,
        credential: json.cred,
    }
}
export const EmbeddingsTogetherAI = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "togetherAi",
        model: json.model,
        credential: json.cred,
    };
}
export const AnthropicChatModel = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "anthropic",
        model: json.model,
        credential: json.cred,
    }
}
export const AzureChatModel = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "azureOpenAi",
        model: json.model,
        credential: json.cred,
    }
}
export const EmbeddingsOllama = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "ollama",
        model: json.model,
        credential: json.cred,
    };
}
export const HuggingFaceChatModel = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "huggingFace",
        model: json.model ? json.model : "",
        credential: json.cred
    }
}
export const EmbeddingsCohere = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "cohere",
        model: json.model,
        credential: json.cred
    }
}
export const AWSBedrockChatModel = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
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
export const EmbeddingsMistralAI = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "mistralAi",
        model: json.model,
        credential: json.cred,
    }
}
export const GooglePalmGeminiChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.json
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
    const json = model.json
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
export const EmbeddingsGoogleGenerativeAI = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.json
    return {
        provider: "googleGenerativeAi",
        model: json.model,
        credential: json.cred
    }
}
export const GroqChatModel = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.json
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
    const json = model.json
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
export const EmbeddingsFireworks = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.json
    return {
        provider: "fireworks",
        model: json.model,
        credential: json.cred,
    }
}
export const EmbeddingsNvidia = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.json
    let jsonToSend: any = {
        provider: "nvidia",
        model: json.model,
        credential: json.cred,
    };

    return jsonToSend
}
export const EmbeddingsNomic = (selectedNode: any) => {
    const model = selectedNode.data.rightSideData.extras.model
    const json = model.json
    let jsonToSend: any = {
        provider: "nomic",
        model: json.model,
        credential: json.cred,
    };

    return jsonToSend
}

  
  export function EmbeddingsIBMWatsonx(selectedNode: any) {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "ibm",
        model: json.model,
        credential: json.cred,
        params: {
            optionals: {
                max_retries: parseInt(getAccvalue(json, "maxRetries")),
                concurrency_limit: parseInt(getAccvalue(json, "maxConcurrency")),
                truncateInputTokens: parseInt(getAccvalue(json, "truncateInputTokens")),
            },
        },
    }
  }
