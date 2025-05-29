// GreenNode.tsx

import { Handle, Position, useNodeId } from "@xyflow/react";
import { AlertTriangle, Workflow } from "lucide-react";
import { useState } from "react";
import { useFlowStore } from "../../store/flow-store";
import TextOnlyTooltip from "../custom/text-tooltip";
import TooltipWrapper from "./RootNode";
interface RpaVariable {
    [key: string]: any;
    asVariable?: boolean;
    userReply?: boolean;
}

interface Props {
    data: {
        rpaVariables?: RpaVariable[];
        label: string
    };
}

function checkIfAllRequiredDataIsFilled(props: Props): boolean {
    let allInputsAreFilled: boolean = true;

    if (props.data && props.data.rpaVariables) {
        props.data.rpaVariables.forEach((rpaVar: RpaVariable) => {
            const key: string = Object.keys(rpaVar)[0];
            const value = rpaVar[key];

            if (rpaVar.asVariable || rpaVar.userReply) {
                return; // Skip to the next iteration
            }
            if (!value) {
                allInputsAreFilled = false;
            }
        });
    }

    return allInputsAreFilled;
}

function RPANode({ data }: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const clickedElement = useFlowStore(state => state.clickedElement)
    console.log({ data });
    const id = useNodeId()
    return (
        <TooltipWrapper>
            <div
                data-selected={clickedElement?.id === id}
                className={`bg-background shadow-lg text-foreground border border-border data-[selected=true]:border-violet-400 data-[selected=true]:border-2 py-3 px-2 box-content rounded-xl text-center min-w-[155px] max-w-44 h-auto flex justify-center items-center gap-2`}>
                {/* Inner content */}
                <div className="bg-background rounded-2xl flex items-center justify-center gap-3 relative overflow-hidden w-full">

                    {/* Background decoration */}
                    <div className="absolute inset-0  opacity-60" />

                    {/* Chain Icon */}
                    <div className="relative z-10 p-2 bg-gradient-to-br from-indigo-500 to-purple-600 
                          rounded-xl shadow-md">
                        <Workflow className="w-4 h-4 text-white" />
                    </div>

                    {/* Node Label */}
                    <div className="relative z-10">
                        <div className="text-foreground font-semibold text-sm">Workflow</div>
                        <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-purple-600 text-xs font-medium">{data.label}</span>
                        </div>
                    </div>
                </div>

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

                {!checkIfAllRequiredDataIsFilled({ data }) &&
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
        </TooltipWrapper >
    );
}





export default RPANode;
