/// <reference types="webpack-env" />

import { useNodesData } from "@xyflow/react";
import React, { ComponentType, useEffect, useState } from "react";
import { camelToDashCase } from "../lib/utils";
import { useFlowStore } from "../store/flow-store";
import { useRightDrawerStore } from "../store/right-drawer-store";
import { ResponseOutput } from "./custom/response-output";
export default function RightSideBody() {
  const [isLoading, setIsLoading] = useState(false);
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);

  const clickedElement = useFlowStore((state) => state.clickedElement);
  const nodeResults = useFlowStore((state) => state.nodeResults);
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


  const handleCopy = (event: any) => {
    console.log("Copy event:", event)
    // Handle copy to clipboard
    navigator.clipboard.writeText(`\${${event.name}}`)
  }

  const handleExport = (data: any) => {
    console.log("Exporting data:", data)
    // Custom export logic
  }

  const handleMaximize = () => {
    console.log("Maximize clicked")
    // Handle maximize modal
  }

  const handleCreateVariable = (copyEvent: any) => {
    console.log("Create variable:", copyEvent)
    // Handle variable creation logic
  }
  return (
    <div>
      {isLoading && <>Loading ........</>}
      {Component && !isLoading && (
        <Component
          selectedNode={selectedNode}
          handleRightSideDataUpdate={handleRightSideDataUpdate}
        />
      )}
      {nodeResults && <ResponseOutput
        runResult={nodeResults[selectedNode.id]}
        onCopy={handleCopy}
        onExport={handleExport}
        onMaximize={handleMaximize}
        onCreateVariable={handleCreateVariable}
        collapsed={1}
        hasDivider
      />}
    </div>
  );
}
