from langgraph.prebuilt import create_react_agent
from langchain_core.messages.ai import AIMessage, AIMessageChunk
from ubility_langchain.model import Model
import json


DEFAULT_SYSTEM_PROMPT = """
You are part of a multi-agent system designed to make agent coordination and execution easy. Your task is to analyze the given input and select one matching scenario from a provided set of scenarios.

    - Input: A string representing the user's query, message or data.
    - Scenarios: A list of predefined scenarios that relate to the input.
    - Instruction: Determine which of the provided scenarios is the best fit for the input. {instruction}

Steps:

    1- Read the user input and this list of scenarios:
        {scenarios}
    2- Analyze the content of the input to identify its main topic or intention.
    3- Compare the input with each scenario: Evaluate how well the input's topic or intention aligns with each of the provided scenarios and select the one that is the best fit.
    4- Output the result: Return the selected scenario in the specified JSON format.

Output Format:

    Output should be the value of the selected scenario under the key 'output', like this: {{"output": ""}}. No explanation is needed.

Note

    - Ensure that the input scenarios align well with potential user queries for accurate matching.
    - DO NOT include anything other than the JSON in your response.
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

    async def execute(self, sio, sid):
        try:
            llm_model = Model(provider=self.data['model']["provider"], model=self.data['model']["model"] if "model" in self.data['model'] else "", credentials= self.credentials[self.data['model']['credential']], params=self.data['model']["params"]).chat()
            agent = create_react_agent(model=llm_model, prompt=self.prompt, tools=[])

            result = ''
            if sio and sid and self.data['params']['stream']:
                for chunk in agent.stream(input={"messages": self.data['inputs']["input"]}, stream_mode="messages"):
                    if isinstance(chunk[0], AIMessageChunk):
                        await sio.emit('message', {
                                    'type': 'chunk',
                                    'chunk': chunk[0].content
                                }, room=sid)
                        result += chunk[0].content

                await sio.emit('message', {
                    'type': 'end of chunks'
                }, room=sid)

            else:
                result = agent.invoke(input={"messages": self.data['inputs']["input"]})
                if 'messages' in result:
                    for msg in result['messages']:
                        if isinstance(msg, AIMessage):
                            result = msg.content

            return json.loads(result)

        except Exception as exc:
            if sio and sid and self.data['params']['stream']:
                await sio.emit('error_message', {
                    'type': 'error_message',
                    'error': str(exc)
                    }, room=sid)
            raise Exception(exc)