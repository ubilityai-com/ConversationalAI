from logger import elastic_logger
class VariableManager:
    def __init__(self, data, used_variables):
        self.data = data
        self.used_variables = used_variables
    
    def process(self, variables, conversation_id, sid):
        new_value = self._replace_variables(self.data['newValue'], variables)
        elastic_logger.log_element_event(
            conversation_id=conversation_id,
            client_id=sid,
            node_name="VariableManager",
            node_status="updated",
            message_content=f"Set {self.data['variable']} = {new_value}",
            message_direction="system",
            message_type="variableUpdate"
        )
        return {
            'variable': self.data['variable'],
            'value': new_value
        }
    
    def _replace_variables(self, template, variables):
        if not isinstance(template, str):
            return template
        
        for var_name in self.used_variables:
            placeholder = f'${{{var_name}}}'
            if placeholder in template:
                value = str(variables.get(var_name, ''))
                template = template.replace(placeholder, value)
        return template