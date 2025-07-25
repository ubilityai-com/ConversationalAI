"use client"

import * as React from "react"
import JsonView from "@uiw/react-json-view"
import { TriangleSolidArrow } from "@uiw/react-json-view/triangle-solid-arrow"
import { cn } from "../../lib/utils"

const customTheme = {
    borderRadius: "5px",
    padding: "15px",
    "--w-rjv-font-family": "monospace",
    "--w-rjv-color": "#9cdcfe",
    "--w-rjv-key-number": "#268bd2",
    "--w-rjv-key-string": "#9cdcfe",
    "--w-rjv-background-color": "#1e1e1e",
    "--w-rjv-line-color": "#36334280",
    "--w-rjv-arrow-color": "#838383",
    "--w-rjv-edit-color": "var(--w-rjv-color)",
    "--w-rjv-info-color": "#9c9c9c7a",
    "--w-rjv-update-color": "#9cdcfe",
    "--w-rjv-copied-color": "#9cdcfe",
    "--w-rjv-copied-success-color": "#28a745",
    "--w-rjv-curlybraces-color": "#d4d4d4",
    "--w-rjv-colon-color": "#d4d4d4",
    "--w-rjv-brackets-color": "#d4d4d4",
    "--w-rjv-ellipsis-color": "#cb4b16",
    "--w-rjv-quotes-color": "var(--w-rjv-key-string)",
    "--w-rjv-quotes-string-color": "var(--w-rjv-type-string-color)",
    "--w-rjv-type-string-color": "#ce9178",
    "--w-rjv-type-int-color": "#b5cea8",
    "--w-rjv-type-float-color": "#b5cea8",
    "--w-rjv-type-bigint-color": "#b5cea8",
    "--w-rjv-type-boolean-color": "#569cd6",
    "--w-rjv-type-date-color": "#b5cea8",
    "--w-rjv-type-url-color": "#3b89cf",
    "--w-rjv-type-null-color": "#569cd6",
    "--w-rjv-type-nan-color": "#859900",
    "--w-rjv-type-undefined-color": "#569cd6",
}

function deleteKeyFromArray(arr: any, path: (string | number)[]): any {
    const newPath = [...path]
    const newData = Array.isArray(arr) ? [...arr] : { ...arr }
    const elt = newPath.shift()

    if (newPath.length > 0 && elt !== undefined) {
        newData[elt] = deleteKeyFromArray(newData[elt], newPath)
    } else if (elt !== undefined) {
        if (Array.isArray(newData)) {
            return newData.filter((item, index) => index !== elt)
        }
        delete newData[elt]
        return newData
    }
    return newData
}

const CopyIcon: React.FC = () => {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="currentColor"
            preserveAspectRatio="xMidYMid meet"
            className="inline-block align-top text-blue-600 text-sm mr-1 h-4 w-4 cursor-pointer"
        >
            <g>
                <path d="m30 35h-25v-22.5h25v7.5h2.5v-12.5c0-1.4-1.1-2.5-2.5-2.5h-7.5c0-2.8-2.2-5-5-5s-5 2.2-5 5h-7.5c-1.4 0-2.5 1.1-2.5 2.5v27.5c0 1.4 1.1 2.5 2.5 2.5h25c1.4 0 2.5-1.1 2.5-2.5v-5h-2.5v5z m-20-27.5h2.5s2.5-1.1 2.5-2.5 1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5 1.3 2.5 2.5 2.5h2.5s2.5 1.1 2.5 2.5h-20c0-1.5 1.1-2.5 2.5-2.5z m-2.5 20h5v-2.5h-5v2.5z m17.5-5v-5l-10 7.5 10 7.5v-5h12.5v-5h-12.5z m-17.5 10h7.5v-2.5h-7.5v2.5z m12.5-17.5h-12.5v2.5h12.5v-2.5z m-7.5 5h-5v2.5h5v-2.5z" />
            </g>
        </svg>
    )
}

