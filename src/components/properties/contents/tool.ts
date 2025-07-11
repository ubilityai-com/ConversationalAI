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

export const Calculator = (selectedNode: any) => {
    const tool = selectedNode.data.rightSideData.extras.tool
    const content = tool.list
    return {
        type: "calculator",
        description: content.description,

    }
}
export const CustomTool = (selectedNode: any) => {
    const tool = selectedNode.data.rightSideData.extras.tool
    const content = tool.list
    console.log({ content });

    //  if (inputsDescription !== null) {
    //     if (!checkIfKeysValuesFilled(inputsDescription)) return false;
    //     allFlowRunDataForThisNode = {
    //       type: "postTrigger",
    //       name: finaleObj.name,
    //       description: finaleObj.description,
    //       params: {
    //         url: webhookUrl,
    //         body: inputsDescription,
    //       },
    //     };
    //   } else
    //     allFlowRunDataForThisNode = {
    //       type: "getTrigger",
    //       name: finaleObj.name,
    //       description: finaleObj.description,
    //       params: {
    //         url: webhookUrl,
    //       },
    //     };
    return {
        type: "customTool",

    }
}