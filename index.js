const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./elements/message');
const { executeProcess, saveUserInput } = require('./functions');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }, // Allow CORS for testing, adjust in production
});

// Memory session store
const session = new Map();
const dialogue = require('./boot_greet.json');
const CANCELLATION_PHRASES = ['bye', 'quit', 'cancel', 'exit', 'stop', 'end'];

io.on('connection', (socket) => {
    const conversationId = socket.handshake.query.conversationId;

    // if no conversationId sent by the client disconnect
    if (!conversationId) {
        socket.disconnect(true);
        return;
    }

    console.log(`new conversation: ${conversationId}`);

    // Kick existing socket if already connected
    if (session.has(conversationId)) {
        const oldSocket = session.get(conversationId)?.socket;
        oldSocket.emit('force_disconnect', 'You were logged out due to a new session.');
        oldSocket.disconnect();
    }

    // create new session 
    session.set(conversationId, {
        "socket": socket,
        "created_at": new Date().toISOString(),
        "last_reply_at": new Date().toISOString(),
        "variables": {},
        "current_step": "firstElementId",
        "wait_for_user_input": null
    });


    const conversation = session.get(conversationId)

    // check if boot should greet first
    if (dialogue[conversation.current_step].start) {
        // send greet message & change step to the next one
        const greet_message = new Message(dialogue[conversation.current_step].greet)
        greet_message.send(socket)
        conversation.current_step = dialogue[conversation.current_step].next
        executeProcess(socket, conversationId, session, dialogue)
    }



    // Handle incoming messages
    socket.on('message', (data) => {

        // parse a JSON string 
        const user_input = JSON.parse(data);


        // Check for cancellation phrases
        const userMessage = user_input.value?.toString().toLowerCase().trim();
        if (CANCELLATION_PHRASES.includes(userMessage)) {
            const cancelMessage = new Message(dialogue.firstElementId.cancel);
            cancelMessage.send(socket);

            // Reset conversation
            conversation.current_step = dialogue.firstElementId.next;
            conversation.variables = {};
            conversation.wait_for_user_input = null;
            return;
        }

        // save user input in session variables
        saveUserInput(conversation, user_input)

        executeProcess(socket, conversationId, session, dialogue)


    });


    socket.on('disconnect', () => {
        console.log(`conversation disconnected: ${conversationId}`);
        const convId = session.get(conversationId);
        if (convId && convId.socket === socket) {
            session.delete(conversationId);
        }
    });
});

server.listen(8031, () => {
    console.log('Socket.IO server listening on http://localhost:8031');
});




// // Send a welcome message
// socket.emit('start', `Welcome  ${conversationId}`);
