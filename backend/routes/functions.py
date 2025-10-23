# functions.py

import json, os
from dialogues.dialogues import active_dialogues
from models.chatbot import get_chatbot,update_chatbot


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


def save_json_to_file(data, filename):
    """
    Save a JSON object (Python dict) to a file.

    Args:
        data (dict): The JSON data to save.
        filename (str): The name of the output file.
    """
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        dialogues_dir = os.path.abspath(os.path.join(current_dir, '..', 'dialogues'))
        os.makedirs(dialogues_dir, exist_ok=True)
        file_path = os.path.join(dialogues_dir, filename)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        return True
    except Exception as e:
        return False

def delete_json_file(filename):
    """
    Delete a JSON file from the dialogues directory.

    Args:
        filename (str): The name of the file to delete.
    """
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        dialogues_dir = os.path.abspath(os.path.join(current_dir, '..', 'dialogues'))
        file_path = os.path.join(dialogues_dir, filename)

        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False  # File doesn't exist
    except Exception as e:
        return False


def clear_testNode_folder(dialogue_id):
    """
    Clears all files and folders inside /temp/{dialogue_id}/testNode/
    """
    current_dir = os.getcwd()
    target_dir = os.path.join(current_dir, "temp", str(dialogue_id), "testNode")

    if os.path.exists(target_dir) and os.path.isdir(target_dir):
        # Remove all files and subdirectories
        for filename in os.listdir(target_dir):
            file_path = os.path.join(target_dir, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)  # delete file or link
            except Exception as e:
                print(f"Failed to delete {file_path}: {e}")
    else:
        print(f"Directory {target_dir} does not exist.")


def update_on_activation(chatbot_id, activation_obj):
    current_chatbot = get_chatbot(chatbot_id)
    if not current_chatbot:
        return None, "Chatbot not found"

    if current_chatbot['status'] == "Active":
        return None, "Chatbot already active"

    updates = {}
    for key, new_value in activation_obj.items():
        if key == "id":
            continue
        old_value = current_chatbot.get(key)
        if isinstance(old_value, (dict, list)) and isinstance(new_value, (dict, list)):
            if old_value != new_value:
                updates[key] = new_value
        else:
            if old_value != new_value:
                updates[key] = new_value

    if updates:
        if not update_chatbot(chatbot_id, updates):
            return None, "Failed to update chatbot"
        # merge updates into current_chatbot so it's fresh
        current_chatbot.update(updates)

    return current_chatbot, None