
import { useCallback, useRef } from "react"
import { UseValidatorRegistryReturn, ValidationResult, ValidatorFunction, ValidatorRegistry } from "../types/form-types"
import { FormFieldKey } from "../lib/constants/form-keys"
import { validateFormConfig } from "../lib/utils/validation-utils"

/**
 * Custom hook to manage validator registration and execution
 * Replaces the ref pattern with a proper hook-based approach
 */
export function useValidatorRegistry(schema: any, hasAI: boolean, hasCustom: boolean): UseValidatorRegistryReturn {
  const validatorsRef = useRef<ValidatorRegistry>({})

  const registerValidator = useCallback((key: string, validator: ValidatorFunction) => {
    validatorsRef.current[key] = validator
  }, [])

  const getValidator = useCallback((key: string) => {
    return validatorsRef.current[key]
  }, [])

  const validateAll = useCallback(
    (config: any): ValidationResult => {
      const customValidator = validatorsRef.current[FormFieldKey.CUSTOM]

      const isValid = validateFormConfig(schema, config, {
        hasAI,
        hasCustom,
        customValidator,
      })

      // Return detailed validation result
      return {
        isValid,
        nodeValid: true, // Could be extracted from validateFormConfig
        extrasValid: true, // Could be extracted from validateFormConfig
        customValid: true, // Could be extracted from validateFormConfig
      }
    },
    [schema, hasAI, hasCustom],
  )

  return {
    registerValidator,
    getValidator,
    validateAll,
  }
}
