"""
functions.py
------------
Core logic for managing the chatbot conversation flow.

Includes:
- Step execution engine
- Input saving
- Element processing
- Dynamic routing and formatting
"""

import json
from typing import Union
from elements.message import Message
from elements.multiple_choice import MultipleChoice
from elements.router import Router
from elements.text_formatter import TextFormatter
from elements.flow_invoker import FlowInvoker
from elements.variable_manager import VariableManager
from elements.rag import RAG
from elements.basic_llm import BasicLLM
from elements.app_integration import AppIntegration


async def execute_process(sio, sid, conversation_id, session, dialogue):
    """
    Core processing engine for executing a conversation step.

    Args:
        sio: The Socket.IO server instance.
        sid: The session/socket ID.
        conversation_id (str): The ID of the conversation.
        session (dict): In-memory session store.
        dialogue (dict): The dialogue configuration loaded from JSON.
    """
    conversation = session[conversation_id]
    current_step = conversation.get('current_step')

    if not current_step:
        return

    current_dialogue = dialogue.get(current_step, {})
    wait_for_user = current_dialogue.get('saveUserInputAs')
    element_type = 'Greet' if current_step == 'firstElementId' else current_dialogue.get('type')
    # Pre-formatting for Message type with variables
    text = None
    if element_type == 'Message' and 'usedVariables' in current_dialogue:
        used_vars = current_dialogue.get('usedVariables') or []
        text = replace_variables(
            current_dialogue["content"]['text'],
            conversation['variables'],
            used_vars
        )
    if 'LC' in element_type and 'usedVariables' in current_dialogue:
        current_dialogue['data'] = replace_variables(
            current_dialogue['data'],
            conversation['variables'],
            current_dialogue.get('usedVariables', [])
        )

    # Element processing
    if element_type == 'Greet':
        await Message(current_dialogue['greet']).send(sio, sid)

    elif element_type == 'Message':
        await Message(text or current_dialogue["content"]['text']).send(sio, sid)

    elif element_type == "LC_RAG":
        await RAG(current_dialogue['data']).stream(sio, sid)
        
    elif element_type == "LC_BASIC_LLM":
        result = await BasicLLM(current_dialogue['data']).stream(sio, sid)
        if 'outputParser' in current_dialogue['data']['params'] and current_dialogue['data']['params']['outputParser']['type'] == 'StructuredOutputParser':
            conversation = save_output_parser_vars(current_dialogue['data']['params']['outputParser'], conversation, result)

    elif element_type == 'MultipleChoice':
        await MultipleChoice(
            current_dialogue["content"]['message'],
            current_dialogue["content"]['choices'],
            current_dialogue.get('usedVariables', [])
        ).send(sio, sid)

    elif element_type == 'Handler':
        await handle_routing(sio, sid, conversation_id, session, dialogue, current_dialogue)
        return

    elif element_type == 'Router':
        await handle_router(sio, sid, conversation_id, session, dialogue, current_dialogue)
        return

    elif element_type == 'TextFormatter':
        handle_text_formatter(conversation, current_dialogue)

    elif element_type == 'FlowInvoker':
        await handle_flow_invoker(conversation, current_dialogue)

    elif element_type == 'VariableManager':
        handle_variable_manager(conversation, current_dialogue, conversation_id, sid)
    elif element_type == 'AppIntegration':
        await handle_app_integration(sio, sid, conversation_id, session, dialogue, current_dialogue)
        return
    else:
        print(f'[Warning] Invalid element type: {element_type}')

    # Post-processing: move to next step if not waiting for user input
    if not wait_for_user:
        next_step = current_dialogue.get('next')

        if not next_step:
            # Restart or end conversation
            start_from = current_dialogue.get('startFrom')
            conversation['current_step'] = start_from or dialogue['firstElementId']['next']
            conversation['variables'] = {}
            return

        conversation['current_step'] = next_step
        await execute_process(sio, sid, conversation_id, session, dialogue)
    else:
        conversation['wait_for_user_input'] = wait_for_user
        conversation['current_step'] = current_dialogue.get('next')


def save_user_input(conversation: dict, input_object: dict):
    """
    Save user's input to conversation variables.

    Args:
        conversation (dict): The current conversation.
        input_object (dict): The message input object containing 'value'.
    """
    if conversation.get('wait_for_user_input'):
        conversation['variables'][conversation['wait_for_user_input']] = input_object.get('value')
        conversation['wait_for_user_input'] = None


