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

export const ConversationalBufferMemory = (selectedNode: any) => {
    const memory = selectedNode.data.rightSideData.extras.memory
    const json = memory.content.json
    return {
        type: "ConversationBufferMemory",
        historyId: selectedNode.id,
        // context: []
    }
}
export const ConversationSummaryBufferMemory = (selectedNode: any) => {
    const memory = selectedNode.data.rightSideData.extras.memory
    const json = memory.content.json
    return {
        type: memory.type,
        historyId: selectedNode.id,
        max_token_limit: parseInt(json.maxTokenLimit),
        // context: []

    }
}

export const ConversationBufferWindowMemory = (selectedNode: any) => {
    const memory = selectedNode.data.rightSideData.extras.memory
    const json = memory.content.json
    return {
        type: memory.type,
        historyId: selectedNode.id,
        context: [],
        size: json.size,
    }
}

export const RedisStackMemory = (selectedNode: any) => {
    const memory = selectedNode.data.rightSideData.extras.memory
    const json = memory.content.json
    return {
        type: "RedisMemory",
        historyId: selectedNode.id,
        credential: json.cred,

    }
}