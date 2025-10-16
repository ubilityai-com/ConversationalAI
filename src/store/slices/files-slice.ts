import { enableMapSet, produce } from "immer"
import type { StateCreator } from "zustand"
import fileApis from "../../api/fileApis"
import { FlowStore } from "../root-store"

enableMapSet()

type FileStatus = "uploading" | "success" | "error"

export type FileItem = {
    file_name: string
    file_type: string
    file_size: string
    created_at: string
}

export type UploadingFileItem = {
    tempId: string
    originalFile: File
    file_type: string
    file_size: string
    created_at: string
    isTemporary: true
}

// ============================================
// STATE INTERFACES
// ============================================

interface FilesState {
    // File lists
    files: FileItem[]
    uploadingFiles: UploadingFileItem[]

    // File statuses and progress
    fileStatuses: Record<string, FileStatus>
    fileProgress: Record<string, number>
    fileErrors: Record<string, string>

    // Loading states
    isLoadingFiles: boolean
    isUploading: boolean
    removingFileIds: Set<string>
    downloadingFileIds: Set<string>
    previewingFileIds: Set<string>
}

interface FilesActions {
    // File list management
    setFiles: (files: FileItem[]) => void
    addFile: (file: FileItem) => void
    removeFileFromList: (fileId: string) => void

    // Uploading files management
    addUploadingFile: (file: UploadingFileItem) => void
    removeUploadingFile: (tempId: string) => void
    replaceUploadingFileWithReal: (tempId: string, realFile: FileItem) => void

    // File status management
    setFileStatus: (fileId: string, status: FileStatus) => void
    setFileProgress: (fileId: string, progress: number) => void
    setFileError: (fileId: string, error: string) => void
    clearFileData: (fileId: string) => void

    // Loading states
    setIsLoadingFiles: (loading: boolean) => void
    setIsUploading: (uploading: boolean) => void
    addRemovingFileId: (fileId: string) => void
    removeRemovingFileId: (fileId: string) => void
    addDownloadingFileId: (fileId: string) => void
    removeDownloadingFileId: (fileId: string) => void
    addPreviewingFileId: (fileId: string) => void
    removePreviewingFileId: (fileId: string) => void

    // File operations
    handleFileSelect: (selectedFiles: FileList) => void
    uploadFileToServer: (file: File, tempId: string) => void
    retryUpload: (fileId: string) => void
    removeFile: (fileId: string) => Promise<void>
    getFiles: (botID?: string) => void
    getFile: (fileName: string, action: "preview" | "download") => Promise<Blob | null>

    // Utilities
    formatFileSize: (bytes: number) => string
    resetFilesState: () => void
}

export type FilesSlice = FilesState & FilesActions

// ============================================
// INITIAL STATE
// ============================================

const initialState: FilesState = {
    files: [],
    uploadingFiles: [],
    fileStatuses: {},
    fileProgress: {},
    fileErrors: {},
    isLoadingFiles: false,
    isUploading: false,
    removingFileIds: new Set(),
    downloadingFileIds: new Set(),
    previewingFileIds: new Set(),
}

// ============================================
// SLICE CREATOR
// ============================================

