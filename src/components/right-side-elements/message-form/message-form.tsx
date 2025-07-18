// Dynamically import ReactQuill to avoid SSR issues
import { Edge, Node, NodeProps } from "@xyflow/react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useDebounceConfig } from "../../../hooks/use-debounced-config"
import { getNextNodeId, removeHTMLTags, stringifyAndExtractVariables } from "../../../lib/utils"
import { useFlowStore } from "../../../store/flow-store"
import { LoopFromForm } from "../../common/loop-from-end"
import { EditableField } from "../../custom/editable-field"
import { Label } from "../../ui/label"
import { Switch } from "../../ui/switch"
import { useEffect } from "react"

interface RightSideData {
  botSays?: string;
  // advanced?: boolean;
  // regex?: boolean;
  // errorMessage?: string;
  save?: boolean;
  variableName: string;
  loopFromSwitch: boolean;
  loopFromName: string
}
interface RightSideData {
  botSays?: string;
  advanced?: boolean;
  regex?: boolean;
  errorMessage?: string;
  save?: boolean;
  variableName: string;
  loopFromSwitch: boolean;
  loopFromName: string
}
interface MessageConfigProps extends Record<string, unknown> {
  /* node.data passed from <PropertiesPanel /> */
  label: string
  description: string
  rightSideData: RightSideData
}
interface MessageFormProps {
  selectedNode: NodeProps<Node<MessageConfigProps>>
  handleRightSideDataUpdate: (
    value: any
  ) => void
}
export function getContent(selectedNode: any, params: any) {
  const rightSideData: RightSideData = selectedNode.data.rightSideData
  const content = {
    type: "data",
    data: {
      text: rightSideData.botSays
    }
  }
  return {
    type: "Message",
    content: content,
    next: getNextNodeId(selectedNode.id, params.edges, params.nodes, null),
    saveUserInputAs: rightSideData.save ? rightSideData.variableName : null,
    usedVariables: stringifyAndExtractVariables(content)
  };
}

function checkIfAllRequiredDataIsFilled(data: RightSideData): boolean {
  let allInputsAreFilled = true;
  if (data) {
    if (!removeHTMLTags(data.botSays || '')) {
      allInputsAreFilled = false;
    }
    if (data.save && !data.variableName) {
      allInputsAreFilled = false;
    }

  }
  return allInputsAreFilled;
}

// Quill editor formats and modules
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
]

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link"],
    ["clean"],
  ],
}

export default function MessageForm({
  selectedNode,
  handleRightSideDataUpdate,
}: MessageFormProps) {
  const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)
  const addVariable = useFlowStore(state => state.addVariable)
  const updateVariable = useFlowStore(state => state.updateVariable)
  const { localConfig, updateNestedConfig } = useDebounceConfig<MessageConfigProps["rightSideData"]>(
    selectedNode.data.rightSideData,
    {
      delay: 300,
      onSave: (savedConfig) => {
        // Save label changes
        updateNodesValidationById(selectedNode.id, checkIfAllRequiredDataIsFilled(savedConfig))
        handleRightSideDataUpdate(savedConfig)

      },
    },
  )
  console.log({ selectedNode });

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm mb-1 font-normal">Bot says</Label>
        <div className="custom-editor w-[93%] mb-2">

          <ReactQuill
            theme="snow"
            value={localConfig.botSays || ""}
            onChange={(value) => updateNestedConfig("botSays", value)}
            formats={formats}
            modules={modules}
            className="my-4 text-foreground dark:border-border rounded-md dark:text-foreground"
          />

        </div>
      </div>

      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={localConfig.save || false}
          onCheckedChange={(checked) => {
            addVariable({ category: "dialogue", name: "", type: "string", value: "", origin: selectedNode.id })
            updateNestedConfig("save", checked)
          }}
          id="save-switch"
        />
        <Label htmlFor="save-switch" className="text-xs font-normal">
          Save user's reply in a variable
        </Label>
      </div>

      {localConfig.save && (
        <div>
          <Label className="block text-sm mb-1 font-normal">Variable Name</Label>
          <EditableField
            name="variableName"
            placeholder="Variable Name"
            value={localConfig.variableName || ""}
            onChange={(newValue) => {
              updateVariable("dialogue", localConfig.variableName, { category: "dialogue", name: newValue })
              updateNestedConfig("variableName", newValue)
            }}
          />
        </div>
      )}

      <Label className="block text-sm mb-1 font-normal">Enable the bot to handle user messages.</Label>

      <LoopFromForm
        loopFromName={localConfig.loopFromName}
        loopFromSwitch={localConfig.loopFromSwitch}
        handleChange={updateNestedConfig}
      />
    </div>
  )
}
