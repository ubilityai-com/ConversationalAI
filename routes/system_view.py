#system_view.py


import json
from dialogues.dialogues import active_dialogues
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app import http_app
from models.credentials import get_credential,get_credentials_by_names
from elements.app_integration import AppIntegration
from elements.ai_integration import AIIntegration
from elements.http_request import HttpRequest
from models.chatbot import get_chatbot,update_chatbot
from typing import Union
from typing import Optional
from routes.functions import *


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

class TestNodeToolsRequest(BaseModel):
    tool_type: str
    data: dict
    chatbot_id: int

@http_app.post('/bot/test_node')
async def test_node(payload: Union[TestNodeRequest, TestAINodeRequest,TestNodeToolsRequest]):
    """
    Note that all files that are saved via test node are in ( /chatbot_id/testNode/ )
    """
    try:
        if isinstance(payload, TestNodeRequest):
            credential_obj = get_credential(payload.credential)
            result = AppIntegration(payload.app_type,json.loads(credential_obj['data']),payload.operation,payload.content_json).run_process(payload.chatbot_id,"testNode",test_node=True)

        if isinstance(payload, TestAINodeRequest):
            creds_obj = get_credentials_by_names(payload.credentials)
            result = await AIIntegration(payload.chain_type, creds_obj, payload.data).execute_ai_element()

        if isinstance(payload,TestNodeToolsRequest):
            if payload.tool_type == "HttpRequest":
                result = await HttpRequest(payload.data).make_request(payload.chatbot_id,"testNode",test_node=True)

        return {"output": result}
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

        # Ensure dialogue is a dict
        if isinstance(chatbot_obj.get("dialogue"), str):
            chatbot_obj["dialogue"] = json.loads(chatbot_obj["dialogue"])

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
    

@http_app.get('/bot/deactivate/{chatbot_id}')
def deactivate_chatbot_view(chatbot_id: int):
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