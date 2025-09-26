from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent
from langchain_core.runnables.history import RunnableWithMessageHistory
from ubility_langchain.langchain_memory import Memory, get_session_history
# from langgraph.store.memory import InMemoryStore
from ubility_langchain.customTools import create_custom_tools
from langchain_core.messages.ai import AIMessage, AIMessageChunk
from ubility_langchain.model import Model
import sys, os, json, logging, re
from dotenv import load_dotenv
load_dotenv(override=True)

DEFAULT_REACT_AGENT_STATUS_PROMPT = """
You are a conversation evaluator.
Your task is to decide if the conversation between a user and an assistant has been completed

You will be given:

Agent Prompt: the instruction/role of the first agent.

User Input: the last input from the user to the first agent.

Agent Output: the last response from the first agent.

Agent Prompt:{user_prompt}

User Input:{user_input}

Agent Output:{agent_output}

Your output must always be a JSON object in this exact format: {{"status": "pass"}} or {{"status": "fail"}}.
No other words, explanations, or characters are allowed. Your role is only to evaluate the conversation and return the JSON.

status = "pass": Assign this status only If the agent output fully answers or resolves the user input according to the agent prompt."

status = "fail": Assign this status if the agent's last output indicates that the task is still incomplete Or the agent still waiting for the user confirmation. This includes situations where the agent is still waiting for a response, asking for clarifications.
"""


DEFAULT_DATA_COLLECTOR_SYSTEM_PROMPT = """
You are a data collector agent. Your role is to interact with the user, gather all required inputs accurately, and ensure the information is complete and well-structured. Always clarify unclear responses, confirm completeness, and avoid assumptions.
Requirements to collect:

{required_inputs}

Make sure to collect these data no matter the user query was.
Always check for the existence of these data in your memory before asking the user about them, and when you do finish your task, the collected data as a clear, professional plain-text phrase, not in JSON or any other formatting.
"""


DEFAULT_DATA_COLLECTOR_STATUS_PROMPT="""
You are a strict evaluator AI that determines whether a given response represents a completed task or not.

You will be given:
1. The response from a previous agent: {agent_output}
2. A list of required inputs (with name and description):
{required_inputs_definition}

Your job:

1. Analyze if the given response represents a completed task.
   - If the response asks for more input, provides general greetings, or indicates it is waiting for more information or clarification, then status must be "fail".
   - If the response represents a complete and meaningful answer to a user request, then continue to step 2.

2. Extract the required inputs from either the given response or the conversation history.
   - If a required input is found, include its value.
   - If not found, return it as an empty string "".

3. Determine the final status:
   - If any required input is empty, status must be "fail".
   - Status is "pass" only if the task is completed AND all required inputs are present with non-empty values.

REMEMBER you job is not to provide a new answer, it is only to determine the status of a previous agent’s response with specified required inputs.

Output format must strictly follow this JSON structure:
{{
  "status": "pass" or "fail",
  "required_inputs": {{
{required_inputs_dict}
  }}
}}
"""


