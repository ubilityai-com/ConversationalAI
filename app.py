"""
app.py
-------
Main entry point for the FastAPI + Socket.IO chatbot server.

"""

import json,socketio,uvicorn
from datetime import datetime
from fastapi import FastAPI
from elements.message import Message
from functions import execute_process, save_user_input,save_file_input
from logger_config import logger, setup_logger
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware


# Initialize logging
setup_logger()


# Constants
DB_FILE = 'database.db'
CANCELLATION_PHRASES = ['bye', 'quit', 'cancel', 'exit', 'stop', 'end']

# In-memory session store
session = defaultdict(dict)

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
from routes.functions import *
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
    params = dict(p.split('=') for p in query.split('&') if '=' in p)
    conversation_id = params.get('conversationId')
    dialogue_id = params.get('dialogueId')

    if not conversation_id or not dialogue_id or dialogue_id not in active_dialogues:
        await sio.disconnect(sid)
        return

    logger.info(f"A new client connected with conversation ID: {conversation_id} to the dialogue ID : {dialogue_id}")

    # Disconnect existing session
    if dialogue_id in session and conversation_id in session[dialogue_id]:
        logger.warning("The session was terminated due to a new login")
        old_sid = session[dialogue_id][conversation_id]['sid']
        await sio.emit('force_disconnect', 'A new connection caused this session to end', room=old_sid)
        await sio.disconnect(old_sid)

    # Start a new session
    now = datetime.now().isoformat()
    session[dialogue_id][conversation_id] = {
        'sid': sid,
        'created_at': now,
        'last_reply_at': now,
        'variables': {},
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
        logger.info("Ubility bot will send greet message on connection")
        greet_message = Message(dialogue[current_step]['greet'])
        await greet_message.send(sio, sid)
        conversation['current_step'] = dialogue[current_step]['next']
        await execute_process(sio, sid, conversation, conversation_id, dialogue)


@sio.event
async def message(sid, data):
    """
    Handle incoming message from the client.
    Includes cancellation detection and input processing.
    """
    logger.info("New Message Event received")

    user_input = json.loads(data) if isinstance(data, str) else data
    user_message = user_input.get('data', '')
    dialogue_id = user_input.get('dialogueId')
    data_type = user_input.get('data_type')

    if not dialogue_id or not data_type:
        logger.warning("The request is missing required headers")
        return

    conversation_id = get_conversation_id_from_sid(dialogue_id, sid)
    if not conversation_id:
        logger.warning(f"No conversation found for sid={sid} under dialogue_id={dialogue_id}")
        return

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

def get_conversation_id_from_sid(dialogue_id, sid):
    dialogue_sessions = session.get(dialogue_id, {})
    for conv_id, conv in dialogue_sessions.items():
        if conv.get('sid') == sid:
            return conv_id
    return None

@sio.event
async def disconnect(sid):
    """
    Handle client disconnection and clean up session state.
    """
    for dialogue_id, conversations in list(session.items()):
        for conversation_id, conv in list(conversations.items()):
            if conv.get('sid') == sid:
                print(f'[Disconnected] Conversation ended: {conversation_id} in dialogue {dialogue_id}')
                del session[dialogue_id][conversation_id]

                # Optionally, delete dialogue if no conversations left
                if not session[dialogue_id]:
                    del session[dialogue_id]
                return  # exit after first match

# ---------------------------
# Uvicorn Entry Point
# ---------------------------

if __name__ == '__main__':
    logger.info("Starting Ubility bot server")
    uvicorn.run(app, host='0.0.0.0', port=8031)