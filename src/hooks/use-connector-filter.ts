import { useMemo, useState } from "react"
import { ConnectorCategory } from "../lib/constants/connector-constants"
import type { ConnectorType } from "../types/connector-types"

export const useConnectorFilter = (connectors: ConnectorType[]) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>(ConnectorCategory.ALL)

  const filteredConnectors = useMemo(() => {
    return connectors.filter((connector) => {
      const matchesSearch =
        connector.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        connector.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === ConnectorCategory.ALL || connector.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [connectors, searchTerm, selectedCategory])

  const categories = useMemo(() => {
    return [
      ConnectorCategory.ALL,
      ConnectorCategory.AI,
      ConnectorCategory.AUTOMATION_TOOLS,
      ConnectorCategory.BASIC,
      ConnectorCategory.INTEGRATION,
    ]
  }, [])

  return {
    filteredConnectors,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
  }
}
