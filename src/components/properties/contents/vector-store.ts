export const PineconeVectorStore = (selectedNode: any) => {
    const vectorStore = selectedNode.data.rightSideData.extras.vectorStore
    const json = vectorStore.content.json

    return {
        type: "pinecone",
        indexName: json.index_name,
        credential: json.cred
    }
}
export const LocalVectorStore = (selectedNode: any) => {
    const vectorStore = selectedNode.data.rightSideData.extras.vectorStore
    const json = vectorStore.content.json

    return {
        "type": "localStore",
        "dataFormat": json.type, // Name || URL 
        "dataType": json.file.split(".")[1],
        "dialogue_id":"khaled",
        "data": json.file
    }
}