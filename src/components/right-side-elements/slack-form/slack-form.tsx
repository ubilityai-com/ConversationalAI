import { Node, NodeProps } from "@xyflow/react";
import { useEffect, useState } from "react";
import { SlackJson } from "../../../elements/regular-elements/SlackJson";
import { useDebounceConfig } from "../../../hooks/use-debounced-config";
import { extractCreds, getNextNodeId, stringifyAndExtractVariables } from "../../../lib/utils";
import { useFlowStore } from "../../../store/flow-store";
import { useRightDrawerStore } from "../../../store/right-drawer-store";
import AutomationSimple from "../../custom/automation-v4";
import { objToReturnDefaultValues, objToReturnDynamicv2, objToReturnValuesToSend } from "../../../lib/automation-utils";

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
    const { edges, nodes } = params
    console.log({ rightSideData });

    const content = {
        // type: "data",
        // data: {
        //     inputs: { query: rightSideData.json.query },
        //     model: require("../../properties/contents/model")[model.type](selectedNode),
        //     chainMemory: require("../../properties/contents/memory")[memory.type](selectedNode),
        //     cred: extractCreds(selectedNode?.data.rightSideData.extras),
        //     paramsTools: tool.list.map((el: any) => {
        //         return require("../../properties/contents/tool")[el.type](el.content)
        //     })
        // }
    }
    return {
        // cred: extractCreds(selectedNode?.data.rightSideData.extras),
        // type: "LC_REACT_AGENT",
        // content: content,
        // saveUserInputAs: rightSideData.save ? rightSideData.variableName : null,
        // next: getNextNodeId(selectedNode.id, edges, nodes, null),
        // usedVariables: stringifyAndExtractVariables(content)
    };
}

export default function SlackForm({
    selectedNode,
    handleRightSideDataUpdate,
}: LlmFormProps) {
    const [schema, setSchema] = useState<any[]>(SlackJson.defaults.json);
    const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)

    const { localConfig, updateNestedConfig, setLocalConfig } =
        useDebounceConfig<LLMConfigProps["rightSideData"]>(
            { ...selectedNode.data.rightSideData, json: objToReturnDefaultValues(schema, selectedNode.data.rightSideData.json) },
            {
                delay: 300,
                onSave: (savedConfig) => {
                    // Save label changes   
                    const nodeValid = useRightDrawerStore.getState().automation.validation[selectedNode.id].json
                    updateNodesValidationById(selectedNode.id, nodeValid)
                    handleRightSideDataUpdate({ ...savedConfig, json: objToReturnValuesToSend(schema, savedConfig.json) });
                },
            }
        );
    console.log({ selectedNode, localConfig, bb: objToReturnDefaultValues(schema, selectedNode.data.rightSideData.json) });
    useEffect(() => {
        console.log("mount");

        return () => {
            console.log("unmounnnnt");
            setLocalConfig({ ...selectedNode.data.rightSideData, json: objToReturnDefaultValues(schema, localConfig.json) })

        }
    }, [])
    return (
        <div className="space-y-6">
            <AutomationSimple
                filledDataName="json"
                schema={schema}
                fieldValues={localConfig.json}
                setSchema={setSchema}
                flowZoneSelectedId={selectedNode.id}
                onFieldChange={({ path, value }) => {
                    console.log({ path, value });
                    updateNestedConfig(`${"json"}.${path}`, value)
                }}
            />
        </div>
    );
}
