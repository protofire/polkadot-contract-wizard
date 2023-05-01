import { useMemo } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { CopyBlock, atomOneDark } from 'react-code-blocks'

import { useStepsSCWizard } from '@/context'
import BackNextButton from '../BackNextButtons'
import { TokenType } from '@/domain'
import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'
import { isValidAddress } from '@/utils/blockchain'
import { useAppNotificationContext } from 'src/context/AppNotificationContext'
import { generateCode } from './generator'

const StyledCopyBlock = styled(Box)(() => ({
  fontFamily: 'var(--font-mono)',
  fontSize: '1rem'
}))

export default function Step2Compile({ tokenType }: { tokenType: TokenType }) {
  const { handleBack, handleNext, dataForm, setDataForm } = useStepsSCWizard()
  const {
    state: { currentAccount }
  } = useNetworkAccountsContext()
  const isWalletConnected = useMemo(
    () => isValidAddress(currentAccount),
    [currentAccount]
  )
  const { addNotification } = useAppNotificationContext()

  const _handleNext = async () => {
    if (!isWalletConnected) {
      addNotification({
        message: 'You need connect your wallet',
        type: 'error'
      })
      return
    }

    setDataForm(prev => ({ ...prev, currentAccount }))
    handleNext()
  }

  return (
    <>
      <Typography variant="h4" mb={2}>
        Excelent! Now you need to compile contract {tokenType}!
      </Typography>
      <StyledCopyBlock
        sx={{ overflowY: 'scroll', height: '60vh', resize: 'both' }}
      >
        <CopyBlock
          language="rust"
          text={generateCode(tokenType, dataForm)}
          codeBlock
          theme={atomOneDark}
          showLineNumbers={true}
        />
      </StyledCopyBlock>

      <BackNextButton
        nextLabel="Compile Contract"
        handleBack={handleBack}
        handleNext={_handleNext}
        nextButtonProps={{ endIcon: '⚙️' }}
      />
    </>
  )
}
