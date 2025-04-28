// GreenNode.tsx

import { Handle, NodeProps, Position } from "@xyflow/react";
import { PlayIcon } from "lucide-react";

function MessageNode({ data }: NodeProps) {
  return (
    <div className="bg-gray-300 text-white p-2 rounded-2xl text-center min-w-[100px] w-72 h-36 flex justify-center items-center flex-col gap-2">
        <h2 className="flex justify-start">Message</h2>
        <div className="bg-background w-full h-full border rounded-xl shadow-sm">

        </div>
        <Handle
        type="target"
        id="2"
        style={{width:"15px",height:"15px",background:"grey"}}
        position={Position.Left}
        className="w-3 h-3 bg-white rounded-full hover:shadow-[0_0_8px_3px_rgba(0,255,0,0.7),0_0_15px_10px_rgba(0,255,0,0.6)]"
      />      
        <div className="bg-background rounded-xl"></div>
        <Handle
        id={"1"}
        type="source"
        style={{width:"15px",height:"15px",background:"grey"}}
        position={Position.Right}
        className="w-3 h-3 bg-white rounded-full hover:shadow-[0_0_8px_3px_rgba(0,255,0,0.7),0_0_15px_10px_rgba(0,255,0,0.6)]"
      />      
      <div></div>
    </div>
  );
}

export default MessageNode;
