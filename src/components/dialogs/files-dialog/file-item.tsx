import React from "react";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import {
  FileText,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trash2,
  Loader2,
  Upload,
  File,
  Calendar,
  Image,
  Video,
  Music,
  Archive,
  Code,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useFilesStore } from "../../../store/files-store";

type FileStatus = "uploading" | "success" | "error";

interface FileItemProps {
  fileId: string;
  fileName: string; // Original filename for display
  serverFileName?: string; // Server-returned filename (optional)
  isTemporary?: boolean; // Whether this is a temporary uploading file
  fileType: string; // MIME type
  fileSize: string; // File size in bytes as string
  createdAt: string; // Creation date
  status?: FileStatus;
  progress?: number;
  error?: string;
  isUploading: boolean;
  isRemoving: boolean;
  onRetryUpload: (fileId: string) => void;
  onRemoveFile: (fileId: string) => Promise<void>;
}

export const FileItem: React.FC<FileItemProps> = ({
  fileId,
  fileName,
  serverFileName,
  isTemporary = false,
  fileType = "",
  fileSize = "0",
  createdAt,
  status,
  progress = 0,
  error,
  isUploading,
  isRemoving,
  onRetryUpload,
  onRemoveFile,
}) => {
  const { formatFileSize } = useFilesStore();
  console.log({ status });

  const getStatusIcon = () => {
    switch (status) {
      case "uploading":
        return <Upload className="w-4 h-4 text-blue-500 animate-pulse" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "uploading":
        return "border-blue-200 bg-blue-50";
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  const handleRetry = () => {
    if (!isUploading && status === "error") {
      onRetryUpload(fileId);
    }
  };

  const handleRemove = () => {
    if (!isRemoving) {
      onRemoveFile(fileId);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return <Image className="w-5 h-5" />;
    if (mimeType.startsWith("video/")) return <Video className="w-5 h-5" />;
    if (mimeType.startsWith("audio/")) return <Music className="w-5 h-5" />;
    if (mimeType.includes("pdf")) return <FileText className="w-5 h-5" />;
    if (
      mimeType.includes("zip") ||
      mimeType.includes("rar") ||
      mimeType.includes("tar")
    )
      return <Archive className="w-5 h-5" />;
    if (
      mimeType.includes("javascript") ||
      mimeType.includes("json") ||
      mimeType.includes("xml")
    )
      return <Code className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const getFileTypeColor = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return "bg-green-100 text-green-800";
    if (mimeType.startsWith("video/")) return "bg-purple-100 text-purple-800";
    if (mimeType.startsWith("audio/")) return "bg-blue-100 text-blue-800";
    if (mimeType.includes("pdf")) return "bg-red-100 text-red-800";
    if (
      mimeType.includes("zip") ||
      mimeType.includes("rar") ||
      mimeType.includes("tar")
    )
      return "bg-orange-100 text-orange-800";
    if (
      mimeType.includes("javascript") ||
      mimeType.includes("json") ||
      mimeType.includes("xml")
    )
      return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getFileExtension = (fileName: string) => {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts.pop()?.toUpperCase() : "FILE";
  };

  return (
    <div
      className={cn(
        "border rounded-lg p-4 transition-all duration-200",
        getStatusColor()
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          {/* File type icon */}
          <div
            className={cn(
              "p-2 rounded-lg flex items-center justify-center",
              getFileTypeColor(fileType)
            )}
          >
            {getFileIcon(fileType)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col space-y-1">
              {/* File name */}
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {fileName}
                </p>
                {/* File extension badge */}
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full",
                    getFileTypeColor(fileType)
                  )}
                >
                  {getFileExtension(fileName)}
                </span>
              </div>

              {/* Server filename (if different and not temporary) */}
              {!isTemporary &&
                serverFileName &&
                serverFileName !== fileName && (
                  <p className="text-xs text-gray-500 truncate">
                    Server: {serverFileName}
                  </p>
                )}

              {/* File metadata row */}
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                {/* File size */}
                <span className="flex items-center space-x-1">
                  <span>Size:</span>
                  <span className="font-medium">
                    {fileSize}
                  </span>
                </span>

                {/* Creation date */}
                {createdAt && (
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(createdAt)}</span>
                  </span>
                )}
              </div>

              {/* Status text */}
              <div className="flex items-center space-x-2">
                {getStatusIcon()}
                <p className="text-xs text-gray-600">
                  {status === "uploading" && `Uploading... ${progress}%`}
                  {status === "success" &&
                    (isTemporary ? "Upload complete" : "Ready")}
                  {status === "error" && error}
                  {!status && "Ready"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {/* Retry button for failed uploads */}
          {status === "error" && !error?.includes("exceeds 10MB limit") && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              disabled={isUploading}
              className="h-8 w-8 p-0"
              title="Retry upload"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          )}

          {/* Remove button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemove}
            disabled={isRemoving || status === "uploading"}
            className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
            title="Remove file"
          >
            {isRemoving ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Trash2 className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>

      {/* Progress bar for uploading files */}
      {status === "uploading" && (
        <div className="mt-3">
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
};
