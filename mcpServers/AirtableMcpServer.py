from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

from mcpLibraries import airtable

mcp = FastMCP("AirtableMcpServer")

class AirTableGetAllRecordsInput(BaseModel): 
    base_id: str = Field(description="The Airtable base ID containing the target table.")
    table_id: str = Field(description="The Airtable table ID to query records from.")
    view: Optional[str] = Field(None, description="Optional Airtable view ID or name to filter records by.")
    pageSize: Optional[int] = Field(None, description="Number of records to return per page (max 100).")
    maxRecords: Optional[int] = Field(None, description="Maximum total number of records to return.")
    offset: Optional[str] = Field(None, description="Offset token used to fetch the next page of results.")
    fields: Optional[list] = Field(None, description="List of field names or IDs to include in the result.")
    sort: Optional[list] = Field(None, description="List of sort objects specifying the sort order.")
    filterByFormula: Optional[str] = Field(None, description="Formula to filter records, as supported by Airtable.")
    cellFormat: Optional[str] = Field(None, description="Format of returned cell values: 'json' or 'string'.")
    userLocale: Optional[str] = Field(None, description="User locale for date formatting when using string cell format.")
    timeZone: Optional[str] = Field(None, description="Time zone for formatting date fields when using string cell format.")
    returnFieldsByFieldId: Optional[bool] = Field(None, description="If true, response will use field IDs as object keys.")


class AirTableCreateRecordsInput(BaseModel): 
    base_id: str = Field(description="The Airtable base ID containing the target table.")
    table_id: str = Field(description="The Airtable table ID to insert the record into.")
    fields: dict = Field(description="A dictionary of field names or IDs and their corresponding values.")
    typecast: Optional[bool] = Field(None, description="If true, Airtable will try to coerce string values to appropriate types.")
    returnFieldsByFieldId: Optional[bool] = Field(None, description="If true, response will use field IDs as object keys.")


class AirTableUpdateRecordsInput(BaseModel): 
    base_id: str = Field(description="The Airtable base ID containing the target table.")
    table_id: str = Field(description="The Airtable table ID containing the record to update.")
    record_id: str = Field(description="The unique Airtable record ID to update.")
    fields: Optional[dict] = Field(None, description="Dictionary of field names or IDs and their new values.")
    replace: Optional[bool] = Field(None, description="If true, replaces entire record; otherwise, merges fields.")
    typecast: Optional[bool] = Field(None, description="If true, Airtable will try to coerce string values to appropriate types.")
    returnFieldsByFieldId: Optional[bool] = Field(None, description="If true, response will use field IDs as object keys.")


class AirTableDeleteRecordsInput(BaseModel): 
    base_id: str = Field(description="The Airtable base ID containing the target table.")
    table_id: str = Field(description="The Airtable table ID containing the record to delete.")
    record_id: str = Field(description="The unique Airtable record ID to delete.")


class AirTableDeleteRecordsBatchInput(BaseModel): 
    base_id: str = Field(description="The Airtable base ID containing the target table.")
    table_id: str = Field(description="The Airtable table ID containing the records to delete.")
    record_ids: list = Field(description="List of Airtable record IDs to delete.")


class AirTableBatchUpdateOrCreateRecordsInput(BaseModel): 
    base_id: str = Field(description="The Airtable base ID containing the target table.")
    table_id: str = Field(description="The Airtable table ID for creating or updating records.")
    records: Optional[list] = Field(None, description="List of dictionaries, each representing a record to create or update.")
    id: Optional[str] = Field(None, description="Optional record ID to update.")
    fields: Optional[dict] = Field(None, description="Dictionary of field names or IDs and their values.")
    fieldsToMergeOn: Optional[list] = Field(None, description="List of field names Airtable should use to match records for upsert.")
    replace: Optional[bool] = Field(None, description="If true, replaces entire record; otherwise, merges fields.")
    typecast: Optional[bool] = Field(None, description="If true, Airtable will try to coerce string values to appropriate types.")
    returnFieldsByFieldId: Optional[bool] = Field(None, description="If true, response will use field IDs as object keys.")


