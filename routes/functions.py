# functions.py

import json, os
from dialogues.dialogues import active_dialogues
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app import http_app
from models.credentials import get_credential,get_credentials_by_names
from elements.app_integration import AppIntegration
from elements.ai_integration import AIIntegration
from fastapi import Query
from models.chatbot import get_chatbot,update_chatbot
from typing import Union
from typing import Optional

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


class TestNodeRequest(BaseModel):
    app_type: str
    credential: str
    operation: str
    content_json: dict
    chatbot_id: int

class TestAINodeRequest(BaseModel):
    chain_type: str
    credentials: list
    data: dict


@http_app.post('/bot/test_node')
async def test_node(payload: Union[TestNodeRequest, TestAINodeRequest]):
    """
    Note that all files that are saved via test node are in ( /chatbot_id/testNode/ )
    """
    try:
        if isinstance(payload, TestNodeRequest):
            credential_obj = get_credential(payload.credential)
            result = AppIntegration(payload.app_type,json.loads(credential_obj['data']),payload.operation,payload.content_json).run_process_for_test_node(payload.chatbot_id,"testNode")

        if isinstance(payload, TestAINodeRequest):
            creds_obj = get_credentials_by_names(payload.credentials)
            result = await AIIntegration(payload.chain_type, creds_obj, payload.data).execute_ai_element()

        return {"output": result}
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})
    

class jiu(BaseModel):
    param: dict



@http_app.post('/bot/activate_bot')
def testing(payload: jiu):
    try:
        cred = payload.param['credentials']
        cred_obj=get_credentials_by_names(cred)
        obj = {
            "credentials":cred_obj,
            "bot":payload.param['bot'],
            "constant_variables":payload.param['constant_variables']
        }
        active_dialogues['khaled']=obj
        return {"Message":"Successfully activated!"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})
    

class ChatbotActivateRequest(BaseModel):
    name: Optional[str] = None
    dialogue: Optional[dict] = None
    ui_json: Optional[dict] = None

@http_app.post('/bot/activate/{chatbot_id}')
def activate_chatbot_view(chatbot_id: int, payload: ChatbotActivateRequest):
    try:
        """
        Activate chatbot
        1- update bot if there is some changes
        2- get credentials values
        3- replace credentials array in dialogue object by real creds values
        4- create json file 
        5- add dialogue to dialogues.py
        6- update db status to be Active
        7- clear testNode folder (file system)
        """

        chatbot_obj, error = update_on_activation(chatbot_id, payload.dict(exclude_unset=True))

        if error:
            return JSONResponse(status_code=400, content={"Error": error})

        cred_obj = get_credentials_by_names(chatbot_obj['dialogue']['credentials'])

        new_dialogue = {
            "credentials": cred_obj,
            "constant_variables": chatbot_obj['dialogue']['constant_variables'],
            "bot": chatbot_obj['dialogue']['bot']
        }
        file_name = chatbot_obj['name']+".json"
        create_json_file = save_json_to_file(new_dialogue,file_name)
        if not create_json_file:
            return JSONResponse(status_code=500, content={"Error": "Fail activating chatbot"})
        
        active_dialogues[str(chatbot_obj['id'])] = new_dialogue

        update_status = update_chatbot(chatbot_id,{"status":"Active"})
        if not update_status:
            return JSONResponse(status_code=500, content={"Error": "Fail activating chatbot"})
        
        clear_testNode_folder(chatbot_id)
        
        return {"Message":"Chatbot is successfully activated"}

    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})
    

@http_app.get('/bot/deactivate')
def deactivate_chatbot_view(chatbot_id: int = Query(None)):
    try:
        """
        Deactivate chatbot
        1- delete json file 
        2- remove dialogue to dialogues.py
        3- update db status to be Inactive
        """
        chatbot_obj = get_chatbot(chatbot_id)

        if not chatbot_obj:
            return JSONResponse(status_code=500, content={"Error": "Chatbot does not exist"})
        
        if chatbot_obj['status'] == "Inactive":
            return JSONResponse(status_code=500, content={"Error": "Chatbot not active"})
        
        file_name = chatbot_obj['name']+".json"
        remove_json_file = delete_json_file(file_name)
        if not remove_json_file:
            return JSONResponse(status_code=500, content={"Error": "Fail deactivating chatbot"})
        del active_dialogues[str(chatbot_obj['id'])]

        update_status = update_chatbot(chatbot_id,{"status":"Inactive"})
        if not update_status:
            return JSONResponse(status_code=500, content={"Error": "Fail deactivating chatbot"})
        
        return {"Message":"Chatbot successfully deactivated"}

    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})



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