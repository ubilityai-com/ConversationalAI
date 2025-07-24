/// <reference types="webpack-env" />

import { useEffect, useState } from "react";
import { SharedSection } from "./shared-section";
import { SharedListSection } from "./shared-section-list";
interface DynamicElementLoaderProps {
    extrasKey: string;
    extrasConfig: any;
    localConfig: any;
    selectedNodeId: string;
    updateNestedConfig: any;
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const context = require.context(
    "../../../elements",
    true,
    /index\.tsx?$/
);
function loadElementByKey(key: string) {

    try {
        const path = `./${key}-elements/index.tsx`;
        const module = context(path);
        return module.default || module[`${capitalize(key)}Elements`];
    } catch (error) {
        console.warn(`No elements found for ${key}, skipping dynamic import.`, error);
        return null;
    }
}

export function DynamicElementLoader({
    extrasKey,
    extrasConfig,
    localConfig,
    selectedNodeId,
    updateNestedConfig,
}: DynamicElementLoaderProps) {
    const [elements, setElements] = useState<any>(null);

    useEffect(() => {
        const key = extrasKey === "tool" ? "tools" : extrasKey;
        const loaded = loadElementByKey(key);
        setElements(loaded);
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
