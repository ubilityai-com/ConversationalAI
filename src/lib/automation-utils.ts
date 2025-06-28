import { v4 as uuidv4 } from "uuid";
import { AutomationItem as BaseAutomationItem } from "../types/automation-types";

type AutomationItem = BaseAutomationItem & {
    [key: string]: any;
};
/**
 * Recursively processes automation items to set up proper structure with IDs and child relationships
 * @param apiRes - Array of automation items to process
 * @param child - Array of parent values for nested items
 * @returns Processed array of automation items with proper structure
 */
export const setAutomationArray = (apiRes: AutomationItem[], child?: string[]) => {
    const result: AutomationItem[] = []
    console.log({ apiRes, child });

    apiRes.forEach((item) => {
        const childArray = Array.isArray(child) ? child : []
        console.log({ item, childArray });

        switch (item.type) {
            case "dropdown": {
                if (item.options && "options" in item) {
                    // Handle dropdown with options
                    const clonedItem = { ...item }
                    delete (clonedItem as any).options

                    result.push({
                        ...clonedItem,
                        child: childArray,
                        id: uuidv4(),
                    })

                    // Process nested options based on current value
                    if (item.options && item.value && item.options[item.value]) {
                        const nestedItems = setAutomationArray(item.options[item.value], [...childArray, item.value])
                        console.log({ nestedItems });

                        result.push(...nestedItems)
                    }
                } else {
                    // Handle simple dropdown without options
                    result.push({
                        ...item,
                        child: childArray,
                        id: uuidv4(),
                        noOpts: true,
                    })
                }
                break
            }

            case "dynamic": {
                if (
                    "json" in item &&
                    item.json?.fieldsArray &&
                    Array.isArray(item.json.fieldsArray) &&
                    item.json.fieldsArray.length > 0
                ) {
                    // Handle dynamic item with json structure
                    result.push({
                        ...item,
                        id: uuidv4(),
                        child: childArray,
                        json: {
                            ...item.json,
                            fieldsArray: item.json.fieldsArray.map((field) =>
                                setAutomationArray(Array.isArray(field) ? field : [field]),
                            ),
                        },
                    })
                } else if ("fieldsArray" in item && Array.isArray(item.fieldsArray) && item.fieldsArray.length > 0) {
                    // Handle dynamic item with direct fieldsArray
                    result.push({
                        ...item,
                        id: uuidv4(),
                        child: childArray,
                        fieldsArray: item.fieldsArray.flatMap((field) =>
                            setAutomationArray(Array.isArray(field) ? field : [field]),
                        ),
                    })
                } else {
                    // Handle empty dynamic item
                    result.push({
                        ...item,
                        id: uuidv4(),
                        child: childArray,
                    })
                }
                break
            }

            case "accordion": {
                if ("fieldsArray" in item && Array.isArray(item.fieldsArray)) {
                    result.push({
                        ...item,
                        id: uuidv4(),
                        child: childArray,
                        fieldsArray: item.fieldsArray.map((field) => setAutomationArray(Array.isArray(field) ? field : [field])),
                    })
                } else {
                    result.push({
                        ...item,
                        id: uuidv4(),
                        child: childArray,
                    })
                }
                break
            }

            default: {
                // Handle all other item types
                result.push({
                    ...item,
                    child: childArray,
                    id: uuidv4(),
                })
                break
            }
        }
    })
    console.log({ result });

    return result
}

/**
 * Utility function to safely clone an automation item
 * @param item - The automation item to clone
 * @returns Cloned automation item
 */
export const cloneAutomationItem = (item: AutomationItem): AutomationItem => {
    return JSON.parse(JSON.stringify(item))
}

/**
 * Utility function to find an automation item by ID
 * @param items - Array of automation items to search
 * @param id - ID to search for
 * @returns Found automation item or undefined
 */
// export const findAutomationItemById = (items: AutomationItem[], id: string): AutomationItem | undefined => {
//     for (const item of items) {
//         if (item.id === id) {
//             return item
//         }

