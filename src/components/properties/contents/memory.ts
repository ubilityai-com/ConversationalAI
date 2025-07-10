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

export const ConversationBufferMemory = (selectedNode: any) => {
    const memory = selectedNode.data.rightSideData.extras.memory
    const content = memory.content
    return {
        type: "ConversationBufferMemory",
        historyId: memory.id,
        context: (content.historyId)

    }
}