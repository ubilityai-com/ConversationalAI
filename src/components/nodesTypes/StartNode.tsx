// GreenNode.tsx

import { Handle, NodeProps, Position } from "@xyflow/react";
import { PlayIcon } from "lucide-react";

function StartNode({ data }: NodeProps) {
  return (
    <div className="bg-[#387642] text-white py-3 px-6 h-11 rounded-full text-center min-w-[120px] flex justify-center items-center text-sm">
      <PlayIcon className="h-4 w-4 mr-3" />
      <span className="font-semibold">Start</span>
      <Handle
        id={"0"}
        type="source"
        style={{ width: "15px", height: "15px", background: "grey" }}
        position={Position.Right}
        className="w-3 h-3 bg-white rounded-full hover:shadow-[0_0_8px_3px_rgba(0,255,0,0.7),0_0_15px_10px_rgba(0,255,0,0.6)]"
      />
      <div></div>
    </div>
  );
}

export default StartNode;
