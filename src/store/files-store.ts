import axios from "axios";
import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useRightDrawerStore } from "./right-drawer-store";
enableMapSet();

type FileStatus = "uploading" | "success" | "error";

export type FileItem = {
  file_name: string;
  file_type: string;
  file_size: string;
  created_at: string;
};

// New type for temporary uploading files
export type UploadingFileItem = {
  tempId: string;
  originalFile: File;
  file_type: string;
  file_size: string;
  created_at: string;
  isTemporary: true;
};

interface FilesState {
  files: FileItem[];
  uploadingFiles: UploadingFileItem[]; // New state for files being uploaded
  fileStatuses: Record<string, FileStatus>;
  fileProgress: Record<string, number>;
  fileErrors: Record<string, string>;
  isLoadingFiles: boolean;
  isUploading: boolean;
  removingFileIds: Set<string>;
}

interface FilesActions {
  setFiles: (files: FileItem[]) => void;
  addFile: (file: FileItem) => void;
  addUploadingFile: (file: UploadingFileItem) => void; // New action
  removeUploadingFile: (tempId: string) => void; // New action
  replaceUploadingFileWithReal: (tempId: string, realFile: FileItem) => void; // New action
  removeFileFromList: (fileId: string) => void;
  setFileStatus: (fileId: string, status: FileStatus) => void;
  setFileProgress: (fileId: string, progress: number) => void;
  setFileError: (fileId: string, error: string) => void;
  setIsLoadingFiles: (loading: boolean) => void;
  setIsUploading: (uploading: boolean) => void;
  addRemovingFileId: (fileId: string) => void;
  removeRemovingFileId: (fileId: string) => void;
  clearFileData: (fileId: string) => void;
  handleFileSelect: (selectedFiles: FileList) => void;
  uploadFileToServer: (file: File, tempId: string) => void; // Updated signature
  retryUpload: (fileId: string) => void;
  removeFile: (fileId: string) => Promise<void>;
  formatFileSize: (bytes: number) => string;
  getFiles: () => void;
  resetFilesState: () => void;
}

type FilesStore = FilesState & FilesActions;

const initialState: FilesState = {
  files: [],
  uploadingFiles: [], // New initial state
  fileStatuses: {},
  fileProgress: {},
  fileErrors: {},
  isLoadingFiles: false,
  isUploading: false,
  removingFileIds: new Set(),
};

