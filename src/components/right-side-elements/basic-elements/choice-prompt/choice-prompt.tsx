"use client"

import { ListChecks, Plus, Trash2 } from "lucide-react"
import { useRef } from "react"
import { useDebounceConfig } from "../../../../hooks/use-debounced-config"
import { removeHTMLTags } from "../../../../lib/utils"
import { useFlowStore } from "../../../../store/flow-store"
import { NodeConfigProps } from "../../../../types/automation-types"
import { LoopFromForm } from "../../../common/loop-from-end"
import { FieldWrapper } from "../../../custom/field-wrapper"
import { Button } from "../../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/card"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Switch } from "../../../ui/switch"

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Choice {
    id: string
    label: string
}
export interface RightSideData {
    choices: Choice[],
    botSays: string,
    save: boolean;
    variableName: string;
    loopFromSwitch: boolean;
    loopFromName: string
}


function checkIfAllRequiredDataIsFilled(data: RightSideData): boolean {
    if (!data) return false;

    // Check botSays content
    if (!removeHTMLTags(data.botSays || '').trim()) {
        return false;
    }

    // Check choices items
    for (const item of data.choices) {
        if (!item.label || item.label.trim() === '') {
            return false;
        }
    }

    // Check variableName if save is true
    if (data.save && !data.variableName) {
        return false;
    }


    return true;
}

export default function ChoicePromptForm({ content, onContentUpdate, selectedNodeId, validate }: NodeConfigProps<RightSideData>) {

    /* --------------------------- helper functions -------------------------- */
    const { localConfig, updateNestedConfig } = useDebounceConfig<RightSideData>(
        content,
        {
            delay: 300,
            onSave: (savedConfig) => {
                // Save label changes
                const valid = (checkIfAllRequiredDataIsFilled(savedConfig))
                onContentUpdate(savedConfig, valid)

            },
        },
    )
    const updateDialogueVariable = useFlowStore(state => state.updateDialogueVariable)
    const choices: Choice[] = localConfig.choices ?? []
    const botSays = localConfig.botSays ?? ""
    const save = localConfig.save ?? ""
    const variableName = localConfig.variableName ?? ""
    const loopFromName = localConfig.loopFromName ?? ""
    const loopFromSwitch = localConfig.loopFromSwitch ?? false
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);


    const addChoice = () => {
        const newChoice: Choice = {
            id: `choice-${Date.now()}`,
            label: `Choice ${choices.length + 1}`,
        }
        updateNestedConfig("choices", [...choices, newChoice])
    }

    const updateChoice = (choiceId: string, updates: Partial<Choice>) => {
        const updatedChoices = choices.map((c) => (c.id === choiceId ? { ...c, ...updates } : c))
        updateNestedConfig("choices", updatedChoices)
    }

    const removeChoice = (choiceId: string) => {
        const updatedChoices = choices.filter((c) => c.id !== choiceId)
        updateNestedConfig("choices", updatedChoices)
    }
    const debounceMessageVariable = (value: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            updateDialogueVariable(selectedNodeId, value);
        }, 1000);
    }
    /* ---------------------------------- UI --------------------------------- */

    return (
        <div className="space-y-4">
            {/* ── basic node meta ──────────────────────────────────────────────── */}
            <div>
                <Label htmlFor="botSays">Bot says</Label>
                <FieldWrapper
                    field={{ type: "textfield", placeholder: "Message" }}
                    value={botSays || ""}
                    onChange={(value) => updateNestedConfig("botSays", value)}
                    variableName={"botSays"}
                >
                    <Input id="botSays" value={botSays} onChange={(e) => updateNestedConfig("botSays", e.target.value)} />
                </FieldWrapper>
            </div>


            {/* ── dynamic choices list ─────────────────────────────────────────── */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                        <ListChecks className="w-4 h-4 mr-2" />
                        Choices&nbsp;
                        <span className="text-muted-foreground">({choices.length})</span>
                    </CardTitle>
                    <CardDescription>Add options users can select. Every choice gets its own output handle.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {choices.length === 0 && <p className="text-xs text-gray-500">No choices yet. Click “Add Choice”.</p>}

                    {choices.map((choice, idx) => (
                        <Card key={choice.id} className="border border-gray-200">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm">Choice {idx + 1}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                        onClick={() => {
                                            if (choices.length > 1) {
                                                removeChoice(choice.id)
                                            }
                                        }
                                        }
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>

                                <div>
                                    <Label htmlFor={`label-${choice.id}`} className="text-xs">
                                        Label
                                    </Label>
                                    <FieldWrapper
                                        field={{ type: "textfield", placeholder: "Choice" }}
                                        value={choice.label}
                                        onChange={(value) => updateChoice(choice.id, { label: value })}
                                        variableName={`label-${choice.id}`}
                                        className="h-8 text-xs"
                                    >
                                        <Input
                                            id={`label-${choice.id}`}
                                            value={choice.label}
                                            onChange={(e) => updateChoice(choice.id, { label: e.target.value })}
                                            className="h-8 text-xs"
                                        />
                                    </FieldWrapper>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <Button variant="outline" size="sm" onClick={addChoice} className="h-8 w-full">
                        <Plus className="w-3 h-3 mr-1" />
                        Add Choice
                    </Button>
                </CardContent>
            </Card>
            <div className="flex items-center space-x-2 mx-2 mb-2">
                <Switch
                    checked={save || false}
                    onCheckedChange={(checked) => {
                        updateNestedConfig("save", checked)
                    }}
                    id="save-switch"
                />
                <Label htmlFor="save-switch" className="text-xs font-normal">
                    Save user's reply in a variable
                </Label>
            </div>

            {save && (
                <>
                    <Label className="block text-sm p-1 mb-1 font-normal">Variable Name</Label>
                    <Input
                        name="variableName"
                        placeholder="Variable Name"
                        value={variableName || ""}
                        onChange={(event) => {
                            debounceMessageVariable(event.target.value)
                            updateNestedConfig("variableName", event.target.value)
                        }
                        }
                    />
                </>
            )}

            <Label className="block text-sm p-1 mb-1 font-normal">Enable the bot to handle user messages.</Label>

            <LoopFromForm
                loopFromSwitch={loopFromSwitch}
                loopFromName={loopFromName}
                handleChange={updateNestedConfig}
            />
        </div>
    )
}
