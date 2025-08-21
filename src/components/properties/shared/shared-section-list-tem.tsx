/// <reference types="webpack-env" />

import { ComponentType, useEffect, useState } from "react";
import { camelToDashCase } from "../../../lib/utils";
import { useFlowStore } from "../../../store/flow-store";

interface SectionProps {
  content: any;
  onConfigUpdate: (key: string, value: any) => void;
  id: string;
  type: string;
  schema: any;
  path: string;
  parentId: string;
  validators:any
}

export function SharedListItemSection({
  content,
  type,
  onConfigUpdate,
  id,
  schema,
  path,
  parentId,
  validators
}: SectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const updateSubNodeValidationById = useFlowStore(
    (s) => s.updateSubNodeValidationById
  );

  const [Component, setComponent] = useState<ComponentType<any> | null>(null);
  const [CustomComponent, setCustomComponent] =
    useState<ComponentType<any> | null>(null);
  const [customValidate, setCustomValidate] =
    useState<(val: any) => boolean>();
  const onContentUpdate = (value: any) => {
    onConfigUpdate(`${path}`, value);
  };

  const validate = (valid: boolean) => {
    updateSubNodeValidationById(parentId, id, valid);
  };

  useEffect(() => {
    setIsLoading(true);
    const loadComponent = async () => {
      setIsLoading(true);
      console.log({ schema });

      if (schema.automationConfig) {
        const module = require("../../automated-template");
        setComponent(() => module.default);
        if (schema.automationConfig === "semi-automated") {
          const context = require.context("../configs", true);
          const path = `./${schema.category}s/${camelToDashCase(
            type
          )}/${camelToDashCase(type)}`;
          const module = context(path);
          setComponent(() => module.default);
          setIsLoading(false);
        }
        setIsLoading(false);
        return;
      } else {
        const context = require.context("../configs", true);
        console.log({ content: context.keys() });

        const path = `./${schema.category}s/${camelToDashCase(
          type
        )}/${camelToDashCase(type)}`;
        const module = context(path);
        setComponent(() => module.default);
        setIsLoading(false);
      }
    };
    loadComponent();
  }, [type]);

  return (
    <div>
      {isLoading && <>Loading ........</>}
      {Component && !isLoading && (
        <Component
          selectedNodeId={parentId}
          contentPath={path}
          validators={validators}
          schema={schema.rightSideData.json}
          content={content}
          onContentUpdate={onContentUpdate}
          validate={validate}
          CustomComponent={CustomComponent}
        />
      )}
    </div>
  );
}
