import {
  ChevronDown,
  ChevronUp,
  Database,
  Edit2,
  Eye,
  Filter,
  Save,
  Search,
  Trash2,
  X
} from "lucide-react";
import { useState } from "react";
import { useFlowStore } from "../../store/flow-store";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface NodeStatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NodeStatesDialog({
  open,
  onOpenChange,
}: NodeStatesDialogProps) {
  const {
    nodes,
    nodeStates,
    addNodeState,
    updateNodeState,
    removeNodeState,
    setClickedElement,
    setIsRightOpen,
  } = useFlowStore();

  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "withState" | "withoutState"
  >("all");
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(
    new Set()
  );

  // Filter out excluded nodes and get available nodes
  const excludedTypes = new Set(["Handler", "End", "Router", "StickyNote"]);
  const availableNodes = nodes.filter((node) =>
    !excludedTypes.has(node.type)
  ); const getNodeLabel = (node: any) => {
    return node.data?.label || node.type || "Unnamed Node";
  };

  // Apply search and filter
  const filteredNodes = availableNodes.filter((node) => {
    const hasState = nodeStates.hasOwnProperty(node.id) && nodeStates[node.id].trim()

    const matchesSearch =
      getNodeLabel(node).toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (nodeStates[node.id] || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      (filterType === "withState" && hasState) ||
      (filterType === "withoutState" && !hasState);

    return matchesSearch && matchesFilter;
  });

  const handleEditStart = (nodeId: string, currentDescription: string) => {
    setEditingNodeId(nodeId);
    setEditDescription(currentDescription);
  };

  const handleEditSave = (nodeId: string) => {
    updateNodeState(nodeId, editDescription.trim());
    setEditingNodeId(null);
    setEditDescription("");
  };

  const handleEditCancel = () => {
    setEditingNodeId(null);
    setEditDescription("");
  };

  const handleToggleNodeState = (nodeId: string, hasState: boolean) => {
    if (hasState) {
      // Add state with empty description
      addNodeState(nodeId, "");
    } else {
      // Remove state
      removeNodeState(nodeId);
    }
  };

  const handleViewNode = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setClickedElement(null)
      setTimeout(() => setClickedElement(node), 300)
      setIsRightOpen(true);
      onOpenChange(false);
    }
  };

  const toggleDescriptionExpansion = (nodeId: string) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      basic: "bg-blue-100 text-blue-800",
      ai: "bg-purple-100 text-purple-800",
      automationTools: "bg-green-100 text-green-800",
      rpa: "bg-orange-100 text-orange-800",
      dialogue: "bg-pink-100 text-pink-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const nodesWithState = Object.values(nodeStates).filter((value) => value.trim() !== "").length;
  const totalNodes = availableNodes.length;
  console.log({ nodeStates });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Node States Management
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mr-6">
              <span>
                {nodesWithState} of {totalNodes} nodes have state
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Search and Filter Controls */}
          <div className="flex gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search nodes by name, type, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Select
                value={filterType}
                onValueChange={(value: any) => setFilterType(value)}
              >
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Nodes</SelectItem>
                  <SelectItem value="withState">With State</SelectItem>
                  <SelectItem value="withoutState">Without State</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Info Banner */}
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg mb-4">
            <p>
              Manage which nodes have state and add descriptions to help track
              their purpose. Nodes with state can store and maintain information
              throughout the workflow execution.
            </p>
          </div>

          {/* Nodes List */}
          <div className="flex-1 overflow-auto">
            {filteredNodes.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  <Database className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  {searchTerm || filterType !== "all" ? (
                    <div>
                      <p className="font-medium">No nodes match your criteria</p>
                      <p className="text-sm">Try adjusting your search or filter</p>
                    </div>
                  ) : (
                    <p>No nodes available in the workflow</p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Accordion type="multiple" className="space-y-3">
                {filteredNodes.map((node) => {
                  const hasState = nodeStates.hasOwnProperty(node.id) && nodeStates[node.id].trim();
                  const currentDescription = nodeStates[node.id] || "";
                  const isEditing = editingNodeId === node.id;
                  const nodeCategory = node.data?.category || "basic";

                  return (
                    <AccordionItem key={node.id} value={node.id}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <h3
                                  className="font-medium text-lg truncate"
                                  title={getNodeLabel(node)}
                                >
                                  {truncateText(getNodeLabel(node))}
                                </h3>
                                {/* <Badge variant="outline" className="text-xs shrink-0">
                                  {node.type}
                                </Badge> */}
                                <Badge
                                  className={`text-xs shrink-0 ${getCategoryColor(nodeCategory)} hover:${getCategoryColor(nodeCategory)}`}>
                                  {nodeCategory}
                                </Badge>
                                {hasState && (
                                  <Badge className="bg-green-100 text-green-800 text-xs shrink-0 hover:bg-green-100">
                                    Has State
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Right: actions + accordion toggle */}
                            <div className="flex items-center gap-1 shrink-0">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleViewNode(node.id)}
                                className="h-8 px-2"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {hasState && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeNodeState(node.id)}
                                  className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                              {/* Accordion toggle */}
                              <AccordionTrigger />
                            </div>
                          </div>

                          {/* Accordion content (description area) */}
                          <AccordionContent>
                            {isEditing ? (
                              <div className="mt-4">
                                <Textarea
                                  value={editDescription}
                                  onChange={(e) => setEditDescription(e.target.value)}
                                  onBlur={() => handleEditSave(node.id)} // auto-save on blur
                                  placeholder="Describe what this node's state represents..."
                                  className="min-h-[80px]"
                                  autoFocus
                                />
                              </div>
                            ) : (
                              <div
                                className="bg-gray-50 rounded p-3 mt-4 cursor-text"
                                onClick={() => handleEditStart(node.id, currentDescription)}
                              >
                                {currentDescription ? (
                                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {expandedDescriptions.has(node.id)
                                      ? currentDescription
                                      : truncateDescription(currentDescription)}
                                  </p>
                                ) : (
                                  <p className="text-sm text-gray-400 italic">
                                    No description provided (click to edit)
                                  </p>
                                )}

                                {currentDescription && currentDescription.length > 150 && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleDescriptionExpansion(node.id);
                                    }}
                                    className="h-6 px-2 text-xs mt-2 text-blue-600 hover:text-blue-700"                                  >
                                    {expandedDescriptions.has(node.id) ? "View less" : "View more"}
                                  </Button>
                                )}
                              </div>
                            )}
                          </AccordionContent>

                        </CardContent>
                      </Card>
                    </AccordionItem>
                  );
                })}
              </Accordion>

            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            {filteredNodes.length} of {totalNodes} nodes shown
          </div>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
