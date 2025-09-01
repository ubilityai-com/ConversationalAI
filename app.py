"""
app.py
-------
Main entry point for the FastAPI + Socket.IO chatbot server.

"""

import json,socketio,shutil,os,asyncio
from datetime import datetime,timedelta
from fastapi import FastAPI
from elements.message import Message
from functions import execute_process, save_user_input,save_file_input,restore_active_chatbots, save_data_to_global_history, create_global_history
from logger_config import logger, setup_logger
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import Config, Server
from config import SECRET_KEY
from cryptography.fernet import Fernet
from urllib.parse import parse_qs
from ubility_langchain.langchain_memory import store

# Initialize logging
setup_logger()


# Constants
DB_FILE = 'database.db'
CANCELLATION_PHRASES = ['bye', 'quit', 'cancel', 'exit', 'stop', 'end']

# In-memory session store
session = defaultdict(dict)

# Keep a global dictionary to map sid -> dialogue_id , conv_id
connected_clients = {}

# All active dialogues
from dialogues.dialogues import active_dialogues


# FastAPI instance for HTTP routes
http_app = FastAPI()

# Enable CORS Middleware in FastAPI
http_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import HTTP route modules
from routes.credentials_view import *
from routes.chatbot_view import *
from routes.system_view import *
from applications.routes import *
from routes.files_view import *

# Socket.IO ASGI server
sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi')
app = socketio.ASGIApp(sio, other_asgi_app=http_app)

# ---------------------------
# Socket.IO Event Handlers
# ---------------------------

@sio.event
async def connect(sid, environ, auth=None):
    """
    Handle a new client connection.

    If a conversation ID is not provided, disconnect.
    If an old session exists for the same conversation ID, terminate it.
    """
    
    query = environ.get('QUERY_STRING', '')
    params = parse_qs(query) # Python’s built-in URL query parser
    token = params.get('token', [None])[0]
    conversation_id = params.get('conversationId', [None])[0]
    dialogue_id = decrypt_dialogue_id(token)

    if not conversation_id or not dialogue_id or dialogue_id not in active_dialogues:
        await sio.emit('force_disconnect', 'Connection error', room=sid)
        await sio.disconnect(sid)
        return

    logger.info(f"A new client connected with conversation ID: {conversation_id} to the dialogue ID : {dialogue_id}")

    # Create global history
    create_global_history(conversation_id)

    # Disconnect existing session
    if dialogue_id in session and conversation_id in session[dialogue_id]:
        logger.warning("The session was terminated due to a new login")
        old_sid = session[dialogue_id][conversation_id]['sid']
        await sio.emit('force_disconnect', 'A new connection caused this session to end', room=old_sid)
        await sio.disconnect(old_sid)

    connected_clients[sid]={
        "dialogue_id":dialogue_id,
        "conversation_id":conversation_id
    }

    # Start a new session
    now = datetime.now().isoformat()
    session[dialogue_id][conversation_id] = {
        'sid': sid,
        'created_at': now,
        'last_reply_at': now,
        'variables': active_dialogues[dialogue_id]['constant_variables'],
        'current_step': 'firstElementId',
        'wait_for_user_input': None,
        'dialogue_id':dialogue_id
    }

    conversation = session[dialogue_id][conversation_id]
    current_step = conversation['current_step']
    dialogue = active_dialogues[dialogue_id]['bot']

    # used for the recursive functionality in react agent
    conversation['variables']['react_fail'] = False
    conversation['variables']['last_input_value'] = ''

    # Greet the user if the current step is configured to do so
    if dialogue[current_step].get('start'):
        async def greet_and_execute():
            logger.info("Ubility bot will send greet message on connection")
            greet_message = Message(dialogue[current_step]['greet'])
            await greet_message.send(sio, sid)
            save_data_to_global_history(
                conversation_id=conversation_id,
                input=conversation['variables']['last_input_value'],
                output=dialogue[current_step]['greet']
            )
            conversation['current_step'] = dialogue[current_step]['next']
            await execute_process(sio, sid, conversation, conversation_id, dialogue)

        asyncio.create_task(greet_and_execute())


