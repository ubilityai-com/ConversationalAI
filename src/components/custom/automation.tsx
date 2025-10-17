import { AlertCircle, Upload } from "lucide-react";
import { Fragment, useCallback } from "react";
import {
  getAutomationListValues,
  selectedOptionKeys
} from "../../lib/automation-utils";
import { cn, omitKeys } from "../../lib/utils/utils";
import { ApiItem, AutomationFieldType, AutomationItem, CheckboxItem, ColorItem, DropdownItem, DynamicItem, EditorItem, FileItem, MultiSelectItem, RadioButtonItem, TextFieldItem, TextFormatterItem } from "../../types/automation-types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { MultiSelect } from "../ui/multi-select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import ApiCaller from "./async-dropdown";
import DynamicFields from "./dynamic-fields";
import { FieldWrapper } from "./field-wrapper";
import { JsonEditor } from "./json-editor";
import { Editor } from "./quill-editor-with-variables";
import { SearchableSelect } from "./searchable-select";
/**
 * Gets the value for a single field from the fieldValues object
 */
export function getFieldValue(item: AutomationItem, fieldValues: Record<string, any>): any {
  if (!item.variableName) return undefined
  return fieldValues[item.variableName]
}

/**
 * Gets the value for dynamic  fields from the fieldValues object
 * Returns an array of field value objects for nested dynamic fields
 */
export function getDynamicFieldValue(item: DynamicItem, fieldValues: Record<string, any>): any[] {
  if (
    fieldValues &&
    item.variableName &&
    fieldValues.hasOwnProperty(item.variableName)
  ) {
    return fieldValues[item.variableName];
  }
  return item.json
    ? fieldValues[item.json.variableName]
    : [];
}

interface AutomationSimpleProps {
  filledDataName: string
  flowZoneSelectedId: string
  schema: AutomationItem[]
  inDynamic?: boolean
  indexForDynamic?: number
  disabled?: boolean
  fieldValues?: Record<string, any>
  onFieldChange: (partialState: Record<string, any>, replace?: boolean) => void
  path?: string
}

