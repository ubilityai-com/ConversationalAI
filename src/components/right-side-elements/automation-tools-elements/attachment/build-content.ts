
export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData
    const json = rightSideData.json;
    const content = {
        type: "data",
        data: {
            message: json.message,
            file: json.fileContent
        }
    }
    return {
        type: "Attachement",
        content: content,
    };
}