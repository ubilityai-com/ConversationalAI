import { ComponentType, useEffect, useState } from "react";
import { useRightDrawerStore } from "../../../store/right-drawer-store";

interface SectionProps {
    content: any;
    onConfigUpdate: (key: string, value: any) => void;
    id: string;
    type: string;
    schema: any[]
    path: string
    counter: number
}
function camelToDashCase(str: string) {
    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2") // Split camelCase (aB → a-b)
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // Handle acronyms (RPA → rpa)
        .toLowerCase();
}
export function SharedListItemSection({
    content,
    type,
    onConfigUpdate,
    id,
    schema,
    path,
    counter
}: SectionProps) {
    const [isLoading, setIsLoading] = useState(false);
    const setValidationByKey = useRightDrawerStore((state) => state.setValidationByKey)

    const [Component, setComponent] = useState<ComponentType<any> | null>(null);
    const onContentUpdate = (value: any) => {
        onConfigUpdate(`${path}`, value)
    }
    const validate = (valid: boolean) => {
        setValidationByKey(id, `${type}_${counter}`, valid)
    }
    console.log({ type, counter });

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
                        selectedNodeId={id}
                        schema={schema}
                        content={content}
                        onContentUpdate={onContentUpdate}
                        counter={counter}
                        validate={validate}
                    />
                )}
        </div>

    );
}
