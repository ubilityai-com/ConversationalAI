import JsonView from "@uiw/react-json-view"
import { TriangleSolidArrow } from "@uiw/react-json-view/triangle-solid-arrow"
import * as React from "react"
import { cn } from "../../lib/utils"
import { pathExistsInOutputVariables } from "../../lib/variable-utils"
import { useFlowStore } from "../../store/flow-store"

const customTheme = {
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

const CopyIcon: React.FC = () => {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="currentColor"
            preserveAspectRatio="xMidYMid meet"
            className="inline-block align-top text-amber-600 text-sm mr-1 h-4 w-4 cursor-pointer"
        >
            <g>
                <path d="m30 35h-25v-22.5h25v7.5h2.5v-12.5c0-1.4-1.1-2.5-2.5-2.5h-7.5c0-2.8-2.2-5-5-5s-5 2.2-5 5h-7.5c-1.4 0-2.5 1.1-2.5 2.5v27.5c0 1.4 1.1 2.5 2.5 2.5h25c1.4 0 2.5-1.1 2.5-2.5v-5h-2.5v5z m-20-27.5h2.5s2.5-1.1 2.5-2.5 1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5 1.3 2.5 2.5 2.5h2.5s2.5 1.1 2.5 2.5h-20c0-1.5 1.1-2.5 2.5-2.5z m-2.5 20h5v-2.5h-5v2.5z m17.5-5v-5l-10 7.5 10 7.5v-5h12.5v-5h-12.5z m-17.5 10h7.5v-2.5h-7.5v2.5z m12.5-17.5h-12.5v2.5h12.5v-2.5z m-7.5 5h-5v2.5h5v-2.5z" />
            </g>
        </svg>
    )
}

interface ResponseOutputProps {
    runResult?: any
    stopCopy?: boolean
    collapsed?: number
    hasDivider?: boolean
    json?: any
    showMaximize?: boolean
    collapseStringsAfterLength?: number
    className?: string
    onCopy?: (event: any) => void
    onExport?: (data: any) => void
    onMaximize?: () => void
    onCreateVariable?: (event: any) => void
}

const ResponseOutput = React.forwardRef<HTMLDivElement, ResponseOutputProps>(
    (
        {
            className,
            runResult,
            stopCopy = false,
            collapsed = 2,
            hasDivider = false,
            json,
            showMaximize = false,
            collapseStringsAfterLength = 100,
            onCopy,
            onExport,
            onMaximize,
            onCreateVariable,
            ...props
        },
        ref,
    ) => {
        const { setFormDialogStatus, setIsFormDialogOpen, setDialogProps, setShowSnackBarMessage, clickedElement, outputVariables } = useFlowStore()

        const Copied = JsonView.Copied
        const handleCreateVariable = (copyEvent: any) => {

            if (copyEvent.name !== false) {
                let copiedPath = reformatPathArray(copyEvent.namespace);

                let isCopiedPathAlreadyExists =
                    pathExistsInOutputVariables(
                        copiedPath,
                        clickedElement.id,
                        outputVariables
                    );
                if (isCopiedPathAlreadyExists) {

                    setShowSnackBarMessage({
                        color: "destructive",
                        duration: 1000,
                        open: true,
                        message:
                            "Path already assigned to ${" + isCopiedPathAlreadyExists + "}",
                    })
                } else {
                    setFormDialogStatus("createOutputVariable")
                    setIsFormDialogOpen(true)
                    setDialogProps({ path: copiedPath })
                }
            }
        };
        const reformatPathArray = (pathArray: any[]) => {
            return pathArray.join(".")
        };

        if (!runResult) return null

        return (
            <div ref={ref} className={cn("w-full my-4", className)} {...props}>
                {hasDivider && <hr className="border-gray-300 my-5 h-0.5" />}

                <JsonView
                    value={runResult}
                    collapsed={collapsed}
                    style={{
                        ...customTheme,
                        wordWrap: "break-word",
                        padding: "15px",
                        borderRadius: "5px",
                        fontSize: "1rem"
                    }}
                    indentWidth={15}
                    displayDataTypes={false}
                >
                    <Copied
                        render={(props: any, rowData: any) => {
                            const { style } = props
                            return (
                                <div className="inline-flex">
                                    {!stopCopy && (
                                        <span
                                            style={{ ...style, height: undefined, width: undefined, whiteSpace: "nowrap" }}
                                            onClick={() => {
                                                const copyEvent = {
                                                    name: rowData.keyName,
                                                    namespace: rowData.keys || [],
                                                    src: rowData.value,
                                                }
                                                handleCreateVariable(copyEvent)
                                            }}
                                        >
                                            <CopyIcon />
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

ResponseOutput.displayName = "ResponseOutput"

export { ResponseOutput }
