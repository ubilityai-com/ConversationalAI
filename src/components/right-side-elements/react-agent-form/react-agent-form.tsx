import { Node, NodeProps } from "@xyflow/react";
import { useState } from "react";
import { ReactAgentJson } from "../../../elements/langchain-elements/ReactAgentJson";
import { useDebounceConfig } from "../../../hooks/use-debounced-config";
import { extractCreds, getNextNodeId, stringifyAndExtractVariables } from "../../../lib/utils";
import { useFlowStore } from "../../../store/flow-store";
import { useRightDrawerStore } from "../../../store/right-drawer-store";
import AutomationSimple from "../../custom/automation-v4";
import { DynamicElementLoader } from "../../properties/shared/DynamicElementLoader";
function isExtrasValid(extras:any, values:Record<string, boolean>) {
    for (const key in extras) {
      const item = extras[key];
  
      if (!item.enabled) continue;
  
      const isRequired = !item.optional;
  
      if (!isRequired) continue;
  
      if (item.multiple) {
        const list = item.list || [];
        for (const subItem of list) {
          const id = subItem.id;
          if (!values[id]) {
            return false;
          }
        }
      } else {
        if (!values[key]) {
          return false;
        }
      }
    }
  
    return true;
  }
  
interface LLMConfigProps extends Record<string, any> {
    label: string;
    description: string;
    rightSideData: Record<string, any>;
}
interface LlmFormProps {
    selectedNode: NodeProps<Node<LLMConfigProps>>;
    handleRightSideDataUpdate: (value: any) => void;
}

export function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData
    const model = rightSideData.extras.model
    const memory = rightSideData.extras.memory
    const tool = rightSideData.extras.tool
    const { edges, nodes } = params
    const content = {
        type: "data",
        data: {
            inputs: { query: rightSideData.json.query },
            model: require("../../properties/contents/model")[model.type](selectedNode),
            chainMemory: require("../../properties/contents/memory")[memory.type](selectedNode),
            cred: extractCreds(selectedNode?.data.rightSideData.extras),
            paramsTools: tool.list.map((el: any) => {
                return require("../../properties/contents/tool")[el.type](el.content)
            })
        }
    }
    return {
        cred: extractCreds(selectedNode?.data.rightSideData.extras),
        type: "LC_REACT_AGENT",
        content: content,
        saveUserInputAs: rightSideData.save ? rightSideData.variableName : null,
        next: getNextNodeId(selectedNode.id, edges, nodes, null),
        usedVariables: stringifyAndExtractVariables(content)
    };
}

export default function ReactAgentForm({
    selectedNode,
    handleRightSideDataUpdate,
}: LlmFormProps) {
    const [schema, setSchema] = useState<any[]>(ReactAgentJson.rightSideData.json
    );
    const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)

    console.log({ selectedNode });

    const { localConfig, updateNestedConfig } =
        useDebounceConfig<LLMConfigProps["rightSideData"]>(
            selectedNode.data.rightSideData,
            {
                delay: 300,
                onSave: (savedConfig) => {
                    // Save label changes
                    const st = useRightDrawerStore.getState()
                    
                    const nodeValid = useRightDrawerStore.getState().automation.validation[selectedNode.id].json
                    const subNodesValidation = useFlowStore.getState().subNodesValidation
                    const subsValid = subNodesValidation[selectedNode.id]?.valid
                    const subs= subNodesValidation[selectedNode.id]?.subs

                    console.log({ st ,vvv:isExtrasValid(savedConfig.extras,subs)});
                    console.log({ nodeValid, subNodesValidation, subsValid });

                    updateNodesValidationById(selectedNode.id, nodeValid && subsValid)
                    handleRightSideDataUpdate(savedConfig);
                },
            }
        );
    const extras = localConfig.extras || {}
    console.log({ extras });

    return (
        <div className="space-y-6">
            <AutomationSimple
                filledDataName="json"
                schema={schema}
                firstCall
                fieldValues={localConfig.json}
                setSchema={setSchema}
                flowZoneSelectedId={selectedNode.id}
                onFieldChange={({ path, value }) => {
                    console.log({ path, value });
                    updateNestedConfig(`${"json"}.${path}`, value)

                }}
            />
            {Object.keys(extras).map(key => (
                <DynamicElementLoader
                    key={key}
                    extrasKey={key}
                    extrasConfig={extras[key]}
                    localConfig={localConfig.extras[key]}
                    selectedNodeId={selectedNode.id}
                    updateNestedConfig={updateNestedConfig}
                />
            ))}
        </div>
    );
}
