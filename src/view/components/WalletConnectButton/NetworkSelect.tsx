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
  MAX_CHAIN_NUMBER,
  MAX_CUSTOM_NAME_LENGTH,
  OPTION_FOR_ADD_CUSTOM_NETWORK,
  OPTION_FOR_CUSTOM_NETWORK,
  OPTION_FOR_EDIT_CUSTOM_NETWORK,
  addNewChain,
  createIChainWithRPCAndSave,
  getChain,
  updateChain
} from '@/constants/chains'
import { ChainId } from '@/services/useink/chains/types'
import ConfirmationDialog from '../ConfirmationDialog'
import { useModalBehaviour } from '@/hooks/useModalBehaviour'
import { useCompareCurrentPath } from '@/hooks/useCompareCurrentPath'
import { ROUTES } from '@/constants'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import ModalView from '../ModalView'
import { useFormInput } from '@/hooks'
import { maxLength, notEmpty, validateWsUrl } from '@/utils/inputValidation'
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
  onChange,
  setCustomChain
}: {
  currentChain: ChainId
  onChange: (chain: ChainId) => void
  setCustomChain: (chain: ChainExtended) => void
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

  if (chain.id === OPTION_FOR_CUSTOM_NETWORK && CHAINS_ALLOWED.length <= 4) {
    CHAINS_ALLOWED.push(chain)
  }

  const [chains, setChains] = useState<ChainExtended[]>(CHAINS_ALLOWED)

  useEffect(() => {
    setNewChainId(currentChain)
  }, [currentChain])

  const _handleChangeChain = (event: SelectChangeEvent<unknown>) => {
    const chainId = event.target.value
    if (
      chainId === OPTION_FOR_ADD_CUSTOM_NETWORK ||
      chainId == OPTION_FOR_EDIT_CUSTOM_NETWORK
    ) {
      openModal()
      return
    }
    setNewChainId(chainId as ChainId)
    if (isCurrentPathHome) {
      onChange(chainId as ChainId)
    } else {
      openDialog()
    }
  }

  const formData = {
    name: useFormInput<string>(chain.name, [
      notEmpty,
      value => maxLength(value, MAX_CUSTOM_NAME_LENGTH)
    ]),
    rpc: useFormInput<RpcUrl>(
      chain.rpcs[0] ?? 'wss://rpc.shibuya.astar.network',
      [notEmpty, validateWsUrl]
    )
  }

  const editNetwork =
    chains.some(chain => chain.id === OPTION_FOR_CUSTOM_NETWORK) &&
    chains.length === MAX_CHAIN_NUMBER

  const anyInvalidField: boolean = Object.values(formData).some(
    field => (field.required && !field.value) || field.error !== null
  )

  const addCustomNetwork = async () => {
    let newChainList: ChainExtended[] = []
    const customChain = createIChainWithRPCAndSave(
      formData.name.value,
      formData.rpc.value
    )

    if (editNetwork) {
      newChainList = updateChain(chains, customChain)
    } else {
      newChainList = addNewChain(customChain)
    }
    setCustomChain(customChain)
    setChains(newChainList)
    onChange(customChain.id)
    closeModal()
  }

  const customExist = chains.some(
    element => element.id === OPTION_FOR_CUSTOM_NETWORK
  )
  return (
    <>
      <StyledSelect
        placeholder="Select Network..."
        value={chain?.id}
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
        {customExist ? (
          <StyledMenuItem
            sx={{ color: 'white' }}
            key={OPTION_FOR_EDIT_CUSTOM_NETWORK}
            value={OPTION_FOR_EDIT_CUSTOM_NETWORK}
          >
            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              <EditIcon sx={{ marginTop: '8px', fontSize: '1.4rem' }} />
              <p> Edit Chain </p>
            </Stack>
          </StyledMenuItem>
        ) : (
          <StyledMenuItem
            sx={{ color: 'white' }}
            selected={chain.name === OPTION_FOR_CUSTOM_NETWORK}
            key={OPTION_FOR_CUSTOM_NETWORK}
            value={OPTION_FOR_ADD_CUSTOM_NETWORK}
          >
            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              <AddIcon sx={{ marginTop: '8px', fontSize: '1.4rem' }} />
              <p> Add chain </p>
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
          closeDialog()
          onChange(newChainId)
        }}
      />

      <ModalView
        open={isOpen}
        onClose={closeModal}
        onFunction={() => {
          addCustomNetwork()
        }}
        title={`${editNetwork ? 'Edit' : 'Add '} network`}
        subTitle={`${editNetwork ? 'Edit' : 'Add '} network details`}
        okBtn={{
          text: `${editNetwork ? 'Update' : 'Add'}`,
          validation: anyInvalidField
        }}
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
            placeholder="Custom Chain"
            value={formData.name.value}
            onChange={formData.name.onChange}
            error={Boolean(formData.name.error)}
            helperText={formData.name.error ? formData.name.error : ''}
            loading={formData.name.loading}
            autoFocus
          />
          <StyledTextField
            label="Rpc url"
            placeholder="wss://"
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
