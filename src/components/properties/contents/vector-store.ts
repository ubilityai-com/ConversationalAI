export const PineconeVectorStore = (selectedNode: any) => {
    const vectorStore = selectedNode.data.rightSideData.extras.vectorStore
    const content = vectorStore.content

    return {
        type: "pinecone",
        indexName: content.index_name,
        cred: content.cred
    }
}