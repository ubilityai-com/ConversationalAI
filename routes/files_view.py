"""
files_view.py
----------------
FastAPI routes for managing files.
"""


from fastapi.responses import JSONResponse
from app import http_app
from pydantic import BaseModel
from fastapi import  Request,Query
import uuid, gzip, magic, os, re


class FileUploadRequest(BaseModel):
    filePath: str = None


# @http_app.post('/bot/files')
# def upload_file(payload: FileUploadRequest):
#     """
#     Upload a file from a given source path to the local storage directory.

#     Args:
#         payload (FileUploadRequest): Contains the source file path.

#     Returns:
#         dict: Success message.
#     """
#     try:
#         with open(payload.filePath, 'rb') as source_file:
#             binary_data = source_file.read()

#         current_dir=os.getcwd() # get current working directory
#         filename = os.path.basename(payload.filePath)
#         file_path = f"{current_dir}/storage/{filename}"
#         with open(file_path, 'wb') as dest_file:
#             dest_file.write(binary_data)
        
#         if os.path.exists(file_path):
#             return {"Message":"File uploaded successfully"}
#         else:
#             return JSONResponse(status_code=500, content={"Error": "Destination file not found"})
    
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"Error": str(e)})


# @http_app.get('/bot/files')
# def list_file_names():
#     """
#     List all files in the local storage directory.

#     Returns:
#         list: A list of file names in the 'storage' directory.
#     """
#     try:
#         current_dir=os.getcwd() # get current working directory
#         directory_path = f"{current_dir}/storage"
#         return [f for f in os.listdir(directory_path) if os.path.isfile(os.path.join(directory_path, f))]
    
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"Error": str(e)})




ALLOWED_EXTENSIONS = {
    "txt": ["text/plain"],
    "json": ["application/json"],
    "csv": ["text/csv"],
    "xml": ["application/xml", "text/xml"],
    "pdf": ["application/pdf"],
    "doc": ["application/msword"],
    "docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    "xls": ["application/vnd.ms-excel"],
    "xlsx": ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    "ppt": ["application/vnd.ms-powerpoint"],
    "pptx": ["application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    "png": ["image/png"],
    "jpg": ["image/jpeg"],
    "jpeg": ["image/jpeg"],
    "svg": ["image/svg+xml"],
    "mp3": ["audio/mpeg"],
    "wav": ["audio/wav", "audio/x-wav"],
    "ogg": ["audio/ogg"],
    "m4a": ["audio/mp4"],
    "mp4": ["video/mp4"],
    "mov": ["video/quicktime"],
    "avi": ["video/x-msvideo"],
    "mkv": ["video/x-matroska"],
    "webm": ["video/webm"]
}


@http_app.post("/bot/upload_file")
async def save_file_binary(request: Request, dialogue: str = Query(None)):
    try:
        current_dir = os.getcwd()
        STORAGE_DIR = f"{current_dir}/temp/{dialogue}"

        # Get raw body data
        body = await request.body()
        if not body:
            return JSONResponse(status_code=400, content={"Error": "Missing input data"})

        # Decompress if gzip
        raw_data = gzip.decompress(body) if body[:2] == b'\x1f\x8b' else body

        # Detect MIME type
        mime = magic.Magic(mime=True)
        detected_mime = mime.from_buffer(raw_data)

        # Match extension by MIME type
        matched_extension = next(
            (ext for ext, mimes in ALLOWED_EXTENSIONS.items() if detected_mime in mimes),
            None
        )

        if not matched_extension:
            return JSONResponse(status_code=400, content={"Error": f"MIME type '{detected_mime}' is not allowed"})

        # Extra check for SVG
        if matched_extension == "svg":
            try:
                svg_content = raw_data.decode("utf-8", errors="ignore").lower()
                if any(danger in svg_content for danger in ["<script", "onload=", "javascript:"]):
                    return JSONResponse(status_code=400, content={"Error": "SVG contains potentially dangerous content"})
            except Exception:
                return JSONResponse(status_code=400, content={"Error": "Failed to parse SVG content"})

        # Extract original filename from headers (if present)
        original_filename = request.headers.get("Filename")

        # Generate filename
        random_suffix = str(uuid.uuid4())[:6]
        if original_filename:
            base_name, _ = os.path.splitext(original_filename)  # Remove extension
            safe_name = re.sub(r'[^\w\-_.]', '_', base_name)    # Sanitize filename
            file_name = f"{safe_name}_{random_suffix}.{matched_extension}"
        else:
            file_name = f"file_{random_suffix}.{matched_extension}"

        # Save file
        os.makedirs(STORAGE_DIR, exist_ok=True)
        file_path = os.path.join(STORAGE_DIR, file_name)

        with open(file_path, "wb") as f:
            f.write(raw_data)

        return {"filename": file_name, "mime_type": detected_mime}

    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})



@http_app.get("/bot/list_uploaded_files")
async def list_uploaded_files(dialogue: str = Query(None)):
    try:
        current_dir = os.getcwd()
        STORAGE_DIR = f"{current_dir}/temp/{dialogue}"

        if not os.path.exists(STORAGE_DIR):
            return JSONResponse(status_code=404, content={"error": f"Folder for dialogue '{dialogue}' not found"})

        # List only files, not directories
        file_list = [
            f for f in os.listdir(STORAGE_DIR)
            if os.path.isfile(os.path.join(STORAGE_DIR, f))
        ]

        return {"files": file_list}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})