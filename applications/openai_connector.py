import aiohttp, sys, os, json
import requests, base64
from applications.functions import get_file_data, upload_file

sys.path.append(os.path.dirname(os.path.abspath(__file__)))


async def openai_speech_to_text(json_cred, params, **kwargs):
    """
    Convert speech to text using OpenAI API (REST API method).

    :param dict creds:
        A dictionary containing API key and optional organization details.
        - apiKey (str): OpenAI API key for authentication. (required)

    :param dict params: (REQUIRED) A dictionary containing the required and optional fields for transcribing speech.

        The dictionary must include the following keys:

        - :file: (file object, REQUIRED): The audio file object (not file name) to transcribe. Supported formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm.
        - :model: (str, REQUIRED): The ASR model to use (e.g., "whisper-1").
        - :language: (str, OPTIONAL): The language of the audio file (e.g., "en", "ar").
        - :temperature: (float, OPTIONAL): Sampling temperature for decoding (defaults to 0, range: 0-1).

    :return: A dictionary with the transcription result or an error message.
    :rtype: dict
    """
    try:
        creds = json.loads(json_cred)
        if "file" in params and "model" in params and "apiKey" in creds:
            file_name = params["file"]
            data = aiohttp.FormData(quote_fields=False)
            for key, value in params.items():
                    if key != 'file' and value is not None:
                        data.add_field(key, str(value))
            if kwargs:
                # Extra conv_id & dialogue_id
                dialogue_id = kwargs.get("dialogue_id")
                conv_id = kwargs.get("conv_id")

            contentData = get_file_data(dialogue_id, conv_id, file_name)
            if "Error" in contentData:
                raise Exception(
                    f"Failed to retrieve file content: {contentData['Error']}"
                )

            # Extract and decode the file content from hex to bytes
            body = bytes.fromhex(contentData["file_content"])
            file_name = contentData["file_name"]
            url = "https://api.openai.com/v1/audio/transcriptions"
            headers = {"Authorization": f"Bearer {creds['apiKey']}"}
            data.add_field('file', body, filename=file_name, content_type='application/octet-stream')
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    url, headers=headers, data=data
                ) as response:
                    response.raise_for_status()
                    result = await response.json()
            return result
        else:
            raise Exception("Missing required data.")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def openai_text_to_speech(json_cred, params, **kwargs):
    """
    Convert text to speech using OpenAI API (REST API method).

    :param dict creds:
        A dictionary containing API key and optional organization details.
        - apiKey (str): OpenAI API key for authentication. (required)

    :param dict params: (REQUIRED) A dictionary containing the required and optional fields for generating speech.

                        The dictionary must include the following keys:

        - :model: (str, REQUIRED): The TTS model to use ("tts-1" or "tts-1-hd").
        - :input: (str, REQUIRED): The text to generate audio for (maximum 4096 characters).
        - :voice: (str, REQUIRED): The voice to use for generating the audio (alloy, ash, coral, echo, fable, onyx, nova, sage, shimmer).
        - :response_format: (str, OPTIONAL): The format for the audio file (defaults to "mp3"). Supported formats are "mp3", "opus", "aac", "flac", "wav", "pcm".
        - :speed: (float, OPTIONAL): The speed of the generated audio (defaults to 1). Valid range is 0.25 to 4.0.

    :return: A dictionary with the audio file content or an error message.
    :rtype: dict
    """
    try:
        creds = json.loads(json_cred)
        if (
            all(key in params for key in ["input", "voice", "model"])
            and "apiKey" in creds
        ):
            url = "https://api.openai.com/v1/audio/speech"
            headers = {
                "Authorization": f"Bearer {creds['apiKey']}",
                "Content-Type": "application/json",
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=params) as response:
                    response.raise_for_status()
                    file_content = await response.content.read()
            if kwargs:
                # Extra conv_id & dialogue_id
                dialogue_id = kwargs.get("dialogue_id")
                conv_id = kwargs.get("conv_id")
                result = upload_file(dialogue_id, conv_id, file_content)
            return result
        else:
            raise Exception("Missing required data.")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def openai_generate_image(json_cred, params, **kwargs):
    """
    Generates an image using OpenAI and sends it to a server.

    :param dict creds: A dictionary containing API key and optional organization details.
            - apiKey (str): OpenAI API key for authentication. (required)

    :param dict params: A dictionary of parameters for image generation.

        The dictionary must include the following keys:

            - :prompt:  (str,required) - A text description of the desired image(s). The maximum length is 1000 characters for dall-e-2 and 4000 characters for dall-e-3.
            - :model:  (str,required) - The model to use for image generation. One of dall-e-2, dall-e-3.
            - :quality:  (str,Optional) - The quality of the image that will be generated.
                    hd and standard are supported for dall-e-3.
                    standard is the only option for dall-e-2.

            - :size:  (str,Optional) - The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024 for dall-e-2,
                    and one of 1024x1024, 1792x1024, or 1024x1792 for dall-e-3.

            - :style:  (str,Optional) - The style of the generated images. This parameter is only supported for dall-e-3. Must be one of vivid or natural. Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images.

    Returns:
        dict : A dictionary containing the response from the Flask file upload endpoint.
    """
    try:
        creds = json.loads(json_cred)
        if (
            "apiKey" in creds
            and "model" in params
            and "prompt" in params
        ):
            apiKey = creds["apiKey"]
            model_gpt = params["model"]
            url = "https://api.openai.com/v1/images/generations"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {apiKey}",
            }

            data = {}
            # response_format for dall-e-3 and dall-e-2
            if model_gpt != "gpt-image-1":
                data["response_format"] = "b64_json"
            for key, value in params.items():
                keys_to_skip = []
                if key in keys_to_skip:
                    continue
                if value:
                    data[key] = value
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=data) as response:
                    # response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        b64_json = result["data"][0]["b64_json"]
                        image_data = base64.b64decode(b64_json)
                        if kwargs:
                            # Extra conv_id & dialogue_id
                            dialogue_id = kwargs.get("dialogue_id")
                            conv_id = kwargs.get("conv_id")
                            result = upload_file(dialogue_id,conv_id,image_data) 
                            return result
                    else:
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
        else:
            raise Exception("Missing required data.")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def openai_analyze_image(json_cred, params, **kwargs):
    """
    Sends a request to OpenAI's image model API with either a local image file or an image URL.

    :param dict creds: A dictionary containing API key and optional organization details.
            - apiKey (str): OpenAI API key for authentication. (required)

    :param dict params: A dictionary must include the following keys:

        - :model: (str): Model to use (e.g., "gpt-4.1-mini").
        - :input_text: (str): The prompt/question to ask about the image.
        - :file: (str, optional): The file name.
        - :image_url: (str, optional): A URL to the image.

    Returns:
        dict: The OpenAI API response.
    """
    try:
        creds = json.loads(json_cred)
        if (
            "apiKey" in creds
            and "model" in params
            and ("file" in params or "image_url" in params)
            and "input_text" in params
        ):
            apiKey = creds["apiKey"]
            model = params["model"]
            input_text = params["input_text"]
            file_param = params.get("file")
            image_url = params.get("image_url")
            image_data_url = None
            if file_param:
                if kwargs:
                    # Extra conv_id & dialogue_id
                    dialogue_id = kwargs.get("dialogue_id")
                    conv_id = kwargs.get("conv_id")

                # Retrieve file content data
                contentData = get_file_data(dialogue_id, conv_id, file_param)
                if "Error" in contentData:
                    raise Exception(
                        f"Failed to retrieve file content: {contentData['Error']}"
                    )
                # Extract and decode the file content from hex to bytes
                body = bytes.fromhex(contentData["file_content"])
                # Encode bytes to base64 for OpenAI image input
                base64_image = base64.b64encode(body).decode("utf-8")
                ext = (
                    os.path.splitext(contentData["file_name"])[1].lstrip(".") or "jpeg"
                )
                image_data_url = f"data:image/{ext};base64,{base64_image}"
            elif image_url:
                image_data_url = image_url
            else:
                raise Exception("Either 'file' or 'image_url' must be provided.")
            data = {
                "model": model,
                "input": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "input_text", "text": input_text},
                            {"type": "input_image", "image_url": image_data_url},
                        ],
                    }
                ],
            }
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {apiKey}",
            }
            url = "https://api.openai.com/v1/responses"
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    result = await response.json()
                    return result
        else:
            raise Exception("Missing required data.")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def openai_edit_image(json_cred, params, **kwargs):
    """
    Sends a request to OpenAI's image model API with a local image file to edit.

    :param dict creds: A dictionary containing API key and optional organization details.
            - apiKey (str,required): OpenAI API key for authentication.

    :param dict params: A dictionary must include the following keys:

        - :model: (str,required): Model to use ("dall-e-2", "gpt-4.1-mini").
        - :prompt: (str,required): A text description of the desired image.
        - :images: (list, required): The image's name (up to 16 images could be send).
        - :quality:  (str,Optional) - The quality of the image that will be generated.
        - :size:  (str,Optional) - The size of the generated images.
        - :style:  (str,Optional) - The style of the generated images.

    Returns:
        dict: dictionary containing the response from the Flask file upload endpoint.
    """
    try:
        creds = json.loads(json_cred)
        required_params = ["model", "prompt", "images"]
        if "apiKey" in creds:
            if all(key in params for key in required_params):
                url = "https://api.openai.com/v1/images/edits"
                apiKey = creds["apiKey"]
                headers = {"Authorization": f"Bearer {apiKey}"}

                model = params["model"]
                
                data = aiohttp.FormData(quote_fields=False)
                for key, value in params.items():
                    if key != 'images' and value is not None:
                        data.add_field(key, str(value))

                # response_format for dall-e-2
                if model != "gpt-image-1":
                    data.add_field("response_format", "b64_json")

                img_data = params["images"]
                # for loop to handle the edit of many images
                for image in img_data:
                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")

                    # Retrieve file content data
                    contentData = get_file_data(dialogue_id, conv_id, image)
                    if "Error" in contentData:
                        raise Exception(
                            f"Failed to retrieve file content: {contentData['Error']}"
                        )
                    
                    # Decode hex content to bytes
                    image_bytes = bytes.fromhex(contentData["file_content"])

                    image_ext = image.split(".")[-1].lower()
                    # handle sending just one image when using dall-e-2
                    if model == "dall-e-2":
                        if image_ext != "png":
                            raise Exception("For model 'dall-e-2', only PNG images are supported.")
                        data.add_field(
                            "image",
                            image_bytes,
                            filename=image,
                            content_type="image/png"
                        )
                    # handle sending one or many images using gpt-1 model
                    elif model == "gpt-image-1":
                        contentType = ""
                        if image_ext in ["jpg", "jpeg"]:
                            contentType = "image/jpeg"
                        elif image_ext == "png":
                            contentType = "image/png"
                        elif image_ext == "webp":
                            contentType = "image/webp"
                        else:
                            raise Exception("Unsupported image format. Supported formats for gpt-image-1 are jpg, jpeg, png, webp.")
                        data.add_field(
                            "image[]",
                            image_bytes,
                            filename=image,
                            content_type=contentType
                        )
                async with aiohttp.ClientSession() as session:
                    async with session.post(url, headers=headers, data=data) as response:
                        # response.raise_for_status()
                        if response.status == 200:
                            result = await response.json()
                            b64_img = result["data"][0]["b64_json"]
                            image_bytes = base64.b64decode(b64_img)
                            if kwargs:
                                # Extra conv_id & dialogue_id
                                dialogue_id = kwargs.get("dialogue_id")
                                conv_id = kwargs.get("conv_id")
                                fileData = upload_file(dialogue_id, conv_id, image_bytes)
                            return fileData
                        else:
                            raise Exception(
                                f"Status Code: {response.status}. Response: {await response.text()}"
                            )
            else:
                raise Exception("missing required param(s)")
        else:
            raise Exception("missing credential")

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


operations = {
    "Text To Speech": openai_text_to_speech,
    "Speech To Text": openai_speech_to_text,
    "Generate Image": openai_generate_image,
    "Analyze Image": openai_analyze_image,
    "Edit Image": openai_edit_image,
}
