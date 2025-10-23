import { getAccvalue, isJsonString } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.operation === "Find Documents") {
        jsonToSend = {
            ...jsonToSend,
            collectionName: inputs.collectionName_FindDocuments,
            query: isJsonString(inputs.query_FindDocuments)
                ? JSON.parse(inputs.query_FindDocuments)
                : {},
            limit: getAccvalue(inputs, "limit_FindDocuments"),
        };
        let customFields = {};
        inputs.sort_FindDocuments.forEach((fieldCustom: any) => {
            let direction;
            if (fieldCustom.valueFields === "ascending") {
                direction = 1;
            } else if (fieldCustom.valueFields === "descending") {
                direction = -1;
            }
            customFields = {
                ...customFields,
                [fieldCustom.keyFields]: direction,
            };
        });
        jsonToSend = {
            ...jsonToSend,
            sort: customFields,
        };
    } else if (inputs.operation === "Delete Many Document") {
        jsonToSend = {
            ...jsonToSend,
            collectionName: inputs.collectionName_DeleteManyDocument,
            query: isJsonString(inputs.query_DeleteManyDocument)
                ? JSON.parse(inputs.query_DeleteManyDocument)
                : {},
        };
    } else if (inputs.operation === "Insert Document") {
        jsonToSend = {
            ...jsonToSend,
            collectionName: inputs.collectionName_InsertDocument,
            document: isJsonString(inputs.document_InsertDocument)
                ? JSON.parse(inputs.document_InsertDocument)
                : {},
        };
    } else if (inputs.operation === "Insert Many Document") {
        jsonToSend = {
            ...jsonToSend,
            collectionName: inputs.collectionName_InsertManyDocument,
            documents: isJsonString(inputs.documents_InsertManyDocument)
                ? JSON.parse(inputs.documents_InsertManyDocument)
                : {},
        };
    } else if (inputs.operation === "Update Documents") {
        jsonToSend = {
            ...jsonToSend,
            collectionName: inputs.collectionName_UpdateDocuments,
            query: isJsonString(inputs.query_UpdateDocuments)
                ? JSON.parse(inputs.query_UpdateDocuments)
                : {},

            update: isJsonString(inputs.update_UpdateDocuments)
                ? JSON.parse(inputs.update_UpdateDocuments)
                : {},
            upsert: getAccvalue(inputs, "upsert_UpdateDocuments"),
        };
    } else if (inputs.operation === "Find One And Update Document") {
        jsonToSend = {
            ...jsonToSend,
            collectionName: inputs.collectionName_FindAndUpdateDocument,
            query: isJsonString(inputs.query_FindAndUpdateDocument)
                ? JSON.parse(inputs.query_FindAndUpdateDocument)
                : {},

            update: isJsonString(inputs.update_FindAndUpdateDocument)
                ? JSON.parse(inputs.update_FindAndUpdateDocument)
                : {},
        };
    } else if (inputs.operation === "Find One And Replace Document") {
        jsonToSend = {
            ...jsonToSend,
            collectionName: inputs.collectionName_FindAndReplaceDocument,
            query: isJsonString(inputs.query_FindAndReplaceDocument)
                ? JSON.parse(inputs.query_FindAndReplaceDocument)
                : {},

            replacement: isJsonString(
                inputs.replacement_FindAndReplaceDocument
            )
                ? JSON.parse(inputs.replacement_FindAndReplaceDocument)
                : {},
        };
    } else if (inputs.operation === "Aggregate Documents") {
        jsonToSend = {
            ...jsonToSend,
            collectionName: inputs.collectionName_AggregateDocuments,
            matchData: isJsonString(inputs.matchData_AggregateDocuments)
                ? JSON.parse(inputs.matchData_AggregateDocuments)
                : {},

            groupData: isJsonString(inputs.groupData_AggregateDocuments)
                ? JSON.parse(inputs.groupData_AggregateDocuments)
                : {},
        };
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "mongoDb",
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