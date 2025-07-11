"""
credentials.py
--------------
Database operations for managing credential entries in SQLite.
"""

import sqlite3
import json
import time
from typing import List, Dict
from app import DB_FILE


def create_credential(name: str,type: str, data: dict) -> None:
    """
    Insert a new credential into the database.

    Args:
        name (str): The name of the credential.
        data (dict): Credential-specific data.
        type (str): App type of this cred.
    """
    created_at = str(int(time.time()))
    with sqlite3.connect(DB_FILE) as conn:
        conn.execute(
            """
            INSERT INTO credentials (name,type, data, created_at)
            VALUES (?, ?,?, ?)
            """,
            (name, type,json.dumps(data), created_at)
        )


def list_credentials() -> List[Dict]:
    """
    Retrieve all credentials, parsing the JSON data field.

    Returns:
        List[Dict]: A list of credential entries with parsed data.
    """
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.execute("SELECT * FROM credentials")
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]

        credentials = []
        for row in rows:
            entry = dict(zip(columns, row))
            try:
                entry["data"] = json.loads(entry["data"])
            except (json.JSONDecodeError, TypeError):
                entry["data"] = {}  # Fallback to empty dict on error
            credentials.append(entry)

        return credentials


def delete_credential(id: int) -> None:
    """
    Delete a credential by ID.

    Args:
        id (int): The credential ID to delete.
    """
    with sqlite3.connect(DB_FILE) as conn:
        conn.execute("DELETE FROM credentials WHERE id = ?", (id,))


def get_credential(identifier) -> Dict:
    """
    Retrieve a credential by ID (int) or name (str).

    Args:
        identifier (int | str): The credential ID or name.

    Returns:
        Dict: The credential entry, or None if not found.
    """
    with sqlite3.connect(DB_FILE) as conn:
        if isinstance(identifier, int):
            cursor = conn.execute("SELECT * FROM credentials WHERE id = ?", (identifier,))
        else:
            cursor = conn.execute("SELECT * FROM credentials WHERE name = ?", (identifier,))
        row = cursor.fetchone()
        return dict(zip([column[0] for column in cursor.description], row)) if row else None


def get_credentials_by_names(names: List[str]) -> Dict[str, dict]:
    """
    Retrieve multiple credentials by their names.

    Args:
        names (List[str]): A list of credential names.

    Returns:
        Dict[str, dict]: A dictionary mapping each name to its credential data.
    """
    if not names:
        return {}
    
    placeholders = ','.join(['?'] * len(names))
    query = f"SELECT name, data FROM credentials WHERE name IN ({placeholders})"
    
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.execute(query, names)
        rows = cursor.fetchall()
        return {name: json.loads(data) for name, data in rows}
