// GreenNode.tsx

import { Handle, NodeProps, Position } from "@xyflow/react";
import { PlayIcon } from "lucide-react";

function StartNode({ data }: NodeProps) {
  return (
    <div className="bg-green-500 text-white p-4 rounded-2xl text-center min-w-[100px] flex justify-center items-center gap-2">
        <PlayIcon className="h-6 w-6"/> 
        <span>Start</span>
        <Handle
        type="source"
        style={{width:"20px",height:"20px",background:"grey"}}
        position={Position.Right}
        className="w-3 h-3 bg-white rounded-full hover:shadow-[0_0_8px_3px_rgba(0,255,0,0.7),0_0_15px_10px_rgba(0,255,0,0.6)]"
      />      
      <div></div>
    </div>
  );
}

export default StartNode;
