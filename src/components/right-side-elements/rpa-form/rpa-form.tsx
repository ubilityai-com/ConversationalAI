import * as React from "react"
import { LoopFromForm } from "../../common/loop-from-end"
import { SearchableSelect } from "../../custom/searchable-select"
import { Checkbox } from "../../ui/checkbox"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Separator } from "../../ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"


const TextOnlyTooltip = ({
    children,
    title,
    placement = "left",
}: {
    children: React.ReactNode
    title: string
    placement?: "left" | "right" | "top" | "bottom"
}) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent side={placement} className="bg-gray-700 text-white text-xs">
                {title}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)

interface RPAFormProps {
    clickedElement: any
    handleRightDrawerAnyFormChange: (
        event: any,
        index: number,
        innerIndex: string | number,
        entityIndex: number,
        isDynamicDataHandler: boolean,
    ) => void
    variablesNamesOfEachRPA: Record<string, string[]>
}

export default function RPAForm({
    clickedElement,
    handleRightDrawerAnyFormChange,
    variablesNamesOfEachRPA,
}: RPAFormProps) {
    return (
        <div className="mt-3 space-y-4">
            <p className="text-sm p-1 font-normal">{"Name: " + clickedElement.data.label}</p>

            {clickedElement.data.rpaVariables.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm p-1 font-normal">Variables:</p>
                    {clickedElement.data.rpaVariables.map((rpaVar: any, index: number) => {
                        const varKey = Object.keys(rpaVar)[0]
                        const isTeamsVar = varKey === "TEAMS_ID" || varKey === "TEAMS_NAME" || varKey === "TEAMS_EMAIL"

                        return (
                            <React.Fragment key={`mi-${index}-${varKey}`}>
                                <div className="flex items-center pl-0">
                                    <p className="text-xs font-normal">{varKey}</p>
                                    <div className="flex-grow"></div>
                                    {!isTeamsVar && (
                                        <TextOnlyTooltip title="From existed variables" placement="left">
                                            <Checkbox
                                                id={`asVariable-${index}`}
                                                checked={clickedElement.data.rpaVariables[index].asVariable || false}
                                                onCheckedChange={(checked) => {
                                                    const event = { target: { name: "asVariable", checked, type : "checkbox" } }
                                                    handleRightDrawerAnyFormChange(event, index, "asVariable", -1, false)
                                                }}
                                            />
                                        </TextOnlyTooltip>
                                    )}
                                </div>

                                {!isTeamsVar && (
                                    <>
                                        {!rpaVar.asVariable ? (
                                            <div>
                                                <Label className="block text-sm p-1 mb-1 font-normal">Value</Label>
                                                <Input
                                                    name="value"
                                                    placeholder="Value"
                                                    value={clickedElement.data.rpaVariables[index][varKey] || ""}
                                                    onChange={(event) => handleRightDrawerAnyFormChange(event, index, varKey, -1, false)}
                                                />
                                            </div>
                                        ) : (
                                            variablesNamesOfEachRPA[clickedElement.id] && (
                                                <div>
                                                    <Label className="block text-sm p-1 mb-1 font-normal">{`Value ${index + 1}`}</Label>
                                                    <SearchableSelect
                                                        name={varKey}
                                                        options={variablesNamesOfEachRPA[clickedElement.id].map((option: string) => ({
                                                            value: option,
                                                            label: option,
                                                        }))}
                                                        value={clickedElement.data.rpaVariables[index][varKey] || ""}
                                                        onChange={(value) => {
                                                            const event = { target: { name: varKey, value } }
                                                            handleRightDrawerAnyFormChange(event, index, varKey, -1, false)
                                                        }}
                                                        placeholder="Select a variable"
                                                        className="w-[93%] mx-2 mb-2 h-9 text-xs"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                            </React.Fragment>
                        )
                    })}
                </div>
            )}

            <Separator className="my-4" />

            {clickedElement.data.rpaOutputs && clickedElement.data.rpaOutputs.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm p-1 font-normal">Outputs:</p>
                    {clickedElement.data.rpaOutputs.map((rpaOut: string, i: number) => (
                        <p key={i} className="text-sm p-1 font-normal ml-5">
                            {rpaOut}
                        </p>
                    ))}
                </div>
            )}

            <LoopFromForm
                clickedElement={clickedElement}
                handleRightDrawerAnyFormChange={handleRightDrawerAnyFormChange}
            />
        </div>
    )
}
