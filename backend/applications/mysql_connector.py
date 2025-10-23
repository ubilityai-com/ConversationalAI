import time,json,datetime,decimal,base64
import mysql.connector
from mysql.connector import errorcode


def create_connection(credentials):
    """
    Create a connection object to a MySQL database using the provided credentials.

    :credentials: A dictionary containing connection parameters.
    
    - :host: (str, required) - The hostname or IP address of the MySQL server.
    - :port: (int, required) - The port number on which the MySQL server is listening.
    - :user: (str, required) - The username for authenticating with the MySQL server.
    - :password: (str, required) - The password for authenticating with the MySQL server.
    - :database: (str, required) - The name of the MySQL database to connect to.
    - :connection_timeout: (int) - Timeout for the database connection (default: None).
    - :sslEnabled: (str) - Enable SSL connection (options: 'True' or 'False', default: 'False').
    - :sslCa: (str) - Path to the CA certificate file for SSL connection (required if SSL is enabled).
    - :sslCert: (str) - Path to the client certificate file for SSL connection (required if SSL is enabled).
    - :sslKey: (str) - Path to the client key file for SSL connection (required if SSL is enabled).
    - :sshEnabled: (str) - Enable SSH tunneling (options: 'True' or 'False', default: 'False').
    - :sshHost: (str) - The hostname or IP address of the SSH server (required if SSH is enabled).
    - :sshPort: (int) - The port number on which the SSH server is listening (default: 22).
    - :sshMysqlPort: (int) - The port number on which the MySQL server is available through the SSH tunnel (default: 3306).
    - :sshUser: (str) - The username for authenticating with the SSH server (required if SSH is enabled).
    - :sshAuthenticateWith: (str) - SSH authentication method (options: 'Password' or 'Private Key', required if SSH is enabled).
    - :sshPassword: (str) - The password for SSH authentication (required if SSH authentication method is 'Password').
    - :sshPrivateKey: (str) - Path to the private key file for SSH authentication (required if SSH authentication method is 'Private Key').
    - :sshPassphrase: (str) - Passphrase for the private key file (required if SSH authentication method is 'Private Key').

    :return: A MySQL connection object.
    :rtype: mysql.connector.connection.MySQLConnection

    :raises Exception: If there's an issue with the input data or if an error occurs during connection setup.

    Example:
    ::
        credentials = {
            "host": "localhost",
            "port": 3306,
            "user": "your_username",
            "password": "your_password",
            "database": "your_database",
            "connection_timeout": 10,
            "sslEnabled": "True",
            "sslCa": "/path/to/ca.crt",
            "sslCert": "/path/to/client.crt",
            "sslKey": "/path/to/client.key",
            "sshEnabled": "True",
            "sshHost": "ssh_server_host",
            "sshPort": 22,
            "sshMysqlPort": 3306,
            "sshUser": "ssh_username",
            "sshAuthenticateWith": "Password",
            "sshPassword": "ssh_password",
        }
        connection = create_connection(credentials)
    """
    try:
        if (
            "host" in credentials
            and "database" in credentials
            and "user" in credentials
            and "password" in credentials
            and "port" in credentials
        ):
            if not credentials.get("connection_timeout", None):
                credentials["connection_timeout"] = int(credentials.pop(
                    "connectionTimeout", None
                ))
            else: 
                credentials.pop("connectionTimeout", None)
            credentials["port"] = int(credentials.get("port", 3306))
            credentials["ssl_ca"] = credentials.pop("sslCa", None)
            credentials["ssl_cert"] = credentials.pop("sslCert", None)
            credentials["ssl_key"] = credentials.pop("sslKey", None)
            ignore_keys = [
                "sshEnabled",
                "sshHost",
                "sshPort",
                "sshMysqlPort",
                "sshUser",
                "sshAuthenticateWith",
                "sshPassword",
                "sshPrivateKey",
                "sshPassphrase",
                "Type",
            ]

            if credentials.get("sslEnabled", "False") == "True":
                ignore_keys.append("sslEnabled")
                credentials["ssl_disabled"] = False
                if not (
                    credentials.get("ssl_ca", None)
                    and credentials.get("ssl_cert", None)
                    and credentials.get("ssl_key", None)
                ):
                    raise Exception("Missing Input for SSL Connection!")
            else:
                ignore_keys.extend(["sslEnabled", "ssl_ca", "ssl_cert", "ssl_key"])

            config = {
                key: value
                for (key, value) in credentials.items()
                if value
                if key not in ignore_keys
            }
            attempt = 1
            attempts = 3
            delay = 2
            while attempt < attempts + 1:
                try:
                    cnx = mysql.connector.connect(**config)
                except IOError as e:
                    if attempts is attempt:
                        raise Exception(f"Error creating connection: {e}")
                    time.sleep(delay**attempt)
                    attempt += 1
                except mysql.connector.Error as err:
                    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                        raise Exception(f"Something is wrong with your Credentials: {err}")
                    elif err.errno == errorcode.ER_BAD_DB_ERROR:
                        raise Exception("Database does not exist")
                    else:
                        raise Exception(err)
                else:
                    return cnx
                
        else:
            raise Exception("Missing Connection Required Parameter")
    except Exception as e:
        raise Exception(f"Error Creating Connection: {e}")


