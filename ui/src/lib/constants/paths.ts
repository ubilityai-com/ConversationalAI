import { camelToDashCase } from "../utils/utils"

/**
 * Build component path for dynamic imports
 */
export const buildComponentPath = (category: string, type: string): string => {
  return `./${camelToDashCase(category)}-elements/${camelToDashCase(type)}/${camelToDashCase(type)}.tsx`
}

