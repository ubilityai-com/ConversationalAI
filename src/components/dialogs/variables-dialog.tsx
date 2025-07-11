
import { useState } from "react"

import { Bot, Code, Edit2, Globe, MessageSquare, Plus, Save, Trash2, X, Zap } from "lucide-react"
import { useFlowStore, VariableCategory } from "../../store/flow-store"
import { JsonEditor } from "../custom/json-editor"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { WorkflowVariable } from "../variable-picker"


interface VariablesDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function VariablesDialog({ open, onOpenChange }: VariablesDialogProps) {
    const { variables, addVariable, updateVariable, deleteVariable, getVariablesByCategory } = useFlowStore()
    const [editingVariable, setEditingVariable] = useState<WorkflowVariable | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [activeTab, setActiveTab] = useState<VariableCategory>("global")
    const [formData, setFormData] = useState({
        name: "",
        type: "string" as WorkflowVariable["type"],
        value: "",
        booleanValue: false,
        description: "",
        category: "global" as VariableCategory,
    })

    const resetForm = () => {
        setFormData({
            name: "",
            type: "string",
            value: "",
            booleanValue: false,
            description: "",
            category: activeTab,
        })
        setShowAddForm(false)
        setEditingVariable(null)
    }

    const handleSave = () => {
        if (!formData.name.trim()) return

        let processedValue: any

        // Process value based on type
        try {
            switch (formData.type) {
                case "number":
                    processedValue = formData.value ? Number(formData.value) : 0
                    if (isNaN(processedValue)) {
                        alert("Please enter a valid number")
                        return
                    }
                    break
                case "boolean":
                    processedValue = formData.booleanValue
                    break
                case "object":
                    if (!formData.value.trim()) {
                        processedValue = {}
                    } else {
                        processedValue = JSON.parse(formData.value)
                    }
                    break
                case "array":
                    if (!formData.value.trim()) {
                        processedValue = []
                    } else {
                        processedValue = JSON.parse(formData.value)
                    }
                    break
                default:
                    processedValue = formData.value
            }
        } catch (error) {
            alert("Invalid JSON format. Please check your input.")
            return
        }

        if (editingVariable) {
            console.log({ formData });

            updateVariable("global", editingVariable.name, {
                name: formData.name,
                type: formData.type,
                value: processedValue,
                description: formData.description,
                category: formData.category,
            })
        } else {
            console.log({ formData });

            addVariable({
                name: formData.name,
                type: formData.type,
                value: processedValue,
                description: formData.description,
                category: formData.category,
                origin: "Global variable"
            })
        }

        resetForm()
    }

    const handleEdit = (variable: WorkflowVariable) => {
        setEditingVariable(variable)
        setFormData({
            name: variable.name,
            type: variable.type,
            value: typeof variable.value === "object" ? JSON.stringify(variable.value, null, 2) : String(variable.value),
            booleanValue: variable.type === "boolean" ? Boolean(variable.value) : false,
            description: variable.description || "",
            category: variable.category,
        })
        setShowAddForm(true)
    }

    const handleDelete = (id: string) => {
        deleteVariable(id)
    }

    const handleTypeChange = (newType: WorkflowVariable["type"]) => {
        setFormData((prev) => {
            let newValue = ""
            let newBooleanValue = false

            // Set default values based on type
            switch (newType) {
                case "string":
                    newValue = ""
                    break
                case "number":
                    newValue = "0"
                    break
                case "boolean":
                    newBooleanValue = false
                    break
                case "object":
                    newValue = "{\n  \n}"
                    break
                case "array":
                    newValue = "[\n  \n]"
                    break
            }

            return {
                ...prev,
                type: newType,
                value: newValue,
                booleanValue: newBooleanValue,
            }
        })
    }

    const formatJson = () => {
        try {
            const parsed = JSON.parse(formData.value)
            const formatted = JSON.stringify(parsed, null, 2)
            setFormData({ ...formData, value: formatted })
        } catch (error) {
            // If parsing fails, keep the current value
        }
    }

    const getTypeColor = (type: WorkflowVariable["type"]) => {
        const colors = {
            string: "bg-blue-100 text-blue-800",
            number: "bg-green-100 text-green-800",
            boolean: "bg-purple-100 text-purple-800",
            object: "bg-orange-100 text-orange-800",
            array: "bg-pink-100 text-pink-800",
        }
        return colors[type]
    }

    const getCategoryInfo = (category: VariableCategory) => {
        const categoryInfo = {
            global: {
                label: "Global Variables",
                description: "Variables accessible across the entire workflow",
                icon: Globe,
                color: "text-purple-600",
            },
            ai: {
                label: "AI Variables",
                description: "Variables used for AI model configuration and prompts",
                icon: Bot,
                color: "text-blue-600",
            },
            dialogue: {
                label: "Dialogue Variables",
                description: "Variables for conversation flow and user interactions",
                icon: MessageSquare,
                color: "text-green-600",
            }

        }
        return categoryInfo[category]
    }

    const formatValue = (value: any, type: WorkflowVariable["type"]) => {
        if (type === "object" || type === "array") {
            return JSON.stringify(value, null, 2)
        }
        return String(value)
    }

