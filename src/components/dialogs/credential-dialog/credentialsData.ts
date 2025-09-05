import { CopyField, CredentialField, CredentialInfo, CredentialOption } from "../../../types/credentials-types";
/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */

const containsOnlyLettersAndNumbers = (str: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(str)
}

const oAuth2RedirectUris: CopyField = {
    label: "Authorized redirect URIs",
    value: window.location.href + "",
};
const javascriptOrigins: CopyField = {
    label: "Authorized JavaScript origins",
    value: window.location.origin ?? "",
};
const websiteUrl: CopyField = {
    label: "Website Url",
    value: window.location.href ?? "",
};
const credsThatNeedRedirects: Record<string, CopyField[]> = {
    Google: [oAuth2RedirectUris, javascriptOrigins],
    ZohoCRM: [oAuth2RedirectUris],
    SalesForce: [oAuth2RedirectUris],
    PipeDrive: [oAuth2RedirectUris],
    Zoom: [oAuth2RedirectUris],
    HubSpot: [oAuth2RedirectUris],
    Dropbox: [oAuth2RedirectUris],
    Microsoft: [oAuth2RedirectUris],
    Xero: [oAuth2RedirectUris],
    QuickBooks: [oAuth2RedirectUris],
    Jira: [oAuth2RedirectUris],
    Facebook: [oAuth2RedirectUris],
    Instagram: [oAuth2RedirectUris],
    LinkedIn: [oAuth2RedirectUris],
    X: [oAuth2RedirectUris, websiteUrl],
    ServiceNow: [oAuth2RedirectUris],
    Reddit: [oAuth2RedirectUris],
    Zendesk: [oAuth2RedirectUris],
    ClickUp: [oAuth2RedirectUris],
    MailChimp: [oAuth2RedirectUris],
    Snowflake: [oAuth2RedirectUris],
    Slack: [oAuth2RedirectUris],
};