class AirTableGetRecordsInput(BaseModel): 
    base_id: str = Field(description="The Airtable base ID containing the target table.")
    table_id: str = Field(description="The Airtable table ID containing the record.")
    record_id: str = Field(description="The unique Airtable record ID to retrieve.")
    cellFormat: Optional[str] = Field(None, description="Format of returned cell values: 'json' or 'string'.")
    userLocale: Optional[str] = Field(None, description="User locale for formatting dates when using string cell format.")
    timeZone: Optional[str] = Field(None, description="Time zone for formatting dates when using string cell format.")
    returnFieldsByFieldId: Optional[bool] = Field(None, description="If true, response will use field IDs as object keys.")


class AirTableGetAllBasesInput(BaseModel): 
    offset: Optional[str] = Field(None, description="Offset token to retrieve the next page of Airtable bases.")


class AirTableGetBasesSchemaInput(BaseModel): 
    base_id: str = Field(description="The Airtable base ID for which the schema is requested.")
    include: Optional[list] = Field(None, description="Optional list of additional fields to include; currently only supports ['visibleFieldIds'].")


@mcp.tool()
async def airtable_list_records(params: AirTableGetAllRecordsInput) -> dict:
    """
    Get All AirTable Records.
    """
    try:
        creds = f'{{"accesstoken": "{os.environ.get("AIRTABLE_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = airtable.airtable_list_records(cred=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def airtable_create_record(params: AirTableCreateRecordsInput) -> str:
    """
    Create AirTable Record.
    """
    try:
        creds = f'{{"accesstoken": "{os.environ.get("AIRTABLE_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = airtable.airtable_create_record(cred=creds, params=params)
        return "AirTable Record created successfully"
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def airtable_update_record(params: AirTableUpdateRecordsInput) -> str:
    """
    Update AirTable Record.
    """
    try:
        creds = f'{{"accesstoken": "{os.environ.get("AIRTABLE_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = airtable.airtable_update_record(cred=creds, params=params)
        return "AirTable Record Updated successfully"
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def airtable_delete_record(params: AirTableDeleteRecordsInput) -> str:
    """
    Delete AirTable Record.
    """
    try:
        creds = f'{{"accesstoken": "{os.environ.get("AIRTABLE_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = airtable.airtable_delete_record(cred=creds, params=params)
        return "AirTable Record Deleted successfully"
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def airtable_batch_delete_records(params: AirTableDeleteRecordsBatchInput) -> str:
    """
    Delete Batch AirTable Record.
    """
    try:
        creds = f'{{"accesstoken": "{os.environ.get("AIRTABLE_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = airtable.airtable_batch_delete_records(cred=creds, params=params)
        return "AirTable Record Batch Deleted successfully"
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def airtable_batch_update_or_create_records(params: AirTableBatchUpdateOrCreateRecordsInput) -> str:
    """
    Update or create batches AirTable records 
    """
    try:
        creds = f'{{"accesstoken": "{os.environ.get("AIRTABLE_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = airtable.airtable_batch_update_or_create_records(cred=creds, params=params)
        return "AirTable Records Batch Update Or Create successfully"
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def airtable_get_record(params: AirTableGetRecordsInput) -> dict:
    """
    Get AirTable Records.
    """
    try:
        creds = f'{{"accesstoken": "{os.environ.get("AIRTABLE_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = airtable.airtable_get_record(cred=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def airtable_list_bases(params: AirTableGetAllBasesInput) -> dict:
    """
    Get All AirTable Bases.
    """
    try:
        creds = f'{{"accesstoken": "{os.environ.get("AIRTABLE_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = airtable.airtable_list_bases(cred=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def airtable_get_base_schemas(params: AirTableGetBasesSchemaInput) -> dict:
    """
    Get All AirTable Bases Schemas.
    """
    try:
        creds = f'{{"accesstoken": "{os.environ.get("AIRTABLE_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = airtable.airtable_get_base_schemas(cred=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)
    

if __name__ == "__main__":
    mcp.run()