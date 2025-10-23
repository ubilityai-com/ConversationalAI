import { Braces, Files, ListChecks, MessageSquare, Variable } from "lucide-react"
import { VariableTypeConfig } from "./types"

export const typeConfig: Record<string, VariableTypeConfig> = {
    constant: {
        icon: Braces,
        label: "Constants",
        description: "Fixed values and configuration settings",
        badgeClass: "bg-constant-bg text-constant border-constant",
    },
    output: {
        icon: Variable,
        label: "Outputs",
        description: "Generated values and computation results",
        badgeClass: "bg-output-bg text-output border-output",
    },
    dialogue: {
        icon: MessageSquare,
        label: "Dialogue",
        description: "Conversation flow and user interaction data",
        badgeClass: "bg-dialogue-bg text-dialogue border-dialogue",
    },
    dataCollector: {
        icon: ListChecks,
        label: "Data Collectors",
        description: "Collecting data from users using the data collector node",
        badgeClass: "bg-dialogue-bg text-dialogue border-dialogue",
    },
    file: {
        icon: Files,
        label: "Files",
        description: "Static files",
        badgeClass: "bg-dialogue-bg text-dialogue border-dialogue",
    },
}
