interface Choice {
    id: string
    label: string
}
interface RightSideData {
    choices: Choice[],
    botSays: string,
    save: boolean;
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
                choices: rightSideData.choices.map(el => el.label),
                message: rightSideData.botSays
            }
        },
        saveUserInputAs: rightSideData.save ? rightSideData.variableName : null
    };
}
