from logger import elastic_logger

class Message:
    def __init__(self, text):
        self.text = text
    
    async def send(self, sio, sid, conversation_id):
        await sio.emit('message', {
            'type': 'message',
            'text': self.text
        }, room=sid)
        
        # Log message sending
        elastic_logger.log_element_event(
            conversation_id=conversation_id,
            client_id=sid,
            node_name="Message",
            node_status="sent",
            message_content=self.text,
            message_direction="outbound",
            message_type="message"
        )