import { Stack } from '@mui/material'
import { StyledTextField } from '@/components'
import { useParseMetadataField } from '@/hooks/useParseMetadataField'
import { DropZone } from '@/view/components/DropZone'
import { DropzoneWrapper } from '@/view/components/DropZone/DropzoneWrapper'
import { useFormInput } from '@/hooks'
import { notEmpty } from '@/utils/inputValidation'
import { onlyAddress } from '@/utils/blockchain'
import { nameWithTimestamp } from '@/utils/generators'
import { useIsOnChain } from '@/hooks/validationForms/useIsOnChain'
import { useCompareString } from '@/hooks/useCompareString'
import { useEffect } from 'react'
import { TextCodeHashValidation } from './TextCodeHashValidation'
import { ChainId } from '@/services/useink/chains'
import BackNextButton from '@/components/BackNextButtons'
import { ROUTES } from '@/constants'
import router from 'next/router'

interface SourceInMetadata {
  hash: string
}

export function CustomContractsForm({ network }: { network: ChainId }) {
  const { compare: compareCodeHash, error: errorCodeHash } = useCompareString(
    'Source code hash does not match.'
  )
  const { metadataFile, onChange, onRemove, metadata } = useParseMetadataField()
  const { isOnChain, contractHash } = useIsOnChain()
  const formData = {
    contractAddress: useFormInput<string>('', [
      notEmpty,
      onlyAddress,
      isOnChain
    ]),
    contractName: useFormInput<string>(nameWithTimestamp('custom'), [notEmpty])
  }
  const anyInvalidField: boolean = Object.values(formData).some(
    field => (field.required && !field.value) || field.error !== null
  )

  useEffect(() => {
    const { hash } = { ...(metadata.source?.source as SourceInMetadata) }
    if (!contractHash || !hash) return

    compareCodeHash(contractHash, hash)
  }, [compareCodeHash, contractHash, errorCodeHash, metadata.source?.source])

  const _handlerBack = () => {
    formData.contractAddress.setValue('')
    formData.contractName.setValue(nameWithTimestamp('custom'))
    router.push(ROUTES.HOME)
  }

  return (
    <Stack mt={8} flexDirection="column" gap={4} justifyContent={'center'}>
      <StyledTextField
        label="Contract Address"
        placeholder="502d1..."
        value={formData.contractAddress.value}
        onChange={formData.contractAddress.onChange}
        error={Boolean(formData.contractAddress.error)}
        helperText={
          formData.contractAddress.error ? formData.contractAddress.error : ''
        }
        loading={formData.contractAddress.loading}
      />
      <StyledTextField
        label="Contract Name"
        placeholder="My imported contract"
        value={formData.contractName.value}
        disabled={anyInvalidField}
        onChange={formData.contractName.onChange}
        error={Boolean(formData.contractName.error)}
        helperText={
          formData.contractName.error ? formData.contractName.error : ''
        }
      />
      <DropzoneWrapper>
        <DropZone
          label="Drop a .json file or click to select it"
          accept={{ 'application/json': ['.json', '.contract'] }}
          file={metadataFile}
          onChange={onChange}
          onRemove={onRemove}
          disabled={anyInvalidField}
        />
      </DropzoneWrapper>

      {metadataFile && (
        <TextCodeHashValidation error={errorCodeHash} network={network} />
      )}

      <BackNextButton
        handleBack={_handlerBack}
        nextLabel="Import"
        nextButtonProps={{
          endIcon: '⏫',
          disabled: anyInvalidField || !metadata.isValid
        }}
      />
    </Stack>
  )
}
