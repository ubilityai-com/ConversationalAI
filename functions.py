# functions.py
import json
from elements.message import Message
from elements.multiple_choice import MultipleChoice
from elements.router import Router
from elements.text_formatter import TextFormatter
from elements.flow_invoker import FlowInvoker
from elements.variable_manager import VariableManager

async def execute_process(sio, sid, conversation_id, session, dialogue):
    conversation = session[conversation_id]
    current_step = conversation['current_step']
    
    if not current_step:
        return
    
    current_dialogue = dialogue[current_step]
    wait_for_user = current_dialogue.get('saveUserInputAs')
    
    # Determine element type
    element_type = 'Greet' if current_step == 'firstElementId' else current_dialogue['type']
    
    # Handle variables in messages
    text = None
    if element_type == 'Message' and 'usedVariables' in current_dialogue:
        used_vars = current_dialogue['usedVariables'] if current_dialogue['usedVariables'] is not None else []
        text = replace_variables(
            current_dialogue['text'],
            conversation['variables'],
            used_vars
        )
    
    # Process different element types
    if element_type == 'Greet':
        greet_obj = Message(current_dialogue['greet'])
        await greet_obj.send(sio, sid)
    elif element_type == 'Message':
        message_obj = Message(text or current_dialogue['text'])
        await message_obj.send(sio, sid)
    elif element_type == 'MultipleChoice':
        choice_obj = MultipleChoice(
            current_dialogue['message'],
            current_dialogue['choices'],
            current_dialogue.get('usedVariables', [])
        )
        await choice_obj.send(sio, sid)
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
    else:
        print(f'Invalid element type: {element_type}')
    
    # Update conversation state
    if not wait_for_user:
        conversation['current_step'] = current_dialogue['next']
        
        # Handle conversation end
        if not conversation['current_step']:
            if current_dialogue.get('startFrom'):
                conversation['current_step'] = current_dialogue['startFrom']
            else:
                conversation['current_step'] = dialogue['firstElementId']['next']
                conversation['variables'] = {}
            return
        
        # Continue processing
        await execute_process(sio, sid, conversation_id, session, dialogue)
    else:
        conversation['wait_for_user_input'] = wait_for_user
        conversation['current_step'] = current_dialogue['next']

def save_user_input(conversation, input_object):
    if conversation['wait_for_user_input']:
        conversation['variables'][conversation['wait_for_user_input']] = input_object.get('value')
        conversation['wait_for_user_input'] = None

def replace_variables(template, variables, used_variables):
    if used_variables is None:
        return template  # Return original template if no variables to replace
    
    for key in used_variables:
        placeholder = f'${{{key}}}'
        value = variables.get(key, '')
        template = template.replace(placeholder, str(value))
    return template

async def handle_routing(sio, sid, conversation_id, session, dialogue, current_dialogue):
    conversation = session[conversation_id]
    used_variable = current_dialogue['usedVariables'][0]
    case_value = conversation['variables'].get(used_variable, '')
    
    # Get valid choices excluding 'Other'
    valid_choices = [k for k in current_dialogue['cases'].keys() if k != 'Other']
    
    # Determine next step
    if case_value in valid_choices:
        conversation['current_step'] = current_dialogue['cases'][case_value]
    else:
        conversation['current_step'] = current_dialogue['cases'].get('Other', None)
    
    await execute_process(sio, sid, conversation_id, session, dialogue)

async def handle_router(sio, sid, conversation_id, session, dialogue, current_dialogue):
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
        print('No valid condition found in Router')

def handle_text_formatter(conversation, current_dialogue):
    formatter = TextFormatter(
        current_dialogue['data'],
        current_dialogue.get('usedVariables', [])
    )
    result = formatter.process(conversation['variables'])
    conversation['variables'][current_dialogue['data']['saveOutputAs']] = result

async def handle_flow_invoker(conversation, current_dialogue):
    invoker = FlowInvoker(
        current_dialogue['data'],
        current_dialogue.get('usedVariables', [])
    )
    try:
        result = await invoker.make_request(conversation['variables'])
        result_data = json.loads(result)
        
        # Save nested End object properties
        if result_data and 'End' in result_data and isinstance(result_data['End'], dict):
            for key, value in result_data['End'].items():
                conversation['variables'][key] = value
    except Exception as e:
        print(f'FlowInvoker failed: {e}')

def handle_variable_manager(conversation, current_dialogue):
    manager = VariableManager(
        current_dialogue['data'],
        current_dialogue.get('usedVariables', [])
    )
    result = manager.process(conversation['variables'])
    conversation['variables'][result['variable']] = result['value']