export const createFilesSlice: StateCreator<FlowStore, [], [], FilesSlice> = (set, get) => ({
    ...initialState,

    // ============================================
    // FILE LIST MANAGEMENT
    // ============================================

    setFiles: (files) =>
        set(
            produce((state: FilesSlice) => {
                state.files = files
            }),
        ),

    addFile: (file) =>
        set(
            produce((state: FilesSlice) => {
                state.files.push(file)
            }),
        ),

    removeFileFromList: (fileId) =>
        set(
            produce((state: FilesSlice) => {
                state.files = state.files.filter((file) => file.file_name !== fileId)
            }),
        ),

    // ============================================
    // UPLOADING FILES MANAGEMENT
    // ============================================

    addUploadingFile: (file) =>
        set(
            produce((state: FilesSlice) => {
                state.uploadingFiles.unshift(file)
            }),
        ),

    removeUploadingFile: (tempId) =>
        set(
            produce((state: FilesSlice) => {
                state.uploadingFiles = state.uploadingFiles.filter((file) => file.tempId !== tempId)
                delete state.fileStatuses[tempId]
                delete state.fileProgress[tempId]
                delete state.fileErrors[tempId]
            }),
        ),

    replaceUploadingFileWithReal: (tempId, realFile) =>
        set(
            produce((state: FilesSlice) => {
                state.uploadingFiles = state.uploadingFiles.filter((file) => file.tempId !== tempId)
                state.files.unshift(realFile)
            }),
        ),

    // ============================================
    // FILE STATUS MANAGEMENT
    // ============================================

    setFileStatus: (fileId, status) =>
        set(
            produce((state: FilesSlice) => {
                state.fileStatuses[fileId] = status
            }),
        ),

    setFileProgress: (fileId, progress) =>
        set(
            produce((state: FilesSlice) => {
                state.fileProgress[fileId] = progress
            }),
        ),

    setFileError: (fileId, error) =>
        set(
            produce((state: FilesSlice) => {
                state.fileErrors[fileId] = error
            }),
        ),

    clearFileData: (fileId) =>
        set(
            produce((state: FilesSlice) => {
                delete state.fileStatuses[fileId]
                delete state.fileProgress[fileId]
                delete state.fileErrors[fileId]
            }),
        ),

    // ============================================
    // LOADING STATES
    // ============================================

    setIsLoadingFiles: (loading) =>
        set(
            produce((state: FilesSlice) => {
                state.isLoadingFiles = loading
            }),
        ),

    setIsUploading: (uploading) =>
        set(
            produce((state: FilesSlice) => {
                state.isUploading = uploading
            }),
        ),

    addRemovingFileId: (fileId) =>
        set(
            produce((state: FilesSlice) => {
                state.removingFileIds.add(fileId)
            }),
        ),

    removeRemovingFileId: (fileId) =>
        set(
            produce((state: FilesSlice) => {
                state.removingFileIds.delete(fileId)
            }),
        ),

    addDownloadingFileId: (fileId) =>
        set(
            produce((state: FilesSlice) => {
                state.downloadingFileIds.add(fileId)
            }),
        ),

    removeDownloadingFileId: (fileId) =>
        set(
            produce((state: FilesSlice) => {
                state.downloadingFileIds.delete(fileId)
            }),
        ),

    addPreviewingFileId: (fileId) =>
        set(
            produce((state: FilesSlice) => {
                state.previewingFileIds.add(fileId)
            }),
        ),

    removePreviewingFileId: (fileId) =>
        set(
            produce((state: FilesSlice) => {
                state.previewingFileIds.delete(fileId)
            }),
        ),

    // ============================================
    // UTILITIES
    // ============================================

    formatFileSize: (bytes) => {
        if (bytes === 0) return "0 MB"
        const mb = bytes / (1024 * 1024)
        return `${mb.toFixed(2)} MB`
    },

    // ============================================
    // FILE OPERATIONS
    // ============================================

    handleFileSelect: (selectedFiles) => {
        const { isUploading, formatFileSize, uploadFileToServer, addUploadingFile } = get()

        if (isUploading || selectedFiles.length === 0) return

        const file = selectedFiles[0]
        const maxFileSize = 10 * 1024 * 1024
        const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        const isFileTooLarge = file.size > maxFileSize

        const uploadingFile: UploadingFileItem = {
            tempId,
            originalFile: file,
            file_type: file.type,
            file_size: formatFileSize(file.size),
            created_at: new Date().toISOString(),
            isTemporary: true,
        }

        addUploadingFile(uploadingFile)

        set(
            produce((state: FilesSlice) => {
                state.fileProgress[tempId] = 0
                state.fileErrors[tempId] = ""

                if (isFileTooLarge) {
                    state.fileStatuses[tempId] = "error"
                    state.fileErrors[tempId] = `File size exceeds 10MB limit (${formatFileSize(file.size)})`
                } else {
                    state.fileStatuses[tempId] = "uploading"
                }
            }),
        )

        if (!isFileTooLarge) {
            uploadFileToServer(file, tempId)
        }
    },

    uploadFileToServer: async (file, tempId) => {
        const {
            setIsUploading,
            setFileProgress,
            setFileStatus,
            setFileError,
            formatFileSize,
            replaceUploadingFileWithReal,
            clearFileData,
            setShowSnackBarMessage
        } = get()

        try {
            setIsUploading(true)

            const state = get()
            const selectedBot = state.selectedBot

            const response = await fileApis.uploadFile(file, { dialogue: selectedBot?.id.toString()! }, (percent) =>
                setFileProgress(tempId, percent),
            )

            const serverFileName = response.data.filename || response.data.file_name || file.name

            const realFile: FileItem = {
                file_name: serverFileName,
                file_type: file.type,
                file_size: file.size.toString(),
                created_at: new Date().toISOString(),
            }

            replaceUploadingFileWithReal(tempId, realFile)
            setFileStatus(serverFileName, "success")
            setFileProgress(serverFileName, 100)
            clearFileData(tempId)

            setShowSnackBarMessage({
                open: true,
                message: "File Uploaded Successfully",
                color: "success",
                duration: 1500,
            })

            console.log("Upload successful:", response.data)
        } catch (error: any) {
            console.error("Upload error:", error)

            let errorMessage = "Failed to upload file"
            const state = get()

            if (error.response?.data?.err) {
                const serverError = error.response.data.err

                if (serverError.includes("already exists")) {
                    errorMessage = "File already exists on server"

                    const serverFileName = error.response.data.file_name || file.name

                    const realFile: FileItem = {
                        file_name: serverFileName,
                        file_type: file.type,
                        file_size: file.size.toString(),
                        created_at: new Date().toISOString(),
                    }

                    replaceUploadingFileWithReal(tempId, realFile)
                    setFileStatus(serverFileName, "success")
                    clearFileData(tempId)

                    state.setShowSnackBarMessage?.({
                        open: true,
                        message: "File Already Exists",
                        color: "destructive",
                        duration: 1500,
                    })
                } else if (serverError.includes("Size")) {
                    errorMessage = `File size too large (max 20MB, got ${formatFileSize(file.size)})`
                    setFileStatus(tempId, "error")

                    state.setShowSnackBarMessage?.({
                        open: true,
                        message: "File size exceeds 20MB limit",
                        color: "destructive",
                        duration: 2000,
                    })
                } else {
                    errorMessage = serverError
                    setFileStatus(tempId, "error")
                }
            } else if (error.code === "NETWORK_ERROR") {
                errorMessage = "Network connection failed"
                setFileStatus(tempId, "error")
            } else if (error.response?.status === 413) {
                errorMessage = "File size too large for server"
                setFileStatus(tempId, "error")
            } else {
                setFileStatus(tempId, "error")

                state.setShowSnackBarMessage?.({
                    open: true,
                    message: "Failed to upload file",
                    color: "destructive",
                    duration: 2000,
                })
            }

            setFileError(tempId, errorMessage)
            setFileProgress(tempId, 0)
        } finally {
            setIsUploading(false)
        }
    },

    retryUpload: (fileId) => {
        const { isUploading, fileErrors, setFileStatus, setFileProgress, setFileError } = get()

        if (isUploading) return

        if (fileErrors[fileId]?.includes("exceeds 10MB limit")) {
            return
        }

        setFileStatus(fileId, "uploading")
        setFileProgress(fileId, 0)
        setFileError(fileId, "")
    },

    removeFile: async (fileId) => {
        const { addRemovingFileId, removeRemovingFileId, removeFileFromList, clearFileData } = get()

        addRemovingFileId(fileId)

        try {
            const state = get()
            const selectedBot = state.selectedBot

            await fileApis.deleteFile({
                dialogue: selectedBot?.id.toString()!,
                filename: fileId,
            })

            removeFileFromList(fileId)
            clearFileData(fileId)

            state.setShowSnackBarMessage?.({
                open: true,
                message: "File deleted successfully",
                color: "success",
                duration: 1500,
            })
        } catch (error: any) {
            console.error("Failed to remove file:", error)

            let errorMessage = "Failed to delete file"
            const state = get()

            if (error.response?.data?.err) {
                errorMessage = error.response.data.err
            } else if (error.response?.status === 404) {
                errorMessage = "File not found"
                removeFileFromList(fileId)
                clearFileData(fileId)
            } else if (error.code === "NETWORK_ERROR") {
                errorMessage = "Network connection failed"
            }

            if (error.response?.status !== 404) {
                state.setShowSnackBarMessage?.({
                    open: true,
                    message: errorMessage,
                    color: "destructive",
                    duration: 2000,
                })
            }
        } finally {
            removeRemovingFileId(fileId)
        }
    },

    getFiles: async (botID) => {
        const state = get()
        const selectedBot = state.selectedBot

        try {
            get().setIsLoadingFiles(true)
            const result = await fileApis.listFiles(botID || selectedBot?.id!)
            const sortedFiles = result.data.files.sort((a: FileItem, b: FileItem) => {
                const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
                const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
                return dateB - dateA
            })
            get().setFiles(sortedFiles)
            get().setIsLoadingFiles(false)
        } catch (error) {
            console.log({ error })
            get().setIsLoadingFiles(false)
        }
    },

    getFile: async (fileName, action) => {
        const { addDownloadingFileId, removeDownloadingFileId, addPreviewingFileId, removePreviewingFileId } = get()

        const state = get()
        const selectedBot = state.selectedBot

        try {
            if (action === "download") {
                addDownloadingFileId(fileName)
            } else {
                addPreviewingFileId(fileName)
            }

            const response = await fileApis.getFile(selectedBot?.id!, fileName)

            return response.data
        } catch (error: any) {
            console.error(`${action} error:`, error)

            state.setShowSnackBarMessage({
                open: true,
                message: `Failed to ${action} file`,
                color: "destructive",
                duration: 2000,
            })

            return null
        } finally {
            if (action === "download") {
                removeDownloadingFileId(fileName)
            } else {
                removePreviewingFileId(fileName)
            }
        }
    },

    resetFilesState: () =>
        set(
            produce((state: FilesSlice) => {
                Object.assign(state, initialState)
                state.removingFileIds = new Set()
                state.downloadingFileIds = new Set()
                state.previewingFileIds = new Set()
            }),
        ),
})
