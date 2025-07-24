/// <reference types="webpack-env" />

import { useNodesData } from "@xyflow/react";
import { ComponentType, useEffect, useState } from "react";
import { camelToDashCase } from "../lib/utils";
import { useFlowStore } from "../store/flow-store";
import { useRightDrawerStore } from "../store/right-drawer-store";
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

      const path = `./${clickedElement.data.nodeType}-elements/${camelToDashCase(
        clickedElement.type
      )}-form/${camelToDashCase(clickedElement.type)}-form.tsx`;

      try {
        const context = require.context(
          "./right-side-elements",
          true,
          /-form\.tsx$/
        );

        const module = context(path);
        setComponent(() => module.default);
      } catch (error) {
        console.error("Dynamic import failed for path:", path, error);
        setComponent(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (clickedElement?.type && clickedElement?.data?.nodeType) {
      loadComponent();
    }
  }, [clickedElement?.type, clickedElement?.data?.nodeType]);

  const selectedNode = useNodesData(clickedElement?.id);

  if (!selectedNode) return null;

  return (
    <div>
      {isLoading && <>Loading ........</>}
      {Component && !isLoading && (
        <Component
          selectedNode={selectedNode}
          handleRightSideDataUpdate={handleRightSideDataUpdate}
        />
      )}
    </div>
  );
}
