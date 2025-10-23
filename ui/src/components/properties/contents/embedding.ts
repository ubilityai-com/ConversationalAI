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
export const EmbeddingsOllama = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "ollama",
        model: json.model,
        credential: json.cred,
    };
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
export const EmbeddingsMistralAI = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "mistralAi",
        model: json.model,
        credential: json.cred,
    }
}
export const EmbeddingsGoogleGenerativeAI = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "googleGenerativeAi",
        model: json.model,
        credential: json.cred
    }
}
export const EmbeddingsFireworks = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    return {
        provider: "fireworks",
        model: json.model,
        credential: json.cred,
    }
}
export const EmbeddingsNvidia = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
    let jsonToSend: any = {
        provider: "nvidia",
        model: json.model,
        credential: json.cred,
    };

    return jsonToSend
}
export const EmbeddingsNomic = (selectedNode: any) => {
    const embedding = selectedNode.data.rightSideData.extras.embedding
    const json = embedding.content.json
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
