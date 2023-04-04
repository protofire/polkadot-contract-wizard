import { indentEach } from 'src/utils/formatString'

describe('indentEach', () => {
  it('returns the string with the appropriate number of added spaces', () => {
    const lines = ['#[ink(storage)]', '#[derive(Default, Storage)]']
    const indent = 1
    const spacesPerIndent = 4
    const expectedLines = [
      '    #[ink(storage)]',
      '    #[derive(Default, Storage)]'
    ]

    const generator = indentEach(indent, lines, spacesPerIndent)
    let line
    for (let i = 0; i < expectedLines.length; i++) {
      line = generator.next()
      expect(line.value).toBe(expectedLines[i])
    }
  })
})
