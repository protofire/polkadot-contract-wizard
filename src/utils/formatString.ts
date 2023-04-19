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

export function shortNameLonger(name: string, maxCharacters = 10): string {
  const words = name.split(' ')
  if (words.length > 1 && words[0].length > maxCharacters) {
    const shortened_first_word =
      words[0].slice(0, 10) + '...' + words[0].slice(-1)
    return `${shortened_first_word} ${words.slice(1).join(' ')}`
  } else {
    return name
  }
}
