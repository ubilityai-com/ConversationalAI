"""
chatbot_view.py
----------------
FastAPI routes for managing chatbot objects.

This module defines the HTTP endpoints for creating, listing, and deleting chatbot entries.
"""

from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app import http_app
from models.chatbot import create_chatbot, list_chatbots, delete_chatbot, update_chatbot,get_chatbot
from typing import Optional
from cryptography.fernet import Fernet
from config import SECRET_KEY

class ChatbotCreateRequest(BaseModel):
    name: str
    dialogue: dict
    ui_json: dict


class ChatbotUpdateRequest(BaseModel):
    name: Optional[str] = None
    dialogue: Optional[dict] = None
    ui_json: Optional[dict] = None


@http_app.post('/bot/chatbots')
def create_chatbot_view(payload: ChatbotCreateRequest):
    """
    Create a new chatbot entry.

    Args:
        payload (ChatbotCreateRequest): The chatbot data.

    Returns:
        dict: Success message.
    """
    try:
        chatbot= create_chatbot(payload.name, payload.dialogue, payload.ui_json, 'Inactive')
        token = encrypt_dialogue_id(chatbot['id'])
        chatbot['token']=token
        return chatbot
        
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.get('/bot/chatbots')
def list_chatbots_view():
    """
    List all chatbots.

    Returns:
        list: A list of chatbot entries.
    """
    try:
        return list_chatbots()
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.delete('/bot/chatbots/{id}')
def delete_chatbots_view(id: int):
    """
    Delete a chatbot by ID.

    Args:
        id (int): The ID of the chatbot to delete.

    Returns:
        dict: Success message.
    """
    try:
        delete_chatbot(id)
        return {"message": "Chatbot deleted"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})



@http_app.put('/bot/chatbots/{id}')
def update_chatbot_view(id: int, payload: ChatbotUpdateRequest):
    """
    Update a chatbot by ID with only the fields provided.

    Args:
        id (int): The chatbot ID.
        payload (ChatbotUpdateRequest): The fields to update.

    Returns:
        dict: Success message.
    """
    try:
        update_chatbot(id, payload.dict(exclude_unset=True))
        return {"message": "Chatbot updated"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})
    


@http_app.get('/bot/chatbot/{id}')
def get_chatbot_view(id: int):

    try:
        chatbot_obj = get_chatbot(id=id)
        if chatbot_obj:
            return chatbot_obj
        else:
            return JSONResponse(status_code=404, content={"Error": "Chatbot not found"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})


def encrypt_dialogue_id(dialogue_id: int) -> str:
    fernet = Fernet(SECRET_KEY)
    encrypted_data = fernet.encrypt(str(dialogue_id).encode())
    return encrypted_data.decode()