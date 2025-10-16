import { MarkerType } from "@xyflow/react"
import { v4 as uuidv4 } from "uuid"
// import { getAutomationListValues } from "../../lib/automation-utils"
import { DEFAULT_EDGE_STYLE } from "../constants/connector-constants"
import { getAutomationListValues } from "../automation-utils"
import { ConnectorType, ElementType } from "../../types/connector-types"
import { generateUniqueName } from "./flow-utils"


/**
 * Clones connector defaults and handles automated configuration
 */
export const cloneConnectorDefaults = (connector: ConnectorType): Record<string, any> => {
  const clonedDefaults = JSON.parse(JSON.stringify(connector.defaults))

  if (connector.automated) {
    return {
      ...clonedDefaults,
      [connector.automated]: getAutomationListValues(connector.defaults[connector.automated]),
    }
  }

  return clonedDefaults
}

/**
 * Creates a new node element from a connector type
 */
export const createNodeFromConnector = (
  connector: ConnectorType,
  position: { x: number; y: number },
  notTestable?: boolean,
): ElementType => {
  const generateID = uuidv4()
  const newDefaults = cloneConnectorDefaults(connector)

  const newElement: ElementType = {
    id: generateID,
    type: connector.type,
    position,
    data: {
      label: generateUniqueName(connector.type, connector.label),
      description: connector.description,
      category: connector.category,
      automationConfig: connector.automationConfig,
      rightSideData: newDefaults,
      color: connector.color,
    },
  }

  if (notTestable || connector.notTestable) {
    newElement.data.notTestable = true
  }

  return newElement
}

/**
 * Creates an edge between two nodes
 */
export const createEdge = (source: string, target: string, sourceHandle: string) => {
  return {
    source,
    target,
    arrowHeadType: "arrowclosed",
    sourceHandle,
    targetHandle: null,
    type: "buttonEdge",
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: false,
    style: DEFAULT_EDGE_STYLE,
    id: `xy-edge__${source}${sourceHandle}-${target}${null}`,
  }
}
