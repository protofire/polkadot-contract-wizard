/**
 * Parse a JSON string to an object of type Record<string, unknown>.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @returns {Record<string, unknown> | undefined} - The parsed object or undefined if parsing fails.
 */
export function parseJsonToRecord(
  jsonString: string
): Record<string, unknown> | undefined {
  try {
    const parsedValue: Record<string, unknown> = JSON.parse(jsonString)
    return parsedValue
  } catch (error) {
    return undefined
  }
}
