
from langchain.agents import Tool
from langchain.tools import BaseTool
import requests


class GoogleSearchTool(BaseTool):
    name: str = ""
    description: str = ""
    credentials: dict = {}

    def _run(self, query: str, *args, **kwargs):
        url = "https://www.googleapis.com/customsearch/v1"
        params = {"q": query, "key": self.credentials['apiKey'], "cx": self.credentials['searchEngineId']}
        response = requests.get(url, params=params)
        if response.status_code == 429:
            raise Exception("Rate limit exceeded. Implement backoff or reduce frequency.")
        return response.json()


def create_custom_tools(tools, paramsTools, credentials):
    try:
        for tool in paramsTools:
            if tool["type"] == "GoogleSearch":
                if 'apiKey' in credentials[tool["credential"]] and "searchEngineId" in credentials[tool["credential"]]:
                    tools.append(
                        GoogleSearchTool(
                            name=tool["name"],
                            description=tool["description"],
                            credentials=credentials[tool["credential"]]
                        )
                    )
                else:
                    raise Exception("Missing Google Search Credentials")
            if tool["type"] == "serpApi":
                from langchain_community.utilities.serpapi import SerpAPIWrapper
                
                if "apiKey" in credentials[tool["credential"]]:
                    serpApi = SerpAPIWrapper(serpapi_api_key=credentials[tool["credential"]]["apiKey"])
                else:
                    raise Exception("Missing SerpApi Credentials")
                
                tools.append(
                    Tool(
                        name="serpApiWrapper",
                        func=serpApi.run,
                        description="Useful when you need to search to get answer",
                    )
                )
            if tool["type"] == "wikipedia":
                from langchain_community.utilities.wikipedia import WikipediaAPIWrapper
                wikipedia = WikipediaAPIWrapper()
                tools.append(
                    Tool(
                        name="wikipedia",
                        func=wikipedia.run,
                        description="Useful for when you need to look up a topic, country or person on wikipedia",
                    )
                )

        return tools

    except Exception as exc:
        raise Exception(exc)