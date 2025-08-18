import aiohttp
import asyncio
import base64
import json

class HttpRequest:
    def __init__(self, data):
        self.data = data

    async def make_request(self,sid,conversation_id):
        try:
            from app import get_dialogue_id_from_sid
            from applications.functions import upload_file
            dial_id = get_dialogue_id_from_sid(sid)
            method = self.data['method'].upper()
            url = self.data['url']
            authorization_params = self.data.get('authorization_params', {})
            query_params = self.data.get('query_params', [])
            headers_params = self.data.get('headers_params', [])
            body_params = self.data.get('body_params', {})
            optional = self.data.get('optional', {})
            headers = {}
            query = {}
            body = None

            # Auth
            if 'type' in authorization_params:
                if authorization_params['type'] == 'API Key':
                    key = authorization_params['key']
                    value = authorization_params['value']
                    add_to = authorization_params['addTo']
                    if add_to == 'Header':
                        headers[key] = value
                    elif add_to == 'Query Params':
                        query[key] = value
                elif authorization_params['type'] == 'Bearer Token':
                    token = authorization_params['token']
                    headers['Authorization'] = f'Bearer {token}'
                elif authorization_params['type'] == 'Basic Auth':
                    username = authorization_params['username']
                    password = authorization_params['password']
                    credentials = base64.b64encode(f"{username}:{password}".encode()).decode()
                    headers['Authorization'] = f'Basic {credentials}'
            # Headers
            for item in headers_params:
                headers[item['name']] = item['value']

            # Query Params
            for item in query_params:
                query[item['key']] = item['value']

            # Body
            body_type = body_params.get('type')
            if body_type == 'JSON':
                headers['Content-Type'] = 'application/json'
                body = json.dumps(body_params['json'])
            elif body_type == 'Form Data':
                form_data = aiohttp.FormData()
                for item in body_params['formData']:
                    key = item['key']
                    if item['type'] == 'binary':
                        form_data.add_field(key, item['value'].encode('utf-8'))
                    elif item['type'] == 'text':
                        form_data.add_field(key, item['value'])
                    elif item['type'] == 'url':
                        async with aiohttp.ClientSession() as temp_session:
                            async with temp_session.get(item['value']) as file_response:
                                content = await file_response.read()
                                form_data.add_field(key, content)
                body = form_data
            elif body_type == 'Binary':
                headers['Content-Type'] = 'application/octet-stream'
                body = body_params['binary-data'].encode('utf-8')

            timeout = optional.get('timeout', 30)
            ssl_verify = optional.get('ssl', True)
            async with aiohttp.ClientSession() as session:
                request_args = {
                    "method": method,
                    "url": url,
                    "headers": headers,
                    "params": query,
                    "ssl": ssl_verify,
                    "timeout": aiohttp.ClientTimeout(total=timeout)
                }

                # Attach body depending on method & type
                if method in ['POST', 'PUT', 'PATCH', 'DELETE']:
                    if isinstance(body, aiohttp.FormData):
                        request_args["data"] = body
                    elif headers.get('Content-Type') == 'application/json':
                        request_args["data"] = body
                    else:
                        request_args["data"] = body

                async with session.request(**request_args) as response:
                    response.raise_for_status()
                    content_type = response.headers.get('Content-Type', '').lower()

                    if 'application/json' in content_type:
                        return await response.json()
                    elif 'text/' in content_type:
                        return await response.text()
                    else: #file
                        file_content = response.content
                        # Forward binary data to Flask endpoint
                        fileData = upload_file(dial_id,conversation_id,file_content)
                        return fileData
                        

        except aiohttp.ClientResponseError as e:
            raise Exception(f"HTTP error: {str(e)}\nResponse content: {await e.response.text()}")
        except asyncio.TimeoutError:
            raise Exception("The request timed out. Please try again later.")
        except Exception as e:
            raise Exception(f"Request failed: {str(e)}")
