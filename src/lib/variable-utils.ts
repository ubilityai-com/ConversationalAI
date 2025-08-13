import { useFlowStore } from "../store/flow-store";
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
export function isPickedPathAlreadyExistsInCreatedVariables(aPath: string, flowZoneSelectedID: string, createdVariables: OutputVariables) {
  let toReturn: boolean | string = false;

  if (createdVariables && Object.keys(createdVariables).length > 0 &&
    createdVariables[flowZoneSelectedID] && Object.keys(createdVariables[flowZoneSelectedID]).length > 0
  ) {

    Object.keys(createdVariables[flowZoneSelectedID]).forEach(variableNameRegexTest => {//{ "var1": "$.data[0].color" }
      let path = createdVariables[flowZoneSelectedID][variableNameRegexTest];
      if (aPath === path) {
        toReturn = variableNameRegexTest;
      }
    });
  }

  return toReturn;
};

export function reformatCreatedVariablePath(path: string) {
  let newPath = path
  let firstDotIndex = newPath.indexOf('.');
  newPath = newPath.substring(firstDotIndex + 1, newPath.length);//remove node name and '.'
  newPath = newPath.replaceAll("\"", "");//remove all '"'

  return newPath;
}
export function pathExistsInOutputVariables(
  pathToCheck: string,
  nodeId: string,
  outputVariables: OutputVariables,
): boolean | string {
  const nodeToCheckVariables = outputVariables[nodeId]
  if (nodeToCheckVariables)
    for (const [variableName, path] of Object.entries(nodeToCheckVariables)) {
      if (path === pathToCheck) {
        return variableName;
      }
    }
  return false
}
type OutputEntry = { name: string; path: string };

export function getOutputVariablesByNodeId(
  nodeId: string
): OutputEntry[] {
  const outputVariables =useFlowStore.getState().outputVariables

  const nodeVars = outputVariables[nodeId];
  if (!nodeVars) return [];

  return Object.entries(nodeVars).map(([name, path]) => ({
    name,
    path
  }));
}