    const renderValueInput = () => {
        switch (formData.type) {
            case "string":
                return (
                    <Input
                        id="value"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        placeholder="Enter string value"
                    />
                )

            case "number":
                return (
                    <Input
                        id="value"
                        type="number"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        placeholder="Enter number value"
                    />
                )

            case "boolean":
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="booleanValue"
                            checked={formData.booleanValue}
                            onCheckedChange={(checked) => setFormData({ ...formData, booleanValue: Boolean(checked) })}
                        />
                        <Label htmlFor="booleanValue" className="text-sm font-medium">
                            {formData.booleanValue ? "True" : "False"}
                        </Label>
                    </div>
                )

            case "object":
            case "array":
                return (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Code className="w-4 h-4" />
                                <span>JSON Editor</span>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={formatJson}
                                className="h-7 px-2 text-xs bg-transparent"
                            >
                                <Zap className="w-3 h-3 mr-1" />
                                Format
                            </Button>
                        </div>
                        <JsonEditor
                            value={formData.value}
                            onChange={(value) => setFormData({ ...formData, value })}
                            placeholder={formData.type === "object" ? '{\n  "key": "value"\n}' : '[\n  "item1",\n  "item2"\n]'}
                            height="200px"
                        />
                        <div className="text-xs text-gray-500">Use the Format button to automatically format your JSON</div>
                    </div>
                )

            default:
                return null
        }
    }

    const renderVariablesList = (category: VariableCategory) => {
        const categoryVariables = getVariablesByCategory(category)
        const categoryInfo = getCategoryInfo(category)

        return (
            <div className="space-y-3">
                {categoryVariables.length === 0 ? (
                    <Card>
                        <CardContent className="py-8 text-center text-gray-500">
                            <div className="flex flex-col items-center space-y-2">
                                <categoryInfo.icon className={`w-8 h-8 ${categoryInfo.color}`} />
                                <div className="text-lg font-medium">No {categoryInfo.label.toLowerCase()}</div>
                                <div className="text-sm">{categoryInfo.description}</div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    categoryVariables.map((variable) => (
                        <Card key={variable.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="py-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="font-medium text-lg">{variable.name}</h3>
                                            <Badge className={getTypeColor(variable.type)}>{variable.type}</Badge>
                                        </div>

                                        {variable.description && <p className="text-sm text-gray-600 mb-2">{variable.description}</p>}

                                        <div className="bg-gray-50 rounded p-3">
                                            <div className="text-xs text-gray-500 mb-1">Value:</div>
                                            <pre className="font-mono text-sm text-gray-900 whitespace-pre-wrap">
                                                {formatValue(variable.value, variable.type)}
                                            </pre>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 ml-4">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(variable)}>
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(variable.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Workflow Variables</span>
                        <Button
                            onClick={() => {
                                setFormData({ ...formData, category: activeTab })
                                setShowAddForm(true)
                            }}
                            size="sm"
                            className="mr-4"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Variable
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-hidden">
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as VariableCategory)} className="h-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="global" className="flex items-center space-x-2">
                                <Globe className="w-4 h-4" />
                                <span>Global Variables</span>
                            </TabsTrigger>
                            <TabsTrigger value="ai" className="flex items-center space-x-2">
                                <Bot className="w-4 h-4" />
                                <span>AI Variables</span>
                            </TabsTrigger>
                            <TabsTrigger value="dialogue" className="flex items-center space-x-2">
                                <MessageSquare className="w-4 h-4" />
                                <span>Dialogue Variables</span>
                            </TabsTrigger>
                        </TabsList>

                        <div className="mt-4 h-full overflow-auto">
                            {/* Add/Edit Form */}
                            {showAddForm && (
                                <Card className="border-2 border-dashed border-gray-300 mb-4">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center justify-between">
                                            {editingVariable ? "Edit Variable" : `Add New ${getCategoryInfo(activeTab).label.slice(0, -1)}`}
                                            <Button variant="ghost" size="sm" onClick={resetForm}>
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name">Variable Name</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="e.g., userEmail, maxRetries"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="type">Type</Label>
                                                <Select value={formData.type} onValueChange={handleTypeChange}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="string">String</SelectItem>
                                                        <SelectItem value="number">Number</SelectItem>
                                                        <SelectItem value="boolean">Boolean</SelectItem>
                                                        <SelectItem value="object">Object</SelectItem>
                                                        <SelectItem value="array">Array</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                        </div>

                                        <div>
                                            <Label htmlFor="value">Value</Label>
                                            {renderValueInput()}
                                        </div>

                                        <div>
                                            <Label htmlFor="description">Description (Optional)</Label>
                                            <Input
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Describe what this variable is used for"
                                            />
                                        </div>

                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" onClick={resetForm}>
                                                Cancel
                                            </Button>
                                            <Button onClick={handleSave} disabled={!formData.name.trim()}>
                                                <Save className="w-4 h-4 mr-2" />
                                                {editingVariable ? "Update" : "Add"} Variable
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            <TabsContent value="ai" className="mt-0">
                                {renderVariablesList("ai")}
                            </TabsContent>
                            <TabsContent value="dialogue" className="mt-0">
                                {renderVariablesList("dialogue")}
                            </TabsContent>
                            <TabsContent value="global" className="mt-0">
                                {renderVariablesList("global")}
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}
