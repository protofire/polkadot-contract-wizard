import {
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  SelectChangeEvent,
  Stack,
  styled,
  Avatar,
  Box
} from '@mui/material'
import {
  CHAINS_ALLOWED,
  OPTION_FOR_CUSTOM_NETWORK,
  UNKNOWN_CHAIN,
  addNewChain,
  createIChainWithRPCAndSave,
  getChain
} from '@/constants/chains'
import { ChainId } from '@/services/useink/chains/types'
import ConfirmationDialog from '../ConfirmationDialog'
import { useModalBehaviour } from '@/hooks/useModalBehaviour'
import { useCompareCurrentPath } from '@/hooks/useCompareCurrentPath'
import { ROUTES } from '@/constants'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import ModalView from '../ModalView'
import { useFormInput } from '@/hooks'
import { notEmpty } from '@/utils/inputValidation'
import { StyledTextField } from '../Input'
import { RpcUrl } from '@/services/useink/chains/data/types'
import { ChainExtended } from '@/types'

const StyledSelect = styled(Select)<SelectProps>(() => ({
  color: 'white',
  padding: '0',
  margin: '0.5rem 0.5rem',
  borderRadius: '0.5rem',
  width: '202px',
  height: '2.88em',
  display: 'flex',

  '& fieldset': {
    top: '0'
  },

  '& p': {
    marginLeft: '0.5rem',
    paddingTop: '0.5rem'
  },

  '& legend': {
    display: 'none'
  },

  '& img': {
    width: 'auto',
    height: 'auto'
  }
}))

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(() => ({
  color: 'white',
  '& p': {
    marginLeft: '1rem',
    paddingTop: '0.5rem'
  },
  '& img': {
    width: 'auto',
    height: 'auto',
    fontWeight: '600'
  }
}))

export function NetworkSelect({
  currentChain,
  onChange
}: {
  currentChain: ChainId
  onChange: (chain: ChainId) => void
}) {
  const chain = getChain(currentChain)
  const {
    closeModal: closeDialog,
    isOpen: isOpenDialog,
    openModal: openDialog
  } = useModalBehaviour()
  const { closeModal, isOpen, openModal } = useModalBehaviour()
  const { isEqual: isCurrentPathHome } = useCompareCurrentPath(ROUTES.HOME)
  const [newChainId, setNewChainId] = useState(currentChain)

  const [chains, setChains] = useState<ChainExtended[]>(CHAINS_ALLOWED)

  // useEffect(() => {
  //   setNewChainId(chains)
  // }, [chains])

  useEffect(() => {
    setNewChainId(currentChain)
  }, [currentChain])

  const _handleChangeChain = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value === OPTION_FOR_CUSTOM_NETWORK) {
      openModal()
      return
    }
    const chainId = event.target.value as ChainId
    setNewChainId(chainId)

    if (isCurrentPathHome) {
      onChange(chainId)
    } else {
      openDialog()
    }
  }

  const formData = {
    name: useFormInput<string>('test', [notEmpty]),
    // rpc: useFormInput<string>('ws://127.0.0.1:9944', [notEmpty, validWslUrl])
    rpc: useFormInput<RpcUrl>('wss://rococo-contracts-rpc.polkadot.io', [
      notEmpty
    ])
  }

  const anyInvalidField: boolean = Object.values(formData).some(
    field => (field.required && !field.value) || field.error !== null
  )

  const addCustomNetwork = async () => {
    const chain = createIChainWithRPCAndSave(formData.rpc.value)
    const newChainList = addNewChain(chain)
    setChains(newChainList)
    closeModal()
    return undefined
  }

  return (
    <>
      <StyledSelect
        placeholder="Select Network..."
        value={chain.id}
        onChange={_handleChangeChain}
      >
        {chains.map(option => (
          <StyledMenuItem
            sx={{ color: 'white' }}
            selected={chain.name === option.name}
            key={option.id}
            value={option.id}
          >
            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              <Avatar src={option.logo.src} alt={option.logo.alt} />{' '}
              <Stack>
                <p>{option.name}</p>
              </Stack>
            </Stack>
          </StyledMenuItem>
        ))}
        {chains.length === 4 ? (
          <StyledMenuItem
            sx={{ color: 'white' }}
            selected={chain.name === OPTION_FOR_CUSTOM_NETWORK}
            key={UNKNOWN_CHAIN.id}
            value={OPTION_FOR_CUSTOM_NETWORK}
          >
            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              <AddIcon sx={{ marginTop: '8px', fontSize: '1.4rem' }} />
              <Stack>
                <p> Add chain </p>
              </Stack>
            </Stack>
          </StyledMenuItem>
        ) : (
          <StyledMenuItem
            sx={{ color: 'white' }}
            selected={chain.name === 'edit'}
            key={UNKNOWN_CHAIN.id}
            value={OPTION_FOR_CUSTOM_NETWORK}
          >
            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              <p> Edit Chain </p>
            </Stack>
          </StyledMenuItem>
        )}
      </StyledSelect>
      <ConfirmationDialog
        open={isOpenDialog}
        onClose={closeDialog}
        title="Change Network confirmation"
        message="Are you sure you want to change the network?"
        onConfirm={() => {
          closeModal()
          onChange(newChainId)
        }}
      />
      <ModalView
        open={isOpen}
        onClose={closeModal}
        onFunction={addCustomNetwork}
        title="Add Network"
        subTitle="Add network details"
        okBtn={{ text: 'Add', validation: anyInvalidField }}
      >
        <Box
          sx={{
            margin: '2rem 0rem',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <StyledTextField
            sx={{ marginBottom: '2rem' }}
            label="Network Name"
            placeholder="502d1..."
            value={formData.name.value}
            onChange={formData.name.onChange}
            error={Boolean(formData.name.error)}
            helperText={formData.name.error ? formData.name.error : ''}
            loading={formData.name.loading}
            autoFocus
          />
          <StyledTextField
            label="Rpc url"
            placeholder="My imported contract"
            value={formData.rpc.value}
            onChange={formData.rpc.onChange}
            error={Boolean(formData.rpc.error)}
            helperText={formData.rpc.error ? formData.rpc.error : ''}
          />
        </Box>
      </ModalView>
    </>
  )
}
