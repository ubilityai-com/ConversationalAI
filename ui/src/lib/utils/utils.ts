import { Edge } from "@xyflow/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { useFlowStore } from "../../store/root-store";
import { Node } from "../../store/slices/flow-slice";
import { AutomationItem } from "../../types/automation-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if all nodes in the flow have their required connections
 * @returns Boolean indicating whether all nodes are properly connected
 */
export function handleFlowZoneCheckIfAllHandlesAreConnected() {
  // Get nodes and edges from the flow store
  const { nodes, edges } = useFlowStore.getState();

  let allAreConnected = true;
  console.log({ nodes, edges });

  nodes.forEach((element) => {
    console.log({ element, allAreConnected });

    if (element.type === "Handler") {
      let allAreSources = true;

      let isDefaultSource = edges.find(
        (edge) => element.id === edge.source && edge.sourceHandle === "0"
      );
      console.log({ isDefaultSource });

      if (!isDefaultSource) {
        allAreSources = false;
      }



      if (!allAreSources) {
        allAreConnected = false;
      }
    } else if (
      element.type === "Message"
    ) {
      let allAreSources = true;

      let isDefaultSource = edges.find(
        (edge) => element.id === edge.source && edge.sourceHandle === "0"
      );

      if (!isDefaultSource) {
        allAreSources = false;
      }

      if (!allAreSources) {
        allAreConnected = false;
      }

      let isTarget = edges.find((edge) => element.id === edge.target);

      if (!isTarget) {
        allAreConnected = false;
      }
    } else if (element.type === "ChoicePrompt") {
      let allAreSources = true;


      let isDefaultSource = edges.find(
        (edge) => element.id === edge.source && edge.sourceHandle === "0"
      );

      if (!isDefaultSource) {
        allAreSources = false;
      }


      if (!allAreSources) {
        allAreConnected = false;
      }

      let isTarget = edges.find((edge) => element.id === edge.target);

      if (!isTarget) {
        allAreConnected = false;
      }
    }
    console.log({allAreConnected});
    
  });

  return allAreConnected;
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
  return typeof value === "object" && !Array.isArray(value);
}



type FormValues = Record<string, any>;

export const validateArray = (
  items: AutomationItem[],
  values: FormValues
): boolean => {
  for (const item of items) {
    const { type, variableName, required } = item;
    const value = values[variableName];
    console.log({ item, value, values });

    switch (type) {
      case "dropdown":
      case "api":
        const options = item.options;
        if (required && (value === "" || !value)) {
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
        if (required && (!value || !removeHTMLTags(value).toString().trim()))
          return false;
        break;
      case "multiselect":
      case "array":
        if (required && (!Array.isArray(value) || value.length < 1))
          return false;
        break;

      case "json":
        if (
          required &&
          (!value || typeof value !== "object" || Object.keys(value).length < 1)
        )
          return false;
        break;

      case "radiobutton":
        if (options && typeof value === "string" && options[value]) {
          if (!validateArray(options[value], values)) return false;
        }
        break;

      case "dynamic":
        const json = item.json;


        if (json) {
          if (json.required && values[json.variableName]?.length < 1) return false;
          const structure = json.structure;
          const valid = values[json.variableName].every((fieldList: FormValues) =>
            validateArray(structure, fieldList)
          );
          if (!valid) return false;
        } else {
          if (required && values[variableName]?.length < 1) return false;
          const structure = item.structure
          const valid = values[variableName].every((fieldList: FormValues) =>
            validateArray(structure, fieldList)
          );
          if (!valid) return false;
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
  const withoutHTMLTags = htmlCode.replace(/<[^>]*>/g, "");
  return withoutHTMLTags.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
export function camelToDashCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}
export const generateRandomString = (length = 32): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export function getNextNodeId(
  nodeId: string,
  edges: Edge[],
  nodes: Node[],
  handleId?: string | null
): string | null {
  const foundEdge = edges.find(
    (edge) =>
      edge.source === nodeId && (!handleId || edge.sourceHandle === handleId)
  );

  if (!foundEdge) return null;

  const nextNode = nodes.find((node) => node.id === foundEdge.target);

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
      const cred = item?.content?.json?.cred;
      if (cred) {
        creds.push(cred);
      }
    }
  }

  return creds;
}

export function getAllPreviousNodes(nodeId: string): string[] {
  const edges = useFlowStore.getState().reactFlowInstance?.getEdges() || [];
  const visited = new Set<string>();
  const result: string[] = [];

  function dfs(currentId: string) {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const incomingEdges = edges.filter((edge) => edge.target === currentId);

    for (const edge of incomingEdges) {
      const sourceId = edge.source;
      result.push(sourceId);
      dfs(sourceId); // recursively check the source node
    }
  }

  dfs(nodeId);

  return [...new Set(result)];
}
export function omitKeys<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const entries = Object.entries(obj).filter(
    ([key]) => !keys.includes(key as K)
  );
  return Object.fromEntries(entries) as Omit<T, K>;
}
export function formatTimestamp(timestamp: string | number): string {
  const date = new Date(Number(timestamp) * 1000); // Convert Unix timestamp to milliseconds
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return "just now";
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  // More than a week, show formatted date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}
export function generateUniqueName(type: string, label?: string): string {
  const nodes = useFlowStore.getState().nodes;
  const namesOfType = nodes
    .filter((n) => n.type === type)
    .map((n) => n.data.label);
  const baseName = label ?? type;

  if (!namesOfType.includes(baseName)) return baseName;

  let counter = 1;
  let candidate = `${baseName} ${counter}`;

  while (namesOfType.includes(candidate)) {
    counter++;
    candidate = `${baseName} ${counter}`;
  }

  return candidate;
}
export function reverseObject<
  T extends Record<string, string | number | symbol>
>(obj: T): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [String(value), key])
  ) as Record<string, string>;
}
/**
 * Initializes a new bot with default start node
 */
export function initializeBot() {
  const id = `${uuidv4()}/Handler`
  return {
    nodes: [
      {
        id: `${id}`,
        type: "Handler",
        data: {
          category: "basic",
          color: "#68b04b",
          label: "Start Dialog",
          description: "Begin your Chatbot journey",
          icon: "PlayArrow",
          rightSideData: {
            greet: "",
            cancel: "",
            start: false,
            save: false,
            variableName: "",
          },
        },
        position: { x: 400, y: 40 },
      },
    ],
    nodesValidation: { [id]: true },
  }
}