type CredentialField = {
    label: string;
    Credential_name: string;
    Credential_value: string;
    hashed?: boolean;
};

export type GoogleCredentialTemplate = {
    type: string;
    service: string;
    Service_name: string;
    cred: CredentialField[];
    defaultRedirectUri?: boolean
};

export function buildGoogleCredentialTemplate(serviceType: string): GoogleCredentialTemplate {

    return {
        type: serviceType,
        service: serviceType,
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
            serviceType === "GoogleAds" && {
                label: "Developer Token",
                Credential_name: "developerToken",
                Credential_value: "",
                hashed: true,
            },
            serviceType === "GoogleGmail" && {
                label: "Private Key",
                Credential_name: "privateKey",
                Credential_value: "",
                hashed: true,
            },
            serviceType === "GoogleGmail" && {
                label: "Service Account Email",
                Credential_name: "clientEmail",
                Credential_value: "",
            },
        ].filter(Boolean) as CredentialField[], // ✅ removes falsy and enforces type
    };
}

export const googleServicesData = {
    GoogleGmail: {
        label: "Gmail",
        scopes: ["https://www.googleapis.com/auth/gmail.modify", "https://www.googleapis.com/auth/pubsub"],
    },
    GoogleDrive: {
        label: "Drive",
        scopes: ["https://www.googleapis.com/auth/drive"],
    },
    GoogleForms: {
        label: "Forms",
        scopes: ["https://www.googleapis.com/auth/drive"],
    },
    GoogleSheets: {
        label: "Sheets",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    },
    GoogleDocs: {
        label: "Docs",
        scopes: ["https://www.googleapis.com/auth/documents"],
    },
    GoogleCalendar: {
        label: "Calendar",
        scopes: ["https://www.googleapis.com/auth/calendar"],
    },
    GoogleMeet: {
        label: "Meet",
        scopes: ["https://www.googleapis.com/auth/calendar"],
    },
    GoogleContacts: {
        label: "Contacts",
        scopes: ["https://www.googleapis.com/auth/contacts"],
    },
    GoogleYouTube: {
        label: "YouTube",
        scopes: ["https://www.googleapis.com/auth/youtube"],
    },
    GoogleTasks: {
        label: "Tasks",
        scopes: ["https://www.googleapis.com/auth/tasks"],
    },
    GoogleBooks: {
        label: "Books",
        scopes: ["https://www.googleapis.com/auth/books"],
    },
    GoogleSlides: {
        label: "Slides",
        scopes: ["https://www.googleapis.com/auth/presentations"],
    },
    GoogleAds: {
        label: "Ads",
        scopes: ["https://www.googleapis.com/auth/adwords"],
    },
};
