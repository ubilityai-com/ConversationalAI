export const WebSearchAgentJson = {
  type: "WebSearchAgent",
  label: "Web Search Agent",
  color: "black",
  category: "langchain",
  new: true,
  normalHandle: ["integration", "basic", "automationTools", "langchain"],
  rightSideData: {
    nodesCanConnectWith: {
      "1": { category: "model", title: "Chat Model", required: true },
      "2": { category: "embedding", title: "Embedding", required: true },
    },
    json: [
      {
        type: "textfield",
        label: "Website URL",
        required: true,
        variableName: "url",
        value: "",
        placeholder: "https://example.com",
        hasDynamicVariable: true,
        helperSpan: "Enter a valid URL to extract links from.",
      },
      {
        type: "api",
        multiselect: true,
        placeholder: "Please Choose the Links to be returned",
        helperSpan: "Click to retrieve all links from the specified URL.",
        errorSpan: "Please ensure you have an active connection or have entered a valid URL. ",
        label: "Links",
        variableName: "links",
        value: [],
        required: true,
        list: [],
        config: [
          {
            key: "method",
            value: "post",
          },
          {
            key: "url",
            dependOn: [
              {
                type: "static",
                value:
                  process.env.REACT_APP_DNS_URL +
                  "cloud/regular/langchain_websearch/extractLinks",
              },
            ],
          },
          {
            key: "headers",
            obj: [
              {
                key: "Authorization",
                dependOn: [
                  {
                    type: "static",
                    value: "Bearer ",
                  },
                  {
                    type: "redux",
                    value: "authentication.authToken",
                  },
                ],
              },
              {
                key: "content-type",
                value: "application/json",
              },
            ],
          },
          {
            key: "data",
            obj: [
              {
                key: "url",
                dependOn: "url",
                isAutomation: true,
              },
            ],
          },
        ],
        res: {
          path: "data.Links",
          type: [],
          key: true,
        },
        apiDependsOn: [
          {
            type: "dropdown",
            name: "url",
            isAutomation: true,
          },
        ],
        conditionOnFirstTime: [
          {
            type: "dropdown",
            name: "url",
            isAutomation: true,
          },
        ],
        conditionOnRefresh: [
          {
            type: "dropdown",
            name: "url",
            isAutomation: true,
          },
        ],
      },
      {
        type: "textfield",
        label: "Query",
        required: true,
        multiline: true,
        minRows: 4,
        variableName: "query",
        chatbotQuestion: true,
        value: "",
        placeholder: "What is this page about?",
        hasDynamicVariable: true,
        helperSpan: "Type a question to ask about the content of this URL.",
      },
      {
        type: "outputJson",
        value: {
          Output: {
            answer: "",
          },
          Error: "",
          Status: "",
        },
      },
    ],
  },
};
