

function camelToDashCase(str: string) {
    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2") // Split camelCase (aB → a-b)
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // Handle acronyms (RPA → rpa)
        .toLowerCase();
}
export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData
    console.log({selectedNode});
    
    return {
        content: {
            type: "data",
            data: {
                inputs: { query: rightSideData.json.query },
                model: require(`../../properties/contents/model/${(selectedNode.data.rightSideData.extras.model.type)}`).default(selectedNode),
            }
        },
        saveUserInputAs: rightSideData.save ? rightSideData.variableName : null
    };
}