const serviceFields: CredentialInfo[] = [
    {
        type: "ActiveCampaign",
        service: "ActiveCampaign",
        Service_name: "",
        cred: [
            {
                label: "API Url",
                Credential_name: "apiUrl",
                Credential_value: "",
            },
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Adalo",
        service: "Adalo",
        Service_name: "",
        cred: [
            {
                label: "App ID",
                Credential_name: "appID",
                Credential_value: "",
            },
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "AirTable",
        service: "AirTable",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accesstoken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "AI21",
        service: "AI21",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Asana",
        service: "Asana",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Anthropic",
        service: "Anthropic",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "AWS",
        service: "AWS",
        Service_name: "",
        cred: [
            {
                label: "Region Name",
                Credential_name: "region",
                Credential_value: "us-east-1",
                dropdown: true,
                list: [
                    {
                        label: "Africa (Cape Town) - af-south-1",
                        value: "af-south-1",
                    },
                    {
                        label: "Asia Pacific (Hong Kong) - ap-east-1",
                        value: "ap-east-1",
                    },
                    {
                        label: "Asia Pacific (Mumbai) - ap-south-1",
                        value: "ap-south-1",
                    },
                    {
                        label: "Asia Pacific (Singapore) - ap-southeast-1",
                        value: "ap-southeast-1",
                    },
                    {
                        label: "Asia Pacific (Sydney) - ap-southeast-2",
                        value: "ap-southeast-2",
                    },
                    {
                        label: "Asia Pacific (Jakarta) - ap-southeast-3",
                        value: "ap-southeast-3",
                    },
                    {
                        label: "Asia Pacific (Tokyo) - ap-northeast-1",
                        value: "ap-northeast-1",
                    },
                    {
                        label: "Asia Pacific (Seoul) - ap-northeast-2",
                        value: "ap-northeast-2",
                    },
                    {
                        label: "Asia Pacific (Osaka) - ap-northeast-3",
                        value: "ap-northeast-3",
                    },
                    {
                        label: "Canada (Central) - ca-central-1",
                        value: "ca-central-1",
                    },
                    {
                        label: "Europe (Frankfurt) - eu-central-1",
                        value: "eu-central-1",
                    },
                    {
                        label: "Europe (Stockholm) - eu-north-1",
                        value: "eu-north-1",
                    },
                    {
                        label: "Europe (Milan) - eu-south-1",
                        value: "eu-south-1",
                    },
                    {
                        label: "Europe (Ireland) - eu-west-1",
                        value: "eu-west-1",
                    },
                    {
                        label: "Europe (London) - eu-west-2",
                        value: "eu-west-2",
                    },
                    {
                        label: "Europe (Paris) - eu-west-3",
                        value: "eu-west-3",
                    },
                    {
                        label: "Middle East (UAE) - me-central-1",
                        value: "me-central-1",
                    },
                    {
                        label: "Middle East (Bahrain) - me-south-1",
                        value: "me-south-1",
                    },
                    {
                        label: "South America (São Paulo) - sa-east-1",
                        value: "sa-east-1",
                    },
                    {
                        label: "US East (N. Virginia) - us-east-1",
                        value: "us-east-1",
                    },
                    {
                        label: "US East (Ohio) - us-east-2",
                        value: "us-east-2",
                    },
                    {
                        label: "US West (N. California) - us-west-1",
                        value: "us-west-1",
                    },
                    {
                        label: "US West (Oregon) - us-west-2",
                        value: "us-west-2",
                    },
                ],
            },
            {
                label: "Access Key ID",
                Credential_name: "awsAccessKeyId",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Secret Access Key",
                Credential_name: "secretAccessKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "AzureOpenAi",
        service: "AzureOpenAi",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Resource Name",
                Credential_name: "resourceName",
                Credential_value: "",
                hashed: false,
            },
            {
                label: "API Version",
                Credential_name: "apiVersion",
                Credential_value: "2025-04-01-preview",
                hashed: false,
            },
        ]
    },
    {
        type: "Baserow",
        service: "Baserow",
        Service_name: "",
        cred: [
            {
                label: "Token",
                Credential_name: "token",
                Credential_value: "",
            },
            {
                label: "Host",
                Credential_name: "host",
                Credential_value: "https://api.baserow.io",
                optional: true,
            },
        ],
    },
    {
        type: "BambooHr",
        service: "BambooHr",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Subdomain",
                Credential_name: "subdomain",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Bannerbear",
        service: "Bannerbear",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Brevo",
        service: "Brevo",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Calendly",
        service: "Calendly",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Cerebras",
        service: "Cerebras",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Cohere",
        service: "Cohere",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Clockify",
        service: "Clockify",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "ClickUp",
        service: "ClickUp",
        Service_name: "",
        cred: [
            {
                label: "Type",
                Credential_name: "type",
                Credential_value: "Access Token",
                radio: true,
                credTypeConnection: true,
                list: [
                    {
                        label: "Access Token",
                        value: "Access Token",
                    },
                    {
                        label: "OAuth Application",
                        value: "OAuth Application",
                    },
                ],
                options: {
                    "Access Token": [
                        {
                            label: "Access Token",
                            Credential_name: "accessToken",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                    "OAuth Application": [
                        {
                            label: "Client ID",
                            Credential_name: "clientID",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Client Secret",
                            Credential_name: "clientSecret",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "ConvertKit",
        service: "ConvertKit",
        Service_name: "",
        cred: [
            {
                label: "Api Secret",
                Credential_name: "apiSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Custom",
        service: "Custom",
        Service_name: "",
        cred: [
            {
                label: "Type",
                Credential_name: "credType",
                Credential_value: "basic",
                dropdown: true,
                list: [
                    {
                        label: "Basic Auth",
                        value: "basic",
                    },
                    {
                        label: "Bearer Auth",
                        value: "bearer",
                    },
                    {
                        label: "Custom Auth",
                        value: "custom",
                    },
                    {
                        label: "Digest Auth",
                        value: "digest",
                    },
                    {
                        label: "Header Auth",
                        value: "header",
                    },
                    {
                        label: "Query Auth",
                        value: "query",
                    },
                ],
                options: {
                    basic: [
                        {
                            label: "User",
                            Credential_name: "username",
                            Credential_value: "",
                        },
                        {
                            label: "Password",
                            Credential_name: "password",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                    bearer: [
                        {
                            label: "Token",
                            Credential_name: "token",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                    custom: [
                        {
                            label: "Data",
                            Credential_name: "customData",
                            Credential_value: [],
                            custom: true,
                        },
                    ],
                    digest: [
                        {
                            label: "User",
                            Credential_name: "username",
                            Credential_value: "",
                        },
                        {
                            label: "Password",
                            Credential_name: "password",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                    header: [
                        {
                            label: "Name",
                            Credential_name: "name",
                            Credential_value: "",
                        },
                        {
                            label: "Value",
                            Credential_name: "value",
                            Credential_value: "",
                        },
                    ],
                    query: [
                        {
                            label: "Name",
                            Credential_name: "name",
                            Credential_value: "",
                        },
                        {
                            label: "Value",
                            Credential_name: "value",
                            Credential_value: "",
                        },
                    ],
                },
            },
        ],
    },
    // {
    //   type: "DataMatrix",
    //   service: "DataMatrix",
    //   Service_name: "",
    //   cred: [
    //     {
    //       label: "API key",
    //       Credential_name: "apiKey",
    //       Credential_value: "",
    //       hashed: true,
    //     },
    //   ]
    // },
    {
        type: "Discord",
        service: "Discord",
        Service_name: "",
        cred: [
            {
                label: "Bot Token",
                Credential_name: "botToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Dropbox",
        service: "Dropbox",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "APP Key",
                Credential_name: "appKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "APP Secret",
                Credential_name: "appSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "ElasticSearch",
        service: "ElasticSearch",
        Service_name: "",
        cred: [
            {
                label: "On",
                Credential_name: "type",
                Credential_value: "cloud",
                deleteOnCreate: true,
                dropdown: true,
                list: [
                    {
                        label: "Cloud",
                        value: "cloud",
                    },
                    {
                        label: "Virtual Machine",
                        value: "virtualmachine",
                    },
                ],
                options: {
                    cloud: [
                        {
                            label: "Cloud ID",
                            Credential_name: "cloudId",
                            Credential_value: "",
                        },
                        {
                            label: "Username",
                            Credential_name: "userName",
                            Credential_value: "",
                        },
                        {
                            label: "Password",
                            Credential_name: "password",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                    virtualmachine: [
                        {
                            label: "Public IP",
                            Credential_name: "publicIp",
                            Credential_value: "",
                        },
                        {
                            label: "Port",
                            Credential_name: "port",
                            Credential_value: "",
                        },
                        {
                            label: "Username",
                            Credential_name: "userName",
                            Credential_value: "",
                        },
                        {
                            label: "Password",
                            Credential_name: "password",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "Emelia",
        service: "Emelia",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Facebook",
        service: "Facebook",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "App ID",
                Credential_name: "appId",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "App Secret",
                Credential_name: "appSecret",
                optional: true,
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Fireworks",
        service: "Fireworks",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Freshdesk",
        service: "Freshdesk",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Domain",
                Credential_name: "domain",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Freshsales",
        service: "Freshsales",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Domain",
                Credential_name: "domain",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Github",
        service: "Github",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
            // {
            //   label: "Type",
            //   Credential_name: "type",
            //   Credential_value: "Access Token",
            //   radio: true,
            //   credTypeConnection: true,
            //   list: [
            //     {
            //       label: "Access Token",
            //       value: "Access Token",
            //     },
            //     {
            //       label: "OAuth Application",
            //       value: "OAuth Application",
            //     },
            //   ],
            //   options: {
            //     "Access Token": [
            //       {
            //         label: "Access Token",
            //         Credential_name: "accessToken",
            //         Credential_value: "",
            //         hashed: true,
            //       },
            //     ],
            //     "OAuth Application": [
            //       {
            //         label: "Client ID",
            //         Credential_name: "clientID",
            //         Credential_value: "",
            //         hashed: true,
            //       },
            //       {
            //         label: "Client Secret",
            //         Credential_name: "clientSecret",
            //         Credential_value: "",
            //         hashed: true,
            //       },
            //     ],
            //   },
            // },
        ],
    },
    {
        type: "Gitlab",
        service: "Gitlab",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Gemini",
        service: "Gemini",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Google",
        service: "Google",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Developer Token",
                Credential_name: "developerToken",
                Credential_value: "",
                optional: true,
                hashed: true,
            },
            {
                label: "Private Key",
                Credential_name: "privateKey",
                Credential_value: "",
                optional: true,
                hashed: true,
            },
            {
                label: "Service Account Email",
                Credential_name: "clientEmail",
                Credential_value: "",
                optional: true,
            },
        ],
    },
    {
        type: "GoogleSearch",
        service: "GoogleSearch",
        Service_name: "",
        description:
            'Please refer to the <a target="_blank" style="color:#72AFDD" href="https://console.cloud.google.com/apis/credentials">Google Cloud Console</a> for instructions on how to create an API key, and visit the <a target="_blank" style="color:#72AFDD" href="https://programmablesearchengine.google.com/controlpanel/create">Search Engine Creation page</a> to learn how to generate your Search Engine ID.',
        cred: [
            {
                label: "Google Custom Search Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Programmable Search Engine ID",
                Credential_name: "searchEngineId",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Grafana",
        service: "Grafana",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Domain",
                Credential_name: "domain",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Groq",
        service: "Groq",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "GraphQL",
        service: "GraphQL",
        Service_name: "",
        cred: [
            {
                label: "Type",
                Credential_name: "type",
                Credential_value: "Access Token",
                dropdown: true,
                list: [
                    {
                        label: "Access Token",
                        value: "Access Token",
                    },
                    {
                        label: "Api Key",
                        value: "Api Key",
                    },
                    {
                        label: "Basic Auth",
                        value: "Basic Auth",
                    },
                ],
                options: {
                    "Access Token": [
                        {
                            label: "Access Token",
                            Credential_name: "accessToken",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                    "Api Key": [
                        {
                            label: "Api Key",
                            Credential_name: "apiKey",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                    "Basic Auth": [
                        {
                            label: "Api Key",
                            Credential_name: "apiKey",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Api Password",
                            Credential_name: "apiPassword",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "HuggingFace",
        service: "HuggingFace",
        Service_name: "",
        cred: [
            {
                label: "API Token",
                Credential_name: "apiToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "HubSpot",
        service: "HubSpot",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Humantic",
        service: "Humantic",
        Service_name: "",
        cred: [
            {
                label: "API Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Hunter",
        service: "Hunter",
        Service_name: "",
        cred: [
            {
                label: "API Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Instagram",
        service: "Instagram",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "IBMWatsonx",
        service: "IBMWatsonx",
        Service_name: "",
        cred: [
            {
                label: "API Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Base URL",
                Credential_name: "baseUrl",
                Credential_value: "",
            },
            {
                label: "Project ID",
                Credential_name: "projectId",
                Credential_value: "",
            },
            {
                label: "Version",
                Credential_name: "version",
                Credential_value: "2024-03-14",
            },
        ],
    },
    {
        type: "Jenkins",
        service: "Jenkins",
        Service_name: "",
        cred: [
            {
                label: "Username",
                Credential_name: "userName",
                Credential_value: "",
            },
            {
                label: "Api Token",
                Credential_name: "apiToken",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Instance URL",
                Credential_name: "instanceURL",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Jira",
        service: "Jira",
        Service_name: "",
        cred: [
            {
                label: "Type",
                Credential_name: "type",
                Credential_value: "API Token",
                radio: true,
                credTypeConnection: true,
                list: [
                    {
                        label: "API Token",
                        value: "API Token",
                    },
                    {
                        label: "OAuth Application",
                        value: "OAuth Application",
                    },
                ],
                options: {
                    "API Token": [
                        {
                            label: "Email",
                            Credential_name: "email",
                            Credential_value: "",
                        },
                        {
                            label: "Api Token",
                            Credential_name: "apiToken",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Domain",
                            Credential_name: "domain",
                            Credential_value: "",
                        },
                    ],
                    "OAuth Application": [
                        {
                            label: "Client ID",
                            Credential_name: "clientID",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Client Secret",
                            Credential_name: "clientSecret",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Domain",
                            Credential_name: "domain",
                            Credential_value: "",
                            placeholder: "https://your-domain-name.atlassian.net",
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "Jotform",
        service: "Jotform",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Api Domain",
                Credential_name: "apiDomain",
                Credential_value: "https://api.jotform.com/",
                dropdown: true,
                list: [
                    {
                        label: "https://api.jotform.com/",
                        value: "https://api.jotform.com/",
                    },
                    {
                        label: "https://eu-api.jotform.com/",
                        value: "https://eu-api.jotform.com/",
                    },
                    {
                        label: "https://hipaa-api.jotform.com/",
                        value: "https://hipaa-api.jotform.com/",
                    },
                ],
            },
        ],
    },
    {
        type: "JWT",
        service: "JWT",
        Service_name: "",
        cred: [
            {
                label: "Key Type",
                Credential_name: "keyType",
                Credential_value: "Passphrase",
                dropdown: true,
                list: [
                    {
                        label: "Passphrase",
                        value: "Passphrase",
                    },
                    {
                        label: "PEM Key",
                        value: "PEM Key",
                    },
                ],
                options: {
                    Passphrase: [
                        {
                            label: "Secret",
                            Credential_name: "secret",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Algorithm",
                            Credential_name: "algorithm",
                            Credential_value: "HS256",
                            dropdown: true,
                            list: [
                                {
                                    option: "HS256",
                                    value: "HS256",
                                },
                                {
                                    option: "HS384",
                                    value: "HS384",
                                },
                                {
                                    option: "HS512",
                                    value: "HS512",
                                },
                                {
                                    option: "ES256",
                                    value: "ES256",
                                },
                                {
                                    option: "ES256K",
                                    value: "ES256K",
                                },
                                {
                                    option: "ES384",
                                    value: "ES384",
                                },
                                {
                                    option: "ES512",
                                    value: "ES512",
                                },
                                {
                                    option: "RS256",
                                    value: "RS256",
                                },
                                {
                                    option: "RS384",
                                    value: "RS384",
                                },
                                {
                                    option: "RS512",
                                    value: "RS512",
                                },
                                {
                                    option: "PS256",
                                    value: "PS256",
                                },
                                {
                                    option: "PS384",
                                    value: "PS384",
                                },
                                {
                                    option: "PS512",
                                    value: "PS512",
                                },
                            ],
                        },
                    ],
                    "PEM Key": [
                        {
                            label: "Private Key",
                            Credential_name: "privateKey",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Public Key",
                            Credential_name: "publicKey",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Algorithm",
                            Credential_name: "algorithm",
                            Credential_value: "HS256",
                            dropdown: true,
                            list: [
                                {
                                    option: "HS256",
                                    value: "HS256",
                                },
                                {
                                    option: "HS384",
                                    value: "HS384",
                                },
                                {
                                    option: "HS512",
                                    value: "HS512",
                                },
                                {
                                    option: "ES256",
                                    value: "ES256",
                                },
                                {
                                    option: "ES256K",
                                    value: "ES256K",
                                },
                                {
                                    option: "ES384",
                                    value: "ES384",
                                },
                                {
                                    option: "ES512",
                                    value: "ES512",
                                },
                                {
                                    option: "RS256",
                                    value: "RS256",
                                },
                                {
                                    option: "RS384",
                                    value: "RS384",
                                },
                                {
                                    option: "RS512",
                                    value: "RS512",
                                },
                                {
                                    option: "PS256",
                                    value: "PS256",
                                },
                                {
                                    option: "PS384",
                                    value: "PS384",
                                },
                                {
                                    option: "PS512",
                                    value: "PS512",
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "Keap",
        service: "Keap",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Kit",
        service: "Kit",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        service: "LeadSquared",
        type: "LeadSquared",
        Service_name: "",
        cred: [
            {
                label: "Access Key",
                Credential_name: "accessKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Secret Key",
                Credential_name: "secretKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "API Host",
                Credential_name: "apiHost",
                Credential_value: "",
            },
        ],
    },
    {
        type: "LinkedIn",
        service: "LinkedIn",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "On behalf one of the company",
                Credential_name: "behalfOfCompany",
                Credential_value: false,
                switch: true,
                typeOfValue: "string",
            },
        ],
    },
    {
        type: "LiteLLM",
        service: "LiteLLM",
        Service_name: "",
        cred: [
            {
                label: "API Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Base URL",
                Credential_name: "baseUrl",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Magento2",
        service: "Magento2",
        Service_name: "",
        cred: [
            {
                label: "host",
                Credential_name: "host",
                Credential_value: "",
            },
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "MailerLite",
        service: "MailerLite",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Mautic",
        service: "Mautic",
        Service_name: "",
        cred: [
            {
                label: "Domain",
                Credential_name: "domain",
                Credential_value: "",
            },
            {
                label: "Username",
                Credential_name: "userName",
                Credential_value: "",
            },
            {
                label: "Password",
                Credential_name: "password",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "MailChimp",
        service: "MailChimp",
        Service_name: "",
        cred: [
            {
                label: "Type",
                Credential_name: "type",
                Credential_value: "API Key",
                radio: true,
                credTypeConnection: true,
                list: [
                    {
                        label: "API Key",
                        value: "API Key",
                    },
                    {
                        label: "OAuth Application",
                        value: "OAuth Application",
                    },
                ],
                options: {
                    "API Key": [
                        {
                            label: "Api Key",
                            Credential_name: "apiKey",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Server Prefix",
                            Credential_name: "serverPrefix",
                            Credential_value: "",
                        },
                    ],
                    "OAuth Application": [
                        {
                            label: "Client ID",
                            Credential_name: "clientID",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Client Secret",
                            Credential_name: "clientSecret",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "Milvus",
        service: "Milvus",
        Service_name: "",
        cred: [
            {
                label: "Host",
                Credential_name: "host",
                Credential_value: "",
            },
            {
                label: "Port",
                Credential_name: "port",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Monday",
        service: "Monday",
        Service_name: "",
        cred: [
            {
                label: "Api Token",
                Credential_name: "apiToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "MongoDB",
        service: "MongoDB",
        Service_name: "",
        cred: [
            {
                label: "URI",
                Credential_name: "uri",
                Credential_value: "",
            },
            {
                label: "DataBase Name",
                Credential_name: "databaseName",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Microsoft",
        service: "Microsoft",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientId",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Is Used For Power BI, Sharepoint, Teams Or Dynamic CRM",
                Credential_name: "customUses",
                Credential_value: false,
                switch: true,
                typeOfValue: "string",
            },
            {
                label: "Domain",
                Credential_name: "domain",
                Credential_value: "",
                optional: true,
                hashed: true,
            },
        ],
    },
    {
        type: "MicrosoftSQL",
        service: "MicrosoftSQL",
        Service_name: "",
        cred: [
            {
                label: "Server",
                Credential_name: "server",
                Credential_value: "",
            },
            {
                label: "Port",
                Credential_name: "port",
                Credential_value: "1433",
            },
            {
                label: "Database",
                Credential_name: "database",
                Credential_value: "master",
            },
            {
                label: "User",
                Credential_name: "user",
                Credential_value: "",
            },
            {
                label: "Password",
                Credential_name: "Password",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Request timeout",
                Credential_name: "timeout",
                Credential_value: 10,
                optional: true,
            },
            {
                label: "Connect timeout",
                Credential_name: "loginTimeout",
                Credential_value: 10,
                optional: true,
            },
            {
                label: "Tds version",
                Credential_name: "tdsVersion",
                Credential_value: "7.4",
                dropdown: true,
                list: [
                    {
                        label: "7_1 (SQL Server 2000)",
                        value: "7.1",
                    },
                    {
                        label: "7_2 (SQL Server 2005)",
                        value: "7.2",
                    },
                    {
                        label: "7_3 (SQL Server 2008)",
                        value: "7.3",
                    },
                    {
                        label: "7_4 (SQL Server 2012 -2019)",
                        value: "7.4",
                    },
                ],
            },
        ],
    },
    {
        type: "MistralAi",
        service: "MistralAi",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "MySQL",
        service: "MySQL",
        Service_name: "",
        cred: [
            {
                label: "Host",
                Credential_name: "host",
                Credential_value: "",
            },
            {
                label: "DataBase Name",
                Credential_name: "database",
                Credential_value: "",
            },
            {
                label: "User",
                Credential_name: "user",
                Credential_value: "",
            },
            {
                label: "Password",
                Credential_name: "password",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Port",
                Credential_name: "port",
                Credential_value: "",
            },
            {
                label: "Connect Timeout",
                Credential_name: "connectionTimeout",
                Credential_value: "",
            },
            {
                label: "SSL",
                Credential_name: "sslEnabled",
                Credential_value: false,
                switch: true,
                typeOfValue: "string",
                options: {
                    true: [
                        {
                            label: "CA Certificate",
                            Credential_name: "sslCa",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Client Private Key",
                            Credential_name: "sslKey",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Client Certificate",
                            Credential_name: "sslCert",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                },
            },
            {
                label: "SSH Tunnel",
                Credential_name: "sshEnabled",
                Credential_value: false,
                switch: true,
                typeOfValue: "string",
                options: {
                    true: [
                        {
                            label: "SSH Authenticate with",
                            Credential_name: "sshAuthenticateWith",
                            Credential_value: "Private Key",
                            dropdown: true,
                            list: [
                                {
                                    label: "Private Key",
                                    value: "Private Key",
                                },
                                {
                                    label: "Password",
                                    value: "Password",
                                },
                            ],
                            options: {
                                "Private Key": [
                                    {
                                        label: "Private Key",
                                        Credential_name: "sshPrivateKey",
                                        Credential_value: "",
                                        hashed: true,
                                    },
                                    {
                                        label: "Passphrase",
                                        Credential_name: "sshPassphrase",
                                        Credential_value: "",
                                    },
                                ],
                                Password: [
                                    {
                                        label: "SSH Password",
                                        Credential_name: "sshPassword",
                                        Credential_value: "",
                                        hashed: true,
                                    },
                                ],
                            },
                        },
                        {
                            label: "SSH Host",
                            Credential_name: "sshHost",
                            Credential_value: "",
                        },
                        {
                            label: "SSH Port",
                            Credential_name: "sshPort",
                            Credential_value: "",
                        },
                        {
                            label: "SSH MySQL Port",
                            Credential_name: "sshMysqlPort",
                            Credential_value: "",
                        },
                        {
                            label: "SSH User",
                            Credential_name: "sshUser",
                            Credential_value: "",
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "Nvidia",
        service: "Nvidia",
        Service_name: "",
        cred: [
            {
                label: "Type",
                Credential_name: "type",
                Credential_value: "baseUrl",
                deleteOnCreate: true,
                dropdown: true,
                list: [
                    {
                        label: "Base Url",
                        value: "baseUrl",
                    },
                    {
                        label: "Api Key",
                        value: "apiKey",
                    },
                ],
                options: {
                    apiKey: [
                        {
                            label: "Api Key",
                            Credential_name: "apiKey",
                            Credential_value: "",
                        },
                    ],
                    baseUrl: [
                        {
                            label: "Base Url",
                            Credential_name: "baseUrl",
                            Credential_value: "",
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "Nomic",
        service: "Nomic",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Nocodb",
        service: "Nocodb",
        Service_name: "",
        cred: [
            {
                label: "Token",
                Credential_name: "token",
                Credential_value: "",
            },
            {
                label: "Host",
                Credential_name: "host",
                Credential_value: "https://app.nocodb.com",
                optional: true,
            },
        ],
    },
    {
        type: "Notion",
        service: "Notion",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Odoo",
        service: "Odoo",
        Service_name: "",
        cred: [
            {
                label: "Url",
                Credential_name: "url",
                Credential_value: "",
            },
            {
                label: "DataBase Name",
                Credential_name: "db",
                Credential_value: "",
            },
            {
                label: "Username",
                Credential_name: "username",
                Credential_value: "",
            },
            {
                label: "Api Password",
                Credential_name: "apiPassword",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "OpenAI",
        service: "OpenAI",
        Service_name: "",
        cred: [
            {
                label: "API Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Organization",
                Credential_name: "organization",
                Credential_value: "",
                optional: true,
            },
        ],
    },
    {
        type: "OpenRouter",
        service: "OpenRouter",
        Service_name: "",
        cred: [
            {
                label: "API Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Ollama",
        service: "Ollama",
        Service_name: "",
        cred: [
            {
                label: "Base URL",
                Credential_name: "ollamaBaseUrl",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "OpenWeatherMap",
        service: "OpenWeatherMap",
        Service_name: "",
        cred: [
            {
                label: "API Key",
                Credential_name: "appid",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Pinecone",
        service: "Pinecone",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "pineconeApiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "PipeDrive",
        service: "PipeDrive",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Postgres",
        service: "Postgres",
        Service_name: "",
        cred: [
            {
                label: "Host",
                Credential_name: "host",
                Credential_value: "",
            },
            {
                label: "DataBase Name",
                Credential_name: "database",
                Credential_value: "",
            },
            {
                label: "User",
                Credential_name: "username",
                Credential_value: "",
            },
            {
                label: "Password",
                Credential_name: "password",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Port",
                Credential_name: "port",
                Credential_value: "",
            },
            {
                label: "SSL Mode",
                Credential_name: "sslMode",
                Credential_value: "",
                dropdown: true,
                optional: true,
                list: [
                    {
                        label: "",
                        value: "",
                    },
                    {
                        label: "Disable",
                        value: "disable",
                    },
                    {
                        label: "Require",
                        value: "require",
                    },
                    {
                        label: "Allow",
                        value: "allow",
                    },
                    {
                        label: "Prefer",
                        value: "prefer",
                    },
                    {
                        label: "Verify-CA",
                        value: "verify-ca",
                    },
                    {
                        label: "Verify-Full",
                        value: "verify-full",
                    },
                ],
            },
        ],
    },
    {
        type: "Pushover",
        service: "Pushover",
        Service_name: "",
        cred: [
            {
                label: "Application's API token",
                Credential_name: "token",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Targeted user / group key",
                Credential_name: "user",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "QuickBooks",
        service: "QuickBooks",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Environment",
                Credential_name: "environment",
                Credential_value: "Sandbox",
                dropdown: true,
                list: [
                    {
                        label: "Sandbox",
                        value: "Sandbox",
                    },
                    {
                        label: "Production",
                        value: "Production",
                    },
                ],
            },
        ],
    },
    {
        type: "QuickBase",
        service: "QuickBase",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Realm hostname",
                Credential_name: "realmHostname",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Reddit",
        service: "Reddit",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Redis",
        service: "Redis",
        Service_name: "",
        cred: [
            {
                label: "Type",
                Credential_name: "type",
                Credential_value: "url",
                deleteOnCreate: true,
                dropdown: true,
                list: [
                    {
                        label: "URL",
                        value: "url",
                    },
                    {
                        label: "API",
                        value: "api",
                    },
                ],
                options: {
                    url: [
                        {
                            label: "URL",
                            Credential_name: "url",
                            Credential_value: "",
                        },
                    ],
                    api: [
                        {
                            label: "Host",
                            Credential_name: "host",
                            Credential_value: "",
                        },
                        {
                            label: "Port",
                            Credential_name: "port",
                            Credential_value: "",
                        },
                        {
                            label: "Username",
                            Credential_name: "userName",
                            Credential_value: "",
                        },
                        {
                            label: "Password",
                            Credential_name: "password",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "SSL",
                            Credential_name: "sslEnabled",
                            Credential_value: false,
                            switch: true,
                            typeOfValue: "string",
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "SalesForce",
        service: "SalesForce",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Domain Name",
                Credential_name: "domainName",
                Credential_value: "",
            },
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "ServiceNow",
        service: "ServiceNow",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Instance Domain",
                Credential_name: "instanceDomain",
                Credential_value: "",
            },
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "SerpApi",
        service: "SerpApi",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Shopify",
        service: "Shopify",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Api Password",
                Credential_name: "apiPassword",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Subdomain",
                Credential_name: "subdomain",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Slack",
        service: "Slack",
        Service_name: "",
        cred: [
            {
                label: "Type",
                Credential_name: "type",
                Credential_value: "Access Token",
                radio: true,
                credTypeConnection: true,
                list: [
                    {
                        label: "Access Token",
                        value: "Access Token",
                    },
                    {
                        label: "OAuth Application",
                        value: "OAuth Application",
                    },
                ],
                options: {
                    "Access Token": [
                        {
                            label: "Access Token",
                            Credential_name: "accessToken",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                    "OAuth Application": [
                        {
                            label: "Client ID",
                            Credential_name: "clientId",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Client Secret",
                            Credential_name: "clientSecret",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "SquareSpace",
        service: "SquareSpace",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Snowflake",
        service: "Snowflake",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Account ID",
                Credential_name: "accountId",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client ID",
                Credential_name: "clientId",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Database",
                Credential_name: "database",
                Credential_value: "",
            },
            {
                label: "Schema",
                Credential_name: "schema",
                Credential_value: "",
            },
            {
                label: "Warehouse",
                Credential_name: "warehouse",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Stripe",
        service: "Stripe",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Telegram",
        service: "Telegram",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "TheHive",
        service: "TheHive",
        Service_name: "",
        cred: [
            {
                label: "API Key",
                Credential_name: "apiToken",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "URL",
                Credential_name: "instanceURL",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Ignore SSL Issues (Insecure)",
                Credential_name: "ignoreSSL",
                Credential_value: false,
                switch: true,
                typeOfValue: "string",
            },
        ],
    },
    {
        type: "TogetherAi",
        service: "TogetherAi",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Todoist",
        service: "Todoist",
        Service_name: "",
        cred: [
            {
                label: "API key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Trello",
        service: "Trello",
        Service_name: "",
        cred: [
            {
                label: "Api Key",
                Credential_name: "apiKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Api Secret",
                Credential_name: "apiSecret",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Token",
                Credential_name: "token",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Twilio",
        service: "Twilio",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "authToken",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Account Sid",
                Credential_name: "accountSid",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Typeform",
        service: "Typeform",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Whatsapp",
        service: "Whatsapp",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Whatsapp Account ID",
                Credential_name: "whatsappAccountId",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "WhatsappTrigger",
        service: "WhatsappTrigger",
        Service_name: "",
        cred: [
            {
                label: "App ID",
                Credential_name: "appID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "App Secret",
                Credential_name: "appSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Webflow",
        service: "Webflow",
        Service_name: "",
        cred: [
            {
                label: "Access Token",
                Credential_name: "accessToken",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Wordpress",
        service: "Wordpress",
        Service_name: "",
        cred: [
            {
                label: "User Name",
                Credential_name: "username",
                Credential_value: "",
            },
            {
                label: "Password",
                Credential_name: "applicationPassword",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Base URL",
                Credential_name: "baseUrl",
                Credential_value: "",
            },
        ],
    },
    {
        type: "Woocommerce",
        service: "Woocommerce",
        Service_name: "",
        cred: [
            {
                label: "Base URL",
                Credential_name: "baseUrl",
                Credential_value: "",
            },
            {
                label: "Consumer Key",
                Credential_name: "consumerKey",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Consumer Secret",
                Credential_name: "consumerSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Xero",
        service: "Xero",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "X",
        service: "X",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Zendesk",
        service: "Zendesk",
        Service_name: "",
        cred: [
            {
                label: "Type",
                Credential_name: "type",
                Credential_value: "Access Token",
                radio: true,
                credTypeConnection: true,
                list: [
                    {
                        label: "Access Token",
                        value: "Access Token",
                    },
                    {
                        label: "OAuth Application",
                        value: "OAuth Application",
                    },
                ],
                options: {
                    "Access Token": [
                        {
                            label: "Email",
                            Credential_name: "email",
                            Credential_value: "",
                        },
                        {
                            label: "Api Token",
                            Credential_name: "apiToken",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Base URL",
                            Credential_name: "baseUrl",
                            Credential_value: "",
                        },
                    ],
                    "OAuth Application": [
                        {
                            label: "Base URL",
                            Credential_name: "baseUrl",
                            Credential_value: "",
                        },
                        {
                            label: "Client ID",
                            Credential_name: "clientId",
                            Credential_value: "",
                            hashed: true,
                        },
                        {
                            label: "Client Secret",
                            Credential_name: "clientSecret",
                            Credential_value: "",
                            hashed: true,
                        },
                    ],
                },
            },
        ],
    },
    {
        type: "ZohoCRM",
        service: "ZohoCRM",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
    {
        type: "Zoom",
        service: "Zoom",
        Service_name: "",
        defaultRedirectUri: true,
        cred: [
            {
                label: "Client ID",
                Credential_name: "clientID",
                Credential_value: "",
                hashed: true,
            },
            {
                label: "Client Secret",
                Credential_name: "clientSecret",
                Credential_value: "",
                hashed: true,
            },
        ],
    },
];

const credentialTypes = ["All", ...serviceFields.map((s) => s.service)];
let imagesByKey = { noImage: "/components-icons/noImage.png" };
credentialTypes.map((c) => {
    let img;
    try {
        img = "/components-icons/" + c + ".png";
    } catch (error) {
        img = "/components-icons/noImage.png";
    }
    imagesByKey = { ...imagesByKey, [c]: img };
});
const setCredOnOneLevel = (apiRes: CredentialField[]): CredentialField[] => {
    let fieldsToAdd: CredentialField[] = []

    apiRes.forEach((credField: CredentialField) => {
        if (
            (credField.dropdown || credField.switch || credField.radio) &&
            credField.options &&
            credField.hasOwnProperty("options")
        ) {
            // Handle fields with nested options (dropdown, radio, switch)
            const clonedItem: CredentialField = { ...credField }
            delete clonedItem.options

            // Add the parent field if it shouldn't be deleted
            if (!clonedItem.deleteOnCreate) {
                fieldsToAdd.push({ ...clonedItem })
            }

            // Process nested options based on current selection
            if (credField.options) {
                Object.keys(credField.options).forEach((optionKey: string) => {
                    if (credField.Credential_value?.toString() === optionKey) {
                        // Recursively flatten the selected option's fields
                        fieldsToAdd = [
                            ...fieldsToAdd,
                            ...setCredOnOneLevel(credField.options![credField.Credential_value.toString()]),
                        ]
                    }
                })
            }
        } else if (credField.api) {
            // Handle API fields with dynamic data extraction
            const clonedItem: CredentialField = { ...credField }

            if (clonedItem.value && clonedItem.Credential_value !== "") {
                // Find the selected item from the list
                const currentItem = clonedItem.list?.find(
                    (item: CredentialOption) => item.value === clonedItem.Credential_value,
                )

                if (currentItem && clonedItem.value && currentItem[clonedItem.value]) {
                    // Extract dynamic properties from the selected item
                    const dynamicData = currentItem[clonedItem.value] as Record<string, any>

                    Object.keys(dynamicData).forEach((key: string) => {
                        fieldsToAdd.push({
                            Credential_value: dynamicData[key],
                            Credential_name: key,
                            label: key,
                        } as CredentialField)
                    })
                }
            } else {
                // Add the API field as-is if no special processing needed
                fieldsToAdd.push({ ...credField })
            }
        } else if (!credField.deleteOnCreate) {
            // Add regular fields that shouldn't be deleted
            fieldsToAdd.push({ ...credField })
        }
    })

    return fieldsToAdd
}
export {
    containsOnlyLettersAndNumbers,
    credentialTypes,
    credsThatNeedRedirects,
    imagesByKey,
    serviceFields,
    setCredOnOneLevel
};

