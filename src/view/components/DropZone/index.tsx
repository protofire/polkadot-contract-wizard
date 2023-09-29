import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { useCallback } from 'react'
import { Accept, useDropzone } from 'react-dropzone'

interface Props {
  label: string
  accept: Accept
  file: File | undefined
  onChange: (_file: File) => void
  onRemove: () => void
}

export const DropZone: React.FC<Props> = props => {
  const { label, accept, file, onChange, onRemove } = props

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const _file = acceptedFiles[0]
      _file && onChange(_file)
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept,
    onDrop
  })

  return (
    <Box {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />

      {file !== undefined ? (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={4}
        >
          <Typography color="textSecondary">{file.name}</Typography>
          <Button
            variant="outlined"
            onClick={event => {
              event.stopPropagation()
              onRemove()
            }}
          >
            Clear
          </Button>
        </Stack>
      ) : null}

      {file === undefined ? (
        <Typography color="textSecondary">
          {isDragActive ? 'Drop the file here...' : label}
        </Typography>
      ) : null}
    </Box>
  )
}
