/**
 * Object and array manipulation utility functions
 */

/**
 * Creates an object indexed by a specific key from an array
 */
export function keyBy<T extends Record<string, any>, K extends keyof T>(list: T[], key: K): Record<string, T> {
    return list.reduce(
      (acc, item) => {
        const mapKey = String(item[key])
        acc[mapKey] = item
        return acc
      },
      {} as Record<string, T>,
    )
  }
  
  /**
   * Checks if a value is a plain object (not an array)
   */
  export function isPlainObject<T>(value: T): boolean {
    return typeof value === "object" && !Array.isArray(value)
  }
  
  /**
   * Omits specified keys from an object
   */
  export function omitKeys<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const entries = Object.entries(obj).filter(([key]) => !keys.includes(key as K))
    return Object.fromEntries(entries) as Omit<T, K>
  }
  
  /**
   * Reverses an object's keys and values
   */
  export function reverseObject<T extends Record<string, string | number | symbol>>(obj: T): Record<string, string> {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [String(value), key])) as Record<string, string>
  }
  