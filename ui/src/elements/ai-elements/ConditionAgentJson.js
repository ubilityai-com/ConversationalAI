import { GitBranch } from "lucide-react";

export const ConditionAgentJson = {
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
};
