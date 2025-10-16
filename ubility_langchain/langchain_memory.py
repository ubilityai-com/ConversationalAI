from langchain_core.chat_history import BaseChatMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages.human import HumanMessage
from langchain_core.messages.ai import AIMessage
import logging, os, io, json

currentDir = os.getcwd() # get current working directory 
basePath = f"{currentDir}/langchain_history"

store = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

class Memory:

    global basePath
    
    def __init__(self, historyId: str):
        logging.info("--------------Start--------------")
        logging.info("Setting up memory object")

        self.historyId = historyId
        self.filePath = "" # directory path that will be joined with history-specific subdirectories (format: /convId/historyId.json)

    def load_streaming_memory(self, convId: dict, condition: bool = False):
        logging.info(f"Loading streaming memory")

        convDir = f"/{convId}" # Subdirectory for specific conversation
        fullDirPath = f"{basePath}{convDir}"  # Complete directory path

        # Create directories if they don't exist
        if not os.path.exists(fullDirPath):
            logging.info(f"conversation directory not found, creating: {convDir}")
            os.makedirs(fullDirPath) # create the parent directories

        # Set the full file path for history data
        self.filePath = f"{fullDirPath}/{self.historyId}.json"

        # Load existing data if file exists, otherwise initialize empty structure
        if os.path.exists(self.filePath):
            f = open(self.filePath)
            try:
                data = json.load(f)
            except Exception:
                data = {"context": []}
            f.close()

            if condition:
                convId = f"{convId}-condition"
            for context in data["context"]:
                for key, value in context.items():
                    if key == "HumanMessage" and value:
                        msg = HumanMessage(content=str(value))
                    if key == "AIMessage" and value:
                        msg = AIMessage(content=str(value))
                if convId in store:
                    store[convId].add_message(msg)
                else:
                    store[convId] = ChatMessageHistory()
                    store[convId].add_message(msg)

        else:
            with io.open(self.filePath, "w", encoding="utf-8") as file:
                data = {"context": []}
                str_ = json.dumps(
                    data,
                    indent=4,
                    sort_keys=True,
                    separators=(",", ": "),
                    ensure_ascii=False,
                )
                file.write(str_)

    def reset_memory(self, conv_id):
        logging.info("Reset memory")
        if conv_id in store:
            store[conv_id].clear()
            del store[conv_id]