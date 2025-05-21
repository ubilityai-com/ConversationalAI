import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useFlowStore } from "../store/flow-store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
interface DropdownItem {
  type: "dropdown";
  value: string;
  typeOfValue?: "integer" | "array" | string;
  variableName: string;
  options?: Record<string, ApiResItem[]>;
}

interface DynamicItem {
  type: "dynamic";
  variableName: string;
  fieldsArray: ApiResItem[][];
  json?: {
    variableName: string;
    fieldsArray: ApiResItem[][];
  };
}

interface TextFieldItem {
  type: "textfield" | "textFormatter";
  value: string;
  typeOfValue?: "integer" | "float" | string;
  variableName: string;
  required?: boolean,
  maxLength?: number
}

export type ApiResItem = DropdownItem | DynamicItem | TextFieldItem;

export const objToReturnDynamic = (apiRes: ApiResItem[]): Record<string, any> => {
  let obj: Record<string, any> = {};

  apiRes.forEach((item1) => {
    if (item1.type === "dropdown") {
      if (item1.value !== "None") {
        if (item1.typeOfValue === "integer") {
          obj = { ...obj, [item1.variableName]: parseInt(item1.value) || item1.value };
        } else if (item1.typeOfValue === "array") {
          obj = { ...obj, [item1.variableName]: [item1.value] };
        } else {
          obj = { ...obj, [item1.variableName]: item1.value };
        }

        if (item1.options) {
          Object.keys(item1.options).forEach((item20) => {
            if (item1.options && item1.value === item20) {
              obj = {
                ...obj,
                ...objToReturnDynamic(item1.options[item1.value]),
              };
            }
          });
        }
      }
    }

    if (item1.type === "dynamic") {
      const variableName = item1.hasOwnProperty("json")
        ? (item1 as DynamicItem).json!.variableName
        : item1.variableName;

      const fieldsArray = item1.hasOwnProperty("json")
        ? (item1 as DynamicItem).json!.fieldsArray
        : item1.fieldsArray;

      obj = {
        ...obj,
        [variableName]: fieldsArray.map(arr => objToReturnDynamic(arr)),
      };
    }

    if (item1.type === "textfield" || item1.type === "textFormatter") {
      if (item1.typeOfValue === "integer") {
        obj = { ...obj, [item1.variableName]: parseInt(item1.value) || item1.value };
      } else if (item1.typeOfValue === "float") {
        obj = { ...obj, [item1.variableName]: parseFloat(item1.value) };
      } else {
        obj = { ...obj, [item1.variableName]: item1.value };
      }
    }
  });

  return obj;
};
/**
 * Checks if all nodes in the flow have their required connections
 * @returns Boolean indicating whether all nodes are properly connected
 */
