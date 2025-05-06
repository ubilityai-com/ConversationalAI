"use client"

import { Minus, Plus } from "lucide-react"
import type * as React from "react"
import { LoopFromForm } from "../../common/loop-from-end"
import { SearchableSelect } from "../../custom/searchable-select"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Switch } from "../../ui/switch"
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

interface WebListCardFormProps {
    clickedElement: any
    handleRightDrawerAnyFormChange: (
        event: any,
        index: number,
        innerIndex: number,
        entityIndex: number,
        isDynamicDataHandler: boolean,
    ) => void
    handleRightDrawerCheckIfPreviousNodeIsABranchsNode?: (element: any) => boolean
    handleRightDrawerSubtractCounters: (event: any, index: number, isDynamicDataHandler: boolean) => void
    handleRightDrawerAddCounters: (event: any, isDynamicDataHandler: boolean) => void
    handleRightDrawerAddInnerCounters: (event: any, index: number, innerIndex: number) => void
    handleRightDrawerSubtractInnerCounters: (event: any, index: number, innerIndex: number, entityIndex: number) => void
    handleRightDrawerCheckIfAINLPIsChosenInBefore: (dynamicDataHandler: any) => boolean
    operations: string[]
    intents: string[]
    entities: string[]
}

export default function WebListCardForm({
    clickedElement,
    handleRightDrawerAnyFormChange,
    handleRightDrawerCheckIfPreviousNodeIsABranchsNode,
    handleRightDrawerSubtractCounters,
    handleRightDrawerAddCounters,
    handleRightDrawerAddInnerCounters,
    handleRightDrawerSubtractInnerCounters,
    handleRightDrawerCheckIfAINLPIsChosenInBefore,
    operations,
    intents,
    entities,
}: WebListCardFormProps) {
    return (
        <div className="space-y-4">
            <div>
                <Label className="block text-sm p-1 mb-1 font-normal">The message that should be displayed on the card</Label>
                <Label className="block text-sm p-1 mb-1 font-normal">Bot says</Label>
                <Input
                    name="botSays"
                    placeholder="Message"
                    value={clickedElement.data.botSays || ""}
                    onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
                />
            </div>

            <div>
                <Label className="block text-sm p-1 mb-1 font-normal mt-5">Configure the list of clickable choices</Label>

                {/* Choices Section */}
                {Array.from(Array(clickedElement.data.formData.length), (e, index) => (
                    <div key={index} className="mb-4 border-l-2 border-border pl-2">
                        <div className="flex items-center justify-between px-2 py-1">
                            <span className="text-sm font-normal ml-2">{`Choice ${index + 1}`}</span>
                            {(index > 0 || (index === 0 && clickedElement.data.formData.length > 1)) && (
                                <TextOnlyTooltip title={`Remove Choice ${index + 1}`} placement="left">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(event) => handleRightDrawerSubtractCounters(event, index, false)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                </TextOnlyTooltip>
                            )}
                        </div>

                        <Label className="block text-sm p-1 mb-1 font-normal">Text</Label>
                        <Input
                            name="text"
                            placeholder="Text"
                            className="w-[93%] mx-2 mb-1 text-xs"
                            value={clickedElement.data.formData[index].text || ""}
                            onChange={(event) => handleRightDrawerAnyFormChange(event, index, -1, -1, false)}
                        />
                        <p className="text-xs text-muted-foreground ml-2 mb-4">Recommended to type less than 50 characters.</p>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(event) => handleRightDrawerAddCounters(event, false)}
                    className="mt-2"
                >
                    <Plus className="h-4 w-4 mr-2" /> Add New Choice
                </Button>

            </div>

            <div className="flex items-center space-x-2 mx-2 mb-2">
                <Switch
                    checked={clickedElement.data.save || false}
                    onCheckedChange={(checked) => {
                        const event = { target: { name: "save", checked, type: "checkbox" } }
                        handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
                    }}
                    id="save-switch"
                />
                <Label htmlFor="save-switch" className="text-xs font-normal">
                    Save user's reply in a variable
                </Label>
            </div>

            {clickedElement.data.save && (
                <>
                    <Label className="block text-sm p-1 mb-1 font-normal">Variable Name</Label>
                    <Input
                        name="variableName"
                        placeholder="Variable Name"
                        value={clickedElement.data.variableName || ""}
                        onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
                    />
                </>
            )}

            <Label className="block text-sm p-1 mb-1 font-normal">Enable the bot to handle user messages.</Label>

            {/* Dynamic Data Handlers Section */}
            {Array.from(Array(clickedElement.data.dynamicDataHandler.length), (e, index) => {
                return (
                    <div key={`handler-${index}`} className="mb-4 border-l-2 border-border pl-2">
                        <div className="flex items-center justify-between px-2 py-1">
                            <span className="text-sm font-normal ml-2">{`Condition ${index + 1}`}</span>
                            <TextOnlyTooltip title={`Remove Condition ${index + 1}`} placement="left">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={(event) => handleRightDrawerSubtractCounters(event, index, true)}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                            </TextOnlyTooltip>
                        </div>

                        {/* Inner Dynamic Data Handlers */}
                        {Array.from(
                            Array(clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler.length),
                            (e, innerIndex) => (
                                <div key={`inner-${index}-${innerIndex}`} className="mb-4 border-l-2 border-border ml-2 pl-2">
                                    <div className="flex items-center justify-between px-2 py-1">
                                        <span className="text-xs font-normal ml-3">{`Condition ${index + 1}.${innerIndex + 1}`}</span>
                                        <div className="flex space-x-1">
                                            {innerIndex ===
                                                clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler.length - 1 && (
                                                    <TextOnlyTooltip title="Add New Sub Condition" placement="left">
                                                        <Button
                                                            size="icon"
                                                            className="h-6 w-6 bg-green-600 hover:bg-green-700"
                                                            onClick={(event) => handleRightDrawerAddInnerCounters(event, index, -1)}
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </TextOnlyTooltip>
                                                )}
                                            {(innerIndex > 0 ||
                                                (innerIndex === 0 &&
                                                    clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler.length > 1)) && (
                                                    <TextOnlyTooltip title={`Remove Condition ${index + 1}.${innerIndex + 1}`} placement="left">
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={(event) => handleRightDrawerSubtractInnerCounters(event, index, innerIndex, -1)}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                    </TextOnlyTooltip>
                                                )}
                                        </div>
                                    </div>

                                    <Label className="block text-sm p-1 mb-1 font-normal">Choice</Label>
                                    <SearchableSelect
                                        name="choice"
                                        options={[
                                            { value: "Keyword", label: "Keyword" },
                                            {
                                                value: "AI NLP",
                                                label: "AI NLP",
                                                // disabled: !handleRightDrawerCheckIfAINLPIsChosenInBefore(
                                                //     clickedElement.data.dynamicDataHandler[index],
                                                // ),LATER
                                            },
                                            { value: "Variable", label: "Variable" },
                                        ]}
                                        value={
                                            clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].choice || ""
                                        }
                                        onChange={(value) => {
                                            const event = { target: { name: "choice", value } }
                                            handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)
                                        }}
                                        placeholder="Select a choice"
                                        className="w-[93%] mx-2 mb-2 h-9 text-xs"
                                    />

                                    {clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].choice ===
                                        "Keyword" && (
                                            <div>
                                                <Label className="block text-sm p-1 mb-1 font-normal">Value</Label>
                                                <Input
                                                    name="value"
                                                    placeholder="Value"
                                                    value={
                                                        clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].value || ""
                                                    }
                                                    onChange={(event) => handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)}
                                                />
                                                <Label className="block text-sm p-1 mb-1 font-normal">
                                                    Enable to save the keyword value in a variable to be used by the bot
                                                </Label>
                                                <div className="flex items-center space-x-2 mx-2 mb-2">
                                                    <Switch
                                                        checked={
                                                            clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].save ||
                                                            false
                                                        }
                                                        onCheckedChange={(checked) => {
                                                            const event = { target: { name: "save", checked, type:"checkbox" } }
                                                            handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)
                                                        }}
                                                        id={`save-switch-${index}-${innerIndex}`}
                                                    />
                                                    <Label htmlFor={`save-switch-${index}-${innerIndex}`} className="text-xs font-normal">
                                                        SAVE
                                                    </Label>
                                                </div>
                                                {clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].save && (
                                                    <>
                                                        <Label className="block text-sm p-1 mb-1 font-normal">Variable Name</Label>
                                                        <Input
                                                            name="variableName"
                                                            placeholder="Variable Name"
                                                            value={
                                                                clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                                                    .variableName || ""
                                                            }
                                                            onChange={(event) => handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        )}

                                    {clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].choice ===
                                        "AI NLP" && (
                                            <div>
                                                <Label className="block text-sm p-1 mb-1 font-normal">Intent</Label>
                                                <SearchableSelect
                                                    name="intent"
                                                    options={intents.map((option) => ({
                                                        value: option,
                                                        label: option,
                                                    }))}
                                                    value={
                                                        clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].intent || ""
                                                    }
                                                    onChange={(value) => {
                                                        const event = { target: { name: "intent", value } }
                                                        handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)
                                                    }}
                                                    placeholder="Select an intent"
                                                    className="w-[93%] mx-2 mb-2 h-9 text-xs"
                                                />

                                                {/* Entities Section */}
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between px-2 py-1">
                                                        <Label className="text-sm font-normal">Add an entity to the condition</Label>
                                                        <Button
                                                            size="icon"
                                                            className="h-6 w-6 bg-green-600 hover:bg-green-700"
                                                            onClick={(event) => handleRightDrawerAddInnerCounters(event, index, innerIndex)}
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    {/* Entity Fields */}
                                                    {Array.from(
                                                        Array(
                                                            clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].entities
                                                                .length,
                                                        ),
                                                        (e, entityIndex) => (
                                                            <div
                                                                key={`Entity-${index}-${innerIndex}-${entityIndex}`}
                                                                className="ml-2 border-l-2 border-border pl-2 mb-2"
                                                            >
                                                                <div className="flex items-center justify-between px-2 py-1">
                                                                    <Label className="text-sm font-normal">{`Entity ${entityIndex + 1}`}</Label>
                                                                    <TextOnlyTooltip title={`Remove Entity ${entityIndex + 1}`} placement="left">
                                                                        <Button
                                                                            variant="destructive"
                                                                            size="icon"
                                                                            className="h-6 w-6"
                                                                            onClick={(event) =>
                                                                                handleRightDrawerSubtractInnerCounters(event, index, innerIndex, entityIndex)
                                                                            }
                                                                        >
                                                                            <Minus className="h-4 w-4" />
                                                                        </Button>
                                                                    </TextOnlyTooltip>
                                                                </div>

                                                                <SearchableSelect
                                                                    name="name"
                                                                    options={entities.map((option) => ({
                                                                        value: option,
                                                                        label: option,
                                                                    }))}
                                                                    value={
                                                                        clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                                                            .entities[entityIndex].name || ""
                                                                    }
                                                                    onChange={(value) => {
                                                                        const event = { target: { name: "name", value } }
                                                                        handleRightDrawerAnyFormChange(event, index, innerIndex, entityIndex, true)
                                                                    }}
                                                                    placeholder="Select an entity"
                                                                    className="w-[93%] mx-2 mb-2 h-9 text-xs"
                                                                />

                                                                {!clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                                                    .entities[entityIndex].any && (
                                                                        <>
                                                                            <Label className="block text-sm p-1 mb-1 font-normal">Value</Label>
                                                                            <Input
                                                                                name="value"
                                                                                placeholder="Value"
                                                                                value={
                                                                                    clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                                                                        .entities[entityIndex].value || ""
                                                                                }
                                                                                onChange={(event) =>
                                                                                    handleRightDrawerAnyFormChange(event, index, innerIndex, entityIndex, true)
                                                                                }
                                                                            />
                                                                        </>
                                                                    )}

                                                                <Label className="block text-sm p-1 mb-1 font-normal">
                                                                    Or any value of the above entity
                                                                </Label>
                                                                <div className="flex items-center space-x-2 mx-2 mb-2">
                                                                    <Switch
                                                                        checked={
                                                                            clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                                                                .entities[entityIndex].any || false
                                                                        }
                                                                        onCheckedChange={(checked) => {
                                                                            const event = { target: { name: "any", checked, type:"checkbox" } }
                                                                            handleRightDrawerAnyFormChange(event, index, innerIndex, entityIndex, true)
                                                                        }}
                                                                        id={`any-switch-${index}-${innerIndex}-${entityIndex}`}
                                                                    />
                                                                    <Label
                                                                        htmlFor={`any-switch-${index}-${innerIndex}-${entityIndex}`}
                                                                        className="text-xs font-normal"
                                                                    >
                                                                        ANY
                                                                    </Label>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].choice ===
                                        "Variable" && (
                                            <div>
                                                <Label className="block text-sm p-1 mb-1 font-normal">Operator</Label>
                                                <SearchableSelect
                                                    name="operator"
                                                    options={operations.map((option) => ({
                                                        value: option,
                                                        label: option,
                                                    }))}
                                                    value={
                                                        clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].operator ||
                                                        "None"
                                                    }
                                                    onChange={(value) => {
                                                        const event = { target: { name: "operator", value } }
                                                        handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)
                                                    }}
                                                    placeholder="Select an operator"
                                                    className="w-[93%] mx-2 mb-2 h-9 text-xs"
                                                />
                                                <Label className="block text-sm p-1 mb-1 font-normal">Value</Label>
                                                <Input
                                                    name="value"
                                                    placeholder="Value"
                                                    value={
                                                        clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex].value || ""
                                                    }
                                                    onChange={(event) => handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)}
                                                />
                                            </div>
                                        )}
                                </div>
                            ),
                        )}
                    </div>
                )
            })}

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(event) => handleRightDrawerAddCounters(event, true)}
                className="mt-2"
            >

                {clickedElement.data.dynamicDataHandler?.length > 0 ? <><Plus className="h-4 w-4 mr-2" /> Add New Condition</> : "Enable Conditions"}
            </Button>
            <LoopFromForm
                clickedElement={clickedElement}
                handleRightDrawerAnyFormChange={handleRightDrawerAnyFormChange}
            />
        </div>
    )
}
