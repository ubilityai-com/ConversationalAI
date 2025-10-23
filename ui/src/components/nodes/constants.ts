
export const NODE_CONFIG = {
  TRUNCATION_LENGTH: 200,
  EXECUTION_TIMEOUT: 1000,
  MIN_DELAY: 500,
  MAX_DELAY: 2500,
} as const;

export const NODE_TYPES = {
  HANDLER: "Handler",
  END: "End",
} as const;

export const NODE_STATUS = {
  MISSING_CONFIG: "Missing config",
  RUNNING: "Running",
  WAITING: "Waiting",
  READY: "Ready",
} as const;

export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES];
export type NodeStatus = typeof NODE_STATUS[keyof typeof NODE_STATUS];
