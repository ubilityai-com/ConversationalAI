"""
files_view.py
----------------
FastAPI routes for managing files.
"""


from fastapi.responses import JSONResponse,FileResponse
from app import http_app
from fastapi import  Request,Query
import uuid, gzip, magic, os, re,json
from datetime import datetime
import base64


ALLOWED_EXTENSIONS =  {
    # Text & Data
    "txt": ["text/plain"],
    "json": ["application/json"],
    "csv": ["text/csv"],
    "xml": ["application/xml", "text/xml"],

    # Documents
    "pdf": ["application/pdf"],
    "doc": ["application/msword"],
    "docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    "xls": ["application/vnd.ms-excel"],
    "xlsx": ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    "ppt": ["application/vnd.ms-powerpoint"],
    "pptx": ["application/vnd.openxmlformats-officedocument.presentationml.presentation"],

    # Images
    "png": ["image/png"],
    "jpg": ["image/jpeg"],
    "jpeg": ["image/jpeg"],
    "svg": ["image/svg+xml"],


    # Audio
    "mp3": ["audio/mpeg"],
    "wav": ["audio/wav", "audio/x-wav"],
    "ogg": ["audio/ogg"],
    "m4a": ["audio/mp4"],

    # Video
    "mp4": ["video/mp4"],
    "mov": ["video/quicktime"],
    "avi": ["video/x-msvideo"],
    "mkv": ["video/x-matroska"],
    "webm": ["video/webm"]
}

@http_app.post("/bot/upload_file")
async def save_file_binary(request: Request, dialogue: str = Query(None)):
    try:
        if not dialogue:
            return JSONResponse(status_code=400, content={"Error": "Missing dialogue parameter"})

        current_dir = os.getcwd()
        STORAGE_DIR = os.path.join(current_dir, "temp", dialogue)

        # Create directory if it doesn't exist
        os.makedirs(STORAGE_DIR, exist_ok=True)

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

        if detected_mime == "text/plain":
            try:
                json.loads(raw_data.decode("utf-8"))
                matched_extension = "json"
            except:
                pass

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

        # Generate filename random number
        random_suffix = str(uuid.uuid4())[:6]

        if original_filename:
            base_name, _ = os.path.splitext(original_filename)  # Remove extension
            safe_name = re.sub(r'[^\w\-_.]', '_', base_name)    # Sanitize filename
            file_name = f"{safe_name}_{random_suffix}.{matched_extension}"
        else:
            file_name = f"file_{random_suffix}.{matched_extension}"

        # Save file
        file_path = os.path.join(STORAGE_DIR, file_name)

        with open(file_path, "wb") as f:
            f.write(raw_data)

        file_size_bytes = len(raw_data)
        file_size_mb = round(file_size_bytes / (1024 * 1024), 2)

        created_at = datetime.now().isoformat()

        return {
            "file_name": file_name,
            "file_type": detected_mime,
            "file_size": f"{file_size_mb} MB",
            "created_at": created_at
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.get("/bot/list_uploaded_files")
async def list_uploaded_files(dialogue: str = Query(None)):
    try:
        if not dialogue:
            return JSONResponse(status_code=400, content={"error": "Missing dialogue parameter"})

        current_dir = os.getcwd()
        STORAGE_DIR = os.path.join(current_dir, "temp", dialogue)

        if not os.path.exists(STORAGE_DIR):
            return JSONResponse(status_code=404, content={"error": f"Folder for dialogue '{dialogue}' not found"})

        mime = magic.Magic(mime=True)
        file_list = []

        for f in os.listdir(STORAGE_DIR):
            file_path = os.path.join(STORAGE_DIR, f)
            if os.path.isfile(file_path):
                file_size_bytes = os.path.getsize(file_path)
                file_size_mb = round(file_size_bytes / (1024 * 1024), 2)

                with open(file_path, "rb") as file_data:
                    detected_mime = mime.from_buffer(file_data.read(2048))

                creation_time = os.path.getctime(file_path)
                formatted_time = datetime.fromtimestamp(creation_time).isoformat()

                file_list.append({
                    "file_name": f,
                    "file_type": detected_mime,
                    "file_size": f"{file_size_mb} MB",
                    "created_at": formatted_time
                })

        return {"files": file_list}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

    


@http_app.delete("/bot/delete_file")
async def delete_uploaded_file(dialogue: str = Query(None), filename: str = Query(None)):
    try:
        if not dialogue or not filename:
            return JSONResponse(status_code=400, content={"error": "Missing parameter"})

        current_dir = os.getcwd()
        STORAGE_DIR = os.path.join(current_dir, "temp", dialogue)
        file_path = os.path.join(STORAGE_DIR, filename)

        if not os.path.exists(file_path):
            return JSONResponse(status_code=404, content={"error": f"File '{filename}' not found in dialogue '{dialogue}'"})

        if not os.path.isfile(file_path):
            return JSONResponse(status_code=400, content={"error": f"'{filename}' is not a file"})

        os.remove(file_path)

        return {"message": f"File '{filename}' deleted successfully"}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    

@http_app.get("/bot/get_file")
async def get_uploaded_file(dialogue: str = Query(None), filename: str = Query(None)):
    try:
        current_dir = os.getcwd()
        STORAGE_DIR1 = os.path.join(current_dir,"temp",str(dialogue)) # Global file
        STORAGE_DIR2 = os.path.join(current_dir,"temp",str(dialogue),"testNode")

        file_path1 = os.path.join(STORAGE_DIR1, filename)
        file_path2 = os.path.join(STORAGE_DIR2, filename)

        if os.path.exists(file_path1): # global file
            file_path = file_path1
        elif os.path.exists(file_path2):
            file_path = file_path2
        else: # File not found in either place
            return None

        # Load and return file as a downloadable attachment
        with open(file_path, 'rb') as f:
            file_data = f.read()
            
        # Encode the binary data to base64
        encoded_data = base64.b64encode(file_data).decode('utf-8')

        # Return as a JSON-compatible dict
        return {
            "file_name": filename,
            "content_type": "application/octet-stream",
            "data_base64": encoded_data
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})