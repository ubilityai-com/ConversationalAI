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
export const GoogleSearchTool = (content: any) => {
    const json = content.json

    return {
        type: "GoogleSearch",
        name: json.name,
        description: json.description,
        cred: json.cred
    }
}

export const CustomCodeTool = (content: any) => {
    const json = content.json
    let jsonToSend: any = {
        name: json.name,
        description: json.description,
        params: {},
    }
    if (json.type === "Python")
        jsonToSend = {
            ...jsonToSend,
            type: "pythonCode",
            params: { customPythonCode: json.code },
        };
    else
        jsonToSend = {
            ...jsonToSend,
            type: "javaScriptCode",
            params: { customJavaScriptCode: json.code },
        };
    return jsonToSend
}
export const SerpApiTool = (content: any) => {
    const json = content.json
    return {
        type: "serpApi",
        description: json.description,
        cred: json.cred
    }
}
export const WikipediaTool = (content: any) => {
    const json = content.json
    return {
        type: "wikipidia",
        description: json.description,
    }
}
