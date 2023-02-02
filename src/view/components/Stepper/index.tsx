import * as React from 'react';
import StepperWrapper from './stepperWrapper';
import { Stack } from '@mui/system';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Button,
  StepLabel,
  Step,
  Stepper,
  Box,
} from '@mui/material';

const steps = ['Extensions', 'Security', 'Deploy'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Stack sx={{ mt: 2, mb: 1 }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Minteable"
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                  '& .MuiFormControlLabel-label': { fontSize: '1.7rem' },
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Burneable"
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                  '& .MuiFormControlLabel-label': { fontSize: '1.7rem' },
                }}
              />
            </FormGroup>
          </Stack>
        );
      case 1:
        return (
          <Stack sx={{ mt: 2, mb: 1 }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Owneable"
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                  '& .MuiFormControlLabel-label': { fontSize: '1.7rem' },
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Access Control"
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                  '& .MuiFormControlLabel-label': { fontSize: '1.7rem' },
                }}
              />
            </FormGroup>
          </Stack>
        );
      case 2:
        return <Typography sx={{ mt: 2, mb: 1 }}>Congrats! Now you can deploy your contract!</Typography>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <StepperWrapper>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </StepperWrapper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {getStepContent()}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
