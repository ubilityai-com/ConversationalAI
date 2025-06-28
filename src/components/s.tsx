import type React from "react"

import { useState } from "react"

import {
    Bot,
    ChevronDown,
    ChevronRight,
    Database,
    GitBranch,
    MessageCircle,
    MessageSquare,
    Search,
    Target,
    Workflow,
} from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const agentTypes = [
    // {
    //     category: "Input/Output",
    //     agents: [
    //         {
    //             type: "input" as const,
    //             label: "Input Trigger",
    //             description: "Start workflow with user input",
    //             icon: Target,
    //             color: "bg-green-500",
    //         },
    //         {
    //             type: "output" as const,
    //             label: "Output Response",
    //             description: "Send final response to user",
    //             icon: MessageSquare,
    //             color: "bg-blue-500",
    //         },
    //     ],
    // },
    {
        category: "AI Agents",
        agents: [
            {
                type: "llm" as const,
                label: "LLM Agent",
                description: "Generate text using language models",
                icon: Bot,
                color: "bg-purple-500",
            },
            {
                type: "orchestrator" as const,
                label: "Orchestrator",
                description: "Coordinate multiple agents",
                icon: Workflow,
                color: "bg-indigo-500",
            },
        ],
    },
    {
        category: "Connectors",
        agents: [
            {
                type: "attache" as const,
                label: "Gmail",
                description: "Send and receive emails",
                icon: null, // We'll use a custom image instead
                color: "bg-background",
                customIcon: "/images/attache-logo.png",
            },
            {
                type: "message" as const,
                label: "Message",
                description: "Send messages and notifications",
                icon: MessageCircle,
                color: "bg-emerald-500",
            },
        ],
    },
    {
        category: "Tools & Logic",
        agents: [
            {
                type: "tool" as const,
                label: "Tool Agent",
                description: "Execute external tools and APIs",
                icon: Database,
                color: "bg-orange-500",
            },
            {
                type: "condition" as const,
                label: "Condition",
                description: "Branch workflow based on conditions",
                icon: GitBranch,
                color: "bg-yellow-500",
            },
        ],
    },
]

export default function AgentPalette() {
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedCategories, setExpandedCategories] = useState<string[]>(["AI Agents"])
    const addNode = () => { }

    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
        )
    }

    const handleDragStart = (e: React.DragEvent, agentType: any) => {
        e.dataTransfer.setData("application/json", JSON.stringify(agentType))
    }

    const filteredAgentTypes = agentTypes
        .map((category) => ({
            ...category,
            agents: (category.agents as Array<any>).filter(
                (agent:any) =>
                    agent.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    agent.description.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        }))
        .filter((category) => category.agents.length > 0)

    return (
        <div className="w-80 bg-background border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground mb-3">Agent Palette</h2>
                <Input
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filteredAgentTypes.map((category) => (
                    <div key={category.category}>
                        <button
                            onClick={() => toggleCategory(category.category)}
                            className="flex items-center justify-between w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground mb-2"
                        >
                            <span>{category.category}</span>
                            {expandedCategories.includes(category.category) ? (
                                <ChevronDown className="w-4 h-4" />
                            ) : (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </button>

                        {expandedCategories.includes(category.category) && (
                            <div className="space-y-2 ml-2">
                                {category.agents.map((agent:any) => {
                                    const IconComponent = agent.icon
                                    return (
                                        <div
                                            key={agent.type}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, agent)}
                                            className="p-3 border border-border rounded-lg cursor-move hover:border-gray-300 hover:shadow-sm transition-all"
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div
                                                    className={`w-8 h-8 ${agent.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                                                >
                                                    {"customIcon" in agent ? (
                                                        <img
                                                            src={agent?.customIcon || "/placeholder.svg"}
                                                            alt={agent.label}
                                                            className="w-6 h-6 object-contain"
                                                        />
                                                    ) : IconComponent ? (
                                                        <IconComponent className="w-4 h-4 text-white" />
                                                    ) : null}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-medium text-foreground">{agent.label}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">{agent.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full" onClick={() => { }}>
                    <Search className="w-4 h-4 mr-2" />
                    Browse Templates
                </Button>
            </div>
        </div>
    )
}
