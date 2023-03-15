import { Box, Typography } from '@mui/material'
import { CopyBlock, atomOneDark } from 'react-code-blocks'

import { useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { ContractConfig, TokenType } from '@types'
import { getExtensions } from './getExtensions'
import { BRUSH_NAME, CONTRACT_NAME, VERSION } from '@constants'
import {
  ContractBuilder,
  Import,
  Method,
  StorageBuilder,
  TraitImpl
} from './builders'
import { isGreaterVer, isSmallerVer } from 'src/utils/comparisonString'

function generateCode(standardName: TokenType, data: ContractConfig) {
  const { extensions, usesStandardExtensions } = getExtensions(
    data,
    standardName
  )

  const contract = new ContractBuilder()
  contract.setContractName(CONTRACT_NAME)
  contract.setStandardName(standardName)
  contract.setBrushName(BRUSH_NAME)
  contract.setVersion(VERSION)
  contract.setImpl(
    new TraitImpl(`${standardName.toUpperCase()}`, CONTRACT_NAME, [])
  )

  const isEnumerable = data.extensions.Enumerable === true
  const storage = new StorageBuilder()
  storage.setDerive(
    `${
      isSmallerVer(VERSION, 'v2.2.0') ? standardName.toUpperCase() : ''
    }Storage`
  )
  storage.setField(
    `#[${
      isSmallerVer(VERSION, 'v2.2.0')
        ? standardName.toUpperCase() + 'StorageField'
        : 'storage_field'
    }]`
  )
  storage.setName(standardName)
  storage.setType(
    (isSmallerVer(VERSION, 'v2.2.0')
      ? `${standardName.toUpperCase()}Data`
      : `${standardName}::Data`) +
      (isEnumerable && isGreaterVer(VERSION, 'v2.0.0')
        ? isSmallerVer(VERSION, 'v2.2.0')
          ? '<EnumerableBalances>'
          : '<Balances>'
        : '')
  )

  contract.setStorage(storage.getStorage())

  extensions.map(e => {
    if (!e) return
    contract.addExtension(e)
  })

  const isPausable = data.extensions.Pausable === true
  const isCapped = data.extensions.Capped === true
  const isMintable = data.extensions.Mintable === true
  const isBurnable = data.extensions.Burnable === true
  const isThereMetadata = data.extensions.Metadata === true

  if (isCapped || isPausable) {
    contract.addBrushImport(
      new Import(
        `${BRUSH_NAME}::contracts::${standardName}::${
          isSmallerVer(VERSION, 'v2.2.0') ? standardName.toUpperCase() : ''
        }${isSmallerVer(VERSION, 'v1.6.0') ? 'Internal' : 'Transfer'}`
      )
    )
    contract.addAdditionalImpl(
      new TraitImpl(
        `${isSmallerVer(VERSION, 'v2.2.0') ? standardName.toUpperCase() : ''}${
          isSmallerVer(VERSION, 'v1.6.0') ? 'Internal' : 'Transfer'
        }`,
        CONTRACT_NAME,
        [
          new Method(
            BRUSH_NAME,
            false,
            true,
            isPausable ? [`#[${BRUSH_NAME}::modifiers(when_not_paused)]`] : [],
            '_before_token_transfer',
            [
              '_from: Option<&AccountId>',
              '_to: Option<&AccountId>',
              '_amount: &Balance'
            ],
            `Result<(), ${standardName.toUpperCase()}Error>`,
            isCapped
              ? `if _from.is_none() && (self.total_supply() + _amount) > self.cap() {
                return Err(PSP22Error::Custom(String::from("Cap exceeded")))
            }
            Ok(())`
              : null
          )
        ]
      )
    )
  }

  if (standardName === 'psp22') {
    contract.addConstructorArg('initial_supply: Balance')
    contract.addConstructorAction(
      `_instance._mint${
        isSmallerVer(VERSION, 'v2.3.0') ? '' : '_to'
      }(_instance.env().caller(), initial_supply).expect("Should mint"); `
    )
  }

  if (isCapped || isThereMetadata) {
    if (isSmallerVer(VERSION, 'v2.3.0'))
      contract.addInkImport(
        new Import(
          `ink${
            isSmallerVer(VERSION, 'v3.0.0-beta') ? '_' : '::'
          }prelude::string::String`
        )
      )
    else {
      contract.addBrushImport(new Import(`${BRUSH_NAME}::traits::String`))
    }
  }

  if (data.security && standardName === 'psp37' && (isMintable || isBurnable)) {
    contract.addInkImport(
      new Import(
        `ink${
          isSmallerVer(VERSION, 'v3.0.0-beta') ? '_' : '::'
        }prelude::vec::Vec`
      )
    )
  }

  if (isGreaterVer(VERSION, 'v1.3.0') && isSmallerVer(VERSION, 'v3.0.0-beta'))
    contract.addInkImport(
      new Import(
        `ink${
          isSmallerVer(VERSION, 'v3.0.0-beta') ? '_' : '::'
        }storage::traits::SpreadAllocate`
      )
    )

  if (!usesStandardExtensions) {
    contract.addBrushImport(
      new Import(`${BRUSH_NAME}::contracts::${standardName}::*`)
    )
  }

  if (isGreaterVer(VERSION, 'v2.1.0'))
    contract.addBrushImport(new Import(`${BRUSH_NAME}::traits::Storage`))

  return contract.getContract().toString()
}

export default function Step2Compile({ tokenType }: { tokenType: TokenType }) {
  const { handleBack, handleNext, dataForm } = useStepsSCWizard()

  return (
    <>
      <Typography variant="h4">
        Excelent! Now you need to compile contract {tokenType}!
      </Typography>
      <Box sx={{ overflowY: 'scroll', height: '45rem', resize: 'both' }}>
        <CopyBlock
          language="rust"
          text={generateCode(tokenType, dataForm)}
          codeBlock
          theme={atomOneDark}
          showLineNumbers={true}
        />
      </Box>

      <BackNextButton
        nextLabel="Compile Contract"
        handleBack={handleBack}
        handleNext={handleNext}
        nextButtonProps={{ startIcon: '⚙️' }}
      />
    </>
  )
}
