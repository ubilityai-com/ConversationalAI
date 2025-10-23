
import { NODE_CONFIG, NODE_STATUS } from '../constants';

export const truncateText = (text: string, maxLength: number = NODE_CONFIG.TRUNCATION_LENGTH): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const getNodeStatus = (isNodeValid: boolean, isRunning: boolean, workflowRunning: boolean): string => {
  if (!isNodeValid) return NODE_STATUS.MISSING_CONFIG;
  if (isRunning) return NODE_STATUS.RUNNING;
  if (workflowRunning) return NODE_STATUS.WAITING;
  return NODE_STATUS.READY;
};

export const getStatusColorClass = (isNodeValid: boolean, isRunning: boolean, workflowRunning: boolean): string => {
  if (!isNodeValid) return "bg-red-500";
  if (isRunning) return "bg-green-500 animate-pulse";
  if (workflowRunning) return "bg-yellow-500";
  return "bg-gray-300";
};
