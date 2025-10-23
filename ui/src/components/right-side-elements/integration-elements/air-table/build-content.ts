import { getAccvalue, isJsonString } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Record") {
        if (inputs.operation === "Get Record") {
            jsonToSend = {
                ...jsonToSend,
                base_id: inputs.baseIdGet,
                table_id: inputs.tableIdGet,
                record_id: inputs.recordIdGet,
                cellFormat: inputs.cellFormatGet,
                returnFieldsByFieldId: getAccvalue(inputs, "returnByIdGet.returnByIdGet"),
            }
            if (inputs.cellFormatGet === "string") {
                jsonToSend = {
                    ...jsonToSend,
                    timeZone: inputs.timeZoneGet,
                    userLocale: inputs.userLocaleGet,
                }
            }
        }
        else if (inputs.operation === "Find Records") {
            jsonToSend = {
                ...jsonToSend,
                base_id: inputs.baseIdFind,
                table_id: inputs.tableIdFind,
                cellFormat: inputs.cellFormatFind,
                view: getAccvalue(inputs, "viewIdFind.viewIdFind"),
                pageSize: getAccvalue(inputs, "pageSizeFind.pageSizeFind"),
                maxRecords: getAccvalue(inputs, "maxRecordsFind.maxRecordsFind"),
                offset: getAccvalue(inputs, "offset_Find.offset_Option_Find"),
                sort: inputs.sortFind?.map((sortField:any) => {
                    return {
                        field: sortField.fieldIdSortFind,
                        direction: sortField.sortOrderFind,
                    }
                }),
                fields: getAccvalue(inputs, "fieldsFind.fieldIdFieldsFind").map((elt:any) => elt.value),
                formula: getAccvalue(inputs, "formulaFind.formulaFind"),
                returnFieldsByFieldId: getAccvalue(inputs, "returnByIdFind.returnByIdFind"),
            }
            if (inputs.cellFormatFind === "string") {
                jsonToSend = {
                    ...jsonToSend,
                    timeZone: inputs.timeZoneFind,
                    userLocale: inputs.userLocaleFind,
                }
            }
        }
        else if (inputs.operation === "Create Record") {
            let fieldsDict = {}
            inputs.fieldCreate.map((field:any) => {
                if (field.fieldContentTypeCreate === "string") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdCreate]: field.fieldContentStringCreate || ""
                    }
                }
                else if (field.fieldContentTypeCreate === "boolean") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdCreate]: field.fieldContentBooleanCreate
                    }
                }
                else if (field.fieldContentTypeCreate === "integer") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdCreate]: field.fieldContentIntegerCreate || 0
                    }
                }
                else if (field.fieldContentTypeCreate === "float") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdCreate]: field.fieldContentFloatCreate || 0.00
                    }
                }
                else if (field.fieldContentTypeCreate === "list") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdCreate]: field.fieldContentStringsListCreate.map((stringList:any) => {
                            return stringList.fieldContentListStringValueCreate || ""
                        })
                    }
                }
                else if (field.fieldContentTypeCreate === "attachments") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdCreate]: field.fieldContentAttachmentsListCreate.map((attachment:any) => {
                            return {
                                url: attachment.fieldContentListAttachmentURLCreate,
                                filename: attachment.fieldContentListAttachmentFileNameCreate || "",
                            }
                        })
                    }
                }
            })
            jsonToSend = {
                ...jsonToSend,
                base_id: inputs.baseIdCreate,
                table_id: inputs.tableIdCreate,
                typecast: getAccvalue(inputs, "typeCastCreate.typeCastCreate"),
                returnFieldsByFieldId: getAccvalue(inputs, "returnByIdCreate.returnByIdCreate"),
                fields: fieldsDict,
            }
        }
        else if (inputs.operation === "Update Record") {
            let fieldsDict = {}
            inputs.fieldUpdate.map((field:any) => {
                if (field.fieldContentTypeUpdate === "string") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdUpdate]: field.fieldContentStringUpdate || ""
                    }
                }
                else if (field.fieldContentTypeUpdate === "boolean") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdUpdate]: field.fieldContentBooleanUpdate
                    }
                }
                else if (field.fieldContentTypeUpdate === "integer") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdUpdate]: field.fieldContentIntegerUpdate || 0
                    }
                }
                else if (field.fieldContentTypeUpdate === "float") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdUpdate]: field.fieldContentFloatUpdate || 0.00
                    }
                }
                else if (field.fieldContentTypeUpdate === "list") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdUpdate]: field.fieldContentStringsListUpdate.map((stringList:any) => {
                            return stringList.fieldContentListStringValueUpdate || ""
                        })
                    }
                }
                else if (field.fieldContentTypeUpdate === "attachments") {
                    fieldsDict = {
                        ...fieldsDict,
                        [field.fieldIdUpdate]: field.fieldContentAttachmentsListUpdate.map((attachment:any) => {
                            return {
                                url: attachment.fieldContentListAttachmentURLUpdate,
                                filename: attachment.fieldContentListAttachmentFileNameUpdate || "",
                            }
                        })
                    }
                }
            })
            jsonToSend = {
                ...jsonToSend,
                base_id: inputs.baseIdUpdate,
                table_id: inputs.tableIdUpdate,
                record_id: inputs.recordIdUpdate,
                typecast: getAccvalue(inputs, "typeCastUpdate.typeCastUpdate"),
                replace: getAccvalue(inputs, "replaceUpdate.replaceUpdate"),
                fields: fieldsDict
            }
        }
        else if (inputs.operation === "Update Create Record") {
            let recordslist = [];
            if (inputs.inputMethodUpdateCreate === "json") {
                recordslist = isJsonString(inputs.recordsJsonUpdateCreate)
                    ? JSON.parse(inputs.recordsJsonUpdateCreate)
                    : [];
            }
            else if (inputs.inputMethodUpdateCreate === "graphical") {
                let fieldsDict = {}
                inputs.fieldUpdateCreate.map((field:any) => {
                    if (field.fieldContentTypeUpdateCreate === "string") {
                        fieldsDict = {
                            ...fieldsDict,
                            [field.fieldIdUpdateCreate]: field.fieldContentStringUpdateCreate || ""
                        }
                    }
                    else if (field.fieldContentTypeUpdateCreate === "boolean") {
                        fieldsDict = {
                            ...fieldsDict,
                            [field.fieldIdUpdateCreate]: field.fieldContentBooleanUpdateCreate
                        }
                    }
                    else if (field.fieldContentTypeUpdateCreate === "integer") {
                        fieldsDict = {
                            ...fieldsDict,
                            [field.fieldIdUpdateCreate]: field.fieldContentIntegerUpdateCreate || 0
                        }
                    }
                    else if (field.fieldContentTypeUpdateCreate === "float") {
                        fieldsDict = {
                            ...fieldsDict,
                            [field.fieldIdUpdateCreate]: field.fieldContentFloatUpdateCreate || 0.00
                        }
                    }
                    else if (field.fieldContentTypeUpdateCreate === "list") {
                        fieldsDict = {
                            ...fieldsDict,
                            [field.fieldIdUpdateCreate]: field.fieldContentStringsListUpdateCreate.map((stringList:any) => {
                                return stringList.fieldContentListStringValueUpdateCreate || ""
                            })
                        }
                    }
                    else if (field.fieldContentTypeUpdateCreate === "attachments") {
                        fieldsDict = {
                            ...fieldsDict,
                            [field.fieldIdUpdateCreate]: field.fieldContentAttachmentsListUpdateCreate.map((attachment:any) => {
                                return {
                                    url: attachment.fieldContentListAttachmentURLUpdateCreate,
                                    filename: attachment.fieldContentListAttachmentFileNameUpdateCreate || "",
                                }
                            })
                        }
                    }
                })
                recordslist = [{
                    id: inputs.recordIdUpdateCreate,
                    fields: fieldsDict,
                }]
            }
            jsonToSend = {
                ...jsonToSend,
                base_id: inputs.baseIdUpdateCreate,
                table_id: inputs.tableIdUpdateCreate,
                typecast: getAccvalue(inputs, "typeCastUpdateCreate.typeCastUpdateCreate"),
                replace: getAccvalue(inputs, "replaceUpdateCreate.replaceUpdateCreate"),
                returnFieldsByFieldId: getAccvalue(inputs, "returnByIdUpdateCreate.returnByIdUpdateCreate"),
                fieldsToMergeOn: inputs.keyFeildsUpdateCreate.map((elt:any) => elt.value),
                records: recordslist,
            }
        }
        else if (inputs.operation === "Delete Record") {
            jsonToSend = {
                ...jsonToSend,
                base_id: inputs.baseIdDelete,
                table_id: inputs.tableIdDelete,
                record_id: inputs.recordIdDelete,
            }
        }
        else if (inputs.operation === "Batch Delete Records") {
            jsonToSend = {
                ...jsonToSend,
                base_id: inputs.baseIdBatchDelete,
                table_id: inputs.tableIdBatchDelete,
                record_ids: inputs.recordBatchDelete?.map((record:any) => {
                    return record.recordIdBatchDelete
                }),
            }
        }
    }
    else if (inputs.type === "Base") {
        if (inputs.operation === "Get Many Bases") {
            jsonToSend = {
                ...jsonToSend,
                offset: getAccvalue(inputs, "offset_GetManyBases.offset_Option_GetManyBases"),
            }
        }
        else if (inputs.operation === "Get Base Schema") {
            jsonToSend = {
                ...jsonToSend,
                base_id: inputs.baseID_GetBaseSchema,
            }
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "airtable",
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