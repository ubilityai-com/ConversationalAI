# functions.py

import json
import os
from dialogues.dialogues import active_dialogues

def load_dialogue(dialogue_id):
    file_path = os.path.join("dialogues", f"{dialogue_id}.json")

    try:
        with open(file_path, "r") as f:
            content = json.load(f)
            active_dialogues[dialogue_id] = content
            return content
    except FileNotFoundError:
        print(f"[ERROR] File {file_path} not found.")
        return None
    except json.JSONDecodeError as e:
        print(f"[ERROR] Failed to decode JSON: {e}")
        return None
