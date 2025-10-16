

import { Trash2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import type { AutomationItem } from "../../types/automation-types"
import AutomationSimple from "./automation"

interface FieldSetCardProps {
  fieldSet: Record<string, any>
  fieldSetIndex: number
  title: string
  structure: AutomationItem[]
  isAccordion: boolean
  disabled: boolean
  flowZoneSelectedId: string
  filledDataName: string
  variableName: string
  fieldsArray: AutomationItem[][]
  onRemove: (index: number) => void
  onFieldChange: (partialState: Record<string, any>, replace?: boolean) => void
}

/**
 * Individual field set card component
 */
export function FieldSetCard({
  fieldSet,
  fieldSetIndex,
  title,
  structure,
  isAccordion,
  disabled,
  flowZoneSelectedId,
  filledDataName,
  variableName,
  fieldsArray,
  onRemove,
  onFieldChange,
}: FieldSetCardProps) {
  return (
    <Card className={isAccordion ? "border-none" : "border border-gray-200"}>
      <CardContent className={isAccordion ? "p-0" : "p-4 space-y-3"}>
        {!isAccordion && (
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">
              {title} {fieldSetIndex + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              onClick={() => onRemove(fieldSetIndex)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}

        <div>
          <AutomationSimple
            filledDataName={filledDataName}
            disabled={disabled}
            indexForDynamic={fieldSetIndex}
            schema={isAccordion ? (fieldsArray[0] as AutomationItem[]) : structure}
            InDynamic={true}
            flowZoneSelectedId={flowZoneSelectedId}
            onFieldChange={(partialState: any, replace?: boolean) => {
              let newFilledData

              if (isAccordion) {
                newFilledData = replace ? partialState : { ...fieldSet, ...partialState }
              } else {
                newFilledData = fieldsArray.map((item: any, index: number) => {
                  if (index === fieldSetIndex) {
                    return replace ? partialState : { ...item, ...partialState }
                  }
                  return item
                })
              }

              onFieldChange({ [variableName]: newFilledData }, false)
            }}
            fieldValues={fieldSet}
          />
        </div>
      </CardContent>
    </Card>
  )
}
