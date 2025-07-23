from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

from applications import googleSheets

mcp = FastMCP("GoogleSheetsMcpServer")

class GoogleSheetsCreateSpreadSheetContent(BaseModel):
    title: str = Field(None, description="The title of the Google Sheets spreadsheet.")
    locale: Optional[str] = Field(None, description="The locale of the Google Sheets spreadsheet (e.g., 'en_US').")
    autoRecalc: Optional[str] = Field(None, description="Automatic recalculation setting for formulas in the Google Sheets spreadsheet.")


class GoogleSheetsCreateSpreadSheetInput(BaseModel):
    properties: GoogleSheetsCreateSpreadSheetContent = Field(description="Properties for the Google Sheets spreadsheet.")
    sheets: Optional[list] = Field(None, description="List of sheets to include in the Google Sheets spreadsheet.")


class GoogleSheetsTabColorContent(BaseModel):
    red: Optional[float] = Field(None, description="Red component of the tab color in Google Sheets (0.0–1.0).")
    green: Optional[float] = Field(None, description="Green component of the tab color in Google Sheets (0.0–1.0).")
    blue: Optional[float] = Field(None, description="Blue component of the tab color in Google Sheets (0.0–1.0).")


class SheetPropertiesContent(BaseModel):
    title: Optional[str] = Field(None, description="The title of the sheet within the Google Sheets spreadsheet.")
    sheetId: Optional[int] = Field(None, description="Unique ID of the sheet in Google Sheets.")
    hidden: Optional[bool] = Field(None, description="Whether the Google Sheets tab is hidden.")
    rightToLeft: Optional[bool] = Field(None, description="Whether the Google Sheets tab uses right-to-left layout.")
    index: Optional[int] = Field(None, description="Index position of the sheet within the Google Sheets spreadsheet.")
    tabColor: Optional[GoogleSheetsTabColorContent] = Field(None, description="Color of the sheet tab in Google Sheets.")


class GoogleSheetsCreateSheetContent(BaseModel):
    properties: SheetPropertiesContent = Field(None, description="Properties that define the new sheet to be created.")


class GoogleSheetsAddSheetContent(BaseModel):
    addSheet: GoogleSheetsCreateSheetContent = Field(None, description="AddSheet request containing the sheet properties.")


class GoogleSheetsCreateSheetInput(BaseModel):
    spreadsheetId: str = Field(description="The ID of the target Google Sheets spreadsheet.")
    requests: list[GoogleSheetsAddSheetContent] = Field(description="List of sheet creation requests for the Google Sheets spreadsheet.")


class GoogleSheetsClearDatasheetInput(BaseModel):
    spreadsheetId: str = Field(description="The ID of the Google Sheets spreadsheet to clear.")
    sheetName: str = Field(description="The name of the sheet in Google Sheets to clear.")
    range: str = Field(description="The cell range in Google Sheets to be cleared (e.g., 'A1:B10').")


class GoogleSheetsRemoveidSheetContent(BaseModel):
    sheetId: int = Field(None, description="The ID of the sheet to delete.")


class GoogleSheetsRemoveSheetContent(BaseModel):
    deleteSheet: GoogleSheetsRemoveidSheetContent = Field(None, description="DeleteSheet operation with target sheet ID.")


class GoogleSheetsRemoveSheetInput(BaseModel):
    spreadsheetId: str = Field(description="The ID of the Google Sheets spreadsheet.")
    requests: list[GoogleSheetsRemoveSheetContent] = Field(description="Delete sheet requests for the Google Sheets spreadsheet.")


class GoogleSheetsDimensionRangeContent(BaseModel):
    sheetId: int = Field(None, description="The ID of the sheet to delete from.")
    dimension: str = Field(None, description="The dimension to delete: 'ROWS' or 'COLUMNS'.")
    startIndex: int = Field(None, description="The start index of the range to delete (inclusive).")
    endIndex: int = Field(None, description="The end index of the range to delete (exclusive).")


class GoogleSheetsDeleteDimensionContent(BaseModel):
    range: GoogleSheetsDimensionRangeContent = Field(None, description="Range of rows or columns to delete.")


class GoogleSheetsDeleteDimensionRequest(BaseModel):
    deleteDimension: GoogleSheetsDeleteDimensionContent = Field(None, description="DeleteDimension request for rows or columns.")


class GoogleSheetsDeleteColOrRowSheetInput(BaseModel):
    spreadsheetId: str = Field(description="The ID of the Google Sheets spreadsheet.")
    requests: list[GoogleSheetsDeleteDimensionRequest] = Field(description="Requests to delete rows or columns from a Google Sheets sheet.")


class GoogleSheetsReadRowsSheetInput(BaseModel):
    spreadsheetId: str = Field(description="The ID of the Google Sheets spreadsheet to read data from.")
    sheetName: str = Field(description="The name of the sheet in Google Sheets to read data from.")
    range: Optional[str] = Field(None, description="Cell range to read from the Google Sheets sheet (e.g., 'A1:C2').")
    majorDimension: Optional[str] = Field(None, description="Whether to read by 'ROWS' or 'COLUMNS' from the Google Sheets sheet.")


