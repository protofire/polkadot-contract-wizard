import { Box, BoxProps, FormLabel, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'

interface CodeBlockProps extends BoxProps {
  label: string
}

export const CodeBlock: React.FC<PropsWithChildren<CodeBlockProps>> = ({
  children,
  label,
  sx
}) => {
  const _children =
    typeof children === 'string' ? (
      <Typography component="code" variant="body2">
        {children}
      </Typography>
    ) : (
      children
    )

  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: theme => theme.palette.background.default,
        borderRadius: 1,
        p: 2,
        overflowX: 'auto',
        ...sx
      }}
    >
      <FormLabel
        sx={{
          marginTop: '-2em',
          zIndex: 2,
          position: 'absolute',
          fontSize: '0.75em',
          width: 'auto'
        }}
      >
        {label}
      </FormLabel>
      {_children}
    </Box>
  )
}
