import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Project") {
        if (inputs.operation === "Get Project") {
            jsonToSend = {
                ...jsonToSend,
                project_gid: inputs.project_gid_GetProject,
            };
        } else if (inputs.operation === "Get Many Project") {
            jsonToSend = {
                ...jsonToSend,
                workspace: inputs.workspace_GetManyProject,
                archived: getAccvalue(inputs, "archived_GetManyProject"),
                team: getAccvalue(inputs, "team_GetManyProject"),
            };
        } else if (inputs.operation === "Create Project") {
            jsonToSend = {
                ...jsonToSend,
                name: inputs.name_CreateProject,
                workspace: inputs.workspace_CreateProject,
                team: inputs.team_CreateProject,
                color: getAccvalue(inputs, "color_CreateProject"),
                due_on: getAccvalue(inputs, "due_on_CreateProject"),
                notes: getAccvalue(inputs, "notes_CreateProject"),
            };
        } else if (inputs.operation === "Create Project Template") {
            jsonToSend = {
                ...jsonToSend,
                project_template_gid:
                    inputs.project_template_gid_CreateProjectTemplate,
                name: inputs.name_CreateProjectTemplate,
                public: getAccvalue(inputs, "public_CreateProjectTemplate"),
            };
        } else if (inputs.operation === "Update Project") {
            jsonToSend = {
                ...jsonToSend,
                workspace: inputs.workspace_UpdateProject,
                project_gid: inputs.project_gid_UpdateProject,
                name: getAccvalue(inputs, "name_UpdateProject"),
                owner: getAccvalue(inputs, "owner_UpdateProject"),
                due_on: getAccvalue(inputs, "due_on_UpdateProject"),
                notes: getAccvalue(inputs, "notes_UpdateProject"),
                team: getAccvalue(inputs, "team_UpdateProject"),
            };
            if (getAccvalue(inputs, "color_UpdateProject") != "none") {
                jsonToSend = {
                    ...jsonToSend,
                    color: getAccvalue(inputs, "color_UpdateProject"),
                };
            }
        } else if (inputs.operation === "Delete Project") {
            jsonToSend = {
                ...jsonToSend,
                project_gid: inputs.project_gid_DeleteProject,
            };
        }
    } else if (inputs.type === "Task") {
        if (inputs.operation === "Get Task") {
            jsonToSend = {
                ...jsonToSend,
                task_gid: inputs.task_gid_GetTask,
            };
        } else if (inputs.operation === "Get Many Task") {
            if (inputs.Filter_type === "assignee") {
                jsonToSend = {
                    ...jsonToSend,
                    workspace: inputs.workspace_GetManyTask,
                    assignee: inputs.assignee_GetManyTask,
                };
            } else if (inputs.Filter_type === "project") {
                jsonToSend = {
                    ...jsonToSend,
                    project: inputs.project_GetManyTask,
                };
            } else if (inputs.Filter_type === "section") {
                jsonToSend = {
                    ...jsonToSend,
                    section: inputs.section_GetManyTask,
                };
            }
            jsonToSend = {
                ...jsonToSend,
                completed_since: getAccvalue(
                    inputs,
                    "completed_since_GetManyTask"
                ),
                modified_since: getAccvalue(
                    inputs,
                    "modified_since_GetManyTask"
                ),
            };
        } else if (inputs.operation === "Create Task") {
            jsonToSend = {
                ...jsonToSend,
                workspace: inputs.workspace_CreateTask,
                name: inputs.name_CreateTask,
                assignee: getAccvalue(inputs, "assignee_CreateTask"),
                assignee_status: getAccvalue(
                    inputs,
                    "assignee_status_CreateTask"
                ),
                completed: getAccvalue(inputs, "completed_CreateTask"),
                due_on: getAccvalue(inputs, "due_on_CreateTask"),
                liked: getAccvalue(inputs, "liked_CreateTask"),
                notes: getAccvalue(inputs, "notes_CreateTask"),
                projects: inputs.projects_CreateTask?.map((project:any) => {
                    return project.project_CreateTask;
                }),
            };
        } else if (inputs.operation === "Update Task") {
            jsonToSend = {
                ...jsonToSend,
                task_gid: inputs.task_gid_UpdateTask,
                name: getAccvalue(inputs, "name_UpdateTask"),
                assignee: getAccvalue(inputs, "assignee_UpdateTask"),
                assignee_status: getAccvalue(
                    inputs,
                    "assignee_status_UpdateTask"
                ),
                completed: getAccvalue(inputs, "completed_UpdateTask"),
                due_on: getAccvalue(inputs, "due_on_UpdateTask"),
                liked: getAccvalue(inputs, "liked_UpdateTask"),
                notes: getAccvalue(inputs, "notes_UpdateTask"),
            };
        } else if (inputs.operation === "Delete Task") {
            jsonToSend = {
                ...jsonToSend,
                task_gid: inputs.task_gid_DeleteTask,
            };
        } else if (inputs.operation === "Search Task") {
            jsonToSend = {
                ...jsonToSend,
                workspace_gid: inputs.workspace_gid_SearchTask,
                text: getAccvalue(inputs, "text_SearchTask"),
                completed: getAccvalue(inputs, "completed_SearchTask"),
            };
        } else if (inputs.operation === "Move Task To Section") {
            jsonToSend = {
                ...jsonToSend,
                task: inputs.task_MoveTask,
                section_gid: inputs.section_gid_MoveTask,
            };
        } else if (inputs.operation === "Duplicate Task") {
            jsonToSend = {
                ...jsonToSend,
                task_gid: inputs.task_gid_DuplicateTask,
                name: inputs.name_DuplicateTask,
                include: getAccvalue(inputs, "include_DuplicateTask")
                    ?.map((include:any) => include.value)
                    .join(","),
            };
        } else if (inputs.operation === "Upload File") {
            jsonToSend = {
                ...jsonToSend,
                parent: inputs.parent_UploadFile,
                url: inputs.url_UploadFile,
                name: inputs.name_UploadFile,
            };
        }
    } else if (inputs.type === "Subtask") {
        if (inputs.operation === "Create Subtask") {
            jsonToSend = {
                ...jsonToSend,
                task_gid: inputs.task_gid_CreateSubtask,
                name: inputs.name_CreateSubtask,
                workspace: inputs.workspace_CreateSubtask,
                assignee: getAccvalue(inputs, "assignee_CreateSubtask"),
                assignee_status: getAccvalue(
                    inputs,
                    "assignee_status_CreateSubtask"
                ),
                completed: getAccvalue(inputs, "completed_CreateSubtask"),
                due_on: getAccvalue(inputs, "due_on_CreateSubtask"),
                liked: getAccvalue(inputs, "liked_CreateSubtask"),
                notes: getAccvalue(inputs, "notes_CreateSubtask"),
            };
        } else if (inputs.operation === "Get Many Subtask") {
            jsonToSend = {
                ...jsonToSend,
                task_gid: inputs.task_gid_GetManySubtask,
            };
        }
    } else if (inputs.type === "User") {
        if (inputs.operation === "Get User") {
            jsonToSend = {
                ...jsonToSend,
                user_gid: inputs.user_gid_GetUser,
            };
        } else if (inputs.operation === "Get Many User") {
            jsonToSend = {
                ...jsonToSend,
                workspace_gid: inputs.workspace_gid_GetManyUser,
            };
        }
    } else if (inputs.type === "Task Comment") {
        if (inputs.operation === "Add Task Comment") {
            if (inputs.Format_type === "text") {
                jsonToSend = {
                    ...jsonToSend,
                    text: inputs.text_AddTaskComment,
                };
            } else if (inputs.Format_type === "html_text") {
                jsonToSend = {
                    ...jsonToSend,
                    html_text: inputs.html_text_AddTaskComment,
                };
            }
            jsonToSend = {
                ...jsonToSend,
                task_gid: inputs.task_gid_AddTaskComment,
                is_pinned: getAccvalue(inputs, "is_pinned_AddTaskComment"),
            };
        } else if (inputs.operation === "Remove Task Comment") {
            jsonToSend = {
                ...jsonToSend,
                story_gid: inputs.story_gid_RemoveTaskComment,
            };
        }
    } else if (inputs.type === "Task Project") {
        if (inputs.operation === "Add Project For Task") {
            jsonToSend = {
                ...jsonToSend,
                task_gid: inputs.task_gid_AddTaskProject,
                project: inputs.project_AddTaskProject,
                insert_after: getAccvalue(inputs, "insert_after_AddTaskProject"),
                insert_before: getAccvalue(
                    inputs,
                    "insert_before_AddTaskProject"
                ),
                section: getAccvalue(inputs, "section_AddTaskProject"),
            };
        } else if (inputs.operation === "Remove Project For Task") {
            jsonToSend = {
                ...jsonToSend,
                task_gid: inputs.task_gid_RemoveTaskProject,
                project: inputs.project_RemoveTaskProject,
            };
        } else if (inputs.operation === "Get Tasks For Project") {
            jsonToSend = {
                ...jsonToSend,
                project_gid: inputs.project_gid_GetTasks,
                completed_since: getAccvalue(inputs, "completed_since_GetTasks"),
            };
        }
    } else if (inputs.type === "Section Project") {
        if (inputs.operation === "Create Section Project") {
            jsonToSend = {
                ...jsonToSend,
                project_gid: inputs.project_gid_CreateSectionProject,
                name: inputs.name_CreateSectionProject,
                insert_after: getAccvalue(
                    inputs,
                    "insert_after_CreateSectionProject"
                ),
                insert_before: getAccvalue(
                    inputs,
                    "insert_before_CreateSectionProject"
                ),
            };
        } else if (inputs.operation === "Get Section Project") {
            jsonToSend = {
                ...jsonToSend,
                project_gid: inputs.project_gid_GetSectionProject,
            };
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "asana_software",
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