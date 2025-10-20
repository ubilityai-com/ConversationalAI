import { AlertTriangle } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { doesVariableExist, findDetailedVariableOrigins } from "../../lib/utils/variable-utils"
import { useFlowStore } from "../../store/root-store"
import { Alert, AlertDescription } from "../ui/alert"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface VariableNameFieldProps {
    variableName: string
    label?: string
    onChange: (value: string) => void
}
export function VariableNameField({
    variableName,
    label = "Variable Name",
    onChange,
}: VariableNameFieldProps) {
    const [variableDup, setVariableDup] = useState("")
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const updateDialogueVariable = useFlowStore(
        (state) => state.updateDialogueVariable
    )
    const selectedNodeId = useFlowStore(
        (state) => state.clickedElement.id
    )

    const varExist = (varName: string) => {
        const { constantVariables, outputVariables, dialogueVariables, files } =
            useFlowStore.getState()
        return doesVariableExist(varName, constantVariables, outputVariables, dialogueVariables, files) ? varName : ""
    }

    const checkIfVariableExist = (varName: string) => {
        if (!varExist(varName)) {
            setVariableDup("")
        } else {
            setVariableDup(varName)
        }
        updateDialogueVariable(selectedNodeId, varName)
    }

    const debounceMessageVariable = (value: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => checkIfVariableExist(value), 1000)
    }

    useEffect(() => {
        const variableOriginsList = findDetailedVariableOrigins(variableName)
        if (variableOriginsList.length > 1 || (variableOriginsList.length === 1 && variableOriginsList[0].count > 1))
            setVariableDup(varExist(variableName))
    }, [])

    return (
        <div>
            <Label className="block text-sm mt-4 mb-1 font-normal">{label}</Label>
            <Input
                name="variableName"
                placeholder={label}
                value={variableName || ""}
                onChange={(event) => {
                    debounceMessageVariable(event.target.value)
                    onChange(event.target.value)
                }}
            />
            {variableDup && (
                <Alert variant="destructive" className="mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                        {`The variable "$\{${variableDup}}" already exists and will be overridden in subsequent nodes.`}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}
