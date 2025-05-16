import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useFlowStore } from "../store/flow-store"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks if all nodes in the flow have their required connections
 * @returns Boolean indicating whether all nodes are properly connected
 */
export function handleFlowZoneCheckIfAllHandlesAreConnected() {
  // Get nodes and edges from the flow store
  const { nodes, edges } = useFlowStore.getState()
  
  let allAreConnected = true
  console.log({nodes,edges});
  
  nodes.forEach((element) => {
    console.log({element,allAreConnected});
    
    if (element.type === 'Handler') {
      let allAreSources = true

      let isDefaultSource = edges.find(edge => ((element.id === edge.source) && edge.sourceHandle === '0'))
      console.log({isDefaultSource});
      
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
  })

  return allAreConnected
}