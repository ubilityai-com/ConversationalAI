import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";
const checkValueIfNone = (inputs: Record<string, any>, name: string) => {
    if (name.includes(".")) {
        const properties = name.split(".");
        const firstPart = properties[0];
        const secondPart = properties[1];
        return inputs[firstPart]
            ? inputs[firstPart][secondPart]
                ? inputs[firstPart][secondPart] === "none"
                    ? undefined
                    : inputs[firstPart][secondPart]
                : undefined
            : undefined;
    } else
        return inputs[name]
            ? inputs[name][name] === "none"
                ? undefined
                : inputs[name][name]
            : undefined;
};
export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.resource === "Account") {
        if (inputs.operation === "Get Account") {
            jsonToSend = {
                ...jsonToSend,
                account_id: inputs.account_id,
            };
        } else if (inputs.operation === "Create Account") {
            jsonToSend = {
                ...jsonToSend,
                Account_Name: inputs.Account_Name,
                Account_Number: getAccvalue(
                    inputs,
                    "Account_Number_create_account.Account_Number"
                ),
                Account_Site: getAccvalue(
                    inputs,
                    "Account_Site_create_account.Account_Site"
                ),
                Annual_Revenue: getAccvalue(
                    inputs,
                    "Annual_Revenue_create_account.Annual_Revenue"
                ),
                Description: getAccvalue(
                    inputs,
                    "Description_create_account.Description"
                ),
                Employees: getAccvalue(
                    inputs,
                    "Employees_create_account.Employees"
                ),
                Fax: getAccvalue(inputs, "Fax_create_account.Fax"),
                Industry: getAccvalue(
                    inputs,
                    "Industry_create_account.Industry"
                ),
                Phone: getAccvalue(inputs, "Phone_create_account.Phone"),
                Ticker_Symbol: getAccvalue(
                    inputs,
                    "Ticker_Symbol_create_account.Ticker_Symbol"
                ),
                Website: getAccvalue(inputs, "Website_create_account.Website"),
                Billing_City: getAccvalue(
                    inputs,
                    "Billing_Address_create_account.Billing_City"
                ),
                Billing_Code: getAccvalue(
                    inputs,
                    "Billing_Address_create_account.Billing_Code"
                ),
                Billing_Country: getAccvalue(
                    inputs,
                    "Billing_Address_create_account.Billing_Country"
                ),
                Billing_State: getAccvalue(
                    inputs,
                    "Billing_Address_create_account.Billing_State"
                ),
                Billing_Street: getAccvalue(
                    inputs,
                    "Billing_Address_create_account.Billing_Street"
                ),
                Shipping_City: getAccvalue(
                    inputs,
                    "Shipping_Address_create_account.Shipping_City"
                ),
                Shipping_Code: getAccvalue(
                    inputs,
                    "Shipping_Address_create_account.Shipping_Code"
                ),
                Shipping_Country: getAccvalue(
                    inputs,
                    "Shipping_Address_create_account.Shipping_Country"
                ),
                Shipping_State: getAccvalue(
                    inputs,
                    "Shipping_Address_create_account.Shipping_State"
                ),
                Shipping_Street: getAccvalue(
                    inputs,
                    "Shipping_Address_create_account.Shipping_Street"
                ),
            };
            if (
                inputs.hasOwnProperty("Account_Type_create_account") &&
                getAccvalue(
                    inputs,
                    "Account_Type_create_account.Account_Type"
                ) === "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    Account_Type: getAccvalue(
                        inputs,
                        "Account_Type_create_account.value_Account_Type_create_account"
                    ),
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    Account_Type: checkValueIfNone(
                        inputs,
                        "Account_Type_create_account.Account_Type"
                    ),
                };
            }
        } else if (inputs.operation === "Delete Account") {
            jsonToSend = {
                ...jsonToSend,
                account_id: inputs.account_id,
            };
        }
    } else if (inputs.resource === "Contact") {
        if (inputs.operation === "Get Contact") {
            jsonToSend = {
                ...jsonToSend,
                contact_id: inputs.contact_id,
            };
        } else if (inputs.operation === "Create Contact") {
            jsonToSend = {
                ...jsonToSend,
                Last_Name: inputs.Last_Name,
                Assistant: getAccvalue(
                    inputs,
                    "Assistant_create_contact.Assistant"
                ),
                Date_of_Birth: getAccvalue(
                    inputs,
                    "Date_of_Birth_create_contact.Date_of_Birth"
                ),
                Department: getAccvalue(
                    inputs,
                    "Department_create_contact.Department"
                ),
                Description: getAccvalue(
                    inputs,
                    "Description_create_contact.Description"
                ),
                Email: getAccvalue(inputs, "Email_create_contact.Email"),
                Secondary_Email: getAccvalue(
                    inputs,
                    "Secondary_Email_create_contact.Secondary_Email"
                ),
                Fax: getAccvalue(inputs, "Fax_create_contact.Fax"),
                First_Name: getAccvalue(
                    inputs,
                    "First_Name_create_contact.First_Name"
                ),
                Mailing_City: getAccvalue(
                    inputs,
                    "Mailing_Address_create_contact.Mailing_City"
                ),
                Mailing_Zip: getAccvalue(
                    inputs,
                    "Mailing_Address_create_contact.Mailing_Zip"
                ),
                Mailing_Country: getAccvalue(
                    inputs,
                    "Mailing_Address_create_contact.Mailing_Country"
                ),
                Mailing_State: getAccvalue(
                    inputs,
                    "Mailing_Address_create_contact.Mailing_State"
                ),
                Mailing_Street: getAccvalue(
                    inputs,
                    "Mailing_Address_create_contact.Mailing_Street"
                ),
                Mobile: getAccvalue(inputs, "Mobile_create_contact.Mobile"),
                Other_City: getAccvalue(
                    inputs,
                    "Other_Address_create_contact.Other_City"
                ),
                Other_Zip: getAccvalue(
                    inputs,
                    "Other_Address_create_contact.Other_Zip"
                ),
                Other_Country: getAccvalue(
                    inputs,
                    "Other_Address_create_contact.Other_Country"
                ),
                Other_State: getAccvalue(
                    inputs,
                    "Other_Address_create_contact.Other_State"
                ),
                Other_Street: getAccvalue(
                    inputs,
                    "Other_Address_create_contact.Other_Street"
                ),
                Phone: getAccvalue(inputs, "Phone_create_contact.Phone"),
                Asst_Phone: getAccvalue(
                    inputs,
                    "Asst_Phone_create_contact.Asst_Phone"
                ),
                Home_Phone: getAccvalue(
                    inputs,
                    "Home_Phone_create_contact.Home_Phone"
                ),
                Other_Phone: getAccvalue(
                    inputs,
                    "Other_Phone_create_contact.Other_Phone"
                ),
                Salutation: getAccvalue(
                    inputs,
                    "Salutation_create_contact.Salutation"
                ),
                Skype_ID: getAccvalue(
                    inputs,
                    "Skype_ID_create_contact.Skype_ID"
                ),
                Title: getAccvalue(inputs, "Title_create_contact.Title"),
                Twitter: getAccvalue(inputs, "Twitter_create_contact.Twitter"),
            };
        } else if (inputs.operation === "Delete Contact") {
            jsonToSend = {
                ...jsonToSend,
                contact_id: inputs.contact_id,
            };
        }
    } else if (inputs.resource === "Deal") {
        if (inputs.operation === "Get Deal") {
            jsonToSend = {
                ...jsonToSend,
                deal_id: inputs.deal_id,
            };
        } else if (inputs.operation === "Create Deal") {
            jsonToSend = {
                ...jsonToSend,
                Deal_Name: inputs.Deal_Name,
                Amount: getAccvalue(inputs, "Amount_create_deal.Amount"),
                Closing_Date: getAccvalue(
                    inputs,
                    "Closing_Date_create_deal.Closing_Date"
                ),
                Description: getAccvalue(
                    inputs,
                    "Description_create_deal.Description"
                ),
                Next_Step: getAccvalue(
                    inputs,
                    "Next_Step_create_deal.Next_Step"
                ),
                Lead_Conversion_Time: getAccvalue(
                    inputs,
                    "Lead_Conversion_Time_create_deal.Lead_Conversion_Time"
                ),
                Overall_Sales_Duration: getAccvalue(
                    inputs,
                    "Overall_Sales_Duration_create_deal.Overall_Sales_Duration"
                ),
                Probability: getAccvalue(
                    inputs,
                    "Probability_create_deal.Probability"
                ),
                Sales_Cycle_Duration: getAccvalue(
                    inputs,
                    "Sales_Cycle_Duration_create_deal.Sales_Cycle_Duration"
                ),
            };
            if (
                inputs.hasOwnProperty("Stage") &&
                inputs.Stage === "Other"
            ) {
                jsonToSend = {
                    ...jsonToSend,
                    Stage: inputs.value_Stage_create_deal,
                };
            } else {
                jsonToSend = {
                    ...jsonToSend,
                    Stage: inputs.Stage,
                };
            }
        } else if (inputs.operation === "Delete Deal") {
            jsonToSend = {
                ...jsonToSend,
                deal_id: inputs.deal_id,
            };
        }
    } else if (inputs.resource === "Lead") {
        if (inputs.operation === "Get Lead") {
            jsonToSend = {
                ...jsonToSend,
                lead_id: inputs.lead_id,
            };
        } else if (inputs.operation === "Create Lead") {
            jsonToSend = {
                ...jsonToSend,
                Last_Name: inputs.Last_Name,
                Company: inputs.Company,
                City: getAccvalue(inputs, "Address_create_lead.City"),
                Zip_Code: getAccvalue(inputs, "Address_create_lead.Zip_Code"),
                Country: getAccvalue(inputs, "Address_create_lead.Country"),
                State: getAccvalue(inputs, "Address_create_lead.State"),
                Street: getAccvalue(inputs, "Address_create_lead.Street"),
                Annual_Revenue: getAccvalue(
                    inputs,
                    "Annual_Revenue_create_lead.Annual_Revenue"
                ),
                Description: getAccvalue(
                    inputs,
                    "Description_create_lead.Description"
                ),
                Designation: getAccvalue(
                    inputs,
                    "Designation_create_lead.Designation"
                ),
                Email: getAccvalue(inputs, "Email_create_lead.Email"),
                Email_Opt_Out: new Boolean(
                    getAccvalue(inputs, "Email_Opt_Out_create_lead.Email_Opt_Out")
                        ? true
                        : false
                ),
                Fax: getAccvalue(inputs, "Fax_create_lead.Fax"),
                First_Name: getAccvalue(
                    inputs,
                    "First_Name_create_lead.First_Name"
                ),
                Industry: getAccvalue(inputs, "Industry_create_lead.Industry"),
                Lead_Source: getAccvalue(
                    inputs,
                    "Lead_Source_create_lead.Lead_Source"
                ),
                Lead_Status: getAccvalue(
                    inputs,
                    "Lead_Status_create_lead.Lead_Status"
                ),
                Mobile: getAccvalue(inputs, "Mobile_create_lead.Mobile"),
                Phone: getAccvalue(inputs, "Phone_create_lead.Phone"),
                No_of_Employees: getAccvalue(
                    inputs,
                    "No_of_Employees_create_lead.No_of_Employees"
                ),
                Salutation: getAccvalue(
                    inputs,
                    "Salutation_create_lead.Salutation"
                ),
                Skype_ID: getAccvalue(inputs, "Skype_ID_create_lead.Skype_ID"),
                Secondary_Email: getAccvalue(
                    inputs,
                    "Secondary_Email_create_lead.Secondary_Email"
                ),
                Twitter: getAccvalue(inputs, "Twitter_create_lead.Twitter"),
                Website: getAccvalue(inputs, "Website_create_lead.Website"),
            };
        } else if (inputs.operation === "Delete Lead") {
            jsonToSend = {
                ...jsonToSend,
                lead_id: inputs.lead_id,
            };
        }
    } else if (inputs.resource === "Call") {
        if (inputs.operation === "Create Call") {
            jsonToSend = {
                ...jsonToSend,
                Call_Type: inputs.Call_Type_create_call,
                Call_Start_Time: inputs.Call_Start_Date_create_call,
                Subject: getAccvalue(inputs, "Subject_create_call"),
                Call_Duration: getAccvalue(inputs, "Call_Duration_create_call"),
                Description: getAccvalue(inputs, "Description_create_call"),
                Outbound_Call_Status: checkValueIfNone(
                    inputs,
                    "Outbound_Call_Status_create_call"
                ),
                Who_Id: {
                    id: getAccvalue(inputs, "Who_Id_contact_create_call"),
                },
                Call_Purpose: getAccvalue(inputs, "Call_Purpose_create_call"),
                What_Id: {
                    id: getAccvalue(inputs, "relatedTo.What_Id_create_call"),
                },
                $se_module: getAccvalue(inputs, "relatedTo.ParentModule"),
            };
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "zohoCRM",
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