import React from 'react'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ModalStyled, ModalTypography } from './styled'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { useUpdateUserContracts } from '@/hooks/userContracts/useUpdateUserContracts'
import { WalletConnectionEvents } from '@/domain'

type Props = {
  open: boolean
  contract: ContractTableItem
  handleClose: () => void
}
export function DeleteContractModal({ open, handleClose, contract }: Props) {
  const { updateContract } = useUpdateUserContracts()
  const handleDelete = () => {
    handleClose()
    const newContract = { ...contract, hidden: true }
    updateContract({
      contract: newContract,
      successCallback: () => {
        document.dispatchEvent(
          new CustomEvent(WalletConnectionEvents.updateContractList)
        )
      }
    })
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalStyled>
        <ModalTypography id="modal-modal-title" variant="h3">
          Remove contract
        </ModalTypography>

        <Typography variant="body1">
          You are about to remove the metadata for the{' '}
          <span
            style={{
              color: '#e6007a',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}
          >{`${contract.name}`}</span>{' '}
          contract.
        </Typography>

        <Box mt={1}>
          <Typography>
            ⚠️{' '}
            <span style={{ fontStyle: 'italic' }}>
              Remember the contract is not removed from the blockchain. You just
              will not see it in your contracts list anymore.
            </span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end',
            borderRadius: '10px',
            marginTop: '2rem',
            padding: '1rem'
          }}
        >
          <Button
            size="large"
            variant="outlined"
            sx={{
              borderRadius: '20px',
              maxHeight: '3rem',
              marginRight: '2rem'
            }}
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            sx={{ borderRadius: '20px', maxHeight: '3rem' }}
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </Box>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box></Box>
      </ModalStyled>
    </Modal>
  )
}
