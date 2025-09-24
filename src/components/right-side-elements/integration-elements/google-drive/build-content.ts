import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "File") {
        if (inputs.operation === "Copy File") {
            jsonToSend = {
                fileId: inputs.fileIdCopy,
            };
            if (inputs.copyDropdown === "Copy In The Same Folder") {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        name: getAccvalue(inputs, "fileNameCopy.option"),
                        description: getAccvalue(inputs, "descriptionCopy.option"),
                    }
                }
            }
            else if (inputs.copyDropdown === "Copy In Another Folder") {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        name: getAccvalue(inputs, "fileNameCopy.option"),
                        description: getAccvalue(inputs, "descriptionCopy.option"),
                        parents: [inputs.folderIdCopy]
                    }
                }
            }
        }

        else if (inputs.operation === "Create File") {
            let dictProp = {}
            inputs.actionDynamic.map((field: any) => {
                dictProp = { ...dictProp, [field.keyPropCreateFile]: field.valuePropCreateFile }
            })
            let dictProp2 = {}
            inputs.actionDynamic2.map((fields: any) => {
                dictProp2 = { ...dictProp2, [fields.keyAppPropCreateFile]: fields.valueAppPropCreateFile }
            })
            jsonToSend = {
                ...jsonToSend,
                content: inputs.textFileCreate,
                body: {
                    name: inputs.fileNameCreate,
                    parents: [getAccvalue(inputs, "folderIdCreate.option")]
                },
                ocrLanguage: getAccvalue(inputs, "ocrFileCreate.option"),
                useContentAsIndexableText: getAccvalue(inputs, "checkboxCreateFile.option"),
                properties: dictProp,
                appProperties: dictProp2,
            };
        }
        else if (inputs.operation === "Delete File") {
            jsonToSend = {
                ...jsonToSend,
                fileId: inputs.fileIdDeleteFile,
            }
            if (getAccvalue(inputs, "deleteTrash") == false) {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        trashed: true,
                    }
                }
            }
        }
        else if (inputs.operation === "Move File") {
            jsonToSend = {
                ...jsonToSend,
                fileId: inputs.fileIdMove,
                addParents: inputs.folderParentMove,

            };
        }
        else if (inputs.operation === "Share File") {
            jsonToSend = {
                ...jsonToSend,
                fileId: inputs.fileIdShare,
                emailMessage: getAccvalue(inputs, "emailMessageShare"),
                sendNotificationEmail: getAccvalue(inputs, "notifiEmailShare"),
                useDomainAdminAccess: getAccvalue(inputs, "domainAdminShare"),
                transferOwnership: getAccvalue(inputs, "newOwnersShare"),
            };
            if (inputs.dropType === "user") {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        role: inputs.dropRole,
                        type: inputs.dropType,
                        emailAddress: inputs.emailShare
                    }
                }
            }
            else if (inputs.dropType === "group") {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        role: inputs.dropRole,
                        type: inputs.dropType,
                        emailAddress: inputs.emailShareGroup
                    }
                }
            }
            else if (inputs.dropType === "domain") {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        role: inputs.dropRole,
                        type: inputs.dropType,
                        domain: inputs.domainShare,
                        allowFileDiscovery: inputs.fileDisCheckbox,
                    }
                }
            }
            else if (inputs.dropType === "anyone") {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        role: inputs.dropRole,
                        type: inputs.dropType,
                    }
                }
            }
        }
        // else if (inputs.operation === "Update File") {
        //     let dictProp1Update = {}
        //     inputs.actionDynamicUpdate.map(field => {
        //         dictProp1Update = { ...dictProp1Update, [field.keyPropCreateFileUpdate]: field.valuePropCreateFileUpdate }
        //     })
        //     let dictProp2Update = {}
        //     inputs.actionDynamic2Update.map(fields => {
        //         dictProp2Update = { ...dictProp2Update, [fields.keyAppPropCreateFileUpdate]: fields.valueAppPropCreateFileUpdate }
        //     })
        //     jsonToSend = {
        //         ...jsonToSend,
        //         fileId: inputs.fileIdUpdate,
        //         data: inputs.dataUpdate,
        //         body: {
        //             name: getAccvalue(inputs, "newFileNameUpdte"),
        //             properties: dictProp1Update,
        //             appProperties: dictProp2Update,
        //             ocrLanguage: getAccvalue(inputs, "ocrUpdate"),
        //             useContentAsIndexableText: getAccvalue(inputs, "contentUpdate"),
        //         },
        //     };
        // }
        else if (inputs.operation === "Upload File") {
            let dictPropUpload = {}
            inputs.actionDynamicUpload.map((field: any) => {
                dictPropUpload = { ...dictPropUpload, [field.keyPropUploadFile]: field.valuePropUploadFile }
            })
            let dictProp2Upload = {}
            inputs.actionDynamic2Upload.map((fields: any) => {
                dictProp2Upload = { ...dictProp2Upload, [fields.keyAppPropUploadFile]: fields.valueAppPropUploadFile }
            })
            if (inputs.dropData === "Binary") {
                if (getAccvalue(inputs, "folderIdUpload") == null) {
                    jsonToSend = {
                        ...jsonToSend,
                        data: inputs.binaryUpload,
                        body: {
                            ocrLanguage: getAccvalue(inputs, "ocrFileUpload"),
                            useContentAsIndexableText: getAccvalue(inputs, "checkboxUploadFile"),
                            properties: dictPropUpload,
                            appProperties: dictProp2Upload,
                            name: inputs.nameUploadBinary,

                        }
                    }
                }
                else {
                    jsonToSend = {
                        ...jsonToSend,
                        data: inputs.binaryUpload,
                        body: {
                            name: inputs.nameUploadBinary,
                            parents: [getAccvalue(inputs, "folderIdUpload")],
                            ocrLanguage: getAccvalue(inputs, "ocrFileUpload"),
                            useContentAsIndexableText: getAccvalue(inputs, "checkboxUploadFile"),
                            properties: dictPropUpload,
                            appProperties: dictProp2Upload,

                        },
                    };
                }
            }
            else if (inputs.dropData === "Url") {
                if (getAccvalue(inputs, "folderIdUpload") == null) {
                    jsonToSend = {
                        ...jsonToSend,
                        url: inputs.urlUpload,
                        body: {
                            name: inputs.nameUploadUrl,
                            ocrLanguage: getAccvalue(inputs, "ocrFileUpload"),
                            useContentAsIndexableText: getAccvalue(inputs, "checkboxUploadFile"),
                            properties: dictPropUpload,
                            appProperties: dictProp2Upload,
                        },
                    };
                }
                else {
                    jsonToSend = {
                        ...jsonToSend,
                        url: inputs.urlUpload,
                        body: {
                            name: inputs.nameUploadUrl,
                            parents: [getAccvalue(inputs, "folderIdUpload")],
                            ocrLanguage: getAccvalue(inputs, "ocrFileUpload"),
                            useContentAsIndexableText: getAccvalue(inputs, "checkboxUploadFile"),
                            properties: dictPropUpload,
                            appProperties: dictProp2Upload,
                        },
                    };
                }
            }
        }
        else if (inputs.operation === "List Files") {
            let s = "";
            if (getAccvalue(inputs, "fieldsLists"))
                getAccvalue(inputs, "fieldsLists").map((a: any) => {
                    if (a.value == "id" || a.value == "owners" || a.value == "name" || a.value == "trashed") {
                        if (s.includes("files(")) {
                            const indexOfFile = s.indexOf("(")
                            const endOfFile = s.indexOf(")")
                            const fileFileds = s.slice(indexOfFile + 1, endOfFile)
                            const newFileFileds = fileFileds + "," + a.value
                            s = s.replace(fileFileds, newFileFileds)
                        }
                        else {
                            s = s === "" ? s + "files(" + a.value + ")" : s + ",files(" + a.value + ")"
                        }
                    }
                    else {
                        s = `${s == "" ? a.value : s + "," + a.value}`
                    }
                })
            jsonToSend = {
                ...jsonToSend,
                pageSize: inputs.limitSearch,
                parent: getAccvalue(inputs, "parentFolderId"),
                trashed: getAccvalue(inputs, "inTheTrashFiles"),
                type: getAccvalue(inputs, "mimeTypeFile")?.map((type: any) => type.value),
                fields: s || undefined,
            }
            if (inputs.searchBy === "Name") {
                jsonToSend = {
                    ...jsonToSend,
                    name: inputs.fileFolderName,
                };
            }
            else if (inputs.searchBy === "Query") {
                jsonToSend = {
                    ...jsonToSend,
                    query: inputs.fileFolderQuery,
                };
            }
        }
        else if (inputs.operation === "Get File") {
            jsonToSend = {
                fileId: inputs.fileIdGetFile,
            }
        }

    }
    else if (inputs.type === "Folder") {
        if (inputs.operation === "Create Folder") {
            jsonToSend = {
                ...jsonToSend,
                body: {
                    name: inputs.folderIdCreateFolder22,
                    mimeType: "application/vnd.google-apps.folder",
                    parents: [getAccvalue(inputs, "folderIdCreateFolder")]
                }
            };
        }
        else if (inputs.operation === "Delete Folder") {
            jsonToSend = {
                ...jsonToSend,
                fileId: inputs.folderIdDeleteFile,
            }

            if (getAccvalue(inputs, "deleteTrashFolder") == false) {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        trashed: true,
                    }
                }
            }


        }
        else if (inputs.operation === "Share Folder") {
            jsonToSend = {
                ...jsonToSend,
                fileId: inputs.folderIdShareFolder,
                emailMessage: getAccvalue(inputs, "emailMessageShareFolder"),
                sendNotificationEmail: getAccvalue(inputs, "notifiEmailShareFolder"),
                useDomainAdminAccess: getAccvalue(inputs, "domainAdminShareFolder"),
                transferOwnership: getAccvalue(inputs, "newOwnersShareFolder"),
            };
            if (inputs.dropTypeFolder === "user") {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        role: inputs.dropRoleFolder,
                        type: inputs.dropTypeFolder,
                        emailAddress: inputs.emailShareFolder
                    }
                }
            }
            else if (inputs.dropTypeFolder === "group") {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        role: inputs.dropRoleFolder,
                        type: inputs.dropTypeFolder,
                        emailAddress: inputs.emailShareGroupFolder
                    }
                }
            }
            else if (inputs.dropTypeFolder === "domain") {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        role: inputs.dropRoleFolder,
                        type: inputs.dropTypeFolder,
                        domain: inputs.domainShareFolder,
                        allowFileDiscovery: inputs.fileDisCheckboxFolder,
                    }
                }
            }
            else if (inputs.dropTypeFolder === "anyone") {
                jsonToSend = {
                    ...jsonToSend,
                    body: {
                        role: inputs.dropRoleFolder,
                        type: inputs.dropTypeFolder,
                    }
                }
            }
        }
        else if (inputs.operation === "Move Folder") {
            jsonToSend = {
                ...jsonToSend,
                fileId: inputs.folderIdMove,
                addParents: inputs.folderParentMoveFolder,
            };
        }
        else if (inputs.operation === "List Folders") {
            let s = "";
            if (getAccvalue(inputs, "fieldsLists2"))
                getAccvalue(inputs, "fieldsLists2").map((a: any) => {
                    if (a.value == "id" || a.value == "owners" || a.value == "name" || a.value == "trashed") {
                        if (s.includes("files(")) {
                            const indexOfFile = s.indexOf("(")
                            const endOfFile = s.indexOf(")")
                            const fileFileds = s.slice(indexOfFile + 1, endOfFile)
                            const newFileFileds = fileFileds + "," + a.value
                            s = s.replace(fileFileds, newFileFileds)
                        }
                        else {
                            s = s === "" ? s + "files(" + a.value + ")" : s + ",files(" + a.value + ")"
                        }
                    }
                    else {
                        s = `${s == "" ? a.value : s + "," + a.value}`
                    }
                })
            jsonToSend =
            {
                ...jsonToSend,
                pageSize: inputs.limitSearchFolder,
                parent: getAccvalue(inputs, "parentFolderIdFolder"),
                trashed: getAccvalue(inputs, "inTheTrashFolder"),
                fields: s || undefined,
            }
            if (inputs.searchByF === "Name") {

                jsonToSend = {
                    ...jsonToSend,
                    name: inputs.FolderName,
                };
            }
            else if (inputs.searchByF === "Query") {
                jsonToSend = {
                    ...jsonToSend,
                    query: inputs.FolderQuery,
                };
            }
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "googleDrive",
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