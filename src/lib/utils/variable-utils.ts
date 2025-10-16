import { useFlowStore } from "../../store/root-store";
import { ConstantVariable, DialogueVariables, OutputVariables } from "../../store/slices/variables-slice";

/**
 * Variable extraction and manipulation utilities
 */

/**
 * Extracts variables from a JSON object (variables in ${} format)
 */
export function stringifyAndExtractVariables(json: unknown): string[] | null {
  const jsonString = JSON.stringify(json, null, 2)

  const regex = /\$\{([^}]+)\}/g
  const variables = new Set<string>()
  let match: RegExpExecArray | null

  while ((match = regex.exec(jsonString)) !== null) {
    variables.add(match[1])
  }

  const result = Array.from(variables)
  return result.length === 0 ? null : result
}

/**
 * Check if a variable name exists in any of the constant, output, or dialogue variables.
 */
export function doesVariableExist(
  name: string,
  constantVariables: ConstantVariable,
  outputVariables: OutputVariables,
  dialogueVariables: DialogueVariables
): boolean {
  return doesVariableExistInConstants(name, constantVariables) ||
    doesVariableExistInOutputs(name, outputVariables) ||
    doesVariableExistInDialogues(name, dialogueVariables);
}
export function doesVariableExistInConstants(
  name: string,
  constantVariables: ConstantVariable
): boolean {
  return name in constantVariables;
}

export function doesVariableExistInOutputs(
  name: string,
  outputVariables: OutputVariables
): boolean {
  for (const variables of Object.values(outputVariables)) {
    if (name in variables) return true;
  }
  return false;
}

export function doesVariableExistInDialogues(
  name: string,
  dialogueVariables: DialogueVariables
): boolean {
  return Object.values(dialogueVariables).includes(name);
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
      let pathWithoutPoint = path.startsWith(".") ? path.slice(1) : path
      if (pathWithoutPoint === pathToCheck) {
        return variableName;
      }
    }
  return false
}
type OutputEntry = { name: string; path: string };

export function getOutputVariablesByNodeId(
  nodeId: string
): OutputEntry[] {
  const outputVariables = useFlowStore.getState().outputVariables

  const nodeVars = outputVariables[nodeId];
  if (!nodeVars) return [];

  return Object.entries(nodeVars).map(([name, path]) => ({
    name,
    path
  }));
}
export function hasDialogueVariableInOtherNodes(
  varname: string,
  currentNodeId: string
): boolean {
  const dialogueVariables = useFlowStore.getState().dialogueVariables
  for (const [nodeId, variableName] of Object.entries(dialogueVariables)) {
    if (variableName === varname && nodeId !== currentNodeId) {
      return true;
    }
  }
  return false;
}

export type VariableOrigin = {
  type: 'constants' | 'outputs' | 'dialogues';
  nodeIds?: string[]; // only for outputs and dialogues
  count: number;
};

export function findDetailedVariableOrigins(
  name: string,
): VariableOrigin[] {
  const outputVariables = useFlowStore.getState().outputVariables
  const constantVariables = useFlowStore.getState().constantVariables
  const dialogueVariables = useFlowStore.getState().dialogueVariables

  const origins: VariableOrigin[] = [];

  // Check constant variables
  // Check constant variables
  if (name in constantVariables) {
    origins.push({ type: 'constants', count: 1 });
  }

  // Check output variables
  const outputNodeIds: string[] = [];
  for (const [nodeId, variables] of Object.entries(outputVariables)) {
    if (name in variables) {
      outputNodeIds.push(nodeId);
    }
  }
  if (outputNodeIds.length > 0) {
    origins.push({ type: 'outputs', nodeIds: outputNodeIds, count: outputNodeIds.length });
  }

  // Check dialogue variables
  const dialogueNodeIds: string[] = [];
  for (const [nodeId, variableName] of Object.entries(dialogueVariables)) {
    if (variableName === name) {
      dialogueNodeIds.push(nodeId);
    }
  }
  if (dialogueNodeIds.length > 0) {
    origins.push({ type: 'dialogues', nodeIds: dialogueNodeIds, count: dialogueNodeIds.length });
  }

  return origins;
}