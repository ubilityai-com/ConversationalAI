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


def create_credential(name: str, data: dict) -> None:
    """
    Insert a new credential into the database.

    Args:
        name (str): The name of the credential.
        data (dict): Credential-specific data.
    """
    created_at = str(int(time.time()))
    with sqlite3.connect(DB_FILE) as conn:
        conn.execute(
            """
            INSERT INTO credentials (name, data, created_at)
            VALUES (?, ?, ?)
            """,
            (name, json.dumps(data), created_at)
        )


def list_credentials() -> List[Dict]:
    """
    Retrieve all credentials.

    Returns:
        List[Dict]: A list of credential entries.
    """
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.execute("SELECT * FROM credentials")
        return [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]


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
