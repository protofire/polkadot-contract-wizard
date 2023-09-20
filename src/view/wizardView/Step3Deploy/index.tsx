import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'

import { useStepsSCWizard } from '@/context'
import BackNextButton from '../BackNextButtons'
import { TokenType } from '@/domain'
import {
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
import {
  FormConstructorContract,
  ConstructorTokenFieldProps
} from './FormConstructorContract'
import { useAddContractDeployments } from '@/hooks/deployments/useAddContractsDeployments'
import { ChainId } from '@/infrastructure/useink/chains'

export default function Step3Deploy({
  constructorFields,
  tokenType,
  onDeployContract
}: {
  tokenType: TokenType
  constructorFields?: ControlsToken<'Constructor'>
  onDeployContract: (deployedContract: ContractDeployed) => void
}) {
  const { networkConnected, accountConnected } = useNetworkAccountsContext()
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
  const { addDeployment } = useAddContractDeployments()

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

    contractConstructorFields.forEach(field => {
      if (hasMetadata && field.fieldName === 'initialSupply') {
        _dataForm.push([
          field.fieldName,
          elements.initialSupplyPowDecimal.value
        ])

        return
      }
      if (elements[field.fieldName]) {
        _dataForm.push([field.fieldName, elements[field.fieldName].value])
      }
    })

    _handleDeploy(_dataForm)
  }

  const _handleDeploy = async (
    constructorParams: ContractConstructorDataForm
  ) => {
    if (!contractCompiled || !networkConnected || !accountConnected) return

    const result = await deployContract({
      wasm: contractCompiled.wasm,
      metadata: contractCompiled.metadata,
      argsForm: constructorParams,
      code_id: contractCompiled.code_id,
      tokenType,
      blockchain: networkConnected,
      successCallback: contractDeployed =>
        addDeployment({
          userAddress: accountConnected.address,
          contractName: contractDeployed.type,
          codeId: contractDeployed.code_id,
          contractAddress: contractDeployed.address,
          network: contractDeployed.blockchain as ChainId
        })
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
            <FormConstructorContract
              fields={contractConstructorFields}
              hasMetadata={hasMetadata}
              handleSubmit={handleSubmit}
            />
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
