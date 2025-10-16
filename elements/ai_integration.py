from ai_elements.condition_agent import CONDITION_AGENT
from ai_elements.rag import RAG
from ai_elements.react_agent import REACT_AGENT
from logger_config import logger

class AIIntegration:
    def __init__(self, chain_type, credentials, data):
        self.chain_type = chain_type
        self.credentials = credentials
        self.data = data

    def _update_conversation_vars(self, conversation: dict, agent_result: dict) -> dict:
        """Updates the conversation variables."""
        for key, value in agent_result["required_inputs"].items():
            if value:
                conversation['variables'][key] = value
        return conversation

    def _handle_status(self, status: str, conversation: dict):
        """Update react_fail based on execution status."""
        if status == 'fail':
            conversation['react_fail'] = True
        else:
            conversation['react_fail'] = False
    
    async def _execute_condition_agent(self, sio, sid, conversation, conversation_id, state):
        return await CONDITION_AGENT(self.data, self.credentials).execute(sio, sid, conversation, conversation_id, state)
    
    async def _execute_rag_chain(self, sio, sid, conversation):
        if self.data['inputs']["query"]:
            last_input_value = self.data['inputs']["query"]
        else:
            last_input_value = conversation['variables']['last_input_value'] if conversation else ""
        return await RAG(self.data, self.credentials).stream(sio, sid, conversation, last_input_value)

    async def _execute_react_agent(self, sio, sid, conversation, conversation_id):
        if conversation and conversation['react_fail']:
            last_input_value = conversation['variables']['last_input_value']
            result = await REACT_AGENT(self.data, self.credentials).stream(sio, sid, conversation_id, last_input_value)
            self._handle_status(result["status"], conversation)
            if 'required_inputs' in result:
                conversation = self._update_conversation_vars(conversation, result)

        else:
            if conversation and conversation_id:
                if self.data['inputs']["query"]:
                    last_input_value = self.data['inputs']["query"]
                else:
                    last_input_value = conversation['variables']['last_input_value']

                result = await REACT_AGENT(self.data, self.credentials).stream(sio, sid, conversation_id, last_input_value)
                self._handle_status(result["status"], conversation)
                if 'required_inputs' in result:
                    conversation = self._update_conversation_vars(conversation, result)
            else:
                result = await REACT_AGENT(self.data, self.credentials).stream(sio, sid)
        
        return result

    async def _get_ai_execution(self, sio, sid, conversation, conversation_id, state) -> dict:
        ai_mapping = {
            "LC_CONDITION_AGENT": self._execute_condition_agent,
            "LC_RAG": self._execute_rag_chain,
            "LC_REACT_AGENT": self._execute_react_agent
        }
        executor = ai_mapping.get(self.chain_type, None)

        # Call the selected executor with its parameters
        if self.chain_type == "LC_REACT_AGENT":
            return await executor(sio, sid, conversation, conversation_id)
        elif self.chain_type == "LC_RAG":
            return await executor(sio, sid, conversation)
        elif self.chain_type == "LC_CONDITION_AGENT":
            return await executor(sio, sid, conversation, conversation_id, state)
        else:
            raise ValueError(f"Unknown chain type: {self.chain_type}")

    async def execute_ai_element(self, sio=None, sid=None, conversation=None, conversation_id=None, state=None):
        try:
            return await self._get_ai_execution(sio, sid, conversation, conversation_id, state)

        except Exception as error:
            logger.error(f"AI execution failed for {self.chain_type}: {str(error)}")
            raise Exception(str(error))
