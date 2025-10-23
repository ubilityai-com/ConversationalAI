import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "File") {
        if (inputs.operation === "Get File") {
            jsonToSend = {
                ...jsonToSend,
                file_id: inputs.fileIDGetFile,
            }
        }
        else if (inputs.operation === "Copy File") {
            jsonToSend = {
                ...jsonToSend,
                file_id: inputs.fileIDCopyFile,
                name: inputs.fileNameCopyFile,
                parentReference: {
                    driveId: getAccvalue(inputs, "parentDriveIDCopyFile.parentDriveIDOptionCopyFile"),
                    driveType: getAccvalue(inputs, "parentDriveTypeCopyFile.parentDriveTypeOptionCopyFile"),
                    id: getAccvalue(inputs, "parentIDCopyFile.parentIDOptionCopyFile"),
                    name: getAccvalue(inputs, "parentNameCopyFile.parentNameOptionCopyFile"),
                    path: getAccvalue(inputs, "parentPathCopyFile.parentPathOptionCopyFile"),
                    shareId: getAccvalue(inputs, "parentShareIDCopyFile.parentShareIDOptionCopyFile"),
                    siteId: getAccvalue(inputs, "parentSiteIDCopyFile.parentSiteIDOptionCopyFile"),
                }
            }
        }
        else if (inputs.operation === "Delete File") {
            jsonToSend = {
                ...jsonToSend,
                file_id: inputs.fileIDDeleteFile,
            }
        }
        else if (inputs.operation === "Create New Text File") {
            jsonToSend = {
                ...jsonToSend,
                parent_folder_id: inputs.parentFolderIDCreateNewTextFile,
                name: inputs.fileNameCreateNewTextFile,
                content: inputs.fileContentCreateNewTextFile,
            }
        }
        else if (inputs.operation === "Download File") {
            jsonToSend = {
                ...jsonToSend,
                file_id: inputs.fileIDDownloadFile,
            }
        }
        else if (inputs.operation === "Download File From ShareLink") {
            jsonToSend = {
                ...jsonToSend,
                share_link: inputs.shareLinkDownloadFileFromSharelink,
            }
        }
        else if (inputs.operation === "Rename File") {
            jsonToSend = {
                ...jsonToSend,
                file_id: inputs.fileIDRenameFile,
                name: inputs.fileNameRenameFile,
            }
        }
        else if (inputs.operation === "Search File") {
            jsonToSend = {
                ...jsonToSend,
                query: inputs.searchQuerySearchFile,
            }
        }
        else if (inputs.operation === "Share File") {
            jsonToSend = {
                ...jsonToSend,
                file_id: inputs.fileIDShareFile,
                type: inputs.shareTypeShareFile,
                scope: inputs.shareScopeShareFile,
                password: getAccvalue(inputs, "PasswordShareFile.PasswordOptionShareFile"),
                expirationDateTime: getAccvalue(inputs, "expirationDateTimeShareFile.expirationDateTimeOptionShareFile"),
                retainInheritedPermissions: getAccvalue(inputs, "retainInheritedPermissionsShareFile.retainInheritedPermissionsOptionShareFile"),
            }
        }
        else if (inputs.operation === "Upload File") {
            jsonToSend = {
                ...jsonToSend,
                parent_folder_id: inputs.parentFolderIDUploadFile,
                name: inputs.fileNameUploadFile,
                content_type: inputs.fileContentTypeUploadFile,
                content_choice: inputs.uploadFromUploadFile,
            }
            if (inputs.uploadFromUploadFile === "url") {
                jsonToSend = {
                    ...jsonToSend,
                    url: inputs.fileURLUploadFile,
                }
            }
            else if (inputs.uploadFromUploadFile === "byteString") {
                jsonToSend = {
                    ...jsonToSend,
                    content: inputs.fileContentUploadFile,
                }
            }
        }
        else if (inputs.operation === "Replace File Content") {
            jsonToSend = {
                ...jsonToSend,
                item_id: inputs.fileIDReplaceFileContent,
                content_type: inputs.fileContentTypeReplaceFileContent,
                content_choice: inputs.uploadFromReplaceFileContent,
            }
            if (inputs.uploadFromReplaceFileContent === "url") {
                jsonToSend = {
                    ...jsonToSend,
                    url: inputs.fileURLReplaceFileContent,
                }
            }
            else if (inputs.uploadFromReplaceFileContent === "byteString") {
                jsonToSend = {
                    ...jsonToSend,
                    content: inputs.fileContentReplaceFileContent,
                }
            }
        }
    }
    else if (inputs.type === "Folder") {
        if (inputs.operation === "Create Folder") {
            jsonToSend = {
                ...jsonToSend,
                name: inputs.folderNameCreateFolder,
                parent_folder_id: getAccvalue(inputs, "parentFolderIDCreateFolder.parentFolderIDOptionCreateFolder"),
            }
        }
        else if (inputs.operation === "Delete Folder") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folderIDDeleteFolder,
            }
        }
        else if (inputs.operation === "Get Items in Folder") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folderIDGetFolderChildren,
            }
        }
        else if (inputs.operation === "Rename Folder") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folderIDRenameFolder,
                name: inputs.folderNameRenameFolder,
            }
        }
        else if (inputs.operation === "Search Folder") {
            jsonToSend = {
                ...jsonToSend,
                query: inputs.searchQuerySearchFolder,
            }
        }
        else if (inputs.operation === "Share Folder") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folderIDShareFolder,
                type: inputs.shareTypeShareFolder,
                scope: inputs.shareScopeShareFolder,
                password: getAccvalue(inputs, "PasswordShareFolder.PasswordOptionShareFolder"),
                expirationDateTime: getAccvalue(inputs, "expirationDateTimeShareFolder.expirationDateTimeOptionShareFolder"),
                retainInheritedPermissions: getAccvalue(inputs, "retainInheritedPermissionsShareFolder.retainInheritedPermissionsOptionShareFolder"),
            }
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "microsoft_onedrive",
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