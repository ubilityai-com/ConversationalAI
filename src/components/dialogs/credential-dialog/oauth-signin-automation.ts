import Cookies from "js-cookie"

interface OAuthSignInParams {
    authEndpoint: string
    clientIdKey?: string
    redirectUri?: string
    scopes?: string[]
    responseType?: string
    additionalParams?: Record<string, string>
    scopeJoiner?: string
    encodeRedirectUri?: boolean
    customLogic?: () => Record<string, string>
}

export const automateOAuthSignIn = ({
    authEndpoint,
    clientIdKey = "clientID",
    redirectUri,
    scopes = [],
    responseType = "code",
    additionalParams = {},
    scopeJoiner = " ",
    encodeRedirectUri = false,
    customLogic,
}: OAuthSignInParams): void => {
    const clientId = Cookies.get(clientIdKey)
    const finalRedirectUri = redirectUri || `http://localhost:3000`

    if (!clientId) {
        console.error(`Client ID not found with key: ${clientIdKey}`)
        return
    }

    // Build base parameters
    const params: Record<string, string> = {
        client_id: clientId,
        redirect_uri: encodeRedirectUri ? encodeURIComponent(finalRedirectUri) : finalRedirectUri,
        response_type: responseType,
        ...additionalParams,
    }

    // Add scopes if provided
    if (scopes.length > 0) {
        params.scope = scopes.join(scopeJoiner)
    }

    // Apply custom logic if provided
    if (customLogic) {
        const customParams = customLogic()
        Object.assign(params, customParams)
    }

    // Build URL
    const urlParams = new URLSearchParams(params)
    const fullUrl = `${authEndpoint}?${urlParams.toString()}`

    console.log("Redirecting to:", fullUrl)
    window.location.href = fullUrl
}
