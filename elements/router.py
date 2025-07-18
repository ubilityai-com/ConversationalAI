# router.py
class Router:
    def __init__(self, conditions):
        self.conditions = conditions

    
    def evaluate_condition(self, condition):
        if 'operation' not in condition:
            return False
        
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
        elif op == 'not_equal':
            return left != right
        elif op == 'contains':
            return str(right) in str(left)
        elif op == 'not_contains':
            return str(right) not in str(left)
        elif op == 'greater_than':
            return left > right
        elif op == 'greater_equal':
            return left >= right
        elif op == 'less_than':
            return left < right
        elif op == 'less_equal':
            return left <= right
        return False
    
    # def _get_value(self, value, variables):
    #     if isinstance(value, str) and value.startswith('${') and value.endswith('}'):
    #         var_name = value[2:-1]
    #         if var_name in self.used_variables:
    #             return variables.get(var_name, '')
    #     return value
    
    def find_next_step(self):
        # First, try to find a matching condition
        for condition in self.conditions:
            if self.evaluate_condition(condition):
                return condition['next']
        
        # If none matched, find a default
        for condition in self.conditions:
            if "default" in condition:
                return condition["default"]
        
        return None