class REACT_AGENT:
    def __init__(self, data, credentials):
        self.data = data
        self.credentials = credentials
        
    def _setup_mcp_servers(self):
        mcps = {}
        mcps_data = []
        if isinstance(self.data['tools'], dict) and "toolConfigs" in self.data['tools']:
            for tool in self.data['tools']['toolConfigs']:
                if tool["type"] == "mcp":
                    mcps_data.append(tool)
        else:
            for tool in self.data['tools']:
                if tool["type"] == "mcp":
                    mcps_data.append(tool)  

        for mcp in mcps_data:
            if "name" in mcp and "url" in mcp:
                mcps[mcp["name"]] = {
                    "url": mcp["url"],
                    "transport": "sse" if "/sse" in mcp["url"] else "streamable_http"
                }
            elif "name" in mcp and "credential" in mcp:
                currentDir = os.getcwd()  # get current working directory

                # get cred value and create env vars
                envVars = {}
                if mcp['name'] == 'SlackMcpServer':
                    envVars = {'SLACK_BOT_TOKEN': self.credentials[mcp['credential']]['accessToken']}
                elif mcp['name'] == 'NotionMcpServer':
                    envVars = {'NOTION_BOT_TOKEN': self.credentials[mcp['credential']]['accessToken']}
                elif mcp['name'] == 'WhatsappMcpServer':
                    envVars = {'WHATSAPP_TOKEN': self.credentials[mcp['credential']]['accessToken'], 'WHATSAPP_ACCOUNT_ID': self.credentials[mcp['credential']]['whatsappAccountId']}
                elif mcp['name'] == 'AirTableMcpServer':
                    envVars = {'AIRTABLE_BOT_TOKEN': self.credentials[mcp['credential']]['accesstoken']}
                elif mcp['name'] == 'GoogleSheetsMcpServer':
                    envVars = {
                        'GOOGLESHEETS_REFRESH_TOKEN': self.credentials[mcp['credential']]['refreshToken'],
                        'GOOGLESHEETS_ACCESS_TOKEN': self.credentials[mcp['credential']]['accessToken'],
                        'GOOGLESHEETS_CLIENT_ID': self.credentials[mcp['credential']]['clientID'],
                        'GOOGLESHEETS_CLIENT_SECRET': self.credentials[mcp['credential']]['clientSecret'],
                        'GOOGLESHEETS_SCOPE': self.credentials[mcp['credential']]['scope'],
                        'GOOGLESHEETS_EXPIREY': self.credentials[mcp['credential']]['expirey']
                        }
                elif mcp['name'] == 'FreshdeskMcpServer':
                    envVars = {
                        'FRESHDESK_API_KEY': self.credentials[mcp['credential']]['apiKey'],
                        'FRESHDESK_DOMAIN': self.credentials[mcp['credential']]['domain']
                        }
                elif mcp['name'] == 'HubSpotMcpServer':
                    envVars = {
                        'HUBSPOT_REDIRECT_URI': self.credentials[mcp['credential']]['redirectUri'],
                        'HUBSPOT_REFRESH_TOKEN': self.credentials[mcp['credential']]['refreshToken'],
                        'HUBSPOT_CLIENT_ID': self.credentials[mcp['credential']]['clientID'],
                        'HUBSPOT_CLIENT_SECRET': self.credentials[mcp['credential']]['clientSecret']
                        }
                elif mcp['name'] == 'MailChimpMcpServer':
                    envVars = {
                        'MAILCHIMP_API_KEY': self.credentials[mcp['credential']]['apiKey'],
                        'MAILCHIMP_SERVER_PREFIX': self.credentials[mcp['credential']]['serverPrefix']
                        }
                elif mcp['name'] == 'GmailMcpServer':
                    envVars = {
                        'GMAIL_ACCESS_TOKEN': self.credentials[mcp['credential']]['accessToken'],
                        'GMAIL_REFRESH_TOKEN': self.credentials[mcp['credential']]['refreshToken'],
                        'GMAIL_CLIENT_ID': self.credentials[mcp['credential']]['clientID'],
                        'GMAIL_CLIENT_SECRET': self.credentials[mcp['credential']]['clientSecret'],
                        'GMAIL_EXPIREY': self.credentials[mcp['credential']]['expirey']
                        }
                elif mcp['name'] == 'GoogleCalendarMcpServer':
                    envVars = {
                        'GOOGLE_CALENDAR_ACCESS_TOKEN': self.credentials[mcp['credential']]['accessToken'],
                        'GOOGLE_CALENDAR_REFRESH_TOKEN': self.credentials[mcp['credential']]['refreshToken'],
                        'GOOGLE_CALENDAR_CLIENT_ID': self.credentials[mcp['credential']]['clientID'],
                        'GOOGLE_CALENDAR_CLIENT_SECRET': self.credentials[mcp['credential']]['clientSecret'],
                        'GOOGLE_CALENDAR_SCOPE': self.credentials[mcp['credential']]['scope'],
                        'GOOGLE_CALENDAR_EXPIREY': self.credentials[mcp['credential']]['expirey']
                        }
                elif mcp['name'] == 'GoogleDriveMcpServer':
                    envVars = {
                        'GOOGLE_DRIVE_ACCESS_TOKEN': self.credentials[mcp['credential']]['accessToken'],
                        'GOOGLE_DRIVE_REFRESH_TOKEN': self.credentials[mcp['credential']]['refreshToken'],
                        'GOOGLE_DRIVE_CLIENT_ID': self.credentials[mcp['credential']]['clientID'],
                        'GOOGLE_DRIVE_CLIENT_SECRET': self.credentials[mcp['credential']]['clientSecret'],
                        'GOOGLE_DRIVE_EXPIREY': self.credentials[mcp['credential']]['expirey']
                        }
                elif mcp['name'] == 'StripeMcpServer':
                    envVars = {'STRIPE_API_KEY': self.credentials[mcp['credential']]['apiKey']}
                
                mcps[mcp["name"]] = {
                    "command": sys.executable,
                    "args": [f"{currentDir}/mcpServers/{mcp['name']}.py"],
                    "transport": "stdio",
                    "env": envVars
                }
        return mcps

    def _status(self, user_prompt, input, llm, response, conv_id, memory):
        try:
            if "requiredInputs" in self.data:
                prompt = self._build_data_collector_status_prompt(response)
                # load ubility memory
                memory.load_streaming_memory(conv_id)
            else:
                prompt = self._build_react_agent_status_prompt(user_prompt, input, response)

            agent = RunnableWithMessageHistory(
                create_react_agent(model=llm, prompt=prompt, tools=[]),
                get_session_history,
                input_messages_key="messages",
                # store=InMemoryStore()
            )
            status = agent.invoke(input={"messages": ""}, config={'configurable': {'session_id': conv_id}})
            if 'messages' in status:
                for msg in status['messages']:
                    if isinstance(msg, AIMessage):
                        status = msg.content
            memory.reset_memory(conv_id)
            logging.info("status")
            logging.info(status)
            return status
        except Exception as exc:
            raise Exception(exc)

    def _get_selected_tools(self, all_tools):
        selected_tools = []
        for tool in all_tools:
            if tool.name in self.data['tools']['selectedTools']:
                selected_tools.append(tool)
        return selected_tools

    def _build_react_agent_status_prompt(self, user_prompt, user_input, agent_output):
        return DEFAULT_REACT_AGENT_STATUS_PROMPT.format(
            user_prompt=user_prompt if user_prompt else '',
            user_input=user_input,
            agent_output=agent_output
        )

    def _build_data_collector_system_prompt(self):
        required_inputs = ""
        for name, description in self.data["requiredInputs"].items():
            required_inputs += f"{name}: {description}\n"
        return DEFAULT_DATA_COLLECTOR_SYSTEM_PROMPT.format(
            required_inputs=required_inputs
        )

    def _build_data_collector_status_prompt(self, agent_output):
        required_inputs_definition = ""
        for name, description in self.data["requiredInputs"].items():
            required_inputs_definition += f"    - {name}: {description}\n"

        required_inputs_dict = ""
        for name, description in self.data["requiredInputs"].items():
            required_inputs_dict += f'    "{name}": "<value or empty string>",\n'

        return DEFAULT_DATA_COLLECTOR_STATUS_PROMPT.format(
            agent_output=agent_output,
            required_inputs_definition=required_inputs_definition,
            required_inputs_dict=required_inputs_dict
        )
    
    async def stream(self, sio, sid, conversation_id=None, input=None): # input used for the recursive functionality
        try:
            tools = []
            if 'tools' in self.data:
                client = MultiServerMCPClient(self._setup_mcp_servers())
                # Retrieve MCP tools if exist
                if isinstance(self.data['tools'], dict) and "selectedTools" in self.data['tools']:
                    all_tools = await client.get_tools()
                    tools = self._get_selected_tools(all_tools)
                else:
                    tools = await client.get_tools()

                # Include custom tools if any exist
                if isinstance(self.data['tools'], dict) and "toolConfigs" in self.data['tools']:
                    tools = create_custom_tools(tools, self.data['tools']['toolConfigs'], self.credentials)
                else:
                    tools = create_custom_tools(tools, self.data['tools'], self.credentials)

            llm_model = Model(provider=self.data['model']["provider"], model=self.data['model']["model"] if "model" in self.data['model'] else "", credentials=self.credentials[self.data['model']['credential']], params=self.data['model']["params"]).chat()

            if conversation_id:
                if 'chainMemory' not in self.data or 'type' not in self.data['chainMemory']:
                    self.data['chainMemory'] = {}
                    self.data['chainMemory']["type"] = "ConversationBufferMemory"

                if self.data['chainMemory']["type"] == "ConversationSummaryBufferMemory":
                    self.data['chainMemory']["llm"] = llm_model

                memory = Memory(type=self.data['chainMemory']["type"], historyId=conversation_id, params=self.data['chainMemory'])
                
                if 'context' in self.data['chainMemory']:
                    memory.load_external_context(conversation_id)

                # load ubility memory
                memory.load_streaming_memory(conversation_id)

            user_prompt = None
            if "prompt" in self.data['inputs'] and self.data['inputs']["prompt"] and "requiredInputs" not in self.data:
                logging.info("initialize the react agent with custom prompt")
                user_prompt = self.data['inputs']["prompt"]+ "\nWhen you have fully completed all required tasks, Dont ask if the user needs any further assistance"
                raw_agent = create_react_agent(model=llm_model, tools=tools, prompt=user_prompt) # If the user provides a custom prompt, initialize the react agent with it
            elif "requiredInputs" in self.data:
                logging.info("initialize the data collector agent with custom prompt")
                raw_agent = create_react_agent(model=llm_model, tools=tools, prompt=self._build_data_collector_system_prompt()) # this agent is a data collector
            else:
                logging.info("initialize react agent without prompt")
                raw_agent = create_react_agent(model=llm_model, tools=tools) # react agent without prompt


            if sio and sid and conversation_id:
                agent = RunnableWithMessageHistory(
                    raw_agent,
                    get_session_history,
                    input_messages_key="messages",
                    # store=InMemoryStore()
                )

                if input:
                    self.data['inputs']["query"] = input # set the last input value
                
                result = ""
                async for chunk in agent.astream_events(input={"messages": self.data['inputs']["query"]}, config={"configurable": {"session_id": conversation_id}}):
                    if 'event' in chunk and chunk['event'] == 'on_chat_model_stream':
                        await sio.emit('agent', {
                                    'type': 'chunk',
                                    'chunk': chunk['data']['chunk'].content
                                }, room=sid)
                        result += chunk['data']['chunk'].content

                # reset react memory after each run (ubility memory is loaded instead)
                memory.reset_memory(conversation_id)

                await sio.emit('end', {
                    'type': 'end of chunks'
                    }, room=sid)
                
            else:
                result = ""
                async for chunk in raw_agent.astream(input={"messages": self.data['inputs']["query"]}, stream_mode="messages"):
                    if isinstance(chunk[0], AIMessageChunk):
                        result += chunk[0].content

                return {"answer": result}
            

            status = self._status(user_prompt, self.data['inputs']["query"], llm_model, result, conversation_id, memory)
            status = status.replace("'", '"')
            try:
                status = json.loads(status)
            except Exception as ex:
                cleaned = re.sub(r"^```json\n|\n```$", "", status)
                status = json.loads(cleaned)

            result = {"answer":result, **status}

            return result
        except Exception as exc:
            if sio and sid:
                logging.error(f"an error occurred while running this ai node: {str(exc)}")
                await sio.emit('error_message', {
                    'type': 'error_message',
                    'error': 'an error occurred while running this ai node'
                    }, room=sid)
            raise Exception(exc)