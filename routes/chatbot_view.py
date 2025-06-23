"""
chatbot_view.py
----------------
FastAPI routes for managing chatbot objects.

This module defines the HTTP endpoints for creating, listing, and deleting chatbot entries.
"""

from fastapi import HTTPException
from pydantic import BaseModel
from app import http_app
from models.chatbot import create_chatbot, list_chatbots, delete_chatbot


class ChatbotCreateRequest(BaseModel):
    name: str
    dialogue: dict
    ui_json: dict
    status: str


@http_app.post('/chatbots')
def create_chatbot_view(payload: ChatbotCreateRequest):
    """
    Create a new chatbot entry.

    Args:
        payload (ChatbotCreateRequest): The chatbot data.

    Returns:
        dict: Success message.
    """
    try:
        create_chatbot(payload.name, payload.dialogue, payload.ui_json, payload.status)
        return {"message": "Chatbot created"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating chatbot: {str(e)}")


@http_app.get('/chatbots')
def list_chatbots_view():
    """
    List all chatbots.

    Returns:
        list: A list of chatbot entries.
    """
    try:
        return list_chatbots()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing chatbots: {str(e)}")


@http_app.delete('/chatbots/{id}')
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
        raise HTTPException(status_code=500, detail=f"Error deleting chatbot: {str(e)}")
