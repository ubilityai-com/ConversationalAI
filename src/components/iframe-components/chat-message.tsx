import { Download, File } from "lucide-react";
import { cn } from "../../lib/utils";
import { useChatStore, type Message } from "../../store/chat-store";
import { Button } from "../ui/button";
import { useCallback } from "react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const { sendMessage, addMessage } = useChatStore();

  const handleDownload = useCallback((file: { url: string; name: string }) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleDownloadBinary = useCallback((attachment: any) => {
    const { file_name, content_type, data_base64 } = attachment.data;
    const byteArray = Uint8Array.from(atob(data_base64), char => char.charCodeAt(0));
    const blob = new Blob([byteArray], { type: content_type });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file_name;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  const renderFilePreview = (file: { type?: string; name: string; }, isImage: boolean, base64Data?: string, contentType?: string, url?: string) => {

    if (isImage) {
      const src = base64Data
        ? `data:${contentType};base64,${base64Data}`
        : url || "/placeholder.svg";
      return <img src={src} alt={file.name} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded" />;
    }
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
        <File className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
      </div>
    );
  };

  return (
    <div className={cn("flex p-3 sm:p-3", isUser ? "justify-end" : "justify-start")}>
      <div className="max-w-[85%] sm:max-w-[75%] space-y-2">
        {/* Message content */}
        {message?.content && (
          <div
            className={cn(
              "px-4 py-3 rounded-2xl",
              isUser
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-100 text-gray-900"
            )}
          >
            <div className="flex items-center">
              <div
                className="prose prose-sm sm:prose-base leading-relaxed break-words max-w-none"
                dangerouslySetInnerHTML={{ __html: message.content }}
              />
              {message.isStreaming && (
                <span className="inline-block w-0.5 h-4 bg-current ml-1 animate-pulse" />
              )}
            </div>
          </div>
        )}


        {/* Multiple choice options */}
        {message.multipleChoice && message.multipleChoice?.length > 0 && (
          <div className="grid gap-2">
            {message.multipleChoice.map((choice: string) => (
              <Button
                key={choice}
                variant="outline"
                size="sm"
                onClick={() => {
                  addMessage(choice, "user");
                  sendMessage(choice);
                }}
                className="justify-start text-left h-auto py-2 px-3 hover:bg-blue-50 hover:border-blue-200 transition-colors font-normal"
              >
                {choice}
              </Button>
            ))}
          </div>
        )}

        {/* Single binary file attachment */}
        {message.attachments?.type === "file" && message.attachments.data && (
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0">
              {renderFilePreview(
                { name: message.attachments.data.file_name },
                /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(message.attachments.data?.file_name || ""),
                message.attachments.data.data_base64,
                message.attachments.data.content_type
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-xs sm:text-sm truncate text-gray-900">
                {message.attachments.data.file_name}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownloadBinary(message.attachments)}
              className="flex-shrink-0 hover:bg-gray-100 h-8 w-8 sm:h-9 sm:w-9 p-0"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        )}

        {/* Multiple file attachments */}
        {Array.isArray(message.attachments) && message.attachments.length > 0 && (
          <div className="space-y-2">
            {message.attachments.map((attachment: any) => (
              <div
                key={attachment.id}
                className={cn(
                  "flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border border-gray-200 rounded-lg transition-colors",
                  isUser ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-50"
                )}
              >
                <div className="flex-shrink-0">
                  {renderFilePreview(attachment.file, attachment.file.type.startsWith("image/"), undefined, undefined, attachment.url)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn("font-medium text-xs sm:text-sm truncate", isUser ? "text-white" : "text-gray-900")}>
                    {attachment.file.name}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload({ url: attachment.url, name: attachment.file.name })}
                  className="flex-shrink-0 hover:bg-gray-100 h-8 w-8 sm:h-9 sm:w-9 p-0"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
