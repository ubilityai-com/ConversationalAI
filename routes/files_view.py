"""
files_view.py
----------------
FastAPI routes for managing files.
"""

from fastapi import HTTPException
from app import http_app
from pydantic import BaseModel
from typing import Optional
import os


class FileUploadRequest(BaseModel):
    filePath: str = None


@http_app.post('/files')
def upload_file(payload: FileUploadRequest):
    """
    Upload a file from a given source path to the local storage directory.

    Args:
        payload (FileUploadRequest): Contains the source file path.

    Returns:
        dict: Success message.
    """
    try:
        with open(payload.filePath, 'rb') as source_file:
            binary_data = source_file.read()

        current_dir=os.getcwd() # get current working directory
        filename = os.path.basename(payload.filePath)
        file_path = f"{current_dir}/storage/{filename}"
        with open(file_path, 'wb') as dest_file:
            dest_file.write(binary_data)
        
        if os.path.exists(file_path):
            return {"message":"File uploaded successfully"}
        else:
            raise HTTPException(status_code=500, detail="Destination file not found")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")


@http_app.get('/files')
def list_file_names():
    """
    List all files in the local storage directory.

    Returns:
        list: A list of file names in the 'storage' directory.
    """
    try:
        current_dir=os.getcwd() # get current working directory
        directory_path = f"{current_dir}/storage"
        return [f for f in os.listdir(directory_path) if os.path.isfile(os.path.join(directory_path, f))]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving file names: {str(e)}")