import type React from "react"

import { Fragment } from "react"
import ReactQuill from "react-quill"
import { LoopFromForm } from "../common/loop-from-end"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import DynamicFields from "./dynamic-fields"
import { SearchableSelect } from "./searchable-select"


// Quill editor formats and modules
const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link"]

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link"],
        ["clean"],
    ],
}

interface InputFieldProps {
    item: {
        label: string
        value: string
        placeholder?: string
        maxLength?: number
    }
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ item, onChange }: InputFieldProps) => (
    <div className="space-y-2 mb-4">
        <Label className="text-sm font-normal">{item.label}</Label>
        <Input
            value={item.value}
            placeholder={item.placeholder || ""}
            onChange={onChange}
            maxLength={item.maxLength}
        />
        {item.maxLength && item.value.length > item.maxLength && (
            <p className="text-xs text-destructive ml-2">Cannot be more than {item.maxLength} characters</p>
        )}
    </div>
)

interface AutomationPropsBase {
    ClickedElement: any;
    apiRes: any[];
    [key: string]: any;
}

// When depth is 0, handleRightDrawerAnyFormChange is optional
interface AutomationPropsDepth0 extends AutomationPropsBase {
    depth: 0;
    handleRightDrawerAnyFormChange: (
        event: any,
        index: number,
        innerIndex: number,
        entityIndex: number,
        isDynamicDataHandler: boolean,
    ) => void;

}

// When depth is not 0, handleRightDrawerAnyFormChange is required
interface AutomationPropsDepthNot0 extends AutomationPropsBase {
    depth: Exclude<number, 0>; // All numbers except 
    onChange: (obj: any) => void;

}

// Combined type
type AutomationProps = AutomationPropsDepth0 | AutomationPropsDepthNot0;

export function Automation({ ClickedElement, handleRightDrawerAnyFormChange, depth = 0, apiRes, ...restProps }: AutomationProps) {
    // Extract nested indices from props
    const newprops: Record<string, any> = {}
    Object.keys(restProps).forEach((key) => {
        if (key.includes("index") || key.includes("child")) {
            newprops[key] = restProps[key]
        }
    })

    const newDepth = depth === 0 ? depth : depth + 1

    // Handle changes in the form
    const onChangeAutomationSimple = (args: any) => {
        if (depth === 0) {
            // Top level change
            const newRes = [...apiRes]
            const keys = Object.keys(args)

            const rec = (index: number, keys: string[], arr: any) => {
                const key = keys.find((k) => k === `index${index}`)
                let obj = { ...arr }

                if (key?.includes("index") && keys.includes(`index${index + 1}`)) {
                    obj = {
                        ...obj,
                        options: {
                            ...obj.options,
                            [args[`child${index}`]]: obj.options[args[`child${index}`]].map((elt: any, ind: number) => {
                                if (ind === args[`index${index + 1}`]) {
                                    return rec(index + 1, keys, obj.options[args[`child${index}`]][args[`index${index + 1}`]])
                                } else {
                                    return elt
                                }
                            }),
                        },
                    }
                } else if (!keys.includes(`index${index + 1}`)) {
                    if (Array.isArray(args.name)) {
                        args.name.forEach((n: string, i: number) => {
                            obj = { ...obj, [n]: args.newValue[i] }
                        })
                    } else {
                        obj = {
                            ...obj,
                            [args.name]: args.newValue,
                        }
                    }
                }
                return obj
            }

            const newApiRes = [...apiRes]
            newApiRes[args[`index${0}`]] = rec(0, keys, newRes[args[`index${0}`]])

            handleRightDrawerAnyFormChange("json", newApiRes)
        } else {
            if (restProps.onChange)
                // Nested change, propagate up
                restProps.onChange({
                    ...newprops,
                    name: args.name,
                    newValue: args.newValue,
                    ...args,
                })
        }
    }

    return (
        <>
            {apiRes.map((item, index) => (
                <Fragment key={`item-${index}`}>
                    {item.title && <div className="mt-4 mb-2 p-1 text-sm font-medium bg-muted rounded">{item.title}</div>}

                    {item.subTitle && <div className="mt-2 text-sm text-muted-foreground">{item.subTitle}</div>}

                    {item.type === "textFormatter" && (
                        <>
                            <Label className="block text-sm font-normal mt-4 mb-1">{item.label}</Label>
                            <div className="custom-editor">
                                <ReactQuill
                                    className="mt-2"
                                    theme="snow"
                                    value={item.value}
                                    onChange={(updated_src) => {
                                        onChangeAutomationSimple({
                                            name: "value",
                                            [`index${newDepth !== 0 ? newDepth : "0"}`]: index,
                                            newValue: updated_src === "<p><br></p>" ? "" : updated_src,
                                        })
                                    }}
                                    formats={formats}
                                    modules={item.modules ? item.modules : modules}
                                />
                            </div>
                            {item.maxLength && item.value.replace(/<\/?[^>]+(>|$)/g, "").length > item.maxLength && (
                                <p className="text-xs text-destructive ml-2 mt-1">Cannot be more than {item.maxLength} characters</p>
                            )}
                        </>
                    )}

                    {item.type === "dropdown" && (
                        <>
                            <Label className="block text-sm font-normal mt-4 mb-1">{item.label}</Label>
                            <SearchableSelect
                                name={item.variableName}
                                options={item.list.map((opt: any) => ({
                                    value: opt.value,
                                    label: opt.option,
                                }))}
                                value={item.value}
                                onChange={(value) => {
                                    onChangeAutomationSimple({
                                        name: "value",
                                        [`index${newDepth !== 0 ? newDepth : "0"}`]: index,
                                        newValue: value,
                                    })
                                }}
                                placeholder={`Select ${item.label.toLowerCase()}`}
                            />

                            {item.options &&
                                Object.keys(item.options).map((keychild1) => (
                                    <Fragment key={`${keychild1}-options`}>
                                        {keychild1 === item.value && (
                                            <Automation
                                                ClickedElement={ClickedElement}
                                                apiRes={item.options[item.value]}
                                                {...{
                                                    ["index" + (newDepth !== 0 ? newDepth : "0")]: index,
                                                }}
                                                {...{
                                                    ["child" + (newDepth !== 0 ? newDepth : "0")]: item.value,
                                                }}
                                                depth={newDepth}
                                                {...restProps}
                                                onChange={(obj: any) => onChangeAutomationSimple(obj)}
                                            />
                                        )}
                                    </Fragment>
                                ))}
                        </>
                    )}

                    {item.type === "dynamic" && (
                        <DynamicFields
                            allTheJson={item}
                            json={item}
                            onChange={({ name, val }: { name: string; val: any }) => {
                                onChangeAutomationSimple({
                                    name: name,
                                    [`index${newDepth !== 0 ? newDepth : "0"}`]: index,
                                    newValue: val,
                                })
                            }}
                            level={0}
                            filledArray={item.fieldsArray}
                            title={item.title}
                        />
                    )}

                    {item.type === "textfield" && (
                        <InputField
                            item={item}
                            onChange={(event) => {
                                onChangeAutomationSimple({
                                    name: "value",
                                    [`index${newDepth !== 0 ? newDepth : "0"}`]: index,
                                    newValue: event.target.value,
                                })
                            }}
                        />
                    )}
                </Fragment>
            ))}
        </>
    )
}
