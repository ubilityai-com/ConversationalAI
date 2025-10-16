from langgraph.prebuilt import create_react_agent
from langchain_core.messages.ai import AIMessage
from langchain_core.runnables.history import RunnableWithMessageHistory
from ubility_langchain.langchain_memory import Memory, get_session_history
from ubility_langchain.model import Model
import json, logging, re
from logger_config import logger


DEFAULT_CONDITION_AGENT_PROMPT = """
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


DEFAULT_STATE_PROMPT = """
You are part of a multi-agent system designed to make agent coordination and execution easy. Your task is to analyze the given input and select one matching scenario from a provided set of scenarios.

Input Data:
    - User Input: The latest message from the human user.
    - Memory: The most recent exchange between the AI and the Human.
    - Scenario List: 
        {scenarios}

Steps:

    1- Analyze the Input's Intent: Identify the primary topic, request, or intention of the new User Input.

    2- Assess Conversation Continuity: Review the Memory (AI and Human messages).
        - Key Question: Is the new User Input a direct continuation of the immediate, ongoing conversation?
        - Indicators of Continuity: The input provides missing information, answers a question the AI just asked, asks for clarification on the previous topic, or is a direct follow-up.
        - If the input continues the conversation with the same previous topic, your decision is final: return {{"output": "Other"}} immediately. No explanation is needed.
        - If the new User Input is unrelated to the ongoing conversation topic, treat it as the start of a new request and redirect it to the best-fit scenario depending on the user’s input from the provided {scenarios} list.
    
    3- Evaluate for a New Scenario: if the input is unrelated to the previous topic, starts new topic, or the previous conversation thread has concluded, compare its intent against the provided {scenarios} list.
        - Determine which scenario best aligns with the new, unrelated topic.

Output Format:

    Output should be the value of the selected scenario under the key 'output', like this: {{"output": ""}}. No explanation is needed.
    Return the exact sentence containing the selected value, without making any modifications to it, even if it contains mistakes.

Decision Rule:

    - Continuation of Conversation -> {{"output": "Other"}}
    - New, Unrelated Topic -> {{"output": "<THE_SELECTED_SCENARIO>"}}
    ** IMPORTANT **: Replace <THE_SELECTED_SCENARIO> with the exact sentence of the scenario from the provided list that best matches the user's input.

Note

    - Ensure that the input scenarios align well with potential user queries for accurate matching.
    - DO NOT include anything other than the JSON in your response.
"""

class CONDITION_AGENT:

    def __init__(self, data, credentials):
        self.data = data
        self.credentials = credentials

    def _build_prompt(self, state):
        if state:
            return DEFAULT_STATE_PROMPT.format(
                instruction=self.data["inputs"]["instruction"],
                scenarios=self.data["inputs"]["scenarios"],
            )

        return DEFAULT_CONDITION_AGENT_PROMPT.format(
            instruction=self.data["inputs"]["instruction"],
            scenarios=self.data["inputs"]["scenarios"],
        )

    async def execute(self, sio, sid, conversation, conversation_id, state):
        try:

            llm_model = Model(provider=self.data['model']["provider"], model=self.data['model']["model"] if "model" in self.data['model'] else "", credentials= self.credentials[self.data['model']['credential']], params=self.data['model']["params"]).chat()

            prompt = self._build_prompt(state)
            raw_agent = create_react_agent(model=llm_model, prompt=prompt, tools=[])

            result = ''
            if sio and sid and conversation_id and self.data['params']['stream']:
                memory = Memory(historyId=conversation_id)
                
                # if react status = fail --> use ubility history
                if conversation['react_fail']:
                    memory.load_streaming_memory(conversation_id, True)

                agent = RunnableWithMessageHistory(
                    raw_agent,
                    get_session_history,
                    input_messages_key="messages"
                )

                async for chunk in agent.astream_events(input={"messages": self.data['inputs']["query"]}, config={"configurable": {"session_id": f"{conversation_id}-condition"}}):
                    if 'event' in chunk and chunk['event'] == 'on_chat_model_stream':
                        result += chunk['data']['chunk'].content

                memory.reset_memory(f"{conversation_id}-condition")

            else:
                result = raw_agent.invoke(input={"messages": self.data['inputs']["query"]})
                if 'messages' in result:
                    for msg in result['messages']:
                        if isinstance(msg, AIMessage):
                            result = msg.content

            try:
                result = result.replace("'", '"')
                logger.info(result)
                return json.loads(result)
            except Exception as ex:
                logging.warning(result)
                cleaned = re.sub(r"^```json\n|\n```$", "", result)
                logger.info(cleaned)
                return json.loads(cleaned)

        except Exception as exc:
            if sio and sid and self.data['params']['stream']:
                logging.error(f"an error occurred while running this ai node: {str(exc)}")
                await sio.emit('error_message', {
                    'type': 'error_message',
                    'error': 'an error occurred while running this ai node'
                    }, room=sid)
            raise Exception(exc)