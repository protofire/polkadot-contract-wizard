import React, { useEffect, useRef, useState } from 'react'
import {
  AppBar,
  Box,
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  Toolbar
} from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'

import Transitions from 'src/view/components/Transitions'
import LogoMobile from 'src/view/components/LogoMobile';

// ==============================|| HEADER CONTENT - MOBILE ||============================== //
const MobileSection = () => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current?.contains(event.target as Node)) {
      return
    }

    setOpen(false)
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <LogoMobile />
      <Box sx={{ flexShrink: 0, mr: 0.5 }}>
        <IconButton
          component="span"
          disableRipple
          sx={{
            bgcolor: open ? 'grey.300' : 'grey.100'
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          <AccountBalanceWalletIcon />
        </IconButton>
      </Box>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{
          width: '100%'
        }}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper sx={{}}>
              <ClickAwayListener onClickAway={handleClose}>
                <AppBar color="inherit">
                  <Toolbar>{/* <Profile /> */}</Toolbar>
                </AppBar>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  )
}

export default MobileSection
