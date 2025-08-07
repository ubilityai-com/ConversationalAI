export const PineconeVectorStore = (selectedNode: any) => {
    const vectorStore = selectedNode.data.rightSideData.extras.vectorStore
    const content = vectorStore.content

    return {
        type: "pinecone",
        indexName: content.index_name,
        credential: content.cred
    }
}
export const LocalVectorStore = (selectedNode: any) => {
    const vectorStore = selectedNode.data.rightSideData.extras.vectorStore
    const content = vectorStore.content

    return {
        "type": "localStore",
        "dataFormat": content.type, // Name || URL 
        "dataType": content.file.split(".")[1],
        "dialogue_id":"khaled",
        "data": content.file
    }
}