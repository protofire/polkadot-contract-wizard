import { HTMLInputTypeAttribute } from 'react'
import { TokenType } from '@/types'

type Sections = 'Constructor' | 'Extensions'
export type OptionTokenField = {
  name: string
  type: HTMLInputTypeAttribute
  initState?: string | boolean
  tooltip?: string
  placeholder?: string
}

export type ConstructorFieldName =
  | 'initialSupply'
  | 'name'
  | 'symbol'
  | 'decimal'

export type ConstructorTokenField = OptionTokenField & {
  fieldName: ConstructorFieldName
  mandatory?: boolean
}

export interface OptionListType {
  Extensions: OptionTokenField[]
  Constructor: ConstructorTokenField[]
}

export interface ControlsToken<S extends Sections> {
  sectionName: S
  optionList: S extends 'Extensions'
    ? OptionTokenField[]
    : ConstructorTokenField[]
}

export type AnyControlsToken<S = Sections> = S extends Sections
  ? ControlsToken<S>
  : never

export type TokenOptionConfig = {
  name: TokenType
  controls: AnyControlsToken[]
}

export const BRUSH_NAME = 'openbrush'
export const VERSION = 'v3.0.0'
export const CONTRACT_NAME = 'Contract'

/**
 * Configuration data based on https://github.com/727-Ventures/openbrush-website/blob/master/data/wizardData.js
 */
export const WIZARD_CONFIG: Array<TokenOptionConfig> = [
  {
    name: 'psp22',
    controls: [
      {
        sectionName: 'Constructor',
        optionList: [
          {
            name: 'Initial Supply',
            type: 'number',
            placeholder: '1000000',
            tooltip: '',
            mandatory: true,
            fieldName: 'initialSupply'
          },
          {
            name: 'Name',
            type: 'text',
            placeholder: 'MyToken',
            tooltip: '',
            mandatory: false,
            fieldName: 'name'
          },
          {
            name: 'Symbol',
            type: 'text',
            placeholder: 'MTK',
            tooltip: '',
            mandatory: false,
            fieldName: 'symbol'
          },
          {
            name: 'Decimal',
            type: 'number',
            placeholder: '18',
            tooltip: '',
            mandatory: false,
            fieldName: 'decimal'
          }
        ]
      },
      {
        sectionName: 'Extensions',
        optionList: [
          {
            name: 'Metadata',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extra information about the token, such as its name and symbol.'
          },
          {
            name: 'Mintable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Capability to create new tokens increasing the total supply.'
          },
          {
            name: 'Burnable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Ability to destroy tokens from circulation, reducing the total supply.'
          },
          {
            name: 'Wrapper',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Wrapper to create a token backed by another equivalent token, with deposit and withdrawal methods.'
          },
          {
            name: 'FlashMint',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Ability to perform a flash loan on the token by minting the borrowed amount and then burning it.'
          },
          {
            name: 'Pausable',
            type: 'checkbox',
            initState: false,
            tooltip: 'Ability to pause all token transfers.'
          },
          {
            name: 'Capped',
            type: 'checkbox',
            initState: false,
            tooltip: 'Set a limit to the total supply when minting tokens.'
          }
        ]
      }
    ]
  },
  {
    name: 'psp37',
    controls: [
      {
        sectionName: 'Extensions',
        optionList: [
          {
            name: 'Batch',
            type: 'checkbox',
            initState: false,
            tooltip: 'Allows you batch transferring tokens.'
          },
          {
            name: 'Metadata',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extra information about the token, such as its name and symbol.'
          },
          {
            name: 'Mintable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Capability to create new tokens increasing the total supply.'
          },
          {
            name: 'Burnable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Ability to destroy tokens from circulation, reducing the total supply.'
          },
          {
            name: 'Enumerable',
            type: 'checkbox',
            initState: false,
            tooltip: 'Add a unique number to each NFT.'
          }
        ]
      }
    ]
  },
  {
    name: 'psp34',
    controls: [
      {
        sectionName: 'Extensions',
        optionList: [
          {
            name: 'Metadata',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extra information about the token, such as its name and symbol.'
          },
          {
            name: 'Mintable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Capability to create new tokens increasing the total supply.'
          },
          {
            name: 'Burnable',
            type: 'checkbox',
            initState: false,
            tooltip: 'Alows NFTs holders to destroy their NFTs.'
          },
          {
            name: 'Enumerable',
            type: 'checkbox',
            initState: false,
            tooltip: 'Add a unique number to each NFT.'
          }
        ]
      }
    ]
  }
]
