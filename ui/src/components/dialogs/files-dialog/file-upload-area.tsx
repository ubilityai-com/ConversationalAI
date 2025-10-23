import { Upload } from "lucide-react";
import { useRef } from "react";

interface FileUploadAreaProps {
  isUploading: boolean;
  onFileSelect: (files: FileList) => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  isUploading,
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    if (isUploading) return;
    e.preventDefault();
    e.currentTarget.classList.add("border-blue-400");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.remove("border-blue-400");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    if (isUploading) return;
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-400");
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      onFileSelect(droppedFiles);
    }
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target.files?.length && e.target.files.length > 0) {
      onFileSelect(e.target.files);
      // Reset file input
      e.target.value = "";
    }
  };

  const handleUploadAreaClick = (): void => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          isUploading
            ? "border-gray-200 bg-gray-50 cursor-not-allowed"
            : "border-gray-300 hover:border-blue-400 cursor-pointer"
        }`}
        onClick={handleUploadAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload
          className={`w-12 h-12 mx-auto mb-4 ${
            isUploading ? "text-gray-300" : "text-gray-400"
          }`}
        />
        <p
          className={`mb-2 ${isUploading ? "text-gray-400" : "text-gray-600"}`}
        >
          {isUploading
            ? "Upload in progress..."
            : "Drag and drop a file here, or click to select a file"}
        </p>
        <p
          className={`text-sm ${
            isUploading ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Supports all file types, max 10MB per file
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        disabled={isUploading}
      />
    </>
  );
};
