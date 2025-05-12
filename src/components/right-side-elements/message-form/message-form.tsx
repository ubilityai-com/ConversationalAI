import type * as React from "react"
import { useEffect, useState } from "react"


// Dynamically import ReactQuill to avoid SSR issues
import { Minus, Plus } from "lucide-react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { LoopFromForm } from "../../common/loop-from-end"
import { SearchableSelect } from "../../custom/searchable-select"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Switch } from "../../ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"

// Define types for our dynamic fields
interface Entity {
  name: string
  value?: string
  any?: boolean
}

interface InnerDynamicDataHandler {
  choice?: string
  value?: string
  save?: boolean
  variableName?: string
  intent?: string
  operator?: string
  entities: Entity[]
}

interface DynamicDataHandler {
  innerDynamicDataHandler: InnerDynamicDataHandler[]
}

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

interface MessageFormProps {
  clickedElement: any
  handleRightDrawerAnyFormChange: (
    event: any,
    index: number,
    innerIndex: number,
    entityIndex: number,
    isDynamicDataHandler: boolean,
  ) => void
  handleRightDrawerSubtractCounters: (event: any, index: number, isDynamicDataHandler: boolean) => void
  handleRightDrawerAddCounters: (event: any, isDynamicDataHandler: boolean) => void
  handleRightDrawerAddInnerCounters: (event: any, index: number, innerIndex: number) => void
  handleRightDrawerSubtractInnerCounters: (event: any, index: number, innerIndex: number, entityIndex: number) => void
  handleRightDrawerCheckIfAINLPIsChosenInBefore: (dynamicDataHandler: any) => boolean
  handleRightDrawerCheckIfPreviousNodeIsABranchsNode?: (element: any) => boolean
  operations: string[]
  intents: string[]
  entities: string[]
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
  clickedElement,
  handleRightDrawerAnyFormChange,
  handleRightDrawerSubtractCounters,
  handleRightDrawerAddCounters,
  handleRightDrawerAddInnerCounters,
  handleRightDrawerSubtractInnerCounters,
  handleRightDrawerCheckIfAINLPIsChosenInBefore,
  handleRightDrawerCheckIfPreviousNodeIsABranchsNode,
  operations,
  intents,
  entities,
}: MessageFormProps) {
  // State to track if ReactQuill is loaded
  const [quillLoaded, setQuillLoaded] = useState(false)

  // Set quillLoaded to true after component mounts
  useEffect(() => {
    setQuillLoaded(true)
  }, [])

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm mb-1 font-normal">Bot says</Label>
        <div className="custom-editor w-[93%] mb-2">
          {quillLoaded && (
            <ReactQuill
              theme="snow"
              value={clickedElement.data.botSays || ""}
              onChange={(content) => {
                handleRightDrawerAnyFormChange({ target: { name: "botSays", value: content } }, -1, -1, -1, false)
              }}
              formats={formats}
              modules={modules}
              className="my-4 text-foreground dark:border-border rounded-md dark:text-foreground"
              />
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={clickedElement.data.advanced || false}
          onCheckedChange={(checked) => {
            const event = { target: { name: "advanced", checked, type: "checkbox" } }
            handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
          }}
          id="advanced-switch"
        />
        <Label htmlFor="advanced-switch" className="text-xs font-normal">
          Advanced
        </Label>
      </div>

      {clickedElement.data.advanced && (
        <>
          <div>
            <Label className="block text-sm mb-1 font-normal">Regular Expression</Label>
            <Input
              name="regex"
              placeholder="(e.g. /w3schools/i)"
              value={clickedElement.data.regex || ""}
              onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
            />
          </div>

          <div>
            <Label
              className={`block text-sm mb-1 font-normal ${!clickedElement.data.regex ? "text-muted-foreground" : ""}`}
            >
              Error Message
            </Label>
            <Input
              name="errorMessage"
              placeholder="Error Message"
              value={clickedElement.data.errorMessage || ""}
              onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
              disabled={!clickedElement.data.regex}
            />
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
            <div>
              <Label className="block text-sm mb-1 font-normal">Variable Name</Label>
              <Input
                name="variableName"
                placeholder="Variable Name"
                value={clickedElement.data.variableName || ""}
                onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
              />
            </div>
          )}

          <Label className="block text-sm mb-1 font-normal">Enable the bot to handle user messages.</Label>

          {/* Dynamic Data Handlers Section */}
          {Array.from(Array(clickedElement.data.dynamicDataHandler?.length || 0), (e, index) => {
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
                  Array(clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler?.length || 0),
                  (e, innerIndex) => (
                    <div key={`inner-${index}-${innerIndex}`} className="mb-4 border-l-2 border-border ml-2 pl-2">
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-xs font-normal ml-3">{`Condition ${index + 1}.${innerIndex + 1}`}</span>
                        <div className="flex space-x-1">
                          {innerIndex ===
                            (clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler?.length || 0) -
                            1 && (
                              <TextOnlyTooltip title="Add New Sub Condition" placement="left">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 bg-green-600 hover:bg-green-700 text-white"
                                  onClick={(event) => handleRightDrawerAddInnerCounters(event, index, -1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </TextOnlyTooltip>
                            )}
                          {(innerIndex > 0 ||
                            (innerIndex === 0 &&
                              (clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler?.length || 0) >
                              1)) && (
                              <TextOnlyTooltip title={`Remove Condition ${index + 1}.${innerIndex + 1}`} placement="left">
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(event) =>
                                    handleRightDrawerSubtractInnerCounters(event, index, innerIndex, -1)
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              </TextOnlyTooltip>
                            )}
                        </div>
                      </div>

                      <Label className="block text-sm mb-1 font-normal">Choice</Label>
                      <SearchableSelect
                        name="choice"
                        options={[
                          { value: "Keyword", label: "Keyword" },
                          {
                            value: "AI NLP",
                            label: "AI NLP",
                            // disabled: !handleRightDrawerCheckIfAINLPIsChosenInBefore(
                            //   clickedElement.data.dynamicDataHandler[index],
                            // ),LATER
                          },
                          { value: "Variable", label: "Variable" },
                        ]}
                        value={
                          clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.choice ||
                          ""
                        }
                        onChange={(value) => {
                          handleRightDrawerAnyFormChange(
                            { target: { name: "choice", value } },
                            index,
                            innerIndex,
                            -1,
                            true,
                          )
                        }}
                        placeholder="Select choice"
                        className="w-[93%] mx-2 mb-2 h-9 text-xs"
                      />

                      {clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.choice ===
                        "Keyword" && (
                          <div>
                            <Label className="block text-sm mb-1 font-normal">Value</Label>
                            <Input
                              name="value"
                              placeholder="Value"
                              value={
                                clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                  ?.value || ""
                              }
                              onChange={(event) => handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)}
                            />
                            <Label className="block text-sm mb-1 font-normal">
                              Enable to save the keyword value in a variable to be used by the bot
                            </Label>
                            <div className="flex items-center space-x-2 mx-2 mb-2">
                              <Switch
                                checked={
                                  clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                    ?.save || false
                                }
                                onCheckedChange={(checked) => {
                                  const event = { target: { name: "save", checked, type: "checkbox" } }
                                  handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)
                                }}
                                id={`save-switch-${index}-${innerIndex}`}
                              />
                              <Label htmlFor={`save-switch-${index}-${innerIndex}`} className="text-xs font-normal">
                                SAVE
                              </Label>
                            </div>
                            {clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.save && (
                              <>
                                <Label className="block text-sm mb-1 font-normal">Variable Name</Label>
                                <Input
                                  name="variableName"
                                  placeholder="Variable Name"
                                  value={
                                    clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                      ?.variableName || ""
                                  }
                                  onChange={(event) => handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)}
                                />
                              </>
                            )}
                          </div>
                        )}

                      {clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.choice ===
                        "AI NLP" && (
                          <div>
                            <Label className="block text-sm mb-1 font-normal">Intent</Label>
                            <SearchableSelect
                              name="intent"
                              options={intents.map((option) => ({ value: option, label: option }))}
                              value={
                                clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                  ?.intent || ""
                              }
                              onChange={(value) => {
                                handleRightDrawerAnyFormChange(
                                  { target: { name: "intent", value } },
                                  index,
                                  innerIndex,
                                  -1,
                                  true,
                                )
                              }}
                              placeholder="Select intent"
                              className="w-[93%] mx-2 mb-2 h-9 text-xs"
                            />

                            <div className="flex items-center justify-between px-2 py-1">
                              <Label className="text-sm font-normal">Add an entity to the condition</Label>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 bg-green-600 hover:bg-green-700 text-white"
                                onClick={(event) => handleRightDrawerAddInnerCounters(event, index, innerIndex)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Entity Fields */}
                            {Array.from(
                              Array(
                                clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                  ?.entities?.length || 0,
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
                                    options={entities.map((option) => ({ value: option, label: option }))}
                                    value={
                                      clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                        ?.entities[entityIndex]?.name || ""
                                    }
                                    onChange={(value) => {
                                      handleRightDrawerAnyFormChange(
                                        { target: { name: "name", value } },
                                        index,
                                        innerIndex,
                                        entityIndex,
                                        true,
                                      )
                                    }}
                                    placeholder="Select entity"
                                    className="w-[93%] mx-2 mb-2 h-9 text-xs"
                                  />

                                  {!clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                    ?.entities[entityIndex]?.any && (
                                      <>
                                        <Label className="block text-sm mb-1 font-normal">Value</Label>
                                        <Input
                                          name="value"
                                          placeholder="Value"
                                          value={
                                            clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[
                                              innerIndex
                                            ]?.entities[entityIndex]?.value || ""
                                          }
                                          onChange={(event) =>
                                            handleRightDrawerAnyFormChange(event, index, innerIndex, entityIndex, true)
                                          }
                                        />
                                      </>
                                    )}

                                  <Label className="block text-sm mb-1 font-normal">
                                    Or any value of the above entity
                                  </Label>
                                  <div className="flex items-center space-x-2 mx-2 mb-2">
                                    <Switch
                                      checked={
                                        clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                          ?.entities[entityIndex]?.any || false
                                      }
                                      onCheckedChange={(checked) => {
                                        const event = { target: { name: "any", checked, type: "checkbox" } }
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
                        )}

                      {clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.choice ===
                        "Variable" && (
                          <div>
                            <Label className="block text-sm mb-1 font-normal">Operator</Label>
                            <SearchableSelect
                              name="operator"
                              options={operations.map((option) => ({ value: option, label: option }))}
                              value={
                                clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                  ?.operator || "None"
                              }
                              onChange={(value) => {
                                handleRightDrawerAnyFormChange(
                                  { target: { name: "operator", value } },
                                  index,
                                  innerIndex,
                                  -1,
                                  true,
                                )
                              }}
                              placeholder="Select operator"
                              className="w-[93%] mx-2 mb-2 h-9 text-xs"
                            />
                            <Label className="block text-sm mb-1 font-normal">Value</Label>
                            <Input
                              name="value"
                              placeholder="Value"
                              value={
                                clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                  ?.value || ""
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

          {clickedElement.data.dynamicDataHandler?.length > 0 && (
            <Label className="block text-sm mb-1 font-normal">Add new condition</Label>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(event) => handleRightDrawerAddCounters(event, true)}
            className="mt-2"
          >

            {clickedElement.data.dynamicDataHandler?.length > 0 ? <><Plus className="h-4 w-4 mr-2" /> ADD</> : "ENABLE"}
          </Button>
        </>
      )}

      <LoopFromForm
        clickedElement={clickedElement}
        handleRightDrawerAnyFormChange={handleRightDrawerAnyFormChange}
      />
    </div>
  )
}
