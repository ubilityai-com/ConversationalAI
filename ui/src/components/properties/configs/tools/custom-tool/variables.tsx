import React from "react"
import { Input } from "../../../../ui/input"
import { Label } from "../../../../ui/label"


interface VariableValue {
    [key: string]: string | VariableValue
}

interface VariablesProps {
    variables: VariableValue
    onVariablesUpdate: (key: string, value: any) => void;
    path?: string
}

const getVarValue = (pathArray: string[], json: VariableValue, value: string, a = 0): VariableValue => {
    let newJson = json
    const newPathArray = [...pathArray]
    const list = newPathArray.slice(1)
    const key = newPathArray.shift()

    if (!key) return newJson

    if (pathArray.length > 1) {
        newJson = {
            ...newJson,
            [key]: getVarValue(list, newJson[key] as VariableValue, value, a + 1),
        }
    } else {
        newJson = { ...newJson, [key]: value }
    }
    return newJson
}

const Variables: React.FC<VariablesProps> = ({ variables, onVariablesUpdate, path }) => {
    const onChangeVariables = (event: React.ChangeEvent<HTMLInputElement>, key: string, path: string): void => {
        onVariablesUpdate(`inputsDescription.${path.split(".")}`, event.target.value)
    }

    return (
        <div className="space-y-4">
            {Object.keys(variables).map((v) => (
                <React.Fragment key={v}>
                    {typeof (variables[v]) === "object" && !Array.isArray(variables[v]) ? (
                        <div className="pl-4 border-l-2 border-gray-200">
                            <Label className="text-sm font-semibold text-gray-700 mb-2 block">{v}</Label>
                            <Variables
                                variables={variables[v] as VariableValue}
                                onVariablesUpdate={onVariablesUpdate}
                                path={path ? `${path}.${v}` : v}
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Label htmlFor={v} className="text-sm font-medium">
                                {v}
                            </Label>
                            <Input
                                id={v}
                                value={variables[v] as string}
                                placeholder="eg this is the email"
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    onChangeVariables(e, v, path ? `${path}.${v}` : v)
                                }}
                                className="w-full"
                            />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Variables
