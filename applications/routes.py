from app import http_app
from models.credentials import get_credentials_by_names
from fastapi import  HTTPException
from pydantic import BaseModel
import httpx

############################# Slack API's  ###############################
class SlackAppIntegration(BaseModel):
    credential_name: str


@http_app.post("/slack/listUsers")
async def list_slack_users(payload: SlackAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)

        if "accessToken" in json_cred:
            token = json_cred["accessToken"]
            url = "https://www.slack.com/api/users.list"
            headers = {"Authorization": f"Bearer {token}"}

            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers)

            result = response.json()

            if "members" in result:
                users = [
                    {"name": user["name"], "id": user["id"]}
                    for user in result["members"]
                    if not user["deleted"]
                ]
                return {"Users": users}
            raise HTTPException(status_code=500, detail=result)
        raise HTTPException(status_code=500, detail="Missing input data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@http_app.post("/slack/listChannels")
async def get_slack_channels(payload: SlackAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)

        if "accessToken" in json_cred:
            token = json_cred["accessToken"]
            url = "https://www.slack.com/api/conversations.list?types=public_channel,private_channel,mpim"
            headers = {"Authorization": f"Bearer {token}"}

            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers)

            result = response.json()

            if "channels" in result:
                channels = [
                    {"name": channel["name"], "id": channel["id"]}
                    for channel in result["channels"]
                ]
                return {"channels": channels}
            raise HTTPException(status_code=500, detail=result)

        raise HTTPException(status_code=500, detail="Missing input data")
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))
