# message.py
class Message:
    def __init__(self, text):
        self.text = text
    
    async def send(self, sio, sid):
        await sio.emit('message', {
            'type': 'message',
            'text': self.text
        }, room=sid)