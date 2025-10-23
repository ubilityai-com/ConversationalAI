"""
functions.py
------------
Core logic for managing the chatbot conversation flow.

Includes:
- Step execution engine
- Input saving
- Element processing
- Dynamic routing and formatting
"""
from logger_config import logger
import json,base64,openai
from typing import Union
from elements.message import Message
from elements.multiple_choice import MultipleChoice
from elements.router import Router
from elements.text_formatter import TextFormatter
from elements.flow_invoker import FlowInvoker
from elements.variable_manager import VariableManager
from elements.ai_integration import AIIntegration
from elements.app_integration import AppIntegration
from elements.http_request import HttpRequest
from dialogues.dialogues import active_dialogues
import gzip, os, gzip,magic,uuid
import os.path, io

CHUNK_SIZE = 1024 * 1024  # 1 MB

async def execute_process(sio, sid, conversation, conversation_id, dialogue, condition=True):
    """
    Core processing engine for executing a conversation step.

    Args:
        sio: The Socket.IO server instance.
        sid: The session/socket ID.
        conversation_id (str): The ID of the conversation.
        session (dict): In-memory session store.
        dialogue (dict): The dialogue configuration loaded from JSON.
    """
    # logger.info("Starting the execute_process function")
    current_step = conversation.get('current_step')

    if not current_step:
        return

    current_dialogue = dialogue.get(current_step, {})
    wait_for_user = None if current_step == 'firstElementId' else current_dialogue.get('saveUserInputAs')
    element_type = 'Greet' if current_step == 'firstElementId' else current_dialogue.get('type')
    conversation['last_executed_node'] = element_type
    credentials = active_dialogues[conversation['dialogue_id']]["credentials"]
    state = active_dialogues[conversation['dialogue_id']].get('state', None)

    if 'usedVariables' in current_dialogue:
        used_vars = current_dialogue.get('usedVariables') or []
        # logger.info("Starting the replace_variables function")
        content = replace_variables(
            current_dialogue["content"],
            conversation['variables'],
            used_vars
        )

    if state and conversation['execute_state_after_restart'] and condition:
        cdt_resp = await execute_state(sio, sid, state, conversation, conversation_id, current_dialogue, credentials)
        if cdt_resp != 'Other' and state[cdt_resp] != conversation['current_step']:
            conversation['current_step'] = state[cdt_resp]

        conversation['execute_state_after_restart'] = False
        await execute_process(sio, sid, conversation, conversation_id, dialogue, condition=False)
        return

    # logger.info(f"Element type : {element_type}")
    # Element processing
    if element_type == 'Greet':
        if current_dialogue['greet']:
            await Message(current_dialogue['greet']).send(sio, sid)
            save_data_to_global_history(conversation_id=conversation_id, input="", output=current_dialogue['greet'])

    elif element_type == 'Message':
        await Message(content["data"]['text']).send(sio, sid)
        save_data_to_global_history(conversation_id=conversation_id, input="", output=content["data"]['text'])

    elif "LC" in element_type:
        if state and condition and element_type != "LC_CONDITION_AGENT" and conversation['last_executed_node'] != "LC_CONDITION_AGENT" and conversation['react_fail']:
            cdt_resp = await execute_state(sio, sid, state, conversation, conversation_id, current_dialogue, credentials)
            if cdt_resp != 'Other' and state[cdt_resp] != conversation['current_step']:
                conversation['current_step'] = state[cdt_resp]
                await execute_process(sio, sid, conversation, conversation_id, dialogue, condition=False)
                return
        
        await handle_ai_integration(sio, sid, element_type, credentials, conversation, conversation_id, current_dialogue, content)
        if conversation['react_fail']:
            return

    elif element_type == 'MultipleChoice':
        await MultipleChoice(
            content["data"]['message'],
            content["data"]['choices'],
            current_dialogue.get('usedVariables', [])
        ).send(sio, sid)
        save_data_to_global_history(conversation_id=conversation_id, input="", output=content["data"]['message'])

    elif element_type == 'Handler':
        await handle_multiple_choice(sio, sid, conversation, conversation_id, dialogue, current_dialogue,content)
        return

    elif element_type == 'Router':
        await handle_router(sio, sid, conversation, conversation_id, dialogue,content)
        return

    elif element_type == 'TextFormatter':
        handle_text_formatter(conversation,content)

    elif element_type == 'FlowInvoker':
        await handle_flow_invoker(conversation,content)

    elif element_type == 'HttpRequest':
        await handle_http_request(sio, sid, conversation, conversation_id, dialogue, current_dialogue, content, state)
        return

    elif element_type == 'VariableManager':
        handle_variable_manager(conversation,content)
    
    elif element_type == 'AppIntegration':
        await handle_app_integration(sio, sid, conversation, conversation_id, dialogue, current_dialogue, content, state)
        return
    
    elif element_type == 'Attachement':
        await handle_attachement(sio, sid,conversation,conversation_id,content)
    
    else:
        print(f'[Warning] Invalid element type: {element_type}')

    
    # Post-processing: move to next step if not waiting for user input
    if not wait_for_user:
        next_step = current_dialogue.get('next')

        if not next_step:
            if state:
                conversation['execute_state_after_restart'] = True
            # Restart or end conversation
            start_from = current_dialogue.get('startFrom')
            conversation['current_step'] = start_from or dialogue['firstElementId']['next']
            return

        conversation['current_step'] = next_step
        await execute_process(sio, sid, conversation, conversation_id, dialogue)
    else:
        logger.info("Waiting for user input ...")
        conversation['wait_for_user_input'] = wait_for_user
        conversation['current_step'] = current_dialogue.get('next')


