import { Node, NodeProps } from "@xyflow/react";
import { ReactNode } from "react";

// Base interface for all automation items
export interface BaseAutomationItem {
  id?: string;
  type: string;
  variableName: string;
  label?: string;
  title?: string;
  subTitle?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  errorSpan?: string;
  helperSpan?: string;
  description?: string;
  placeholder?: string;
  hasAI?: boolean;
  hasDynamicVariable?: boolean;
  rightSideInput?: boolean;
  topDivider?: boolean;
  validation?: string;
  requiredWords?: string[];
  chatbotQuestion?: string;
  defaultValue?: any;
  value?: any;
}

// Text field specific properties
export interface TextFieldItem extends BaseAutomationItem {
  type: "textfield";
  value: string;
  multiline?: boolean;
  minRows?: number;
  maxLength?: number;
  password?: boolean;
  numberField?: boolean;
  date?: boolean;
  datetimeLocal?: boolean;
  timeWithSeconds?: boolean;
  typeOfValue?: "string" | "integer" | "float";
}

// Dropdown/Select specific properties
export interface DropdownItem extends BaseAutomationItem {
  type: "dropdown";
  value: string;
  list: Array<{
    value: string;
    option: string;
    cred?: any;
  }>;
  multiselect?: boolean;
  typeOfValue?: "string" | "integer" | "array";
  credential?: boolean;
  child?: string[];
  noOpts?: boolean;
  options?: Record<string, any>;
}

// API field specific properties
export interface ApiItem extends BaseAutomationItem {
  type: "api";
  value: string;
  list?: Array<{
    value: string;
    option: string;
    [key: string]: any;
  }>;
  multiselect?: boolean;
  typeOfValue?: "string" | "integer" | "array";
  getValueFrom?: string;
  child?: string[];
  options?: Record<string, any>;
}

// Checkbox specific properties
export interface CheckboxItem extends BaseAutomationItem {
  type: "checkbox";
  value: boolean;
  innerLabel?: string;
  typeOfValue?: "string" | "boolean";
  tooltipEnableTitle?: string;
  tooltipDisableTitle?: string;
}

// Radio button specific properties
export interface RadioButtonItem extends BaseAutomationItem {
  type: "radiobutton";
  value: string;
  list: Array<{
    value: string;
    option: string;
  }>;
  child?: string[];
  options?: Record<string, any>;
}

// Multi-select specific properties
export interface MultiSelectItem extends BaseAutomationItem {
  type: "multiselect";
  value: string[];
  list: Array<{
    value: string;
    option: string;
  }>;
  disabledOption?: string[];
}

// Color picker specific properties
export interface ColorItem extends BaseAutomationItem {
  type: "color";
  value: string;
}

// File upload specific properties
export interface FileItem extends BaseAutomationItem {
  type: "file";
  value: {
    file?: File;
    url?: string;
    name?: string;
    size?: number;
    type?: string;
  };
}

// Text formatter/Rich text editor specific properties
export interface TextFormatterItem extends BaseAutomationItem {
  type: "textFormatter";
  value: string;
  custom?: boolean;
  formats?: Array<{
    type: string;
    toSearch: string;
    toReplace: string;
  }>;
}

// Code editor specific properties
export interface EditorItem extends BaseAutomationItem {
  type: "editor";
  value: string;
  defaultLanguage?:
    | "javascript"
    | "typescript"
    | "json"
    | "html"
    | "css"
    | "python"
    | "sql"
    | "yaml"
    | "xml";
  width?: string | number;
  height?: string | number;
  showExpandIcon?: boolean;
  theme?: "light" | "dark";
}

// Array editor specific properties
export interface ArrayItem extends BaseAutomationItem {
  type: "array";
  value: any[];
  isArray: true;
  theme?: "light" | "dark";
  stopAdd?: boolean;
  onAdd?: () => void;
  stopDelete?: boolean;
  onDelete?: (index: number) => void;
  stopEdit?: boolean;
  onEdit?: (index: number, value: any) => void;
  stopCopy?: boolean;
  onCopy?: (index: number) => void;
  stopClear?: boolean;
  stopPaste?: boolean;
  hasUseVariableIcon?: boolean;
  changeCopyToAnotherRole?: boolean;
}

// JSON editor specific properties
export interface JsonItem extends BaseAutomationItem {
  type: "json";
  value: Record<string, any>;
  theme?: "light" | "dark";
  stopAdd?: boolean;
  onAdd?: () => void;
  stopDelete?: boolean;
  onDelete?: (key: string) => void;
  stopEdit?: boolean;
  onEdit?: (key: string, value: any) => void;
  stopCopy?: boolean;
  onCopy?: (key: string) => void;
  stopClear?: boolean;
  stopPaste?: boolean;
  hasUseVariableIcon?: boolean;
  changeCopyToAnotherRole?: boolean;
}

// Dynamic fields specific properties
export interface DynamicItem extends BaseAutomationItem {
  type: "dynamic";
  fieldsArray: AutomationItem[][] | string; // Can be "##AI##" for AI mode
  structure: AutomationItem[];
  minSize?: number;
  maxLength?: number;
  innerButton?: boolean;
  json?: {
    variableName: string;
    title: string;
    fieldsArray: AutomationItem[][];
    required?: boolean;
    minSize?: number;
    innerButton?: boolean;
  };
}

// Accordion specific properties
export interface AccordionItem extends BaseAutomationItem {
  type: "accordion";
  fieldsArray: AutomationItem[][];
  structure: AutomationItem[];
  accTitle?: string;
  child?: string[];
}

