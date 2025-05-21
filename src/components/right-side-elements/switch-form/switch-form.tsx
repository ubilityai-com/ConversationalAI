import { Automation } from "../../custom/automation";

interface RPAFormProps {
    clickedElement: any
    handleRightDrawerAnyFormChange: (
        event: any,
        index: number,
        innerIndex: string | number,
        entityIndex: number,
        isDynamicDataHandler: boolean,
    ) => void
    variablesNamesOfEachRPA: Record<string, string[]>
}

export default function SwitchForm({
    clickedElement,
    handleRightDrawerAnyFormChange,
    variablesNamesOfEachRPA,
}: RPAFormProps) {
    console.log({ clickedElement });

    return (
        <Automation
            ClickedElement={clickedElement}
            apiRes={clickedElement.data.json}
            depth={0}
            handleRightDrawerAnyFormChange={handleRightDrawerAnyFormChange}
        />
    )
}
