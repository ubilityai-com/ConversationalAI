/**
 * Validation utility functions for forms
 */

import type { AutomationItem } from "../../types/automation-types"
import { removeHTMLTags } from "./string-utils"

/**
 * Checks if all items in an array are valid
 */
export function areAllValid(items: { valid: boolean }[]): boolean {
  return items.every((item) => item.valid)
}

/**
 * Validates extras configuration
 * Checks required fields and validates multiple/single items
 */
export function isExtrasValid(extras: Record<string, any>): boolean {
  for (const key in extras) {
    const item = extras[key]
    const isRequired = !item.optional

    // Skip optional disabled items
    if (!isRequired && !item.enabled) continue

    // Validate multiple items
    if (item.multiple) {
      const list = item.list || []
      if (isRequired && list.length === 0) return false
      if (!areAllValid(list)) return false
    } else {
      // Validate single item
      if (!item.valid) return false
    }
  }

  return true
}

/**
 * Validates the entire form configuration
 */
export function validateFormConfig(
  schema: any,
  config: any,
  options: {
    hasAI?: boolean
    hasCustom?: boolean
    customValidator?: (config: any) => boolean
  },
): boolean {
  const { hasAI, hasCustom, customValidator } = options

  // Validate extras if AI is enabled
  let extrasValid = true
  if (hasAI && config.extras) {
    extrasValid = isExtrasValid(config.extras)
  }

  // Validate node schema
  const nodeValid = validateArray(schema, config.json)

  // Validate custom component if present
  let customValid = true
  if (hasCustom && customValidator) {
    customValid = customValidator(config)
  }

  return nodeValid && extrasValid && customValid
}

type FormValues = Record<string, any>

/**
 * Validates an array of automation items against form values
 */
export function validateArray(items: AutomationItem[], values: FormValues): boolean {
  for (const item of items) {
    const { type, variableName, required } = item
    const value = values[variableName]

    switch (type) {
      case "dropdown":
      case "api":
        const options = item.options
        if (required && (value === "" || !value)) {
          return false
        }
        if (options && typeof value === "string" && options[value]) {
          if (!validateArray(options[value], values)) return false
        }
        break

      case "textfield":
      case "editor":
        if (required && (!value || !value.toString().trim())) return false
        break

      case "textFormatter":
        if (required && (!value || !removeHTMLTags(value).toString().trim())) return false
        break

      case "multiselect":
      case "array":
        if (required && (!Array.isArray(value) || value.length < 1)) return false
        break

      case "json":
        if (required && (!value || typeof value !== "object" || Object.keys(value).length < 1)) return false
        break

      case "radiobutton":
        if (options && typeof value === "string" && options[value]) {
          if (!validateArray(options[value], values)) return false
        }
        break

      case "dynamic":
        const json = item.json

        if (json) {
          if (json.required && values[json.variableName]?.length < 1) return false
          const structure = json.structure
          const valid = values[json.variableName].every((fieldList: FormValues) => validateArray(structure, fieldList))
          if (!valid) return false
        } else {
          if (required && values[variableName]?.length < 1) return false
          const structure = item.structure
          const valid = values[variableName].every((fieldList: FormValues) => validateArray(structure, fieldList))
          if (!valid) return false
        }
        break

      case "color":
        if (required && (!value || !value.toString().trim())) return false
        break

      default:
        break
    }
  }

  return true
}
