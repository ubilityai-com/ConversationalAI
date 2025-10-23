/**
 * Check if a JSON object has a file_name key
 */
export const hasFileNameKey = (jsonObj: any): boolean => {
  if (!jsonObj || typeof jsonObj !== "object") return false
  return "file_name" in jsonObj
}

/**
 * Check if node result contains file data
 */
export const hasFileResult = (result: any): boolean => {
  return result && hasFileNameKey(result)
}

/**
 * Check if result should display binary tab
 */
export const isBinaryResult = (result: any): boolean => {
  return hasFileResult(result)
}

/**
* Create file display props from node result
*/
export const createFileDisplay = (fileName: string | undefined) => {
  if (!fileName) return null

  return {
    name: fileName,
    extension: fileName.split(".").pop() || "",
    displayName: fileName,
  }
}
