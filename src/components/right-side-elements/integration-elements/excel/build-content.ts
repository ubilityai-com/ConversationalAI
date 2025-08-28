import { getAccvalue, isJsonString } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Workbook") {
        if (inputs.operation === "Add Worksheet") {
            jsonToSend = {
                workbookId: inputs.idCreateSheet,
                name: getAccvalue(inputs, "nameAddSheet")
            };
        }

        else if (inputs.operation === "Delete Workbook") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idDeleteWorkbook,
            };
        }
        else if (inputs.operation === "Get Many Workbooks") {
            jsonToSend = {
                ...jsonToSend,
            }
        }
    }
    else if (inputs.type === "Sheet") {
        if (inputs.operation === "Append") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idAppend,
                worksheetId: inputs.idSheetAppend,
                range: inputs.rangeAppend,
                shift: inputs.shift,
                values: isJsonString(getAccvalue(inputs, "valuesAppend"))
                    ? JSON.parse(getAccvalue(inputs, "valuesAppend"))
                    : ""
            };
        }
        else if (inputs.operation === "Clear Sheet") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idClear,
                worksheetId: inputs.idSheetClear,
                applyTo: inputs.applyToClear,
                range: getAccvalue(inputs, "rangeClear")
            };
        }
        else if (inputs.operation === "Delete Worksheet") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idDelete,
                worksheetId: inputs.idSheetDelete
            }
        }
        else if (inputs.operation === "Get Many Worksheets") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idGetManyWorkbook,
            };
        }
        else if (inputs.operation === "Update Sheet") {
            jsonToSend = {
                workbookId: inputs.idUpdateSheet,
                worksheetId: inputs.idUpdateSheetSheet,
                range: inputs.rangeUpdateSheet,
                values: isJsonString(inputs.rawDataUpdateSheet,)
                    ? JSON.parse(inputs.rawDataUpdateSheet,)
                    : ""
            };
        }
        else if (inputs.operation === "Get Rows") {
            jsonToSend = {
                workbookId: inputs.idGetRows,
                worksheetId: inputs.idSheetGetRows,
                range: getAccvalue(inputs, "rangeGetRows")
            };
        }
    }
    else if (inputs.type === "Table") {
        if (inputs.operation === "Append Rows") {
            jsonToSend = {
                workbookId: inputs.idAppendRows,
                worksheetId: inputs.idAppendRowsSheet,
                tableID: inputs.idAppendRowsTable,
                type: inputs.typeAppend,
                index: getAccvalue(inputs, "indexAppendRows")
            };
            if (inputs.typeAppend == "columns") {
                let x = inputs.columnsMap.map((field:any) => {
                    return field.idAppendRowsColumns
                })
                let y = inputs.columnsMap.map((field:any) => {
                    return field.valueMapColumns
                })
                jsonToSend = {
                    ...jsonToSend,
                    columnsid: x,
                    value: y,
                }
            }
            else if (inputs.typeAppend == 'raw') {
                jsonToSend = {
                    ...jsonToSend,
                    values: isJsonString(inputs.rawDataAppendRowsTable)
                        ? JSON.parse(inputs.rawDataAppendRowsTable)
                        : ""
                }
            }
        }
        else if (inputs.operation === "Convert To Range") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idConvert,
                worksheetId: inputs.idConvertSheet,
                tableID: inputs.idConvertTable,
            };
        }
        else if (inputs.operation === "Add Table") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idAddTable,
                worksheetId: inputs.idAddTableSheet,
                address: inputs.addressAddTable,
                hasHeaders: getAccvalue(inputs, "addTableHeader")
            }
        }
        else if (inputs.operation === "Delete Table") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idDeleteTable,
                worksheetId: inputs.idDeleteTableSheet,
                tableID: inputs.idDeleteTableTable,
            }
        }
        else if (inputs.operation === "Get Many Columns") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idGetColumns,
                worksheetId: inputs.idGetColumnsSheet,
                tableID: inputs.idGetColumnsTable,
                limit: getAccvalue(inputs, "getColumnsLimit")
            }
        }
        else if (inputs.operation === "Get Many Rows") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idGetRows,
                worksheetId: inputs.idGetRowsSheet,
                tableID: inputs.idGetRowsTable,
                limit: getAccvalue(inputs, "getRowsLimit")
            }
        }
        else if (inputs.operation === "Lookup") {
            jsonToSend = {
                ...jsonToSend,
                workbookId: inputs.idLookup,
                worksheetId: inputs.idLookupSheet,
                tableID: inputs.idLookupTable,
                columnValue: inputs.lookupColumn,
                rowvalue: inputs.lookupValue,
                returnAll: inputs.returnAll
            }
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "microsoft_excel",
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