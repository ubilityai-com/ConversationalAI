import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};


    if (inputs.type === "Contact") {
        if (inputs.operation === "Get All Contacts") {
            jsonToSend = {
                ...jsonToSend,
                personFields: inputs.personFieldsGetAllContacts?.map((include:any) => include.value).join(","),
                pageSize: getAccvalue(inputs, "contactsCountGetAllContacts.contactsCountOptionGetAllContacts"),
                sortOrder: getAccvalue(inputs, "sortOrderGetAllContacts.sortOrderOptionGetAllContacts"),

            }
        }
        else if (inputs.operation === "Get Contact") {
            jsonToSend = {
                ...jsonToSend,
                resourceName: inputs.resourceNameGetContact,
                personFields: inputs.personFieldsGetContact?.map((include:any) => include.value).join(","),
            }
        }
        else if (inputs.operation === "Search Contacts") {
            jsonToSend = {
                ...jsonToSend,
                query: inputs.querySearchContacts,
                readMask: inputs.personFieldsSearchContacts?.map((include:any) => include.value).join(","),
                pageSize: getAccvalue(inputs, "contactsCountSearchContacts.contactsCountOptionSearchContacts"),
            }
        }
        else if (inputs.operation === "Create Contact") {
            jsonToSend = {
                ...jsonToSend,
                body: {
                    names: [{
                        familyName: inputs.familyNameCreateContact,
                        givenName: inputs.givenNameCreateContact,
                        middleName: getAccvalue(inputs, "middleNameCreateContact.middleNameOptionCreateContact"),
                        honorificPrefix: getAccvalue(inputs, "honorificPrefixAsCreateContact.honorificPrefixOptionCreateContact"),
                        honorificSuffix: getAccvalue(inputs, "honorificSuffixCreateContact.honorificSuffixOptionCreateContact"),
                    }],
                    addresses: [{
                        streetAddress: getAccvalue(inputs, "AddressesCreateContact.streetAddressAddressesCreateContact"),
                        city: getAccvalue(inputs, "AddressesCreateContact.cityAddressesCreateContact"),
                        region: getAccvalue(inputs, "AddressesCreateContact.regionAddressesCreateContact"),
                        countryCode: getAccvalue(inputs, "AddressesCreateContact.countryCodeAddressesCreateContact"),
                        postalCode: getAccvalue(inputs, "AddressesCreateContact.postalCodeAddressesCreateContact"),
                        type: getAccvalue(inputs, "AddressesCreateContact.typeAddressesCreateContact"),
                    }],
                    birthdays: [{
                        date: {
                            year: getAccvalue(inputs, "birthdayCreateContact.yearBirthdayCreateContact"),
                            month: getAccvalue(inputs, "birthdayCreateContact.monthBirthdayCreateContact"),
                            day: getAccvalue(inputs, "birthdayCreateContact.dayBirthdayCreateContact"),
                        },
                    }],
                    organizations: getAccvalue(inputs, "companyCreateContact.paramsCompanyCreateContact").map((company:any) => {
                        return {
                            domain: company.domainParamsCompanyCreateContact,
                            name: company.nameParamsCompanyCreateContact,
                            title: company.titleParamsCompanyCreateContact,
                            current: company.currentParamsCompanyCreateContact,
                        }
                    }),
                    userDefined: getAccvalue(inputs, "customFieldsCreateContact.paramsCustomFieldsCreateContact").map((custom:any) => {
                        return {
                            key: custom.keyParamsCustomFieldsCreateContact,
                            value: custom.valueParamsCustomFieldsCreateContact,
                        }
                    }),
                    emailAddresses: getAccvalue(inputs, "emailCreateContact.paramsEmailCreateContact").map((email:any) => {
                        return {
                            value: email.valueParamsEmailCreateContact,
                            type: email.typeParamsEmailCreateContact,
                        }
                    }),
                    events: getAccvalue(inputs, "eventCreateContact.paramsEventCreateContact").map((custom:any) => {
                        return {
                            date: {
                                year: custom.yearParamsEventCreateContact,
                                month: custom.monthParamsEventCreateContact,
                                day: custom.dayParamsEventCreateContact,
                            },
                            type: custom.typeParamsEventCreateContact,
                        }
                    }),
                    fileAses: [{
                        value: getAccvalue(inputs, "fileAsCreateContact.fileAsOptionCreateContact"),
                    }],
                    memberships: getAccvalue(inputs, "contactGroupsCreateContact.paramsContactGroupsCreateContact").map((resource:any) => {
                        return {
                            contactGroupMembership: {
                                contactGroupResourceName: resource.resourceNameParamsContactGroupsCreateContact,
                            },
                        }
                    }),
                    phoneNumbers: getAccvalue(inputs, "phoneNumbersCreateContact.paramsPhoneNumbersCreateContact").map((number:any) => {
                        return {
                            value: number.valueParamsPhoneNumbersCreateContact,
                            type: number.typeParamsPhoneNumbersCreateContact,
                        }
                    }),
                    relations: getAccvalue(inputs, "relationsCreateContact.paramsRelationsCreateContact").map((relation:any) => {
                        return {
                            person: relation.personParamsRelationsCreateContact,
                            type: relation.typeParamsRelationsCreateContact,
                        }
                    }),
                },
            }
        }
        else if (inputs.operation === "Update Contact") {
            jsonToSend = {
                ...jsonToSend,
                resourceName: inputs.resourceNameUpdateContact,
                updatePersonFields: inputs.personFieldsUpdateContact?.map((include:any) => include.value).join(","),
                body: {
                    names: [{
                        familyName: getAccvalue(inputs, "nameUpdateContact.givenNameNameUpdateContact"),
                        givenName: getAccvalue(inputs, "nameUpdateContact.familyNameNameUpdateContact"),
                        middleName: getAccvalue(inputs, "nameUpdateContact.middleNameNameUpdateContact"),
                        honorificPrefix: getAccvalue(inputs, "nameUpdateContact.honorificPrefixNameUpdateContact"),
                        honorificSuffix: getAccvalue(inputs, "nameUpdateContact.honorificSuffixNameUpdateContact"),
                    }],
                    etag: inputs.eTagUpdateContact,
                    addresses: [{
                        streetAddress: getAccvalue(inputs, "AddressesUpdateContact.streetAddressAddressesUpdateContact"),
                        city: getAccvalue(inputs, "AddressesUpdateContact.cityAddressesUpdateContact"),
                        region: getAccvalue(inputs, "AddressesUpdateContact.regionAddressesUpdateContact"),
                        countryCode: getAccvalue(inputs, "AddressesUpdateContact.countryCodeAddressesUpdateContact"),
                        postalCode: getAccvalue(inputs, "AddressesUpdateContact.postalCodeAddressesUpdateContact"),
                        type: getAccvalue(inputs, "AddressesUpdateContact.typeAddressesUpdateContact"),
                    }],
                    birthdays: [{
                        date: {
                            year: getAccvalue(inputs, "birthdayUpdateContact.yearBirthdayUpdateContact"),
                            month: getAccvalue(inputs, "birthdayUpdateContact.monthBirthdayUpdateContact"),
                            day: getAccvalue(inputs, "birthdayUpdateContact.dayBirthdayUpdateContact"),
                        },
                    }],
                    organizations: getAccvalue(inputs, "companyUpdateContact.paramsCompanyUpdateContact").map((company:any) => {
                        return {
                            domain: company.domainParamsCompanyUpdateContact,
                            name: company.nameParamsCompanyUpdateContact,
                            title: company.titleParamsCompanyUpdateContact,
                            current: company.currentParamsCompanyUpdateContact,
                        }
                    }),
                    userDefined: getAccvalue(inputs, "customFieldsUpdateContact.paramsCustomFieldsUpdateContact").map((custom:any) => {
                        return {
                            key: custom.keyParamsCustomFieldsUpdateContact,
                            value: custom.valueParamsCustomFieldsUpdateContact,
                        }
                    }),
                    emailAddresses: getAccvalue(inputs, "emailUpdateContact.paramsEmailUpdateContact").map((email:any) => {
                        return {
                            value: email.valueParamsEmailUpdateContact,
                            type: email.typeParamsEmailUpdateContact,
                        }
                    }),
                    events: getAccvalue(inputs, "eventUpdateContact.paramsEventUpdateContact").map((custom:any) => {
                        return {
                            date: {
                                year: custom.yearParamsEventUpdateContact,
                                month: custom.monthParamsEventUpdateContact,
                                day: custom.dayParamsEventUpdateContact,
                            },
                            type: custom.typeParamsEventUpdateContact,
                        }
                    }),
                    fileAses: [{
                        value: getAccvalue(inputs, "fileAsUpdateContact.fileAsOptionUpdateContact"),
                    }],
                    memberships: getAccvalue(inputs, "contactGroupsUpdateContact.paramsContactGroupsUpdateContact").map((resource:any) => {
                        return {
                            contactGroupMembership: {
                                contactGroupResourceName: resource.resourceNameParamsContactGroupsUpdateContact,
                            },
                        }
                    }),
                    phoneNumbers: getAccvalue(inputs, "phoneNumbersUpdateContact.paramsPhoneNumbersUpdateContact").map((number:any) => {
                        return {
                            value: number.valueParamsPhoneNumbersUpdateContact,
                            type: number.typeParamsPhoneNumbersUpdateContact,
                        }
                    }),
                    relations: getAccvalue(inputs, "relationsUpdateContact.paramsRelationsUpdateContact").map((relation:any) => {
                        return {
                            person: relation.personParamsRelationsUpdateContact,
                            type: relation.typeParamsRelationsUpdateContact,
                        }
                    }),
                },
            }
        }
        else if (inputs.operation === "Delete Contact") {
            jsonToSend = {
                ...jsonToSend,
                resourceName: inputs.resourceNameDeleteContact,
            }
        }
        else if (inputs.operation === "Upload Contact Photo") {
            jsonToSend = {
                ...jsonToSend,
                resourceName: inputs.resourceNameUploadContactPhoto,
                personFields: inputs.personFieldsUploadContactPhoto?.map((include:any) => include.value).join(","),
                photoSource: inputs.uploadFromUploadContactPhoto,
            }
            if (inputs.uploadFromUploadContactPhoto === "url") {
                jsonToSend = {
                    ...jsonToSend,
                    photoUrl: inputs.photoURLUploadContactPhoto,
                }
            }
            else if (inputs.uploadFromUploadContactPhoto === "base64") {
                jsonToSend = {
                    ...jsonToSend,
                    photoBytes: inputs.photoBase64StringUploadContactPhoto,
                }
            }
        }

    }
    else if (inputs.type === "Contacts Group") {
        if (inputs.operation === "Get All Contact Groups") {
            jsonToSend = {
                ...jsonToSend,
                pageSize: getAccvalue(inputs, "contactGroupsCountGetAllContactGroups.contactGroupsCountOptionGetAllContactGroups"),
                groupFields: getAccvalue(inputs, "groupFieldsGetAllContactGroups.groupFieldsOptionGetAllContactGroups")?.map((include:any) => include.value).join(","),
            }
        }
        else if (inputs.operation === "Create Group") {
            jsonToSend = {
                ...jsonToSend,
                name: inputs.nameCreateGroup,
            }
        }
        else if (inputs.operation === "Update Contacts In Group") {
            jsonToSend = {
                ...jsonToSend,
                resourceName: inputs.resourceNameUpdateContactsInGroup,
                body: {
                    resourceNamesToAdd: inputs.addedContactsUpdateContactsInGroup?.map((resource:any) => {
                        return resource.addedContactResourceNameUpdateContactsInGroup
                    }),
                    resourceNamesToRemove: inputs.removedContactsUpdateContactsInGroup?.map((resource:any) => {
                        return resource.removedContactResourceNameUpdateContactsInGroup
                    }),
                },
            }
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "google_contacts",
            credential: inputs.cred,
            operation: inputs.operation,
            saveOutputAs: getOutputVariablesByNodeId(selectedNode.id),
        },
    };
    return {
        type: "AppIntegration",
        content: content,
        cred: inputs?.cred,
    };
}