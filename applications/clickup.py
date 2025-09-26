import aiohttp
import json
import os,sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import normalize_params

async def extract_credentials(creds):
    """
    extract and verify access token from credentials
    
    :param json creds: (json, required) Used for authentication.
    
    :return: access token string
    :rtype: str
    """
    credentials=json.loads(creds)
    if 'accessToken' in credentials and 'clientID' in credentials:
        return f"Bearer {credentials['accessToken']}"
    elif 'accessToken' in credentials:
        return credentials['accessToken']
    else:
        raise Exception("Missing Access Token")



# to obtain access token : #avatar icon -> settings -> apps
######################## CHECKLIST ###################################################
async def clickup_create_checklist(json_cred, params, **kwargs):
    """
    Add a new checklist to a task.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added to the created checklist
    
        - :task_id: (str, Required) the task to which the checklist belongs
        - :name: (str,Required) the name of the checklist 
        - :custom_task_ids: (bool) If you want to reference a task by it's custom task id, this value must be true.
        - :team_id: (double) Only used when the custom_task_ids parameter is set to true.

    :return: Details about the created checklist
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        required_params=['name','task_id']
        if all(param in params for param in required_params):
            query = {} # the fields custom_task_id & team_id should be passed separately in the params key in the request 
            if 'custom_task_ids' in params:
                query['custom_task_ids']=params['custom_task_ids'] 
            if 'team_id' in params: # the id of a Workspace
                query['team_id']=params['team_id']
            payload={}
            payload={
                "name":params['name']
            }
            url =f"https://api.clickup.com/api/v2/task/{params['task_id']}/checklist" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            query = normalize_params(query)
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, json=payload, headers=headers, params=query) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def clickup_update_checklist(json_cred, params, **kwargs):
    """
    Rename a task checklist, or reorder a checklist so it appears above or below other checklists on a task.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added(or modified) to the  checklist
    
        - :checklist_id: (str,Required) the id of the checklist that is to be updated
        - :name: (str) The name of the checklist 
        - :position: (integer <int32>) Position refers to the order of appearance of checklists on a task.

    :return: Details about the updated checklist
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'checklist_id' in params:
            url = f"https://api.clickup.com/api/v2/checklist/{params['checklist_id']}"
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            new_checklist={}
            for key,value in params.items():
                if "checklist_id" in key:
                    continue
                new_checklist[key]=value 
            
            async with aiohttp.ClientSession() as session:
                async with session.put(url=url, json=new_checklist, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def clickup_delete_checklist(json_cred, params, **kwargs):
    """
    Delete a checklist from a task.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains the id of the checklist to be deleted
    
        - :checklist_id: (str,Required) the id of the checklist that is to be deleted

    :return: Details about the deleted checklist
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'checklist_id' in params:
            url = f"https://api.clickup.com/api/v2/checklist/{params['checklist_id']}"
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    if response.status == 200:
                        return {"Message": f"checklist of id {params['checklist_id']} deleted successfully"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


###################################### Checklist Item ########################################


async def clickup_create_checklist_item(json_cred, params, **kwargs):
    """
    Add a line item to a task checklist.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added to the created checklist item

        - :checklist_id: (str, Required) the checklist id in which you will insert the checklist item
        - :name: (str) the name of the checklist item
        - :assignee: (int) integer <int32>

    :return: Details about the created checklist item
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        required_params=['checklist_id','name']
        if all(param in params for param in required_params):
            url =f"https://api.clickup.com/api/v2/checklist/{params['checklist_id']}/checklist_item" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            item={}
            for key,value in params.items():
                if 'checklist_id' in key:
                    continue
                item[key]=value
            
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, json=item, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def clickup_update_checklist_item(json_cred, params, **kwargs):
    """
    Update an individual line item in a task checklist.
    
    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added(or modified) to the  checklist item
    
        - :checklist_id: (str,Required) the id of the checklist that the item belongs to 
        - :checklist_item_id: (str,REQUIRED) The id of the checklist item to be updated
        - :name: (str) the new name of the checklist item
        - :assignee: (str) can be a string or null
        - :resolved: (bool) possible values: True , False
        - :parent: (str) To nest a checklist item under another checklist item, include the other item's checklist_item_id.

    :return: Details about the updated checklist item.
    :rtype: dict
    """
    try: 
        token = await extract_credentials(json_cred) 
        required_params=['checklist_id','checklist_item_id']
        if all(param in params for param in required_params):
            url = f"https://api.clickup.com/api/v2/checklist/{params['checklist_id']}/checklist_item/{params['checklist_item_id']}"
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            new_checklist_item={}
            for key,value in params.items():
                keys_to_skip=['checklist_id','checklist_item_id']
                if key in keys_to_skip:
                    continue
                new_checklist_item[key]=value 
            
            async with aiohttp.ClientSession() as session:
                async with session.put(url=url, json=new_checklist_item, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def clickup_delete_checklist_item(json_cred, params, **kwargs):
    """
    Delete a line item from a task checklist.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains the id of the checklist item to be deleted
    
        - :checklist_id: (str,Required) the id of the checklist that the item belongs to 
        - :checklist_item_id: (str,REQUIRED) The id of the checklist item to be deleted

    :return: Details about the deleted checklist item
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        required_params=['checklist_id','checklist_item_id']
        if all(param in params for param in required_params):
            url = f"https://api.clickup.com/api/v2/checklist/{params['checklist_id']}/checklist_item/{params['checklist_item_id']}"
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    if response.status == 200:
                        return {"Message": f"checklist item of id {params['checklist_item_id']} deleted successfully"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

######### FOLDER #####################################################
async def clickup_create_folder(json_cred, params, **kwargs):
    """
    Add a new Folder to a Space.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added to the created folder
    
        - :space_id: (double, Required) number <double>
        - :name: (str,Required) the name of the folder
    
    :return: Details about the created folder
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        required_params=['name','space_id'] #Spaces  is where arrange your different workflows or types of work.
        if all(param in params for param in required_params):
            folder={}
            folder={
                "name":params['name']
            }
            url =f"https://api.clickup.com/api/v2/space/{params['space_id']}/folder" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, json=folder, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    

async def clickup_update_folder(json_cred, params, **kwargs):
    """
    Rename a task folder, or reorder a folder so it appears above or below other folders on a task.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added(or modified) to the  folder
    
        - :folder_id: (double,REQUIRED) the id of the folder that is to be updated
        - :name: (str,REQUIRED) The name of the folder 

    :return: Details about the updated folder
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        required_params=['name','folder_id']
        if all(param in params for param in required_params):
            url = f"https://api.clickup.com/api/v2/folder/{params['folder_id']}"
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            new_folder={}
            for key,value in params.items():
                if "folder_id" in key:
                    continue
                new_folder[key]=value 
            
            async with aiohttp.ClientSession() as session:
                async with session.put(url=url, json=new_folder, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_get_folder(json_cred, params, **kwargs):
    """
    View the Lists within a Folder.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains id of the folder to be retrieved
    
        - :folder_id: (str,REQUIRED) the id of the folder that is to be retrieved

    :return: Details about the retrieved folder
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'folder_id' in params:
            url = f"https://api.clickup.com/api/v2/folder/{params['folder_id']}"
            headers = {'Authorization': token}
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_get_many_folders(json_cred, params, **kwargs):
    """
    View the Folders in a Space.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains parameters that can be passed to the request
    
        - :space_id: (str,REQUIRED) the space to which the folders belong
        - :archived: (bool) possible values: True or False

    :return: Details about the retrieved folders
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'space_id' in params:
            url = f"https://api.clickup.com/api/v2/space/{params['space_id']}/folder"
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            async with aiohttp.ClientSession() as session:
                if 'archived' in params.items():
                    query={}
                    query['archived']=params['archived']
                    query = normalize_params(query)
                    async with session.get(url=url, headers=headers,params=query) as response:
                        if response.status == 200:
                            return await response.json()
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
                else:
                    async with session.get(url=url, headers=headers) as response:
                        if response.status == 200:
                            return await response.json()
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_delete_folder(json_cred, params, **kwargs):
    """
    Delete a Folder from your Workspace.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains id of the folder to be deleted
    
        - :folder_id: (str,REQUIRED) the id of the folder that is to be deleted

    :return: Details about the deleted folder
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'folder_id' in params:
            url = f"https://api.clickup.com/api/v2/folder/{params['folder_id']}"
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, headers=headers) as response:
                    if response.status == 200:
                        return {"Message": f"Folder of Id {params['folder_id']} successfully deleted"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
################## LIST #####################################################   
    
async def clickup_create_list(json_cred, params, **kwargs):
    """
    Add a new List to a Folder.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added to the created list
    
        - :folder_id: (double, Required) number <double>
        - :name: (str,Required) the name of the list 
        - :content: (str) the content of the list
        - :due_date: (str) integer <int64>
        - :due_date_time: (boolean) possible values: True or False
        - :priority: int) integer <int32>
        - :assignee: (str) Include a user_id to assign this List.
        - :status: (str) Status refers to the List color rather than the task Statuses available in the List.

    :return: Details about the created list
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        required_params=['name','folder_id']
        if all(param in params for param in required_params):
            list={}
            for key,value in params.items():
                if "folder_id" in key:
                    continue
                list[key]=value 
            url =f"https://api.clickup.com/api/v2/folder/{params['folder_id']}/list" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, json=list, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def clickup_update_list(json_cred, params, **kwargs):
    """
    Rename a List, update the List Info description, set a due date/time, set the List's priority, set an assignee, set or remove the List color.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added(or modified) to the updated list
    
        - :list_id: (str,Required) the id of the list 
        - :name: (str) the name of the list 
        - :content: (str) the content of the list
        - :due_date: (str) integer <int64>
        - :due_date_time: (boolean) possible values: True or False
        - :priority: (int) integer <int32>
        - :assignee: (str) Include a user_id to assign this List.
        - :status: (str) Status refers to the List color rather than the task Statuses available in the List.

    :return: Details about the updated list
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'list_id' in params:
            list={}
            for key,value in params.items():
                if 'list_id' in key:
                    continue
                list[key]=value 
            url =f"https://api.clickup.com/api/v2/list/{params['list_id']}" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.put(url=url, json=list, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_get_list(json_cred, params, **kwargs):
    """
    View information about a List.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains id of the list to be retrieved
    
        - :list_id: (number <double>,REQUIRED)  the id of the list to be retrieved

    :return: Details about the retrieved list
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'list_id' in params:
            url =f"https://api.clickup.com/api/v2/list/{params['list_id']}" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_get_many_lists(json_cred, params, **kwargs):
    """
    View the Lists within a Folder.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains parameters that can be passed to the request
    
        - :folder_id: (str,REQUIRED) the folder to which the lists belong
        - :archived: (bool) possible values: True or False

    :return: Details about the retrieved lists
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'folder_id' in params:
            url = f"https://api.clickup.com/api/v2/folder/{params['folder_id']}/list"
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                if 'archived' in params:
                    query={}
                    query['archived']=params['archived']
                    query = normalize_params(query)
                    async with session.get(url=url, headers=headers,params=query) as response:
                        if response.status == 200:
                            return await response.json()
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
                else:
                    async with session.get(url=url, headers=headers) as response:
                        if response.status == 200:
                            return await response.json()
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_delete_list(json_cred, params, **kwargs):
    """
    View information about a List.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains id of the list to be deleted
    
        - :list_id: (number <double>,REQUIRED)  the id of the list to be deleted

    :return: Details about the deleted list
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'list_id' in params:
            url =f"https://api.clickup.com/api/v2/list/{params['list_id']}" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, headers=headers) as response:
                    if response.status == 200:
                        return {"Message": f"list of id {params['list_id']}  successfully deleted"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_get_list_members(json_cred, params, **kwargs):
    """
    View the people who have access to a List.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains parameters that can be passed to the request
    
        - :list_id: (str,REQUIRED) the id of the list to which the members belong

    :return: Details about the retrieved members that belong to the list
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'list_id' in params:
            url = f"https://api.clickup.com/api/v2/list/{params['list_id']}/member"
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

############ TASKS #########################################
async def clickup_create_task(json_cred, params, **kwargs):
    """
    Create a new task.

    :creds: (json, required) Used for authentication.
    :params: (dict, required) contains properties to be added to the created task
    
    - :list_id: (double, Required) number <double>
    - :name: (str,Required) the name of the task 
    - :custom_task_ids: (bool) If you want to reference a task by it's custom task id, this value must be true.
    - :team_id: (double) Only used when the custom_task_ids parameter is set to true.
    - :description: (str) description of the task
    - :assignees: (Array of integers) integer <int32>
    - :tags: (Array of strings) Include a user_id to assign this List.
    - :status: (str) Possible values : to do, complete
    - :priority: (int) integer or null <int32>
    - :due_date: (int) integer <int64>
    - :due_date_time: (boolean) True or False
    - :time_estimate: (int) integer <int32>
    - :start_date: (int) integer <int64>
    - :start_date_time: (boolean) True or False
    - :notify_all: (bool) If notify_all is true, notifications will be sent to everyone including the creator of the comment.
    - :parent: (str) You can create a subtask by including an existing task ID.
    - :links_to: (str) Include a task ID to create a linked dependency with your new task.
    - :check_required_custom_fields: (bool) When creating a task via API any required Custom Fields
    
        are ignored by default (false).
    
    - :custom_item_id: (number) To create a task that doesn't use a custom task type, either don't include this field in the request body, or send 'null'.

    :return: Details about the created task
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        required_params=['name','list_id']
        if all(param in params for param in required_params):
            task={}
            ignore_keys = ["list_id", "team_id", "custom_task_ids"]
            for key,value in params.items():
                if key in ignore_keys:
                    continue
                task[key]=value 
            query = {}
            if "custom_task_ids" in params:
                query["custom_task_ids"] = params["custom_task_ids"]
            if "team_id" in params:
                query["team_id"] = params["team_id"]
            url =f"https://api.clickup.com/api/v2/list/{params['list_id']}/task" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            query = normalize_params(query)
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, json=task, headers=headers, params=query) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_update_task(json_cred, params, **kwargs):
    """
    Update a task by including one or more fields in the request body.

    :creds: (json, required) Used for authentication.
    :params: (dict, required) contains properties to be added to the updated task
    
    - :task_id: (double, Required) number <double>
    - :name: (str) the name of the task 
    - :custom_task_ids: (bool) If you want to reference a task by it's custom task id, this value must be true.
    - :team_id: (double) Only used when the custom_task_ids parameter is set to true.
    - :description: (boolean) possible values: True or False
    - :assignees: (Array of integers) integer <int32>
    - :tags: (Array of strings) Include a user_id to assign this List.
    - :status: (str) Possible values : open,
    - :priority: (int) integer or null <int32>
    - :due_date: (int) integer <int64>
    - :due_date_time: (boolean) True or False
    - :time_estimate: (int) integer <int32>
    - :start_date: (int) integer <int64>
    - :start_date_time: (boolean) True or False
    - :notify_all: (bool) If notify_all is true, notifications will be sent to everyone including the creator of the comment.
    - :parent: (str) You can update a subtask by including an existing task ID.
    - :links_to: (str) Include a task ID to update a linked dependency with your new task.
    - :check_required_custom_fields: (bool) When creating a task via API any required Custom Fields
    
        are ignored by default (false).
    
    - :custom_item_id: (number) To update a task that doesn't use a custom task type, either don't include this field in the request body, or send 'null'.

    :return: Details about the updated task
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if "task_id" in params:
            task={}
            ignore_keys = ["task_id", "team_id", "custom_task_ids"]
            for key,value in params.items():
                if key in ignore_keys:
                    continue
                task[key]=value 
            query = {}
            if "custom_task_ids" in params:
                query["custom_task_ids"] = params["custom_task_ids"]
            if "team_id" in params:
                query["team_id"] = params["team_id"]
            url = f"https://api.clickup.com/api/v2/task/{params['task_id']}" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            query = normalize_params(query)
            async with aiohttp.ClientSession() as session:
                async with session.put(url=url, json=task, headers=headers, params=query) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def clickup_get_task(json_cred, params, **kwargs):
    """
    View information about a task. You can only view task information of tasks you can access

    :creds: (json, required) Used for authentication.
    :params: (dict, required) contains properties to be returned in the task
    
    - :task_id: (double, Required) number <double> the id of the task to be returned
    - :custom_task_ids: (bool) If you want to reference a task by it's custom task id, this value must be true.
    - :team_id: (double) Only used when the custom_task_ids parameter is set to true.
    - :include_subtasks: (boolean) Include subtasks, default false
    - :include_markdown_description: (boolean) To return task descriptions in Markdown format, 
    
        use ?include_markdown_description=true.
    
    
    :return: Details about the retrieved task
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if "task_id" in params:
            query={}
            for key,value in params.items():
                if "task_id" in key:
                    continue
                query[key]=value 
            url =f"https://api.clickup.com/api/v2/task/{params['task_id']}" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            query = normalize_params(query)
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url,headers=headers,params=query) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    

async def clickup_get_many_tasks(json_cred, params, **kwargs):
    """
    View the tasks in a List. Responses are limited to 100 tasks per page. You can only view task information of tasks you can access.

    :creds: (json, required) Used for authentication.
    :params: (dict, required) contains properties to be returned in the task
    
    - :list_id: (double, Required) the id of the list to which the tasks belong
    - :archived: (boolean)
    - :include_markdown_description: (boolean) To return task descriptions in Markdown format,
    
        use ?include_markdown_description=true.
    
    - :page: (integer <int32>) Page to fetch (starts at 0).
    - :order_by: (string) Order by a particular field.Options include: id, created, updated, and due_date.
    - :reverse: (boolean) Tasks are displayed in reverse order.
    - :subtasks: (boolean) Include or exclude subtasks. By default, subtasks are excluded.
    - :statuses: (Array of strings) Filter by statuses. To include closed tasks, use the include_closed parameter.
    - :include_closed: (boolean) Include or excluse closed tasks. By default, they are excluded.
    - :assignees: (Array of strings) Filter by Assignees. For example: ?assignees[]=1234&assignees[]=5678
    - :tags: (Array of strings) Filter by tags. For example: ?tags[]=tag1&tags[]=this%20tag
    - :due_date_gt:	(integer <int32>) Filter by due date greater than Unix time in milliseconds.
    - :due_date_lt: (integer <int32>) Filter by due date less than Unix time in milliseconds.
    - :date_created_gt: (integer <int32>) Filter by date created greater than Unix time in milliseconds.
    - :date_created_lt: (integer <int32>) Filter by date created less than Unix time in milliseconds.
    - :date_updated_gt: (integer <int32>) Filter by date updated greater than Unix time in milliseconds.
    - :date_updated_lt: (integer <int32>) Filter by date updated less than Unix time in milliseconds.
    - :date_done_gt: (integer <int32>) Filter by date done greater than Unix time in milliseconds.
    - :date_done_lt: (integer <int32>) Filter by date done less than Unix time in milliseconds.
    
    :return: Details about the retrieved tasks
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if "list_id" in params:
            query={}
            for key,value in params.items():
                if "list_id" in key:
                    continue
                query[key]=value 
            url =f"https://api.clickup.com/api/v2/list/{params['list_id']}/task" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            query = normalize_params(query)
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url,headers=headers,params=query) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_delete_task(json_cred, params, **kwargs):
    """
    Delete a task from your Workspace.
    
    :param json creds: (json, required) Used for authentication.
    :param dict params: contains id of the task to be deleted
    
        - :task_id: (double, Required) number <double> the id of the task to be deleted
    
    :return: Details about the deleted task
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if "task_id" in params:
            url =f"https://api.clickup.com/api/v2/task/{params['task_id']}" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url,headers=headers) as response:
                    if response.status == 200 or response.status == 204:
                        return {"Message": f"Task successfully deleted"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_get_task_members(json_cred, params, **kwargs):
    """
    View the people who have access to a task.
    
    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be returned 
    
        - :task_id: (double, Required) the id of the task to which the members belong
    
    :return: Details about the retrieved members
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if "task_id" in params:
            url =f"https://api.clickup.com/api/v2/task/{params['task_id']}/member" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url,headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def clickup_create_task_dependency(json_cred, params, **kwargs):
    """
    Set a task as waiting on or blocking another task.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added to the created task dependency

        - :task_id: (string, Required) This is the task which is waiting on or blocking another task.
        - :depends_on: (str) Use the depends_on parameter in the request body to specify the task that must be completed before the task in the path parameter. Required if depedency_of is null
        - :depedency_of: (str) Use the dependency_of parameter in the request body to specify the task that's waiting for the task in the path parameter to be completed. Required if depends_on is null
        - :custom_task_ids: (bool) If you want to reference a task by it's custom task id, this value must be true.
        - :team_id: (number,Double) Only used when the custom_task_ids parameter is set to true.
        
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if "task_id" in params and ("depends_on" in params or "dependency_of" in params):
            dependency = {}
            ignore_keys = ["task_id", "custom_task_ids", "team_id"]
            for key,value in params.items():
                if key in ignore_keys:
                    continue
                else:
                    dependency[key]=value
            query = {}
            if "custom_task_ids" in params:
                query["custom_task_ids"] = params["custom_task_ids"]
            if "team_id" in params:
                query["team_id"] = params["team_id"]
            url =f"https://api.clickup.com/api/v2/task/{params['task_id']}/dependency" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            query = normalize_params(query)
            async with aiohttp.ClientSession() as session:
                async with session.post(url, json=dependency, headers=headers, params=query) as response:
                    if response.status == 200:
                        return {"Message": "dependency successfully created"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_delete_task_dependency(json_cred, params, **kwargs):
    """
    Remove the dependency relationship between two or more tasks.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added to the created task dependency

        - :task_id: (string, Required) The task to which the dependency is assigned
        - :depends_on: (str) Use the depends_on parameter in the request body to specify the task that must be completed before the task in the path parameter. Required if depedency_of is null
        - :depedency_of: (str) Use the dependency_of parameter in the request body to specify the task that's waiting for the task in the path parameter to be completed. Required if depends_on is null
        - :custom_task_ids: (bool) If you want to reference a task by it's custom task id, this value must be true.
        - :team_id: (number,Double) Only used when the custom_task_ids parameter is set to true.
    
    :rtype: dict
    """
    try: 
        token = await extract_credentials(json_cred)
        if "task_id" in params and ("depends_on" in params or "dependency_of" in params):
            query = {}
            for key,value in params.items():
                if "task_id" in key:
                    continue
                else:
                    query[key]=value
            url =f"https://api.clickup.com/api/v2/task/{params['task_id']}/dependency"
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            query = normalize_params(query)
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers, params=query) as response:
                    if response.status == 200:
                        return {"Message": "dependency successfully deleted"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

################ TIME ENTRY ###########################################
async def clickup_get_timeentry(json_cred, params, **kwargs):
    """
    View a single time entry.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties needed to retrieve the time entry
    
        - :team_id: (double, Required) number <double>
        - :timer_id: (number <double>,Required) the id of the time entry
        
    :return: Details about the retrieved time entry
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        required_params=['team_id','timer_id']
        if all(param in params for param in required_params):
            url =f"https://api.clickup.com/api/v2/team/{params['team_id']}/time_entries/{params['timer_id']}" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url,headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def clickup_delete_timeentry(json_cred, params, **kwargs):
    """
    Delete a time entry from a Workspace.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties needed to delete the time entry
    
        - :team_id: (double, Required) number <double>
        - :timer_id: (number <double>,Required) the id of the time entry
        
    :return: Details about the deleted time entry
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        required_params=['team_id','timer_id']
        if all(param in params for param in required_params):
            url =f"https://api.clickup.com/api/v2/team/{params['team_id']}/time_entries/{params['timer_id']}" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url,headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    

async def clickup_start_timeentry(json_cred, params, **kwargs):
    """
    Start a timer for the authenticated user..

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added to the start time entry
    
        - :team_ID: (double, Required) number <double>
        - :tid:(string, Required) task Id
        - :custom_task_ids: (boolean) possible values : True or False
        - :team_id: (double) number <double>
        - :description: (str) Simple description of the time entry
        - :billable: (bool) possible values : True or False
    
    :return: Details about the  time entry
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'team_ID' in params:
            entry = {}
            ignore_keys = ["team_ID", "custom_task_ids", "team_id"]
            for key,value in params.items():
                if key in ignore_keys:
                    continue
                else:
                    entry[key]=value
            query = {}
            if "custom_task_ids" in params:
                query["custom_task_ids"] = params["custom_task_ids"]
            if "team_id" in params:
                query["team_id"] = params["team_id"]
            url =f"https://api.clickup.com/api/v2/team/{params['team_ID']}/time_entries/start" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            query = normalize_params(query)
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, json=entry, headers=headers, params=query) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    


async def clickup_stop_timeentry(json_cred, params, **kwargs):
    """
    Stop a timer that's currently running for the authenticated user.

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains properties to be added to the created time entry
    
        - :team_id: (double, Required) number <double>
        
    :return: Details about the created time entry
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'team_id' in params:
            url =f"https://api.clickup.com/api/v2/team/{params['team_id']}/time_entries/stop" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url,headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def clickup_get_many_timeentries(json_cred, params, **kwargs):
    """
    Returns a list of the created time entries

    :param json creds: (json, required) Used for authentication.
    :param dict params: contains the id of the team to which the time entries belong
    
        - :team_id: (double, Required) number <double>
        - :start_date: (double) number <double>
        - :end_date: (double) number <double>
        
    :return: Details about the  time entries
    :rtype: dict
    """
    try:
        token = await extract_credentials(json_cred)
        if 'team_id' in params:
            query={}
            for key,value in params.items():
                if "team_id" in key:
                    continue
                query[key]=value 
            url =f"https://api.clickup.com/api/v2/team/{params['team_id']}/time_entries" 
            headers = {'Authorization': token, 'Content-Type': 'application/json'}
            query = normalize_params(query)
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, params=query) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data") 
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



operations = {
    'Create Checklist':clickup_create_checklist,
    'Update Checklist':clickup_update_checklist,
    'Delete Checklist':clickup_delete_checklist,
    'Create Checklist Item':clickup_create_checklist_item,
    'Update Checklist Item':clickup_update_checklist_item,
    'Delete Checklist Item':clickup_delete_checklist_item,
    'Create Folder':clickup_create_folder,
    'Update Folder':clickup_update_folder,
    'Get Folder':clickup_get_folder,
    'Get Many Folders':clickup_get_many_folders,
    'Delete Folder':clickup_delete_folder,
    'Create List':clickup_create_list,
    'Update List':clickup_update_list,
    'Get List':clickup_get_list,
    'Get Many Lists':clickup_get_many_lists,
    'Delete List':clickup_delete_list,
    'Get List Members':clickup_get_list_members,
    'Create Task':clickup_create_task,
    'Get Task':clickup_get_task,
    'Get Many Tasks':clickup_get_many_tasks,
    'Get Task Members':clickup_get_task_members,
    'Update Task':clickup_update_task,
    'Delete Task':clickup_delete_task,
    'Create Task Dependency':clickup_create_task_dependency,
    'Delete Task Dependency':clickup_delete_task_dependency,
    'Get Time Entry':clickup_get_timeentry,
    'Delete Time Entry':clickup_delete_timeentry,
    'Get Many Time Entries':clickup_get_many_timeentries,
    'Start Time Entry':clickup_start_timeentry,
    'Stop Time Entry':clickup_stop_timeentry
}