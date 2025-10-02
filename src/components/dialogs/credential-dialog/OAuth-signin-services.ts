import Cookies from "js-cookie"
import { generateRandomString } from "../../../lib/utils"
import { automateOAuthSignIn } from "./oauth-signin-automation"

export const OAuthSignInServices = {
    Google: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://accounts.google.com/o/oauth2/auth",
            scopes: [
                "https://mail.google.com/",
                "https://www.googleapis.com/auth/spreadsheets",
                "https://www.googleapis.com/auth/documents",
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/calendar",
                "https://www.googleapis.com/auth/contacts",
                "https://www.googleapis.com/auth/adwords",
                "https://www.googleapis.com/auth/youtube",
                "https://www.googleapis.com/auth/pubsub",
                "https://www.googleapis.com/auth/books",
                "https://www.googleapis.com/auth/tasks",
                "https://www.googleapis.com/auth/presentations",
            ],
            additionalParams: {
                access_type: "offline",
                prompt: "consent",
            },
        }),

    SalesForce: (): void =>
        automateOAuthSignIn({
            authEndpoint: `https://${Cookies.get("domainName")}.my.salesforce.com/services/oauth2/authorize`,
            additionalParams: {
                code_challenge: "V7R2SXbfwXn4A1v1TV81GFenhIbLv6VrRLuHfx04jgQ",
                code_challenge_method: "S256",
                grant_type: "authorization_code",
                scope: "full refresh_token offline_access profile",
            },
        }),

    ZohoCRM: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://accounts.zoho.com/oauth/v2/auth",
            scopes: ["ZohoCRM.settings.ALL", "ZohoCRM.modules.ALL", "ZohoCRM.notifications.ALL"],
            scopeJoiner: ",",
            additionalParams: {
                access_type: "offline",
            },
        }),

    Zoom: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://zoom.us/oauth/authorize",
        }),

    HubSpot: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://app.hubspot.com/oauth/authorize",
            scopes: [
                "oauth",
                "crm.objects.contacts.read",
                "crm.objects.contacts.write",
                "crm.objects.companies.read",
                "crm.objects.companies.write",
                "tickets",
                "crm.objects.deals.read",
                "crm.objects.deals.write",
                "crm.schemas.deals.read",
                "sales-email-read",
                "crm.lists.write",
                "crm.lists.read",
            ],
        }),

    Dropbox: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://www.dropbox.com/oauth2/authorize",
            clientIdKey: "appKey",
            additionalParams: {
                token_access_type: "offline",
            },
        }),

    Microsoft: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            clientIdKey: "clientId",
            additionalParams: {
                response_mode: "query",
            },
            customLogic: () => {
                const domain = Cookies.get("domain")
                const customUses = Cookies.get("customUses")

                const scopesWithoutCustomUses = [
                    "https://graph.microsoft.com/Calendars.ReadWrite",
                    "https://graph.microsoft.com/Contacts.ReadWrite",
                    "https://graph.microsoft.com/Mail.ReadWrite",
                    "https://graph.microsoft.com/Mail.Send",
                    "https://graph.microsoft.com/Files.ReadWrite.All",
                    "https://graph.microsoft.com/Tasks.ReadWrite",
                    "https://graph.microsoft.com/Channel.ReadBasic.All",
                    "https://graph.microsoft.com/Team.Create",
                    "https://graph.microsoft.com/Team.ReadBasic.All",
                    "https://graph.microsoft.com/ChatMessage.Send",
                    "https://graph.microsoft.com/ChannelMessage.Send",
                    "offline_access",
                ]

                const scopesWithCustomUses = [
                    "https://analysis.windows.net/powerbi/api/Dataset.ReadWrite.All",
                    "https://analysis.windows.net/powerbi/api/Report.ReadWrite.All",
                    "https://analysis.windows.net/powerbi/api/Workspace.ReadWrite.All",
                    "https://analysis.windows.net/powerbi/api/Tenant.Read.All",
                    "https://graph.microsoft.com/Channel.ReadBasic.All",
                    "https://graph.microsoft.com/ChannelMessage.Read.All",
                    "https://graph.microsoft.com/ChannelSettings.Read.All",
                    "https://graph.microsoft.com/ChannelSettings.ReadWrite.All",
                    "https://graph.microsoft.com/Group.Read.All",
                    "https://graph.microsoft.com/Group.ReadWrite.All",
                ]

                let scopes
                if (domain) {
                    scopes = [`https://${domain}.crm4.dynamics.com/user_impersonation`]
                } else {
                    scopes =
                        customUses === "true" ? [...scopesWithoutCustomUses, ...scopesWithCustomUses] : [...scopesWithoutCustomUses]
                }

                return { scope: scopes.join(" ") }
            },
        }),

    Xero: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://login.xero.com/identity/connect/authorize",
            scopes: [
                "offline_access",
                "openid",
                "profile",
                "accounting.settings",
                "accounting.contacts.read",
                "accounting.transactions.read",
                "accounting.transactions",
                "accounting.contacts",
                "email",
                "accounting.settings.read",
            ],
        }),

    PipeDrive: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://oauth.pipedrive.com/oauth/authorize",
        }),

    QuickBooks: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://appcenter.intuit.com/connect/oauth2",
            additionalParams: {
                scope: "com.intuit.quickbooks.accounting+openid+profile+email+phone+address",
                state: "97gUOkLHnsnWIUrZHQU6uayFDgYBc5",
            },
        }),

    Jira: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://auth.atlassian.com/authorize",
            scopes: [
                "read:jira-work",
                "manage:jira-webhook",
                "offline_access",
                "read:webhook:jira",
                "read:jql:jira",
                "write:webhook:jira",
                "delete:webhook:jira",
            ],
            encodeRedirectUri: true,
            additionalParams: {
                audience: "api.atlassian.com",
                prompt: "consent",
            },
            customLogic: () => {
                const scopes = [
                    "read:jira-work",
                    "manage:jira-webhook",
                    "offline_access",
                    "read:webhook:jira",
                    "read:jql:jira",
                    "write:webhook:jira",
                    "delete:webhook:jira",
                ]
                return { scope: encodeURIComponent(scopes.join(" ")) }
            },
        }),

    Facebook: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://www.facebook.com/v20.0/dialog/oauth",
            clientIdKey: "appId",
            responseType: "token",
            additionalParams: {
                auth_type: "rerequest",
                scope:
                    "public_profile email pages_manage_engagement pages_manage_posts pages_read_user_content pages_manage_metadata pages_read_engagement page_events pages_messaging pages_show_list",
            },
        }),

    Instagram: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://www.instagram.com/oauth/authorize",
            encodeRedirectUri: true,
            additionalParams: {
                scope: "business_basic,business_manage_messages,business_manage_comments,business_content_publish",
            },
        }),

    LinkedIn: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://www.linkedin.com/oauth/v2/authorization",
            encodeRedirectUri: true,
            customLogic: () => {
                const behalfOfCompany = Cookies.get("behalfOfCompany")
                const scopesWithoutOrganization = ["w_member_social", "profile", "email", "openid"]
                const scopes =
                    behalfOfCompany === "true"
                        ? [...scopesWithoutOrganization, "w_organization_social"]
                        : [...scopesWithoutOrganization]
                return { scope: scopes.join(" ") }
            },
        }),

    X: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://twitter.com/i/oauth2/authorize",
            encodeRedirectUri: true,
            scopes: [
                "tweet.read",
                "users.read",
                "dm.write",
                "dm.read",
                "list.write",
                "tweet.write",
                "like.write",
                "offline.access",
            ],
            customLogic: () => {
                const code_challenge = generateRandomString()
                const state = generateRandomString(10)
                Cookies.set("code_challenge", code_challenge)
                return {
                    state,
                    code_challenge,
                    code_challenge_method: "plain",
                }
            },
        }),

    ServiceNow: (): void =>
        automateOAuthSignIn({
            authEndpoint: `https://${Cookies.get("instanceDomain")}.service-now.com/oauth_auth.do`,
            encodeRedirectUri: true,
            customLogic: () => {
                const state = generateRandomString(15)
                return { state }
            },
        }),

    Reddit: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://www.reddit.com/api/v1/authorize",
            encodeRedirectUri: true,
            scopeJoiner: "+",
            scopes: [
                "identity",
                "edit",
                "flair",
                "history",
                "modconfig",
                "modflair",
                "modlog",
                "modposts",
                "modwiki",
                "mysubreddits",
                "privatemessages",
                "read",
                "report",
                "save",
                "submit",
                "subscribe",
                "vote",
                "wikiedit",
                "wikiread",
            ],
            additionalParams: {
                duration: "permanent",
            },
            customLogic: () => {
                const state = generateRandomString(15)
                return { state }
            },
        }),

    Zendesk: (): void =>
        automateOAuthSignIn({
            authEndpoint: `https://${Cookies.get("baseUrl")}.zendesk.com/oauth/authorizations/new`,
            clientIdKey: "clientId",
            encodeRedirectUri: true,
            scopes: ["read", "write"],
        }),

    ClickUp: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://app.clickup.com/api",
            encodeRedirectUri: true,
        }),

    MailChimp: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://login.mailchimp.com/oauth2/authorize",
            encodeRedirectUri: true,
        }),

    Snowflake: (): void =>
        automateOAuthSignIn({
            authEndpoint: `https://${Cookies.get("accountId")}.snowflakecomputing.com/oauth/authorize`,
            clientIdKey: "clientId",
            encodeRedirectUri: true,
            additionalParams: {
                scope: "refresh_token",
            },
        }),

    Slack: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://slack.com/oauth/v2/authorize",
            clientIdKey: "clientId",
            encodeRedirectUri: true,
            customLogic: () => {
                const scopes = [
                    "chat:write",
                    "commands",
                    "channels:read",
                    "channels:join",
                    "files:write",
                    "files:read",
                    "emoji:read",
                    "team:read",
                    "users:read",
                    "groups:read",
                    "groups:write",
                    "usergroups:read",
                    "usergroups:write",
                    "mpim:read",
                    "mpim:write",
                    "channels:manage",
                    "im:write",
                ]
                const userScopes = [
                    "users:read",
                    "users:read.email",
                    "users.profile:read",
                    "reminders:write",
                    "groups:read",
                    "usergroups:read",
                    "usergroups:write",
                    "mpim:read",
                    "files:read",
                    "channels:write",
                ]
                return {
                    scope: scopes.join(","),
                    user_scope: userScopes.join(","),
                }
            },
        }),

    Asana: (): void =>
        automateOAuthSignIn({
            authEndpoint: "https://app.asana.com/-/oauth_authorize",
            clientIdKey: "clientId",
            encodeRedirectUri: true,
            additionalParams: {
                response_type: "code",
                state: "Asana_State",
            },
        }),
}
export const credsThatHaveConsentScreenList = [
    { name: "Google", fn: OAuthSignInServices.Google },
    { name: "SalesForce", fn: OAuthSignInServices.SalesForce },
    { name: "ZohoCRM", fn: OAuthSignInServices.ZohoCRM },
    { name: "Zoom", fn: OAuthSignInServices.Zoom },
    { name: "HubSpot", fn: OAuthSignInServices.HubSpot },
    { name: "Dropbox", fn: OAuthSignInServices.Dropbox },
    { name: "Microsoft", fn: OAuthSignInServices.Microsoft },
    { name: "Xero", fn: OAuthSignInServices.Xero },
    { name: "PipeDrive", fn: OAuthSignInServices.PipeDrive },
    { name: "QuickBooks", fn: OAuthSignInServices.QuickBooks },
    { name: "Jira", fn: OAuthSignInServices.Jira, condition: true },
    { name: "Facebook", fn: OAuthSignInServices.Facebook, continueProcess: true },
    { name: "Instagram", fn: OAuthSignInServices.Instagram },
    { name: "LinkedIn", fn: OAuthSignInServices.LinkedIn },
    { name: "X", fn: OAuthSignInServices.X },
    { name: "ServiceNow", fn: OAuthSignInServices.ServiceNow },
    { name: "Reddit", fn: OAuthSignInServices.Reddit },
    { name: "Zendesk", fn: OAuthSignInServices.Zendesk, condition: true },
    { name: "ClickUp", fn: OAuthSignInServices.ClickUp, condition: true },
    { name: "MailChimp", fn: OAuthSignInServices.MailChimp, condition: true },
    { name: "Snowflake", fn: OAuthSignInServices.Snowflake },
    { name: "Slack", fn: OAuthSignInServices.Slack, condition: true },
    { name: "Asana", fn: OAuthSignInServices.Asana, condition: true },
]