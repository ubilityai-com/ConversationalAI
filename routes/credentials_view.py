"""
credentials_view.py
-------------------
Flask route handlers for managing credentials.
"""

from app import http_app
from pydantic import BaseModel
from models.credentials import create_credential, list_credentials, delete_credential,get_credentials_by_names
from fastapi.responses import JSONResponse

class CredentialCreateRequest(BaseModel):
    name: str
    type: str
    data: dict

# class CredentialsBatchRequest(BaseModel):
#     names: List[str]

@http_app.post('/credentials')
def create_credential_view(payload: CredentialCreateRequest):
    """
    Create a new credential.

    Args:
        payload (CredentialCreateRequest): The request body.

    Returns:
        dict: Success message.
    """
    try:
        create_credential(payload.name,payload.type, payload.data)
        return {"message": "Credential created"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.get('/credentials')
def list_credentials_view():
    """
    List all credentials.

    Returns:
        list: A list of credentials.
    """
    try:
        return list_credentials()
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.delete('/credentials/{id}')
def delete_credential_view(id: int):
    """
    Delete a credential by ID.

    Args:
        id (int): The credential ID.

    Returns:
        dict: Success message.
    """
    try:
        delete_credential(id)
        return {"message": "Credential deleted"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})


# @http_app.post('/credentials/batch')
# def get_multiple_credentials_view(payload: CredentialsBatchRequest):
#     """
#     Get multiple credentials by name.

#     Args:
#         payload (CredentialsBatchRequest): List of credential names.

#     Returns:
#         dict: A dictionary of credential name -> data.
#     """
#     try:
#         return get_credentials_by_names(payload.names)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error retrieving credentials: {str(e)}")
