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
import { TextCodeHashValidation } from './TextCodeHashValidation'
import { ChainId } from '@/services/useink/chains'
import BackNextButton from '@/components/BackNextButtons'
import { ROUTES } from '@/constants'
import router from 'next/router'
import { UserContractDetails, WalletConnectionEvents } from '@/domain'
import { useMultiEventListener } from '@/hooks/useMultipleEventListener'

export type CustomDeploymentDataForm = Pick<
  UserContractDetails,
  'name' | 'address' | 'abi'
>

interface Props {
  network: ChainId
  onCreate: (data: CustomDeploymentDataForm) => void
}

interface SourceInMetadata {
  hash: string
}

export function CustomContractsForm({ network, onCreate }: Props) {
  const { metadataFile, onChange, onRemove, metadata } = useParseMetadataField()
  const { isOnChain, contractHash } = useIsOnChain()
  const formData = {
    address: useFormInput<string>('', [notEmpty, onlyAddress, isOnChain]),
    name: useFormInput<string>(nameWithTimestamp('custom'), [notEmpty])
  }
  const anyInvalidField: boolean = Object.values(formData).some(
    field => (field.required && !field.value) || field.error !== null
  )
  const hash = (metadata?.source?.source as SourceInMetadata)?.hash
  const { isValid: thereIsHashCode, error: warningCodeHash } = useCompareString(
    {
      text1: contractHash,
      text2: hash || '',
      errorMessage: 'Source code hash does not match.'
    }
  )

  useMultiEventListener([WalletConnectionEvents.networkChanged], () =>
    _resetFormData()
  )

  const _resetFormData = () => {
    formData.address.setValue('')
    formData.name.setValue(nameWithTimestamp('custom'))
  }

  const _handlerBack = () => {
    _resetFormData()
    router.push(ROUTES.HOME)
  }

  const _handlerNext = () => {
    if (!metadata) return

    onCreate({
      address: formData.address.value,
      name: formData.name.value,
      abi: metadata.source
    })
  }

  return (
    <Stack mt={8} flexDirection="column" gap={4} justifyContent={'center'}>
      <StyledTextField
        label="Contract Address"
        placeholder="502d1..."
        value={formData.address.value}
        onChange={formData.address.onChange}
        error={Boolean(formData.address.error)}
        helperText={formData.address.error ? formData.address.error : ''}
        loading={formData.address.loading}
      />
      <StyledTextField
        label="Contract Name"
        placeholder="My imported contract"
        value={formData.name.value}
        disabled={!Boolean(formData.address.value)}
        onChange={formData.name.onChange}
        error={Boolean(formData.name.error)}
        helperText={formData.name.error ? formData.name.error : ''}
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

      {thereIsHashCode && (
        <TextCodeHashValidation error={warningCodeHash} network={network} />
      )}

      <BackNextButton
        handleBack={_handlerBack}
        nextLabel="Import"
        nextButtonProps={{
          endIcon: '⏫',
          disabled: anyInvalidField || !metadata.isValid
        }}
        handleNext={_handlerNext}
      />
    </Stack>
  )
}
