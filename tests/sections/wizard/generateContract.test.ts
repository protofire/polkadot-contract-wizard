import fs from 'fs-extra'
import crypto from 'crypto'

import { generateCode } from '@/view/wizardView/Step2Compile/generator'
import { ContractConfigMother } from '../../mother/ContractConfig'
import { TokenType } from '@/domain'

function removeSpacesAndBreak(text: string) {
  return text.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, '')
}

describe('Generate code', () => {
  it('should generate psp22 base code', async () => {
    const token: TokenType = 'psp22'
    const contractConfigPSP = ContractConfigMother.create()
    const originalCode = await fs.readFileSync(
      'src/data/contracts_rs/psp22.rs',
      'utf8'
    )
    const originalHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(originalCode))
      .digest('hex')

    const generatedContract = generateCode(token, contractConfigPSP)
    const modifiedHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(generatedContract))
      .digest('hex')

    // Compare hashes
    expect(modifiedHash).toEqual(originalHash)
  })

  it('should generate all extensions psp22 and AccessControlEnumerable code', async () => {
    const token: TokenType = 'psp22'
    const contractConfigPSP = ContractConfigMother.create({
      extensions: {
        Metadata: true,
        Mintable: true,
        Burnable: true,
        Wrapper: true,
        FlashMint: true,
        Pausable: true,
        Capped: true
      },
      security: 'access_control_enumerable',
      constructor: {}
    })
    const originalCode = await fs.readFileSync(
      'src/data/contracts_rs/psp22_full.rs',
      'utf8'
    )
    const originalHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(originalCode))
      .digest('hex')

    const generatedContract = generateCode(token, contractConfigPSP)
    const modifiedHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(generatedContract))
      .digest('hex')

    expect(modifiedHash).toEqual(originalHash)
  })

  it('should generate psp34 base code', async () => {
    const token: TokenType = 'psp34'
    const contractConfigPSP = ContractConfigMother.create()
    const originalCode = await fs.readFileSync(
      'src/data/contracts_rs/psp34.rs',
      'utf8'
    )
    const originalHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(originalCode))
      .digest('hex')

    const generatedContract = generateCode(token, contractConfigPSP)
    const modifiedHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(generatedContract))
      .digest('hex')

    expect(modifiedHash).toEqual(originalHash)
  })

  it('should generate all extensions psp34 AccessControlEnumerable code', async () => {
    const token: TokenType = 'psp34'
    const contractConfigPSP = ContractConfigMother.create({
      extensions: {
        Metadata: true,
        Mintable: true,
        Burnable: true,
        Enumerable: true
      },
      security: 'access_control_enumerable',
      constructor: {}
    })
    const originalCode = await fs.readFileSync(
      'src/data/contracts_rs/psp34_full.rs',
      'utf8'
    )
    const originalHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(originalCode))
      .digest('hex')

    const generatedContract = generateCode(token, contractConfigPSP)
    const modifiedHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(generatedContract))
      .digest('hex')

    expect(modifiedHash).toEqual(originalHash)
  })

  it('should generate psp37 base code', async () => {
    const token: TokenType = 'psp37'
    const contractConfigPSP = ContractConfigMother.create()
    const originalCode = await fs.readFileSync(
      'src/data/contracts_rs/psp37.rs',
      'utf8'
    )
    const originalHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(originalCode))
      .digest('hex')

    const generatedContract = generateCode(token, contractConfigPSP)
    const modifiedHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(generatedContract))
      .digest('hex')

    expect(modifiedHash).toEqual(originalHash)
  })

  it('should generate all extensions psp37 Ownable code', async () => {
    const token: TokenType = 'psp37'
    const contractConfigPSP = ContractConfigMother.create({
      extensions: {
        Batch: true,
        Metadata: true,
        Mintable: true,
        Burnable: true,
        Enumerable: true
      },
      security: 'ownable',
      constructor: {}
    })
    const originalCode = await fs.readFileSync(
      'src/data/contracts_rs/psp37_full_ownable.rs',
      'utf8'
    )
    const originalHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(originalCode))
      .digest('hex')

    const generatedContract = generateCode(token, contractConfigPSP)
    const modifiedHash = crypto
      .createHash('sha256')
      .update(removeSpacesAndBreak(generatedContract))
      .digest('hex')

    // Compare hashes
    expect(modifiedHash).toEqual(originalHash)
  })
})
