/// <reference types="webpack-env" />

import { ComponentType, useEffect, useState } from "react";
import { useFlowStore } from "../../../store/flow-store";
import { camelToDashCase } from "../../../lib/utils";

interface SectionProps {
    content: any;
    onConfigUpdate: (key: string, value: any) => void;
    id: string;
    type: string;
    schema: any[];
    path: string;
    parentId: string;
}

export function SharedListItemSection({
    content,
    type,
    onConfigUpdate,
    id,
    schema,
    path,
    parentId
}: SectionProps) {
    const [isLoading, setIsLoading] = useState(false);
    const updateSubNodeValidationById = useFlowStore((s) => s.updateSubNodeValidationById);

    const [Component, setComponent] = useState<ComponentType<any> | null>(null);

    const onContentUpdate = (value: any) => {
        onConfigUpdate(`${path}`, value);
    };

    const validate = (valid: boolean) => {
        updateSubNodeValidationById(parentId, id, valid);
    };

    useEffect(() => {
        setIsLoading(true);

        try {
            const context = require.context(
                "../configs/tools",
                true, // Enable subdirectory search
                /\.tsx$/
            );

            const path = `./${camelToDashCase(type)}/${camelToDashCase(type)}.tsx`;

            const module = context(path);

            setComponent(() => module.default);
        } catch (error) {
            console.error(`Could not dynamically load component for type: ${type}`, error);
            setComponent(null);
        } finally {
            setIsLoading(false);
        }
    }, [type]);

    return (
        <div>
            {isLoading && <>Loading ........</>}
            {Component && !isLoading && (
                <Component
                    selectedNodeId={parentId}
                    schema={schema}
                    content={content}
                    onContentUpdate={onContentUpdate}
                    validate={validate}
                />
            )}
        </div>
    );
}
