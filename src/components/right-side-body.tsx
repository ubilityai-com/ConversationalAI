import { Node } from '@xyflow/react';
import { ComponentType, useEffect, useState } from 'react';
function camelToDashCase(str: string) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}
export default function RightSideBody({ parentThis }: { parentThis: any }) {
    const [isLoading, setIsLoading] = useState(false)

    const [Component, setComponent] = useState<ComponentType<any> | null>(null);


    useEffect(() => {
        const loadComponent = async () => {
            setIsLoading(true)
            // Dynamically import the component with TypeScript typing
            const module = await import(`./right-side-elements/${camelToDashCase(parentThis.state.clickedElement.type)}-form/${camelToDashCase(parentThis.state.clickedElement.type)}-form.tsx`);
            setComponent(() => module.default);
            setIsLoading(false)
        };
        if (parentThis.state.clickedElement?.type)
            loadComponent();
    }, [parentThis.state.clickedElement]);



    let ClickedElement
    if (parentThis.state.clickedElement)
        ClickedElement = parentThis.state.nodes.find((elt: Node) => elt.id === parentThis.state.clickedElement.id);
    else return <></>

    return (
        <div className="p-4">
            {isLoading && <>Loading ........</>}
            {Component && Component.name === `${parentThis.state.clickedElement.type}Form` && !isLoading &&
                <Component
                    handleRightDrawerAddCounters={parentThis.handleRightDrawerAddCounters}
                    handleRightDrawerAddInnerCounters={parentThis.handleRightDrawerAddInnerCounters}
                    handleRightDrawerAnyFormChange={parentThis.handleRightDrawerAnyFormChange}
                    handleRightDrawerCheckIfAINLPIsChosenInBefore={parentThis.handleRightDrawerCheckIfAINLPIsChosenInBefore}
                    handleRightDrawerSubtractCounters={parentThis.handleRightDrawerSubtractCounters}
                    handleRightDrawerSubtractInnerCounters={parentThis.handleRightDrawerSubtractInnerCounters}
                    handleRightDrawerUploadIconClicked={parentThis.handleRightDrawerUploadIconClicked}
                    operations={parentThis.state.operations}
                    clickedElement={ClickedElement}
                    entities={parentThis.state.entities}
                    intents={parentThis.state.intents} />
            }
        </div>
    );
}

