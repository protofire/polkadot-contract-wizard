import fs from 'fs-extra'
import crypto from 'crypto'

import { generateCode } from '@/view/wizardView/Step2Compile/generator'

describe('Generate code', () => {
  it('should generate psp22 code', async () => {
    const originalCode = await fs.readFileSync(
      'src/data/contracts_rs/psp22.rs',
      'utf8'
    )
    const originalHash = crypto
      .createHash('sha256')
      .update(originalCode)
      .digest('hex')

    // // Modify code and generate new hash
    const modifiedCode = generateCode(
      originalCode + '// This is a modification'
    )
    const modifiedHash = crypto
      .createHash('sha256')
      .update(modifiedCode)
      .digest('hex')

    // Compare hashes
    expect(modifiedHash).not.toEqual(originalHash)
  })
})
