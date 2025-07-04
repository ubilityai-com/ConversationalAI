# router.py
class Router:
    def __init__(self, conditions):
        self.conditions = conditions

    
    def evaluate_condition(self, condition):
        if 'operation' not in condition:
            return True
        
        left = condition['firstOperator']
        right = condition['secondOperator']
        
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
            return left == right
        elif op == 'not equal':
            return left != right
        elif op == 'contain':
            return str(right) in str(left)
        elif op == 'does not contain':
            return str(right) not in str(left)
        elif op == 'greaterThan':
            return left > right
        elif op == 'greaterThanOrEqual':
            return left >= right
        elif op == 'lessThan':
            return left < right
        elif op == 'lessThanOrEqual':
            return left <= right
        return False
    
    # def _get_value(self, value, variables):
    #     if isinstance(value, str) and value.startswith('${') and value.endswith('}'):
    #         var_name = value[2:-1]
    #         if var_name in self.used_variables:
    #             return variables.get(var_name, '')
    #     return value
    
    def find_next_step(self):
        for condition in self.conditions:
            if self.evaluate_condition(condition):
                return condition['next']
        return None