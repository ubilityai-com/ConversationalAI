
import { useFlowStore } from "../../store/flow-store";
import { Toast, ToastClose, ToastProvider, ToastTitle, ToastViewport } from "./toast";
export function Toaster() {
    const showSnackBarMessage = useFlowStore(state => state.showSnackBarMessage)
    const setShowSnackBarMessage = useFlowStore(state => state.setShowSnackBarMessage)


    return (
        <>
            {showSnackBarMessage.open === true && <ToastProvider duration={showSnackBarMessage.duration}>

                <Toast variant={showSnackBarMessage.color} onOpenChange={(open) => {
                    setShowSnackBarMessage({ open: false })

                }}>
                    <div className="grid gap-1 whitespace-pre-line">
                        <ToastTitle>{showSnackBarMessage.message}</ToastTitle>
                    </div>
                    <ToastClose />
                </Toast>
                <ToastViewport />
            </ToastProvider>}
        </>
    )
}
