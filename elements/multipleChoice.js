class MultipleChoice {
    constructor(message, choices) {
        this.message = message;
        this.choices = choices;
    }

    send(socket) {
        socket.emit('message', {
            type: 'multipleChoice',
            text: this.message,
            choices: this.choices
        });
    }
}

module.exports = MultipleChoice;