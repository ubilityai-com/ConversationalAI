"""
chatbot.py
----------
Functions to interact with the chatbot SQLite table.
"""

import sqlite3
import json
import time
from typing import List, Dict
from app import DB_FILE


def create_chatbot(name: str, dialogue: dict, ui_json: dict, status: str) -> None:
    """
    Insert a new chatbot into the database.

    Args:
        name (str): Chatbot name.
        dialogue (dict): The dialogue configuration.
        ui_json (dict): The UI configuration.
        status (str): The chatbot status.
    """
    now_unix = str(int(time.time()))
    with sqlite3.connect(DB_FILE) as conn:
        conn.execute("""
            INSERT INTO chatbot (name, dialogue, ui_json, status, last_update_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (name, json.dumps(dialogue), json.dumps(ui_json), status, now_unix, now_unix))


def list_chatbots() -> List[Dict]:
    """
    Fetch all chatbot records.

    Returns:
        List[Dict]: A list of chatbot rows as dictionaries.
    """
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.execute("SELECT * FROM chatbot")
        return [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]


def delete_chatbot(id: int) -> None:
    """
    Delete a chatbot from the database by ID.

    Args:
        id (int): The ID of the chatbot to delete.
    """
    with sqlite3.connect(DB_FILE) as conn:
        conn.execute("DELETE FROM chatbot WHERE id = ?", (id,))


def update_chatbot(id: int, updates: Dict) -> None:
    """
    Update fields of a chatbot entry by ID.

    Args:
        id (int): The chatbot ID.
        updates (Dict): Dictionary of fields to update.
    """
    if not updates:
        return

    updates['last_update_at'] = str(int(time.time()))

    # JSON-encode fields if needed
    if 'dialogue' in updates:
        updates['dialogue'] = json.dumps(updates['dialogue'])
    if 'ui_json' in updates:
        updates['ui_json'] = json.dumps(updates['ui_json'])

    fields = ", ".join([f"{key} = ?" for key in updates.keys()])
    values = list(updates.values())

    with sqlite3.connect(DB_FILE) as conn:
        conn.execute(f"UPDATE chatbot SET {fields} WHERE id = ?", (*values, id))
