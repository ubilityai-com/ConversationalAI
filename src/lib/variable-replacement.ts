
import { useFlowStore } from "../store/flow-store";

// Custom error class for variable replacement errors
export class VariableReplacementError extends Error {
  public errors: string[];

  constructor(errors: string[]) {
    const message = errors.length === 1
      ? errors[0]
      : `Multiple variable errors found:\n${errors.map((err, index) => `${index + 1}. ${err}`).join('\n')}`;
    super(message);
    this.name = 'VariableReplacementError';
    this.errors = errors;
  }
}

/**
 * Recursively traverses an object and replaces variables in the format ${variableName}
 * with their actual values based on variable type (constant, output, dialogue, files)
 */
export function replaceVariablesInObject(obj: any): any {
  const {
    constantVariables,
    outputVariables,
    dialogueVariables,
    nodeResults,
  } = useFlowStore.getState();

  const errors: string[] = [];

  // Helper function to resolve path in nested object
  const getValueByPath = (obj: any, path: string): any => {
    if (!path) return obj; // if path is empty string, return whole object
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  // Helper function to get variable value without stringifying
  const getVariableValue = (variableName: string): any => {
    // Check constant variables
    if (constantVariables.hasOwnProperty(variableName)) {
      return constantVariables[variableName];
    }

    // Check output variables
    const outputVar = Object.entries(outputVariables).find(([nodeId, variables]) =>
      variables.hasOwnProperty(variableName)
    );

    if (outputVar) {
      const [nodeId, variables] = outputVar;
      let path = variables[variableName];

      // Remove leading dot if present
      if (typeof path === 'string' && path.startsWith('.')) {
        path = path.substring(1);
      }

      // Get value from nodeResults
      const nodeResult = nodeResults[nodeId];
      if (nodeResult && typeof path === 'string') {
        const value = getValueByPath(nodeResult, path);
        if (value !== undefined) {
          return value;
        }
      }

      errors.push(`Output variable "${variableName}" value not found in node results`);
      return undefined;
    }

    // Check dialogue variables
    const dialogueVar = Object.entries(dialogueVariables).find(([nodeId, varName]) =>
      varName === variableName
    );

    if (dialogueVar) {
      errors.push(`Dialogue variables are not allowed in test node: "${variableName}"`);
      return undefined;
    }

    // If variable doesn't exist in any type, add error
    errors.push(`Variable "${variableName}" does not exist in any variable store`);
    return undefined;
  };

  // Helper function to replace variables in a string
  const replaceVariablesInString = (str: string): any => {
    const variablePattern = /\$\{([^}]+)\}/g;
    const matches = str.match(variablePattern);

    // If the entire string is just one variable, return the raw value
    if (matches && matches.length === 1 && str === matches[0]) {
      const variableName = matches[0].slice(2, -1); // Remove ${ and }
      const value = getVariableValue(variableName);
      return value !== undefined ? value : str;
    }

    // Otherwise, replace variables and stringify if needed
    return str.replace(variablePattern, (match, variableName) => {
      const value = getVariableValue(variableName);
      if (value !== undefined) {
        // Handle different value types for string interpolation
        if (typeof value === 'object') {
          return JSON.stringify(value);
        }
        return String(value);
      }
      return match; // Return original pattern if error
    });
  };

  // Recursive function to process the object
  const processValue = (value: any): any => {
    if (typeof value === 'string') {
      return replaceVariablesInString(value);
    } else if (Array.isArray(value)) {
      return value.map(processValue);
    } else if (value !== null && typeof value === 'object') {
      const result: any = {};
      for (const [key, val] of Object.entries(value)) {
        result[key] = processValue(val);
      }
      return result;
    }
    return value;
  };

  const processedObj = processValue(obj);

  // If there are errors, throw them all at once
  if (errors.length > 0) {
    // Remove duplicates
    const uniqueErrors = [...new Set(errors)];
    throw new VariableReplacementError(uniqueErrors);
  }

  return processedObj;
}



