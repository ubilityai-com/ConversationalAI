/// <reference types="webpack-env" />

import { useNodesData } from "@xyflow/react";
import { ComponentType, useEffect, useState } from "react";
import { camelToDashCase } from "../lib/utils";
import { useFlowStore } from "../store/flow-store";
import { useRightDrawerStore } from "../store/right-drawer-store";
import { ResponseOutput } from "./custom/response-output";
import BinaryResult, { ResultOptions } from "./file-components/BinaryResult";

function hasFileBinaryDataKeyDeep(jsonObj: any) {
  for (let key in jsonObj) {
    if (key === "file_name") return true;

    if (typeof jsonObj[key] === "object" && jsonObj[key] !== null) {
      if (hasFileBinaryDataKeyDeep(jsonObj[key])) return true;
    }
  }
  return false;
}
export default function RightSideBody() {
  const [isLoading, setIsLoading] = useState(false);
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);
  const [CustomComponent, setCustomComponent] =
    useState<ComponentType<any> | null>(null);

  const [schema, setSchema] = useState<ComponentType<any[]> | null>(null);
  const [activeTab, setActiveTab] = useState('Binary');

  const clickedElement = useFlowStore((state) => state.clickedElement);
  const updateNodesValidationById = useFlowStore(
    (state) => state.updateNodesValidationById
  );

  const nodeResults = useFlowStore((state) => state.nodeResults);
  const updateNodeRightSideData = useRightDrawerStore(
    (state) => state.updateNodeRightSideData
  );

  const handleRightSideDataUpdate = (value: any,valid:boolean) => {
    updateNodeRightSideData(clickedElement.id, { rightSideData: value });
    validate(valid);
  };
  useEffect(() => {
    const loadComponent = async () => {
      setIsLoading(true);
      if (clickedElement.data.automationConfig) {
        const module = require("./automated-template");
        setComponent(() => module.default);
        setSchema(
          () =>
            require(`../elements/${camelToDashCase(clickedElement.data.category)}-elements/${clickedElement.type}Json`)[
              `${clickedElement.type}Json`
            ].defaults.json
        );
        if (clickedElement.data.automationConfig === "semi-automated") {
          const path = `./${clickedElement.data.category
            }-elements/${camelToDashCase(
              clickedElement.type
            )}/${camelToDashCase(clickedElement.type)}.tsx`;

          try {
            const context = require.context(
              "./right-side-elements",
              true,
              /\.tsx$/
            );

            const module = context(path);
            setCustomComponent(() => module.default);
          } catch (error) {
            console.error("Dynamic import failed for path:", path, error);
            setCustomComponent(null);
          } finally {
            setIsLoading(false);
          }
        }
        setIsLoading(false);
        return;
      } else {
        const path = `./${camelToDashCase(clickedElement.data.category)
          }-elements/${camelToDashCase(
            clickedElement.type
          )}/${camelToDashCase(clickedElement.type)}.tsx`;

        try {
          const context = require.context(
            "./right-side-elements",
            true,
            /\.tsx$/
          );

          const module = context(path);
          setComponent(() => module.default);
        } catch (error) {
          console.error("Dynamic import failed for path:", path, error);
          setComponent(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (clickedElement?.type && clickedElement?.data?.category) {
      loadComponent();
    }
  }, [clickedElement?.type, clickedElement?.data?.category]);

  const selectedNode = useNodesData(clickedElement?.id);
  const runResult = selectedNode ? nodeResults[selectedNode.id] : {}
  useEffect(() => {
    if (hasFileBinaryDataKeyDeep(runResult))
      setActiveTab("Binary")
    else setActiveTab("Json")
  }, [runResult])
  if (!selectedNode) return null;

  const handleCopy = (event: any) => {
    console.log("Copy event:", event);
    // Handle copy to clipboard
    navigator.clipboard.writeText(`\${${event.name}}`);
  };

  const handleExport = (data: any) => {
    console.log("Exporting data:", data);
    // Custom export logic
  };

  const handleMaximize = () => {
    console.log("Maximize clicked");
    // Handle maximize modal
  };

  const handleCreateVariable = (copyEvent: any) => {
    console.log("Create variable:", copyEvent);
    // Handle variable creation logic
  };
  const validate = (valid: boolean) => {
    updateNodesValidationById(selectedNode.id, valid);
  };

  return (
    <div>
      {isLoading && <>Loading ........</>}
      {Component && !isLoading && (
        <Component
          schema={schema}
          selectedNodeId={selectedNode.id}
          content={selectedNode.data.rightSideData}
          onContentUpdate={handleRightSideDataUpdate}
          validate={validate}
          ai={selectedNode?.data.category === "ai"}
          CustomComponent={CustomComponent}
        />
      )}
      {
        runResult && hasFileBinaryDataKeyDeep(runResult) &&
        <ResultOptions activeTab={activeTab} setActiveTab={setActiveTab} />
      }
      {runResult && hasFileBinaryDataKeyDeep(runResult) && activeTab === "Binary" &&
        <BinaryResult
          runResult={runResult}
          file={{
            name: runResult?.file_name,
            extension: runResult.file_name?.split(".").pop(),
            displayName: runResult?.file_name
          }} />}
      {runResult && activeTab === "Json" && (
        <ResponseOutput
          runResult={runResult}
          onCopy={handleCopy}
          onExport={handleExport}
          onMaximize={handleMaximize}
          onCreateVariable={handleCreateVariable}
          collapsed={1}
        // hasDivider
        />
      )}
    </div>
  );
}
