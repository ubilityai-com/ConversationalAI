from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent
from langchain_core.runnables.history import RunnableWithMessageHistory
from ubility_langchain.langchain_memory import Memory, get_session_history
from langgraph.store.memory import InMemoryStore
from ubility_langchain.customTools import create_custom_tools
from langchain_core.messages.ai import AIMessage, AIMessageChunk
from ubility_langchain.model import Model
import sys, os, json
from dotenv import load_dotenv
load_dotenv(override=True)


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
                elif mcp['name'] == 'WhatsAppMcpServer':
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
                elif mcp['name'] == 'HubspotMcpServer':
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

    def _status(self, llm, response):
        try:
            prompt = """
You are a strict evaluator AI that determines whether a given response represents a completed task or not.

You will be given a response from a previous agent.

Your job is to analyze the content and return the following key: status.

If the response asks for more input, provides general greetings, or indicates it is waiting for more information or clarification, then status must be "fail".
If the response represents a complete and meaningful answer to a user request or clearly finishes a task, then status must be "pass"

Only "pass" or "fail" are allowed as status values. Do not use any other status or format.

Output should be like this: {"status": ""}. No explanation is needed.
"""
            agent = RunnableWithMessageHistory(
                create_react_agent(model=llm, prompt=prompt, tools=[]),
                get_session_history,
                input_messages_key="messages",
                store=InMemoryStore()
            )
            status = agent.invoke(input={"messages": response})
            if 'messages' in status:
                for msg in status['messages']:
                    if isinstance(msg, AIMessage):
                        status = msg.content
            print("status")
            print(status)
            return status
        except Exception as exc:
            raise Exception(exc)

    def _get_selected_tools(self, all_tools):
        selected_tools = []
        for tool in all_tools:
            if tool.name in self.data['tools']['selected_tools']:
                selected_tools.append(tool)
        return selected_tools
    
    async def stream(self, sio, sid, conversation_id, input=None): # input used for the recursive functionality
        try:
            tools = []
            if 'tools' in self.data:
                client = MultiServerMCPClient(self._setup_mcp_servers())
                # Retrieve MCP tools if exist
                if isinstance(self.data['tools'], dict) and "selected_tools" in self.data['tools']:
                    all_tools = await client.get_tools()
                    tools = self._get_selected_tools(all_tools)
                else:
                    tools = await client.get_tools()

                # Include custom tools if any exist
                if isinstance(self.data['tools'], dict) and "toolConfigs" in self.data['tools']:
                    tools = create_custom_tools(tools, self.data['tools']['toolConfigs'], self.credentials)
                else:
                    tools = create_custom_tools(tools, self.data['tools'], self.credentials)

                # if tools == []:
                #     raise Exception("Missing Tool(s)")

            llm_model = Model(provider=self.data['model']["provider"], model=self.data['model']["model"] if "model" in self.data['model'] else "", credentials=self.credentials[self.data['model']['credential']], params=self.data['model']["params"]).chat()

            if conversation_id:
                if 'type' in self.data['chainMemory']:
                    if self.data['chainMemory']["type"] == "ConversationSummaryBufferMemory":
                        self.data['chainMemory']["llm"] = llm_model

                    memory = Memory(type=self.data['chainMemory']["type"], historyId=self.data['chainMemory']["historyId"], params=self.data['chainMemory'])
                    
                    if 'context' in self.data['chainMemory']:
                        memory.load_external_context()

                    if "historyId" in self.data['chainMemory']:
                        memory.load_streaming_memory(conversation_id)

                else:
                    raise Exception("Missing memory type") 

            if "prompt" in self.data['inputs'] and self.data['inputs']["prompt"]:
                raw_agent = create_react_agent(model=llm_model, tools=tools, prompt=self.data['inputs']["prompt"])
            else:
                raw_agent = create_react_agent(model=llm_model, tools=tools) 


            if sio and sid:
                agent = RunnableWithMessageHistory(
                    raw_agent,
                    get_session_history,
                    input_messages_key="messages",
                    store=InMemoryStore()
                )

                if input:
                    self.data['inputs']["query"] = input # set the last input value
                
                result = ""
                async for chunk in agent.astream_events(input={"messages": self.data['inputs']["query"]}):
                    if 'event' in chunk and chunk['event'] == 'on_chat_model_stream':
                        await sio.emit('message', {
                                    'type': 'chunk',
                                    'chunk': chunk['data']['chunk'].content
                                }, room=sid)
                        result += chunk['data']['chunk'].content

                await sio.emit('message', {
                    'type': 'end of chunks'
                    }, room=sid)
                
            else:
                result = ""
                async for chunk in raw_agent.astream(input={"messages": self.data['inputs']["query"]}, stream_mode="messages"):
                    if isinstance(chunk[0], AIMessageChunk):
                        result += chunk[0].content

                return {"answer": result}
            
            # Update history with new messages
            memory.add_new_message(self.data['inputs']["query"], result)

            status = json.loads(self._status(llm_model, result))
            result = {"answer":result, **status}

            if result['status'] == 'pass':
                memory.reset_memory(conversation_id)

            return result
        except Exception as exc:
            if sio and sid:
                await sio.emit('error_message', {
                    'type': 'error_message',
                    'error': str(exc)
                    }, room=sid)
            raise Exception(exc)