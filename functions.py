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
from elements.message import Message
from elements.multiple_choice import MultipleChoice
from elements.router import Router
from elements.text_formatter import TextFormatter
from elements.flow_invoker import FlowInvoker
from elements.variable_manager import VariableManager
from models.credentials import get_credential


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
            current_dialogue['text'],
            conversation['variables'],
            used_vars
        )

    # Element processing
    if element_type == 'Greet':
        await Message(current_dialogue['greet']).send(sio, sid)

    elif element_type == 'Message':
        await Message(text or current_dialogue['text']).send(sio, sid)

    elif element_type == 'MultipleChoice':
        await MultipleChoice(
            current_dialogue['message'],
            current_dialogue['choices'],
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
        handle_variable_manager(conversation, current_dialogue)
    elif element_type == 'VariableManager':
        handle_variable_manager(conversation, current_dialogue)

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


def replace_variables(template: str, variables: dict, used_variables: list) -> str:
    """
    Replace variable placeholders in a string template.

    Args:
        template (str): Text with placeholders (e.g. "Hi ${name}")
        variables (dict): User variables to insert.
        used_variables (list): Variable names to use.

    Returns:
        str: Final text with variables replaced.
    """
    for key in used_variables or []:
        placeholder = f"${{{key}}}"
        value = variables.get(key, '')
        template = template.replace(placeholder, str(value))
    return template


async def handle_routing(sio, sid, conversation_id, session, dialogue, current_dialogue):
    """
    Handle conditional branching logic with Handler elements.
    """
    conversation = session[conversation_id]
    used_variable = current_dialogue['usedVariables'][0]
    case_value = conversation['variables'].get(used_variable, '')

    valid_cases = [k for k in current_dialogue['cases'].keys() if k != 'Other']

    if case_value in valid_cases:
        conversation['current_step'] = current_dialogue['cases'][case_value]
    else:
        conversation['current_step'] = current_dialogue['cases'].get('Other')

    await execute_process(sio, sid, conversation_id, session, dialogue)


async def handle_router(sio, sid, conversation_id, session, dialogue, current_dialogue):
    """
    Handle advanced conditional logic with Router elements.
    """
    conversation = session[conversation_id]
    router = Router(
        current_dialogue['conditions'],
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
        current_dialogue['data'],
        current_dialogue.get('usedVariables', [])
    )
    result = formatter.process(conversation['variables'])
    conversation['variables'][current_dialogue['data']['saveOutputAs']] = result


async def handle_flow_invoker(conversation: dict, current_dialogue: dict):
    """
    Invoke an external flow (API call) and save results to variables.
    """
    invoker = FlowInvoker(
        current_dialogue['data'],
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
        current_dialogue['data'],
        current_dialogue.get('usedVariables', [])
    )
    result = manager.process(conversation['variables'])
    conversation['variables'][result['variable']] = result['value']



def get_credential_value(name: str):
    """
    Get Credentials value based on given name.
    """
