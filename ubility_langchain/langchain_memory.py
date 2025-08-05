from langchain_core.chat_history import BaseChatMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages.human import HumanMessage
from langchain_core.messages.ai import AIMessage
import logging, os, io, json

currentDir = os.getcwd() # get current working directory 
basePath = f"{currentDir}/langchain_history"

store = ChatMessageHistory()


def get_session_history() -> BaseChatMessageHistory:
    return store


class Memory:

    global basePath

    _VALID_TYPES = [
        "ConversationBufferMemory",
        "ConversationBufferWindowMemory",
        "ConversationSummaryBufferMemory"
    ]

    def __init__(self, type: str, historyId: str, params: dict = {}, streaming: bool = True):
        logging.info("--------------Start--------------")
        logging.info("Setting up memory object")

        if type not in self._VALID_TYPES:
            raise ValueError(f"Invalid memory type '{type}'. Valid types: {', '.join(self._VALID_TYPES)}")

        self.type = type
        self.historyId = historyId
        self.params = params
        self.filePath = "" # directory path that will be joined with history-specific subdirectories (format: /convId/historyId.json)
        self.streaming = streaming

        if self.type == "ConversationBufferMemory":
            logging.info("It is a Conversation Buffer Memory")
            self._setup_ConversationBufferMemory()
        elif self.type == "ConversationBufferWindowMemory":
            logging.info("It is a Conversation Buffer Window Memory")
            self._setup_ConversationBufferWindowMemory(self.params)
        elif self.type == "ConversationSummaryBufferMemory":
            logging.info("It is a Conversation Summary Buffer Memory")
            self._setup_ConversationSummaryBufferMemory(self.params)

    def _setup_ConversationBufferMemory(self):
        try:
            if not self.streaming:
                from langchain.memory import ConversationBufferMemory
                self.memory = ConversationBufferMemory(memory_key="history", return_messages=True)
            logging.info("--------------Done--------------")
        except Exception as error:
            raise Exception(error)

    def _setup_ConversationBufferWindowMemory(self, params):
        try:
            if "size" in params:
                self.size = params['size']
                if not self.streaming:
                    from langchain.memory import ConversationBufferWindowMemory
                    self.memory = ConversationBufferWindowMemory(memory_key="history", k=self.size, return_messages=True)
                logging.info("--------------Done--------------")
            else:
                raise Exception("Missing window size")
        except Exception as error:
            raise Exception(error)

    def _setup_ConversationSummaryBufferMemory(self, params):
        try:
            if "max_token_limit" in params and "llm" in params:
                self.max_token_limit = params["max_token_limit"]
                self.llm = params["llm"]
                if not self.streaming:
                    from langchain.memory import ConversationSummaryBufferMemory
                    self.memory = ConversationSummaryBufferMemory(llm=self.llm, max_token_limit=self.max_token_limit, return_messages=True)
                logging.info("--------------Done--------------")
            else:
                raise Exception("Missing token limit or llm")
        except Exception as error:
            raise Exception(error)

    def load_external_context(self):
        logging.info("Loading external context")
 
        if self.streaming:
            for context in self.params["context"]:
                conv = []
                for key, value in context.items():
                    if key == "HumanMessage":
                        conv.append(HumanMessage(content=str(value)))
                    if key == "AIMessage":
                        conv.append(AIMessage(content=str(value)))
                store.add_messages(conv)
        else:
            for context in self.params["context"]:
                self.memory.save_context({"input": str(context["HumanMessage"])},{"output": str(context["AIMessage"])})

    def load_streaming_memory(self, convId: dict):
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

            if self.type == 'ConversationBufferWindowMemory':
                data["context"] = data["context"][-self.size:]

            if self.streaming:
                str_messages = []  # ROLE: MESSAGE
                for context in data["context"]:
                    obj_conv = []  # HumanMessage & AIMessage
                    for key, value in context.items():
                        str_messages.append(f"{key}: {str(value)}")
                        if key == "HumanMessage":
                            obj_conv.append(HumanMessage(content=str(value)))
                        if key == "AIMessage":
                            obj_conv.append(AIMessage(content=str(value)))
                    store.add_messages(obj_conv)
                if self.type == 'ConversationSummaryBufferMemory':
                    summarize_memory(store.messages, str_messages, self.llm, self.max_token_limit)
            else:
                for context in data["context"]:
                    self.memory.save_context({"input": str(context["HumanMessage"])},{"output": str(context["AIMessage"])})

        else:
            with io.open(self.filePath, "w", encoding="utf-8") as file:
                if "context" in self.params:
                    data = {"context": self.params["context"]}
                else:
                    data = {"context": []}
                str_ = json.dumps(
                    data,
                    indent=4,
                    sort_keys=True,
                    separators=(",", ": "),
                    ensure_ascii=False,
                )
                file.write(str_)

    def add_new_message(self, query, answer):
        logging.info("Adding new messages")

        f = open(self.filePath)
        try:
            data = json.load(f)
        except Exception:
            data = {"context": []}
        f.close()

        data["context"].append({"HumanMessage": query, "AIMessage": answer})
        
        with io.open(self.filePath, "w", encoding="utf-8") as file:
            str_ = json.dumps(
                data,
                indent=4,
                sort_keys=True,
                separators=(",", ": "),
                ensure_ascii=False,
            )
            file.write(str_)

    def reset_memory(self, convId):
        logging.info("Delete memory")

        convDir = f"/{convId}" # Subdirectory for specific conversation
        fullDirPath = f"{basePath}{convDir}"  # Complete directory path

        # Create directories if they don't exist
        if os.path.exists(fullDirPath):
            logging.info(f"conversation directory found, deleting: {convDir}")

            # Set the full file path for history data
            self.filePath = f"{fullDirPath}/{self.historyId}.json"

            # Load existing data if file exists, otherwise initialize empty structure
            if os.path.exists(self.filePath):
                os.remove(self.filePath)

