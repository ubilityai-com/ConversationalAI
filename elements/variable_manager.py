# variable_manager.py
class VariableManager:
    def __init__(self, data, used_variables):
        self.data = data
        self.used_variables = used_variables
    
    def process(self, variables):
        new_value = self._replace_variables(self.data['newValue'], variables)
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