import { automateOAuth2 } from "./credOAuth2";

export const OAuth2ServiceTypes = {
    Google: async (): Promise<void> =>
        automateOAuth2({
            url: "https://oauth2.googleapis.com/token",
            payload: {
                client_id: "{{clientID}}",
                client_secret: "{{clientSecret}}",
                code: "{{code::params}}",
                grant_type: "authorization_code",
                redirect_uri: window.location.origin + window.location.pathname,
            },
            response_path: "data",
            fieldsToAdd: [
                "clientID",
                "clientSecret",
                "access_token::response",
                "refresh_token::response",
                "developerToken",
                "privateKey",
                "clientEmail",
                "expirey::response[expires_in]=>formatDateWithMilliseconds",
            ],
        }),

    ZohoCRM: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.REACT_APP_DNS_URL}zohoCRM/getRefreshToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                client_id: "{{clientID}}",
                client_secret: "{{clientSecret}}",
                code: "{{code::params}}",
                redirect_uri: window.location.origin + window.location.pathname,
            },
            fieldsToAdd: ["clientID", "clientSecret", "refresh_token::response"],
        }),

    SalesForce: async (): Promise<void> =>
        automateOAuth2({
            url: `https://{{domainName}}.my.salesforce.com/services/oauth2/token?grant_type=authorization_code&code={{code::params}}&client_id={{clientID}}&client_secret={{clientSecret}}&redirect_uri=${process.env.APP_PUBLIC_DOMAIN}/dashboard/credentials&code_verifier=A00F0D6C54EBCCBC3F5CA84771F43B2C79F503E8D560E7DC9003CE96CFE704D1`,
            response_path: "data",
            fieldsToAdd: ["clientID", "clientSecret", "refresh_token::response", "domainName"],
        }),

    Zoom: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/zoom/getRefreshToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                client_id: "{{clientID}}",
                client_secret: "{{clientSecret}}",
                code: "{{code::params}}",
                redirect_uri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            fieldsToAdd: ["clientID", "clientSecret", "refresh_token::response", "redirectUri"],
        }),

    HubSpot: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.REACT_APP_DNS_URL}hubspot/getRefresh`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                client_id: "{{clientID}}",
                client_secret: "{{clientSecret}}",
                code: "{{code::params}}",
                redirect_uri: window.location.origin + window.location.pathname,
            },
            response_path: "data",
            fieldsToAdd: ["clientID", "clientSecret", "refresh_token::response", "redirectUri"],
        }),

    Dropbox: async (): Promise<void> =>
        automateOAuth2({
            url: "https://api.dropbox.com/oauth2/token",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ||{{appKey}}:{{appSecret}}=>Buffer`,
            },
            payload: {
                code: "{{code::params}}",
                grant_type: "authorization_code",
                redirect_uri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data",
            fieldsToAdd: ["appKey", "appSecret", "refresh_token::response"],
        }),

    Microsoft: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.REACT_APP_DNS_URL}microsoft/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientId: "{{clientId}}",
                clientSecret: "{{clientSecret}}",
                code: "{{code::params}}",
                grant_type: "authorization_code",
                redirectUri: window.location.origin + window.location.pathname,
            },
            response_path: "data",
            fieldsToAdd: [
                "clientId",
                "clientSecret",
                "access_token::response",
                "refresh_token::response",
                "domain",
                "expirey::response[expires_in]=>formatDateWithMilliseconds",
            ],
        }),

    Xero: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/xero/getAccessToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                client_id: "{{clientID}}",
                client_secret: "{{clientSecret}}",
                code: "{{code::params}}",
                redirect_uri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data",
            fieldsToAdd: [
                "clientID",
                "clientSecret",
                "access_token::response",
                "refresh_token::response",
                "expirey::response[expires_in]=>formatDateWithMilliseconds",
            ],
        }),

    PipeDrive: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/pipedrive/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientID: "{{clientID}}",
                clientSecret: "{{clientSecret}}",
                code: "{{code::params}}",
                redirectUri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data",
            fieldsToAdd: [
                "clientID",
                "clientSecret",
                "access_token::response",
                "refresh_token::response",
                "expirey::response[expires_in]=>formatDateWithMilliseconds",
            ],
        }),

    QuickBooks: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/quickbooks/getRefreshToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                client_id: "{{clientID}}",
                client_secret: "{{clientSecret}}",
                code: "{{code::params}}",
                realmId: "{{realmId::params}}",
                redirect_uri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data.token_info",
            fieldsToAdd: [
                "clientID",
                "clientSecret",
                "access_token::response",
                "refresh_token::response",
                "realmId::params",
                "environment",
            ],
        }),

    Jira: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/jira/getCredsInfo`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                client_id: "{{clientID}}",
                client_secret: "{{clientSecret}}",
                code: "{{code::params}}",
                domain: "{{domain}}",
                redirect_uri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data",
            fieldsToAdd: ["clientID", "clientSecret", "refresh_token::response", "domain", "cloud_id::response"],
        }),

    Facebook: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/facebook/getCredsInfo`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                client_id: "{{clientID}}",
                client_secret: "{{clientSecret}}",
                code: "{{code::params}}",
                domain: "{{domain}}",
                redirect_uri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data",
            fieldsToAdd: ["clientID", "clientSecret", "refresh_token::response", "domain", "cloud_id::response"],
        }),

    Instagram: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/instagram/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientId: "{{clientID}}",
                clientSecret: "{{clientSecret}}",
                code: "{{code::params}}",
                redirectUri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data",
            fieldsToAdd: ["access_token::response"],
        }),

    LinkedIn: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/linkedin/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientId: "{{clientID}}",
                clientSecret: "{{clientSecret}}",
                code: "{{code::params}}",
                redirectUri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data",
            fieldsToAdd: ["access_token::response", "id_token::response", "clientID", "clientSecret"],
        }),

    X: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/x/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                code: "{{code::params}}",
                clientID: "{{clientID}}",
                clientSecret: "{{clientSecret}}",
                redirectUri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
                codeChallenge: "{{code_challenge}}",
            },
            response_path: "data",
            fieldsToAdd: ["clientID", "clientSecret", "refresh_token::response", "userId::response"],
        }),

    ServiceNow: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/serviceNow/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientID: "{{clientID}}",
                clientSecret: "{{clientSecret}}",
                instanceDomain: "{{instanceDomain}}",
                code: "{{code::params}}",
                redirectUri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
                state: "{{state::params}}",
            },
            response_path: "data",
            fieldsToAdd: ["access_token::response", "refresh_token::response", "clientID", "clientSecret", "instanceDomain"],
        }),

    Reddit: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/reddit/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientId: "{{clientID}}",
                clientSecret: "{{clientSecret}}",
                code: "{{code::params}}",
                redirectUri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data",
            fieldsToAdd: ["access_token::response", "refresh_token::response", "clientID", "clientSecret"],
        }),

    Zendesk: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}zendesk/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientId: "{{clientId}}",
                clientSecret: "{{clientSecret}}",
                code: "{{code::params}}",
                baseUrl: "{{baseUrl}}",
                redirectUri: window.location.origin + window.location.pathname,
            },
            response_path: "data",
            fieldsToAdd: ["access_token::response", "clientId", "clientSecret", "baseUrl"],
        }),

    ClickUp: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/clickup/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientID: "{{clientID}}",
                clientSecret: "{{clientSecret}}",
                code: "{{code::params}}",
            },
            response_path: "data",
            fieldsToAdd: ["access_token::response", "clientID", "clientSecret"],
        }),

    MailChimp: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/mailchimp/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientID: "{{clientID}}",
                clientSecret: "{{clientSecret}}",
                code: "{{code::params}}",
                redirectUri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data",
            fieldsToAdd: ["apiKey::response", "serverPrefix::response", "clientID", "clientSecret"],
        }),

    Snowflake: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}/cloud/regular/snowflake/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientId: "{{clientId}}",
                clientSecret: "{{clientSecret}}",
                accountId: "{{accountId}}",
                code: "{{code::params}}",
                redirectUri: (process.env.APP_PUBLIC_DOMAIN || "") + "/dashboard/credentials",
            },
            response_path: "data",
            fieldsToAdd: [
                "refresh_token::response",
                "accountId",
                "clientId",
                "clientSecret",
                "redirectUri",
                "database",
                "schema",
                "warehouse",
            ],
        }),

    Slack: async (): Promise<void> =>
        automateOAuth2({
            url: `${process.env.APP_PUBLIC_UPLOAD_FILE_URL}slack/getToken`,
            headers: {
                "Content-Type": "application/json",
            },
            payload: {
                clientId: "{{clientId}}",
                clientSecret: "{{clientSecret}}",
                code: "{{code::params}}",
                redirectUri: window.location.origin + window.location.pathname,
            },
            response_path: "data",
            fieldsToAdd: ["accessToken::response", "clientId", "clientSecret", "redirectUri"],
        }),
}
