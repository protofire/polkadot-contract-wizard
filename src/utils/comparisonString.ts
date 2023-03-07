import semver from 'semver'

/**
 * checks if a version is smaller than another version
 * @param {string} version1 - The version to be compared
 * @param {string} version2 - The version to be compared
 * @return {boolean} - Returns true if version1 is smaller than version2, false otherwise
 */
export function isSmallerVer(version1: string, version2: string): boolean {
  return semver.lt(version1, version2)
}

/**
 * Function 'isGreaterThan' checks if a version is greater than another version
 * @param {string} version1 - The version to be compared
 * @param {string} version2 - The version to be compared
 * @return {boolean} - Returns true if version1 is greater than version2, false otherwise
 */
export function isGreaterVer(version1: string, version2: string): boolean {
  return semver.gt(version1, version2)
}

/**
 * Function 'isSmallerOrEqual' checks if a version is smaller than or equal to another version
 * @param {string} version1 - The version to be compared
 * @param {string} version2 - The version to be compared
 * @return {boolean} - Returns true if version1 is smaller than or equal to version2, false otherwise
 */
export function isSmallerOrEqual(version1: string, version2: string): boolean {
  return semver.lte(version1, version2)
}