export const useFilesStore = create<FilesStore>()(
  immer((set, get) => ({
    ...initialState,

    setFiles: (files) =>
      set((state) => {
        state.files = files;
      }),

    addFile: (file) =>
      set((state) => {
        state.files.push(file);
      }),

    // New actions for handling uploading files
    addUploadingFile: (file) =>
      set((state) => {
        state.uploadingFiles.unshift(file);
      }),

    removeUploadingFile: (tempId) =>
      set((state) => {
        state.uploadingFiles = state.uploadingFiles.filter(
          (file) => file.tempId !== tempId
        );
        // Clean up the status data
        delete state.fileStatuses[tempId];
        delete state.fileProgress[tempId];
        delete state.fileErrors[tempId];
      }),

    replaceUploadingFileWithReal: (tempId, realFile) =>
      set((state) => {
        // Remove from uploading files
        state.uploadingFiles = state.uploadingFiles.filter(
          (file) => file.tempId !== tempId
        );
        // Add to real files
        state.files.unshift(realFile);
      }),

    removeFileFromList: (fileId) =>
      set((state) => {
        state.files = state.files.filter((file) => file.file_name !== fileId);
      }),

    setFileStatus: (fileId, status) =>
      set((state) => {
        state.fileStatuses[fileId] = status;
      }),

    setFileProgress: (fileId, progress) =>
      set((state) => {
        state.fileProgress[fileId] = progress;
      }),

    setFileError: (fileId, error) =>
      set((state) => {
        state.fileErrors[fileId] = error;
      }),

    setIsLoadingFiles: (loading) =>
      set((state) => {
        state.isLoadingFiles = loading;
      }),

    setIsUploading: (uploading) =>
      set((state) => {
        state.isUploading = uploading;
      }),

    addRemovingFileId: (fileId) =>
      set((state) => {
        state.removingFileIds.add(fileId);
      }),

    removeRemovingFileId: (fileId) =>
      set((state) => {
        state.removingFileIds.delete(fileId);
      }),

    clearFileData: (fileId) =>
      set((state) => {
        delete state.fileStatuses[fileId];
        delete state.fileProgress[fileId];
        delete state.fileErrors[fileId];
      }),

    formatFileSize: (bytes) => {
      if (bytes === 0) return '0 MB';

      const mb = bytes / (1024 * 1024);

      // Round to 2 decimal places and add 'MB' suffix
      return `${mb.toFixed(2)} MB`;
    },

    // Updated handleFileSelect to create temporary entry
    handleFileSelect: (selectedFiles) => {
      const {
        isUploading,
        formatFileSize,
        uploadFileToServer,
        addUploadingFile,
      } = get();

      if (isUploading || selectedFiles.length === 0) return;

      const file = selectedFiles[0];
      const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
      const tempId = `temp_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const isFileTooLarge = file.size > maxFileSize;

      // Create temporary uploading file entry
      const uploadingFile: UploadingFileItem = {
        tempId,
        originalFile: file,
        file_type: file.type,
        file_size: formatFileSize(file.size),
        created_at: new Date().toISOString(),
        isTemporary: true,
      };

      addUploadingFile(uploadingFile);

      set((state) => {
        state.fileProgress[tempId] = 0;
        state.fileErrors[tempId] = "";

        if (isFileTooLarge) {
          state.fileStatuses[tempId] = "error";
          state.fileErrors[
            tempId
          ] = `File size exceeds 10MB limit (${formatFileSize(file.size)})`;
        } else {
          state.fileStatuses[tempId] = "uploading";
        }
      });

      if (!isFileTooLarge) {
        uploadFileToServer(file, tempId);
      }
    },

    // Updated uploadFileToServer to handle temporary files
    uploadFileToServer: async (file, tempId) => {
      const {
        setIsUploading,
        setFileProgress,
        setFileStatus,
        setFileError,
        formatFileSize,
        replaceUploadingFileWithReal,
        removeUploadingFile,
        clearFileData,
      } = get();

      try {
        setIsUploading(true);

        const authToken = localStorage.getItem("authToken") || "";

        const response = await axios.post(
          "http://23.88.122.180/bot/" + "upload_file?dialogue=khaled",
          file,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Filename: file.name,
              "Content-Type": file.type || "application/octet-stream",
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setFileProgress(tempId, percentCompleted);
              }
            },
          }
        );

        console.log({ response });

        // Get the server-returned filename from response
        const serverFileName =
          response.data.filename || response.data.file_name || file.name;

        // Create real file entry with server data
        const realFile: FileItem = {
          file_name: serverFileName,
          file_type: file.type,
          file_size: file.size.toString(),
          created_at: new Date().toISOString(),
        };

        // Replace temporary file with real file
        replaceUploadingFileWithReal(tempId, realFile);

        // Update status using server filename
        setFileStatus(serverFileName, "success");
        setFileProgress(serverFileName, 100);

        // Clear temporary file data
        clearFileData(tempId);

        const { handleSnackBarMessageOpen } = useRightDrawerStore.getState();
        handleSnackBarMessageOpen(
          "File Uploaded Successfully",
          "success",
          1500
        );

        console.log("Upload successful:", response.data);
      } catch (error: any) {
        console.error("Upload error:", error);

        let errorMessage = "Failed to upload file";

        if (error.response?.data?.err) {
          const serverError = error.response.data.err;

          if (serverError.includes("already exists")) {
            errorMessage = "File already exists on server";

            // Get server filename from error response
            const serverFileName = error.response.data.file_name || file.name;

            const realFile: FileItem = {
              file_name: serverFileName,
              file_type: file.type,
              file_size: file.size.toString(),
              created_at: new Date().toISOString(),
            };

            replaceUploadingFileWithReal(tempId, realFile);
            setFileStatus(serverFileName, "success");
            clearFileData(tempId);

            const { handleSnackBarMessageOpen } =
              useRightDrawerStore.getState();
            handleSnackBarMessageOpen(
              "File Already Exists",
              "destructive",
              1500
            );
          } else if (serverError.includes("Size")) {
            errorMessage = `File size too large (max 20MB, got ${formatFileSize(
              file.size
            )})`;
            setFileStatus(tempId, "error");

            const { handleSnackBarMessageOpen } =
              useRightDrawerStore.getState();
            handleSnackBarMessageOpen(
              "File size exceeds 20MB limit",
              "destructive",
              2000
            );
          } else {
            errorMessage = serverError;
            setFileStatus(tempId, "error");
          }
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "Network connection failed";
          setFileStatus(tempId, "error");
        } else if (error.response?.status === 413) {
          errorMessage = "File size too large for server";
          setFileStatus(tempId, "error");
        } else {
          setFileStatus(tempId, "error");

          const { handleSnackBarMessageOpen } = useRightDrawerStore.getState();
          handleSnackBarMessageOpen(
            "Failed to upload file",
            "destructive",
            2000
          );
        }

        setFileError(tempId, errorMessage);
        setFileProgress(tempId, 0);
      } finally {
        setIsUploading(false);
      }
    },

    retryUpload: (fileId) => {
      const {
        isUploading,
        fileErrors,
        setFileStatus,
        setFileProgress,
        setFileError,
        uploadFileToServer,
      } = get();

      if (isUploading) return;

      // Check if it was a size error (don't allow retry for size errors)
      if (fileErrors[fileId]?.includes("exceeds 10MB limit")) {
        return;
      }

      setFileStatus(fileId, "uploading");
      setFileProgress(fileId, 0);
      setFileError(fileId, "");

      // uploadFileToServer(fileId);
    },

    removeFile: async (fileId) => {
      const {
        addRemovingFileId,
        removeRemovingFileId,
        removeFileFromList,
        clearFileData,
      } = get();

      addRemovingFileId(fileId);

      try {
        // Get auth token
        const authToken = localStorage.getItem("authToken") || "";

        // Make API call to delete file
        await axios.delete(
          `http://23.88.122.180/bot/delete_file?dialogue=khaled&filename=${encodeURIComponent(
            fileId
          )}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Remove from local state after successful API call
        removeFileFromList(fileId);
        clearFileData(fileId);

        // Show success message
        const { handleSnackBarMessageOpen } = useRightDrawerStore.getState();
        handleSnackBarMessageOpen("File deleted successfully", "success", 1500);
      } catch (error: any) {
        console.error("Failed to remove file:", error);

        let errorMessage = "Failed to delete file";

        if (error.response?.data?.err) {
          errorMessage = error.response.data.err;
        } else if (error.response?.status === 404) {
          errorMessage = "File not found";
          // If file doesn't exist on server, remove it from local state anyway
          removeFileFromList(fileId);
          clearFileData(fileId);
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "Network connection failed";
        }

        // Show error message (unless it was a 404 and we cleaned up locally)
        if (error.response?.status !== 404) {
          const { handleSnackBarMessageOpen } = useRightDrawerStore.getState();
          handleSnackBarMessageOpen(errorMessage, "destructive", 2000);
        }
      } finally {
        removeRemovingFileId(fileId);
      }
    },
    getFiles: async () => {
      try {
        get().setIsLoadingFiles(true);
        const result = await axios.get(
          "http://23.88.122.180/bot/" + "list_uploaded_files?dialogue=khaled"
        );
        const sortedFiles = result.data.files.sort((a: FileItem, b: FileItem) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
        get().setFiles(sortedFiles);
        get().setIsLoadingFiles(false);
      } catch (error) {
        console.log({ error });
        get().setIsLoadingFiles(false);
      }
    },

    resetFilesState: () =>
      set((state) => {
        Object.assign(state, initialState);
        state.removingFileIds = new Set();
      }),
  }))
);
