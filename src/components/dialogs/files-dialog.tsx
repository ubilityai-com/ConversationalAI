import { useEffect } from "react";
import { useFilesStore } from "../../store/files-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FileUploadContainer } from "./files-dialog/file-upload-container";

interface FilesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FilesDialog({ open, onOpenChange }: FilesDialogProps) {
  const getFiles = useFilesStore((state) => state.getFiles);
  useEffect(() => {
    getFiles();
  }, []);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Upload Files</span>
          </DialogTitle>
        </DialogHeader>
        <FileUploadContainer />
      </DialogContent>
    </Dialog>
  );
}
