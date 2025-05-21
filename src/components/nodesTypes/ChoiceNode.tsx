import { Handle, Position, useNodeId } from "@xyflow/react";
import { AlertTriangle, Split } from "lucide-react";
import { useState } from "react";
import { useFlowStore } from "../../store/flow-store";
import TextOnlyTooltip from "../custom/text-tooltip";
import TooltipWrapper from "./RootNode";
type Choice = 'Keyword' | 'AI NLP' | 'Variable';

interface Entity {
    any?: boolean;
    value?: string;
    name?:string;
}

interface InnerDynamicDataHandler {
    choice: Choice;
    value?: string;
    save?: boolean;
    variableName?: string;
    entities: Entity[];
    intent?:string;
    operator?:string
}

interface DynamicDataHandler {
    innerDynamicDataHandler: InnerDynamicDataHandler[];
}

interface FormItem {
    text?: string;
}

interface FormNodeData {
    botSays?: string;
    formData: FormItem[];
    save?: boolean;
    variableName?: string;
    dynamicDataHandler: DynamicDataHandler[];
}
function checkIfAllRequiredDataIsFilled({ data }: { data?: FormNodeData }): boolean {
    let allInputsAreFilled = true;

    if (data) {
        if (!data.botSays) {
            allInputsAreFilled = false;
        }

        data.formData.forEach((item) => {
            if (!item.text) {
                allInputsAreFilled = false;
            }
        });

        if (data.save && !data.variableName) {
            allInputsAreFilled = false;
        }

        data.dynamicDataHandler.forEach((dynamicDataHandlerObj) => {
            dynamicDataHandlerObj.innerDynamicDataHandler.forEach((inner) => {
                if (inner.choice === 'Keyword') {
                    if (!inner.value || (inner.save && !inner.variableName)) {
                        allInputsAreFilled = false;
                    }
                } else if (inner.choice === 'AI NLP') {
                    inner.entities.forEach((entity) => {
                        if (!entity.any && !entity.value) {
                            allInputsAreFilled = false;
                        }
                    });
                } else if (inner.choice === 'Variable') {
                    if (!inner.value) {
                        allInputsAreFilled = false;
                    }
                }
            });
        });
    }

    return allInputsAreFilled;
}

function ChoiceNode({ data }: { data?: FormNodeData }) {
    const [isHovered, setIsHovered] = useState(false);
    const clickedElement = useFlowStore(state => state.clickedElement)
    console.log({ data });
    const id = useNodeId()
    return (
        <TooltipWrapper>
            <div data-selected={clickedElement?.id === id} className={`bg-background shadow-lg text-foreground border border-border data-[selected=true]:border-violet-400 data-[selected=true]:border-2 p-3 pb-2 px-4 rounded-xl text-center min-w-[100px] w-72 h-auto flex justify-center items-center flex-col gap-2`}>
                <h2 className="flex justify-start items-center gap-2 text-muted-foreground text-left w-full text-sm font-extrabold mb-2">
                    <div className="p-1 bg-violet-500 rounded-lg shadow-md mr-2"><Split className="text-white h-5 w-5 rotate-90" /></div>
                    Choice Prompt
                </h2>
                {!checkIfAllRequiredDataIsFilled({ data })
                    && <TextOnlyTooltip title="Please fill all inputs" placement="top">
                        <div className="shadow-red-500 absolute right-3 top-3 p-1.5 bg-red-100 rounded-full">
                        <AlertTriangle
                            className={"h-4 w-4 text-red-500"}
                        />
                        </div>
                    </TextOnlyTooltip>}

                <Handle
                    type="target"
                    id="2"
                    position={Position.Left}
                    className="hover:transform hover:w-6 hover:h-6"
                    style={{
                        background: 'hsl(243.4 75.4% 58.6%)',
                        left:0,
                        top:50,
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

                {data?.dynamicDataHandler.map((item, index) => {
                    console.log({ item });
                    return <>
                        {/* <div className="bg-accent rounded-md w-full flex flex-col flex-wrap justify-start items-start px-2 py-1 overflow-hidden break-all  h-8 mb-1">
                            <div className={`text-foreground text-sm ${message ? `text-gray-500` : `text-gray-400`} truncate`}>{message ? message : "Enter Message"}</div>
                        </div> */}
                        {/* <TextOnlyTooltip
                            key={index + 1}
                            title={'Condition ' + (index + 1)}
                            placement="top"
                        >
                            <Handle
                                id={(index + 1) + ''}
                                type="source"
                                key={index + 1}
                                position={Position.Bottom}
                                className="relative flex items-center justify-center w-4 h-4 rounded-full cursor-pointer transition-all duration-300"
                                style={{
                                    top: (74 + ((index) * 44)) + 'px',
                                    background: 'hsl(243.4 75.4% 58.6%)',
                                    borderRadius: "0",
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
                        </TextOnlyTooltip> */}
                    </>
                })}
                <Handle
                    key={0}
                    type="source"
                    position={Position.Bottom}
                    id={'0'}
                    className="relative flex items-center justify-center w-4 h-4 rounded-full cursor-pointer transition-all duration-300"
                    style={{
                        background: 'hsl(243.4 75.4% 58.6%)',
                        borderRadius: "2px",
                        width: '15px',
                        height: '5px',
                        transition: 'all 0.2s ease 0s',
                        boxShadow: isHovered
                            ? '0 0 10px rgba(140, 160, 255, 0.7), 0 0 20px rgba(140, 160, 255, 0.6), 0 0 30px rgba(140, 160, 255, 0.5), 0 0 40px rgba(140, 160, 255, 0.4)'
                            : '0 0 5px rgba(140, 160, 255, 0.7), 0 0 10px rgba(140, 160, 255, 0.5)',
                        animation: 'none',
                        border: 'none',
                    }}
                />
                {data?.formData.map((item, index) => {
                    console.log({ item });
                    const message = item.text

                    return <>
                        <div className="bg-accent rounded-md w-full flex flex-col flex-wrap justify-start items-start px-2 py-1 overflow-hidden break-all  h-8 mb-1">
                            <div className={`text-foreground text-sm ${message ? `text-gray-500` : `text-gray-400`} truncate`}>{message ? message : "Enter Message"}</div>
                        </div>

                        <Handle
                            id={(index + 1) + ''}
                            type="source"
                            key={index + 1}
                            position={Position.Right}
                            className="relative flex items-center justify-center w-4 h-4 rounded-full cursor-pointer transition-all duration-300"
                            style={{
                                top: (74 + ((index) * 44)) + 'px',
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
                    </>
                })}
            </div>
        </TooltipWrapper>
    );
}





export default ChoiceNode;
