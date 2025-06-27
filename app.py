"""
app.py
-------
Main entry point for the FastAPI + Socket.IO chatbot server.

Features:
- WebSocket-based session management
- Basic conversational state machine
- HTTP routes for credential management
"""

import json
import socketio
import uvicorn
from datetime import datetime
from fastapi import FastAPI
from elements.message import Message
from functions import execute_process, save_user_input

# Constants
DB_FILE = 'database.db'
CANCELLATION_PHRASES = ['bye', 'quit', 'cancel', 'exit', 'stop', 'end']

# In-memory session store
session = {}

# Load dialogue definition from JSON
with open('demo.json') as f:
    dialogue = json.load(f)

# FastAPI instance for HTTP routes
http_app = FastAPI()

# Import HTTP route modules
from routes.credentials_view import *
from routes.chatbot_view import *

# Socket.IO ASGI server
sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi')
app = socketio.ASGIApp(sio, other_asgi_app=http_app)

# ---------------------------
# Socket.IO Event Handlers
# ---------------------------

@sio.event
async def connect(sid, environ):
    """
    Handle a new client connection.

    If a conversation ID is not provided, disconnect.
    If an old session exists for the same conversation ID, terminate it.
    """
    query = environ.get('QUERY_STRING', '')
    params = dict(p.split('=') for p in query.split('&') if '=' in p)
    conversation_id = params.get('conversationId')

    if not conversation_id:
        await sio.disconnect(sid)
        return

    print(f'[Connected] New conversation: {conversation_id}')

    # Disconnect existing session
    if conversation_id in session:
        old_sid = session[conversation_id]['sid']
        await sio.emit('force_disconnect', 'You were logged out due to a new session.', room=old_sid)
        await sio.disconnect(old_sid)

    # Start a new session
    now = datetime.now().isoformat()
    session[conversation_id] = {
        'sid': sid,
        'created_at': now,
        'last_reply_at': now,
        'variables': {},
        'current_step': 'firstElementId',
        'wait_for_user_input': None
    }

    conversation = session[conversation_id]
    current_step = conversation['current_step']

    # Greet the user if the current step is configured to do so
    if dialogue[current_step].get('start'):
        greet_message = Message(dialogue[current_step]['greet'])
        await greet_message.send(sio, sid)
        conversation['current_step'] = dialogue[current_step]['next']
        await execute_process(sio, sid, conversation_id, session, dialogue)


@sio.event
async def message(sid, data):
    """
    Handle incoming message from the client.
    Includes cancellation detection and input processing.
    """
    # Identify conversation ID based on sid
    conversation_id = next((cid for cid, conv in session.items() if conv['sid'] == sid), None)
    if not conversation_id:
        return

    conversation = session[conversation_id]
    conversation['last_reply_at'] = datetime.now().isoformat()

    user_input = json.loads(data)
    user_message = user_input.get('value', '').lower().strip()

    # Handle cancellation
    if user_message in CANCELLATION_PHRASES:
        cancel_message = Message(dialogue['firstElementId']['cancel'])
        await cancel_message.send(sio, sid)

        # Reset session state
        conversation['current_step'] = dialogue['firstElementId']['next']
        conversation['variables'] = {}
        conversation['wait_for_user_input'] = None
        return

    # Save input and continue process
    save_user_input(conversation, user_input)
    await execute_process(sio, sid, conversation_id, session, dialogue)


@sio.event
async def disconnect(sid):
    """
    Handle client disconnection and clean up session state.
    """
    for conversation_id, conv in list(session.items()):
        if conv['sid'] == sid:
            print(f'[Disconnected] Conversation ended: {conversation_id}')
            del session[conversation_id]
            break

# ---------------------------
# Uvicorn Entry Point
# ---------------------------

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8031)