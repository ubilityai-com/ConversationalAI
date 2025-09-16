import psycopg2
from psycopg2 import OperationalError
import json, datetime, decimal

def create_connection(creds):
    try:
        con = psycopg2.connect(
            host=creds["host"],
            database=creds["database"],
            user=creds["username"],
            password=creds["password"],
            port=creds['port'],
            sslmode = creds.get("sslMode","disable")
        )
        return con
    except OperationalError as error:
        raise Exception(f"Error while connecting to postgreSQL: {error}")
    
def fetch_data_as_dict(cursor):
    """
    Fetch data from the cursor and convert it to a list of dictionaries.
    
    :param cursor: psycopg2 cursor object.
    :return: List of dictionaries where each dictionary represents a row of data.
    :rtype: list
    """
    column_names = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()
    
    result = []
    for row in rows:
        row_dict = dict(zip(column_names, row))
        result.append(row_dict)
    
    return result


def format_data(record):
    """
    Format data in the record to ensure it is JSON serializable.
    
    :param record: Dictionary representing a row of data.
    :return: Dictionary with formatted fields.
    :rtype: dict
    """
    formatted_record = {}
    for key, value in record.items():
        if isinstance(value, datetime.datetime):
            formatted_record[key] = value.strftime("%Y-%m-%d %H:%M:%S %z")
        elif isinstance(value, datetime.date):
            formatted_record[key] = value.strftime("%Y-%m-%d")
        elif isinstance(value, decimal.Decimal):
            formatted_record[key] = float(value)  
        elif isinstance(value, bytes):
            formatted_record[key] = value.decode('utf-8')  
        elif isinstance(value, set):
            formatted_record[key] = list(value)  
        elif isinstance(value, (int, float, str, bool)) or value is None:
            formatted_record[key] = value  
        else:
            formatted_record[key] = str(value) 
            
    return formatted_record


def postgres_execute_custom_query(json_cred, params, **kwargs):
    """
    Execute a custom SQL query in a PostgreSQL database.

    :param creds: Dictionary containing PostgreSQL database credentials.
    :type creds: dict
    :param params: Dictionary containing parameters.

        - :query: (str, required) - The custom SQL query to be executed.

    :return: Result of the query execution or a message indicating success.
    :rtype: list or str
    :raises Exception: If there is an issue with the PostgreSQL database or missing input data.
    """
    cursor = None
    con = None
    try:
        credentials=json.loads(json_cred)
        con = create_connection(credentials)
        cursor = con.cursor()
        
        if "query" not in params or not params['query']:
            raise Exception("Missing or empty query")
        query = params["query"]
        cursor.execute(query)
        if query.strip().upper().startswith(("INSERT", "UPDATE", "DELETE")):
            con.commit()
            return "Query executed successfully"
        else:
            result = fetch_data_as_dict(cursor)
            result = [format_data(record) for record in result]
            return result
        
    except Exception as e:
        return {"Error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if con:
            con.close()




operations = {
    'Custom Query':postgres_execute_custom_query
}