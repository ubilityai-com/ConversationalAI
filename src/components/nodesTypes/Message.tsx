// GreenNode.tsx

import { Handle, Position } from "@xyflow/react";
import { AlertTriangle, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useFlowStore } from "../../store/flow-store";
import TextOnlyTooltip from "../custom/text-tooltip";
import TooltipWrapper from "./RootNode";
import { removeHTMLTags } from "../../lib/utils";


interface Data {
  rightSideData: {
    botSays?: string;
    advanced?: boolean;
    regex?: boolean;
    errorMessage?: string;
    save?: boolean;
    variableName?: string;
  }
}

export type MessageRightSideData = {
  botSays?: string
  advanced?: boolean
  regex?: boolean
  errorMessage?: string
  save?: boolean
  variableName?: string
}

function MessageNode({ data, id }: { data: Data, id: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const clickedElement = useFlowStore(state => state.clickedElement)
  const valid = useFlowStore(state => state.nodesValidation[id])

  console.log({ data });
  const message = removeHTMLTags(data.rightSideData.botSays as string)
  return (
    <TooltipWrapper>
      <div data-selected={clickedElement?.id === id} className={`bg-background shadow-lg text-foreground border border-border data-[selected=true]:border-violet-400 data-[selected=true]:border-2 p-3 pb-0 px-4 rounded-xl text-center min-w-[100px] w-72 h-auto flex justify-center items-center flex-col gap-2`}>
        <h2 className="flex justify-start items-center gap-2 text-muted-foreground text-left w-full text-sm font-extrabold mb-2">
          <div className="p-1 bg-violet-500 rounded-lg shadow-md mr-2"><MessageSquare className="text-white h-5 w-5" /></div>
          Message
        </h2>

        <Handle
          type="target"
          id={null}
          position={Position.Left}
          style={{
            background: 'hsl(243.4 75.4% 58.6%)',
            borderRadius: "2px",
            width: '5px',
            height: '15px',
            transition: 'all 0.2s ease 0s',
            boxShadow: isHovered
              ? '0 0 10px rgba(140, 160, 255, 0.7), 0 0 20px rgba(140, 160, 255, 0.6), 0 0 30px rgba(140, 160, 255, 0.5), 0 0 40px rgba(140, 160, 255, 0.4)'
              : '0 0 5px rgba(140, 160, 255, 0.7), 0 0 10px rgba(140, 160, 255, 0.5)',
            animation: 'none',
            border: 'none',
          }}


          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)} />
        <div className="bg-accent rounded-md w-full flex flex-col flex-wrap justify-start items-start px-2 py-1 overflow-hidden break-all  min-h-8 mb-1">
          <div className={`overflow-hidden break-words max-h-[500px] [display:-webkit-box] [white-space:normal] [text-overflow:ellipsis] [-webkit-line-clamp:100] [-webkit-box-orient:vertical] text-foreground text-sm ${message ? `text-gray-500` : `text-gray-400`} text-ellipsis truncate`}>{message ? message : "Enter Message"}</div>
        </div>
        {!valid &&
          <TextOnlyTooltip title="Please fill all inputs" placement="top">
            <AlertTriangle
              className={"h-4 w-4 text-red-500 absolute right-3 top-3"}
            />
          </TextOnlyTooltip>}
        <Handle
          id={"0"}
          type="source"
          position={Position.Right}
          className="relative flex items-center justify-center w-4 h-4 rounded-full cursor-pointer transition-all duration-300"
          style={{
            background: 'hsl(243.4 75.4% 58.6%)',
            borderRadius: "2px",
            width: '5px',
            height: '15px',
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
    </TooltipWrapper>
  );
}





export default MessageNode;
