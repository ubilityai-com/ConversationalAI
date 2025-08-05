# app_integration.py
import importlib
import json

class AppIntegration:
    def __init__(self, app_type, credentials, operation,params):
        self.app_type = app_type
        self.credentials = credentials
        self.operation = operation
        self.params = params

    def run_process(self):
        try:
            # Dynamically import the app module
            module_path = f"applications.{self.app_type}"
            app_module = importlib.import_module(module_path)

            # Get the operations dict from the module
            operations = getattr(app_module, "operations", None)
            if operations is None:
                raise ValueError(f"No operations found for app: {self.app_type}")

            # Find the operation function
            func = operations.get(self.operation)
            if func is None:
                raise ValueError(f"Unknown operation '{self.operation}' for app '{self.app_type}'")

            # Call the function
            return func(json.dumps(self.credentials), self.params)

        except Exception as e:
            print(f"Error during app integration: {e}")
            raise Exception(str(e))