async def execute_state(sio, sid, state, conversation, conversation_id, current_dialogue, credentials):
    logger.info("*************** START STATE CONDITION AGENT ***************")
    condition_agent_data = {
        "data": {
            "inputs": {
                "instruction": "Determine which of the provided scenarios is the best fit for the input.",
                "query": conversation['variables']["last_input_value"],
                "scenarios": state["scenarios"],
            },
            "model": state["model"],
            "params": {"stream": True},
        }
    }
    if "saveOutputAs" in current_dialogue:
        current_dialogue["saveOutputAs"].append({"name": "LC_CONDITION_AGENT_OUTPUT-var", "path": ".output"})
    else:
        current_dialogue["saveOutputAs"] = []
        current_dialogue["saveOutputAs"].append({"name": "LC_CONDITION_AGENT_OUTPUT-var", "path": ".output"})
    
    await handle_ai_integration(sio, sid, "LC_CONDITION_AGENT", credentials, conversation, conversation_id, current_dialogue, condition_agent_data, state)

    cdt_resp = conversation['variables'].get("LC_CONDITION_AGENT_OUTPUT-var", '')
    return cdt_resp


def save_user_input(conversation: dict, input_object: dict):
    """
    Save user's input to conversation variables.

    Args:
        conversation (dict): The current conversation.
        input_object (dict): The message input object containing 'data'.
    """
    # logger.info("Save user's input to conversation variables")
    conversation['variables'][conversation['wait_for_user_input']] = input_object.get('data')
    conversation['wait_for_user_input'] = None


def replace_variables(template: Union[str, list, dict], variables: dict, used_variables: list) -> Union[str, list, dict]:
    """
    Recursively replace variable placeholders in a template of type str, list, or dict.

    Args:
        template (Union[str, list, dict]): The template containing placeholders (e.g. "Hi ${name}")
        variables (dict): User variables to insert.
        used_variables (list): Variable names to use.

    Returns:
        Union[str, list, dict]: Template with all placeholders replaced.
    """
    
    def replace_in_string(text: str) -> str:
        for key in used_variables or []:
            placeholder = f"${{{key}}}"
            value = variables.get(key, '')
            text = text.replace(placeholder, str(value))
        return text
    if isinstance(template, str):
        return replace_in_string(template)
    elif isinstance(template, list):
        return [replace_variables(item, variables, used_variables) for item in template]
    elif isinstance(template, dict):
        return {k: replace_variables(v, variables, used_variables) for k, v in template.items()}
    else:
        return template  # If template is an unexpected type, return it as-is


def create_global_history(conversation_id):
    current_dir = os.getcwd()
    fullHistoryDir = f"{current_dir}/langchain_history/{conversation_id}"

    # Create history directory if it doesn't exist
    if not os.path.exists(fullHistoryDir):
        os.makedirs(fullHistoryDir)

    # Set the full file path for history data
    historyFilePath = f"{fullHistoryDir}/{conversation_id}.json"
    
    # Load existing data if file exists, otherwise initialize empty structure
    if not os.path.exists(historyFilePath):
        with io.open(historyFilePath, "w", encoding="utf-8") as historyFile:
            data = {"context": []}
            str_ = json.dumps(
                data,
                indent=4,
                sort_keys=True,
                separators=(",", ": "),
                ensure_ascii=False,
            )
            historyFile.write(str_)