export default function AutomationSimple({
  schema,
  inDynamic = false,
  indexForDynamic = 0,
  disabled = false,
  filledDataName,
  flowZoneSelectedId,
  fieldValues = {},
  onFieldChange,
  path = "",
}: AutomationSimpleProps) {
  // ========================================
  // FIELD UPDATE HANDLER
  // ========================================
  const onChangeAutomationSimple = useCallback(
    (partialState: Record<string, any>, replace = false) => {
      onFieldChange(partialState, replace)
    },
    [onFieldChange],
  )

  // ========================================
  // FIELD HEADER & METADATA RENDERERS
  // ========================================
  const renderFieldHeader = useCallback(
    (item: AutomationItem) => {
      if (!item.title || item.type === AutomationFieldType.DYNAMIC || inDynamic) {
        return null
      }

      return (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold bg-muted px-3 py-2 rounded-md">{item.title}</h3>
          {item.topDivider && <Separator />}
        </div>
      )
    },
    [inDynamic],
  )

  const renderFieldSubtitle = useCallback((item: AutomationItem) => {
    if (!item.subTitle) return null

    return (
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-muted-foreground">{item.subTitle}</h4>
      </div>
    )
  }, [])

  const renderFieldError = useCallback((item: AutomationItem) => {
    if (!item.errorSpan) return null

    return (
      <p className="text-xs text-red-500 flex items-center gap-1">
        <AlertCircle className="h-3 w-3" />
        {item.errorSpan}
      </p>
    )
  }, [])

  const renderHelperText = useCallback((item: AutomationItem) => {
    if (!item.helperSpan) return null

    return <p className="text-xs text-muted-foreground">{item.helperSpan}</p>
  }, [])

  // ========================================
  // TEXT-BASED INPUT FIELD RENDERER
  // ========================================
  const renderTextFields = useCallback(
    (item: TextFieldItem, commonProps: any, fieldValue: any) => {
      return (
        <div className="space-y-2">
          <FieldWrapper
            field={item}
            value={fieldValue || ""}
            onChange={(newValue) => {
              onChangeAutomationSimple({
                [item.variableName]: newValue,
              })
            }}
            variableName={item.variableName}
          >
            {item.multiline ? (
              <Textarea
                placeholder={item.placeholder}
                value={fieldValue || ""}
                onChange={(e) =>
                  onChangeAutomationSimple({
                    [item.variableName]: e.target.value,
                  })
                }
                rows={item.minRows}
                className={cn("min-h-[80px]", item.errorSpan && "border-red-500")}
                {...commonProps}
              />
            ) : (
              <Input
                type={item.password ? "password" : item.numberField ? "number" : item.date ? "date" : "text"}
                placeholder={item.placeholder}
                value={fieldValue || ""}
                onChange={(e) =>
                  onChangeAutomationSimple({
                    [item.variableName]: e.target.value,
                  })
                }
                maxLength={item.maxLength}
                className={cn(item.errorSpan && "border-red-500")}
                {...commonProps}
              />
            )}
          </FieldWrapper>
          {renderHelperText(item)}
          {renderFieldError(item)}
        </div>
      )
    },
    [onChangeAutomationSimple, renderHelperText, renderFieldError],
  )

  // ========================================
  // SELECTION FIELD RENDERERS
  // ========================================
  const renderDropdownField = useCallback(
    (item: DropdownItem, commonProps: any, fieldValue: any, index: number) => {
      const dropdownOptions =
        item.list?.map((opt) => ({
          value: opt.value,
          label: opt.option,
        })) || []

      return (
        <div className="space-y-2">
          <FieldWrapper
            field={item}
            value={fieldValue || ""}
            onChange={(newValue) => {
              onChangeAutomationSimple({
                [item.variableName]: newValue,
              })
            }}
            variableName={item.variableName}
          >
            <SearchableSelect
              options={dropdownOptions}
              value={fieldValue || ""}
              onChange={(newValue) => {
                console.log({ newValue, item, fieldValue });

                if (item.options) {
                  let oldOptionKeys: string[] = []
                  if (item.options.hasOwnProperty(fieldValue))
                    oldOptionKeys = selectedOptionKeys(item.options[fieldValue], fieldValues)
                  let newOptionKeys = {}
                  if (typeof newValue === "string" && item.options.hasOwnProperty(newValue))
                    newOptionKeys = getAutomationListValues(item.options[newValue])
                  console.log({ oldOptionKeys, newOptionKeys });

                  const updatedValues = {
                    ...omitKeys(fieldValues, oldOptionKeys),
                    [item.variableName]: newValue,
                    ...newOptionKeys,
                  }

                  onChangeAutomationSimple(updatedValues, true)
                } else {
                  onChangeAutomationSimple({
                    [item.variableName]: newValue,
                  })
                }
              }}
              placeholder={`Select ${item.label?.toLowerCase()}`}
              className={cn(item.errorSpan && "border-red-500")}
              {...commonProps}
            />
          </FieldWrapper>
          {renderHelperText(item)}
          {!item.value && renderFieldError(item)}
          {/* Render nested options if dropdown has conditional fields */}
          {item.options && item.options.hasOwnProperty(fieldValue) && (
            <AutomationSimple
              filledDataName={filledDataName}
              flowZoneSelectedId={flowZoneSelectedId}
              schema={item.options[fieldValue as string]}
              fieldValues={fieldValues}
              onFieldChange={onFieldChange}
              path={path ? `${path}.${index}.${item.variableName}` : `${index}.${item.variableName}`}
            />
          )}
        </div>
      )
    },
    [
      onChangeAutomationSimple,
      fieldValues,
      renderHelperText,
      renderFieldError,
      filledDataName,
      flowZoneSelectedId,
      onFieldChange,
      path,
    ],
  )

  const renderRadioField = useCallback(
    (item: RadioButtonItem, commonProps: any, fieldValue: any, index: number) => {
      return (
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            {item.label}
            {item.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <RadioGroup
            value={fieldValue || ""}
            onValueChange={(value) =>
              onChangeAutomationSimple({
                [item.variableName]: value,
              })
            }
            {...commonProps}
          >
            {item.list?.map((option, optIndex: number) => (
              <div key={optIndex} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`radio-${index}-${optIndex}`} />
                <Label htmlFor={`radio-${index}-${optIndex}`} className="text-sm">
                  {option.option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )
    },
    [onChangeAutomationSimple],
  )

  const renderMultiSelectField = useCallback(
    (item: MultiSelectItem, fieldValue: any) => {
      const multiselectValue = Array.isArray(fieldValue) ? fieldValue : []

      return (
        <div className="space-y-2">
          <MultiSelect
            options={item.list}
            selected={multiselectValue}
            onChange={(selected) =>
              onChangeAutomationSimple({
                [item.variableName]: selected,
              })
            }
            placeholder={item.placeholder || "Select options"}
          />
        </div>
      )
    },
    [onChangeAutomationSimple],
  )

  // ========================================
  // SPECIAL INPUT FIELD RENDERERS
  // ========================================
  const renderApiField = useCallback(
    (item: ApiItem, fieldValue: any) => {
      const shouldShowInDynamic = inDynamic && indexForDynamic === 0

      return (
        <div className="space-y-2">
          <FieldWrapper
            field={item}
            value={fieldValue || ""}
            variableName={item.variableName}
            onChange={(newValue) => {
              onChangeAutomationSimple({
                [item.variableName]: newValue,
              })
            }}
          >
            <ApiCaller
              inDynamic={shouldShowInDynamic}
              disabled={disabled}
              apiJson={item}
              value={fieldValue}
              filledDataName={filledDataName}
              onChange={({ val }) => {
                onChangeAutomationSimple({
                  [item.variableName]: val,
                })
              }}
              flowZoneSelectedId={flowZoneSelectedId}
              helperSpan={item.helperSpan}
              multiSelect={item.multiselect}
            />
          </FieldWrapper>
        </div>
      )
    },
    [inDynamic, indexForDynamic, disabled, filledDataName, flowZoneSelectedId, onChangeAutomationSimple],
  )

  const renderCheckboxField = useCallback(
    (item: CheckboxItem, commonProps: any, fieldValue: any, index: number) => {
      return (
        <div className="flex items-center flex-1">
          <FieldWrapper
            field={item}
            inlineLabel
            variableName={item.variableName}
            value={fieldValue || false}
            onChange={(newValue) => {
              onChangeAutomationSimple({
                [item.variableName]: newValue,
              })
            }}
            className="flex-1"
          >
            <Checkbox
              id={`checkbox-${index}`}
              checked={fieldValue || false}
              onCheckedChange={(checked) =>
                onChangeAutomationSimple({
                  [item.variableName]: checked,
                })
              }
              {...commonProps}
            />
          </FieldWrapper>
        </div>
      )
    },
    [onChangeAutomationSimple],
  )

  const renderColorField = useCallback(
    (item: ColorItem, commonProps: any, fieldValue: any) => {
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {item.label}
            {item.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            type="color"
            value={fieldValue || "#000000"}
            onChange={(e) =>
              onChangeAutomationSimple({
                [item.variableName]: e.target.value,
              })
            }
            className="w-12 h-10 p-1 border rounded"
            {...commonProps}
          />
        </div>
      )
    },
    [onChangeAutomationSimple],
  )

  const renderFileField = useCallback((item: FileItem, commonProps: any) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {item.label}
          {item.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <Button variant="outline" {...commonProps}>
              Choose File
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500">Upload a file</p>
        </div>
      </div>
    )
  }, [])

  // ========================================
  // EDITOR FIELD RENDERERS
  // ========================================
  const renderJsonEditorField = useCallback(
    (item: EditorItem, commonProps: any, fieldValue: any) => {
      return (
        <div className="space-y-2">
          <JsonEditor
            language={item.defaultLanguage}
            value={fieldValue || ""}
            onChange={(value: any) =>
              onChangeAutomationSimple({
                [item.variableName]: value,
              })
            }
            {...commonProps}
          />
          {renderHelperText(item)}
          {renderFieldError(item)}
        </div>
      )
    },
    [onChangeAutomationSimple, renderHelperText, renderFieldError],
  )

  const renderTextFormatterField = useCallback(
    (item: TextFormatterItem, fieldValue: any) => {
      const editorFormats = item.formats?.map((elt) => elt.type) || []

      return (
        <div className="space-y-2">
          <div className="custom-editor w-full mb-2">
            <Editor
              variableName={item.variableName}
              formats={editorFormats}
              value={fieldValue || ""}
              onChange={(value: any) => {
                onChangeAutomationSimple({
                  [item.variableName]: value,
                })
              }}
            />
          </div>
          {renderHelperText(item)}
          {renderFieldError(item)}
        </div>
      )
    },
    [onChangeAutomationSimple, renderHelperText, renderFieldError],
  )

  // ========================================
  // CONTAINER FIELD RENDERERS
  // ========================================
  const renderDynamicField = useCallback(
    (item: DynamicItem, commonProps: any) => {
      const dynamicValue = getDynamicFieldValue(item, fieldValues)
      const dynamicJson = item.hasOwnProperty("json")
        ? { ...item.json, fieldsArray: dynamicValue }
        : { ...item, fieldsArray: dynamicValue }

      return (
        <div className="space-y-2">
          <DynamicFields
            json={dynamicJson}
            filledDataName={filledDataName}
            onFieldChange={onChangeAutomationSimple}
            filledArray={dynamicValue}
            flowZoneSelectedId={flowZoneSelectedId}
            path={`${path}.${item.variableName}`}
            {...commonProps}
          />
        </div>
      )
    },
    [fieldValues, filledDataName, onChangeAutomationSimple, flowZoneSelectedId, path],
  )

  const renderAccordionField = useCallback(
    (item: any, commonProps: any, index: number) => {
      const accordionValue = getFieldValue(item, fieldValues)
      return (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="text-sm font-medium">{item.accTitle || item.title}</AccordionTrigger>
            <AccordionContent>
              <DynamicFields
                filledDataName={filledDataName}
                json={item}
                onFieldChange={onChangeAutomationSimple}
                filledArray={[accordionValue]}
                flowZoneSelectedId={flowZoneSelectedId}
                path={`${path}.${item.variableName}`}
                {...commonProps}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    },
    [fieldValues, filledDataName, onChangeAutomationSimple, flowZoneSelectedId, path],
  )

  // ========================================
  // MAIN FIELD RENDERER
  // ========================================
  const renderField = useCallback(
    (item: AutomationItem, index: number) => {
      const commonProps = {
        disabled: item.disabled || disabled,
        required: item.required,
        name: item.variableName,
      }

      const fieldValue = getFieldValue(item, fieldValues)

      switch (item.type) {
        case AutomationFieldType.TEXT:
          return renderTextFields(item, commonProps, fieldValue)

        case AutomationFieldType.DROPDOWN:
          return renderDropdownField(item, commonProps, fieldValue, index)

        case AutomationFieldType.RADIO_BUTTON:
          return renderRadioField(item, commonProps, fieldValue, index)

        case AutomationFieldType.MULTI_SELECT:
          return renderMultiSelectField(item, fieldValue)

        case AutomationFieldType.API:
          return renderApiField(item, fieldValue)

        case AutomationFieldType.CHECKBOX:
          return renderCheckboxField(item, commonProps, fieldValue, index)

        case AutomationFieldType.COLOR:
          return renderColorField(item, commonProps, fieldValue)

        case AutomationFieldType.FILE:
          return renderFileField(item, commonProps)

        case AutomationFieldType.EDITOR:
          return renderJsonEditorField(item, commonProps, fieldValue)

        case AutomationFieldType.TEXT_FORMATTER:
          return renderTextFormatterField(item, fieldValue)

        case AutomationFieldType.DYNAMIC:
          return renderDynamicField(item, commonProps)

        case AutomationFieldType.ACCORDION:
          return renderAccordionField(item, commonProps, index)

        case AutomationFieldType.ROW:
          return null

        default:
          return (
            <div className="p-4 border border-dashed border-gray-300 rounded-lg">
              <p className="text-sm text-gray-500">Unsupported field type: {item.type}</p>
            </div>
          )
      }
    },
    [
      disabled,
      fieldValues,
      renderTextFields,
      renderDropdownField,
      renderRadioField,
      renderMultiSelectField,
      renderApiField,
      renderCheckboxField,
      renderColorField,
      renderFileField,
      renderJsonEditorField,
      renderTextFormatterField,
      renderDynamicField,
      renderAccordionField,
    ],
  )

  // ========================================
  // MAIN RENDER
  // ========================================
  return (
    <div className="space-y-2">
      {schema.map((item, index) => (
        <Fragment key={item.id || index}>
          {renderFieldHeader(item)}
          {renderFieldSubtitle(item)}
          {renderField(item, index)}
        </Fragment>
      ))}
    </div>
  )
}
