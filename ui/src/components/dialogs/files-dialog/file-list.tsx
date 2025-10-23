import { File } from "lucide-react";
import { useState } from "react";
import {
  useFlowStore
} from "../../../store/root-store";
import { FileItem } from "./file-item";
import { FileSkeleton } from "./file-skeleton";
import { SearchInput } from "./search-input";

type FileStatus = "uploading" | "success" | "error";

interface FileListProps {
  fileStatuses: Record<string, FileStatus>;
  fileProgress: Record<string, number>;
  fileErrors: Record<string, string>;
  isLoadingFiles: boolean;
  isUploading: boolean;
  removingFileIds: Set<string>;
  onRetryUpload: (fileId: string) => void;
  onRemoveFile: (fileId: string) => Promise<void>;
}

export const FileList: React.FC<FileListProps> = ({
  fileStatuses,
  fileProgress,
  fileErrors,
  isLoadingFiles,
  isUploading,
  removingFileIds,
  onRetryUpload,
  onRemoveFile,
}) => {
  const {
    uploadFileToServer,
    removeUploadingFile,
    setFileStatus,
    setFileProgress,
    setFileError,
    files,
    uploadingFiles
  } = useFlowStore();
  const [searchQuery, setSearchQuery] = useState("");
  const getFilteredFiles = () => {
    if (!searchQuery.trim()) {
      return files;
    }

    const query = searchQuery.toLowerCase().trim();
    return files.filter((file) => file.file_name.toLowerCase().includes(query));
  };
  // Get filtered files based on search query
  const filteredFiles = getFilteredFiles();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  console.log({ uploadingFiles, filteredFiles });
  const hasFiles = files.length > 0;
  const showSearchResults = searchQuery.trim() && hasFiles;
  const noSearchResults = showSearchResults && filteredFiles.length === 0;
  // Handle retry for uploading files
  const handleRetryUploadingFile = async (tempId: string) => {
    const uploadingFile = uploadingFiles.find((file) => file.tempId === tempId);
    if (!uploadingFile) return;

    // Reset status and progress
    setFileStatus(tempId, "uploading");
    setFileProgress(tempId, 0);
    setFileError(tempId, "");

    // Retry upload with the original file
    try {
      await uploadFileToServer(
        uploadingFile.originalFile,
        uploadingFile.tempId
      );
    } catch (error) {
      console.error("Retry upload failed:", error);
    }
  };

  // Handle remove for uploading files
  const handleRemoveUploadingFile = async (tempId: string) => {
    // Remove from uploading files list
    removeUploadingFile(tempId);

    // Clean up status data
    setFileStatus(tempId, "uploading"); // Reset to clear any error state
    setFileProgress(tempId, 0);
    setFileError(tempId, "");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header with file count and search */}
      <div className="flex-shrink-0 mb-4">
        {/* Uploading Files Section */}
        {uploadingFiles.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              Uploading Files ({uploadingFiles.length})
            </h4>
            <div className="space-y-2">
              {uploadingFiles.map((file) => (
                <FileItem
                  key={file.tempId}
                  fileId={file.tempId}
                  fileName={file.originalFile.name}
                  fileType={file.originalFile.type}
                  fileSize={file.file_size}
                  createdAt={new Date().toISOString()}
                  isTemporary={true}
                  status={fileStatuses[file.tempId]}
                  progress={fileProgress[file.tempId] || 0}
                  error={fileErrors[file.tempId] || ""}
                  isUploading={isUploading}
                  isRemoving={removingFileIds.has(file.tempId)}
                  onRetryUpload={handleRetryUploadingFile}
                  onRemoveFile={handleRemoveUploadingFile}
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-gray-800">
            {isLoadingFiles
              ? "Loading Files..."
              : showSearchResults
                ? `Search Results (${files.length})`
                : `Files (${files.length})`}
          </h3>
        </div>

        {/* Search Input - only show if there are files or we're searching */}
        {(hasFiles || searchQuery) && !isLoadingFiles && (
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search files by name..."
            className="mb-3"
          />
        )}
      </div>

      {/* File List Content */}
      <div className="flex-1 overflow-y-auto">
        {isLoadingFiles ? (
          // Show skeleton loaders while loading
          <div className="space-y-3">
            <FileSkeleton />
            <FileSkeleton />
            <FileSkeleton />
          </div>
        ) : noSearchResults ? (
          // No search results
          <div className="text-center py-8 text-gray-500">
            <File className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-lg font-medium">No files found</p>
            <p className="text-sm">
              No files match your search for "{searchQuery}"
            </p>
          </div>
        ) : hasFiles ? (
          // Show actual files
          <div className="space-y-3">
            {filteredFiles.map((file) => (
              <FileItem
                key={file.file_name}
                fileId={file.file_name}
                fileName={file.file_name}
                fileType={file.file_type}
                fileSize={file.file_size}
                createdAt={file.created_at}
                status={fileStatuses[file.file_name]}
                progress={fileProgress[file.file_name] || 0}
                error={fileErrors[file.file_name] || ""}
                isUploading={isUploading}
                isRemoving={removingFileIds.has(file.file_name)}
                onRetryUpload={onRetryUpload}
                onRemoveFile={onRemoveFile}
              />
            ))}
          </div>
        ) : (
          // No files at all (fallback)
          <div className="text-center py-8 text-gray-500">
            <File className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-lg font-medium">No files uploaded yet</p>
            <p className="text-sm">Upload your first file to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