def save_data_to_global_history(conversation_id, input, output):
    current_dir = os.getcwd()
    filePath = f"{current_dir}/langchain_history/{conversation_id}/{conversation_id}.json"
    if os.path.exists(filePath):
        f = open(filePath)
        try:
            history = json.load(f)
        except Exception:
            history = {"context": []}
        f.close()
        if 'context' in history:
            history['context'].append({"HumanMessage":f"{input}", "AIMessage":f"{output}"})
        else:
            history['context'] = []
            history['context'].append({"HumanMessage":f"{input}", "AIMessage":f"{output}"})

        with io.open(filePath, "w", encoding="utf-8") as historyFile:
            str_ = json.dumps(
                history,
                indent=4,
                sort_keys=True,
                separators=(",", ": "),
                ensure_ascii=False,
            )
            historyFile.write(str_)


async def handle_multiple_choice(sio, sid, conversation, conversation_id, dialogue, current_dialogue,content):
    """
    Handle conditional branching logic with Handler elements.
    """
    
    used_variable = current_dialogue['usedVariables'][0]
    case_value = conversation['variables'].get(used_variable, '')
    valid_cases = [k for k in content["data"]['cases'].keys() if k != 'Other']

    if case_value in valid_cases:
        conversation['current_step'] = content["data"]['cases'][case_value]
        await execute_process(sio, sid, conversation, conversation_id, dialogue)
    else:
        other = content["data"]['cases'].get('Other')
        if not other: # other is None
            conversation['current_step'] = dialogue['firstElementId']['next']
            return
        else:
            conversation['current_step'] = other
            await execute_process(sio, sid, conversation, conversation_id, dialogue)


async def handle_router(sio, sid, conversation, conversation_id, dialogue,content):
    """
    Handle advanced conditional logic with Router elements.
    """

    router = Router(content["data"]['conditions'])
    next_step = router.find_next_step()
    if next_step:
        conversation['current_step'] = next_step
        await execute_process(sio, sid, conversation, conversation_id, dialogue)
    else: # next is None
        conversation['current_step'] = dialogue['firstElementId']['next']
        return


def handle_text_formatter(conversation,content):
    """
    Process text formatting logic and save result to a variable.
    """
    formatter = TextFormatter(content["data"])
    result = formatter.process()
    conversation['variables'][content["data"]['saveOutputAs']] = result



async def handle_attachement(sio, sid,conversation,conversation_id,content):
    """
    Process Attachement logic (save file or send file).
    """
    if 'message' in content["data"]: # wait user to upload file
        await Message(content["data"]['message']).send(sio, sid)

    elif 'file' in content["data"]: # send file to user
        file = get_file_data(conversation,conversation_id,content["data"]['file'])
        file_bytes = base64.b64decode(file['data_base64'])
        await send_file_in_chunks(sio,sid, file_bytes, file['file_name'],file['content_type'])

async def send_file_in_chunks(sio,sid, file_bytes, filename,mimetype):
    total_size = len(file_bytes)
    for i in range(0, total_size, CHUNK_SIZE):
        chunk = file_bytes[i:i+CHUNK_SIZE]
        await sio.emit("message", {
            "type": "file",
            "data": chunk,
            "filename": filename,
            "mimetype": mimetype,
            "chunk_index": i // CHUNK_SIZE,
            "total_chunks": (total_size + CHUNK_SIZE - 1) // CHUNK_SIZE
        },room=sid)
    

async def handle_flow_invoker(conversation,content):
    """
    Invoke an external flow (API call) and save results to variables.
    """
    invoker = FlowInvoker(content["data"])
    try:
        logger.info("Calling webhook event")
        result = await invoker.make_request()
        result_data = json.loads(result)
        if isinstance(result_data.get('End'), dict):
            for key, value in result_data['End'].items():
                conversation['variables'][key] = value

    except Exception as e:
        print(f'[FlowInvoker] Failed: {e}')


def handle_variable_manager(conversation,content):
    """
    Manage or mutate conversation variables based on defined logic.
    """
    manager = VariableManager(content["data"])
    result = manager.process()
    conversation['variables'][result['variable']] = result['value']


