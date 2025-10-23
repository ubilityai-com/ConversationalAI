import { ResultTabType } from "../../lib/constants/node-types"

interface ResultTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

/**
 * Tab switcher for result display
 */
export const ResultTabs = ({ activeTab, onTabChange }: ResultTabsProps) => {
  return (
    <div className="flex gap-2 border-b mb-4">
      <button
        className={`px-4 py-2 ${
          activeTab === ResultTabType.BINARY ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"
        }`}
        onClick={() => onTabChange(ResultTabType.BINARY)}
      >
        Binary
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === ResultTabType.JSON ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"
        }`}
        onClick={() => onTabChange(ResultTabType.JSON)}
      >
        JSON
      </button>
    </div>
  )
}
