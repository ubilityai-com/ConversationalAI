import { MarkerType } from "@xyflow/react";
import {
  CheckSquare,
  GitBranch,
  MessageCircle,
  Search,
  Square,
  StickyNote
} from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReactAgentJson } from "../elements/ai-elements/ReactAgentJson";
import { IntegrationElements } from "../elements/integration-elements";
import { objToReturnDynamicv2 } from "../lib/automation-utils";
import { generateUniqueName } from "../lib/utils";
import { useFlowStore } from "../store/flow-store";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

import { DataCollectorJson } from "../elements/ai-elements/DataCollectorJson";
import { QuestionAndAnswerJson } from "../elements/ai-elements/QuestionAndAnswerJson";
import { AutomationToolsElements } from "../elements/automation-tools-elements";
interface ElementType {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    description: string;
    category: string;
    automationConfig: string;
    rightSideData: any;
    color: string;
    notTestable?: boolean; // Optional property
  };
}
const agentTypes = [
  // BasicLLMJson,
  ReactAgentJson,
  QuestionAndAnswerJson,
  DataCollectorJson,
  {
    type: "ConditionAgent",
    label: "Condition Agent",
    description: "Branch workflow based on conditions",
    icon: GitBranch,
    category: "ai",
    color: "bg-yellow-500",
    defaults: {
      scenarios: [{ label: "scenario 1", id: `scenario-${Date.now()}` }],
      instruction: "Determine which of the provided scenarios is the best fit for the input.",
      input: "",
      extras: {
        model: {
          enabled: true,
          type: "",
          content: {},
          description: "Select the model that fits your use case",
          title: "LLM Model",
        },
      },
    },
  },
  {
    "type": "Attachment",
    category: "basic",
    "label": "Attachment",
    "color": "#4BBFFF",
    description: "Attachment",
    defaultValid: false,
    "defaults": {
      method: "send",
      fileContent: "",
      message: "please upload your file",
      variableName: ""
    }
  },
  {
    type: "Router",
    label: "Router",
    description: "Route workflow based on multiple conditions",
    icon: GitBranch,
    defaultValid: true,
    category: "basic",
    color: "bg-cyan-500",
    defaults: {
      branches: [{
        label: "branch 1", id: `branch-${Date.now()}`,
        description: "",
        operatorType: "number",
        firstOperator: "",
        secondOperator: "",
        checkType: "equal",
      }],
      defaultBranch: { label: "Default", description: "" },
      save: false,
      variableName: "",
      loopFromSwitch: false,
      loopFromName: "",
    },
  },
  {
    type: "ChoicePrompt",
    label: "Multiple Choice",
    defaultValid: true,
    description: "Present multiple options for user selection",
    icon: CheckSquare,
    category: "basic",
    color: "bg-pink-500",
    defaults: {
      botSays: "Hello please choose a choice",
      save: false,
      variableName: "",
      choices: [{ label: "Choice 1", id: `choice-${Date.now()}` }],
      loopFromSwitch: false,
      loopFromName: "",
    },
  },
  {
    name: "Message",
    type: "Message",
    color: "bg-emerald-500",
    defaultValid: false,
    category: "basic",
    label: "Message",
    description: "Send messages and notifications",
    icon: MessageCircle,
    defaults: {
      botSays: "",
      advanced: false,
      regex: "",
      errorMessage: "",
      save: false,
      variableName: "",
      loopFromSwitch: false,
      loopFromName: "",
    },
  },
  ...AutomationToolsElements,
  ...IntegrationElements,
  {
    type: "StickyNote",
    label: "Sticky Note",
    description: "Sticky paper for quick notes and reminders",
    icon: StickyNote,
    category: "basic",
    color: "bg-lime-500",
    defaultValid: true,
    defaults: {
      color: "#bfdbfe",
      content: ""
    },
  }
];

const categories = [
  "All",
  "ai",
  "automationTools",
  "basic",
  "integration"
];

interface AgentPaletteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  x: number;
  y: number;
  source: string;
  sourceHandle: string;
}

export function AgentPaletteDialog({
  open,
  onOpenChange,
  x,
  y,
  source,
  sourceHandle,
}: AgentPaletteDialogProps) {

  const { reactFlowInstance, nodes, setIsFormDialogOpen, addNodesValidation, setClickedElement } = useFlowStore()
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAgents = agentTypes.filter((agent) => {
    const matchesSearch =
      agent.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAgentSelect = (agent: any) => {

    addNewElementToFlowZone(agent, x + 500, y);
    // Reset filters when closing
    setSearchTerm("");
    setSelectedCategory("All");
  };
  // Add new element to the flow
  const addNewElementToFlowZone = (
    element: any,
    clientX: number,
    clientY: number
  ) => {

    if (element && reactFlowInstance) {
      const sourceNode = reactFlowInstance.getNode(source);
      const clonedElement = JSON.parse(JSON.stringify(element));
      const generateID = uuidv4();
      let newDefaults = { ...clonedElement.defaults };

      if (clonedElement.automated) {

        newDefaults = {
          ...newDefaults,
          [clonedElement.automated]: objToReturnDynamicv2(

            clonedElement.defaults[clonedElement.automated]

          ),
        };
      }
      let newElement: ElementType = {
        id: generateID,
        type: clonedElement.type,
        position: {
          x: (sourceNode?.position.x || 0) + 500,
          y: sourceNode?.position.y || 0,
        },
        data: {
          label: generateUniqueName(clonedElement.type, clonedElement.label),
          description: clonedElement.description,
          category: clonedElement.category,
          automationConfig: clonedElement.automationConfig,
          rightSideData: newDefaults,
          color: clonedElement.color
        },
      };
      if (clonedElement.notTestable) {
        newElement.data["notTestable"] = clonedElement.notTestable
      }

      const edge = {
        source,
        target: generateID,
        arrowHeadType: "arrowclosed",
        sourceHandle,
        targetHandle: null,
        type: "buttonEdge",
        markerEnd: { type: MarkerType.ArrowClosed },
        animated: false,
        style: { stroke: "#afafb5", strokeWidth: 2 },
        id: `xy-edge__${source}${sourceHandle}-${generateID}${null}`,
      };
      if (clonedElement.type !== "StickyNote") {

        reactFlowInstance.addEdges(edge);
        setClickedElement(null)
        setTimeout(() => {
          setClickedElement(newElement)
        }, 300);
      }
      reactFlowInstance.addNodes(newElement);
      addNodesValidation(generateID, element.defaultValid);
      setIsFormDialogOpen(false);

    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Select a Node
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 overflow-hidden">
          {/* Sticky Header Section */}
          <div className="sticky top-0 z-10 bg-white pt-2 pb-4 space-y-4">
            {/* Search */}
            <div className="relative p-0.5">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer text-xs hover:bg-primary/80 hover:text-white"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>

          {/* Scrollable Area that fills the rest */}
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-3 p-1">
              {filteredAgents.map((agent: any) => {
                const IconComponent = agent.icon;

                return (
                  <div
                    key={agent.type}
                    className="p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                    onClick={() => handleAgentSelect(agent)}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-12 h-12 ${agent.color} rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
                      >
                        {
                          IconComponent ? <IconComponent className="w-6 h-6 text-white" /> :
                            <img
                              src={"/components-icons/" + agent.type + ".png"}
                              alt="img"
                              className="w-8 h-8 object-contain"
                            />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {agent.label}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                          {agent.description}
                        </p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {agent.category.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredAgents.length === 0 && (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No agents found</p>
                <p className="text-xs text-gray-400 mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