async def handle_http_request(sio, sid, conversation, conversation_id, dialogue, current_dialogue, content, state):
    
    request = await HttpRequest(content["data"]).make_request(conversation['dialogue_id'],conversation_id)

    # save result in a variable if user want to 
    logger.info(f"Save http_request output in variables")
    if 'saveOutputAs' in content["data"]:
        for element in content["data"]['saveOutputAs']:
            if not element['path']: # save all result in a variable 
                conversation['variables'][element['name']] = request
            else: # save specific key in result
                value = get_value_from_path(request,element['path'])
                conversation['variables'][element['name']] = value

    # continue process execution
    if current_dialogue['next']:
        conversation['current_step'] = current_dialogue['next']
        await execute_process(sio, sid, conversation, conversation_id, dialogue)
    else:
        if state:
            conversation['execute_state_after_restart'] = True
        conversation['current_step'] = dialogue['firstElementId']['next']

async def handle_app_integration(sio, sid, conversation, conversation_id, dialogue, current_dialogue, content, state):


    app_content_json = content["data"]

    # execute app operation
    app_type = app_content_json['app']
    credential_name = app_content_json['credential']
    credential = active_dialogues[conversation['dialogue_id']]["credentials"][credential_name]
    operation = app_content_json['operation']
    content_json = app_content_json['content_json']

    logger.info(f"Executing {app_type} operation ({operation})")
    result = await AppIntegration(app_type,credential,operation,content_json).run_process(conversation['dialogue_id'],conversation_id)

    # save result in a variable if user want to 
    logger.info(f"Save {app_type} output in variables")
    if app_content_json['saveOutputAs']:
        for element in app_content_json['saveOutputAs']:
            if not element['path']: # save all result in a variable 
                conversation['variables'][element['name']] = result
            else: # save specific key in result
                value = get_value_from_path(result,element['path'])
                conversation['variables'][element['name']] = value

    # continue process execution
    if current_dialogue['next']:
        conversation['current_step'] = current_dialogue['next']
        await execute_process(sio, sid, conversation, conversation_id, dialogue)
    else:
        if state:
            conversation['execute_state_after_restart'] = True
        conversation['current_step'] = dialogue['firstElementId']['next']


async def handle_ai_integration(sio, sid, chain_type, credentials, conversation, conversation_id, current_dialogue, content, state=None):
    result = await AIIntegration(chain_type, credentials, content['data']).execute_ai_element(sio, sid, conversation, conversation_id, state)
    logger.info(f"*************** {chain_type} OUTPUT ***************")
    logger.info(f"{result}\n")
    if "answer" in result:
        save_data_to_global_history(conversation_id=conversation_id, input="", output=str(result["answer"]))
    
    # save result in a variable if user want to
    if result and 'saveOutputAs' in current_dialogue:
        if current_dialogue['saveOutputAs']:
            for element in current_dialogue['saveOutputAs']:
                if not element['path']: # save all result in a variable 
                    conversation['variables'][element['name']] = result
                else: # save specific key in result
                    value = get_value_from_path(result,element['path'])
                    conversation['variables'][element['name']] = value


def get_value_from_path(json_body, path, default=None):
    keys = path.strip('.').split('.')
    current = json_body
    try:
        for key in keys:
            if isinstance(current, list):
                key = int(key)  
            current = current[key]
        return current
    except (KeyError, IndexError, ValueError, TypeError):
        return default
    

def save_file_input(conversation,conversation_id,user_input):
    try:
        logger.info("Save user's file to conversation variables")
        # Decompress if gzip
        raw_data = (
            gzip.decompress(user_input.get('data'))
            if user_input.get('data')[:2] == b'\x1f\x8b'
            else user_input.get('data')
        )

        # Detect MIME and validate
        mime = magic.Magic(mime=True)
        detected_mime = mime.from_buffer(raw_data)
        logger.info(f"[INFO] Detected MIME type: {detected_mime}")

        # Find extension from MIME (reverse lookup)
        matched_extension = None
        for ext, mime_list in ALLOWED_EXTENSIONS.items():
            if detected_mime in mime_list:
                matched_extension = ext
                break

        if not matched_extension:
            logger.warning(f"extension {detected_mime} not allowed")
            
        # Extra security check for SVG (security)
        if matched_extension == "svg":
            try:
                svg_content = raw_data.decode('utf-8', errors='ignore').lower()
                if any(danger in svg_content for danger in ["<script", "onload=", "javascript:"]):
                    logger.warning("dangerous svg file")
                    
            except Exception:
                logger.warning("fail svg")
                
        random_suffix = str(uuid.uuid4())[:3]
        current_dir = os.getcwd()
        STORAGE_DIR = os.path.join(
            current_dir,
            "temp",
            str(conversation['dialogue_id']),
            str(conversation_id)
        )

        os.makedirs(STORAGE_DIR, exist_ok=True)  # Create dirs if they don't exist

        original_name = os.path.splitext(user_input["filename"])[0]
        file_name = f"{original_name}_{random_suffix}.{matched_extension}"
        file_path = os.path.join(STORAGE_DIR, file_name)

        # Save file
        with open(file_path, "wb") as f:
            f.write(raw_data)

        conversation['variables'][conversation['wait_for_user_input']] = file_name
        conversation['wait_for_user_input'] = None

    except Exception as error:
        raise Exception(error)
    


