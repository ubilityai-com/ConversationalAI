from logger import elastic_logger

class Router:
    def __init__(self, conditions, used_variables):
        self.conditions = conditions
        self.used_variables = used_variables
    
    def evaluate_condition(self, condition, variables, conversation_id, sid):
        try:
            if 'operation' not in condition:
                result = True
            else:
                left = self._get_value(condition['firstOperator'], variables)
                right = self._get_value(condition['secondOperator'], variables)
                
                # Convert types
                data_type = condition.get('dataType', 'string')
                if data_type == 'number':
                    try:
                        left = float(left)
                        right = float(right)
                    except ValueError:
                        pass
                
                # Evaluate operations
                op = condition['operation']
                if op == 'equal':
                    result = left == right
                elif op == 'not equal':
                    result = left != right
                elif op == 'contain':
                    result = str(right) in str(left)
                elif op == 'does not contain':
                    result = str(right) not in str(left)
                elif op == 'greaterThan':
                    result = left > right
                elif op == 'greaterThanOrEqual':
                    result = left >= right
                elif op == 'lessThan':
                    result = left < right
                elif op == 'lessThanOrEqual':
                    result = left <= right
                else:
                    result = False
            
            # Log evaluation result
            if self.conversation_id:
                elastic_logger.log_element_event(
                    conversation_id=conversation_id,
                    client_id=sid,
                    node_name="Router",
                    node_status="evaluated",
                    message_content=f"Condition result: {result}",
                    message_direction="system",
                    message_type="condition_result"
                )
            
            return result
            
        except Exception as e:
            # Log evaluation error
            if self.conversation_id:
                elastic_logger.log_element_event(
                    conversation_id=conversation_id,
                    client_id=sid,
                    node_name="Router",
                    node_status="error",
                    message_content=f"Condition evaluation failed: {str(e)}",
                    message_direction="system",
                    message_type="error"
                )
            return False


    def _get_value(self, value, variables):
        if isinstance(value, str) and value.startswith('${') and value.endswith('}'):
            var_name = value[2:-1]
            if var_name in self.used_variables:
                return variables.get(var_name, '')
        return value
    
    def find_next_step(self, variables, conversation_id, sid):
        for condition in self.conditions:
            if self.evaluate_condition(condition, variables, conversation_id, sid):
                return condition['next']
        return None