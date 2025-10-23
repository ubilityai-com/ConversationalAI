import aiohttp, json

status = [200, 201, 202, 204, 206, 207, 208]

async def excel_refresh_token(creds):
    try:
        cred = json.loads(creds)
        token_endpoint = "https://login.microsoftonline.com/common/oauth2/v2.0/token"
        request_body = {
            "client_id": cred["clientId"],
            "client_secret": cred["clientSecret"],
            "scope": " ".join(
                ["https://graph.microsoft.com/.default"] + ["offline_access"]
            ),
            "refresh_token": cred["refreshToken"],
            "grant_type": "refresh_token",
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(token_endpoint, data=request_body) as response:
                response.raise_for_status()
                result = await response.json()
                if "access_token" in result and response.status in status:
                    return result["access_token"]
                else:
                    raise Exception(
                        f"Token request failed with status code {response.status}: {await response.text()}"
                    )
    except aiohttp.ClientError as e:
        raise Exception(e)
    except Exception as e:
        raise Exception(e)


#################################################################################################


async def excel_get_many_workbooks(json_cred, params, **kwargs):
    """
    Retrieve information about Excel workbooks using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)


    :return: Information about the Excel workbooks obtained from the Microsoft Graph API.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if accessToken:
            search_endpoint = (
                "https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')"
            )
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {accessToken}",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(search_endpoint, headers=headers) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_get_many_worksheets(json_cred, params, **kwargs):
    """
    Retrieve information about worksheets in a specific Excel workbook using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)


    :return: Information about the worksheets in the specified Excel workbook obtained from the Microsoft Graph API.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if "workbookId" in params and accessToken:
            graph_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {accessToken}",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(graph_endpoint, headers=headers) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_add_worksheet_to_workbook(json_cred, params, **kwargs):
    """
    Add a new worksheet to a specific Excel workbook using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - name (str): Name of the new worksheet. (optional)


    :return: Information about the added worksheet obtained from the Microsoft Graph API.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if accessToken and "workbookId" in params:
            worksheet_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {accessToken}",
            }
            data = {}
            if "name" in params:
                data["name"] = params["name"]
                
            async with aiohttp.ClientSession() as session:
                async with session.post(worksheet_endpoint, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_delete_workbook(json_cred, params, **kwargs):
    """
    Delete a specific Excel workbook using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)


    :return: Success message indicating that the workbook has been deleted.
    :rtype: str
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if accessToken and "workbookId" in params:
            workbook_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {accessToken}",
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(workbook_endpoint, headers=headers) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return {"Message": "Workbook deleted successfully."}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_delete_worksheet(json_cred, params, **kwargs):
    """
    Delete a specific worksheet from an Excel workbook using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet to be deleted. (required)


    :return: Success message indicating that the worksheet has been deleted.
    :rtype: str
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if accessToken and "workbookId" in params and "worksheetId" in params:
            worksheet_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {accessToken}",
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(worksheet_endpoint, headers=headers) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return {"Message": "Worksheet deleted successfully."}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_clear_worksheet(json_cred, params, **kwargs):
    """
    Clear data from a specified range or the entire worksheet in an Excel workbook using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet to be cleared. (required)
        - applyTo (str): Specifies what to clear, e.g., Formats or Contents. (required)
        - range (str): Address of the range to be cleared. If not provided, the entire worksheet is cleared. (optional)


    :return: Success message indicating that the worksheet has been cleared.
    :rtype: str
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if accessToken and "workbookId" in params and "worksheetId" in params:
            if "range" in params:
                range = params["range"]
                worksheet_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/range(address='{range}')/clear"
            else:
                worksheet_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/range/clear"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            data = {}
            if "applyTo" in params:
                data["applyTo"] = params["applyTo"]
            async with aiohttp.ClientSession() as session:
                async with session.post(worksheet_endpoint, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return {"Message": "Worksheet cleared successfully."}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_get_rows_from_worksheet(json_cred, params, **kwargs):
    try:
        accessToken = await excel_refresh_token(json_cred)
        if accessToken and "workbookId" in params and "worksheetId" in params:
            graph_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {accessToken}",
            }
            if "range" in params:
                range = params["range"]
                graph_endpoint += f"/range(address='{range}')"
            else:
                graph_endpoint += f"/usedRange"
            async with aiohttp.ClientSession() as session:
                async with session.get(graph_endpoint, headers=headers) as response:
                    response.raise_for_status()
                    rows = await response.json()
                    if response.status in status:
                        final_rows = {}
                        if "values" in rows and "address" in rows:
                            if rows["values"]:
                                final_rows["address"] = rows["address"]
                                final_rows["values"] = rows["values"]
                            else:
                                final_rows["address"] = rows["address"]
                                final_rows["values"] = []
                        else:
                            raise Exception("'values' or 'address' not in response")
                        return final_rows
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_get_all_rows_in_table(json_cred, params, **kwargs):
    """
    Retrieve all rows from a specified table in an Excel workbook using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet containing the table. (required)
        - tableID (str): ID of the table from which to retrieve rows. (required)
        - limit (str): Limit the number of rows to retrieve (optional).


    :return: JSON data containing information about the retrieved rows.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if (
            accessToken
            and "workbookId" in params
            and "worksheetId" in params
            and "tableID" in params
        ):
            rows_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/tables/{params['tableID']}/rows"
            if "limit" in params:
                rows_endpoint += f"?$top={params['limit']}"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(rows_endpoint, headers=headers) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_get_all_columns_in_table(json_cred, params, **kwargs):
    """
    Retrieve all columns from a specified table in an Excel workbook using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet containing the table. (required)
        - tableID (str): ID of the table from which to retrieve columns. (required)
        - limit (str): Limit the number of columns to retrieve (optional).


    :return: JSON data containing information about the retrieved columns.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if (
            accessToken
            and "workbookId" in params
            and "worksheetId" in params
            and "tableID" in params
        ):
            columns_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/tables/{params['tableID']}/columns"
            if "limit" in params:
                columns_endpoint += f"?$top={params['limit']}"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(columns_endpoint, headers=headers) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_add_table(json_cred, params, **kwargs):
    """
    Add a table to a specified range in an Excel worksheet using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet to which the table will be added. (required)
        - address (str): Address of the range to be converted into a table (e.g., 'D3:F4'). (required)
        - hasHeaders (bool): Indicates whether the table has header. (optional)


    :return: JSON data containing information about the added table.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if (
            accessToken
            and "workbookId" in params
            and "worksheetId" in params
            and "address" in params
        ):
            table_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/tables/add"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            data = {}
            if "hasHeaders" in params:
                data["hasHeaders"] = params["hasHeaders"]
            if "address" in params:
                data["address"] = params["address"]
            async with aiohttp.ClientSession() as session:
                async with session.post(table_endpoint, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_delete_table(json_cred, params, **kwargs):
    """
    Delete a table from a specified worksheet in an Excel workbook using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet containing the table. (required)
        - tableID (str): ID of the table to be deleted. (required)


    :return: Message indicating the success of the table deletion.
    :rtype: str
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if (
            accessToken
            and "workbookId" in params
            and "worksheetId" in params
            and "tableID" in params
        ):
            table_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/tables/{params['tableID']}"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(table_endpoint, headers=headers) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return {"Message": "Table Deleted successfully."}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_append_rows_table(json_cred, params, **kwargs):
    """
    Append rows to a specified table in an Excel worksheet using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet containing the table. (required)
        - tableID (str): ID of the table to which rows will be appended. (required)
        - type (str): Type of data to append ('raw' or 'columns'). (required)
        - columnsid (list): List of column IDs for the 'columns' type. (required for 'columns' type)
        - value (list): List of values corresponding to column for 'columns' type. (required for 'columns' type)
        - values (list): List of lists containing row values for 'raw' type. (required for 'raw' type)
        - index (int): Index at which to append the rows. (optional)


    :return: Information about the appended rows.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if (
            accessToken
            and "workbookId" in params
            and "worksheetId" in params
            and "tableID" in params
        ):
            table_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/tables/{params['tableID']}/rows"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            async with aiohttp.ClientSession() as session:
                data = {}
                if params["type"] == "columns":
                    columns_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/tables/{params['tableID']}/columns"
                    
                    async with session.get(columns_endpoint, headers=headers) as res:
                        res.raise_for_status()
                        if res.status in status:
                            columns_data = await res.json()
                            column_count = len(columns_data["value"])
                            if "value" in params:
                                new_values_list = [None] * column_count
                                for i in range(len(params["columnsid"])):
                                    col_id = params["columnsid"][i]
                                    value = params["value"][i]
                                    index_to_update = int(col_id) - 1
                                    new_values_list[index_to_update] = value
                                data["values"] = []
                                data["values"].append(new_values_list)
                        raise Exception(
                            f"Status Code: {res.status}. Response: {await res.text()}"
                        )
                
                if "index" in params:
                    data["index"] = params["index"]
                if "values" in params:
                    data["values"] = params["values"]

                async with session.post(table_endpoint, headers=headers,json=data) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_convert_table_to_range(json_cred, params, **kwargs):
    """
    Convert a table in an Excel worksheet to a range using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet containing the table. (required)
        - tableID (str): ID of the table to be converted. (required)


    :return: Information about the converted table range.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if (
            accessToken
            and "workbookId" in params
            and "worksheetId" in params
            and "tableID" in params
        ):
            endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/tables/{params['tableID']}/range"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(endpoint, headers=headers) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_lookup_table(json_cred, params, **kwargs):
    """
    Lookup data in a table in an Excel worksheet using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet containing the table. (required)
        - tableID (str): ID of the table to perform the lookup. (required)
        - columnValue (str): Name of the column to search for. (required)
        - rowvalue (str): Value to search for in the specified column. (required)
        - returnAll (bool): Flag indicating whether to return all matching rows or only the first. (optional)


    :return: List of matching rows if returnAll is True, otherwise a single row or an error message.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if (
            accessToken
            and "workbookId" in params
            and "worksheetId" in params
            and "tableID" in params
            and "columnValue" in params
            and "rowvalue" in params
        ):
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            columns_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/tables/{params['tableID']}/columns"
            async with aiohttp.ClientSession() as session:
                async with session.get(columns_endpoint, headers=headers) as res:
                    res.raise_for_status()
                    if res.status in status:
                        columns_data = await res.json()
                        column_index = None
                        for i, column in enumerate(columns_data["value"]):
                            if column["name"] == params["columnValue"]:
                                column_index = i
                                break
                        if column_index is not None:
                            index = None
                            rows = []
                            for j, cell_value in enumerate(
                                columns_data["value"][column_index]["values"]
                            ):
                                if params["rowvalue"] in cell_value and j != 0:
                                    index = j
                                    table_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/tables/{params['tableID']}/rows/ItemAt(index={index-1})"
                                    
                                    async with session.get(table_endpoint, headers=headers) as response:
                                        response.raise_for_status()
                                        if response.status in status:
                                            rows.append(await response.json())
                                            if params["returnAll"] == False:
                                                return rows
                                        raise Exception(
                                            f"Status Code: {response.status}. Response: {await response.text()}"
                                        )
                            if index is None:
                                raise Exception("Row not found.")
                            if params["returnAll"] == True:
                                return rows
                        else:
                            raise Exception("Column not found.")
                    raise Exception(
                        f"Status Code: {res.status}. Response: {await res.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_update_sheet_range(json_cred, params, **kwargs):
    """
    Update a range in an Excel worksheet using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet containing the range. (required)
        - range (str): Range to update (e.g., "A1:B1"). (required)
        - values (list): List of lists containing values to update in the specified range. (required)


    :return: Information about the updated range.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if (
            accessToken
            and "workbookId" in params
            and "worksheetId" in params
            and "range" in params
            and "values" in params
        ):
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            update_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/range(address='{params['range']}')"
            data = {"values": params["values"]}
            
            async with aiohttp.ClientSession() as session:
                async with session.patch(update_endpoint, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_insert_range(json_cred, params, **kwargs):
    """
    Insert a range in an Excel worksheet using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str): ID of the Excel workbook. (required)
        - worksheetId (str): ID of the worksheet where the range will be inserted. (required)
        - range (str): Range to insert (e.g., "A1:B1"). (required)
        - shift (str): Direction to shift cells. Possible values: "down", "right". (required)
        - values (list): List of lists containing values to update in the specified range. (optional)


    :return: Information about the inserted range.
    :rtype: dict
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if (
            accessToken
            and "workbookId" in params
            and "worksheetId" in params
            and "range" in params
            and "shift" in params
        ):
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            insert_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/range(address='{params['range']}')/insert"
            data = {"shift": params["shift"]}
            async with aiohttp.ClientSession() as session:
                async with session.post(insert_endpoint, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if "values" in params:
                        update_endpoint = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/range(address='{params['range']}')"
                        data = {"values": params["values"]}
                        async with session.patch(update_endpoint, headers=headers, json=data) as response2:
                            response2.raise_for_status()
                            if response2.status in status:
                                return await response2.json()
                            raise Exception(
                                f"Status Code: {response2.status}. Response: {await response2.text()}"
                            )
                    else:
                        if response.status in status:
                            return await response.json()
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def excel_get_cell_content(json_cred, params, **kwargs):
    """
    Get the values of the cell in an Excel worksheet using Microsoft Graph API.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - workbookId (str, Required): ID of the Excel workbook.
        - worksheetId (str, Required): ID of the worksheet containing the range.
        - row (int, Required): Row number of the cell to be retrieved. Zero-indexed.
        - column (int, Required): Column number of the cell to be retrieved. Zero-indexed.


    Returns:
        dict: dictionary containing the value of the cell as well as other relative information
    """
    try:
        accessToken = await excel_refresh_token(json_cred)
        if (
            accessToken
            and "workbookId" in params
            and "worksheetId" in params
            and "row" in params
            and "column" in params
        ):
            headers = {"Authorization": f"Bearer {accessToken}"}
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{params['workbookId']}/workbook/worksheets/{params['worksheetId']}/cell(row={params['row']},column={params['column']})"

            async with aiohttp.ClientSession() as session:
                async with session.get(graph_api_url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )

        else:
            raise Exception("Missing parameters")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


operations = {
    "Get Many Workbooks": excel_get_many_workbooks,
    "Get Many Worksheets": excel_get_many_worksheets,
    "Add Worksheet": excel_add_worksheet_to_workbook,
    "Delete Workbook": excel_delete_workbook,
    "Delete Worksheet": excel_delete_worksheet,
    "Clear Sheet": excel_clear_worksheet,
    "Get Rows": excel_get_rows_from_worksheet,
    "Get Many Rows": excel_get_all_rows_in_table,
    "Get Many Columns": excel_get_all_columns_in_table,
    "Add Table": excel_add_table,
    "Delete Table": excel_delete_table,
    "Append Rows": excel_append_rows_table,
    "Convert To Range": excel_convert_table_to_range,
    "Lookup": excel_lookup_table,
    "Update Sheet": excel_update_sheet_range,
    "Append": excel_insert_range,
    "Get Cell Content": excel_get_cell_content,
}
