import { Box, Typography } from "@mui/material";
import { CopyBlock, atomOneDark } from "react-code-blocks";

import { useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { ContractConfig, TokenType } from '@types'
import { getExtensions } from "./getExtensions";
import { BRUSH_NAME, CONTRACT_NAME, VERSION } from "@constants";
import { ContractBuilder, TraitImpl } from "./builders";

function generateCode(standardName: TokenType, data: ContractConfig) {

  const { extensions, usesStandardExtensions } = getExtensions(data, standardName)

  const contract = new ContractBuilder()
  contract.setContractName(CONTRACT_NAME)
  contract.setStandardName(standardName)
  contract.setBrushName(BRUSH_NAME)
  contract.setVersion(VERSION)
  contract.setImpl(new TraitImpl(`${standardName.toUpperCase()}`, CONTRACT_NAME, []))

  const isEnumerable = data.extensions.Enumerable === true


  return contract.getContract().toString()
}

export default function Step3Deploy({ tokenType }: { tokenType: TokenType }) {
  const { handleBack, handleNext, dataForm } = useStepsSCWizard()

  return (
    <>
      <Typography>Congrats! Now you can deploy your contract {tokenType}!</Typography>
      <Box sx={{ overflowY: 'scroll', height: '30rem', resize: 'both' }}>
        <CopyBlock
          language="rust"
          text={generateCode(tokenType, dataForm)}
          codeBlock
          theme={atomOneDark}
          showLineNumbers={true}
        />
      </Box>

      <BackNextButton
        nextLabel="Deploy Contract"
        handleBack={handleBack}
        handleNext={handleNext}
        nextButtonProps={{ startIcon: '🚀' }}
      />
    </>
  )
}
