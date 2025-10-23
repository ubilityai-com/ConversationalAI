
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
export default function getContent(selectedNode: any) {
    console.log({selectedNode});
    
    const content = selectedNode.content
    return {
        provider: "openAi",
        model: content.model,
        cred: content.cred,
        params: {
            optionals: {
                base_url: getAccvalue(content, "baseUrl"),
                max_tokens: parseInt(getAccvalue(content, "maximumNumberOfTokens")),
                temperature: parseFloat(getAccvalue(content, "samplingTemperature")),
                timeout: parseInt(getAccvalue(content, "timeout")),
                max_retries: parseInt(getAccvalue(content, "maxRetries")),
            },
        },
    };
}
