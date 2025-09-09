import json,aiohttp

status = [200, 201, 202, 204, 206, 207, 208]


async def notion_get_many_users(creds, params, **kwargs):
    """
        Returns a specific number of users

    :param str integration_token: (str,required) Once the integration is created, you can update its settings as needed under the Capabilities tab and retrieve the integration token under Secrets.
    :param dict params: (optional) contains the number of users to be returned

      :page_size: (int) The number of items from the full list to include in the response.

    :return: The list of  'page_size' number of users
    :rtype: dict
    """
    cred = json.loads(creds)
    if "page_size" in params:
        limit = params["page_size"]
        url = f"https://api.notion.com/v1/users?page_size={limit}"
    else:
        url = f"https://api.notion.com/v1/users"
    headers = {
        "Authorization": f"Bearer {cred['accessToken']}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
    }
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result}

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def notion_get_user(creds, params, **kwargs):
    """
        Returns a user of a specific id.

    :param str integration_token: (required) Once the integration is created, you can update its settings as needed under the Capabilities tab and retrieve the integration token under Secrets.
    :param dict params:

      :user_id: (str,required) The id of the user to be retrieved
    :return: details about the retrieved user(id,properties,..)
    :rtype: dict
    """
    try:
        cred = json.loads(creds)
        if "user_id" in params:
            url = f"https://api.notion.com/v1/users/{params['user_id']}"
            headers = {
                "Authorization": f"Bearer {cred['accessToken']}",
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        return result
                    return {"Error": result}
        else:
            raise Exception("missing user id")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def notion_get_database(creds, params, **kwargs):
    """
        Returns a database of a specific id.

    :param str integration_token: (required) Once the integration is created, you can update its settings as needed under the Capabilities tab and retrieve the integration token under Secrets.
    :param dict params:

      :id: (str,required) The id of the database to be retrieved
    :return: details about the retrieved database(id,properties,..)
    :rtype: dict
    """
    try:
        cred = json.loads(creds)
        if "database_id" in params:
            url = f"https://api.notion.com/v1/databases/{params['database_id']}"
            headers = {
                "Authorization": f"Bearer {cred['accessToken']}",
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        return result
                    return {"Error": result}
        else:
            raise Exception("missing database id")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def notion_get_many_databases(creds, params, **kwargs):
    """
        Returns a specific number of databases

    :param str integration_token: (str,required) Once the integration is created, you can update its settings as needed under the Capabilities tab and retrieve the integration token under Secrets.
    :param dict params: (optional) contains the number of databases to be returned

      :page_size: (int) The number of items from the full list to include in the response.
    :return: The list of  'page_size' number of databases
    :rtype: dict
    """
    cred = json.loads(creds)
    if "page_size" in params:
        limit = params["page_size"]
        url = f"https://api.notion.com/v1/databases?page_size={limit}"
    else:
        url = f"https://api.notion.com/v1/databases"
    headers = {
        "Authorization": f"Bearer {cred['accessToken']}",
        "Notion-Version": "2021-05-13",
        "Content-Type": "application/json",
    }
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result}
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def notion_create_page(creds, params, **kwargs):
    """
        Creates a page with properties passed in the parameters

    :param str integration_token: (required) Once the integration is created, you can update its settings as needed under the Capabilities tab and retrieve the integration token under Secrets.
    :param dict params: contains specific properties to be added to the user.

      :parent: (dict,required) type(value should be page_id),page_id (str) id of the parent page
      :properties: title(arr): contains 'text'(dict),and annotations like (color,code,italic..)
    :return: details about the created page
    :rtype: dict
    :Examples:
    >>> params = {
        "parent": {
        "type": "page_id",
        "page_id": ""},
      "properties": {
        "title": [
            {
                "type": "text",
                "text": {
                    "content": "",
                    "link": "},
                  "annotations":{
                  "bold":True,
                  "italic":True,
                  "strikethrough":True,
                  "underline":True,
                  "code":False,
                  "color":"green"},
               "plain_text":"My New Page",
               "href":""
           }, ],},
     }
    """
    try:
        cred = json.loads(creds)
        if "parent" in params and "properties" in params:
            notion_api_url = "https://api.notion.com/v1/pages"
            headers = {
                "Authorization": f"Bearer {cred['accessToken']}",
                "Content-Type": "application/json",
                "Notion-Version": "2021-05-13",
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(notion_api_url, headers=headers, json=params) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        return result
                    return {"Error": result}
        else:
            raise Exception("missing required parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def notion_get_page(creds, params, **kwargs):
    """
        Returns a page of a specific id.

    :param str integration_token: (required) Once the integration is created, you can update its settings as needed under the Capabilities tab and retrieve the integration token under Secrets.
    :param dict params:

      :page_id: (str,required) The id of the page to be retrieved
    :return: details about the retrieved page(id,properties,..)
    :rtype: dict
    """
    try:
        cred = json.loads(creds)
        if "page_id" in params:
            url = f"https://api.notion.com/v1/pages/{params['page_id']}"
            headers = {
                "Authorization": f"Bearer {cred['accessToken']}",
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json"
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        return result
                    return {"Error": result}
        else:
            raise Exception("missing page id")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def notion_archive_page(creds, params, **kwargs):
    """
        Used to archive a page of a specific id.

    :param str integration_token: (required) Once the integration is created, you can update its settings as needed under the Capabilities tab and retrieve the integration token under Secrets.
    :param dict params:

      :page_id: (str,required) The id of the page to be retrieved
      :archived: (bool,required) value can be True or False
    :return: details about the archived page(id,properties,..)
    :rtype: dict
    """
    try:
        cred = json.loads(creds)
        if "page_id" in params and "archived" in params:
            notion_api_url = f"https://api.notion.com/v1/pages/{params['page_id']}"
            headers = {
                "Authorization": f"Bearer {cred['accessToken']}",
                "Content-Type": "application/json",
                "Notion-Version": "2021-05-13",
            }
            to_archive = {}
            to_archive["archived"] = params["archived"]
            async with aiohttp.ClientSession() as session:
                async with session.patch(notion_api_url, headers=headers, json=to_archive) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        return result
                    return {"Error": result}
        else:
            raise Exception("missing page id")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def notion_get_block(creds, params, **kwargs):
    """
        Returns a block of a specific id.

    :param str integration_token: (required) Once the integration is created, you can update its settings as needed under the Capabilities tab and retrieve the integration token under Secrets.
    :param dict params:

      :block_id: (str,required) The id of the block to be retrieved
    :return: details about the retrieved block(id,properties,..)
    :rtype: dict
    """
    try:
        cred = json.loads(creds)
        if "block_id" in params:
            url = f"https://api.notion.com/v1/blocks/{params['block_id']}"
            headers = {
                "Authorization": f"Bearer {cred['accessToken']}",
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        return result
                    return {"Error": result}
        else:
            raise Exception("missing block id")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def notion_get_many_child_blocks(creds, params, **kwargs):
    """
        Returns children of a block of a specific id.

    :param str integration_token: (required) Once the integration is created, you can update its settings as needed under the Capabilities tab and retrieve the integration token under Secrets.
    :param dict params:

      :block_id: (str,required) The id of the block whose children are to be retrieved
      :page_size: (str,optional) The number of children to be retrieved
    :return: details about the retrieved block children(id,properties,..)
    :rtype: dict
    """
    try:
        cred = json.loads(creds)
        if "block_id" in params:
            if "page_size" in params:
                notion_api_url = f"https://api.notion.com/v1/blocks/{params['block_id']}/children?page_size={params['page_size']}"
            else:
                notion_api_url = (
                    f"https://api.notion.com/v1/blocks/{params['block_id']}/children"
                )
            headers = {
                "Authorization": f"Bearer {cred['accessToken']}",
                "Notion-Version": "2021-05-13",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(notion_api_url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        return result
                    return {"Error": result}
        else:
            raise Exception("missing block Id")

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def notion_append_child_blocks(creds, params, **kwargs):
    """
        Creates and appends new children blocks to the parent specified

    :param str integration_token: (required) Once the integration is created, you can update its settings as needed under the Capabilities tab and retrieve the integration token under Secrets.
    :param dict params:

      :block_id: (str,required) The id of the block whose children are to be retrieved
      :children: (arr,required) Details about children to be added to the parent block (see more in examples)
    :return: details about the created block children(id,properties,..)
    :rtype: dict
    :Examples:
    >>> params = {
      "block_id":"",
        "children": [{
    "object":"block",
    "type": "file",
    "file":
      {
                "caption": [],
    "type": "external",
    "external": {
                "url": "https://example-files.online-convert.com/document/txt/example.txt"
    }}},
    {
    "object":"block",
    "type": "image",
    "image": {
    "type": "external",
    "external": {
                "url": "https://hips.hearstapps.com/clv.h-cdn.co/assets/17/29/2048x1152/hd-aspect-1500566326-gettyimages-512366437-1.jpg"
     }
    }
    },
      {
      "object":"block",
      "type": "image",
      "image":
          {
        "type": "external",
        "external": {
          "url": "https://hips.hearstapps.com/clv.h-cdn.co/assets/17/29/2048x1152/hd-aspect-1500566326-gettyimages-512366437-1.jpg"
        }
      }
      },
       {
        "object":"block",
        "type": "pdf",
        "pdf": {
        "type": "external",
        "external": {
          "url": "https://website.domain/files/doc.pdf"
        }}
        },], }
    """
    try:
        cred = json.loads(creds)
        if "block_id" in params and "children" in params:
            notion_api_url = (
                f"https://api.notion.com/v1/blocks/{params['block_id']}/children"
            )
            headers = {
                "Authorization": f"Bearer {cred['accessToken']}",
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json", 
            }
            to_append = {}
            to_append["children"] = params["children"]
            async with aiohttp.ClientSession() as session:
                async with session.patch(notion_api_url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        return result
                    return {"Error": result}
        else:
            raise Exception("missing required input")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

operations = {
    "Get Many Users": notion_get_many_users,
    "Get User": notion_get_user,
    "Get Database": notion_get_database,
    "Get Many Databases": notion_get_many_databases,
    "Create Page": notion_create_page,
    "Get Page": notion_get_page,
    "Archive Page": notion_archive_page,
    "Get Many Child Blocks": notion_get_many_child_blocks,
    "Get Block": notion_get_block,
    "Append Child Blocks": notion_append_child_blocks,
}
