import { Grid } from "@mui/material"
import { Button } from "@components"

type Props = {
    nextLabel?: string
    nextAction: () => void
    backLabel?: string
    backAction: () => void
    isNextDisabled?: boolean
    isDoingNext?: boolean
}
export default function BackNextButton(props: Props) {
    const { backAction, nextLabel = 'Next', backLabel = 'Back', isNextDisabled = false, isDoingNext = false } = props

    return (
        <Grid item xs={12} mt={9} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
                size="large"
                variant="outlined"
                onClick={backAction}
                disabled={isDoingNext === true}
            >
                {backLabel}
            </Button>
            <Button
                size="large"
                variant="contained"
                onClick={backAction}
                disabled={isNextDisabled}
            >
                {nextLabel}
            </Button>
        </Grid>
    )
}