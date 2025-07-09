// Types
export interface CredentialOption {
    option?: string
    label?: string
    value: string
    data?: Record<string, any>
    [key: string]: any // For dynamic properties like pageID, pageAccessToken, etc.
}
export interface CredentialField {
    label?: string
    Credential_name: string
    Credential_value: any
    placeholder?: string
    optional?: boolean
    hidden?: boolean
    disabled?: boolean
    readOnly?: boolean
    hashed?: boolean
    switch?: boolean
    dropdown?: boolean
    radio?: boolean
    api?: boolean
    custom?: boolean
    connectBtn?: boolean
    credTypeConnection?: boolean
    imgSrc?: string
    list?: CredentialOption[]
    options?: Record<string, CredentialField[]>
    getList?: () => void
    typeOfValue?: string
    value?: string
    deleteOnCreate?: boolean
}

export interface CredentialInfo {
    type: string
    service: string
    Service_name: string
    description?: string
    CREATE?: boolean
    cred: CredentialField[]
    defaultRedirectUri?: boolean

}

export interface AutoCompleteItem {
    title: string
    image: string
}

export interface CopyField {
    label: string
    value: string
}

export interface CredentialModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (credInfo: CredentialInfo) => void
    serviceFields?: CredentialInfo[]
    credentialsList?: any[]
    authToken?: string
}