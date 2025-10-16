import { useFlowStore } from "../store/root-store";
import ConfigCard from "./config-panel/config-card";
import Header from "./config-panel/header";
import RightSideBody from "./right-side-body";


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
