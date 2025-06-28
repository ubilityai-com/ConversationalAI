import { Minus, Plus } from "lucide-react"
import * as React from "react"
import { Fragment, useState } from "react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { SearchableSelect } from "./searchable-select"
import TextOnlyTooltip from "./text-tooltip"


interface DynamicField {
    type: string
    variableName: string
    label?: string
    value?: string
    list?: Array<{ value: string; option: string }>
    options?: Record<string, any[]>
    json?: any
    required?: boolean
    [key: string]: any
}

interface DynamicComponentProps {
    flowZoneSelectedElement?: any
    innerButton?: boolean
    json: {
        type: string
        variableName: string
        title: string
        fieldsArray: DynamicField[][]
        structure: DynamicField[]
        required?: boolean
        maxLength?: number
        [key: string]: any
    }
    onChange: (args: { name: string; val: any }) => void
    level: number
    index?: number
    filledArray: DynamicField[][]
    title?: string
    [key: string]: any
}

// Helper function to extract values from JSON
const extractValues = (json: any) => {
    const array: Record<string, any>[] = []
    json.fieldsArray.forEach((field: any[]) => {
        const obj: Record<string, any> = {}
        field.forEach((field1: any) => {
            if (field1.hasOwnProperty("value")) {
                obj[field1.variableName] = field1.value
            } else if (field1.type === "dynamic") {
                obj[field1.json.variableName] = extractValues(field1.json)
            }
        })
        array.push(obj)
    })
    return array
}

