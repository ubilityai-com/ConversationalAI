import type React from "react"
/**
 * Automation field type definitions
 * Comprehensive type system for dynamic form fields
 */

export enum AutomationFieldType {
  TEXT = "textfield",
  DROPDOWN = "dropdown",
  API = "api",
  CHECKBOX = "checkbox",
  RADIO_BUTTON = "radiobutton",
  MULTI_SELECT = "multiselect",
  COLOR = "color",
  FILE = "file",
  TEXT_FORMATTER = "textFormatter",
  EDITOR = "editor",
  ARRAY = "array",
  JSON = "json",
  DYNAMIC = "dynamic",
  ACCORDION = "accordion",
  ROW = "row",
  OUTPUT_JSON = "outputJson",
}

// Base interface for all automation items
export interface BaseAutomationItem {
  id?: string
  type: string
  variableName: string
  label?: string
  title?: string
  subTitle?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  errorSpan?: string
  helperSpan?: string
  description?: string
  placeholder?: string
  hasAI?: boolean
  hasDynamicVariable?: boolean
  rightSideInput?: boolean
  topDivider?: boolean
  validation?: string
  requiredWords?: string[]
  chatbotQuestion?: string
  defaultValue?: any
  value?: any
}

// Text field specific properties
export interface TextFieldItem extends BaseAutomationItem {
  type: "textfield"
  value: string
  multiline?: boolean
  minRows?: number
  maxLength?: number
  password?: boolean
  numberField?: boolean
  date?: boolean
  datetimeLocal?: boolean
  timeWithSeconds?: boolean
  typeOfValue?: "string" | "integer" | "float"
}

// Dropdown/Select specific properties
export interface DropdownItem extends BaseAutomationItem {
  type: "dropdown"
  value: string
  list: Array<{
    value: string
    option: string
    cred?: any
  }>
  multiselect?: boolean
  typeOfValue?: "string" | "integer" | "array"
  credential?: boolean
  child?: string[]
  noOpts?: boolean
  options?: Record<string, any>
}

// API field specific properties
export interface ApiItem extends BaseAutomationItem {
  type: "api"
  value: string
  list?: Array<{
    value: string
    option: string
    [key: string]: any
  }>
  multiselect?: boolean
  typeOfValue?: "string" | "integer" | "array"
  getValueFrom?: string
  child?: string[]
  options?: Record<string, any>
}

// Checkbox specific properties
export interface CheckboxItem extends BaseAutomationItem {
  type: "checkbox"
  value: boolean
  innerLabel?: string
  typeOfValue?: "string" | "boolean"
  tooltipEnableTitle?: string
  tooltipDisableTitle?: string
}

// Radio button specific properties
export interface RadioButtonItem extends BaseAutomationItem {
  type: "radiobutton"
  value: string
  list: Array<{
    value: string
    option: string
  }>
  child?: string[]
  options?: Record<string, any>
}

// Multi-select specific properties
export interface MultiSelectItem extends BaseAutomationItem {
  type: "multiselect"
  value: string[]
  list: Array<{
    value: string
    option: string
  }>
  disabledOption?: string[]
}

// Color picker specific properties
export interface ColorItem extends BaseAutomationItem {
  type: "color"
  value: string
}

// File upload specific properties
export interface FileItem extends BaseAutomationItem {
  type: "file"
  value: {
    file?: File
    url?: string
    name?: string
    size?: number
    type?: string
  }
}

// Text formatter/Rich text editor specific properties
export interface TextFormatterItem extends BaseAutomationItem {
  type: "textFormatter"
  value: string
  custom?: boolean
  formats?: Array<{
    type: string
    toSearch: string
    toReplace: string
  }>
}

// Code editor specific properties
export interface EditorItem extends BaseAutomationItem {
  type: "editor"
  value: string
  defaultLanguage?: "javascript" | "typescript" | "json" | "html" | "css" | "python" | "sql" | "yaml" | "xml"
  width?: string | number
  height?: string | number
  showExpandIcon?: boolean
  theme?: "light" | "dark"
}

// Array editor specific properties
export interface ArrayItem extends BaseAutomationItem {
  type: "array"
  value: any[]
  isArray: true
  theme?: "light" | "dark"
  stopAdd?: boolean
  onAdd?: () => void
  stopDelete?: boolean
  onDelete?: (index: number) => void
  stopEdit?: boolean
  onEdit?: (index: number, value: any) => void
  stopCopy?: boolean
  onCopy?: (index: number) => void
  stopClear?: boolean
  stopPaste?: boolean
  hasUseVariableIcon?: boolean
  changeCopyToAnotherRole?: boolean
}

// JSON editor specific properties
export interface JsonItem extends BaseAutomationItem {
  type: "json"
  value: Record<string, any>
  theme?: "light" | "dark"
  stopAdd?: boolean
  onAdd?: () => void
  stopDelete?: boolean
  onDelete?: (key: string) => void
  stopEdit?: boolean
  onEdit?: (key: string, value: any) => void
  stopCopy?: boolean
  onCopy?: (key: string) => void
  stopClear?: boolean
  stopPaste?: boolean
  hasUseVariableIcon?: boolean
  changeCopyToAnotherRole?: boolean
}

// Dynamic fields specific properties
export interface DynamicItem extends BaseAutomationItem {
  type: "dynamic"
  fieldsArray: AutomationItem[][] | string // Can be "##AI##" for AI mode
  structure: AutomationItem[]
  minSize?: number
  maxLength?: number
  innerButton?: boolean
  json?: {
    variableName: string
    structure: AutomationItem[]
    title: string
    fieldsArray: AutomationItem[][]
    required?: boolean
    minSize?: number
    innerButton?: boolean
  }
}

// Accordion specific properties
export interface AccordionItem extends BaseAutomationItem {
  type: "accordion"
  fieldsArray: AutomationItem[][]
  structure: AutomationItem[]
  accTitle?: string
  child?: string[]
}

// Row/Section specific properties
export interface RowItem extends BaseAutomationItem {
  type: "row"
  removeButton?: boolean
}

// Output JSON display specific properties
export interface OutputJsonItem extends BaseAutomationItem {
  type: "outputJson"
  value: Record<string, any>
  stopAdd?: boolean
  stopEdit?: boolean
  stopDelete?: boolean
}

// Union type for all automation items
export type AutomationItem =
  | TextFieldItem
  | DropdownItem
  | ApiItem
  | CheckboxItem
  | RadioButtonItem
  | MultiSelectItem
  | ColorItem
  | FileItem
  | TextFormatterItem
  | EditorItem
  | ArrayItem
  | JsonItem
  | DynamicItem
  | AccordionItem
  | RowItem
  | OutputJsonItem

interface CustomComponentProps {
  localConfig: Record<string, any>
  updateNestedConfig: (path: string, value: any) => void
  onValidate: (isValid: boolean) => void
  validator: any
}

export interface NodeConfigProps<T = Record<string, any>> {
  schema: any[]
  ai: boolean
  content: T
  onContentUpdate: (value: any, valid: boolean) => void
  validate: (isValid: boolean) => void
  CustomComponent?: React.ComponentType<CustomComponentProps>
  customValidate?: (val: any) => boolean
  selectedNodeId: string
  contentPath?: string
}

export const AI_PREFIX = "##AI##"
