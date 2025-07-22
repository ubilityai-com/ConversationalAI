import { ComponentType, useEffect, useState } from "react";
import { useFlowStore } from "../../../store/flow-store";
import { camelToDashCase } from "../../../lib/utils";

interface SectionProps {
    content: any;
    onConfigUpdate: (key: string, value: any) => void;
    id: string;
    type: string;
    schema: any[]
    path: string
    parentId: string
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
        onConfigUpdate(`${path}`, value)
    }
    const validate = (valid: boolean) => {
        updateSubNodeValidationById(parentId, id, valid)
    }

    useEffect(() => {
        const loadComponent = async () => {
            setIsLoading(true);
            console.log(
                `../configs/tools/${camelToDashCase(
                    type
                )}/${camelToDashCase(type)}.tsx`
            );

            // Dynamically import the component with TypeScript typing
            const module = await import(
                `../configs/tools/${camelToDashCase(
                    type
                )}/${camelToDashCase(type)}.tsx`
            );

            setComponent(() => module.default);
            setIsLoading(false);
        };
        if (type) try {
            loadComponent()
        } catch (error) {
            console.log({ error });

        };
    }, [type]);
    return (

        <div>
            {isLoading && <>Loading ........</>}
            {Component &&
                Component.name === `${type}` &&
                !isLoading && (
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
