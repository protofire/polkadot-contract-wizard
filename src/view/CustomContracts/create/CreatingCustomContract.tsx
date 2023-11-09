import { Grid, Typography } from '@mui/material'
import { StackStyled } from '@/view/wizardView/Step3Deploy/styled'
import Image from 'next/image'
import { GIF_COMPILING, SVG_AWESOME, SVG_SUCCESSFULLY } from '@/constants/index'

interface Props {
  isImporting: boolean | undefined
  isCreated: boolean | undefined
}

export function ImportingContractMessage({ isImporting, isCreated }: Props) {
  if (isImporting === undefined) return null

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <StackStyled>
          <Image
            alt={isCreated ? 'created' : 'creating'}
            src={isCreated ? SVG_SUCCESSFULLY : GIF_COMPILING}
            width={150}
            height={150}
          />
          <Typography variant="h4" align="center" sx={{ margin: '0 1rem' }}>
            {isCreated ? (
              <>
                <p>Contract successfully created.</p>
                <Image alt="awesome" src={SVG_AWESOME} width={22} height={22} />
              </>
            ) : (
              <p>Contract is being Imported.</p>
            )}
          </Typography>
        </StackStyled>
      </Grid>
    </Grid>
  )
}