//         // Search in nested structures
//         if (item.type === "dynamic") {
//             if ("json" in item && item.json?.fieldsArray) {
//                 const found = findAutomationItemById(Array.isArray(item.json.fieldsArray) ? item.json.fieldsArray : [], id)
//                 if (found) return found
//             }
//             if ("fieldsArray" in item && Array.isArray(item.fieldsArray)) {
//                 for (const fieldArray of item.fieldsArray) {
//                     const found = findAutomationItemById(Array.isArray(fieldArray) ? fieldArray : [fieldArray], id)
//                     if (found) return found
//                 }
//             }
//         }

//         if (item.type === "accordion" && "fieldsArray" in item && Array.isArray(item.fieldsArray)) {
//             for (const fieldArray of item.fieldsArray) {
//                 const found = findAutomationItemById(Array.isArray(fieldArray) ? fieldArray : [fieldArray], id)
//                 if (found) return found
//             }
//         }
//     }

//     return undefined
// }

/**
 * Utility function to update an automation item by ID
 * @param items - Array of automation items
 * @param id - ID of item to update
 * @param updates - Partial updates to apply
 * @returns Updated array of automation items
 */
// export const updateAutomationItemById = (
//   items: AutomationItem[],
//   id: string,
//   updates: Partial<AutomationItem>,
// ): AutomationItem[] => {
//   return items.map((item) => {
//     if (item.id === id) {
//       return { ...item, ...updates }
//     }

//     // Update in nested structures
//     if (item.type === "dynamic") {
//       if ("json" in item && item.json?.fieldsArray) {
//         return {
//           ...item,
//           json: {
//             ...item.json,
//             fieldsArray: updateAutomationItemById(
//               Array.isArray(item.json.fieldsArray) ? item.json.fieldsArray : [],
//               id,
//               updates,
//             ),
//           },
//         }
//       }
//       if ("fieldsArray" in item && Array.isArray(item.fieldsArray)) {
//         return {
//           ...item,
//           fieldsArray: item.fieldsArray.map((fieldArray) =>
//             updateAutomationItemById(Array.isArray(fieldArray) ? fieldArray : [fieldArray], id, updates),
//           ),
//         }
//       }
//     }

//     if (item.type === "accordion" && "fieldsArray" in item && Array.isArray(item.fieldsArray)) {
//       return {
//         ...item,
//         fieldsArray: item.fieldsArray.map((fieldArray) =>
//           updateAutomationItemById(Array.isArray(fieldArray) ? fieldArray : [fieldArray], id, updates),
//         ),
//       }
//     }

//     return item
//   })
// }

/**
 * Utility function to remove an automation item by ID
 * @param items - Array of automation items
 * @param id - ID of item to remove
 * @returns Updated array with item removed
 */
// export const removeAutomationItemById = (items: AutomationItem[], id: string): AutomationItem[] => {
//   return items
//     .filter((item) => item.id !== id)
//     .map((item) => {
//       // Remove from nested structures
//       if (item.type === "dynamic") {
//         if ("json" in item && item.json?.fieldsArray) {
//           return {
//             ...item,
//             json: {
//               ...item.json,
//               fieldsArray: removeAutomationItemById(
//                 Array.isArray(item.json.fieldsArray) ? item.json.fieldsArray : [],
//                 id,
//               ),
//             },
//           }
//         }
//         if ("fieldsArray" in item && Array.isArray(item.fieldsArray)) {
//           return {
//             ...item,
//             fieldsArray: item.fieldsArray.map((fieldArray) =>
//               removeAutomationItemById(Array.isArray(fieldArray) ? fieldArray : [fieldArray], id),
//             ),
//           }
//         }
//       }

