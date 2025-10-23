/**
 * String manipulation utility functions
 */

/**
 * Removes HTML tags from a string
 */
export function removeHTMLTags(htmlCode: string): string {
    const withoutHTMLTags = htmlCode.replace(/<[^>]*>/g, "")
    return withoutHTMLTags.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  }
  
  /**
   * Converts camelCase to dash-case
   */
  export function camelToDashCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
      .toLowerCase()
  }
  
  /**
   * Generates a random alphanumeric string
   */
  export function generateRandomString(length = 32): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters[randomIndex]
    }
    return result
  }
  