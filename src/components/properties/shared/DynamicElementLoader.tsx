import { Suspense, useEffect, useState } from "react";
import { SharedListSection } from "./shared-section-list";
import { loadElementByKey } from "../../../lib/utils";
import { SharedSection } from "./shared-section";

interface DynamicElementLoaderProps {
    extrasKey: string;
    extrasConfig: any;
    localConfig: any;
    selectedNodeId: string;
    updateNestedConfig: any;
}

export function DynamicElementLoader({
    extrasKey,
    extrasConfig,
    localConfig,
    selectedNodeId,
    updateNestedConfig
}: DynamicElementLoaderProps) {
    const [elements, setElements] = useState<any>(null);

    useEffect(() => {
        async function load() {
            const loaded = await loadElementByKey(extrasKey === "tool" ? "tools" : extrasKey);
            setElements(loaded);
        }
        load();
    }, [extrasKey]);

    if (!elements) {
        return <div className="text-xs text-muted-foreground">Loading {extrasKey}...</div>;
    }

    const SectionComponent = extrasConfig.list ? SharedListSection : SharedSection;

    return (
        <SectionComponent
            defaultType={extrasConfig.type}
            description={extrasConfig.description}
            elements={elements}
            title={extrasConfig.title}
            variableName={extrasKey}
            config={localConfig}
            id={selectedNodeId}
            onConfigUpdate={updateNestedConfig}
        />
    );
}
