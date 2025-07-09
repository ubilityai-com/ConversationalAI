// dialogs/index.tsx
import { useFlowStore } from "../../store/flow-store";
import { AgentPaletteDialog } from "../agent-palette-dialog";
import { ChangeNameDialog } from "./change-name-dialog";
import { CreateCredentialDialog } from "./credential-dialog/create-credential-dialog";
import { ItemsListDialog } from "./langchain-dialog";
import { PublishDialog } from "./save-dialog";
import { ValidationDialog } from "./validation-dialog";

export const dialogRegistry: Record<string, React.FC<any>> = {
    publish: PublishDialog,
    validation: ValidationDialog,
    changeName: ChangeNameDialog,
    langchain: ItemsListDialog,
    addNode: AgentPaletteDialog,
    createCred: CreateCredentialDialog
};
export default function DialogManager() {
    const { isFormDialogOpen, formDialogStatus, dialogProps, setIsFormDialogOpen } = useFlowStore();
    console.log({ isFormDialogOpen, formDialogStatus, dialogProps });

    if (!isFormDialogOpen) return null;

    const Component = dialogRegistry[formDialogStatus];
    if (!Component) return null;

    return <Component open onOpenChange={setIsFormDialogOpen} {...dialogProps} />;
}
