"use client"

import axios from "axios"
import { Loader2, Minus, Plus } from 'lucide-react'
import type * as React from "react"
import { useState } from "react"
import { SearchableSelect } from "../../custom/searchable-select"
import { Alert, AlertDescription } from "../../ui/alert"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Separator } from "../../ui/separator"
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

interface HandlerFormProps {
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
  proxyUrl: string
  operations: string[]
  intents: string[]
  entities: string[]
}

let templateTimeOutId: NodeJS.Timeout

const fetchTemplates = async (
  accessToken: string,
  handleChange: (value: any, name: string) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!accessToken) return
  setIsLoading(true)
  try {
    // This is a placeholder for the actual API call
    // In a real implementation, you would make an API call to fetch templates
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            templates: [
              { value: "template1", option: "Template 1", template: { content: { components: [] } } },
              { value: "template2", option: "Template 2", template: { content: { components: [] } } },
            ],
          },
        })
      }, 500)
    })

    // @ts-ignore - This is a mock response
    handleChange(["None", ...response.data.templates], "listOfTemplates")
    setError(false)
  } catch (error) {
    setError(true)
  } finally {
    setIsLoading(false)
  }
}

export default function HandlerForm({
  clickedElement,
  handleRightDrawerAnyFormChange,
  handleRightDrawerSubtractCounters,
  handleRightDrawerAddCounters,
  handleRightDrawerAddInnerCounters,
  handleRightDrawerSubtractInnerCounters,
  handleRightDrawerCheckIfAINLPIsChosenInBefore,
  proxyUrl,
  operations,
  intents,
  entities,
}: HandlerFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isLoadingQueues, setIsLoadingQueues] = useState(false)
  const [errorQueues, setErrorQueues] = useState(false)

  function fetchQueues() {
    setIsLoadingQueues(true)
    axios({
      url: `${proxyUrl}/bot/listQueues`,
      method: "get",
    })
      .then((res) => {
        setErrorQueues(false)
        handleRightDrawerAnyFormChange(
          {
            target: {
              value: ["None", ...res.data.queues],
              name: "listOfQueues",
            },
          },
          -1,
          -1,
          -1,
          false,
        )
      })
      .catch(() => {
        setErrorQueues(true)
      })
      .finally(() => {
        setIsLoadingQueues(false)
      })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm mb-1 font-normal">Reply to</Label>
        <SearchableSelect
          name="replyType"
          options={[
            { value: "any", label: "Any" },
            { value: "button", label: "Button (template)" },
            { value: "text", label: "Text" },
          ]}
          value={clickedElement.data.replyType || "any"}
          onChange={(value) => {
            handleRightDrawerAnyFormChange({ target: { name: "replyType", value } }, -1, -1, -1, false)
          }}
          placeholder="Select reply type"
          className="w-[93%] mx-2 mb-2 h-9 text-xs"
        />
      </div>

      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={clickedElement.data.inactivity || false}
          onCheckedChange={(checked) => {
            const event = { target: { name: "inactivity", checked, type: "checkbox" } }
            handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
          }}
          id="inactivity-switch"
        />
        <Label htmlFor="inactivity-switch" className="text-xs font-normal">
          Inactivity
        </Label>
      </div>

      {clickedElement.data.inactivity && (
        <>
          <div>
            <Label className="block text-sm mb-1 font-normal">Type</Label>
            <SearchableSelect
              name="type"
              options={[
                { value: "text", label: "Text" },
                { value: "handover", label: "Handover" },
              ]}
              value={clickedElement.data.type || "text"}
              onChange={(value) => {
                handleRightDrawerAnyFormChange({ target: { name: "type", value } }, -1, -1, -1, false)
                if (clickedElement.data.listOfQueues && clickedElement.data.listOfQueues.length < 2) {
                  fetchQueues()
                }
              }}
              placeholder="Select type"
              className="w-[93%] mx-2 mb-2 h-9 text-xs"
            />
          </div>

          <div>
            <Label className="block text-sm mb-1 font-normal">Delay (minute)</Label>
            <Input
              type="number"
              name="delay"
              placeholder="Delay in minutes"

              value={clickedElement.data.delay || ""}
              onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
            />
          </div>

          {clickedElement.data.type === "text" && (
            <div>
              <Label className="block text-sm mb-1 font-normal">Text</Label>
              <Input
                name="text"
                placeholder="Text"

                value={clickedElement.data.text || ""}
                onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
              />
            </div>
          )}

          {clickedElement.data.type === "handover" && (
            <div>
              <Label className="block text-sm mb-1 font-normal">Queues</Label>
              <SearchableSelect
                showRefresh
                loading={isLoadingQueues}
                onRefresh={fetchQueues}
                name="queueName"
                options={
                  clickedElement.data.listOfQueues?.length === 0
                    ? [{ value: "None", label: "None" }]
                    : clickedElement.data.listOfQueues?.map((item: string) => ({
                      value: item,
                      label: item,
                    })) || []
                }
                value={clickedElement.data.queueName || "None"}
                onChange={(value) => {
                  handleRightDrawerAnyFormChange({ target: { name: "queueName", value } }, -1, -1, -1, false)
                }}
                placeholder="Select queue"
                className="w-[93%] mx-2 mb-2 h-9 text-xs"
                disabled={isLoadingQueues}
              />

              {errorQueues && (
                <Alert variant="destructive" className="mb-2 mt-2 py-2">
                  <AlertDescription>An error has occurred. Try again.</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </>
      )}

      {clickedElement.data.replyType === "text" && (
        <div>
          <Label className="block text-sm mb-1 font-normal">Text To Reply</Label>
          <Input
            name="replyToText"
            placeholder="Text To Reply"
            value={clickedElement.data.replyToText || ""}
            onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
          />
        </div>
      )}

      {clickedElement.data.replyType === "button" && (
        <>
          <div>
            <Label className="block text-sm mb-1 font-normal">Access Token</Label>
            <Input
              name="accessToken"
              placeholder="Access Token"
              type="password"

              value={clickedElement.data.accessToken || ""}
              onChange={(event) => {
                const newValue = event.target.value
                clearTimeout(templateTimeOutId)
                templateTimeOutId = setTimeout(() => {
                  fetchTemplates(
                    newValue,
                    (value, name) => handleRightDrawerAnyFormChange({ target: { value, name } }, -1, -1, -1, false),
                    setIsLoading,
                    setError,
                  )
                }, 200)
                handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
              }}
            />
          </div>

          <div >
            <Label className="block text-sm mb-1 font-normal">Templates</Label>

            <SearchableSelect
              showRefresh
              loading={isLoading}
              onRefresh={() =>
                fetchTemplates(
                  clickedElement.data.accessToken,
                  (value, name) => {
                    handleRightDrawerAnyFormChange({ target: { value, name } }, -1, -1, -1, false)
                  },
                  setIsLoading,
                  setError,
                )
              }
              name="templateId"
              options={
                clickedElement.data.listOfTemplates?.length === 0
                  ? [{ value: "None", label: "None" }]
                  : clickedElement.data.listOfTemplates?.map((item: any) => ({
                    value: item.value,
                    label: item.option,
                  })) || []
              }
              value={clickedElement.data.templateId || "None"}
              onChange={(value) => {
                const template = clickedElement.data.listOfTemplates?.find((temp: any) => temp.value === value)?.template
                const hasButtontype = template && template.content.components.find((comp: any) => comp.type === "BUTTONS")
                if (value === "None" || !hasButtontype) {
                  handleRightDrawerAnyFormChange({ target: { name: "templateId", value } }, -1, -1, -1, false)
                  setTimeout(() => {
                    handleRightDrawerAnyFormChange(
                      { target: { value: "None", name: "templateButton" } },
                      -1,
                      -1,
                      -1,
                      false,
                    )
                  }, 50)
                  setTimeout(() => {
                    handleRightDrawerAnyFormChange({ target: { value: {}, name: "templateData" } }, -1, -1, -1, false)
                    handleRightDrawerAnyFormChange(
                      { target: { value: [], name: "templateButtonList" } },
                      -1,
                      -1,
                      -1,
                      false,
                    )
                  }, 100)
                  return
                }
                handleRightDrawerAnyFormChange({ target: { name: "templateId", value } }, -1, -1, -1, false)
                setTimeout(() => {
                  handleRightDrawerAnyFormChange(
                    {
                      target: {
                        value: [{ type: "None", text: "None" }, ...hasButtontype.buttons],
                        name: "templateButtonList",
                      },
                    },
                    -1,
                    -1,
                    -1,
                    false,
                  )
                  handleRightDrawerAnyFormChange({ target: { value: template, name: "templateData" } }, -1, -1, -1, false)
                }, 100)
              }}
              placeholder="Select template"
              className="w-[93%] mx-2 mb-2 h-9 text-xs"
              disabled={!clickedElement.data.accessToken}
            />
            {clickedElement.data.templateButtonList?.length === 0 && clickedElement.data.templateId !== "None" && (
              <p className="text-xs text-red-500 mx-2 mb-2">
                The current template does not support button type. Please choose another one.
              </p>
            )}

            {error && (
              <p className="text-xs text-red-500 mx-2 mb-2">
                Please fill in valid credentials or check your network connection and try again.
              </p>
            )}
          </div>

          {clickedElement.data.templateButtonList?.length > 0 && (
            <div>
              <Label className="block text-sm mb-1 font-normal">Template button</Label>
              <SearchableSelect
                name="templateButton"
                options={
                  clickedElement.data.templateButtonList?.length === 0
                    ? [{ value: "None", label: "None" }]
                    : clickedElement.data.templateButtonList?.map((item: any) => ({
                      value: item.text,
                      label: item.text,
                    })) || []
                }
                value={clickedElement.data.templateButton || "None"}
                onChange={(value) => {
                  clickedElement.data.templateButton = value
                  handleRightDrawerAnyFormChange({ target: { name: "templateButton", value } }, -1, -1, -1, false)
                }}
                placeholder="Select button"
                className="w-[93%] mx-2 mb-2 h-9 text-xs"
              />
            </div>
          )}
        </>
      )}

      <div>
        <Label className="block text-sm mb-1 font-normal">Greet</Label>
        <Input
          name="greet"
          placeholder="Welcome message"
          value={clickedElement.data.greet || ""}
          onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-1 font-normal">Restart</Label>
        <Input
          name="restart"
          placeholder="Message displayed when bot restarts"
          value={clickedElement.data.restart || ""}
          onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-1 font-normal">Thank You</Label>
        <Input
          name="thankYou"
          placeholder="Message displayed when user thanks the bot"
          value={clickedElement.data.thankYou || ""}
          onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-1 font-normal">Cancel</Label>
        <Input
          name="cancel"
          placeholder="Message displayed when user cancels conversation"
          value={clickedElement.data.cancel || ""}
          onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-1 font-normal">Bye</Label>
        <Input
          name="bye"
          placeholder="Message displayed when user says bye"
          value={clickedElement.data.bye || ""}
          onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
        />
      </div>

      <Separator className="my-4" />

      <Label className="block text-sm mb-1 font-normal">
        Enable the bot to handle user messages before starting the conversation.
      </Label>

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
                        (clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler?.length || 0) - 1 && (
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
                              onClick={(event) => handleRightDrawerSubtractInnerCounters(event, index, innerIndex, -1)}
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
                      clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.choice || ""
                    }
                    onChange={(value) => {
                      handleRightDrawerAnyFormChange({ target: { name: "choice", value } }, index, innerIndex, -1, true)
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
                            clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.value || ""
                          }
                          onChange={(event) => handleRightDrawerAnyFormChange(event, index, innerIndex, -1, true)}
                        />
                        <Label className="block text-sm mb-1 font-normal">
                          Enable to save the keyword value in a variable to be used by the bot
                        </Label>
                        <div className="flex items-center space-x-2 mx-2 mb-2">
                          <Switch
                            checked={
                              clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.save ||
                              false
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
                          options={intents.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          value={
                            clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.intent ||
                            ""
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
                            clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.entities
                              ?.length || 0,
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
                                        clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]
                                          ?.entities[entityIndex]?.value || ""
                                      }
                                      onChange={(event) =>
                                        handleRightDrawerAnyFormChange(event, index, innerIndex, entityIndex, true)
                                      }
                                    />
                                  </>
                                )}

                              <Label className="block text-sm mb-1 font-normal">Or any value of the above entity</Label>
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
                          options={operations.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          value={
                            clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.operator ||
                            "None"
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
                            clickedElement.data.dynamicDataHandler[index].innerDynamicDataHandler[innerIndex]?.value || ""
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
    </div>
  )
}