import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

const StepperWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '& .MuiStepper-horizontal:not(.MuiStepper-alternativeLabel)': {
      flexDirection: 'row',
      alignItems: 'center',
      '& .MuiStepLabel-label': {
        fontSize: '1rem'
      }
    }
  },
  '& .MuiStep-root': {
    '& .MuiStepLabel-label': {
      color: 'white',
      fontWeight: 600,
      fontSize: '1.8rem'
    },
    '& .Mui-active': {
      color: theme.palette.primary.main,
      fontWeight: 600
    },
    '& .Mui-disable': {
      color: theme.palette.secondary.dark,
      fontWeight: 400
    },
    '& .Mui-completed': {
      color: theme.palette.primary.main,
      fontWeight: 600
    },

    '& .MuiStepIcon-text': {
      fontSize: '1rem'
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    }
  },

  '& .MuiStepConnector-root': {
    '& .MuiStepConnector-line': {
      borderWidth: 3,
      borderRadius: 3
    },
    '&.Mui-active, &.Mui-completed': {
      '& .MuiStepConnector-line': {
        borderColor: theme.palette.primary.main
      }
    }
  },

  '& .MuiStepper-vertical': {
    '& .MuiStep-root': {
      '& .step-label': {
        justifyContent: 'flex-start'
      },
      '& .MuiStepContent-root': {
        borderWidth: 3,
        marginLeft: theme.spacing(2.25),
        borderColor: theme.palette.primary.main
      },
      '& .button-wrapper': {
        marginTop: theme.spacing(4)
      },
      '&.active + .MuiStepConnector-root .MuiStepConnector-line': {
        borderColor: theme.palette.primary.main
      }
    },
    '& .MuiStepConnector-root': {
      marginLeft: theme.spacing(2.25),
      '& .MuiStepConnector-line': {
        borderRadius: 0
      }
    }
  }
}))

export default StepperWrapper
