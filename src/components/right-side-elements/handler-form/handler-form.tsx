"use client"

import axios from "axios"
import type * as React from "react"
import { useState } from "react"
import { SearchableSelect } from "../../custom/searchable-select"
import { Alert, AlertDescription } from "../../ui/alert"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Separator } from "../../ui/separator"
import { Switch } from "../../ui/switch"

interface HandlerFormProps {
  selectedNode: any
  handleRightSideDataUpdate: (
    id: string,
    value: any
  ) => void
  proxyUrl: string
  operations: string[]
  intents: string[]
  entities: string[]
}

let templateTimeOutId: NodeJS.Timeout
let debounceTimeoutId: NodeJS.Timeout

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

export default function HandlerForm({ selectedNode, handleRightSideDataUpdate, proxyUrl }: HandlerFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isLoadingQueues, setIsLoadingQueues] = useState(false)
  const [errorQueues, setErrorQueues] = useState(false)

  // Local state for form data
  const [localstateAttachment, setLocalstateAttachment] = useState(selectedNode.data.rightSideData || {})

  // Debounced function to update parent state
  const debounceStoreUpdate = (newFormData: any) => {
    if (debounceTimeoutId) clearTimeout(debounceTimeoutId)
    debounceTimeoutId = setTimeout(() => {
      handleRightSideDataUpdate(
        selectedNode.id,
        newFormData,
      )
    }, 500)
  }
  const updateLocalState = (name: string, value: any) => {
    const newFormData = { ...localstateAttachment, [name]: value }
    setLocalstateAttachment(newFormData)
    debounceStoreUpdate(newFormData)
  }

  function fetchQueues() {
    setIsLoadingQueues(true)
    axios({
      url: `${proxyUrl}/bot/listQueues`,
      method: "get",
    })
      .then((res) => {
        setErrorQueues(false)
        const queues = ["None", ...res.data.queues]
        updateLocalState("listOfQueues", queues)
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
        <Label className="block text-sm mb-2 font-normal">Reply to</Label>
        <SearchableSelect
          name="replyType"
          options={[
            { value: "any", label: "Any" },
            { value: "button", label: "Button (template)" },
            { value: "text", label: "Text" },
          ]}
          value={localstateAttachment.replyType || "any"}
          onChange={(value) => {
            updateLocalState("replyType", value)
          }}
          placeholder="Select reply type"
          className="w-[93%] mx-2 mb-2 h-9 text-xs"
        />
      </div>

      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={localstateAttachment.inactivity || false}
          onCheckedChange={(checked) => {
            updateLocalState("inactivity", checked)
          }}
          id="inactivity-switch"
        />
        <Label htmlFor="inactivity-switch" className="text-xs font-normal">
          Inactivity
        </Label>
      </div>

      {localstateAttachment.inactivity && (
        <>
          <div>
            <Label className="block text-sm mb-2 font-normal">Type</Label>
            <SearchableSelect
              name="type"
              options={[
                { value: "text", label: "Text" },
                { value: "handover", label: "Handover" },
              ]}
              value={localstateAttachment.type || "text"}
              onChange={(value) => {
                updateLocalState("type", value)
                if (localstateAttachment.listOfQueues && localstateAttachment.listOfQueues.length < 2) {
                  fetchQueues()
                }
              }}
              placeholder="Select type"
              className="w-[93%] mx-2 mb-2 h-9 text-xs"
            />
          </div>

          <div>
            <Label className="block text-sm mb-2 font-normal">Delay (minute)</Label>
            <Input
              type="number"
              name="delay"
              placeholder="Delay in minutes"
              value={localstateAttachment.delay || ""}
              onChange={(event) => updateLocalState("delay", event.target.value)}
            />
          </div>

          {localstateAttachment.type === "text" && (
            <div>
              <Label className="block text-sm mb-2 font-normal">Text</Label>
              <Input
                name="text"
                placeholder="Text"
                value={localstateAttachment.text || ""}
                onChange={(event) => updateLocalState("text", event.target.value)}
              />
            </div>
          )}

          {localstateAttachment.type === "handover" && (
            <div>
              <Label className="block text-sm mb-2 font-normal">Queues</Label>
              <SearchableSelect
                showRefresh
                loading={isLoadingQueues}
                onRefresh={fetchQueues}
                name="queueName"
                options={
                  localstateAttachment.listOfQueues?.length === 0
                    ? [{ value: "None", label: "None" }]
                    : localstateAttachment.listOfQueues?.map((item: string) => ({
                      value: item,
                      label: item,
                    })) || []
                }
                value={localstateAttachment.queueName || "None"}
                onChange={(value) => {
                  updateLocalState("queueName", value)
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

      {localstateAttachment.replyType === "text" && (
        <div>
          <Label className="block text-sm mb-2 font-normal">Text To Reply</Label>
          <Input
            name="replyToText"
            placeholder="Text To Reply"
            value={localstateAttachment.replyToText || ""}
            onChange={(event) => updateLocalState("replyToText", event.target.value)}
          />
        </div>
      )}

      {localstateAttachment.replyType === "button" && (
        <>
          <div>
            <Label className="block text-sm mb-2 font-normal">Access Token</Label>
            <Input
              name="accessToken"
              placeholder="Access Token"
              type="password"
              value={localstateAttachment.accessToken || ""}
              onChange={(event) => {
                const newValue = event.target.value
                updateLocalState("accessToken", newValue)

                clearTimeout(templateTimeOutId)
                templateTimeOutId = setTimeout(() => {
                  fetchTemplates(newValue, (value, name) => updateLocalState(name, value), setIsLoading, setError)
                }, 200)
              }}
            />
          </div>

          <div>
            <Label className="block text-sm mb-2 font-normal">Templates</Label>

            <SearchableSelect
              showRefresh
              loading={isLoading}
              onRefresh={() =>
                fetchTemplates(
                  localstateAttachment.accessToken,
                  (value, name) => {
                    updateLocalState(name, value)
                  },
                  setIsLoading,
                  setError,
                )
              }
              name="templateId"
              options={
                localstateAttachment.listOfTemplates?.length === 0
                  ? [{ value: "None", label: "None" }]
                  : localstateAttachment.listOfTemplates?.map((item: any) => ({
                    value: item.value,
                    label: item.option,
                  })) || []
              }
              value={localstateAttachment.templateId || "None"}
              onChange={(value) => {
                const template = localstateAttachment.listOfTemplates?.find(
                  (temp: any) => temp.value === value,
                )?.template
                const hasButtontype =
                  template && template.content.components.find((comp: any) => comp.type === "BUTTONS")

                if (value === "None" || !hasButtontype) {
                  updateLocalState("templateId", value)
                  setTimeout(() => {
                    updateLocalState("templateButton", "None")
                  }, 50)
                  setTimeout(() => {
                    updateLocalState("templateData", {})
                    updateLocalState("templateButtonList", [])
                  }, 100)
                  return
                }

                updateLocalState("templateId", value)
                setTimeout(() => {
                  updateLocalState("templateButtonList", [{ type: "None", text: "None" }, ...hasButtontype.buttons])
                  updateLocalState("templateData", template)
                }, 100)
              }}
              placeholder="Select template"
              className="w-[93%] mx-2 mb-2 h-9 text-xs"
              disabled={!localstateAttachment.accessToken}
            />

            {localstateAttachment.templateButtonList?.length === 0 && localstateAttachment.templateId !== "None" && (
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

          {localstateAttachment.templateButtonList?.length > 0 && (
            <div>
              <Label className="block text-sm mb-2 font-normal">Template button</Label>
              <SearchableSelect
                name="templateButton"
                options={
                  localstateAttachment.templateButtonList?.length === 0
                    ? [{ value: "None", label: "None" }]
                    : localstateAttachment.templateButtonList?.map((item: any) => ({
                      value: item.text,
                      label: item.text,
                    })) || []
                }
                value={localstateAttachment.templateButton || "None"}
                onChange={(value) => {
                  updateLocalState("templateButton", value)
                }}
                placeholder="Select button"
                className="w-[93%] mx-2 mb-2 h-9 text-xs"
              />
            </div>
          )}
        </>
      )}

      <div>
        <Label className="block text-sm mb-2 font-normal">Greet</Label>
        <Input
          name="greet"
          placeholder="Welcome message"
          value={localstateAttachment.greet || ""}
          onChange={(event) => updateLocalState("greet", event.target.value)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-2 font-normal">Restart</Label>
        <Input
          name="restart"
          placeholder="Message displayed when bot restarts"
          value={localstateAttachment.restart || ""}
          onChange={(event) => updateLocalState("restart", event.target.value)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-2 font-normal">Thank You</Label>
        <Input
          name="thankYou"
          placeholder="Message displayed when user thanks the bot"
          value={localstateAttachment.thankYou || ""}
          onChange={(event) => updateLocalState("thankYou", event.target.value)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-2 font-normal">Cancel</Label>
        <Input
          name="cancel"
          placeholder="Message displayed when user cancels conversation"
          value={localstateAttachment.cancel || ""}
          onChange={(event) => updateLocalState("cancel", event.target.value)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-2 font-normal">Bye</Label>
        <Input
          name="bye"
          placeholder="Message displayed when user says bye"
          value={localstateAttachment.bye || ""}
          onChange={(event) => updateLocalState("bye", event.target.value)}
        />
      </div>

      <Separator className="my-4" />

      <Label className="block text-sm mb-2 font-normal">
        Enable the bot to handle user messages before starting the conversation.
      </Label>
    </div>
  )
}
