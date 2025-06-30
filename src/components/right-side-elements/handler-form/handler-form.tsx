import { Node, NodeProps } from "@xyflow/react"
import axios from "axios"
import type * as React from "react"
import { useState } from "react"
import { useDebounceConfig } from "../../../hooks/use-debounced-config"
import { SearchableSelect } from "../../custom/searchable-select"
import { Alert, AlertDescription } from "../../ui/alert"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Separator } from "../../ui/separator"
import { Switch } from "../../ui/switch"
interface RightSideData {
  replyType?: "any" | "button" | "text";
  inactivity?: boolean;
  type?: "text" | "handover";
  delay?: string | number;
  text?: string;
  listOfQueues?: string[];
  queueName?: string;
  replyToText?: string;
  accessToken?: string;
  listOfTemplates?: Array<{
    value: string;
    option: string;
    template: {
      content: {
        components: Array<{
          type: string;
          buttons?: Array<{
            type: string;
            text: string;
          }>;
        }>;
      };
    };
  }>;
  templateId?: string;
  templateButton?: string;
  templateButtonList?: Array<{
    type: string;
    text: string;
  }>;
  templateData?: Record<string, any>;
  greet?: string;
  restart?: string;
  thankYou?: string;
  cancel?: string;
  bye?: string;
}
interface HandlerConfigProps extends Record<string, unknown> {
  /* node.data passed from <PropertiesPanel /> */
  label: string
  description: string
  rightSideData: RightSideData
}
interface HandlerFormProps {
  selectedNode: NodeProps<Node<HandlerConfigProps>>
  handleRightSideDataUpdate: (
    value: any
  ) => void
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

export default function HandlerForm({ selectedNode, handleRightSideDataUpdate }: HandlerFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isLoadingQueues, setIsLoadingQueues] = useState(false)
  const [errorQueues, setErrorQueues] = useState(false)
  const { localConfig, updateConfigField, updateNestedConfig } = useDebounceConfig<HandlerConfigProps["rightSideData"]>(
    selectedNode.data.rightSideData,
    {
      delay: 300,
      onSave: (savedConfig) => {
        // Save label changes
        handleRightSideDataUpdate(savedConfig)

      },
    },
  )
  const proxyUrl = ""
  function fetchQueues() {
    setIsLoadingQueues(true)
    axios({
      url: `${proxyUrl}/bot/listQueues`,
      method: "get",
    })
      .then((res) => {
        setErrorQueues(false)
        const queues = ["None", ...res.data.queues]
        updateNestedConfig("listOfQueues", queues)
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
          value={localConfig.replyType || "any"}
          onChange={(value) => {
            updateNestedConfig("replyType", value)
          }}
          placeholder="Select reply type"
          className="w-[93%] mx-2 mb-2 h-9 text-xs"
        />
      </div>

      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={localConfig.inactivity || false}
          onCheckedChange={(checked) => {
            updateNestedConfig("inactivity", checked)
          }}
          id="inactivity-switch"
        />
        <Label htmlFor="inactivity-switch" className="text-xs font-normal">
          Inactivity
        </Label>
      </div>

      {localConfig.inactivity && (
        <>
          <div>
            <Label className="block text-sm mb-2 font-normal">Type</Label>
            <SearchableSelect
              name="type"
              options={[
                { value: "text", label: "Text" },
                { value: "handover", label: "Handover" },
              ]}
              value={localConfig.type || "text"}
              onChange={(value) => {
                updateNestedConfig("type", value)
                if (localConfig.listOfQueues && localConfig.listOfQueues.length < 2) {
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
              value={localConfig.delay || ""}
              onChange={(event) => updateNestedConfig("delay", event.target.value)}
            />
          </div>

          {localConfig.type === "text" && (
            <div>
              <Label className="block text-sm mb-2 font-normal">Text</Label>
              <Input
                name="text"
                placeholder="Text"
                value={localConfig.text || ""}
                onChange={(event) => updateNestedConfig("text", event.target.value)}
              />
            </div>
          )}

          {localConfig.type === "handover" && (
            <div>
              <Label className="block text-sm mb-2 font-normal">Queues</Label>
              <SearchableSelect
                showRefresh
                loading={isLoadingQueues}
                onRefresh={fetchQueues}
                name="queueName"
                options={
                  localConfig.listOfQueues?.length === 0
                    ? [{ value: "None", label: "None" }]
                    : localConfig.listOfQueues?.map((item: string) => ({
                      value: item,
                      label: item,
                    })) || []
                }
                value={localConfig.queueName || "None"}
                onChange={(value) => {
                  updateNestedConfig("queueName", value)
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

      {localConfig.replyType === "text" && (
        <div>
          <Label className="block text-sm mb-2 font-normal">Text To Reply</Label>
          <Input
            name="replyToText"
            placeholder="Text To Reply"
            value={localConfig.replyToText || ""}
            onChange={(event) => updateNestedConfig("replyToText", event.target.value)}
          />
        </div>
      )}

      {localConfig.replyType === "button" && (
        <>
          <div>
            <Label className="block text-sm mb-2 font-normal">Access Token</Label>
            <Input
              name="accessToken"
              placeholder="Access Token"
              type="password"
              value={localConfig.accessToken || ""}
              onChange={(event) => {
                const newValue = event.target.value
                updateNestedConfig("accessToken", newValue)

                clearTimeout(templateTimeOutId)
                templateTimeOutId = setTimeout(() => {
                  fetchTemplates(newValue, (value, name) => updateNestedConfig(name, value), setIsLoading, setError)
                }, 200)
              }}
            />
          </div>

          <div>
            <Label className="block text-sm mb-2 font-normal">Templates</Label>

            <SearchableSelect
              showRefresh
              loading={isLoading}
              onRefresh={() => {
                if (localConfig.accessToken)
                  fetchTemplates(
                    localConfig.accessToken,
                    (value, name) => {
                      updateNestedConfig(name, value)
                    },
                    setIsLoading,
                    setError,
                  )
              }
              }
              name="templateId"
              options={
                localConfig.listOfTemplates?.length === 0
                  ? [{ value: "None", label: "None" }]
                  : localConfig.listOfTemplates?.map((item: any) => ({
                    value: item.value,
                    label: item.option,
                  })) || []
              }
              value={localConfig.templateId || "None"}
              onChange={(value) => {
                const template = localConfig.listOfTemplates?.find(
                  (temp: any) => temp.value === value,
                )?.template
                const hasButtontype =
                  template && template.content.components.find((comp: any) => comp.type === "BUTTONS")

                if (value === "None" || !hasButtontype) {
                  updateNestedConfig("templateId", value)
                  setTimeout(() => {
                    updateNestedConfig("templateButton", "None")
                  }, 50)
                  setTimeout(() => {
                    updateNestedConfig("templateData", {})
                    updateNestedConfig("templateButtonList", [])
                  }, 100)
                  return
                }

                updateNestedConfig("templateId", value)
                setTimeout(() => {
                  if (hasButtontype.buttons) {
                    updateNestedConfig("templateButtonList", [{ type: "None", text: "None" }, ...hasButtontype.buttons])
                    updateNestedConfig("templateData", template)
                  }
                }, 100)
              }}
              placeholder="Select template"
              className="w-[93%] mx-2 mb-2 h-9 text-xs"
              disabled={!localConfig.accessToken}
            />

            {localConfig.templateButtonList?.length === 0 && localConfig.templateId !== "None" && (
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

          {localConfig.templateButtonList && localConfig.templateButtonList?.length > 0 && (
            <div>
              <Label className="block text-sm mb-2 font-normal">Template button</Label>
              <SearchableSelect
                name="templateButton"
                options={
                  localConfig.templateButtonList?.length === 0
                    ? [{ value: "None", label: "None" }]
                    : localConfig.templateButtonList?.map((item: any) => ({
                      value: item.text,
                      label: item.text,
                    })) || []
                }
                value={localConfig.templateButton || "None"}
                onChange={(value) => {
                  updateNestedConfig("templateButton", value)
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
          value={localConfig.greet || ""}
          onChange={(event) => updateNestedConfig("greet", event.target.value)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-2 font-normal">Restart</Label>
        <Input
          name="restart"
          placeholder="Message displayed when bot restarts"
          value={localConfig.restart || ""}
          onChange={(event) => updateNestedConfig("restart", event.target.value)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-2 font-normal">Thank You</Label>
        <Input
          name="thankYou"
          placeholder="Message displayed when user thanks the bot"
          value={localConfig.thankYou || ""}
          onChange={(event) => updateNestedConfig("thankYou", event.target.value)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-2 font-normal">Cancel</Label>
        <Input
          name="cancel"
          placeholder="Message displayed when user cancels conversation"
          value={localConfig.cancel || ""}
          onChange={(event) => updateNestedConfig("cancel", event.target.value)}
        />
      </div>

      <div>
        <Label className="block text-sm mb-2 font-normal">Bye</Label>
        <Input
          name="bye"
          placeholder="Message displayed when user says bye"
          value={localConfig.bye || ""}
          onChange={(event) => updateNestedConfig("bye", event.target.value)}
        />
      </div>

      <Separator className="my-4" />

      <Label className="block text-sm mb-2 font-normal">
        Enable the bot to handle user messages before starting the conversation.
      </Label>
    </div>
  )
}