def replace_variables(template: Union[str, list, dict], variables: dict, used_variables: list) -> Union[str, list, dict]:
    """
    Recursively replace variable placeholders in a template of type str, list, or dict.

    Args:
        template (Union[str, list, dict]): The template containing placeholders (e.g. "Hi ${name}")
        variables (dict): User variables to insert.
        used_variables (list): Variable names to use.

    Returns:
        Union[str, list, dict]: Template with all placeholders replaced.
    """
    def replace_in_string(text: str) -> str:
        for key in used_variables or []:
            placeholder = f"${{{key}}}"
            value = variables.get(key, '')
            text = text.replace(placeholder, str(value))
        return text
    if isinstance(template, str):
        return replace_in_string(template)
    elif isinstance(template, list):
        return [replace_variables(item, variables, used_variables) for item in template]
    elif isinstance(template, dict):
        return {k: replace_variables(v, variables, used_variables) for k, v in template.items()}
    else:
        return template  # If template is an unexpected type, return it as-is


async def handle_routing(sio, sid, conversation_id, session, dialogue, current_dialogue):
    """
    Handle conditional branching logic with Handler elements.
    """
    conversation = session[conversation_id]
    used_variable = current_dialogue['usedVariables'][0]
    case_value = conversation['variables'].get(used_variable, '')

    valid_cases = [k for k in current_dialogue["content"]['cases'].keys() if k != 'Other']

    if case_value in valid_cases:
        conversation['current_step'] = current_dialogue["content"]['cases'][case_value]
    else:
        conversation['current_step'] = current_dialogue["content"]['cases'].get('Other')

    await execute_process(sio, sid, conversation_id, session, dialogue)


async def handle_router(sio, sid, conversation_id, session, dialogue, current_dialogue):
    """
    Handle advanced conditional logic with Router elements.
    """
    conversation = session[conversation_id]
    router = Router(
        current_dialogue["content"]['conditions'],
        current_dialogue.get('usedVariables', [])
    )
    next_step = router.find_next_step(conversation['variables'])

    if next_step:
        conversation['current_step'] = next_step
        await execute_process(sio, sid, conversation_id, session, dialogue)
    else:
        print('[Router] No valid condition matched.')


def handle_text_formatter(conversation: dict, current_dialogue: dict):
    """
    Process text formatting logic and save result to a variable.
    """
    formatter = TextFormatter(
        current_dialogue["content"],
        current_dialogue.get('usedVariables', [])
    )
    result = formatter.process(conversation['variables'])
    conversation['variables'][current_dialogue["content"]['saveOutputAs']] = result


async def handle_flow_invoker(conversation: dict, current_dialogue: dict):
    """
    Invoke an external flow (API call) and save results to variables.
    """
    invoker = FlowInvoker(
        current_dialogue["content"],
        current_dialogue.get('usedVariables', [])
    )
    try:
        result = await invoker.make_request(conversation['variables'])
        result_data = json.loads(result)
        if isinstance(result_data.get('End'), dict):
            for key, value in result_data['End'].items():
                conversation['variables'][key] = value

    except Exception as e:
        print(f'[FlowInvoker] Failed: {e}')


def handle_variable_manager(conversation: dict, current_dialogue: dict):
    """
    Manage or mutate conversation variables based on defined logic.
    """
    manager = VariableManager(
        current_dialogue["content"],
        current_dialogue.get('usedVariables', [])
    )
    result = manager.process(conversation['variables'])
    conversation['variables'][result['variable']] = result['value']

def save_output_parser_vars(output_parser_data: dict, conversation: dict, result: dict):
    """
    Updates the conversation's variables with values from the result based on the output parser data.
    """
    for schema in output_parser_data["responseSchemas"]:
        if schema['name'] in result:
            conversation['variables'][schema['name']] = result[schema['name']]
        
    return conversation


async def handle_app_integration(sio, sid, conversation_id, session, dialogue, current_dialogue):
    conversation = session[conversation_id]
    # replace variables in the user payload input 
    app_content_json = replace_variables(
        current_dialogue["content"],
        conversation['variables'],
        current_dialogue.get('usedVariables', [])
    )

    # execute app operation
    app_type = app_content_json['app']
    credentials = app_content_json['credentials']
    operation = app_content_json['operation']
    content_json = app_content_json['content_json']

    result = AppIntegration(app_type,credentials,operation,content_json).run_process()
    # save result in a variable if user want to 
    if app_content_json['saveOutputAs']:
        for element in app_content_json['saveOutputAs']:
            if not element['path']: # save all result in a variable 
                conversation['variables'][element['name']] = result
            else: # save specific key in result
                value = get_value_from_path(result,element['path'])
                conversation['variables'][element['name']] = value

    # continue process execution
    conversation['current_step'] = current_dialogue['next']
    await execute_process(sio, sid, conversation_id, session, dialogue)


def get_value_from_path(json_body, path, default=None):
    keys = path.strip('.').split('.')
    current = json_body
    try:
        for key in keys:
            if isinstance(current, list):
                key = int(key)  
            current = current[key]
        return current
    except (KeyError, IndexError, ValueError, TypeError):
        return default