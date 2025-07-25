import { Edge, Node } from "@xyflow/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useFlowStore } from "../store/flow-store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
interface DropdownItem {
  id: string
  type: "dropdown";
  value: string;
  typeOfValue?: "integer" | "array" | string;
  variableName: string;
  options?: Record<string, ApiResItem[]>;
}

interface DynamicItem {
  id: string
  type: "dynamic";
  variableName: string;
  fieldsArray: ApiResItem[][];
  json?: {
    variableName: string;
    fieldsArray: ApiResItem[][];
  };
}

interface TextFieldItem {
  id: string
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
// declare function removeHTMLTags(html: string): string;




export const getValueOptions = (apiRes: DropdownItem[], children: string[] = []): any => {
  let ch: string[] = [...children];
  let a: any = apiRes;

  apiRes.every((item1: DropdownItem, index: number) => {
    if (ch.length > 0) {
      if (item1.type === "dropdown") {
        if ((Array.isArray(ch) && ch.length > 1) || ch.length === 1) {
          if (
            item1.hasOwnProperty("options") &&
            item1.options?.hasOwnProperty(ch[0])
          ) {
            const oldElt: string = ch[0];
            ch = ch.slice(1);
            if (item1.options && ch.length > 0) {
              a = getValueOptions(item1.options[oldElt] as DropdownItem[], ch);
            } else {
              a = item1.options[oldElt];
            }
          } else {
            a = [];
          }
        }
      }
      return true;
    } else {
      return false;
    }
  });
  return a;
};
export function insertArrayAtIndex<T>(originalArray: T[], index: number, newArray: T[]): T[] {
  // Create a new array by spreading the items before the index,
  // then adding the items from the new array,
  // and finally, spreading the items after the index.
  const result: T[] = [
    ...originalArray.slice(0, index),
    ...newArray,
    ...originalArray.slice(index),
  ];

  return result;
}
export function keyBy<T extends Record<string, any>, K extends keyof T>(
  list: T[],
  key: K
): Record<string, T> {
  return list.reduce((acc, item) => {
    const mapKey = String(item[key]);
    acc[mapKey] = item;
    return acc;
  }, {} as Record<string, T>);
}
export function isPlainObject<T extends any>(value: T) {
  return typeof (value) === "object" && !Array.isArray(value)
}


type OptionMap = Record<string, FormItem[]>;

interface FormItem {
  type: string;
  variableName: string;
  required?: boolean;
  multiselect?: boolean;
  options?: OptionMap;
  json?: {
    required?: boolean;
    fieldsArray: FormItem[];
  };
  fieldsArray?: FormItem[];
}

type FormValues = Record<string, any>;

export const validateArray = (items: FormItem[], values: FormValues): boolean => {
  for (const item of items) {
    const { type, variableName, required, multiselect, options, json, fieldsArray } = item;
    const value = values[variableName];
    console.log({ item, value, values });

    switch (type) {
      case "dropdown":
      case "api":
        if ((required && (value === "None" || !value)) || (required && multiselect && Array.isArray(value) && value.length === 0)) {
          return false;
        }
        if (options && typeof value === "string" && options[value]) {
          if (!validateArray(options[value], values)) return false;
        }
        break;

      case "textfield":
      case "editor":
        if (required && (!value || !value.toString().trim())) return false;
        break;
      case "textFormatter":
        if (required && (!value || !removeHTMLTags(value).toString().trim())) return false;
        break;
      case "multiselect":
      case "array":
        if (required && (!Array.isArray(value) || value.length < 1)) return false;
        break;

      case "json":
        if (required && (!value || typeof value !== "object" || Object.keys(value).length < 1)) return false;
        break;

      case "radiobutton":
        if (options && typeof value === "string" && options[value]) {
          if (!validateArray(options[value], values)) return false;
        }
        break;

      case "dynamic":
        if (json) {
          if (json.required && json.fieldsArray.length < 1) return false;
          if (!validateArray(json.fieldsArray, values)) return false;
        } else {
          if (required && (!fieldsArray || fieldsArray.length < 1)) return false;
          if (!validateArray(fieldsArray!, values)) return false;
        }
        break;

      case "color":
        if (required && (!value || !value.toString().trim())) return false;
        break;

      default:
        break;
    }
  }

  return true;
};
export function removeHTMLTags(htmlCode: string): string {
  const withoutHTMLTags = htmlCode.replace(/<[^>]*>/g, '');
  return withoutHTMLTags.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
export function camelToDashCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}
export const generateRandomString = (length = 32): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }
  return result
}

