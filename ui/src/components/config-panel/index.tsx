import { useFlowStore } from "../../store/root-store";
import RightSideBody from "../right-side-body";
import ConfigCard from "./config-card";
import Header from "./header";

export function PropertiesPanel() {
  const selectedNode = useFlowStore((state) => state.clickedElement);

  if (!selectedNode) return null;

  return (
    <div className="bg-white border-l border-gray-200 flex flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto p-4">
        <ConfigCard
          title={`${selectedNode?.type} Configuration`}
        >
          <RightSideBody />
        </ConfigCard>
      </div>
    </div>
  );
}
