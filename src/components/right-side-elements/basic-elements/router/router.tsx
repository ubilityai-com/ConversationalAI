

import { GitBranch, Plus, Trash2 } from "lucide-react";
import { useDebounceConfig } from "../../../../hooks/use-debounced-config";
import { NodeConfigProps } from "../../../../types/automation-types";
import { FieldWrapper } from "../../../custom/field-wrapper";
import { RouterBranch, RouterDefaultBranch } from "../../../nodes/router-node";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Textarea } from "../../../ui/textarea";

export interface RightSideData {
  branches: RouterBranch[]
  defaultBranch: RouterDefaultBranch
  save: boolean;
  variableName: string;
  loopFromSwitch: boolean;
  loopFromName: string
}
export interface RouterConfig extends Record<string, unknown> {
  label: string
  description: string
  rightSideData: RightSideData
}



function checkIfAllRequiredDataIsFilled(data: RightSideData): boolean {
  if (!data) return false;

  // if (data.loopFromSwitch && data.loopFromName.trim().length === 0) {
  //   return false;
  // }

  for (const item of data.branches) {
    if (
      !item.label || item.label.trim() === '' ||
      !item.firstOperator || item.firstOperator.trim() === '' ||
      !item.secondOperator || item.secondOperator.trim() === ''
    ) {
      return false;
    }
  }

  return true;
}

