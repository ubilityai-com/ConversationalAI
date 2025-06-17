# text_formatter.py
class TextFormatter:
    def __init__(self, data, used_variables):
        self.data = data
        self.used_variables = used_variables
    
    def process(self, variables):
        input_text = self._replace_variables(self.data['inputText'], variables)
        operation = self.data['operation']
        
        if operation == 'capitalize':
            return input_text.capitalize()
        elif operation == 'lowercase':
            return input_text.lower()
        elif operation == 'uppercase':
            return input_text.upper()
        elif operation == 'titlecase':
            return input_text.title()
        elif operation == 'length':
            return str(len(input_text))
        elif operation == 'find':
            text_to_find = self._replace_variables(self.data['textToFind'], variables)
            return str(input_text.find(text_to_find))
        else:
            print(f'Unknown text formatter operation: {operation}')
            return input_text
    
    def _replace_variables(self, template, variables):
        if not isinstance(template, str):
            return template
        
        for var_name in self.used_variables:
            placeholder = f'${{{var_name}}}'
            if placeholder in template:
                value = str(variables.get(var_name, ''))
                template = template.replace(placeholder, value)
        return template