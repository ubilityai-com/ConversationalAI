from logger import elastic_logger

class MultipleChoice:
    def __init__(self, message, choices, used_variables=None):
        self.message = message
        self.choices = choices
        self.used_variables = used_variables if used_variables is not None else []
    
    async def send(self, sio, sid, conversation_id):
        await sio.emit('message', {
            'type': 'multipleChoice',
            'text': self.message,
            'choices': self.choices
        }, room=sid)
        
        # Log multiple choice sending
        choices_str = ", ".join(self.choices)
        elastic_logger.log_element_event(
            conversation_id=conversation_id,
            client_id=sid,
            node_name="MultipleChoice",
            node_status="sent",
            message_content=f"{self.message} | Options: {choices_str}",
            message_direction="outbound",
            message_type="multipleChoice"
        )