import os
import uuid
import logging
from datetime import datetime
from elasticsearch import Elasticsearch

class ElasticLogger:
    def __init__(self):
        self.es = Elasticsearch(
            ['https://prodelastic.ubilityai.com'],
            http_auth=('elastic', 'kWOPIi7nKdTzI2wCw+i+'),
            max_retries=10,
            timeout=30
        )
        self.index_name = 'chatbot-logs'
        self.chatbot_name = 'CHATBOT_NAME', 'DefaultChatbot'
        self.logger = logging.getLogger(__name__)
        
    def create_log_entry(self, **kwargs):
        
        return {
            "logid": str(uuid.uuid4()),
            "@timestamp": datetime.utcnow().isoformat(),
            "chatbotName": self.chatbot_name,
            **kwargs
        }
    
    def log_element_event(self, conversation_id, client_id, node_name, node_status, 
                          message_content, message_direction, message_type):
        
        log_entry = self.create_log_entry(
            conversationId=conversation_id,
            clientId=client_id,
            nodeName=node_name,
            nodeStatus=node_status,
            message={
                "content": message_content,
                "direction": message_direction,
                "type": message_type
            }
        )
        
        try:
            response = self.es.index(
                index=self.index_name,
                document=log_entry
            )
            if response.get('result') != 'created':
                self.logger.error(f"Failed to log to Elasticsearch: {response}")
        except Exception as e:
            self.logger.exception(f"Elasticsearch logging error: {e}")

elastic_logger = ElasticLogger()