def operation_priority(query_priority):
    """
    Determine operation priority based on the input.

    :param str query_priority: Priority level for the query operation (options: 'low' or 'high').

    :return: A string representing the operation priority.
    :rtype: str

    :raises ValueError: If an invalid priority level is provided.

    Example:
    ::
        query_priority = "low"
        priority = operation_priority(query_priority)
        print(priority)  # Output: "LOW_PRIORITY"
    """
    if query_priority == "low":
        priority = "LOW_PRIORITY "
    elif query_priority == "high":
        priority = "HIGH_PRIORITY "
    else:
        priority = ""
    return priority


def cnx_timeout_and_pool_size(credentials, connection_timeout, pool_size):
    """
    Add new connection timeout and pool size to the provided credentials.

    :param dict credentials: A dictionary containing existing connection parameters.
    :param int connection_timeout: New connection timeout value to be added (default: None).
    :param int pool_size: New pool size value to be added (default: None).

    :return: Updated credentials with new connection timeout and pool size.
    :rtype: dict
    """
    credentials = json.loads(credentials)
    if connection_timeout:
        credentials["connection_timeout"] = connection_timeout
    if pool_size:
        credentials["pool_size"] = pool_size
    return credentials


def raise_exception_or_rollback(choice, cnx, e, response, queries):
    """
    Perform either a rollback or raise an exception based on the provided choice.

    :param str choice: The action to be taken ("roll" for rollback, "raise" for raising an exception).
    :param mysql.connector.connection.MySQLConnection cnx: The MySQL connection object.
    :param Exception e: The exception that occurred during query execution.
    :param dict response: The response dictionary to be updated.
    :param list queries: The list of queries that were executed.

    :return: Updated response dictionary.
    :rtype: dict

    :raises Exception: If 'choice' is 'raise', an exception is raised with details of the SQL error.
    """
    if choice == "roll":
        try:
            cnx.rollback()
            response["Query_failed"] = "performed rollback due to a query's failure"
        except Exception as e:
            raise Exception(f"Database Error: {e} ///// queries: {queries}")
    elif choice == "raise":
        raise Exception(f"SQL Error: {e} ///// queries: {queries}")
    return response


