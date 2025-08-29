
import { useState, useEffect, useCallback } from 'react';
import { NODE_CONFIG } from '../constants';

export const useNodeRunningState = (id: string, isStartNode: boolean = false) => {
  const [isRunning, setIsRunning] = useState(false);
  const workflowRunning = false; // This would come from useWorkflowStatus()

  const startExecution = useCallback(() => {
    if (workflowRunning && !isRunning) {
      const delay = isStartNode ? 0 : Math.random() * NODE_CONFIG.MAX_DELAY + NODE_CONFIG.MIN_DELAY;
      const timer = setTimeout(() => {
        setIsRunning(true);
        setTimeout(() => setIsRunning(false), NODE_CONFIG.EXECUTION_TIMEOUT);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [workflowRunning, isRunning, isStartNode]);

  useEffect(() => {
    const cleanup = startExecution();
    return cleanup;
  }, [startExecution]);

  return { isRunning, workflowRunning };
};
