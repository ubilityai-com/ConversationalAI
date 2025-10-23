// dialogs/index.tsx
import { useShallow } from 'zustand/react/shallow';
import { useFlowStore } from "../../store/root-store";
import { ConnectorPaletteDialog } from "../connector-palette-dialog";
import { CreateOutputVariableDialog } from "./create-output-variable";
import { CreateCredentialDialog } from "./credential-dialog/create-credential-dialog";
import { ManageCredentialsDialog } from "./credential-dialog/manage-credential-dialog";
import { ExpandedFieldDialog } from "./expanded-field-dialog";
import { FilesDialog } from "./files-dialog";
import { NodeStatesDialog } from "./node-states-dialog/node-states-dialog";
import { SaveDialog } from "./save-dialog";
import { ValidationDialog } from "./validation-dialog";
import { VariablesDialog } from "./variables-dialog";

// Registry of all dialog components
export const dialogRegistry: Record<string, React.FC<any>> = {
  save: SaveDialog,
  validation: ValidationDialog,
  addNode: ConnectorPaletteDialog,
  createCred: CreateCredentialDialog,
  variables: VariablesDialog,
  manageCred: ManageCredentialsDialog,
  createOutputVariable: CreateOutputVariableDialog,
  files: FilesDialog,
  nodeStates: NodeStatesDialog,
  ExpandedFieldDialog: ExpandedFieldDialog,
} as const;

// The dialog manager that renders the correct dialog component dynamically
export default function DialogManager() {
  const { isFormDialogOpen, formDialogStatus, dialogProps, setIsFormDialogOpen } =
    useFlowStore(
      useShallow((state) => ({
        isFormDialogOpen: state.isFormDialogOpen,
        formDialogStatus: state.formDialogStatus,
        dialogProps: state.dialogProps,
        setIsFormDialogOpen: state.setIsFormDialogOpen,
      })),
    );


  if (!isFormDialogOpen) return null;

  const Component = dialogRegistry[formDialogStatus as keyof typeof dialogRegistry];
  if (!Component) return null;

  return <Component open onOpenChange={setIsFormDialogOpen} {...dialogProps} />;
}
