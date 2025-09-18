from langgraph.prebuilt import create_react_agent
from langchain_core.messages.ai import AIMessage
from langchain_core.runnables.history import RunnableWithMessageHistory
from ubility_langchain.langchain_memory import Memory, get_session_history
from ubility_langchain.model import Model
import json, logging, re


DEFAULT_SYSTEM_PROMPT = """
You are part of a multi-agent system designed to make agent coordination and execution easy. Your task is to analyze the given input and select one matching scenario from a provided set of scenarios.

    - Input: A string representing the user's query, message or data.
    - Scenarios: A list of predefined scenarios that relate to the input.
    - Instruction: {instruction}

Steps:

    1- Read the user input and this list of scenarios:
        {scenarios}
    2- Analyze the content of the input to identify its main topic or intention.
    3- Compare the input with each scenario: Evaluate how well the input's topic or intention aligns with each of the provided scenarios and select the one that is the best fit.
    4- Output the result: Return the selected scenario in the specified JSON format.

Output Format:

    Output should be the value of the selected scenario under the key 'output', like this: {{"output": ""}}. No explanation is needed.
    Return the exact sentence containing the selected value, without making any modifications to it, even if it contains mistakes.

Note

    - Ensure that the input scenarios align well with potential user queries for accurate matching.
    - DO NOT include anything other than the JSON in your response.
    - Use your memory to inform and adapt your response whenever relevant information is available.
"""

class CONDITION_AGENT:

    def __init__(self, data, credentials):
        self.data = data
        self.credentials = credentials
        self.prompt = self._build_prompt()

    def _build_prompt(self):
        return DEFAULT_SYSTEM_PROMPT.format(
            instruction=self.data["inputs"]["instruction"],
            scenarios=self.data["inputs"]["scenarios"],
        )

    async def execute(self, sio, sid, conversation, conversation_id):
        try:
            llm_model = Model(provider=self.data['model']["provider"], model=self.data['model']["model"] if "model" in self.data['model'] else "", credentials= self.credentials[self.data['model']['credential']], params=self.data['model']["params"]).chat()

            raw_agent = create_react_agent(model=llm_model, prompt=self.prompt, tools=[])

            result = ''
            if sio and sid and conversation_id and self.data['params']['stream']:
                memory = Memory(type='ConversationBufferMemory', historyId=conversation_id, params={})
                
                # if react status = fail --> use ubility history
                if conversation['variables']['react_fail']:
                    memory.load_streaming_memory(conversation_id)

                agent = RunnableWithMessageHistory(
                    raw_agent,
                    get_session_history,
                    input_messages_key="messages"
                )

                async for chunk in agent.astream_events(input={"messages": self.data['inputs']["query"]}, config={"configurable": {"session_id": conversation_id}}):
                    if 'event' in chunk and chunk['event'] == 'on_chat_model_stream':
                        await sio.emit('message', {
                                    'type': 'chunk',
                                    'chunk': chunk['data']['chunk'].content
                                }, room=sid)
                        result += chunk['data']['chunk'].content

                # if react status = pass --> clear history
                if not conversation['variables']['react_fail']:
                    memory.reset_memory(conversation_id)

                await sio.emit('message', {
                    'type': 'end of chunks'
                }, room=sid)

            else:
                result = raw_agent.invoke(input={"messages": self.data['inputs']["query"]})
                if 'messages' in result:
                    for msg in result['messages']:
                        if isinstance(msg, AIMessage):
                            result = msg.content

            try:
                result = result.replace("'", '"')
                return json.loads(result)
            except Exception as ex:
                logging.warning(result)
                cleaned = re.sub(r"^```json\n|\n```$", "", result)
                return json.loads(cleaned)

        except Exception as exc:
            if sio and sid and self.data['params']['stream']:
                logging.error(f"an error occurred while running this ai node: {str(exc)}")
                await sio.emit('error_message', {
                    'type': 'error_message',
                    'error': 'an error occurred while running this ai node'
                    }, room=sid)
            raise Exception(exc)