def query_exec_info_insert(i, cnx, cursor, query, values):
    """
    Return a dictionary containing information about the executed insert query.

    :param int i: The index of the insert query.
    :param mysql.connector.connection.MySQLConnection cnx: The MySQL connection object.
    :param mysql.connector.cursor.MySQLCursor cursor: The MySQL cursor object.
    :param str query: The insert query.
    :param tuple values: The values used in the insert query.

    :return: A dictionary containing information about the executed insert query.
    :rtype: dict
    """
    connection_info = {
        "connection_id": cnx.connection_id,
        "server_version": cnx.get_server_info(),
    }

    query_info = {
        "affected_rows": cursor.rowcount,
        "last_insert_id": cursor.lastrowid,
        "warnings": cursor.fetchwarnings(),
    }

    return {
        "query_index": i,
        "query": query,
        "values": values,
        "connection_info": connection_info,
        "query_info": query_info,
    }


def query_exec_info_update(i, cnx, cursor, query, values):
    """
    Return a dictionary containing information about the executed update query.

    :param int i: Index of the update query in the batch.
    :param mysql.connector.connection.MySQLConnection cnx: MySQL database connection object.
    :param mysql.connector.cursor.MySQLCursor cursor: MySQL cursor object.
    :param str query: Executed update query.
    :param tuple values: Values used in the update query.
    
    :return: A dictionary containing information about the executed update query.
    :rtype: dict
    """

    connection_info = {
        "connection_id": cnx.connection_id,
        "server_version": cnx.get_server_info(),
    }

    query_info = {
        "affected_rows": cursor.rowcount,
        "warnings": cursor.fetchwarnings(),
    }

    return {
        "query_index": i,
        "query": query,
        "values": values,
        "connection_info": connection_info,
        "query_info": query_info,
    }


def query_exec_info_delete(i, cnx, cursor, query):
    """
    Return a dictionary containing information about the executed delete query.

    :param int i: The index of the delete query.
    :param mysql.connector.connection.MySQLConnection cnx: The MySQL connection object.
    :param mysql.connector.cursor.MySQLCursor cursor: The MySQL cursor object.
    :param str query: The delete query.

    :return: A dictionary containing information about the executed delete query.
    :rtype: dict
    """
    connection_info = {
        "connection_id": cnx.connection_id,
        "server_version": cnx.get_server_info(),
    }

    query_info = {
        "affected_rows": cursor.rowcount,
        "warnings": cursor.fetchwarnings(),
    }

    return {
        "query_index": i,
        "query": query,
        "connection_info": connection_info,
        "query_info": query_info,
    }


def query_exec_info_delete_row(i, cnx, cursor, query, values):
    """
    Return a dictionary containing information about the executed delete row query.

    :param int i: The index of the delete row query.
    :param mysql.connector.connection.MySQLConnection cnx: The MySQL connection object.
    :param mysql.connector.cursor.MySQLCursor cursor: The MySQL cursor object.
    :param str query: The delete row query.
    :param tuple values: The values used in the delete row query.

    :return: A dictionary containing information about the executed delete row query.
    :rtype: dict
    """
    connection_info = {
        "connection_id": cnx.connection_id,
        "server_version": cnx.get_server_info(),
    }

    query_info = {
        "affected_rows": cursor.rowcount,
        "warnings": cursor.fetchwarnings(),
    }

    return {
        "query_index": i,
        "query": query,
        "values": values,
        "connection_info": connection_info,
        "query_info": query_info,
    }


def query_exec_info_select(i, cnx, cursor, *query_group):
    """
    Return a dictionary containing information about the executed select query.

    :param int i: The index of the select query.
    :param mysql.connector.connection.MySQLConnection cnx: The MySQL connection object.
    :param mysql.connector.cursor.MySQLCursor cursor: The MySQL cursor object.
    :param tuple query_group: A variable-length argument containing the select query and optional values.

    :return: A dictionary containing information about the executed select query.
    :rtype: dict
    """
    query = query_group[0]
    if len(query_group) > 1:
        values = query_group[1]
    else:
        values = []

    connection_info = {
        "connection_id": cnx.connection_id,
        "server_version": cnx.get_server_info(),
    }

    query_info = {
        "affected_rows": cursor.rowcount,
        "warnings": cursor.fetchwarnings(),
    }

    return {
        "query_index": i,
        "query": query,
        "conditions_values": values,
        "connection_info": connection_info,
        "query_info": query_info,
    }


