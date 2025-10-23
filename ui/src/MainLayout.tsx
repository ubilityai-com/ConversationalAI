import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShallow } from 'zustand/react/shallow';
import { ChatbotNotFoundNotice } from "./components/chatbot-not-found-notice";
import { OAuth2AuthenticationFlow } from "./components/dialogs/credential-dialog/credOAuth2";
import DialogManager from "./components/dialogs/dialog-manager";
import { LiveUrlDisplay } from "./components/live-url-display";
import { LoadingOverlay } from "./components/loading-overlay";
import RightSideDrawer from "./components/right-side-drawer";
import { Toolbar } from "./components/toolbar";
import { Toaster } from "./components/ui/toaster";
import FlowZone from "./flow-zone";
import { initializeBot } from "./lib/utils/utils";
import { useFlowStore } from "./store/root-store";

function initializeAllDroppedElementsByHandler(
  setNodes: (nodes: any[]) => void,
  setNodesValidation: (nodesValidation: any) => void
) {
  const { nodes, nodesValidation } = initializeBot();
  setNodes(nodes);
  setNodesValidation(nodesValidation);
}

export default function MainLayout() {
  const { botID } = useParams();

  const { setNodes, setNodesValidation, fetchBots, failedLoadingBot, getBotById, reactFlowInstance, getFiles } =
    useFlowStore(
      useShallow((state) => ({
        setNodes: state.setNodes,
        setNodesValidation: state.setNodesValidation,
        fetchBots: state.fetchBots,
        getBotById: state.getBotById,
        reactFlowInstance: state.reactFlowInstance,
        failedLoadingBot: state.failedLoadingBot,
        getFiles: state.getFiles
      })),
    );

  // ---- Initial setup ----
  useEffect(() => {
    initializeAllDroppedElementsByHandler(setNodes, setNodesValidation);
    fetchBots();
    OAuth2AuthenticationFlow();
  }, [fetchBots, setNodes, setNodesValidation]);

  // ---- Handle bot and files fetching ----
  useEffect(() => {
    if (!botID) return;

    getFiles(botID);

    if (!reactFlowInstance) return;

    (async () => {
      try {
        await getBotById(botID);
      } catch (error) {
        console.error("Failed to fetch bot:", error);
      }
    })();
  }, [botID, reactFlowInstance, getBotById, getFiles]);

  return (
    <div className="min-h-screen flex flex-col">
      <DialogManager />
      <Toolbar />
      <LiveUrlDisplay />
      <LoadingOverlay />

      <main className="flex-1 flex overflow-hidden bg-gray-50">
        {!failedLoadingBot ? <FlowZone /> : <ChatbotNotFoundNotice />}
        <RightSideDrawer />
      </main>

      <Toaster />
    </div>
  );
}
