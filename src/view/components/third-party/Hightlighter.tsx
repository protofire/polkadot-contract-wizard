import React, { useState } from 'react'
import {
  Box,
  CardActions,
  Collapse,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material'
import { CodeOutlined, CopyAllOutlined } from '@mui/icons-material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import reactElementToJSXString from 'react-element-to-jsx-string'

import SyntaxHighlight from 'src/utils/SyntaxHighlight'

// ==============================|| CLIPBOARD & HIGHLIGHTER   ||============================== //

const Highlighter = ({
  children,
  codeHighlight
}: {
  children: React.ReactNode
  codeHighlight: boolean
}) => {
  const [highlight, setHighlight] = useState(codeHighlight)

  return (
    <Box sx={{ position: 'relative' }}>
      <CardActions
        sx={{ justifyContent: 'flex-end', p: 1, mb: highlight ? 1 : 0 }}
      >
        <Box sx={{ display: 'flex', position: 'inherit', right: 0, top: 6 }}>
          <CopyToClipboard
            text={reactElementToJSXString(children, {
              showFunctions: true,
              maxInlineAttributesLineLength: 100
            })}
          >
            <Tooltip title="Copy the source" placement="top-end">
              <IconButton
                color="secondary"
                size="small"
                sx={{ fontSize: '0.875rem' }}
              >
                <CopyAllOutlined />
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ mx: 1 }}
          />
          <Tooltip title="Show the source" placement="top-end">
            <IconButton
              sx={{ fontSize: '0.875rem' }}
              size="small"
              color={highlight ? 'primary' : 'secondary'}
              onClick={() => setHighlight(!highlight)}
            >
              <CodeOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
      <Collapse in={highlight}>
        {highlight && (
          <SyntaxHighlight>
            {reactElementToJSXString(children, {
              showFunctions: true,
              showDefaultProps: false,
              maxInlineAttributesLineLength: 100
            })}
          </SyntaxHighlight>
        )}
      </Collapse>
    </Box>
  )
}

export default Highlighter
