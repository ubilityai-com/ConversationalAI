import { useState } from "react";
import { useFlowStore } from "../../../store/root-store";
import { FileList } from "./file-list";
import { FileUploadArea } from "./file-upload-area";

export const FileUploadContainer: React.FC = () => {
  const {
    fileStatuses,
    fileProgress,
    fileErrors,
    isLoadingFiles,
    isUploading,
    removingFileIds,
    handleFileSelect,
    retryUpload,
    removeFile,
  } = useFlowStore();


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
