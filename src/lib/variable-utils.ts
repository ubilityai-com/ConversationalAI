import { ConstantVariable, DialogueVariables, OutputVariables } from "../store/variables-store";

/**
 * Check if a variable name exists in any of the constant, output, or dialogue variables.
 */
export function doesVariableExist(
    name: string,
    constantVariables: ConstantVariable,
    outputVariables: OutputVariables,
    dialogueVariables: DialogueVariables
  ): boolean {
    // Check constant variables
    if (name in constantVariables) return true;
  
    // Check output variables across all node IDs
    for (const variables of Object.values(outputVariables)) {
      if (name in variables) return true;
    }
  
    // Check dialogue variables
    if (Object.values(dialogueVariables).includes(name)) return true;
  
    return false;
  }