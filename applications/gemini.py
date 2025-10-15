import aiohttp,sys,os,json,mimetypes
import base64

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import get_file_data,upload_file,normalize_params




async def gemini_text_generation(json_cred, params, **kwargs):
    """
    Sends a prompt to Google AI Studio (Gemini) for text generation.

    :param str apiKey: The API key for authentication.
    :param dict params: A dictionary containing parameters for the request.

        - :apiVersion: (string,required) - The API version to use. ( v1 or v1beta )
        - :model: (string,required) - The model to use for text generation. Example: "models/gemini-1.5-flash"
        - :prompt: (str,required) - The actual text of the prompt. 
        - :generationConfig: (dict,optional) - Configuration options for model generation and outputs. Not all parameters are configurable for every model. Fields:

          :temperature: (float,optional) - Controls the randomness of the output. Note: The default value varies by model. Values can range from [0.0, 2.0].
          :topP: (float,optional) - The maximum cumulative probability of tokens to consider when sampling. The model uses combined Top-k and Top-p (nucleus) sampling. Tokens are sorted based on their assigned probabilities so that only the most likely tokens are considered. Top-k sampling directly limits the maximum number of tokens to consider, while Nucleus sampling limits the number of tokens based on the cumulative probability. Note: The default value varies by Model.
          :topK: (float,optional) - The maximum number of tokens to consider when sampling. Gemini models use Top-p (nucleus) sampling or a combination of Top-k and nucleus sampling. Top-k sampling considers the set of topK most probable tokens. Models running with nucleus sampling don't allow topK setting. Note: The default value varies by Model.
          :stopSequences: (list,optional) - The set of character sequences (up to 5) that will stop output generation. If specified, the API will stop at the first appearance of a stop_sequence. The stop sequence will not be included as part of the response.
          :maxOutputTokens: (int,optional) - The maximum number of tokens to include in a response candidate. Note: The default value varies by model
          :candidateCount: (int,optional) - The number of response variations to return. For each request, you're charged for the output tokens of all candidates, but are only charged once for the input tokens.
          
    Returns:
        dict: A dictionary containing the response from the model.
    """
    try:
        creds = json.loads(json_cred)
        if "apiKey" in creds and "model" in params and "prompt" in params and "apiVersion" in params :
            apiKey = creds["apiKey"]
            model = params["model"]
            apiVersion = params["apiVersion"]
            prompt = params["prompt"]
            url = f"https://generativelanguage.googleapis.com/{apiVersion}/{model}:generateContent"
            headers = {"Content-Type": "application/json","x-goog-api-key": apiKey}
            data = {"contents": [{"parts": [{"text": prompt}]}]}
            keys_to_skip = ["apiVersion","prompt"]
            for key, value in params.items():
                if key in keys_to_skip:
                    continue
                if value:
                    data[key] = value
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if result:
                        return result
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def gemini_upload_file(json_cred, params, **kwargs):
    """
    Uploads a file to the Gemini API using a resumable upload session.

    :param str apiKey: The API key for authentication.
    :param dict params: A dictionary containing parameters for the request.

        - :file: (str,required) - File identifier
        - :mime_type: (str,required) - MIME type of the file (e.g., `image/jpeg`,`application/pdf`,`video/mp4`...)

    Returns:
        dict: A dictionary containing metadata about the uploaded file
    """
    try:
        creds = json.loads(json_cred)
        if "apiKey" in creds:
            apiKey = creds["apiKey"]
            required_keys = ["file", "mime_type"]
            if all(key in params for key in required_keys):
                file = params["file"]
                mime_type = params["mime_type"]
                base_url = "https://generativelanguage.googleapis.com/upload/v1beta/files"
                
                if kwargs:
                    # Extra conv_id & dialogue_id
                    dialogue_id = kwargs.get("dialogue_id")
                    conv_id = kwargs.get("conv_id")

                contentData = get_file_data(dialogue_id, conv_id, file)
                if "Error" in contentData:
                    raise Exception(
                        f"Failed to retrieve file content: {contentData['Error']}"
                    )
                # Extract and decode the file content from hex to bytes
                file_content = bytes.fromhex(contentData["file_content"])
                file_name = contentData["file_name"]
                guessed_mime, _ = mimetypes.guess_type(file_name)
                if guessed_mime == mime_type:
                    # Step 1: Initiate resumable upload session
                    start_headers = {
                        "x-goog-api-key": apiKey,
                        "X-Goog-Upload-Protocol": "resumable",
                        "X-Goog-Upload-Command": "start",
                        "Content-Type": "application/json",
                        "X-Goog-Upload-Header-Content-Type": mime_type
                    }
                    start_payload = {"file": {"display_name": file_name}}
                    async with aiohttp.ClientSession() as session:
                        async with session.post(base_url,headers=start_headers,data=json.dumps(start_payload)) as res:
                            res.raise_for_status()
                            upload_url = res.headers.get("X-Goog-Upload-URL")
                            if upload_url:
                                upload_headers = {
                                    # "Content-Length": str(contentData["file_size"]),
                                    "X-Goog-Upload-Offset": "0",
                                    "X-Goog-Upload-Command": "upload, finalize",
                                }
                                async with aiohttp.ClientSession() as session:
                                    async with session.post(upload_url, headers=upload_headers, data=file_content) as upload_res:
                                        upload_res.raise_for_status()
                                        file_info = await upload_res.json()
                                        return file_info
                            else:
                                raise Exception(f"Failed to get upload URL. Response: {await res.text()}")
                else:
                    raise Exception(f"File extension does not match MIME type. File: {file_name}, MIME: {mime_type}")
            else:
                raise Exception("missing required param(s)")
        else:
            raise Exception("missing required credential")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def gemini_analyze_file(json_cred, params, **kwargs):
    """
    Analyzes a file using the Gemini API with a prompt and returns the response.

    :param str apiKey: The API key for authentication.
    :param dict params: A dictionary containing parameters for the request.

        - :model: (string,required) - The model to use for analyze a file Example: "models/gemini-1.5-flash"
        - :prompt: (str,required) - Text prompt for analysis
        - :mime_type: (str,required) - MIME type of the file (e.g., `image/jpeg`,`application/pdf`,`video/mp4`...)
        - :file: (str,optional) - File identifier
        - :uri: (str,optional) - Existing Gemini file URI

    Returns:
        dict: A dictionary containing the response.
    """
    try:
        creds = json.loads(json_cred)
        if "apiKey" in creds:
            apiKey = creds["apiKey"]
            required_keys = ["model", "mime_type","prompt"]
            if all(key in params for key in required_keys):
                model = params["model"]
                mime_type = params["mime_type"]
                prompt = params["prompt"]
                uri = params.get("uri","")
                file = params.get("file","")
                uploaded_file_id = None  # Track uploaded file ID for deletion
                body = {
                    "contents": [{"parts": [{ "fileData": { "mime_type": mime_type,"file_uri": None}}, {"text": prompt}]}]
                }
                if file:
                    file_info = await gemini_upload_file(json_cred, params, **kwargs)
                    if "Error" in file_info:
                        raise Exception(f"File upload failed: {file_info['Error']}")
                    # Extract nested 'file' object
                    file_data = file_info.get("file", {}) if file_info else {}
                    fileUriUploaded = file_data.get("uri")
                    if fileUriUploaded:
                        body["contents"][0]["parts"][0]["fileData"]["file_uri"] = fileUriUploaded
                        uploaded_file_id = file_data.get("name")  
                    else:
                        raise Exception("File upload failed, no URI returned.")
                elif uri:
                    body["contents"][0]["parts"][0]["fileData"]["file_uri"] = uri
                else:
                    raise Exception("Missing Input Data")
                url = f"https://generativelanguage.googleapis.com/v1beta/{model}:generateContent"
                headers = {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                }
                async with aiohttp.ClientSession() as session:
                    async with session.post(url, headers=headers, json=body) as response:
                        response.raise_for_status()
                        result = await response.json()
                        # Delete uploaded file from Gemini
                        if uploaded_file_id:
                            delete_url = f"https://generativelanguage.googleapis.com/v1beta/{uploaded_file_id}"
                            async with aiohttp.ClientSession() as session:
                                async with session.delete(delete_url, headers=headers) as delete_response:
                                    delete_response.raise_for_status()
                                    if delete_response.status != 200:
                                        raise Exception(f"File delete failed: {delete_response.status} - {await delete_response.text()}")
                        if response:
                            return result
                        else:
                            raise Exception(f"Status Code: {response.status}. Response: {await response.text()}")
            else:
                raise Exception("missing required param(s)")
        else:
            raise Exception("missing required credential")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def gemini_get_many_file(json_cred, params, **kwargs):
    """
    Fetches files from the Gemini API

    :param str apiKey: The API key for authentication.

    Returns:
        dict: A dictionary containing the response.
    """
    try:
        creds = json.loads(json_cred)
        if "apiKey" in creds :
            apiKey = creds["apiKey"]
            url = "https://generativelanguage.googleapis.com/v1beta/files"
            headers = {"x-goog-api-key": apiKey}
            files = []
            page_token = None
            async with aiohttp.ClientSession() as session:
                while True:
                    query_params = {"pageSize": 100}
                    if page_token:
                        query_params["pageToken"] = page_token
                    query_params = normalize_params(query_params)
                    async with session.get(url, headers=headers, params=query_params) as response:
                        response.raise_for_status()
                        data = await response.json()
                    files.extend(data.get("files", []))
                    page_token = data.get("nextPageToken")
                    if not page_token:
                        break
            if "error" in data:
                raise Exception(str(data))
            else:    
                return {"files":files}
        else:
            raise Exception("missing required data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def gemini_generate_image(json_cred, params, **kwargs):
    """
    Generates an image using Google's Gemini API and uploads the result.

    :param str apiKey: The API key for authentication.
    :param dict params: A dictionary containing parameters for the request.
        
        - :prompt: (str, required) - The prompt text to generate the image from.
        - :model: (string,required) - The model to use for image generation. Example: "gemini-2.5-flash-image-preview"

    Returns:
        dict: A dictionary containing the response from the Flask file upload endpoint.

    """
    try:
        creds = json.loads(json_cred)
        if "apiKey" in creds:
            apiKey = creds["apiKey"]
            if "prompt" in params and "model" in params:
                prompt = params["prompt"]
                model = params["model"]
                headers = {"Content-Type": "application/json","x-goog-api-key": apiKey}
                url = f"https://generativelanguage.googleapis.com/v1beta/{model}:generateContent"
                body = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]}
                }
                async with aiohttp.ClientSession() as session:
                    async with session.post(url, headers=headers, json=body) as response:
                        rs_js = await response.json()
                if rs_js:
                    parts = rs_js.get("candidates", [])[0].get("content", {}).get("parts", [])
                    for part in parts:
                        binary_res = part.get("inlineData", {}).get("data", None)
                        if binary_res:
                            image_bytes = base64.b64decode(binary_res)
                            if kwargs:
                                # Extra conv_id & dialogue_id
                                dialogue_id = kwargs.get("dialogue_id")
                                conv_id = kwargs.get("conv_id")
                                fileData = upload_file(dialogue_id, conv_id, image_bytes)
                            return fileData
                raise Exception(f"Status Code: {response.status}. Response: {await response.text()}")
            else:
                raise Exception("missing required param(s)")
        else:
            raise Exception("missing required credential")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def gemini_edit_image(json_cred, params, **kwargs):
    """
    Edits an image using the Gemini API and uploads the result.

    :param str apiKey: The API key for authentication.
    :param dict params: A dictionary containing parameters for the request.

        - :prompt: (str,required) - The actual text of the prompt. 
        - :mime_type: (str,required) - MIME type of the image
        - :file: (str,required) - File identifier
        - :model: (string,required) - The model to use for image editing. Example: "gemini-2.5-flash-image-preview"

    Returns:
        dict : A dictionary containing the response from the Flask file upload endpoint.

    """
    try:
        creds = json.loads(json_cred)
        if "apiKey" in creds:
            apiKey = creds["apiKey"]
            required_keys = ["mime_type","prompt","file", "model"]
            if all(key in params for key in required_keys):
                mime_type = params["mime_type"]
                prompt = params["prompt"]
                model = params["model"]
                uploaded_file_id = None  # Track uploaded file ID for deletion
                if mime_type.startswith("image/"):
                    file_info = await gemini_upload_file(json_cred, params, **kwargs)
                    if "Error" in file_info:
                        raise Exception(f"File upload failed: {file_info['Error']}")
                    # Extract nested 'file' object
                    file_data = file_info.get("file", {}) if file_info else {}
                    fileUriUploaded = file_data.get("uri")
                    body = {
                        "contents": [{"parts": [{ "fileData": { "mime_type": mime_type,"file_uri": fileUriUploaded}}, {"text": prompt}]}],
                        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]}
                    }
                    uploaded_file_id = file_data.get("name") 
                    url = f"https://generativelanguage.googleapis.com/v1beta/{model}:generateContent"
                    headers = {"Content-Type": "application/json", "x-goog-api-key": apiKey}
                    async with aiohttp.ClientSession() as session:
                        async with session.post(url, headers=headers, json=body) as response:
                            rs_js = await response.json()
                            # Delete uploaded file from Gemini
                            if uploaded_file_id:
                                delete_url = f"https://generativelanguage.googleapis.com/v1beta/{uploaded_file_id}"
                                async with session.delete(delete_url, headers=headers) as delete_response:
                                    delete_response.raise_for_status()
                                    if delete_response.status != 200:
                                        raise Exception(f"File delete failed: {delete_response.status} - {delete_response.text()}")
                            if rs_js:
                                parts = rs_js.get("candidates", [])[0].get("content", {}).get("parts", [])
                                for part in parts:
                                    binary_res = part.get("inlineData", {}).get("data", None)
                                    if binary_res:
                                        image_bytes = base64.b64decode(binary_res)
                                        if kwargs:
                                            # Extra conv_id & dialogue_id
                                            dialogue_id = kwargs.get("dialogue_id")
                                            conv_id = kwargs.get("conv_id")
                                            fileData = upload_file(dialogue_id, conv_id, image_bytes)
                                        return fileData
                            raise Exception(f"Status Code: {response.status}. Response: {await response.text()}")
                else:
                    raise Exception(f"Unsupported image MIME type: {mime_type}")
            else:
                raise Exception("missing required param(s)")
        else:
            raise Exception("missing required credential")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}





operations = {
    "Generate Text": gemini_text_generation,
    "Analyze File": gemini_analyze_file,
    "Get Many File": gemini_get_many_file,
    "Upload File": gemini_upload_file,
    "Generate Image": gemini_generate_image,
    "Edit Image": gemini_edit_image,
}
