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

export const Calculator = (content: any) => {
    const json = content.json
    return {
        type: "calculator",
        description: json?.description,

    }
}
export const CustomTool = (content: any) => {
    const json = content.json

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
export const McpTool = (content: any) => {
    const json = content.json

    return {
        type: "mcp",
        params: {
            name: json.name,
            url: json.getMcpBy === "url" ? json.url : undefined
        }

    }
}

