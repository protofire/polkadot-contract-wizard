import * as React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
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
  Radio,
  RadioGroup,
  FormControl,
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
          <Stack sx={{ mt: 2, mb: 2 }}>
            <FormGroup sx={{ gap: 3 }}>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.7rem',
                      }}
                    >
                      Metadata
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                    >
                      Metadata for [`PSP22`].
                    </Typography>
                  </>
                }
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.7rem',
                      }}
                    >
                      Minteable
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                    >
                      Extension of [`PSP22`] that allows create `amount` tokens
                      and assigns them to `account`, increasing the total
                      supply.
                    </Typography>
                  </>
                }
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.7rem',
                      }}
                    >
                      Burnable
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                    >
                      Extension of [`PSP22`] that allows token holders to
                      destroy both their own tokens and those that they have an
                      allowance for.
                    </Typography>
                  </>
                }
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.7rem',
                      }}
                    >
                      Wrapper
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                    >
                      Extension of [`PSP22`] that allows you to wrap your PSP22
                      token in a PSP22Wrapper token which can be used for
                      example for governance.
                    </Typography>
                  </>
                }
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.7rem',
                      }}
                    >
                      FlashMint
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                    >
                      Extension of [`PSP22`] that allows the user to perform a
                      flash loan on the token by minting the borrowed amount and
                      then burning it along with fees for the loan.
                    </Typography>
                  </>
                }
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.7rem',
                      }}
                    >
                      Pausable
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                    >
                      Extension of [`PSP22`] that allows you to pause all token
                      operations.
                    </Typography>
                  </>
                }
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.7rem',
                      }}
                    >
                      Capped
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                    >
                      Extension of [`PSP22`] that allows you to implement with a
                      supply cap, analogue to ERC20Capped.
                    </Typography>
                  </>
                }
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                }}
              />
            </FormGroup>
          </Stack>
        );
      case 1:
        return (
          <Stack sx={{ mt: 2, mb: 2 }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="security"
                defaultValue="none"
                name="radio-buttons-group"
                sx={{ gap: 3 }}
              >
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: '1.7rem',
                        }}
                      >
                        None
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                      >
                        Sample content for None value.
                      </Typography>
                    </>
                  }
                  value="none"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 32 },
                  }}
                />

                <FormControlLabel
                  control={<Radio />}
                  label={
                    <>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: '1.7rem',
                        }}
                      >
                        Ownable
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                      >
                        Sample content for Ownable value.
                      </Typography>
                    </>
                  }
                  value="Ownable"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 32 },
                  }}
                />
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: '1.7rem',
                        }}
                      >
                        Access Control
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                      >
                        Sample content for Access Control value.
                      </Typography>
                    </>
                  }
                  value="access_control"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 32 },
                  }}
                />
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: '1.7rem',
                        }}
                      >
                        Access Control Enumerable
                      </Typography>{' '}
                      <Typography
                        variant="body1"
                        sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                      >
                        Sample content for Access Control Enumerable value.
                      </Typography>
                    </>
                  }
                  value="access_control_enumerable"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 32 },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        );
      case 2:
        return (
          <>
            <Typography >
              Congrats! Now you can deploy your contract!
            </Typography>
            <Box sx={{ overflowY: 'scroll', height: '30rem', resize: 'both' }}>
              <CopyBlock
                language="go"
                text={`#![cfg_attr(not(feature = "std"), no_std)]
              #![feature(min_specialization)]
                      
              #[openbrush::contract]
              pub mod my_psp22 {
                  
                  // imports from openbrush
                use openbrush::contracts::psp22::Transfer;
                use openbrush::traits::String;
                use openbrush::traits::Storage;
                use openbrush::contracts::ownable::*;
                use openbrush::contracts::psp22::extensions::flashmint::*;
              
                  #[ink(storage)]
                  #[derive(Default, Storage)]
                  pub struct Contract {
                    #[storage_field]
                  psp22: psp22::Data,
                  #[storage_field]
                  ownable: ownable::Data,
                  cap: Balance,
                  }
                  
                  // Section contains default implementation without any modifications
                impl PSP22 for Contract {}
                impl Ownable for Contract {}
                impl FlashLender for Contract {}
              
                impl Transfer for Contract {
                  fn _before_token_transfer(
                          &mut self,
                          _from: Option<&AccountId>,
                    _to: Option<&AccountId>,
                    _amount: &Balance
                      ) -> Result<(), PSP22Error> {
                    if _from.is_none() && (self.total_supply() + _amount) > self.cap() {
                              return Err(PSP22Error::Custom(String::from("Cap exceeded")))
                          }
                          Ok(())
                  }
                }
                   
                  impl Contract {
                      #[ink(constructor)]
                      pub fn new(initial_supply: Balance) -> Self {
                          let mut _instance = Self::default();
                    _instance._mint_to(_instance.env().caller(), initial_supply).expect("Should mint"); 
                    _instance._init_with_owner(_instance.env().caller());
                    _instance
                      }
              
                  #[ink(message)]
                  pub fn cap(&self) -> Balance {
                    self.cap
                  }
              
                  fn _init_cap(&mut self, cap: Balance) -> Result<(), PSP22Error> {
                    if cap <= 0 {
                              return Err(PSP22Error::Custom(String::from("Cap must be above 0")))
                          }
                          self.cap = cap;
                          Ok(())
                  }
                  }
              }`}
                codeBlock
                theme={dracula}
                showLineNumbers={false}
              />
            </Box>
          </>
        );
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
            We are deploying your contract now.
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
              {activeStep === steps.length - 1 ? 'Deploy your contract' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
