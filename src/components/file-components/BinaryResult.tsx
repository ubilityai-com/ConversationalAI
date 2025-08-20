import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { pathExistsInOutputVariables } from "../../lib/variable-utils";
import { useFilesStore } from "../../store/files-store";
import { useFlowStore } from "../../store/flow-store";

interface ResultOptionsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ResultOptions: React.FC<ResultOptionsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = ["Json", "Binary"];

  return (
    <div
      className={`flex justify-end my-4`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-2 py-1 text-white cursor-pointer ${activeTab === tab ? "bg-sky-400" : "bg-gray-700"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// -------------------------------

interface FileProps {
  name: string;
  extension: string;
  displayName: string;
}

interface BinaryResultProps {
  file: FileProps;
  runResult: any;
}

const BinaryResult: React.FC<BinaryResultProps> = ({ file, runResult }) => {
  const { name, extension, displayName } = file;

  const [viewingFile, setViewingFile] = useState<any>(null);
  const [isLoadingView, setIsLoadingView] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const { getFile } = useFilesStore()
  const { setFormDialogStatus, setIsFormDialogOpen, setDialogProps, setShowSnackBarMessage, clickedElement, outputVariables } = useFlowStore()

  const getMimeType = (ext: string): string => {
    switch (ext.toLowerCase()) {
      case "pdf":
        return "application/pdf";
      case "png":
        return "image/png";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "gif":
        return "image/gif";
      case "txt":
        return "text/plain";
      case "mp3":
        return "audio/mpeg";
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      case "pptx":
        return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      default:
        return "application/octet-stream";
    }
  };

  const renderPreview = () => {
    switch (extension.toLowerCase()) {
      case "pdf":
        return (
          <iframe
            src={viewingFile?.url}
            title="PDF Preview"
            className="w-full h-[500px] border-none"
          />
        );
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return (
          <img
            src={viewingFile?.url}
            alt="File Preview"
            className="max-w-full h-auto rounded-lg"
          />
        );
      case "txt":
        return (
          <iframe
            src={viewingFile?.url}
            title="Text Preview"
            className="w-full h-[500px] border-none"
          />
        );
      case "mp3":
      case "ogg":
        return (
          <audio
            controls
            className="w-[90%] rounded-lg bg-gray-900 p-4 mt-4"
          >
            <source src={viewingFile?.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      default:
        return <p>Preview not supported for .{extension}. Please download to view.</p>;
    }
  };
  console.log({ file, runResult });

  const handlePreview = async () => {

    if (viewingFile) setViewingFile(null)
    else {
      setIsLoadingView(true)
      try {
        const blob = await getFile(name, "preview");
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
          setViewingFile({ url: blobUrl })
          setIsLoadingView(false)
        }
      } catch (err) {
        setIsLoadingView(false)
        setViewingFile(null)
        console.error('Error viewing file:', err);
      }
    }

  };

  const handleDownloadFile = async () => {
    setIsLoadingDownload(true);
    try {
      const blob = await getFile(name, "download");
      if (blob) {
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = name;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(blobUrl);
      }
      setIsLoadingDownload(false);
    } catch (err) {
      setIsLoadingDownload(false);
      console.error("Error downloading file:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (viewingFile?.url) {
        URL.revokeObjectURL(viewingFile.url);
      }
    };
  }, [viewingFile]);
  const handleCreateVariable = (copyEvent: any) => {
    console.log({ copyEvent });

    if (copyEvent.name !== false) {
      let copiedPath = reformatPathArray(copyEvent.namespace);

      let isCopiedPathAlreadyExists =
        pathExistsInOutputVariables(
          copiedPath,
          clickedElement.id,
          outputVariables
        );
      if (isCopiedPathAlreadyExists) {

        setShowSnackBarMessage({
          color: "destructive",
          duration: 1000,
          open: true,
          message:
            "Path already assigned to ${" + isCopiedPathAlreadyExists + "}",
        })
      } else {
        setFormDialogStatus("createOutputVariable")
        setIsFormDialogOpen(true)
        setDialogProps({ path: copiedPath })
      }
    }
  };
  const reformatPathArray = (pathArray: any[]) => {
    return pathArray.join(".")
  };
  return (
    <div className="bg-[#2a2d3e] text-gray-100 p-4 rounded-xl shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-sky-400 font-semibold">📄 File Details</h3>
        <span
          className="cursor-pointer text-white bg-sky-400 px-3 py-1 rounded text-sm font-medium hover:bg-sky-500 transition-colors"
          onClick={(
          ) => {
            handleCreateVariable({
              name: "file_name",
              namespace: ["file_name"]
            })
          }}
        >
          use as variable
        </span>
      </div>


      <div className="h-px w-full bg-sky-400/25 my-4"></div>

      <p className="my-1">
        <strong>📁 File Name:</strong> {displayName}
      </p>
      <p className="my-1">
        <strong>🧩 Extension:</strong> {extension}
      </p>
      <p className="my-1">
        <strong>🗂 Type:</strong> {getMimeType(extension)}
      </p>

      <div className="flex gap-3 mt-5">
        <button
          disabled={isLoadingView}
          onClick={handlePreview}
          className={`px-4 py-2 rounded text-white font-medium transition ${viewingFile ? "bg-red-500" : "bg-blue-500"
            }`}
        >
          {isLoadingView ? "Loading..." : viewingFile ? "Back" : "🔍 View"}
        </button>

        <button
          onClick={handleDownloadFile}
          className="px-4 py-2 rounded text-white font-medium transition bg-pink-500/80 flex items-center gap-2"
        >
          {!isLoadingDownload && <Download />}
          {isLoadingDownload ? "Loading..." : "Download"}
        </button>
      </div>

      {viewingFile && !isLoadingView && (
        <div className="mt-6 border border-sky-400/30 p-4 rounded-lg bg-[#1c1f2b] shadow-inner">
          {renderPreview()}
        </div>
      )}
    </div>
  );
};

export default BinaryResult;