export default function RouterForm({ content, onContentUpdate, validate }: NodeConfigProps<RightSideData>) {

  const { localConfig, updateNestedConfig } = useDebounceConfig(
    content,
    {
      delay: 300,
      onSave: (savedConfig) => {
        // Save the entire config at once
        const valid = checkIfAllRequiredDataIsFilled(savedConfig)
        onContentUpdate(savedConfig, valid)
      },
    },
  )

  const branches = localConfig.branches || []

  const addBranch = () => {
    const newBranch = {
      id: `branch-${Date.now()}`,
      label: `Branch ${branches.length + 1}`,
      description: "",
      operatorType: "number",
      firstOperator: "",
      secondOperator: "",
      checkType: "equal",
    }
    updateNestedConfig("branches", [...branches, newBranch])
  }

  const updateBranch = (index: number, updates: any) => {
    const updatedBranches = [...branches]
    updatedBranches[index] = { ...updatedBranches[index], ...updates }
    updateNestedConfig("branches", updatedBranches)

  }

  const removeBranch = (index: number) => {
    const updatedBranches = branches.filter((_: any, i: number) => i !== index)
    updateNestedConfig("branches", updatedBranches)
  }



  return (
    <div className="space-y-4">

      {/* Router Branches Configuration */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center">
              <GitBranch className="w-4 h-4 mr-2" />
              Routing Branches
            </CardTitle>
            <Button variant="outline" size="sm" onClick={addBranch} className="h-8 bg-transparent">
              <Plus className="w-3 h-3 mr-1" />
              Add Branch
            </Button>
          </div>
          <CardDescription>Configure routing conditions for each branch</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {branches.length === 0 ? (
            <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <GitBranch className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No branches configured</p>
              <p className="text-xs text-gray-400 mt-1">Click "Add Branch" to create routing conditions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {branches.map((branch: any, index: number) => (
                <Card key={branch.id} className="border border-gray-200">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700">Branch {index + 1}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBranch(index)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>

                    <div>
                      <Label htmlFor={`branch-name-${index}`} className="text-xs">
                        Branch Name
                      </Label>
                      <FieldWrapper
                        field={{ type: "textfield" }}
                        variableName={`branch-name-${index}`}
                        value={branch.name || `Branch ${index + 1}`}
                        onChange={(e) => updateBranch(index, { name: e })}
                        className="h-8 text-xs"
                      >
                        <Input
                          id={`branch-name-${index}`}
                          placeholder="Branch name"
                          value={branch.name || `Branch ${index + 1}`}
                          onChange={(e) => updateBranch(index, { name: e.target.value })}
                          className="h-8 text-xs"
                        />
                      </FieldWrapper>
                    </div>

                    <div>
                      <Label htmlFor={`branch-description-${index}`} className="text-xs">
                        Branch Description
                      </Label>
                      <Textarea
                        id={`branch-description-${index}`}
                        placeholder="Describe what this branch does..."
                        value={branch.description || ""}
                        onChange={(e) => updateBranch(index, { description: e.target.value })}
                        className="text-xs resize-none"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`operator-type-${index}`} className="text-xs">
                          Operator Type
                        </Label>
                        <Select
                          value={branch.operatorType}
                          onValueChange={(value) => {

                            updateBranch(index, { operatorType: value })
                            // updateBranch(index, { checkType: "equal" })
                          }
                          }
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="number">number</SelectItem>
                            <SelectItem value="string">string</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`first-operator-${index}`} className="text-xs">
                          First Operator
                        </Label>
                        <FieldWrapper
                          field={{ type: "textfield" }}
                          variableName={`first-operator-${index}`}
                          value={branch.firstOperator || ""}
                          onChange={(e) => updateBranch(index, { firstOperator: e })}
                          className="h-8 text-xs"
                        >
                          <Input
                            id={`first-operator-${index}`}
                            placeholder="First value"
                            value={branch.firstOperator || ""}
                            onChange={(e) => updateBranch(index, { firstOperator: e.target.value })}
                            className="h-8 text-xs"
                          />
                        </FieldWrapper>
                      </div>

                      <div>
                        <Label htmlFor={`second-operator-${index}`} className="text-xs">
                          Second Operator
                        </Label>
                        <FieldWrapper
                          field={{ type: "textfield" }}
                          variableName={`second-operator-${index}`}
                          value={branch.secondOperator || ""}
                          onChange={(e) => updateBranch(index, { secondOperator: e })}
                          className="h-8 text-xs"
                        >
                          <Input
                            id={`second-operator-${index}`}
                            placeholder="Second value"
                            value={branch.secondOperator || ""}
                            onChange={(e) => updateBranch(index, { secondOperator: e.target.value })}
                            className="h-8 text-xs"
                          />
                        </FieldWrapper>
                      </div>

                      <div>
                        <Label htmlFor={`check-type-${index}`} className="text-xs">
                          Check Type
                        </Label>
                        <Select
                          value={branch.checkType || "equal"}
                          onValueChange={(value) => updateBranch(index, { checkType: value })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Check type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equal">Equal (==)</SelectItem>
                            <SelectItem value="not_equal">Not Equal (!=)</SelectItem>
                            {branch.operatorType === "number" && <>

                              <SelectItem value="greater_than">Greater Than (&gt;)</SelectItem>
                              <SelectItem value="less_than">Less Than (&lt;)</SelectItem>
                              <SelectItem value="greater_equal">Greater or Equal (&gt;=)</SelectItem>
                              <SelectItem value="less_equal">Less or Equal (&lt;=)</SelectItem>
                            </>}
                            {branch.operatorType === "string" && <>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="not_contains">Not Contains</SelectItem></>
                            }
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Branch condition preview */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <Label className="text-xs font-medium text-gray-600">Condition Preview</Label>
                      <div className="text-xs font-mono text-gray-700 mt-1">
                        {branch.firstOperator || "[first]"} {branch.checkType?.replace("_", " ") || "equal"}{" "}
                        {branch.secondOperator || "[second]"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Default Branch Configuration */}
          <Card className="border-gray-300 bg-gray-50">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Default Branch</span>
              </div>

              <div>
                <Label htmlFor="default-branch-name" className="text-xs">
                  Default Branch Name
                </Label>
                <FieldWrapper
                  field={{ type: "textfield" }}
                  variableName={`default-branch-name`}
                  value={localConfig.defaultBranch?.label || "Default"}
                  onChange={(e) => {
                    const currentDefault = localConfig.defaultBranch || {}
                    updateNestedConfig("defaultBranch", { ...currentDefault, label: e })
                  }
                  }
                  className="h-8 text-xs"
                >
                  <Input
                    id="default-branch-name"
                    placeholder="Default branch name"
                    value={localConfig.defaultBranch?.label || "Default"}
                    onChange={(e) => {
                      const currentDefault = localConfig.defaultBranch || {}
                      updateNestedConfig("defaultBranch", { ...currentDefault, name: e })
                    }}
                    className="h-8 text-xs"
                  />
                </FieldWrapper>
              </div>

              <div>
                <Label htmlFor="default-branch-description" className="text-xs">
                  Default Branch Description
                </Label>
                <Textarea
                  id="default-branch-description"
                  placeholder="Describe what happens when no conditions are met..."
                  value={localConfig.defaultBranch?.description || ""}
                  onChange={(e) => {
                    const currentDefault = localConfig.defaultBranch || {}
                    updateNestedConfig("defaultBranch", { ...currentDefault, description: e.target.value })
                  }}
                  className="text-xs resize-none"
                  rows={2}
                />
              </div>

              <p className="text-xs text-gray-600">
                This branch will be taken when none of the above conditions are met.
              </p>
            </CardContent>
          </Card>

          {/* Router Summary */}
          {branches.length > 0 && (
            <div className="text-xs text-gray-500 bg-cyan-50 p-3 rounded-lg border border-cyan-200">
              <p className="font-medium text-cyan-700 mb-1">Router Summary</p>
              <p>
                This router has {branches.length} conditional branch
                {branches.length !== 1 ? "es" : ""} plus 1 default branch. Each branch will be evaluated in order, and
                the first matching condition will determine the routing path.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
