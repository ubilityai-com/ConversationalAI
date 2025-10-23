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


def create_chatbot(name: str, dialogue: dict, ui_json: dict, status: str) -> dict | None:
    """
    Insert a new chatbot into the database, ensuring the name is unique.

    Args:
        name (str): Chatbot name.
        dialogue (dict): The dialogue configuration.
        ui_json (dict): The UI configuration.
        status (str): The chatbot status.

    Returns:
        dict | None: Created chatbot data if successful, None if error or name exists.
    """
    try:
        now_unix = str(int(time.time()))

        with sqlite3.connect(DB_FILE) as conn:
            cursor = conn.cursor()

            # Check if name exists
            cursor.execute("SELECT id FROM chatbot WHERE name = ?", (name,))
            existing = cursor.fetchone()
            if existing:
                raise ValueError(f"Chatbot name already exists.")

            # Insert new chatbot
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

    except ValueError as e:
        return {"Error": str(e)}
    except (TypeError, sqlite3.Error, Exception):
        return {"Error": "server error"}


def list_chatbots() -> List[Dict]:
    """
    Fetch all chatbot records and return only id, name, updated_date, and status.

    Returns:
        List[Dict]: A list of chatbot rows as dictionaries.
    """
    try:
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
    except sqlite3.Error as e:
        return []
    except Exception as e:
        return []


def list_chatbots_all_data() -> List[Dict]:
    """
    Fetch all chatbot records and parse JSON fields.

    Returns:
        List[Dict]: A list of chatbot rows as dictionaries.
    """
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.execute("SELECT * FROM chatbot")
        columns = [column[0] for column in cursor.description]
        chatbots = []

        for row in cursor.fetchall():
            record = dict(zip(columns, row))

            for key in ["dialogue", "ui_json"]:
                if key in record:
                    try:
                        record[key] = json.loads(record[key])
                    except (json.JSONDecodeError, TypeError):
                        record[key] = {}

            chatbots.append(record)

        return chatbots

def delete_chatbot(id: int):
    """
    Delete a chatbot from the database by ID.

    Args:
        id (int): The ID of the chatbot to delete.

    Returns:
        bool: True if deleted successfully, False otherwise.
        str: Error message if failed (optional).
    """
    try:
        with sqlite3.connect(DB_FILE) as conn:
            cursor = conn.execute("DELETE FROM chatbot WHERE id = ?", (id,))
            if cursor.rowcount == 0:
                return False # No chatbot found with given ID
    except sqlite3.Error as e:
        return False # Database error
    except Exception as e:
        return False # Unexpected error

    return True


def update_chatbot(id: int, updates: Dict):
    """
    Update fields of a chatbot entry by ID.

    Args:
        id (int): The chatbot ID.
        updates (Dict): Dictionary of fields to update.
    
    Returns:
        bool: True if updated successfully, False otherwise.
        str: Error message if failed (optional).
    """
    if not updates:
        return False # No updates provided

    updates['last_update_at'] = str(int(time.time()))

    # JSON-encode fields if needed
    if 'dialogue' in updates:
        try:
            updates['dialogue'] = json.dumps(updates['dialogue'])
        except (TypeError, ValueError) as e:
            return False # Failed to encode

    if 'ui_json' in updates:
        try:
            updates['ui_json'] = json.dumps(updates['ui_json'])
        except (TypeError, ValueError) as e:
            return False # Failed to encode 'ui_json'

    fields = ", ".join([f"{key} = ?" for key in updates.keys()])
    values = list(updates.values())

    try:
        with sqlite3.connect(DB_FILE) as conn:
            cursor = conn.execute(f"UPDATE chatbot SET {fields} WHERE id = ?", (*values, id))
            if cursor.rowcount == 0:
                return False  #No chatbot found with given ID
    except sqlite3.Error as e:
        return False # Database error
    except Exception as e:
        return False  # Unexpected error

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