//       if (item.type === "accordion" && "fieldsArray" in item && Array.isArray(item.fieldsArray)) {
//         return {
//           ...item,
//           fieldsArray: item.fieldsArray.map((fieldArray) =>
//             removeAutomationItemById(Array.isArray(fieldArray) ? fieldArray : [fieldArray], id),
//           ),
//         }
//       }

//       return item
//     })
// }

/**
 * Utility function to validate automation array structure
 * @param items - Array of automation items to validate
 * @returns Validation result with errors if any
 */
export const validateAutomationArray = (
    items: AutomationItem[],
): {
    isValid: boolean
    errors: string[]
} => {
    const errors: string[] = []

    const validateItem = (item: AutomationItem, path = "") => {
        // Check required fields
        if (!item.type) {
            errors.push(`${path}: Missing required field 'type'`)
        }
        if (!item.variableName) {
            errors.push(`${path}: Missing required field 'variableName'`)
        }
        if (!item.id) {
            errors.push(`${path}: Missing required field 'id'`)
        }

        // Validate nested structures
        if (item.type === "dynamic") {
            if ("json" in item && item.json?.fieldsArray) {
                const fieldsArray = Array.isArray(item.json.fieldsArray) ? item.json.fieldsArray : []
                fieldsArray.forEach((fieldList, fieldListIndex) => {
                    fieldList.map((field, index) => validateItem(field, `${path}.json.fieldsArray[${fieldListIndex}][${index}]`))
                })
            }
            if ("fieldsArray" in item && Array.isArray(item.fieldsArray)) {
                item.fieldsArray.forEach((fieldArray, index) => {
                    if (Array.isArray(fieldArray)) {
                        fieldArray.forEach((field, fieldIndex) => {
                            validateItem(field, `${path}.fieldsArray[${index}][${fieldIndex}]`)
                        })
                    } else {
                        validateItem(fieldArray, `${path}.fieldsArray[${index}]`)
                    }
                })
            }
        }

        if (item.type === "accordion" && "fieldsArray" in item && Array.isArray(item.fieldsArray)) {
            item.fieldsArray.forEach((fieldArray, index) => {
                if (Array.isArray(fieldArray)) {
                    fieldArray.forEach((field, fieldIndex) => {
                        validateItem(field, `${path}.fieldsArray[${index}][${fieldIndex}]`)
                    })
                } else {
                    validateItem(fieldArray, `${path}.fieldsArray[${index}]`)
                }
            })
        }
    }

    items.forEach((item, index) => {
        validateItem(item, `items[${index}]`)
    })

    return {
        isValid: errors.length === 0,
        errors,
    }
}

/**
 * Utility function to get all variable names from automation array
 * @param items - Array of automation items
 * @returns Array of all variable names
 */
export const getVariableNames = (items: AutomationItem[]): string[] => {
    const variableNames: string[] = []

    const extractVariableNames = (item: AutomationItem) => {
        if (item.variableName) {
            variableNames.push(item.variableName)
        }

        // Extract from nested structures
        if (item.type === "dynamic") {
            if ("json" in item && item.json?.fieldsArray) {
                const fieldsArray = Array.isArray(item.json.fieldsArray) ? item.json.fieldsArray : []
                fieldsArray.forEach(fieldList => fieldList.forEach(extractVariableNames))
            }
            if ("fieldsArray" in item && Array.isArray(item.fieldsArray)) {
                item.fieldsArray.forEach((fieldArray) => {
                    if (Array.isArray(fieldArray)) {
                        fieldArray.forEach(extractVariableNames)
                    } else {
                        extractVariableNames(fieldArray)
                    }
                })
            }
        }

        if (item.type === "accordion" && "fieldsArray" in item && Array.isArray(item.fieldsArray)) {
            item.fieldsArray.forEach((fieldArray) => {
                if (Array.isArray(fieldArray)) {
                    fieldArray.forEach(extractVariableNames)
                } else {
                    extractVariableNames(fieldArray)
                }
            })
        }
    }

    items.forEach(extractVariableNames)
    return [...new Set(variableNames)] // Remove duplicates
}