def summarize_memory(current_buffer, messages, llm, max_token_limit):
    from langchain_core.prompts.prompt import PromptTemplate
    from langchain.chains.llm import LLMChain
    import re

    logging.info("Start summarizing memory")

    string_messages = "\n".join(messages)
    _DEFAULT_SUMMARIZER_TEMPLATE = """Progressively summarize the lines of conversation provided, adding onto the previous summary returning a new summary.

    EXAMPLE
    Current summary:
    The human asks what the AI thinks of artificial intelligence. The AI thinks artificial intelligence is a force for good.

    New lines of conversation:
    Human: Why do you think artificial intelligence is a force for good?
    AI: Because artificial intelligence will help humans reach their full potential.

    New summary:
    The human asks what the AI thinks of artificial intelligence. The AI thinks artificial intelligence is a force for good because it will help humans reach their full potential.
    END OF EXAMPLE

    Current summary:
    {summary}

    New lines of conversation:
    {new_lines}

    New summary:"""
    SUMMARY_PROMPT = PromptTemplate(
    input_variables=["summary", "new_lines"], template=_DEFAULT_SUMMARIZER_TEMPLATE
    )

    try:
        curr_buffer_length = llm.get_num_tokens_from_messages(current_buffer)

        if curr_buffer_length > max_token_limit:
            while curr_buffer_length > max_token_limit:
                string_messages = re.split(r'(\n)', string_messages, maxsplit=4)  # Split only at the first 4 newline occurrences
                string_messages = ''.join(string_messages[4:]).lstrip()  # Join back the remaining parts
                del current_buffer[:2]
                chain = LLMChain(llm=llm, prompt=SUMMARY_PROMPT)
                chain.predict(summary = current_buffer, new_lines = string_messages)
                curr_buffer_length = llm.get_num_tokens_from_messages(current_buffer)


    except Exception as exc:
        raise Exception(f"An error occurred while summarizing memory: {str(exc)}")