# functions.py

import json
import os
from dialogues.dialogues import active_dialogues
from fastapi import HTTPException
from pydantic import BaseModel
from app import http_app
from models.credentials import get_credential,get_credentials_by_names
from elements.app_integration import AppIntegration

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


@http_app.post('/test_node')
def test_node(payload: TestNodeRequest):
    try:
        credential_obj = get_credential(payload.credential)
        result = AppIntegration(payload.app_type,json.loads(credential_obj['data']),payload.operation,payload.content_json).run_process()
        return {"output": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error test node: {str(e)}")
    

class jiu(BaseModel):
    param: dict



@http_app.post('/activate_bot')
def testing(payload: jiu):
    try:
        cred = payload.param['flow']['credentials']
        cred_obj=get_credentials_by_names(cred)
        obj = {
            "credentials":cred_obj,
            "bot":payload.param['flow']['bot']
        }
        active_dialogues['khaled']=obj
        print(obj)
        return {"Message":"Successfully activated!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error : {str(e)}")