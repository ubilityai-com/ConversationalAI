from ai_elements.basic_llm import BasicLLM
from ai_elements.condition_agent import CONDITION_AGENT
from ai_elements.rag import RAG
from ai_elements.react_agent import REACT_AGENT


class AIIntegration:
    def __init__(self, chain_type, credentials, data):
        self.chain_type = chain_type
        self.credentials = credentials
        self.data = data

    def _update_conversation_vars(self, chain_type: str, conversation: dict, llm_result: dict) -> dict:
        """Updates the conversation variables based on the structured output parser configuration."""
        if chain_type == "LC_BASIC_LLM":
            output_parser = self.data['params']['outputParser']
            if output_parser['type'] == 'StructuredOutputParser':
                for schema in output_parser["responseSchemas"]:
                    if schema['name'] in llm_result:
                        conversation['variables'][schema['name']] = llm_result[schema['name']]
        
        elif chain_type == "LC_REACT_AGENT":
            for key, value in llm_result["required_inputs"].items():
                if value:
                    conversation['variables'][key] = value
        return conversation

    def _handle_status(self, status: str, conversation: dict):
        """Update react_fail based on execution status."""
        if status == 'fail':
            print(f"Status=fail --> Setting react_fail=True for REACT agent re-execution")
            conversation['variables']['react_fail'] = True
        else:
            print(f"Status=pass --> Setting react_fail=False to stop REACT agent execution")
            conversation['variables']['react_fail'] = False

    async def _execute_basic_llm_chain(self, sio, sid, conversation):
        print(f"Executing Basic LLM chain")
        result = await BasicLLM(self.data, self.credentials).stream(sio, sid)
        if conversation and 'outputParser' in self.data['params']:
            conversation = self._update_conversation_vars("LC_BASIC_LLM", conversation, result)
        
        return result
    
    async def _execute_condition_agent(self, sio, sid, conversation_id):
        print(f"Executing Conditional Agent")
        return await CONDITION_AGENT(self.data, self.credentials).execute(sio, sid, conversation_id)
    
    async def _execute_rag_chain(self, sio, sid, conversation):
        print(f"Executing RAG chain")
        return await RAG(self.data, self.credentials).stream(sio, sid, conversation)

    async def _execute_react_agent(self, sio, sid, conversation, conversation_id):
        if conversation and conversation['variables']['react_fail']:
            last_input_value = conversation['variables']['last_input_value']
            print(f"Executing REACT agent with last input value")
            result = await REACT_AGENT(self.data, self.credentials).stream(sio, sid, conversation_id, last_input_value)
            self._handle_status(result["status"], conversation)
            if 'required_inputs' in result:
                conversation = self._update_conversation_vars("LC_REACT_AGENT", conversation, result)

        else:
            print(f"Executing REACT agent with first input value")
            last_input_value = conversation['variables']['last_input_value']
            result = await REACT_AGENT(self.data, self.credentials).stream(sio, sid, conversation_id, last_input_value)
            # result = await REACT_AGENT(self.data, self.credentials).stream(sio, sid, conversation_id)
            if conversation:
                self._handle_status(result["status"], conversation)
                if 'required_inputs' in result:
                    conversation = self._update_conversation_vars("LC_REACT_AGENT", conversation, result)
        
        return result

    async def _get_ai_execution(self, sio, sid, conversation, conversation_id) -> dict:
        ai_mapping = {
            "LC_BASIC_LLM": self._execute_basic_llm_chain,
            "LC_CONDITION_AGENT": self._execute_condition_agent,
            "LC_RAG": self._execute_rag_chain,
            "LC_REACT_AGENT": self._execute_react_agent
        }
        executor = ai_mapping.get(self.chain_type, None)

        # Call the selected executor with its parameters
        if self.chain_type == "LC_REACT_AGENT":
            return await executor(sio, sid, conversation, conversation_id)
        elif self.chain_type == "LC_BASIC_LLM" or self.chain_type == "LC_RAG":
            return await executor(sio, sid, conversation)
        elif self.chain_type == "LC_CONDITION_AGENT":
            return await executor(sio, sid, conversation_id)
        else:
            raise ValueError(f"Unknown chain type: {self.chain_type}")

    async def execute_ai_element(self, sio=None, sid=None, conversation=None, conversation_id=None):
        try:
            return await self._get_ai_execution(sio, sid, conversation, conversation_id)

        except Exception as error:
            print(f"AI execution failed for {self.chain_type}: {str(error)}")
            raise Exception(str(error))
