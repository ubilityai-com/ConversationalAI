import { useRef } from "react"
import "react-quill/dist/quill.snow.css"
import { useDebounceConfig } from "../../../../hooks/use-debounced-config"
import { useFlowStore } from "../../../../store/flow-store"
import { NodeConfigProps } from "../../../../types/automation-types"
import { FieldWrapper } from "../../../custom/field-wrapper"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"

export interface RightSideData {
    method: string;
    variableName?: string;
    fileContent: string
    message: string
}

function checkIfAllRequiredDataIsFilled(data?: RightSideData): boolean {
    if (!data) return false;

    if (data.method === "send") {
        return Boolean(data.fileContent);
    }

    if (data.method === "receive") {
        if (!data.message || !data.variableName) return false;
    }
    return true;
}


// Quill editor formats and modules

export default function AttachmentForm({
    selectedNodeId, content, onContentUpdate, validate
}: NodeConfigProps<RightSideData>) {
    const updateDialogueVariable = useFlowStore(
        (state) => state.updateDialogueVariable
    );
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
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debounceAttachVariable = (value: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            updateDialogueVariable(selectedNodeId, value);
        }, 1000);
    }
    return (
        <div className="space-y-2">
            <div>
                <Label htmlFor={`method`} className="text-xs">
                    Operation
                </Label>
                <Select
                    value={localConfig.method}
                    onValueChange={(value) => {
                        updateNestedConfig("method", value)
                    }
                    }
                >
                    <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="send">Send file</SelectItem>
                        <SelectItem value="receive">Receive file</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {
                localConfig.method === "send" &&
                <div>
                    <Label htmlFor={`fileContent`} className="text-xs">
                        file content
                    </Label>
                    <FieldWrapper
                        field={{ type: "textfield" }}
                        variableName={`fileContent}`}
                        value={localConfig.fileContent || ""}
                        onChange={(e) => updateNestedConfig("fileContent", e)}
                        className="h-8 text-xs"
                    >
                        <Input
                            id={`fileContent`}
                            placeholder="content"
                            value={localConfig.fileContent || ""}
                            onChange={(e) => updateNestedConfig("fileContent", e.target.value)}
                            className="h-8 text-xs"
                        />
                    </FieldWrapper>
                </div>
            }
            {
                localConfig.method === "receive" &&
                <div>
                    <Label htmlFor={`message`} className="text-xs">
                        Message
                    </Label>
                    <FieldWrapper
                        field={{ type: "textfield" }}
                        variableName={`message}`}
                        value={localConfig.message || ""}
                        onChange={(e) => updateNestedConfig("message", e)}
                        className="h-8 text-xs"
                    >
                        <Input
                            id={`message`}
                            value={localConfig.message || ""}
                            onChange={(e) => updateNestedConfig("message", e.target.value)}
                            className="h-8 text-xs"
                        />
                    </FieldWrapper>
                    <div className="mt-2">
                        <Label className="text-xs">
                            Save user file as variable
                        </Label>
                        <FieldWrapper
                            field={{ type: "textfield" }}
                            variableName={`variableName}`}
                            value={localConfig.variableName || ""}
                            onChange={(e) => updateNestedConfig("variableName", e)}
                            className="h-8 text-xs"
                        >
                            <Input
                                name="variableName"
                                value={localConfig.variableName || ""}
                                onChange={(event) => {
                                    // Clear previous timeout (if any)
                                    debounceAttachVariable(event.target.value)
                                    updateNestedConfig("variableName", event.target.value);
                                }}
                            />
                        </FieldWrapper>
                    </div>
                </div>

            }

        </div>
    );
}
