export enum ConnectorCategory {
    ALL = "All",
    AI = "ai",
    AUTOMATION_TOOLS = "automationTools",
    BASIC = "basic",
    INTEGRATION = "integration",
  }
  
  export const CATEGORY_LABELS: Record<ConnectorCategory, string> = {
    [ConnectorCategory.ALL]: "All",
    [ConnectorCategory.AI]: "AI",
    [ConnectorCategory.AUTOMATION_TOOLS]: "Automation Tools",
    [ConnectorCategory.BASIC]: "Basic",
    [ConnectorCategory.INTEGRATION]: "Integration",
  }
  
  // Node creation constants
  export const NODE_POSITION_OFFSET = 500
  export const CLICK_ELEMENT_DELAY = 300
  
  // Default edge style
  export const DEFAULT_EDGE_STYLE = {
    stroke: "#afafb5",
    strokeWidth: 2,
  }
  