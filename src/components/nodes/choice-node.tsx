"use client";
import { Node, Position, type NodeProps } from "@xyflow/react";
import { CheckSquare } from "lucide-react";
import { NodeHandle } from "../handles/handle";
import { BaseNode } from "./base-node";
interface Choice {
  id: string;
  label: string;
}

interface FormNodeData extends Record<string, unknown> {
  label: string;
  description: string;
  nodeType: string;
  rightSideData: {
    choices?: Choice[];
    botSays: string;
    save: boolean;
    variableName: string;
    loopFromSwitch: boolean;
    loopFromName: string;
  };
}

export function ChoiceNode(props: NodeProps<Node<FormNodeData>>) {
  const { data } = props;
  const handles = (
    <>
      {(data.rightSideData.choices || []).map((choice: any, index: number) => (
        <NodeHandle
          variant="choice"
          key={`${choice.id}`}
          type="source"
          position={Position.Right}
          id={choice.id}
          className="w-3 h-3 bg-pink-400 border-2 border-white hover:bg-pink-500 transition-colors"
          style={{ top: `${130 + index * 48}px` }}
        />
      ))}
      <div className="absolute right-0 bottom-16">
        <NodeHandle
          key={`choice-default`}
          variant="choice"
          type="source"
          position={Position.Right}
          id={`choice-default`}
          className="w-3 h-3 bg-pink-400 border-2 border-white hover:bg-pink-500 transition-colors"
        />
      </div>
    </>
  );

  const content =
    data.rightSideData.choices && data.rightSideData.choices.length > 0 ? (
      <div className="mt-4 space-y-2">
        {data.rightSideData.choices.map((choice: Choice, index: number) => (
          <div
            key={index}
            className="flex items-center text-xs bg-pink-50 rounded-lg p-3"
          >
            <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
            <span className="font-medium text-pink-700 mr-2 truncate">
              {choice.label}
            </span>
          </div>
        ))}
        {/* default choice */}
        <div className="text-xs bg-gray-50 rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
            <span className="font-medium text-gray-600 truncate">
              {"Default"}
            </span>
          </div>
        </div>
      </div>
    ) : null;
  const header = (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 truncate">
          {data.label}
        </h3>
      </div>

      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
        {data.description}
      </p>
    </div>
  );
  return (
    <BaseNode
      {...props}
      icon={CheckSquare}
      color="bg-pink-500"
      backgroundColor="bg-white border-pink-200"
      bodyWidth="w-80"
      header={header}
      handles={handles}
    >
      {/* Content */}

      {content}
    </BaseNode>
  );
}