export function handleFlowZoneCheckIfAllHandlesAreConnected() {
  // Get nodes and edges from the flow store
  const { nodes, edges } = useFlowStore.getState()

  let allAreConnected = true
  console.log({ nodes, edges });

  nodes.forEach((element) => {
    console.log({ element, allAreConnected });

    if (element.type === 'Handler') {
      let allAreSources = true

      let isDefaultSource = edges.find(edge => ((element.id === edge.source) && edge.sourceHandle === '0'))
      console.log({ isDefaultSource });

      if (!isDefaultSource) {
        allAreSources = false
      }

      element.data.dynamicDataHandler.forEach((elt: any, index: number) => {
        let isSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

        if (!isSource) {
          allAreSources = false
        }
      })

      if (!allAreSources) {
        allAreConnected = false
      }
    }
    else if (element.type === 'RPAList' || element.type === 'Card') {
      let isSource = false
      edges.forEach((edge) => {
        if ((element.id === edge.source)) {
          isSource = true
        }
      })

      if (!isSource) {
        allAreConnected = false
      }

      let isTarget = false
      edges.forEach((edge) => {
        if ((element.id === edge.target)) {
          isTarget = true
        }
      })

      if (!isTarget) {
        allAreConnected = false
      }
    }
    else if (element.type === 'Message' || element.type === 'DatePrompt' || element.type === 'NumberPrompt') {
      let allAreSources = true

      let isDefaultSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')

      if (!isDefaultSource) {
        allAreSources = false
      }
      element.data.dynamicDataHandler.forEach((elt: any, index: number) => {
        let isSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

        if (!isSource) {
          allAreSources = false
        }
      })

      if (!allAreSources) {
        allAreConnected = false
      }

      let isTarget = edges.find(edge => (element.id === edge.target))

      if (!isTarget) {
        allAreConnected = false
      }
    }
    else if (element.type === 'ConfirmPrompt' || element.type === 'KnowledgeBase') {
      let isSourceOnHandle0 = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')
      let isSourceOnHandle1 = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '1')

      if (!isSourceOnHandle0 || !isSourceOnHandle1) {
        allAreConnected = false
      }

      let isTarget = edges.find(edge => (element.id === edge.target))

      if (!isTarget) {
        allAreConnected = false
      }
    }
    else if (element.type === 'ChoicePrompt') {
      let allAreSources = true

      element.data.formData.forEach((elt: any, index: number) => {
        let isSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

        if (!isSource) {
          allAreSources = false
        }
      })

      let isDefaultSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')

      if (!isDefaultSource) {
        allAreSources = false
      }

      element.data.dynamicDataHandler.forEach((elt: any, index: number) => {
        let isSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === 'h-' + (index + 1))

        if (!isSource) {
          allAreSources = false
        }
      })

      if (!allAreSources) {
        allAreConnected = false
      }

      let isTarget = edges.find(edge => (element.id === edge.target))

      if (!isTarget) {
        allAreConnected = false
      }
    }
    else if (element.type === 'WebListCard') {
      let allAreSources = true

      element.data.formData.forEach((elt: any, index: number) => {
        let isSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

        if (!isSource) {
          allAreSources = false
        }
      })

      let isDefaultSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')

      if (!isDefaultSource) {
        allAreSources = false
      }

      element.data.dynamicDataHandler.forEach((elt: any, index: number) => {
        let isSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === 'h-' + (index + 1))

        if (!isSource) {
          allAreSources = false
        }
      })

      if (!allAreSources) {
        allAreConnected = false
      }

      let isTarget = edges.find(edge => (element.id === edge.target))

      if (!isTarget) {
        allAreConnected = false
      }
    }
    else if (element.type === 'ListCard') {
      let allAreSources = true

      element.data.formData.forEach((elt: any, index: number) => {
        if (!elt.urlSwitch) {
          let isSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

          if (!isSource) {
            allAreSources = false
          }
        }
      })

      let isDefaultSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')

      if (!isDefaultSource) {
        allAreSources = false
      }

      element.data.dynamicDataHandler.forEach((elt: any, index: number) => {
        let isSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === 'h-' + (index + 1))

        if (!isSource) {
          allAreSources = false
        }
      })

      if (!allAreSources) {
        allAreConnected = false
      }

      let isTarget = edges.find(edge => (element.id === edge.target))

      if (!isTarget) {
        allAreConnected = false
      }
    }
    else if (element.type === 'End') {
      let isTarget = edges.find(edge => (element.id === edge.target))

      if (!isTarget) {
        allAreConnected = false
      }
    }
    else if (element.type === 'RPA') {
      let allAreSources = true

      if (element.data.outputs) {
        if (Object.keys(element.data.outputs).length > 0) {
          // eslint-disable-next-line
          Array.from(Array(Object.keys(element.data.outputs).length), (e, index) => {
            let isSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === index + '')

            if (!isSource) {
              allAreSources = false
            }
          })

          if (!allAreSources) {
            allAreConnected = false
          }
        }
        else {
          let isSource = edges.find(edge => (element.id === edge.source))

          if (!isSource) {
            allAreSources = false
          }

          if (!allAreSources) {
            allAreConnected = false
          }
        }
      }

      let isTarget = edges.find(edge => (element.id === edge.target))

      if (!isTarget) {
        allAreConnected = false
      }
    }
    else if (element.type === 'Switch') {
      let allAreSources = true
      const finaleObj = objToReturnDynamic(element.data.json)

      finaleObj.conditions.forEach((_: any, index: number) => {
        let isSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

        if (!isSource) {
          allAreSources = false
        }
      })

      let isDefaultSource = edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')

      if (!isDefaultSource) {
        allAreSources = false
      }

      if (!allAreSources) {
        allAreConnected = false
      }

      let isTarget = edges.find(edge => (element.id === edge.target))

      if (!isTarget) {
        allAreConnected = false
      }
    }
  })

  return allAreConnected
}

// Assuming these helper functions exist (you should also type these)
declare function checkLength(value: string, maxLength: number): boolean;
declare function removeHTMLTags(html: string): string;

export const validateArray = (apiRes: ApiResItem[]): boolean => {
  let valid = true;

  apiRes.forEach((item1) => {
    if (!valid) return; // Early exit if already invalid

    if (item1.type === "dropdown") {
      if (item1.value === "None") {
        valid = false;
      } else if (item1.options) {
        Object.keys(item1.options).forEach((item20) => {
          if (item1.options && item1.value === item20) {
            valid = validateArray(item1.options[item1.value]);
          }
        });
      }
    }
    else if (item1.type === "textfield") {
      const textField = item1 as TextFieldItem;
      if (textField.required && !textField.value.toString().trim()) {
        valid = false;
      }
      if (textField.maxLength !== undefined && checkLength(textField.value.toString(), textField.maxLength)) {
        valid = false;
      }
    }
    else if (item1.type === "textFormatter") {
      const textFormatter = item1 as TextFieldItem;
      const textFormatterValue = removeHTMLTags(textFormatter.value);
      if (textFormatter.required && !textFormatterValue.trim()) {
        valid = false;
      }
      if (textFormatter.maxLength !== undefined && checkLength(textFormatter.value, textFormatter.maxLength)) {
        valid = false;
      }
    }
    else if (item1.type === "dynamic") {
      const dynamicItem = item1 as DynamicItem;
      const fieldsArray = dynamicItem.json?.fieldsArray || dynamicItem.fieldsArray;

      if (fieldsArray.length < 1) {
        valid = false;
      } else {
        fieldsArray.forEach((field) => {
          if (valid) {
            valid = validateArray(field);
          }
        });
      }
    }
  });

  return valid;
};