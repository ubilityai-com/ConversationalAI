import client from "./client";

interface UploadFileParams {
    dialogue: string;
}

export interface DeleteFileParams {
    dialogue: string;
    filename: string;
}

const uploadFile = (
    file: any,
    params: UploadFileParams,
    onUploadProgress?: (percent: number) => void
) =>
    client.post(
        `/upload_file`,
        file,
        {
            params,
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total && onUploadProgress) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onUploadProgress(percentCompleted);
                }
            },
        }
    );

const getFile = (dialogue: string | number, filename: string) =>
    client.get(`/get_file`, {
        params: { dialogue, filename },
        responseType: "blob",
    });

const listFiles = (dialogue: string | number) =>
    client.get(
        `/list_uploaded_files`,
        { params: { dialogue } }
    );

const deleteFile = (params: DeleteFileParams) =>
    client.delete(`/delete_file`, { params });

export default {
    uploadFile,
    getFile,
    listFiles,
    deleteFile,
};