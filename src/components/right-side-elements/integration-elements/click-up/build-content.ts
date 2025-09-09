import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};


    if (inputs.type === "Checklist") {
        if (inputs.operation === "Create Checklist") {
            jsonToSend = {
                ...jsonToSend,
                task_id: inputs.taskIDCreateChecklist,
                name: inputs.nameCreateChecklist,
            }
        }
        else if (inputs.operation === "Update Checklist") {
            jsonToSend = {
                ...jsonToSend,
                checklist_id: inputs.idUpdateChecklist,
                name: getAccvalue(inputs, "nameUpdateChecklist.nameOptionUpdateChecklist"),
                position: getAccvalue(inputs, "positionUpdateChecklist.positionOptionUpdateChecklist"),
            }
        }
        else if (inputs.operation === "Delete Checklist") {
            jsonToSend = {
                ...jsonToSend,
                checklist_id: inputs.idDeleteChecklist,
            }
        }
    }
    else if (inputs.type === "Checklist Item") {
        if (inputs.operation === "Create Checklist Item") {
            jsonToSend = {
                ...jsonToSend,
                checklist_id: inputs.idCreateChecklistItem,
                name: inputs.nameCreateChecklistItem,
                assignee: getAccvalue(inputs, "assigneeIDCreateChecklistItem.assigneeIDOptionCreateChecklistItem"),
            }
        }
        else if (inputs.operation === "Update Checklist Item") {
            jsonToSend = {
                ...jsonToSend,
                checklist_id: inputs.idUpdateChecklistItem,
                checklist_item_id: inputs.itemIDUpdateChecklistItem,
                assignee: getAccvalue(inputs, "assigneeIDUpdateChecklistItem.assigneeIDOptionUpdateChecklistItem"),
                name: getAccvalue(inputs, "nameUpdateChecklistItem.nameOptionUpdateChecklistItem"),
                parent: getAccvalue(inputs, "parentIDUpdateChecklistItem.parentIDOptionUpdateChecklistItem"),
                resolved: getAccvalue(inputs, "resolvedUpdateChecklistItem.resolvedOptionUpdateChecklistItem"),
            }
        }
        else if (inputs.operation === "Delete Checklist Item") {
            jsonToSend = {
                ...jsonToSend,
                checklist_id: inputs.idDeleteChecklistItem,
                checklist_item_id: inputs.itemIDDeleteChecklistItem,
            }
        }
    }
    else if (inputs.type === "Folder") {
        if (inputs.operation === "Get Many Folders") {
            jsonToSend = {
                ...jsonToSend,
                space_id: inputs.spaceIDGetManyFolders,
                archived: getAccvalue(inputs, "archivedGetManyFolders.archivedOptionGetManyFolders"),
            }
        }
        else if (inputs.operation === "Get Folder") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folderIDGetFolder,
            }
        }
        else if (inputs.operation === "Create Folder") {
            jsonToSend = {
                ...jsonToSend,
                space_id: inputs.spaceIDCreateFolder,
                name: inputs.nameCreateFolder,
            }
        }
        else if (inputs.operation === "Update Folder") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folderIDUpdateFolder,
                name: inputs.nameUpdateFolder,
            }
        }
        else if (inputs.operation === "Delete Folder") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folderIDDeleteFolder,
            }
        }
    }
    else if (inputs.type === "List") {
        if (inputs.operation === "Get Many Lists") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folderIDGetManyLists,
                archived: getAccvalue(inputs, "archivedGetManyLists.archivedOptionGetManyLists"),
            }
        }
        else if (inputs.operation === "Get List") {
            if (inputs.listTypeGetList === "Foldered") {
                jsonToSend = {
                    ...jsonToSend,
                    list_id: inputs.folderedListIDGetList,
                }
            }
            else if (inputs.listTypeGetList === "Folderless") {
                jsonToSend = {
                    ...jsonToSend,
                    list_id: inputs.folderlessListIDGetList,
                }
            }
        }
        else if (inputs.operation === "Get List Members") {
            if (inputs.listTypeGetListMembers === "Foldered") {
                jsonToSend = {
                    ...jsonToSend,
                    list_id: inputs.folderedListIDGetListMembers,
                }
            }
            else if (inputs.listTypeGetListMembers === "Folderless") {
                jsonToSend = {
                    ...jsonToSend,
                    list_id: inputs.folderlessListIDGetListMembers,
                }
            }
        }
        else if (inputs.operation === "Create List") {
            jsonToSend = {
                ...jsonToSend,
                folder_id: inputs.folderIDCreateList,
                name: inputs.nameCreateList,
                content: getAccvalue(inputs, "contentCreateList.contentOptionCreateList"),
                due_date: getAccvalue(inputs, "dueDateCreateList.dueDateOptionCreateList"),
                due_date_time: getAccvalue(inputs, "dueDateTimeCreateList.dueDateTimeOptionCreateList"),
                priority: getAccvalue(inputs, "priorityCreateList.priorityOptionCreateList"),
                assignee: getAccvalue(inputs, "assigneeCreateList.assigneeOptionCreateList"),
                status: getAccvalue(inputs, "statusCreateList.statusOptionCreateList"),
            }
        }
        else if (inputs.operation === "Update List") {
            jsonToSend = {
                ...jsonToSend,
                list_id: inputs.listIDUpdateList,
                name: getAccvalue(inputs, "nameUpdateList.nameOptionUpdateList"),
                content: getAccvalue(inputs, "contentUpdateList.contentOptionUpdateList"),
                due_date: getAccvalue(inputs, "dueDateUpdateList.dueDateOptionUpdateList"),
                due_date_time: getAccvalue(inputs, "dueDateTimeUpdateList.dueDateTimeOptionUpdateList"),
                priority: getAccvalue(inputs, "priorityUpdateList.priorityOptionUpdateList"),
                assignee: getAccvalue(inputs, "assigneeUpdateList.assigneeOptionUpdateList"),
                status: getAccvalue(inputs, "statusUpdateList.statusOptionUpdateList"),
                unset_status: getAccvalue(inputs, "unsetStatusUpdateList.unsetStatusOptionUpdateList"),
            }
        }
        else if (inputs.operation === "Delete List") {
            if (inputs.listTypeDeleteList === "Foldered") {
                jsonToSend = {
                    ...jsonToSend,
                    list_id: inputs.folderedListIDDeleteList,
                }
            }
            else if (inputs.listTypeDeleteList === "Folderless") {
                jsonToSend = {
                    ...jsonToSend,
                    list_id: inputs.folderlessListIDDeleteList,
                }
            }
        }
    }
    else if (inputs.type === "Task") {
        if (inputs.operation === "Get Many Tasks") {
            jsonToSend = {
                ...jsonToSend,
                list_id: inputs.listIDGetManyTasks,
                // custom_fields: inputs.customFieldsGetManyTasks.map((field) => {
                //   return {
                //     field_id: field.fieldIDGetManyTasks,
                //     operator: field.operatorGetManyTasks,
                //     value: field.valueGetManyTasks,
                //   }
                // }),
                archived: getAccvalue(inputs, "archivedGetManyTasks.archivedOptionGetManyTasks"),
                order_by: getAccvalue(inputs, "orderByGetManyTasks.orderByOptionGetManyTasks"),
                subtasks: getAccvalue(inputs, "subtasksGetManyTasks.subtasksOptionGetManyTasks"),
                include_closed: getAccvalue(inputs, "includeClosedGetManyTasks.includeClosedOptionGetManyTasks"),
                date_created_gt: getAccvalue(inputs, "dateCreatedGtGetManyTasks.dateCreatedGtOptionGetManyTasks"),
                date_created_lt: getAccvalue(inputs, "dateCreatedLtGetManyTasks.dateCreatedLtOptionGetManyTasks"),
                date_updated_gt: getAccvalue(inputs, "dateUpdatedGtGetManyTasks.dateUpdatedGtOptionGetManyTasks"),
                date_updated_lt: getAccvalue(inputs, "dateUpdatedLtGetManyTasks.dateUpdatedLtOptionGetManyTasks"),
                due_date_gt: getAccvalue(inputs, "dueDateGtGetManyTasks.dueDateGtOptionGetManyTasks"),
                due_date_lt: getAccvalue(inputs, "dueDateLtGetManyTasks.dueDateLtOptionGetManyTasks"),
                'statuses[]': getAccvalue(inputs, "statusesGetManyTasks.statusesOptionGetManyTasks").map((elt:any) => elt.value),
                'assignees[]': getAccvalue(inputs, "assigneeIDsGetManyTasks.assigneeIDsOptionGetManyTasks").map((elt:any) => elt.value),
                'tags[]': getAccvalue(inputs, "tagIDsGetManyTasks.tagIDsOptionGetManyTasks").map((elt:any) => elt.value),
            }
        }
        else if (inputs.operation === "Get Task") {
            jsonToSend = {
                ...jsonToSend,
                task_id: inputs.taskIDGetTask,
            }
        }
        else if (inputs.operation === "Get Task Members") {
            jsonToSend = {
                ...jsonToSend,
                task_id: inputs.taskIDGetTaskMembers,
            }
        }
        else if (inputs.operation === "Create Task") {
            jsonToSend = {
                ...jsonToSend,
                list_id: inputs.listIDCreateTask,
                name: inputs.nameCreateTask,
                custom_fields: JSON.stringify(inputs.customFieldsCreateTask.map((field:any) => {
                    return {
                        id: field.fieldIDCreateTask,
                        value: field.valueCreateTask,
                    }
                })),
                description: getAccvalue(inputs, "descriptionCreateTask.descriptionOptionCreateTask"),
                assignees: getAccvalue(inputs, "assigneeIDsCreateTask.assigneeIDsOptionCreateTask").map((elt:any) => parseInt(elt.value)),
                tags: getAccvalue(inputs, "tagIDsCreateTask.tagIDsOptionCreateTask").map((elt:any) => elt.value),
                status: getAccvalue(inputs, "statusCreateTask.statusOptionCreateTask"),
                priority: getAccvalue(inputs, "priorityCreateTask.priorityOptionCreateTask"),
                due_date: getAccvalue(inputs, "dueDateCreateTask.dueDateOptionCreateTask"),
                due_date_time: getAccvalue(inputs, "dueDateTimeCreateTask.dueDateTimeOptionCreateTask"),
                time_estimate: getAccvalue(inputs, "timeEstimateCreateTask.timeEstimateOptionCreateTask"),
                start_date: getAccvalue(inputs, "startDateCreateTask.startDateOptionCreateTask"),
                start_date_time: getAccvalue(inputs, "startDateTimeCreateTask.startDateTimeOptionCreateTask"),
                notify_all: getAccvalue(inputs, "notifyAllCreateTask.timeEstimateCreateTask"),
                parent: getAccvalue(inputs, "parentIDCreateTask.parentIDOptionCreateTask"),
            }
        }
        else if (inputs.operation === "Update Task") {
            jsonToSend = {
                ...jsonToSend,
                task_id: inputs.taskIDUpdateTask,
                assignees: {
                    add: inputs.addAssigneesIDUpdateTask.map((assignee:any) => {
                        return assignee.addedAssigneeIDUpdateTask;
                    }),
                    rem: inputs.removeAssigneesIDUpdateTask.map((assignee:any) => {
                        return assignee.removedAssigneeIDUpdateTask;
                    }),
                },
                name: getAccvalue(inputs, "nameUpdateTask.nameOptionUpdateTask"),
                description: getAccvalue(inputs, "descriptionUpdateTask.descriptionOptionUpdateTask"),
                status: getAccvalue(inputs, "statusUpdateTask.statusOptionUpdateTask"),
                priority: getAccvalue(inputs, "priorityUpdateTask.priorityOptionUpdateTask"),
                due_date: getAccvalue(inputs, "dueDateUpdateTask.dueDateOptionUpdateTask"),
                due_date_time: getAccvalue(inputs, "dueDateTimeUpdateTask.dueDateTimeOptionUpdateTask"),
                time_estimate: getAccvalue(inputs, "timeEstimateUpdateTask.timeEstimateOptionUpdateTask"),
                parent: getAccvalue(inputs, "parentIDUpdateTask.parentIDOptionUpdateTask"),
                start_date: getAccvalue(inputs, "startDateUpdateTask.startDateOptionUpdateTask"),
                start_date_time: getAccvalue(inputs, "startDateTimeUpdateTask.startDateTimeOptionUpdateTask"),
                notify_all: getAccvalue(inputs, "notifyAllUpdateTask.notifyAllOptionUpdateTask"),
            }
        }
        else if (inputs.operation === "Delete Task") {
            jsonToSend = {
                ...jsonToSend,
                task_id: inputs.taskIDDelete,
            }
        }
    }
    else if (inputs.type === "Task Dependency") {
        if (inputs.operation === "Create Task Dependency") {
            jsonToSend = {
                ...jsonToSend,
                task_id: inputs.taskIDCreateTaskDependency,
            }
            if (inputs.dependencyTypeCreateTaskDependency === "Depends On") {
                jsonToSend = {
                    ...jsonToSend,
                    depends_on: inputs.taskIDDependsOnCreateTaskDependency,
                }
            }
            else if (inputs.dependencyTypeCreateTaskDependency === "Dependency Of") {
                jsonToSend = {
                    ...jsonToSend,
                    depedency_of: inputs.taskIDDependencyOfCreateTaskDependency,
                }
            }
        }
        else if (inputs.operation === "Delete Task Dependency") {
            jsonToSend = {
                ...jsonToSend,
                task_id: inputs.taskIDDeleteTaskDependency,
            }
            if (inputs.dependencyTypeDeleteTaskDependency === "Depends On") {
                jsonToSend = {
                    ...jsonToSend,
                    depends_on: inputs.taskIDDependsOnDeleteTaskDependency,
                }
            }
            else if (inputs.dependencyTypeDeleteTaskDependency === "Dependency Of") {
                jsonToSend = {
                    ...jsonToSend,
                    depedency_of: inputs.taskIDDependencyOfDeleteTaskDependency,
                }
            }
        }
    }
    else if (inputs.type === "Time Entry") {
        if (inputs.operation === "Get Many Time Entries") {
            jsonToSend = {
                ...jsonToSend,
                team_id: inputs.teamIDGetManyTimeEntries,
                start_date: getAccvalue(inputs, "startDateGetManyTimeEntries.startDateOptionGetManyTimeEntries"),
                end_date: getAccvalue(inputs, "endDateGetManyTimeEntries.endDateOptionGetManyTimeEntries"),
            }
        }
        else if (inputs.operation === "Get Time Entry") {
            jsonToSend = {
                ...jsonToSend,
                team_id: inputs.teamIDGetTimeEntry,
                timer_id: inputs.timeEntryIDGetTimeEntry,
            }
        }
        else if (inputs.operation === "Delete Time Entry") {
            jsonToSend = {
                ...jsonToSend,
                team_id: inputs.teamIDDeleteTimeEntry,
                timer_id: inputs.timeEntryIDDeleteTimeEntry,
            }
        }
        else if (inputs.operation === "Start Time Entry") {
            jsonToSend = {
                ...jsonToSend,
                team_ID: inputs.teamIDStartTimeEntry,
                tid: inputs.taskIDStartTimeEntry,
                billable: getAccvalue(inputs, "billableStartTimeEntry.billableOptionStartTimeEntry"),
                description: getAccvalue(inputs, "descriptionStartTimeEntry.descriptionOptionStartTimeEntry"),
            }
        }
        else if (inputs.operation === "Stop Time Entry") {
            jsonToSend = {
                ...jsonToSend,
                team_id: inputs.teamIDStopTimeEntry,
            }
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "clickup",
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