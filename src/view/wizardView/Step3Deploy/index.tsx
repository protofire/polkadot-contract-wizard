import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'

import { useStepsSCWizard } from '@/context'
import BackNextButton from '../../components/BackNextButtons'
import { TokenType, UserContractDetailsDraft } from '@/domain'
import {
  ControlsToken,
  GIF_COMPILING,
  SVG_AWESOME,
  SVG_SUCCESSFULLY
} from '@/constants/index'
import { useCompileContract } from '@/hooks/compileContract'
import { ContractCompiledRaw } from '@/services'
import { generateCode } from '../Step2Compile/generator'
import { useDeployContract } from '@/hooks/useDeployContract'
import { ContractConstructorDataForm } from '@/domain/wizard/step3DeployForm.types'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { useRecentlyClicked } from '@/hooks/useRecentlyClicked'
import {
  FormConstructorContract,
  ConstructorTokenFieldProps
} from './FormConstructorContract'
import { useCreateDeployments } from '@/hooks/deployments/useCreateDeployments'
import { StackStyled } from './styled'

interface StepDeployProps {
  tokenType: TokenType
  constructorFields?: ControlsToken<'Constructor'>
  onDeployContract: (deployedContract: UserContractDetailsDraft) => void
}

export default function Step3Deploy({
  constructorFields,
  tokenType,
  onDeployContract
}: StepDeployProps) {
  const { networkConnected, accountConnected } = useNetworkAccountsContext()
  const { handleBack, handleNext, dataForm } = useStepsSCWizard()
  const [contractCompiled, setContractCompiled] = useState<
    ContractCompiledRaw | undefined
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
  const { newDeployment } = useCreateDeployments()

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

  const onSubmit = async (elements: ConstructorTokenFieldProps) => {
    const _dataForm: ContractConstructorDataForm = []
    contractConstructorFields.forEach(field => {
      if (elements[field.fieldName]) {
        _dataForm.push([field.fieldName, elements[field.fieldName]])
      }
    })

    _handleDeploy(_dataForm)
  }

  const _handleDeploy = async (
    constructorParams: ContractConstructorDataForm
  ) => {
    if (!contractCompiled || !networkConnected || !accountConnected) return

    await deployContract({
      wasm: contractCompiled.wasm,
      metadata: contractCompiled.metadata,
      argsForm: constructorParams,
      code_id: contractCompiled.code_id,
      tokenType,
      blockchain: networkConnected,
      successCallback: userContractsDetail => {
        newDeployment({ userContract: userContractsDetail })
        onDeployContract(userContractsDetail)
        handleNext()
      }
    })
  }

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item>
          <StackStyled>
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
          </StackStyled>
          {contractConstructorFields.length > 0 && (
            <FormConstructorContract
              fields={contractConstructorFields}
              hasMetadata={hasMetadata}
              onSubmit={onSubmit}
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
          isLoading: _isDeploying,
          ...(contractConstructorFields.length && {
            type: 'submit',
            form: 'deploy-form'
          })
        }}
      />
    </>
  )
}
