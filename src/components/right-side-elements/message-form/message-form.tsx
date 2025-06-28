import { useRef, useState } from "react"


// Dynamically import ReactQuill to avoid SSR issues
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useFlowStore } from "../../../store/flow-store"
import { LoopFromForm } from "../../common/loop-from-end"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Switch } from "../../ui/switch"
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
function removeHTMLTags(htmlCode: string): string {
  const withoutHTMLTags = htmlCode.replace(/<[^>]*>/g, '');
  return withoutHTMLTags.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
function checkIfAllRequiredDataIsFilled({ data }: { data?: Data["rightSideData"] }): boolean {
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

interface MessageFormProps {
  selectedNode: { data: Data, id: string }
  handleRightSideDataUpdate: (
    id: string,
    value: any
  ) => void
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

  // Init local form data once
  const [formData, setFormData] = useState(() => selectedNode.data.rightSideData || {})
  const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)

  // Store debounce timer
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const debounceStoreUpdate = (newFormData: any) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      handleRightSideDataUpdate(
        selectedNode.id,
        newFormData
      )
      updateNodesValidationById(selectedNode.id, checkIfAllRequiredDataIsFilled({ data: newFormData }))
    }, 500) // Adjust debounce time as needed
  }

  const handleLocalChange = (name: string, value: any) => {
    const newFormData = { ...formData, [name]: value }
    console.log({ name, value, newFormData });

    setFormData(newFormData)
    debounceStoreUpdate(newFormData)

  }
  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm mb-1 font-normal">Bot says</Label>
        <div className="custom-editor w-[93%] mb-2">

          <ReactQuill
            theme="snow"
            value={formData.botSays || ""}
            onChange={(value) => handleLocalChange("botSays", value)}
            formats={formats}
            modules={modules}
            className="my-4 text-foreground dark:border-border rounded-md dark:text-foreground"
          />

        </div>
      </div>

      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={formData.save || false}
          onCheckedChange={(checked) => handleLocalChange("save", checked)}
          id="save-switch"
        />
        <Label htmlFor="save-switch" className="text-xs font-normal">
          Save user's reply in a variable
        </Label>
      </div>

      {formData.save && (
        <div>
          <Label className="block text-sm mb-1 font-normal">Variable Name</Label>
          <Input
            name="variableName"
            placeholder="Variable Name"
            value={formData.variableName || ""}
            onChange={(e) => handleLocalChange("variableName", e.target.value)}
          />
        </div>
      )}

      <Label className="block text-sm mb-1 font-normal">Enable the bot to handle user messages.</Label>
{/* 
      <LoopFromForm
        data={formData}
        handleChange={handleLocalChange}
      /> */}
    </div>
  )
}