def get_file_data(conversation,conversation_id,file_name):
    try:

        current_dir = os.getcwd()
        STORAGE_DIR1 = os.path.join(current_dir,"temp",str(conversation['dialogue_id'])) # Global file
        STORAGE_DIR2 = os.path.join(current_dir,"temp",str(conversation['dialogue_id']),str(conversation_id))

        file_path1 = os.path.join(STORAGE_DIR1, file_name)
        file_path2 = os.path.join(STORAGE_DIR2, file_name)

        if os.path.exists(file_path1): # global file
            file_path = file_path1
        elif os.path.exists(file_path2):
            file_path = file_path2
        else: # File not found in either place
            return None

        # Load and return file as a downloadable attachment
        with open(file_path, 'rb') as f:
            file_data = f.read()
            
        # Encode the binary data to base64
        encoded_data = base64.b64encode(file_data).decode('utf-8')

        # Return as a JSON-compatible dict
        return {
            "file_name": file_name,
            "content_type": "application/octet-stream",
            "data_base64": encoded_data
        }

    except Exception as error:
        logger.warning(f"[ERROR] Failed to return file: {error}")
        return 

ALLOWED_EXTENSIONS = {
    # Text & Data
    "txt": ["text/plain"],
    "json": ["application/json"],
    "csv": ["text/csv"],
    "xml": ["application/xml", "text/xml"],

    # Documents
    "pdf": ["application/pdf"],
    "doc": ["application/msword"],
    "docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    "xls": ["application/vnd.ms-excel"],
    "xlsx": ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    "ppt": ["application/vnd.ms-powerpoint"],
    "pptx": ["application/vnd.openxmlformats-officedocument.presentationml.presentation"],

    # Images
    "png": ["image/png"],
    "jpg": ["image/jpeg"],
    "jpeg": ["image/jpeg"],
    "svg": ["image/svg+xml"],


    # Audio
    "mp3": ["audio/mpeg"],
    "wav": ["audio/wav", "audio/x-wav"],
    "ogg": ["audio/ogg"],
    "m4a": ["audio/mp4"],

    # Video
    "mp4": ["video/mp4"],
    "mov": ["video/quicktime"],
    "avi": ["video/x-msvideo"],
    "mkv": ["video/x-matroska"],
    "webm": ["video/webm"]
}


async def restore_active_chatbots():
    """
    On server restart, restore all active chatbots' dialogues to file system.
    
    Args:
        token (str): SuperAdmin or internal token with permission to list all chatbots.
    """
    try:
        from models.chatbot import list_chatbots_all_data
        from models.credentials import get_credentials_by_names
        all_chatbots = list_chatbots_all_data()

        if not all_chatbots:
            logger.warning("No chatbots found or failed to fetch.")
            return False

        for chatbot in all_chatbots:
            if chatbot.get("status") != "Active":
                continue

            dialogue_id = chatbot.get("id")
            dialogue = chatbot.get("dialogue")
            cred_obj = get_credentials_by_names(dialogue['credentials'])

            state = None
            if 'state' in dialogue:
                state = dialogue['state']
                
            new_dialogue = {
                "credentials": cred_obj,
                "constant_variables": dialogue['constant_variables'],
                "bot": dialogue['bot'],
                "state": state
            }
            if not dialogue_id or not dialogue:
                logger.warning(f"Skipping chatbot ID {dialogue_id} due to missing info.")
                continue

            active_dialogues[str(dialogue_id)]=new_dialogue

        return True
    except Exception as e:
        return False
    

def speech_to_text_openai(api_key,audio_binary: bytes, filename: str ):
    """
    Converts audio binary data to text using OpenAI Whisper API.
    
    :param audio_binary: Binary data of the audio file
    :param filename: Name of the file (extension required, e.g., .wav, .mp3, .m4a)
    :return: Transcribed text
    """
    openai.api_key = api_key
    audio_file = io.BytesIO(audio_binary)
    audio_file.name = filename  # OpenAI needs filename to detect format

    transcript = openai.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file
    )
    return transcript.text