import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.operation === "Execute SQL") {
        jsonToSend = {
            ...jsonToSend,
            queries_with_values: inputs.queriesAndValuesExecuteSQL.map((queryWithVal: any) => {
                return {
                    query: queryWithVal.sqlQueryExecuteSQL,
                    values: queryWithVal.queryVariablesExecuteSQL.map((value: any) => {
                        if (value.variableValueExecuteSQL === "string") {
                            return value.variableStringValueExecuteSQL || ""
                        }
                        else if (value.variableValueExecuteSQL === "date") {
                            return value.variableDateValueExecuteSQL || ""
                        }
                        else if (value.variableValueExecuteSQL === "text") {
                            return value.variableTextValueExecuteSQL || ""
                        }
                        else if (value.variableValueExecuteSQL === "boolean") {
                            return value.variableBooleanValueExecuteSQL
                        }
                        else if (value.variableValueExecuteSQL === "integer") {
                            return value.variableIntegerValueExecuteSQL
                        }
                        else if (value.variableValueExecuteSQL === "float") {
                            return value.variableFloatValueExecuteSQL
                        }
                    }),
                }
            }),
            connection_timeout: getAccvalue(inputs, "connectionTimeoutExecuteSQL.connectionTimeoutOptionExecuteSQL"),
            pool_size: getAccvalue(inputs, "poolSizeExecuteSQL.poolSizeOptionExecuteSQL"),
            query_batching: getAccvalue(inputs, "queryBatchingExecuteSQL.queryBatchingOptionExecuteSQL"),
            // replace_empty_with_null: getAccvalue(inputs, "replaceEmptyExecuteSQL.replaceEmptyOptionExecuteSQL"),
            output_details: getAccvalue(inputs, "outputDetailsExecuteSQL.outputDetailsOptionExecuteSQL"),
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "mysql_connector",
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