const DeleteIcon: React.FC = () => {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="currentColor"
            preserveAspectRatio="xMidYMid meet"
            className="inline-block align-top text-red-600 cursor-pointer text-sm mr-1 h-4 w-4"
        >
            <g>
                <path d="m28.6 25q0-0.5-0.4-1l-4-4 4-4q0.4-0.5 0.4-1 0-0.6-0.4-1.1l-2-2q-0.4-0.4-1-0.4-0.6 0-1 0.4l-4.1 4.1-4-4.1q-0.4-0.4-1-0.4-0.6 0-1 0.4l-2 2q-0.5 0.5-0.5 1.1 0 0.5 0.5 1l4 4-4 4q-0.5 0.5-0.5 1 0 0.7 0.5 1.1l2 2q0.4 0.4 1 0.4 0.6 0 1-0.4l4-4.1 4.1 4.1q0.4 0.4 1 0.4 0.6 0 1-0.4l2-2q0.4-0.4 0.4-1z m8.7-5q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" />
            </g>
        </svg>
    )
}

interface JsonEditorProps {
    value: any
    onChange?: (value: any) => void
    className?: string
    stopAdd?: boolean
    stopDelete?: boolean
    stopEdit?: boolean
    stopCopy?: boolean
    stopClear?: boolean
    stopPaste?: boolean
    rightSideInput?: boolean
    onCopy?: (event: any) => void
    changeCopyToAnotherRole?: (event: any) => void
}

const JsonEditor = React.forwardRef<HTMLDivElement, JsonEditorProps>(
    (
        {
            className,
            value = {},
            onChange,
            stopAdd = false,
            stopDelete = false,
            stopEdit = false,
            stopCopy = false,
            stopClear = false,
            stopPaste = false,
            rightSideInput = false,
            onCopy,
            changeCopyToAnotherRole,
            ...props
        },
        ref,
    ) => {
        const Copied = JsonView.Copied

        const handleJsonDelete = (event: any) => {
            if (onChange) {
                onChange(event.updated_src)
            }
        }

        const handleJsonEdit = (event: any) => {
            if (onChange) {
                onChange(event.updated_src)
            }
        }

        const handleJsonAdd = (event: any) => {
            if (onChange) {
                onChange(event.updated_src)
            }
        }

        const handleJsonCopy = (event: any) => {
            if (onCopy) {
                onCopy(event)
            }
        }

        return (
            <div ref={ref} className={cn("w-full break-words text-xs rounded", className)} {...props}>
                <JsonView
                    value={value}
                    style={{
                        ...customTheme,
                        padding: "15px",
                        borderRadius: "5px",
                    }}
                    indentWidth={15}
                    displayDataTypes={false}
                >
                    <Copied
                        render={(props: any, rowData: any) => {
                            const { style, onClick, ...restProps } = props
                            return (
                                <div className="inline-flex">
                                    {!stopCopy && (
                                        <span
                                            style={{ ...style, height: undefined, width: undefined }}
                                            onClick={() => {
                                                const copyEvent = {
                                                    name: rowData.keyName || false,
                                                    namespace: [false, ...(rowData.keys || [])],
                                                    src: rowData.value,
                                                }
                                                if (changeCopyToAnotherRole) {
                                                    changeCopyToAnotherRole(copyEvent)
                                                } else if (!stopCopy) {
                                                    handleJsonCopy(copyEvent)
                                                }
                                            }}
                                        >
                                            <CopyIcon />
                                        </span>
                                    )}
                                    {!stopDelete && rowData.keys && (
                                        <span
                                            style={{ ...style, height: undefined, width: undefined }}
                                            onClick={() => {
                                                const updatedArray = deleteKeyFromArray(value, rowData.keys)
                                                const event = {
                                                    existing_src: value,
                                                    updated_src: updatedArray,
                                                    name: rowData.keyName,
                                                    namespace: rowData.keys.length > 0 ? rowData.keys[0] : [],
                                                    existing_value: rowData.value,
                                                }
                                                handleJsonDelete(event)
                                            }}
                                        >
                                            <DeleteIcon />
                                        </span>
                                    )}
                                </div>
                            )
                        }}
                    />
                    <JsonView.Arrow>
                        <TriangleSolidArrow />
                    </JsonView.Arrow>
                </JsonView>
            </div>
        )
    },
)

JsonEditor.displayName = "JsonEditor"

export { JsonEditor }