// Row/Section specific properties
export interface RowItem extends BaseAutomationItem {
  type: "row";
  removeButton?: boolean;
}

// Output JSON display specific properties
export interface OutputJsonItem extends BaseAutomationItem {
  type: "outputJson";
  value: Record<string, any>;
  stopAdd?: boolean;
  stopEdit?: boolean;
  stopDelete?: boolean;
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
  | OutputJsonItem;

// Props for the main AutomationSimple component
export interface AutomationSimpleProps {
  AllJson?: AutomationItem[];
  setAllJson?: (json: AutomationItem[]) => void;
  apiRes: AutomationItem[];
  setApiRes: (apiRes: AutomationItem[]) => void;
  flowZoneSelectedElement?: {
    id: string;
    type: string;
    data?: any;
    [key: string]: any;
  };
  onRemoveVariables?: (index: number) => void;
  InDynamic?: boolean;
  onChangeDynamicVariables?: (args: {
    index: number;
    event: any;
    innerIndex: number;
    name: string;
    keyToChange: string;
  }) => void;
  filledArray?: AutomationItem[][];
  indexForDynamic?: number;
  disabled?: boolean;
  [key: string]: any;
}

// Props for DynamicInputFields component
export interface DynamicInputFieldsProps {
  json: {
    type: string;
    variableName: string;
    title: string;
    fieldsArray: AutomationItem[] | string;
    structure: AutomationItem[];
    required?: boolean;
    minSize?: number;
    maxLength?: number;
    errorSpan?: string;
    hasAI?: boolean;
    innerButton?: boolean;
    [key: string]: any;
  };
  onChange: (args: { name: string; val: any }) => void;
  disabled?: boolean;
  flowZoneSelectedElement?: {
    id: string;
    type: string;
    data?: any;
    [key: string]: any;
  };
  level?: number;
  filledArray?: AutomationItem[][];
  title?: string;
  [key: string]: any;
}

// Validation function types
export type ValidationFunction = (item: AutomationItem) => boolean;

export type ValidationConditionFunction = (
  value: string,
  requiredWords?: string[]
) => string | null;

// Transform function types
export type TransformFunction = (
  item: AutomationItem,
  flowZoneSelectedID?: string,
  store?: any
) => Record<string, any>;

// Event handler types
export interface ChangeEvent {
  index: number;
  newValue: any;
  name: string | string[];
  variableName: string;
}

export interface DropdownChangeEvent extends ChangeEvent {
  children: string[];
  oldValue: string;
}

// Utility types for form state management
export interface FormState {
  items: AutomationItem[];
  isValid: boolean;
  errors: Record<string, string>;
  isDirty: boolean;
}

export interface FormActions {
  updateItem: (index: number, updates: Partial<AutomationItem>) => void;
  addItem: (item: AutomationItem) => void;
  removeItem: (index: number) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: () => Promise<void>;
}

// API response types
export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

// Configuration types
export interface AutomationConfig {
  enableValidation: boolean;
  enableAI: boolean;
  enableDynamicVariables: boolean;
  theme: "light" | "dark";
  language: string;
  maxFieldsPerDynamic: number;
  allowedFileTypes: string[];
  maxFileSize: number;
}

// Export utility type guards
export const isTextFieldItem = (item: AutomationItem): item is TextFieldItem =>
  item.type === "textfield";
export const isDropdownItem = (item: AutomationItem): item is DropdownItem =>
  item.type === "dropdown";
export const isApiItem = (item: AutomationItem): item is ApiItem =>
  item.type === "api";
export const isCheckboxItem = (item: AutomationItem): item is CheckboxItem =>
  item.type === "checkbox";
export const isRadioButtonItem = (
  item: AutomationItem
): item is RadioButtonItem => item.type === "radiobutton";
export const isMultiSelectItem = (
  item: AutomationItem
): item is MultiSelectItem => item.type === "multiselect";
export const isColorItem = (item: AutomationItem): item is ColorItem =>
  item.type === "color";
export const isFileItem = (item: AutomationItem): item is FileItem =>
  item.type === "file";
export const isTextFormatterItem = (
  item: AutomationItem
): item is TextFormatterItem => item.type === "textFormatter";
export const isEditorItem = (item: AutomationItem): item is EditorItem =>
  item.type === "editor";
export const isArrayItem = (item: AutomationItem): item is ArrayItem =>
  item.type === "array";
export const isJsonItem = (item: AutomationItem): item is JsonItem =>
  item.type === "json";
export const isDynamicItem = (item: AutomationItem): item is DynamicItem =>
  item.type === "dynamic";
export const isAccordionItem = (item: AutomationItem): item is AccordionItem =>
  item.type === "accordion";
export const isRowItem = (item: AutomationItem): item is RowItem =>
  item.type === "row";
export const isOutputJsonItem = (
  item: AutomationItem
): item is OutputJsonItem => item.type === "outputJson";

interface CustomComponentProps {
  localConfig: Record<string, any>;
  updateNestedConfig: (path: string, value: any) => void;
  onValidate: (isValid: boolean) => void;
  validator:any
}
export interface NodeConfigProps<T=Record<string,any>> {
  schema: any[];
  ai: boolean;
  content: T;
  onContentUpdate: (value: any) => void;
  validate: (isValid: boolean) => void;
  CustomComponent?: React.ComponentType<CustomComponentProps>;
  customValidate?:(val:any)=>boolean
  selectedNodeId: string;
}
