/**
 * Constants for form field keys
 */
export enum FormFieldKey {
    JSON = "json",
    CUSTOM = "custom",
    VALIDATORS = "validators",
    EXTRAS = "extras",
  }
  
  /**
   * Form field paths for nested config updates
   */
  export const FORM_PATHS = {
    JSON: FormFieldKey.JSON,
    CUSTOM: FormFieldKey.CUSTOM,
    VALIDATORS: FormFieldKey.VALIDATORS,
    EXTRAS: FormFieldKey.EXTRAS,
  } as const
  