class GoogleSheetsUpdateRowsSheetInput(BaseModel):
    spreadsheetId: str = Field(description="The ID of the Google Sheets spreadsheet to update.")
    sheetName: str = Field(description="The name of the sheet in Google Sheets to update.")
    range: str = Field(description="Range of cells to update in the Google Sheets sheet (e.g., 'A1:C2').")
    values: list = Field(description="List of values to write to the specified range in the Google Sheets sheet.")


class GoogleSheetsAppendDataSheetInput(BaseModel):
    spreadsheetId: str = Field(description="The ID of the Google Sheets spreadsheet to append data to.")
    sheetName: str = Field(description="The name of the sheet in Google Sheets to append data to.")
    values: list = Field(description="List of rows to append to the Google Sheets sheet.")


@mcp.tool()
async def googleSheets_create_spreadsheet(params: GoogleSheetsCreateSpreadSheetInput) -> str:
    """
    Create a new Google Sheets spreadsheet.
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLESHEETS_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLESHEETS_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLESHEETS_EXPIREY")}","scope": "{os.environ.get("GOOGLESHEETS_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLESHEETS_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLESHEETS_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleSheets.googleSheets_create_spreadsheet(creds=creds, API_SERVICE_NAME="sheets", API_VERSION="v4", params=params)
        return "Google Sheet created Sheet successfully"
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def googleSheets_create_sheet(params: GoogleSheetsCreateSheetInput) -> str:
    """
    create sheet googleSheet
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLESHEETS_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLESHEETS_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLESHEETS_EXPIREY")}","scope": "{os.environ.get("GOOGLESHEETS_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLESHEETS_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLESHEETS_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleSheets.googleSheets_create_sheet(creds=creds, API_SERVICE_NAME="sheets", API_VERSION="v4", params=params)
        return "Google Sheet created Sheet successfully" 
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def googleSheets_clear_data_from_sheet(params: GoogleSheetsClearDatasheetInput) -> str:
    """
    Clear Data Sheet googleSheet
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLESHEETS_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLESHEETS_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLESHEETS_EXPIREY")}","scope": "{os.environ.get("GOOGLESHEETS_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLESHEETS_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLESHEETS_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleSheets.googleSheets_clear_data_from_sheet(creds=creds, API_SERVICE_NAME="sheets", API_VERSION="v4", params=params)
        return "Google Sheet Clear Data Sheets Successfully" 
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def googleSheets_remove_sheet(params: GoogleSheetsRemoveSheetInput) -> str:
    """
    Delete Sheet googleSheet
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLESHEETS_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLESHEETS_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLESHEETS_EXPIREY")}","scope": "{os.environ.get("GOOGLESHEETS_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLESHEETS_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLESHEETS_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleSheets.googleSheets_remove_sheet(creds=creds, API_SERVICE_NAME="sheets", API_VERSION="v4", params=params)
        return "Google Sheet Deleted Sheets Successfully" 
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def googleSheets_delete_ColOrRow_from_sheet(params: GoogleSheetsDeleteColOrRowSheetInput) -> str:
    """
    Delete Col Or Row from sheet googleSheet
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLESHEETS_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLESHEETS_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLESHEETS_EXPIREY")}","scope": "{os.environ.get("GOOGLESHEETS_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLESHEETS_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLESHEETS_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleSheets.googleSheets_delete_ColOrRow_from_sheet(creds=creds, API_SERVICE_NAME="sheets", API_VERSION="v4", params=params)
        return "Google Sheet Deleted Col or Row Successfully" 
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def googleSheets_read_rows_in_sheet(params: GoogleSheetsReadRowsSheetInput) -> dict:
    """
    get row in sheet googleSheet
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLESHEETS_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLESHEETS_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLESHEETS_EXPIREY")}","scope": "{os.environ.get("GOOGLESHEETS_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLESHEETS_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLESHEETS_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleSheets.googleSheets_read_rows_in_sheet(creds=creds, API_SERVICE_NAME="sheets", API_VERSION="v4", params=params)
        return response 
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def googleSheets_update_rows_in_sheet(params: GoogleSheetsUpdateRowsSheetInput) -> str:
    """
    Update Row from sheet googleSheet
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLESHEETS_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLESHEETS_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLESHEETS_EXPIREY")}","scope": "{os.environ.get("GOOGLESHEETS_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLESHEETS_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLESHEETS_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleSheets.googleSheets_update_rows_in_sheet(creds=creds, API_SERVICE_NAME="sheets", API_VERSION="v4", params=params)
        return "Google Sheet Updated Row Successfully" 
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def googleSheets_append_data_to_sheet(params: GoogleSheetsAppendDataSheetInput) -> str:
    """
    Append Data sheet googleSheet
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLESHEETS_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLESHEETS_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLESHEETS_EXPIREY")}","scope": "{os.environ.get("GOOGLESHEETS_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLESHEETS_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLESHEETS_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleSheets.googleSheets_append_data_to_sheet(creds=creds, API_SERVICE_NAME="sheets", API_VERSION="v4", params=params)
        return "Google Sheet Append Data Successfully" 
    except Exception as e:
        raise Exception(e)
    

if __name__ == "__main__":
    mcp.run()