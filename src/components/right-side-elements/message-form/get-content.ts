
interface RightSideData {
    botSays?: string;
    // advanced?: boolean;
    // regex?: boolean;
    // errorMessage?: string;
    save?: boolean;
    variableName: string;
    loopFromSwitch: boolean;
    loopFromName: string
}
export default function getContent(selectedNode: any) {
    const rightSideData: RightSideData = selectedNode.data.rightSideData
    return {
        content: {
            type: "data",
            data: {
                text: rightSideData.botSays
            }
        },
        saveUserInputAs: rightSideData.save ? rightSideData.variableName : null
    };
}
