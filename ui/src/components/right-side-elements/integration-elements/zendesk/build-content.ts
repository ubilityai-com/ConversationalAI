import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "Ticket") {
        if (inputs.operation === "Get Ticket") {
          jsonToSend = {
            ...jsonToSend,
            id: inputs.get_ticket_id,
          };
        } else if (inputs.operation === "Get All Tickets") {
          jsonToSend = {
            ...jsonToSend,
            status: getAccvalue(inputs, "get_all_tickets_status"),
            sort_order: getAccvalue(inputs, "get_all_tickets_sort_order"),
            sort_by: getAccvalue(inputs, "get_all_tickets_sort_by"),
            group_id: getAccvalue(inputs, "get_all_tickets_group_id"),
          };
        } else if (inputs.operation === "Delete Ticket") {
          jsonToSend = {
            ...jsonToSend,
            id: inputs.delete_ticket_id,
          };
        } else if (inputs.operation === "Recover Ticket") {
          jsonToSend = {
            ...jsonToSend,
            id: inputs.recover_ticket_id,
          };
        } else if (inputs.operation === "Create Ticket") {
          jsonToSend = {
            ticket: {
              description: inputs.create_ticket_description,
              external_id: getAccvalue(
                inputs,
                "operation_create_ticket_external_id"
              ),
              group_id: getAccvalue(inputs, "create_ticket_grp_id"),
              recipient: getAccvalue(inputs, "create_ticket_recipient"),
              requester_id: getAccvalue(
                inputs,
                "create_ticket_requester_id"
              ),
              status: getAccvalue(inputs, "create_ticket_status"),
              priority: getAccvalue(inputs, "create_ticket_priority"),
              subject: getAccvalue(inputs, "create_ticket_subject"),
              type: getAccvalue(inputs, "create_ticket_type"),
              tags: getAccvalue(inputs, "create_ticket_tags").map(
                (elt:any) => elt.value
              ),
            },
          };
        } else if (inputs.operation === "Update Ticket") {
          jsonToSend = {
            ...jsonToSend,
            ticket_id: inputs.update_ticket_id,
            ticket: {
              external_id: getAccvalue(inputs, "update_ticket_external_id"),
              description: getAccvalue(inputs, "update_ticket_description"),
              requester_id: getAccvalue(
                inputs,
                "update_ticket_requester_id"
              ),
              recipient: getAccvalue(inputs, "update_ticket_recipient"),
              status: getAccvalue(inputs, "update_ticket_status"),
              priority: getAccvalue(inputs, "update_ticket_priority"),
              subject: getAccvalue(inputs, "update_ticket_subject"),
              tags: getAccvalue(inputs, "update_ticket_tags").map(
                (elt:any) => elt.value
              ),
              type: getAccvalue(inputs, "update_ticket_type"),
              group_id: getAccvalue(inputs, "update_ticket_grp_id"),
              assignee_email: getAccvalue(
                inputs,
                "update_ticket_assignee_email"
              ),
            },
          };
        }
      } else if (inputs.type === "TicketField") {
        if (inputs.operation === "Get Ticket Field") {
          jsonToSend = {
            id: inputs.id_get_ticket_field,
          };
        } else if (inputs.operation === "Get All Ticket Fields") {
        }
      } else if (inputs.type === "User") {
        if (inputs.operation === "Get User") {
          jsonToSend = {
            ...jsonToSend,
            id: inputs.get_user_id,
          };
        } else if (inputs.operation === "Get All Users") {
          jsonToSend = {
            ...jsonToSend,
            role: getAccvalue(inputs, "get_all_users_roles"),
          };
        } else if (inputs.operation === "Create User") {
          jsonToSend = {
            ...jsonToSend,
            user: {
              name: inputs.create_user_name,
              email: inputs.create_user_email,
              alias: getAccvalue(inputs, "create_user_alias"),
              details: getAccvalue(inputs, "create_user_details"),

              external_id: getAccvalue(inputs, "create_user_external_id"),
              locale: getAccvalue(inputs, "create_user_locale"),
              moderator: getAccvalue(inputs, "create_user_moderator"),
              only_private_comments: getAccvalue(
                inputs,
                "create_user_only_private_comments"
              ),
              organization_id: getAccvalue(inputs, "create_user_org_id"),
              phone: getAccvalue(inputs, "create_user_phone"),
              report_csv: getAccvalue(inputs, "create_user_report_csv"),
              restricted_agent: getAccvalue(
                inputs,
                "create_user_restricted_agent"
              ),
              role: getAccvalue(inputs, "create_user_role"),
              signature: getAccvalue(inputs, "create_user_signature"),
              suspended: getAccvalue(inputs, "create_user_suspended_users"),
              ticket_restriction: getAccvalue(
                inputs,
                "create_user_ticket_restriction"
              ),
              time_zone: getAccvalue(inputs, "create_user_timezone"),
              verified: getAccvalue(inputs, "create_user_verified_users"),
              notes: getAccvalue(inputs, "create_user_notes"),
              tags: getAccvalue(inputs, "create_user_tags").map(
                (elt:any) => elt.value
              ),
            },
          };
        } else if (inputs.operation === "Update User") {
          jsonToSend = {
            id: inputs.update_user_id,
            user: {
              email: getAccvalue(inputs, "update_user_email"),
              alias: getAccvalue(inputs, "update_user_alias"),
              details: getAccvalue(inputs, "update_user_details"),
              external_id: getAccvalue(inputs, "update_user_external_id"),
              locale: getAccvalue(inputs, "update_user_locale"),
              moderator: getAccvalue(inputs, "update_user_moderator"),
              only_private_comments: getAccvalue(
                inputs,
                "update_user_only_private_comments"
              ),
              organization_id: getAccvalue(inputs, "update_user_org_id"),
              phone: getAccvalue(inputs, "update_user_phone"),
              report_csv: getAccvalue(inputs, "update_user_report_csv"),
              restricted_agent: getAccvalue(
                inputs,
                "update_user_restricted_agent"
              ),
              role: getAccvalue(inputs, "update_user_role"),
              signature: getAccvalue(inputs, "update_user_signature"),
              suspended: getAccvalue(inputs, "update_user_suspended_users"),
              ticket_restriction: getAccvalue(
                inputs,
                "update_user_ticket_restriction"
              ),
              time_zone: getAccvalue(inputs, "update_user_timezone"),
              verified: getAccvalue(inputs, "update_user_verified_users"),
              notes: getAccvalue(inputs, "update_user_notes"),
              name: getAccvalue(inputs, "update_user_name"),
              tags: getAccvalue(inputs, "update_user_tags").map(
                (elt:any) => elt.value
              ),
            },
          };
        } else if (inputs.operation === "Delete User") {
          jsonToSend = { id: inputs.delete_user_id };
        } else if (inputs.operation === "Search User") {
          jsonToSend = {
            ...jsonToSend,
            external_id: getAccvalue(inputs, "search_user_external_id"),
            query: getAccvalue(inputs, "search_user_query"),
          };
        } else if (inputs.operation === "Get Data Related To User") {
          jsonToSend = { id: inputs.get_data_related_to_user_id };
        } else if (inputs.operation === "Get User Organization") {
          jsonToSend = { id: inputs.get_user_org_id };
        }
      } else if (inputs.type === "Organization") {
        if (inputs.operation === "Get Organization") {
          jsonToSend = { id: inputs.get_org };
        } else if (inputs.operation === "Get All Organizations") {
        } else if (inputs.operation === "Create Organization") {
          jsonToSend = {
            ...jsonToSend,
            organization: {
              name: inputs.create_org_name,
              details: getAccvalue(inputs, "create_org_details"),
              notes: getAccvalue(inputs, "create_org_notes"),
              tags: getAccvalue(inputs, "create_org_tags").map(
                (elt:any) => elt.value
              ),
            },
          };
        } else if (inputs.operation === "Update Organization") {
          jsonToSend = {
            ...jsonToSend,
            id: inputs.update_org_id,
            organization: {
              name: getAccvalue(inputs, "update_org_name"),
              details: getAccvalue(inputs, "update_org_details"),
              notes: getAccvalue(inputs, "update_org_notes"),
              tags: getAccvalue(inputs, "update_org_tags").map(
                (elt:any) => elt.value
              ),
            },
          };
        } else if (inputs.operation === "Delete Organization") {
          jsonToSend = { id: inputs.delete_org_id };
        } else if (inputs.operation === "Get Data Related To Organization") {
          jsonToSend = { id: inputs.get_data_related_to_org };
        } else if (inputs.operation === "Count Organizations") {
        }
      }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "zendesk",
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