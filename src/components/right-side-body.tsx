import { Node } from '@xyflow/react';
import { ComponentType, useEffect, useState } from 'react';
import { useFlowStore } from '../store/flow-store';
import { useRightDrawerStore } from '../store/right-drawer-store';
function camelToDashCase(str: string) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}
export default function RightSideBody() {
    const [isLoading, setIsLoading] = useState(false)

    const [Component, setComponent] = useState<ComponentType<any> | null>(null);
    const clickedElement = useFlowStore(state => state.clickedElement)
    const entities = useFlowStore(state => state.entities)
    const intents = useFlowStore(state => state.intents)
    const operations = useFlowStore(state => state.operations)
    const nodes = useFlowStore(state => state.nodes)
    const handleRightDrawerAddCounters = useRightDrawerStore(state => state.handleRightDrawerAddCounters)
    const handleRightDrawerAddInnerCounters = useRightDrawerStore(state => state.handleRightDrawerAddInnerCounters)
    const handleRightDrawerCheckIfAINLPIsChosenInBefore = useRightDrawerStore(state => state.handleRightDrawerCheckIfAINLPIsChosenInBefore)
    const handleRightDrawerSubtractCounters = useRightDrawerStore(state => state.handleRightDrawerSubtractCounters)
    const handleRightDrawerSubtractInnerCounters = useRightDrawerStore(state => state.handleRightDrawerSubtractInnerCounters)
    const handleRightDrawerUploadIconClicked = useRightDrawerStore(state => state.handleRightDrawerUploadIconClicked)
    const handleRightDrawerAnyFormChange = useRightDrawerStore(state => state.handleRightDrawerAnyFormChange)


    const clickedElementChanged = !!clickedElement

    useEffect(() => {
        const loadComponent = async () => {
            setIsLoading(true)
            // Dynamically import the component with TypeScript typing
            const module = await import(`./right-side-elements/${camelToDashCase(clickedElement.type)}-form/${camelToDashCase(clickedElement.type)}-form.tsx`);
            setComponent(() => module.default);
            setIsLoading(false)
        };
        if (clickedElement?.type)
            loadComponent();
    }, [clickedElementChanged]);



    let ClickedElement
    if (clickedElement)
        ClickedElement = nodes.find((elt: Node) => elt.id === clickedElement.id);
    else return <></>

    return (
        <div className="p-4">
            {isLoading && <>Loading ........</>}
            {Component && Component.name === `${clickedElement.type}Form` && !isLoading &&
                <Component
                    handleRightDrawerAddCounters={handleRightDrawerAddCounters}
                    handleRightDrawerAddInnerCounters={handleRightDrawerAddInnerCounters}
                    handleRightDrawerAnyFormChange={handleRightDrawerAnyFormChange}
                    handleRightDrawerCheckIfAINLPIsChosenInBefore={handleRightDrawerCheckIfAINLPIsChosenInBefore}
                    handleRightDrawerSubtractCounters={handleRightDrawerSubtractCounters}
                    handleRightDrawerSubtractInnerCounters={handleRightDrawerSubtractInnerCounters}
                    handleRightDrawerUploadIconClicked={handleRightDrawerUploadIconClicked}
                    operations={operations}
                    clickedElement={ClickedElement}
                    entities={entities}
                    intents={intents} />
            }
        </div>
    );
}