@sio.event
async def message(sid, data):
    """
    Handle incoming message from the client.
    Includes cancellation detection and input processing.
    """
    logger.info("New Message Event received")

    user_input = json.loads(data) if isinstance(data, str) else data
    user_message = user_input.get('data', '')
    data_type = user_input.get('data_type')

    if sid not in connected_clients:
        logger.warning(f"No conversation found for sid={sid}")
        return 

    dialogue_id = connected_clients[sid]["dialogue_id"]       
    conversation_id = connected_clients[sid]["conversation_id"]       

    conversation = session[dialogue_id][conversation_id]
    conversation['last_reply_at'] = datetime.now().isoformat()

    dialogue = active_dialogues[dialogue_id]['bot']
    
    # used for the recursive functionality in react agent
    if data_type != "binary":
        conversation['variables']['last_input_value'] = user_message

    # Handle cancellation
    if isinstance(user_message,str) and user_message.lower().strip() in CANCELLATION_PHRASES:
        logger.warning("The conversation was canceled by the user")
        cancel_message = Message(dialogue['firstElementId']['cancel'])
        await cancel_message.send(sio, sid)

        # Reset session state
        conversation['current_step'] = dialogue['firstElementId']['next']
        conversation['variables'] = {}
        conversation['wait_for_user_input'] = None
        return

    # Save input and continue process
    if conversation.get('wait_for_user_input') and data_type != "binary":
        save_user_input(conversation, user_input)

    # Save input file and continue process
    if conversation.get('wait_for_user_input') and data_type == "binary":
        user_input['data'] = bytes(user_input["data"]) #should be removed
        save_file_input(conversation,conversation_id, user_input)

    await execute_process(sio, sid, conversation, conversation_id, dialogue)

# def get_conversation_id_from_sid(dialogue_id, sid):
#     dialogue_sessions = session.get(dialogue_id, {})
#     for conv_id, conv in dialogue_sessions.items():
#         if conv.get('sid') == sid:
#             return conv_id
#     return None

def get_dialogue_id_from_sid(sid):
    for d_id, conversations in session.items():
        if sid in conversations:
            return d_id
    return None

@sio.event
async def disconnect(sid):
    """
    Handle client disconnection and clean up session state.
    """
    client_info = connected_clients.pop(sid, None)
    if not client_info:
        return

    dialogue_id = client_info["dialogue_id"]
    conversation_id = client_info["conversation_id"]

    logger.warning(f'[Disconnected] Conversation ended: {conversation_id} in dialogue {dialogue_id}')

    # Remove from session
    if dialogue_id in session and conversation_id in session[dialogue_id]:
        del session[dialogue_id][conversation_id]

        # Delete conversation history directory if it exists
        if conversation_id in store:
            store[conversation_id].clear()
            del store[conversation_id]
        lc_history_dir = os.path.join(os.getcwd(), "langchain_history", conversation_id)
        if os.path.exists(lc_history_dir):
            try:
                shutil.rmtree(lc_history_dir)
                logger.info(f"History directory '{lc_history_dir}' was deleted successfully")
            except OSError as e:
                logger.warning(f"Failed to delete history directory {lc_history_dir} : {e.strerror}")

        # Optionally, delete dialogue if no conversations left
        if not session[dialogue_id]:
            del session[dialogue_id]



IDLE_TIMEOUT_MINUTES = 3 # 3 minutes

async def check_idle_sessions():
    while True:
        now = datetime.now()

        # Iterate directly over connected clients
        for sid, client_info in list(connected_clients.items()):
            dialogue_id = client_info["dialogue_id"]
            conversation_id = client_info["conversation_id"]

            conv = session.get(dialogue_id, {}).get(conversation_id)
            if not conv:
                continue  # Session might have been already cleaned up

            try:
                last_reply_at = datetime.fromisoformat(conv['last_reply_at'])
            except (ValueError, KeyError):
                continue  # Skip malformed sessions

            if now - last_reply_at > timedelta(minutes=IDLE_TIMEOUT_MINUTES):
                logger.info(f"Disconnecting idle session: {conversation_id} in dialogue {dialogue_id}")
                await sio.emit('force_disconnect','Session disconnected due to inactivity',room=sid)
                await sio.disconnect(sid)

        await asyncio.sleep(180)  # Run every 3 minutes

def decrypt_dialogue_id(encrypted_str: str) -> str:
    """
    Decrypts dialogue_id from an encrypted string.

    Args:
        encrypted_str (str): Encrypted dialogue_id as a string

    Returns:
        str: Decrypted dialogue_id
    """
    fernet = Fernet(SECRET_KEY)
    decrypted_data = fernet.decrypt(encrypted_str.encode())  # convert back to bytes
    return decrypted_data.decode()


async def main():
    asyncio.create_task(check_idle_sessions())
    asyncio.create_task(restore_active_chatbots())
    config = Config(app, host="0.0.0.0", port=8031)
    server = Server(config)
    await server.serve()

if __name__ == "__main__":
    logger.info("Starting Ubility bot server")
    asyncio.run(main())