import { LoopFromForm } from "../../common/loop-from-end"
import { SearchableSelect } from "../../custom/searchable-select"
import { Label } from "../../ui/label"


interface KnowledgeBaseFormProps {
    clickedElement: any
    handleRightDrawerAnyFormChange: (
        event: any,
        index: number,
        innerIndex: number | string,
        entityIndex: number,
        isDynamicDataHandler: boolean,
    ) => void
    limitArray: string[] | number[]
    scoreArray: string[] | number[]
}

export function KnowledgeBaseForm({
    clickedElement,
    handleRightDrawerAnyFormChange,
    limitArray,
    scoreArray,
}: KnowledgeBaseFormProps) {
    return (
        <div className="space-y-4">
            <div>
                <Label className="block text-sm p-1 mb-1 font-normal">Set the limit of recommended content</Label>
                <SearchableSelect
                    name="limit"
                    options={limitArray.map((limit) => ({
                        value: limit.toString(),
                        label: limit.toString(),
                    }))}
                    value={clickedElement.data.limit?.toString() || ""}
                    onChange={(value) => {
                        const event = { target: { name: "limit", value } }
                        handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
                    }}
                    placeholder="Select a limit"
                    className="w-[93%] mx-2 mb-2 h-9 text-xs"
                />
            </div>

            <div>
                <Label className="block text-sm p-1 mb-1 font-normal">Similarity score in %</Label>
                <SearchableSelect
                    name="score"
                    options={scoreArray.map((score) => ({
                        value: score.toString(),
                        label: score.toString(),
                    }))}
                    value={clickedElement.data.score?.toString() || ""}
                    onChange={(value) => {
                        const event = { target: { name: "score", value } }
                        handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
                    }}
                    placeholder="Select a score"
                    className="w-[93%] mx-2 mb-2 h-9 text-xs"
                />
            </div>

            <LoopFromForm
                clickedElement={clickedElement}
                handleRightDrawerAnyFormChange={handleRightDrawerAnyFormChange}
            />
        </div>
    )
}
