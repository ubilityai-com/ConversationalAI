import { useFlowStore } from "../../../store/root-store"

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
    const chatbot_id = useFlowStore.getState().selectedBot?.id

    return {
        "type": "localStore",
        "dataFormat": json.type, // Name || URL 
        "dataType": json.file.split('.').pop().replace(/[^a-zA-Z0-9]+$/, ''),
        "dialogue_id": chatbot_id,
        "data": json.file
    }
}