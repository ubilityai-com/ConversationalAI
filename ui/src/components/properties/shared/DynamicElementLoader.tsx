/// <reference types="webpack-env" />

import { useEffect, useState } from "react";
import { camelToDashCase } from "../../../lib/utils/utils";
import { SharedSection } from "./shared-section";
import { SharedListSection } from "./shared-section-list";
interface DynamicElementLoaderProps {
    extrasKey: string;
    extrasConfig: any;
    localConfig: any;
    selectedNodeId: string;
    updateNestedConfig: any;
    validators?:any
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const context = require.context(
    "../../../elements",
    true,
    /\.ts?$/
);
function loadElementByKey(key: string) {

    try {
        const path = `./${camelToDashCase(key)}-elements/index.ts`;
        const module = context(path);
        console.log({ module, key });

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
    validators



    // ////////
}: DynamicElementLoaderProps) {
    const [elements, setElements] = useState<any>(null);
    
    useEffect(() => {
        
        const loaded = loadElementByKey(camelToDashCase(extrasKey));
        setElements(loaded);
    }, [extrasKey]);

    if (!elements) {
        return <div className="text-xs text-muted-foreground">Loading {extrasKey}...</div>;
    }

    const SectionComponent = extrasConfig.list ? SharedListSection : SharedSection;

    return (
        <SectionComponent
            validators={validators}
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
