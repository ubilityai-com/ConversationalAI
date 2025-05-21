import { Handle, Position } from "@xyflow/react";
import { AlertTriangle, GitBranch, Settings } from 'lucide-react';
import { useState } from "react";
import { ApiResItem, objToReturnDynamic } from "../../lib/utils";
import TextOnlyTooltip from "../custom/text-tooltip";
interface OperatorObject {
    operator_type: string;
    first_operator: string;
    operation: string;
    second_operator: string;
}

function areOperatorsEmpty(obj: OperatorObject): boolean {
    return obj.first_operator === "" || obj.second_operator === "";
}

const SwitchNode = ({ data }: { data: { json: ApiResItem[] } }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Sample data - this would come from your dialog
    // const cases = [
    //     { id: 1, condition: 'age > 18', label: 'Adult' },
    //     { id: 2, condition: '', label: 'Premium User' }, // Empty condition for demo
    //     { id: 3, condition: 'There is ana ashjdsahjb >= 80', label: 'High Score' }
    // ];

    const getConditionPreview = (condition: string) => {
        if (condition.length > 25) {
            return condition.substring(0, 25) + '...';
        }
        return condition;
    };
    console.log({ data, cases: objToReturnDynamic(data.json) });
    const cases = objToReturnDynamic(data.json)?.conditions
    return (
        <div className="bg-white border-2 border-slate-300 rounded-xl shadow-lg min-w-72 max-w-80">
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
            {/* Input Handle */}


            {/* Header */}
            <div className="bg-gradient-to-r from-violet-400 to-violet-800 text-white p-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GitBranch className="w-5 h-5" />
                        <span className="font-bold text-lg">Switch</span>
                    </div>
                    <Settings className="w-4 h-4 opacity-75" />
                </div>
            </div>

            {/* Cases Display */}
            <div className="p-3 space-y-2">
                {cases.map((caseItem: OperatorObject, index: number) => {
                    const isEmpty = areOperatorsEmpty(caseItem);

                    return (
                        <div key={index} className="relative group">
                            {/* Output Handle for each case */}
                            <Handle
                                type="source"
                                position={Position.Right}
                                id={(index + 1) + ''}
                                // isConnectable={isConnectable}
                                className="w-3 h-3 bg-violet-500 border-2 border-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    top: '50%',
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

                            <div className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg p-3 pr-6 transition-all duration-200 hover:shadow-sm">
                                <div className="flex items-start justify-between mb-1">
                                    <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">
                                        Case {index + 1}
                                        {isEmpty && (
                                            <TextOnlyTooltip title="Please fill all inputs" placement="top">
                                                <AlertTriangle
                                                    className={"ml-2 h-3 w-3 text-red-500 inline-flex"}
                                                />
                                            </TextOnlyTooltip>
                                        )}
                                    </span>
                                    {/* {caseItem.label && (
                                        <span className="text-xs text-slate-500 font-medium">
                                            {caseItem.label}
                                        </span>
                                    )} */}
                                </div>

                                {isEmpty ? (
                                    <div className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded border border-red-200 italic">
                                        Click to set condition
                                    </div>
                                ) : (
                                    <div className="text-sm text-slate-700 font-mono bg-white px-2 py-1 rounded border">
                                        {getConditionPreview(`${caseItem.first_operator} ${caseItem.operation} ${caseItem.second_operator}`)}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}

                {/* Default Case */}
                <div className="relative group mt-3">
                    <Handle
                        type="source"
                        position={Position.Right}
                        id={'0'}
                        // isConnectable={isConnectable}
                        className="w-3 h-3 bg-slate-400 border-2 border-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                            top: '50%',
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
                    />

                    <div className="bg-slate-100 border border-slate-300 rounded-lg p-3 pr-6">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                Default
                            </span>
                            <span className="text-xs text-slate-500">
                                (fallback)
                            </span>
                        </div>
                        <div className="text-sm text-slate-600 mt-1 italic">
                            No conditions matched
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer with case count */}
            <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 rounded-b-xl">
                <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>{cases.length} condition{cases.length !== 1 ? 's' : ''}</span>
                    <span className="opacity-75">+ 1 default</span>
                </div>
            </div>
        </div>
    );
};

export default SwitchNode;