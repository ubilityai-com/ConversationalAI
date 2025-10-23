import json,aiohttp

api_version="2010-04-01"

async def twilio_send_sms(cred, params, **kwargs):
    """
    Send an SMS message using the Twilio API.

    :param dict cred: (REQUIRED) The credentials dictionary containing:

             - :accountSid: (str, REQUIRED): Your Twilio Account SID.
             - :authToken: (str, REQUIRED): Your Twilio Auth Token.

    :param dict params: (dict, REQUIRED) A dictionary containing SMS parameters.

                  The dictionary must include the following keys:

           - :From: (str, REQUIRED): The Twilio phone number sending the SMS.
           - :To: (str, REQUIRED): The recipient's phone number.
           - :Body: (str, REQUIRED): The text message to send.

    :return: Details of the sent SMS message.
    :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if "accountSid" in creds and "authToken" in creds and "From" in params and "To" in params and "Body" in params:
            account_sid = creds["accountSid"]
            auth_token = creds["authToken"]
            url = f"https://api.twilio.com/{api_version}/Accounts/{account_sid}/Messages.json"
            headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, data=params, auth=aiohttp.BasicAuth(account_sid, auth_token)) as response:
                    result = await response.json()
                    return result
        else:
            raise Exception("Missing required data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def twilio_make_call(cred, params, **kwargs):
    """
    Make a call using Twilio API.

    :param dict credentials: (REQUIRED) A dictionary containing:

        - :accountSid: (str, REQUIRED): Your Twilio Account SID.
        - :authToken: (str, REQUIRED): Your Twilio Auth Token.

    :param dict params: (REQUIRED) A dictionary containing call parameters.

                The dictionary must include the following keys:

        - :From: (str, REQUIRED): The Twilio phone number making the call.
        - :To: (str, REQUIRED): The recipient's phone number.
        - :Url: (str, REQUIRED): The URL to fetch the TwiML for the call.

    :return: The response data from the Twilio API, or an error message.

    :rtype: dict or str
    """
    try:
        creds = json.loads(cred)
        if "accountSid" in creds and "authToken" in creds and "From" in params and "To" in params and "Url" in params:
            account_sid = creds["accountSid"]
            auth_token = creds["authToken"]
            url = f"https://api.twilio.com/{api_version}/Accounts/{account_sid}/Calls.json"
            headers = {"Content-Type": "application/x-www-form-urlencoded"}
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, data=params, auth=aiohttp.BasicAuth(account_sid, auth_token)) as response:
                    result = await response.json()
                    return result
        else:
            raise Exception("Missing required data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
operations = {
    "Send SMS": twilio_send_sms,
    "Make Call": twilio_make_call,
}
