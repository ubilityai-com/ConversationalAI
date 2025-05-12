// GreenNode.tsx

import { Handle, NodeProps, Position } from "@xyflow/react";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
function NeonCircle() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative flex items-center justify-center w-4 h-4 rounded-full cursor-pointer transition-all duration-300"
        style={{
          border: isHovered ? '1px solid #005fff' : '0.5px solid #005fff',
          boxShadow: isHovered
            ? '0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.4)'
            : '0 0 5px rgba(0, 255, 255, 0.7), 0 0 10px rgba(0, 255, 255, 0.5)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Removed text since circle is too small for text */}
      </div>
    </div>
  );
}
function removeHTMLTags(htmlCode: string) {
  const withoutHTMLTags = htmlCode.replace(/<[^>]*>/g, '');
  return withoutHTMLTags.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
function MessageNode({ data }: NodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  console.log({ data });
  const message = removeHTMLTags(data.botSays as string)
  return (
    <div className="bg-background shadow-lg text-foreground border border-border p-3 pb-0 px-4 rounded-xl text-center min-w-[100px] w-72 h-auto flex justify-center items-center flex-col gap-2">
      <h2 className="flex justify-start items-center gap-2 text-muted-foreground text-left w-full text-xs font-extrabold">
        <MessageSquare />
        Message</h2>

      <Handle
        type="target"
        id="2"
        position={Position.Left}
        style={{
          background: 'hsl(243.4 75.4% 58.6%)',
          width: '10px',
          height: '10px',
          transition: 'all 0.2s ease 0s',
          boxShadow: isHovered
            ? '0 0 10px rgba(140, 160, 255, 0.7), 0 0 20px rgba(140, 160, 255, 0.6), 0 0 30px rgba(140, 160, 255, 0.5), 0 0 40px rgba(140, 160, 255, 0.4)'
            : '0 0 5px rgba(140, 160, 255, 0.7), 0 0 10px rgba(140, 160, 255, 0.5)',
          animation: 'none',
          border: 'none',
        }}


        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} />
      <div className="bg-accent p-1 rounded-md w-full flex flex-col flex-wrap justify-start items-start px-2 overflow-hidden break-all h-auto">
        <div className={`overflow-hidden break-words max-h-[500px] [display:-webkit-box] [white-space:normal] [text-overflow:ellipsis] [-webkit-line-clamp:100] [-webkit-box-orient:vertical] text-foreground text-sm ${message ? `text-gray-500` : `text-gray-400`} text-ellipsis truncate`}>{message ? message : "Enter Message"}</div>
      </div>
      <Handle
        id={"1"}
        type="source"
        position={Position.Right}
        className="relative flex items-center justify-center w-4 h-4 rounded-full cursor-pointer transition-all duration-300"
        style={{
          background: 'hsl(243.4 75.4% 58.6%)',
          width: '10px',
          height: '10px',
          transition: 'all 0.2s ease 0s',
          boxShadow: isHovered
            ? '0 0 10px rgba(140, 160, 255, 0.7), 0 0 20px rgba(140, 160, 255, 0.6), 0 0 30px rgba(140, 160, 255, 0.5), 0 0 40px rgba(140, 160, 255, 0.4)'
            : '0 0 5px rgba(140, 160, 255, 0.7), 0 0 10px rgba(140, 160, 255, 0.5)',
          animation: 'none',
          border: 'none',
        }}

        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} />
      <div></div>
    </div>
  );
}

export default MessageNode;