export function getNextNodeId(
  nodeId: string,
  edges: Edge[],
  nodes: Node[],
  handleId?: string | null
): string | null {
  const foundEdge = edges.find(
    edge => edge.source === nodeId && (!handleId || edge.sourceHandle === handleId)
  );

  if (!foundEdge) return null;

  const nextNode = nodes.find(node => node.id === foundEdge.target);

  return nextNode?.type === "End" ? null : foundEdge.target;
}


export function stringifyAndExtractVariables(json: unknown): string[] | null {
  const jsonString = JSON.stringify(json, null, 2);

  const regex = /\$\{([^}]+)\}/g;
  const variables = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = regex.exec(jsonString)) !== null) {
    variables.add(match[1]);
  }

  const result = Array.from(variables);
  return result.length === 0 ? null : result;
}
export function extractCreds(obj: any): string[] {
  const creds: string[] = [];

  for (const key in obj) {
    const item = obj[key];

    if (item.multiple) {
      if (Array.isArray(item.list)) {
        item.list.forEach((listItem: any) => {
          const cred = listItem?.content?.json?.cred;
          if (cred) {
            creds.push(cred);
          }
        });
      }
    } else {
      const cred = item?.content?.cred;
      if (cred) {
        creds.push(cred);
      }
    }
  }

  return creds;
}

interface NodeType {
  id: string;
  type: string;
  data: any;
}

interface EdgeType {
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}


export function checkIfAllNodesConnected(nodes: NodeType[], edges: EdgeType[]): boolean {

  // Build maps for fast lookup
  const incomingEdgesMap = new Map<string, EdgeType[]>();
  const outgoingEdgesMap = new Map<string, EdgeType[]>();
  const outgoingEdgesByHandle = new Map<string, Set<string>>();

  edges.forEach((edge) => {
    if (!incomingEdgesMap.has(edge.target)) {
      incomingEdgesMap.set(edge.target, []);
    }
    incomingEdgesMap.get(edge.target)!.push(edge);

    if (!outgoingEdgesMap.has(edge.source)) {
      outgoingEdgesMap.set(edge.source, []);
    }
    outgoingEdgesMap.get(edge.source)!.push(edge);

    const handleMapKey = `${edge.source}`;
    if (!outgoingEdgesByHandle.has(handleMapKey)) {
      outgoingEdgesByHandle.set(handleMapKey, new Set());
    }
    outgoingEdgesByHandle.get(handleMapKey)!.add(edge.sourceHandle ?? "default");
  });

  for (const node of nodes) {
    const incoming = incomingEdgesMap.get(node.id) ?? [];
    const outgoing = outgoingEdgesMap.get(node.id) ?? [];

    if (node.type === "Handler") {
      // Should have at least 1 outgoing edge
      if (outgoing.length === 0) {
        console.warn(`Node ${node.id} of type Handler has no outgoing connections.`);
        return false;
      }
    } else if (node.type === "End") {
      // Should have at least 1 incoming edge
      if (incoming.length === 0) {
        console.warn(`Node ${node.id} of type End has no incoming connections.`);
        return false;
      }
    } else if (node.type === "ChoicePrompt") {
      // Must have at least 1 incoming edge
      if (incoming.length === 0) {
        console.warn(`Node ${node.id} of type ChoicePrompt has no incoming connections.`);
        return false;
      }
      // Must have outgoing edges for all choices + "choice-default"
      const choiceIds: string[] = (node.data?.rightSideData?.choices ?? []).map(
        (choice: any) => choice.id
      );
      const requiredHandles = new Set([...choiceIds, "choice-default"]);
      const connectedHandles = outgoing
        .map((edge) => edge.sourceHandle ?? "default")
        .filter((handle) => handle !== null);

      for (const handle of requiredHandles) {
        if (!connectedHandles.includes(handle)) {
          console.warn(
            `Node ${node.id} of type ChoicePrompt is missing outgoing connection for handle: ${handle}`
          );
          return false;
        }
      }
    } else {
      // Default: should have at least 1 incoming and 1 outgoing edge
      if (incoming.length === 0) {
        console.warn(`Node ${node.id} of type ${node.type} has no incoming connections.`);
        return false;
      }
      if (outgoing.length === 0) {
        console.warn(`Node ${node.id} of type ${node.type} has no outgoing connections.`);
        return false;
      }
    }
  }

  return true;
}