def query_exec_info_execute_sql(i, cnx, cursor, *query_group):
    """
    Return a dictionary containing information about the executed SQL query.

    :param int i: The index of the executed query.
    :param mysql.connector.connection.MySQLConnection cnx: The MySQL connection object.
    :param mysql.connector.cursor.MySQLCursor cursor: The MySQL cursor object.
    :param tuple query_group: A variable-length argument containing the SQL query and optional values.

    :return: A dictionary containing information about the executed SQL query.
    :rtype: dict
    """
    query = query_group[0]
    if len(query_group) > 1:
        values = query_group[1]
    else:
        values = []

    connection_info = {
        "connection_id": cnx.connection_id,
        "server_version": cnx.get_server_info(),
    }

    query_info = {
        "affected_rows": cursor.rowcount,
        "last_insert_id": cursor.lastrowid,
        "warnings": cursor.fetchwarnings(),
    }

    return {
        "query_index": i,
        "query": query,
        "values": values,
        "connection_info": connection_info,
        "query_info": query_info,
    }


def query_exec_info(
    operation,
    *args,
):
    """
    Choose the function to use depending on the type of the query and return information about the executed query.

    :param str operation: The type of SQL operation ("insert", "update", "delete", "delete_row", "select", "execute_sql").
    :param args: Variable-length arguments for the corresponding operation function.

    :return: A dictionary containing information about the executed query.
    :rtype: dict

    :raises Exception: If an unsupported or wrong operation is provided.
    """
    if operation == "insert":
        return query_exec_info_insert(*args)
    elif operation == "update":
        return query_exec_info_update(*args)
    elif operation == "delete":
        return query_exec_info_delete(*args)
    elif operation == "delete_row":
        return query_exec_info_delete_row(*args)
    elif operation == "select":
        return query_exec_info_select(*args)
    elif operation == "execute_sql":
        return query_exec_info_execute_sql(*args)

    else:
        raise Exception(f"Wrong operation: {operation}")


def execute_queries(
    cnx,
    cursor,
    response,
    queries,
    query_batching,
    skip_on_conflict,
    operation,
    output_details,
):
    """
    Execute a batch of SQL queries and handle transaction and error scenarios.

    :param mysql.connector.connection.MySQLConnection cnx: The MySQL connection object.
    :param mysql.connector.cursor.MySQLCursor cursor: The MySQL cursor object.
    :param dict response: A dictionary to store the response information.
    :param list queries: List of SQL query tuples (query, values).
    :param str query_batching: The type of query batching ("transaction" or "none").
    :param bool skip_on_conflict: Whether to skip insertion on conflict (applies to IntegrityError).
    :param str operation: The type of SQL operation ("insert", "update", "delete", "delete_row", "select", "execute_sql").
    :param bool output_details: Whether to include detailed information about query execution in the response.

    :return: A tuple containing the updated response, MySQL connection, and MySQL cursor.
    :rtype: tuple
    """
    choice = "raise"
    query_execution_info = {}

    try:
        if query_batching == "transaction":
            cnx.start_transaction()
            for i, query in enumerate(queries):
                cursor.execute(*query)
                if output_details:
                    query_execution_info[i] = query_exec_info(
                        operation, i, cnx, cursor, *query
                    )
            choice = "roll"

        else:
            for i, query in enumerate(queries):
                cursor.execute(*query)
                if output_details:
                    query_execution_info[i] = query_exec_info(
                        operation, i, cnx, cursor, *query
                    )

        cnx.commit()

    except mysql.connector.errors.IntegrityError as e:
        if "1062" in str(e) and skip_on_conflict:
            response["notes"] = "Skipped insertion due to conflict."
        else:
            response = raise_exception_or_rollback(choice, cnx, e, response, queries)
    except Exception as e:
        response = raise_exception_or_rollback(choice, cnx, e, response, queries)

    if output_details:
        response["query_execution_information"] = query_execution_info

    return (response, cnx, cursor)