const Dyn: React.FC<DynamicComponentProps> = (props) => {
    const { flowZoneSelectedElement, innerButton, json, onChange, level, index, filledArray, title, ...restProps } = props

    const [remove, setRemove] = useState(false)

    const onAddVariables = () => {
        let obj = {}
        const newElt = json.structure.map((field) => {
            obj = field
            if (field.type !== "dynamic") {
                return {
                    ...obj,
                    variableName: `${field.variableName}`,
                }
            } else {
                return obj
            }
        })

        if (level === 0) {
            onChange({ name: "fieldsArray", val: [...json.fieldsArray, newElt] })
        } else if (level === 1) {
            const dynamicType = filledArray[props[`index${level === 1 ? "" : level - 1}`]].find(
                (field, i) => field.type === "dynamic" && i === props[`innerIndex${level === 1 ? "" : level - 1}`],
            )

            if (!dynamicType) return

            const updatedDynamicType = {
                ...dynamicType,
                json: { ...dynamicType.json, fieldsArray: [...dynamicType.json.fieldsArray, newElt] },
            }

            const newArray = filledArray.map((field, i) => {
                if (i === props[`index${level === 1 ? "" : level - 1}`]) {
                    return field.map((field1, ind) =>
                        field1.type === "dynamic" && ind === props.innerIndex ? updatedDynamicType : field1,
                    )
                } else return field
            })

            onChange({ name: "fieldsArray", val: newArray })
        } else if (level === 2) {
            const { index1, index2, innerIndex1, innerIndex2, innerIndex } = props

            if (
                index1 === undefined ||
                index2 === undefined ||
                innerIndex1 === undefined ||
                innerIndex2 === undefined ||
                innerIndex === undefined
            )
                return

            let dynamicType = filledArray[index1]?.find((field, i) => field.type === "dynamic" && i === innerIndex1)

            if (!dynamicType?.json?.fieldsArray?.[index2]) return

            dynamicType = dynamicType.json.fieldsArray[index2].find(
                (field: any, ind: number) => field.type === "dynamic" && ind === innerIndex2,
            )

            if (!dynamicType) return

            const updatedDynamicType = {
                ...dynamicType,
                json: { ...dynamicType.json, fieldsArray: [...dynamicType.json.fieldsArray, newElt] },
            }

            const newArray = filledArray.map((field, i) => {
                if (i === index1) {
                    const elt = field.map((field1, ind) => {
                        if (field1.type === "dynamic" && ind === innerIndex1) {
                            return {
                                ...field1,
                                json: {
                                    ...field1.json,
                                    fieldsArray: field1.json.fieldsArray.map((field2: any, ind: number) => {
                                        if (index2 === ind) {
                                            return field2.map((field3: any, i: number) => {
                                                if (field3.type === "dynamic" && i === innerIndex) {
                                                    return updatedDynamicType
                                                } else return field3
                                            })
                                        } else return field2
                                    }),
                                },
                            }
                        } else return field1
                    })
                    return elt
                } else return field
            })

            onChange({ name: "fieldsArray", val: newArray })
        }
    }

    const onRemoveVariables = (index: number) => {
        setRemove((prev) => !prev)

        if (level === 0) {
            const newVariables = json.fieldsArray.filter((_, i) => i !== index)
            onChange({ name: "fieldsArray", val: newVariables })
        } else if (level === 1) {
            const { index1, innerIndex } = props

            if (index1 === undefined || innerIndex === undefined) return

            const newArray = filledArray.map((field, i) => {
                if (i === index1) {
                    return field.map((field1, inde) =>
                        field1.type === "dynamic" && inde === innerIndex
                            ? {
                                ...field1,
                                json: {
                                    ...field1.json,
                                    fieldsArray: field1.json.fieldsArray.filter((_: any, ind: number) => ind !== index),
                                },
                            }
                            : field1,
                    )
                } else return field
            })

            onChange({ name: "fieldsArray", val: newArray })
        } else if (level === 2) {
            const { index1, index2, innerIndex1, innerIndex2, innerIndex } = props

            if (
                index1 === undefined ||
                index2 === undefined ||
                innerIndex1 === undefined ||
                innerIndex2 === undefined ||
                innerIndex === undefined
            )
                return

            const newArray = filledArray.map((field, i) => {
                if (i === index1) {
                    const elt = field.map((field1, ind) => {
                        if (field1.type === "dynamic" && ind === innerIndex1) {
                            return {
                                ...field1,
                                json: {
                                    ...field1.json,
                                    fieldsArray: field1.json.fieldsArray.map((field2: any, ind: number) => {
                                        if (index2 === ind) {
                                            return field2.map((field3: any, i: number) => {
                                                if (field3.type === "dynamic" && i === innerIndex) {
                                                    return {
                                                        ...field3,
                                                        json: {
                                                            ...field3.json,
                                                            fieldsArray: field3.json.fieldsArray.filter((_: any, ind4: number) => ind4 !== index),
                                                        },
                                                    }
                                                } else return field3
                                            })
                                        } else return field2
                                    }),
                                },
                            }
                        } else return field1
                    })
                    return elt
                } else return field
            })

            onChange({ name: "fieldsArray", val: newArray })
        }
    }

    const onChangeVariables = ({
        index,
        event,
        innerIndex,
        name,
        child1,
        child2,
        child3,
        indexchild1,
        indexchild2,
        indexchild3,
        keyToChange,
    }: {
        index: number
        event: any
        innerIndex: number
        name: string
        child1?: string
        child2?: string
        child3?: string
        indexchild1?: number
        indexchild2?: number
        indexchild3?: number
        keyToChange: string
    }) => {
        if (level === 0) {
            onChange({
                name: "fieldsArray",
                val: filledArray.map((field, ind) => {
                    if (index === ind) {
                        return field.map((field1, ind1) => {
                            if (innerIndex === ind1) {
                                if (field1.options && child1 && !child2 && !child3 && indexchild1 !== undefined) {
                                    return {
                                        ...field1,
                                        options: {
                                            ...field1.options,
                                            [child1]: field1.options[child1].map((field2: any, ind2: number) => {
                                                if (indexchild1 === ind2) {
                                                    return {
                                                        ...field2,
                                                        [keyToChange]:
                                                            field2.type === "checkbox" || field2.type === "dynamic" || field2.type === "multiselect"
                                                                ? event
                                                                : event.target.value,
                                                    }
                                                } else {
                                                    return field2
                                                }
                                            }),
                                        },
                                    }
                                } else if (field1.options && child1 && child2 && !child3 && indexchild1 !== undefined && indexchild2 !== undefined) {
                                    return {
                                        ...field1,
                                        options: {
                                            ...field1.options,
                                            [child1]: field1.options[child1].map((field2: any, ind2: number) => {
                                                if (indexchild1 === ind2) {
                                                    return {
                                                        ...field2,
                                                        options: {
                                                            ...field2.options,
                                                            [child2]: field2.options[child2].map((field3: any, ind3: number) => {
                                                                if (indexchild2 === ind3) {
                                                                    return {
                                                                        ...field3,
                                                                        [keyToChange]:
                                                                            field3.type === "checkbox" ||
                                                                                field3.type === "dynamic" ||
                                                                                field3.type === "multiselect"
                                                                                ? event
                                                                                : event.target.value,
                                                                    }
                                                                } else return field3
                                                            }),
                                                        },
                                                    }
                                                } else return field2
                                            }),
                                        },
                                    }
                                } else if (
                                    field1.options &&
                                    child1 &&
                                    child2 &&
                                    child3 &&
                                    indexchild1 !== undefined &&
                                    indexchild2 !== undefined &&
                                    indexchild3 !== undefined
                                ) {
                                    return {
                                        ...field1,
                                        options: {
                                            ...field1.options,
                                            [child1]: field1.options[child1].map((field2: any, ind2: number) => {
                                                if (indexchild1 === ind2) {
                                                    return {
                                                        ...field2,
                                                        options: {
                                                            ...field2.options,
                                                            [child2]: field2.options[child2].map((field3: any, ind3: number) => {
                                                                if (indexchild2 === ind3) {
                                                                    return {
                                                                        ...field3,
                                                                        options: {
                                                                            ...field3.options,
                                                                            [child3]: field3.options[child3].map((field4: any, ind4: number) => {
                                                                                if (indexchild3 === ind4) {
                                                                                    return {
                                                                                        ...field4,
                                                                                        [keyToChange]:
                                                                                            field4.type === "checkbox" ||
                                                                                                field4.type === "dynamic" ||
                                                                                                field4.type === "multiselect"
                                                                                                ? event
                                                                                                : event.target.value,
                                                                                    }
                                                                                } else return field4
                                                                            }),
                                                                        },
                                                                    }
                                                                } else return field3
                                                            }),
                                                        },
                                                    }
                                                } else return field2
                                            }),
                                        },
                                    }
                                } else {
                                    return {
                                        ...field1,
                                        [keyToChange]:
                                            field1.type === "checkbox" ||
                                                field1.type === "dynamic" ||
                                                field1.type === "multiselect" ||
                                                field1.type === "api"
                                                ? event
                                                : event.target.value,
                                    }
                                }
                            } else return field1
                        })
                    }
                    return field
                }),
            })
        } else if (level === 1) {
            const { index1, innerIndex1 } = props

            if (index1 === undefined || innerIndex1 === undefined) return

            onChange({
                name: "fieldsArray",
                val: filledArray.map((field, ind) => {
                    if (index1 === ind) {
                        return field.map((field1, ind1) => {
                            if (innerIndex1 === ind1) {
                                return {
                                    ...field1,
                                    json: {
                                        ...json,
                                        fieldsArray: field1.json.fieldsArray.map((field2: any, ind2: number) => {
                                            if (index === ind2) {
                                                return field2.map((field3: any) => {
                                                    if (field3.variableName === name) {
                                                        return {
                                                            ...field3,
                                                            value: field3.type === "checkbox" ? event : event.target.value,
                                                        }
                                                    } else return field3
                                                })
                                            }
                                            return field2
                                        }),
                                    },
                                }
                            }
                            return field1
                        })
                    }
                    return field
                }),
            })
        } else if (level === 2) {
            const { index1, index2, innerIndex1, innerIndex2 } = props

            if (index1 === undefined || index2 === undefined || innerIndex1 === undefined || innerIndex2 === undefined) return

            onChange({
                name: "fieldsArray",
                val: filledArray.map((field, ind) => {
                    if (index1 === ind) {
                        return field.map((field1, ind1) => {
                            if (innerIndex1 === ind1) {
                                return {
                                    ...field1,
                                    json: {
                                        ...field1.json,
                                        fieldsArray: field1.json.fieldsArray.map((field2: any, ind2: number) => {
                                            if (index2 === ind2) {
                                                return field2.map((field3: any, ind3: number) => {
                                                    if (innerIndex2 === ind3) {
                                                        return {
                                                            ...field3,
                                                            json: {
                                                                ...json,
                                                                fieldsArray: field3.json.fieldsArray.map((field4: any, ind4: number) => {
                                                                    if (index === ind4) {
                                                                        return field4.map((field5: any) => {
                                                                            if (field5.variableName === name) {
                                                                                return {
                                                                                    ...field5,
                                                                                    value: field5.type === "checkbox" ? event : event.target.value,
                                                                                }
                                                                            } else return field5
                                                                        })
                                                                    } else return field4
                                                                }),
                                                            },
                                                        }
                                                    } else return field3
                                                })
                                            } else return field2
                                        }),
                                    },
                                }
                            }
                            return field1
                        })
                    }
                    return field
                }),
            })
        }
    }

    // Collect props to pass down to nested components
    const newProps: Record<string, any> = {}
    Object.keys(props).forEach((key) => {
        if (key.includes("index") || key.includes("title") || key.includes("allTheJson") || key.includes("innerIndex")) {
            newProps[key] = props[key]
        }
    })

    return (
        <div
            className={cn("space-y-2", json.required && json.fieldsArray.length === 0 && "border-l-2 border-red-500 pl-2")}
        >
            {json.fieldsArray.length > 0 &&
                json.fieldsArray.map((field, index) => (
                    <Fragment key={`field-${index}`}>
                        <div className="flex items-center justify-between px-2 py-1 border-l-2 border-gray-200 pl-2">
                         {json.type!=="accordion" &&   <span className="text-sm font-medium ml-2">
                                {json.title.substring(0, json.title.length - 1) + " " + (index + 1)}
                            </span>}

                            <div className="flex items-center">
                                {json.type!=="accordion" && json.fieldsArray.length > 1 && (
                                    <TextOnlyTooltip
                                        title={"Remove " + json.title.substring(0, json.title.length - 1) + " " + (index + 1)}
                                        placement="left"
                                    >
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => onRemoveVariables(index)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </TextOnlyTooltip>
                                )}

                                {innerButton && json.fieldsArray.length === index + 1 && (
                                    <TextOnlyTooltip title="Add New Sub Condition" placement="left">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-6 w-6 ml-1 bg-green-600 hover:bg-green-700 text-white"
                                            onClick={onAddVariables}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </TextOnlyTooltip>
                                )}
                            </div>
                        </div>

                        <div className="ml-4 space-y-3">
                            {field.map((field1, ind) => (
                                <div key={`${ind}-${remove}`}>
                                    {field1.type === "textfield" && (
                                        <div className="space-y-2">
                                            <Label className="text-sm font-normal">{field1.label}</Label>
                                            <Input
                                                value={field1.value || ""}
                                                placeholder={field1.placeholder || ""}
                                                onChange={(e) => {
                                                    onChangeVariables({
                                                        keyToChange: "value",
                                                        event: e,
                                                        index: index,
                                                        innerIndex: ind,
                                                        name: field1.variableName,
                                                    })
                                                }}
                                            />
                                        </div>
                                    )}

                                    {field1.type === "dynamic" && (
                                        <Dyn
                                            json={field1.json}
                                            onChange={onChange}
                                            innerButton={field1.json.innerButton}
                                            level={level + 1}
                                            {...{ [`index${level + 1}`]: index }}
                                            index={index}
                                            {...newProps}
                                            filledArray={filledArray}
                                            innerIndex={ind}
                                            {...{ [`innerIndex${level + 1}`]: ind }}
                                        />
                                    )}

                                    {field1.type === "dropdown" && (
                                        <div className="space-y-2">
                                            <Label className="text-sm font-normal">{field1.label}</Label>
                                            <SearchableSelect
                                                name={field1.variableName}
                                                options={field1.list?.map((opt) => ({ value: opt.value, label: opt.option })) || []}
                                                value={field1.value || ""}
                                                onChange={(value) => {
                                                    onChangeVariables({
                                                        keyToChange: "value",
                                                        event: { target: { value } },
                                                        index,
                                                        innerIndex: ind,
                                                        name: field1.variableName,
                                                    })
                                                }}
                                                placeholder={`Select ${field1.label?.toLowerCase()}`}
                                            />

                                            {field1.options &&
                                                Object.keys(field1.options).map((keychild1) => (
                                                    <Fragment key={`${keychild1}-options`}>
                                                        {keychild1 === field1.value && (
                                                            <div className="ml-4 space-y-3">
                                                                {field1.options && field1.options[keychild1].map((itemChild1: any, indexch1: number) => (
                                                                    <Fragment key={`child-${indexch1}`}>
                                                                        {itemChild1.type === "textfield" && (
                                                                            <div className="space-y-2">
                                                                                <Label className="text-sm font-normal">{itemChild1.label}</Label>
                                                                                <Input
                                                                                    value={itemChild1.value || ""}
                                                                                    placeholder={itemChild1.placeholder || ""}
                                                                                    onChange={(e) => {
                                                                                        onChangeVariables({
                                                                                            keyToChange: "value",
                                                                                            event: e,
                                                                                            index,
                                                                                            innerIndex: ind,
                                                                                            name: field1.variableName,
                                                                                            indexchild1: indexch1,
                                                                                            child1: keychild1,
                                                                                        })
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}

                                                                        {itemChild1.type === "dropdown" && (
                                                                            <div className="space-y-2">
                                                                                <Label className="text-sm font-normal">{itemChild1.label}</Label>
                                                                                <SearchableSelect
                                                                                    name={itemChild1.variableName}
                                                                                    options={
                                                                                        itemChild1.list?.map((opt: any) => ({
                                                                                            value: opt.value,
                                                                                            label: opt.option,
                                                                                        })) || []
                                                                                    }
                                                                                    value={itemChild1.value || ""}
                                                                                    onChange={(value) => {
                                                                                        onChangeVariables({
                                                                                            keyToChange: "value",
                                                                                            event: { target: { value } },
                                                                                            index,
                                                                                            innerIndex: ind,
                                                                                            name: itemChild1.variableName,
                                                                                            indexchild1: indexch1,
                                                                                            child1: keychild1,
                                                                                        })
                                                                                    }}
                                                                                    placeholder={`Select ${itemChild1.label?.toLowerCase()}`}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Fragment>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </Fragment>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Fragment>
                ))}

            {json.type!=="accordion"  && (
                <div className="mt-4">
                    <Label className="block text-xs font-normal mb-2">{`Add new ${json.title}`}</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onAddVariables}
                        className="mt-2"
                    >

                        <Plus className="h-4 w-4 mr-2" /> ADD
                    </Button>
                </div>
            )}

            {json.type!=="accordion"  && json.fieldsArray.length === 0 && (
                <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-xs font-normal ml-2">{`Add new ${json.title}`}</span>
                    <TextOnlyTooltip title="Add Sub Condition" placement="left">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-green-600 hover:bg-green-700 text-white"
                            onClick={onAddVariables}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </TextOnlyTooltip>
                </div>
            )}
        </div>
    )
}

export default React.memo(Dyn)
