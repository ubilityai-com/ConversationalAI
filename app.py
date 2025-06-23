import json
import socketio
from datetime import datetime
from elements.message import Message
from functions import execute_process, save_user_input
import uvicorn
from fastapi import FastAPI, Request

DB_FILE = 'database.db'

# Memory session store
session = {}
CANCELLATION_PHRASES = ['bye', 'quit', 'cancel', 'exit', 'stop', 'end']

# Load dialogue
with open('demo.json') as f:
    dialogue = json.load(f)

#Create the FastAPI app for HTTP routes
http_app = FastAPI()

from routes.credentials_view import *



sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi')
app = socketio.ASGIApp(sio, other_asgi_app=http_app)



@sio.event
async def connect(sid, environ):
    query = environ.get('QUERY_STRING', '')
    params = dict(p.split('=') for p in query.split('&') if '=' in p)
    conversation_id = params.get('conversationId')
    
    if not conversation_id:
        await sio.disconnect(sid)
        return
    
    print(f'new conversation: {conversation_id}')
    
    # Kick existing session if present
    if conversation_id in session:
        old_sid = session[conversation_id]['sid']
        await sio.emit('force_disconnect', 'You were logged out due to a new session.', room=old_sid)
        await sio.disconnect(old_sid)
    
    # Create new session
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
    
    # Send greet message if configured
    if dialogue[current_step].get('start'):
        greet_message = Message(dialogue[current_step]['greet'])
        await greet_message.send(sio, sid)
        conversation['current_step'] = dialogue[current_step]['next']
        await execute_process(sio, sid, conversation_id, session, dialogue)

@sio.event
async def message(sid, data):
    # Find conversation ID
    conversation_id = None
    for cid, conv in session.items():
        if conv['sid'] == sid:
            conversation_id = cid
            break
    
    if not conversation_id:
        return
    
    conversation = session[conversation_id]

    # update last reply
    conversation['last_reply_at'] = datetime.now().isoformat()
    
    user_input = json.loads(data)
    user_message = user_input.get('value', '').lower().strip()
    
    # Check for cancellation phrases
    if user_message in CANCELLATION_PHRASES:
        cancel_message = Message(dialogue['firstElementId']['cancel'])
        await cancel_message.send(sio, sid)
        
        # Reset conversation
        conversation['current_step'] = dialogue['firstElementId']['next']
        conversation['variables'] = {}
        conversation['wait_for_user_input'] = None
        return
    
    # Save user input
    save_user_input(conversation, user_input)
    await execute_process(sio, sid, conversation_id, session, dialogue)

@sio.event
async def disconnect(sid):
    # Find and remove session
    for conversation_id, conv in list(session.items()):
        if conv['sid'] == sid:
            print(f'conversation disconnected: {conversation_id}')
            del session[conversation_id]
            break



if __name__ == '__main__':
   
    uvicorn.run(app, host='0.0.0.0', port=8031)