import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import * as React from 'react'
import { StyledTabsContainer } from './styled'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

type BasicTabsProps = {
  options: string[]
  children: React.ReactNode
  onChange?: (newValue: number) => void
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box className="tab-content">{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `assets-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function BasicTabs(props: BasicTabsProps) {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    props.onChange?.(newValue)
  }

  return (
    <StyledTabsContainer>
      <Tabs value={value} onChange={handleChange}>
        {props.options.map((option, index) => (
          <Tab key={option} label={option} {...a11yProps(index)} />
        ))}
      </Tabs>
      <CustomTabPanel value={value} index={value}>
        {props.children}
      </CustomTabPanel>
    </StyledTabsContainer>
  )
}