def return_operator(condition_operator):
    """
    Return the SQL operator corresponding to the input condition operator.

    :param str condition_operator: The input condition operator.

    :return: The SQL operator corresponding to the input condition operator.
    :rtype: str

    :raises Exception: If the input condition operator is not recognized.
    """
    operator = ""
    if condition_operator == "equal":
        operator = " ="
    elif condition_operator == "not equal":
        operator = " <>"
    elif condition_operator == "like":
        operator = " LIKE"
    elif condition_operator == "greater than":
        operator = " >"
    elif condition_operator == "less than":
        operator = " <"
    elif condition_operator == "greater than or equal to":
        operator = " >="
    elif condition_operator == "less than or equal to":
        operator = " <="
    elif condition_operator == "is null":
        operator = " IS NULL"
    else:
        raise Exception("Operator not included")
    return operator


def condition_group_creator(combine_conditions, conditions):
    """
    Create a condition group for SQL queries based on input conditions.

    :param str combine_conditions: The logical operator to combine conditions ("and" or "or").
    :param list conditions: List of dictionaries representing individual conditions.

    :return: A tuple containing the SQL condition group and a list of corresponding values.
    :rtype: tuple

    :raises Exception: If the input combine_conditions value is not recognized.
    """
    combining_conditions = ""
    values = []
    condition_group = ""

    if combine_conditions == "and":
        combining_conditions = " AND "
    elif combine_conditions == "or":
        combining_conditions = " OR "
    else:
        raise Exception("Wrong Combine Conditions value")

    for i, condition in enumerate(conditions):
        operator = return_operator(condition.get("operator"))
        combine = ""
        value_representaion = " %" + "s"
        if i != 0:
            combine = combining_conditions

        if operator == " IS NULL":
            value_representaion = ""
        else:
            value = condition.get("value", None)
            values.append(value)

        combination_part = (
            combine + condition.get("column") + operator + value_representaion
        )

        condition_group += combination_part
    return (condition_group, values)


