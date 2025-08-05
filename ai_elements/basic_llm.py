from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, PromptTemplate
from langchain_core.output_parsers.string import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage
from ubility_langchain.model import Model

class BasicLLM:
    def __init__(self, data, credentials):
        self.data = data
        self.credentials = credentials

    def _langchain_set_outputParser(self):
        try:
            if self.data['params']["outputParser"]["type"] == "StructuredOutputParser":
                from langchain.output_parsers import ResponseSchema, StructuredOutputParser
                if "responseSchemas" in self.data['params']["outputParser"]:
                    response_schemas = []
                    for resp_schema in self.data['params']["outputParser"]["responseSchemas"]:
                        response_schemas.append(ResponseSchema(name=resp_schema["name"], description=resp_schema["description"], type= resp_schema["type"]))

                    output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

                else:
                    raise Exception("Missing Required Inputs")
            
            if self.data['params']["outputParser"]["type"] == "CommaSeparatedListOutputParser":
                from langchain_core.output_parsers.list import CommaSeparatedListOutputParser
                output_parser = CommaSeparatedListOutputParser()
                
            return output_parser
            
        except Exception as exc:
            raise Exception(exc)   

    async def stream(self, sio, sid):
        try:
            if "provider" in self.data['model'] and "params" in self.data['model'] and "optionals" in self.data['model']["params"]:
                llm_model = Model(provider=self.data['model']["provider"], model=self.data['model']["model"] if "model" in self.data['model'] else "", credentials= self.credentials[self.data['model']['credential']], params=self.data['model']["params"]).chat()

            else:
                raise Exception("Missing Model Data")
            
            if "prompt" in self.data['inputs'] and "promptType" in self.data['inputs']["prompt"]:
                if self.data['inputs']["prompt"]["promptType"] == "chatPrompt":
                    if "query" in self.data['inputs'] and "template" in self.data['inputs']["prompt"]:
                        messages = []
                        if "messages" in self.data['inputs']["prompt"]:
                            for human_ai_messages in self.data['inputs']["prompt"]["messages"]:
                                if "humanMessage" in human_ai_messages and "aiMessage" in human_ai_messages:
                                    messages.append(HumanMessage(content=human_ai_messages["humanMessage"]))
                                    messages.append(AIMessage(content=human_ai_messages["aiMessage"]))

                        if "outputParser" in self.data['params'] and "type" in self.data['params']["outputParser"]:
                            if self.data['params']["outputParser"]["type"] == "StructuredOutputParser":
                                outputParser = self._langchain_set_outputParser()
                                template = self.data['inputs']["prompt"]["template"] + "{input} {format_instructions}"
                                partialVariables = {"format_instructions": outputParser.get_format_instructions()}
                                inputVariables = ["input", "format_instructions"]

                            if self.data['params']["outputParser"]["type"] == "CommaSeparatedListOutputParser":
                                nb_of_items = self.data['params']["outputParser"]["nbOfItems"]
                                outputParser = self._langchain_set_outputParser()
                                template = self.data['inputs']["prompt"]["template"] + "{input} , Your response should only be an unnumbered list of " + str(nb_of_items) + " items, and you should return the results as a comma separeted list."
                                partialVariables = {}
                                inputVariables = ["input"]
                                
                        else:
                            outputParser = StrOutputParser()
                            template = self.data['inputs']["prompt"]["template"] + "{input}"
                            partialVariables = {}
                            inputVariables = ["input"]
                            
                        messages.append(HumanMessagePromptTemplate.from_template(template))
                        prompt = ChatPromptTemplate(
                            messages=messages, 
                            input_variables=inputVariables,
                            partial_variables=partialVariables,
                            output_parser=outputParser,
                            )

                        chain = prompt | llm_model 

                        result = ''
                        if sio and sid:
                            for chunk in chain.stream(input=self.data['inputs']["query"]):
                                await sio.emit('message', {
                                    'type': 'chunk',
                                    'chunk': chunk.content
                                }, room=sid)
                                result += chunk.content

                            await sio.emit('message', {
                                'type': 'end of chunks'
                            }, room=sid)
                        else:
                            for chunk in chain.stream(input=self.data['inputs']["query"]):
                                result += chunk.content
                           
                        result = outputParser.parse(result)
                        return result
                                            
                    else:
                        raise Exception("Missing Query")
        
                if self.data['inputs']["prompt"]["promptType"] == "Prompt":
                    if "promptInputs" in self.data['inputs']:
                        if "template" in self.data['inputs']["prompt"]:
                            if "outputParser" in self.data['params'] and "type" in self.data['params']["outputParser"]:
                                if self.data['params']["outputParser"]["type"] == "StructuredOutputParser":
                                    template = self.data['inputs']["prompt"]["template"] + " {format_instructions} "
                                    outputParser = self._langchain_set_outputParser()
                                    partialVariables = {"format_instructions": outputParser.get_format_instructions()}
                                
                                if self.data['params']["outputParser"]["type"] == "CommaSeparatedListOutputParser":
                                    nb_of_items = self.data['params']["outputParser"]["nbOfItems"]
                                    template = self.data['inputs']["prompt"]["template"] + ", Your response should only be an unnumbered list of " + str(nb_of_items) + " items, and you should return the results as a comma separeted list."
                                    outputParser = self._langchain_set_outputParser()
                                    partialVariables = {}

                            else:
                                template = self.data['inputs']["prompt"]["template"]
                                outputParser = StrOutputParser()
                                partialVariables = {}

                            prompt = PromptTemplate(
                            template=template,
                            input_variables=self.data['inputs']["prompt"]["inputVariables"] if "inputVariables" in self.data['inputs']["prompt"] else [],
                            partial_variables=partialVariables,
                            output_parser=outputParser,
                            )      

                            chain = prompt | llm_model 

                            result = ''
                            if sio and sid:
                                for chunk in chain.stream(input=self.data['inputs']["promptInputs"]):
                                    await sio.emit('message', {
                                        'type': 'chunk',
                                        'chunk': chunk.content
                                    }, room=sid)
                                    result += chunk.content

                                await sio.emit('message', {
                                    'type': 'end of chunks'
                                }, room=sid)
                            else:
                                for chunk in chain.stream(input=self.data['inputs']["promptInputs"]):
                                    result += chunk.content

                            result = outputParser.parse(result)
                            return result

                        else:
                            raise Exception("Missing template")
                    
                    else:
                        raise Exception("Missing Prompt Inputs")
                        
            else:
                raise Exception("Missing Prompt")
            
        except Exception as exc:
            if sio and sid:
                await sio.emit('error_message', {
                    'type': 'error_message',
                    'error': str(exc)
                    }, room=sid)
            raise Exception(exc)