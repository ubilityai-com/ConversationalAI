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
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO chatbot (name, dialogue, ui_json, status, last_update_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (name, json.dumps(dialogue), json.dumps(ui_json), status, now_unix, now_unix))
        
        chatbot_id = cursor.lastrowid

    return {
        "id": chatbot_id,
        "name": name,
        "dialogue": dialogue,
        "ui_json": ui_json,
        "status": status,
        "last_update_at": now_unix,
        "created_at": now_unix
    }


def list_chatbots() -> List[Dict]:
    """
    Fetch all chatbot records and return only id, name, updated_date, and status.

    Returns:
        List[Dict]: A list of chatbot rows as dictionaries.
    """
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.execute("SELECT id, name, last_update_at, status FROM chatbot")
        chatbots = []

        for row in cursor.fetchall():
            chatbot_id, name, last_update_at, status = row
            chatbots.append({
                "id": chatbot_id,
                "name": name,
                "updated_date": last_update_at,
                "status": status
            })

        return chatbots


def delete_chatbot(id: int) -> None:
    """
    Delete a chatbot from the database by ID.

    Args:
        id (int): The ID of the chatbot to delete.
    """
    with sqlite3.connect(DB_FILE) as conn:
        conn.execute("DELETE FROM chatbot WHERE id = ?", (id,))


def update_chatbot(id: int, updates: Dict):
    """
    Update fields of a chatbot entry by ID.

    Args:
        id (int): The chatbot ID.
        updates (Dict): Dictionary of fields to update.
    """
    if not updates:
        return False

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
    
    return True



def get_chatbot(id: int = None, name: str = None) -> Dict | None:
    """
    Retrieve a chatbot by ID or name.

    Args:
        id (int, optional): The chatbot ID.
        name (str, optional): The chatbot name.

    Returns:
        Dict | None: The chatbot record with parsed fields or None if not found.

    Raises:
        ValueError: If neither or both arguments are provided.
    """
    if (id is None and name is None) or (id is not None and name is not None):
        raise ValueError("You must provide exactly one of 'id' or 'name'.")

    query = "SELECT * FROM chatbot WHERE id = ?" if id is not None else "SELECT * FROM chatbot WHERE name = ?"
    param = (id,) if id is not None else (name,)

    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.execute(query, param)
        row = cursor.fetchone()

        if not row:
            return None

        columns = [column[0] for column in cursor.description]
        result = dict(zip(columns, row))

        # Convert specific string fields into dict/list
        for key in ["dialogue", "ui_json", "credentials_used"]:
            if key in result:
                try:
                    result[key] = json.loads(result[key])
                except (json.JSONDecodeError, TypeError):
                    result[key] = {}

        return result
