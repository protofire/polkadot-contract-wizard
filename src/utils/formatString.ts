const whitespace = Symbol('whitespace')

export type Lines = string | typeof whitespace | Lines[]

export function spaceBetween(...lines: Lines[][]): Lines[] {
  return lines
    .filter(l => l.length > 0)
    .flatMap<Lines>(l => [whitespace, ...l])
    .slice(1)
}

export function* indentEach(
  indent: number,
  lines: Lines[],
  spacesPerIndent: number
): Generator<string | typeof whitespace> {
  for (const line of lines) {
    if (line === whitespace) {
      yield ''
    } else if (Array.isArray(line)) {
      yield* indentEach(indent + 1, line, spacesPerIndent)
    } else {
      yield ' '.repeat(indent * spacesPerIndent) + line
    }
  }
}

export function formatLinesWithSpaces(
  spacesPerIndent: number,
  ...lines: Lines[]
): string {
  return [...indentEach(0, lines, spacesPerIndent)].join('\n') + '\n'
}

export function formatLines(...lines: Lines[]): string {
  return formatLinesWithSpaces(4, ...lines)
}

export function truncateAddress(
  value: string | undefined,
  sideLength = 6
): string {
  return value
    ? value.length > sideLength * 2
      ? `${value.substring(0, sideLength)}...${value.substring(
          value.length - sideLength
        )}`
      : value
    : ''
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/*
 * Separate name account and name label wallet, e.g:
 * "Account 1 (SUBWALLET-JS)"
 * ['Account 1', '(SUBWALLET-JS)]
 */
function extractAccountWallet(input: string): [string, string] {
  const match = input.match(/^(.*?)( \([^)]*\))?$/)
  if (!match || !match[1]) {
    throw new Error(`Invalid input string: ${input}`)
  }
  const accountName = match[1].trim()
  const wallet = match[2] ?? ''
  return [accountName, wallet]
}

/* ShorName longer n characters
 * Example:
 *   "POLKADOT CONTRACT WIZARD (POLKADOT-JS)"
 */
export function shortNameLonger(name: string, maxCharacters = 11): string {
  try {
    const [accountName, wallet] = extractAccountWallet(name)
    if (accountName.length <= maxCharacters) return name
    const shortenedName = accountName
      .split(' ')
      .map((word, index) => (index === 0 ? word : word.charAt(0)))
      .join(' ')
    return `${shortenedName} ${wallet}`
  } catch (e) {
    return name
  }
}

export function showUndefinedAsDash(value: string | undefined): string {
  return value ?? '-'
}
