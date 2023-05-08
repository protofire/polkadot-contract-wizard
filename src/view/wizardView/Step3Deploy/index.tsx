import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Image from 'next/image'

import { useStepsSCWizard } from '@/context'
import BackNextButton from '../BackNextButtons'
import { TokenType } from '@/domain'
import { StyledTextField } from '@/components/Input'
import {
  ConstructorFieldName,
  ConstructorTokenField,
  ControlsToken,
  GIF_COMPILING,
  SVG_AWESOME,
  SVG_SUCCESSFULLY
} from '@/constants/index'
import { FormEvent } from '@/domain/common/FormEvent'
import { useCompileContract } from 'src/hooks/useCompileContract'
import { ContractResponse } from '@/infrastructure'
import { generateCode } from '../Step2Compile/generator'
import { useDeployContract } from 'src/hooks/useDeployContract'
import { ContractConstructorDataForm } from '@/domain/wizard/step3DeployForm.types'
import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'
import { ContractDeployed } from '@/domain'
import { useRecentlyClicked } from 'src/hooks/useRecentlyClicked'
import { FormConstructorContract } from './FormConstructorContract'

type ConstructorTokenFieldProps = { [key in ConstructorFieldName]: string }

function textFieldFactory(field: ConstructorTokenField, required = true) {
  {
    return (
      <StyledTextField
        key={field.name}
        label={field.name}
        type={field.type}
        required={required}
        name={field.fieldName}
        placeholder={field.placeholder}
      />
    )
  }
}

export default function Step3Deploy({
  constructorFields,
  tokenType,
  onDeployContract
}: {
  tokenType: TokenType
  constructorFields?: ControlsToken<'Constructor'>
  onDeployContract: (deployedContract: ContractDeployed) => void
}) {
  const {
    state: { chainInfo }
  } = useNetworkAccountsContext()
  const { handleBack, handleNext, dataForm } = useStepsSCWizard()
  const [contractCompiled, setContractCompiled] = useState<
    ContractResponse | undefined
  >()
  const hasMetadata = Boolean(dataForm.extensions.Metadata)
  const { compileContract } = useCompileContract()
  const contractConstructorFields = constructorFields?.optionList || []
  const isButtonNextDisabled = contractCompiled === undefined
  const codeGenerated = useMemo(
    () => generateCode(tokenType, dataForm),
    [dataForm, tokenType]
  )
  const mustLoad = useRef<boolean>(true)
  const { deployContract, isLoading: isDeploying } = useDeployContract()
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(500)
  const _isDeploying = recentlyClicked || isDeploying

  useEffect(() => {
    if (!dataForm.currentAccount || !mustLoad.current) return

    compileContract({
      address: dataForm.currentAccount,
      tokenType,
      code: codeGenerated,
      isPausable: !!dataForm.extensions.Pausable,
      ...(dataForm.security ? { security: dataForm.security } : {})
    }).then(contract => contract && setContractCompiled(contract))

    return () => {
      mustLoad.current = false
    }
  }, [
    codeGenerated,
    compileContract,
    dataForm.currentAccount,
    dataForm.security,
    tokenType,
    mustLoad,
    dataForm.extensions.Pausable
  ])

  const handleSubmit = async (event: FormEvent<ConstructorTokenFieldProps>) => {
    event.preventDefault()
    const { elements } = event.target
    const _dataForm: ContractConstructorDataForm = []

    console.log('__Elements', elements)
    // if (metadataFields.length > 0 && elements['decimal'].value != '0') {
    //   elements['initialSupply'].value = (
    //     Number(elements['initialSupply'].value) *
    //     Math.pow(10, Number(elements['decimal'].value))
    //   ).toString()
    // }

    // mandatoryFields.concat(metadataFields).forEach(field => {
    //   if (elements[field.fieldName]) {
    //     _dataForm.push([
    //       field.fieldName,
    //       field.type === 'number'
    //         ? Number(elements[field.fieldName].value)
    //         : elements[field.fieldName].value
    //     ])
    //   }
    // })

    // _handleDeploy(_dataForm)
  }

  const _handleDeploy = async (
    constructorParams: ContractConstructorDataForm
  ) => {
    if (!contractCompiled || !chainInfo) return

    const result = await deployContract({
      wasm: contractCompiled.wasm,
      metadata: contractCompiled.metadata,
      argsForm: constructorParams,
      code_id: contractCompiled.code_id,
      tokenType,
      blockchain: chainInfo.systemChain || 'unknown'
    })

    if (result) {
      onDeployContract(result)
      handleNext()
    }
  }

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item>
          <Stack
            sx={{
              background: '#20222D',
              borderRadius: '1rem',
              alignItems: 'center',
              maxWidth: '30rem',
              margin: '2rem auto 3rem auto',
              padding: '0 1rem',
              flexDirection: 'row'
            }}
          >
            <Image
              alt={contractCompiled ? 'successfully' : 'compiling'}
              src={contractCompiled ? SVG_SUCCESSFULLY : GIF_COMPILING}
              width={150}
              height={150}
            />
            <Typography variant="h4" align="center" sx={{ margin: '0 1rem' }}>
              {contractCompiled ? (
                <>
                  <p>Contract successfully compiled.</p>
                  <Image
                    alt="awesome"
                    src={SVG_AWESOME}
                    width={22}
                    height={22}
                  />
                </>
              ) : (
                <p>Your contract is being compiled by us.</p>
              )}
            </Typography>
          </Stack>
          {contractConstructorFields.length > 0 && (
            <form id="deploy-form" onSubmit={handleSubmit}>
              <Stack
                sx={{
                  padding: '1rem',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h3" align="center">
                  You need to fill the constructor parameters for the
                  deployment.
                </Typography>
                <ArrowDownwardIcon
                  fontSize="large"
                  sx={{ margin: '1rem 0 0 0' }}
                />
              </Stack>

              <FormConstructorContract
                fields={contractConstructorFields}
                hasMetadata={hasMetadata}
              />
            </form>
          )}
        </Grid>
      </Grid>
      <BackNextButton
        nextLabel="Deploy Contract"
        handleBack={handleBack}
        handleNext={
          contractConstructorFields.length ? undefined : () => _handleDeploy([])
        }
        hiddenBack={true}
        nextButtonProps={{
          ref: refButton,
          endIcon: isButtonNextDisabled ? '🚫' : '🚀',
          disabled: isButtonNextDisabled,
          loading: _isDeploying,
          ...(contractConstructorFields.length && {
            type: 'submit',
            form: 'deploy-form'
          })
        }}
      />
    </>
  )
}
