export const PineconeVectorStore = (selectedNode: any) => {
    const vectorStore = selectedNode.data.rightSideData.extras.vectorStore
    const content = vectorStore.content

    return {
        type: "pinecone",
        indexName: content.index_name,
        cred: content.cred
    }
}
export const LocalVectorStore = (selectedNode: any) => {
    const vectorStore = selectedNode.data.rightSideData.extras.vectorStore
    const content = vectorStore.content

    return {
        "type": "localStore",
        "dataFormat": content.type, // Name || URL 
        "dataType": content.dataType, // TEXT, JSON, CSV, PDF --> required if data_form == Binary
        // data is required --> url or name data
        "data": content.file
    }
}