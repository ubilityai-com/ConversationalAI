const Message = require('./elements/message');
const MultipleChoice = require('./elements/multipleChoice');
const Router = require('./elements/router');
const TextFormatter = require('./elements/textFormatter');
const FlowInvoker = require('./elements/flowInvoker');


async function executeProcess(socket, conversationId, session, dialogue) {
    let element_type = '';
    let text = null

    const conversation = session.get(conversationId);
    const current_step = conversation.current_step;

    // check if the conversation reach its end 
    if (!current_step) {
        return
    }
    const current_dialogue = dialogue[current_step];
    const wait_for_user = current_dialogue.saveUserInputAs;

    // check for greet message (user start the conversation)
    if (current_step === 'firstElementId') {
        element_type = 'Greet';
    } else {
        element_type = current_dialogue.type;
    }

    // check if bot request contain variables (only in message type[because in multiple_choice it will cause an exeption])
    if (current_dialogue['usedVariables'] && (element_type == "Message")) {
        text = replaceVariables(current_dialogue['text'], conversation.variables, current_dialogue['usedVariables'])
    }

    switch (element_type) {
        case 'Greet':
            const greet_obj = new Message(current_dialogue.greet);
            greet_obj.send(socket);
            break;
        case 'Message':
            let message_obj = null
            if (text) {
                message_obj = new Message(text);
            } else {
                message_obj = new Message(current_dialogue.text);
            }
            message_obj.send(socket);
            break;
        case 'MultipleChoice':
            const choice_obj = new MultipleChoice(
                current_dialogue.message,
                current_dialogue.choices
            );
            choice_obj.send(socket);
            break;
        case 'Handler':
            return handleRouting(socket, conversation, conversationId, session, dialogue, current_dialogue);
        case 'Router':
            return handleRouter(socket, conversation, conversationId, session, dialogue, current_dialogue);
        case 'TextFormatter':
            handleTextFormatter(conversation, current_dialogue);
            break;
        case 'FlowInvoker':
            await handleFlowInvoker(conversation, current_dialogue);
            break;
        default:
            console.warn('Invalid element type:', element_type);
    }



    // Update current_step *after* checking for user input
    if (!wait_for_user) {
        // don't wait user input
        conversation.current_step = current_dialogue.next;

        // If we reached the end of conversation (next is null)
        if (!conversation.current_step) {
            // if user want to start from specific node (don't clear vars)
            if (current_dialogue.startFrom) {
                conversation.current_step = current_dialogue.startFrom;
                //conversation.variables = {}; 
                return; // Exit immediately here
            }
            else {
                // Reset to first step but don't execute automatically and clear session variables
                conversation.current_step = dialogue.firstElementId.next;
                conversation.variables = {};
                return;
            }
        }

        // Only continue if we're not at the end of conversation
        executeProcess(socket, conversationId, session, dialogue);

    } else {
        // wait user input
        conversation.wait_for_user_input = wait_for_user;
        conversation.current_step = current_dialogue.next;
    }
}


function saveUserInput(conversation, input_object) {
    // save user input in session variables

    if (conversation.wait_for_user_input) {
        // add variable to the session
        conversation.variables[conversation.wait_for_user_input] = input_object['value']
        // remove wait_for_user_input from session
        conversation.wait_for_user_input = null
    }
}


function replaceVariables(template, json_variables, array_variables) {
    // replace variables in the original text

    return array_variables.reduce((result, key) => {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
        return result.replace(regex, json_variables[key] || '');
    }, template);
}


function handleRouting(socket, conversation, conversationId, session, dialogue, current_dialogue) {
    const usedVariables = current_dialogue['usedVariables'][0];
    const caseValue = conversation.variables[usedVariables];

    // Get all valid case keys except "Other"
    const validChoices = Object.keys(current_dialogue.cases).filter(key => key !== 'Other');

    // Check if the caseValue exists in valid choices (excluding "Other")
    const isValidChoice = validChoices.includes(caseValue);

    // Determine the next step
    if (isValidChoice) {
        conversation.current_step = current_dialogue.cases[caseValue];
    } else {
        // Default to "Other" if it exists, otherwise use next
        conversation.current_step = current_dialogue.cases['Other'];
    }

    executeProcess(socket, conversationId, session, dialogue);
}


function handleRouter(socket, conversation, conversationId, session, dialogue, current_dialogue) {
    const router = new Router(
        current_dialogue.conditions,
        current_dialogue.usedVariables
    );
    const nextStep = router.findNextStep(conversation.variables);

    if (nextStep) {
        conversation.current_step = nextStep;
        executeProcess(socket, conversationId, session, dialogue);
    } else {
        console.error('No valid condition found in Router');
    }
}

function handleTextFormatter(conversation, current_dialogue) {
    const formatter = new TextFormatter(
        current_dialogue.data,
        current_dialogue.usedVariables
    );
    const result = formatter.process(conversation.variables);

    // Save result to session variables
    conversation.variables[current_dialogue.data.saveOutputAs] = result;
}


async function handleFlowInvoker(conversation, current_dialogue) {
    const invoker = new FlowInvoker(
        current_dialogue.data,
        current_dialogue.usedVariables
    );
    
    try {
        let result = await invoker.makeRequest(conversation.variables);
        
        result = JSON.parse(result)
        // Save nested End object properties as individual variables
        if (result && result.End && typeof result.End === 'object') {
            for (const [key, value] of Object.entries(result.End)) {
                conversation.variables[key] = value;
            }
        }
        else{
            console.log("/////////////")
            console.error(result);
        }

    } catch (error) {
        console.error('FlowInvoker failed:', error);
    }
}

module.exports = { executeProcess, saveUserInput };