import { getAccvalue,isJsonString } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "Edit") {
        if (inputs.operation === "Replace Strings") {
            let valuesDict = {};
            if (inputs.typeOfValues === "Dynamic") {
                inputs.strings_ReplaceStrings.map((value: any) => {
                    valuesDict = {
                        ...valuesDict,
                        [value.strings_Old_ReplaceStrings]: value.strings_New_ReplaceStrings || "",
                    };
                });
            } else {
                if (isJsonString(inputs.dict_ReplaceStrings)) {
                    valuesDict = JSON.parse(inputs.dict_ReplaceStrings);
                }
            }
            jsonToSend = {
                ...jsonToSend,
                values: valuesDict,
                base64_string: inputs.extractFrom_Base64_ReplaceStrings,
                direct_link: inputs.extractFrom_DownloadLink_ReplaceStrings,
            };
        } else if (inputs.operation === "Replace Table") {
            let valuesList = [];
            if (inputs.typeOfValues === "Dynamic") {
                valuesList = inputs.row_ReplaceTable.map((row: any) => {
                    return row.cell_ReplaceTable.map((cell: any) => cell.text);
                });
            } else {
                if (isJsonString(inputs.list_ReplaceTable)) {
                    valuesList = JSON.parse(inputs.list_ReplaceTable);
                }
            }
            jsonToSend = {
                ...jsonToSend,
                values: valuesList,
                index: parseInt(inputs.index_ReplaceTable),
                base64_string: inputs.extractFrom_Base64_ReplaceTable,
                direct_link: inputs.extractFrom_DownloadLink_ReplaceTable,
            };
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "microsoft_word",
            credential: inputs.cred,
            operation: inputs.operation,
            saveOutputAs: getOutputVariablesByNodeId(selectedNode.id),
        },
    };
    return {
        type: "AppIntegration",
        content: content,
        cred: inputs?.cred,
    };
}