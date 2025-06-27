class MultipleChoice:
    def __init__(self, message, choices, used_variables=None):
        self.message = message
        self.choices = choices
        self.used_variables = used_variables if used_variables is not None else []
    
    async def send(self, sio, sid):
        await sio.emit('message', {
            'type': 'multipleChoice',
            'text': self.message,
            'choices': self.choices
        }, room=sid)