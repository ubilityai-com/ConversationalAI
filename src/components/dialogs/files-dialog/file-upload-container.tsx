import { useState } from "react";
import { useFilesStore } from "../../../store/files-store";
import { FileList } from "./file-list";
import { FileUploadArea } from "./file-upload-area";

export const FileUploadContainer: React.FC = () => {
  const {
    files,
    fileStatuses,
    fileProgress,
    fileErrors,
    isLoadingFiles,
    isUploading,
    removingFileIds,
    handleFileSelect,
    retryUpload,
    removeFile,
    uploadingFiles,
  } = useFilesStore();
  console.log({ files, uploadingFiles });


  return (
    <>
      <FileUploadArea
        isUploading={isUploading}
        onFileSelect={handleFileSelect}
      />

      <FileList
        fileStatuses={fileStatuses}
        fileProgress={fileProgress}
        fileErrors={fileErrors}
        isLoadingFiles={isLoadingFiles}
        isUploading={isUploading}
        removingFileIds={removingFileIds}
        onRetryUpload={retryUpload}
        onRemoveFile={removeFile}
      />
    </>
  );
};
