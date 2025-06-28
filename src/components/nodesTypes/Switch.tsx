import { Handle, Position } from "@xyflow/react";
import { AlertTriangle, GitBranch, Settings } from 'lucide-react';
import { useState } from "react";
import TextOnlyTooltip from "../custom/text-tooltip";
import TooltipWrapper from "./RootNode";
export interface SwitchCase {
    id: string
    operator: "equals" | "not_equals" | "greater_than" | "less_than" | "contains" | "starts_with" | "ends_with"
    firstOperand: string
    secondOperand: string
    checkType: "string" | "number" | "boolean" | "variable"
    label: string
}
function areOperatorsEmpty(obj: SwitchCase): boolean {
    return obj.firstOperand === "" || obj.secondOperand === "";
}

const SwitchNode = ({ data }: {
    data: {
        label: string
        description: string
        // Switch-specific data
        rightSideData: {
            cases: SwitchCase[]
            defaultCase?: {
                id: string
                label: string
            }
        }
    }
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const getConditionPreview = (condition: string) => {
        if (condition.length > 25) {
            return condition.substring(0, 25) + '...';
        }
        return condition;
    };
    const cases = data.rightSideData.cases
    return (
        <TooltipWrapper>

            <div className="bg-white dark:bg-zinc-900 border-2 border-slate-300 dark:border-zinc-700 rounded-xl shadow-2xl min-w-72 max-w-80">
                {/* Input Handle */}
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

                <div className="bg-gradient-to-r from-violet-400 to-violet-800 text-white p-4 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <GitBranch className="w-5 h-5" />
                            <span className="font-bold text-lg">Switch</span>
                        </div>
                        <Settings className="w-4 h-4 opacity-75" />
                    </div>
                </div>

                <div className="p-3 space-y-2">
                    {cases.map((caseItem: SwitchCase, index: number) => {
                        const isEmpty = areOperatorsEmpty(caseItem);
                        return (
                            <div key={index} className="relative group">
                                <Handle
                                    type="source"
                                    position={Position.Right}
                                    id={(index + 1) + ''}
                                    // isConnectable={isConnectable}
                                    className="w-3 h-3 bg-violet-500 border-2 border-white shadow-sm  group-hover:opacity-100 transition-opacity"
                                    style={{
                                        top: '50%',
                                        right: "-6%",
                                        transform: 'translateY(-50%)',
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
                                    onMouseLeave={() => setIsHovered(false)}

                                />


                                <div className="bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg p-3 pr-6 transition-all duration-200 hover:shadow-sm">
                                    <div className="flex items-start justify-between mb-1">
                                        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
                                            Case {index + 1}
                                            {isEmpty && (
                                                <TextOnlyTooltip title="Please fill all inputs" placement="top">
                                                    <AlertTriangle className={"ml-2 h-3 w-3 text-red-500 inline-flex"} />
                                                </TextOnlyTooltip>
                                            )}
                                        </span>
                                    </div>

                                    {isEmpty ? (
                                        <div className="text-sm text-red-600 bg-red-100 dark:bg-red-950 px-2 py-1 rounded border border-red-200 dark:border-red-800 italic">
                                            Click to set condition
                                        </div>
                                    ) : (
                                        <div className="text-sm text-slate-700 dark:text-slate-200 font-mono bg-white dark:bg-zinc-900 px-2 py-1 rounded border border-slate-200 dark:border-zinc-700">
                                            {getConditionPreview(`${caseItem.firstOperand} ${caseItem.operator} ${caseItem.secondOperand}`)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                    {/* Default case */}
                    <div className="relative group mt-3">
                        <Handle
                            type="source"
                            position={Position.Right}
                            id={"0"}
                            // isConnectable={isConnectable}
                            className="w-3 h-3 bg-violet-500 border-2 border-white shadow-sm  group-hover:opacity-100 transition-opacity"
                            style={{
                                top: '50%',
                                right: "-6%",
                                transform: 'translateY(-50%)',
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
                            onMouseLeave={() => setIsHovered(false)}

                        />

                        <div className="bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg p-3 pr-6">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                                    Default
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    (fallback)
                                </span>
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">
                                No conditions matched
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-700 px-4 py-2 rounded-b-xl">
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                        <span>{cases.length} condition{cases.length !== 1 ? 's' : ''}</span>
                        <span className="opacity-75">+ 1 default</span>
                    </div>
                </div>
            </div>
        </TooltipWrapper>
    );
};

export default SwitchNode;