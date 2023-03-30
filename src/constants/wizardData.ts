import { HTMLInputTypeAttribute } from 'react'
import { TokenType } from '@types'

type Sections = 'Constructor' | 'Extensions'
export type OptionTokenField = {
  name: string
  type: HTMLInputTypeAttribute
  initState?: string | boolean
  tooltip?: string
  placeholder?: string
}

export type ConstructorFieldName =
  | 'initial_supply'
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
            placeholder: '1000000 e18',
            tooltip: '',
            mandatory: true,
            fieldName: 'initial_supply'
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
            tooltip: 'Metadata for [`PSP22`] '
          },
          {
            name: 'Mintable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extension of [`PSP22`] that allows create `amount` tokens and assigns them to `account`, increasing the total supply'
          },
          {
            name: 'Burnable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extension of [`PSP22`] that allows token holders to destroy both their own tokens and those that they have an allowance for.'
          },
          {
            name: 'Wrapper',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extension of [`PSP22`] that allows you to wrap your PSP22 token in a PSP22Wrapper token which can be used for example for governance'
          },
          {
            name: 'FlashMint',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extension of [`PSP22`] that allows the user to perform a flash loan on the token my minting the borrowd amount and then burning it along with fees for the loan'
          },
          {
            name: 'Pausable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extension of [`PSP22`] that allows you to pause all token operations'
          },
          {
            name: 'Capped',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extension of [`PSP22`] that allows you to implement with a supply cap, analogue to ERC20Capped'
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
            tooltip:
              'Extension of [`PSP37`] that allows you batch transfering tokens'
          },
          {
            name: 'Metadata',
            type: 'checkbox',
            initState: false,
            tooltip: 'Metadata for [`PSP37`]'
          },
          {
            name: 'Mintable',
            type: 'checkbox',
            initState: false,
            tooltip: 'Extension of [`PSP37`] that allows minting of new tokens'
          },
          {
            name: 'Burnable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extension of [`PSP37`] that allows token holders to destroy their tokens'
          },
          {
            name: 'Enumerable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extension of [`PSP37`] that allows you to iterate over tokens'
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
            tooltip: 'Metadata for [`PSP34`]'
          },
          {
            name: 'Mintable',
            type: 'checkbox',
            initState: false,
            tooltip: 'Extension of [`PSP34`] that exposes the mint function'
          },
          {
            name: 'Burnable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extension of [`PSP34`] that allows token holders to destroy their tokens'
          },
          {
            name: 'Enumerable',
            type: 'checkbox',
            initState: false,
            tooltip:
              'Extension of [`PSP34`] that allows to iterate over all NFTs'
          }
        ]
      }
    ]
  }
]
