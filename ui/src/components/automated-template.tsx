

import { useCallback, useMemo } from "react"
import { useDebounceConfig } from "../hooks/use-debounced-config"
import { formatAutomationListValues, parseAutomationListValues } from "../lib/automation-utils"
import { FormFieldKey } from "../lib/constants/form-keys"
import type { NodeConfigProps } from "../types/automation-types"
import AutomationSimple from "./custom/automation"
import { DynamicElementLoader } from "./properties/shared/DynamicElementLoader"
import { validateFormConfig } from "../lib/utils/validation-utils"
import { useValidatorRegistry } from "../hooks/use-validator-registry"

export default function TemplateForm({
  schema,
  content,
  onContentUpdate,
  validate,
  selectedNodeId,
  ai,
  CustomComponent,
  contentPath,
}: NodeConfigProps) {
  const { registerValidator, validateAll } = useValidatorRegistry(schema, !!ai, !!CustomComponent)

  const extrasKeys = useMemo(() => {
    return Object.keys(content.extras || {})
  }, [content.extras])

  const { localConfig, updateNestedConfig } = useDebounceConfig<typeof content>(
    {
      ...content,
      json: formatAutomationListValues(schema, content.json),
    },
    {
      delay: 300,
      onSave: (savedConfig) => {
        const isValid = validateFormConfig(schema, savedConfig, {
          hasAI: !!ai,
          hasCustom: !!CustomComponent,
          customValidator: validateAll(savedConfig).isValid ? undefined : () => false,
        })

        validate(isValid)
        onContentUpdate(
          {
            ...savedConfig,
            json: parseAutomationListValues(schema, savedConfig.json),
          },
          isValid,
        )
      },
    },
  )

  const extras = localConfig.extras || {}

  const handleFieldChange = useCallback(
    (partialState: any, replace?: boolean) => {
      const updateOptions = replace ? { replace: true } : undefined
      updateNestedConfig(FormFieldKey.JSON, partialState, updateOptions)
    },
    [updateNestedConfig],
  )

  // Placeholder for validation callback
  const onValidate = useCallback(() => {}, [])

  return (
    <div className="space-y-6">
      <AutomationSimple
        filledDataName={contentPath ? `${contentPath}.json` : FormFieldKey.JSON}
        schema={schema}
        fieldValues={localConfig.json}
        flowZoneSelectedId={selectedNodeId}
        onFieldChange={handleFieldChange}
      />

      {CustomComponent && (
        <CustomComponent
          validator={(validator: any) => registerValidator(FormFieldKey.CUSTOM, validator)}
          localConfig={localConfig}
          updateNestedConfig={updateNestedConfig}
          onValidate={onValidate}
        />
      )}

      {ai &&
        extrasKeys.map((key) => (
          <DynamicElementLoader
            validators={(validators: any) => registerValidator(FormFieldKey.VALIDATORS, validators)}
            key={key}
            extrasKey={key}
            extrasConfig={extras[key]}
            localConfig={localConfig.extras[key]}
            selectedNodeId={selectedNodeId}
            updateNestedConfig={updateNestedConfig}
          />
        ))}
    </div>
  )
}
