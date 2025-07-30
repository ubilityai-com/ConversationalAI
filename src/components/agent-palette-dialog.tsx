import { MarkerType } from "@xyflow/react";
import {
  Bot,
  CheckSquare,
  GitBranch,
  MessageCircle,
  MessageSquare,
  Search,
  Slack,
  Square,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BasicLLMJson } from "../elements/langchain-elements/BasicLLMJson";
import { objToReturnDynamicv2, setAutomationArray } from "../lib/automation-utils";
import { ApiResItem, objToReturnDynamic } from "../lib/utils";
import { useFlowStore } from "../store/flow-store";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { SlackJson } from "../elements/integration-elements/SlackJson";
import { GmailJson } from "../elements/integration-elements/GmailJson";
import { IntegrationElements } from "../elements/integration-elements";

const agentTypes = [
  // BasicLLMJson,
  {
    type: "ReactAgent",
    label: "React Agent",
    description: "Large Language Model for text processing",
    icon: Bot,
    category: "AI",
    color: "bg-purple-500",
    nodeType: "langchain",
    automated: "json",
    defaults: {
      extras: {
        model: {
          enabled: true,
          type: "",
          content: {},
          description: "Select the model that fits your use case",
          title: "LLM Model",
        },
        memory: {
          enabled: true,
          type: "",
          content: {},
          description: "Select the memory that fits your use case",
          title: "Memory",
          // optional: true,
        },
        tool: {
          multiple: true,
          enabled: true,
          list: [],
          description: "Configure tools for the LLM agent to use",
          title: "Tools",
          // optional: true,
        },
      },
      json: [
        {
          type: "textfield",
          label: "Query",
          required: true,
          multiline: true,
          minRows: 4,
          variableName: "query",
          chatbotQuestion: true,
          value: "",
          placeholder: "e.g Whats going on your mind ?",
          hasDynamicVariable: true,
        },
        {
          type: "outputJson",
          value: {
            Output: {
              answer: "",
            },
            Error: "",
            Status: "",
          },
        },
      ],
    },
  },
  {
    type: "ConditionAgent",
    label: "Condition Agent",
    description: "Branch workflow based on conditions",
    icon: GitBranch,
    category: "AI",
    nodeType: "langchain",
    color: "bg-yellow-500",
    defaults: {
      save: false,
      variableName: "",
      scenarios: [{ label: "scenario 1", id: `scenario-${Date.now()}` }],
      loopFromSwitch: false,
      loopFromName: "",
      instruction: "",
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
  // {
  //   type: "tool",
  //   label: "Tool Agent",
  //   description: "Execute external tools and APIs",
  //   icon: Database,
  //   category: "Integration",
  //   color: "bg-orange-500",
  // },
  // {
  //   type: "condition",
  //   label: "Condition",
  //   description: "Branch workflow based on conditions",
  //   icon: GitBranch,
  //   category: "Logic",
  //   color: "bg-yellow-500",
  // },
  {
    type: "Router",
    label: "Router",
    description: "Route workflow based on multiple conditions",
    icon: GitBranch,
    defaultValid: true,
    category: "Logic",
    nodeType: "basic",
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
    category: "Logic",
    nodeType: "basic",
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
  // {
  //   type: "output",
  //   label: "Output",
  //   description: "Final output of the workflow",
  //   icon: MessageSquare,
  //   category: "IO",
  //   color: "bg-blue-500",
  // },
  // {
  //   type: "orchestrator",
  //   label: "Orchestrator",
  //   description: "Coordinate multiple agents",
  //   icon: Workflow,
  //   category: "Control",
  //   color: "bg-indigo-500",
  // },
  {
    name: "Message",
    type: "Message",
    color: "bg-emerald-500",
    defaultValid: false,
    category: "Logic",
    nodeType: "basic",
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
  // {
  //   type: "attache",
  //   label: "Gmail",
  //   description: "Send and receive emails",
  //   icon: null,
  //   category: "Communication",
  //   color: "bg-gray-500",
  // },
  ...IntegrationElements,
  {
    type: "End",
    label: "End",
    description: "Terminates the chat with a custom message",
    icon: Square,
    category: "Control",
    nodeType: "basic",
    color: "bg-red-500",
    defaults: {
      botSays: "",
      loopFromSwitch: false,
      loopFromName: "None",
    },
  },
];

const categories = [
  "All",
  "AI",
  "Integration",
  "Logic",
  "IO",
  "Control",
  "Communication",
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

  const { reactFlowInstance, nodes, setIsFormDialogOpen, addNodesValidation } = useFlowStore()
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
      console.log({ element });
      const clonedElement = JSON.parse(JSON.stringify(element));
      const generateID = uuidv4();
      let newDefaults = { ...clonedElement.defaults };
      console.log({ clonedElement });

      if (clonedElement.automated) {
        console.log({
          sss: objToReturnDynamic(
            setAutomationArray(
              clonedElement.defaults[clonedElement.automated]
            ) as ApiResItem[]
          ),
        });

        newDefaults = {
          ...newDefaults,
          [clonedElement.automated]: objToReturnDynamicv2(

            clonedElement.defaults[clonedElement.automated]

          ),
        };
      }
      let newElement = {
        id: generateID,
        type: clonedElement.type,
        position: {
          x: (sourceNode?.position.x || 0) + 500,
          y: sourceNode?.position.y || 0,
        },
        data: {
          label: clonedElement.label,
          description: clonedElement.description,
          nodeType: clonedElement.nodeType,
          rightSideData: newDefaults,
          color: clonedElement.color
        },
      };

      reactFlowInstance.addNodes(newElement);
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
      reactFlowInstance.addEdges(edge);
      addNodesValidation(generateID, element.defaultValid);
      setIsFormDialogOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Choose an Agent
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 overflow-hidden">
          {/* Sticky Header Section */}
          <div className="sticky top-0 z-10 bg-white pt-2 pb-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search agents..."
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
                  className="cursor-pointer text-xs hover:bg-primary/80"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
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
                        className={`w-10 h-10 ${agent.color} rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
                      >
                        {
                          IconComponent ? <IconComponent className="w-5 h-5 text-white" /> :
                            <img
                              src={"/components-icons/" + agent.type + ".png"}
                              alt="img"
                              className="w-6 h-6 object-contain"
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
                          {agent.category}
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
