import uuid, gzip, magic, os, re,json
from datetime import datetime

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

def upload_file(dialogue_id,conv_id,file_content, original_filename=None):
    try:

        current_dir = os.getcwd()
        STORAGE_DIR = os.path.join(current_dir, "temp", str(dialogue_id),str(conv_id))

        # Create directory if it doesn't exist
        os.makedirs(STORAGE_DIR, exist_ok=True)


        # Decompress if gzip
        raw_data = gzip.decompress(file_content) if file_content[:2] == b'\x1f\x8b' else file_content

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
            return {"Error": f"MIME type '{detected_mime}' is not allowed"}

        # Extra check for SVG
        if matched_extension == "svg":
            try:
                svg_content = raw_data.decode("utf-8", errors="ignore").lower()
                if any(danger in svg_content for danger in ["<script", "onload=", "javascript:"]):
                    return {"Error": "SVG contains potentially dangerous content"}
            except Exception:
                return {"Error": "Failed to parse SVG content"}


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

        return {
            "file_name": file_name,
            "file_size": file_size_mb
        }

    except Exception as e:
        return {"Error": str(e)}
    


def get_file_data(dialogue_id,conv_id,file_name):
    try:
        # Construct full file path
        current_dir = os.getcwd()
        file_path = os.path.join(current_dir, "temp", str(dialogue_id),str(conv_id),file_name)
        if not os.path.exists(file_path):
            return {"Error": "File not found"}

        # Load and return file as a downloadable attachment
        with open(file_path, 'rb') as f:
            file_data = f.read()

        # Return the file content and metadata
        return {
            "file_name":file_name,
            "file_size":  f"{len(file_data) / (1024*1024):.2f} MB",
            "file_content": file_data.hex()  # Convert binary content to hex for JSON compatibility
        }

    except Exception as error:
        return {"Error": str(error)}