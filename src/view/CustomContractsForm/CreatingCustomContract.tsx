import { Grid, Typography } from '@mui/material'
import { StackStyled } from '@/view/wizardView/Step3Deploy/styled'
import Image from 'next/image'
import { GIF_COMPILING, SVG_AWESOME, SVG_SUCCESSFULLY } from '@/constants/index'

interface Props {
  isImporting: boolean | undefined
}

export function ImportingContractMessage({ isImporting }: Props) {
  if (isImporting === undefined) return null

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <StackStyled>
          <Image
            alt={isImporting ? 'creating' : 'created'}
            src={isImporting ? GIF_COMPILING : SVG_SUCCESSFULLY}
            width={150}
            height={150}
          />
          <Typography variant="h4" align="center" sx={{ margin: '0 1rem' }}>
            {isImporting ? (
              <p>Contract is being Imported.</p>
            ) : (
              <>
                <p>Contract successfully created.</p>
                <Image alt="awesome" src={SVG_AWESOME} width={22} height={22} />
              </>
            )}
          </Typography>
        </StackStyled>
      </Grid>
    </Grid>
  )
}
