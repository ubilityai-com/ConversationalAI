# functions.py

import json
import os
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
    

@http_app.get('/bot/activate')
def activate_chatbot_view(chatbot_id: int = Query(None)):
    try:
        """
        Activate chatbot
        1- get dialogue json from db
        2- get credentials values
        3- replace credentials array in dialogue object by real creds values
        4- create json file 
        5- add dialogue to dialogues.py
        6- update db status to be Active
        """
        chatbot_obj = get_chatbot(chatbot_id)

        if not chatbot_obj:
            return JSONResponse(status_code=500, content={"Error": "Chatbot does not exist"})
        
        if chatbot_obj['status'] == "Active":
            return JSONResponse(status_code=500, content={"Error": "Chatbot already active"})

        cred_obj = get_credentials_by_names(chatbot_obj['dialogue']['credentials'])

        new_dialogue = {
            "credentials": cred_obj,
            "bot": chatbot_obj['dialogue']['bot']
        }
        file_name = chatbot_obj['name']+".json"
        create_json_file = save_json_to_file(new_dialogue,file_name)
        if not create_json_file:
            return JSONResponse(status_code=500, content={"Error": "Fail activating chatbot"})
        
        active_dialogues[chatbot_obj['name']] = new_dialogue

        update_status = update_chatbot(chatbot_id,{"status":"Active"})
        if not update_status:
            return JSONResponse(status_code=500, content={"Error": "Fail activating chatbot"})
        
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
        
        del active_dialogues[chatbot_obj['name']]

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

