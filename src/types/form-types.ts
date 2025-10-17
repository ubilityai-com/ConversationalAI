/**
 * Type definitions for template forms
 */

export type ValidatorFunction = (config: any) => boolean

export interface ValidatorRegistry {
  [key: string]: ValidatorFunction
}

export interface ValidationResult {
  isValid: boolean
  nodeValid: boolean
  extrasValid: boolean
  customValid: boolean
}

export interface ExtrasItem {
  valid: boolean
  optional?: boolean
  enabled?: boolean
  multiple?: boolean
  list?: { valid: boolean }[]
}

export interface ExtrasConfig {
  [key: string]: ExtrasItem
}

export interface TemplateFormConfig {
  json: any
  extras?: ExtrasConfig
  [key: string]: any
}

export interface UseValidatorRegistryReturn {
  registerValidator: (key: string, validator: ValidatorFunction) => void
  getValidator: (key: string) => ValidatorFunction | undefined
  validateAll: (config: any) => ValidationResult
}
