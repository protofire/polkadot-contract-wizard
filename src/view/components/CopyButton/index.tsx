import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

const CopyToClipboardButton = () => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)

        /* TO-DO: Finish this component */
        /* navigator.clipboard.writeText(window.location.toString())) */
    }

    return (
        <>
            <Button onClick={handleClick}><ContentCopyRoundedIcon /></Button>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
            />
        </>
    )
}

export default CopyToClipboardButton
