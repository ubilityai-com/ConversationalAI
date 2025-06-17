# flow_invoker.py
import json
import aiohttp
import asyncio

class FlowInvoker:
    def __init__(self, data, used_variables):
        self.data = data
        self.used_variables = used_variables
        self.max_retries = 30
        self.retry_delay = 2
    
    async def make_request(self, variables):
        url = self._replace_variables(self.data['url'], variables)
        body = None
        
        if 'body' in self.data:
            body = self._replace_variables_in_object(self.data['body'], variables)
        
        # Make initial request
        initial_response = await self._make_http_request(url, body)
        
        # Handle polling if needed
        if isinstance(initial_response, str) and initial_response.startswith('https://'):
            return await self._poll_for_result(initial_response)
        return initial_response
    
    async def _poll_for_result(self, result_url):
        retries = 0
        while retries < self.max_retries:
            await asyncio.sleep(self.retry_delay)
            try:
                response = await self._make_http_request(result_url)
                
                # Check if processing is complete
                if 'Processing...' not in response:
                    return response
            except Exception as e:
                print(f'Polling attempt {retries+1} failed: {e}')
            retries += 1
        raise Exception('Max polling attempts reached')
    
    async def _make_http_request(self, url, body=None):
        headers = {}
        method = 'POST' if body else 'GET'
        
        # Handle authentication
        if 'authentication' in self.data:
            auth = self.data['authentication']
            if auth['type'] == 'Bearer':
                token = self._replace_variables(auth['token'], {})
                headers['Authorization'] = f'Bearer {token}'
            elif auth['type'] == 'Basic':
                username = self._replace_variables(auth['username'], {})
                password = self._replace_variables(auth['password'], {})
                import base64
                credentials = base64.b64encode(f'{username}:{password}'.encode()).decode()
                headers['Authorization'] = f'Basic {credentials}'
        
        async with aiohttp.ClientSession() as session:
            async with session.request(
                method, 
                url, 
                json=body, 
                headers=headers
            ) as response:
                response.raise_for_status()
                return await response.text()
    
    def _replace_variables(self, template, variables):
        if not isinstance(template, str):
            return template
        
        for var_name in self.used_variables:
            placeholder = f'${{{var_name}}}'
            if placeholder in template:
                value = str(variables.get(var_name, ''))
                template = template.replace(placeholder, value)
        return template
    
    def _replace_variables_in_object(self, obj, variables):
        if isinstance(obj, dict):
            return {k: self._replace_variables_in_object(v, variables) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [self._replace_variables_in_object(item, variables) for item in obj]
        elif isinstance(obj, str):
            return self._replace_variables(obj, variables)
        return obj