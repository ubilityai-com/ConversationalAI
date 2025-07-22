import { useNodesData } from "@xyflow/react";
import { ComponentType, useEffect, useState } from "react";
import { useFlowStore } from "../store/flow-store";
import { useRightDrawerStore } from "../store/right-drawer-store";
import { camelToDashCase } from "../lib/utils";

export default function RightSideBody() {
  const [isLoading, setIsLoading] = useState(false);

  const [Component, setComponent] = useState<ComponentType<any> | null>(null);
  const clickedElement = useFlowStore((state) => state.clickedElement);
  const updateNodeRightSideData = useRightDrawerStore(
    (state) => state.updateNodeRightSideData
  );

  const handleRightSideDataUpdate = (value: any) => {
    updateNodeRightSideData(clickedElement.id, { rightSideData: value });
  };

  useEffect(() => {

    const loadComponent = async () => {
      setIsLoading(true);
      console.log(
        `./right-side-elements/${clickedElement.data.nodeType}-elements/${camelToDashCase(
          clickedElement.type
        )}-form/${camelToDashCase(clickedElement.type)}-form.tsx`
      );

      // Dynamically import the component with TypeScript typing
      const module = await import(
        `./right-side-elements/${clickedElement.data.nodeType}-elements/${camelToDashCase(
          clickedElement.type
        )}-form/${camelToDashCase(clickedElement.type)}-form.tsx`
      );

      setComponent(() => module.default);
      setIsLoading(false);
    };
    if (clickedElement?.type) loadComponent();
  }, [clickedElement?.type]);

  const selectedNode = useNodesData(clickedElement?.id);

  if (!selectedNode) return <></>;

  return (
    <div>
      {isLoading && <>Loading ........</>}
      {Component &&
        Component.name === `${selectedNode.type}Form` &&
        !isLoading && (
          <Component
            selectedNode={selectedNode}
            handleRightSideDataUpdate={handleRightSideDataUpdate}
          />
        )}
    </div>
  );
}
