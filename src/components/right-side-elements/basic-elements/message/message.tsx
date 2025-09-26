import { useDebounceConfig } from "../../../../hooks/use-debounced-config"
import { removeHTMLTags } from "../../../../lib/utils"
import { NodeConfigProps } from "../../../../types/automation-types"
import { LoopFromForm } from "../../../common/loop-from-end"
import { Editor } from "../../../custom/quill-editor-with-variables"
import { VariableNameField } from "../../../custom/variable-name-field"
import { Label } from "../../../ui/label"
import { Switch } from "../../../ui/switch"

export interface RightSideData {
  botSays?: string;
  save?: boolean;
  variableName: string;
  loopFromSwitch: boolean;
  loopFromName: string;
}





function checkIfAllRequiredDataIsFilled(data: RightSideData): boolean {
  let allInputsAreFilled = true;
  if (data) {
    if (!removeHTMLTags(data.botSays || "")) {
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
];

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

export default function MessageForm({
  selectedNodeId, content, onContentUpdate, validate
}: NodeConfigProps<RightSideData>) {
  const { localConfig, updateNestedConfig } = useDebounceConfig<
    RightSideData
  >(content, {
    delay: 300,
    onSave: (savedConfig) => {
      // Save label changes
      const valid = checkIfAllRequiredDataIsFilled(savedConfig);
      onContentUpdate(savedConfig, valid);
    },
  });


  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm mb-1 font-normal">Bot says</Label>
        <div className="custom-editor w-[93%] mb-2">
          <Editor
            variableName="botSays"
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
            updateNestedConfig("save", checked);
          }}
          id="save-switch"
        />
        <Label htmlFor="save-switch" className="text-xs font-normal">
          Save user's reply in a variable
        </Label>
      </div>

      {localConfig.save && (
        <VariableNameField
          variableName={localConfig.variableName || ""}
          onChange={(value) => updateNestedConfig("variableName", value)}
          label="Variable Name"
        />
      )}

      <Label className="block text-sm mb-1 font-normal">
        Enable the bot to handle user messages.
      </Label>

      <LoopFromForm
        loopFromName={localConfig.loopFromName}
        loopFromSwitch={localConfig.loopFromSwitch}
        handleChange={updateNestedConfig}
      />
    </div>
  );
}
