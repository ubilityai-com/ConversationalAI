import type { Edge, Node } from "@xyflow/react"

/**
 * Validates if all required node handles are connected in the flow
 * @param nodes - Array of flow nodes
 * @param edges - Array of flow edges
 * @returns true if all required connections are present, false otherwise
 */
export function checkIfAllHandlesAreConnected(nodes: Node[], edges: Edge[]): boolean {
    // Maps for quick lookup
    const incomingEdgesMap = new Map<string, Edge[]>()
    const outgoingEdgesMap = new Map<string, Edge[]>()

    edges.forEach((edge) => {
        if (!incomingEdgesMap.has(edge.target)) incomingEdgesMap.set(edge.target, [])
        incomingEdgesMap.get(edge.target)!.push(edge)

        if (!outgoingEdgesMap.has(edge.source)) outgoingEdgesMap.set(edge.source, [])
        outgoingEdgesMap.get(edge.source)!.push(edge)
    })

    // Node type configs
    const nodeTypeRules: Record<
        string,
        {
            requireIncoming: boolean
            requireOutgoing: boolean
            getRequiredHandles?: (node: any) => string[]
            defaultHandle?: string
        }
    > = {
        Handler: { requireIncoming: false, requireOutgoing: false },
        StickyNote: {
            requireIncoming: false,
            requireOutgoing: false,
        },
    }

    for (const node of nodes) {
        const incoming = incomingEdgesMap.get(node.id) ?? []
        const outgoing = outgoingEdgesMap.get(node.id) ?? []
        const config = nodeTypeRules[node.type ?? ""] ?? {
            requireIncoming: true,
            requireOutgoing: false,
        }

        if (config.requireIncoming && incoming.length === 0) {
            console.warn(`Node ${node.id} (${node.type}) is missing incoming connection.`)
            return false
        }

        if (config.requireOutgoing && outgoing.length === 0) {
            console.warn(`Node ${node.id} (${node.type}) is missing outgoing connection.`)
            return false
        }
    }

    return true
}
