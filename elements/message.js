class Message {
    constructor(text) {
        this.text = text;
    }

    send(socket) {
        socket.emit('message', {
            type: 'message',
            text: this.text
        });
    }
}

module.exports = Message;