def mysql_execute_sql(json_cred, params, **kwargs):
    """
    Perform MySQL queries according to user input.

    :credentials: Dictionary containing MySQL connection parameters.
    :params: Dictionary containing parameters for the SQL execution.
    
    - :connection_timeout: (int, optional) - Connection timeout in seconds.
    - :pool_size: (int, optional) - Connection pool size.
    - :replace_empty_with_null: (bool, optional) - Replace empty string values with NULL in the query.
    - :output_details: (bool, optional) - Include detailed information about query execution in the response.
    - :query_batching: (str, optional) - The type of query batching ("transaction" or "none").
    - :queries_with_values: (list, required) - List of dictionaries containing queries and values to execute.
        Each dictionary should have "query" and "values" (optional) keys.

    :return: A dictionary containing the result of the SQL execution.
    :rtype: dict

    :raises Exception: If there is an error during the SQL execution or if required input data is missing.

    Example:
    ::
        credentials = {
            "host": "localhost",
            "user": "user",
            "password": "password",
            "database": "database",
            "port": 3306,
        }
        execute_sql_params = {
            "connection_timeout": 10,
            "pool_size": 5,
            "replace_empty_with_null": True,
            "output_details": True,
            "query_batching": "transaction",
            "queries_with_values": [
                {"query": "INSERT INTO example_table (id, name) VALUES (%s, %s);", "values": (1, "John")},
                {"query": "UPDATE example_table SET name = %s WHERE id = %s;", "values": ("Doe", 1)},
                {"query": "SELECT * FROM example_table WHERE id = %s;", "values": (1,)},
            ],
        }

        result = mysql_execute_sql(credentials, execute_sql_params)
        print(result)
        # Output: {'result': 'Operation Performed Successfully', 'query_execution_information': {0: {'query_index': 0, 'query': 'INSERT INTO example_table (id, name) VALUES (%s, %s);', 'values': (1, 'John'), 'connection_info': {'connection_id': 12345, 'server_version': '8.0.25'}, 'query_info': {'affected_rows': 1, 'last_insert_id': 123, 'warnings': None}}, 1: {'query_index': 1, 'query': 'UPDATE example_table SET name = %s WHERE id = %s;', 'values': ('Doe', 1), 'connection_info': {'connection_id': 12345, 'server_version': '8.0.25'}, 'query_info': {'affected_rows': 1, 'last_insert_id': None, 'warnings': None}}, 2: {'query_index': 2, 'query': 'SELECT * FROM example_table WHERE id = %s;', 'values': (1,), 'connection_info': {'connection_id': 12345, 'server_version': '8.0.25'}, 'query_info': {'affected_rows': 1, 'last_insert_id': None, 'warnings': None}}, 'result_rows': [[{'id': 1, 'name': 'Doe'}]]}}
    """
    try:
        response = {"result": "Operation Performed Successfully"}
        connection_timeout = params.get("connection_timeout", None)
        pool_size = params.get("pool_size", None)
        replace_empty_with_null = params.get("replace_empty_with_null", False)
        output_details = params.get("output_details", False)
        query_batching = params.get("query_batching", None)
        queries_with_values = params.get("queries_with_values", [])
        operation_type = "execute_sql"

        credentials = cnx_timeout_and_pool_size(
            json_cred, connection_timeout, pool_size
        )
        if queries_with_values:
            queries_to_execute = []

            for query_with_values in queries_with_values:
                query = query_with_values.get("query", "")
                query_values = query_with_values.get("values", [])
                if not query:
                    raise Exception("Missing Query in Input Data")
                if query_values:
                    if replace_empty_with_null:
                        values = []
                        for value in query_values:
                            if value == "":
                                values.append(None)
                            else:
                                values.append(value)
                    else:
                        values = query_with_values["values"]
                    queries_to_execute.append((query, tuple(values)))
                else:
                    queries_to_execute.append((query,))

            cnx = create_connection(credentials)
            cursor = cnx.cursor(dictionary=True, buffered=True)

            choice = "raise"
            query_execution_info = {}

            result_rows = []

            try:
                if query_batching == "transaction":
                    cnx.start_transaction()
                    for i, query in enumerate(queries_to_execute):
                        cursor.execute(*query)

                        if cursor.with_rows:
                            result_rows.append(cursor.fetchall())

                        if output_details:
                            query_execution_info[i] = query_exec_info(
                                operation_type, i, cnx, cursor, *query
                            )
                    choice = "roll"
                else:
                    for i, query in enumerate(queries_to_execute):
                        cursor.execute(*query)

                        if cursor.with_rows:
                            result_rows.append(cursor.fetchall())

                        if output_details:
                            query_execution_info[i] = query_exec_info(
                                operation_type, i, cnx, cursor, *query
                            )

                cnx.commit()

            except mysql.connector.errors.IntegrityError as e:
                response = raise_exception_or_rollback(
                    choice, cnx, e, response, queries_to_execute
                )
            except Exception as e:
                response = raise_exception_or_rollback(
                    choice, cnx, e, response, queries_to_execute
                )

            if output_details:
                response["query_execution_information"] = query_execution_info

            response["result_rows"] = result_rows
            for list in response['result_rows']:
                for record in list:
                    for key,value in record.items():
                        if isinstance(value, datetime.date):
                            record[key] = value.strftime('%Y-%m-%d')
                        elif isinstance(value, decimal.Decimal):
                            record[key] = str(value)
                        elif isinstance(value, datetime.datetime):
                            record[key] = value.strftime('%Y-%m-%d')
                        elif isinstance(value, bytes):
                            record[key] = base64.b64encode(value).decode('utf-8')
                        else:
                            continue
            return response
        else:
            raise Exception("Missing Input Data")
    except Exception as err:
        return {"Error": str(err)}
    
    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'cnx' in locals() and cnx:
            cnx.close()



operations = {
    'Execute SQL':mysql_execute_sql
}